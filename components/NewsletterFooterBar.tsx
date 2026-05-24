'use client'

import { useState, useEffect } from 'react'

const DISMISSED_KEY = 'ibclc_footer_dismissed'

export default function NewsletterFooterBar() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISSED_KEY) === 'true'
    if (!isDismissed) {
      setDismissed(false)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, 'true')
    setDismissed(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 shadow-lg border-t border-[#c8b89a]"
      style={{ backgroundColor: '#f5f0e8' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-3 text-[#7a6a55] hover:text-[#4a3a28] text-xl leading-none transition-colors"
        >
          ×
        </button>

        {/* Copy */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold text-[#4a3a28] leading-snug">
            Get weekly breastfeeding tips + find IBCLCs near you
          </p>
          <p className="text-xs text-[#7a6a55] mt-0.5">No spam. Unsubscribe anytime.</p>
        </div>

        {/* Form or success */}
        {status === 'success' ? (
          <p className="text-sm font-medium text-[#5a8a5a] whitespace-nowrap">
            You&apos;re in! Check your inbox for breastfeeding tips.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 sm:w-56 px-3 py-2 text-sm rounded-md border border-[#c8b89a] bg-white text-[#4a3a28] placeholder-[#a89880] focus:outline-none focus:ring-2 focus:ring-[#8aaa8a]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 text-sm font-semibold rounded-md bg-[#6b9e6b] text-white hover:bg-[#5a8a5a] disabled:opacity-60 transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? '…' : 'Get Tips'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-red-600 mt-1 sm:mt-0">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  )
}
