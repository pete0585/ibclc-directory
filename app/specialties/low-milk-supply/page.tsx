import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'IBCLCs Who Specialize in Low Milk Supply | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in low milk supply, milk production concerns, and supplementation strategies. Real clinical expertise for one of breastfeeding\'s most common and devastating challenges.',
  openGraph: {
    title: 'Find an IBCLC for Low Milk Supply',
    description:
      'Low milk supply is the leading reason mothers stop breastfeeding. An IBCLC can identify the root cause and create a plan to protect your supply.',
  },
}

const faqData = [
  {
    q: 'How do I know if I actually have low milk supply?',
    a: 'Perceived low supply is more common than true low supply. Signs of true low supply include: baby not regaining birth weight by day 10–14, fewer than 3–4 wet diapers per day by day 4, consistently low weight gain at checkups, and baby feeding constantly without satisfaction. Signs that may feel like low supply but aren\'t: breasts feel soft, baby feeds frequently, baby is fussy. An IBCLC can do a weighted feed (measure milk transfer before and after nursing) to get a real number and assess what\'s actually happening.',
  },
  {
    q: 'What causes low milk supply?',
    a: 'The most common causes include: infrequent feeding or pumping (supply is driven by demand), poor latch or tongue tie reducing effective milk removal, supplementation with formula without pumping to replace those sessions, hormonal factors (thyroid issues, PCOS, insufficient glandular tissue), certain medications, and previous breast surgery. An IBCLC will take a full history and identify which factors apply to you — because the solution depends entirely on the cause.',
  },
  {
    q: 'Can an IBCLC actually increase my milk supply?',
    a: 'Often yes — if the cause is correctable. IBCLCs can help with: optimizing latch and transfer efficiency, designing power pumping schedules, managing supplementation in ways that protect supply, and advising on galactagogues (herbs or medications that may support supply). For cases involving insufficient glandular tissue or hormonal causes, an IBCLC can help you maximize what your body is able to produce and develop a sustainable supplementation plan.',
  },
  {
    q: 'What is a weighted feed and why does it matter?',
    a: 'A weighted feed is when your baby is weighed before nursing, nurses normally, and then is weighed again — the difference tells you exactly how much milk was transferred in that session. It removes guesswork. Many parents are shocked to learn their baby transferred 3–4 oz in a feed they thought produced nothing. Others discover real transfer problems. Either way, you get real data to work from instead of anxiety.',
  },
  {
    q: 'Is it too late to increase supply if my baby is already weeks old?',
    a: 'It depends on where you are in your breastfeeding journey, but it\'s almost never "too late" to seek help. Milk production can often be re-established even after a significant drop, especially in the first 3 months. Many IBCLCs specialize in supply recovery even in cases where supplementation has been happening for weeks. See someone sooner rather than later.',
  },
]

async function getLowSupplyListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, phone, website, telehealth, plan_tier, specialties, slug')
    .eq('status', 'active')
    .contains('specialties', ['Low Milk Supply'])
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function LowMilkSupplyPage() {
  const listings = await getLowSupplyListings()

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
          <span className="text-charcoal-600">Low Milk Supply</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            IBCLCs Who Specialize in Low Milk Supply
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Low supply is the most common reason mothers stop breastfeeding before they want to. It's also one
            of the most treatable — when you have the right support.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why Low Supply Needs More Than Generic Advice
            </h2>
            <p>
              "Nurse more often" is the advice most new moms get for low milk supply. Sometimes it helps. More
              often, it doesn't — because low supply has causes, and those causes require different solutions.
              A poor latch causing inadequate milk removal is a different problem than insufficient glandular tissue,
              which is different from a thyroid issue, which is different from a tongue tie.
            </p>
            <p className="mt-3">
              An IBCLC who specializes in supply concerns will take a full history, assess latch and transfer with
              a weighted feed, and give you a real protocol — not a pep talk. That's the difference between
              making progress and spending weeks frustrated before giving up.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What a Low Supply Consultation Looks Like
            </h2>
            <ul className="space-y-2 mt-3">
              {[
                'Complete breastfeeding history: feeds per day, supplementation, pumping output, past breast procedures',
                'Oral assessment of your baby for latch and possible tongue or lip tie',
                'Weighted feed to measure actual milk transfer',
                'Breast assessment for signs of insufficient glandular tissue',
                'Review of any medications, herbs, or health conditions affecting supply',
                'Custom plan: feed frequency, pump protocol, galactagogue recommendations, supplementation strategy',
                'Follow-up to track weight gain and adjust the plan',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-sage-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Listings */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Find a Low Milk Supply IBCLC Near You
            </h2>
            {listings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                  {listings.map((l: any) => (
                    <Link
                      key={l.id}
                      href={`/ibclc/${l.slug}`}
                      className="card p-5 hover:shadow-card transition-shadow group"
                    >
                      <p className="font-semibold text-charcoal-800 group-hover:text-sage-600 transition-colors">
                        {l.name}
                      </p>
                      <p className="text-sm text-charcoal-400 mt-1">{l.city}, {l.state}</p>
                      {l.telehealth && (
                        <span className="mt-2 inline-block text-xs font-medium text-sage-600 bg-sage-50 rounded-full px-2 py-0.5">
                          Telehealth available
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-700"
                >
                  Browse all IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-charcoal-500 mb-4">Search for IBCLCs in your area who specialize in supply concerns.</p>
                <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
                  Browse All IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            You deserve real answers, not guesses
          </h2>
          <p className="text-sage-50 mb-6">
            An IBCLC can tell you exactly what's happening with your supply and what to do about it.
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
            Low Milk Supply: Questions and Answers
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
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              What is an IBCLC? →
            </Link>
            <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              IBCLCs for Pumping & Exclusive Pumping →
            </Link>
            <Link href="/specialties/tongue-tie" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Tongue Tie Specialists →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
