import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeTest = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

interface CreateProductBody {
  name: string
  description?: string
  price_cents: number
  currency?: string
  interval?: 'month' | 'year'
}

export async function POST(request: NextRequest) {
  // Admin gate: require service key as Bearer token
  const authHeader = request.headers.get('authorization')
  const serviceKey = process.env.SUPABASE_SERVICE_KEY

  if (!authHeader || !serviceKey || authHeader !== `Bearer ${serviceKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: CreateProductBody

  try {
    body = (await request.json()) as CreateProductBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, description, price_cents, currency = 'usd', interval = 'month' } = body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  if (!price_cents || typeof price_cents !== 'number' || !Number.isInteger(price_cents) || price_cents < 1) {
    return NextResponse.json(
      { error: 'price_cents must be a positive integer' },
      { status: 400 },
    )
  }

  const product = await stripeTest.products.create({
    name: name.trim(),
    ...(description ? { description } : {}),
  })

  const price = await stripeTest.prices.create({
    product: product.id,
    unit_amount: price_cents,
    currency,
    recurring: { interval },
  })

  return NextResponse.json({
    product_id: product.id,
    price_id: price.id,
    product,
    price,
  })
}
