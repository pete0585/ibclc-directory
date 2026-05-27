import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Los Angeles, CA | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Los Angeles, California. Verified IBCLCs in LA who offer home visits, telehealth, and accept most insurance. 20+ listed in the LA metro.',
  openGraph: {
    title: 'Best IBCLCs in Los Angeles, CA',
    description: 'Find top-rated, verified IBCLCs in Los Angeles, California. Home visits, telehealth, and insurance accepted.',
  },
}

async function getLAListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Los Angeles')
    .eq('state', 'CA')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsLosAngelesPage() {
  const listings = await getLAListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'California', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ca` },
      { '@type': 'ListItem', position: 4, name: 'Los Angeles', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ca/los-angeles-ca` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Los Angeles, CA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Los Angeles, California. The greater LA metro — including West LA, the San Fernando Valley, Pasadena, Long Beach, and the South Bay — has one of the country's largest communities of certified lactation consultants.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Los Angeles IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many IBCLCs in Los Angeles accept insurance including Anthem Blue Cross, Blue Shield of California, Aetna, Cigna, UnitedHealthcare, and Medi-Cal. Under the ACA, most insurance plans must cover lactation support at no cost to you. Filter by insurance when searching to find covered providers.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Los Angeles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — multiple IBCLCs in Los Angeles offer home visits across the metro, including West Hollywood, Santa Monica, Burbank, Glendale, Torrance, and Pasadena. Home visits are especially valuable in the first week home from the hospital when driving is difficult.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an IBCLC and a lactation consultant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "IBCLC is the only internationally recognized credential for lactation care, requiring 1,000+ clinical hours and a board exam. \"Lactation consultant\" is not a protected title — anyone can use it. When your baby's feeding is struggling, always choose a board-certified IBCLC.",
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
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <Link href="/find/ca" className="hover:text-charcoal-600">California</Link>
          <span>/</span>
          <span className="text-charcoal-600">Los Angeles</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Los Angeles, CA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Los Angeles, CA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Los Angeles has one of the most active lactation support communities in the country — from
            mid-city practices to specialists covering the Valley, the Westside, and the South Bay. Whether
            you need a home visit the day you leave the hospital or telehealth support from a specialist not
            available locally, you have real options here.
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
                IBCLCs in Los Angeles, CA
              </h2>
              <Link
                href="/listings?city=Los+Angeles&state=CA"
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
              Search for IBCLCs in Los Angeles below — new listings added regularly.
            </p>
            <Link href="/listings?city=Los+Angeles&state=CA" className="btn-primary inline-flex items-center gap-2">
              Search Los Angeles IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Los Angeles, CA
          </h2>
          {[
            {
              q: 'How do I find an IBCLC in Los Angeles who accepts my insurance?',
              a: "Search the directory and filter by insurance plan. Many LA-area IBCLCs accept Anthem Blue Cross, Blue Shield of California, Aetna, Cigna, UHC, and Medi-Cal. Under the ACA, most insurance plans cover IBCLC visits at no cost to you — no copay, no deductible.",
            },
            {
              q: 'Do Los Angeles IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in LA offer home visits throughout the metro, including West Hollywood, Culver City, Santa Monica, Pasadena, Burbank, and the South Bay. Home visits are ideal in the first 1–3 days home from the hospital.",
            },
            {
              q: "Can I see an LA IBCLC by telehealth if I'm not in the city?",
              a: "Many Los Angeles IBCLCs offer telehealth across California and sometimes nationwide. Telehealth is useful for supply concerns, pumping guidance, and prenatal prep — and lets you access specialists not available in your specific zip code.",
            },
            {
              q: 'What should I expect from a first IBCLC visit in Los Angeles?',
              a: "Your first IBCLC consultation typically lasts 60–90 minutes. The IBCLC will assess latch, observe a full feeding, and weigh the baby before and after nursing to measure transfer. You will leave with a personalized care plan — not just reassurance.",
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
            <Link href="/best/ibclcs-in-san-diego-ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in San Diego →</Link>
            <Link href="/find/ca/san-jose-ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in San Jose →</Link>
            <Link href="/find/ca" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All California IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
