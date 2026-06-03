import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant (IBCLC) in Nashville, TN | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Nashville, Tennessee. IBCLCs across the Nashville metro — Brentwood, Franklin, Murfreesboro, and beyond. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Nashville, TN',
    description:
      'Find verified IBCLCs in Nashville, Tennessee. Home visits, telehealth, and insurance coverage — serving the full Nashville metro area.',
  },
}

async function getNashvilleListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Nashville')
    .eq('state', 'TN')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsNashvillePage() {
  const listings = await getNashvilleListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Nashville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in the Nashville, TN area. The Nashville metro has a well-established lactation support network across Davidson, Williamson, and Rutherford counties — supported by hospital programs at Vanderbilt University Medical Center and TriStar Health as well as numerous private-practice IBCLCs.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Nashville IBCLCs take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Nashville-area IBCLCs accept BlueCross BlueShield of Tennessee, Aetna, Cigna, UnitedHealthcare, and TennCare (Tennessee Medicaid). Under the ACA, most insurance plans are required to cover breastfeeding support at no cost to you. Use the insurance filter in the directory to find covered providers near you.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find an IBCLC near Brentwood or Franklin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Nashville-area IBCLCs serve the Williamson County suburbs including Brentwood, Franklin, Spring Hill, and Nolensville — either through in-person office visits, home visits, or telehealth. Search the directory and filter by location to find providers in your specific area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there Nashville IBCLCs who offer home visits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Several Nashville IBCLCs offer home visits across Davidson and Williamson counties. Home visits are especially valuable for new parents navigating Nashville traffic — a home visit means no car seat struggle with a newborn in the first days postpartum.',
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
      { '@type': 'ListItem', position: 3, name: 'Tennessee', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tn` },
      { '@type': 'ListItem', position: 4, name: 'Nashville', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/tn/nashville-tn` },
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
          <Link href="/find/tn" className="hover:text-charcoal-600">Tennessee</Link>
          <span>/</span>
          <span className="text-charcoal-600">Nashville</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Nashville, TN</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Nashville, TN
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Nashville is one of the fastest-growing cities in the South, and its network of board-certified
            lactation consultants has grown with it. Whether you delivered at Vanderbilt University Medical
            Center, TriStar Centennial, Saint Thomas Midtown, or a birth center in East Nashville, experienced
            IBCLCs are available in-person and by telehealth throughout the metro. Tennessee also has one of
            the strongest WIC breastfeeding support networks in the Southeast — and private-practice IBCLCs
            complement that foundation with individualized, longer-session care.
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
                IBCLCs in Nashville, TN
              </h2>
              <Link
                href="/listings?city=Nashville&state=TN"
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
              Search for IBCLCs in Nashville below — new listings added regularly.
            </p>
            <Link href="/listings?city=Nashville&state=TN" className="btn-primary inline-flex items-center gap-2">
              Search Nashville IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Nashville, TN
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse All Tennessee Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Looking for an IBCLC outside Nashville? Tennessee has lactation consultants in Memphis, Knoxville,
            Chattanooga, and across the state.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=TN" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Tennessee IBCLCs →</Link>
            <Link href="/best/ibclcs-in-atlanta-ga" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Atlanta →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
