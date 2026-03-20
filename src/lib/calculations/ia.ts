/**
 * Installment Agreement (IA) Type Selection & Payment Calculator
 *
 * Per IRS guidelines (IRM 5.14), an Installment Agreement allows a taxpayer
 * to pay their tax liability over time rather than in a single lump sum.
 * The IRS offers several tiers of IAs, each with different balance thresholds,
 * maximum terms, financial disclosure requirements, and setup fees.
 *
 * This module evaluates all seven IA tiers in priority order, determines
 * eligibility for each, computes the minimum monthly payment, and recommends
 * the most favorable option the taxpayer qualifies for.
 *
 * Tiers (evaluated top-to-bottom, first eligible wins):
 * 1. Short-Term Payment Plan (IRM 5.14.5.2)
 * 2. Guaranteed Installment Agreement (IRC 6159(c))
 * 3. Streamlined Installment Agreement (IRM 5.14.5.3)
 * 4. Expanded Streamlined Installment Agreement (IRM 5.14.5.3.1)
 * 5. Non-Streamlined Installment Agreement (IRM 5.14.5.4)
 * 6. Regular Installment Agreement (IRM 5.14.1)
 * 7. Partial Pay Installment Agreement — PPIA (IRC 6159(a))
 */

import type {
  IAResult,
  IAType,
  IATypeAnalysis,
  PreQualifierAnswers,
} from '@/lib/calculations/types';

import { IRS_2026 } from '@/lib/calculations/constants';

/**
 * Evaluates all seven Installment Agreement tiers for a taxpayer and returns
 * the recommended (most favorable) option along with analysis of every tier.
 *
 * @param totalDebt - The taxpayer's total assessed tax liability including
 *                    principal, penalties, and interest.
 * @param mdi - Monthly Disposable Income (gross income minus IRS-allowable
 *              living expenses).
 * @param earliestCSEDMonths - Number of months remaining until the earliest
 *                             Collection Statute Expiration Date across all
 *                             tax periods. All IA terms are capped at this.
 * @param preQualifier - Taxpayer's pre-qualification answers (filing status,
 *                       bankruptcy, active IA, etc.).
 * @param taxDebtCount - Number of distinct tax periods with outstanding
 *                       balances (used for informational notes).
 * @returns An IAResult with the recommended IA type, computed payment details,
 *          and a full analysis of every tier.
 *
 * @remarks
 * The function always populates `allTypes` with all seven tiers regardless
 * of eligibility so the UI can display why certain options are unavailable.
 *
 * Setup fees default to the Online DDIA rate ($22 for 2026) unless the tier
 * does not support or require DDIA, in which case the standard online rate
 * ($69) is used.
 *
 * @example
 * ```ts
 * const iaResult = calculateIA(45000, 800, 96, preQualifier, 3);
 * console.log(`Recommended: ${iaResult.recommendedType}`);
 * console.log(`Monthly payment: $${iaResult.monthlyPayment}`);
 * ```
 */
