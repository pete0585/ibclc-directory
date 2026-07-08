import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/lactation-consultants-in-portland-or' },
  title: 'Find a Lactation Consultant in Portland, OR | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Portland, Oregon. Serving Beaverton, Hillsboro, Gresham, Tigard. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Portland, OR',
    description:
      'Find verified IBCLCs in Portland, Oregon. Home visits, telehealth, and insurance coverage available.',
  },
}

async function getPortlandListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Portland', 'Beaverton', 'Hillsboro', 'Gresham', 'Tigard', 'Lake Oswego', 'Vancouver WA'])
    .eq('state', 'OR')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsPortlandPage() {
  const listings = await getPortlandListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How do I find an IBCLC in Portland, OR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use this directory to find board-certified IBCLCs in Portland, Beaverton, Hillsboro, Lake Oswego, Tigard, and Gresham — and across the Columbia River in Vancouver, WA. Portland has a notably high density of IBCLCs per capita. Oregon Health & Science University (OHSU) has one of the best academic lactation programs in the Pacific Northwest. Many Portland IBCLCs offer home visits, evening appointments, and telehealth for families outside the city core.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Oregon require insurance to cover lactation consultants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Oregon law (ORS 743B.010) requires health insurance plans regulated in Oregon to cover preventive care including breastfeeding support — often at $0 cost-sharing for in-network IBCLCs. PeachState, OHP (Oregon Health Plan / Medicaid), Providence Health Plan, Moda Health, and Regence BlueCross BlueShield of Oregon all fall under state mandates. Oregon WIC programs provide pumps and peer lactation support at no cost.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can a Portland IBCLC do home visits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Portland has a robust home-visiting IBCLC community. Most serve the full metro including East Portland, Beaverton, Hillsboro, Lake Oswego, and often cross into SW Washington (Vancouver, Camas). Public transit in Portland is excellent but with a newborn, home visits are often the most practical option. Rain is not a factor — Portland IBCLCs are accustomed to year-round home visit schedules.",
        },
      },
      {
        '@type': 'Question',
        name: 'What lactation support exists at OHSU and Legacy Health in Portland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "OHSU Doernbecher Children\'s Hospital and OHSU\'s main campus have strong inpatient lactation programs with IBCLCs on staff in the Mother-Baby Unit. Legacy Emanuel, Legacy Good Samaritan, and Providence Portland Medical Center also have inpatient lactation programs. After discharge, these hospital programs typically refer families to private-practice IBCLCs in the community for the longer, one-on-one follow-up appointments most families need.",
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
          <Link href="/listings?state=OR" className="hover:text-charcoal-600">Oregon</Link>
          <span>/</span>
          <span className="text-charcoal-600">Portland</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Portland, OR</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Portland, OR
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Portland has one of the highest breastfeeding initiation and continuation rates of any major US metro, reflecting a progressive healthcare culture and strong community support. Oregon Health & Science University (OHSU) has a nationally recognized lactation program, and Portland's dense network of private-practice IBCLCs — many offering home visits across the metro and into SW Washington — supports the region's high breastfeeding goals.
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
                Lactation Consultants in Portland, OR
              </h2>
              <Link
                href="/listings?state=OR"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Oregon IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Portland below — new listings added regularly.
            </p>
            <Link href="/listings?state=OR" className="btn-primary inline-flex items-center gap-2">
              Search Oregon IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=OR" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Oregon Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
