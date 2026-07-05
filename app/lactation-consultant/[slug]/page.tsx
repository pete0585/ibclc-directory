import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListingBySlug } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import ListingDetail from '@/components/ListingDetail'
import { ViewTracker } from '@/components/ViewTracker'
import { stateAbbreviationToName } from '@/lib/utils'


export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    return { title: 'Lactation Consultant Not Found' }
  }

  const title = `${listing.name} — Lactation Consultant in ${listing.city}, ${listing.state}`
  const description = listing.bio
    ? `${listing.bio.slice(0, 155).trim()}…`
    : `Find ${listing.name}, lactation consultant in ${listing.city}, ${stateAbbreviationToName(listing.state)}. ${listing.telehealth ? 'Telehealth available. ' : ''}${listing.accepting_new_clients ? 'Accepting new clients.' : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: listing.photo_url
        ? [{ url: listing.photo_url, alt: listing.name }]
        : undefined,
    },
  }
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    notFound()
  }

  const supabase = await createClient()
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const { count: viewCount } = await supabase
    .from('listing_views')
    .select('*', { count: 'exact', head: true })
    .eq('directory_slug', 'ibclc')
    .eq('listing_id', String(listing.id))
    .gte('viewed_at', monthStart)
  const monthlyViews = viewCount ?? 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness'],
    name: listing.name,
    description: listing.bio ?? undefined,
    image: listing.photo_url ?? undefined,
    telephone: listing.phone ?? undefined,
    url: listing.website ?? undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip ?? undefined,
      addressCountry: 'US',
    },
    ...(listing.lat && listing.lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: listing.lat,
            longitude: listing.lng,
          },
        }
      : {}),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'IBCLC',
      name: 'International Board Certified Lactation Consultant',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Find a Lactation Consultant', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${listing.city}, ${listing.state}`,
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/${listing.state.toLowerCase()}/${listing.city.toLowerCase().replace(/\s+/g, '-')}-${listing.state.toLowerCase()}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: listing.name,
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/lactation-consultant/${listing.slug}`,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker listingId={String(listing.id)} directorySlug='ibclc' />
      <ListingDetail listing={listing} monthlyViews={monthlyViews} />
    </>
  )
}
