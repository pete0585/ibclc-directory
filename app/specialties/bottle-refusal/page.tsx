import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/bottle-refusal' },
  title: 'IBCLCs Specializing in Bottle Refusal | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in bottle refusal. Get help with paced bottle feeding, nipple flow matching, and transition strategies when your baby refuses a bottle.',
  openGraph: {
    title: 'IBCLCs Specializing in Bottle Refusal',
    description:
      'Bottle refusal is one of the most stressful challenges for breastfeeding families. Find an IBCLC who can help your baby accept a bottle without giving up the breast.',
  },
}

const faqData = [
  {
    q: 'What causes bottle refusal?',
    a: "Bottle refusal usually happens because breastfed babies have learned a specific sucking pattern for the breast that feels different from a bottle nipple. The breast requires active jaw work and tongue movement to extract milk — a bottle flows differently, often faster, and requires less effort. Some babies refuse bottles because they associate feeding with the comfort and closeness of the breast, not just nutrition. Others have a flow preference — breast milk flows slower initially, and many standard bottles flow too fast, causing babies to pull away or refuse entirely.",
  },
  {
    q: 'How long does it take to fix bottle refusal?',
    a: "Every baby is different. With the right technique and a consistent approach, many families see progress within 3 to 7 days. Some babies adapt more quickly; others — particularly those who have only ever breastfed for weeks or months — may take 2 to 3 weeks of gradual introduction. Consistency matters more than speed. An IBCLC can help you identify whether the issue is nipple flow, feeding position, who is offering the bottle, or something else entirely — and give you a targeted plan rather than guessing.",
  },
  {
    q: 'Can I fix bottle refusal without an IBCLC?',
    a: "Sometimes, yes. Common first steps include having someone other than the breastfeeding parent offer the bottle, trying a slow-flow nipple, warming the nipple, offering when the baby is calm but slightly hungry (not starving), and using paced bottle feeding. If these approaches have not worked after a week or two of consistent effort — especially if you have a return-to-work deadline or a medical need for the baby to take a bottle — an IBCLC can provide an expert assessment that goes well beyond trial and error.",
  },
  {
    q: 'Does insurance cover an IBCLC visit for bottle refusal?',
    a: "Under the ACA, most insurance plans must cover breastfeeding counseling and support without cost-sharing. Bottle refusal support is within the scope of IBCLC practice. Many IBCLCs bill under lactation counseling codes that qualify as preventive care. Confirm with your insurance and the IBCLC before your appointment — and see our full guide on insurance coverage for more details.",
  },
  {
    q: 'What is paced bottle feeding and why does it help?',
    a: 'Paced bottle feeding is a technique that mimics the rhythm and effort of breastfeeding. The baby is held semi-upright, a slow-flow nipple is used, and the caregiver pauses every few sucks to let the baby regulate the pace. This prevents the baby from guzzling milk due to fast flow, reduces gas and overfeeding, and makes the bottle feel more similar to the breast. Many IBCLCs teach this as a first-line approach for breastfed babies who are transitioning to a bottle.',
  },
]

async function getBottleRefusalListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, phone, website, telehealth, plan_tier, specialties, slug')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function BottleRefusalPage() {
  const listings = await getBottleRefusalListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Specialties', item: `${process.env.NEXT_PUBLIC_SITE_URL}/listings` },
      { '@type': 'ListItem', position: 3, name: 'Bottle Refusal', item: `${process.env.NEXT_PUBLIC_SITE_URL}/specialties/bottle-refusal` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-700">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Bottle Refusal Specialists</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            IBCLCs Specializing in Bottle Refusal
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Bottle refusal is one of the most stressful challenges for breastfeeding families — especially
            when a return to work is approaching. Find an IBCLC who understands both sides of the
            breast-bottle transition.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What Is Bottle Refusal?
            </h2>
            <p>
              Bottle refusal happens when a baby who is breastfeeding — or who has been introduced to a bottle
              previously — refuses to accept a bottle from a parent or caregiver. It can range from occasional
              fussiness to a flat-out refusal no matter what bottle, nipple, position, or technique is tried.
              For breastfeeding families, it often emerges when a parent returns to work, needs to leave the
              baby with another caregiver, or when a medical situation requires the baby to take expressed
              milk or formula.
            </p>
            <p className="mt-3">
              Bottle refusal is not a failure on the part of the parent or the baby. It is a common challenge
              with identifiable causes — and it is highly solvable with the right approach. An IBCLC can assess
              what is driving the refusal and create a targeted plan to help your baby transition.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              How an IBCLC Helps with Bottle Refusal
            </h2>
            <p>
              An IBCLC brings a clinical eye to something that can feel like an impossible puzzle. In a
              bottle refusal consultation, they will:
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Watch the baby take (or refuse) a bottle to identify the specific breakdown point',
                'Assess oral motor function — tongue movement, jaw strength, suck pattern',
                'Evaluate whether nipple flow rate, shape, or material is contributing to refusal',
                'Teach paced bottle feeding technique to mimic the rhythm of breastfeeding',
                'Advise on bottle timing, who should offer the bottle, and feeding environment',
                'Create a gradual introduction plan that does not undermine breastfeeding',
                'Troubleshoot if the baby is also having latch or supply issues alongside refusal',
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
              Signs It Is Time to See an IBCLC for Bottle Refusal
            </h2>
            <ul className="space-y-2 mt-3">
              {[
                'You have tried multiple bottles and nipple types with no success',
                'Your baby cries, gags, or arches away from any bottle attempt',
                'You return to work in less than 2 weeks and your baby still refuses a bottle',
                'Your baby is losing weight or refusing to eat enough calories from any source',
                'You have had a caregiver report that the baby will not eat for hours while you are away',
                'Bottle refusal is causing significant stress for your family or affecting your breastfeeding relationship',
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
              Find an IBCLC Who Helps with Bottle Refusal
            </h2>
            {listings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                  {listings.map((l: any) => (
                    <Link
                      key={l.id}
                      href={`/ibclc/${l.slug}`}
                      className="card p-5 hover:shadow-card transition-shadow group"
                    >
                      <p className="font-semibold text-charcoal-800 group-hover:text-sage-600 transition-colors">
                        {l.name}
                      </p>
                      <p className="text-sm text-charcoal-400 mt-1">{l.city}, {l.state}</p>
                      {l.telehealth && (
                        <span className="mt-2 inline-block text-xs font-medium text-sage-600 bg-sage-50 rounded-full px-2 py-0.5">
                          Telehealth available
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-700"
                >
                  Browse all IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-charcoal-500 mb-4">
                  Search for IBCLCs near you — many specialize in bottle transition support.
                </p>
                <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
                  Browse All IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Find an IBCLC who helps with bottle refusal
          </h2>
          <p className="text-sage-50 mb-6">
            A targeted consultation can solve in one session what weeks of trial and error cannot.
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
            Bottle Refusal: Your Questions Answered
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
            <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              IBCLCs Who Specialize in Pumping →
            </Link>
            <Link href="/resources/does-insurance-cover-lactation" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Does Insurance Cover Lactation? →
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
