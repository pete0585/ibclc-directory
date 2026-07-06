import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-tampa-fl' },
  title: 'Best IBCLCs in Tampa, FL | IBCLCDirectory.com',
  description:
    "Find the best lactation consultants in Tampa, Florida. Verified IBCLCs in Tampa who offer home visits, telehealth, and accept most insurance. 14+ listed in the Tampa Bay metro.",
  openGraph: {
    title: 'Best IBCLCs in Tampa, FL',
    description: "Find top-rated, verified IBCLCs in Tampa, Florida. Home visits, telehealth, and insurance accepted.",
  },
}

async function getTampaListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('city', 'Tampa')
    .eq('state', 'FL')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsTampaPage() {
  const listings = await getTampaListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Florida', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/fl` },
      { '@type': 'ListItem', position: 4, name: 'Tampa', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-tampa-fl` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Tampa, FL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com has ${listings.length}+ listed IBCLCs in Tampa, Florida. Tampa Bay is the largest metro in Florida for IBCLC access, with providers serving Hillsborough County, St. Petersburg, Clearwater, and the surrounding area.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Tampa IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many IBCLCs in Tampa accept insurance including Florida Blue (Blue Cross Blue Shield), Aetna, Cigna, UnitedHealthcare, and Florida Medicaid. Under the ACA, most insurance plans are required to cover lactation support without cost-sharing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Tampa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — multiple IBCLCs in Tampa offer home visits throughout Hillsborough County and into St. Petersburg, Clearwater, Brandon, and surrounding areas. Filter by "home visit" when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Tampa IBCLCs offer telehealth consultations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Tampa IBCLCs offer telehealth consultations for supply concerns, pumping guidance, and prenatal preparation. Telehealth is particularly useful in Tampa's summer heat when traveling with a newborn is difficult.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/find/fl" className="hover:text-charcoal-700">Florida</Link>
          <span>/</span>
          <span className="text-charcoal-600">Tampa</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Tampa, FL</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Tampa, FL
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Tampa Bay is the largest metro in Florida for IBCLC access, with providers serving
            Hillsborough County, St. Pete, Clearwater, Brandon, and the surrounding area. Whether
            you need a home visit, an office appointment near downtown Tampa, or a telehealth
            consultation, experienced IBCLCs are available across the greater Tampa Bay region.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>Home visits available</span>
            <span>·</span>
            <span>Telehealth options</span>
            <span>·</span>
            <span>Insurance accepted</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in Tampa, FL
              </h2>
              <Link
                href="/listings?city=Tampa&state=FL"
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
              Search for IBCLCs in Tampa below — new listings added regularly.
            </p>
            <Link href="/listings?city=Tampa&state=FL" className="btn-primary inline-flex items-center gap-2">
              Search Tampa IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Tampa, FL
          </h2>
          {[
            {
              q: 'How do I find an IBCLC in Tampa who accepts my insurance?',
              a: 'Search the directory and filter by insurance plan. Many Tampa IBCLCs accept Florida Blue, Aetna, Cigna, UHC, and Florida Medicaid. Under the ACA, most insurance plans cover IBCLC visits at no cost to you — no copay, no deductible.',
            },
            {
              q: 'Do Tampa IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in Tampa offer home visits throughout Hillsborough County and into St. Petersburg, Clearwater, and Brandon. Home visits are ideal in the first 1–3 days home from the hospital when traveling is hard.",
            },
            {
              q: 'What is an IBCLC vs. a lactation consultant?',
              a: "IBCLC is the only internationally recognized credential for lactation care. \"Lactation consultant\" is not a protected title — anyone can use it. IBCLCs complete 1,000+ clinical hours and pass a board exam. When your baby's feeding is struggling, choose an IBCLC.",
            },
            {
              q: 'Can I see a Tampa IBCLC by telehealth?',
              a: "Many Tampa IBCLCs offer telehealth consultations — useful for supply concerns, pumping guidance, and prenatal prep. Telehealth is especially helpful during Florida summers when traveling with a newborn in the heat and humidity is challenging.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in Florida</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/find/fl/orlando-fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Orlando →</Link>
            <Link href="/find/fl/jacksonville-fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Jacksonville →</Link>
            <Link href="/find/fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Florida IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
