'use client'

import { useState } from 'react'
import Link from 'next/link'

type IAStatus = 'pending' | 'active' | 'default'

const STATUS_CONFIG: Record<IAStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-amber-400', bgColor: 'bg-amber-500/15' },
  active: { label: 'Active', color: 'text-emerald-400', bgColor: 'bg-emerald-500/15' },
  default: { label: 'Default', color: 'text-red-400', bgColor: 'bg-red-500/15' },
}

interface Milestone {
  id: string
  label: string
  description: string
  code?: string
  completed: boolean
  current: boolean
}

const MILESTONES: Milestone[] = [
  { id: 'submitted', label: 'Submitted', description: 'Form 9465 / 433-D submitted to IRS', completed: true, current: false },
  { id: 'tc971-043', label: 'TC 971 AC 043', description: 'IRS acknowledges receipt — pending review', code: 'TC 971 AC 043', completed: true, current: false },
  { id: 'tc971-063', label: 'TC 971 AC 063', description: 'Installment agreement approved', code: 'TC 971 AC 063', completed: false, current: true },
  { id: 'active', label: 'Active', description: 'Making monthly payments per agreement terms', completed: false, current: false },
  { id: 'paid-off', label: 'Paid Off', description: 'Balance satisfied in full — agreement complete', completed: false, current: false },
]

const COMPLIANCE_CHECKLIST = [
  { id: 'file-returns', label: 'File future returns on time', description: 'All federal tax returns must be filed by their due dates (including extensions).' },
  { id: 'pay-current', label: 'Pay current year taxes', description: 'Ensure enough withholding or estimated payments to cover current year liability.' },
  { id: 'make-payments', label: 'Make all IA payments on time', description: 'Payments must arrive by the due date each month. Set up direct debit (DDIA) for reliability.' },
]

const WARNING_TRIGGERS = [
  { icon: 'payment', label: 'Missed Payment', description: 'Missing even one payment can trigger default. The IRS will send CP523 notice.' },
  { icon: 'balance', label: 'New Tax Balance', description: 'Owing additional taxes for a new year while on an IA can cause default.' },
  { icon: 'unfiled', label: 'Unfiled Return', description: 'Failure to file a required return violates IA compliance terms.' },
]

export default function IAPostSubmissionPage() {
  const [status] = useState<IAStatus>('active')
  const statusConfig = STATUS_CONFIG[status]

  // Sample data — would come from user context / API
  const paymentData = {
    monthlyAmount: 450,
    dueDate: '28th of each month',
    nextPayment: 'April 28, 2026',
    paymentsMade: 14,
    totalPayments: 72,
    remainingBalance: 26100,
    originalBalance: 32400,
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
              <h1 className="text-2xl font-bold text-white">Installment Agreement</h1>
              <p className="mt-1 text-sm text-zinc-400">Track your IA status and payment progress</p>
            </div>
            <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Timeline Milestones */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Timeline</h2>
          <div className="relative">
            {MILESTONES.map((milestone, index) => (
              <div key={milestone.id} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Connector line */}
                {index < MILESTONES.length - 1 && (
                  <div className={`absolute left-[15px] top-[32px] h-[calc(100%-16px)] w-0.5 ${milestone.completed ? 'bg-blue-500' : 'bg-zinc-700'}`} />
                )}
                {/* Circle indicator */}
                <div className="relative z-10 flex-shrink-0">
                  {milestone.completed ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : milestone.current ? (
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
                <div className={`flex-1 ${milestone.current ? 'rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 -mt-1' : 'pt-0.5'}`}>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${milestone.current ? 'text-blue-400' : milestone.completed ? 'text-white' : 'text-zinc-500'}`}>
                      {milestone.label}
                    </h3>
                    {milestone.current && (
                      <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                        Current
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-sm ${milestone.current ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {milestone.description}
                  </p>
                  {milestone.code && (
                    <span className="mt-2 inline-block rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">
                      {milestone.code}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Schedule Card */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Payment Schedule</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Monthly Payment</p>
              <p className="mt-2 text-2xl font-bold text-white">${paymentData.monthlyAmount.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Due Date</p>
              <p className="mt-2 text-2xl font-bold text-white">{paymentData.dueDate}</p>
            </div>
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Next Payment</p>
              <p className="mt-2 text-lg font-bold text-blue-400">{paymentData.nextPayment}</p>
            </div>
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Payments Made</p>
              <p className="mt-2 text-lg font-bold text-white">
                {paymentData.paymentsMade} <span className="text-sm font-normal text-zinc-500">/ {paymentData.totalPayments}</span>
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Balance Remaining</span>
              <span className="font-semibold text-white">${paymentData.remainingBalance.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
                style={{ width: `${((paymentData.originalBalance - paymentData.remainingBalance) / paymentData.originalBalance) * 100}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>${(paymentData.originalBalance - paymentData.remainingBalance).toLocaleString()} paid</span>
              <span>${paymentData.originalBalance.toLocaleString()} total</span>
            </div>
          </div>
        </div>

        {/* FTP Penalty Rate Note */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-400">Reduced FTP Penalty Rate</p>
            <p className="mt-1 text-sm text-zinc-400">
              While your installment agreement is active, the Failure to Pay (FTP) penalty is reduced from 0.5%/month to <span className="font-semibold text-blue-300">0.25%/month</span>. This saves you money over the life of the agreement.
            </p>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Compliance Checklist</h2>
          <p className="text-sm text-zinc-400 mb-6">Stay in compliance to keep your IA active and avoid default.</p>
          <div className="space-y-3">
            {COMPLIANCE_CHECKLIST.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-xl border border-[#27272a] bg-[#09090b] p-4">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">{item.label}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Triggers */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Default Triggers</h2>
          <p className="text-sm text-zinc-400 mb-6">These events can cause your installment agreement to default.</p>
          <div className="space-y-3">
            {WARNING_TRIGGERS.map((trigger) => (
              <div key={trigger.label} className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-amber-400">{trigger.label}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{trigger.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <button className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700">
            Make a Payment
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-xl border border-[#27272a] bg-[#18181b] py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800">
              View Payment History
            </button>
            <button className="rounded-xl border border-[#27272a] bg-[#18181b] py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800">
              Request Modification
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
