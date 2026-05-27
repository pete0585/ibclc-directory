import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Philadelphia, PA | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Philadelphia, Pennsylvania. 20+ IBCLCs in Philly offering home visits, telehealth, and insurance-covered care. Updated listings.',
  openGraph: {
    title: 'Best IBCLCs in Philadelphia, PA',
    description: 'Find verified IBCLCs in Philadelphia, PA. Home visits, telehealth, insurance accepted — serving the Philly metro and surrounding suburbs.',
  },
}

async function getPhillyListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Philadelphia')
    .eq('state', 'PA')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsPhiladelphiaPage() {
  const listings = await getPhillyListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Pennsylvania', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/pa` },
      { '@type': 'ListItem', position: 4, name: 'Philadelphia', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/pa/philadelphia-pa` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Philadelphia, PA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Philadelphia, Pennsylvania. Philly has a robust community of lactation consultants serving the city and the Main Line, Northeast Philadelphia, South Philly, and surrounding suburbs like King of Prussia and Cherry Hill, NJ.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Philadelphia IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many IBCLCs in Philadelphia accept BCBS Highmark, Independence Blue Cross, Aetna, Cigna, UnitedHealthcare, and Medicaid. Under the ACA, most plans are required to cover lactation support at no cost. Filter by insurance in the directory to confirm coverage.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Philadelphia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — several Philadelphia IBCLCs offer home visits throughout the city and surrounding suburbs including Ardmore, Bryn Mawr, Bensalem, and Cherry Hill, NJ. Home visits are ideal when traveling post-birth feels overwhelming.",
        },
      },
      {
        '@type': 'Question',
        name: 'What Philadelphia hospitals have IBCLCs on staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Hospital-based IBCLCs at Jefferson, Penn Medicine, CHOP, and Temple provide inpatient support. For ongoing outpatient care after discharge, the private-practice IBCLCs listed here offer more scheduling flexibility and longer appointment times.",
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
          <Link href="/find/pa" className="hover:text-charcoal-600">Pennsylvania</Link>
          <span>/</span>
          <span className="text-charcoal-600">Philadelphia</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Philadelphia, PA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Philadelphia, PA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Philadelphia has strong lactation support across the city and the surrounding suburbs — from
            practice groups near Jefferson and Penn Medicine to independent IBCLCs covering the Main Line,
            Northeast Philly, and South Jersey. Find one who fits your schedule, your insurance, and where
            you are in your breastfeeding journey.
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
                IBCLCs in Philadelphia, PA
              </h2>
              <Link
                href="/listings?city=Philadelphia&state=PA"
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
              Search for IBCLCs in Philadelphia below — new listings added regularly.
            </p>
            <Link href="/listings?city=Philadelphia&state=PA" className="btn-primary inline-flex items-center gap-2">
              Search Philadelphia IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Philadelphia, PA
          </h2>
          {[
            {
              q: 'How do I find a Philadelphia IBCLC who accepts my insurance?',
              a: "Search the directory and filter by insurance plan. Many Philly IBCLCs accept Independence Blue Cross, BCBS Highmark, Aetna, Cigna, UHC, and PA Medicaid. Under the ACA, most insurance plans cover IBCLC visits at no cost — no copay, no deductible.",
            },
            {
              q: 'Do Philadelphia IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in the Philadelphia area offer home visits throughout the city and surrounding suburbs including the Main Line, Bucks County, and South Jersey. Home visits are ideal in the first week when traveling with a newborn is difficult.",
            },
            {
              q: 'What is an IBCLC and why does the credential matter in Philadelphia?',
              a: "IBCLC (International Board Certified Lactation Consultant) is the gold-standard credential for lactation care — requiring 1,000+ clinical hours and a rigorous board exam. In a city with many hospital-based lactation programs, private-practice IBCLCs often provide longer consultations and more personalized follow-up.",
            },
            {
              q: 'Can I see a Philadelphia IBCLC by telehealth?',
              a: "Many Philadelphia IBCLCs offer telehealth for Pennsylvania and New Jersey clients, making it easy to access specialist care for supply issues, pumping plans, and latch challenges without leaving home.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More on the East Coast</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/best/ibclcs-in-new-york-ny" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in New York →</Link>
            <Link href="/best/ibclcs-in-miami-fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Miami →</Link>
            <Link href="/find/pa" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Pennsylvania IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
