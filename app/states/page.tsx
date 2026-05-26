import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { stateAbbreviationToName } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Browse IBCLCs by State | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants (IBCLCs) in your state. Browse every state in our nationwide directory and connect with a certified IBCLC near you.',
  openGraph: {
    title: 'Browse IBCLCs by State | IBCLCDirectory.com',
    description:
      'Find board-certified lactation consultants by state. Every state. Every city. Free to search.',
  },
}

interface StateRow {
  state: string
  listing_count: number
}

export default async function StatesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_cities')
    .select('state, listing_count')
    .eq('active', true)
    .gt('listing_count', 0)

  const cities: StateRow[] = data ?? []

  // Aggregate listing counts by state abbreviation
  const stateMap = new Map<string, number>()
  for (const row of cities) {
    const abbr = row.state.toUpperCase()
    stateMap.set(abbr, (stateMap.get(abbr) ?? 0) + row.listing_count)
  }

  const states = Array.from(stateMap.entries())
    .map(([abbr, count]) => ({ abbr, name: stateAbbreviationToName(abbr), count }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const totalListings = states.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
        <Link href="/" className="hover:text-charcoal-700">Home</Link>
        <span>/</span>
        <span className="text-charcoal-600">Browse by State</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sage-500 mb-3">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">All States</span>
        </div>
        <h1 className="section-heading">Browse IBCLCs by State</h1>
        <p className="section-subheading max-w-xl">
          {states.length > 0
            ? `${totalListings.toLocaleString()} board-certified lactation consultants across ${states.length} states.`
            : 'Find board-certified lactation consultants in your state.'}
        </p>
      </div>

      {/* States grid */}
      {states.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {states.map(({ abbr, name, count }) => (
            <Link
              key={abbr}
              href={`/find/${abbr.toLowerCase()}`}
              className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-soft hover:shadow-card transition-shadow group"
            >
              <div>
                <p className="text-sm font-semibold text-charcoal-700 group-hover:text-sage-500 transition-colors">
                  {name}
                </p>
                <p className="text-xs text-charcoal-400 mt-0.5">
                  {count.toLocaleString()} IBCLC{count !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-charcoal-300">{abbr}</span>
                <ArrowRight className="h-4 w-4 text-charcoal-300 group-hover:text-sage-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-charcoal-500">No states found. Check back soon as we expand our directory.</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-3xl bg-gradient-ivory p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-2">
          Can&apos;t find your city?
        </h2>
        <p className="text-charcoal-500 mb-6 max-w-md mx-auto">
          Try browsing all IBCLCs or use the search bar to find support near you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/listings" className="btn-primary">
            Search All IBCLCs
          </Link>
          <Link href="/cities" className="btn-secondary">
            Browse by City
          </Link>
        </div>
      </div>
    </div>
  )
}
