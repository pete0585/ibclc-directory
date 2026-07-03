import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IBCLC vs Breastfeeding Counselor: What Is the Difference? | LactationConsultantDirectory.com',
  description:
    'IBCLCs are clinical providers with 300–1,000 hours of supervised practice and a board exam. Breastfeeding counselors and peer supporters have different training and scope. Know who to call for what.',
  openGraph: {
    title: 'IBCLC vs Breastfeeding Counselor: What Is the Difference?',
    description:
      'Not all lactation support is the same. Here is who does what — and which one you need for your specific situation.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'What does IBCLC stand for?',
    a: 'IBCLC stands for International Board Certified Lactation Consultant. It is the highest clinical credential in lactation care, awarded by the International Board of Lactation Consultant Examiners (IBLCE). To sit for the exam, candidates must complete 90 hours of approved lactation-specific education and either 300 or 1,000 hours of supervised clinical experience (depending on their professional background). IBCLCs recertify every 5 years with continuing education requirements.',
  },
  {
    q: 'What is a Certified Lactation Counselor (CLC)?',
    a: "A CLC is a trained lactation counselor who has completed a shorter credential program — typically 45 hours of training plus a written exam. CLCs often work in WIC offices, pediatric practices, and hospital postpartum units. They can provide excellent general support and education but are not clinical providers. For complex issues (low supply with suspected cause, tongue tie evaluation, NICU feeding), an IBCLC's clinical depth is needed.",
  },
  {
    q: 'Can a peer counselor help with breastfeeding problems?',
    a: "Peer counselors (WIC Breastfeeding Peer Counselors, La Leche League leaders) are trained to provide emotional support, basic information, and referrals to clinical care. They are often mothers who have breastfed themselves and went through a formal peer training program. Peer support is genuinely valuable — it improves breastfeeding rates, especially in the early weeks. But peer counselors are not equipped to diagnose supply issues, evaluate tongue tie, manage mastitis, or create clinical feeding plans. If you have a clinical problem, you need an IBCLC.",
  },
  {
    q: 'Will insurance cover a CLC but not an IBCLC?',
    a: "Usually the opposite. The ACA's preventive care requirement specifies 'comprehensive lactation support and counseling by a trained provider' — which health plans typically interpret to include IBCLCs. IBCLCs can bill using clinical procedure codes that insurance recognizes. CLCs and peer counselors cannot bill insurance independently. If your goal is to have the visit covered by insurance, an IBCLC is the appropriate provider.",
  },
  {
    q: 'My hospital says their "lactation support" is free. Is that an IBCLC?',
    a: "It depends on the hospital. Many hospitals employ IBCLCs as part of their postpartum care team — and their services are included in your hospital stay billing. Other hospitals may have Certified Lactation Counselors (CLCs) or nurses with basic lactation training providing that support. Ask specifically: 'Is the person who will see me an IBCLC?' If not, and if you are having a challenging time, request an IBCLC specifically, or ask for a referral to an outpatient IBCLC before discharge.",
  },
]

const comparisonRows = [
  { factor: 'Credential body', ibclc: 'IBLCE (International Board)', counselor: 'Varies by program', peer: 'Program-specific (WIC, LLL)' },
  { factor: 'Education required', ibclc: '90 hours lactation-specific + clinical hours', counselor: '~45 hours training', peer: '~20-40 hours training' },
  { factor: 'Clinical experience', ibclc: '300–1,000 supervised clinical hours', counselor: 'Limited', peer: 'None required' },
  { factor: 'Recertification', ibclc: 'Every 5 years (CEUs + exam)', counselor: 'Varies', peer: 'Annual refreshers (some programs)' },
  { factor: 'Can bill insurance', ibclc: 'Yes', counselor: 'Rarely', peer: 'No' },
  { factor: 'Can diagnose conditions', ibclc: 'Yes (within scope)', counselor: 'No', peer: 'No' },
  { factor: 'Cost', ibclc: '$100–$300/visit', counselor: '$50–$150/visit or free', peer: 'Free' },
]

