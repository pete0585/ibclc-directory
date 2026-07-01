import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant in Minneapolis, MN | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Minneapolis, Minnesota. Serving Saint Paul, Bloomington, Edina, Minnetonka, and the Twin Cities metro. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Minneapolis, MN',
    description:
      'Find verified IBCLCs in Minneapolis, Minnesota. Home visits, telehealth, and insurance coverage — serving the full Twin Cities metro area.',
  },
}

async function getMinneapolisListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Minneapolis', 'Saint Paul', 'Bloomington', 'Edina', 'Minnetonka', 'Plymouth', 'Maple Grove'])
    .eq('state', 'MN')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsMinneapolisPage() {
  const listings = await getMinneapolisListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many lactation consultants are in Minneapolis, MN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Minneapolis and the Twin Cities metro have one of the strongest IBCLC-to-birth ratios in the Midwest. This directory lists ${listings.length > 0 ? listings.length + '+' : 'many'} IBCLCs serving the area — including private-practice consultants in Minneapolis, Saint Paul, and the surrounding suburbs. Children's Minnesota and M Health Fairview (University of Minnesota) both have inpatient lactation programs, and the region has a strong community of home-visiting IBCLCs.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Minneapolis lactation consultants accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Twin Cities IBCLCs accept Blue Cross Blue Shield of Minnesota, HealthPartners, Medica, PreferredOne, and Minnesota Medicaid (Medical Assistance). Under the Affordable Care Act, most insurance plans are required to cover breastfeeding support and lactation counseling at no cost to you. Minnesota's WIC program also provides excellent lactation support referrals and peer counselor services. Use the insurance filter in this directory to find IBCLCs who accept your plan.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from a lactation consultant in Minneapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Minneapolis has a well-established network of home-visiting IBCLCs who serve the city and surrounding suburbs including Saint Paul, Bloomington, Edina, Minnetonka, Plymouth, and Maple Grove. Home visits are often the most practical option in the first weeks — no need to bundle a newborn for a winter car trip. Many Twin Cities IBCLCs offer same-week or next-day home visit availability.',
        },
      },
      {
        '@type': 'Question',
        name: 'What lactation support is available through Children\'s Minnesota or M Health Fairview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Both Children's Minnesota and M Health Fairview (University of Minnesota) have inpatient lactation programs with IBCLCs on staff in their maternity units. These hospital IBCLCs provide support during your inpatient stay — but for the more thorough, one-on-one follow-up appointments most families need at home, private-practice IBCLCs in the Twin Cities metro are the right next step. Your hospital IBCLC can provide a referral before you're discharged.",
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
          <Link href="/listings?state=MN" className="hover:text-charcoal-600">Minnesota</Link>
          <span>/</span>
          <span className="text-charcoal-600">Minneapolis</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Minneapolis, MN</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Minneapolis, MN
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Minneapolis and the Twin Cities have one of the Midwest&apos;s strongest lactation support
            networks. Children&apos;s Minnesota and M Health Fairview (University of Minnesota) both run
            inpatient IBCLC programs — but for the longer, more personalized follow-up appointments
            most families need after discharge, the region&apos;s private-practice IBCLC community delivers.
            Minnesota&apos;s WIC program also provides excellent breastfeeding referrals, and most major
            insurance plans active in the state cover IBCLC visits under ACA mandates.
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
                Lactation Consultants in Minneapolis, MN
              </h2>
              <Link
                href="/listings?state=MN"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Minnesota IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Minneapolis below — new listings added regularly.
            </p>
            <Link href="/listings?state=MN" className="btn-primary inline-flex items-center gap-2">
              Search Minnesota IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=MN" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Minnesota Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
