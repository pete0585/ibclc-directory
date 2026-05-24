import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESEND_AUDIENCE_ID = 'de3bdf48-7106-4705-a3c1-f88ee18e5f98'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const supabase = await createServiceClient()

    const { error } = await supabase.from('email_subscribers').insert({
      email: normalizedEmail,
      directory: 'ibclc',
      source: 'footer-bar',
    })

    if (error) {
      // Unique constraint violation = already subscribed — treat as success
      if (error.code === '23505') {
        return NextResponse.json({ success: true })
      }
      console.error('Subscribe insert error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      // Add to Resend audience
      await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail, unsubscribed: false }),
      }).catch((err) => console.error('Resend audience add error:', err))

      // Send welcome email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'hello@ibclcdirectory.com',
          to: normalizedEmail,
          subject: 'Welcome — your weekly IBCLC tips are coming',
          html: `<p>Hi there,</p>
<p>Thanks for signing up. Every week you'll get practical breastfeeding tips from IBCLCs, plus new listings near you.</p>
<p>No fluff. No spam. Just real support.</p>
<p>— The IBCLCDirectory.com team</p>
<p style="font-size:12px;color:#aaa;margin-top:32px;">You signed up at IBCLCDirectory.com. <a href="https://ibclcdirectory.com">Visit the directory</a>.</p>`,
        }),
      }).catch((err) => console.error('Resend welcome email error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
