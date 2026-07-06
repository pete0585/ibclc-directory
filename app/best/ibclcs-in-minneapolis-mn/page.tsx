import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-minneapolis-mn' },
  title: 'Find a Lactation Consultant (IBCLC) in Minneapolis, MN | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Minneapolis, MN and the Twin Cities metro. IBCLCs across Minneapolis, Saint Paul, and surrounding suburbs. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in Minneapolis, MN',
    description:
      'Find verified IBCLCs in Minneapolis and the Twin Cities metro. Home visits, telehealth, and insurance coverage across the Minneapolis-Saint Paul area.',
  },
}

async function getMinneapolisListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('state', 'MN')
    .in('city', ['Minneapolis', 'Saint Paul'])
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsMinneapolisPage() {
  const listings = await getMinneapolisListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs practice in Minneapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs across Minneapolis and the Twin Cities metro. The area has a strong breastfeeding culture and well-established lactation support through Allina Health, M Health Fairview, and Hennepin Healthcare hospital programs — plus numerous private-practice IBCLCs serving families across the metro.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs in the Minneapolis suburbs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Twin Cities metro has IBCLCs throughout the suburbs including Edina, Minnetonka, Eden Prairie, Maple Grove, Plymouth, Eagan, and Woodbury. Many private-practice IBCLCs serve multiple suburbs, and telehealth options are widely available for families across greater Minnesota.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Minnesota IBCLCs accept Medicaid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Minnesota IBCLCs accept Medical Assistance (Minnesota Medicaid) and MinnesotaCare. Minnesota has historically been one of the stronger states for Medicaid coverage of breastfeeding services. Use the insurance filter in the directory to find IBCLCs who bill your specific plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get an IBCLC home visit in Minneapolis or Saint Paul?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Several Twin Cities IBCLCs offer home visits across Hennepin and Ramsey counties. Home visits are particularly valued during Minnesota winters — the idea of loading a newborn into a frozen car for an office visit is not appealing, and a home visit brings expert support directly to you.',
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
      { '@type': 'ListItem', position: 3, name: 'Minnesota', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/mn` },
      { '@type': 'ListItem', position: 4, name: 'Minneapolis', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/mn/minneapolis-mn` },
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
          <Link href="/find/mn" className="hover:text-charcoal-600">Minnesota</Link>
          <span>/</span>
          <span className="text-charcoal-600">Minneapolis</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Minneapolis, MN</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in Minneapolis, MN
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            The Twin Cities metro has one of the Midwest's most supportive breastfeeding communities. Whether
            you delivered at Allina Health Abbott Northwestern, M Health Fairview, Hennepin Healthcare, or a
            birth center in Saint Paul, experienced IBCLCs are available throughout the metro. Minnesota has
            a strong tradition of breastfeeding support — from robust WIC programs to private-practice IBCLCs
            serving families across Hennepin, Ramsey, and surrounding counties.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>Twin Cities metro coverage</span>
            <span>·</span>
            <span>Telehealth statewide</span>
            <span>·</span>
            <span>Insurance accepted</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs in Minneapolis &amp; Saint Paul
              </h2>
              <Link
                href="/listings?state=MN&city=Minneapolis"
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
              Search for IBCLCs in Minneapolis and the Twin Cities below — new listings added regularly.
            </p>
            <Link href="/listings?state=MN" className="btn-primary inline-flex items-center gap-2">
              Search Twin Cities IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Minneapolis &amp; Saint Paul
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse All Minnesota Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Minnesota IBCLCs serve families throughout the state. Find lactation support in Rochester,
            Duluth, Saint Cloud, and beyond.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=MN" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Minnesota IBCLCs →</Link>
            <Link href="/best/ibclcs-in-chicago-il" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Chicago →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/home-visit-vs-telehealth" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Home Visit vs. Telehealth →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
