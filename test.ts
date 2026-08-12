/**
 * Stripe test-mode webhook and product API tests
 * Run: npx vitest run test.ts
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Shared mocks — hoisted so vi.mock factory closures capture them correctly
// ---------------------------------------------------------------------------

const mockUpsert = vi.fn()
const mockInsert = vi.fn()
const mockMaybeSingle = vi.fn()
const mockProductsCreate = vi.fn()
const mockPricesCreate = vi.fn()
const mockConstructEvent = vi.fn()

const mockSupabaseFrom = vi.fn((table: string) => {
  if (table === 'stripe_products') {
    return { upsert: mockUpsert }
  }
  if (table === 'stripe_checkouts') {
    return {
      insert: mockInsert,
      select: () => ({ eq: () => ({ maybeSingle: mockMaybeSingle }) }),
    }
  }
  return {}
})

vi.mock('@/lib/supabase/server', () => ({
  createServiceClient: vi.fn().mockResolvedValue({ from: mockSupabaseFrom }),
}))

vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    webhooks: { constructEvent: mockConstructEvent },
    products: { create: mockProductsCreate },
    prices: { create: mockPricesCreate },
  })),
}))

// Silence vault log HTTP calls in tests
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeWebhookRequest(body: string, sig?: string): NextRequest {
  return new NextRequest('http://localhost/api/webhooks/stripe-test', {
    method: 'POST',
    body,
    headers: sig ? { 'stripe-signature': sig } : {},
  })
}

function makeAdminRequest(body: object, auth = `Bearer ${process.env.SUPABASE_SERVICE_KEY}`): NextRequest {
  return new NextRequest('http://localhost/api/stripe/create-test-product', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Authorization: auth },
  })
}

// ---------------------------------------------------------------------------
// Tests: POST /api/webhooks/stripe-test
// ---------------------------------------------------------------------------

describe('POST /api/webhooks/stripe-test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let handler: any

  beforeEach(async () => {
    vi.clearAllMocks()
    mockUpsert.mockResolvedValue({ data: null, error: null })
    mockInsert.mockResolvedValue({ data: null, error: null })
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    process.env.STRIPE_TEST_SECRET_KEY = 'sk_test_xxx'
    process.env.STRIPE_TEST_WEBHOOK_SECRET = 'whsec_test_xxx'
    // Re-import to pick up fresh module state
    handler = await import('./app/api/webhooks/stripe-test/route')
  })

  // --- Signature verification ---

  it('returns 400 when stripe-signature header is missing', async () => {
    const res = await handler.POST(makeWebhookRequest('{}'))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('No signature')
  })

  it('returns 400 when signature verification throws', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('Signature verification failed')
    })
    const res = await handler.POST(makeWebhookRequest('{}', 'bad-sig'))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid signature')
  })

  it('returns 200 with valid signature', async () => {
    mockConstructEvent.mockReturnValue({ type: 'price.created', id: 'evt_ok', data: { object: { id: 'price_x', product: 'prod_x', unit_amount: 1000, currency: 'usd' } } })
    const res = await handler.POST(makeWebhookRequest('{}', 'valid-sig'))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })
  })

  // --- product.created ---

  it('upserts into stripe_products on product.created', async () => {
    const product = {
      id: 'prod_test123',
      name: 'IBCLC Basic Plan',
      description: 'Basic listing plan',
      metadata: { tier: 'pro' },
      created: Math.floor(Date.now() / 1000),
    }
    mockConstructEvent.mockReturnValue({
      type: 'product.created',
      id: 'evt_001',
      data: { object: product },
    })

    const res = await handler.POST(makeWebhookRequest(JSON.stringify(product), 'valid-sig'))
    expect(res.status).toBe(200)

    expect(mockSupabaseFrom).toHaveBeenCalledWith('stripe_products')
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'prod_test123', name: 'IBCLC Basic Plan' }),
      { onConflict: 'id' },
    )
  })

  it('is idempotent on product.created — upsert runs without error on duplicate', async () => {
    mockUpsert.mockResolvedValue({ data: null, error: null }) // Supabase upsert handles dupes
    const product = { id: 'prod_dup', name: 'Dup', description: null, metadata: {}, created: 0 }
    mockConstructEvent.mockReturnValue({ type: 'product.created', id: 'evt_dup', data: { object: product } })

    const req = makeWebhookRequest(JSON.stringify(product), 'valid-sig')
    const [res1, res2] = await Promise.all([handler.POST(req), handler.POST(makeWebhookRequest(JSON.stringify(product), 'valid-sig'))])
    expect(res1.status).toBe(200)
    expect(res2.status).toBe(200)
  })

  // --- price.created ---

  it('handles price.created without DB writes', async () => {
    const price = { id: 'price_001', product: 'prod_test123', unit_amount: 9900, currency: 'usd' }
    mockConstructEvent.mockReturnValue({ type: 'price.created', id: 'evt_002', data: { object: price } })

    const res = await handler.POST(makeWebhookRequest(JSON.stringify(price), 'valid-sig'))
    expect(res.status).toBe(200)
    expect(mockUpsert).not.toHaveBeenCalled()
    expect(mockInsert).not.toHaveBeenCalled()
  })

  // --- checkout.session.completed ---

  it('inserts into stripe_checkouts on checkout.session.completed', async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: null }) // not yet recorded
    const session = {
      id: 'cs_test_001',
      status: 'complete',
      amount_total: 9900,
      currency: 'usd',
      customer_email: 'patient@example.com',
      customer_details: { email: 'patient@example.com' },
      metadata: { product_id: 'prod_test123' },
      created: Math.floor(Date.now() / 1000),
    }
    mockConstructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      id: 'evt_003',
      data: { object: session },
    })

    const res = await handler.POST(makeWebhookRequest(JSON.stringify(session), 'valid-sig'))
    expect(res.status).toBe(200)
    expect(mockSupabaseFrom).toHaveBeenCalledWith('stripe_checkouts')
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        session_id: 'cs_test_001',
        customer_email: 'patient@example.com',
        product_id: 'prod_test123',
        amount_total: 9900,
      }),
    )
  })

  it('skips insert when checkout session already recorded (idempotency)', async () => {
    mockMaybeSingle.mockResolvedValue({ data: { session_id: 'cs_test_001' }, error: null })
    const session = {
      id: 'cs_test_001',
      status: 'complete',
      amount_total: 9900,
      customer_email: 'patient@example.com',
      customer_details: { email: 'patient@example.com' },
      metadata: {},
      created: Math.floor(Date.now() / 1000),
    }
    mockConstructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      id: 'evt_004',
      data: { object: session },
    })

    const res = await handler.POST(makeWebhookRequest(JSON.stringify(session), 'valid-sig'))
    expect(res.status).toBe(200)
    expect(mockInsert).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// Tests: POST /api/stripe/create-test-product
// ---------------------------------------------------------------------------

describe('POST /api/stripe/create-test-product', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let createHandler: any

  beforeEach(async () => {
    vi.clearAllMocks()
    process.env.STRIPE_TEST_SECRET_KEY = 'sk_test_xxx'
    process.env.SUPABASE_SERVICE_KEY = 'test-service-key'
    createHandler = await import('./app/api/stripe/create-test-product/route')
  })

  it('returns 401 when Authorization header is missing', async () => {
    const req = new NextRequest('http://localhost/api/stripe/create-test-product', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', price_cents: 9900 }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await createHandler.POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 when Authorization token does not match service key', async () => {
    const req = makeAdminRequest({ name: 'Test', price_cents: 9900 }, 'Bearer wrong-key')
    const res = await createHandler.POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 400 when name is missing', async () => {
    const res = await createHandler.POST(makeAdminRequest({ price_cents: 9900 }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('name is required')
  })

  it('returns 400 when price_cents is not a positive integer', async () => {
    const res = await createHandler.POST(makeAdminRequest({ name: 'Test Plan', price_cents: -100 }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/price_cents/)
  })

  it('creates product and price and returns IDs', async () => {
    mockProductsCreate.mockResolvedValue({ id: 'prod_test456', name: 'Featured Plan' })
    mockPricesCreate.mockResolvedValue({ id: 'price_test456', product: 'prod_test456', unit_amount: 29900 })

    const res = await createHandler.POST(
      makeAdminRequest({ name: 'Featured Plan', description: 'Top placement', price_cents: 29900 }),
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.product_id).toBe('prod_test456')
    expect(json.price_id).toBe('price_test456')

    expect(mockProductsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Featured Plan', description: 'Top placement' }),
    )
    expect(mockPricesCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        product: 'prod_test456',
        unit_amount: 29900,
        currency: 'usd',
        recurring: { interval: 'month' },
      }),
    )
  })

  it('respects custom currency and interval', async () => {
    mockProductsCreate.mockResolvedValue({ id: 'prod_yr', name: 'Annual Plan' })
    mockPricesCreate.mockResolvedValue({ id: 'price_yr', product: 'prod_yr', unit_amount: 99900 })

    await createHandler.POST(
      makeAdminRequest({ name: 'Annual Plan', price_cents: 99900, currency: 'usd', interval: 'year' }),
    )

    expect(mockPricesCreate).toHaveBeenCalledWith(
      expect.objectContaining({ recurring: { interval: 'year' } }),
    )
  })
})
