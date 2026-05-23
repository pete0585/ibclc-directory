/**
 * Seed script for IBCLCDirectory.com
 *
 * Sources:
 * 1. DataForSEO SERP scraping — "IBCLC [city]" across top 150 US cities
 * 2. Manual sample data (30 realistic listings to test the UI)
 *
 * Run: npm run seed
 * Prerequisites: .env file with SUPABASE_URL and SUPABASE_SERVICE_KEY
 *
 * For production seeding, use the data-seeder agent which runs DataForSEO SERP
 * queries across 150 US cities at ~$0.45 total cost.
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
)

const TOP_CITIES = [
  { city: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
  { city: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
  { city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
  { city: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  { city: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.074 },
  { city: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652 },
  { city: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936 },
  { city: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  { city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.797 },
  { city: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { city: 'Jacksonville', state: 'FL', lat: 30.3322, lng: -81.6557 },
  { city: 'Fort Worth', state: 'TX', lat: 32.7555, lng: -97.3308 },
  { city: 'Columbus', state: 'OH', lat: 39.9612, lng: -82.9988 },
  { city: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
  { city: 'Indianapolis', state: 'IN', lat: 39.7684, lng: -86.1581 },
  { city: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { city: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  { city: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 },
  { city: 'Oklahoma City', state: 'OK', lat: 35.4676, lng: -97.5164 },
  { city: 'El Paso', state: 'TX', lat: 31.7619, lng: -106.485 },
  { city: 'Boston', state: 'MA', lat: 42.3601, lng: -71.0589 },
  { city: 'Las Vegas', state: 'NV', lat: 36.1699, lng: -115.1398 },
  { city: 'Louisville', state: 'KY', lat: 38.2527, lng: -85.7585 },
  { city: 'Baltimore', state: 'MD', lat: 39.2904, lng: -76.6122 },
  { city: 'Milwaukee', state: 'WI', lat: 43.0389, lng: -87.9065 },
  { city: 'Albuquerque', state: 'NM', lat: 35.0844, lng: -106.6504 },
  { city: 'Tucson', state: 'AZ', lat: 32.2226, lng: -110.9747 },
  { city: 'Fresno', state: 'CA', lat: 36.7378, lng: -119.7871 },
  { city: 'Sacramento', state: 'CA', lat: 38.5816, lng: -121.4944 },
  { city: 'Mesa', state: 'AZ', lat: 33.4152, lng: -111.8315 },
  { city: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
  { city: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388 },
  { city: 'Omaha', state: 'NE', lat: 41.2565, lng: -95.9345 },
  { city: 'Colorado Springs', state: 'CO', lat: 38.8339, lng: -104.8214 },
  { city: 'Raleigh', state: 'NC', lat: 35.7796, lng: -78.6382 },
  { city: 'Long Beach', state: 'CA', lat: 33.77, lng: -118.1937 },
  { city: 'Virginia Beach', state: 'VA', lat: 36.8529, lng: -75.978 },
  { city: 'Minneapolis', state: 'MN', lat: 44.9778, lng: -93.265 },
  { city: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
  { city: 'New Orleans', state: 'LA', lat: 29.9511, lng: -90.0715 },
  { city: 'Arlington', state: 'TX', lat: 32.7357, lng: -97.1081 },
  { city: 'Bakersfield', state: 'CA', lat: 35.3733, lng: -119.0187 },
  { city: 'Honolulu', state: 'HI', lat: 21.3069, lng: -157.8583 },
  { city: 'Anaheim', state: 'CA', lat: 33.8366, lng: -117.9143 },
  { city: 'Aurora', state: 'CO', lat: 39.7294, lng: -104.8319 },
  { city: 'Santa Ana', state: 'CA', lat: 33.7455, lng: -117.8678 },
  { city: 'Corpus Christi', state: 'TX', lat: 27.8006, lng: -97.3964 },
  { city: 'Riverside', state: 'CA', lat: 33.9806, lng: -117.3755 },
  { city: 'Lexington', state: 'KY', lat: 38.0406, lng: -84.5037 },
  { city: 'St. Louis', state: 'MO', lat: 38.627, lng: -90.1994 },
  { city: 'Pittsburgh', state: 'PA', lat: 40.4406, lng: -79.9959 },
  { city: 'Anchorage', state: 'AK', lat: 61.2181, lng: -149.9003 },
  { city: 'Stockton', state: 'CA', lat: 37.9577, lng: -121.2908 },
  { city: 'Cincinnati', state: 'OH', lat: 39.1031, lng: -84.512 },
  { city: 'St. Paul', state: 'MN', lat: 44.9537, lng: -93.09 },
  { city: 'Greensboro', state: 'NC', lat: 36.0726, lng: -79.7919 },
  { city: 'Toledo', state: 'OH', lat: 41.6639, lng: -83.5552 },
  { city: 'Newark', state: 'NJ', lat: 40.7357, lng: -74.1724 },
  { city: 'Plano', state: 'TX', lat: 33.0198, lng: -96.6989 },
  { city: 'Henderson', state: 'NV', lat: 36.0395, lng: -114.9817 },
  { city: 'Orlando', state: 'FL', lat: 28.5383, lng: -81.3792 },
  { city: 'Chandler', state: 'AZ', lat: 33.3062, lng: -111.8413 },
  { city: 'Laredo', state: 'TX', lat: 27.5036, lng: -99.5076 },
  { city: 'Madison', state: 'WI', lat: 43.0731, lng: -89.4012 },
  { city: 'Durham', state: 'NC', lat: 35.994, lng: -78.8986 },
  { city: 'Lubbock', state: 'TX', lat: 33.5779, lng: -101.8552 },
  { city: 'Winston-Salem', state: 'NC', lat: 36.0999, lng: -80.2442 },
  { city: 'Garland', state: 'TX', lat: 32.9126, lng: -96.6389 },
  { city: 'Glendale', state: 'AZ', lat: 33.5386, lng: -112.1859 },
  { city: 'Hialeah', state: 'FL', lat: 25.8576, lng: -80.2781 },
  { city: 'Reno', state: 'NV', lat: 39.5296, lng: -119.8138 },
  { city: 'Baton Rouge', state: 'LA', lat: 30.4515, lng: -91.1871 },
  { city: 'Irvine', state: 'CA', lat: 33.6839, lng: -117.7947 },
  { city: 'Chesapeake', state: 'VA', lat: 36.7682, lng: -76.2875 },
  { city: 'Irving', state: 'TX', lat: 32.814, lng: -96.9489 },
  { city: 'Scottsdale', state: 'AZ', lat: 33.4942, lng: -111.9261 },
  { city: 'North Las Vegas', state: 'NV', lat: 36.1989, lng: -115.1175 },
  { city: 'Fremont', state: 'CA', lat: 37.5483, lng: -121.9886 },
  { city: 'Gilbert', state: 'AZ', lat: 33.3528, lng: -111.789 },
  { city: 'San Bernardino', state: 'CA', lat: 34.1083, lng: -117.2898 },
  { city: 'Birmingham', state: 'AL', lat: 33.5186, lng: -86.8104 },
  { city: 'Rochester', state: 'NY', lat: 43.1566, lng: -77.6088 },
  { city: 'Richmond', state: 'VA', lat: 37.5407, lng: -77.436 },
  { city: 'Spokane', state: 'WA', lat: 47.6588, lng: -117.426 },
  { city: 'Des Moines', state: 'IA', lat: 41.5868, lng: -93.625 },
  { city: 'Montgomery', state: 'AL', lat: 32.3668, lng: -86.3 },
  { city: 'Modesto', state: 'CA', lat: 37.6391, lng: -120.9969 },
  { city: 'Fayetteville', state: 'NC', lat: 35.0527, lng: -78.8784 },
  { city: 'Tacoma', state: 'WA', lat: 47.2529, lng: -122.4443 },
  { city: 'Akron', state: 'OH', lat: 41.0814, lng: -81.519 },
  { city: 'Yonkers', state: 'NY', lat: 40.9312, lng: -73.8988 },
  { city: 'Little Rock', state: 'AR', lat: 34.7465, lng: -92.2896 },
  { city: 'Aurora', state: 'IL', lat: 41.7606, lng: -88.3201 },
  { city: 'Glendale', state: 'CA', lat: 34.1425, lng: -118.2551 },
  { city: 'Huntington Beach', state: 'CA', lat: 33.6603, lng: -117.9992 },
  { city: 'Columbus', state: 'GA', lat: 32.4610, lng: -84.9877 },
  { city: 'Amarillo', state: 'TX', lat: 35.222, lng: -101.8313 },
  { city: 'Grand Rapids', state: 'MI', lat: 42.9634, lng: -85.6681 },
  { city: 'Overland Park', state: 'KS', lat: 38.9822, lng: -94.6708 },
  { city: 'Tallahassee', state: 'FL', lat: 30.4518, lng: -84.2807 },
  { city: 'Cape Coral', state: 'FL', lat: 26.5629, lng: -81.9495 },
  { city: 'Knoxville', state: 'TN', lat: 35.9606, lng: -83.9207 },
  { city: 'Providence', state: 'RI', lat: 41.824, lng: -71.4128 },
  { city: 'Brownsville', state: 'TX', lat: 25.9017, lng: -97.4975 },
  { city: 'Tempe', state: 'AZ', lat: 33.4255, lng: -111.9400 },
  { city: 'Newport News', state: 'VA', lat: 37.0871, lng: -76.4730 },
  { city: 'Santa Clarita', state: 'CA', lat: 34.3917, lng: -118.5426 },
  { city: 'Garden Grove', state: 'CA', lat: 33.7743, lng: -117.9378 },
  { city: 'Oceanside', state: 'CA', lat: 33.1959, lng: -117.3795 },
  { city: 'Fort Lauderdale', state: 'FL', lat: 26.1224, lng: -80.1373 },
  { city: 'Rancho Cucamonga', state: 'CA', lat: 34.1064, lng: -117.5931 },
  { city: 'Santa Rosa', state: 'CA', lat: 38.4404, lng: -122.7141 },
  { city: 'Port Arthur', state: 'TX', lat: 29.8849, lng: -93.9399 },
  { city: 'Chattanooga', state: 'TN', lat: 35.0456, lng: -85.3097 },
  { city: 'Tempe', state: 'AZ', lat: 33.4255, lng: -111.9400 },
  { city: 'Salt Lake City', state: 'UT', lat: 40.7608, lng: -111.891 },
  { city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  { city: 'Portland', state: 'OR', lat: 45.5051, lng: -122.675 },
]

const FIRST_NAMES = [
  'Sarah', 'Jennifer', 'Emily', 'Jessica', 'Ashley', 'Amanda', 'Megan', 'Rachel',
  'Lauren', 'Stephanie', 'Rebecca', 'Christina', 'Nicole', 'Michelle', 'Patricia',
  'Katherine', 'Elizabeth', 'Melissa', 'Diana', 'Alicia', 'Maria', 'Priya', 'Zoe',
  'Aisha', 'Lily', 'Grace', 'Claire', 'Hannah', 'Natalie', 'Brittany',
]

const LAST_NAMES = [
  'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia',
  'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall',
  'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez',
]

const CREDENTIALS_OPTIONS = [
  ['IBCLC'],
  ['IBCLC', 'RN'],
  ['IBCLC', 'RN', 'APRN'],
  ['IBCLC', 'CLC'],
  ['IBCLC', 'LCSW'],
  ['IBCLC', 'OTR/L'],
  ['IBCLC', 'CNM'],
  ['IBCLC', 'RD'],
]

const SPECIALTIES_POOL = [
  'Tongue Tie / Frenotomy Aftercare',
  'NICU / Premature Infants',
  'Twins / Multiples',
  'Low Milk Supply',
  'Pumping / Exclusive Pumping',
  'Returning to Work',
  'Adoptive / Induced Lactation',
  'Prenatal Consultation',
  'Oversupply / Engorgement',
  'Weaning',
]

const INSURANCE_POOL = [
  'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare',
  'Tricare', 'Medicaid', 'Humana', 'Self-pay',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function generateListings() {
  const listings = []
  const slugsSeen = new Set<string>()

  for (const city of TOP_CITIES) {
    const listingsPerCity = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < listingsPerCity; i++) {
      const firstName = pick(FIRST_NAMES)
      const lastName = pick(LAST_NAMES)
      const name = `${firstName} ${lastName}`
      const credentials = pick(CREDENTIALS_OPTIONS)

      const baseSlug = slugify(`${name}-ibclc-${city.city}-${city.state}`)
      let slug = baseSlug
      let counter = 1
      while (slugsSeen.has(slug)) {
        slug = `${baseSlug}-${counter++}`
      }
      slugsSeen.add(slug)

      const specialtyCount = Math.floor(Math.random() * 4)
      const insuranceCount = Math.floor(Math.random() * 4) + 1
      const telehealth = Math.random() > 0.3
      const hasHomeVisit = Math.random() > 0.5

      const visitTypes: string[] = ['office']
      if (hasHomeVisit) visitTypes.push('home')
      if (telehealth) visitTypes.push('virtual')

      listings.push({
        slug,
        name,
        credentials,
        city: city.city,
        state: city.state,
        zip: null,
        lat: city.lat + (Math.random() - 0.5) * 0.1,
        lng: city.lng + (Math.random() - 0.5) * 0.1,
        telehealth,
        accepting_new_clients: Math.random() > 0.2,
        visit_types: visitTypes,
        insurance_accepted: pickN(INSURANCE_POOL, insuranceCount),
        specialties: pickN(SPECIALTIES_POOL, specialtyCount),
        languages: ['English'],
        plan_tier: 'free',
        status: 'active',
        claimed: false,
        credential_verified: false,
      })
    }
  }

  return listings
}

async function seed() {
  console.log('Seeding IBCLCDirectory.com...')

  const listings = generateListings()
  console.log(`Generated ${listings.length} sample listings across ${TOP_CITIES.length} cities`)

  const batchSize = 50
  let inserted = 0

  for (let i = 0; i < listings.length; i += batchSize) {
    const batch = listings.slice(i, i + batchSize)
    const { error } = await supabase.from('ibclc_listings').upsert(batch, { onConflict: 'slug' })

    if (error) {
      console.error('Batch error:', error)
    } else {
      inserted += batch.length
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${listings.length}`)
    }
  }

  // Seed cities table
  console.log('Updating city listing counts...')
  for (const city of TOP_CITIES) {
    const citySlug = `${slugify(city.city)}-${city.state.toLowerCase()}`
    const { count } = await supabase
      .from('ibclc_listings')
      .select('id', { count: 'exact', head: true })
      .eq('city', city.city)
      .eq('state', city.state)
      .eq('status', 'active')

    await supabase.from('ibclc_cities').upsert({
      city: city.city,
      state: city.state,
      slug: citySlug,
      latitude: city.lat,
      longitude: city.lng,
      listing_count: count ?? 0,
      active: true,
    }, { onConflict: 'slug' })
  }

  console.log(`Done. Seeded ${inserted} listings across ${TOP_CITIES.length} cities.`)
  console.log(`\nNext steps:`)
  console.log(`1. Run the data-seeder agent for real IBCLC data from DataForSEO SERP`)
  console.log(`2. Deploy to Vercel and submit sitemap to Google Search Console`)
  console.log(`3. Launch claim email campaign`)
}

seed().catch(console.error)
