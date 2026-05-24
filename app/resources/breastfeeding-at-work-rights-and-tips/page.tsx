import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Breastfeeding at Work: Your Rights and Practical Tips | IBCLCDirectory.com',
  description:
    "Returning to work while breastfeeding is one of the hardest transitions new parents face. Know your legal rights under the PUMP Act and get practical tips for making it work.",
  openGraph: {
    title: 'Breastfeeding at Work: Your Legal Rights and Practical Tips',
    description:
      "The PUMP Act, how to set up a pump schedule at work, and when to call an IBCLC about your return-to-work transition.",
  },
}

const faqData = [
  {
    q: 'What is the PUMP Act and does it apply to me?',
    a: 'The PUMP for Nursing Mothers Act (2022) extended protections to nearly all employees — including salaried and exempt workers who were previously excluded. It requires employers to provide reasonable break time and a private space (not a bathroom) to pump, for up to one year after your child\'s birth. It applies to employers of any size. State laws may provide additional protections — check your state labor laws for specifics.',
  },
  {
    q: 'Can my employer make me use my lunch break to pump?',
    a: 'Your employer can count pumping breaks as your meal break if you would otherwise be completely relieved of duty during that break. However, if you are expected to pump and remain available or on-call, that time should be compensated. The PUMP Act requires "reasonable break time" — which the Department of Labor has interpreted to mean enough time to pump effectively, typically 15–20 minutes per session plus travel to the pumping space.',
  },
  {
    q: 'What if my employer does not have a dedicated pumping room?',
    a: 'The law requires a space that is shielded from view and free from intrusion from coworkers and the public. It cannot be a bathroom. If no dedicated room exists, a private office, storage room, or any private space can qualify — as long as it meets these standards. Put your request in writing. HR departments generally want to comply because the liability for non-compliance is real.',
  },
  {
    q: 'My supply is dropping since going back to work. Do I need to see an IBCLC?',
    a: 'Yes — this is one of the most common and most treatable problems an IBCLC sees. A supply drop after returning to work is usually caused by some combination of: not pumping frequently enough to match your baby\'s feeding schedule, flange sizing issues reducing efficiency, pump motor declining, or stress and schedule changes. An IBCLC can diagnose the cause and adjust your protocol before the drop becomes significant or irreversible.',
  },
]

export default function BreastfeedingAtWorkPage() {
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
          <span className="text-charcoal-600">Breastfeeding at Work</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Breastfeeding at Work: Your Legal Rights and What Actually Helps
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Returning to work while breastfeeding is one of the hardest transitions new parents face.
            The law gives you some protections — but knowing them, enforcing them, and making pumping
            at work actually work are three different things.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Your Legal Rights as a Pumping Employee
            </h2>
            <p>
              Federal law has evolved significantly since the original 2010 break time provision. The
              PUMP for Nursing Mothers Act (signed into law in December 2022) closed major gaps in the
              original law.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Who is covered', detail: 'Nearly all employees — including salaried, exempt, and previously excluded workers. Employers of any size are covered, though small employers (under 50 employees) can apply for an undue hardship exemption.' },
                { label: 'What is required', detail: 'Reasonable break time to express milk, plus a private space that is shielded from view and free from intrusion. The space cannot be a bathroom.' },
                { label: 'How long', detail: 'Coverage extends for up to one year after your child\'s birth.' },
                { label: 'State law', detail: 'Many states have stronger protections — longer coverage periods, paid break time, or additional requirements. Your state labor board\'s website will have specifics.' },
              ].map(({ label, detail }) => (
                <div key={label} className="card p-4">
                  <p className="font-semibold text-charcoal-700 text-sm mb-1">{label}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              How to Set Up Your Pump Schedule at Work
            </h2>
            <p>
              The goal is to mirror your baby's feeding frequency closely enough to maintain your supply.
              The most common mistake is not pumping often enough during the workday — supply is demand-driven,
              and if the demand drops, supply will follow within days.
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Pump every 2–3 hours during the workday — this typically means 2–3 sessions for an 8–9 hour day',
                'Time your sessions to align with when your baby would normally feed',
                'Once supply is established (typically after 12 weeks), sessions of 15–20 minutes are usually sufficient',
                'Pump in the morning before you leave — this is your highest-supply window and adds to the stash',
                'Do not skip sessions to "save up" — this signals your body to reduce supply, not build it',
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
              Plan your return before your first day back
            </h3>
            <p className="text-sm text-charcoal-600">
              The best time to see an IBCLC about returning to work is 2–4 weeks before your first
              day back — not after you realize you are struggling to pump enough at the office. A
              return-to-work consultation gives you a tailored protocol based on your baby's age,
              your supply, and your workplace situation.
            </p>
          </div>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Making It Work When Your Employer Is Difficult
            </h2>
            <p>
              Most employers comply when they understand the law. The ones who push back usually do so
              out of ignorance rather than hostility. A few strategies that help:
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Put your request in writing — even a simple email creates a record and prompts HR to get involved',
                'Reference the specific law: "Under the PUMP for Nursing Mothers Act (29 U.S.C. § 207(r))..."',
                'HR is generally your ally — they do not want the company to face a Department of Labor complaint',
                'Document everything: dates, times, who you spoke to, what was said, what was offered',
                'If your employer is non-compliant, the Department of Labor\'s Wage and Hour Division handles PUMP Act complaints',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-sage-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              When to Call an IBCLC About Your Work Transition
            </h2>
            <p>
              Returning to work is a common inflection point where breastfeeding journeys end earlier
              than planned — usually because of problems that are fixable with the right support. Call
              an IBCLC if you are experiencing:
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Supply dropping significantly within the first few weeks of returning to work',
                'Baby refusing the breast on weekends when you are home (bottle preference)',
                'Planning to reduce pumping sessions — get a plan before doing it, not after',
                'Uncomfortable or painful pumping (often a flange sizing issue)',
                'Thinking about weaning and wanting to do it gradually without supply crashing',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-rose-400 mt-0.5">!</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Find an IBCLC who specializes in pumping support
          </h2>
          <p className="text-sage-50 mb-6">
            Return-to-work transitions, supply concerns, and pumping schedules — an IBCLC can help.
          </p>
          <Link
            href="/specialties/pumping"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
          >
            Find a Pumping IBCLC <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Breastfeeding at Work: Common Questions
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
              Pumping Specialists →
            </Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Insurance Coverage Guide →
            </Link>
            <Link href="/resources/home-visit-vs-telehealth" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Home Visit vs. Telehealth →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
