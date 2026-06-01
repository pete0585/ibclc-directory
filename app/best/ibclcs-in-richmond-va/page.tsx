import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Richmond, VA | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Richmond, Virginia. IBCLCs across the Richmond metro — Short Pump, Midlothian, Henrico, and Chesterfield. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Best IBCLCs in Richmond, VA',
    description:
      'Find verified IBCLCs in Richmond, Virginia. Home visits, telehealth, and insurance coverage — serving Richmond and the surrounding metro.',
  },
}

async function getRichmondListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Richmond')
    .eq('state', 'VA')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsRichmondPage() {
  const listings = await getRichmondListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Virginia', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/va` },
      { '@type': 'ListItem', position: 4, name: 'Richmond', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/va/richmond-va` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Richmond, VA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Richmond, Virginia. The Richmond metro — including Short Pump, Henrico, Midlothian, and Chesterfield — has a growing lactation support community for families across central Virginia.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Richmond IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Richmond-area IBCLCs accept Anthem BCBS of Virginia, Aetna, Cigna, UnitedHealthcare, and Virginia Medicaid. Under the ACA, most insurance plans are required to cover breastfeeding support at no cost. Filter by insurance plan in the directory to find covered providers near you.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Richmond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Several Richmond IBCLCs offer home visits across Henrico, Chesterfield, and into neighboring areas like Short Pump, Midlothian, and the Fan District. Home visits are especially practical in the first week or two after delivery when leaving the house with a newborn feels overwhelming.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Richmond IBCLC by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Telehealth is available through many Richmond-area IBCLCs for clients across Virginia. Telehealth works well for supply coaching, pumping plans, and latch consultations — no drive required.",
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
          <Link href="/find/va" className="hover:text-charcoal-600">Virginia</Link>
          <span>/</span>
          <span className="text-charcoal-600">Richmond</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Richmond, VA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Richmond, VA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Richmond has a strong network of board-certified lactation consultants serving families across
            Henrico, Chesterfield, and the City of Richmond. Whether you delivered at VCU Medical Center,
            Chippenham Hospital, St. Mary's, or HCA Henrico Doctors, IBCLCs are available throughout the
            metro for in-person and telehealth support.
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
                IBCLCs in Richmond, VA
              </h2>
              <Link
                href="/listings?city=Richmond&state=VA"
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
              Search for IBCLCs in Richmond below — new listings added regularly.
            </p>
            <Link href="/listings?city=Richmond&state=VA" className="btn-primary inline-flex items-center gap-2">
              Search Richmond IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Richmond, VA
          </h2>
          {[
            {
              q: 'How do I find a Richmond IBCLC who accepts my insurance?',
              a: "Search the directory and filter by insurance. Many Richmond-area IBCLCs accept Anthem BCBS of Virginia, Aetna, Cigna, UHC, and Virginia Medicaid. The ACA requires most plans to cover breastfeeding support at no cost.",
            },
            {
              q: 'Do Richmond IBCLCs make home visits?',
              a: "Yes. Several Richmond-area IBCLCs offer home visits across Henrico, Chesterfield, and City of Richmond. This is particularly practical in the early newborn period when getting out of the house feels like an expedition.",
            },
            {
              q: 'What Richmond hospitals have lactation consultants on staff?',
              a: "VCU Medical Center, HCA Henrico Doctors Hospital, Chippenham Medical Center, and St. Mary's Hospital all have lactation staff for inpatient support. For outpatient follow-up after you go home — where most feeding challenges actually show up — a private-practice IBCLC will give you more focused time.",
            },
            {
              q: 'Can I see a Richmond IBCLC by telehealth?',
              a: "Yes. Many Richmond IBCLCs offer telehealth for Virginia clients. Telehealth is effective for supply coaching, pumping plans, latch assessment via video, and follow-up visits that do not require an in-person exam.",
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
            <Link href="/best/ibclcs-in-philadelphia-pa" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Philadelphia →</Link>
            <Link href="/best/ibclcs-in-new-york-ny" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in New York →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
