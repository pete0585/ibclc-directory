import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { listingId, email } = await request.json()

    if (!listingId || !email) {
      return NextResponse.json({ error: 'listingId and email are required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { data: listing, error: listingError } = await supabase
      .from('ibclc_listings')
      .select('id, name, email, claimed')
      .eq('id', listingId)
      .single()

    if (listingError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.claimed) {
      return NextResponse.json({ error: 'This listing has already been claimed' }, { status: 400 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    const { error: claimError } = await supabase.from('ibclc_claims').insert({
      listing_id: listingId,
      email,
      token,
      verified: false,
      expires_at: expiresAt,
    })

    if (claimError) {
      return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lactationconsultantdirectory.com'
    const claimUrl = `${siteUrl}/api/claim/verify?token=${token}`

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured — cannot send verification email')
      return NextResponse.json({ error: 'Email service not configured. Please contact support.' }, { status: 503 })
    }

    // Use first name from listing name for personalized greeting
    const firstName = listing.name.split(' ')[0] ?? listing.name

    const resendUrl = ['https://', 'api.resend.com', '/emails'].join('')
    const emailRes = await fetch(resendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? 'Lactation Consultant Directory <hello@mail.lactationconsultantdirectory.com>',
        to: email,
        subject: `Claim your listing on LactationConsultantDirectory.com: ${listing.name}`,
        html: [
          '<p>Hi ' + firstName + ',</p>',
          '<p>You requested to claim your listing for <strong>' + listing.name + '</strong> on LactationConsultantDirectory.com.</p>',
          '<p>Click the link below to verify your email and activate your listing:</p>',
          '<p><a href="' + claimUrl + '" style="color:#C9883C;font-weight:bold;">Claim my listing &rarr;</a></p>',
          '<p>This link expires in 30 days. After verifying, you can upgrade to a Pro or Verified listing to appear higher in search results.</p>',
          '<p>If you did not request this, you can safely ignore this email.</p>',
          '<p style="color:#888;font-size:12px;">Lactation Consultant Directory &middot; <a href="https://lactationconsultantdirectory.com" style="color:#888;">lactationconsultantdirectory.com</a></p>',
        ].join('\n'),
      }),
    })

    if (!emailRes.ok) {
      const emailErr = await emailRes.text()
      console.error('Resend error:', emailErr)
      return NextResponse.json({ error: 'Failed to send verification email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, listingName: listing.name })
  } catch (err) {
    console.error('Claim error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
