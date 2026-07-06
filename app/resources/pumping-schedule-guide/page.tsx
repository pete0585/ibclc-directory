import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/pumping-schedule-guide' },
  title: 'Pumping Schedule Guide for Breastfeeding Moms | LactationConsultantDirectory.com',
  description:
    'How often should you pump? A practical pumping schedule guide for working moms, exclusive pumpers, and moms building a freezer stash — backed by IBCLC expertise.',
  openGraph: {
    title: 'Pumping Schedule Guide: How Often Should You Pump?',
    description:
      'Practical pumping schedules for every situation — returning to work, exclusive pumping, and building a freezer stash. Reviewed by IBCLCs.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'How often should I pump to maintain my milk supply?',
    a: "To maintain supply, you need to remove milk as often as your baby would normally nurse — typically 8-12 times in 24 hours in the early weeks, tapering to 6-8 times as your baby grows. Replacement pumping sessions when you skip a nursing session should match the length and timing of the missed feeding. Going more than 5-6 hours without milk removal (pumping or nursing) regularly signals your body to produce less.",
  },
  {
    q: 'What is a good pumping schedule for returning to work?',
    a: "For most working moms, pumping every 2.5-3 hours at work maintains supply adequately. A common schedule for an 8-hour workday: pump at 9am, 12pm, and 3pm (three sessions). This replicates the 2-3 nursing sessions most 3-6 month olds take while separated from mom. Start your return-to-work practice pumping 1-2 weeks before going back to build confidence with the process and your workplace pump setup.",
  },
  {
    q: 'How long should a pumping session last?',
    a: "Most pumping sessions last 15-20 minutes, or until milk flow has slowed and your breasts feel softer. Pumping longer than 20-25 minutes is rarely productive and can cause nipple soreness. If you are not getting much output, try breast massage before and during pumping, power pumping (10 min on, 10 off, 10 on, 10 off for 1 hour), or consult an IBCLC to troubleshoot output issues.",
  },
  {
    q: 'How much milk should I be pumping per session?',
    a: "Average pump output varies widely — 1-4 oz per session (total from both breasts) is typical for most moms at 1-6 months postpartum. Exclusive pumpers may yield more per session since they depend entirely on the pump. Output is highly individual and not a direct reflection of actual milk supply — babies remove milk more efficiently than any pump. If you are concerned about output, talk to an IBCLC before assuming low supply.",
  },
  {
    q: 'When should I pump to build a freezer stash?',
    a: "The best time to build a freezer stash is after your supply has regulated (usually 6-12 weeks postpartum) and before you return to work. A simple approach: add one pumping session in the morning 30-60 minutes after the first nursing session of the day — morning is when prolactin levels (and milk production) peak. Even 1-2 oz extra per day builds a meaningful stash over several weeks.",
  },
]

export default function PumpingScheduleGuidePage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Pumping Schedule Guide</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl leading-tight">
            Pumping Schedule Guide: How Often Should You Pump?
          </h1>
          <p className="mt-4 text-charcoal-500 leading-relaxed">
            Pumping schedules are not one-size-fits-all. Whether you&apos;re returning to work,
            exclusively pumping, or trying to build a freezer stash, the right pumping schedule depends
            on your baby&apos;s age, your milk supply, and your daily routine. Here&apos;s what you
            need to know — and when it&apos;s time to bring in an IBCLC.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Pumping Schedules by Situation
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Returning to work (nursing + pumping)',
                  schedule: 'Pump every 2.5-3 hours at work',
                  detail: 'Replaces nursing sessions missed while separated. Most working moms need 3 pump sessions during a standard workday (9am / 12pm / 3pm). Nurse on demand when with baby.',
                },
                {
                  title: 'Exclusively pumping',
                  schedule: 'Every 2-3 hours, 8-12 times per 24 hours',
                  detail: 'The pump is your only milk removal source, so frequency matters more than for nursing moms. In the early weeks, pump 8+ times per day. As supply stabilizes after 12 weeks, some EPers successfully drop to 6-7 sessions.',
                },
                {
                  title: 'Building a freezer stash',
                  schedule: 'Add 1 session after morning nursing',
                  detail: 'Pump 30-60 minutes after first morning nursing session. Morning prolactin is highest, so output will be better. Even 1-2 oz/day adds up to a meaningful stash over 4-6 weeks.',
                },
                {
                  title: 'Increasing low supply',
                  schedule: 'Power pumping 1x/day for 1-2 weeks',
                  detail: 'Power pump for 1 hour: 20 min pumping, 10 min break, 10 min pumping, 10 min break, 10 min pumping. This mimics cluster feeding and signals your body to ramp up production.',
                },
              ].map((item) => (
                <div key={item.title} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.title}</p>
                  <p className="text-sm text-rose-600 font-medium mt-1">{item.schedule}</p>
                  <p className="text-sm text-charcoal-500 mt-2 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Pumping Output: What&apos;s Normal?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-ivory-100">
                    <th className="text-left p-3 text-charcoal-700 font-semibold border-b border-ivory-200">Baby&apos;s Age</th>
                    <th className="text-left p-3 text-charcoal-700 font-semibold border-b border-ivory-200">Typical Output Per Session</th>
                    <th className="text-left p-3 text-charcoal-700 font-semibold border-b border-ivory-200">Daily Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { age: '1-3 days', output: '0.5-1 oz total (colostrum)', daily: '—' },
                    { age: '1-2 weeks', output: '1-3 oz per session', daily: '10-24 oz' },
                    { age: '1-3 months', output: '2-4 oz per session', daily: '20-30 oz' },
                    { age: '3-6 months', output: '3-5 oz per session', daily: '24-35 oz' },
                    { age: '6-12 months', output: '2-4 oz per session', daily: '18-30 oz' },
                  ].map((row) => (
                    <tr key={row.age} className="border-b border-ivory-200">
                      <td className="p-3 text-charcoal-600">{row.age}</td>
                      <td className="p-3 text-charcoal-600">{row.output}</td>
                      <td className="p-3 text-charcoal-600">{row.daily}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-charcoal-400 mt-2">
              Output varies significantly between individuals. Low pump output does not always mean low supply.
            </p>
          </section>

          <section className="bg-rose-50 rounded-2xl p-6">
            <h2 className="font-serif text-lg font-semibold text-charcoal-700 mb-2">
              When to talk to an IBCLC about pumping
            </h2>
            <ul className="space-y-2">
              {[
                'Output has dropped 25%+ in a week without a clear reason',
                'Pain or nipple trauma during pumping (may indicate wrong flange size)',
                "You can't pump enough for your baby's daily needs",
                'Returning to work and unsure how to manage the transition',
                'Exclusive pumping and struggling with schedule fatigue',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <span className="text-rose-400 mt-0.5 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2 mt-4 text-sm">
              Find an IBCLC <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
              Frequently Asked Questions
            </h2>
            {FAQ.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>

          <div className="pt-8 border-t border-ivory-300">
            <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-3">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs Who Specialize in Pumping →</Link>
              <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Low Milk Supply Support →</Link>
              <Link href="/resources/breastfeeding-at-work-rights-and-tips" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Breastfeeding at Work: Your Rights →</Link>
              <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
