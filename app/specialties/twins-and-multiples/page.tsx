import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/twins-and-multiples' },
  title: 'IBCLCs Specializing in Twins and Multiples | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in breastfeeding twins or multiples. Tandem nursing, supply management for two, positioning support, and supplementation planning.',
  openGraph: {
    title: 'Find an IBCLC for Twins or Multiples',
    description:
      'Feeding twins or multiples requires specialized knowledge most IBCLCs do not have. Find one who does.',
  },
}

const faqData = [
  {
    q: 'Can I breastfeed twins exclusively?',
    a: "Yes — exclusive breastfeeding of twins is possible and is achieved by many families. Supply is driven by demand: if two babies are nursing frequently, the body will typically produce enough milk for both. The early weeks are the hardest. An IBCLC who specializes in multiples can help you establish supply, set up a feeding schedule that works for two babies, and navigate the logistical challenges of the newborn period.",
  },
  {
    q: 'What positions work for tandem nursing twins?',
    a: "The most common tandem nursing positions for twins are the double football hold (both babies tucked under each arm, facing the breast), the double cradle hold (both cradled across the body, crossing slightly), and one in football hold and one in cradle. A nursing pillow designed for twins (like a My Brest Friend Twins or Twin Z Pillow) makes tandem nursing much more manageable. An IBCLC can help you find positions that work for your body and your babies' sizes.",
  },
  {
    q: 'How do I manage milk supply for two babies?',
    a: "The key is frequent, effective demand early. In the newborn period, aim for 8–12 nursing or pumping sessions per 24 hours across both babies. If one baby is not latching effectively, pump that side to maintain supply. An IBCLC can do weighted feeds for each twin separately to ensure both are transferring well — this is critical in the first weeks when weight gain is the primary concern. Supply issues with twins are most often about frequency and effectiveness, both of which are correctable.",
  },
  {
    q: 'When should I call a twins IBCLC?',
    a: "Ideally before birth — a prenatal consultation with a twins-experienced IBCLC gives you a positioning plan, a supply strategy, and realistic expectations before you are exhausted and managing two newborns. If you did not have a prenatal visit, call immediately if either twin is losing more than 10% of birth weight, if you are experiencing pain with nursing, if one twin is nursing well and the other is not, or if you are questioning whether your supply is adequate for both.",
  },
]

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(9)
  return data ?? []
}

export default async function TwinsAndMultiplesPage() {
  const listings = await getListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-700">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Twins and Multiples</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Find an IBCLC for Twins or Multiples
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Feeding twins or multiples requires specific knowledge — positioning for two, managing supply
            for two babies, tandem nursing logistics, and supplementation timing. Most IBCLCs have not
            specialized in this. Finding one who has makes a significant difference.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why Twins Breastfeeding Is Different
            </h2>
            <p>
              The fundamentals of breastfeeding apply to twins — latch, milk transfer, supply and demand.
              But twins introduce challenges that require experience to navigate well: how to position two
              babies simultaneously, how to assess whether each baby is transferring enough, how to
              establish supply for two in the critical early weeks, and how to manage the logistics of
              feeding when both babies are hungry at the same time.
            </p>
            <p className="mt-3">
              An IBCLC who has worked extensively with multiples understands these dynamics and can give
              you specific, practical guidance — not just encouragement. The difference between an IBCLC
              with twins experience and one without is most visible in the first two weeks, when decisions
              about supplementation, positioning, and pumping protocols have lasting effects on supply and
              feeding outcomes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What to Expect at a Twins IBCLC Consultation
            </h2>
            <ul className="space-y-3 mt-3">
              {[
                { label: 'Weighted feeds for each baby separately', detail: 'The only way to know if both babies are transferring enough milk is to weigh each one before and after nursing — separately. This is standard for any weight concern with twins.' },
                { label: 'Tandem positioning assessment', detail: 'The IBCLC will help you find positions that work for your specific babies and body — this is not one-size-fits-all. Nursing pillow setup, support positioning, and hand placement all matter.' },
                { label: 'Supply protocol', detail: 'If both babies are not nursing effectively from the start, an IBCLC can design a pumping protocol to establish and protect supply while babies learn.' },
                { label: 'Supplementation planning', detail: 'Twins are more likely to need some supplementation early. An IBCLC can structure this strategically to support weight gain without undermining long-term supply.' },
                { label: 'Scheduling strategy', detail: 'Whether to feed both babies on demand simultaneously or on a synchronized schedule is a real decision with real tradeoffs. An experienced IBCLC can help you build a sustainable rhythm.' },
              ].map(({ label, detail }) => (
                <div key={label} className="card p-4">
                  <p className="font-semibold text-charcoal-700 text-sm mb-1">{label}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </div>
              ))}
            </ul>
          </section>

          {listings.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
                Find an IBCLC Near You
              </h2>
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
            </section>
          )}

          <div className="card p-8 text-center">
            <p className="text-charcoal-500 mb-4">
              Search for IBCLCs who can support your twins or multiples breastfeeding journey.
              Use the telehealth filter to find consultations available regardless of location.
            </p>
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
              Search All IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Feeding two babies is hard. Get support that knows twins.
          </h2>
          <p className="text-sage-50 mb-6">
            Find an IBCLC with multiples experience — in person or by telehealth.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
          >
            Find an IBCLC Near Me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Twins Breastfeeding Questions, Answered
          </h2>
          <div className="space-y-4">
            {faqData.map((faq) => (
              <div key={faq.q} className="card p-5">
                <h3 className="font-serif text-base font-semibold text-charcoal-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Pumping Support for Multiples →
            </Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Browse All IBCLCs →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
