import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/lactation-consultants-in-san-diego-ca' },
  title: 'Find a Lactation Consultant in San Diego, CA | Lactation Consultant Directory',
  description:
    'Find board-certified IBCLCs and lactation consultants in San Diego, California. Serving Chula Vista, Escondido, Carlsbad, Oceanside. Insurance accepted. Home visits and telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant in San Diego, CA',
    description:
      'Find verified IBCLCs in San Diego, California. Home visits, telehealth, and insurance coverage available.',
  },
}

async function getSanDiegoListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['San Diego', 'Chula Vista', 'Escondido', 'Carlsbad', 'Oceanside', 'El Cajon', 'La Mesa'])
    .eq('state', 'CA')
    .order('plan_tier', { ascending: false })
    .limit(20)
  return data ?? []
}

export default async function LactationConsultantsSanDiegoPage() {
  const listings = await getSanDiegoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How many lactation consultants are in San Diego?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "San Diego and North County San Diego have a strong IBCLC community spanning Chula Vista, Escondido, Carlsbad, El Cajon, and Oceanside. Naval Medical Center San Diego has one of the busiest military inpatient lactation programs in the country. UC San Diego Health (UCSD) also has a robust lactation program at its La Jolla and Hillcrest campuses. This directory lists private-practice IBCLCs offering home visits, office consultations, and telehealth across the county.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do San Diego IBCLCs support military families?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. San Diego has the largest concentration of active-duty military personnel in the U.S. Many IBCLCs in San Diego, Chula Vista, Oceanside, and Carlsbad have specific experience supporting Navy, Marine Corps, and Coast Guard families — including pumping while on duty, breastfeeding plans around deployment schedules, and long-distance support during extended separations. Naval Medical Center San Diego (Balboa Hospital) has an active IBCLC staff.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover lactation consultants in San Diego?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Under California law (AB 1902) and the federal ACA, most health plans covering California residents must cover breastfeeding support and lactation counseling at no cost. Major San Diego insurers — Anthem Blue Cross, Health Net, Sharp Health Plan, and Medi-Cal — all fall under these mandates. TRICARE covers IBCLC services for military families. San Diego WIC programs also provide pumps and peer lactation support.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can a San Diego lactation consultant do home visits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. San Diego IBCLCs routinely do home visits across all of San Diego County — from Chula Vista and National City in the south to Carlsbad and Vista in North County. Home visits are practical in car-dependent San Diego, especially for military families on base who may not have easy access to off-base provider offices. Many IBCLCs offer weekend availability for service members with demanding weekday schedules.",
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
          <Link href="/listings?state=CA" className="hover:text-charcoal-600">California</Link>
          <span>/</span>
          <span className="text-charcoal-600">San Diego</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">San Diego, CA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant in San Diego, CA
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            San Diego has a large, military-connected birth community — Naval Medical Center San Diego (Balboa) is one of the busiest military birthing hospitals in the country. The region's IBCLCs have deep experience with military family breastfeeding challenges including frequent deployment separations, pumping while on duty, and long-distance breastfeeding support for service members.
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
                Lactation Consultants in San Diego, CA
              </h2>
              <Link
                href="/listings?state=CA"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse All California IBCLCs <ArrowRight className="h-4 w-4" />
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
              Search for lactation consultants in San Diego below — new listings added regularly.
            </p>
            <Link href="/listings?state=CA" className="btn-primary inline-flex items-center gap-2">
              Search California IBCLCs <ArrowRight className="h-4 w-4" />
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
            <Link href="/listings?state=CA" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All California Lactation Consultants →</Link>
            <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
