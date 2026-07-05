'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2, ShieldCheck, Star } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

type Step = 'email' | 'verifying' | 'verified' | 'upgrade' | 'error'
type Billing = 'monthly' | 'annual'

export default function ClaimPage() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listingName, setListingName] = useState<string>('')
  const [monthlyViews, setMonthlyViews] = useState(0)
  const [billing, setBilling] = useState<Billing>('monthly')

  useEffect(() => {
    if (searchParams.get('verified') === 'true' || searchParams.get('upgrade') === 'true') {
      setStep('upgrade')
    }
  }, [searchParams])

  useEffect(() => {
    if (step === 'upgrade' && params.id) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
      supabase
        .from('listing_views')
        .select('*', { count: 'exact', head: true })
        .eq('directory_slug', 'ibclc')
        .eq('listing_id', params.id)
        .gte('viewed_at', monthStart)
        .then(({ count }) => setMonthlyViews(count ?? 0))
    }
  }, [step, params.id])

  async function sendClaimEmail(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: params.id, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send claim email')
      setListingName(data.listingName ?? 'your listing')
      setStep('verifying')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

  async function upgradeToProOrVerified(tier: 'pro' | 'verified') {
    setLoading(true)
    try {
      const res = await fetch('/api/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: params.id, tier, billing, ...(searchParams.get('founding') === 'true' ? { couponId: 'R6vSpeEL' } : {}) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to create checkout session')
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'verifying') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mx-auto mb-5">
          <CheckCircle className="h-8 w-8 text-sage-500" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-charcoal-800 mb-3">
          Check your email
        </h1>
        <p className="text-charcoal-500">
          We sent a verification link to <strong>{email}</strong>. Click it to confirm you own{' '}
          <strong>{listingName}</strong>. The link expires in 72 hours.
        </p>
        <p className="mt-4 text-sm text-charcoal-400">
          Didn't get it? Check your spam folder, or{' '}
          <button
            onClick={() => setStep('email')}
            className="text-sage-500 hover:text-sage-600 font-medium"
          >
            try a different email
          </button>
          .
        </p>
      </div>
    )
  }

  if (step === 'upgrade') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-sage-500" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal-800 mb-2">
            Listing claimed!
          </h1>
        </div>

        <div className='text-center mb-6'>
          <div className='text-5xl font-bold text-gray-900'>{monthlyViews}</div>
          <div className='text-gray-500 mt-1'>people viewed your profile this month</div>
          <div className='mt-3 text-red-600 font-semibold'>
            0 could contact you — your phone and website are hidden
          </div>
        </div>

        <div className='space-y-3 mb-8 text-left'>
          {[
            ['Your phone number visible to searchers', 'They can call you directly from your listing'],
            ['Your website linked', 'Drive traffic to your practice site'],
            ['Your full bio displayed', 'Build trust before they reach out'],
            ['Verified badge', 'Stand out from unclaimed profiles'],
          ].map(([title, sub]) => (
            <div key={title} className='flex items-start gap-3'>
              <span className='text-green-500 text-lg leading-tight'>✓</span>
              <div>
                <div className='font-medium text-gray-900'>{title}</div>
                <div className='text-sm text-gray-500'>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full border border-charcoal-200 bg-ivory-50 p-1 text-sm">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
                billing === 'monthly'
                  ? 'bg-charcoal-800 text-white'
                  : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
                billing === 'annual'
                  ? 'bg-charcoal-800 text-white'
                  : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              Annual <span className="text-xs font-normal opacity-75">save 17%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="card p-6 border border-sage-200">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-sage-500" />
              <span className="font-semibold text-charcoal-700">Pro Listing</span>
            </div>
            {billing === 'monthly' ? (
              <p className="font-serif text-3xl font-bold text-charcoal-800 mb-1">$29<span className="text-base font-normal text-charcoal-400">/month</span></p>
            ) : (
              <p className="font-serif text-3xl font-bold text-charcoal-800 mb-1">$290<span className="text-base font-normal text-charcoal-400">/year</span></p>
            )}
            <p className="text-sm text-charcoal-500 mb-4">Phone, website, and email visible. Photo, bio, priority placement.</p>
            <button
              onClick={() => upgradeToProOrVerified('pro')}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Upgrade to Pro'}
            </button>
          </div>

          <div className="card p-6 border-2 border-rose-200 bg-rose-50/50">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-rose-400" />
              <span className="font-semibold text-charcoal-700">Verified</span>
            </div>
            {billing === 'monthly' ? (
              <p className="font-serif text-3xl font-bold text-charcoal-800 mb-1">$49<span className="text-base font-normal text-charcoal-400">/month</span></p>
            ) : (
              <p className="font-serif text-3xl font-bold text-charcoal-800 mb-1">$490<span className="text-base font-normal text-charcoal-400">/year</span></p>
            )}
            <p className="text-sm text-charcoal-500 mb-4">Everything in Pro + credential verification, top placement.</p>
            <button
              onClick={() => upgradeToProOrVerified('verified')}
              disabled={loading}
              className="btn-rose w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Get Verified'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-charcoal-400 hover:text-charcoal-600">
            Skip for now — keep my free listing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="font-serif text-3xl font-bold text-charcoal-800 mb-3">
        Claim Your Listing
      </h1>
      <p className="text-charcoal-500 mb-8">
        Enter the email address for your practice. We'll send a verification link to confirm
        you own this listing.
      </p>

      <form onSubmit={sendClaimEmail} className="space-y-4">
        <div>
          <label className="label">Practice Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            placeholder="you@yourpractice.com"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            'Send Claim Link'
          )}
        </button>
      </form>
    </div>
  )
}
