import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/nicu-lactation-support' },
  title: 'NICU Lactation Support: IBCLCs Who Specialize in Premature Infants | LactationConsultantDirectory.com',
  description:
    'Find IBCLCs who specialize in NICU lactation support — premature infants, tube-to-breast transition, and post-NICU discharge care. Establishing and maintaining supply during a NICU stay requires specialized expertise.',
  openGraph: {
    title: 'NICU Lactation Support: Find an IBCLC for Premature Infants',
    description:
      'NICU lactation is a subspecialty of IBCLCs. Find consultants experienced with premature infants, supply establishment, and the transition home after discharge.',
  },
}

const faqData = [
  {
    q: 'Do hospitals have IBCLCs in the NICU?',
    a: "Most NICUs in larger hospitals have IBCLCs on staff as part of the standard care team — lactation support is considered part of developmentally appropriate NICU care. Level III and Level IV NICUs (which care for the most premature and medically complex infants) are most likely to have dedicated NICU IBCLCs. Smaller or community NICUs may have IBCLCs who cover the entire maternity floor rather than NICU specifically. After NICU discharge, private-practice IBCLCs experienced with premature infants are often needed for continued support at home.",
  },
  {
    q: 'Why is NICU lactation support different from standard breastfeeding support?',
    a: "NICU lactation involves a fundamentally different clinical picture than term infant breastfeeding. Premature infants may not be able to coordinate the suck-swallow-breathe pattern required for direct breastfeeding until 34-36 weeks corrected gestational age. Until then, maintaining milk supply through pumping — without a nursing baby to stimulate production — is the central challenge. NICU IBCLCs work on establishing a hospital-grade pumping protocol, supporting mothers through the emotional and logistical demands of pumping for a hospitalized infant, and planning the gradual transition from tube feeding to breast.",
  },
  {
    q: 'How do I establish and maintain milk supply during a NICU stay?',
    a: "Hospital-grade pump rental with a double-electric pump is standard. The key is frequency: 8-10 pumping sessions per 24 hours in the first weeks — including at least one session between 1-4am when prolactin levels are highest. Many NICU IBCLCs teach hands-on pumping (massage plus pumping) which significantly increases output. Kangaroo care (skin-to-skin with your baby) also stimulates prolactin and supports supply. A NICU IBCLC or lactation nurse should work with you on a specific protocol from day one.",
  },
  {
    q: 'What happens after NICU discharge when it comes to breastfeeding?',
    a: "NICU discharge is one of the highest-risk transitions for breastfeeding. Babies who have been tube-fed or bottle-fed in the NICU may resist the breast, struggle with latch, or feed inefficiently when direct breastfeeding is introduced at home. A private-practice IBCLC experienced with NICU graduates can support the transition — assessing how your baby is managing direct nursing, measuring actual milk transfer with a weighted feed, and adjusting your protocol as your baby's oral feeding skills develop. Don't assume NICU discharge means you're on your own for breastfeeding.",
  },
]

async function getNICUListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, phone, website, telehealth, plan_tier, specialties, slug')
    .eq('status', 'active')
    .contains('specialties', ['NICU'])
    .order('plan_tier', { ascending: false })
    .limit(12)

  if (!data || data.length === 0) {
    const { data: fallback } = await supabase
      .from('ibclc_listings')
      .select('id, name, city, state, phone, website, telehealth, plan_tier, slug')
      .eq('status', 'active')
      .order('plan_tier', { ascending: false })
      .limit(12)
    return fallback ?? []
  }
  return data
}

export default async function NICULactationSupportPage() {
  const listings = await getNICUListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/specialties" className="hover:text-charcoal-700">Specialties</Link>
          <span>/</span>
          <span className="text-charcoal-600">NICU Lactation Support</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            NICU Lactation Support: IBCLCs Who Specialize in Premature Infants
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            NICU lactation is a subspecialty within IBCLCs — a distinct clinical picture that requires
            expertise in pumping protocols for supply establishment, tube-to-breast transition, and the
            complex transition home after NICU discharge. If your baby has been in the NICU or NICU
            discharge is approaching, a NICU-experienced IBCLC is the right specialist to seek out.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mb-3">
              What makes NICU lactation different
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
              Premature infants often cannot coordinate direct breastfeeding until 34-36 weeks
              corrected gestational age. Before that milestone, lactation support focuses on:
            </p>
            <ul className="space-y-2">
              {[
                'Establishing and maintaining supply through pumping — without a nursing baby to provide stimulation',
                'Hospital-grade pumping protocols (frequency, technique, hands-on pumping)',
                'Kangaroo care (skin-to-skin) to support prolactin and bonding',
                'Preparing for the gradual transition from tube feeding to breast',
                'Managing supply through a potentially long NICU admission',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-500">
                  <span className="text-sage-400 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mb-3">
              After NICU discharge
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
              NICU discharge does not mean breastfeeding support ends. The transition home is often
              the most challenging phase:
            </p>
            <ul className="space-y-2">
              {[
                'Babies who bottle-fed in the NICU may resist the breast or struggle with latch',
                'Oral feeding skills take time to develop in premature infants',
                'Milk transfer efficiency should be measured with a weighted feed',
                'Protocol adjustments are needed as your baby grows and strengthens',
                'Emotional support for parents navigating an unfamiliar feeding situation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-500">
                  <span className="text-sage-400 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs with NICU Experience
              </h2>
              <Link
                href="/listings"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse all IBCLCs <ArrowRight className="h-4 w-4" />
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
        )}

        <div className="mt-8 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            NICU Lactation: Common Questions
          </h2>
          {faqData.map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Find an IBCLC Near You</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Search by city or state to find a board-certified lactation consultant experienced
            with NICU graduates and premature infants.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2 text-sm">
              Find an IBCLC <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/low-milk-supply-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium self-center">Low Milk Supply Guide →</Link>
            <Link href="/specialties/mastitis-prevention" className="text-sm text-sage-600 hover:text-sage-700 font-medium self-center">Mastitis Prevention →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
