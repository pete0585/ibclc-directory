import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/first-ibclc-visit' },
  title: "What to Expect at Your First IBCLC Visit | LactationConsultantDirectory.com",
  description:
    "Nervous about your first lactation consultant appointment? Here's exactly what happens — what to bring, how long it takes, what the IBCLC will assess, and what you'll leave with.",
  openGraph: {
    title: "What to Expect at Your First IBCLC Visit",
    description:
      "Your first IBCLC visit doesn't need to be a mystery. Here's the full picture — from intake forms to feeding assessment to your care plan.",
  },
}

const faqData = [
  {
    q: "How long does a first IBCLC appointment take?",
    a: "A first visit with an IBCLC typically runs 60 to 90 minutes. This is significantly longer than a standard pediatrician visit because the IBCLC needs time to take a thorough history, observe one or more feeding sessions, assess both you and the baby, and explain their findings. Follow-up visits are usually 30 to 45 minutes.",
  },
  {
    q: "Do I need to bring anything to my IBCLC appointment?",
    a: "Bring your baby's discharge paperwork and any feeding logs you've kept. If your baby has lost more than 7% of birth weight, bring documentation from your pediatrician. If you're using a nipple shield, supplementer, or any feeding device, bring it. Your breast pump and any flanges you use are worth bringing if you have supply or output concerns. Wear a comfortable top that's easy to open.",
  },
  {
    q: "What does an IBCLC actually assess during a visit?",
    a: "The IBCLC will assess your baby's oral anatomy (tongue mobility, palate shape, lip tie), their latch and suck pattern, milk transfer (usually by weighing the baby before and after a feed with a clinical scale), and their overall feeding behavior. They'll also review your medical and feeding history, assess your breast anatomy, and watch for signs of oversupply, low supply, or nipple damage. This is a clinical assessment — thorough, not rushed.",
  },
  {
    q: "Will the IBCLC fix everything in one visit?",
    a: "One visit often resolves or significantly improves straightforward issues — latch problems, positioning, nipple pain from a simple adjustment. More complex situations (tongue tie, severe supply issues, NICU graduates, relactation) usually require multiple visits. Most IBCLCs will give you a realistic timeline at the end of your first appointment.",
  },
  {
    q: "Does insurance cover the first IBCLC visit?",
    a: "Usually yes. The ACA requires most insurance plans to cover breastfeeding counseling and support — including IBCLC visits — without cost-sharing (no copay, no deductible). Tricare and Medicaid also commonly cover IBCLC services. Confirm with your plan before your visit, and check whether your IBCLC submits insurance claims directly.",
  },
]

const prepSteps = [
  { title: "Keep a feeding log for 24 hours before", body: "Note what time you fed, which side, how long, and any pain or issues. Your IBCLC will want this." },
  { title: "Don't feed for 1-2 hours before the appointment", body: "Your IBCLC will want to observe a feeding, and a slightly hungry baby latches with more motivation." },
  { title: "Wear a comfortable, easy-access top", body: "You'll be breastfeeding during the appointment. A button-down or nursing top is easier than a pullover." },
  { title: "Bring your pump and any feeding devices", body: "If you're pumping, bring your pump and the flanges you're using. If you're using a nipple shield, bring it." },
  { title: "Bring a support person if possible", body: "Partners or family members who will help with feeding at home benefit from hearing the guidance firsthand." },
]

