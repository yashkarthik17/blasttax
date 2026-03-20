'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

const QUARTERS = [
  'Q4 2025 (Oct-Dec)',
  'Q3 2025 (Jul-Sep)',
  'Q2 2025 (Apr-Jun)',
  'Q1 2025 (Jan-Mar)',
  'Q4 2024 (Oct-Dec)',
  'Q3 2024 (Jul-Sep)',
]

const DESIGNATION_OPTIONS = [
  { value: 'trust', label: 'Trust Fund', description: 'Reduces personal TFRP liability first' },
  { value: 'non-trust', label: 'Non-Trust Fund', description: "Employer's share (no personal liability)" },
  { value: 'specific', label: 'Specific Period', description: 'Apply to a specific tax quarter' },
]

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'

export default function PaymentDesignationPage() {
  const router = useRouter()
  const [paymentAmount, setPaymentAmount] = useState('$5,000')
  const [designation, setDesignation] = useState('trust')
  const [quarter, setQuarter] = useState(QUARTERS[0])

  const designationLabel = DESIGNATION_OPTIONS.find((o) => o.value === designation)?.label ?? 'trust fund'

  const letterText = `Date: March 17, 2026

Internal Revenue Service
[Processing Center Address]

Re: Payment Designation
EIN: XX-XXXXXXX
Tax Form: 941
Tax Period: ${quarter} (10/01/25 - 12/31/25)

Dear Sir/Madam,

Enclosed is a payment of ${paymentAmount}.00. I am exercising my right under Rev. Rul. 79-284 to designate this voluntary payment as follows:

APPLY ENTIRE PAYMENT TO:
${designationLabel === 'Trust Fund' ? 'Trust Fund Taxes (employee withholding)' : designationLabel === 'Non-Trust Fund' ? 'Non-Trust Fund Taxes (employer share)' : `Specific Period: ${quarter}`}
for the quarter ending 12/31/2025.

Please do not apply this payment to any other period or tax type.

Sincerely,
[Taxpayer Name]
[Business Name]`

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Payment Designation</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Control how the IRS applies your business tax payment
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-xl bg-blue-500/10 px-4 py-3 ring-1 ring-blue-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-blue-300 leading-relaxed">
          When paying business tax debt, you can <strong className="text-blue-200">DESIGNATE</strong> how the IRS applies your payment. This is critical for reducing personal liability.
        </p>
      </div>

      {/* Why it matters */}
      <div className="rounded-2xl border-l-4 border-l-red-500 border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-bold text-white">Why This Matters</span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Payroll taxes have two parts: <strong className="text-white">trust fund</strong> (withheld from employees) and <strong className="text-white">non-trust fund</strong> (employer&apos;s share). Trust fund portions carry <strong className="text-red-400">personal liability</strong> via the TFRP. Paying trust fund first reduces your personal exposure.
        </p>
      </div>

      {/* Designation Form */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
            <svg className="h-3.5 w-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">Designation Form</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Payment Amount</label>
            <input
              type="text"
              className={inputClass}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="$0"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-zinc-400">Designate To</label>
            <div className="space-y-2">
              {DESIGNATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDesignation(opt.value)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    designation === opt.value
                      ? 'border-blue-500/40 bg-blue-500/10 ring-2 ring-blue-500/20'
                      : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      designation === opt.value ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                    }`}
                  >
                    {designation === opt.value && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{opt.label}</div>
                    <div className="text-xs text-zinc-500">{opt.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Tax Period (Quarter)</label>
            <select
              className={inputClass}
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
              {QUARTERS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-emerald-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-emerald-300">
              <svg className="mr-1 inline h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              &ldquo;I want to designate this {paymentAmount} payment to <strong>{designationLabel.toLowerCase()}</strong> for <strong>{quarter}</strong>&rdquo;
            </span>
          </div>
        </div>
      </div>

      {/* Letter Template */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15">
              <svg className="h-3.5 w-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">Designation Letter</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(letterText)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400 transition-colors hover:bg-blue-500/25"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy
          </button>
        </div>
        <pre className="whitespace-pre-wrap rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-4 py-3 font-mono text-xs text-zinc-300 leading-relaxed">
          {letterText}
        </pre>
      </div>

      {/* Reminder */}
      <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 px-4 py-3 ring-1 ring-amber-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <p className="text-xs text-amber-300 leading-relaxed">
          <strong className="text-amber-200">Send with every payment.</strong> Include this letter each time you make a voluntary payment. Without it, the IRS applies payment to the oldest period first.
        </p>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 rounded-xl bg-red-500/10 px-4 py-3 ring-1 ring-red-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-red-300 leading-relaxed">
          <strong>If you don&apos;t designate,</strong> the IRS applies payment to the <strong>oldest period first</strong>, which may not reduce your trust fund (personal) liability optimally.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Letter
        </button>
        <button
          onClick={() => router.back()}
          className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to TFRP Detail
        </button>
      </div>
    </div>
  )
}
