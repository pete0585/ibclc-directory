import 'server-only'
import { createServiceClient } from './supabase/server'
import type { Listing, City } from '@/types'

// Only public profile fields may leave this server module. Never serialize billing,
// outreach, claim-token or administrative fields from the service-role connection.
const PUBLIC_LISTING_FIELDS = 'id,slug,name,credentials,bio,photo_url,phone,email,website,city,state,zip,lat,lng,accepting_new_clients,telehealth,visit_types,insurance_accepted,specialties,languages,plan_tier,credential_verified,claimed,claimed_at,status,created_at,updated_at' as const
function assertRead(error: { code?: string } | null) {
  if (error) {
    console.error('directory_read_failed', { code: error.code })
    throw new Error('Directory data could not be loaded. Please retry.')
  }
}
function publicListing(row: Record<string, unknown>): Listing {
  return Object.fromEntries(PUBLIC_LISTING_FIELDS.split(',').map(key => [key, row[key]])) as unknown as Listing
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_listings')
    .select(PUBLIC_LISTING_FIELDS)
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()
  assertRead(error)
  return data ? publicListing(data) : null
}

export async function getListings({
  state,
  city,
  specialty,
  insurance,
  visitType,
  telehealth,
  acceptingNew,
  search,
  tier,
  page = 1,
  pageSize = 20,
}: {
  state?: string
  city?: string
  specialty?: string
  insurance?: string
  visitType?: string
  telehealth?: boolean
  acceptingNew?: boolean
  search?: string
  tier?: string
  page?: number
  pageSize?: number
}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createServiceClient()
  let query = supabase
    .from('ibclc_listings')
    .select(PUBLIC_LISTING_FIELDS, { count: 'exact' })
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: true })
    .order('name', { ascending: true })

  if (state) query = query.ilike('state', state)
  if (city) query = query.ilike('city', city)
  if (specialty) query = query.contains('specialties', [specialty])
  if (insurance) query = query.contains('insurance_accepted', [insurance])
  if (visitType) query = query.contains('visit_types', [visitType])
  if (telehealth === true) query = query.eq('telehealth', true)
  if (acceptingNew === true) query = query.eq('accepting_new_clients', true)
  if (search) query = query.textSearch('search_vector', search, { type: 'websearch' })
  if (tier) query = query.eq('plan_tier', tier)

  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1
  const safeSize = Number.isFinite(pageSize) ? Math.max(1, Math.min(100, Math.floor(pageSize))) : 20
  const from = (safePage - 1) * safeSize
  const to = from + safeSize - 1
  query = query.range(from, to)

  const { data, count, error } = await query
  assertRead(error)
  return { listings: (data ?? []).map(publicListing), total: count ?? 0 }
}

export async function getListingsNear({
  lat,
  lng,
  radius = 25,
  page = 1,
  pageSize = 20,
}: {
  lat: number
  lng: number
  radius?: number
  page?: number
  pageSize?: number
}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase.rpc('find_ibclc_near', {
    search_lat: lat,
    search_lng: lng,
    radius_miles: radius,
  })
  assertRead(error)
  const all = ((data ?? []) as Record<string, unknown>[]).filter(row => row.status === 'active').map(publicListing)
  const from = (page - 1) * pageSize
  return { listings: all.slice(from, from + pageSize), total: all.length }
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_listings')
    .select(PUBLIC_LISTING_FIELDS)
    .eq('status', 'active')
    .order('name', { ascending: true })
    .limit(limit)
  assertRead(error)
  return (data ?? []).map(publicListing)
}

export async function getCityPage(citySlug: string): Promise<City | null> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_cities')
    .select('*')
    .eq('slug', citySlug)
    .eq('active', true)
    .maybeSingle()
  assertRead(error)
  return data
}

export async function getCitiesByState(stateAbbr: string): Promise<City[]> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_cities')
    .select('*')
    .ilike('state', stateAbbr)
    .eq('active', true)
    .gt('listing_count', 0)
    .order('listing_count', { ascending: false })
  assertRead(error)
  return data ?? []
}

export async function getListingsByCity(city: string, state: string, limit = 20): Promise<Listing[]> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_listings')
    .select(PUBLIC_LISTING_FIELDS)
    .ilike('city', city)
    .ilike('state', state)
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: true })
    .limit(limit)
  assertRead(error)
  return (data ?? []).map(publicListing)
}

export async function getActiveCities(limit = 150): Promise<City[]> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_cities')
    .select('*')
    .eq('active', true)
    .gt('listing_count', 0)
    .order('listing_count', { ascending: false })
    .limit(limit)
  assertRead(error)
  return data ?? []
}

export async function getTotalListingCount(): Promise<number> {
  const supabase = await createServiceClient()
  const { count, error } = await supabase
    .from('ibclc_listings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'active')
  assertRead(error)
  if (count === null) throw new Error('Directory count was not returned.')
  return count
}

export async function getActiveStates(): Promise<string[]> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('ibclc_listings')
    .select('state')
    .eq('status', 'active')
  assertRead(error)
  const states = Array.from(new Set((data ?? []).map((r: { state: string }) => r.state))).sort()
  return states
}
