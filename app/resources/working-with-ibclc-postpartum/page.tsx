import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/resources/working-with-ibclc-postpartum' },
  title: 'Working with an IBCLC After Leaving the Hospital | Guide',
  description:
    'What to expect from a private IBCLC appointment after hospital discharge. How postpartum lactation support differs from in-hospital care — and why most families still need it.',
  openGraph: {
    title: 'Working with an IBCLC After Leaving the Hospital',
    description:
      'Most breastfeeding problems show up after you go home. Here is what a private IBCLC can do that hospital support cannot.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'How soon after birth should I see a private IBCLC?',
    a: "If you have any latch concerns, pain, or questions about your baby's weight, aim to see a private IBCLC within the first week. Milk doesn't fully come in until day 3-5, and most latch problems become apparent at home — not in the hospital. Early intervention in the first 7-10 days prevents small issues from becoming supply problems or early weaning.",
  },
  {
    q: 'Does insurance cover IBCLC visits after I leave the hospital?',
    a: "Yes. Under the Affordable Care Act, most insurance plans are required to cover breastfeeding support and lactation counseling — including outpatient visits with a private IBCLC after hospital discharge. Coverage applies to both in-network IBCLCs (direct billing) and sometimes out-of-network IBCLCs (reimbursement via superbill). Contact your insurer to confirm the number of covered visits and any in-network requirements before scheduling.",
  },
  {
    q: 'How long does a private IBCLC appointment last?',
    a: "A private IBCLC appointment typically runs 60-90 minutes — sometimes longer for complex situations. Compare that to the 15-30 minute hospital IBCLC visits, which are often split across multiple patients in a busy maternity ward. The extended time allows for a weighted feed (measuring exactly how much milk your baby transferred), a full feeding assessment, and a customized care plan you can actually implement at home.",
  },
  {
    q: 'What is the difference between a CLC and an IBCLC?',
    a: "A Certified Lactation Counselor (CLC) or Certified Breastfeeding Specialist (CBS) typically has 45-90 hours of training and is primarily trained in normal breastfeeding support. An IBCLC (International Board Certified Lactation Consultant) requires 1,000+ hours of supervised clinical practice, specific health science coursework, and passing a rigorous international board exam. For complex situations — tongue tie, low supply, NICU discharge, multiples, returning to work — an IBCLC is the appropriate choice.",
  },
]

