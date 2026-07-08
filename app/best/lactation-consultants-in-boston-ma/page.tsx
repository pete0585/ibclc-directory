import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/lactation-consultants-in-boston-ma' },
  title: 'Find a Lactation Consultant in Boston, MA | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Boston, Massachusetts. Serving Cambridge, Somerville, Brookline, Newton. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Boston, MA',
    description:
      'Find verified IBCLCs in Boston, Massachusetts. Home visits, telehealth, and insurance coverage available.',
  },
}

async function getBostonListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Boston', 'Cambridge', 'Somerville', 'Brookline', 'Newton', 'Quincy', 'Medford'])
    .eq('state', 'MA')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsBostonPage() {
  const listings = await getBostonListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How many lactation consultants are in Boston, MA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Boston and Greater Boston have a dense IBCLC community serving families from Cambridge, Somerville, and Brookline to Newton, Wellesley, and the South Shore. Brigham and Women\'s Hospital — one of the country\'s busiest academic birthing hospitals — has a large inpatient IBCLC team. Beth Israel Deaconess Medical Center and Mass General also have active lactation programs. Private-practice IBCLCs in the Boston area often offer same-week availability and home visits across the metro.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do Boston area IBCLCs accept health insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Boston-area IBCLCs accept Blue Cross Blue Shield of Massachusetts (the dominant insurer), Harvard Pilgrim Health Care, Tufts Health Plan, Aetna, Cigna, and MassHealth (Massachusetts Medicaid). Under the ACA and Massachusetts state law, most insurance plans must cover preventive breastfeeding support at no out-of-pocket cost. Massachusetts has consistently strong insurance mandates protecting breastfeeding coverage. Use the insurance filter in this directory to find IBCLCs who accept your plan.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from a lactation consultant in Boston?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Boston has an active home-visiting IBCLC community. Many IBCLCs serve Central Boston (Back Bay, South End, South Boston) and the inner suburbs (Cambridge, Somerville, Brookline, Newton) and often extend to the North Shore, South Shore, and MetroWest. Boston parking challenges actually make home visits particularly practical — no need to navigate Longwood Medical Area traffic with a newborn. Many Boston IBCLCs offer weekend and evening appointments.",
        },
      },
      {
        '@type': 'Question',
        name: 'What lactation support is available at Brigham and Women's Hospital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Brigham and Women\'s Hospital has one of the most active inpatient IBCLC programs in New England, with IBCLCs available 7 days a week on the Labor & Delivery and Mother-Baby units. Beth Israel Deaconess Medical Center and Newton-Wellesley Hospital also have inpatient IBCLCs. After discharge, most Boston-area hospital IBCLCs recommend follow-up with private-practice IBCLCs for the individualized, longer appointments that inpatient visits can\'t provide.",
        },
      }
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
          <Link href="/listings?state=MA" className="hover:text-charcoal-600">Massachusetts</Link>
          <span>/</span>
          <span className="text-charcoal-600">Boston</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Boston, MA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Boston, MA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Boston is home to some of the world's leading academic medical centers — Brigham and Women's, Beth Israel Deaconess, and Mass General — all of which have active inpatient IBCLC programs. Boston's educated, health-conscious population drives one of the highest IBCLC utilization rates in the Northeast, and the city's private-practice lactation consultant community serves families across Greater Boston and the MetroWest suburbs.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '15+'} IBCLCs listed</span>
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
                Lactation Consultants in Boston, MA
              </h2>
              <Link
                href="/listings?state=MA"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Massachusetts IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Boston below — new listings added regularly.
            </p>
            <Link href="/listings?state=MA" className="btn-primary inline-flex items-center gap-2">
              Search Massachusetts IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=MA" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Massachusetts Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