export function calculateIA(
  totalDebt: number,
  mdi: number,
  earliestCSEDMonths: number,
  preQualifier: PreQualifierAnswers,
  taxDebtCount: number
): IAResult {
  const allTypes: IATypeAnalysis[] = [];

  // ──────────────────────────────────────────────────────────────────────
  // Tier 1: Short-Term Payment Plan
  // IRM 5.14.5.2 — Balance <= $100K, full pay within 180 days (6 months).
  // No financial statement required. No setup fee for online requests.
  // ──────────────────────────────────────────────────────────────────────
  const shortTermEligible =
    totalDebt <= IRS_2026.EXPANDED_IA_MAX &&
    preQualifier.allReturnsFiled &&
    !preQualifier.inBankruptcy &&
    !preQualifier.oicPending;

  const shortTermPayment = totalDebt / 6;
  const shortTermReasons: string[] = [];

  if (totalDebt > IRS_2026.EXPANDED_IA_MAX) {
    shortTermReasons.push(`Balance ($${totalDebt.toLocaleString()}) exceeds $100,000 limit`);
  }
  if (!preQualifier.allReturnsFiled) {
    shortTermReasons.push('All tax returns must be filed');
  }
  if (preQualifier.inBankruptcy) {
    shortTermReasons.push('Cannot establish while in active bankruptcy');
  }
  if (preQualifier.oicPending) {
    shortTermReasons.push('Cannot establish while OIC is pending');
  }
  if (shortTermEligible) {
    shortTermReasons.push('Balance qualifies for short-term full-pay plan (180 days)');
  }

  allTypes.push({
    type: 'ShortTermPlan',
    eligible: shortTermEligible,
    monthlyPayment: shortTermEligible ? shortTermPayment : 0,
    termMonths: shortTermEligible ? 6 : 0,
    reasons: shortTermReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Tier 2: Guaranteed Installment Agreement
  // IRC 6159(c) — Tax principal <= $10K, max 36 months. No financial
  // statement required. Must have filed all returns for 5 years, no
  // active IA in past 5 years, and not in bankruptcy.
  // ──────────────────────────────────────────────────────────────────────
  const guaranteedEligible =
    totalDebt <= IRS_2026.GUARANTEED_IA_MAX &&
    preQualifier.allReturnsFiled &&
    !preQualifier.hasActiveIA &&
    !preQualifier.inBankruptcy;

  const guaranteedTerm = Math.min(IRS_2026.IA_TERMS.guaranteed, earliestCSEDMonths);
  const guaranteedPayment = guaranteedTerm > 0 ? totalDebt / guaranteedTerm : 0;
  const guaranteedReasons: string[] = [];

  if (totalDebt > IRS_2026.GUARANTEED_IA_MAX) {
    guaranteedReasons.push(
      `Balance ($${totalDebt.toLocaleString()}) exceeds $10,000 tax principal limit`
    );
  }
  if (!preQualifier.allReturnsFiled) {
    guaranteedReasons.push('All returns must have been filed for past 5 years');
  }
  if (preQualifier.hasActiveIA) {
    guaranteedReasons.push('Cannot have had an IA in the past 5 years');
  }
  if (preQualifier.inBankruptcy) {
    guaranteedReasons.push('Cannot establish while in active bankruptcy');
  }
  if (guaranteedEligible) {
    guaranteedReasons.push(
      `IRS is required by law to accept this IA (IRC 6159(c)); term = ${guaranteedTerm} months`
    );
  }

  allTypes.push({
    type: 'GuaranteedIA',
    eligible: guaranteedEligible,
    monthlyPayment: guaranteedEligible ? guaranteedPayment : 0,
    termMonths: guaranteedEligible ? guaranteedTerm : 0,
    reasons: guaranteedReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Tier 3: Streamlined Installment Agreement
  // IRM 5.14.5.3 — Assessed balance <= $50K, max 72 months.
  // DDIA required if balance is between $25K and $50K.
  // No financial statement (433-F) required.
  // ──────────────────────────────────────────────────────────────────────
  const streamlinedEligible =
    totalDebt <= IRS_2026.STREAMLINED_IA_MAX &&
    preQualifier.allReturnsFiled &&
    !preQualifier.inBankruptcy;

  const streamlinedTerm = Math.min(IRS_2026.IA_TERMS.streamlined, earliestCSEDMonths);
  const streamlinedPayment = streamlinedTerm > 0 ? totalDebt / streamlinedTerm : 0;
  const streamlinedDDIA = totalDebt > IRS_2026.DDIA_REQUIRED_THRESHOLD;
  const streamlinedReasons: string[] = [];

  if (totalDebt > IRS_2026.STREAMLINED_IA_MAX) {
    streamlinedReasons.push(`Balance ($${totalDebt.toLocaleString()}) exceeds $50,000 limit`);
  }
  if (!preQualifier.allReturnsFiled) {
    streamlinedReasons.push('All tax returns must be filed');
  }
  if (preQualifier.inBankruptcy) {
    streamlinedReasons.push('Cannot establish while in active bankruptcy');
  }
  if (streamlinedEligible) {
    streamlinedReasons.push(
      `Qualifies for streamlined IA; term = ${streamlinedTerm} months` +
        (streamlinedDDIA ? ' (DDIA required for balance > $25K)' : '')
    );
  }

  allTypes.push({
    type: 'StreamlinedIA',
    eligible: streamlinedEligible,
    monthlyPayment: streamlinedEligible ? streamlinedPayment : 0,
    termMonths: streamlinedEligible ? streamlinedTerm : 0,
    reasons: streamlinedReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Tier 4: Expanded Streamlined Installment Agreement
  // IRM 5.14.5.3.1 — Balance $50K-$100K, max 84 months.
  // DDIA mandatory. Limited 433-F disclosure.
  // ──────────────────────────────────────────────────────────────────────
  const expandedEligible =
    totalDebt > IRS_2026.STREAMLINED_IA_MAX &&
    totalDebt <= IRS_2026.EXPANDED_IA_MAX &&
    preQualifier.allReturnsFiled &&
    !preQualifier.inBankruptcy;

  const expandedTerm = Math.min(IRS_2026.IA_TERMS.expanded, earliestCSEDMonths);
  const expandedPayment = expandedTerm > 0 ? totalDebt / expandedTerm : 0;
  const expandedReasons: string[] = [];

  if (totalDebt <= IRS_2026.STREAMLINED_IA_MAX) {
    expandedReasons.push('Balance qualifies for standard Streamlined IA instead');
  }
  if (totalDebt > IRS_2026.EXPANDED_IA_MAX) {
    expandedReasons.push(`Balance ($${totalDebt.toLocaleString()}) exceeds $100,000 limit`);
  }
  if (!preQualifier.allReturnsFiled) {
    expandedReasons.push('All tax returns must be filed');
  }
  if (preQualifier.inBankruptcy) {
    expandedReasons.push('Cannot establish while in active bankruptcy');
  }
  if (expandedEligible) {
    expandedReasons.push(
      `Qualifies for expanded streamlined IA; term = ${expandedTerm} months (DDIA mandatory)`
    );
  }

  allTypes.push({
    type: 'ExpandedStreamlinedIA',
    eligible: expandedEligible,
    monthlyPayment: expandedEligible ? expandedPayment : 0,
    termMonths: expandedEligible ? expandedTerm : 0,
    reasons: expandedReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Tier 5: Non-Streamlined Installment Agreement
  // IRM 5.14.5.4 — Balance $100K-$250K, max 120 months.
  // Full financial disclosure required if taxpayer cannot demonstrate
  // ability to full-pay within CSED.
  // ──────────────────────────────────────────────────────────────────────
  const nonStreamlinedEligible =
    totalDebt > IRS_2026.EXPANDED_IA_MAX &&
    totalDebt <= IRS_2026.NON_STREAMLINED_IA_MAX &&
    preQualifier.allReturnsFiled &&
    !preQualifier.inBankruptcy;

  const nonStreamlinedTerm = Math.min(IRS_2026.IA_TERMS.nonStreamlined, earliestCSEDMonths);
  const nonStreamlinedPayment =
    nonStreamlinedTerm > 0 ? totalDebt / nonStreamlinedTerm : 0;
  const nonStreamlinedReasons: string[] = [];

  if (totalDebt <= IRS_2026.EXPANDED_IA_MAX) {
    nonStreamlinedReasons.push('Balance qualifies for Expanded Streamlined IA instead');
  }
  if (totalDebt > IRS_2026.NON_STREAMLINED_IA_MAX) {
    nonStreamlinedReasons.push(
      `Balance ($${totalDebt.toLocaleString()}) exceeds $250,000 limit`
    );
  }
  if (!preQualifier.allReturnsFiled) {
    nonStreamlinedReasons.push('All tax returns must be filed');
  }
  if (preQualifier.inBankruptcy) {
    nonStreamlinedReasons.push('Cannot establish while in active bankruptcy');
  }
  if (nonStreamlinedEligible) {
    nonStreamlinedReasons.push(
      `Qualifies for non-streamlined IA; term = ${nonStreamlinedTerm} months. ` +
        'Full financials (433-F) may be required.'
    );
  }

  allTypes.push({
    type: 'NonStreamlinedIA',
    eligible: nonStreamlinedEligible,
    monthlyPayment: nonStreamlinedEligible ? nonStreamlinedPayment : 0,
    termMonths: nonStreamlinedEligible ? nonStreamlinedTerm : 0,
    reasons: nonStreamlinedReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Tier 6: Regular Installment Agreement
  // IRM 5.14.1 — Balance > $250K, negotiated term.
  // Full 433-A (Collection Information Statement) required.
  // Term capped at 120 months or CSED, whichever is shorter.
  // ──────────────────────────────────────────────────────────────────────
  const regularEligible =
    totalDebt > IRS_2026.NON_STREAMLINED_IA_MAX &&
    preQualifier.allReturnsFiled &&
    !preQualifier.inBankruptcy;

  const regularTerm = Math.min(120, earliestCSEDMonths);
  const regularPayment = regularTerm > 0 ? totalDebt / regularTerm : 0;
  const regularReasons: string[] = [];

  if (totalDebt <= IRS_2026.NON_STREAMLINED_IA_MAX) {
    regularReasons.push('Balance qualifies for a lower-tier IA with less disclosure');
  }
  if (!preQualifier.allReturnsFiled) {
    regularReasons.push('All tax returns must be filed');
  }
  if (preQualifier.inBankruptcy) {
    regularReasons.push('Cannot establish while in active bankruptcy');
  }
  if (regularEligible) {
    regularReasons.push(
      `Balance exceeds $250K — requires negotiated Regular IA with full 433-A; ` +
        `term = ${regularTerm} months`
    );
  }

  allTypes.push({
    type: 'RegularIA',
    eligible: regularEligible,
    monthlyPayment: regularEligible ? regularPayment : 0,
    termMonths: regularEligible ? regularTerm : 0,
    reasons: regularReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Tier 7: Partial Pay Installment Agreement (PPIA)
  // IRC 6159(a) — When the taxpayer cannot full-pay before CSED.
  // Payment = max(0, mdi). Requires Form 433-A.
  // The IRS will accept less than the full amount owed.
  // ──────────────────────────────────────────────────────────────────────
  const ppiaEligible =
    mdi * earliestCSEDMonths < totalDebt &&
    preQualifier.allReturnsFiled &&
    !preQualifier.inBankruptcy;

  const ppiaPayment = Math.max(0, mdi);
  const ppiaReasons: string[] = [];

  if (mdi * earliestCSEDMonths >= totalDebt) {
    ppiaReasons.push(
      'MDI over remaining CSED is sufficient to full-pay — standard IA is more appropriate'
    );
  }
  if (!preQualifier.allReturnsFiled) {
    ppiaReasons.push('All tax returns must be filed');
  }
  if (preQualifier.inBankruptcy) {
    ppiaReasons.push('Cannot establish while in active bankruptcy');
  }
  if (ppiaEligible) {
    ppiaReasons.push(
      `Cannot full-pay ($${(mdi * earliestCSEDMonths).toLocaleString()} potential vs ` +
        `$${totalDebt.toLocaleString()} owed). PPIA payment = $${ppiaPayment}/mo. ` +
        'Requires 433-A and biennial review.'
    );
  }

  allTypes.push({
    type: 'PPIA',
    eligible: ppiaEligible,
    monthlyPayment: ppiaEligible ? ppiaPayment : 0,
    termMonths: ppiaEligible ? earliestCSEDMonths : 0,
    reasons: ppiaReasons,
  });

  // ──────────────────────────────────────────────────────────────────────
  // Select the recommended (first eligible) tier
  // ──────────────────────────────────────────────────────────────────────
  const recommended = allTypes.find((t) => t.eligible);

  /**
   * Determine setup fee based on payment method.
   * Default assumption: Online DDIA ($22) for tiers that require or support
   * direct debit; otherwise Online non-DDIA ($69).
   */
  const recommendedType: IAType = recommended?.type ?? 'RegularIA';
  const ddiaRequired =
    recommendedType === 'ExpandedStreamlinedIA' ||
    (recommendedType === 'StreamlinedIA' && totalDebt > IRS_2026.DDIA_REQUIRED_THRESHOLD);

  const setupFee = ddiaRequired
    ? IRS_2026.IA_SETUP_FEES.onlineDDIA
    : IRS_2026.IA_SETUP_FEES.online;

  const termMonths = recommended?.termMonths ?? 0;
  const monthlyPayment = recommended?.monthlyPayment ?? 0;
  const totalPayment = monthlyPayment * termMonths;

  /**
   * Financial disclosure requirements vary by tier:
   * - ShortTermPlan, GuaranteedIA, StreamlinedIA: None
   * - ExpandedStreamlinedIA: Limited 433-F
   * - NonStreamlinedIA: Full financials if unable to full-pay
   * - RegularIA, PPIA: Full 433-A
   */
  const financialDisclosureRequired =
    recommendedType === 'ExpandedStreamlinedIA' ||
    recommendedType === 'NonStreamlinedIA' ||
    recommendedType === 'RegularIA' ||
    recommendedType === 'PPIA';

  return {
    recommendedType,
    monthlyPayment,
    termMonths,
    totalPayment,
    setupFee,
    ddiaRequired,
    financialDisclosureRequired,
    allTypes,
  };
}
