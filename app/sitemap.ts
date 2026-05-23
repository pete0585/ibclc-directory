import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { US_STATES } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ibclcdirectory.com'

export const revalidate = 3600 // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [listingsRes, citiesRes] = await Promise.all([
    supabase
      .from('listings')
      .select('slug, updated_at')
      .eq('status', 'active')
      .order('updated_at', { ascending: false }),
    supabase
      .from('cities')
      .select('slug, state, updated_at')
      .eq('active', true)
      .gt('listing_count', 0),
  ])

  const listings = listingsRes.data ?? []
  const cities = citiesRes.data ?? []

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/resources/what-is-an-ibclc`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
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

  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${siteUrl}/ibclc/${listing.slug}`,
    lastModified: listing.updated_at ? new Date(listing.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...statePages, ...cityPages, ...listingPages]
}
