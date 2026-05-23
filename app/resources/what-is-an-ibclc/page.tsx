import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Heart, Search, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is an IBCLC? Why It Matters for Your Breastfeeding Journey',
  description:
    'An IBCLC (International Board Certified Lactation Consultant) holds the gold-standard credential in breastfeeding care. Learn what sets them apart and why it matters for your baby.',
  openGraph: {
    title: 'What Is an IBCLC? Why It Matters for Your Breastfeeding Journey',
    description: "Learn what an IBCLC is, how they're different from other lactation consultants, and how to find one who accepts your insurance.",
  },
}

const faqData = [
  {
    q: 'What does IBCLC stand for?',
    a: "International Board Certified Lactation Consultant. It's the only internationally recognized credential for lactation care, administered by the International Board of Lactation Consultant Examiners (IBLCE).",
  },
  {
    q: "What's the difference between an IBCLC and a lactation consultant?",
    a: `"Lactation consultant" is not a protected title — anyone can call themselves one. IBCLC is a protected credential that requires specific education, clinical hours, and a rigorous board exam. When your baby's feeding is struggling, the difference matters.`,
  },
  {
    q: 'Does insurance cover an IBCLC?',
    a: 'Usually yes. The Affordable Care Act requires most insurance plans to cover breastfeeding counseling and support without cost-sharing. That includes visits with IBCLCs. Tricare and Medicaid also commonly cover IBCLC services. Always confirm with your specific plan.',
  },
  {
    q: 'When should I see an IBCLC?',
    a: "Sooner than you think you need to — and as soon as you're struggling. Common reasons: latch problems, nipple pain, low milk supply, oversupply, engorgement, plugged ducts, tongue tie, NICU graduate, returning to work, or just wanting guidance before your baby arrives.",
  },
  {
    q: 'Can I see an IBCLC by telehealth?',
    a: 'Yes. Many IBCLCs offer video consultations, which are especially effective for latch assessments and supply concerns. Telehealth IBCLCs can serve families anywhere in their licensed states.',
  },
  {
    q: 'How do I find an IBCLC near me?',
    a: 'Use IBCLCDirectory.com to search by city or state, filter by insurance and specialty, and find an IBCLC who fits your situation. All listings are IBCLCs only.',
  },
]

export default function WhatIsAnIbclcPage() {
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
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <span className="text-charcoal-600">What Is an IBCLC?</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            What Is an IBCLC?
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            The gold-standard credential in breastfeeding care — and why it matters when you're struggling.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              The Short Answer
            </h2>
            <p>
              An <strong className="text-charcoal-800">IBCLC</strong> — International Board Certified Lactation
              Consultant — is the only healthcare credential specifically designed for clinical lactation care.
              IBCLCs have completed extensive education and clinical training, and passed a rigorous international
              board exam administered by the IBLCE.
            </p>
            <p className="mt-3">
              There are approximately 21,185 IBCLCs certified in the United States. Many work in hospitals, but
              a significant portion — and the ones most accessible to new parents — work in private practice,
              offering home visits, in-office appointments, and telehealth consultations.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why "Lactation Consultant" Isn't Enough
            </h2>
            <p>
              Here's something most new parents don't know: "lactation consultant" is not a protected title.
              Anyone can call themselves a lactation consultant regardless of their training. Your neighbor, a
              weekend certification holder, or a volunteer with 16 hours of training can all legally use the term.
            </p>
            <p className="mt-3">
              <strong className="text-charcoal-800">IBCLC is different.</strong> To earn the credential, a
              candidate must complete specific college-level coursework in health sciences, accumulate 300–1,000+
              hours of supervised clinical practice, and pass the IBLCE board exam — a rigorous test covering
              clinical lactation management, infant physiology, and maternal health.
            </p>
            <p className="mt-3">
              When your baby is losing weight, when you're in pain every time you nurse, when you suspect tongue
              tie — you want the most qualified person in the room. That's an IBCLC.
            </p>
          </section>

          <div className="rounded-2xl bg-ivory-100 border border-ivory-300 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, label: 'Board-Certified', desc: 'International exam, rigorous training, renewed every 5 years.' },
              { icon: Heart, label: 'Private Practice', desc: 'More time, personalized plans, home visits and telehealth available.' },
              { icon: Search, label: 'Insurance Covered', desc: 'Most plans required to cover lactation support under the ACA.' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100">
                  <item.icon className="h-5 w-5 text-sage-500" />
                </div>
                <p className="text-sm font-semibold text-charcoal-700">{item.label}</p>
                <p className="text-xs text-charcoal-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              When to See an IBCLC
            </h2>
            <p>Sooner than you think. Common reasons parents seek IBCLC support:</p>
            <ul className="mt-3 space-y-2">
              {[
                'Latch problems or pain with every feed',
                'Nipple damage, cracking, or bleeding',
                'Low milk supply concerns',
                'Suspected tongue tie or lip tie',
                'Engorgement, plugged ducts, or mastitis',
                'NICU or premature infant feeding',
                'Twins or multiples',
                'Returning to work and navigating pumping',
                'Weaning — emotionally or physically complicated',
                'Prenatal preparation, especially with a history of supply issues',
              ].map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-sm">
                  <span className="text-sage-400 mt-0.5">•</span>
                  {reason}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              You don't have to be in crisis to see an IBCLC. Many families see one prenatally for
              preparation, or in the first week postpartum before problems develop.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Does Insurance Cover an IBCLC Visit?
            </h2>
            <p>
              Usually yes. The Affordable Care Act mandates that most health insurance plans cover
              breastfeeding counseling and support without cost-sharing. This includes visits with IBCLCs.
              Tricare (military insurance), Medicaid, and most commercial plans commonly cover IBCLC services.
            </p>
            <p className="mt-3">
              When searching for an IBCLC, use the insurance filter on this directory to find practitioners
              who accept your specific plan. Always confirm coverage with your insurer before your visit.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Ready to find your IBCLC?
          </h2>
          <p className="text-sage-50 mb-6">
            Search the nationwide directory — filter by insurance, city, visit type, and specialty.
          </p>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors">
            Find an IBCLC Near Me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Frequently Asked Questions
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
      </article>
    </>
  )
}

