import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-las-vegas-nv' },
  title: 'Find a Lactation Consultant (IBCLC) in Las Vegas, NV | LactationConsultantDirectory.com',
  description:
    'Find board-certified lactation consultants in Las Vegas, Nevada. IBCLCs serving the Las Vegas Valley — Henderson, Summerlin, North Las Vegas, and surrounding areas. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Las Vegas, NV',
    description:
      'Find verified IBCLCs in Las Vegas, Nevada. Home visits, telehealth, and insurance coverage — serving the full Las Vegas Valley.',
  },
}

async function getLasVegasListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Las Vegas', 'Henderson', 'Summerlin'])
    .eq('state', 'NV')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsLasVegasPage() {
  const listings = await getLasVegasListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Las Vegas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `LactationConsultantDirectory.com lists ${listings.length}+ IBCLCs in the Las Vegas, NV area. The Las Vegas Valley has a growing network of board-certified lactation consultants serving families across Clark County — in Henderson, Summerlin, North Las Vegas, and the city itself. Hospital-based IBCLCs at Sunrise Hospital, Valley Hospital, and Dignity Health are complemented by private-practice consultants who offer in-home and telehealth visits.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Las Vegas IBCLCs take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Most major insurance plans accepted in Nevada — including Nevada Health Link plans, UnitedHealthcare, Aetna, Cigna, and Nevada Medicaid (Medicaid Managed Care) — are required to cover breastfeeding support under the ACA at no cost to you. Many Las Vegas IBCLCs also accept TRICARE for military families at Nellis AFB. Use the insurance filter in the directory to confirm coverage.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs near Henderson or Summerlin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Several Las Vegas area IBCLCs practice in Henderson and Summerlin — or offer home visits to those communities. Las Vegas traffic is notoriously difficult, so home visit IBCLCs are especially popular with new parents who want to avoid the drive with a newborn.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find a telehealth IBCLC in Nevada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Nevada has telehealth-friendly licensure rules, and a number of IBCLCs offer video consultations that are ideal for latch assessments, supply questions, and return-to-work pumping plans. Telehealth IBCLCs can serve any family in Nevada from wherever you're most comfortable.",
        },
      },
    ],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Nevada', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/nv` },
      { '@type': 'ListItem', position: 4, name: 'Las Vegas', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-las-vegas-nv` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <Link href="/find/nv" className="hover:text-charcoal-600">Nevada</Link>
          <span>/</span>
          <span className="text-charcoal-600">Las Vegas</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Las Vegas, NV</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Las Vegas, NV
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Las Vegas is one of the fastest-growing metros in the country, and its breastfeeding support
            infrastructure has grown with it. Board-certified lactation consultants serve families across
            Clark County — whether you delivered at Sunrise Hospital, Valley Hospital, Spring Valley Hospital,
            or a birth center in Henderson. Nevada&apos;s large military presence at Nellis AFB also means
            several area IBCLCs are experienced with TRICARE coverage and the specific demands facing
            military families.
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
                IBCLCs in Las Vegas, NV
              </h2>
              <Link
                href="/listings?city=Las Vegas&state=NV"
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
              Search for IBCLCs in Las Vegas below — new listings added regularly.
            </p>
            <Link href="/listings?city=Las Vegas&state=NV" className="btn-primary inline-flex items-center gap-2">
              Search Las Vegas IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Las Vegas, NV
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse Nevada Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Looking for an IBCLC outside Las Vegas? Nevada has lactation consultants in Reno, Henderson,
            and across the state.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=NV" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Nevada IBCLCs →</Link>
            <Link href="/best/ibclcs-in-phoenix-az" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Phoenix →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
