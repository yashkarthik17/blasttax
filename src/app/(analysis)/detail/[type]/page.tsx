'use client'

import { useParams, useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const IA_TYPE_LABELS: Record<string, string> = {
  ShortTermPlan: 'Short-Term Payment Plan',
  GuaranteedIA: 'Guaranteed IA',
  StreamlinedIA: 'Streamlined IA',
  ExpandedStreamlinedIA: 'Expanded Streamlined IA',
  NonStreamlinedIA: 'Non-Streamlined IA',
  RegularIA: 'Regular IA',
  PPIA: 'Partial Pay IA (PPIA)',
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function IADetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const ia = result.ia as {
    recommendedType: string
    monthlyPayment: number
    termMonths: number
    totalPayment: number
    setupFee: number
    ddiaRequired: boolean
    financialDisclosureRequired: boolean
    allTypes: {
      type: string
      eligible: boolean
      monthlyPayment: number
      termMonths: number
      reasons: string[]
    }[]
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-bold text-white">Installment Agreement Tiers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Eligible</th>
                <th className="pb-3 pr-4 text-right">Monthly</th>
                <th className="pb-3 pr-4 text-right">Term</th>
                <th className="pb-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ia.allTypes.map((tier) => {
                const isRecommended = tier.type === ia.recommendedType
                return (
                  <tr
                    key={tier.type}
                    className={`border-b border-zinc-800/50 ${
                      isRecommended ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isRecommended ? 'text-emerald-400' : 'text-white'}`}>
                          {IA_TYPE_LABELS[tier.type] ?? tier.type}
                        </span>
                        {isRecommended && (
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      {tier.eligible ? (
                        <span className="text-emerald-400">Yes</span>
                      ) : (
                        <span className="text-red-400">No</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-right text-white">
                      {tier.eligible ? fmt(tier.monthlyPayment) : '--'}
                    </td>
                    <td className="py-3 pr-4 text-right text-zinc-400">
                      {tier.eligible ? `${tier.termMonths} mo` : '--'}
                    </td>
                    <td className="py-3 text-xs text-zinc-500">
                      {tier.reasons[0] ?? ''}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended summary */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
        <h3 className="mb-3 font-semibold text-emerald-300">
          Recommended: {IA_TYPE_LABELS[ia.recommendedType] ?? ia.recommendedType}
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-zinc-400">Monthly Payment</span>
            <p className="font-bold text-white">{fmt(ia.monthlyPayment)}</p>
          </div>
          <div>
            <span className="text-zinc-400">Term</span>
            <p className="font-bold text-white">{ia.termMonths} months</p>
          </div>
          <div>
            <span className="text-zinc-400">Total Cost</span>
            <p className="font-bold text-white">{fmt(ia.totalPayment)}</p>
          </div>
          <div>
            <span className="text-zinc-400">Setup Fee</span>
            <p className="font-bold text-white">{fmt(ia.setupFee)}</p>
          </div>
          <div>
            <span className="text-zinc-400">DDIA Required</span>
            <p className="font-medium text-white">{ia.ddiaRequired ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <span className="text-zinc-400">Financial Disclosure</span>
            <p className="font-medium text-white">
              {ia.financialDisclosureRequired ? 'Required' : 'Not Required'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/forms/form-9465')}
        className="w-full rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
      >
        Proceed with {IA_TYPE_LABELS[ia.recommendedType] ?? 'IA'}
      </button>
    </div>
  )
}

function OICDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const oic = result.oic as {
    minimumOffer: number
    rcpLumpSum: number
    rcpPeriodic: number
    applicationFee: number
    isLowIncome: boolean
    feeWaived: boolean
    initialPaymentLumpSum: number
    initialPaymentPeriodic: number
  }
  const nre = (result.nre as { totalNRE: number }).totalNRE
  const mdi = (result.mdi as { mdi: number }).mdi

  return (
    <div className="space-y-6">
      {/* Calculation breakdown */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-bold text-white">OIC Calculation</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Net Realizable Equity (NRE)</span>
            <span className="text-white">{fmt(nre)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">+ Future Income (12 mo)</span>
            <span className="text-white">{fmt(Math.max(0, mdi) * 12)}</span>
          </div>
          <div className="border-t border-zinc-800 pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-white">= Minimum Offer (Lump Sum)</span>
              <span className="text-emerald-400">{fmt(oic.rcpLumpSum)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lump Sum vs Periodic */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="mb-2 text-sm font-medium text-zinc-300">Lump Sum</h3>
          <p className="text-xl font-bold text-white">{fmt(oic.rcpLumpSum)}</p>
          <p className="mt-1 text-xs text-zinc-500">
            Pay within 5 months. 20% initial payment: {fmt(oic.initialPaymentLumpSum)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="mb-2 text-sm font-medium text-zinc-300">Periodic</h3>
          <p className="text-xl font-bold text-white">{fmt(oic.rcpPeriodic)}</p>
          <p className="mt-1 text-xs text-zinc-500">
            Pay over 6-24 months. First payment: {fmt(oic.initialPaymentPeriodic)}
          </p>
        </div>
      </div>

      {/* Low-income notice */}
      {oic.isLowIncome && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-400">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <p className="text-sm font-medium text-emerald-300">Low-Income Fee Waiver</p>
            <p className="text-xs text-emerald-400/70">
              The {fmt(oic.applicationFee)} application fee and initial payment are waived.
            </p>
          </div>
        </div>
      )}

      {/* Compliance warning */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-400">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <p className="text-sm font-medium text-amber-300">5-Year Compliance Requirement</p>
          <p className="text-xs text-amber-400/70">
            If accepted, you must remain in full compliance with all filing and payment
            obligations for 5 years. Failure to comply will default the agreement and reinstate
            the original debt.
          </p>
        </div>
      </div>

      <button
        onClick={() => router.push('/forms/form-656')}
        className="w-full rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
      >
        Proceed with OIC
      </button>
    </div>
  )
}

function CNCDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const mdi = (result.mdi as { mdi: number }).mdi
  const nre = (result.nre as { totalNRE: number }).totalNRE

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-bold text-white">Why CNC Is Recommended</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-zinc-300">
              Monthly Disposable Income: {fmt(mdi)} (at or below $0)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-zinc-300">
              Minimal realizable asset equity: {fmt(nre)}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-3 font-semibold text-white">What CNC Means</h3>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
            The IRS temporarily pauses all collection activity on your account.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
            The 10-year Collection Statute (CSED) continues to run, meaning your debt may
            eventually expire.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
            No monthly payments are required while in CNC status.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
            The IRS may review your financial situation annually and remove CNC status if
            your income improves.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            Penalties and interest continue to accrue while in CNC status.
          </li>
        </ul>
      </div>

      <button
        onClick={() => router.push('/forms/form-433f')}
        className="w-full rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
      >
        Request CNC
      </button>
    </div>
  )
}

function PenaltyDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const penalties = (result.penalties as {
    taxYear: number
    ftfAmount: number
    ftpAmount: number
    totalPenalties: number
    ftaEligible: boolean
  }[]) ?? []

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-bold text-white">Penalty Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                <th className="pb-3 pr-4">Year</th>
                <th className="pb-3 pr-4 text-right">FTF</th>
                <th className="pb-3 pr-4 text-right">FTP</th>
                <th className="pb-3 pr-4 text-right">Total</th>
                <th className="pb-3">FTA Eligible</th>
              </tr>
            </thead>
            <tbody>
              {penalties.map((p) => (
                <tr key={p.taxYear} className="border-b border-zinc-800/50">
                  <td className="py-3 pr-4 font-medium text-white">{p.taxYear}</td>
                  <td className="py-3 pr-4 text-right text-zinc-300">{fmt(p.ftfAmount)}</td>
                  <td className="py-3 pr-4 text-right text-zinc-300">{fmt(p.ftpAmount)}</td>
                  <td className="py-3 pr-4 text-right font-medium text-white">
                    {fmt(p.totalPenalties)}
                  </td>
                  <td className="py-3">
                    {p.ftaEligible ? (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-xs text-red-400">
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FTA info */}
      {penalties.some((p) => p.ftaEligible) && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <h3 className="mb-2 font-semibold text-emerald-300">First-Time Abatement Eligible</h3>
          <p className="text-sm text-emerald-400/70">
            You have no penalties of the same type in the prior 3 tax years. The IRS may
            abate penalties under their administrative waiver (IRM 20.1.1.3.3.2.1).
          </p>
        </div>
      )}

      {/* Reasonable cause */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-2 font-semibold text-white">Reasonable Cause Assessment</h3>
        <p className="text-sm text-zinc-400">
          If FTA does not apply, you may request abatement based on reasonable cause. Common
          grounds include serious illness, natural disaster, death in the family, fire or
          casualty loss, inability to obtain records, or IRS error.
        </p>
      </div>

      <button
        onClick={() => router.push('/forms/form-843')}
        className="w-full rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
      >
        File Abatement Request
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function DetailPage() {
  const params = useParams()
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as Record<string, unknown> | undefined

  const type = params.type as string

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">No Results</h1>
          <p className="mt-2 text-sm text-zinc-400">Run your analysis first to see details.</p>
          <button
            onClick={() => router.push('/analysis/results')}
            className="mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Back to Results
          </button>
        </div>
      </div>
    )
  }

  const titles: Record<string, string> = {
    ia: 'Installment Agreement Detail',
    oic: 'Offer in Compromise Detail',
    cnc: 'Currently Not Collectible Detail',
    penalty: 'Penalty Abatement Detail',
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back link */}
        <button
          onClick={() => router.push('/analysis/results')}
          className="mb-6 flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Results
        </button>

        <h1 className="mb-6 text-2xl font-bold text-white">
          {titles[type] ?? 'Resolution Detail'}
        </h1>

        {type === 'ia' && <IADetail result={result} />}
        {type === 'oic' && <OICDetail result={result} />}
        {type === 'cnc' && <CNCDetail result={result} />}
        {type === 'penalty' && <PenaltyDetail result={result} />}
      </div>
    </div>
  )
}
