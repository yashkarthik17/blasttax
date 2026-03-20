'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

const FORM_TYPES = ['941', '940', '944', '943', '1120', '1120-S', '1065', '720'] as const
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const
const QUARTERLY_FORMS = ['941', '720', '944']

interface DebtEntry {
  id: string
  formType: string
  quarter: string
  year: string
  balance: string
  tax: string
  penalties: string
  interest: string
  trustFundPortion: string
  nonTrustFundPortion: string
  assessmentDate: string
  csed: string
  isSfr: boolean
  lienFiled: boolean
  roAssigned: boolean
}

let nextId = 1

export default function BusinessDebtPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<DebtEntry[]>([])

  function addEntry() {
    setEntries((prev) => [
      ...prev,
      {
        id: String(nextId++),
        formType: '941',
        quarter: 'Q1',
        year: '2024',
        balance: '',
        tax: '',
        penalties: '',
        interest: '',
        trustFundPortion: '',
        nonTrustFundPortion: '',
        assessmentDate: '',
        csed: '',
        isSfr: false,
        lienFiled: false,
        roAssigned: false,
      },
    ])
  }

  function update(id: string, field: keyof DebtEntry, value: string | boolean) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    )
  }

  function remove(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const totals = useMemo(() => {
    let totalDebt = 0
    let totalTrust = 0
    let totalNonTrust = 0
    entries.forEach((e) => {
      totalDebt += parseFloat(e.balance) || 0
      totalTrust += parseFloat(e.trustFundPortion) || 0
      totalNonTrust += parseFloat(e.nonTrustFundPortion) || 0
    })
    return { totalDebt, totalTrust, totalNonTrust }
  }, [entries])

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Business Debt Inventory
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Enter all business tax periods with outstanding balances.
          </p>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry) => {
            const isQuarterly = QUARTERLY_FORMS.includes(entry.formType)
            return (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                {/* Row 1: Form type, period, year */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <select
                    value={entry.formType}
                    onChange={(e) => update(entry.id, 'formType', e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                  >
                    {FORM_TYPES.map((f) => (
                      <option key={f} value={f}>
                        Form {f}
                      </option>
                    ))}
                  </select>
                  {isQuarterly && (
                    <select
                      value={entry.quarter}
                      onChange={(e) =>
                        update(entry.id, 'quarter', e.target.value)
                      }
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                    >
                      {QUARTERS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  )}
                  {!isQuarterly && (
                    <span className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-400">
                      Annual
                    </span>
                  )}
                  <input
                    type="text"
                    value={entry.year}
                    onChange={(e) => update(entry.id, 'year', e.target.value)}
                    placeholder="Year"
                    maxLength={4}
                    className="w-20 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => remove(entry.id)}
                    className="ml-auto text-xs text-zinc-500 transition-colors hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>

                {/* Financial Fields */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { field: 'balance' as const, label: 'Total Balance' },
                    { field: 'tax' as const, label: 'Tax' },
                    { field: 'penalties' as const, label: 'Penalties' },
                    { field: 'interest' as const, label: 'Interest' },
                    { field: 'trustFundPortion' as const, label: 'Trust Fund Portion' },
                    { field: 'nonTrustFundPortion' as const, label: 'Non-Trust Fund Portion' },
                  ].map(({ field, label }) => (
                    <div key={field}>
                      <label className="mb-1 block text-xs text-zinc-500">
                        {label}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                          $
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={entry[field]}
                          onChange={(e) =>
                            update(entry.id, field, e.target.value)
                          }
                          placeholder="0.00"
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-7 pr-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dates */}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Assessment Date
                    </label>
                    <input
                      type="date"
                      value={entry.assessmentDate}
                      onChange={(e) =>
                        update(entry.id, 'assessmentDate', e.target.value)
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      CSED
                    </label>
                    <input
                      type="date"
                      value={entry.csed}
                      onChange={(e) =>
                        update(entry.id, 'csed', e.target.value)
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Indicators */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { field: 'isSfr' as const, label: 'SFR' },
                    { field: 'lienFiled' as const, label: 'Lien Filed' },
                    { field: 'roAssigned' as const, label: 'RO Assigned' },
                  ].map(({ field, label }) => (
                    <button
                      key={field}
                      onClick={() => update(entry.id, field, !entry[field])}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        entry[field]
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}

          <button
            onClick={addEntry}
            className="w-full rounded-xl border-2 border-dashed border-zinc-700 py-4 text-sm font-semibold text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            + Add Tax Period
          </button>
        </div>

        {/* Summary */}
        {entries.length > 0 && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">Debt Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Business Debt</span>
                <span className="font-semibold text-white">
                  ${fmt(totals.totalDebt)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Trust Fund</span>
                <span className="font-semibold text-emerald-400">
                  ${fmt(totals.totalTrust)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Non-Trust Fund</span>
                <span className="font-semibold text-blue-400">
                  ${fmt(totals.totalNonTrust)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/income-expenses')}
          className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
