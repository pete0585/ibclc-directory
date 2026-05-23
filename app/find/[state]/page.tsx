import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getCitiesByState, getListings } from '@/lib/data'
import { stateAbbreviationToName } from '@/lib/utils'
import { US_STATES } from '@/types'

interface Props {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const stateUpper = state.toUpperCase()
  const stateName = stateAbbreviationToName(stateUpper)

  return {
    title: `Find an IBCLC in ${stateName}`,
    description: `Find board-certified lactation consultants (IBCLCs) in ${stateName}. Search by city, filter by insurance accepted, home visits, or telehealth. Real breastfeeding support near you.`,
    openGraph: {
      title: `IBCLCs in ${stateName} | IBCLCDirectory.com`,
      description: `Find a lactation consultant in ${stateName} who takes your insurance and offers home or telehealth visits.`,
    },
  }
}

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.abbr.toLowerCase() }))
}

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const stateUpper = state.toUpperCase()
  const validState = US_STATES.find((s) => s.abbr === stateUpper)
  if (!validState) notFound()

  const [cities, { listings }] = await Promise.all([
    getCitiesByState(stateUpper),
    getListings({ state: stateUpper, pageSize: 8 }),
  ])

  const stateName = stateAbbreviationToName(stateUpper)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: stateName, item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/${state}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-700">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">{stateName}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">{stateName}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in {stateName}
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-xl">
            Board-certified lactation consultants in {stateName} who offer home visits, in-office
            appointments, and telehealth. Many accept insurance.
          </p>
          <Link href={`/listings?state=${stateUpper}`} className="btn-primary mt-5 inline-flex">
            Search All IBCLCs in {stateName} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cities grid */}
        {cities.length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-6">
              Browse by City in {stateName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/find/${state}/${city.slug}`}
                  className="rounded-xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow group"
                >
                  <p className="text-sm font-semibold text-charcoal-700 group-hover:text-sage-500 transition-colors">
                    {city.city}
                  </p>
                  {city.listing_count > 0 && (
                    <p className="text-xs text-charcoal-400 mt-0.5">
                      {city.listing_count} IBCLC{city.listing_count !== 1 ? 's' : ''}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent listings */}
        {listings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in {stateName}
              </h2>
              <Link
                href={`/listings?state=${stateUpper}`}
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
