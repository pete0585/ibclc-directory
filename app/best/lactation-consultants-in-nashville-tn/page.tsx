import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant in Nashville, TN | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Nashville, Tennessee. Serving Brentwood, Franklin, Murfreesboro, and the Nashville metro. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Nashville, TN',
    description:
      'Find verified IBCLCs in Nashville, Tennessee. Home visits, telehealth, and insurance coverage — serving the full Nashville metro.',
  },
}

async function getNashvilleListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Nashville', 'Brentwood', 'Franklin', 'Murfreesboro', 'Hendersonville'])
    .eq('state', 'TN')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsNashvillePage() {
  const listings = await getNashvilleListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are there IBCLCs at Vanderbilt in Nashville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Vanderbilt University Medical Center has in-hospital lactation consultants for patients who deliver there. However, hospital IBCLCs typically provide brief visits during your stay — often 15-30 minutes with a high patient load. Private-practice IBCLCs in Nashville offer longer, more thorough appointments (60-90 minutes) and can follow your family for weeks after discharge.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover lactation consultants in Tennessee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Under the Affordable Care Act, most insurance plans are required to cover breastfeeding support and lactation counseling. TennCare, BlueCross BlueShield of Tennessee, and Cigna are commonly accepted by Nashville-area IBCLCs. Confirm with your specific plan that the IBCLC you choose is in-network or accepts out-of-network reimbursement.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find a lactation consultant near me in Nashville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use this directory to search by city or zip code. Nashville is a rapidly growing city with a large population of young families, and the IBCLC community has grown alongside it. Filter by service type (home visit, telehealth, clinic), insurance acceptance, and specialty to find the right match for your situation.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a lactation consultant online in Tennessee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Telehealth lactation support is available throughout Tennessee. Many Nashville-area IBCLCs offer video consultations for supply concerns, pumping questions, and latch coaching. Telehealth is particularly convenient for families in Williamson County, Rutherford County, or the outer Nashville suburbs where traffic can make in-person visits a challenge.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <Link href="/listings?state=TN" className="hover:text-charcoal-600">Tennessee</Link>
          <span>/</span>
          <span className="text-charcoal-600">Nashville</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Nashville, TN</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Nashville, TN
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Nashville is one of the fastest-growing cities in the country, with a large and growing
            community of young families. Vanderbilt University Medical Center and TriStar Health System
            provide in-hospital lactation support — but for the extended, personalized care that most
            new parents need after discharge, private-practice IBCLCs throughout Nashville, Brentwood,
            Franklin, and Murfreesboro are ready to help.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '20+'} IBCLCs listed</span>
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
                Lactation Consultants in Nashville, TN
              </h2>
              <Link
                href="/listings?state=TN"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Tennessee IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Nashville below — new listings added regularly.
            </p>
            <Link href="/listings?state=TN" className="btn-primary inline-flex items-center gap-2">
              Search Tennessee IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Frequently Asked Questions
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
            <Link href="/listings?state=TN" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Tennessee Lactation Consultants →</Link>
            <Link href="/resources/first-ibclc-visit" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What to Expect at Your First IBCLC Visit →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
