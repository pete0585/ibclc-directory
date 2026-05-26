import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import FilterSidebar from '@/components/FilterSidebar'
import { getListings } from '@/lib/data'

interface SearchParams {
  q?: string
  location?: string
  state?: string
  city?: string
  specialty?: string
  insurance?: string
  visitType?: string
  telehealth?: string
  acceptingNew?: string
  tier?: string
  page?: string
}

interface Props {
  searchParams: Promise<SearchParams>
}

function parseLocation(location?: string): { city?: string; state?: string } {
  if (!location) return {}
  const loc = location.trim()
  const commaMatch = loc.match(/^(.+),\s*([A-Za-z]{2})$/)
  if (commaMatch) return { city: commaMatch[1].trim(), state: commaMatch[2].toUpperCase() }
  const spaceMatch = loc.match(/^(.+)\s+([A-Za-z]{2})$/)
  if (spaceMatch) return { city: spaceMatch[1].trim(), state: spaceMatch[2].toUpperCase() }
  if (/^[A-Za-z]{2}$/.test(loc)) return { state: loc.toUpperCase() }
  return { city: loc }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const parsed = parseLocation(params.location)
  const state = params.state ?? parsed.state
  const city = params.city ?? parsed.city
  const specialty = params.specialty

  let title = 'Find an IBCLC Near You'
  let description = 'Search the nationwide IBCLC directory. Filter by state, city, insurance, visit type, and specialty.'

  if (city && state) {
    title = `IBCLCs in ${city}, ${state}`
    description = `Find board-certified lactation consultants (IBCLCs) in ${city}, ${state}. Filter by insurance and specialty.`
  } else if (state) {
    title = `IBCLCs in ${state}`
    description = `Find board-certified lactation consultants (IBCLCs) in ${state}. Filter by city, insurance, and specialty.`
  } else if (specialty) {
    title = `IBCLCs specializing in ${specialty}`
  }

  return { title, description }
}

export default async function ListingsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1', 10)
  const parsed = parseLocation(params.location)
  const city = params.city ?? parsed.city
  const state = params.state ?? parsed.state

  const { listings, total } = await getListings({
    state,
    city,
    specialty: params.specialty,
    insurance: params.insurance,
    visitType: params.visitType,
    telehealth: params.telehealth === 'true' ? true : undefined,
    acceptingNew: params.acceptingNew === 'true' ? true : undefined,
    search: params.q,
    tier: params.tier,
    page,
    pageSize: 20,
  })

  const totalPages = Math.ceil(total / 20)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar defaultQuery={params.q} defaultLocation={params.location} />
      </div>

      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Suspense>
            <FilterSidebar />
          </Suspense>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-serif text-xl font-semibold text-charcoal-700">
              {total > 0 ? (
                <>
                  <span className="text-sage-500">{total.toLocaleString()}</span> IBCLC
                  {total !== 1 ? 's' : ''} found
                </>
              ) : (
                'No IBCLCs found'
              )}
            </h1>
          </div>

          {listings.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-charcoal-500 mb-4">
                {params.tier === 'verified'
                  ? 'No Verified IBCLCs found yet — check back as practitioners upgrade their listings.'
                  : params.tier === 'pro'
                  ? 'No Pro IBCLCs found yet — check back as practitioners upgrade their listings.'
                  : 'No IBCLCs found matching your search. Try adjusting your filters.'}
              </p>
              <Link href="/listings" className="btn-secondary text-sm">
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-charcoal-400">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
