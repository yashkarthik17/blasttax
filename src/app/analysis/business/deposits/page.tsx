'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

type DepositStatus = 'timely' | 'late' | 'missing'

interface Deposit {
  id: string
  date: string
  amount: string
  status: DepositStatus
}

const STATUS_STYLES: Record<DepositStatus, string> = {
  timely: 'bg-emerald-500/15 text-emerald-400',
  late: 'bg-amber-500/15 text-amber-400',
  missing: 'bg-red-500/15 text-red-400',
}

let nextId = 1

export default function BusinessDepositsPage() {
  const router = useRouter()
  const [eftpsEnrolled, setEftpsEnrolled] = useState<boolean | null>(null)
  const [schedule, setSchedule] = useState<'monthly' | 'semi-weekly'>('monthly')
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [totalLiability, setTotalLiability] = useState('')

  function addDeposit() {
    setDeposits((prev) => [
      ...prev,
      { id: String(nextId++), date: '', amount: '', status: 'timely' },
    ])
  }

  function updateDeposit(id: string, field: keyof Deposit, value: string) {
    setDeposits((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    )
  }

  function removeDeposit(id: string) {
    setDeposits((prev) => prev.filter((d) => d.id !== id))
  }

  const totalDeposits = useMemo(
    () =>
      deposits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0),
    [deposits]
  )

  const liabilityNum = parseFloat(totalLiability) || 0
  const isCurrent = totalDeposits >= liabilityNum && liabilityNum > 0

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Deposit Compliance
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            For operating businesses, the IRS requires current deposit compliance for any resolution.
          </p>
        </div>

        {/* Warning */}
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-red-400"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-sm leading-relaxed text-red-200/70">
              IRS will REJECT resolution if deposits are not current.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* EFTPS Enrollment */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">EFTPS Enrollment Status</p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setEftpsEnrolled(val)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-colors ${
                    eftpsEnrolled === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {val ? 'Enrolled' : 'Not Enrolled'}
                </button>
              ))}
            </div>
          </div>

          {/* Depositor Schedule */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-2 font-medium text-white">Depositor Schedule</p>
            <p className="mb-4 text-xs text-zinc-500">
              Based on $50K lookback threshold
            </p>
            <div className="flex gap-3">
              {(['monthly', 'semi-weekly'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSchedule(s)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold capitalize transition-colors ${
                    schedule === s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {s === 'semi-weekly' ? 'Semi-Weekly' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>

          {/* Total Liability */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="mb-2 block font-medium text-white">
              Total Liability (Current Quarter)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={totalLiability}
                onChange={(e) => setTotalLiability(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-8 pr-4 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Deposit Table */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-medium text-white">Current Quarter Deposits</p>
              <button
                onClick={addDeposit}
                className="rounded-lg bg-emerald-600/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-600/30"
              >
                + Add Deposit
              </button>
            </div>

            {deposits.length === 0 ? (
              <p className="text-center text-sm text-zinc-500">
                No deposits added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {deposits.map((dep) => (
                  <div
                    key={dep.id}
                    className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs text-zinc-500">
                          Date
                        </label>
                        <input
                          type="date"
                          value={dep.date}
                          onChange={(e) =>
                            updateDeposit(dep.id, 'date', e.target.value)
                          }
                          className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500 [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-zinc-500">
                          Amount
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={dep.amount}
                          onChange={(e) =>
                            updateDeposit(dep.id, 'amount', e.target.value)
                          }
                          placeholder="0.00"
                          className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-2">
                        {(['timely', 'late', 'missing'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() =>
                              updateDeposit(dep.id, 'status', st)
                            }
                            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                              dep.status === st
                                ? STATUS_STYLES[st]
                                : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => removeDeposit(dep.id)}
                        className="text-xs text-zinc-500 transition-colors hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals Summary */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-3 font-medium text-white">Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Deposits</span>
                <span className="font-medium text-white">
                  ${totalDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Liability</span>
                <span className="font-medium text-white">
                  ${liabilityNum.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="my-2 border-t border-zinc-700" />
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Compliance Result</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    liabilityNum > 0
                      ? isCurrent
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-red-500/15 text-red-400'
                      : 'bg-zinc-700 text-zinc-400'
                  }`}
                >
                  {liabilityNum > 0
                    ? isCurrent
                      ? 'Current'
                      : 'Not Current'
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/trust-fund')}
          className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
