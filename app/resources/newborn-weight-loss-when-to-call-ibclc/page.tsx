import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/newborn-weight-loss-when-to-call-ibclc' },
  title: 'Newborn Weight Loss: When to Call an IBCLC | IBCLCDirectory.com',
  description:
    'All newborns lose weight after birth. But how much is too much — and when should you call an IBCLC? Here\'s what the clinical thresholds actually mean.',
  openGraph: {
    title: 'Newborn Weight Loss: When to Call an IBCLC',
    description:
      'The clinical thresholds for newborn weight loss and the signs that mean you should call a lactation consultant now.',
  },
}

const faqData = [
  {
    q: 'How much weight loss is normal for a newborn?',
    a: 'A 5–7% loss of birth weight in the first 3–5 days is considered typical. The clinical threshold where most providers intervene is 10% of birth weight. By day 10–14, your baby should have regained their birth weight. If they have not, an IBCLC consultation is appropriate regardless of the reason.',
  },
  {
    q: 'My baby lost 9% of birth weight — should I call an IBCLC?',
    a: 'Yes. While 9% is technically below the 10% threshold, it is close enough that careful monitoring is warranted — and an IBCLC can do a weighted feed (before and after feeding) to measure how much milk your baby is actually transferring. If transfer is low, supplementation and a feeding plan can prevent further loss and support supply.',
  },
  {
    q: 'Can an IBCLC help if I am supplementing with formula?',
    a: 'Absolutely. Supplementation is a tool, not a failure. An IBCLC can help you use supplementation strategically — to support weight gain while protecting your milk supply — and develop a plan to reduce supplementation once transfer improves. An IBCLC who makes you feel guilty about necessary supplementation is not giving you good care.',
  },
  {
    q: 'Can I do a weighted feed via telehealth?',
    a: 'No — a weighted feed requires a clinical scale. Telehealth IBCLCs can assess latch, positioning, and feeding behavior on video, which is useful. But if your baby has weight concerns, you need an in-person IBCLC who has a scale. Many IBCLCs offer home visits specifically for weight checks and weighted feeds.',
  },
]

export default function NewbornWeightLossPage() {
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

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/resources/what-is-an-ibclc" className="hover:text-charcoal-700">Resources</Link>
          <span>/</span>
          <span className="text-charcoal-600">Newborn Weight Loss</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Newborn Weight Loss: When Should You Call an IBCLC?
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            All newborns lose weight after birth. This is normal. But there is a line between expected
            weight loss and a feeding problem that needs professional support — and most new parents
            do not know where that line is.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              How Much Weight Loss Is Normal for a Newborn?
            </h2>
            <p>
              Newborns are born with extra fluid that they lose in the first few days of life. This
              is physiological — it happens regardless of how well feeding is going. The question is
              how much loss is expected versus how much signals a feeding problem.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { milestone: 'Days 1–3', detail: '3–7% weight loss is typical. Colostrum is small volume but nutrient-dense — this is by design.' },
                { milestone: 'Days 3–5', detail: 'Weight loss peaks. 5–7% is the typical range. Up to 10% may be seen without intervention depending on feeding.' },
                { milestone: '10% birth weight lost', detail: 'This is the clinical threshold. At this point, most providers recommend a formal feeding assessment.' },
                { milestone: 'Day 10–14', detail: 'Your baby should have regained birth weight. If not, call an IBCLC regardless of what your pediatrician says about wait-and-see.' },
              ].map(({ milestone, detail }) => (
                <div key={milestone} className="card p-4 flex gap-4">
                  <div className="text-sm font-semibold text-sage-600 min-w-[100px]">{milestone}</div>
                  <div className="text-sm text-charcoal-500">{detail}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Signs You Should Call an IBCLC Now
            </h2>
            <p>
              Do not wait for your pediatrician appointment if you are seeing any of these signs.
              Early intervention makes a significant difference in feeding outcomes.
            </p>
            <ul className="space-y-2 mt-4">
              {[
                'Baby has lost more than 10% of birth weight',
                'Day 5 or later and baby is still losing weight',
                'Fewer than 6 wet diapers by day 5',
                'Fewer than 3–4 yellow stools by day 4',
                'Baby is excessively sleepy or hard to wake for feeds',
                'Painful latch that is not improving after the first day or two',
                'Breasts feel engorged but baby seems unsatisfied or frustrated at the breast',
                'You have had low milk supply with a previous baby',
              ].map((sign) => (
                <li key={sign} className="flex items-start gap-3 text-sm">
                  <span className="text-rose-400 mt-0.5 font-bold">!</span>
                  {sign}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What Will an IBCLC Do?
            </h2>
            <p>
              A home visit IBCLC or in-office IBCLC can assess the full picture in a way that a
              15-minute pediatrician visit cannot. Here is what a comprehensive weight-concern visit
              typically includes:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                { label: 'Weighted feed', detail: 'Baby is weighed before and after nursing. The difference tells you exactly how much milk transferred in that session. This is the gold standard for assessing milk transfer.' },
                { label: 'Latch assessment', detail: 'The IBCLC observes a full feeding — latch, suck pattern, swallowing, positioning. Most latch problems are fixable with guidance.' },
                { label: 'Tongue and lip tie evaluation', detail: 'Structural issues that restrict movement are a common cause of poor milk transfer and painful nursing. An IBCLC can identify these and refer for evaluation if needed.' },
                { label: 'Supplementation plan', detail: 'If baby needs supplementation, an IBCLC can structure it to support weight gain while protecting your milk supply — not just tell you to "top up with formula."' },
              ].map(({ label, detail }) => (
                <div key={label} className="card p-5">
                  <p className="font-semibold text-charcoal-700 text-sm mb-1">{label}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </div>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What About Telehealth?
            </h2>
            <p>
              Telehealth IBCLCs can observe latch on video, assess positioning, and provide real-time
              coaching — which is genuinely useful for many situations. However, telehealth cannot
              do a weighted feed, which is the most important tool for weight gain concerns.
            </p>
            <p className="mt-3">
              If weight loss is your primary concern, prioritize an in-person IBCLC with a clinical
              scale. If you cannot get an in-person appointment quickly, a telehealth consultation
              can still provide useful guidance while you wait — assessing whether the latch looks
              effective and whether feeding cues are being read correctly.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Find an IBCLC near you for a weight check
          </h2>
          <p className="text-sage-50 mb-6">
            Browse IBCLCs who offer home visits with clinical scales for weighted feeds.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
          >
            Browse IBCLCs Near Me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Newborn Weight Loss: Common Questions
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
            <Link href="/resources/how-to-choose-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              How to Choose an IBCLC →
            </Link>
            <Link href="/resources/home-visit-vs-telehealth" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Home Visit vs. Telehealth →
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
