import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Breastfeeding in Public: Your Legal Rights in All 50 States | IBCLCDirectory.com',
  description:
    'Know your rights. All 50 states protect breastfeeding in public as of 2026. Federal law also covers workplace pumping under the PUMP Act (2023). Full state-by-state guide.',
  openGraph: {
    title: 'Breastfeeding in Public: Your Legal Rights in All 50 States',
    description:
      'All 50 states now protect the right to breastfeed in public. Federal law protects workplace pumping. Here is everything you need to know.',
  },
}

const faqData = [
  {
    q: 'Is breastfeeding in public legal everywhere in the United States?',
    a: 'Yes. As of 2024, all 50 states, the District of Columbia, Puerto Rico, and the U.S. Virgin Islands have laws protecting a person\'s right to breastfeed in public. Idaho became the last state to enact such a law. Federal law also provides additional protections in certain settings. You cannot legally be asked to leave, cover up, or move to a private space while breastfeeding in any state.',
  },
  {
    q: 'What is the PUMP Act and what does it protect?',
    a: 'The PUMP for Nursing Mothers Act (2023) expanded federal workplace pumping protections to cover nearly all employees. Under the PUMP Act, employers must provide: (1) reasonable break time for pumping, and (2) a private space — not a bathroom — to pump, until the child is 1 year old. This applies to most salaried and exempt employees who were previously not covered by the 2010 Break Time for Nursing Mothers law. Employers with fewer than 50 employees may claim an exemption if compliance creates significant difficulty or expense.',
  },
  {
    q: 'Can I be fired for pumping at work?',
    a: 'No. It is illegal to retaliate against an employee for exercising their rights under the PUMP Act. Retaliation includes firing, demotion, reduced hours, pay cuts, or hostile treatment related to pumping. If you believe you have been retaliated against, you can file a complaint with the U.S. Department of Labor\'s Wage and Hour Division.',
  },
  {
    q: 'What should I do if someone asks me to cover up or leave while breastfeeding?',
    a: 'You are within your rights to decline politely and continue nursing. You can say: "I am aware that breastfeeding in public is protected by [your state] law and I am not required to cover up or move." If you are in a federal building or on federal property, federal public accommodations law may also apply. If you are asked to leave a business, you may have a legal cause of action — document the incident, get names if possible, and consult a civil rights attorney or your state\'s breastfeeding advocacy organization.',
  },
  {
    q: 'Does the Fairness for Breastfeeding Mothers Act apply to me?',
    a: 'The Fairness for Breastfeeding Mothers Act (2024) requires certain public federal buildings to provide a lactation room with basic amenities (not a bathroom) for nursing or pumping. This applies to federal buildings open to the public. It does not replace or limit state law protections — it layers on top of them.',
  },
]

