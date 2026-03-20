/**
 * Net Realizable Equity (NRE) Calculator
 *
 * Per IRS guidelines (IRM 5.8.4.3), Net Realizable Equity is the total
 * amount the IRS could expect to collect from the liquidation of a
 * taxpayer's assets. It is computed as the sum of all positive Quick Sale
 * Values (QSVs) across the taxpayer's asset portfolio.
 *
 * NRE is one of the two primary components of Reasonable Collection
 * Potential (RCP), the other being future income.
 */

import type { QSVResult, NREResult } from '@/lib/calculations/types';

/**
 * Calculates the Net Realizable Equity from a set of Quick Sale Value results.
 *
 * @param qsvResults - Array of QSV results, one per asset, as produced by
 *                     the `calculateQSV` function.
 * @returns An NREResult containing the total NRE and the full QSV breakdown
 *          by asset for transparency and audit purposes.
 *
 * @remarks
 * IRS basis: IRM 5.8.4.3(1) — NRE equals the sum of all Quick Sale Values.
 * Each individual QSV is floored at zero (negative equity in a single asset
 * does not reduce the total NRE). This prevents underwater assets from
 * offsetting the realizable value of other assets.
 *
 * @example
 * ```ts
 * const qsvResults = calculateQSV(taxpayerAssets);
 * const nreResult = calculateNRE(qsvResults);
 * console.log(`Total NRE: $${nreResult.totalNRE}`);
 * ```
 */
export function calculateNRE(qsvResults: QSVResult[]): NREResult {
  /**
   * Sum all positive QSVs. Each QSV should already be >= 0 from the QSV
   * calculator, but we apply Math.max(0, ...) defensively to ensure no
   * negative values slip through and distort the total.
   */
  const totalNRE = qsvResults.reduce(
    (sum, result) => sum + Math.max(0, result.qsv),
    0
  );

  return {
    totalNRE,
    breakdown: qsvResults,
  };
}
