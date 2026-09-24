'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2 } from 'lucide-react'

type Step = 'email' | 'verifying' | 'verified' | 'error'
export default function ClaimPage() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listingName, setListingName] = useState<string>('')
  const [phone, setPhone] = useState('')
  const [phoneSaved, setPhoneSaved] = useState(false)

  useEffect(() => {
    if (searchParams.get('verified') === 'true' || searchParams.get('upgrade') === 'true') {
      setStep('verified')
    }
  }, [searchParams])


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
          <strong>{listingName}</strong>. The link expires in 30 days.
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

  if (step === 'verified') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-sage-500" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal-800 mb-2">
            Listing claimed!
          </h1>
          <p className="text-charcoal-500">
            Your profile is now active. Your phone, website, and email are visible to everyone who finds you.
          </p>
        </div>

        <div className="card p-6 mb-6">
          {phoneSaved ? (
            <div className="text-center py-2">
              <CheckCircle className="h-8 w-8 text-sage-500 mx-auto mb-2" />
              <p className="text-charcoal-700 font-medium">Phone number saved!</p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-lg font-semibold text-charcoal-700 mb-3">
                Add your phone number
              </h2>
              <p className="text-sm text-charcoal-500 mb-4">
                Help patients reach you directly from your listing.
              </p>
              <form onSubmit={savePhone} className="space-y-3">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                  placeholder="(555) 555-5555"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !phone}
                  className="btn-primary w-full"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Phone Number'}
                </button>
              </form>
              <button
                onClick={() => setPhoneSaved(true)}
                className="mt-2 w-full text-sm text-charcoal-400 hover:text-charcoal-600"
              >
                Skip for now
              </button>
            </>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <a href="/" className="text-sm text-charcoal-400 hover:text-charcoal-600">
            Return to directory
          </a>
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
