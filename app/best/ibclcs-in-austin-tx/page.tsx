import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-austin-tx' },
  title: 'Best IBCLCs in Austin, TX | IBCLCDirectory.com',
  description:
    'Find the best lactation consultants in Austin, Texas. Verified IBCLCs in Austin who offer home visits, telehealth, and accept most insurance. 12+ listed in the Austin metro.',
  openGraph: {
    title: 'Best IBCLCs in Austin, TX',
    description: 'Find top-rated, verified IBCLCs in Austin, Texas. Home visits, telehealth, and insurance accepted.',
  },
}

async function getAustinListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Austin')
    .eq('state', 'TX')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsAustinPage() {
  const listings = await getAustinListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Texas', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tx` },
      { '@type': 'ListItem', position: 4, name: 'Austin', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tx/austin-tx` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Austin, TX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com has ${listings.length}+ listed IBCLCs in Austin, Texas. The Austin metro area has a strong community of lactation consultants serving Central Texas families.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Austin IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many IBCLCs in Austin accept insurance including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Tricare. Under the ACA, most insurance plans are required to cover lactation support without cost-sharing. Filter by insurance when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Austin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — multiple IBCLCs in Austin offer home visits throughout the Austin metro, including Round Rock, Cedar Park, Pflugerville, and the surrounding areas. Filter by "home visit" when searching.',
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
          <Link href="/find/tx" className="hover:text-charcoal-700">Texas</Link>
          <span>/</span>
          <span className="text-charcoal-600">Austin</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Austin, TX</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Austin, TX
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Austin's breastfeeding community is well-served by experienced IBCLCs across the metro — from South
            Austin and Mueller to Cedar Park and Round Rock. Find one who fits your schedule, your insurance,
            and your situation.
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
                IBCLCs in Austin, TX
              </h2>
              <Link
                href="/listings?city=Austin&state=TX"
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
              Search for IBCLCs in Austin below — new listings added regularly.
            </p>
            <Link href="/listings?city=Austin&state=TX" className="btn-primary inline-flex items-center gap-2">
              Search Austin IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Austin, TX
          </h2>
          {[
            {
              q: 'How do I find an IBCLC in Austin who accepts my insurance?',
              a: 'Search the directory and filter by insurance plan. Many Austin IBCLCs accept Aetna, BCBS, Cigna, UHC, and Tricare. Under the ACA, most insurance plans cover IBCLC visits at no cost to you — no copay, no deductible.',
            },
            {
              q: 'Do Austin IBCLCs make home visits?',
              a: 'Yes. Several IBCLCs in Austin offer home visits throughout the metro, including Round Rock, Pflugerville, Cedar Park, and Buda. Home visits are ideal in the first 1–3 days home from the hospital when traveling is hard.',
            },
            {
              q: 'What is an IBCLC vs. a lactation consultant?',
              a: 'IBCLC is the only internationally recognized credential for lactation care. "Lactation consultant" is not a protected title — anyone can use it. IBCLCs complete 1,000+ clinical hours and pass a board exam. When your baby\'s feeding is struggling, choose an IBCLC.',
            },
            {
              q: 'Can I see an Austin IBCLC by telehealth?',
              a: 'Many Austin IBCLCs offer telehealth consultations — useful for supply concerns, pumping guidance, and prenatal prep. Telehealth also gives you access to IBCLCs beyond the Austin area if you need a specialist not available locally.',
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in Texas</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/find/tx/houston-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Houston →</Link>
            <Link href="/find/tx/dallas-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Dallas →</Link>
            <Link href="/find/tx/san-antonio-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in San Antonio →</Link>
            <Link href="/find/tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Texas IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
