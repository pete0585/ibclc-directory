import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'IBCLCs for Weaning Support | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in weaning. Whether you are weaning a toddler or stopping breastfeeding earlier than planned, an IBCLC can guide the process safely.',
  openGraph: {
    title: 'Find an IBCLC for Weaning Support',
    description:
      'Weaning does not have to be abrupt or uncomfortable. Find an IBCLC who can guide the process at a pace that works for you and your baby.',
  },
}

const faqData = [
  {
    q: 'When is it the right time to wean?',
    a: 'There is no single right answer — the right time is when it is right for your family. The WHO and AAP recommend breastfeeding for at least 12 months, continuing as long as mutually desired. An IBCLC can help you make a plan and support a gradual weaning process that protects your comfort and your baby\'s emotional adjustment.',
  },
  {
    q: 'How do I wean without getting engorged or developing mastitis?',
    a: 'The safest approach is gradual — dropping one feeding session every few days or once a week. This gives your body time to reduce supply without the engorgement that comes with abrupt stopping. If you need to wean quickly for medical reasons, an IBCLC can guide a managed reduction protocol, including when to pump to comfort (not to empty) and how to monitor for early signs of mastitis.',
  },
  {
    q: 'How do I wean a toddler who does not want to stop?',
    a: 'Toddler-led weaning is different from infant weaning — your child can understand language and negotiate. Strategies include: don\'t offer, don\'t refuse; shortening sessions gradually; eliminating the easiest sessions first (mid-day) and saving the hardest (bedtime, morning) for last; and substituting other comfort rituals. An IBCLC experienced with extended breastfeeding can help you build a plan that reduces conflict.',
  },
  {
    q: 'What happens to my body when I wean?',
    a: 'As you wean, prolactin and oxytocin levels drop — a real hormonal shift that some women experience as mood changes, increased fatigue, or feelings of sadness. These symptoms are normal and typically resolve within a few weeks. Physically, supply drops gradually and milk reabsorbs. An IBCLC can help you manage the physical side of weaning and prepare you for what to expect emotionally.',
  },
]

async function getWeaningListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, telehealth, plan_tier, slug')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(9)
  return data ?? []
}

export default async function WeaningPage() {
  const listings = await getWeaningListings()

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
          <span className="text-charcoal-600">Weaning Support</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Find an IBCLC for Weaning Support
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Weaning is not just the end of breastfeeding — it is a transition that affects your baby,
            your body, and your hormones. Whether you are weaning a toddler gradually or stopping earlier
            than planned, an IBCLC can guide the process safely and on your terms.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why Work With an IBCLC for Weaning
            </h2>
            <p>
              Weaning is often portrayed as straightforward — just stop nursing. But abrupt weaning
              carries real risks: engorgement, plugged ducts, mastitis, and the hormonal drop that can
              trigger significant mood changes. For many families, weaning involves a child who is
              not entirely on board with the plan.
            </p>
            <p className="mt-3">
              An IBCLC who has supported weaning brings specific knowledge: how fast to reduce sessions
              without causing problems, which sessions to drop first, how to manage supply physically,
              and how to support a toddler through the emotional side of the transition.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Types of Weaning Support an IBCLC Can Provide
            </h2>
            <ul className="space-y-3 mt-3">
              {[
                { label: 'Gradual weaning plan', detail: 'A session-by-session reduction schedule tailored to your current feeding frequency, your baby\'s age, and your timeline.' },
                { label: 'Medically necessary weaning', detail: 'If you need to stop breastfeeding quickly — for surgery, medication, or other reasons — an IBCLC can guide a managed reduction that minimizes complications.' },
                { label: 'Toddler weaning strategy', detail: 'Extended breastfeeding presents specific behavioral challenges. An IBCLC experienced with nursing toddlers can help you navigate the process and build substitute comfort rituals.' },
                { label: 'Mastitis prevention', detail: 'Plugged ducts and mastitis are the most common complications of weaning too fast. An IBCLC can help you read your body\'s signals and adjust your pace.' },
                { label: 'Emotional support', detail: 'The hormonal drop at weaning is real and affects mood. An IBCLC can normalize what you are experiencing and help you decide when to involve your provider.' },
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
              Whether you are weaning a newborn, an infant, or a toddler, an IBCLC can help you
              do it safely and at a pace that works for your family.
            </p>
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
              Find an IBCLC Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
              Weaning Questions, Answered
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
              <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
                Low Milk Supply Support &rarr;
              </Link>
              <Link href="/resources/how-to-choose-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
                How to Choose an IBCLC &rarr;
              </Link>
              <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
                Browse All IBCLCs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
