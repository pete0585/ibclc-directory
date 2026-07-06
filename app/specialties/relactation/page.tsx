import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/relactation' },
  title: 'IBCLCs for Relactation — Rebuilding Milk Supply | IBCLCDirectory.com',
  description:
    'Find an IBCLC who specializes in relactation. Whether you stopped breastfeeding weeks or months ago, or you are an adoptive parent inducing lactation, an experienced IBCLC can help.',
  openGraph: {
    title: 'Find an IBCLC for Relactation',
    description:
      'Relactation and induced lactation require specialized IBCLC support. Find a consultant who has helped parents rebuild or establish milk supply.',
  },
}

const faqData = [
  {
    q: 'What is relactation?',
    a: "Relactation is the process of re-establishing milk supply after breastfeeding has stopped. This can happen days, weeks, or even months after weaning. Success depends on how long ago breastfeeding stopped, how much stimulation is applied, and individual physiology — but relactation is possible for many people who are motivated and consistent. The process requires frequent, effective breast stimulation (nursing and/or pumping) and typically takes several weeks to rebuild a meaningful supply.",
  },
  {
    q: 'Is relactation actually possible?',
    a: "Yes, though the degree of success varies. The earlier after weaning you begin, the more likely you are to rebuild full supply. Relactating after a few weeks of stopping has a higher success rate than after several months, but even after extended breaks, some parents are able to rebuild enough supply to partially breastfeed. Induced lactation — establishing supply for an adoptive parent who was never pregnant — is also possible with the right protocol. An IBCLC experienced with relactation can give you a realistic assessment of what to expect.",
  },
  {
    q: 'What does a relactation protocol look like?',
    a: "A typical relactation protocol involves 8-12 stimulation sessions per 24 hours — a combination of nursing (if the baby will latch) and pumping with a hospital-grade pump. Galactagogues (herbs or medications that may support supply, like domperidone or fenugreek) are sometimes used under physician supervision. Keeping the baby interested in latching — through skin-to-skin contact, nursing at breast with a supplemental nursing system — is important. Progress is tracked by increasing pump output over days and weeks. An IBCLC will set realistic milestones and adjust the protocol based on your response.",
  },
  {
    q: 'How long does relactation take?',
    a: "It depends. Some people see increases in supply within days of beginning intensive stimulation. A full or near-full supply may take 4-8 weeks of consistent effort. The motivation and commitment required are significant — 8-12 pumping or nursing sessions per day is not easy. An IBCLC can help you structure the process to be as sustainable as possible and give you honest guidance on what is realistic for your specific situation.",
  },
]

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(9)
  return data ?? []
}

export default async function RelactationPage() {
  const listings = await getListings()

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
          <span className="text-charcoal-600">Relactation</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 leading-tight sm:text-5xl text-balance">
            Find an IBCLC for Relactation
          </h1>
          <p className="mt-4 text-xl text-charcoal-500 leading-relaxed">
            Whether breastfeeding stopped sooner than you planned, you are an adoptive parent trying to
            induce lactation, or you want to try after a gap of weeks or months — relactation is possible
            for many people. But it requires the right protocol and the support of an IBCLC who has
            helped other parents do this successfully.
          </p>
        </header>

        <div className="prose-content space-y-8 text-charcoal-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Why Relactation Requires a Specialist
            </h2>
            <p>
              Most IBCLCs are trained to help breastfeeding that is already established. Relactation is
              a different clinical challenge — rebuilding a supply that has stopped requires a specific
              protocol, realistic expectations, and the ability to troubleshoot when progress stalls.
            </p>
            <p className="mt-3">
              An IBCLC who specializes in relactation and induced lactation can assess your specific
              situation — how long ago you stopped, what kind of stimulation your body has been receiving,
              what your original supply was like — and design a protocol with realistic milestones. They
              can also support the feeding relationship during the transition, helping keep the baby
              interested in latching while supply is building.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
              Relactation vs. Induced Lactation
            </h2>
            <ul className="space-y-3 mt-3">
              {[
                {
                  label: 'Relactation',
                  detail: 'Rebuilding milk supply after breastfeeding has stopped. Most common when breastfeeding ended prematurely due to supply issues, illness, medication, or return to work. Success is higher when started within weeks of stopping, but meaningful outcomes are possible months later.',
                },
                {
                  label: 'Induced lactation',
                  detail: 'Establishing supply for someone who was never pregnant with the current baby — including adoptive parents and gestational surrogacy situations. Requires an extended preparation protocol (ideally 6-8 weeks or more before the baby arrives) involving hormone treatment and pumping. An IBCLC coordinates with your OB or midwife.',
                },
                {
                  label: 'Supplemental nursing system (SNS)',
                  detail: 'During relactation or induced lactation, a supplemental nursing system delivers formula or donor milk at the breast, encouraging the baby to latch while supply builds. An IBCLC can teach you to use an SNS effectively.',
                },
              ].map(({ label, detail }) => (
                <div key={label} className="card p-4">
                  <p className="font-semibold text-charcoal-700 text-sm mb-1">{label}</p>
                  <p className="text-sm text-charcoal-500">{detail}</p>
                </div>
              ))}
            </ul>
          </section>

          {listings.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-4">
                Find an IBCLC Near You
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing: any) => (
                  <Link
                    key={listing.id}
                    href={`/ibclc/${listing.slug}`}
                    className="card p-5 hover:shadow-card transition-shadow group"
                  >
                    <p className="font-semibold text-charcoal-800 group-hover:text-sage-600 transition-colors">
                      {listing.name}
                    </p>
                    <p className="text-sm text-charcoal-400 mt-1">{listing.city}, {listing.state}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {listing.telehealth && (
                        <span className="text-xs font-medium text-sage-600 bg-sage-50 rounded-full px-2 py-0.5">
                          Telehealth
                        </span>
                      )}
                      {listing.plan_tier === 'verified' && (
                        <span className="text-xs font-medium text-rose-600 bg-rose-50 rounded-full px-2 py-0.5">
                          Verified IBCLC
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="card p-8 text-center">
            <p className="text-charcoal-500 mb-4">
              Relactation is possible with the right support and a realistic plan.
              Find an IBCLC who has guided other families through this process.
            </p>
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
              Find an IBCLC Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-6">
            Relactation Questions, Answered
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
            <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Low Milk Supply Support →
            </Link>
            <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Pumping Support →
            </Link>
            <Link href="/listings" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              Browse All IBCLCs →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
