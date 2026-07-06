import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/pumping' },
  title: 'IBCLCs for Pumping & Exclusive Pumping | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in pumping support, exclusive pumping, returning to work, and building a freezer stash. Expert guidance for the pump as a primary feeding tool.',
  openGraph: {
    title: 'Find an IBCLC for Pumping Support',
    description:
      'Whether you\'re returning to work, exclusively pumping, or building supply — an IBCLC can make your pumping journey sustainable.',
  },
}

const faqData = [
  {
    q: 'Can an IBCLC help me set up a pumping schedule for returning to work?',
    a: 'Yes — this is one of the most common reasons working moms see an IBCLC. A good pumping plan accounts for your baby\'s age, how often they\'ll be feeding while you\'re away, your workplace pumping situation (break frequency, access to a private space), and your supply needs. An IBCLC can also help you troubleshoot output drops and milk storage logistics.',
  },
  {
    q: 'I\'m exclusively pumping — should I see an IBCLC?',
    a: 'Absolutely. Exclusive pumping (EP) is a full breastfeeding practice that comes with its own set of challenges: maintaining supply with a pump alone, managing pumping frequency long-term, avoiding oversupply or undersupply, and eventually weaning from the pump. IBCLCs who specialize in EP can create a sustainable protocol and help you avoid the burnout that ends so many EP journeys earlier than planned.',
  },
  {
    q: 'What flange size do I need and does it really matter?',
    a: 'Flange sizing matters enormously and is one of the most overlooked causes of low pump output and nipple damage. The tunnel of the flange should fit your nipple with about 2–4mm of space around it. Most pumps come with 24mm or 28mm flanges, but nipple diameters vary widely — many people do better with 17mm, 19mm, or 21mm flanges. An IBCLC can measure you and recommend the correct size. Correct flange sizing alone can increase output significantly.',
  },
  {
    q: 'My pump output is dropping. What should I do?',
    a: 'First: don\'t panic. Output drops are common and often fixable. Common causes include: increasing time between sessions (supply adjusts down), flange sizing issues, pump motor declining after many hours of use, hormonal changes (including the return of menstruation), stress, illness, and changes in hydration. An IBCLC can help you identify the cause and adjust your protocol before the drop becomes significant.',
  },
  {
    q: 'How many times a day should I be pumping?',
    a: 'It depends on your baby\'s age and your goals. In the newborn period with a NICU infant or when establishing supply, 8–12 times in 24 hours (including overnight) is often recommended. For a working mom with a 3–4 month old nursing on weekends and pumping at work: typically 2–3 pump sessions at work timed to mirror the baby\'s feeding schedule. An IBCLC will tailor this to your specific situation.',
  },
]

export default function PumpingPage() {
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
          <span className="text-charcoal-600">Pumping Support</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            IBCLCs for Pumping and Exclusive Pumping
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Whether you're returning to work, exclusively pumping, or just trying to build a stash — an IBCLC
            who understands the pump can make the difference between thriving and burnout.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Pumping Is Its Own Skill Set
            </h2>
            <p>
              Most breastfeeding education is built around nursing at the breast. Pumping — especially exclusive
              pumping — is a different practice with its own science, its own equipment considerations, and its
              own failure modes. The good news: most pumping problems are fixable with the right guidance.
            </p>
            <p className="mt-3">
              Common pumping issues an IBCLC can solve: poor output despite good supply, flange sizing problems,
              output decline after a strong start, returning-to-work schedule planning, NICU pumping protocols,
              and the physical and emotional challenges of exclusive pumping long-term.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Returning to Work: Get Your Plan Before You Go Back
            </h2>
            <p>
              The best time to see an IBCLC about returning to work is 2–4 weeks before your first day back —
              not on the day you realize you're struggling to pump enough at the office. A return-to-work IBCLC
              consultation typically covers:
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Pumping schedule aligned with your baby\'s feeding times',
                'How to build a freezer stash without triggering oversupply',
                'What to do when your workplace situation isn\'t ideal',
                'Managing supply drops in the first weeks back',
                'How to handle missed pump sessions without panic',
                'When and how to introduce a bottle without causing nipple confusion',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-sage-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-2xl bg-ivory-100 border border-ivory-300 p-6">
            <h3 className="font-serif text-lg font-semibold text-charcoal-800 mb-3">
              Did you know: telehealth works well for pumping consults
            </h3>
            <p className="text-sm text-charcoal-600">
              Because pumping consultations often focus on schedule planning, troubleshooting, and equipment review
              rather than hands-on latch work, they're a great fit for telehealth. Many IBCLCs offer pumping
              consultations virtually — which means you can find the right specialist regardless of where you live.
            </p>
          </div>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Find a Pumping IBCLC Near You
            </h2>
            <div className="card p-8 text-center">
              <p className="text-charcoal-500 mb-4">
                Search for IBCLCs who specialize in pumping, returning to work, and exclusive pumping.
                Use the telehealth filter to find virtual consultations available nationwide.
              </p>
              <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
                Search IBCLCs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Your pumping journey deserves a real plan
          </h2>
          <p className="text-sage-50 mb-6">
            Find an IBCLC who understands pumping — and can help you do it sustainably.
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
            Pumping Questions, Answered
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
              Low Milk Supply Specialists →
            </Link>
            <Link href="/resources/home-visit-vs-telehealth" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Home Visit vs. Telehealth →
            </Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              What is an IBCLC? →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
