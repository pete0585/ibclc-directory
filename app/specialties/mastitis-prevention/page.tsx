import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lactationconsultantdirectory.com/specialties/mastitis-prevention' },
  title: 'IBCLCs Who Help with Mastitis Prevention | LactationConsultantDirectory.com',
  description:
    'Find an IBCLC who specializes in mastitis prevention, plugged ducts, and breast infections. Early intervention with a lactation consultant is the most effective way to prevent mastitis from recurring.',
  openGraph: {
    title: 'Find an IBCLC for Mastitis Prevention and Treatment',
    description:
      'Mastitis is painful and can end breastfeeding journeys — but most cases are preventable with the right guidance. Find an IBCLC who specializes in mastitis support.',
  },
}

const faqData = [
  {
    q: "What causes mastitis?",
    a: "Mastitis is inflammation of the breast tissue, usually caused by milk stasis (milk that isn't draining fully) combined with bacterial infection. The most common triggers are infrequent or incomplete milk removal, a tight latch that doesn't drain certain ducts well, returning to work (feeding schedule changes), oversupply, and pressure on the breast from a tight bra or sleeping position. An IBCLC can help identify your specific trigger.",
  },
  {
    q: "How can an IBCLC help prevent mastitis?",
    a: "An IBCLC addresses the root causes that make mastitis more likely: inefficient latch, incomplete breast drainage, oversupply management, positioning for thorough drainage, and the logistics of pumping schedules during work transitions. Research shows that breastfeeding support from an IBCLC significantly reduces the incidence of mastitis — because most mastitis starts with a drainage problem that can be corrected.",
  },
  {
    q: "Should I see an IBCLC at the first sign of a plugged duct?",
    a: "Yes. A plugged duct is your warning signal — and the window before it progresses to mastitis is usually 24 to 48 hours. An IBCLC can assess whether the plugging is structural (latch, positioning) or supply-related, help you clear it with targeted positioning and drainage techniques, and set you up to prevent recurrence. Don't wait.",
  },
  {
    q: "Can an IBCLC help after mastitis is treated with antibiotics?",
    a: "Absolutely. Antibiotics treat the infection, but they don't address the milk stasis pattern that caused it. Without addressing the root cause, mastitis frequently recurs. An IBCLC visit after a mastitis episode is one of the most high-value things you can do to protect the rest of your breastfeeding journey.",
  },
  {
    q: "What is the difference between mastitis and a plugged duct?",
    a: "A plugged duct is a localized blockage where milk builds up in one duct — you'll feel a hard, tender lump. It doesn't always involve infection. Mastitis is when inflammation (and often bacterial infection) sets in, causing flu-like symptoms — fever, body aches, and a hot, red wedge-shaped area on the breast. Plugged ducts can progress to mastitis within hours if not addressed. Both warrant prompt action.",
  },
]

async function getMastitisListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ibclc_listings')
    .select('id, name, city, state, phone, website, telehealth, plan_tier, specialties, slug')
    .eq('status', 'active')
    .contains('specialties', ['Mastitis / Plugged Ducts'])
    .order('plan_tier', { ascending: false })
    .limit(12)

  // Fallback to active listings if specialty filter returns nothing
  if (!data || data.length === 0) {
    const { data: fallback } = await supabase
      .from('ibclc_listings')
      .select('id, name, city, state, phone, website, telehealth, plan_tier, slug')
      .eq('status', 'active')
      .order('plan_tier', { ascending: false })
      .limit(12)
    return fallback ?? []
  }
  return data
}

export default async function MastitisPreventionPage() {
  const listings = await getMastitisListings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
          <Link href="/" className="hover:text-charcoal-700">Home</Link>
          <span>/</span>
          <Link href="/specialties" className="hover:text-charcoal-700">Specialties</Link>
          <span>/</span>
          <span className="text-charcoal-600">Mastitis Prevention</span>
        </nav>

        <div className="bg-gradient-ivory rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-charcoal-800 sm:text-4xl">
            IBCLCs Who Help with Mastitis Prevention
          </h1>
          <p className="mt-3 text-charcoal-500 max-w-2xl leading-relaxed">
            Mastitis is one of the most common reasons breastfeeding journeys end earlier than planned.
            The good news: most cases are preventable with the right guidance. An IBCLC can identify
            the drainage patterns that put you at risk and help you fix them before the next episode.
          </p>
        </div>

        <div className="mb-12 prose max-w-none">
          <div className="grid gap-6 md:grid-cols-2 text-charcoal-600">
            <div className="card p-6">
              <h2 className="font-serif text-xl font-semibold text-charcoal-700 mb-3">Why Mastitis Recurs</h2>
              <p className="text-sm leading-relaxed">
                Many parents experience mastitis, get antibiotics, recover — then get it again within a few weeks.
                That cycle happens because the antibiotics cleared the infection but didn&apos;t address the drainage
                issue that allowed bacteria to take hold in the first place. An IBCLC looks at your latch, your
                feeding frequency, your anatomy, your pump flange fit, and your schedule to find the specific
                factor making recurrence likely.
              </p>
            </div>
            <div className="card p-6">
              <h2 className="font-serif text-xl font-semibold text-charcoal-700 mb-3">When to See an IBCLC</h2>
              <p className="text-sm leading-relaxed">
                Don&apos;t wait for mastitis to happen. The best time to see an IBCLC for mastitis prevention is
                at the first sign of a plugged duct — that hard, tender spot that hasn&apos;t cleared with a day
                of extra feeding. It&apos;s also worth seeing an IBCLC if you&apos;ve had mastitis once already,
                if you&apos;re heading back to work and changing your feeding schedule, or if you have oversupply
                (which significantly increases mastitis risk).
              </p>
            </div>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
                IBCLCs Who Specialize in Mastitis
              </h2>
              <Link
                href="/listings"
                className="flex items-center gap-1 text-sm font-semibold text-sage-500 hover:text-sage-600"
              >
                Browse all IBCLCs <ArrowRight className="h-4 w-4" />
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
          </div>
        )}

        <div className="mt-8 space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-700">
            Mastitis: Common Questions
          </h2>
          {faqData.map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-2">{faq.q}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-300">
          <h3 className="font-serif text-lg font-semibold text-charcoal-700 mb-4">Find an IBCLC Near You</h3>
          <p className="text-sm text-charcoal-500 mb-4">
            Search by city or state to find a board-certified lactation consultant who can help with
            mastitis prevention, plugged ducts, and ongoing breastfeeding support.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2 text-sm">
              Find an IBCLC <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/specialties/low-milk-supply" className="text-sm text-sage-600 hover:text-sage-700 font-medium self-center">IBCLCs for Low Milk Supply →</Link>
            <Link href="/specialties/pumping" className="text-sm text-sage-600 hover:text-sage-700 font-medium self-center">IBCLCs for Pumping Support →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
