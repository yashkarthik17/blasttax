'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type OICStatus = 'submitted' | 'processability' | 'tc480' | 'letter3756' | 'examiner' | 'investigation' | 'decision' | 'accepted' | 'compliance'

interface TimelineStep {
  id: OICStatus
  label: string
  timeframe: string
  description: string
}

const TIMELINE_STEPS: TimelineStep[] = [
  { id: 'submitted', label: 'Submitted', timeframe: 'Day 0', description: 'OIC package mailed with $205 application fee and initial payment' },
  { id: 'processability', label: 'Processability Review', timeframe: 'Wk 1-3', description: 'IRS checks that all required forms and documents are included' },
  { id: 'tc480', label: 'TC 480 Posts', timeframe: 'Wk 1-4', description: 'Transaction code 480 posts to your account — collection activity paused' },
  { id: 'letter3756', label: 'Letter 3756', timeframe: 'Wk 2-6', description: 'Official acknowledgment letter confirming your offer is being processed' },
  { id: 'examiner', label: 'Examiner Assigned', timeframe: 'Mo 2-6', description: 'An Offer Examiner is assigned to review your case' },
  { id: 'investigation', label: 'Investigation', timeframe: 'Mo 3-12', description: 'Examiner verifies financials, may request additional documentation' },
  { id: 'decision', label: 'Decision', timeframe: 'Mo 6-18', description: 'IRS issues acceptance, rejection, or counter-offer' },
  { id: 'accepted', label: '24-Month Deemed Acceptance', timeframe: 'Mo 24', description: 'If IRS has not decided, your offer is AUTOMATICALLY accepted' },
]

function getStepIndex(status: OICStatus): number {
  return TIMELINE_STEPS.findIndex((s) => s.id === status)
}

function calculateDaysRemaining(submissionDate: Date): number {
  const deadline = new Date(submissionDate)
  deadline.setMonth(deadline.getMonth() + 24)
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function OICPostSubmissionPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample data
  const currentStatus: OICStatus = 'investigation'
  const submissionDate = new Date('2025-09-15')
  const tc480Date = new Date('2025-10-08')
  const currentStepIndex = getStepIndex(currentStatus)
  const daysRemaining = calculateDaysRemaining(submissionDate)
  const totalDays = 730 // 24 months
  const daysElapsed = totalDays - daysRemaining
  const progressPercent = Math.min(100, (daysElapsed / totalDays) * 100)

  const deadlineDate = new Date(submissionDate)
  deadlineDate.setMonth(deadlineDate.getMonth() + 24)

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Back Navigation */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Status Header with Countdown */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Offer in Compromise</h1>
              <p className="mt-1 text-sm text-zinc-400">Lifecycle tracking and 24-month countdown</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-500/15 px-4 py-1.5 text-sm font-semibold text-blue-400">
              In Progress
            </span>
          </div>

          {/* 24-Month Countdown */}
          <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">24-Month Countdown</p>
                <p className="mt-1 text-3xl font-bold text-white">{daysRemaining} <span className="text-base font-normal text-zinc-400">days remaining</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Deadline</p>
                <p className="mt-1 text-lg font-semibold text-blue-400">{deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">{daysElapsed} days elapsed of {totalDays} days total</p>
          </div>
        </div>

        {/* Key Dates */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Submission Date</p>
            <p className="mt-2 text-lg font-bold text-white">{submissionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">TC 480 Date</p>
            <p className="mt-2 text-lg font-bold text-white">{tc480Date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">24-Month Deadline</p>
            <p className="mt-2 text-lg font-bold text-blue-400">{deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-6">OIC Lifecycle Timeline</h2>
          <div className="relative">
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex
              const isCurrent = index === currentStepIndex
              const isFuture = index > currentStepIndex

              return (
                <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Connector line */}
                  {index < TIMELINE_STEPS.length - 1 && (
                    <div className={`absolute left-[15px] top-[32px] h-[calc(100%-16px)] w-0.5 ${isCompleted ? 'bg-blue-500' : 'bg-zinc-700'}`} />
                  )}
                  {/* Circle indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    {isCompleted ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : isCurrent ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-500/20">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-800">
                        <div className="h-2 w-2 rounded-full bg-zinc-600" />
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 ${isCurrent ? 'rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 -mt-1' : 'pt-0.5'}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-semibold ${isCurrent ? 'text-blue-400' : isCompleted ? 'text-white' : 'text-zinc-500'}`}>
                        {step.label}
                      </h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {step.timeframe}
                      </span>
                      {isCurrent && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          You are here
                        </span>
                      )}
                    </div>
                    <p className={`mt-1 text-sm ${isCurrent ? 'text-zinc-300' : isFuture ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Active Milestone Card */}
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">What&apos;s Happening Now</h2>
              <p className="text-sm text-blue-400">Investigation Phase</p>
            </div>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            An Offer Examiner is reviewing your financial documentation. They may contact you to request additional information or clarification. During this phase, collection activity remains suspended due to your TC 480 posting.
          </p>
          <div className="mt-4 rounded-lg bg-[#09090b] p-3">
            <p className="text-xs font-medium text-zinc-500">What to expect:</p>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-600" />
                The examiner may call or mail requests for updated bank statements or pay stubs
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-600" />
                Respond within 14 days to any information requests to avoid delays
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-600" />
                Continue making any required periodic payments during the review
              </li>
            </ul>
          </div>
        </div>

        {/* 24-Month Rule Callout */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400">24-Month Rule (IRC 7122(f))</h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                If the IRS does not make a decision on your Offer in Compromise within 24 months of the date the IRS received your offer, it is <span className="font-bold text-emerald-300">AUTOMATICALLY accepted</span> by operation of law. This is a powerful taxpayer protection — the clock is ticking in your favor.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Year Compliance Period */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-2">5-Year Compliance Period</h2>
          <p className="text-sm text-zinc-400 mb-4">If your OIC is accepted, you must remain in full compliance for 5 years or until the offered amount is paid in full (whichever is longer).</p>
          <div className="space-y-3">
            {[
              'File all required federal tax returns on time',
              'Pay all federal taxes in full and on time',
              'Make all scheduled OIC payments',
              'Do not incur any new tax liabilities',
              'Cooperate with any IRS requests for information',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-[#27272a] bg-[#09090b] p-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-400">
                  {i + 1}
                </span>
                <p className="text-sm text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
            <p className="text-xs text-amber-400">
              <span className="font-semibold">Important:</span> If you violate the compliance terms during this 5-year period, the IRS can default your accepted offer and reinstate the full original tax balance (minus payments made).
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <button className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700">
            Upload Additional Documents
          </button>
          <button className="w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800">
            Check Status
          </button>
        </div>
      </div>
    </div>
  )
}
