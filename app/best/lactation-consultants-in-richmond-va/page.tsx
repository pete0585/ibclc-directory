import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant in Richmond, VA | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Richmond, Virginia. Serving Henrico, Chesterfield, Midlothian, and the Richmond metro. TRICARE accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Richmond, VA',
    description:
      'Find verified IBCLCs in Richmond, Virginia. Home visits, telehealth, and TRICARE/insurance coverage — serving the full Richmond metro.',
  },
}

async function getRichmondListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Richmond', 'Henrico', 'Chesterfield', 'Midlothian', 'Colonial Heights'])
    .eq('state', 'VA')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsRichmondPage() {
  const listings = await getRichmondListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are there IBCLCs at VCU Medical Center in Richmond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "VCU Health System and Bon Secours Richmond both have in-hospital lactation consultants who see patients during their birth stays. Hospital IBCLCs typically provide brief visits during your admission. Private-practice IBCLCs in Richmond offer longer appointments — typically 60-90 minutes — and can continue supporting your family for weeks after you leave the hospital.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does TRICARE cover lactation consultants in Virginia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. TRICARE covers IBCLC visits for active duty family members. Richmond has a significant military family population due to proximity to Fort Gregg-Adams (formerly Fort Lee) and other installations in the region. Many Richmond-area IBCLCs are experienced working with military families and accept TRICARE. Confirm with your specific TRICARE plan (Prime, Select, or Reserve Select) before scheduling.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a lactation consultant home visit in Richmond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Many IBCLCs in the Richmond metro area offer home visits throughout the city and into Henrico County, Chesterfield County, and Midlothian. A home visit lets the IBCLC observe your nursing setup in your actual environment — your nursing chair, your lighting, your positioning — which often uncovers issues that a clinic visit would miss.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is an IBCLC vs. a lactation counselor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "An IBCLC (International Board Certified Lactation Consultant) is the gold standard credential in lactation care. It requires 1,000+ hours of clinical experience, completion of specific health science coursework, and passing a rigorous international board exam. A Certified Lactation Counselor (CLC) or Certified Breastfeeding Specialist (CBS) has less training — typically 45-90 hours. For complex issues like tongue tie, low supply, or returning to work, an IBCLC is the appropriate choice.",
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
          <Link href="/listings?state=VA" className="hover:text-charcoal-600">Virginia</Link>
          <span>/</span>
          <span className="text-charcoal-600">Richmond</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Richmond, VA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Richmond, VA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Richmond has a well-established lactation support community serving families throughout the
            city and across Henrico County, Chesterfield County, and Midlothian. VCU Health System and
            Bon Secours Richmond provide in-hospital lactation support, while private-practice IBCLCs
            offer the extended, personalized care that families need after discharge. Richmond&apos;s
            strong military family community means many local IBCLCs have experience accepting TRICARE.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '20+'} IBCLCs listed</span>
            <span>·</span>
            <span>Home visits available</span>
            <span>·</span>
            <span>TRICARE accepted</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                Lactation Consultants in Richmond, VA
              </h2>
              <Link
                href="/listings?state=VA"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Virginia IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Richmond below — new listings added regularly.
            </p>
            <Link href="/listings?state=VA" className="btn-primary inline-flex items-center gap-2">
              Search Virginia IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=VA" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Virginia Lactation Consultants →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
