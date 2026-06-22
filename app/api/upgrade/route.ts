import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  let listingId: string | undefined
  let tier: string | undefined
  let billing: string = 'monthly'
  let couponId: string | undefined

  try {
    const body = await request.json()
    listingId = body?.listingId
    tier = body?.tier
    billing = body?.billing ?? 'monthly'
    couponId = body?.couponId
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!listingId || !['pro', 'verified'].includes(tier ?? '')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const supabase = await createServiceClient()

    const { data: listing, error } = await supabase
      .from('ibclc_listings')
      .select('id, name, email, claimed')
      .eq('id', listingId)
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lactationconsultantdirectory.com'

    const session = await createCheckoutSession({
      listingId,
      planTier: tier as 'pro' | 'verified',
      billing: billing === 'annual' ? 'annual' : 'monthly',
      customerEmail: listing.email ?? undefined,
      successUrl: `${siteUrl}/claim/${listingId}?upgraded=true&tier=${tier}`,
      cancelUrl: `${siteUrl}/claim/${listingId}`,
      couponId: typeof couponId === 'string' && couponId.length > 0 ? couponId : undefined,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Upgrade error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
