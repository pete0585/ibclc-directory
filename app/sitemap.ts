import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { US_STATES } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lactationconsultantdirectory.com'

export const revalidate = 3600

// Static page slug registry — update when seo-content agent adds new pages to the repo
const BEST_OF_SLUGS = [
  'ibclcs-in-atlanta-ga', 'ibclcs-in-austin-tx', 'ibclcs-in-chicago-il', 'ibclcs-in-columbus-oh',
  'ibclcs-in-denver-co', 'ibclcs-in-houston-tx', 'ibclcs-in-indianapolis-in', 'ibclcs-in-kansas-city-mo',
  'ibclcs-in-las-vegas-nv', 'ibclcs-in-los-angeles-ca', 'ibclcs-in-louisville-ky', 'ibclcs-in-miami-fl',
  'ibclcs-in-minneapolis-mn', 'ibclcs-in-nashville-tn', 'ibclcs-in-new-york-ny', 'ibclcs-in-philadelphia-pa',
  'ibclcs-in-phoenix-az', 'ibclcs-in-portland-or', 'ibclcs-in-raleigh-nc', 'ibclcs-in-richmond-va',
  'ibclcs-in-san-antonio-tx', 'ibclcs-in-san-diego-ca', 'ibclcs-in-seattle-wa', 'ibclcs-in-st-louis-mo',
  'ibclcs-in-tampa-fl', 'lactation-consultants-in-charlotte-nc', 'lactation-consultants-in-denver-co',
  'lactation-consultants-in-minneapolis-mn', 'lactation-consultants-in-nashville-tn',
  'lactation-consultants-in-richmond-va', 'lactation-consultants-in-salt-lake-city-ut',
]

const SPECIALTY_SLUGS = [
  'bottle-refusal', 'insurance', 'low-milk-supply', 'mastitis-prevention', 'nicu-lactation-support',
  'nicu-support', 'prenatal', 'pumping', 'relactation', 'solid-food-introduction',
  'tongue-tie-ibclc', 'tongue-tie', 'twins-and-multiples', 'weaning',
]

const RESOURCE_SLUGS = [
  'breastfeeding-at-work-rights-and-tips', 'breastfeeding-in-public-rights', 'does-insurance-cover-lactation',
  'first-ibclc-visit', 'home-visit-vs-telehealth', 'how-to-choose-an-ibclc',
  'newborn-weight-loss-when-to-call-ibclc', 'pumping-schedule-guide', 'questions-to-ask-your-ibclc',
  'what-is-an-ibclc', 'working-with-ibclc-postpartum',
]

const GUIDE_SLUGS = [
  'does-insurance-cover-lactation-consultant', 'how-much-does-a-lactation-consultant-cost',
  'lactation-consultant-vs-breastfeeding-counselor', 'low-milk-supply-ibclc',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [listingsRes, citiesRes] = await Promise.all([
    supabase
      .from('ibclc_listings')
      .select('slug, updated_at')
      .eq('status', 'active')
      .eq('claimed', true)          // Only claimed listings in sitemap — unclaimed are noindexed
      .order('updated_at', { ascending: false }),
    supabase
      .from('ibclc_cities')
      .select('slug, state, updated_at')
      .eq('active', true)
      .gt('listing_count', 0),
  ])

  const listings = listingsRes.data ?? []
  const cities = citiesRes.data ?? []

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/states`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/cities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const statePages: MetadataRoute.Sitemap = US_STATES.map((s) => ({
    url: `${siteUrl}/find/${s.abbr.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${siteUrl}/find/${city.state.toLowerCase()}/${city.slug}`,
    lastModified: city.updated_at ? new Date(city.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // CANONICAL: /lactation-consultant/[slug] — NOT the /ibclc/ redirect URLs
  // Only claimed listings are indexed; unclaimed get robots: noindex on their page
  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${siteUrl}/lactation-consultant/${listing.slug}`,
    lastModified: listing.updated_at ? new Date(listing.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const bestOfPages: MetadataRoute.Sitemap = BEST_OF_SLUGS.map((slug) => ({
    url: `${siteUrl}/best/${slug}`,
    lastModified: new Date('2026-07-06'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const specialtyPages: MetadataRoute.Sitemap = SPECIALTY_SLUGS.map((slug) => ({
    url: `${siteUrl}/specialties/${slug}`,
    lastModified: new Date('2026-07-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const resourcePages: MetadataRoute.Sitemap = RESOURCE_SLUGS.map((slug) => ({
    url: `${siteUrl}/resources/${slug}`,
    lastModified: new Date('2026-07-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: new Date('2026-07-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...statePages,
    ...cityPages,
    ...listingPages,
    ...bestOfPages,
    ...specialtyPages,
    ...resourcePages,
    ...guidePages,
  ]
}
