'use client'

import { useState } from 'react'

interface Props {
  listingId: string
  providerName: string
  city: string
  state: string
}

export function PatientLeadForm({ listingId, providerName, city, state }: Props) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/patient-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          message,
          listing_id: listingId,
          provider_name: providerName,
          city,
          state,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
        <p className="text-sm font-medium text-green-800">
          Request sent — the provider will be notified.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 rounded-xl border border-ivory-300 bg-ivory-50 p-5">
      <h3 className="font-serif text-base font-semibold text-charcoal-700 mb-3">
        Request contact information
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
        />
        <textarea
          placeholder="What are you looking for help with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-sage-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sage-600 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Sending…' : 'Send request'}
        </button>
      </form>
    </div>
  )
}
