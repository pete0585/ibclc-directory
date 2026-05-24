import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Best IBCLCs in Phoenix, AZ | IBCLCDirectory.com',
  description:
    "Find the best lactation consultants in Phoenix, Arizona. Verified IBCLCs in Phoenix who offer home visits, telehealth, and accept most insurance. 6+ listed in the Phoenix metro.",
  openGraph: {
    title: 'Best IBCLCs in Phoenix, AZ',
    description: "Find top-rated, verified IBCLCs in Phoenix, Arizona. Home visits, telehealth, and insurance accepted.",
  },
}

async function getPhoenixListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('city', 'Phoenix')
    .eq('state', 'AZ')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BestIbclcsPhoenixPage() {
  const listings = await getPhoenixListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Find an IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Arizona', item: `${process.env.NEXT_PUBLIC_SITE_URL}/find/az` },
      { '@type': 'ListItem', position: 4, name: 'Phoenix', item: `${process.env.NEXT_PUBLIC_SITE_URL}/best/ibclcs-in-phoenix-az` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many IBCLCs are in Phoenix, AZ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IBCLCDirectory.com has ${listings.length}+ listed IBCLCs in Phoenix, Arizona. The greater Phoenix metro — one of the fastest-growing metros in the US — has a rapidly growing IBCLC community serving families across Scottsdale, Mesa, Chandler, Tempe, and Gilbert.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Phoenix IBCLCs accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many IBCLCs in Phoenix accept insurance including Aetna, Blue Cross Blue Shield of Arizona, Cigna, UnitedHealthcare, and AHCCCS (Arizona Medicaid). Under the ACA, most insurance plans are required to cover lactation support without cost-sharing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a home visit from an IBCLC in Phoenix?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — multiple IBCLCs in Phoenix offer home visits throughout the metro, including Scottsdale, Mesa, Chandler, Tempe, and Gilbert. Filter by "home visit" when searching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Phoenix IBCLCs offer telehealth consultations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Phoenix IBCLCs offer telehealth consultations — especially useful during Arizona summers when traveling with a newborn in extreme heat is difficult. Telehealth also connects you to IBCLCs across Arizona if you need a specialist not available locally.',
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
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/find/az" className="hover:text-charcoal-700">Arizona</Link>
          <span>/</span>
          <span className="text-charcoal-600">Phoenix</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Phoenix, AZ</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Find an IBCLC in Phoenix, AZ
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            The greater Phoenix metro is one of the fastest-growing metros in the US, and its IBCLC
            community is growing to match. Families across Scottsdale, Mesa, Chandler, Tempe, and Gilbert
            can find experienced lactation consultants for home visits, office appointments, and telehealth —
            with telehealth especially popular during Arizona's summer months.
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
                IBCLCs in Phoenix, AZ
              </h2>
              <Link
                href="/listings?city=Phoenix&state=AZ"
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
              Search for IBCLCs in Phoenix below — new listings added regularly.
            </p>
            <Link href="/listings?city=Phoenix&state=AZ" className="btn-primary inline-flex items-center gap-2">
              Search Phoenix IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Finding an IBCLC in Phoenix, AZ
          </h2>
          {[
            {
              q: 'How do I find an IBCLC in Phoenix who accepts my insurance?',
              a: 'Search the directory and filter by insurance plan. Many Phoenix IBCLCs accept Aetna, Blue Cross Blue Shield of Arizona, Cigna, UHC, and AHCCCS (Arizona Medicaid). Under the ACA, most insurance plans cover IBCLC visits at no cost to you — no copay, no deductible.',
            },
            {
              q: 'Do Phoenix IBCLCs make home visits?',
              a: "Yes. Several IBCLCs in Phoenix offer home visits throughout the metro, including Scottsdale, Mesa, Chandler, Tempe, and Gilbert. Home visits are especially valuable in summer when traveling with a newborn in extreme heat is difficult.",
            },
            {
              q: 'What is an IBCLC vs. a lactation consultant?',
              a: "IBCLC is the only internationally recognized credential for lactation care. \"Lactation consultant\" is not a protected title — anyone can use it. IBCLCs complete 1,000+ clinical hours and pass a board exam. When your baby's feeding is struggling, choose an IBCLC.",
            },
            {
              q: 'Can I see a Phoenix IBCLC by telehealth?',
              a: "Many Phoenix IBCLCs offer telehealth consultations — useful for supply concerns, pumping guidance, and prenatal prep. Telehealth is especially popular in Phoenix during summer when leaving home with a newborn is challenging.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">More in Arizona</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/find/az" className="text-sm text-sage-600 hover:text-sage-700 font-medium">All Arizona IBCLCs →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