const STATE_PROTECTIONS = [
  { state: 'Alabama', notes: 'Protected. Exempts from public indecency laws.' },
  { state: 'Alaska', notes: 'Protected. Right to breastfeed in any public or private location.' },
  { state: 'Arizona', notes: 'Protected. Exempts from indecency statutes; employers must accommodate.' },
  { state: 'Arkansas', notes: 'Protected. Public breastfeeding protected statewide.' },
  { state: 'California', notes: 'Protected. Among the strongest laws — covered locations include workplaces, restaurants, and all public spaces.' },
  { state: 'Colorado', notes: 'Protected. Right to breastfeed anywhere the mother and child are authorized to be.' },
  { state: 'Connecticut', notes: 'Protected. Anti-discrimination provisions in public accommodations.' },
  { state: 'Delaware', notes: 'Protected. Covers all public and private accommodations.' },
  { state: 'Florida', notes: 'Protected. Explicit right in any location, public or private.' },
  { state: 'Georgia', notes: 'Protected. Exempts from public indecency; no cover requirement.' },
  { state: 'Hawaii', notes: 'Protected. Covered under civil rights and public accommodations laws.' },
  { state: 'Idaho', notes: 'Protected. Law enacted 2024 — the last U.S. state to do so.' },
  { state: 'Illinois', notes: 'Protected. Workplace accommodation and public breastfeeding rights both covered.' },
  { state: 'Indiana', notes: 'Protected. Public breastfeeding exempt from public indecency laws.' },
  { state: 'Iowa', notes: 'Protected. Right to breastfeed in public places.' },
  { state: 'Kansas', notes: 'Protected. Explicit right to breastfeed in public.' },
  { state: 'Kentucky', notes: 'Protected. Breastfeeding in public is exempt from indecency statutes.' },
  { state: 'Louisiana', notes: 'Protected. Right to breastfeed in any place open to the public.' },
  { state: 'Maine', notes: 'Protected. Anti-discrimination provisions in public accommodations.' },
  { state: 'Maryland', notes: 'Protected. Covered under state civil rights and public accommodations law.' },
  { state: 'Massachusetts', notes: 'Protected. Strong civil rights framework covers breastfeeding in public.' },
  { state: 'Michigan', notes: 'Protected. Right to breastfeed in public or private locations.' },
  { state: 'Minnesota', notes: 'Protected. Civil rights protections apply to breastfeeding in public.' },
  { state: 'Mississippi', notes: 'Protected. Public breastfeeding protected statewide.' },
  { state: 'Missouri', notes: 'Protected. Right to breastfeed in any public accommodation.' },
  { state: 'Montana', notes: 'Protected. Exempts from public indecency provisions.' },
  { state: 'Nebraska', notes: 'Protected. Public breastfeeding protected statewide.' },
  { state: 'Nevada', notes: 'Protected. Anti-discrimination protections in public settings.' },
  { state: 'New Hampshire', notes: 'Protected. Right to breastfeed in public or private setting.' },
  { state: 'New Jersey', notes: 'Protected. Comprehensive civil rights framework.' },
  { state: 'New Mexico', notes: 'Protected. Right to breastfeed in any public or private location.' },
  { state: 'New York', notes: 'Protected. Strong protections — can breastfeed in any public or private location.' },
  { state: 'North Carolina', notes: 'Protected. Explicit right to breastfeed in public.' },
  { state: 'North Dakota', notes: 'Protected. Exempts from public indecency laws.' },
  { state: 'Ohio', notes: 'Protected. Right to breastfeed in any public location.' },
  { state: 'Oklahoma', notes: 'Protected. Public breastfeeding protected statewide.' },
  { state: 'Oregon', notes: 'Protected. Strong anti-discrimination provisions.' },
  { state: 'Pennsylvania', notes: 'Protected. Right to breastfeed in any public setting.' },
  { state: 'Rhode Island', notes: 'Protected. Civil rights framework covers public breastfeeding.' },
  { state: 'South Carolina', notes: 'Protected. Right to breastfeed in any public place.' },
  { state: 'South Dakota', notes: 'Protected. Public breastfeeding protected statewide.' },
  { state: 'Tennessee', notes: 'Protected. Right to breastfeed in any location, public or private.' },
  { state: 'Texas', notes: 'Protected. Explicit right to breastfeed in any public or private location.' },
  { state: 'Utah', notes: 'Protected. Right to breastfeed in public; no cover-up required.' },
  { state: 'Vermont', notes: 'Protected. Anti-discrimination protections in public accommodations.' },
  { state: 'Virginia', notes: 'Protected. Public and workplace breastfeeding rights covered.' },
  { state: 'Washington', notes: 'Protected. Strong civil rights framework — includes workplace accommodation.' },
  { state: 'West Virginia', notes: 'Protected. Right to breastfeed in public or private setting.' },
  { state: 'Wisconsin', notes: 'Protected. Anti-discrimination protections for public breastfeeding.' },
  { state: 'Wyoming', notes: 'Protected. Right to breastfeed in public is protected statewide.' },
]

