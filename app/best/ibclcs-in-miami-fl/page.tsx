import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Miami, FL | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in Miami, Florida. IBCLCs in Miami-Dade serving Coral Gables, Kendall, North Miami, and the broader South Florida area. Spanish-speaking options available.',
  openGraph: {
    title: 'Best IBCLCs in Miami, FL',
    description: 'Find verified IBCLCs in Miami, FL. Home visits, telehealth, insurance accepted — including Spanish-speaking lactation consultants.',
  },
}

async function getMiamiListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'Miami')
    .eq('state', 'FL')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsMiamiPage() {
  const listings = await getMiamiListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Florida', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/fl` },
      { '@type': 'ListItem', position: 4, name: 'Miami', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/fl/miami-fl` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Miami, FL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in Miami, Florida. South Florida has a diverse, active lactation support community serving Miami-Dade, Coral Gables, Kendall, Hialeah, and the broader Miami metro — including bilingual Spanish-speaking IBCLCs.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Are there Spanish-speaking IBCLCs in Miami?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Miami has a significant number of bilingual IBCLCs who provide lactation consultations in both English and Spanish. Check the languages filter in the directory to find one who communicates in your preferred language.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do Miami IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many IBCLCs in Miami accept Aetna, Cigna, UnitedHealthcare, Florida Blue, Tricare, and Florida Medicaid. Under the ACA, most insurance plans cover IBCLC visits at no cost to you. Filter by insurance when searching the directory.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Miami?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — several Miami IBCLCs offer home visits throughout Miami-Dade County and into Broward County. Home visits eliminate the stress of traveling with a newborn and allow the IBCLC to see your actual feeding environment.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <Link href="/find/fl" className="hover:text-charcoal-600">Florida</Link>
          <span>/</span>
          <span className="text-charcoal-600">Miami</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Miami, FL</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Miami, FL
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Miami has a vibrant lactation support community that reflects the city itself — diverse, bilingual,
            and spread across Miami-Dade from Coral Gables and Coconut Grove to Kendall and North Miami.
            Whether you need a Spanish-speaking IBCLC, a home visit specialist, or telehealth care from a
            board-certified consultant, Miami has experienced options.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>Bilingual options</span>
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
                IBCLCs in Miami, FL
              </h2>
              <Link
                href="/listings?city=Miami&state=FL"
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
              Search for IBCLCs in Miami below — new listings added regularly.
            </p>
            <Link href="/listings?city=Miami&state=FL" className="btn-primary inline-flex items-center gap-2">
              Search Miami IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Miami, FL
          </h2>
          {[
            {
              q: 'How do I find a Miami IBCLC who accepts my insurance?',
              a: "Search the directory and filter by insurance. Many Miami IBCLCs accept Florida Blue, Aetna, Cigna, UHC, Tricare, and FL Medicaid. Under the ACA, most insurance plans cover IBCLC visits at no cost — no copay, no deductible.",
            },
            {
              q: 'Do Miami IBCLCs speak Spanish?',
              a: "Yes — Miami has a strong community of bilingual IBCLCs who work in English and Spanish. Use the languages filter in the directory to find a Spanish-speaking lactation consultant in the Miami area.",
            },
            {
              q: 'Do Miami IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in Miami-Dade offer home visits across the county, including Coral Gables, Kendall, Hialeah, and North Miami. Home visits are especially helpful when recovering from birth and navigating early breastfeeding challenges.",
            },
            {
              q: 'What is the difference between an IBCLC and a breastfeeding peer counselor?',
              a: "An IBCLC is a licensed clinician who has completed 1,000+ clinical hours and passed a rigorous board exam. Peer counselors provide emotional support and general guidance. For clinical issues — latch pain, low supply, tongue tie, or NICU follow-up — you need an IBCLC.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in Florida</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/best/ibclcs-in-tampa-fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Tampa →</Link>
            <Link href="/best/ibclcs-in-houston-tx" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Houston →</Link>
            <Link href="/find/fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Florida IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
