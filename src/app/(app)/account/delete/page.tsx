'use client'

import { useState } from 'react'
import Link from 'next/link'

const reasons = [
  'Too expensive',
  'Not useful for my situation',
  'Found another solution',
  'Privacy concerns',
  'Other',
]

export default function DeleteAccountPage() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/account/settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Delete Account</h1>
        </div>

        {/* Warning */}
        <div className="flex gap-3 rounded-xl border-l-4 border-[#EF4444] bg-[#FEF2F2] p-3.5">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <div className="text-[0.88rem] font-bold text-[#991B1B]">This action is permanent</div>
            <div className="text-[0.78rem] leading-relaxed text-[#991B1B] opacity-80">Once deleted, your account cannot be recovered.</div>
          </div>
        </div>

        {/* What Happens */}
        <div>
          <div className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">What happens when you delete</div>
          <div className="rounded-[14px] border border-[#F1F5F9] bg-white">
            {[
              'All case data will be permanently removed',
              'Your subscription will be cancelled',
              'IRS forms will no longer be accessible',
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < 2 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-[0.82rem] leading-relaxed text-[#1F2937]" dangerouslySetInnerHTML={{ __html: item.replace(/(permanently removed|cancelled|no longer be accessible)/, '<strong>$1</strong>') }} />
              </div>
            ))}
          </div>
        </div>

        {/* Sorry */}
        <div className="py-2 text-center text-[0.88rem] font-semibold text-[#64748B]">
          We&apos;re sorry to see you go
        </div>

        {/* Reasons */}
        <div>
          <div className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Why are you leaving?</div>
          <div className="space-y-2">
            {reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`flex w-full items-center gap-3 rounded-xl border-[1.5px] p-3 text-left text-[0.85rem] font-medium text-[#0A1628] transition ${
                  selectedReason === reason
                    ? 'border-[#E63946] bg-[#FFF0F1]'
                    : 'border-[#F1F5F9] bg-white hover:border-[#E2E8F0]'
                }`}
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selectedReason === reason ? 'border-[#E63946] bg-[#E63946]' : 'border-[#E2E8F0]'
                }`}>
                  {selectedReason === reason && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                </div>
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Additional Feedback (optional)</label>
          <textarea
            rows={3}
            placeholder="Help us improve..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your password to confirm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#EF4444] px-7 py-4 text-[0.9rem] font-bold text-white transition hover:bg-[#C81E2B] active:scale-[0.97]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete My Account
          </button>
          <Link
            href="/account"
            className="flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#00A651] px-7 py-4 text-[0.9rem] font-bold text-[#00A651] transition hover:bg-[#E6F9EE]"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Keep My Account
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.5)] p-6">
          <div className="w-full max-w-[320px] rounded-[20px] bg-white p-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF2F2]">
              <svg className="h-6 w-6 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="mb-2 text-lg font-extrabold text-[#0A1628]">Are you absolutely sure?</div>
            <div className="mb-6 text-[0.82rem] leading-relaxed text-[#64748B]">
              This will permanently delete your account, all cases, documents, and subscription. This cannot be undone.
            </div>
            <div className="space-y-2.5">
              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded-full bg-[#EF4444] px-7 py-3.5 text-[0.88rem] font-bold text-white"
              >
                Yes, Delete Everything
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded-full border-[1.5px] border-[#E2E8F0] px-7 py-3.5 text-[0.88rem] font-semibold text-[#64748B]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
