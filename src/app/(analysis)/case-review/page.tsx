'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import FormScreen from '@/components/wizard/FormScreen'

const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function parseMoney(s: string): number {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

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

export default function CaseReviewPage() {
  const router = useRouter()
  const { answers } = useWizard()

  const entries: TaxYearEntry[] = (answers.taxDebts as TaxYearEntry[]) ?? []
  const sortedEntries = [...entries].sort((a, b) => Number(a.taxYear) - Number(b.taxYear))

  const totalBalance = entries.reduce((sum, e) => sum + parseMoney(e.balance), 0)
  const totalTax = entries.reduce((sum, e) => sum + parseMoney(e.taxPrincipal), 0)
  const totalPenalties = entries.reduce((sum, e) => sum + parseMoney(e.penaltyAmount), 0)
  const totalInterest = entries.reduce((sum, e) => sum + parseMoney(e.interestAmount), 0)

  function handleEdit(entryId: string) {
    router.push('/analysis/case-info')
  }

  function handleNext() {
    router.push('/analysis/assets/bank-accounts')
  }

  const isValid = entries.length > 0

  return (
    <FormScreen
      title="Review Your Tax Debt"
      description="Please review the tax debt information you entered. Make sure everything is accurate before continuing."
      onNext={handleNext}
      onBack={() => router.push('/analysis/case-info')}
      isValid={isValid}
    >
      {/* Debt Table */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Debt Summary</h3>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="pb-3 pr-4">Year</th>
                <th className="pb-3 pr-4">Form</th>
                <th className="pb-3 pr-4 text-right">Balance</th>
                <th className="pb-3 pr-4 text-right">Tax</th>
                <th className="pb-3 pr-4 text-right">Penalties</th>
                <th className="pb-3 pr-4 text-right">Interest</th>
                <th className="pb-3 pr-4">Assessed</th>
                <th className="pb-3 pr-4 text-center">SFR</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {sortedEntries.map((entry) => (
                <tr key={entry.id} className="text-zinc-300 transition-colors hover:bg-zinc-800/30">
                  <td className="py-3 pr-4 font-medium text-white">{entry.taxYear || '--'}</td>
                  <td className="py-3 pr-4">{entry.taxForm}</td>
                  <td className="py-3 pr-4 text-right font-medium text-white">
                    {parseMoney(entry.balance) > 0 ? formatCurrency(parseMoney(entry.balance)) : '--'}
                  </td>
                  <td className="py-3 pr-4 text-right">
                    {parseMoney(entry.taxPrincipal) > 0 ? formatCurrency(parseMoney(entry.taxPrincipal)) : '--'}
                  </td>
                  <td className="py-3 pr-4 text-right text-amber-400">
                    {parseMoney(entry.penaltyAmount) > 0 ? formatCurrency(parseMoney(entry.penaltyAmount)) : '--'}
                  </td>
                  <td className="py-3 pr-4 text-right text-red-400">
                    {parseMoney(entry.interestAmount) > 0 ? formatCurrency(parseMoney(entry.interestAmount)) : '--'}
                  </td>
                  <td className="py-3 pr-4 text-zinc-500">
                    {entry.assessmentDate || '--'}
                  </td>
                  <td className="py-3 pr-4 text-center">
                    {entry.isSfr ? (
                      <span className="inline-flex rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                        SFR
                      </span>
                    ) : (
                      <span className="text-zinc-600">--</span>
                    )}
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(entry.id)}
                      className="text-xs text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Totals Row */}
            <tfoot>
              <tr className="border-t-2 border-zinc-700 font-semibold text-white">
                <td className="pt-3 pr-4">Total</td>
                <td className="pt-3 pr-4"></td>
                <td className="pt-3 pr-4 text-right">{formatCurrency(totalBalance)}</td>
                <td className="pt-3 pr-4 text-right">{formatCurrency(totalTax)}</td>
                <td className="pt-3 pr-4 text-right text-amber-400">{formatCurrency(totalPenalties)}</td>
                <td className="pt-3 pr-4 text-right text-red-400">{formatCurrency(totalInterest)}</td>
                <td className="pt-3 pr-4"></td>
                <td className="pt-3 pr-4"></td>
                <td className="pt-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-3 sm:hidden">
          {sortedEntries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">{entry.taxYear || '--'}</span>
                  <span className="rounded-md bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                    {entry.taxForm}
                  </span>
                  {entry.isSfr && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                      SFR
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleEdit(entry.id)}
                  className="text-xs text-emerald-400"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-zinc-500">Balance</p>
                  <p className="font-medium text-white">{formatCurrency(parseMoney(entry.balance))}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Tax</p>
                  <p className="text-zinc-300">{formatCurrency(parseMoney(entry.taxPrincipal))}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Penalties</p>
                  <p className="text-amber-400">{formatCurrency(parseMoney(entry.penaltyAmount))}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Interest</p>
                  <p className="text-red-400">{formatCurrency(parseMoney(entry.interestAmount))}</p>
                </div>
              </div>
              {entry.assessmentDate && (
                <p className="mt-2 text-xs text-zinc-500">
                  Assessed: {entry.assessmentDate}
                </p>
              )}
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-sm text-zinc-500">No tax debt entries found.</p>
            <button
              type="button"
              onClick={() => router.push('/analysis/case-info')}
              className="mt-3 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Go back to enter your debt
            </button>
          </div>
        )}
      </div>

      {/* Total Summary Card */}
      {entries.length > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Debt</p>
              <p className="mt-1 text-2xl font-bold text-white">{formatCurrency(totalBalance)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Tax Years</p>
              <p className="mt-1 text-2xl font-bold text-white">{entries.length}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Penalties</p>
              <p className="mt-1 text-2xl font-bold text-amber-400">{formatCurrency(totalPenalties)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Interest</p>
              <p className="mt-1 text-2xl font-bold text-red-400">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
        </div>
      )}
    </FormScreen>
  )
}
