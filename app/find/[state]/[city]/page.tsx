import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowRight, Home, Video, CheckCircle } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import { getCityPage, getListingsByCity } from '@/lib/data'
import { stateAbbreviationToName } from '@/lib/utils'

interface Props {
  params: Promise<{ state: string; city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params
  const stateUpper = state.toUpperCase()
  const stateName = stateAbbreviationToName(stateUpper)

  const cityPage = await getCityPage(city)
  const cityName = cityPage?.city ?? city.replace(/-[a-z]{2}$/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const title = `Find an IBCLC in ${cityName}, ${stateUpper}`
  const description = cityPage?.meta_description ??
    `Find board-certified lactation consultants (IBCLCs) in ${cityName}, ${stateName}. Real breastfeeding support — home visits, telehealth, and insurance accepted.`

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lactationconsultantdirectory.com'
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/find/${state}/${city}`,
    },
    openGraph: {
      title: `${title} | LactationConsultantDirectory.com`,
      description,
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { state, city } = await params
  const stateUpper = state.toUpperCase()
  const stateName = stateAbbreviationToName(stateUpper)

  const cityPage = await getCityPage(city)
  const cityName = cityPage?.city ??
    city.replace(new RegExp(`-${state}$`), '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const listings = await getListingsByCity(cityName, stateUpper, 20)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: stateName, item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/${state}` },
      { '@type': 'ListItem', position: 4, name: cityName, item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/${state}/${city}` },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I find an IBCLC in ${cityName}, ${stateUpper}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Use IBCLCDirectory.com to search for IBCLCs in ${cityName}. Filter by insurance accepted, visit type (home, office, or telehealth), and specialty to find the right fit.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do IBCLCs in ${cityName} accept insurance?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Many IBCLCs in ${cityName} accept insurance including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Tricare, and Medicaid. Check individual listings for accepted plans.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I get a lactation consultation by telehealth in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes — many IBCLCs in ${cityName} offer telehealth consultations. Filter by "Telehealth available" to find them.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-700">Find an IBCLC</Link>
          <span>/</span>
          <Link href={`/find/${state}`} className="hover:text-charcoal-700">{stateName}</Link>
          <span>/</span>
          <span className="text-charcoal-600">{cityName}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">{cityName}, {stateUpper}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in {cityName}, {stateUpper}
          </h1>
          {cityPage?.intro_paragraph ? (
            <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
              {cityPage.intro_paragraph}
            </p>
          ) : (
            <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
              Looking for breastfeeding support in {cityName}? Find a board-certified IBCLC who offers
              home visits, in-office consultations, or telehealth — many accept insurance.
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-charcoal-500">
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4 text-sage-400" />
              Home visit options
            </span>
            <span className="flex items-center gap-1.5">
              <Video className="h-4 w-4 text-sage-400" />
              Telehealth available
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-sage-400" />
              Insurance accepted
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <SearchBar defaultLocation={`${cityName}, ${stateUpper}`} />
        </div>

        {/* Results */}
        {listings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-semibold text-charcoal-700">
                <span className="text-sage-500">{listings.length}</span> IBCLC
                {listings.length !== 1 ? 's' : ''} in {cityName}
              </h2>
              <Link
                href={`/listings?city=${encodeURIComponent(cityName)}&state=${stateUpper}`}
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                All results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-charcoal-500 mb-4">
              No IBCLCs listed in {cityName} yet. Try searching nearby cities or statewide.
            </p>
            <Link href={`/find/${state}`} className="btn-secondary text-sm">
              Browse all IBCLCs in {stateName}
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: `How do I find an IBCLC in ${cityName}?`,
              a: `Search IBCLCDirectory.com — filter by insurance, visit type, and specialty to find the right IBCLC in ${cityName}. All listings include IBCLCs only, not uncredentialed lactation counselors.`,
            },
            {
              q: `Do IBCLCs in ${cityName} accept insurance?`,
              a: `Many do — the Affordable Care Act requires most insurance plans to cover lactation services. Check individual IBCLC profiles on this page for their accepted insurance plans. Tricare, Medicaid, and most commercial plans are commonly accepted.`,
            },
            {
              q: `What's the difference between an IBCLC and a lactation consultant?`,
              a: `IBCLC (International Board Certified Lactation Consultant) is the only internationally recognized credential for lactation care. IBCLCs complete rigorous clinical training and a board exam. "Lactation consultant" is not a protected title — anyone can use it. If you're struggling, see an IBCLC.`,
            },
            {
              q: `Can I get a telehealth lactation consultation in ${cityName}?`,
              a: `Yes. Many IBCLCs in ${cityName} offer video consultations, which are especially helpful for latch assessments, low supply concerns, and pumping guidance when you can't travel.`,
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
