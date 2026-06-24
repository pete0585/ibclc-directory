import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant (IBCLC) in Indianapolis, IN | LactationConsultantDirectory.com',
  description:
    'Find board-certified lactation consultants in Indianapolis, Indiana. IBCLCs serving the Indianapolis metro — Carmel, Fishers, Westfield, and surrounding communities. Insurance accepted. Home visits available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Indianapolis, IN',
    description:
      'Find verified IBCLCs in Indianapolis, Indiana. Home visits, telehealth, and insurance coverage — serving the full Indy metro.',
  },
}

async function getIndianapolisListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Indianapolis', 'Carmel', 'Fishers', 'Westfield', 'Noblesville'])
    .eq('state', 'IN')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsIndianapolisPage() {
  const listings = await getIndianapolisListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Indianapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `LactationConsultantDirectory.com lists ${listings.length}+ IBCLCs in the Indianapolis, IN area. The Indianapolis metro has a well-established network of board-certified lactation consultants serving families across Marion County and the surrounding communities — Carmel, Fishers, Westfield, Noblesville, and Greenwood. Hospital-based IBCLCs at IU Health Methodist, Ascension St. Vincent, Eskenazi Health, and Community Health Network are complemented by private-practice consultants offering home visits and telehealth.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Indianapolis IBCLCs take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most major insurance plans in Indiana — including Anthem Blue Cross Blue Shield, UnitedHealthcare, Aetna, Cigna, and Indiana Medicaid (Hoosier Healthwise) — are required to cover breastfeeding support under the ACA at no cost to you. Use the insurance filter in the directory to confirm which Indianapolis-area IBCLCs accept your plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs in Carmel or Fishers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Several IBCLCs serve the northern Indianapolis suburbs — Carmel, Fishers, and Westfield — either through private practices or home visits that cover Hamilton County. These communities have strong birth professional networks and IBCLCs who work closely with local midwives, doulas, and OB-GYNs.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find a telehealth IBCLC in Indiana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Indiana has telehealth-friendly licensure rules, and a number of IBCLCs offer video consultations ideal for latch assessments, supply troubleshooting, and return-to-work pumping plans. Telehealth is especially helpful for families in rural Central Indiana who don't have access to a local IBCLC.",
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
      { '@type': 'ListItem', position: 3, name: 'Indiana', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/in` },
      { '@type': 'ListItem', position: 4, name: 'Indianapolis', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-indianapolis-in` },
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
          <Link href="/find/in" className="hover:text-charcoal-600">Indiana</Link>
          <span>/</span>
          <span className="text-charcoal-600">Indianapolis</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Indianapolis, IN</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Indianapolis, IN
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Indianapolis has a growing network of board-certified lactation consultants serving families
            across the metro. Whether you delivered at IU Health North, Community East, or a birth center
            in Hamilton County, IBCLCs in the Indy area are experienced with the full range of breastfeeding
            challenges — tongue tie, low supply, NICU support, premature infants, and return-to-work pumping.
            Indiana&apos;s large Medicaid population is well-served by IBCLCs who accept Hoosier Healthwise.
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
                IBCLCs in Indianapolis, IN
              </h2>
              <Link
                href="/listings?city=Indianapolis&state=IN"
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
              Search for IBCLCs in Indianapolis below — new listings added regularly.
            </p>
            <Link href="/listings?city=Indianapolis&state=IN" className="btn-primary inline-flex items-center gap-2">
              Search Indianapolis IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Indianapolis, IN
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse Indiana Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Looking for an IBCLC outside Indianapolis? Indiana has lactation consultants in Fort Wayne,
            Bloomington, South Bend, and across the state.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=IN" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Indiana IBCLCs →</Link>
            <Link href="/best/ibclcs-in-columbus-oh" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Columbus →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
