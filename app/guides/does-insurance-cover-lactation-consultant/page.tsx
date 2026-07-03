import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Does Insurance Cover a Lactation Consultant? (ACA Coverage Guide) | LactationConsultantDirectory.com',
  description:
    'The ACA requires most insurance plans to cover IBCLC visits at no cost to you. Here is what that means in practice — and what to do if your plan pushes back.',
  openGraph: {
    title: 'Does Insurance Cover Lactation Consultants?',
    description:
      'ACA requires breastfeeding support at no cost. But "in practice" is more complicated. Here is how to get your IBCLC covered.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Is IBCLC coverage required by law?',
    a: 'Yes — for most plans. The Affordable Care Act (ACA) Section 2713 requires non-grandfathered group and individual health plans to cover preventive services including "comprehensive lactation support and counseling by a trained provider" without cost-sharing. The U.S. Preventive Services Task Force (USPSTF) includes breastfeeding support in its Grade B preventive services. Plans that are grandfathered (i.e., have not materially changed since March 23, 2010) are exempt from this requirement.',
  },
  {
    q: 'What does "no cost-sharing" mean?',
    a: 'No copay, no deductible, no coinsurance. If your plan covers IBCLC visits as a preventive service, you should owe $0 out-of-pocket for in-network visits. This coverage applies whether you are pregnant, currently breastfeeding, or planning to breastfeed after delivery. The key condition is that you see an in-network provider.',
  },
  {
    q: 'My plan says it covers "breastfeeding support" but denied my claim. What do I do?',
    a: 'First, confirm the denial reason in writing. Common issues include: the IBCLC billed under a diagnosis code rather than a preventive code, the IBCLC is out-of-network, or the plan claims you needed a referral you did not obtain. For billing issues, ask the IBCLC to resubmit using CPT code 99406, 99401, or Z39.1 (postpartum care) plus the appropriate lactation modifier. For coverage disputes, file an internal appeal with your insurer and cite ACA Section 2713 explicitly. If the internal appeal fails, escalate to your state insurance commissioner.',
  },
  {
    q: 'Do I need a doctor\'s referral to get insurance to cover an IBCLC?',
    a: "Some plans require a physician order or referral for lactation support to be covered — even though the ACA does not require a referral for preventive services. Check your plan's specific requirements before your appointment. Your OB, midwife, or pediatrician can write an order for \"outpatient lactation consultation\" that satisfies most plans' requirements. It is a single sentence on a prescription pad and takes about 90 seconds for most providers.",
  },
  {
    q: 'Does Medicaid cover lactation consultants?',
    a: 'Yes — most state Medicaid programs cover lactation support, but coverage varies significantly by state. Some states cover unlimited IBCLC visits; others limit the number of covered visits or require the service be provided through a WIC-affiliated provider. Contact your state Medicaid office or call the member services number on your Medicaid card to confirm your specific coverage.',
  },
  {
    q: 'My plan is through my employer. Does coverage apply?',
    a: 'Yes, if your employer-sponsored plan is non-grandfathered and is regulated by ERISA or the ACA (which covers the vast majority of commercial plans). Self-insured large employer plans are also subject to the ACA preventive care mandate. The only common exception is small employer plans that have not changed since 2010 and retained their grandfathered status — this is increasingly rare.',
  },
]

export default function InsuranceLactationPage() {
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
          <span className="text-charcoal-600">Insurance Coverage Guide</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl leading-tight">
            Does Insurance Cover Lactation Consultants?
          </h1>
          <p className="mt-4 text-charcoal-500 leading-relaxed">
            The short answer is yes — for most Americans. The ACA requires most health plans to
            cover IBCLC visits without a copay or deductible. Here is how to make sure your plan
            actually delivers on that requirement.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              The ACA requirement — what it actually says
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              Under ACA Section 2713, non-grandfathered health plans must cover USPSTF Grade A and
              B preventive services without cost-sharing. Breastfeeding support and counseling is
              a Grade B USPSTF recommendation, which means:
            </p>
            <div className="bg-rose-50 rounded-xl p-5">
              <ul className="space-y-2">
                {[
                  'Comprehensive lactation support by a trained provider must be covered',
                  'No copay, no deductible — even if you have not met your annual deductible',
                  'Coverage applies during pregnancy AND the postpartum period',
                  'Applies to in-network providers — your plan controls which IBCLCs are in-network',
                ].map((item) => (
                  <li key={item} className="text-sm text-charcoal-600 flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Why claims still get denied — and how to fight back
            </h2>
            <div className="space-y-3">
              {[
                {
                  reason: 'Wrong billing code used',
                  fix: "The IBCLC billed under a diagnosis/treatment code instead of a preventive care code. Ask your IBCLC to resubmit under a preventive service code (CPT 99401-99404 or the Z39.x family). This single change resolves most denials.",
                },
                {
                  reason: 'Out-of-network provider',
                  fix: "The ACA's no-cost-sharing requirement only applies to in-network providers. If your IBCLC is out-of-network, you may face cost-sharing. Search our directory for in-network IBCLCs by filtering for insurance acceptance.",
                },
                {
                  reason: 'Referral not obtained',
                  fix: 'Some plans require a physician order even though the ACA does not require a referral for preventive services. Get a one-line order from your OB or midwife: "Please provide outpatient lactation consultation." Resubmit the claim.',
                },
                {
                  reason: 'Grandfathered plan',
                  fix: "Grandfathered plans are exempt from the ACA preventive care requirement. If your plan is grandfathered, your options are limited — check your plan documents or call member services. Grandfathered status must be disclosed in your plan materials.",
                },
              ].map((item) => (
                <div key={item.reason} className="card p-5">
                  <p className="font-semibold text-charcoal-700">Denial reason: {item.reason}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed"><strong>Fix:</strong> {item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              How to verify coverage before your first appointment
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-3">
              Call the member services number on the back of your insurance card and ask these
              specific questions:
            </p>
            <ol className="space-y-2">
              {[
                '"Is lactation consultant (IBCLC) support covered as a preventive service under the ACA?"',
                '"Is there a limit on the number of covered visits?"',
                '"Do I need a referral or physician order for coverage to apply?"',
                '"What CPT codes should the provider bill for this to be covered?"',
                '"Is [specific IBCLC name] in-network under my plan?"',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-charcoal-600">
                  <span className="font-bold text-sage-500 shrink-0">{i + 1}.</span>
                  <span className="italic">{q}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-charcoal-500">
              Get the representative's name and the call reference number. If your claim is later denied, this documentation supports your appeal.
            </p>
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

          <div className="bg-sage-300 rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-white mb-3">
              Find an In-Network IBCLC
            </h2>
            <p className="text-sage-50 mb-6">
              Search our directory to find IBCLCs who accept your insurance. Filter by telehealth,
              in-home visits, or hospital affiliation.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
            >
              Browse IBCLCs Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-8 border-t border-ivory-300">
            <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-3">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/how-much-does-a-lactation-consultant-cost" className="text-sm text-sage-600 hover:text-sage-700 font-medium">How Much Does an IBCLC Cost? →</Link>
              <Link href="/guides/lactation-consultant-vs-breastfeeding-counselor" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLC vs Breastfeeding Counselor →</Link>
              <Link href="/guides/low-milk-supply-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Low Milk Supply Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
