import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/lactation-consultants-in-new-york-ny' },
  title: 'Find a Lactation Consultant in New York, NY | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in New York, New York. Serving Brooklyn, Queens, Bronx, Staten Island. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in New York, NY',
    description:
      'Find verified IBCLCs in New York, New York. Home visits, telehealth, and insurance coverage available.',
  },
}

async function getNewYorkListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['New York', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Hoboken'])
    .eq('state', 'NY')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsNewYorkPage() {
  const listings = await getNewYorkListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How do I find a lactation consultant in New York City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use this directory to find IBCLCs in Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. NYC has IBCLCs serving every major neighborhood and most provide home visits across all five boroughs. Many NYC IBCLCs also offer telehealth consultations for breastfeeding challenges that don\'t require hands-on assessment. NYC Health + Hospitals locations also provide lactation support for Medicaid-enrolled mothers.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do New York City lactation consultants accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Most NYC IBCLCs accept Empire BlueCross BlueShield, United Healthcare, Aetna, Cigna, Healthfirst, MetroPlus, and Medicaid (both Managed Long-Term Care and standard Medicaid). NYC Health + Hospitals IBCLCs serve patients on Medicaid. Under the ACA, all non-grandfathered plans must cover IBCLC services at no cost to you. Use the insurance filter in this directory to confirm your plan.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from a lactation consultant in NYC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Absolutely. NYC has the country\'s largest concentration of home-visiting IBCLCs. Most serve multiple boroughs and offer same-week or next-day availability. In-home visits are especially practical in NYC — no car needed, no stroller-through-subway ordeal with a newborn. Many Manhattan IBCLCs serve Brooklyn and Queens; Brooklyn IBCLCs often cover Staten Island and parts of the Bronx. Expect a travel fee for cross-borough visits.",
        },
      },
      {
        '@type': 'Question',
        name: 'What lactation support is available through NYC public hospitals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "NYC Health + Hospitals (Bellevue, Lincoln, Kings County, Jacobi, and others) all have inpatient lactation programs and some outpatient IBCLC services. Bellevue\'s lactation program is particularly well-resourced. WIC programs throughout NYC provide breast pumps and peer lactation counselor referrals at no cost. The NYC Department of Health runs a Breastfeeding Friendly initiative supporting lactation in health care, childcare, and community settings.",
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
          <Link href="/listings?state=NY" className="hover:text-charcoal-600">New York</Link>
          <span>/</span>
          <span className="text-charcoal-600">New York</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">New York, NY</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in New York, NY
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            New York City has one of the most diverse and resource-rich lactation support communities in the country. NYC's Baby-Friendly Hospital Initiative hospitals — Bellevue, NYU Langone, NewYork-Presbyterian, and others — all have inpatient IBCLC staff, and the city's private-practice community covers every borough and neighborhood from the Upper West Side to Bay Ridge to Forest Hills.
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
                Lactation Consultants in New York, NY
              </h2>
              <Link
                href="/listings?state=NY"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All New York IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in New York below — new listings added regularly.
            </p>
            <Link href="/listings?state=NY" className="btn-primary inline-flex items-center gap-2">
              Search New York IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=NY" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All New York Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
