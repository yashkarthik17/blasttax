'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import { runCalculationPipeline } from '@/lib/calculations'
import type { CalculationInput, AssetPortfolio } from '@/lib/calculations/types'

const STEPS = [
  { label: 'Calculating assets...', duration: 800 },
  { label: 'Computing income & expenses...', duration: 1000 },
  { label: 'Evaluating resolution programs...', duration: 1200 },
  { label: 'Generating results...', duration: 600 },
]

export default function ProcessingPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const setAnswers = useWizard((s) => s.setAnswers)

  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState(false)
  const hasStarted = useRef(false)

  async function runAnalysis() {
    setError(null)
    setRetrying(false)

    // Step through visual progress
    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStep(i)
      await new Promise((r) => setTimeout(r, STEPS[i].duration))
    }

    try {
      // Build calculation input from wizard answers
      const assets: AssetPortfolio = {
        bankAccounts: (answers.bankAccounts ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `bank-${i}`, balance: Number(a.balance) || 0, isJoint: !!a.isJoint,
        })),
        investments: (answers.investments ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `inv-${i}`, currentValue: Number(a.currentValue) || 0, loanBalance: Number(a.loanBalance) || 0, isLiquid: a.isLiquid !== false,
        })),
        retirementAccounts: (answers.retirementAccounts ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `ret-${i}`, currentValue: Number(a.balance) || 0, loanBalance: Number(a.loanBalance) || 0,
          ownerAge: Number(a.ownerAge) || 40, earlyWithdrawalPenaltyPct: 10, estimatedTaxRatePct: 25,
        })),
        realEstate: (answers.realEstate ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `re-${i}`, fmv: Number(a.fmv) || 0, mortgageBalance: Number(a.mortgageBalance) || 0,
          helocBalance: Number(a.helocBalance) || 0, isJoint: !!a.isJoint,
        })),
        vehicles: (answers.vehicles ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `veh-${i}`, fmv: Number(a.fmv) || 0, loanBalance: Number(a.loanBalance) || 0,
        })),
        lifeInsurance: (answers.lifeInsurance ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `li-${i}`, policyType: (a.policyType as 'Whole' | 'Universal' | 'Term') ?? 'Whole',
          cashSurrenderValue: Number(a.cashSurrenderValue) || 0, policyLoans: Number(a.policyLoans) || 0,
        })),
        cryptoAssets: (answers.cryptoAssets ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `crypto-${i}`, estimatedValue: Number(a.estimatedValue) || 0,
        })),
        otherAssets: (answers.otherAssets ?? []).map((a: Record<string, unknown>, i: number) => ({
          id: `other-${i}`, estimatedValue: Number(a.estimatedValue) || 0, loanBalance: Number(a.loanBalance) || 0,
        })),
      }

      const income = (answers.incomeRecords ?? []).map((r: Record<string, unknown>) => ({
        person: (r.person as 'taxpayer' | 'spouse') ?? 'taxpayer',
        incomeType: String(r.incomeType ?? 'Wages'),
        grossMonthly: Number(r.grossMonthly) || 0,
        federalWithholding: Number(r.federalWithholding) || 0,
        stateWithholding: Number(r.stateWithholding) || 0,
        ficaWithholding: Number(r.ficaWithholding) || 0,
      }))

      const expenses = (answers.expenseRecords ?? []).map((r: Record<string, unknown>) => ({
        category: r.category as string ?? 'Other',
        actualAmount: Number(r.actualAmount) || 0,
      }))

      const taxDebts = (answers.taxDebts ?? []).map((d: Record<string, unknown>, i: number) => ({
        id: `debt-${i}`,
        taxYear: Number(d.taxYear) || 2024,
        taxForm: String(d.taxForm ?? '1040'),
        balance: Number(d.balance) || 0,
        taxPrincipal: Number(d.taxPrincipal) || Number(d.balance) || 0,
        penaltyAmount: Number(d.penaltyAmount) || 0,
        interestAmount: Number(d.interestAmount) || 0,
        assessmentDate: String(d.assessmentDate ?? '2024-01-01'),
        isSfr: !!d.isSfr,
      }))

      const household = {
        familySize: Number(answers.familySize) || 1,
        membersUnder17: Number(answers.membersUnder17) || 0,
        members65Plus: Number(answers.members65Plus) || 0,
        state: String(answers.state ?? 'TX'),
        county: String(answers.county ?? ''),
        censusRegion: (answers.censusRegion as 'northeast' | 'midwest' | 'south' | 'west') ?? 'south',
        numVehicles: Number(answers.numVehicles) || 0,
        housingType: (answers.housingType as 'Own' | 'Rent' | 'Other') ?? 'Rent',
        grossMonthlyIncomeBracket: String(answers.grossMonthlyIncomeBracket ?? '$4,167-$5,832'),
      }

      const preQualifier = {
        allReturnsFiled: answers.allReturnsFiled ?? true,
        inBankruptcy: answers.inBankruptcy ?? false,
        estimatedPaymentsCurrent: answers.estimatedPaymentsCurrent ?? true,
        auditOpen: answers.auditOpen ?? false,
        hasActiveIA: answers.hasActiveIA ?? false,
        oicPending: answers.oicPending ?? false,
        hasPriorPenalties: answers.hasPriorPenalties ?? false,
        cncStatus: answers.cncStatus ?? false,
        hasNFTL: answers.hasNFTL ?? false,
        levyNotice: answers.levyNotice ?? false,
        activeGarnishment: answers.activeGarnishment ?? false,
        bankLevy: answers.bankLevy ?? false,
        usCitizen: answers.usCitizen ?? true,
        livingAbroad: answers.livingAbroad ?? false,
        assetTransfers: answers.assetTransfers ?? false,
        stateReturns: answers.stateReturns ?? false,
      }

      const calculationInput: CalculationInput = {
        assets,
        income,
        expenses,
        taxDebts,
        tollingEvents: {},
        household,
        preQualifier,
        filingStatus: String(answers.filingStatus ?? 'Single'),
        taxpayerType: answers.taxpayerType ?? 'Individual',
      }

      // Run calculation engine client-side
      const results = runCalculationPipeline(calculationInput)
      setAnswers({ calculationResult: results })
      router.push('/analysis/results')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred'
      console.error('Calculation error:', err)
      setError(msg)
    }
  }

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    runAnalysis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRetry() {
    setRetrying(true)
    hasStarted.current = false
    setCurrentStep(0)
    runAnalysis()
  }

  const progress = error ? 100 : Math.round(((currentStep + 1) / STEPS.length) * 100)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-center">
        {!error && (
          <div className="mb-8 flex justify-center">
            <div className="relative h-20 w-20">
              <svg className="h-20 w-20" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 213.6} 213.6`}
                  className="origin-center -rotate-90 transition-all duration-500" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#0A1628]">{progress}%</span>
            </div>
          </div>
        )}

        <h1 className="mb-2 text-2xl font-bold text-[#0A1628]">
          {error ? 'Something went wrong' : 'Analyzing Your Case'}
        </h1>
        <p className="mb-8 text-sm text-[#64748B]">
          {error ? 'We encountered an error while processing your data.' : 'Please wait while we crunch the numbers...'}
        </p>

        {!error && (
          <div className="space-y-3 text-left">
            {STEPS.map((step, i) => {
              const status = i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending'
              return (
                <div key={step.label} className="flex items-center gap-3">
                  {status === 'done' ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00A651]/15">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A651]"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  ) : status === 'active' ? (
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-[#E2E8F0]" />
                    </div>
                  )}
                  <span className={`text-sm ${status === 'done' ? 'text-[#64748B]' : status === 'active' ? 'font-medium text-[#0A1628]' : 'text-[#94A3B8]'}`}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-sm text-[#E63946]">{error}</p>
            </div>
            <button onClick={handleRetry} disabled={retrying}
              className="w-full rounded-xl bg-[#00A651] py-4 text-base font-semibold text-white transition-colors hover:bg-[#008C44] disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]">
              {retrying ? 'Retrying...' : 'Retry Analysis'}
            </button>
            <button onClick={() => router.push('/analysis/verification')}
              className="w-full rounded-xl border border-[#E2E8F0] py-3 text-sm font-medium text-[#64748B] hover:border-[#E2E8F0] hover:text-[#0A1628]">
              Go Back and Review Data
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
