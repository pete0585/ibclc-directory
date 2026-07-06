import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/does-insurance-cover-lactation' },
  title: 'Does Insurance Cover a Lactation Consultant? (Complete Guide) | IBCLCDirectory.com',
  description:
    'Yes — most insurance plans are required by the ACA to cover IBCLC visits at no cost to you. Here\'s what\'s covered, what isn\'t, and how to make sure you get the benefit.',
  openGraph: {
    title: 'Does Insurance Cover a Lactation Consultant?',
    description:
      'The ACA requires most insurance plans to cover breastfeeding support without cost-sharing. Here\'s what that means for you and how to use the benefit.',
  },
}

const faqData = [
  {
    q: 'What does "no cost-sharing" actually mean?',
    a: 'No copay, no deductible, no coinsurance — zero out-of-pocket cost to you for covered visits with an in-network IBCLC. The ACA preventive services mandate requires this for non-grandfathered plans. You should never get a bill for a covered lactation visit with an in-network provider.',
  },
  {
    q: 'How many IBCLC visits does insurance cover?',
    a: 'This varies by plan. The ACA mandate doesn\'t specify a number — it says "comprehensive lactation support and counseling" must be covered during pregnancy and the postpartum period. Some plans cover unlimited visits, others cap at 6 or 12 per pregnancy/postpartum period. Call your insurer and ask specifically: "How many outpatient lactation consultant visits am I covered for, and do they count toward my deductible?"',
  },
  {
    q: 'My insurance denied my claim. What can I do?',
    a: 'First: appeal. Insurance denials for ACA-mandated preventive services are often overturned on appeal. Ask your IBCLC to code the claim as "preventive services" (the ACA mandate applies to preventive care). If your plan is through your employer, your HR department can escalate with the insurer. The National Women\'s Law Center has a free helpline (866-745-5487) that assists with insurance appeals for women\'s health services.',
  },
  {
    q: 'Does insurance cover a IBCLC who comes to my home?',
    a: 'Potentially yes. Home visit lactation consultations can be covered, but in-network home visit IBCLCs are less common. If you want a home visit, search for IBCLCs who offer home visits and confirm with your insurer that home visit services are covered under your preventive benefit. Some plans only cover office-based visits.',
  },
  {
    q: 'Can I use HSA or FSA funds for IBCLC visits?',
    a: 'Yes. IBCLC visits are an eligible medical expense under both Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA). Breast pumps are also FSA/HSA eligible. If you have out-of-pocket costs after insurance (or if you\'re using an out-of-network IBCLC), pay with your HSA/FSA card.',
  },
]

export default function InsuranceCoveragePage() {
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
          <span className="text-charcoal-600">Insurance Coverage</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Does Insurance Cover a Lactation Consultant?
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            The short answer: yes, for most Americans. Here's what's covered, what isn't, and exactly
            how to use the benefit without getting a surprise bill.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              The Law: The ACA Requires It
            </h2>
            <p>
              The Affordable Care Act (ACA) classifies breastfeeding counseling and support as a preventive
              service. Under the law, non-grandfathered health insurance plans must cover preventive services
              at no cost to the patient — meaning no copay, no deductible, no coinsurance. This includes
              visits with IBCLCs (International Board Certified Lactation Consultants).
            </p>
            <p className="mt-3">
              The coverage applies during pregnancy and postpartum. The mandate covers both prenatal lactation
              consultations (preparing to breastfeed) and postpartum visits (addressing problems after birth).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Which Plans Are Covered
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Marketplace / ACA plans', covered: true, note: 'All plans must cover lactation support' },
                { label: 'Employer-sponsored plans (post-2010)', covered: true, note: 'Must cover if not grandfathered' },
                { label: 'Tricare (military)', covered: true, note: 'Covers IBCLC services in-network and out' },
                { label: 'Medicaid (most states)', covered: true, note: 'Coverage varies by state' },
                { label: 'Medicare', covered: true, note: 'Covers if medically necessary' },
                { label: 'Grandfathered employer plans', covered: false, note: 'Plans unchanged since March 23, 2010 are exempt' },
                { label: 'Short-term health plans', covered: false, note: 'Not subject to ACA mandates' },
              ].map(({ label, covered, note }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-ivory-200">
                  {covered ? (
                    <CheckCircle className="h-5 w-5 text-sage-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-300 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-charcoal-700">{label}</p>
                    <p className="text-xs text-charcoal-400">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              How to Use Your Benefit Without a Surprise Bill
            </h2>
            <ol className="space-y-4 mt-3">
              {[
                {
                  step: '1. Call your insurance before your visit',
                  detail: 'Ask: "Do I have in-network coverage for outpatient lactation consultant visits? Is there a visit limit? What is the billing code I should ask my provider to use?"'
                },
                {
                  step: '2. Find an in-network IBCLC',
                  detail: 'Use this directory to find IBCLCs near you. Filter by your insurance plan. Confirm in-network status directly with the IBCLC before booking.'
                },
                {
                  step: '3. Ask your IBCLC to bill as preventive care',
                  detail: 'Most IBCLCs know to do this, but it doesn\'t hurt to ask. The correct ICD-10 codes for breastfeeding support are Z39.1 (encounter for care and examination of lactating mother) and Z76.81 (expectant mother prebirth pediatrician visit).'
                },
                {
                  step: '4. If billed incorrectly, appeal',
                  detail: 'If you receive an unexpected bill, call your insurer and ask them to reprocess the claim as a preventive service. Ask your IBCLC to resubmit with the correct preventive care code.'
                },
              ].map(({ step, detail }) => (
                <li key={step} className="card p-4">
                  <p className="font-semibold text-charcoal-700 mb-1">{step}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Find an IBCLC who accepts your insurance
          </h2>
          <p className="text-sage-50 mb-6">
            Search the directory and filter by your insurance plan to find covered providers near you.
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
            Insurance Coverage Questions
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
            <Link href="/specialties/insurance" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              IBCLCs Who Accept Insurance →
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
