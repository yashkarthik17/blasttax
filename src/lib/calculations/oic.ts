/**
 * Offer in Compromise (OIC) Calculator
 *
 * Per IRS guidelines (IRM 5.8), an Offer in Compromise allows a taxpayer to
 * settle their tax debt for less than the full amount owed. The IRS considers
 * three grounds for an OIC:
 *
 * 1. **Doubt as to Collectibility (DATC)** — The taxpayer's assets and income
 *    are insufficient to pay the full liability before the CSED expires.
 *    This is the most common basis and the primary focus of this calculator.
 *
 * 2. **Doubt as to Liability (DATL)** — The taxpayer disputes whether the
 *    assessed liability is correct.
 *
 * 3. **Effective Tax Administration (ETA)** — Collection is possible but would
 *    create economic hardship or be inequitable.
 *
 * The minimum acceptable offer under DATC is the Reasonable Collection
 * Potential (RCP), which combines Net Realizable Equity (NRE) with future
 * income projections under either a lump-sum or periodic payment scenario.
 *
 * This module computes the minimum offer amounts, application fees, initial
 * payments, and low-income fee waiver eligibility.
 */

import type { OICResult, PreQualifierAnswers } from '@/lib/calculations/types';

import { IRS_2026 } from '@/lib/calculations/constants';

/**
 * Returns the 250% Federal Poverty Level threshold for the given family size.
 *
 * The IRS uses 250% of FPL to determine low-income status for OIC applicants.
 * Low-income taxpayers are exempt from the $205 application fee and the 20%
 * initial lump-sum payment requirement.
 *
 * @param familySize - Number of persons in the taxpayer's household.
 * @returns Annual income threshold at 250% FPL for the given family size.
 *
 * @remarks
 * IRS basis: IRM 5.8.1.2 — Low-income determination uses HHS poverty guidelines
 * at 250%. For family sizes above 4, each additional person adds $14,200 (2026).
 */
function getFPL250(familySize: number): number {
  const fpl = IRS_2026.FPL_250;

  if (familySize <= 0) return fpl[1];
  if (familySize === 1) return fpl[1];
  if (familySize === 2) return fpl[2];
  if (familySize === 3) return fpl[3];
  if (familySize === 4) return fpl[4];

  // Family size > 4: base for 4 + perAdditional for each additional member
  return fpl[4] + (familySize - 4) * fpl.perAdditional;
}

/**
 * Pre-qualification check results for OIC (DATC basis).
 * All conditions must be met for the IRS to consider the offer.
 */
interface OICPreQualCheck {
  /** Whether all pre-qualification criteria are satisfied. */
  passed: boolean;
  /** Human-readable reasons for any failed criteria. */
  failureReasons: string[];
}

/**
 * Evaluates pre-qualification criteria for an OIC under Doubt as to
 * Collectibility (DATC). All five conditions must be true.
 *
 * @param preQualifier - The taxpayer's pre-qualification answers.
 * @returns An object indicating pass/fail and any failure reasons.
 *
 * @remarks
 * IRS basis: IRM 5.8.1.3 — The IRS will return an OIC without consideration
 * if any of these processability requirements are not met.
 */
function checkOICPreQualification(preQualifier: PreQualifierAnswers): OICPreQualCheck {
  const failureReasons: string[] = [];

  if (!preQualifier.allReturnsFiled) {
    failureReasons.push(
      'All required tax returns must be filed before the IRS will process an OIC'
    );
  }

  if (preQualifier.inBankruptcy) {
    failureReasons.push(
      'OIC cannot be submitted while the taxpayer is in an active bankruptcy proceeding'
    );
  }

  if (!preQualifier.estimatedPaymentsCurrent) {
    failureReasons.push(
      'Estimated tax payments for the current year must be current before submitting an OIC'
    );
  }

  if (preQualifier.auditOpen) {
    failureReasons.push(
      'An open audit/examination must be resolved before the IRS will consider an OIC'
    );
  }

  if (preQualifier.oicPending) {
    failureReasons.push(
      'A pending OIC must be withdrawn or closed before submitting a new offer'
    );
  }

  return {
    passed: failureReasons.length === 0,
    failureReasons,
  };
}

