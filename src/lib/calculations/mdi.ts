import type { IncomeRecord, ExpenseRecord, HouseholdInfo, MDIResult, ExpenseCategory } from '@/lib/calculations/types'
import {
  getNationalStandard,
  getHealthcareStandard,
  getTransportationOwnership,
  getTransportationOperating,
  getPublicTransportation,
} from '@/lib/calculations/standards'

/**
 * Calculate Monthly Disposable Income (MDI)
 *
 * MDI = Total Gross Monthly Income - Total IRS Allowable Monthly Expenses
 *
 * For each expense category, the allowable amount is the lesser of:
 * - The taxpayer's actual expense
 * - The IRS standard for that category (National, Local, or uncapped)
 *
 * @param income - All income records for taxpayer (and spouse if MFJ)
 * @param expenses - All expense records with actual amounts
 * @param household - Household info for standards lookups
 * @param localHousingStandard - Optional pre-fetched local standard (from DB)
 * @returns MDIResult with income, expenses, MDI, and per-category breakdown
 */
export function calculateMDI(
  income: IncomeRecord[],
  expenses: ExpenseRecord[],
  household: HouseholdInfo,
  localHousingStandard?: number | null
): MDIResult {
  // Step 1: Calculate total gross monthly income
  const totalIncome = income.reduce(
    (sum, record) => sum + (record.grossMonthly || 0),
    0
  )

  // Step 2: For each expense, compute the IRS standard and the allowable amount
  const expenseBreakdown: MDIResult['expenseBreakdown'] = []

  for (const expense of expenses) {
    const standard = getStandardForCategory(
      expense.category,
      totalIncome,
      household,
      localHousingStandard
    )

    // Allowable = lesser of actual and standard
    const allowable = Math.min(expense.actualAmount, standard)

    expenseBreakdown.push({
      category: expense.category,
      actual: expense.actualAmount,
      allowable,
      standard,
    })
  }

  // Step 3: Sum all allowable expenses
  const totalAllowableExpenses = expenseBreakdown.reduce(
    (sum, e) => sum + e.allowable,
    0
  )

  // Step 4: MDI = Income - Allowable Expenses
  const mdi = totalIncome - totalAllowableExpenses

  return {
    totalIncome,
    totalAllowableExpenses,
    mdi,
    expenseBreakdown,
  }
}

/**
 * Get the IRS standard for a given expense category.
 *
 * Categories fall into three groups:
 * 1. Capped (National/Local Standard) - allowable = min(actual, standard)
 * 2. Uncapped - allowable = actual (health insurance, court-ordered, etc.)
 * 3. Disallowed - standard = 0 (credit cards, entertainment, etc.)
 */
function getStandardForCategory(
  category: ExpenseCategory,
  totalIncome: number,
  household: HouseholdInfo,
  localHousingStandard?: number | null
): number {
  const membersUnder65 = household.familySize - household.members65Plus

  switch (category) {
    // Capped by National Standard
    case 'FoodClothingMisc':
      return getNationalStandard(household.familySize, totalIncome)

    // Capped by Local Standard (if available) or uncapped
    case 'HousingUtilities':
      // If we have a local standard from the database, use it as the cap
      if (localHousingStandard != null && localHousingStandard > 0) {
        return localHousingStandard
      }
      // If no local standard data, allow actual (user should verify against IRS.gov)
      return Infinity

    // Capped by Transportation Standards
    case 'VehicleOwnership':
      return household.numVehicles > 0
        ? getTransportationOwnership(household.numVehicles)
        : 0

    case 'VehicleOperating':
      return household.numVehicles > 0
        ? getTransportationOperating(household.censusRegion, household.numVehicles)
        : 0

    case 'PublicTransportation':
      return household.numVehicles === 0
        ? getPublicTransportation(household.censusRegion)
        : 0

    // Capped by Healthcare Standard
    case 'OOPHealthcare':
      return getHealthcareStandard(membersUnder65, household.members65Plus)

    // Uncapped categories (actual amount is fully allowable)
    case 'HealthInsurance':
    case 'CourtOrdered':
    case 'ChildDependentCare':
    case 'TermLifeInsurance':
    case 'CurrentYearTaxes':
    case 'SecuredDebt':
    case 'StudentLoans':
    case 'UnionDues':
    case 'MandatoryRetirement':
      return Infinity // No cap — actual is allowed

    // Disallowed
    case 'Other':
    default:
      return 0
  }
}
