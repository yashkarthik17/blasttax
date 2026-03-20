'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function CounterOfferPage() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)

  const yourOffer = 8500
  const irsCounter = 14200
  const difference = irsCounter - yourOffer

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Warning Badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-bold text-amber-400">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Counter-Offer Received
        </span>
      </div>

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-white">The IRS Has Responded</h1>
        <p className="mt-2 text-sm text-zinc-400">
          The examiner reviewed your offer and proposed a different amount.
        </p>
      </div>

      {/* Comparison Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="flex items-center justify-between pb-4">
          <span className="text-sm font-semibold text-zinc-400">Your Offer</span>
          <span className="text-lg font-bold text-zinc-500">${yourOffer.toLocaleString()}</span>
        </div>

        {/* Divider with arrow */}
        <div className="flex items-center gap-3 py-2">
          <div className="h-px flex-1 bg-zinc-800" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15">
            <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-sm font-semibold text-zinc-400">IRS Counter</span>
          <span className="text-2xl font-extrabold text-amber-400">${irsCounter.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
          <span className="text-sm font-semibold text-zinc-400">Difference</span>
          <span className="text-base font-bold text-red-400">+${difference.toLocaleString()}</span>
        </div>
      </div>

      {/* Why the Difference? */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between px-4 py-4"
        >
          <span className="text-sm font-bold text-white">Why the Difference?</span>
          <svg
            className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded && (
          <div className="px-4 pb-4">
            <p className="text-sm text-zinc-400 leading-relaxed">
              The IRS calculated a higher Reasonable Collection Potential based on: updated asset valuations, revised income projections, or additional equity identified.
            </p>
          </div>
        )}
      </div>

      {/* Action Option 1: Accept */}
      <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/50 p-4">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
            <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Accept Counter-Offer</div>
            <div className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Agree to pay $14,200. Case moves to payment processing.
            </div>
          </div>
        </div>
        <button className="w-full rounded-full bg-emerald-600 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]">
          Accept ${irsCounter.toLocaleString()}
        </button>
      </div>

      {/* Action Option 2: Negotiate */}
      <div className="rounded-2xl border border-blue-500/20 bg-zinc-900/50 p-4">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
            <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Negotiate Further</div>
            <div className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Submit a revised offer with additional documentation supporting a lower amount.
            </div>
          </div>
        </div>
        <button className="w-full rounded-full bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]">
          Submit Revised Offer
        </button>
      </div>

      {/* Action Option 3: Reject & Appeal */}
      <div className="rounded-2xl border border-red-500/20 bg-zinc-900/50 p-4">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/15">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Reject &amp; Appeal</div>
            <div className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Decline the counter and file an appeal within 30 days using Form 13711.
            </div>
          </div>
        </div>
        <button className="w-full rounded-full border border-red-500 bg-transparent py-3 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10 active:scale-[0.98]">
          File Appeal
        </button>
      </div>

      {/* Info Alert */}
      <div className="flex items-start gap-3 rounded-xl bg-indigo-500/10 px-4 py-3 ring-1 ring-indigo-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-indigo-300">
          You have 30 days to respond. If no action is taken, the counter-offer expires.
        </span>
      </div>

      {/* Talk to Your Expert */}
      <button
        onClick={() => router.push('/messages')}
        className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Talk to Your Expert
      </button>
    </div>
  )
}
