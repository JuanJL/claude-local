'use client'

import { useState, useEffect, useCallback } from 'react'

interface Rsvp {
  id: string
  name: string
  attending: 'yes' | 'no' | 'maybe'
  dietary: string | null
  message: string | null
  created_at: string
}

const STATUS_CONFIG = {
  yes: { label: "I'm in!", emoji: '🎉', bg: 'bg-emerald-100 text-emerald-800' },
  maybe: { label: 'Maybe', emoji: '🤔', bg: 'bg-amber-100 text-amber-800' },
  no: { label: "Can't make it", emoji: '😢', bg: 'bg-red-100 text-red-800' },
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRsvps = useCallback(async () => {
    try {
      const res = await fetch('/api/rsvp')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setRsvps(data)
      setError(null)
    } catch {
      setError('Could not load RSVPs. Check Supabase config.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRsvps()
    // Auto-refresh every 30s
    const interval = setInterval(fetchRsvps, 30000)
    return () => clearInterval(interval)
  }, [fetchRsvps])

  const counts = {
    yes: rsvps.filter(r => r.attending === 'yes').length,
    maybe: rsvps.filter(r => r.attending === 'maybe').length,
    no: rsvps.filter(r => r.attending === 'no').length,
  }

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            Guest List
          </h1>
          <p className="text-warm-gray mt-1">
            {rsvps.length} {rsvps.length === 1 ? 'response' : 'responses'}
            {' · '}
            <button onClick={fetchRsvps} className="text-accent hover:underline">
              Refresh
            </button>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {(['yes', 'maybe', 'no'] as const).map(status => (
            <div key={status} className="bg-white rounded-xl p-4 shadow-sm border border-warm-gray/10 text-center">
              <span className="text-2xl">{STATUS_CONFIG[status].emoji}</span>
              <p className="text-3xl font-bold font-serif text-dark mt-1">{counts[status]}</p>
              <p className="text-xs text-warm-gray mt-1">{STATUS_CONFIG[status].label}</p>
            </div>
          ))}
        </div>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-warm-gray py-12">Loading...</p>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {/* RSVP List */}
        {!loading && rsvps.length === 0 && !error && (
          <p className="text-center text-warm-gray py-12">No RSVPs yet.</p>
        )}

        <div className="space-y-3">
          {rsvps.map(rsvp => (
            <div
              key={rsvp.id}
              className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-warm-gray/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-dark text-lg">{rsvp.name}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_CONFIG[rsvp.attending].bg}`}>
                      {STATUS_CONFIG[rsvp.attending].emoji} {STATUS_CONFIG[rsvp.attending].label}
                    </span>
                  </div>

                  {rsvp.dietary && (
                    <p className="text-sm text-warm-gray mt-1">
                      🍽️ {rsvp.dietary}
                    </p>
                  )}

                  {rsvp.message && (
                    <p className="text-sm text-dark/80 mt-2 italic">
                      &ldquo;{rsvp.message}&rdquo;
                    </p>
                  )}
                </div>

                <time className="text-xs text-warm-gray/60 shrink-0">
                  {new Date(rsvp.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
