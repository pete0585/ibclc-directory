import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in San Diego, CA | IBCLCDirectory.com',
  description:
    'Find the best lactation consultants in San Diego, California. Verified IBCLCs serving San Diego County — home visits, telehealth, and most insurance accepted.',
  openGraph: {
    title: 'Best IBCLCs in San Diego, CA',
    description: 'Find top-rated IBCLCs in San Diego. Home visits, telehealth, and insurance accepted.',
  },
}

async function getSanDiegoListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'San Diego')
    .eq('state', 'CA')
    .order('plan_tier', { ascending: false })
    .limit(14)
  return data ?? []
}

export default async function BestIbclcsSanDiegoPage() {
  const listings = await getSanDiegoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in San Diego?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com has ${listings.length}+ IBCLCs listed in San Diego, California. San Diego County has a strong network of lactation consultants serving families from North County to Chula Vista.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Does Tricare cover a lactation consultant in San Diego?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — San Diego has a large military community and many IBCLCs here accept Tricare. Tricare covers IBCLC services both in-network and out-of-network for military families. Filter by "Tricare" when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'What areas of San Diego County do IBCLCs serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IBCLCs in San Diego serve the full county — North County (Carlsbad, Oceanside, Escondido), East County (El Cajon, Santee), South County (Chula Vista, National City), and all central neighborhoods. Many also offer telehealth for the full county.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/find/ca" className="hover:text-charcoal-700">California</Link>
          <span>/</span>
          <span className="text-charcoal-600">San Diego</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">San Diego, CA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in San Diego, CA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            San Diego has one of California's strongest networks of private practice IBCLCs — with particular
            depth in military family support (Tricare accepted), home visits throughout the county, and telehealth
            for families anywhere in San Diego County.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>Tricare accepted</span>
            <span>·</span>
            <span>Home visits county-wide</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in San Diego, CA
              </h2>
              <Link
                href="/listings?city=San+Diego&state=CA"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                See all results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing: any) => (
                <Link
                  key={listing.id}
                  href={`/ibclc/${listing.slug}`}
                  className="card p-5 hover:shadow-card transition-shadow group"
                >
                  <p className="font-semibold text-charcoal-800 group-hover:text-sage-600 transition-colors">
                    {listing.name}
                  </p>
                  <p className="text-sm text-charcoal-400 mt-1">{listing.city}, {listing.state}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {listing.telehealth && (
                      <span className="text-xs font-medium text-sage-600 bg-sage-50 rounded-full px-2 py-0.5">
                        Telehealth
                      </span>
                    )}
                    {listing.plan_tier === 'verified' && (
                      <span className="text-xs font-medium text-rose-600 bg-rose-50 rounded-full px-2 py-0.5">
                        Verified IBCLC
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-charcoal-500 mb-4">
              Search for IBCLCs in San Diego below — new listings added regularly.
            </p>
            <Link href="/listings?city=San+Diego&state=CA" className="btn-primary inline-flex items-center gap-2">
              Search San Diego IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in San Diego, CA
          </h2>
          {[
            {
              q: 'Does Tricare cover a lactation consultant in San Diego?',
              a: "Yes. San Diego's large military community is well-served by Tricare-accepting IBCLCs. Tricare covers lactation support services in-network and out-of-network. Filter by \"Tricare\" in the insurance search to find authorized providers near you.",
            },
            {
              q: 'Do San Diego IBCLCs make home visits?',
              a: 'Many San Diego IBCLCs offer home visits throughout the county — North County (Carlsbad, Vista), East County, South County (Chula Vista), and all central neighborhoods. Home visits are ideal in the first week postpartum when travel is difficult.',
            },
            {
              q: 'What does a lactation consultation cost in San Diego without insurance?',
              a: 'In San Diego, private IBCLC rates typically run $150–$300+ for an initial home visit and $100–$200 for a telehealth session. However, most insurance plans cover IBCLC visits under the ACA preventive services mandate — meaning no cost to you. Always check coverage before paying out of pocket.',
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in California</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/find/ca/los-angeles-ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Los Angeles →</Link>
            <Link href="/find/ca/san-jose-ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in San Jose →</Link>
            <Link href="/find/ca/sacramento-ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Sacramento →</Link>
            <Link href="/find/ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All California IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
