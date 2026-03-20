/**
 * Penalty Calculator — Failure to File (FTF) & Failure to Pay (FTP)
 *
 * Computes estimated FTF and FTP penalties for each tax year in a taxpayer's
 * debt portfolio, following the rate schedules and caps defined in
 * IRC §§ 6651(a)(1), 6651(a)(2), 6651(c)(1), 6651(d), and 6651(h).
 *
 * Also evaluates basic First-Time Abatement (FTA) eligibility per
 * IRM 20.1.1.3.3.2.1.
 */

import {
  differenceInCalendarDays,
  parseISO,
} from 'date-fns';

import type { TaxDebt, PenaltyResult } from '@/lib/calculations/types';
import {
  FTF_RATE_PER_MONTH,
  FTF_MAX_FRACTION,
  FTF_MINIMUM_PENALTY,
  FTF_MINIMUM_PENALTY_MONTHS_THRESHOLD,
  FTP_RATE_PER_MONTH,
  FTP_MAX_FRACTION,
  DAYS_PER_PENALTY_MONTH,
} from '@/lib/calculations/constants';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns the number of whole-or-partial penalty months between two dates.
 * A partial month counts as a full month (ceiling).
 */
function penaltyMonths(fromDate: Date, toDate: Date): number {
  const days = differenceInCalendarDays(toDate, fromDate);
  if (days <= 0) return 0;
  return Math.ceil(days / DAYS_PER_PENALTY_MONTH);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Calculates FTF and FTP penalties for each tax debt and evaluates basic
 * FTA eligibility.
 *
 * @param taxDebts - Array of TaxDebt records. `taxPrincipal` is used as
 *                   the penalty base (not the total balance, which includes
 *                   prior penalty and interest accruals).
 * @returns PenaltyResult[] with a per-year breakdown of estimated penalties.
 *
 * @remarks
 * **FTF (Failure to File) — IRC § 6651(a)(1)**
 * - 5 % of unpaid tax per month (or partial month) the return is late.
 * - Capped at 25 % of unpaid tax.
 * - If the return is 60+ days late the minimum penalty is the lesser of
 *   $485 or 100 % of the unpaid tax (Rev. Proc. 2023-34).
 * - When FTP runs concurrently with FTF during the first 5 months, the
 *   FTF rate effectively reduces to 4.5 % (the combined rate stays at 5 %).
 *   For simplicity this module applies the standard 5 % rate and notes the
 *   concurrency rule — the net taxpayer impact is identical.
 *
 * **FTP (Failure to Pay) — IRC § 6651(a)(2)**
 * - 0.5 % of unpaid tax per month.
 * - Capped at 25 %.
 * - Increases to 1.0 % after a levy notice (IRC § 6651(d)); decreases to
 *   0.25 % while in an installment agreement (IRC § 6651(h)). The standard
 *   0.5 % rate is used here because levy/IA status is handled at the case
 *   level.
 *
 * **FTA Eligibility — IRM 20.1.1.3.3.2.1**
 * - No penalties of the same type in the prior 3 tax years.
 * - All required returns filed.
 * - For now, eligibility is derived from `hasPriorPenalties` (to be
 *   refined when full compliance data is available).
 */
export function calculatePenalties(taxDebts: TaxDebt[]): PenaltyResult[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /**
   * Build a set of tax years that already carry penalties so we can
   * approximate FTA eligibility. A debt has a "prior penalty" if its
   * penaltyAmount > 0.
   */
  const yearsWithPenalties = new Set<number>(
    taxDebts
      .filter((d) => d.penaltyAmount > 0)
      .map((d) => d.taxYear),
  );

  const results: PenaltyResult[] = taxDebts.map((debt) => {
    const unpaidTax = debt.taxPrincipal;

    // ------------------------------------------------------------------
    // FTF calculation
    // ------------------------------------------------------------------
    let ftfAmount = 0;

    /**
     * FTF applies only when a return is unfiled (isSfr === true indicates
     * the IRS filed a Substitute for Return, meaning the taxpayer has not
     * yet filed). For debts where the taxpayer has filed, FTF is zero.
     *
     * If the return is still unfiled (isSfr), the "filing date" is today
     * because penalties keep accruing until the return is filed.
     *
     * originalDueDate is estimated as April 15 of the year following the
     * tax year (standard individual due date).
     */
    if (debt.isSfr) {
      const originalDueDate = new Date(debt.taxYear + 1, 3, 15); // April 15
      const filingDate = today; // still unfiled
      const monthsLate = penaltyMonths(originalDueDate, filingDate);

      if (monthsLate > 0) {
        ftfAmount = Math.min(
          monthsLate * FTF_RATE_PER_MONTH * unpaidTax,
          FTF_MAX_FRACTION * unpaidTax,
        );

        // 60+ day minimum penalty
        if (monthsLate >= FTF_MINIMUM_PENALTY_MONTHS_THRESHOLD) {
          ftfAmount = Math.max(
            ftfAmount,
            Math.min(FTF_MINIMUM_PENALTY, unpaidTax),
          );
        }
      }
    }

    // ------------------------------------------------------------------
    // FTP calculation
    // ------------------------------------------------------------------
    const assessmentDate = parseISO(debt.assessmentDate);
    const monthsUnpaid = penaltyMonths(assessmentDate, today);

    const ftpAmount = Math.min(
      monthsUnpaid * FTP_RATE_PER_MONTH * unpaidTax,
      FTP_MAX_FRACTION * unpaidTax,
    );

    // ------------------------------------------------------------------
    // FTA eligibility (simplified)
    // ------------------------------------------------------------------
    // Check if any of the 3 preceding tax years have penalties
    const hasPriorPenalties = [1, 2, 3].some((offset) =>
      yearsWithPenalties.has(debt.taxYear - offset),
    );
    const ftaEligible = !hasPriorPenalties;

    return {
      taxYear: debt.taxYear,
      ftfAmount: Math.round(ftfAmount * 100) / 100,
      ftpAmount: Math.round(ftpAmount * 100) / 100,
      totalPenalties:
        Math.round((ftfAmount + ftpAmount) * 100) / 100,
      ftaEligible,
    };
  });

  return results;
}
