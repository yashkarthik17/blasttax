'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function AnalysisErrorPage() {
  const router = useRouter()
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Auto-expand details after 1.2s
  useEffect(() => {
    const timer = setTimeout(() => setDetailsOpen(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-[80vh] flex-col items-center px-5 pt-10">
      {/* Error Icon */}
      <div className="mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-red-500/15 ring-2 ring-red-500/20 ring-offset-4 ring-offset-[#F8FAFC]">
        <svg className="h-9 w-9 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-[#0A1628]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[#94A3B8]">
          We encountered an issue while analyzing your case
        </p>
      </div>

      {/* Error Details (expandable) */}
      <div className="mb-4 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-hidden rounded-xl border border-[#F1F5F9] bg-white">
        <button
          type="button"
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex w-full items-center justify-between px-4 py-3.5 transition-colors hover:bg-[#F8FAFC]"
        >
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-[#0A1628]">Error Details</span>
          </div>
          <svg
            className={`h-3 w-3 text-[#94A3B8] transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {detailsOpen && (
          <div className="border-t border-[#F1F5F9] px-4 py-3">
            <div className="mb-3 rounded-lg bg-red-500/10 px-3 py-2.5">
              <p className="text-xs font-semibold text-[#E63946] leading-relaxed">
                Unable to calculate RCP &mdash; missing bank account data
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#94A3B8]">Error Code:</span>
              <code className="rounded bg-[#F1F5F9] px-2 py-0.5 font-mono text-[11px] text-[#64748B]">
                ERR_ANALYSIS_INCOMPLETE
              </code>
            </div>
          </div>
        )}
      </div>

      {/* What you can do */}
      <div className="mb-3 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">What you can do</h3>
      </div>

      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl space-y-2">
        <button
          onClick={() => router.push('/assets/bank')}
          className="flex w-full items-center gap-3 rounded-xl border border-[#F1F5F9] bg-white px-4 py-3.5 text-left transition-all hover:border-blue-500/30 hover:bg-[#F8FAFC]"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/15">
            <svg className="h-4 w-4 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[#0A1628]">Check your financial information</div>
            <div className="text-xs text-[#94A3B8]">Review and update bank accounts &amp; assets</div>
          </div>
          <svg className="h-3 w-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => router.push('/processing')}
          className="flex w-full items-center gap-3 rounded-xl border border-[#F1F5F9] bg-white px-4 py-3.5 text-left transition-all hover:border-emerald-500/30 hover:bg-[#F8FAFC]"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#00A651]/15">
            <svg className="h-4 w-4 text-[#00A651]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[#0A1628]">Try again</div>
            <div className="text-xs text-[#94A3B8]">Retry the analysis with current data</div>
          </div>
          <svg className="h-3 w-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => router.push('/contact-support')}
          className="flex w-full items-center gap-3 rounded-xl border border-[#F1F5F9] bg-white px-4 py-3.5 text-left transition-all hover:border-violet-500/30 hover:bg-[#F8FAFC]"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
            <svg className="h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[#0A1628]">Contact support</div>
            <div className="text-xs text-[#94A3B8]">Get help from our team</div>
          </div>
          <svg className="h-3 w-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1" />

      {/* Bottom CTAs */}
      <div className="mt-8 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl space-y-3 pb-6">
        <button
          onClick={() => router.push('/processing')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-4 text-base font-bold text-white transition-all hover:bg-[#1D4ED8] active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Retry Analysis
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-2 text-center text-sm font-semibold text-[#94A3B8] transition-colors hover:text-[#334155]"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  )
}
