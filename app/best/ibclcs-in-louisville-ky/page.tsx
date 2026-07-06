import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-louisville-ky' },
  title: 'Find a Lactation Consultant (IBCLC) in Louisville, KY | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Louisville, Kentucky. IBCLCs across the Louisville metro — Jeffersontown, St. Matthews, Shively, and beyond. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Louisville, KY',
    description:
      'Find verified IBCLCs in Louisville, Kentucky. Home visits, telehealth, and insurance coverage — serving the full Louisville metro area.',
  },
}

async function getLouisvilleListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Louisville')
    .eq('state', 'KY')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsLouisvillePage() {
  const listings = await getLouisvilleListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Louisville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Louisville, KY. The Louisville area has a solid lactation support network anchored by hospital programs at the University of Louisville Hospital, Baptist Health Louisville, Norton Healthcare, and Jewish Hospital — complemented by private-practice IBCLCs offering longer, individualized sessions.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Does Kentucky Medicaid cover lactation consultants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Kentucky Medicaid (Medicaid managed care through Humana, Anthem, and Molina) covers breastfeeding support including IBCLC visits for eligible members. Under the ACA, most non-Medicaid plans must also cover lactation counseling at no cost to you. Use the insurance filter in the directory to confirm a specific IBCLC accepts your plan before booking.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs near Lexington, KY?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While this page focuses on Louisville, Lexington also has IBCLCs — search the directory with state=KY to find providers across Kentucky. For families between Louisville and Lexington, many IBCLCs offer telehealth for follow-up visits, and some serve the I-64 corridor with home visits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Louisville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Several Louisville IBCLCs offer home visits across Jefferson County and into surrounding areas including Oldham and Bullitt counties. A home visit in the first days postpartum can be much easier on a new family than an office trip — the IBCLC comes to you, observes a feed in your actual environment, and can assess your nursing setup directly.',
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
      { '@type': 'ListItem', position: 3, name: 'Kentucky', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ky` },
      { '@type': 'ListItem', position: 4, name: 'Louisville', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ky/louisville-ky` },
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
          <Link href="/find/ky" className="hover:text-charcoal-600">Kentucky</Link>
          <span>/</span>
          <span className="text-charcoal-600">Louisville</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Louisville, KY</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Louisville, KY
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Louisville has a growing network of board-certified lactation consultants supporting families
            across Jefferson County and beyond. The city benefits from strong hospital-based lactation
            programs at the University of Louisville Hospital, Baptist Health Louisville, and Norton
            Healthcare — plus Kentucky&apos;s WIC breastfeeding peer counseling network. Private-practice
            IBCLCs offer the extended one-on-one time that hospital stays rarely allow, making them an
            important next step for families facing feeding challenges after discharge.
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
                IBCLCs in Louisville, KY
              </h2>
              <Link
                href="/listings?city=Louisville&state=KY"
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
              Search for IBCLCs in Louisville below — new listings added regularly.
            </p>
            <Link href="/listings?city=Louisville&state=KY" className="btn-primary inline-flex items-center gap-2">
              Search Louisville IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Louisville, KY
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=KY" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Kentucky IBCLCs →</Link>
            <Link href="/best/ibclcs-in-nashville-tn" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Nashville →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
