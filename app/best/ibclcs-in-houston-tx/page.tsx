import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Houston, TX | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Houston, Texas. IBCLCs across the Houston metro — The Woodlands, Sugar Land, Katy, and more. Insurance accepted. Telehealth and home visits available.',
  openGraph: {
    title: 'Best IBCLCs in Houston, TX',
    description: 'Find verified IBCLCs in Houston, Texas. Home visits, telehealth, and insurance coverage — serving the entire Houston metro area.',
  },
}

async function getHoustonListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Houston')
    .eq('state', 'TX')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsHoustonPage() {
  const listings = await getHoustonListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Texas', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tx` },
      { '@type': 'ListItem', position: 4, name: 'Houston', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tx/houston-tx` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Houston, TX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Houston, Texas. The Houston metro — including The Woodlands, Sugar Land, Katy, Pearland, and Clear Lake — has a well-distributed community of board-certified lactation consultants.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Houston IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many IBCLCs in Houston accept Aetna, Cigna, BCBS of Texas, UnitedHealthcare, Tricare, and Texas Medicaid. Under the ACA, most insurance plans are required to cover lactation support at no cost. Filter by insurance when searching the directory.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Houston?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — several Houston IBCLCs offer home visits across Harris County and surrounding areas including The Woodlands, Katy, Sugar Land, and Pearland. Houston's size makes home visits especially practical for families in the suburbs.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does my Texas insurance cover an IBCLC visit in Houston?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Under the ACA's preventive care mandate, most private insurance plans must cover breastfeeding support — including IBCLC consultations — at no cost to you. This applies to plans in Texas. Call your insurer to confirm in-network providers before booking.",
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
          <Link href="/find/tx" className="hover:text-charcoal-600">Texas</Link>
          <span>/</span>
          <span className="text-charcoal-600">Houston</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Houston, TX</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Houston, TX
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Houston is a massive metro with IBCLCs spread across Harris County and beyond — from the
            Medical Center area to The Woodlands, Katy, and Sugar Land. Whether you delivered at Texas
            Children's, Memorial Hermann, or a birth center, there are experienced lactation consultants
            ready to support your feeding journey.
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
                IBCLCs in Houston, TX
              </h2>
              <Link
                href="/listings?city=Houston&state=TX"
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
              Search for IBCLCs in Houston below — new listings added regularly.
            </p>
            <Link href="/listings?city=Houston&state=TX" className="btn-primary inline-flex items-center gap-2">
              Search Houston IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Houston, TX
          </h2>
          {[
            {
              q: 'How do I find a Houston IBCLC who accepts my insurance?',
              a: "Search the directory and filter by insurance plan. Many Houston IBCLCs accept BCBS of Texas, Aetna, Cigna, UHC, Tricare, and Texas Medicaid. Under the ACA, most plans cover lactation support at zero cost.",
            },
            {
              q: 'Do Houston IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in the Houston area offer home visits across Harris County and into The Woodlands, Katy, Sugar Land, and Pearland. Home visits mean your IBCLC comes to you — no car seat required.",
            },
            {
              q: 'What Houston hospitals have lactation consultants on staff?',
              a: "Texas Children's Hospital, Memorial Hermann, Houston Methodist, and HCA facilities have hospital-based lactation staff for inpatient support. For outpatient follow-up after discharge — which is where most breastfeeding challenges actually begin — private-practice IBCLCs offer longer appointments and more flexibility.",
            },
            {
              q: 'Can I see a Houston IBCLC by telehealth?',
              a: "Yes. Many Houston IBCLCs offer telehealth for clients across Texas. Telehealth is effective for supply issues, pumping plans, and latch coaching — especially if you are in a suburb where in-person options are limited.",
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
            <Link href="/best/ibclcs-in-austin-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Austin →</Link>
            <Link href="/find/tx/san-antonio-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in San Antonio →</Link>
            <Link href="/find/tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Texas IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
