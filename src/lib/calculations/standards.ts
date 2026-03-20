import { IRS_2026 } from '@/lib/calculations/constants';

/**
 * Get the IRS National Standard allowance for food, clothing, and other items.
 *
 * The standard is based on family size and gross monthly income bracket.
 * For families larger than 4, each additional member adds a per-person amount.
 *
 * @param familySize - Total number of people in the household (minimum 1)
 * @param grossMonthlyIncome - Total gross monthly income of the household
 * @returns Monthly national standard allowance in dollars
 */
export function getNationalStandard(
  familySize: number,
  grossMonthlyIncome: number
): number {
  // Find the income bracket index by comparing against bracket thresholds
  const brackets = IRS_2026.INCOME_BRACKETS;
  let bracketIndex = 0;
  for (let i = 0; i < brackets.length; i++) {
    if (grossMonthlyIncome <= brackets[i].max) {
      bracketIndex = i;
      break;
    }
    // If income exceeds all brackets, use the last bracket
    if (i === brackets.length - 1) {
      bracketIndex = i;
    }
  }

  const standardRow = IRS_2026.NATIONAL_STANDARDS[bracketIndex];

  if (familySize >= 1 && familySize <= 4) {
    // Indices 0-3 correspond to family sizes 1-4
    return standardRow[familySize - 1];
  }

  // For family size > 4: base amount for 4 persons + per-additional-person amount
  // Index 3 = family of 4 amount, Index 4 = per additional person amount
  const baseForFour = standardRow[3];
  const perAdditional = standardRow[4];
  return baseForFour + (familySize - 4) * perAdditional;
}

/**
 * Get the IRS Out-of-Pocket Healthcare standard allowance.
 *
 * Different per-person amounts apply depending on whether the member
 * is under 65 or 65 and older.
 *
 * @param membersUnder65 - Number of household members under age 65
 * @param members65Plus - Number of household members aged 65 or older
 * @returns Monthly out-of-pocket healthcare standard allowance in dollars
 */
export function getHealthcareStandard(
  membersUnder65: number,
  members65Plus: number
): number {
  return (membersUnder65 * 84) + (members65Plus * 149);
}

/**
 * Get the IRS Transportation Ownership standard allowance.
 *
 * The IRS allows an ownership cost for up to 2 vehicles at $662 per vehicle.
 *
 * @param numVehicles - Number of vehicles owned by the household
 * @returns Monthly transportation ownership standard allowance in dollars
 */
export function getTransportationOwnership(numVehicles: number): number {
  return Math.min(numVehicles, 2) * 662;
}

/**
 * Regional operating cost lookup for transportation.
 * Values represent monthly per-vehicle operating costs by Census region.
 */
const OPERATING_COSTS: Record<string, number> = {
  northeast: 278,
  midwest: 233,
  south: 233,
  west: 270,
};

/**
 * Get the IRS Transportation Operating Cost standard allowance.
 *
 * Operating costs vary by Census region and apply to up to 2 vehicles.
 *
 * @param censusRegion - Census region (northeast, midwest, south, west)
 * @param numVehicles - Number of vehicles owned by the household
 * @returns Monthly transportation operating standard allowance in dollars
 */
export function getTransportationOperating(
  censusRegion: string,
  numVehicles: number
): number {
  const region = censusRegion.toLowerCase();
  const amount = OPERATING_COSTS[region] ?? 0;
  return amount * Math.min(numVehicles, 2);
}

/**
 * Regional public transportation allowance lookup.
 */
const PUBLIC_TRANSPORT_COSTS: Record<string, number> = {
  northeast: 280,
  midwest: 242,
  south: 242,
  west: 268,
};

/**
 * Get the IRS Public Transportation standard allowance.
 *
 * This allowance is used when the taxpayer does not own a vehicle.
 *
 * @param censusRegion - Census region (northeast, midwest, south, west)
 * @returns Monthly public transportation standard allowance in dollars
 */
export function getPublicTransportation(censusRegion: string): number {
  const region = censusRegion.toLowerCase();
  return PUBLIC_TRANSPORT_COSTS[region] ?? 0;
}

/**
 * Get the Census region for a given US state abbreviation.
 *
 * Uses the IRS_2026 state-to-region mapping from constants.
 *
 * @param state - Two-letter US state abbreviation (e.g. "CA", "NY")
 * @returns Census region string (northeast, midwest, south, west)
 */
export function getCensusRegion(state: string): string {
  const normalized = state.toUpperCase();
  return IRS_2026.STATE_TO_CENSUS_REGION[normalized] ?? '';
}

/**
 * Get 250% of the Federal Poverty Level for a given family size.
 *
 * This threshold determines low-income status for OIC fee waivers and
 * reduced initial payment requirements.
 *
 * @param familySize - Total number of people in the household (minimum 1)
 * @returns Annual income at 250% FPL for the given family size
 */
export function getFPL250(familySize: number): number {
  if (familySize >= 1 && familySize <= 4) {
    return IRS_2026.FPL_250[familySize as keyof typeof IRS_2026.FPL_250] as number;
  }

  // For family size > 4: base for 4 plus per-additional-person increment
  const baseForFour = IRS_2026.FPL_250[4];
  const perAdditional = IRS_2026.FPL_250.perAdditional;
  return baseForFour + (familySize - 4) * perAdditional;
}
