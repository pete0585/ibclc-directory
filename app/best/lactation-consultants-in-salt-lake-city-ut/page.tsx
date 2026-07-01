import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant in Salt Lake City, UT | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in Salt Lake City, Utah. Serving Murray, West Jordan, Sandy, and the Salt Lake metro. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in Salt Lake City, UT',
    description:
      'Find verified IBCLCs in Salt Lake City, Utah. Home visits, telehealth, and insurance coverage — serving the full Salt Lake metro.',
  },
}

async function getSaltLakeListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Salt Lake City', 'Murray', 'West Jordan', 'Sandy', 'Taylorsville', 'Midvale', 'South Jordan'])
    .eq('state', 'UT')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsSaltLakePage() {
  const listings = await getSaltLakeListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many lactation consultants are in Salt Lake City, UT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Utah has the highest birth rate of any US state, and Salt Lake City has a corresponding IBCLC community to support it. This directory lists ${listings.length > 0 ? listings.length + '+' : 'many'} IBCLCs across the Salt Lake metro, including consultants serving Salt Lake City, Murray, West Jordan, Sandy, and South Jordan. Intermountain Health and the University of Utah Health — both holding Baby-Friendly hospital designations — have inpatient lactation programs, and many IBCLCs also offer private-practice and home visit services.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Salt Lake City lactation consultants accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Salt Lake City IBCLCs accept SelectHealth (an Intermountain Health plan), DMBA (Deseret Mutual Benefit Administrators), BCBS of Utah, UnitedHealthcare, and Utah Medicaid. Under the Affordable Care Act, most insurance plans are required to cover breastfeeding support and lactation counseling at no cost to you. Utah's large employer base (tech, healthcare, finance in the Salt Lake metro) means many families have ACA-compliant employer-sponsored plans. Use the insurance filter in this directory to confirm coverage.",
        },
      },
      {
        '@type': 'Question',
        name: 'What makes lactation support in Utah unique?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Utah has both the highest birth rate in the US and one of the highest rates of breastfeeding initiation — driven in part by strong cultural values around family. Many Utah families have two, three, four, or more children, and IBCLCs here frequently work with mothers who are experienced with breastfeeding but encountering a new challenge with a later baby (such as a tongue-tied infant, low supply, or nursing while managing older siblings). The experienced IBCLC community in Salt Lake is well-equipped for families at any stage.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there Baby-Friendly hospitals in Salt Lake City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Both Intermountain Medical Center and University of Utah Hospital have been recognized for their breastfeeding support programs, with IBCLCs on staff in their maternity units. Baby-Friendly designation indicates a hospital has implemented the WHO/UNICEF Ten Steps to Successful Breastfeeding, including keeping mothers and babies together and providing breastfeeding support. After discharge, the Salt Lake area's private-practice IBCLCs provide the follow-up care most families need.",
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
          <Link href="/listings?state=UT" className="hover:text-charcoal-600">Utah</Link>
          <span>/</span>
          <span className="text-charcoal-600">Salt Lake City</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Salt Lake City, UT</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in Salt Lake City, UT
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Utah has the highest birth rate of any US state — and one of the highest breastfeeding
            initiation rates. Salt Lake City&apos;s IBCLC community is active and experienced with the
            unique demands of larger Utah families. Intermountain Health and the University of Utah
            Health both hold Baby-Friendly hospital designations with IBCLCs on staff, while the
            city&apos;s private-practice lactation consultants provide the personalized follow-up care
            that makes a lasting difference after discharge.
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
                Lactation Consultants in Salt Lake City, UT
              </h2>
              <Link
                href="/listings?state=UT"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All Utah IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in Salt Lake City below — new listings added regularly.
            </p>
            <Link href="/listings?state=UT" className="btn-primary inline-flex items-center gap-2">
              Search Utah IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=UT" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All Utah Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
