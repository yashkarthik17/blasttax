'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface QuarterEntry {
  id: string
  quarter: string
  year: string
  incomeTaxWithheld: string
  socialSecurityTax: string
  medicareTax: string
  additionalMedicareTax: string
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const
const YEARS = ['2024', '2023', '2022', '2021', '2020'] as const

let nextId = 1

function calcTrustFund(entry: QuarterEntry) {
  const itw = parseFloat(entry.incomeTaxWithheld) || 0
  const ss = parseFloat(entry.socialSecurityTax) || 0
  const med = parseFloat(entry.medicareTax) || 0
  const addMed = parseFloat(entry.additionalMedicareTax) || 0
  return itw + ss / 2 + med / 2 + addMed
}

function calcNonTrustFund(entry: QuarterEntry) {
  const ss = parseFloat(entry.socialSecurityTax) || 0
  const med = parseFloat(entry.medicareTax) || 0
  return ss / 2 + med / 2
}

export default function TrustFundPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<QuarterEntry[]>([])

  function addEntry() {
    setEntries((prev) => [
      ...prev,
      {
        id: String(nextId++),
        quarter: 'Q1',
        year: '2024',
        incomeTaxWithheld: '',
        socialSecurityTax: '',
        medicareTax: '',
        additionalMedicareTax: '',
      },
    ])
  }

  function updateEntry(id: string, field: keyof QuarterEntry, value: string) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    )
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const totals = useMemo(() => {
    let tf = 0
    let ntf = 0
    entries.forEach((e) => {
      tf += calcTrustFund(e)
      ntf += calcNonTrustFund(e)
    })
    const total = tf + ntf
    return {
      trustFund: tf,
      nonTrustFund: ntf,
      total,
      percentage: total > 0 ? ((tf / total) * 100).toFixed(1) : '0',
    }
  }, [entries])

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Trust Fund Allocation
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Break down each 941 quarter into trust fund and non-trust fund portions.
          </p>
        </div>

        {/* Designation Reminder */}
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-amber-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p className="text-sm leading-relaxed text-amber-200/80">
              Always designate payments to trust fund first. Trust fund taxes
              carry personal liability through TFRP.
            </p>
          </div>
        </div>

        {/* Quarter Entries */}
        <div className="space-y-4">
          {entries.map((entry) => {
            const tf = calcTrustFund(entry)
            const ntf = calcNonTrustFund(entry)
            return (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                {/* Quarter / Year selector */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <select
                      value={entry.quarter}
                      onChange={(e) =>
                        updateEntry(entry.id, 'quarter', e.target.value)
                      }
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                    >
                      {QUARTERS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    <select
                      value={entry.year}
                      onChange={(e) =>
                        updateEntry(entry.id, 'year', e.target.value)
                      }
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-xs text-zinc-500 transition-colors hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>

                {/* Line Items */}
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Line 3: Income Tax Withheld (100% trust fund)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={entry.incomeTaxWithheld}
                      onChange={(e) =>
                        updateEntry(entry.id, 'incomeTaxWithheld', e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Line 5a: Social Security Tax (half trust / half non-trust)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={entry.socialSecurityTax}
                      onChange={(e) =>
                        updateEntry(entry.id, 'socialSecurityTax', e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Line 5c: Medicare Tax (half trust / half non-trust)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={entry.medicareTax}
                      onChange={(e) =>
                        updateEntry(entry.id, 'medicareTax', e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Line 5d: Additional Medicare Tax (100% trust fund)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={entry.additionalMedicareTax}
                      onChange={(e) =>
                        updateEntry(
                          entry.id,
                          'additionalMedicareTax',
                          e.target.value
                        )
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Per-Quarter Totals */}
                <div className="mt-4 flex gap-3">
                  <div className="flex-1 rounded-lg bg-emerald-500/10 p-3 text-center">
                    <p className="text-xs text-zinc-400">Trust Fund</p>
                    <p className="text-sm font-semibold text-emerald-400">
                      ${fmt(tf)}
                    </p>
                  </div>
                  <div className="flex-1 rounded-lg bg-blue-500/10 p-3 text-center">
                    <p className="text-xs text-zinc-400">Non-Trust Fund</p>
                    <p className="text-sm font-semibold text-blue-400">
                      ${fmt(ntf)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          <button
            onClick={addEntry}
            className="w-full rounded-xl border-2 border-dashed border-zinc-700 py-4 text-sm font-semibold text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            + Add Quarter
          </button>
        </div>

        {/* Summary Card */}
        {entries.length > 0 && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Trust Fund</span>
                <span className="font-semibold text-emerald-400">
                  ${fmt(totals.trustFund)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Non-Trust Fund</span>
                <span className="font-semibold text-blue-400">
                  ${fmt(totals.nonTrustFund)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Trust Fund %</span>
                <span className="font-medium text-white">
                  {totals.percentage}%
                </span>
              </div>
              <div className="my-2 border-t border-zinc-700" />
              <div className="rounded-lg bg-red-500/10 p-3">
                <p className="text-xs text-zinc-400">TFRP Exposure</p>
                <p className="text-lg font-bold text-red-400">
                  Maximum personal liability = ${fmt(totals.trustFund)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/debt')}
          className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
