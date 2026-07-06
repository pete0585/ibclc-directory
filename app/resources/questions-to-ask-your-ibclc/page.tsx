import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/questions-to-ask-your-ibclc' },
  title: 'Questions to Ask Your IBCLC | IBCLCDirectory.com',
  description:
    'Get more from your lactation consultation. Here are the questions that lead to actionable answers — before your first appointment and at every follow-up.',
  openGraph: {
    title: 'Questions to Ask Your IBCLC Before and During Appointments',
    description:
      'Most parents go into IBCLC appointments without a plan. These questions will help you get specific, actionable answers instead of vague reassurance.',
  },
}

const faqData = [
  {
    q: 'What credentials should an IBCLC have?',
    a: "IBCLC stands for International Board Certified Lactation Consultant — it is the gold standard credential in lactation care, issued by the International Board of Lactation Consultant Examiners (IBLCE). IBCLCs must complete clinical hours, a rigorous examination, and continuing education for recertification. Other titles like lactation educator, breastfeeding counselor, or CLC (certified lactation counselor) represent shorter training programs and a different scope of practice. For complex problems — supply issues, latch pain, NICU babies, multiples — an IBCLC is the right level of support.",
  },
  {
    q: 'How do I prepare for my first IBCLC appointment?',
    a: "Track feedings for 24 hours before your appointment — note when you nursed, how long on each side, and how the baby seemed after. Bring any pumping records you have. Note your baby's weight at the last pediatrician visit. Write down your specific concerns in order of priority. The appointment goes faster when you come prepared. Also: wear easy nursing access clothing and bring your pump if you have one.",
  },
  {
    q: 'What should I ask at a first IBCLC appointment?',
    a: "The most useful questions: Is the latch correct and am I seeing the signs of effective transfer? Is my baby getting enough milk — can we do a weighted feed? What is my current supply like and is it appropriate for my baby's age and weight? What specific things should I do differently starting today? What does a follow-up plan look like? When should I call you before our next scheduled appointment? Write these down and bring them — it is easy to forget when you are tired and emotional.",
  },
  {
    q: 'When should I see an IBCLC instead of just asking my doctor?',
    a: "OB-GYNs and pediatricians receive minimal lactation training in medical school — typically a few hours. They are good at identifying red flags (jaundice, inadequate weight gain) but are usually not equipped to troubleshoot latch mechanics, tongue-tie assessment, or supply dynamics in depth. If you are experiencing any of the following, you want an IBCLC: pain at any point during nursing, a baby who seems to nurse constantly without satisfaction, supply concerns, a baby not gaining weight adequately, suspected tongue or lip tie, or simply wanting support building a sustainable feeding practice.",
  },
]

export default function QuestionsToAskIbclcPage() {
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
          <Link href="/listings" className="hover:text-charcoal-700">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Questions to Ask Your IBCLC</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Questions to Ask Your IBCLC
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Most parents walk into their first lactation consultation exhausted, emotional, and without
            a clear plan for what to ask. The result: they leave with general encouragement but not
            enough specific, actionable answers. These questions change that.
          </p>
        </header>

        <div className="space-y-10 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Before Your First Appointment
            </h2>
            <ul className="space-y-3">
              {[
                { q: 'Is this IBCLC board certified?', detail: 'Verify the IBCLC credential specifically. "Lactation consultant" is not a protected title — anyone can use it. The IBCLC credential is issued by IBLCE and requires clinical hours, examination, and ongoing recertification.' },
                { q: 'What does a first appointment include?', detail: 'Ask whether a weighted feed is part of the visit. A weighted feed — weighing your baby before and after nursing — is the only real-time way to know how much milk transferred during a session. Without it, any supply assessment is speculative.' },
                { q: 'Does the IBCLC have experience with my specific situation?', detail: 'If you have a premature baby, multiples, suspected tongue tie, or are trying to relactate or induce lactation, ask directly. Not all IBCLCs have the same breadth of experience.' },
                { q: 'What is the follow-up plan if my issue is not resolved in one visit?', detail: 'Complex problems rarely resolve in a single appointment. Ask what the plan looks like if you need ongoing support, and whether the IBCLC is available between sessions by phone or message.' },
              ].map(({ q, detail }) => (
                <li key={q} className="card p-5">
                  <p className="font-semibold text-charcoal-700 mb-1">{q}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              At the Appointment
            </h2>
            <ul className="space-y-3">
              {[
                { q: 'Is the latch correct? What specifically do I need to change?', detail: 'Push for specific mechanics, not just "looks good." Ask what you should be feeling and seeing when the latch is correct, and what is different about what is happening now.' },
                { q: 'Can we do a weighted feed right now?', detail: 'This is the single most useful data point in any newborn or supply concern visit. If the IBCLC is not offering it and you have any supply or weight concern, ask for it directly.' },
                { q: 'What is my baby actually transferring per session?', detail: 'Get a number from the weighted feed. How does that compare to what the baby should be getting at this age and weight?' },
                { q: 'Based on what you are seeing today, what are my top one or two things to change?', detail: 'The best consultations leave you with a very short, specific to-do list, not a list of ten things to try. If you are getting overwhelmed with information, ask the IBCLC to help you prioritize.' },
                { q: 'What signs should I watch for that mean I need to call you before our next appointment?', detail: 'Know the red flags in advance: specific weight loss numbers, feeding duration or frequency thresholds, signs of infection or engorgement that warrant early contact.' },
                { q: 'When should I expect to see a change if I follow this plan?', detail: 'Get a realistic timeline. "If we are not seeing improvement in 3-5 days, here is what we do next" is far more useful than "keep working at it."' },
              ].map(({ q, detail }) => (
                <li key={q} className="card p-5">
                  <p className="font-semibold text-charcoal-700 mb-1">{q}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Questions for Specific Situations
            </h2>
            <ul className="space-y-3">
              {[
                { q: 'Tongue or lip tie: "Does my baby have a tongue or lip tie, and does it need to be treated?"', detail: 'Tongue tie (ankyloglossia) can significantly affect latch and milk transfer. Not all apparent ties need revision — function matters more than anatomy. An IBCLC can assess whether a tie is functionally restricting the baby and help you navigate the decision about referral.' },
                { q: 'Returning to work: "What pumping schedule should I follow, and how do I protect supply when I am away from the baby?"', detail: 'The return-to-work transition is a common time for supply to drop. Ask for a specific pumping schedule matched to your baby\'s age and feeding frequency, guidance on output targets, and what to do if output starts declining.' },
                { q: 'Pumping concerns: "Am I pumping correctly, and is my pump sized correctly for me?"', detail: 'Flange size affects both comfort and output significantly. Many people are pumping with incorrect flange sizes and getting poor output as a result. Ask the IBCLC to check your flange fit.' },
                { q: 'Weaning: "What is the safest way to reduce sessions without developing mastitis or engorgement?"', detail: 'Abrupt weaning is a leading cause of mastitis. Get a specific session-reduction schedule with guidance on what to do if you feel fullness or plugs starting to develop.' },
              ].map(({ q, detail }) => (
                <li key={q} className="card p-5">
                  <p className="font-semibold text-charcoal-700 mb-1">{q}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Ready to find an IBCLC?
          </h2>
          <p className="text-sage-50 mb-6">
            Search the directory to find board-certified lactation consultants in your area —
            in person or by telehealth.
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
            IBCLC Appointment FAQs
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
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Does Insurance Cover Lactation Support? →
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
