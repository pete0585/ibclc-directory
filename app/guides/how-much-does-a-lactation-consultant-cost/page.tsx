import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does a Lactation Consultant Cost? (2026 Price Guide) | LactationConsultantDirectory.com',
  description:
    'Lactation consultant costs range from $100–$300 per visit depending on credentials, visit type, and your location. Learn what affects pricing and what insurance covers.',
  openGraph: {
    title: 'How Much Does a Lactation Consultant Cost?',
    description:
      'IBCLC vs peer counselor, in-person vs telehealth, hospital vs private practice — costs vary significantly. Here is what to expect.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'How much does an IBCLC charge per visit?',
    a: 'A private-practice IBCLC typically charges $100–$300 for an initial consultation (60–90 minutes) and $75–$200 for follow-up visits (30–60 minutes). Hospital-employed IBCLCs billing through the hospital may have different rates that are often covered under your delivery or postpartum care. Telehealth IBCLCs generally run $75–$175 per session. Costs vary by region — IBCLCs in major metro areas tend to charge more than those in rural markets.',
  },
  {
    q: 'Do I need a referral to see a lactation consultant?',
    a: 'In most cases, no. Private-practice IBCLCs accept direct appointments without a physician referral. However, if you want insurance to cover the visit, some plans require a physician order or referral for coverage to apply. Check with your insurance before your first visit. Your OB, midwife, or pediatrician can write an order if needed.',
  },
  {
    q: 'What is the difference between an IBCLC and a breastfeeding peer counselor?',
    a: 'An IBCLC (International Board Certified Lactation Consultant) is the highest credential in lactation care — requiring 90 hours of education, 300–1,000 supervised clinical hours, and a board exam. Peer counselors (WIC Breastfeeding Peer Counselors, La Leche League leaders) are trained volunteers or paraprofessionals who provide support and education but are not clinical providers. For medical issues — low supply, latch problems, mastitis, tongue tie — you need an IBCLC. Peer support is valuable for general encouragement and information.',
  },
  {
    q: 'Does insurance cover lactation consultant visits?',
    a: 'Under the ACA, most insurance plans are required to cover breastfeeding support and supplies without cost-sharing. This typically includes IBCLC consultations. However, coverage depends on whether the IBCLC is in-network, whether you have a grandfathered plan (pre-ACA plans may be exempt), and your plan specifics. Always call your insurance to confirm coverage and ask specifically whether lactation consultations by an IBCLC are covered as preventive care.',
  },
  {
    q: 'How many lactation consultant visits do most mothers need?',
    a: 'Most breastfeeding challenges are resolved in 1–3 visits. An initial consultation addresses the core issue; follow-up visits confirm progress and adjust the plan. Complex situations — premature infants, tongue tie, significant supply concerns — may require 4–6+ visits over several weeks. IBCLCs often provide phone or email check-ins between visits at no extra charge, which reduces the total number of in-person appointments needed.',
  },
  {
    q: 'Are home visit lactation consultants more expensive?',
    a: 'Yes. IBCLCs who come to your home typically add a travel fee of $25–$75 on top of their standard consultation rate. For a new mother with a newborn, the convenience often justifies the cost — the IBCLC can observe your feeding environment, pillow setup, and daily routine in ways that are difficult in a clinic. Some IBCLCs offer home visits in the first week postpartum at no extra charge if you are within their service area.',
  },
]

const costTable = [
  { type: 'Initial consultation (private practice)', range: '$100–$300', duration: '60–90 min' },
  { type: 'Follow-up visit (private practice)', range: '$75–$200', duration: '30–60 min' },
  { type: 'Telehealth IBCLC session', range: '$75–$175', duration: '45–60 min' },
  { type: 'Home visit (includes travel)', range: '$150–$375', duration: '60–90 min' },
  { type: 'Hospital lactation consult (in-patient)', range: 'Covered under delivery/postpartum stay', duration: 'Varies' },
  { type: 'WIC peer counselor', range: 'Free', duration: 'Varies' },
]

