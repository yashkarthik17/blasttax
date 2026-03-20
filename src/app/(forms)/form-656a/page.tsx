'use client'

import { useState, useMemo } from 'react'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

function RequiredBadge() {
  return <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">Required</span>
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center text-sm font-medium text-zinc-300">
        {label}
        {required && <RequiredBadge />}
      </span>
      {children}
    </label>
  )
}

const inputClass = 'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'

/* ------------------------------------------------------------------ */
/* FPL 250% Table (2026)                                               */
/* ------------------------------------------------------------------ */

const FPL_250: Record<number, number> = { 1: 39900, 2: 54100, 3: 68300, 4: 82500 }
const FPL_PER_ADDITIONAL = 14200

function getFPL250(familySize: number): number {
  if (familySize <= 0) return FPL_250[1]
  if (familySize <= 4) return FPL_250[familySize]
  return FPL_250[4] + (familySize - 4) * FPL_PER_ADDITIONAL
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form656APage() {
  const { answers, caseId } = useWizard()

  const prefillFamilySize = answers.familySize ?? answers.household?.familySize ?? 1
  const prefillGrossMonthly = answers.grossMonthlyIncome ?? answers.mdiResult?.totalIncome ?? 0

  const [householdSize, setHouseholdSize] = useState(prefillFamilySize)
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(prefillGrossMonthly)
  const [certified, setCertified] = useState(false)
  const [generating, setGenerating] = useState(false)

  const annualIncome = useMemo(() => grossMonthlyIncome * 12, [grossMonthlyIncome])
  const fplThreshold = useMemo(() => getFPL250(householdSize), [householdSize])
  const isBelow = annualIncome <= fplThreshold

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-656a' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-656A-Income-Certification.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Form 656-A</h1>
        <p className="mt-1 text-sm text-zinc-400">Income Certification for Offer in Compromise Application Fee and Payment &mdash; Determine if you qualify for fee and initial payment waivers.</p>
      </div>

      {/* ── Household Size ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Household Information</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Household Size (including yourself)" required>
            <input
              className={inputClass + ' w-32'}
              type="number"
              min={1}
              value={householdSize}
              onChange={(e) => setHouseholdSize(Math.max(1, Number(e.target.value)))}
            />
          </Field>

          <Field label="Gross Monthly Income (all sources)" required>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
              <input
                className={inputClass + ' pl-7'}
                type="number"
                min={0}
                value={grossMonthlyIncome}
                onChange={(e) => setGrossMonthlyIncome(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </Field>
        </div>
      </section>

      {/* ── Income Summary ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Income Determination</h2>

        <div className="space-y-3 rounded-lg bg-zinc-900/50 p-4">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-zinc-400">Monthly Income</span>
            <span className="text-sm font-semibold text-white">${grossMonthlyIncome.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-700 py-1 pt-2">
            <span className="text-sm text-zinc-400">Annual Income</span>
            <span className="text-sm font-semibold text-white">${annualIncome.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-700 py-1 pt-2">
            <span className="text-sm text-zinc-400">250% FPL for family of {householdSize}</span>
            <span className="text-sm font-semibold text-white">${fplThreshold.toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* ── Determination Result ── */}
      <section className={`rounded-xl border p-6 ${isBelow ? 'border-green-500/40 bg-green-600/5' : 'border-amber-500/40 bg-amber-600/5'}`}>
        <div className="flex items-start gap-4">
          {isBelow ? (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-600/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          )}

          <div>
            <h3 className={`text-lg font-bold ${isBelow ? 'text-green-400' : 'text-amber-400'}`}>
              {isBelow ? 'You Qualify for Fee Waiver' : 'Fee Waiver Does Not Apply'}
            </h3>
            <p className="mt-2 text-sm text-zinc-300">
              Your income (<span className="font-semibold text-white">${annualIncome.toLocaleString()}</span>) is{' '}
              {isBelow ? 'at or below' : 'above'} 250% of the Federal Poverty Level (
              <span className="font-semibold text-white">${fplThreshold.toLocaleString()}</span>) for a household of {householdSize}.
            </p>
            {isBelow && (
              <div className="mt-3 rounded-lg bg-green-600/10 p-3">
                <p className="text-sm font-semibold text-green-300">Application fee ($205) and initial payment are WAIVED</p>
                <p className="mt-1 text-xs text-green-400/70">Per IRS guidelines, low-income taxpayers are exempt from the OIC application fee and the 20% initial lump-sum payment requirement.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Certification ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Certification</h2>

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={certified} onChange={(e) => setCertified(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <div>
            <span className="text-sm font-medium text-zinc-200">
              I certify under penalty of perjury that the income information provided above is true, correct, and complete. <RequiredBadge />
            </span>
            <p className="mt-1 text-xs text-zinc-400">I understand that providing false information may result in penalties.</p>
          </div>
        </label>
      </section>

      {/* ── Generate PDF ── */}
      <div className="flex gap-3">
        <button
          onClick={handleGeneratePdf}
          disabled={generating || !certified}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  )
}