export default function BreastfeedingInPublicRightsPage() {
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
          <span className="text-charcoal-600">Breastfeeding in Public Rights</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Breastfeeding in Public: Your Legal Rights in All 50 States
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            All 50 states protect the right to breastfeed in public. Federal law protects your right to
            pump at work. Here is what you need to know — and what to do if someone challenges your rights.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Federal Law: The Legal Foundation
            </h2>
            <p>
              Federal protections for breastfeeding come from two primary sources:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="card p-4">
                <p className="font-semibold text-charcoal-700 mb-1">Civil Rights Act — Public Accommodations</p>
                <p className="text-sm text-charcoal-500">
                  Section 2000a(a) of the Civil Rights Act covers public accommodations — places like
                  restaurants, hotels, theaters, and shops. While the original law focused on race, sex,
                  religion, and national origin, some federal courts have interpreted breastfeeding
                  discrimination as a form of sex discrimination. State law provides more explicit
                  and direct protection in most cases.
                </p>
              </li>
              <li className="card p-4">
                <p className="font-semibold text-charcoal-700 mb-1">Fairness for Breastfeeding Mothers Act (2024)</p>
                <p className="text-sm text-charcoal-500">
                  This law requires federal buildings open to the public to provide a lactation room —
                  a clean, private space with basic amenities that is not a bathroom — for nursing or
                  pumping. This applies to federal courthouses, Social Security offices, VA facilities,
                  post offices, and other federal public buildings.
                </p>
              </li>
              <li className="card p-4">
                <p className="font-semibold text-charcoal-700 mb-1">PUMP for Nursing Mothers Act (2023)</p>
                <p className="text-sm text-charcoal-500">
                  The PUMP Act expanded workplace pumping protections to cover nearly all U.S. employees,
                  including salaried and exempt workers who were previously excluded. Employers must provide
                  reasonable break time and a private, non-bathroom space for pumping until the child
                  is 1 year old.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Your Workplace Pumping Rights Under the PUMP Act
            </h2>
            <p>
              The PUMP Act (Providing Urgent Maternal Protections for Nursing Mothers Act) became law in
              December 2022 and took effect in 2023. It significantly expanded the previous Break Time for
              Nursing Mothers provision.
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  right: 'Reasonable break time',
                  detail: 'Your employer must provide as much break time as you reasonably need to express milk. The law does not specify a number of minutes — it is based on individual need.'
                },
                {
                  right: 'A private space — not a bathroom',
                  detail: 'The space must be shielded from view, free from intrusion, and not a bathroom. A bathroom stall is not legally sufficient. Many employers use a private office, a dedicated lactation room, or a converted space.'
                },
                {
                  right: 'Protection until the child is 1 year old',
                  detail: 'These rights apply from birth through your child\'s first birthday, regardless of whether you are still breastfeeding or have transitioned to exclusive pumping.'
                },
                {
                  right: 'No retaliation',
                  detail: 'Firing, demoting, cutting hours, or any other adverse action because you pump at work is illegal. File a complaint with the U.S. Department of Labor Wage and Hour Division if this happens.'
                },
              ].map(({ right, detail }) => (
                <div key={right} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-ivory-200">
                  <CheckCircle className="h-5 w-5 text-sage-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal-700">{right}</p>
                    <p className="text-xs text-charcoal-400 mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">
              <strong>Small employer exception:</strong> Employers with fewer than 50 employees may claim an
              exemption if compliance would impose an undue hardship — but they must demonstrate this. The
              exemption is not automatic, and many small employers choose to comply anyway.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What to Do If You Are Asked to Leave or Cover Up
            </h2>
            <p>
              If someone asks you to stop breastfeeding, cover up, or move to a different area:
            </p>
            <ol className="mt-4 space-y-3">
              {[
                {
                  step: '1. Stay calm and know your rights',
                  detail: 'Say: "I am exercising my legal right to breastfeed in public, which is protected by [state] law. I am not required to cover up or move." You do not need to raise your voice or argue.'
                },
                {
                  step: '2. Ask for a manager if needed',
                  detail: 'If a staff member asks you to move, ask to speak with a manager. Many incidents are due to a single uninformed employee rather than business policy.'
                },
                {
                  step: '3. Document the incident',
                  detail: 'Note the date, time, location, names of employees involved, and what was said. If other people witnessed it, ask if they would be willing to provide a statement.'
                },
                {
                  step: '4. Report it',
                  detail: 'Contact your state civil rights agency or attorney general. Organizations like the National Women\'s Law Center (866-745-5487) and La Leche League can connect you with legal resources.'
                },
              ].map(({ step, detail }) => (
                <li key={step} className="card p-4">
                  <p className="font-semibold text-charcoal-700 mb-1">{step}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              State-by-State Public Breastfeeding Protections
            </h2>
            <p className="mb-4">
              As of 2026, all 50 states have laws protecting the right to breastfeed in public. Here is
              a summary of each state&apos;s protections:
            </p>
            <div className="space-y-2">
              {STATE_PROTECTIONS.map(({ state, notes }) => (
                <div key={state} className="flex items-start gap-3 py-2 border-b border-ivory-200 last:border-0">
                  <CheckCircle className="h-4 w-4 text-sage-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-charcoal-700">{state}: </span>
                    <span className="text-sm text-charcoal-500">{notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Navigating workplace accommodations? An IBCLC can help.
          </h2>
          <p className="text-sage-50 mb-6">
            An IBCLC can help you develop a pumping schedule, maximize output during work sessions,
            and manage supply while returning to work. Find one near you.
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
            Breastfeeding Rights: Frequently Asked Questions
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
            <Link href="/resources/breastfeeding-at-work-rights-and-tips" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Breastfeeding at Work: Rights and Tips →
            </Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Does Insurance Cover Lactation? →
            </Link>
            <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Find an IBCLC Who Specializes in Pumping →
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
