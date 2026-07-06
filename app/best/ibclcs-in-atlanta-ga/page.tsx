import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-atlanta-ga' },
  title: 'Best IBCLCs in Atlanta, GA | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Atlanta, Georgia. IBCLCs across metro Atlanta — Buckhead, Decatur, Midtown, Sandy Springs, and beyond. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Best IBCLCs in Atlanta, GA',
    description:
      'Find verified IBCLCs in Atlanta, Georgia. Home visits, telehealth, and insurance coverage — serving the full Atlanta metro area.',
  },
}

async function getAtlantaListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Atlanta')
    .eq('state', 'GA')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsAtlantaPage() {
  const listings = await getAtlantaListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Georgia', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ga` },
      { '@type': 'ListItem', position: 4, name: 'Atlanta', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ga/atlanta-ga` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Atlanta, GA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Atlanta, Georgia. The Atlanta metro has a well-distributed lactation support community spanning Fulton, DeKalb, Gwinnett, and Cobb counties.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Atlanta IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Atlanta-area IBCLCs accept Aetna, Cigna, BCBS of Georgia, UnitedHealthcare, and Georgia Medicaid. Under the ACA, most insurance plans are required to cover breastfeeding support at no cost to you. Use the insurance filter in the directory to find covered providers.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Atlanta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Several Atlanta IBCLCs offer home visits across Fulton and DeKalb counties and into surrounding suburbs including Marietta, Decatur, Alpharetta, and Smyrna. Atlanta traffic makes home visits particularly valuable for new parents who want to avoid a car trip with a newborn.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see an Atlanta IBCLC by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Many Atlanta IBCLCs offer telehealth consultations for clients across Georgia. Telehealth is effective for supply questions, pumping support, and latch coaching — particularly useful for parents in suburban Atlanta where in-person options may require a long drive.",
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
          <Link href="/find/ga" className="hover:text-charcoal-600">Georgia</Link>
          <span>/</span>
          <span className="text-charcoal-600">Atlanta</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Atlanta, GA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Atlanta, GA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Atlanta has a growing network of board-certified lactation consultants serving families across
            Fulton, DeKalb, Cobb, and Gwinnett counties. Whether you delivered at Piedmont Atlanta,
            Northside Hospital, Emory University Hospital, or a birth center in Decatur, experienced
            IBCLCs are available in-person and by telehealth throughout the metro.
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
                IBCLCs in Atlanta, GA
              </h2>
              <Link
                href="/listings?city=Atlanta&state=GA"
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
              Search for IBCLCs in Atlanta below — new listings added regularly.
            </p>
            <Link href="/listings?city=Atlanta&state=GA" className="btn-primary inline-flex items-center gap-2">
              Search Atlanta IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Atlanta, GA
          </h2>
          {[
            {
              q: 'How do I find an Atlanta IBCLC who accepts my insurance?',
              a: "Search the directory and filter by insurance. Many Atlanta IBCLCs accept BCBS of Georgia, Aetna, Cigna, UHC, and Georgia Medicaid. Under the ACA, most insurance plans must cover lactation support at no cost to you.",
            },
            {
              q: 'Do Atlanta IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in metro Atlanta offer home visits across Fulton, DeKalb, Cobb, and Gwinnett counties. Given Atlanta traffic, a home visit often makes far more sense than loading a newborn in the car for an office appointment.",
            },
            {
              q: 'What Atlanta hospitals have lactation consultants on staff?',
              a: "Northside Hospital (the busiest birth hospital in the US by deliveries), Piedmont Atlanta, Emory University Hospital, and Children's Healthcare of Atlanta have hospital-based lactation staff for inpatient support. For outpatient care after discharge, private-practice IBCLCs offer more time and flexibility.",
            },
            {
              q: 'Can I see an Atlanta IBCLC by telehealth?',
              a: "Yes. Telehealth IBCLC consultations are available across Georgia. Effective for supply issues, pumping schedules, and latch coaching — particularly convenient for families in Buckhead, Sandy Springs, Roswell, or other Atlanta suburbs where traffic makes in-person visits a real commitment.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/best/ibclcs-in-miami-fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Miami →</Link>
            <Link href="/best/ibclcs-in-philadelphia-pa" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Philadelphia →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