/**
 * Calculates the Offer in Compromise amounts under both lump-sum and periodic
 * payment scenarios, determines low-income fee waiver eligibility, and
 * evaluates pre-qualification for DATC.
 *
 * @param rcpLumpSum - The taxpayer's Reasonable Collection Potential under the
 *                     lump-sum offer scenario (NRE + 12 months of MDI).
 * @param rcpPeriodic - The taxpayer's Reasonable Collection Potential under the
 *                      periodic payment scenario (NRE + 24 months of MDI).
 * @param totalDebt - The taxpayer's total assessed tax liability.
 * @param annualIncome - The taxpayer's gross annual household income, used to
 *                       determine low-income status.
 * @param familySize - Number of persons in the taxpayer's household.
 * @param preQualifier - Pre-qualification answers for processability checks.
 * @returns An OICResult containing minimum offer amounts, fees, initial payment
 *          requirements, and low-income determination.
 *
 * @remarks
 * **Lump Sum Offer (IRM 5.8.1.2.1):**
 * - Paid within 5 months of acceptance.
 * - Minimum offer = RCP (lump sum).
 * - 20% initial payment submitted with Form 656 + $205 application fee.
 *
 * **Periodic Payment Offer (IRM 5.8.1.2.2):**
 * - Paid within 6-24 months of acceptance.
 * - Minimum offer = RCP (periodic).
 * - First proposed monthly payment submitted with Form 656 + $205 fee.
 * - Taxpayer must continue making proposed payments while the IRS evaluates.
 *
 * **Low-Income Exception (IRM 5.8.1.2):**
 * - If the taxpayer's annual income is at or below 250% of FPL, the $205
 *   application fee is waived and the 20% initial payment is not required.
 *
 * Note: Even if pre-qualification checks fail, the function still returns
 * computed OIC amounts for display and comparison purposes.
 *
 * @example
 * ```ts
 * const oicResult = calculateOIC(15000, 25000, 80000, 42000, 3, preQualifier);
 * console.log(`Minimum lump-sum offer: $${oicResult.minimumOffer}`);
 * console.log(`Application fee: $${oicResult.applicationFee}`);
 * console.log(`Low income waiver: ${oicResult.feeWaived}`);
 * ```
 */
export function calculateOIC(
  rcpLumpSum: number,
  rcpPeriodic: number,
  totalDebt: number,
  annualIncome: number,
  familySize: number,
  preQualifier: PreQualifierAnswers
): OICResult {
  /**
   * Minimum acceptable offer = RCP under lump-sum scenario (default).
   * IRM 5.8.4.2 — The IRS generally will not accept an offer below the RCP
   * unless there is a compelling reason under ETA or DATL.
   */
  const minimumOffer = rcpLumpSum;

  /**
   * Application fee per IRS Form 656 instructions.
   * This is a flat, non-refundable fee required with every OIC submission.
   */
  const applicationFee = IRS_2026.OIC_APPLICATION_FEE;

  /**
   * Low-income determination: compare annual household income against
   * 250% of the Federal Poverty Level for the taxpayer's family size.
   * IRM 5.8.1.2 — Low-income taxpayers receive fee and initial payment waivers.
   */
  const fpl250Threshold = getFPL250(familySize);
  const isLowIncome = annualIncome <= fpl250Threshold;

  /**
   * Fee waiver: low-income taxpayers are exempt from the $205 application fee.
   */
  const feeWaived = isLowIncome;

  /**
   * Lump Sum initial payment: 20% of the RCP (lump sum) submitted with the
   * application. Waived for low-income taxpayers.
   * IRM 5.8.1.2.1(3) — Non-refundable payment applied to the tax liability.
   */
  const initialPaymentLumpSum = isLowIncome ? 0 : rcpLumpSum * 0.2;

  /**
   * Periodic Payment initial payment: the first proposed monthly installment,
   * computed as the total periodic RCP divided across 24 months.
   * Waived for low-income taxpayers.
   * IRM 5.8.1.2.2(3) — Taxpayer must continue monthly payments while IRS
   * evaluates the offer.
   */
  const initialPaymentPeriodic = isLowIncome ? 0 : rcpPeriodic / 24;

  /**
   * Run pre-qualification checks. These are evaluated for informational
   * purposes — results are not factored into the computed amounts but
   * should be surfaced in the UI to guide the taxpayer.
   */
  const _preQualCheck = checkOICPreQualification(preQualifier);

  return {
    minimumOffer,
    rcpLumpSum,
    rcpPeriodic,
    applicationFee,
    isLowIncome,
    feeWaived,
    initialPaymentLumpSum,
    initialPaymentPeriodic,
  };
}