export default function WorkingWithIbclcPostpartumPage() {
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
          <span className="text-charcoal-600">Working with an IBCLC After the Hospital</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl leading-tight">
            Working with an IBCLC After Leaving the Hospital
          </h1>
          <p className="mt-4 text-charcoal-500 leading-relaxed">
            Most breastfeeding problems don&apos;t happen in the hospital — they happen at home, in the
            middle of the night, when the nursing staff is gone. Here is what a private IBCLC can do
            for your family after discharge, and why a follow-up appointment is worth it.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              What IBCLCs do in the hospital
            </h2>
            <p className="text-charcoal-600 leading-relaxed">
              Hospital lactation consultants are an essential first line of support — they help with
              the first latch, answer initial questions, and identify obvious issues early. But hospital
              IBCLCs are working in a high-volume environment: a busy maternity ward may have one or
              two IBCLCs covering dozens of postpartum patients. A typical hospital IBCLC visit lasts
              15-30 minutes and may happen once or twice during your stay.
            </p>
            <p className="mt-3 text-charcoal-600 leading-relaxed">
              That&apos;s often enough to get started — but rarely enough to fully establish breastfeeding.
              Milk does not fully come in until day 3-5. Many latch issues are subtle and don&apos;t
              surface until your milk arrives and your baby is trying to transfer larger volumes. Most
              families leave the hospital with a foundation, not a fully solved breastfeeding experience.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Why you might still need support after discharge
            </h2>
            <div className="space-y-4">
              {[
                {
                  situation: 'Milk just came in',
                  detail: 'Engorgement, oversupply, and latch changes are common when milk transitions from colostrum to mature milk. What worked on day 2 may not work on day 5.',
                },
                {
                  situation: 'Weight concerns',
                  detail: "Babies typically lose up to 7-10% of birth weight and should regain it by day 10-14. If your provider flags weight at the first pediatric visit, an IBCLC with a scale can help you understand exactly how much milk your baby is transferring.",
                },
                {
                  situation: 'Nipple pain',
                  detail: 'Some nipple soreness in the first days is normal. Persistent or worsening pain — especially past the first week — is a sign something mechanical is wrong with the latch and needs professional assessment.',
                },
                {
                  situation: 'Suspected tongue tie',
                  detail: 'Tongue-tie often goes undiagnosed in the hospital. If feeding is painful or your baby isn\'t gaining well despite seeming to nurse constantly, a private IBCLC can do a thorough oral assessment.',
                },
                {
                  situation: 'Returning to work',
                  detail: 'If you\'re going back to work, a private IBCLC can help you set up a pumping schedule, choose the right pump and flange size, and plan the transition back.',
                },
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
              What a private IBCLC appointment looks like
            </h2>
            <p className="text-charcoal-600 leading-relaxed">
              A private IBCLC appointment is a different experience from what you received in the
              hospital. You get 60-90 minutes of dedicated, one-on-one time. The IBCLC will:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                'Take a full feeding history — what\'s been happening since discharge, how often you\'re nursing, how your baby is behaving at the breast',
                'Observe a full feeding from start to finish — latch, positioning, milk transfer signs, baby behavior',
                'Perform a weighted feed — weigh your baby before and after nursing to measure exactly how much milk was transferred',
                'Do an oral assessment of your baby — checking tongue mobility, palate, lip tie',
                'Examine your nipples and breasts for signs of damage, plugged ducts, or early mastitis',
                'Create a written care plan you can follow at home',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <span className="text-sage-400 mt-0.5 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Home visits vs. clinic visits
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <p className="font-semibold text-charcoal-700 mb-3">Home visit advantages</p>
                <ul className="space-y-2">
                  {[
                    'IBCLC sees your actual nursing setup — your chair, your pillows, your lighting',
                    'No car trip with a newborn',
                    'Both parents can be present without logistics of getting everyone to a clinic',
                    'More relaxed environment, baby often feeds better at home',
                  ].map((item) => (
                    <li key={item} className="text-sm text-charcoal-500 flex items-start gap-2">
                      <span className="text-sage-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <p className="font-semibold text-charcoal-700 mb-3">Clinic visit advantages</p>
                <ul className="space-y-2">
                  {[
                    'Clinic typically has more equipment (infant scale, specialized tools)',
                    'May be faster to schedule if IBCLC has office hours',
                    'Sometimes more cost-effective if billed as office visit',
                    'Good option for families who prefer the clinical setting',
                  ].map((item) => (
                    <li key={item} className="text-sm text-charcoal-500 flex items-start gap-2">
                      <span className="text-sage-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              How to find an IBCLC after leaving the hospital
            </h2>
            <p className="text-charcoal-600 leading-relaxed">
              Ask your hospital IBCLC for a referral before you leave — they often have a list of
              private-practice IBCLCs in your area. You can also ask your pediatrician, your OB or
              midwife, or search this directory by city or zip code. When choosing an IBCLC, look for
              someone who offers the type of appointment you need (home visit, clinic, or telehealth),
              accepts your insurance, and has availability in the first week postpartum.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Insurance coverage for postpartum IBCLC visits
            </h2>
            <p className="text-charcoal-600 leading-relaxed">
              Under the Affordable Care Act, most insurance plans must cover breastfeeding support
              and lactation counseling as a preventive service — meaning no cost-sharing for you.
              This typically extends to outpatient IBCLC visits after you leave the hospital.
              Coverage varies by plan, so check with your insurer about the number of covered visits,
              whether the IBCLC must be in-network, and how to submit for reimbursement if the IBCLC
              is out of network.
            </p>
            <div className="mt-4 bg-rose-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-charcoal-700 mb-1">Tip: Ask about a superbill</p>
              <p className="text-sm text-charcoal-500">
                If your preferred IBCLC doesn&apos;t bill insurance directly, ask for a superbill —
                an itemized receipt with diagnostic and procedure codes. Many plans will reimburse
                you directly when you submit the superbill.
              </p>
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
              Find a private IBCLC near you
            </h2>
            <p className="text-sage-50 mb-6">
              Search by city or zip code to find a board-certified lactation consultant who can see
              you at home, in clinic, or by telehealth.
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
              <Link href="/resources/first-ibclc-visit" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What to Expect at Your First IBCLC Visit →</Link>
              <Link href="/specialties/tongue-tie-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Tongue-Tie IBCLC Specialists →</Link>
              <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
              <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
