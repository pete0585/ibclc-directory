import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-columbus-oh' },
  title: 'Find a Lactation Consultant (IBCLC) in Columbus, OH | LactationConsultantDirectory.com',
  description:
    'Find board-certified lactation consultants in Columbus, Ohio. IBCLCs serving the Columbus metro — Dublin, Westerville, Hilliard, and surrounding communities. Insurance accepted. Home visits available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Columbus, OH',
    description:
      'Find verified IBCLCs in Columbus, Ohio. Home visits, telehealth, and insurance coverage serving the full Columbus metro.',
  },
}

async function getColumbusListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['Columbus', 'Dublin', 'Westerville', 'Hilliard', 'Grove City', 'Gahanna'])
    .eq('state', 'OH')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsColumbusPage() {
  const listings = await getColumbusListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Columbus, Ohio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `LactationConsultantDirectory.com lists ${listings.length}+ IBCLCs in the Columbus, OH area. Columbus has one of the strongest breastfeeding support networks in the Midwest, anchored by Nationwide Children's Hospital (which has a nationally recognized NICU lactation program), OhioHealth Riverside, and The Ohio State University Wexner Medical Center. Private-practice IBCLCs serve the suburbs — Dublin, Westerville, Hilliard, and New Albany.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Columbus IBCLCs take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Under the ACA, most insurance plans in Ohio — including Medical Mutual, Anthem BCBS Ohio, UnitedHealthcare, Aetna, and Ohio Medicaid (Buckeye Health, CareSource, Molina, UHC Community) — must cover breastfeeding support at no cost. Columbus has a strong community of IBCLCs who bill insurance directly. Use the insurance filter in the directory to narrow your search.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs in Dublin or Westerville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Columbus's growing northern suburbs — Dublin, Westerville, Hilliard, and New Albany — have IBCLCs who practice locally or offer home visits throughout Franklin County. The Columbus metro has seen a surge in birth professionals serving these communities, making it easier to find an IBCLC close to home.",
        },
      },
      {
        '@type': 'Question',
        name: "Does Nationwide Children's Hospital have lactation consultants?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Nationwide Children's Hospital has a highly regarded NICU lactation program that supports premature infants and complex feeding cases. For families not in the NICU, IBCLCs at OhioHealth Riverside, Mount Carmel, and OhioHealth Dublin Methodist support postpartum breastfeeding. Private IBCLCs listed in this directory supplement hospital-based care with in-home and telehealth visits.",
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
      { '@type': 'ListItem', position: 3, name: 'Ohio', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/oh` },
      { '@type': 'ListItem', position: 4, name: 'Columbus', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-columbus-oh` },
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
          <Link href="/find/oh" className="hover:text-charcoal-600">Ohio</Link>
          <span>/</span>
          <span className="text-charcoal-600">Columbus</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Columbus, OH</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Columbus, OH
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Columbus is home to one of the Midwest&apos;s strongest breastfeeding support ecosystems.
            Nationwide Children&apos;s Hospital&apos;s renowned NICU lactation program, combined with
            OhioHealth and Mount Carmel networks, means Columbus families have access to hospital-based
            IBCLCs at every major delivery site. The city&apos;s growing private-practice IBCLC community
            serves the suburbs with in-home visits and telehealth, making expert lactation support accessible
            across Franklin, Delaware, and Union counties.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>Home visits available</span>
            <span>·</span>
            <span>NICU specialists</span>
            <span>·</span>
            <span>Insurance accepted</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in Columbus, OH
              </h2>
              <Link
                href="/listings?city=Columbus&state=OH"
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
              Search for IBCLCs in Columbus below — new listings added regularly.
            </p>
            <Link href="/listings?city=Columbus&state=OH" className="btn-primary inline-flex items-center gap-2">
              Search Columbus IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Columbus, OH
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse Ohio Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Looking for an IBCLC outside Columbus? Ohio has lactation consultants in Cleveland,
            Cincinnati, Dayton, and across the state.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=OH" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Ohio IBCLCs →</Link>
            <Link href="/best/ibclcs-in-indianapolis-in" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Indianapolis →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/specialties/nicu-support" className="text-sm text-sage-600 hover:text-sage-700 font-medium">NICU Lactation Support →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
