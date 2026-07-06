import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, Video } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/home-visit-vs-telehealth' },
  title: 'Home Visit vs. Telehealth Lactation Consultation: Which Is Right for You? | IBCLCDirectory.com',
  description:
    'Comparing home visit IBCLCs vs. telehealth lactation consultants. Both work — but they\'re right for different situations. Here\'s how to choose.',
  openGraph: {
    title: 'Home Visit vs. Telehealth IBCLC: Which Should You Choose?',
    description:
      'Both home visits and telehealth lactation consultations are effective. Here\'s what each offers and how to decide which fits your situation.',
  },
}

const faqData = [
  {
    q: 'Is telehealth as effective as an in-person IBCLC visit?',
    a: 'For many common breastfeeding challenges, yes. Studies show telehealth lactation support is effective for: latch assessment via video (an experienced IBCLC can see a lot on a good video call), supply concerns and pumping guidance, return-to-work planning, emotional support and troubleshooting, and prenatal education. Where telehealth falls short: when hands-on intervention is needed — physical assistance with latch positioning, oral assessment for tongue tie, or weighted feeds (which require a scale).',
  },
  {
    q: 'What does a home visit IBCLC do that telehealth can\'t?',
    a: 'Home visit IBCLCs can: physically assist with positioning and latch, weigh your baby before and after nursing (weighted feed), assess your baby\'s oral anatomy including tongue and lip ties, observe your nursing environment and suggest changes, and provide the kind of hands-on support that simply isn\'t possible over video. If you\'re struggling with a latch that isn\'t working despite good position, if you suspect tongue tie, or if your baby isn\'t gaining weight adequately, an in-person home visit is the stronger choice.',
  },
  {
    q: 'How much does a home visit cost compared to telehealth?',
    a: 'Home visits typically cost more — $150–$350+ per visit in most markets, compared to $75–$200 for a telehealth session. However, both are often covered by insurance at no cost to you under the ACA preventive services mandate. Check with your insurer about both modalities. If cost is a concern, many IBCLCs offer telehealth as the lower-barrier first appointment, with a home visit for follow-up if needed.',
  },
  {
    q: 'Can a telehealth IBCLC assess tongue tie?',
    a: 'Partially. An IBCLC can observe feeding behavior over video, ask about symptoms, and identify patterns consistent with tongue tie. But definitive oral assessment requires hands-on examination — observing the range of tongue motion, feeling the frenulum. Most IBCLCs will do an initial telehealth assessment and then refer you to an in-person provider (either themselves for a home visit or a tongue tie release specialist) if findings warrant it.',
  },
  {
    q: 'Which states allow telehealth IBCLC consultations?',
    a: 'IBCLCs are not medical providers subject to state licensing in the same way as physicians — the IBCLC credential is a global certification, not a state license. However, some states have specific requirements for telehealth providers. In practice, most IBCLCs providing telehealth can serve patients in any state. Confirm with the IBCLC when booking.',
  },
]

export default function HomeVisitVsTelehealthPage() {
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
          <span className="text-charcoal-600">Home Visit vs. Telehealth</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Home Visit vs. Telehealth Lactation Consultation
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Both work. But they're right for different situations. Here's how to decide which one you need.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          {/* Quick comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card p-6 border-sage-200 border-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100">
                  <Home className="h-5 w-5 text-sage-500" />
                </div>
                <h2 className="font-serif text-lg font-semibold text-charcoal-800">Home Visit</h2>
              </div>
              <ul className="space-y-2">
                {[
                  'Hands-on latch and positioning support',
                  'Weighted feed (precise milk transfer measurement)',
                  'Oral assessment for tongue/lip tie',
                  'IBCLC comes to you — newborn doesn\'t travel',
                  'Best for: difficult latches, weight concerns, tongue tie',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-sage-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 border-rose-200 border-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                  <Video className="h-5 w-5 text-rose-400" />
                </div>
                <h2 className="font-serif text-lg font-semibold text-charcoal-800">Telehealth</h2>
              </div>
              <ul className="space-y-2">
                {[
                  'Often lower cost and easier to schedule',
                  'Available anywhere with good internet',
                  'Works well for pumping, supply, return-to-work',
                  'No specialist available locally? Telehealth solves that',
                  'Best for: pumping guidance, prenatal prep, supply concerns',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-rose-300 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              When to Choose a Home Visit
            </h2>
            <p>
              Choose an in-person home visit when the problem is physical. Latch issues that video hasn't solved.
              Weight gain that's stalling. A baby who is clicking, slipping off, or visibly not transferring well.
              Suspected tongue tie. Any time you need hands on the baby and hands on you.
            </p>
            <p className="mt-3">
              Home visits are also ideal in the first 1–3 days home from the hospital, when a newborn shouldn't
              be traveling and when hands-on support makes the biggest impact on establishing early feeding patterns.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              When Telehealth Works Just as Well
            </h2>
            <p>
              Choose telehealth when the problem is primarily about guidance, education, or planning.
              Setting up a pumping schedule. Navigating return-to-work logistics. Prenatal preparation.
              Talking through a weaning plan. Getting a second opinion when you're not sure if what you're
              experiencing is normal.
            </p>
            <p className="mt-3">
              Telehealth also makes sense when no IBCLC with the right specialty is near you. There are
              excellent IBCLCs available via telehealth nationwide — you're not limited to your zip code.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Start Your Search
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/listings?visit_type=home"
                className="flex-1 btn-secondary text-center"
              >
                Find Home Visit IBCLCs
              </Link>
              <Link
                href="/listings?telehealth=true"
                className="flex-1 btn-primary text-center"
              >
                Find Telehealth IBCLCs
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Not sure which to choose? Start with telehealth.
          </h2>
          <p className="text-sage-50 mb-6">
            A telehealth IBCLC can assess your situation and tell you whether you need an in-person visit.
            It's the lower-friction first step.
          </p>
          <Link
            href="/listings?telehealth=true"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
          >
            Find a Telehealth IBCLC <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Home Visit vs. Telehealth: Your Questions
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
            <Link href="/resources/how-to-choose-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              How to Choose an IBCLC →
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
