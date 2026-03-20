'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'

/* ------------------------------------------------------------------ */
/* Year Assessment                                                     */
/* ------------------------------------------------------------------ */

interface YearAssessment {
  year: string
  selected: boolean
  originalAmount: number
  proposedAmount: string
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form656LPage() {
  const router = useRouter()
  const { answers } = useWizard()

  const taxpayerName = answers.taxpayerName ?? 'Jane M. Doe'
  const ssnMasked = answers.ssnMasked ?? '***-**-4589'

  const [years, setYears] = useState<YearAssessment[]>([
    { year: '2020', selected: false, originalAmount: 0, proposedAmount: '' },
    { year: '2021', selected: false, originalAmount: 0, proposedAmount: '' },
    { year: '2022', selected: true, originalAmount: 18500, proposedAmount: '5200' },
    { year: '2023', selected: true, originalAmount: 13500, proposedAmount: '8000' },
  ])

  const [basisForDispute, setBasisForDispute] = useState('')
  const [step] = useState(1)

  function toggleYear(index: number) {
    setYears((prev) =>
      prev.map((y, i) => (i === index ? { ...y, selected: !y.selected } : y)),
    )
  }

  function updateProposed(index: number, value: string) {
    setYears((prev) =>
      prev.map((y, i) => (i === index ? { ...y, proposedAmount: value } : y)),
    )
  }

  const totalOffer = years
    .filter((y) => y.selected)
    .reduce((sum, y) => sum + (parseInt(y.proposedAmount.replace(/[^0-9]/g, '')) || 0), 0)

  const progress = (step / 4) * 100

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Progress */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">Step {step} of 4</span>
          <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">
          Offer in Compromise &mdash; Doubt as to Liability
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">
          Unlike standard OIC, DATL does not require financial disclosure
        </p>
      </div>

      {/* Taxpayer Information */}
      <section>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Taxpayer Information
        </h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Full Name</label>
            <div className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-3">
              <span className="text-sm font-semibold text-white">{taxpayerName}</span>
              <svg className="h-3.5 w-3.5 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Social Security Number</label>
            <div className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-3">
              <span className="text-sm font-semibold tracking-wide text-white">{ssnMasked}</span>
              <svg className="h-3.5 w-3.5 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Years Disputed */}
      <section>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Tax Years Disputed
        </h3>
        <div className="flex flex-wrap gap-2">
          {years.map((y, i) => (
            <button
              key={y.year}
              type="button"
              onClick={() => toggleYear(i)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                y.selected
                  ? 'border border-white/20 bg-blue-500/15 text-white'
                  : 'border border-zinc-700 bg-zinc-800/50 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
              }`}
            >
              {y.selected && (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {y.year}
            </button>
          ))}
        </div>
      </section>

      {/* Assessment Details */}
      <section>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Assessment Details
        </h3>
        <div className="space-y-3">
          {years
            .filter((y) => y.selected)
            .map((y) => {
              const idx = years.findIndex((yr) => yr.year === y.year)
              return (
                <div key={y.year} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                  <span className="mb-3 inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-400">
                    {y.year}
                  </span>
                  <div className="flex items-center justify-between border-b border-zinc-800 py-2.5">
                    <span className="text-sm text-zinc-400">Original Assessment</span>
                    <span className="text-base font-bold text-red-400">
                      {fmt(y.originalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2.5">
                    <span className="text-sm text-zinc-400">Your Proposed</span>
                    <div className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5">
                      <span className="text-sm font-bold text-zinc-500">$</span>
                      <input
                        type="text"
                        value={y.proposedAmount}
                        onChange={(e) => updateProposed(idx, e.target.value)}
                        className="w-16 border-none bg-transparent text-right text-base font-bold text-white outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              )
            })}

          {/* Total */}
          <div className="flex items-center justify-between rounded-xl bg-blue-500/10 px-4 py-3.5 ring-1 ring-blue-500/20">
            <span className="text-sm font-bold text-white">Total Offer Amount</span>
            <span className="text-xl font-black text-white">{fmt(totalOffer)}</span>
          </div>
        </div>
      </section>

      {/* Basis for Dispute */}
      <section>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Basis for Dispute
        </h3>
        <textarea
          value={basisForDispute}
          onChange={(e) => setBasisForDispute(e.target.value)}
          className={inputClass + ' min-h-[100px] resize-y'}
          placeholder="Explain why the IRS assessment is incorrect..."
        />
      </section>

      {/* Supporting Documents Upload */}
      <section>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          Supporting Documents
        </h3>
        <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-zinc-700 p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-500/5">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15">
            <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Tap to upload documents</span>
          <span className="mt-1 text-xs text-zinc-500">PDF, JPG, or PNG &mdash; Max 10MB</span>
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" multiple />
        </label>
      </section>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 ring-1 ring-emerald-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm text-emerald-300">
          No application fee or initial payment required for DATL
        </span>
      </div>

      {/* Continue */}
      <button
        onClick={() => router.push('/form-656l/step-2')}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
      >
        Continue
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  )
}