export default function IbclcVsCounselorPage() {
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
          <span className="text-charcoal-600">IBCLC vs Breastfeeding Counselor</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl leading-tight">
            IBCLC vs Breastfeeding Counselor: What Is the Difference?
          </h1>
          <p className="mt-4 text-charcoal-500 leading-relaxed">
            Lactation support comes in several tiers — from peer volunteers to clinical specialists.
            Knowing which one you need depends on what you are dealing with. Here is how the
            credentials compare and when each type of support is appropriate.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              At a glance: credentials compared
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-ivory-300 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-sage-300 text-white">
                    <th className="text-left px-3 py-3 font-semibold">Factor</th>
                    <th className="text-left px-3 py-3 font-semibold">IBCLC</th>
                    <th className="text-left px-3 py-3 font-semibold">CLC/Counselor</th>
                    <th className="text-left px-3 py-3 font-semibold">Peer Support</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-ivory-100'}>
                      <td className="px-3 py-3 font-medium text-charcoal-700">{row.factor}</td>
                      <td className="px-3 py-3 text-charcoal-600">{row.ibclc}</td>
                      <td className="px-3 py-3 text-charcoal-600">{row.counselor}</td>
                      <td className="px-3 py-3 text-charcoal-600">{row.peer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              When you need an IBCLC
            </h2>
            <div className="space-y-3">
              {[
                { situation: 'Low milk supply concerns', detail: 'An IBCLC can do a weighted feed to objectively measure milk transfer, assess latch efficiency, and build a protocol. Peer support can offer encouragement but cannot measure what is actually happening.' },
                { situation: 'Tongue tie evaluation', detail: 'IBCLCs are trained to assess oral anatomy, observe latch mechanics, and coordinate with a pediatric dentist or ENT for frenulotomy if indicated. This is a clinical assessment requiring clinical training.' },
                { situation: 'Mastitis or breast abscess', detail: 'While mastitis treatment requires a physician, an IBCLC can help optimize milk removal (critical to recovery), adjust feeding positions, and prevent recurrence. This is clinical care.' },
                { situation: 'Preterm or medically complex infant', detail: 'NICU lactation support, feeding at breast with a preterm infant, and transition from tube/bottle to breast all require IBCLC expertise and often involve coordination with the NICU care team.' },
                { situation: 'Return to work / pumping planning', detail: 'An IBCLC can create a detailed pumping schedule tied to your return date, recommend appropriate pump specs for your output, and troubleshoot if pumping at work is not maintaining supply.' },
                { situation: 'Pain with nursing', detail: 'Persistent pain is not normal and usually has a specific cause — latch mechanics, oral anatomy, nipple vasospasm, thrush. An IBCLC can identify and address the cause; peer support cannot.' },
              ].map((item) => (
                <div key={item.situation} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.situation}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              When peer support is the right choice
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-3">
              Peer counselors and community support are genuinely valuable for:
            </p>
            <ul className="space-y-2">
              {[
                'General questions about normal newborn feeding patterns',
                'Encouragement and connection with experienced breastfeeding mothers',
                'Information about breastfeeding in public, at work, or during travel',
                'Support for nursing toddlers or tandem nursing',
                'Community connection — local La Leche League meetings, online support groups',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <span className="text-sage-400 mt-0.5 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
              Find a Board-Certified IBCLC
            </h2>
            <p className="text-sage-50 mb-6">
              Every provider in our directory is an International Board Certified Lactation
              Consultant. Search by city or zip for IBCLCs near you.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
            >
              Find an IBCLC Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-8 border-t border-ivory-300">
            <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-3">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/how-much-does-a-lactation-consultant-cost" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLC Cost Guide →</Link>
              <Link href="/guides/does-insurance-cover-lactation-consultant" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Insurance Coverage for IBCLCs →</Link>
              <Link href="/guides/low-milk-supply-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Low Milk Supply Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
