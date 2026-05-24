import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Denver, CO | IBCLCDirectory.com',
  description:
    "Find the best lactation consultants in Denver, Colorado. Verified IBCLCs in Denver who offer home visits, telehealth, and accept most insurance. 9+ listed in the Denver metro.",
  openGraph: {
    title: 'Best IBCLCs in Denver, CO',
    description: "Find top-rated, verified IBCLCs in Denver, Colorado. Home visits, telehealth, and insurance accepted.",
  },
}

async function getDenverListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('city', 'Denver')
    .eq('state', 'CO')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsDenverPage() {
  const listings = await getDenverListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Colorado', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/co` },
      { '@type': 'ListItem', position: 4, name: 'Denver', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-denver-co` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Denver, CO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com has ${listings.length}+ listed IBCLCs in Denver, Colorado. The Denver metro area has a strong community of lactation consultants serving families across the Front Range.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Denver IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many IBCLCs in Denver accept insurance including Aetna, Blue Cross Blue Shield of Colorado, Cigna, UnitedHealthcare, and Medicaid. Under the ACA, most insurance plans are required to cover lactation support without cost-sharing. Filter by insurance when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Denver?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — multiple IBCLCs in Denver offer home visits throughout the metro, including Aurora, Lakewood, Arvada, Westminster, and surrounding communities. Filter by "home visit" when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Denver IBCLCs offer telehealth consultations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Denver IBCLCs offer telehealth consultations for supply concerns, pumping guidance, and prenatal preparation. Telehealth also gives you access to IBCLCs across Colorado including Colorado Springs specialists.',
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
          <Link href="/find/co" className="hover:text-charcoal-700">Colorado</Link>
          <span>/</span>
          <span className="text-charcoal-600">Denver</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Denver, CO</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Denver, CO
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Denver's active outdoor culture and health-conscious community make it one of the strongest
            breastfeeding-support markets on the Front Range. From Capitol Hill to Cherry Creek and
            out to the suburbs, experienced IBCLCs are available for home visits, office appointments,
            and telehealth. Colorado Springs also has 10 IBCLCs nearby for families further south.
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
                IBCLCs in Denver, CO
              </h2>
              <Link
                href="/listings?city=Denver&state=CO"
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
              Search for IBCLCs in Denver below — new listings added regularly.
            </p>
            <Link href="/listings?city=Denver&state=CO" className="btn-primary inline-flex items-center gap-2">
              Search Denver IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Denver, CO
          </h2>
          {[
            {
              q: 'How do I find an IBCLC in Denver who accepts my insurance?',
              a: 'Search the directory and filter by insurance plan. Many Denver IBCLCs accept Aetna, Blue Cross Blue Shield of Colorado, Cigna, UHC, and Medicaid. Under the ACA, most insurance plans cover IBCLC visits at no cost to you — no copay, no deductible.',
            },
            {
              q: 'Do Denver IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in Denver offer home visits throughout the metro, including Aurora, Lakewood, Arvada, and Westminster. Home visits are ideal in the first 1–3 days home from the hospital when traveling is hard.",
            },
            {
              q: 'What is an IBCLC vs. a lactation consultant?',
              a: "IBCLC is the only internationally recognized credential for lactation care. \"Lactation consultant\" is not a protected title — anyone can use it. IBCLCs complete 1,000+ clinical hours and pass a board exam. When your baby's feeding is struggling, choose an IBCLC.",
            },
            {
              q: 'Can I see a Denver IBCLC by telehealth?',
              a: "Many Denver IBCLCs offer telehealth consultations — useful for supply concerns, pumping guidance, and prenatal prep. Telehealth also connects you to IBCLCs in Colorado Springs and across the state if you need a specialist not available locally.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in Colorado</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/find/co/colorado-springs-co" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Colorado Springs →</Link>
            <Link href="/find/co" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Colorado IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
