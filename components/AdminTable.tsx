'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Clock, ExternalLink, Loader2 } from 'lucide-react'
import type { Listing } from '@/types'
import { planTierLabel } from '@/lib/utils'

interface AdminTableProps {
  listings: Listing[]
  type: 'pending' | 'active' | 'all'
}

export default function AdminTable({ listings: initial, type }: AdminTableProps) {
  const [listings, setListings] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)

  async function updateStatus(id: string, status: 'active' | 'suspended') {
    setLoading(id)
    try {
      const res = await fetch(`/api/admin/listing/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setListings((prev) =>
          type === 'all'
            ? prev.map((l) => (l.id === id ? { ...l, status } : l))
            : prev.filter((l) => l.id !== id),
        )
      }
    } finally {
      setLoading(null)
    }
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-charcoal-400 text-sm">
        No listings in this category.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ivory-200">
      <table className="w-full text-sm">
        <thead className="bg-ivory-50 border-b border-ivory-200">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-charcoal-600">Name</th>
            <th className="text-left px-4 py-3 font-semibold text-charcoal-600 hidden md:table-cell">Location</th>
            <th className="text-left px-4 py-3 font-semibold text-charcoal-600 hidden sm:table-cell">Tier</th>
            <th className="text-left px-4 py-3 font-semibold text-charcoal-600 hidden lg:table-cell">Claimed</th>
            <th className="text-left px-4 py-3 font-semibold text-charcoal-600 hidden lg:table-cell">Status</th>
            <th className="text-left px-4 py-3 font-semibold text-charcoal-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 bg-white">
          {listings.map((listing) => (
            <tr key={listing.id} className="hover:bg-ivory-50">
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-charcoal-700">{listing.name}</p>
                  <p className="text-xs text-charcoal-400">{listing.credentials.join(', ')}</p>
                </div>
              </td>
              <td className="px-4 py-3 hidden md:table-cell text-charcoal-500">
                {listing.city}, {listing.state}
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <span className={
                  listing.plan_tier === 'verified' ? 'badge-verified' :
                  listing.plan_tier === 'pro' ? 'badge-pro' : 'badge-free'
                }>
                  {planTierLabel(listing.plan_tier)}
                </span>
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                {listing.claimed ? (
                  <span className="text-xs text-green-600 font-medium">Claimed</span>
                ) : (
                  <span className="text-xs text-charcoal-400">Unclaimed</span>
                )}
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <span className={`text-xs font-medium ${
                  listing.status === 'active' ? 'text-green-600' :
                  listing.status === 'pending' ? 'text-amber-600' : 'text-red-500'
                }`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`/ibclc/${listing.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal-400 hover:text-sage-500 transition-colors"
                    title="View listing"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  {listing.status !== 'active' && (
                    <button
                      onClick={() => updateStatus(listing.id, 'active')}
                      disabled={loading === listing.id}
                      className="text-green-600 hover:text-green-700 transition-colors"
                      title="Approve"
                    >
                      {loading === listing.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {listing.status !== 'suspended' && (
                    <button
                      onClick={() => updateStatus(listing.id, 'suspended')}
                      disabled={loading === listing.id}
                      className="text-red-400 hover:text-red-500 transition-colors"
                      title="Suspend"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
