-- Fix: update_city_listing_count trigger was inserting into non-existent 'cities' table
-- The correct table is 'ibclc_cities'. This replaces the broken function.

CREATE OR REPLACE FUNCTION update_city_listing_count()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO ibclc_cities (city, state, slug, listing_count)
  VALUES (
    NEW.city,
    NEW.state,
    lower(regexp_replace(NEW.city, '\s+', '-', 'g')) || '-' || lower(NEW.state),
    1
  )
  ON CONFLICT (city, state)
  DO UPDATE SET listing_count = (
    SELECT COUNT(*) FROM ibclc_listings
    WHERE city = ibclc_cities.city AND state = ibclc_cities.state AND status = 'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
