import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Low Milk Supply: When to Call an IBCLC | LactationConsultantDirectory.com',
  description:
    'Low milk supply is the most common reason mothers stop breastfeeding — but perceived low supply is even more common. An IBCLC can tell the difference and help. Here is when to call.',
  openGraph: {
    title: 'Low Milk Supply: When to Call an IBCLC',
    description:
      "Most 'low supply' isn't — but when it is, an IBCLC can diagnose the cause and build a protocol. Here is what to expect.",
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'How do I know if I actually have low milk supply?',
    a: "True low supply — where your baby is not getting enough milk — is confirmed by infant weight gain, not by how your breasts feel or how much you pump. A baby who is gaining weight appropriately (back to birth weight by 10-14 days, then gaining 4-7 oz per week in the first months) is getting enough milk, regardless of how often they feed or whether you can feel letdown. An IBCLC can do a weighted feed — weighing your baby before and after nursing — to measure exactly how much milk was transferred at a feeding.",
  },
  {
    q: 'What causes true low milk supply?',
    a: "True low supply usually has an identifiable cause. The most common are: infrequent or inefficient milk removal (supply follows demand — if milk isn't removed frequently enough, production decreases); latch or tongue-tie issues that prevent effective transfer; hormonal conditions like PCOS, thyroid dysfunction, or insulin resistance; insufficient glandular tissue (IGT — a structural condition affecting some women); postpartum hemorrhage or retained placenta (which can delay milk coming in); and prior breast surgery including reduction or augmentation. Identifying the cause determines the solution.",
  },
  {
    q: 'What does an IBCLC do for low milk supply?',
    a: "An IBCLC assessment for low supply typically includes: a full feeding history and maternal health history; a weighted feed to measure transfer; latch and positioning assessment; oral evaluation of the infant for tongue mobility and palate issues; breast and nipple assessment; review of pumping output and technique; and a custom protocol including feeding frequency, pumping schedule, galactagogues discussion, and supplementation planning if needed. For suspected secondary causes (hormonal, structural), the IBCLC will recommend follow-up with your OB or primary care provider.",
  },
  {
    q: 'Can low milk supply be increased?',
    a: "In most cases, yes — if the cause is insufficient milk removal, a corrected latch, adjusted feeding schedule, or pumping protocol can rebuild supply significantly. For hormonal causes like thyroid or PCOS, treating the underlying condition often improves supply. True primary insufficient glandular tissue (IGT) is the rare exception where supply cannot be fully increased — but even then, partial breastfeeding combined with supplementation is a valid and meaningful option for many families. An IBCLC can help you understand what is achievable in your specific situation.",
  },
]

