-- Migration: Stripe test-mode tables
-- Run against: fbuqrnzofktepkzyfmhy (Directories Supabase project)
-- Purpose: Supports test-mode webhook handler and Product Listing Generator

-- stripe_products: canonical record of Stripe products (test mode)
CREATE TABLE IF NOT EXISTS stripe_products (
  id          TEXT        PRIMARY KEY,           -- Stripe product ID (prod_...)
  name        TEXT        NOT NULL,
  description TEXT,
  metadata    JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE stripe_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access" ON stripe_products
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- stripe_checkouts: one row per completed Stripe checkout session
CREATE TABLE IF NOT EXISTS stripe_checkouts (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     TEXT        UNIQUE NOT NULL,   -- Stripe session ID (cs_test_...)
  product_id     TEXT        REFERENCES stripe_products(id) ON DELETE SET NULL,
  customer_email TEXT,
  status         TEXT        NOT NULL DEFAULT 'complete',
  amount_total   INTEGER     NOT NULL DEFAULT 0, -- in cents
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE stripe_checkouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access" ON stripe_checkouts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS stripe_checkouts_session_id_idx    ON stripe_checkouts(session_id);
CREATE INDEX IF NOT EXISTS stripe_checkouts_customer_email_idx ON stripe_checkouts(customer_email);
CREATE INDEX IF NOT EXISTS stripe_checkouts_product_id_idx    ON stripe_checkouts(product_id);
