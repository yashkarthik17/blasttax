'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import FormScreen from '@/components/wizard/FormScreen'

const FILING_STATUSES = ['Single', 'MFJ', 'MFS', 'HOH', 'QSS']
const TAX_FORMS = ['1040', '941', '940', '1120']

interface TaxYearEntry {
  id: string
  taxYear: string
  taxForm: string
  balance: string
  taxPrincipal: string
  penaltyAmount: string
  interestAmount: string
  assessmentDate: string
  filingStatus: string
  isSfr: boolean
  lastPaymentDate: string
}

const emptyEntry = (): TaxYearEntry => ({
  id: crypto.randomUUID(),
  taxYear: '',
  taxForm: '1040',
  balance: '',
  taxPrincipal: '',
  penaltyAmount: '',
  interestAmount: '',
  assessmentDate: '',
  filingStatus: 'Single',
  isSfr: false,
  lastPaymentDate: '',
})

const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300'
const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function parseMoney(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

const taxYears = Array.from({ length: 12 }, (_, i) => String(2026 - i))

export default function CaseInfoPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()

  const [entries, setEntries] = useState<TaxYearEntry[]>(() => {
    const saved = answers.taxDebts as TaxYearEntry[] | undefined
    return saved && saved.length > 0 ? saved : [emptyEntry()]
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  function updateEntry(index: number, field: keyof TaxYearEntry, value: string | boolean) {
    setEntries((prev) => {
      const arr = [...prev]
      arr[index] = { ...arr[index], [field]: value }
      return arr
    })
  }

  function removeEntry(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  function addEntry() {
    setEntries((prev) => [...prev, emptyEntry()])
  }

  const totalDebt = entries.reduce((sum, e) => sum + parseMoney(e.balance), 0)

  const isValid = entries.length > 0 && entries.every(
    (e) =>
      e.taxYear !== '' &&
      e.taxForm !== '' &&
      parseMoney(e.balance) > 0
  )

  function handleNext() {
    setAnswers({ taxDebts: entries })
    router.push('/analysis/case-review')
  }

  return (
    <FormScreen
      title="Tax Debt Entry"
      description="Enter your IRS debt for each tax year. If you uploaded a transcript, you can verify the auto-filled data."
      onNext={handleNext}
      onBack={() => router.push('/analysis/transcript')}
      isValid={isValid}
    >
      {/* Tax Year Entries */}
      {entries.map((entry, idx) => (
        <div key={entry.id} className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {entry.taxYear ? `Tax Year ${entry.taxYear}` : `Tax Year Entry ${idx + 1}`}
            </h3>
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(idx)}
                className="flex items-center gap-1 text-xs text-red-400 transition-colors hover:text-red-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6" /><path d="M14 11v6" />
                </svg>
                Remove
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Year, Form, Filing Status */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor={`year-${idx}`} className={labelClass}>Tax Year *</label>
                <select
                  id={`year-${idx}`}
                  value={entry.taxYear}
                  onChange={(e) => updateEntry(idx, 'taxYear', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select year</option>
                  {taxYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`form-${idx}`} className={labelClass}>Tax Form *</label>
                <select
                  id={`form-${idx}`}
                  value={entry.taxForm}
                  onChange={(e) => updateEntry(idx, 'taxForm', e.target.value)}
                  className={inputClass}
                >
                  {TAX_FORMS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`status-${idx}`} className={labelClass}>Filing Status</label>
                <select
                  id={`status-${idx}`}
                  value={entry.filingStatus}
                  onChange={(e) => updateEntry(idx, 'filingStatus', e.target.value)}
                  className={inputClass}
                >
                  {FILING_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Balance Amounts */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor={`balance-${idx}`} className={labelClass}>Total Balance *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
                  <input
                    id={`balance-${idx}`}
                    type="text"
                    inputMode="decimal"
                    value={entry.balance}
                    onChange={(e) => updateEntry(idx, 'balance', e.target.value)}
                    placeholder="0.00"
                    className={`${inputClass} pl-7`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`tax-${idx}`} className={labelClass}>Tax Principal</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
                  <input
                    id={`tax-${idx}`}
                    type="text"
                    inputMode="decimal"
                    value={entry.taxPrincipal}
                    onChange={(e) => updateEntry(idx, 'taxPrincipal', e.target.value)}
                    placeholder="0.00"
                    className={`${inputClass} pl-7`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`penalty-${idx}`} className={labelClass}>Penalties</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
                  <input
                    id={`penalty-${idx}`}
                    type="text"
                    inputMode="decimal"
                    value={entry.penaltyAmount}
                    onChange={(e) => updateEntry(idx, 'penaltyAmount', e.target.value)}
                    placeholder="0.00"
                    className={`${inputClass} pl-7`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`interest-${idx}`} className={labelClass}>Interest</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
                  <input
                    id={`interest-${idx}`}
                    type="text"
                    inputMode="decimal"
                    value={entry.interestAmount}
                    onChange={(e) => updateEntry(idx, 'interestAmount', e.target.value)}
                    placeholder="0.00"
                    className={`${inputClass} pl-7`}
                  />
                </div>
              </div>
            </div>

            {/* Assessment Date, SFR, Last Payment */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor={`assess-${idx}`} className={labelClass}>Assessment Date (TC 150)</label>
                <input
                  id={`assess-${idx}`}
                  type="date"
                  value={entry.assessmentDate}
                  onChange={(e) => updateEntry(idx, 'assessmentDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`lastpay-${idx}`} className={labelClass}>Last Payment Date</label>
                <input
                  id={`lastpay-${idx}`}
                  type="date"
                  value={entry.lastPaymentDate}
                  onChange={(e) => updateEntry(idx, 'lastPaymentDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 transition-colors hover:border-zinc-600">
                  <input
                    type="checkbox"
                    checked={entry.isSfr}
                    onChange={(e) => updateEntry(idx, 'isSfr', e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 text-emerald-500 accent-emerald-500"
                  />
                  <span className="text-sm text-zinc-300">
                    SFR (Substitute for Return)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Tax Year Button */}
      <button
        type="button"
        onClick={addEntry}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 py-4 text-sm font-medium text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" /><path d="M5 12h14" />
        </svg>
        Add Tax Year
      </button>

      {/* Total Debt Summary Card */}
      {entries.length > 0 && totalDebt > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Tax Debt</p>
              <p className="mt-1 text-3xl font-bold text-white">{formatCurrency(totalDebt)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">
                {entries.filter((e) => e.taxYear).length} tax {entries.filter((e) => e.taxYear).length === 1 ? 'year' : 'years'}
              </p>
              {entries.some((e) => e.isSfr) && (
                <p className="mt-1 text-xs font-medium text-amber-400">
                  {entries.filter((e) => e.isSfr).length} SFR {entries.filter((e) => e.isSfr).length === 1 ? 'year' : 'years'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </FormScreen>
  )
}
