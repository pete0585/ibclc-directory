import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { City } from '@/types'

export const metadata: Metadata = {
  title: 'Browse IBCLCs by City | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in your city. Browse every city in our directory and connect with an IBCLC near you.',
}

interface CityGroup {
  state: string
  cities: City[]
}

export default async function CitiesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_cities')
    .select('*')
    .eq('active', true)
    .gt('listing_count', 0)
    .order('state', { ascending: true })
    .order('city', { ascending: true })

  const cities: City[] = data ?? []

  const grouped: CityGroup[] = Object.entries(
    cities.reduce<Record<string, City[]>>((acc, city) => {
      const state = city.state.toUpperCase()
      if (!acc[state]) acc[state] = []
      acc[state].push(city)
      return acc
    }, {}),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([state, stateCities]) => ({ state, cities: stateCities }))

  const totalCities = cities.length

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sage-500 mb-3">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">All Cities</span>
        </div>
        <h1 className="section-heading">Browse IBCLCs by City</h1>
        <p className="section-subheading max-w-xl">
          {totalCities > 0
            ? `${totalCities.toLocaleString()} cities with board-certified lactation consultants near you.`
            : 'Find board-certified lactation consultants in your city.'}
        </p>
      </div>

      {/* State groups */}
      <div className="space-y-12">
        {grouped.map(({ state, cities: stateCities }) => (
          <section key={state}>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">{state}</h2>
              <span className="badge text-charcoal-400">
                {stateCities.length} {stateCities.length === 1 ? 'city' : 'cities'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {stateCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/find/${state.toLowerCase()}/${city.slug}`}
                  className="rounded-xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow group"
                >
                  <p className="text-sm font-semibold text-charcoal-700 group-hover:text-sage-500 transition-colors">
                    {city.city}, {city.state}
                  </p>
                  <p className="text-xs text-charcoal-400 mt-0.5">
                    {city.listing_count} IBCLC{city.listing_count !== 1 ? 's' : ''}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {grouped.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-charcoal-500">No cities found. Check back soon as we expand our directory.</p>
        </div>
      )}
    </div>
  )
}
