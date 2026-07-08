import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/lactation-consultants-in-phoenix-az' },
  title: 'Find a Lactation Consultant in Phoenix, AZ | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Phoenix, Arizona. Serving Scottsdale, Tempe, Mesa, Gilbert. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Phoenix, AZ',
    description:
      'Find verified IBCLCs in Phoenix, Arizona. Home visits, telehealth, and insurance coverage available.',
  },
}

async function getPhoenixListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Gilbert', 'Chandler', 'Glendale'])
    .eq('state', 'AZ')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsPhoenixPage() {
  const listings = await getPhoenixListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How many lactation consultants are in Phoenix, AZ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Phoenix and the greater Maricopa County metro have a growing IBCLC community to match Arizona\'s rapid population growth. Banner Health (Banner University Medical Center), Dignity Health, and Mayo Clinic Phoenix all have inpatient lactation programs. This directory lists IBCLCs across Phoenix, Scottsdale, Tempe, Mesa, Gilbert, and Chandler — including private-practice home-visiting IBCLCs who serve the full valley.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do Phoenix lactation consultants accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Phoenix-area IBCLCs accept Blue Cross Blue Shield of Arizona, UnitedHealthcare, Aetna, Cigna, and Arizona Health Care Cost Containment System (AHCCCS, Arizona Medicaid). Under the ACA, most plans cover breastfeeding support at no cost. Arizona WIC also provides lactation support and breast pump access for enrolled mothers. Use the insurance filter in this directory to find IBCLCs who accept your plan.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from a lactation consultant in the Phoenix area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Phoenix metro has a well-established home-visiting IBCLC network. Many IBCLCs in Scottsdale, Tempe, Mesa, and Chandler offer home visits serving the entire valley — including the far East Valley (Queen Creek, Gilbert) and West Valley (Peoria, Surprise, Avondale). Summer heat is a practical consideration: many Phoenix IBCLCs offer early-morning or evening home visit windows.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Phoenix have IBCLC support for NICU families?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Banner University Medical Center Phoenix, Phoenix Children\'s Hospital, and Dignity Health St. Joseph\'s all have NICU lactation programs. Phoenix has a high preterm birth rate relative to some metros, and Phoenix IBCLCs have significant experience with pumping support, donor milk coordination, and the challenging transition from NICU to home breastfeeding. Ask your hospital IBCLC for a community referral before discharge.",
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
          <Link href="/listings?state=AZ" className="hover:text-charcoal-600">Arizona</Link>
          <span>/</span>
          <span className="text-charcoal-600">Phoenix</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Phoenix, AZ</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Phoenix, AZ
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Phoenix has one of the largest and fastest-growing birth communities in the Southwest, with Banner Health, Dignity Health St. Joseph's, and Valleywise Health all running inpatient lactation programs. The hot desert climate and multigenerational Hispanic and Indigenous families give Phoenix IBCLCs unique experience with extended breastfeeding, milk sharing networks, and culturally competent care.
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
                Lactation Consultants in Phoenix, AZ
              </h2>
              <Link
                href="/listings?state=AZ"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Arizona IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Phoenix below — new listings added regularly.
            </p>
            <Link href="/listings?state=AZ" className="btn-primary inline-flex items-center gap-2">
              Search Arizona IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=AZ" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Arizona Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
