import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, message, listing_id, provider_name, city, state } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 })
    }

    if (!listing_id) {
      return NextResponse.json({ error: 'listing_id is required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { error } = await supabase.from('patient_leads').insert({
      email,
      message: message || null,
      listing_id: String(listing_id),
      directory_slug: 'ibclc',
      provider_name: provider_name || null,
      city: city || null,
      state: state || null,
    })

    if (error) {
      console.error('patient_leads insert error:', error)
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('patient-lead error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
