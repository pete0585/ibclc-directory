'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

interface SearchBarProps {
  defaultLocation?: string
  defaultQuery?: string
  size?: 'default' | 'large'
  className?: string
}

export default function SearchBar({
  defaultLocation = '',
  defaultQuery = '',
  size = 'default',
  className = '',
}: SearchBarProps) {
  const [location, setLocation] = useState(defaultLocation)
  const [query, setQuery] = useState(defaultQuery)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set('location', location.trim())
    if (query.trim()) params.set('q', query.trim())
    router.push(`/listings?${params.toString()}`)
  }

  const isLarge = size === 'large'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-2 ${isLarge ? 'w-full max-w-2xl' : 'w-full max-w-xl'} ${className}`}
    >
      <div className={`relative flex-1 ${isLarge ? 'sm:flex-[2]' : ''}`}>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-300" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tongue tie, pumping, NICU…"
          className={`w-full rounded-xl border border-ivory-300 bg-white pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage-100 ${isLarge ? 'py-4' : 'py-3'}`}
        />
      </div>

      <div className="relative flex-1">
        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-300" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or state…"
          className={`w-full rounded-xl border border-ivory-300 bg-white pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage-100 ${isLarge ? 'py-4' : 'py-3'}`}
        />
      </div>

      <button
        type="submit"
        className={`btn-primary shrink-0 ${isLarge ? 'px-8 py-4 text-base' : 'px-6 py-3'}`}
      >
        Find Support
      </button>
    </form>
  )
}
