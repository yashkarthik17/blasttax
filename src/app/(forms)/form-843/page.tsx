'use client'

import { useState, useRef } from 'react'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

function RequiredBadge() {
  return <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">Required</span>
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>
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
const selectClass = inputClass
const textareaClass = inputClass + ' min-h-[120px] resize-y'

/* ------------------------------------------------------------------ */
/* Penalty Type                                                        */
/* ------------------------------------------------------------------ */

interface PenaltyEntry {
  type: 'FTF' | 'FTP' | 'FTD' | 'EstimatedTax'
  label: string
  checked: boolean
  amount: number
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form843Page() {
  const { answers, caseId } = useWizard()

  // Taxpayer info (pre-filled)
  const [name, setName] = useState(answers.taxpayerName ?? '')
  const [ssn, setSsn] = useState(answers.ssn ?? '')
  const [address, setAddress] = useState(answers.address ?? '')
  const [city, setCity] = useState(answers.city ?? '')
  const [state, setState] = useState(answers.state ?? '')
  const [zip, setZip] = useState(answers.zip ?? '')
  const [phone, setPhone] = useState(answers.phone ?? '')

  // Tax periods for abatement
  const [selectedYears, setSelectedYears] = useState<string[]>(() => {
    if (answers.taxDebts && Array.isArray(answers.taxDebts)) {
      return answers.taxDebts.map((d: { taxYear: number }) => String(d.taxYear))
    }
    return []
  })

  const currentYear = new Date().getFullYear()
  const availableYears = Array.from({ length: 10 }, (_, i) => String(currentYear - i))

  // Tax form number
  const [formNumber, setFormNumber] = useState('1040')

  // Penalty types
  const [penalties, setPenalties] = useState<PenaltyEntry[]>(() => {
    const penaltyResults = answers.penalties ?? []
    const ftfTotal = penaltyResults.reduce((s: number, p: { ftfAmount: number }) => s + (p.ftfAmount ?? 0), 0)
    const ftpTotal = penaltyResults.reduce((s: number, p: { ftpAmount: number }) => s + (p.ftpAmount ?? 0), 0)

    return [
      { type: 'FTF', label: 'Failure to File (FTF)', checked: ftfTotal > 0, amount: ftfTotal },
      { type: 'FTP', label: 'Failure to Pay (FTP)', checked: ftpTotal > 0, amount: ftpTotal },
      { type: 'FTD', label: 'Failure to Deposit (FTD)', checked: false, amount: 0 },
      { type: 'EstimatedTax', label: 'Estimated Tax Penalty', checked: false, amount: 0 },
    ]
  })

  function togglePenalty(index: number) {
    setPenalties((prev) =>
      prev.map((p, i) => (i === index ? { ...p, checked: !p.checked } : p))
    )
  }

  function updatePenaltyAmount(index: number, amount: number) {
    setPenalties((prev) =>
      prev.map((p, i) => (i === index ? { ...p, amount } : p))
    )
  }

  const totalPenaltyAmount = penalties.filter((p) => p.checked).reduce((s, p) => s + p.amount, 0)

  // Abatement type
  const [abatementType, setAbatementType] = useState<'FTA' | 'ReasonableCause'>('FTA')
  const ftaEligible = answers.penalties?.some?.((p: { ftaEligible: boolean }) => p.ftaEligible) ?? false

  // Reasonable cause narrative
  const [narrative, setNarrative] = useState('')

  // Supporting docs
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Interest abatement
  const [interestAbatement, setInterestAbatement] = useState(false)
  const [interestErrorType, setInterestErrorType] = useState<'ministerial' | 'managerial'>('ministerial')

  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-843' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-843-Abatement.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  function toggleYear(year: string) {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    )
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Form 843</h1>
        <p className="mt-1 text-sm text-zinc-400">Claim for Refund and Request for Abatement &mdash; Request penalty and/or interest relief.</p>
      </div>

      {/* ── Taxpayer Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Taxpayer Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="SSN" required>
            <input className={inputClass} value={ssn} onChange={(e) => setSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
          </Field>
          <Field label="Street Address" required>
            <input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City"><input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} /></Field>
            <Field label="State"><input className={inputClass} value={state} onChange={(e) => setState(e.target.value)} maxLength={2} /></Field>
            <Field label="ZIP"><input className={inputClass} value={zip} onChange={(e) => setZip(e.target.value)} /></Field>
          </div>
          <Field label="Phone" required>
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </Field>
        </div>
      </section>

      {/* ── Tax Periods ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Tax Periods for Abatement" />

        <div className="flex flex-wrap gap-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedYears.includes(year)
                  ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <Field label="Tax Form Number" required>
            <select className={selectClass + ' w-40'} value={formNumber} onChange={(e) => setFormNumber(e.target.value)}>
              <option value="1040">1040</option>
              <option value="941">941</option>
              <option value="940">940</option>
              <option value="1065">1065</option>
              <option value="1120">1120</option>
            </select>
          </Field>
        </div>
      </section>

      {/* ── Penalty Types ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Penalties to Abate" />

        <div className="space-y-3">
          {penalties.map((penalty, idx) => (
            <div key={penalty.type} className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${penalty.checked ? 'border-blue-500/50 bg-blue-500/5' : 'border-zinc-700'}`}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={penalty.checked}
                  onChange={() => togglePenalty(idx)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500"
                />
                <span className="text-sm font-medium text-zinc-200">{penalty.label}</span>
              </label>

              {penalty.checked && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Amount:</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
                    <input
                      className="w-28 rounded border border-zinc-600 bg-zinc-800 py-1.5 pl-6 pr-2 text-right text-sm text-white outline-none focus:border-blue-500"
                      type="number"
                      value={penalty.amount}
                      onChange={(e) => updatePenaltyAmount(idx, Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {totalPenaltyAmount > 0 && (
          <div className="mt-4 flex justify-between rounded-lg bg-zinc-900/50 p-3 text-sm">
            <span className="text-zinc-400">Total penalty abatement requested</span>
            <span className="font-bold text-white">${totalPenaltyAmount.toLocaleString()}</span>
          </div>
        )}
      </section>

      {/* ── Abatement Type ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Abatement Type" />

        <div className="grid gap-3 sm:grid-cols-2">
          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${abatementType === 'FTA' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="abatementType" value="FTA" checked={abatementType === 'FTA'} onChange={() => setAbatementType('FTA')} className="sr-only" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">First Time Abatement (FTA)</span>
              {ftaEligible && <span className="rounded bg-green-600/20 px-1.5 py-0.5 text-[10px] font-semibold text-green-400">Eligible</span>}
            </div>
            <span className="mt-1 text-xs text-zinc-400">Administrative waiver for taxpayers with clean compliance history (3 prior years).</span>
          </label>

          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${abatementType === 'ReasonableCause' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="abatementType" value="ReasonableCause" checked={abatementType === 'ReasonableCause'} onChange={() => setAbatementType('ReasonableCause')} className="sr-only" />
            <span className="text-sm font-semibold text-white">Reasonable Cause</span>
            <span className="mt-1 text-xs text-zinc-400">Explain circumstances that prevented timely filing or payment.</span>
          </label>
        </div>

        {abatementType === 'ReasonableCause' && (
          <div className="mt-4">
            <Field label="Explain the circumstances that support reasonable cause" required>
              <textarea
                className={textareaClass}
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Describe the specific facts and circumstances that prevented you from filing or paying on time. Include dates, any illness, natural disaster, death of family member, records destroyed, reliance on professional advice, etc."
              />
            </Field>
            <p className="mt-1 text-xs text-zinc-500">Provide as much detail as possible. The IRS evaluates each case individually.</p>
          </div>
        )}
      </section>

      {/* ── Supporting Documentation ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Supporting Documentation" />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-zinc-600 p-8 transition-colors hover:border-zinc-400"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17,8 12,3 7,8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm text-zinc-400">Click to upload supporting documents</p>
          <p className="text-xs text-zinc-500">PDF, JPG, PNG (max 10 MB per file)</p>
        </div>
        <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />

        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg bg-zinc-900/50 px-3 py-2">
                <span className="truncate text-sm text-zinc-300">{file.name}</span>
                <button onClick={() => removeFile(idx)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Interest Abatement ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Interest Abatement (Optional)" />

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={interestAbatement} onChange={(e) => setInterestAbatement(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <div>
            <span className="text-sm font-medium text-zinc-200">Request interest abatement due to IRS error</span>
            <p className="mt-0.5 text-xs text-zinc-400">Interest may be abated if it was caused by an unreasonable IRS error or delay (IRC 6404(e)).</p>
          </div>
        </label>

        {interestAbatement && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${interestErrorType === 'ministerial' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700'}`}>
              <input type="radio" name="interestError" value="ministerial" checked={interestErrorType === 'ministerial'} onChange={() => setInterestErrorType('ministerial')} className="h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
              <div>
                <span className="text-sm font-medium text-zinc-200">Ministerial Error</span>
                <p className="text-xs text-zinc-400">Procedural or clerical error by IRS</p>
              </div>
            </label>
            <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${interestErrorType === 'managerial' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700'}`}>
              <input type="radio" name="interestError" value="managerial" checked={interestErrorType === 'managerial'} onChange={() => setInterestErrorType('managerial')} className="h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
              <div>
                <span className="text-sm font-medium text-zinc-200">Managerial Error</span>
                <p className="text-xs text-zinc-400">Failure by IRS management to timely act</p>
              </div>
            </label>
          </div>
        )}
      </section>

      {/* ── Generate PDF ── */}
      <div className="flex gap-3">
        <button
          onClick={handleGeneratePdf}
          disabled={generating}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  )
}
