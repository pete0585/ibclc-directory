import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/lactation-consultants-in-charlotte-nc' },
  title: 'Find a Lactation Consultant in Charlotte, NC | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Charlotte, North Carolina. Serving Concord, Gastonia, Mooresville, and the Charlotte metro. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Charlotte, NC',
    description:
      'Find verified IBCLCs in Charlotte, NC. Home visits, telehealth, and insurance coverage — serving the full Charlotte metro area.',
  },
}

async function getCharlotteListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Charlotte', 'Concord', 'Gastonia', 'Mooresville', 'Huntersville', 'Kannapolis'])
    .eq('state', 'NC')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsCharlottePage() {
  const listings = await getCharlotteListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many lactation consultants are in Charlotte, NC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Charlotte is one of the fastest-growing metros in the Southeast, and its IBCLC community has grown with it. This directory lists ${listings.length > 0 ? listings.length + '+' : 'many'} IBCLCs serving Charlotte and the surrounding communities including Concord, Gastonia, Mooresville, and Huntersville. Atrium Health and Novant Health — the two dominant health systems in Charlotte — both have inpatient lactation programs at their maternity hospitals.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Charlotte lactation consultants accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Charlotte-area IBCLCs accept Blue Cross Blue Shield of North Carolina, UnitedHealthcare, Aetna, Cigna, and NC Medicaid. Under the Affordable Care Act, most insurance plans are required to cover breastfeeding support and lactation counseling with no cost-sharing. North Carolina does not have a statewide lactation credential requirement for insurance reimbursement, but ACA-compliant plans must cover IBCLC services. Check your plan before scheduling.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is lactation support available for military families near Charlotte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Military families relocating from Fort Liberty (formerly Fort Bragg) frequently move to the Charlotte metro, and the region has IBCLCs who understand the unique challenges military families face — frequent moves, inconsistent support networks, and healthcare transitions. TRICARE covers breastfeeding support and lactation counseling for active duty and dependent families. Several Charlotte-area IBCLCs specifically work with military families.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from a lactation consultant in Charlotte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Charlotte-area IBCLCs offer home visits throughout the metro and surrounding suburbs including Concord, Gastonia, Mooresville, and Huntersville. A home visit allows the IBCLC to observe your nursing setup in your actual environment — your chair, your nursing pillow, your lighting — and offer guidance tailored to your home circumstances. Most Charlotte IBCLCs can accommodate new families within the first week postpartum.',
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
          <Link href="/listings?state=NC" className="hover:text-charcoal-600">North Carolina</Link>
          <span>/</span>
          <span className="text-charcoal-600">Charlotte</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Charlotte, NC</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Charlotte, NC
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Charlotte is one of the fastest-growing cities in the Southeast, and its IBCLC community
            reflects that growth. Atrium Health and Novant Health — the city&apos;s two dominant health
            systems — both have inpatient lactation programs at their maternity hospitals. The metro
            also includes a significant military community, with families relocating from Fort Liberty
            frequently settling throughout the Charlotte area. Most ACA-compliant insurance plans cover
            IBCLC visits, and home-visiting lactation consultants are available throughout the metro.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '20+'} IBCLCs listed</span>
            <span>·</span>
            <span>Home visits available</span>
            <span>·</span>
            <span>Telehealth options</span>
            <span>·</span>
            <span>TRICARE accepted</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                Lactation Consultants in Charlotte, NC
              </h2>
              <Link
                href="/listings?state=NC"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All North Carolina IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Charlotte below — new listings added regularly.
            </p>
            <Link href="/listings?state=NC" className="btn-primary inline-flex items-center gap-2">
              Search North Carolina IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=NC" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All North Carolina Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