export default function LowMilkSupplyIbclcPage() {
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
          <span className="text-charcoal-600">Low Milk Supply Guide</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl leading-tight">
            Low Milk Supply: When to Call an IBCLC
          </h1>
          <p className="mt-4 text-charcoal-500 leading-relaxed">
            Concern about milk supply is one of the most common reasons mothers contact an IBCLC —
            and one of the most misunderstood. Most perceived low supply isn&apos;t. But when it is,
            identifying the cause is essential for fixing it.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Is your supply actually low?
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              Perceived low supply — the feeling that you don&apos;t have enough milk — is the most
              common breastfeeding concern, and it is often inaccurate. Many mothers worry about
              supply based on signs that are not reliable indicators:
            </p>
            <div className="space-y-3">
              {[
                {
                  sign: 'Breasts feel soft or not full',
                  reality: "Breast fullness between feedings decreases as your supply regulates — usually around 6-8 weeks. Soft breasts in a well-established nursing relationship are normal, not a sign of low supply.",
                },
                {
                  sign: 'Baby feeds very frequently',
                  reality: "Cluster feeding — especially during growth spurts at 2-3 weeks, 6 weeks, and 3 months — is normal infant behavior. It signals increased demand, not inadequate supply.",
                },
                {
                  sign: 'Can\'t pump much',
                  reality: "Pumping output is not a measure of supply. Many mothers with abundant supply pump only 1-2 oz per session. The pump is less effective than a nursing baby at extracting milk.",
                },
                {
                  sign: 'Baby is fussy after feeding',
                  reality: "Fussiness has many causes — gas, overstimulation, developmental phases. It does not reliably indicate hunger or inadequate milk intake.",
                },
              ].map((item) => (
                <div key={item.sign} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.sign}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed">{item.reality}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-charcoal-600 leading-relaxed">
              The reliable measure of adequate supply is <strong className="text-charcoal-700">infant weight gain</strong>.
              A baby back to birth weight by day 10-14 and gaining 4-7 oz per week in the first months
              is receiving enough milk. If you have weight concerns, an IBCLC with a clinical scale can
              do a weighted feed at your appointment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Common causes of low supply
            </h2>
            <div className="space-y-4">
              {[
                {
                  cause: 'Infrequent or incomplete milk removal',
                  detail: "Milk supply is a demand-driven system. If feedings are infrequent, too short, or milk is not being transferred efficiently, the body interprets this as reduced demand and decreases production. This is the most correctable cause — addressing the root issue (usually latch or frequency) typically restores supply.",
                },
                {
                  cause: 'Latch issues reducing milk transfer',
                  detail: "A shallow latch, tongue tie, or high palate can prevent a baby from efficiently removing milk from the breast. The baby may nurse for extended periods but transfer little milk — and the breast, perceiving low demand, produces less. An IBCLC can identify this with a weighted feed and oral assessment.",
                },
                {
                  cause: 'Hormonal conditions (PCOS, thyroid, insulin resistance)',
                  detail: "PCOS, hypothyroidism, and insulin resistance are associated with reduced milk production in some women. These conditions can affect prolactin levels and breast tissue development. If supply doesn't respond to frequency and latch correction, hormonal evaluation with your OB or primary care provider is warranted.",
                },
                {
                  cause: 'Insufficient glandular tissue (IGT)',
                  detail: "A small percentage of women have structurally insufficient milk-producing glandular tissue — a condition often visible in breast appearance (wide spacing, tubular shape, minimal change in pregnancy). IGT is not correctable, but partial breastfeeding combined with supplementation is a meaningful option many families choose.",
                },
                {
                  cause: 'Postpartum hemorrhage or retained placenta',
                  detail: "Significant postpartum hemorrhage or retained placental tissue can delay or prevent milk coming in by disrupting the hormonal cascade that initiates lactation. This is a recognized cause of delayed or absent lactogenesis. Early IBCLC support is especially important for mothers who experienced these complications.",
                },
                {
                  cause: 'Prior breast surgery',
                  detail: "Breast reduction surgery has the highest risk of affecting milk supply — because glandular tissue and milk ducts may be disrupted. Augmentation has lower but still real risk depending on incision placement. If you have had breast surgery, discussing this with an IBCLC before your baby is born can help you prepare realistically.",
                },
              ].map((item) => (
                <div key={item.cause} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.cause}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              What an IBCLC does for low supply
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              An IBCLC brings clinical tools to low supply assessment that aren&apos;t available at a
              pediatrician office or from a peer support group:
            </p>
            <ul className="space-y-2">
              {[
                'Weighted feed — the gold standard for measuring actual milk transfer at a nursing session',
                'Latch assessment — observing a full feeding and identifying mechanical issues affecting transfer',
                'Oral evaluation — checking tongue mobility, palate shape, and lip tie for structural causes',
                'Pumping protocol — customized pumping schedule to stimulate supply if direct nursing transfer is inefficient',
                'Supplementation planning — if supplementation is needed, the IBCLC helps minimize its impact on supply',
                'Galactagogues discussion — evidence review for herbal and pharmaceutical options where appropriate',
                'Referral coordination — flagging hormonal or structural causes for follow-up with your OB',
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
              When supply cannot increase
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              Primary insufficient glandular tissue (IGT) is the rare case where supply genuinely
              cannot be increased to full capacity. This affects a small minority of mothers. It is
              not the cause of most supply concerns — the majority of mothers experiencing difficulty
              have a correctible contributing factor.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              For mothers with IGT or other permanent supply limitations, partial breastfeeding is
              still valuable and achievable. Even small amounts of human milk provide immune protection.
              Many families with IGT successfully combination-feed — breastfeeding alongside formula
              supplementation — for many months. An IBCLC can help you build a plan that works for
              your situation and your goals, whatever those are.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-4">
              Questions your IBCLC will ask
            </h2>
            <div className="bg-rose-50 rounded-xl p-5">
              <ul className="space-y-2">
                {[
                  "How often is your baby feeding — and for how long?",
                  "What is your baby's current weight, and how does it compare to birth weight?",
                  "When did your milk come in, and did it seem to fully come in?",
                  "Are you experiencing any pain during nursing?",
                  "Do you have any history of PCOS, thyroid issues, or prior breast surgery?",
                  "How much are you pumping, and when did you start pumping?",
                  "How many wet and dirty diapers is your baby producing daily?",
                ].map((q) => (
                  <li key={q} className="text-sm text-charcoal-600 flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">→</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
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
              Find an IBCLC for low supply support
            </h2>
            <p className="text-sage-50 mb-6">
              Search by city or zip code to find a board-certified lactation consultant who can do
              a weighted feed assessment and help you understand what&apos;s actually happening.
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
              <Link href="/specialties/mastitis-prevention" className="text-sm text-sage-600 hover:text-sage-700 font-medium">IBCLCs for Mastitis Prevention →</Link>
              <Link href="/specialties/tongue-tie-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Tongue-Tie IBCLC Specialists →</Link>
              <Link href="/resources/pumping-schedule-guide" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Pumping Schedule Guide →</Link>
              <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Does Insurance Cover an IBCLC? →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
