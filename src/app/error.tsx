'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6 text-center">
      {/* Warning Icon */}
      <div className="mb-8">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl border border-amber-500/15 bg-amber-500/10">
          <svg className="h-9 w-9 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="mb-3 text-2xl font-extrabold text-white">Something Went Wrong</h1>
      <p className="mx-auto mb-10 max-w-[280px] text-sm text-zinc-500 leading-relaxed">
        Our servers are having trouble right now. Please try again in a few minutes.
      </p>

      {/* Buttons */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Retry
        </button>
      </div>

      {/* Contact Support */}
      <a
        href="mailto:support@blasttax.com"
        className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
      >
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Contact Support
      </a>

      {/* Error Code */}
      <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-600">
          Error Code: 500 {error.digest ? `\u00b7 ${error.digest}` : '\u00b7 REF-BT2026'}
        </span>
      </div>
    </div>
  )
}
