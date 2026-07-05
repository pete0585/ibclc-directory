import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const PLAN_PRICE_IDS = {
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
  },
  verified: {
    monthly: process.env.STRIPE_VERIFIED_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_VERIFIED_ANNUAL_PRICE_ID!,
  },
}

export async function createCheckoutSession({
  listingId,
  planTier,
  billing,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  listingId: string
  planTier: 'pro' | 'verified'
  billing: 'monthly' | 'annual'
  customerEmail?: string
  successUrl: string
  cancelUrl: string
}) {
  const priceId = PLAN_PRICE_IDS[planTier][billing]

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      listing_id: listingId,
      plan_tier: planTier,
    },
    subscription_data: {
      metadata: {
        listing_id: listingId,
        plan_tier: planTier,
      },
    },
  })

  return session
}
