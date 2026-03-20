'use client'

import { useState } from 'react'
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

function StatRow({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm ${bold ? 'font-semibold text-zinc-200' : 'text-zinc-400'}`}>{label}</span>
      <span className={`text-sm ${bold ? 'font-bold' : 'font-semibold'} ${highlight ? 'text-blue-400' : 'text-white'}`}>{value}</span>
    </div>
  )
}

const inputClass = 'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'

/* ------------------------------------------------------------------ */
/* Bank Account Row                                                    */
/* ------------------------------------------------------------------ */

interface BankRow {
  institution: string
  accountType: string
  balance: string
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form433FPage() {
  const { answers, caseId } = useWizard()

  const mdiResult = answers.mdiResult ?? { totalIncome: 0, totalAllowableExpenses: 0, mdi: 0, expenseBreakdown: [] }

  // Income summary (pre-filled from calculations)
  const incomeRecords: { incomeType: string; grossMonthly: number; person: string }[] = answers.incomeRecords ?? []
  const totalIncome = mdiResult.totalIncome

  // Bank accounts
  const [bankAccounts, setBankAccounts] = useState<BankRow[]>(() => {
    if (answers.bankAccounts && Array.isArray(answers.bankAccounts)) {
      return answers.bankAccounts.map((b: { id: string; balance: number }) => ({
        institution: '',
        accountType: 'Checking',
        balance: String(b.balance),
      }))
    }
    return [{ institution: '', accountType: 'Checking', balance: '' }]
  })

  function addBank() {
    setBankAccounts((prev) => [...prev, { institution: '', accountType: 'Checking', balance: '' }])
  }

  function updateBank(index: number, field: keyof BankRow, value: string) {
    setBankAccounts((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  function removeBank(index: number) {
    setBankAccounts((prev) => prev.filter((_, i) => i !== index))
  }

  const totalBankBalance = bankAccounts.reduce((s, b) => s + (Number(b.balance) || 0), 0)

  // Simplified asset summary
  const totalNRE = answers.totalNRE ?? 0
  const realEstateEquity = answers.realEstateEquity ?? 0
  const vehicleEquity = answers.vehicleEquity ?? 0
  const otherAssetsValue = answers.otherAssetsValue ?? 0

  // MDI display
  const mdi = mdiResult.mdi

  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-433f' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-433F-Collection-Info.pdf'
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
        <h1 className="text-2xl font-bold text-white">Form 433-F</h1>
        <p className="mt-1 text-sm text-zinc-400">Collection Information Statement (Simplified) &mdash; Used for Currently Not Collectible (CNC) and simplified IA requests.</p>
      </div>

      {/* ── Income Summary ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Monthly Income (All Sources)" />

        <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
          {incomeRecords.length > 0 ? (
            incomeRecords.map((inc, idx) => (
              <StatRow key={idx} label={`${inc.incomeType} (${inc.person})`} value={`$${inc.grossMonthly.toLocaleString()}`} />
            ))
          ) : (
            <StatRow label="No income records entered" value="$0" />
          )}
          <div className="border-t border-zinc-600 pt-2">
            <StatRow label="Total Gross Monthly Income" value={`$${totalIncome.toLocaleString()}`} bold />
          </div>
        </div>
      </section>

      {/* ── Bank Accounts ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Bank Account Summary" />

        <div className="space-y-3">
          {bankAccounts.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 items-end gap-3 rounded-lg border border-zinc-700 bg-zinc-900/50 p-3">
              <div className="col-span-5">
                <Field label="Financial Institution">
                  <input className={inputClass} value={row.institution} onChange={(e) => updateBank(idx, 'institution', e.target.value)} placeholder="Bank name" />
                </Field>
              </div>
              <div className="col-span-3">
                <Field label="Type">
                  <select className={inputClass} value={row.accountType} onChange={(e) => updateBank(idx, 'accountType', e.target.value)}>
                    <option>Checking</option>
                    <option>Savings</option>
                    <option>Money Market</option>
                  </select>
                </Field>
              </div>
              <div className="col-span-3">
                <Field label="Balance">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
                    <input className={inputClass + ' pl-6'} type="number" value={row.balance} onChange={(e) => updateBank(idx, 'balance', e.target.value)} />
                  </div>
                </Field>
              </div>
              <div className="col-span-1 flex items-end pb-1">
                {bankAccounts.length > 1 && (
                  <button onClick={() => removeBank(idx)} className="text-red-400 hover:text-red-300" aria-label="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button onClick={addBank} className="rounded-lg border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-200">
            + Add Account
          </button>
          <span className="text-sm text-zinc-400">
            Total: <span className="font-semibold text-white">${totalBankBalance.toLocaleString()}</span>
          </span>
        </div>
      </section>

      {/* ── Asset Summary (Simplified) ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Asset Summary" />

        <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
          <StatRow label="Bank Accounts" value={`$${totalBankBalance.toLocaleString()}`} />
          <StatRow label="Real Estate Equity" value={`$${realEstateEquity.toLocaleString()}`} />
          <StatRow label="Vehicle Equity" value={`$${vehicleEquity.toLocaleString()}`} />
          <StatRow label="Other Assets" value={`$${otherAssetsValue.toLocaleString()}`} />
          <div className="border-t border-zinc-600 pt-2">
            <StatRow label="Total Net Realizable Equity" value={`$${totalNRE.toLocaleString()}`} bold highlight />
          </div>
        </div>
      </section>

      {/* ── Expense Summary ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Monthly Expense Summary" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-left text-xs text-zinc-400">
                <th className="pb-2 pr-4">Category</th>
                <th className="pb-2 pr-4 text-right">Actual</th>
                <th className="pb-2 pr-4 text-right">IRS Standard</th>
                <th className="pb-2 text-right">Allowable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {(mdiResult.expenseBreakdown ?? []).map((exp: { category: string; actual: number; standard: number; allowable: number }, idx: number) => (
                <tr key={idx}>
                  <td className="py-2 pr-4 text-zinc-300">{exp.category.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td className="py-2 pr-4 text-right text-zinc-400">${exp.actual.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right text-zinc-500">${exp.standard.toLocaleString()}</td>
                  <td className="py-2 text-right font-medium text-white">${exp.allowable.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-zinc-600">
                <td className="pt-3 font-semibold text-zinc-300">Total Allowable Expenses</td>
                <td></td>
                <td></td>
                <td className="pt-3 text-right font-bold text-white">${mdiResult.totalAllowableExpenses.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ── MDI Calculation ── */}
      <section className={`rounded-xl border p-6 ${mdi <= 0 ? 'border-green-500/30 bg-green-600/5' : 'border-blue-500/30 bg-blue-600/5'}`}>
        <h2 className="mb-4 text-lg font-bold text-white">Monthly Disposable Income (MDI)</h2>

        <div className="divide-y divide-zinc-800 rounded-lg bg-zinc-900/50 p-4">
          <StatRow label="Gross Monthly Income" value={`$${totalIncome.toLocaleString()}`} />
          <StatRow label="Total Allowable Expenses" value={`-$${mdiResult.totalAllowableExpenses.toLocaleString()}`} />
          <div className="border-t border-zinc-600 pt-2">
            <StatRow label="Monthly Disposable Income" value={`$${mdi.toLocaleString()}`} bold highlight />
          </div>
        </div>

        {mdi <= 0 && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-green-600/30 bg-green-600/10 p-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-green-400"><path d="M20 6L9 17l-5-5" /></svg>
            <p className="text-sm text-green-300">
              MDI is $0 or negative. This supports a Currently Not Collectible (CNC) determination where the IRS temporarily ceases collection activity.
            </p>
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
