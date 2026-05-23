-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Listings table
CREATE TABLE ibclc_listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  credentials text[] DEFAULT '{}',
  bio text,
  photo_url text,
  phone text,
  email text,
  website text,
  city text NOT NULL,
  state text NOT NULL,
  zip text,
  lat numeric(10,7),
  lng numeric(10,7),
  accepting_new_clients boolean DEFAULT true,
  telehealth boolean DEFAULT false,
  visit_types text[] DEFAULT '{}',
  insurance_accepted text[] DEFAULT '{}',
  specialties text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  plan_tier text NOT NULL DEFAULT 'free' CHECK (plan_tier IN ('free', 'pro', 'verified')),
  iblce_credential_number text,
  credential_verified boolean DEFAULT false,
  claimed boolean DEFAULT false,
  claimed_at timestamptz,
  stripe_customer_id text,
  plan_expires_at timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  -- Computed rank for query ordering: verified=1, pro=2, free=3
  plan_tier_rank integer GENERATED ALWAYS AS (
    CASE plan_tier
      WHEN 'verified' THEN 1
      WHEN 'pro' THEN 2
      ELSE 3
    END
  ) STORED,
  -- Full-text search vector
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english'::regconfig, coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(bio, '')), 'B') ||
    setweight(to_tsvector('english'::regconfig, coalesce(city, '')), 'C') ||
    setweight(to_tsvector('english'::regconfig, coalesce(state, '')), 'C') ||
    setweight(to_tsvector('english'::regconfig, coalesce(array_to_string(specialties, ' '), '')), 'B')
  ) STORED,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Claims table
CREATE TABLE ibclc_claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid NOT NULL REFERENCES ibclc_listings(id) ON DELETE CASCADE,
  email text NOT NULL,
  token text UNIQUE NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Payments table
CREATE TABLE ibclc_payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid NOT NULL REFERENCES ibclc_listings(id) ON DELETE CASCADE,
  stripe_payment_intent_id text,
  stripe_subscription_id text,
  plan_tier text NOT NULL CHECK (plan_tier IN ('pro', 'verified')),
  amount_cents integer,
  currency text DEFAULT 'usd',
  status text DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Cities table (denormalized cache for city pages)
CREATE TABLE ibclc_cities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  city text NOT NULL,
  state text NOT NULL,
  slug text UNIQUE NOT NULL,
  latitude numeric(10,7),
  longitude numeric(10,7),
  listing_count integer DEFAULT 0,
  meta_description text,
  intro_paragraph text,
  active boolean DEFAULT true,
  UNIQUE(city, state)
);

-- Reviews table (v2 / post-launch)
CREATE TABLE ibclc_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid NOT NULL REFERENCES ibclc_listings(id) ON DELETE CASCADE,
  reviewer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body text,
  verified_patient boolean DEFAULT false,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_listings_state_city ON ibclc_listings(state, city);
CREATE INDEX idx_listings_state ON ibclc_listings(state);
CREATE INDEX idx_listings_city ON ibclc_listings(city);
CREATE INDEX idx_listings_plan_tier ON ibclc_listings(plan_tier);
CREATE INDEX idx_listings_status ON ibclc_listings(status);
CREATE INDEX idx_listings_tier_rank ON ibclc_listings(plan_tier_rank, name);
CREATE INDEX idx_listings_search ON ibclc_listings USING gin(search_vector);
CREATE INDEX idx_listings_specialties ON ibclc_listings USING gin(specialties);
CREATE INDEX idx_listings_insurance ON ibclc_listings USING gin(insurance_accepted);
CREATE INDEX idx_listings_telehealth ON ibclc_listings(telehealth) WHERE telehealth = true;
CREATE INDEX idx_listings_accepting ON ibclc_listings(accepting_new_clients) WHERE accepting_new_clients = true;
CREATE INDEX idx_listings_slug ON ibclc_listings(slug);
CREATE INDEX idx_claims_token ON ibclc_claims(token);
CREATE INDEX idx_claims_listing ON ibclc_claims(listing_id);
CREATE INDEX idx_payments_listing ON ibclc_payments(listing_id);
CREATE INDEX idx_cities_slug ON ibclc_cities(slug);
CREATE INDEX idx_cities_state ON ibclc_cities(state);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON ibclc_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function to update city listing counts
CREATE OR REPLACE FUNCTION update_city_listing_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert city record
  INSERT INTO cities (city, state, slug, listing_count)
  VALUES (
    NEW.city,
    NEW.state,
    lower(regexp_replace(NEW.city, '\s+', '-', 'g')) || '-' || lower(NEW.state),
    1
  )
  ON CONFLICT (city, state)
  DO UPDATE SET listing_count = (
    SELECT COUNT(*) FROM ibclc_listings
    WHERE city = NEW.city AND state = NEW.state AND status = 'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_city_count
  AFTER INSERT OR UPDATE ON ibclc_listings
  FOR EACH ROW
  WHEN (NEW.status = 'active')
  EXECUTE FUNCTION update_city_listing_count();

-- Row Level Security
ALTER TABLE ibclc_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ibclc_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE ibclc_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ibclc_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ibclc_reviews ENABLE ROW LEVEL SECURITY;

-- Public can read active listings
CREATE POLICY "Public can read active listings"
  ON ibclc_listings FOR SELECT
  USING (status = 'active');

-- Service role has full access (bypasses RLS)
-- No explicit policy needed — service_role key bypasses RLS by default

-- Public can read cities
CREATE POLICY "Public can read cities"
  ON ibclc_cities FOR SELECT
  USING (active = true);

-- Public can read approved reviews
CREATE POLICY "Public can read approved reviews"
  ON ibclc_reviews FOR SELECT
  USING (approved = true);
