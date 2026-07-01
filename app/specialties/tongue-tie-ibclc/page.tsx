import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Find an IBCLC Specializing in Tongue-Tie | Lactation Consultant Directory',
  description:
    'Find a lactation consultant who specializes in tongue-tie assessment, frenotomy aftercare, and breastfeeding recovery after ankyloglossia. IBCLC tongue-tie expertise nationwide.',
  openGraph: {
    title: 'Find an IBCLC Who Specializes in Tongue-Tie (Ankyloglossia)',
    description:
      'Tongue-tie affects latch, milk transfer, and weight gain. Find an IBCLC with specific experience in tongue-tie assessment and post-frenotomy support.',
  },
}

const faqData = [
  {
    q: 'Can a lactation consultant diagnose tongue-tie?',
    a: "IBCLCs are trained to assess tethered oral tissues and can identify functional tongue-tie — meaning a restriction that is affecting feeding. An IBCLC evaluates latch quality, tongue mobility, and feeding mechanics to determine whether a referral for tongue-tie assessment makes sense. Diagnosis and the decision to proceed with a frenotomy are made by a physician, pediatric dentist, or ENT — not the IBCLC. A skilled IBCLC supports the breastfeeding relationship throughout and connects you with appropriate providers.",
  },
  {
    q: 'How do I know if my baby has tongue-tie?',
    a: "Common signs include: a shallow latch where the baby only takes the nipple, clicking or smacking sounds during nursing, poor weight gain or slow weight regain after birth, excessive gas from swallowing air, a heart-shaped or notched tongue tip when the baby cries, and maternal nipple pain or damage. These signs don't definitively confirm tongue-tie — other issues can produce the same symptoms — but they warrant evaluation by an IBCLC who can do a thorough oral assessment.",
  },
  {
    q: 'What happens after tongue-tie release?',
    a: "The frenotomy (tongue-tie release) is just the beginning. Most babies who had significant tongue restriction have developed compensatory oral motor patterns — they learned to feed around the restriction, which creates tension and habits that don't resolve on their own. A post-frenotomy IBCLC appointment is critical for helping the baby re-learn how to use the newly mobile tongue. The IBCLC guides wound stretching exercises, works on latch retraining, and monitors weight gain in the days following the procedure.",
  },
  {
    q: 'Does tongue-tie always need to be clipped?',
    a: "Not always. The decision depends on function, not just anatomy. Some babies with visible frenula feed effectively with no intervention needed. Others with less obvious restrictions have significant feeding impact. An IBCLC assesses the functional impact — how the tongue moves during nursing, whether milk transfer is effective, and whether the latch is causing maternal pain — before making a referral for release. If breastfeeding is going well despite a visible frenulum, watchful waiting may be the right approach.",
  },
  {
    q: 'Does insurance cover IBCLC visits for tongue-tie?',
    a: "The Affordable Care Act requires most insurance plans to cover breastfeeding support and lactation counseling without cost-sharing. This typically covers tongue-tie related IBCLC visits both before and after a frenotomy. TRICARE and most state Medicaid plans also commonly cover these services. Confirm with your specific plan and with the IBCLC that they bill insurance directly.",
  },
]

async function getTongueTieIbclcListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, telehealth, plan_tier, specialties, slug')
    .eq('status', 'active')
    .contains('specialties', ['Tongue Tie / Frenotomy Aftercare'])
    .order('plan_tier', { ascending: false })
    .limit(12)
  if (data && data.length > 0) return data

  // Fallback: show active listings if no specialty filter matches
  const { data: fallback } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, telehealth, plan_tier, slug')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(12)
  return fallback ?? []
}

