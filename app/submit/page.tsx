import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Star, ShieldCheck } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your IBCLC Practice',
  description:
    'Add your practice to IBCLCDirectory.com. Free listing available. Pro ($149/year) and Verified ($299/year) listings get full profiles, contact forms, and priority placement.',
}

const PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get discovered. No credit card required.',
    features: [
      'Name, credentials, city, state listed',
      'Shown in search results',
      'Claim link displayed',
      'Auto-created from public data',
    ],
    cta: 'Submit Free Listing',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$149',
    period: 'per year',
    description: 'Full profile that converts searchers to clients.',
    features: [
      'Everything in Free',
      'Profile photo',
      'Full bio (up to 500 words)',
      'Specialties listed',
      'Insurance accepted',
      'Visit types (home/office/telehealth)',
      'Contact form (email relay)',
      'Higher search placement',
      '"Pro" badge on listing',
    ],
    cta: 'Get Pro Listing',
    highlighted: true,
  },
  {
    name: 'Verified IBCLC',
    price: '$299',
    period: 'per year',
    description: 'Maximum trust. Maximum visibility.',
    features: [
      'Everything in Pro',
      'IBCLC credential verified against IBLCE registry',
      '"Verified IBCLC" badge — highest trust signal',
      'Priority placement in city and state pages',
      'Featured in specialty category pages',
    ],
    cta: 'Get Verified',
    highlighted: false,
  },
]

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-charcoal-800">
          List Your Practice on IBCLCDirectory.com
        </h1>
        <p className="mt-4 text-lg text-charcoal-500 max-w-2xl mx-auto">
          The only nationwide directory built for private-practice IBCLCs. Free to list.
          One new client from a Pro listing pays for the year — twice.
        </p>
      </div>

      {/* Pricing */}
      <div id="pricing" className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-16">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl p-6 ${
              tier.highlighted
                ? 'border-2 border-sage-300 bg-sage-50 relative'
                : 'border border-ivory-300 bg-white'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-sage-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                {tier.name === 'Pro' && <Star className="h-4 w-4 text-sage-500" />}
                {tier.name === 'Verified IBCLC' && <ShieldCheck className="h-4 w-4 text-rose-400" />}
                <span className="font-semibold text-charcoal-700">{tier.name}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-charcoal-800">{tier.price}</span>
                <span className="text-sm text-charcoal-400">/{tier.period}</span>
              </div>
              <p className="mt-1 text-xs text-charcoal-500">{tier.description}</p>
            </div>

            <ul className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <CheckCircle className="h-4 w-4 text-sage-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#submit-form"
              className={`block w-full text-center rounded-full py-2.5 text-sm font-semibold transition-colors ${
                tier.highlighted
                  ? 'bg-sage text-white hover:bg-sage-400'
                  : 'border border-charcoal-200 text-charcoal-600 hover:border-sage hover:text-sage-600'
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* ROI callout */}
      <div className="rounded-2xl bg-ivory-100 border border-ivory-300 p-6 mb-12 text-center">
        <p className="text-sm text-charcoal-600">
          <span className="font-semibold text-charcoal-800">The math is simple:</span>{' '}
          IBCLCs charge $150–$250 per initial visit. One new client from a Pro listing pays for the
          year twice over. No other directory offers this combination of reach and affordability.
        </p>
      </div>

      {/* Form */}
      <div id="submit-form">
        <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-2">
          Submit Your Listing
        </h2>
        <p className="text-sm text-charcoal-500 mb-8">
          Start with a free listing. After submission you'll receive a claim link to upgrade to Pro
          or Verified and complete your profile.
        </p>
        <SubmitForm />
      </div>
    </div>
  )
}
