'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function calculateMonthsRemaining(csedDate: Date): number {
  const now = new Date()
  const diff = csedDate.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24 * 30.44)))
}

export default function CNCPostSubmissionPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample data
  const csedDate = new Date('2031-04-15')
  const monthsRemaining = calculateMonthsRemaining(csedDate)
  const totalMonths = 120 // 10-year CSED
  const monthsElapsed = totalMonths - monthsRemaining
  const progressPercent = Math.min(100, (monthsElapsed / totalMonths) * 100)
  const totalDebt = 47850
  const accruedInterest = 6230
  const accruedPenalties = 3410

  const KEY_FACTS = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'No Payments Required',
      description: 'The IRS has determined you cannot afford to make payments at this time.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'CSED Continues Running',
      description: 'The 10-year Collection Statute Expiration Date (CSED) keeps ticking while you are in CNC status.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      title: 'IRS Reviews Annually',
      description: 'The IRS may review your financial situation periodically. If your income increases, CNC status may be removed.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: 'Penalties & Interest Accrue',
      description: 'While no payments are due, penalties and interest continue to accumulate on the outstanding balance.',
    },
  ]

  const REMOVAL_TRIGGERS = [
    {
      title: 'Significant Income Increase',
      description: 'If the IRS determines your income has increased substantially above the CNC threshold, they may remove CNC status and resume collection.',
    },
    {
      title: 'Asset Acquisition',
      description: 'Acquiring significant assets (real estate, inheritance, large deposits) may trigger a reassessment of your ability to pay.',
    },
    {
      title: 'Refund Offset',
      description: 'While in CNC, the IRS will still offset any tax refunds you are owed and apply them to your outstanding balance. This is not removal, but it does reduce your balance.',
    },
  ]

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

        {/* Status Header */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Currently Not Collectible</h1>
              <p className="mt-1 text-sm text-zinc-400">Your account is in CNC status — no payments required</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-4 py-1.5 text-sm font-semibold text-emerald-400">
              Active
            </span>
          </div>
        </div>

        {/* CSED Countdown */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
          <h2 className="text-lg font-semibold text-white mb-1">CSED Countdown</h2>
          <p className="text-sm text-zinc-400 mb-4">Collection Statute Expiration Date — when your debt legally expires</p>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-4xl font-bold text-white">{monthsRemaining}</p>
              <p className="text-sm text-zinc-400">months remaining</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Expires On</p>
              <p className="mt-1 text-xl font-bold text-blue-400">
                {csedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-zinc-500">
            <span>{monthsElapsed} months elapsed</span>
            <span>{totalMonths} months total (10-year CSED)</span>
          </div>

          <div className="mt-4 rounded-lg bg-[#09090b] p-3">
            <p className="text-sm text-zinc-300">
              Your debt of <span className="font-bold text-white">${totalDebt.toLocaleString()}</span> expires on{' '}
              <span className="font-bold text-blue-400">{csedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>{' '}
              ({monthsRemaining} months remaining). After the CSED, the IRS can no longer legally collect this debt.
            </p>
          </div>
        </div>

        {/* Key Facts */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Key Facts About CNC</h2>
          <div className="space-y-4">
            {KEY_FACTS.map((fact) => (
              <div key={fact.title} className="flex gap-4 rounded-xl border border-[#27272a] bg-[#09090b] p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800">
                  {fact.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{fact.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{fact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Balance Breakdown */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Balance Breakdown</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
              <span className="text-sm text-zinc-400">Original Tax Debt</span>
              <span className="font-semibold text-white">${totalDebt.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
              <span className="text-sm text-zinc-400">Accrued Interest</span>
              <span className="font-semibold text-red-400">+${accruedInterest.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
              <span className="text-sm text-zinc-400">Accrued Penalties</span>
              <span className="font-semibold text-red-400">+${accruedPenalties.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
              <span className="text-sm font-semibold text-white">Current Total Balance</span>
              <span className="text-lg font-bold text-white">${(totalDebt + accruedInterest + accruedPenalties).toLocaleString()}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Note: While CNC stops active collection, penalties and interest continue to accrue until the CSED expires or the balance is paid.
          </p>
        </div>

        {/* Annual Review Warning */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Annual Review Notice</h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                The IRS may review your financial situation annually. If your income increases significantly, CNC status may be removed and collection activity could resume. Keep your financial records updated so you can respond promptly to any IRS inquiry.
              </p>
            </div>
          </div>
        </div>

        {/* Triggers for Removal */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-1">What Could Remove CNC Status</h2>
          <p className="text-sm text-zinc-400 mb-6">Be aware of these potential triggers for CNC removal.</p>
          <div className="space-y-3">
            {REMOVAL_TRIGGERS.map((trigger) => (
              <div key={trigger.title} className="rounded-xl border border-red-500/10 bg-red-500/5 p-4">
                <h3 className="flex items-center gap-2 font-medium text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {trigger.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{trigger.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <button className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700">
            Update Financial Info
          </button>
          <button className="w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800">
            View CSED Timeline
          </button>
        </div>
      </div>
    </div>
  )
}