export default async function TongueTieIbclcPage() {
  const listings = await getTongueTieIbclcListings()

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
      { '@type': 'ListItem', position: 3, name: 'Tongue-Tie IBCLC', item: `${process.env.NEXT_PUBLIC_SITE_URL}/specialties/tongue-tie-ibclc` },
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
          <span className="text-charcoal-600">Tongue-Tie Specialists</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Find an IBCLC Who Specializes in Tongue-Tie (Ankyloglossia)
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Tongue-tie affects latch, milk transfer, and weight gain. Find an IBCLC with hands-on
            experience in tongue-tie assessment and post-frenotomy care.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What is tongue-tie and how does it affect breastfeeding?
            </h2>
            <p>
              Tongue-tie (ankyloglossia) occurs when the lingual frenulum — the band of tissue
              connecting the tongue to the floor of the mouth — is shorter, tighter, or thicker than
              normal. This restricts tongue movement, which matters enormously for breastfeeding.
              Effective nursing requires the tongue to cup the breast, maintain suction, and move in
              a coordinated wave to transfer milk. When tongue mobility is restricted, that whole
              mechanism breaks down.
            </p>
            <p className="mt-3">
              The result: poor latch, reduced milk transfer, slow weight gain, and often significant
              maternal nipple pain. Babies may compensate by gripping tighter with their gums, causing
              the characteristic &ldquo;lipstick nipple&rdquo; shape after feeds. Some families go weeks
              before getting answers — often after being told the latch &ldquo;looks fine&rdquo; by a
              provider who evaluated anatomy but not function.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What an IBCLC does in a tongue-tie assessment
            </h2>
            <p>
              A tongue-tie focused IBCLC appointment is different from a general lactation consultation.
              The IBCLC will observe a full feeding, assess latch mechanics, and evaluate tongue mobility
              through both visual inspection and digital assessment. They are looking for functional
              restriction — not just whether a frenulum is visible, but whether it is affecting how the
              tongue works during nursing.
            </p>
            <p className="mt-3">
              If tongue-tie is suspected, the IBCLC will typically refer you to a qualified release
              provider (pediatric dentist, ENT, or trained pediatrician) for evaluation and, if
              appropriate, a frenotomy. The IBCLC often communicates directly with the release
              provider about what they observed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              IBCLC vs. ENT vs. pediatric dentist: who does what
            </h2>
            <div className="space-y-4">
              {[
                {
                  role: 'IBCLC',
                  does: 'Assesses functional feeding impact, identifies suspected tongue restriction, provides pre- and post-procedure support, guides post-frenotomy exercises and latch retraining.',
                },
                {
                  role: 'Pediatric dentist (with laser training)',
                  does: 'Evaluates the frenulum anatomy and function, performs laser frenotomy. Often the preferred provider for posterior tongue-tie due to precision of laser technique.',
                },
                {
                  role: 'ENT (otolaryngologist)',
                  does: 'Evaluates and performs frenotomy, typically with scissors or laser. Particularly experienced with more complex tethered oral tissue presentations.',
                },
                {
                  role: 'Pediatrician',
                  does: 'Some pediatricians perform simple anterior tongue-tie clips in office. May order referral to ENT or pediatric dentist for more complex cases.',
                },
              ].map((item) => (
                <div key={item.role} className="card p-5">
                  <p className="font-semibold text-charcoal-700">{item.role}</p>
                  <p className="text-sm text-charcoal-500 mt-1 leading-relaxed">{item.does}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              What to expect after a frenotomy
            </h2>
            <p>
              The frenotomy itself takes seconds. The recovery takes days to weeks. After the procedure,
              the baby needs to learn how to use the newly mobile tongue — this doesn&apos;t happen automatically.
              An IBCLC appointment within 24-48 hours of the procedure is the standard of care for
              families doing frenotomy for breastfeeding reasons. The IBCLC monitors weight, works
              on latch positioning, and guides you through the wound-stretching exercises that prevent
              reattachment of the frenulum. Many families need 2-3 follow-up visits in the weeks after
              a release to fully establish effective nursing.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Find a Tongue-Tie IBCLC
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
                  Browse All IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-charcoal-500 mb-4">
                  Search for tongue-tie IBCLCs in your area — filter by specialty when browsing.
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
            Get tongue-tie support from an expert
          </h2>
          <p className="text-sage-50 mb-6">
            Find an IBCLC near you with experience in tongue-tie assessment and frenotomy aftercare.
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
            Tongue-Tie and Breastfeeding: Your Questions Answered
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
            <Link href="/resources/working-with-ibclc-postpartum" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Working with an IBCLC After Leaving the Hospital →</Link>
            <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Low Milk Supply IBCLCs →</Link>
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">What is an IBCLC? →</Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">Browse All IBCLCs →</Link>
          </div>
        </div>
      </article>
    </>
  )
}
