import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/server'

const stripeTest = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Fire-and-forget vault log — never blocks the response
async function appendVaultLog(entry: string): Promise<void> {
  const token = process.env.GITHUB_FULL_TOKEN
  if (!token) return

  const date = new Date().toISOString().split('T')[0]
  const path = `SYSTEM/Logs/stripe-webhook-${date}.md`
  const owner = 'pete0585'
  const repo = 'aidam-ops-vault'
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`

  let existingContent = ''
  let sha: string | undefined

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (res.ok) {
      const data = (await res.json()) as { content: string; sha: string }
      existingContent = Buffer.from(data.content, 'base64').toString('utf-8')
      sha = data.sha
    }
  } catch {
    // File doesn't exist yet — first entry of the day
  }

  const newContent = existingContent + entry

  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `log: stripe test webhook ${date}`,
        content: Buffer.from(newContent).toString('base64'),
        ...(sha ? { sha } : {}),
      }),
    })
  } catch (err) {
    console.error('Vault log write failed:', err)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripeTest.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_TEST_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('Stripe test webhook signature verification failed:', err)
    void appendVaultLog(
      `\n## ${new Date().toISOString()} — SIGNATURE_FAILURE\n` +
        `- Error: ${err instanceof Error ? err.message : String(err)}\n`,
    )
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createServiceClient()
  let logSuccess = true
  let logDetails: Record<string, unknown> = { eventId: event.id }

  switch (event.type) {
    case 'product.created': {
      const product = event.data.object as Stripe.Product

      const { error } = await supabase
        .from('stripe_products')
        .upsert(
          {
            id: product.id,
            name: product.name,
            description: product.description ?? null,
            metadata: product.metadata ?? {},
            created_at: new Date(product.created * 1000).toISOString(),
          },
          { onConflict: 'id' },
        )

      logSuccess = !error
      logDetails = { ...logDetails, productId: product.id, error: error?.message }
      if (error) console.error('stripe_products upsert error:', error)
      break
    }

    case 'price.created': {
      const price = event.data.object as Stripe.Price
      logDetails = {
        ...logDetails,
        priceId: price.id,
        productId: typeof price.product === 'string' ? price.product : price.product?.id,
        amount: price.unit_amount,
        currency: price.currency,
      }
      break
    }

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Idempotency: skip if already recorded
      const { data: existing } = await supabase
        .from('stripe_checkouts')
        .select('session_id')
        .eq('session_id', session.id)
        .maybeSingle()

      if (existing) {
        logDetails = { ...logDetails, sessionId: session.id, skipped: 'already_recorded' }
        break
      }

      const { error } = await supabase.from('stripe_checkouts').insert({
        session_id: session.id,
        product_id: session.metadata?.product_id ?? null,
        customer_email:
          session.customer_details?.email ?? (session.customer_email as string | null) ?? null,
        status: session.status ?? 'complete',
        amount_total: session.amount_total ?? 0,
        created_at: new Date(session.created * 1000).toISOString(),
      })

      logSuccess = !error
      logDetails = { ...logDetails, sessionId: session.id, error: error?.message }
      if (error) console.error('stripe_checkouts insert error:', error)
      break
    }
  }

  void appendVaultLog(
    `\n## ${new Date().toISOString()} — ${event.type} (${event.id})\n` +
      `- Success: ${logSuccess}\n` +
      `- Details: \`${JSON.stringify(logDetails)}\`\n`,
  )

  return NextResponse.json({ received: true })
}
