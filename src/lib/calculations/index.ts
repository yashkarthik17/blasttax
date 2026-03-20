import { calculateQSV } from './qsv'
import { calculateNRE } from './nre'
import { calculateMDI } from './mdi'
import { calculateRCP } from './rcp'
import { calculateCSED } from './csed'
import { calculateIA } from './ia'
import { calculateOIC } from './oic'
import { calculatePenalties } from './penalty'
import { calculateEligibility } from './eligibility'
import type { CalculationInput, CalculationOutput } from './types'

export function runCalculationPipeline(input: CalculationInput): CalculationOutput {
  const totalDebt = input.taxDebts.reduce((sum, d) => sum + d.balance, 0)
  const totalAnnualIncome = input.income.reduce((sum, i) => sum + i.grossMonthly * 12, 0)

  // 1. QSV per asset
  const qsvResults = calculateQSV(input.assets)

  // 2. NRE
  const nreResult = calculateNRE(qsvResults)

  // 3. CSED
  const csedResults = calculateCSED(input.taxDebts, input.tollingEvents)
  const earliestCSEDMonths = csedResults.length > 0
    ? Math.min(...csedResults.filter(c => !c.isExpired).map(c => c.remainingMonths))
    : 120

  // 4. MDI
  const mdiResult = calculateMDI(input.income, input.expenses, input.household)

  // 5. RCP
  const rcpResult = calculateRCP(nreResult.totalNRE, mdiResult.mdi)

  // 6. IA
  const iaResult = calculateIA(totalDebt, mdiResult.mdi, earliestCSEDMonths, input.preQualifier, input.taxDebts.length)

  // 7. OIC
  const oicResult = calculateOIC(rcpResult.rcpLumpSum, rcpResult.rcpPeriodic, totalDebt, totalAnnualIncome, input.household.familySize, input.preQualifier)

  // 8. Penalties
  const penaltyResults = calculatePenalties(input.taxDebts)

  // 9. Eligibility
  const eligibilityResults = calculateEligibility(input, nreResult.totalNRE, mdiResult.mdi, rcpResult.rcpLumpSum, rcpResult.rcpPeriodic, totalDebt, earliestCSEDMonths)

  // 10. Low-income check
  const { getFPL250 } = require('./standards')
  const isLowIncome = totalAnnualIncome <= getFPL250(input.household.familySize)

  return {
    nre: nreResult, mdi: mdiResult, rcp: rcpResult, csed: csedResults,
    ia: iaResult, oic: oicResult, penalties: penaltyResults,
    eligibility: eligibilityResults, isLowIncome, totalDebt,
    computedAt: new Date().toISOString(),
  }
}
