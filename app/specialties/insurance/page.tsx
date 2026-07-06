import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/insurance' },
  title: 'IBCLCs Who Accept Insurance | IBCLCDirectory.com',
  description:
    'Find an IBCLC who accepts your insurance — Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Tricare, and Medicaid. The ACA requires most plans to cover lactation support.',
  openGraph: {
    title: 'Find an IBCLC Who Takes Your Insurance',
    description:
      'Most insurance plans are required to cover lactation support under the ACA. Find an IBCLC near you who accepts your plan.',
  },
}

const insurancePlans = [
  'Aetna',
  'Anthem / Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare (UHC)',
  'Humana',
  'Tricare (military)',
  'Medicaid',
  'Kaiser Permanente',
  'Molina Healthcare',
  'Centene / WellCare',
]

const faqData = [
  {
    q: 'Does insurance cover lactation consultant visits?',
    a: 'Yes — for most Americans. The Affordable Care Act (ACA) requires non-grandfathered health insurance plans to cover breastfeeding counseling and support without cost-sharing (no copay, no deductible). This coverage applies during pregnancy and postpartum. The specific number of covered visits varies by plan, but "zero cost" coverage is the rule, not the exception.',
  },
  {
    q: 'Does Tricare cover an IBCLC?',
    a: 'Yes. Tricare covers lactation counseling services for military families, including IBCLC visits. Coverage is available both in-network through military treatment facilities and in the private sector through Tricare Select. Some IBCLCs are Tricare-authorized providers — check individual listings for Tricare acceptance.',
  },
  {
    q: 'Does Medicaid cover an IBCLC?',
    a: 'In most states, yes. Medicaid is required to cover preventive services including lactation support under the ACA\'s Medicaid expansion provisions. Coverage specifics vary by state — some states have excellent Medicaid lactation coverage, others are more limited. An IBCLC who accepts Medicaid will note this on their listing. Call your state Medicaid office if you\'re unsure about your specific plan.',
  },
  {
    q: 'How do I know if an IBCLC is in-network?',
    a: 'The easiest way is to call your insurance\'s member services line (the number on your card) and ask for IBCLCs in your area who are in-network. You can also search this directory and filter by insurance accepted, then confirm with your insurer before your appointment. Some IBCLCs are "out-of-network" but will provide you a superbill for reimbursement — often still significantly covered.',
  },
  {
    q: 'What if my IBCLC is out-of-network?',
    a: 'Many IBCLCs operate private practices and aren\'t contracted with any insurance. However, the ACA requires most plans to cover out-of-network lactation services at a reasonable rate or to pay the provider directly. An out-of-network IBCLC can often provide you a superbill (an itemized receipt) that you submit to your insurance for reimbursement. Call your insurance before the visit to understand your out-of-network benefit.',
  },
]

export default function InsurancePage() {
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
          <span className="text-charcoal-600">Insurance</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Find an IBCLC Who Accepts Your Insurance
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            The Affordable Care Act requires most insurance plans to cover lactation support at no cost to you.
            Find an IBCLC near you who takes your plan.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Your Insurance Is Probably Required to Cover This
            </h2>
            <p>
              Under the Affordable Care Act, non-grandfathered health insurance plans must cover breastfeeding
              counseling and support as a preventive service — with no cost-sharing. That means no copay, no
              deductible, no out-of-pocket cost for covered visits. This applies during pregnancy and in the
              postpartum period.
            </p>
            <p className="mt-3">
              Most employer health plans, marketplace plans, and Medicaid expansions are covered. The main
              exceptions are certain grandfathered plans (plans that haven't changed significantly since 2010)
              and some short-term health plans. If you're unsure, call the member services number on your
              insurance card and ask: "Do I have coverage for lactation counseling under the ACA?"
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Insurance Plans Commonly Accepted by IBCLCs
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {insurancePlans.map((plan) => (
                <div key={plan} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-sage-400 flex-shrink-0" />
                  <span className="text-charcoal-600">{plan}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-charcoal-400">
              Coverage varies by individual plan. Always confirm with your IBCLC and insurer before your visit.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Find an IBCLC Who Accepts Your Insurance
            </h2>
            <p className="mb-6">
              Use the filter below to search for IBCLCs who accept specific insurance plans.
              Many IBCLCs also work with patients who have out-of-network benefits — ask about superbills.
            </p>
            <Link
              href="/listings?insurance=true"
              className="btn-primary inline-flex items-center gap-2"
            >
              Search IBCLCs by Insurance <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <div className="rounded-2xl bg-ivory-100 border border-ivory-300 p-6">
            <h3 className="font-serif text-lg font-semibold text-charcoal-800 mb-2">Tricare Families</h3>
            <p className="text-sm text-charcoal-600">
              Active duty, retired military, and their families enrolled in Tricare have strong lactation coverage.
              Tricare covers IBCLC services both through military treatment facilities and private-sector IBCLCs
              who are Tricare-authorized. Filter by "Tricare" in the insurance search to find authorized providers.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            You've already paid for this benefit
          </h2>
          <p className="text-sage-50 mb-6">
            Your insurance is likely required to cover IBCLC visits at no cost. Use it.
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
            Insurance Coverage for Lactation Consultants: FAQ
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
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Full Insurance Coverage Guide →
            </Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              What is an IBCLC? →
            </Link>
            <Link href="/resources/how-to-choose-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              How to Choose an IBCLC →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
