/**
 * Reasonable Collection Potential (RCP) Calculator
 *
 * Per IRS guidelines (IRM 5.8.4.2), Reasonable Collection Potential is the
 * total amount the IRS could reasonably expect to collect from a taxpayer.
 * It combines two components:
 *
 * 1. Net Realizable Equity (NRE) — the liquidation value of assets.
 * 2. Future Income — the taxpayer's Monthly Disposable Income (MDI)
 *    multiplied by the applicable number of months.
 *
 * The future income multiplier depends on the offer payment terms:
 * - Lump Sum (paid in 5 or fewer months): MDI * 12 months
 * - Periodic Payment (paid in 6-24 months): MDI * 24 months
 *
 * The resulting RCP figures represent the minimum acceptable offer amount
 * the IRS will consider under each payment scenario.
 */

import type { RCPResult } from '@/lib/calculations/types';

/**
 * Calculates the Reasonable Collection Potential under both lump-sum
 * and periodic payment offer scenarios.
 *
 * @param nre - The taxpayer's total Net Realizable Equity, as computed
 *              by the `calculateNRE` function.
 * @param mdi - The taxpayer's Monthly Disposable Income (gross income
 *              minus allowable living expenses per IRS Collection
 *              Financial Standards).
 * @returns An RCPResult containing NRE, future income projections under
 *          both scenarios, and the total RCP for each.
 *
 * @remarks
 * IRS basis: IRM 5.8.4.2(1) — RCP = NRE + Future Income.
 *
 * - Lump Sum Offer (IRM 5.8.1.2.1): Payment within 5 months of acceptance.
 *   Future income = MDI * 12 months.
 *
 * - Periodic Payment Offer (IRM 5.8.1.2.2): Payment within 6-24 months
 *   of acceptance. Future income = MDI * 24 months.
 *
 * If MDI is negative (expenses exceed income), future income is treated
 * as zero — the IRS does not credit negative disposable income against
 * asset equity.
 *
 * @example
 * ```ts
 * const rcpResult = calculateRCP(nreResult.totalNRE, monthlyDisposableIncome);
 * console.log(`Lump Sum RCP: $${rcpResult.rcpLumpSum}`);
 * console.log(`Periodic RCP: $${rcpResult.rcpPeriodic}`);
 * ```
 */
export function calculateRCP(nre: number, mdi: number): RCPResult {
  /**
   * Lump Sum future income: 12 months of positive MDI.
   * IRM 5.8.4.2(1)(a) — For lump sum offers, multiply the amount
   * remaining after allowable expenses by 12.
   */
  const futureIncomeLumpSum = Math.max(0, mdi) * 12;

  /**
   * Periodic Payment future income: 24 months of positive MDI.
   * IRM 5.8.4.2(1)(b) — For periodic payment offers, multiply the
   * amount remaining after allowable expenses by 24.
   */
  const futureIncomePeriodic = Math.max(0, mdi) * 24;

  /**
   * Total RCP = NRE + Future Income for each scenario.
   * This is the minimum offer amount the IRS will consider acceptable.
   */
  const rcpLumpSum = nre + futureIncomeLumpSum;
  const rcpPeriodic = nre + futureIncomePeriodic;

  return {
    nre,
    futureIncomeLumpSum,
    futureIncomePeriodic,
    rcpLumpSum,
    rcpPeriodic,
  };
}
