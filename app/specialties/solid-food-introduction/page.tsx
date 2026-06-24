import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'IBCLCs Who Help with Solid Food Introduction | LactationConsultantDirectory.com',
  description:
    'Starting solids while breastfeeding? Find a lactation consultant who specializes in baby-led weaning, purees, and the transition to solids without disrupting milk supply.',
  openGraph: {
    title: 'Solid Food Introduction Help from an IBCLC',
    description:
      'Find a lactation consultant who supports the breastfeeding-to-solids transition — baby-led weaning, combo feeding, and maintaining milk supply.',
  },
}

async function getSolidsListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('*')
    .eq('status', 'active')
    .order('plan_tier', { ascending: false })
    .limit(9)
  return data ?? []
}

export default async function SolidFoodIntroductionPage() {
  const listings = await getSolidsListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When should I start solids if I am breastfeeding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most major health organizations — the AAP, WHO, and ACOG — recommend introducing solid foods around 6 months of age, when babies show developmental readiness: sitting with minimal support, showing interest in food, and losing the tongue-thrust reflex. Starting before 4 months is not recommended. Breast milk (or formula) remains the primary nutrition source through the first year, and solid foods complement rather than replace milk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will starting solids reduce my milk supply?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "It can if solids replace nursing sessions rather than complement them. The key is to continue nursing on demand and offer solids after breastfeeding rather than before — this keeps milk supply stable while your baby explores new foods. An IBCLC can help you create a schedule that protects supply as your baby's solid intake increases.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is baby-led weaning and can an IBCLC help with it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Baby-led weaning (BLW) is an approach to solid food introduction where babies self-feed soft, appropriately sized pieces of whole food rather than being spoon-fed purees. Many IBCLCs are knowledgeable about BLW and can help you navigate it safely — including safe food sizes, appropriate textures, and how to protect your milk supply as your baby increases solid intake.",
        },
      },
      {
        '@type': 'Question',
        name: 'Should I keep breastfeeding after starting solids?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The WHO recommends breastfeeding alongside solid foods until at least 2 years of age (or as long as mutually desired). Breast milk continues to provide immune protection, calories, and nutrients even as your child eats more table food. An IBCLC can help you navigate the gradual transition from milk-as-primary-nutrition to milk-as-complement-to-solids.",
        },
      },
      {
        '@type': 'Question',
        name: 'What if my baby is refusing solids or seems uninterested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Solid food refusal in the 6-8 month window is common and rarely a concern if the baby is growing well on breast milk. An IBCLC can evaluate whether the refusal is developmental, sensory-related, or tied to a breastfeeding dynamic. If your child is over 10-11 months and still not taking solids, an evaluation by a feeding therapist (often an SLP or OT) may be appropriate — your IBCLC can help with the referral.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-charcoal-600">Find an IBCLC</Link>
          <span>/</span>
          <span className="text-charcoal-600">Solid Food Introduction</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            Starting Solids While Breastfeeding
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            The transition from exclusive breastfeeding to solid foods is one of the most nuanced periods
            in a baby&apos;s first year. Starting solids too early, too fast, or at the wrong times can
            tank your milk supply — but an IBCLC can help you navigate it confidently. Whether you&apos;re
            doing baby-led weaning, traditional purees, or a combination approach, lactation consultants
            support the full breastfeeding journey through 12 months and beyond.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-charcoal-500">
            <span>Baby-led weaning support</span>
            <span>·</span>
            <span>Supply protection</span>
            <span>·</span>
            <span>Combo feeding guidance</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="prose-guide">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">What an IBCLC Can Help With</h2>
              <p className="text-charcoal-500 leading-relaxed">
                IBCLCs are trained to support breastfeeding through all its stages — including the transition
                to solid foods. A consultation around solid food introduction typically covers:
              </p>
              <ul className="mt-4 space-y-3 text-charcoal-500">
                {[
                  'Timing: Is your baby developmentally ready, or are you starting too early?',
                  'Feeding approach: BLW vs. purees vs. combination — what fits your family',
                  'Nursing schedule: How to protect supply as solids increase',
                  'Signs of solid readiness vs. false cues (reaching for your food ≠ readiness)',
                  'Managing supply dips if they occur after starting solids',
                  'Transitioning from nursing-as-primary to nursing-as-supplement',
                  'Identifying food sensitivities that may affect breastfeeding comfort',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700 mb-3">
                Signs of Developmental Readiness for Solids
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Sits with minimal support', detail: 'Can hold head steady and upright' },
                  { label: 'Shows interest in food', detail: 'Reaches for food, watches adults eat' },
                  { label: 'Lost tongue-thrust reflex', detail: 'Does not automatically push food out' },
                  { label: 'Doubled birth weight', detail: 'Typically around 6 months of age' },
                ].map((sign) => (
                  <div key={sign.label} className="card p-4">
                    <p className="font-semibold text-charcoal-700 text-sm">{sign.label}</p>
                    <p className="text-xs text-charcoal-400 mt-1">{sign.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-6 bg-rose-50 border-rose-100">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">
                Not sure if your baby is ready?
              </h3>
              <p className="text-sm text-charcoal-500 mb-4">
                A 30-minute telehealth consultation with an IBCLC can answer your questions
                and help you build a solid food plan that protects your supply.
              </p>
              <Link href="/listings" className="btn-primary inline-flex items-center gap-2 text-sm">
                Find an IBCLC <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="card p-5">
              <p className="text-sm font-semibold text-charcoal-700 mb-2">Related Specialties</p>
              <ul className="space-y-2">
                <li><Link href="/specialties/weaning" className="text-sm text-sage-600 hover:text-sage-700">Weaning Support →</Link></li>
                <li><Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700">Low Milk Supply →</Link></li>
                <li><Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700">Pumping Support →</Link></li>
                <li><Link href="/resources/what-is-an-ibclc" className="text-sm text-sage-600 hover:text-sage-700">What is an IBCLC? →</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                Find a Lactation Consultant
              </h2>
              <Link href="/listings" className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600">
                Browse all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
                  {listing.telehealth && (
                    <span className="mt-2 inline-block text-xs font-medium text-sage-600 bg-sage-50 rounded-full px-2 py-0.5">
                      Telehealth
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">Common Questions</h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.name}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
