import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-seattle-wa' },
  title: 'Best IBCLCs in Seattle, WA | IBCLCDirectory.com',
  description:
    "Find the best lactation consultants in Seattle, Washington. Verified IBCLCs in Seattle who offer home visits, telehealth, and accept most insurance. 12+ listed in the Seattle metro.",
  openGraph: {
    title: 'Best IBCLCs in Seattle, WA',
    description: "Find top-rated, verified IBCLCs in Seattle, Washington. Home visits, telehealth, and insurance accepted.",
  },
}

async function getSeattleListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('city', 'Seattle')
    .eq('state', 'WA')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsSeattlePage() {
  const listings = await getSeattleListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Washington', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/wa` },
      { '@type': 'ListItem', position: 4, name: 'Seattle', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-seattle-wa` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Seattle, WA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com has ${listings.length}+ listed IBCLCs in Seattle, Washington. The Seattle metro area has one of the highest concentrations of IBCLCs in the Pacific Northwest, serving families across the city and the Eastside.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Seattle IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many IBCLCs in Seattle accept insurance including Premera Blue Cross, Regence BlueShield, Aetna, Cigna, UnitedHealthcare, and Apple Health (Medicaid). Under the ACA, most insurance plans are required to cover lactation support without cost-sharing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Seattle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — multiple IBCLCs in Seattle offer home visits throughout the city and into the Eastside, including Bellevue, Redmond, Kirkland, and Mercer Island. Filter by "home visit" when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Seattle IBCLCs offer telehealth consultations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Seattle IBCLCs offer telehealth consultations — useful for supply concerns, pumping guidance, and prenatal prep. Washington's strong parental leave culture means many IBCLCs are experienced with the full spectrum of breastfeeding support remotely.",
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
          <Link href="/find/wa" className="hover:text-charcoal-700">Washington</Link>
          <span>/</span>
          <span className="text-charcoal-600">Seattle</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Seattle, WA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Seattle, WA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Seattle's progressive community and strong parental leave culture make breastfeeding support
            readily available across the city. From Capitol Hill to Ballard and out to the Eastside —
            Bellevue, Redmond, and Kirkland — experienced IBCLCs serve families throughout the greater
            Seattle metro with home visits, office appointments, and telehealth.
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
                IBCLCs in Seattle, WA
              </h2>
              <Link
                href="/listings?city=Seattle&state=WA"
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
              Search for IBCLCs in Seattle below — new listings added regularly.
            </p>
            <Link href="/listings?city=Seattle&state=WA" className="btn-primary inline-flex items-center gap-2">
              Search Seattle IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Seattle, WA
          </h2>
          {[
            {
              q: 'How do I find an IBCLC in Seattle who accepts my insurance?',
              a: 'Search the directory and filter by insurance plan. Many Seattle IBCLCs accept Premera Blue Cross, Regence BlueShield, Aetna, Cigna, UHC, and Apple Health (Medicaid). Under the ACA, most insurance plans cover IBCLC visits at no cost to you — no copay, no deductible.',
            },
            {
              q: 'Do Seattle IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in Seattle offer home visits throughout the city and into the Eastside, including Bellevue, Redmond, and Kirkland. Home visits are ideal in the first 1–3 days home from the hospital when traveling with a newborn is hard.",
            },
            {
              q: 'What is an IBCLC vs. a lactation consultant?',
              a: "IBCLC is the only internationally recognized credential for lactation care. \"Lactation consultant\" is not a protected title — anyone can use it. IBCLCs complete 1,000+ clinical hours and pass a board exam. When your baby's feeding is struggling, choose an IBCLC.",
            },
            {
              q: 'Can I see a Seattle IBCLC by telehealth?',
              a: "Many Seattle IBCLCs offer telehealth consultations — useful for supply concerns, pumping guidance, and prenatal prep. Telehealth also gives you access to IBCLCs across Washington state if you need a specialist not available locally.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in Washington</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/find/wa" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Washington IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
