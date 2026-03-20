'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

const EXPENSE_FIELDS = [
  { key: 'rent', label: 'Rent / Lease' },
  { key: 'utilities', label: 'Utilities' },
  { key: 'payroll', label: 'Payroll' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'materials', label: 'Materials / Supplies' },
  { key: 'equipmentLease', label: 'Equipment Lease' },
  { key: 'vehicle', label: 'Vehicle Expenses' },
  { key: 'other', label: 'Other' },
] as const

export default function BusinessIncomeExpensesPage() {
  const router = useRouter()
  const [grossRevenue, setGrossRevenue] = useState('')
  const [cogs, setCogs] = useState('')
  const [expenses, setExpenses] = useState<Record<string, string>>(
    Object.fromEntries(EXPENSE_FIELDS.map((f) => [f.key, '']))
  )
  const [cashInBank, setCashInBank] = useState('')
  const [accountsReceivable, setAccountsReceivable] = useState('')

  const grossProfit = useMemo(
    () => (parseFloat(grossRevenue) || 0) - (parseFloat(cogs) || 0),
    [grossRevenue, cogs]
  )

  const totalExpenses = useMemo(
    () =>
      Object.values(expenses).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      ),
    [expenses]
  )

  const netIncome = grossProfit - totalExpenses

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A1628]">
            Business Income &amp; Expenses
          </h1>
          <p className="mt-3 text-base text-[#64748B]">
            Form 433-B financial information for your business.
          </p>
        </div>

        <div className="space-y-6">
          {/* Revenue Section */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">Monthly Revenue</p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  Monthly Gross Revenue
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={grossRevenue}
                    onChange={(e) => setGrossRevenue(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  Cost of Goods Sold
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cogs}
                    onChange={(e) => setCogs(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex justify-between rounded-lg bg-[#F8FAFC] p-3">
                <span className="text-sm text-[#64748B]">Gross Profit</span>
                <span
                  className={`text-sm font-semibold ${
                    grossProfit >= 0 ? 'text-[#00A651]' : 'text-[#E63946]'
                  }`}
                >
                  ${fmt(grossProfit)}
                </span>
              </div>
            </div>
          </div>

          {/* Operating Expenses */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Monthly Operating Expenses
            </p>
            <div className="space-y-3">
              {EXPENSE_FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs text-[#94A3B8]">
                    {label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={expenses[key]}
                      onChange={(e) =>
                        setExpenses((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-2.5 pl-8 pr-4 text-sm text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
                    />
                  </div>
                </div>
              ))}
              <div className="my-2 border-t border-[#E2E8F0]" />
              <div className="flex justify-between rounded-lg bg-[#F8FAFC] p-3">
                <span className="text-sm text-[#64748B]">
                  Total Operating Expenses
                </span>
                <span className="text-sm font-semibold text-[#0A1628]">
                  ${fmt(totalExpenses)}
                </span>
              </div>
            </div>
          </div>

          {/* Net Income */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <div className="flex justify-between">
              <span className="font-medium text-[#0A1628]">
                Net Business Income
              </span>
              <span
                className={`text-lg font-bold ${
                  netIncome >= 0 ? 'text-[#00A651]' : 'text-[#E63946]'
                }`}
              >
                ${fmt(netIncome)}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Gross Profit minus Total Operating Expenses
            </p>
          </div>

          {/* Cash & Receivables */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Cash &amp; Receivables
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  Cash in Bank (Business)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cashInBank}
                    onChange={(e) => setCashInBank(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  Accounts Receivable Total
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={accountsReceivable}
                    onChange={(e) => setAccountsReceivable(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/rcp')}
          className="mt-10 w-full rounded-xl bg-[#00A651] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#008C44] active:bg-[#008C44]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
