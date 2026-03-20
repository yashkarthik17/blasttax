'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

function RequiredBadge() {
  return <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">Required</span>
}

/* ------------------------------------------------------------------ */
/* IRS Mailing Addresses                                               */
/* ------------------------------------------------------------------ */

const BROOKHAVEN_STATES = new Set([
  'CT', 'DE', 'DC', 'FL', 'GA', 'IL', 'IN', 'KY', 'ME', 'MD', 'MA',
  'MI', 'NH', 'NJ', 'NY', 'NC', 'OH', 'PA', 'RI', 'SC', 'TN', 'VT',
  'VA', 'WV', 'WI',
])

function getOICMailingAddress(state: string): { center: string; address: string } {
  if (BROOKHAVEN_STATES.has(state.toUpperCase())) {
    return {
      center: 'Brookhaven',
      address: 'IRS - COIC Unit\nPO Box 9007\nHoltsville, NY 11742-9007',
    }
  }
  return {
    center: 'Memphis',
    address: 'IRS - COIC Unit\nPO Box 30803, AMC\nMemphis, TN 38130-0803',
  }
}

/* ------------------------------------------------------------------ */
/* Checklist Items                                                     */
/* ------------------------------------------------------------------ */

interface ChecklistItem {
  id: string
  label: string
  description: string
  checked: boolean
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function SubmissionPage() {
  const router = useRouter()
  const { answers, caseId } = useWizard()

  const taxpayerState = answers.state ?? ''
  const mailingInfo = useMemo(() => getOICMailingAddress(taxpayerState), [taxpayerState])

  // What's being submitted
  const submittedForms: { form: string; label: string }[] = answers.selectedForms ?? [
    { form: '656', label: 'Form 656 — Offer in Compromise' },
    { form: '656-A', label: 'Form 656-A — Income Certification' },
    { form: '433-A(OIC)', label: 'Form 433-A(OIC) — Collection Information Statement' },
  ]

  // Required documents checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 'forms', label: 'All IRS forms completed and signed', description: 'Ensure all required forms are printed, signed, and dated.', checked: false },
    { id: 'fee', label: 'Application fee ($205) or fee waiver form', description: 'Include check/money order or Form 656-A for low-income waiver.', checked: false },
    { id: 'payment', label: 'Initial payment (if applicable)', description: '20% lump-sum payment or first periodic payment, unless low-income waiver applies.', checked: false },
    { id: 'transcripts', label: 'Tax return transcripts', description: 'Copies of filed tax returns for all periods included in the offer.', checked: false },
    { id: 'paystubs', label: 'Recent pay stubs (last 3 months)', description: 'For all employed household members.', checked: false },
    { id: 'bank', label: 'Bank statements (last 3 months)', description: 'For all bank accounts listed on Form 433-A(OIC).', checked: false },
    { id: 'assets', label: 'Asset documentation', description: 'Property valuations, vehicle titles, investment statements, etc.', checked: false },
    { id: 'supporting', label: 'Supporting documentation', description: 'Any additional documents supporting your claim (medical records, letters, etc.).', checked: false },
  ])

  function toggleChecklistItem(id: string) {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const allChecked = checklist.every((item) => item.checked)

  // Review confirmation
  const [reviewed, setReviewed] = useState(false)

  // Submit state
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')

  async function handleSubmit() {
    setSubmitting(true)
    try {
      // In production: create submission record in Supabase
      await new Promise((r) => setTimeout(r, 1000))
      const tracking = `BT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
      setTrackingNumber(tracking)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  // Success screen
  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600/20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">Submission Complete</h1>
          <p className="mt-2 text-sm text-zinc-400">Your forms have been recorded and are ready for mailing.</p>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-[var(--card)] p-6">
          <p className="text-xs text-zinc-500">Case Tracking Number</p>
          <p className="mt-1 text-2xl font-bold tracking-wider text-blue-400">{trackingNumber}</p>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-[var(--card)] p-6 text-left">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">Next Steps</h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-zinc-400">
            <li>Print all generated PDF forms</li>
            <li>Sign and date where indicated</li>
            <li>Gather all required supporting documents</li>
            <li>Mail to the address shown above via certified mail with return receipt</li>
            <li>Keep copies of everything for your records</li>
          </ol>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/post-submission')}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Track My Submission
          </button>
          <button
            onClick={() => router.push('/')}
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Submission Review</h1>
        <p className="mt-1 text-sm text-zinc-400">Review everything before submitting. Ensure all forms are complete and supporting documents are ready.</p>
      </div>

      {/* ── Forms Summary ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Forms Being Submitted</h2>

        <div className="space-y-2">
          {submittedForms.map((form) => (
            <div key={form.form} className="flex items-center gap-3 rounded-lg bg-zinc-900/50 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                </svg>
              </div>
              <span className="text-sm font-medium text-zinc-200">{form.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mailing Instructions ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Mailing Instructions</h2>

        <div className="rounded-lg border border-blue-500/30 bg-blue-600/5 p-4">
          <p className="text-xs text-zinc-400">
            Based on your state ({taxpayerState || 'not set'}), mail to the <span className="font-semibold text-white">{mailingInfo.center}</span> processing center:
          </p>
          <pre className="mt-3 whitespace-pre-wrap rounded bg-zinc-900 p-3 font-mono text-sm text-zinc-200">
            {mailingInfo.address}
          </pre>
          <p className="mt-3 text-xs text-zinc-500">
            Send via USPS Certified Mail with Return Receipt Requested for proof of delivery.
          </p>
        </div>
      </section>

      {/* ── Required Documents Checklist ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Required Documents Checklist</h2>

        <div className="space-y-2">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                item.checked ? 'border-green-500/30 bg-green-600/5' : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecklistItem(item.id)}
                className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-green-500 focus:ring-green-500"
              />
              <div>
                <span className={`text-sm font-medium ${item.checked ? 'text-green-300' : 'text-zinc-200'}`}>{item.label}</span>
                <p className="mt-0.5 text-xs text-zinc-400">{item.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-900/50 p-3">
          <span className="text-sm text-zinc-400">Completion</span>
          <span className="text-sm font-semibold text-white">
            {checklist.filter((i) => i.checked).length} / {checklist.length}
          </span>
        </div>
      </section>

      {/* ── Final Review ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={reviewed}
            onChange={(e) => setReviewed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500"
          />
          <div>
            <span className="text-sm font-medium text-zinc-200">
              I have reviewed everything and confirm all information is accurate <RequiredBadge />
            </span>
            <p className="mt-0.5 text-xs text-zinc-400">
              I understand that submitting false information may result in penalties and legal consequences.
            </p>
          </div>
        </label>
      </section>

      {/* ── Submit ── */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={submitting || !reviewed || !allChecked}
          className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {!allChecked && reviewed && (
        <p className="text-xs text-amber-400">Please check all items in the required documents checklist before submitting.</p>
      )}
    </div>
  )
}
