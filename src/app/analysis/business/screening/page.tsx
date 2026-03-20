'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEBT_TYPES = ['941', '940', '1120', '1065', 'Other'] as const

export default function BusinessScreeningPage() {
  const router = useRouter()
  const [operating, setOperating] = useState<boolean | null>(null)
  const [hasEmployees, setHasEmployees] = useState<boolean | null>(null)
  const [files941, setFiles941] = useState<boolean | null>(null)
  const [debtTypes, setDebtTypes] = useState<string[]>([])
  const [revenueOfficer, setRevenueOfficer] = useState<boolean | null>(null)
  const [tfrpProposed, setTfrpProposed] = useState<boolean | null>(null)

  function toggleDebtType(type: string) {
    setDebtTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const allAnswered =
    operating !== null &&
    hasEmployees !== null &&
    files941 !== null &&
    debtTypes.length > 0 &&
    revenueOfficer !== null &&
    tfrpProposed !== null

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Business Screening
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Answer these questions to help us evaluate your business tax situation.
          </p>
        </div>

        <div className="space-y-6">
          {/* Q1: Currently Operating */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Is the business currently operating?
            </p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setOperating(val)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-colors ${
                    operating === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Paid Employees */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Does the business have paid employees?
            </p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setHasEmployees(val)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-colors ${
                    hasEmployees === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Form 941 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Does the business file Form 941 (quarterly payroll)?
            </p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setFiles941(val)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-colors ${
                    files941 === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Q4: Debt Types */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              What type of business tax debt do you have?
            </p>
            <p className="mb-3 text-xs text-zinc-500">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {DEBT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleDebtType(type)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    debtTypes.includes(type)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Q5: Revenue Officer */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Has a Revenue Officer been assigned?
            </p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setRevenueOfficer(val)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-colors ${
                    revenueOfficer === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Q6: TFRP */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Has the IRS proposed a Trust Fund Recovery Penalty?
            </p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setTfrpProposed(val)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-colors ${
                    tfrpProposed === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          disabled={!allAnswered}
          onClick={() => router.push('/analysis/business/entity-type')}
          className={`mt-10 w-full rounded-xl py-4 text-lg font-semibold transition-colors ${
            allAnswered
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700'
              : 'cursor-not-allowed bg-zinc-800 text-zinc-500'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