export default function FirstIbclcVisitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-charcoal-700">Resources</Link>
          <span>/</span>
          <span className="text-charcoal-600">Your First IBCLC Visit</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-sage-500 mb-3">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">60-90 minutes · Insurance accepted</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            What to Expect at Your First IBCLC Visit
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            A first IBCLC appointment is unlike any other medical visit. Here is exactly what happens,
            what to prepare, and what you should leave with.
          </p>
        </header>

        <div className="space-y-10 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Before You Arrive: How to Prepare
            </h2>
            <p className="mb-6">
              A little preparation makes the visit more productive. You will not be quizzed — but the more
              context you bring, the faster the IBCLC can zero in on what is actually going wrong.
            </p>
            <div className="space-y-4">
              {prepSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-ivory-50 rounded-xl border border-ivory-200">
                  <CheckCircle className="h-5 w-5 text-sage-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal-700">{step.title}</p>
                    <p className="text-sm text-charcoal-500 mt-1">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What Happens During the Visit
            </h2>
            <p className="mb-4">
              A first IBCLC appointment has a predictable flow, even though every family situation is different.
            </p>
            <div className="space-y-4">
              <div className="p-5 border-l-4 border-sage-400 bg-sage-50 rounded-r-xl">
                <p className="font-semibold text-charcoal-700 mb-1">Intake and history (15-20 min)</p>
                <p className="text-sm text-charcoal-600">The IBCLC reviews your birth history, your baby&apos;s weight trajectory, any feeding logs you&apos;ve kept, and your current concerns. They will ask about pain, latch issues, supply worries, pumping output, and your goals.</p>
              </div>
              <div className="p-5 border-l-4 border-sage-400 bg-sage-50 rounded-r-xl">
                <p className="font-semibold text-charcoal-700 mb-1">Pre-feed weight (2 min)</p>
                <p className="text-sm text-charcoal-600">Your baby is weighed on a clinical-grade scale before the feed. This baseline is used to calculate how much milk the baby transfers during your session.</p>
              </div>
              <div className="p-5 border-l-4 border-sage-400 bg-sage-50 rounded-r-xl">
                <p className="font-semibold text-charcoal-700 mb-1">Oral anatomy and latch assessment (10-15 min)</p>
                <p className="text-sm text-charcoal-600">The IBCLC examines your baby&apos;s oral anatomy — tongue mobility, upper and lower lip mobility, palate shape. They watch the latch and assess the suck pattern, often using a gloved finger in the baby&apos;s mouth.</p>
              </div>
              <div className="p-5 border-l-4 border-sage-400 bg-sage-50 rounded-r-xl">
                <p className="font-semibold text-charcoal-700 mb-1">Observed feeding (15-20 min)</p>
                <p className="text-sm text-charcoal-600">You feed your baby while the IBCLC observes. They may guide positioning adjustments in real time, offer tools like a nipple shield if appropriate, and assess swallowing patterns.</p>
              </div>
              <div className="p-5 border-l-4 border-sage-400 bg-sage-50 rounded-r-xl">
                <p className="font-semibold text-charcoal-700 mb-1">Post-feed weight and transfer calculation</p>
                <p className="text-sm text-charcoal-600">After the feed, the baby is weighed again. The difference tells you exactly how much milk transferred — a key data point for supply and weight gain questions.</p>
              </div>
              <div className="p-5 border-l-4 border-rose-400 bg-rose-50 rounded-r-xl">
                <p className="font-semibold text-charcoal-700 mb-1">Review, care plan, and next steps (10-15 min)</p>
                <p className="text-sm text-charcoal-600">The IBCLC explains their findings in plain language and gives you a written care plan. This may include home stretches, feeding schedule adjustments, supplementation guidance, referrals (pediatrician, ENT, dentist), or a follow-up appointment timeline.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What You Should Leave With
            </h2>
            <p>
              A good first visit ends with clarity, not more questions. You should leave with:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside text-charcoal-600">
              <li>A clear understanding of what is contributing to your feeding difficulty</li>
              <li>A written care plan with specific steps to take at home</li>
              <li>A realistic expectation for how long improvement will take</li>
              <li>Any referrals you need (pediatrician, ENT, oral surgeon for tongue tie)</li>
              <li>A plan for follow-up — whether that is another in-person visit, a telehealth check-in, or a call if symptoms worsen</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Common Questions
            </h2>
            {faqData.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Ready to Find Your IBCLC?</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Search by city to find board-certified lactation consultants near you. Filter by insurance,
            specialty, and visit type.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2 text-sm">
              Find an IBCLC Near You <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium self-center">Does Insurance Cover IBCLC Visits? →</Link>
            <Link href="/resources/how-to-choose-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium self-center">How to Choose an IBCLC →</Link>
          </div>
        </div>
      </article>
    </>
  )
}
