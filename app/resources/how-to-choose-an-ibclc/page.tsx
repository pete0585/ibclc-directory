import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/how-to-choose-an-ibclc' },
  title: 'How to Choose an IBCLC: Questions to Ask Before You Book | IBCLCDirectory.com',
  description:
    'Not all IBCLCs are the same. Here\'s how to find one who\'s the right fit for your situation — what to look for, what to ask, and what red flags to watch for.',
  openGraph: {
    title: 'How to Choose an IBCLC: A Practical Guide',
    description:
      'Questions to ask before booking a lactation consultant, what specialties matter, and how to evaluate fit.',
  },
}

const questionsToAsk = [
  {
    q: 'What is your experience with [my specific situation]?',
    detail: 'Whether that\'s tongue tie, low supply, multiples, or NICU graduates — ask directly. A qualified IBCLC will give you a specific, confident answer. Vague reassurance is not a good sign.',
  },
  {
    q: 'Do you offer weighted feeds?',
    detail: 'If weight gain or supply transfer is a concern, weighted feeds are the standard of care. Any IBCLC doing home visits should have a clinical scale. Telehealth IBCLCs should refer you to someone who can do this.',
  },
  {
    q: 'Do you accept my insurance?',
    detail: 'Most IBCLC visits are covered by the ACA preventive services mandate. Ask if they bill insurance directly or if you need to submit for reimbursement yourself. Ask for their NPI number and billing code.',
  },
  {
    q: 'What does a follow-up plan look like?',
    detail: 'One visit rarely resolves everything. An IBCLC should have a plan for follow-up — whether that\'s a second visit, phone check-ins, or email support between sessions. If they don\'t mention follow-up, ask.',
  },
  {
    q: 'Do you have a philosophy on supplementation?',
    detail: 'This is a values-alignment question. Some IBCLCs are strongly anti-supplementation in a way that can harm babies who genuinely need it. Others are pragmatic and evidence-based. You want the latter. If an IBCLC makes you feel guilty about formula as a bridge tool, that\'s a problem.',
  },
  {
    q: 'What are your cancellation and rescheduling policies?',
    detail: 'Newborns don\'t keep schedules. Know the policy before you need it.',
  },
]

const faqData = [
  {
    q: 'Is there a difference between IBCLCs in terms of quality?',
    a: 'Yes. The IBCLC credential sets a floor — all IBCLCs have passed a board exam and met training requirements. But experience, specialty focus, communication style, and approach vary significantly. An IBCLC who has worked with 500 tongue tie cases is genuinely different from one who has seen 10. Seek out IBCLCs who are clear about their specialty areas and who can speak specifically to your situation.',
  },
  {
    q: 'Should I see an IBCLC at a hospital or a private practice?',
    a: 'Both are valid, but they serve different needs. Hospital IBCLCs are excellent for the first 24–48 hours postpartum — they\'re there, they know the environment, and they can intervene quickly. Private practice IBCLCs typically offer more time per visit (60–90 minutes vs. 15–20 in a hospital), more specialized expertise, and better follow-up. Many families benefit from hospital IBCLC support initially and private practice IBCLC support once they\'re home.',
  },
  {
    q: 'How do I know if an IBCLC is right for me if I can\'t afford to see multiple ones?',
    a: 'Many IBCLCs offer a free 15-minute phone call before booking. Use it. Ask your specific question and assess whether they answer it confidently and specifically. Check reviews if available. Ask your OB, midwife, or pediatrician for a personal recommendation — they often know which local IBCLCs are genuinely excellent.',
  },
  {
    q: 'What\'s the difference between an IBCLC and a CLC or CLE?',
    a: 'CLC (Certified Lactation Counselor) and CLE (Certified Lactation Educator) are shorter training programs — typically 40–45 hours versus 1,000+ hours for IBCLC candidates. CLCs and CLEs can provide good general support for uncomplicated breastfeeding. For clinical problems — tongue tie, weight gain issues, diagnosed supply problems — you want an IBCLC. For general support, a CLC can be a good and more accessible first step.',
  },
]

export default function HowToChoosePage() {
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
          <span className="text-charcoal-600">How to Choose an IBCLC</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            How to Choose an IBCLC
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Not all IBCLCs are the same — experience, specialty focus, and communication style matter.
            Here's what to look for before you book.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Start With Your Situation, Not the Nearest Listing
            </h2>
            <p>
              The right IBCLC for a first-time mom who wants prenatal preparation is different from the right
              IBCLC for a NICU parent whose 32-weeker is just learning to breastfeed. Both are board-certified.
              Both passed the same exam. But specialized experience is real and it matters.
            </p>
            <p className="mt-3">
              Before you search, name your specific concern. "Tongue tie and latch." "Supply is dropping after
              going back to work." "Twins, 4 weeks old, one nursing and one not." The more specific you are,
              the better you can match to the right person.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What to Look For in a Profile
            </h2>
            <ul className="space-y-3 mt-3">
              {[
                { label: 'Specific specialty areas listed', detail: 'Not just "all breastfeeding challenges" — look for explicit mention of your concern.' },
                { label: 'Visit types offered', detail: 'Home visits, office, telehealth — know what they offer before you contact them.' },
                { label: 'Insurance information', detail: 'In-network billing or superbill for reimbursement. IBCLCs who take insurance directly save you time and hassle.' },
                { label: 'Years of experience and setting', detail: 'Hospital background + private practice is often a strong combination. NICU experience matters for premature infants.' },
                { label: 'Mentions follow-up or ongoing support', detail: 'A one-and-done approach rarely works. Look for IBCLCs who build in follow-up.' },
              ].map(({ label, detail }) => (
                <li key={label} className="card p-4">
                  <p className="font-semibold text-charcoal-700 text-sm mb-1">{label}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Questions to Ask Before You Book
            </h2>
            <div className="space-y-4 mt-3">
              {questionsToAsk.map(({ q, detail }) => (
                <div key={q} className="card p-5">
                  <p className="font-semibold text-charcoal-700 mb-2">"{q}"</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Red Flags to Watch For
            </h2>
            <ul className="space-y-2 mt-3">
              {[
                'Dismisses tongue tie concerns without assessment',
                'Makes you feel guilty about formula supplementation that\'s medically necessary',
                'Doesn\'t mention follow-up or a plan for if things don\'t improve',
                'Won\'t give you a specific answer to a specific question',
                'Pushes a specific product, brand, or service as the answer to everything',
                'Can\'t explain what they\'ll actually do in the visit',
              ].map((flag) => (
                <li key={flag} className="flex items-start gap-2 text-sm">
                  <span className="text-rose-300 mt-0.5">⚑</span>
                  {flag}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Find your IBCLC — filter by specialty, visit type, and insurance
          </h2>
          <p className="text-sage-50 mb-6">
            Browse the directory and find IBCLCs who match your specific situation.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
          >
            Search IBCLCs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Choosing an IBCLC: Common Questions
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
            <Link href="/resources/home-visit-vs-telehealth" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Home Visit vs. Telehealth →
            </Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Insurance Coverage Guide →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
