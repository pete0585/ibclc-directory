import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'IBCLCs Who Specialize in Tongue Tie | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in tongue tie and lip tie assessment, frenotomy aftercare, and breastfeeding recovery. These lactation consultants have specific experience with tethered oral tissues.',
  openGraph: {
    title: 'Find an IBCLC Who Specializes in Tongue Tie',
    description:
      'Tongue tie affects up to 10% of newborns and is one of the leading causes of breastfeeding difficulty. Find an IBCLC with tongue tie expertise near you.',
  },
}

const faqData = [
  {
    q: 'What is tongue tie and how does it affect breastfeeding?',
    a: 'Tongue tie (ankyloglossia) is a condition where the lingual frenulum — the band of tissue connecting the tongue to the floor of the mouth — is shorter, tighter, or thicker than normal. It restricts tongue movement, which can make it difficult for a baby to latch deeply, sustain suction, or transfer milk effectively. Symptoms in the baby include poor latch, clicking sounds while nursing, slow weight gain, and fatigue during feeds. In the mother: nipple pain, damaged nipple tissue, and low supply from poor milk transfer.',
  },
  {
    q: 'What is a frenotomy and do I need to see an IBCLC afterward?',
    a: 'A frenotomy (also called a frenectomy or tongue tie release) is a simple procedure where a doctor, dentist, or ENT clips or lasers the restrictive frenulum. Yes — seeing an IBCLC after a frenotomy is critical. The release alone doesn\'t fix the feeding problem. A baby who has compensated for tongue tie develops compensatory oral motor patterns that need to be unlearned. An IBCLC will guide you through aftercare exercises and help re-establish an effective latch.',
  },
  {
    q: 'Can an IBCLC diagnose tongue tie?',
    a: 'IBCLCs are trained to assess tethered oral tissues and can identify functional tongue tie — meaning a restriction that is affecting feeding. However, diagnosis and treatment decisions should be confirmed by a qualified provider (pediatric dentist, ENT, or pediatrician trained in tongue tie). A good IBCLC will refer you to appropriate providers while supporting the breastfeeding relationship throughout.',
  },
  {
    q: 'What should I look for in an IBCLC for tongue tie support?',
    a: 'Look for an IBCLC who explicitly lists tongue tie or tethered oral tissues as a specialty, has experience working alongside tongue tie release providers in your area, and can provide pre- and post-procedure support. Some IBCLCs also have additional training through organizations like the Academy of Lactation Policy and Practice (ALPP) or the Tongue Tie Support Parents Community.',
  },
  {
    q: 'Does insurance cover IBCLC visits for tongue tie?',
    a: 'The Affordable Care Act requires most insurance plans to cover lactation counseling and support without cost-sharing. This typically includes tongue tie-related IBCLC visits. Tricare and Medicaid also commonly cover these services. Check with your specific plan and confirm that the IBCLC you choose submits insurance claims.',
  },
]

async function getTongueTieListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, phone, website, telehealth, plan_tier, specialties, slug')
    .eq('status', 'active')
    .contains('specialties', ['Tongue Tie / Frenotomy Aftercare'])
    .order('plan_tier', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function TongueTiePage() {
  const listings = await getTongueTieListings()

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
      { '@type': 'ListItem', position: 3, name: 'Tongue Tie', item: `${process.env.NEXT_PUBLIC_SITE_URL}/specialties/tongue-tie` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-700">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Tongue Tie Specialists</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            IBCLCs Who Specialize in Tongue Tie
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Tongue tie affects latch, milk transfer, and weight gain. Find an IBCLC with hands-on tongue tie
            experience — before and after a frenotomy.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why Tongue Tie Requires a Specialist
            </h2>
            <p>
              Up to 10% of newborns have some degree of tethered oral tissue. Of those, a significant portion will
              experience breastfeeding difficulty as a result — often presenting as nipple pain, poor weight gain,
              or a latch that looks right but feels wrong. General lactation support alone isn't enough. You need
              an IBCLC who understands the mechanics of tongue function, can assess restriction accurately, and knows
              how to support feeding recovery whether a release procedure is done or not.
            </p>
            <p className="mt-3">
              Before a frenotomy: a tongue tie IBCLC can assess severity, help manage feeding in the interim,
              and connect you with qualified release providers. After a release: they guide the critical stretching
              and retraining work that turns the procedure into a breastfeeding improvement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Signs Your Baby May Have Tongue Tie
            </h2>
            <ul className="space-y-2 mt-3">
              {[
                'Clicking or smacking sounds during nursing',
                'Shallow latch — baby only takes the nipple, not the areola',
                'Nipple pain, creasing, or lipstick-shaped nipple after feeds',
                'Slow weight gain or failure to regain birth weight by day 10',
                'Baby falls asleep at the breast quickly without adequate transfer',
                'Excessive gas or colic from swallowing air during feeds',
                'Visible heart-shaped or notched tongue tip when baby cries',
                'Low milk supply developing after early weeks due to poor stimulation',
              ].map((sign) => (
                <li key={sign} className="flex items-start gap-2 text-sm">
                  <span className="text-sage-400 mt-0.5">•</span>
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Not every baby with these symptoms has tongue tie, and not every tongue tie causes all of these
              symptoms. A skilled IBCLC can do a full oral assessment and help you determine whether a tongue tie
              evaluation with a specialist makes sense.
            </p>
          </section>

          {/* Listings */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Find a Tongue Tie IBCLC
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
                  href="/listings?specialty=tongue-tie"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-700"
                >
                  See all tongue tie IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-charcoal-500 mb-4">
                  Search for tongue tie IBCLCs in your area — filter by specialty when browsing.
                </p>
                <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
                  Browse All IBCLCs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-sage-300 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Get the right support from day one
          </h2>
          <p className="text-sage-50 mb-6">
            Search for an IBCLC near you who has experience with tongue tie — before and after release.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sage-600 hover:bg-ivory-100 transition-colors"
          >
            Find an IBCLC Near Me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Tongue Tie and Breastfeeding: Your Questions Answered
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

        {/* Related */}
        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              What is an IBCLC? →
            </Link>
            <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Low Milk Supply IBCLCs →
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
