import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in San Antonio, TX | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in San Antonio, Texas. IBCLCs across the San Antonio metro — from Stone Oak to the Medical Center and beyond. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Best IBCLCs in San Antonio, TX',
    description:
      'Find verified IBCLCs in San Antonio, Texas. Home visits, telehealth, Tricare and BCBS Texas accepted — serving Military City USA and the greater Bexar County area.',
  },
}

async function getSanAntonioListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'San Antonio')
    .eq('state', 'TX')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsSanAntonioPage() {
  const listings = await getSanAntonioListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Texas', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tx` },
      { '@type': 'ListItem', position: 4, name: 'San Antonio', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tx/san-antonio-tx` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in San Antonio, TX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in San Antonio, Texas. Bexar County has a strong lactation support community, including consultants who serve military families through Tricare at BAMC, Lackland AFB, and Fort Sam Houston.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do San Antonio IBCLCs accept Tricare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "San Antonio is home to one of the largest military populations in the country. Many IBCLCs here accept Tricare, which is required under the ACA to cover breastfeeding support at no cost to active-duty and military families. Use the insurance filter in the directory to find Tricare-accepting providers.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in San Antonio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Several San Antonio IBCLCs offer home visits across Bexar County and into surrounding areas including New Braunfels, Boerne, and Schertz. Home visits are especially convenient in a sprawling metro like San Antonio.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs near Fort Sam Houston or Lackland AFB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. San Antonio's large military community means many IBCLCs are experienced with active-duty families, Tricare coverage, and the specific challenges of breastfeeding while on a military schedule or near a base hospital.",
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
          <span className="text-charcoal-600">San Antonio</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">San Antonio, TX</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in San Antonio, TX
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            San Antonio — Military City USA — has a deep community of lactation consultants who understand
            the unique needs of military families alongside the broader Bexar County population. Whether
            you delivered at Methodist Hospital, CHRISTUS Santa Rosa, University Hospital, or Brooke
            Army Medical Center, experienced IBCLCs are available across the metro.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>Tricare accepted</span>
            <span>·</span>
            <span>Home visits available</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in San Antonio, TX
              </h2>
              <Link
                href="/listings?city=San+Antonio&state=TX"
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
              Search for IBCLCs in San Antonio below — new listings added regularly.
            </p>
            <Link href="/listings?city=San+Antonio&state=TX" className="btn-primary inline-flex items-center gap-2">
              Search San Antonio IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in San Antonio, TX
          </h2>
          {[
            {
              q: 'How do I find a San Antonio IBCLC who accepts Tricare?',
              a: "Search the directory and filter by insurance plan. San Antonio has a large active-duty and veteran population, and many IBCLCs here accept Tricare Prime and Tricare Select. Under the ACA, Tricare is required to cover breastfeeding support and equipment at no cost to the member.",
            },
            {
              q: 'Do San Antonio IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in the San Antonio area offer home visits across Bexar County and into neighboring areas including New Braunfels, Boerne, Schertz, and Universal City. Home visits mean no car seat required — the IBCLC comes to where you and your baby are most comfortable.",
            },
            {
              q: 'What San Antonio hospitals have lactation consultants on staff?',
              a: "CHRISTUS Santa Rosa, Methodist Healthcare System, University Health, and Baptist Health System all have hospital-based lactation staff for inpatient support. For outpatient follow-up after discharge — where most breastfeeding challenges actually emerge — private-practice IBCLCs offer longer, uninterrupted appointments.",
            },
            {
              q: 'Can I see a San Antonio IBCLC by telehealth?',
              a: "Yes. Many IBCLCs in the San Antonio area offer telehealth for clients across Texas. Telehealth works well for supply issues, pumping plans, and latch coaching — especially useful for families on base or in suburban areas across Bexar County.",
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
            <Link href="/best/ibclcs-in-houston-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Houston →</Link>
            <Link href="/best/ibclcs-in-austin-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Austin →</Link>
            <Link href="/find/tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Texas IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
