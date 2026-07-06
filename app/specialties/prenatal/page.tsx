import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/prenatal' },
  title: 'Prenatal IBCLC Consultations | IBCLCDirectory.com',
  description:
    'Meet with an IBCLC before your baby arrives. Prenatal lactation consultations prepare you for breastfeeding before challenges arise — especially with a history of supply issues, previous surgery, or multiples.',
  openGraph: {
    title: 'Prenatal IBCLC Consultations — Prepare Before Your Baby Arrives',
    description:
      'The best time to see a lactation consultant is before you need one. Find an IBCLC who offers prenatal consultations.',
  },
}

const faqData = [
  {
    q: 'When should I see an IBCLC prenatally?',
    a: 'The second or third trimester is ideal — typically between 28 and 36 weeks. Early enough that you have time to prepare and address any concerns, late enough that breastfeeding anatomy (breast changes, colostrum) is accessible for assessment. If you have specific concerns (previous breast surgery, history of low supply, planned NICU stay, carrying multiples), earlier is better.',
  },
  {
    q: 'What happens at a prenatal lactation consultation?',
    a: 'A prenatal IBCLC consult typically includes: your breastfeeding history and goals, breast anatomy assessment (if requested — looking for previous surgery scars, inverted nipples, insufficient glandular tissue), education on newborn feeding cues and behavior, positioning and latch technique on a doll or demonstration, colostrum harvesting instruction (in some cases), and hospital bag prep — what to ask for and what to avoid in the first hours postpartum.',
  },
  {
    q: 'Is a prenatal consultation worth it if this is my first baby?',
    a: 'Yes, especially if: you have flat or inverted nipples (positioning technique helps enormously), you have a history of any breast surgery or procedure, you\'re having twins or higher-order multiples, you have PCOS, thyroid issues, or a previous low supply history, or you\'re simply an anxious first-time parent who wants to go in prepared. Even without risk factors, knowing what normal newborn feeding looks like in advance reduces postpartum panic significantly.',
  },
  {
    q: 'What is colostrum harvesting and should I do it prenatally?',
    a: 'Colostrum harvesting is expressing and collecting colostrum (the early breast milk produced in the third trimester) before birth. It\'s typically done in the last 2–4 weeks of pregnancy by hand expression. The stored colostrum can be fed to your baby if needed after birth — useful for babies with known low blood sugar risk, cleft palate, or other conditions requiring supplementation. An IBCLC can teach you the technique and advise whether it\'s appropriate for your situation. Note: some providers advise against prenatal expression in certain high-risk pregnancies.',
  },
  {
    q: 'Do I need a prenatal AND a postpartum IBCLC visit?',
    a: 'Many families benefit from both. The prenatal visit builds knowledge and identifies risk factors. The postpartum visit (ideally within the first 1–3 days home) is where you apply that knowledge with your actual baby. The two visits work together — your IBCLC will already know your history, goals, and any concerns identified prenatally.',
  },
]

export default function PrenatalPage() {
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
          <span className="text-charcoal-600">Prenatal Consultations</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Prenatal IBCLC Consultations
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            The best time to see a lactation consultant is before your baby arrives. Address concerns early,
            learn what normal looks like, and go into the postpartum period prepared.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why "Wait Until You Need Help" Is the Wrong Strategy
            </h2>
            <p>
              Most families seek IBCLC support when they're in crisis — nipple pain at 3am, a baby who won't
              latch, weight that isn't climbing. That's the right call. But the families who do best are the
              ones who also saw an IBCLC before birth.
            </p>
            <p className="mt-3">
              A prenatal consultation doesn't replace postpartum support — it makes postpartum support more
              effective. You'll know what to expect in the first hours, you'll know the difference between
              normal newborn behavior and a real problem, and your IBCLC will already know your history and
              anatomy when you call them at 3am.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Who Especially Benefits From Prenatal IBCLC Support
            </h2>
            <ul className="space-y-2 mt-3">
              {[
                'Previous low milk supply or early weaning in a prior pregnancy',
                'Breast augmentation, reduction, or any breast surgery history',
                'Flat, inverted, or atypical nipple anatomy',
                'PCOS, thyroid conditions, or insulin resistance',
                'Expecting twins, triplets, or higher-order multiples',
                'Planned NICU stay or known fetal condition requiring supplementation',
                'Strong desire to breastfeed with significant anxiety about it',
                'Prior traumatic birth or postpartum experience affecting feeding',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-sage-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Find an IBCLC Who Offers Prenatal Consultations
            </h2>
            <div className="card p-8 text-center">
              <p className="text-charcoal-500 mb-4">
                Search the directory and look for IBCLCs who list prenatal consultation as a specialty.
                Many offer telehealth prenatal visits — available nationwide.
              </p>
              <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
                Search IBCLCs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Prepare before your baby arrives
          </h2>
          <p className="text-sage-50 mb-6">
            Find an IBCLC who offers prenatal lactation consultations near you or via telehealth.
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
            Prenatal Lactation Consultations: FAQ
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
            <Link href="/resources/home-visit-vs-telehealth" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Home Visit vs. Telehealth →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
