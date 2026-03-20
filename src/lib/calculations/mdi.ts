import type { IncomeRecord, ExpenseRecord, HouseholdInfo, MDIResult, ExpenseCategory } from '@/lib/calculations/types';
import {
  getNationalStandard,
  getHealthcareStandard,
  getTransportationOwnership,
  getTransportationOperating,
  getPublicTransportation,
} from '@/lib/calculations/standards';
import { createClient } from '@supabase/supabase-js';

/**
 * Cached local standard lookups to avoid redundant DB calls within a single
 * MDI calculation run. Keyed by "STATE|COUNTY|FAMILY_SIZE".
 */
const localStandardCache = new Map<string, number | null>();

/**
 * Look up the IRS Local Standard for housing & utilities from the database.
 *
 * Queries the irs_local_standards table for the given state, county, and family
 * size. Family size 5+ is stored as family_size = 5 in the database.
 *
 * @param state - Two-letter US state abbreviation (e.g. "CA", "NY")
 * @param county - County name as stored in the IRS tables (e.g. "Los Angeles")
 * @param familySize - Number of household members (capped at 5 for lookup)
 * @returns The local standard allowance, or null if no data found
 */
export async function getLocalHousingStandard(
  state: string,
  county: string,
  familySize: number
): Promise<number | null> {
  const effectiveFamilySize = Math.min(familySize, 5);
  const cacheKey = `${state.toUpperCase()}|${county}|${effectiveFamilySize}`;

  if (localStandardCache.has(cacheKey)) {
    return localStandardCache.get(cacheKey) ?? null;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      localStandardCache.set(cacheKey, null);
      return null;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('irs_local_standards')
      .select('allowance')
      .eq('effective_year', 2026)
      .eq('category', 'housing_and_utilities')
      .eq('state', state.toUpperCase())
      .ilike('county', county)
      .eq('family_size', effectiveFamilySize)
      .limit(1)
      .single();

    if (error || !data) {
      localStandardCache.set(cacheKey, null);
      return null;
    }

    const allowance = Number(data.allowance);
    localStandardCache.set(cacheKey, allowance);
    return allowance;
  } catch {
    localStandardCache.set(cacheKey, null);
    return null;
  }
}

/**
 * Clear the local standard cache. Should be called at the start of each
 * new MDI calculation to avoid stale data across requests.
 */
export function clearLocalStandardCache(): void {
  localStandardCache.clear();
}

/**
 * Categories where the IRS allows the full actual amount (uncapped).
 * These expenses are not limited by a national or local standard.
 *
 * NOTE: HousingUtilities was moved out of this set because it is now
 * capped against IRS Local Standards when county-level data is available.
 */
const UNCAPPED_CATEGORIES: Set<ExpenseCategory> = new Set([
  'HealthInsurance',
  'CourtOrdered',
  'ChildDependentCare',
  'TermLifeInsurance',
  'CurrentYearTaxes',
  'SecuredDebt',
  'StudentLoans',
  'UnionDues',
  'MandatoryRetirement',
]);

/**
 * Categories that are never allowed by the IRS.
 */
const DISALLOWED_CATEGORIES: Set<ExpenseCategory> = new Set([
  'Other',
]);

/**
 * Determine the IRS standard for a given expense category based on household info.
 *
 * For capped categories the standard is derived from IRS national/local standards.
 * For uncapped categories the actual amount is returned (IRS allows full amount).
 * For disallowed categories the standard is 0.
 *
 * @param category - The expense category
 * @param actualAmount - The taxpayer's actual monthly expense
 * @param totalGrossMonthlyIncome - Sum of all gross monthly income
 * @param household - Household demographic and geographic info
 * @returns The IRS standard amount for this category
 */
function getStandardForCategory(
  category: ExpenseCategory,
  actualAmount: number,
  totalGrossMonthlyIncome: number,
  household: HouseholdInfo
): number {
  // Disallowed categories get a $0 standard
  if (DISALLOWED_CATEGORIES.has(category)) {
    return 0;
  }

  // Uncapped categories allow the full actual amount
  if (UNCAPPED_CATEGORIES.has(category)) {
    return actualAmount;
  }

  // Capped categories use IRS standards
  switch (category) {
    case 'FoodClothingMisc':
      return getNationalStandard(household.familySize, totalGrossMonthlyIncome);

    case 'VehicleOwnership':
      return household.numVehicles > 0
        ? getTransportationOwnership(household.numVehicles)
        : 0;

    case 'VehicleOperating':
      return household.numVehicles > 0
        ? getTransportationOperating(household.censusRegion, household.numVehicles)
        : 0;

    case 'PublicTransportation':
      // Public transportation standard only applies when taxpayer has no vehicles
      return household.numVehicles === 0
        ? getPublicTransportation(household.censusRegion)
        : 0;

    case 'OOPHealthcare': {
      const membersUnder65 = household.familySize - household.members65Plus;
      return getHealthcareStandard(membersUnder65, household.members65Plus);
    }

    default:
      return 0;
  }
}

/**
 * Calculate Monthly Disposable Income (MDI).
 *
 * MDI determines how much income the taxpayer has remaining after IRS-allowable
 * living expenses. It is a key input for Offer in Compromise (OIC) calculations,
 * Installment Agreement (IA) payment amounts, and Currently Not Collectible (CNC)
 * determinations.
 *
 * For each expense category the allowable amount is the lesser of:
 * - The taxpayer's actual expense, or
 * - The applicable IRS standard
 *
 * Certain categories (housing, health insurance, court-ordered payments, etc.)
 * are uncapped and allowed at their full actual amount. The "Other" category
 * receives a $0 standard and is never allowed.
 *
 * @param income - Array of all income records for the household
 * @param expenses - Array of expense records with actual amounts
 * @param household - Household demographic and geographic information
 * @returns MDIResult with total income, total allowable expenses, MDI, and per-category breakdown
 */
export function calculateMDI(
  income: IncomeRecord[],
  expenses: ExpenseRecord[],
  household: HouseholdInfo
): MDIResult {
  // Step 1: Calculate total gross monthly income
  const totalIncome = income.reduce(
    (sum, record) => sum + record.grossMonthly,
    0
  );

  // Step 2: For each expense, compute the IRS standard and the allowable amount
  const expenseBreakdown: MDIResult['expenseBreakdown'] = [];

  for (const expense of expenses) {
    const standard = getStandardForCategory(
      expense.category,
      expense.actualAmount,
      totalIncome,
      household
    );

    // Allowable = lesser of actual and standard
    const allowable = Math.min(expense.actualAmount, standard);

    expenseBreakdown.push({
      category: expense.category,
      actual: expense.actualAmount,
      allowable,
      standard,
    });
  }

  // Step 3: Sum all allowable expenses
  const totalAllowableExpenses = expenseBreakdown.reduce(
    (sum, item) => sum + item.allowable,
    0
  );

  // Step 4: MDI = total income minus total allowable expenses
  const mdi = totalIncome - totalAllowableExpenses;

  // Step 5: Return the full result with breakdown
  return {
    totalIncome,
    totalAllowableExpenses,
    mdi,
    expenseBreakdown,
  };
}