export default function LactationConsultantCostPage() {
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
          <span className="text-charcoal-600">Lactation Consultant Cost Guide</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl leading-tight">
            How Much Does a Lactation Consultant Cost?
          </h1>
          <p className="mt-4 text-charcoal-500 leading-relaxed">
            Lactation consultant costs depend on credentials, visit type, and location. Most families
            pay $100–$300 for an initial visit — but insurance often covers the full amount. Here is
            what to expect and how to avoid overpaying.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Cost by visit type
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-ivory-300 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-sage-300 text-white">
                    <th className="text-left px-4 py-3 font-semibold">Visit Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical Cost</th>
                    <th className="text-left px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {costTable.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-ivory-100'}>
                      <td className="px-4 py-3 font-medium text-charcoal-700">{row.type}</td>
                      <td className="px-4 py-3 text-charcoal-600">{row.range}</td>
                      <td className="px-4 py-3 text-charcoal-500">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              What drives cost differences between IBCLCs
            </h2>
            <div className="space-y-3">
              {[
                {
                  factor: 'Credentials',
                  detail: 'IBCLCs with RN, CNM, or IBCLC+RN credentials may charge more because they can bill insurance differently and bring clinical nursing assessment to your visit. A Certified Lactation Counselor (CLC) charges less — but has significantly less clinical training than an IBCLC.',
                },
                {
                  factor: 'Geographic location',
                  detail: 'Urban and coastal markets (San Francisco, New York, Boston) run 30–50% higher than the national average. Rural IBCLCs may charge less — but may also add travel fees for home visits in spread-out service areas.',
                },
                {
                  factor: 'Practice type',
                  detail: 'Solo private practice IBCLCs often charge slightly less than those in a multi-provider lactation center because they have lower overhead. Hospital-affiliated IBCLCs may appear to cost more on paper but are often fully covered under your hospital billing.',
                },
                {
                  factor: 'Telehealth vs in-person',
                  detail: 'Telehealth IBCLCs (via video) are typically 20–40% less expensive than in-person visits. They are appropriate for latch troubleshooting, pumping guidance, and return-to-work planning — but cannot do a weighted feed.',
                },
              ].map((item) => (
                <div key={item.factor} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.factor}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Insurance coverage: what the ACA requires
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              The Affordable Care Act (ACA) requires non-grandfathered insurance plans to cover
              breastfeeding support and supplies without cost-sharing (no copay, no deductible).
              This typically includes IBCLC consultations — but the details matter:
            </p>
            <ul className="space-y-2">
              {[
                'Coverage applies to preventive services — your IBCLC must bill under the correct preventive care codes',
                'Grandfathered plans (those that have not changed significantly since March 2010) may not be required to comply',
                'The IBCLC must be in-network for zero cost-sharing — out-of-network visits may have cost-sharing',
                'Some plans require a physician order before covering the visit',
                'Medicaid coverage for lactation support varies by state — most states cover it',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <span className="text-sage-400 mt-0.5 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-charcoal-600 leading-relaxed">
              Before your first appointment, call the member services number on your insurance card
              and ask: <em>"Are lactation consultant visits by an IBCLC covered as a preventive
              service under the ACA? Do I need a referral?"</em>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Low-cost and free options
            </h2>
            <div className="space-y-3">
              {[
                {
                  option: 'WIC Breastfeeding Peer Counselors',
                  detail: 'Free for WIC-eligible families. WIC peer counselors provide phone, text, and in-person support. Many WIC offices also have IBCLCs on staff for more complex clinical issues.',
                },
                {
                  option: 'La Leche League',
                  detail: 'Free community meetings and phone support. LLL leaders are trained breastfeeding advocates, not clinical providers — best for general support and connection with experienced nursing mothers.',
                },
                {
                  option: 'Hospital IBCLCs',
                  detail: "If you're still in the hospital after delivery, IBCLC consultations during your stay are typically billed under your postpartum care — covered by most insurance. Request one before discharge if you have any concerns.",
                },
                {
                  option: 'Telehealth IBCLCs through insurance',
                  detail: 'Several telehealth lactation platforms (Maven Clinic, Bobbie, Pacify) contract directly with employers and insurance plans. If your employer provides access to one of these platforms, IBCLC sessions may be fully covered.',
                },
              ].map((item) => (
                <div key={item.option} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.option}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
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
              Find an IBCLC Near You
            </h2>
            <p className="text-sage-50 mb-6">
              Search by city or zip to find board-certified lactation consultants who accept your
              insurance. Filter by telehealth, in-home visits, or hospital affiliation.
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
              <Link href="/guides/does-insurance-cover-lactation-consultant" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
              <Link href="/guides/lactation-consultant-vs-breastfeeding-counselor" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLC vs Breastfeeding Counselor →</Link>
              <Link href="/guides/low-milk-supply-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Low Milk Supply: When to Call an IBCLC →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
