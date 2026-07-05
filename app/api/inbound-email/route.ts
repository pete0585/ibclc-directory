import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Domain(s) this handler owns. Resend webhooks are global — all inbound domains fire every
// configured webhook endpoint. Only process emails addressed to our domains to prevent
// duplicate rows when the menopause-directory webhook also fires for the same email.
const OWNED_DOMAINS = ['lactationconsultantdirectory.com', 'ibclcdirectory.com']

function parseFromHeader(raw: string): { email: string; name: string | null } {
  const match = raw.match(/<([^>]+)>/)
  if (match) {
    const email = match[1].toLowerCase().trim()
    const name = raw.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || null
    return { email, name }
  }
  return { email: raw.toLowerCase().trim(), name: null }
}

// Fetch email body from Resend with exponential backoff.
// Resend webhooks are notification-only — body is not included. The API may not have
// indexed the body yet when the webhook fires (race condition). Retry up to 3 times.
async function fetchEmailBodyWithRetry(
  emailId: string,
  maxAttempts = 3,
  baseDelayMs = 2000,
): Promise<{ text: string; html: string; error: string | null }> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const { data: email, error } = await resend.emails.receiving.get(emailId)
      if (error) {
        if (attempt < maxAttempts) {
          await new Promise(r => setTimeout(r, baseDelayMs * attempt))
          continue
        }
        return { text: '', html: '', error: error.message }
      }
      if (email) {
        const e = email as Record<string, unknown>
        const text = typeof e.text === 'string' ? e.text : ''
        const html = typeof e.html === 'string' ? e.html : ''
        if (text || html) return { text, html, error: null }
      }
      // Got response but body empty — may not be indexed yet
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, baseDelayMs * attempt))
        continue
      }
      return { text: '', html: '', error: 'Body empty after all retries' }
    } catch (err) {
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, baseDelayMs * attempt))
        continue
      }
      return { text: '', html: '', error: err instanceof Error ? err.message : String(err) }
    }
  }
  return { text: '', html: '', error: 'Max retries reached' }
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (payload.type !== 'email.received' || !payload.data || typeof payload.data !== 'object') {
    return NextResponse.json({ received: true, skipped: 'not email.received' })
  }

  const eventData = payload.data as Record<string, unknown>
  const resendEmailId = eventData.email_id as string | undefined

  if (!resendEmailId) {
    console.error('[inbound-email] Missing email_id in webhook payload', JSON.stringify(eventData))
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  const toAddress = Array.isArray(eventData.to)
    ? (eventData.to as string[]).join(', ')
    : String(eventData.to ?? '')

  // Domain filter — only process emails addressed to our domains
  const toAddressLower = toAddress.toLowerCase()
  const isOurEmail = OWNED_DOMAINS.some(d => toAddressLower.includes(d))
  if (!isOurEmail) {
    return NextResponse.json({ received: true, skipped: 'not-our-domain' })
  }

  const fromRaw = String(eventData.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ error: 'Missing from address' }, { status: 400 })
  }

  const { email: fromEmail, name: fromName } = parseFromHeader(fromRaw)
  const subject = String(eventData.subject ?? '')
  const messageId = String(eventData.message_id ?? '') || null

  // Fetch full email body — webhook payload never includes body text.
  // email_id is stored regardless so inbox-watcher can backfill if body is still empty.
  const { text: bodyText, html: bodyHtml, error: fetchError } = await fetchEmailBodyWithRetry(resendEmailId)

  if (fetchError) {
    console.warn('[inbound-email] Body fetch failed after retries:', fetchError, 'email_id:', resendEmailId)
  }

  const supabase = await createServiceClient()

  const { data: listing } = await supabase
    .from('ibclc_listings')
    .select('id, slug')
    .eq('email', fromEmail)
    .maybeSingle()

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

  return NextResponse.json({ received: true })
}
