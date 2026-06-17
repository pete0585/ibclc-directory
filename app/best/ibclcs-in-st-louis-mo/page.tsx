import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find a Lactation Consultant (IBCLC) in St. Louis, MO | LactationConsultantDirectory.com',
  description:
    'Find board-certified lactation consultants in St. Louis, Missouri. IBCLCs serving the St. Louis metro — Clayton, Chesterfield, Kirkwood, and St. Charles County. Insurance accepted. Telehealth available.',
  openGraph: {
    title: 'Find a Lactation Consultant (IBCLC) in St. Louis, MO',
    description:
      'Find verified IBCLCs in St. Louis, Missouri. Home visits, telehealth, and insurance coverage — serving the full St. Louis metro.',
  },
}

async function getStLouisListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .in('city', ['St. Louis', 'Saint Louis', 'Clayton', 'Chesterfield', 'Kirkwood'])
    .eq('state', 'MO')
    .order('plan_tier', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function BestIbclcsStLouisPage() {
  const listings = await getStLouisListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in St. Louis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `LactationConsultantDirectory.com lists ${listings.length}+ IBCLCs in the St. Louis, MO area. The St. Louis metro has a well-established lactation support community across St. Louis City, St. Louis County, and St. Charles County. Major hospital systems — BJC HealthCare (Barnes-Jewish, Missouri Baptist), SSM Health (St. Mary's, DePaul), and Mercy Hospital — all have in-hospital IBCLC programs, complemented by private-practice consultants throughout the suburbs.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do St. Louis IBCLCs take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Most health plans in Missouri — including Anthem Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, and Missouri Medicaid (MO HealthNet) — are required to cover breastfeeding support under the ACA. Use the insurance filter in the directory to find covered IBCLCs in your network.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there IBCLCs in the western suburbs like Chesterfield or Kirkwood?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Several IBCLCs serve western St. Louis County communities including Chesterfield, Kirkwood, Webster Groves, and Ballwin — either in a private practice setting or through home visits. The metro's suburban sprawl means telehealth and home visit IBCLCs are particularly popular for families who want to avoid a long drive with a newborn.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find a telehealth IBCLC in Missouri?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Missouri has telehealth-friendly rules for lactation consultants, and many St. Louis IBCLCs offer video consultations. Telehealth is a great option for latch assessments, supply concerns, pumping plans, and return-to-work questions — all from your home.",
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
      { '@type': 'ListItem', position: 3, name: 'Missouri', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/mo` },
      { '@type': 'ListItem', position: 4, name: 'St. Louis', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-st-louis-mo` },
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
          <Link href="/find/mo" className="hover:text-charcoal-600">Missouri</Link>
          <span>/</span>
          <span className="text-charcoal-600">St. Louis</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">St. Louis, MO</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find a Lactation Consultant (IBCLC) in St. Louis, MO
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            St. Louis has a strong tradition of family-centered maternity care, and its network of
            board-certified lactation consultants reflects that. From the in-hospital IBCLCs at
            Barnes-Jewish, Missouri Baptist, and Mercy Hospital to private-practice consultants
            serving Clayton, Kirkwood, Chesterfield, and St. Charles County, families throughout
            the metro have access to expert breastfeeding support — including home visits and
            telehealth for those who prefer to stay home in the early postpartum weeks.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
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
                IBCLCs in St. Louis, MO
              </h2>
              <Link
                href="/listings?city=St. Louis&state=MO"
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
              Search for IBCLCs in St. Louis below — new listings added regularly.
            </p>
            <Link href="/listings?city=St. Louis&state=MO" className="btn-primary inline-flex items-center gap-2">
              Search St. Louis IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in St. Louis, MO
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Browse Missouri Lactation Consultants</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Looking for an IBCLC outside St. Louis? Missouri has lactation consultants in Kansas City,
            Springfield, Columbia, and throughout the state.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=MO" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Missouri IBCLCs →</Link>
            <Link href="/best/ibclcs-in-chicago-il" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Chicago →</Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover Lactation? →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
