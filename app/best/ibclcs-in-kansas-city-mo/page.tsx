import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant (IBCLC) in Kansas City, MO | LactationConsultantDirectory.com',
  description:
    'Find board-certified lactation consultants in Kansas City, Missouri and Kansas. IBCLCs serving both sides of the state line — Overland Park, Lenexa, Lee\'s Summit, and beyond. Insurance accepted.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Kansas City',
    description:
      'Find verified IBCLCs in Kansas City, MO and KS. Home visits, telehealth, and insurance coverage across the metro.',
  },
}

async function getKansasCityListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Kansas City', 'Overland Park', 'Olathe', "Lee's Summit", 'Independence', 'Lenexa'])
    .in('state', ['MO', 'KS'])
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsKansasCityPage() {
  const listings = await getKansasCityListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Kansas City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `LactationConsultantDirectory.com lists ${listings.length}+ IBCLCs in the Kansas City metro — covering both the Missouri and Kansas sides of the state line. IBCLCs serve families at major delivery hospitals including AdventHealth Shawnee Mission, Research Medical Center, Overland Park Regional, and Liberty Hospital, as well as through private practices and home visit services across Johnson County, KS and Jackson County, MO.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Kansas City IBCLCs serve both Missouri and Kansas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Kansas City metro spans both states, and many IBCLCs are licensed in both Missouri and Kansas. Whether you're in Overland Park, Olathe, or Lenexa on the Kansas side, or Lee's Summit, Independence, or Blue Springs in Missouri — this directory covers IBCLCs across the full bi-state metro. Use the city or zip filter to find someone near you.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do Kansas City IBCLCs take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Under the ACA, most insurance plans must cover breastfeeding support at no cost. In Kansas City, major plans include Blue Cross Blue Shield of Kansas, Blue Cross Blue Shield of Kansas City, Aetna, Cigna, UnitedHealthcare, Missouri Medicaid (MO HealthNet), and Kansas Medicaid. Many IBCLCs in the metro accept one or more of these plans directly.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find a home visit IBCLC in Kansas City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Home visit IBCLCs are well-established in the Kansas City area and serve both the Missouri and Kansas sides of the metro. Home visits are particularly valuable in the first days after hospital discharge, when breastfeeding challenges are most acute and driving is difficult.",
        },
      },
    ],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Kansas City', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-kansas-city-mo` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Kansas City</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Kansas City, MO/KS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Kansas City
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Kansas City&apos;s breastfeeding support community spans both sides of the Missouri-Kansas
            state line. Whether you&apos;re in the Missouri suburbs (Lee&apos;s Summit, Independence,
            Blue Springs) or the Johnson County, KS communities (Overland Park, Olathe, Lenexa),
            there are board-certified IBCLCs serving the full metro. Hospital-based consultants at
            AdventHealth Shawnee Mission, Overland Park Regional, and Research Medical Center are
            complemented by private IBCLCs who offer home visits and telehealth across the bi-state area.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>MO &amp; KS coverage</span>
            <span>·</span>
            <span>Home visits available</span>
            <span>·</span>
            <span>Insurance accepted</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in Kansas City
              </h2>
              <Link
                href="/listings?city=Kansas City&state=MO"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                See all results <ArrowRight className="h-4 w-4" />
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
              Search for IBCLCs in Kansas City below — new listings added regularly.
            </p>
            <Link href="/listings?city=Kansas City&state=MO" className="btn-primary inline-flex items-center gap-2">
              Search Kansas City IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Kansas City
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Midwest Lactation Consultant Directory</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=MO" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Missouri IBCLCs →</Link>
            <Link href="/listings?state=KS" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Kansas IBCLCs →</Link>
            <Link href="/best/ibclcs-in-st-louis-mo" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in St. Louis →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
