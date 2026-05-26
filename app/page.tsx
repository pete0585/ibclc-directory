import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, ShieldCheck, Search, Star, ArrowRight, Video, Home, CheckCircle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getActiveCities, getTotalListingCount } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find an IBCLC Near You | IBCLCDirectory.com',
  description:
    'Find a board-certified IBCLC (lactation consultant) near you. Search by city, insurance, or specialty. Free to search. Real support for breastfeeding families.',
}

const TOP_CITIES = [
  { name: 'New York', state: 'NY', slug: 'new-york-ny' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca' },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il' },
  { name: 'Houston', state: 'TX', slug: 'houston-tx' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az' },
  { name: 'Austin', state: 'TX', slug: 'austin-tx' },
  { name: 'Denver', state: 'CO', slug: 'denver-co' },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa' },
  { name: 'Miami', state: 'FL', slug: 'miami-fl' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga' },
  { name: 'Boston', state: 'MA', slug: 'boston-ma' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca' },
]

const SPECIALTY_HIGHLIGHTS = [
  { label: 'Tongue Tie', href: '/listings?specialty=Tongue+Tie+%2F+Frenotomy+Aftercare', emoji: '👅' },
  { label: 'NICU Graduates', href: '/listings?specialty=NICU+%2F+Premature+Infants', emoji: '🏥' },
  { label: 'Twins & Multiples', href: '/listings?specialty=Twins+%2F+Multiples', emoji: '👶' },
  { label: 'Low Milk Supply', href: '/listings?specialty=Low+Milk+Supply', emoji: '🍼' },
  { label: 'Pumping & Returning to Work', href: '/listings?specialty=Pumping+%2F+Exclusive+Pumping', emoji: '⏰' },
  { label: 'Telehealth IBCLCs', href: '/listings?telehealth=true', emoji: '💻' },
]

export default async function HomePage() {
  const [featured, listingCount] = await Promise.all([
    getFeaturedListings(6).catch(() => []),
    getTotalListingCount().catch(() => 0),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-ivory pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-4 py-2 text-sm text-rose-500 mb-6">
            <Heart className="h-4 w-4 fill-rose-300 text-rose-300" />
            <span>{listingCount.toLocaleString()} board-certified IBCLCs in the US</span>
          </div>

          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl md:text-6xl text-balance">
            Find the breastfeeding support{' '}
            <span className="text-sage-400">you deserve</span>
          </h1>

          <p className="mt-5 text-lg text-charcoal-500 max-w-2xl mx-auto leading-relaxed">
            You shouldn't have to figure this out alone at 2am. Find a board-certified lactation
            consultant who specializes in exactly what you're going through.
          </p>

          <div className="mt-8 flex justify-center">
            <SearchBar size="large" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-400">
            <span className="flex items-center gap-1.5">
              <Video className="h-4 w-4 text-sage-400" />
              Telehealth available
            </span>
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4 text-sage-400" />
              Home visits
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-sage-400" />
              Insurance accepted
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-rose-400" />
              Verified credentials
            </span>
          </div>
        </div>
      </section>

      {/* What makes an IBCLC different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 mx-auto mb-4">
                <ShieldCheck className="h-7 w-7 text-sage-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-700 mb-2">
                Board-Certified
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                IBCLCs hold the gold-standard credential in lactation — passing a rigorous international
                board exam with 90+ hours of supervised clinical training.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 mx-auto mb-4">
                <Heart className="h-7 w-7 text-rose-400 fill-rose-200" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-700 mb-2">
                Built for Families
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                Unlike hospital-based LCs, private IBCLCs have time to sit with you, understand your
                situation, and create a real plan — not a 10-minute discharge visit.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ivory-200 mx-auto mb-4">
                <Search className="h-7 w-7 text-charcoal-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-700 mb-2">
                Free to Search
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                No sign-up required. No association membership gate. Search, filter by insurance and
                specialty, and find someone who can actually help — for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by specialty */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ivory-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-heading">What brings you here?</h2>
            <p className="section-subheading">
              Find an IBCLC who specializes in your specific situation.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SPECIALTY_HIGHLIGHTS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-soft hover:shadow-card transition-shadow group"
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-xs font-semibold text-charcoal-600 group-hover:text-sage-500 transition-colors leading-tight">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="section-heading">Featured IBCLCs</h2>
                <p className="section-subheading">Verified, experienced, and ready to help.</p>
              </div>
              <Link
                href="/listings"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/listings" className="btn-secondary">
                View all IBCLCs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Browse by city */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ivory-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-heading">Search by City</h2>
            <p className="section-subheading">IBCLCs serving families across the country.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/find/${city.state.toLowerCase()}/${city.slug}`}
                className="rounded-xl bg-white px-3 py-3 text-center shadow-soft hover:shadow-card transition-shadow group"
              >
                <p className="text-sm font-semibold text-charcoal-700 group-hover:text-sage-500 transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-charcoal-400 mt-0.5">{city.state}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/cities" className="btn-secondary">
              Browse all cities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* For IBCLCs CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sage-300">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Are you an IBCLC in private practice?
          </h2>
          <p className="text-sage-50 text-lg mb-8 leading-relaxed">
            Get a free listing on the only nationwide directory built specifically for IBCLCs.
            Pro listings start at $79/year — one new client pays for it twice over.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
            >
              Get Listed Free
            </Link>
            <Link
              href="/submit#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-base font-semibold text-white hover:border-white transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 px-4 bg-white border-t border-ivory-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-charcoal-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-sage-400" />
              Free to search, always
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-rose-400" />
              Credential-verified listings
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-sage-400" />
              IBCLCs only — no uncredentialed LCs
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
