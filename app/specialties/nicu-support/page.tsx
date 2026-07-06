import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/nicu-support' },
  title: 'IBCLCs for NICU and Premature Infants | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in NICU and premature infant breastfeeding. Build supply while your baby is in the NICU, transition from tube feeds to breast, and support a preemie latch.',
  openGraph: {
    title: 'Find an IBCLC for NICU or Premature Infants',
    description:
      'NICU babies have different breastfeeding challenges. Find an IBCLC with preemie and NICU experience.',
  },
}

const faqData = [
  {
    q: 'Can premature babies breastfeed?',
    a: "Yes — most premature babies can eventually breastfeed, though the timeline depends on gestational age and medical status. The coordinated suck-swallow-breathe reflex typically matures around 34–36 weeks corrected age. Before that, skin-to-skin contact (kangaroo care) and non-nutritive sucking at the breast are valuable even if your baby cannot yet transfer milk effectively. An IBCLC with NICU experience will guide you through each stage of the transition.",
  },
  {
    q: 'How do I build and protect my milk supply while my baby is in the NICU?',
    a: "Frequent pumping is the primary tool for establishing and protecting supply when your baby cannot nurse directly. The target in the first weeks is 8–10 pumping sessions per 24 hours, including at least one overnight session. Power pumping (a pattern of pump-rest-pump-rest over an hour) can help stimulate supply. An IBCLC can create a specific pumping protocol based on your baby's gestational age and your supply trajectory, and help you troubleshoot early before drops become significant.",
  },
  {
    q: 'When can NICU babies transition to breastfeeding at the breast?',
    a: "This varies by baby and by NICU, but most NICU teams begin introducing non-nutritive sucking at the breast around 28–32 weeks corrected age, and nutritive breastfeeding (actual milk transfer) once the baby demonstrates feeding readiness — typically around 34 weeks corrected. Cue-based feeding rather than strict schedules is associated with better breastfeeding outcomes in preemies. An IBCLC embedded in or familiar with your NICU can help advocate for this approach and support the transition.",
  },
  {
    q: 'What does a NICU IBCLC do differently from a regular IBCLC?',
    a: "NICU-experienced IBCLCs understand the specific mechanics of a premature suck-swallow-breathe pattern, how to support latch when a baby has been tube-fed, how to use paced bottle feeding to preserve breastfeeding potential, how to work within the medical constraints of a NICU environment, and how to help parents navigate the emotional complexity of feeding a critically ill or premature infant. They also understand the specific supply challenges of pumping long-term for a hospitalized baby.",
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

export default async function NicuSupportPage() {
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
          <span className="text-charcoal-600">NICU Support</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Find an IBCLC for NICU or Premature Infants
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            NICU babies have different breastfeeding challenges — latch mechanics differ for preemies,
            supply must be built by pumping while baby is hospitalized, and transitioning from tube feeds
            to breast is a process that requires careful, experienced support.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why NICU Breastfeeding Requires Specialized Support
            </h2>
            <p>
              The breastfeeding journey for a NICU parent starts differently from the beginning. Instead
              of nursing in the first hour after birth, you are pumping to build a supply your baby may
              not be able to access for days or weeks. Instead of learning latch together, your baby is
              learning a coordinated suck-swallow-breathe reflex that premature neurological development
              has not yet completed.
            </p>
            <p className="mt-3">
              An IBCLC with NICU experience understands these dynamics. They know how preemie oral
              anatomy differs, how to support skin-to-skin before nutritive feeding is possible, how to
              work within the medical environment of a NICU, and how to help parents sustain pumping
              through a lengthy hospitalization. This is genuinely different from standard breastfeeding
              support — and it matters.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              The Stages of NICU Breastfeeding
            </h2>
            <ul className="space-y-3 mt-3">
              {[
                { label: 'Stage 1: Pumping to establish supply', detail: 'Before your baby can nurse, pumping is the only tool for supply. Frequency matters enormously: 8–10 sessions per 24 hours in the first weeks, including overnight. An IBCLC can optimize your protocol.' },
                { label: 'Stage 2: Skin-to-skin and non-nutritive sucking', detail: 'Kangaroo care (skin-to-skin) has documented benefits for preemie development and breastfeeding outcomes. Non-nutritive sucking at an empty or lightly expressed breast familiarizes your baby with nursing before they can transfer effectively.' },
                { label: 'Stage 3: First feedings at the breast', detail: 'Typically beginning around 34 weeks corrected age, nutritive breastfeeding starts with cue-based, short sessions. Weighted feeds measure transfer and guide how much supplementation is still needed.' },
                { label: 'Stage 4: Transition home', detail: 'The most vulnerable point for breastfeeding loss is the transition from NICU to home, when the structured support disappears. Having an outpatient IBCLC plan before discharge significantly improves outcomes.' },
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
              Search for IBCLCs who can support your NICU or premature infant breastfeeding journey.
              Many offer telehealth, which is accessible even from the NICU waiting room.
            </p>
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
              Search All IBCLCs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Your baby is fighting. Your supply deserves support too.
          </h2>
          <p className="text-sage-50 mb-6">
            Find an IBCLC with NICU experience — in person or by telehealth.
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
            NICU Breastfeeding Questions, Answered
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
              Pumping Support →
            </Link>
            <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Low Milk Supply Specialists →
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
