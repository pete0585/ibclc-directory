import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-raleigh-nc' },
  title: 'Find a Lactation Consultant (IBCLC) in Raleigh, NC | LactationConsultantDirectory.com',
  description:
    'Find board-certified lactation consultants in Raleigh, North Carolina. IBCLCs serving the Research Triangle — Durham, Chapel Hill, Cary, and beyond. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Raleigh, NC',
    description:
      'Find verified IBCLCs in Raleigh, North Carolina. Home visits, telehealth, and insurance coverage — serving the full Research Triangle metro.',
  },
}

async function getRaleighListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Raleigh', 'Durham', 'Chapel Hill', 'Cary'])
    .eq('state', 'NC')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsRaleighPage() {
  const listings = await getRaleighListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Raleigh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `LactationConsultantDirectory.com lists ${listings.length}+ IBCLCs in the Raleigh-Durham area. The Research Triangle is one of the most educated metros in the South, and its lactation support community reflects that — with IBCLCs connected to UNC Health, Duke Health, WakeMed, and numerous independent practices across Wake, Durham, and Orange counties.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Raleigh IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Most insurance plans available through NC Health Choice, Blue Cross Blue Shield of North Carolina, Aetna, Cigna, and UnitedHealthcare are required to cover lactation support under the ACA at no cost to you. NC Medicaid (Healthy Opportunities) also covers IBCLC services. Use the insurance filter in the directory to confirm your specific plan.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find an IBCLC in Durham or Chapel Hill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Triangle is well-covered — IBCLCs practice in Raleigh, Durham, Chapel Hill, Cary, Apex, and Morrisville. Duke Health's lactation program and UNC's Birth and Women's Center both have in-hospital IBCLCs, with private-practice consultants available for ongoing outpatient support.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there telehealth IBCLC options in North Carolina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Several Raleigh-area IBCLCs offer telehealth visits that serve families throughout North Carolina. This is particularly helpful in the Triangle where traffic between Raleigh, Durham, and Chapel Hill can be challenging for parents with newborns.",
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
      { '@type': 'ListItem', position: 3, name: 'North Carolina', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/nc` },
      { '@type': 'ListItem', position: 4, name: 'Raleigh', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-raleigh-nc` },
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
          <Link href="/find/nc" className="hover:text-charcoal-600">North Carolina</Link>
          <span>/</span>
          <span className="text-charcoal-600">Raleigh</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Raleigh, NC</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Raleigh, NC
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            The Research Triangle — Raleigh, Durham, and Chapel Hill — has one of the most robust
            breastfeeding support networks in the Southeast. With major academic medical centers at
            UNC Health and Duke Health, plus a highly educated population with strong breastfeeding
            initiation rates, the area has both hospital-based IBCLCs and a thriving private-practice
            community. Whether you&apos;re in Cary, Apex, or downtown Raleigh, you have access to
            board-certified lactation consultants who can help from day one.
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
                IBCLCs in Raleigh, NC
              </h2>
              <Link
                href="/listings?city=Raleigh&state=NC"
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
              Search for IBCLCs in Raleigh below — new listings added regularly.
            </p>
            <Link href="/listings?city=Raleigh&state=NC" className="btn-primary inline-flex items-center gap-2">
              Search Raleigh IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Raleigh-Durham, NC
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse North Carolina Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Looking for an IBCLC outside Raleigh? North Carolina has lactation consultants in Charlotte,
            Greensboro, Asheville, Wilmington, and across the state.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=NC" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All NC IBCLCs →</Link>
            <Link href="/best/ibclcs-in-atlanta-ga" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Atlanta →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
