import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

function parseFromHeader(raw: string): { email: string; name: string | null } {
  const match = raw.match(/<([^>]+)>/)
  if (match) {
    const email = match[1].toLowerCase().trim()
    const name = raw.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || null
    return { email, name }
  }
  return { email: raw.toLowerCase().trim(), name: null }
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Resend delivers inbound webhooks via Svix:
  // { type: "email.received", data: { email_id, from, to, subject, message_id, ... } }
  // IMPORTANT: webhook payload does NOT include body text/html — must be fetched separately
  // via resend.emails.receiving.get(email_id) per Resend API docs.
  if (payload.type !== 'email.received' || !payload.data || typeof payload.data !== 'object') {
    return NextResponse.json({ received: true, skipped: 'not email.received' })
  }

  const eventData = payload.data as Record<string, unknown>
  const resendEmailId = eventData.email_id as string | undefined

  if (!resendEmailId) {
    console.error('[inbound-email] Missing email_id in webhook payload', JSON.stringify(eventData))
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  const fromRaw = String(eventData.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ error: 'Missing from address' }, { status: 400 })
  }

  const { email: fromEmail, name: fromName } = parseFromHeader(fromRaw)
  const subject = String(eventData.subject ?? '')
  const toAddress = Array.isArray(eventData.to)
    ? (eventData.to as string[]).join(', ')
    : String(eventData.to ?? '')
  const messageId = String(eventData.message_id ?? '') || null

  // Fetch full email body from Resend API.
  // The webhook is a notification-only event — body text/html requires a separate retrieve call.
  let bodyText = ''
  let bodyHtml = ''
  let fetchError: string | null = null

  try {
    const { data: email, error } = await resend.emails.receiving.get(resendEmailId)
    if (error) {
      fetchError = `Resend retrieve error: ${error.message}`
      console.error('[inbound-email] Failed to retrieve email body:', fetchError, 'email_id:', resendEmailId)
    } else if (email) {
      bodyText = (email as Record<string, unknown>).text as string ?? ''
      bodyHtml = (email as Record<string, unknown>).html as string ?? ''
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err)
    console.error('[inbound-email] Exception retrieving email body:', fetchError, 'email_id:', resendEmailId)
  }

  const supabase = await createServiceClient()

  // Match sender to a listing by email for context
  const { data: listing } = await supabase
    .from('ibclc_listings')
    .select('id, slug')
    .eq('email', fromEmail)
    .maybeSingle()

  // Always insert even if body fetch failed — email_id is stored so body can be retried
  await supabase.from('inbound_emails').insert({
    directory: 'ibclc',
    email_id: resendEmailId,
    from_email: fromEmail,
    from_name: fromName,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    message_id: messageId,
    to_address: toAddress,
    listing_id: listing?.id ?? null,
    listing_slug: listing?.slug ?? null,
    processed: false,
  })

  if (fetchError) {
    console.warn('[inbound-email] Row inserted with empty body (fetch failed). email_id:', resendEmailId)
  }

  return NextResponse.json({ received: true })
}
