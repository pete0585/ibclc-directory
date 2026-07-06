import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/best/ibclcs-in-new-york-ny' },
  title: 'Best IBCLCs in New York, NY | IBCLCDirectory.com',
  description:
    'Find board-certified lactation consultants in New York City. IBCLCs in Manhattan, Brooklyn, Queens, the Bronx, and surrounding areas. Telehealth and home visits available.',
  openGraph: {
    title: 'Best IBCLCs in New York, NY',
    description: 'Find verified IBCLCs in New York City — Manhattan, Brooklyn, Queens, and beyond. Home visits, telehealth, and insurance accepted.',
  },
}

async function getNYCListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .eq('city', 'New York')
    .eq('state', 'NY')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsNewYorkPage() {
  const listings = await getNYCListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'New York', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ny` },
      { '@type': 'ListItem', position: 4, name: 'New York City', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/ny/new-york-ny` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in New York City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com lists ${listings.length}+ IBCLCs in New York City. NYC has a large community of certified lactation consultants serving Manhattan, Brooklyn, Queens, the Bronx, and Staten Island — including specialists who focus on NICU support, tongue tie, and low milk supply.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do NYC IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many IBCLCs in New York City accept Emblem Health, Fidelis, United Healthcare, Aetna, Cigna, Oxford, and NY Medicaid. Under the ACA, most insurance plans must cover lactation support at no cost. Filter by insurance in the directory to confirm.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in New York City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — multiple IBCLCs in NYC offer home visits across all five boroughs and into Westchester, Nassau County, and northern New Jersey. In a city where apartment size can make in-office visits awkward, home visits are especially popular with new parents.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best way to find an IBCLC in New York City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search this directory and filter by borough, insurance, or service type. If you want a specialist for a specific issue (tongue tie, NICU follow-up, pumping), use the specialty filter. Telehealth is also widely available if in-person scheduling is difficult.",
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
          <Link href="/find/ny" className="hover:text-charcoal-600">New York</Link>
          <span>/</span>
          <span className="text-charcoal-600">New York City</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">New York, NY</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in New York City
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            New York City is one of the most well-resourced cities in the country for lactation support —
            with IBCLCs across Manhattan, Brooklyn, Queens, and the Bronx offering home visits, office
            consultations, and telehealth. Whether you need same-week support or an appointment before your
            due date, you have options.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>{listings.length}+ IBCLCs listed</span>
            <span>·</span>
            <span>All five boroughs</span>
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
                IBCLCs in New York City
              </h2>
              <Link
                href="/listings?city=New+York&state=NY"
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
              Search for IBCLCs in New York City below — new listings added regularly.
            </p>
            <Link href="/listings?city=New+York&state=NY" className="btn-primary inline-flex items-center gap-2">
              Search NYC IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in New York City
          </h2>
          {[
            {
              q: 'How do I find a New York City IBCLC who accepts my insurance?',
              a: "Search the directory and filter by insurance. Many NYC IBCLCs accept Emblem Health, UHC, Aetna, Cigna, Oxford, and NY Medicaid. Under the ACA, most plans cover lactation support at zero cost to you.",
            },
            {
              q: 'Do NYC IBCLCs make home visits?',
              a: "Yes. Many IBCLCs in New York City offer home visits across Manhattan, Brooklyn, Queens, the Bronx, and even into Westchester and Nassau County. Home visits are ideal for the first 1–2 weeks postpartum.",
            },
            {
              q: 'Can I schedule a prenatal IBCLC visit in New York City?',
              a: "Absolutely. Many NYC IBCLCs offer prenatal consultations — either in person or by telehealth — to help you prepare before your baby arrives. This is especially valuable if you have inverted nipples, previous augmentation surgery, or a history of low supply.",
            },
            {
              q: 'Are there IBCLCs in Brooklyn or Queens specifically?',
              a: "Yes — the directory includes IBCLCs across all five boroughs. If you need someone in a specific neighborhood, use the search bar to filter by location or zip code.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More IBCLCs Nearby</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/best/ibclcs-in-philadelphia-pa" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Philadelphia →</Link>
            <Link href="/best/ibclcs-in-miami-fl" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs in Miami →</Link>
            <Link href="/find/ny" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All New York IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
