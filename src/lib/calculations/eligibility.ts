/**
 * Master Eligibility Engine — Resolution Program Evaluation
 *
 * This module is the core decision engine of the BlastTax calculation system.
 * It evaluates a taxpayer's eligibility across all 13 IRS resolution programs
 * and produces a ranked list of options with confidence scores, reasoning,
 * and pros/cons for each.
 *
 * The 13 programs evaluated:
 *
 * **Installment Agreements (IRM 5.14):**
 *  1. Short-Term Payment Plan
 *  2. Guaranteed IA
 *  3. Streamlined IA
 *  4. Expanded Streamlined IA
 *  5. Non-Streamlined IA
 *  6. Regular IA
 *  7. Partial Pay IA (PPIA)
 *
 * **Offers in Compromise (IRM 5.8):**
 *  8. OIC — Doubt as to Collectibility (DATC)
 *  9. OIC — Doubt as to Liability (DATL)
 * 10. OIC — Effective Tax Administration (ETA)
 *
 * **Other Resolution Options:**
 * 11. Currently Not Collectible (CNC) Status (IRM 5.16)
 * 12. Penalty Abatement — First Time Abate (FTA) (IRM 20.1.1.3.6.1)
 * 13. Penalty Abatement — Reasonable Cause (RC) (IRM 20.1.1.3)
 *
 * Results are sorted with eligible programs first (highest confidence first),
 * followed by ineligible programs, giving practitioners a clear picture of
 * the taxpayer's best resolution paths.
 */

import type {
  CalculationInput,
  EligibilityResult,
  ProgramType,
} from '@/lib/calculations/types';

import { IRS_2026 } from '@/lib/calculations/constants';

/**
 * Evaluates all 13 IRS resolution programs for the given taxpayer and returns
 * a ranked list of eligibility results.
 *
 * @param input - The full calculation input containing assets, income, expenses,
 *                tax debts, household info, pre-qualifier answers, and filing status.
 * @param nre - Net Realizable Equity — liquidation value of the taxpayer's assets.
 * @param mdi - Monthly Disposable Income — gross income minus IRS-allowable expenses.
 * @param rcpLumpSum - Reasonable Collection Potential under lump-sum offer (NRE + 12mo MDI).
 * @param rcpPeriodic - Reasonable Collection Potential under periodic offer (NRE + 24mo MDI).
 * @param totalDebt - Total assessed tax liability (principal + penalties + interest).
 * @param earliestCSEDMonths - Months remaining until the earliest CSED expiration.
 * @returns An array of EligibilityResult objects, sorted by eligibility (eligible first)
 *          then by confidence score (highest first).
 *
 * @remarks
 * Confidence scores represent how likely the IRS is to accept or approve the
 * resolution based on the taxpayer's financial profile:
 * - 0.9-1.0: Near-certain approval (e.g., Guaranteed IA meeting all criteria)
 * - 0.7-0.8: Strong likelihood (e.g., Streamlined IA within all parameters)
 * - 0.5-0.6: Moderate likelihood (e.g., OIC with RCP well below debt)
 * - 0.3-0.4: Possible but uncertain (e.g., Non-streamlined IA requiring negotiation)
 * - 0.1-0.2: Low likelihood (e.g., PPIA with minimal MDI or borderline CNC)
 *
 * @example
 * ```ts
 * const results = calculateEligibility(input, nre, mdi, rcpLS, rcpP, debt, csedMo);
 * const topOption = results[0];
 * console.log(`Best option: ${topOption.program} (${topOption.confidence * 100}% confidence)`);
 * ```
 */
export function calculateEligibility(
  input: CalculationInput,
  nre: number,
  mdi: number,
  rcpLumpSum: number,
  rcpPeriodic: number,
  totalDebt: number,
  earliestCSEDMonths: number
): EligibilityResult[] {
  const pq = input.preQualifier;
  const results: EligibilityResult[] = [];

  // ──────────────────────────────────────────────────────────────────────
  // 1. Short-Term Payment Plan
  // IRM 5.14.5.2 — Full pay within 180 days, balance <= $100K.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      totalDebt <= IRS_2026.EXPANDED_IA_MAX &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy &&
      !pq.oicPending;

    const reasons: string[] = [];
    if (totalDebt > IRS_2026.EXPANDED_IA_MAX) reasons.push('Balance exceeds $100,000');
    if (!pq.allReturnsFiled) reasons.push('All tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (pq.oicPending) reasons.push('Pending OIC disqualifies');
    if (eligible) reasons.push('Balance is within $100K and all prerequisites are met');

    const monthlyPayment = totalDebt / 6;
    const confidence = eligible ? 0.95 : 0;

    results.push({
      program: 'ShortTermPlan',
      eligible,
      confidence,
      reasons,
      advantages: [
        'No setup fee when requested online',
        'No financial disclosure required',
        'Penalties and interest continue to accrue but are minimized by the short term',
        'No Notice of Federal Tax Lien (NFTL) filed for balances under $25K',
      ],
      disadvantages: [
        'Must pay the full balance within 180 days',
        'Requires significant short-term cash flow',
        'Penalties and interest continue to accrue during the payment period',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? totalDebt : undefined,
      termMonths: eligible ? 6 : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 2. Guaranteed Installment Agreement
  // IRC 6159(c) — Tax principal <= $10K, 36 months, no financials.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      totalDebt <= IRS_2026.GUARANTEED_IA_MAX &&
      pq.allReturnsFiled &&
      !pq.hasActiveIA &&
      !pq.inBankruptcy;

    const reasons: string[] = [];
    if (totalDebt > IRS_2026.GUARANTEED_IA_MAX) reasons.push('Balance exceeds $10,000');
    if (!pq.allReturnsFiled) reasons.push('All returns must be filed for past 5 years');
    if (pq.hasActiveIA) reasons.push('Cannot have had an IA in the past 5 years');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (eligible) reasons.push('IRS is legally required to accept under IRC 6159(c)');

    const term = Math.min(IRS_2026.IA_TERMS.guaranteed, earliestCSEDMonths);
    const monthlyPayment = term > 0 ? totalDebt / term : 0;
    const confidence = eligible ? 0.99 : 0;

    results.push({
      program: 'GuaranteedIA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'IRS is legally required to grant this agreement (IRC 6159(c))',
        'No financial disclosure or Collection Information Statement required',
        'Lowest complexity — can be set up online in minutes',
        'Reduced setup fee with DDIA ($22 online)',
      ],
      disadvantages: [
        'Only available for balances up to $10,000',
        'Maximum term of 36 months means higher monthly payments',
        'Penalties and interest continue to accrue on the remaining balance',
        'Failure-to-Pay penalty rate reduced to 0.25%/month while IA is active',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? monthlyPayment * term : undefined,
      termMonths: eligible ? term : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 3. Streamlined Installment Agreement
  // IRM 5.14.5.3 — Balance <= $50K, max 72 months.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      totalDebt <= IRS_2026.STREAMLINED_IA_MAX &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy;

    const reasons: string[] = [];
    if (totalDebt > IRS_2026.STREAMLINED_IA_MAX) reasons.push('Balance exceeds $50,000');
    if (!pq.allReturnsFiled) reasons.push('All tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (eligible) reasons.push('Balance within $50K — streamlined processing with no financials');

    const term = Math.min(IRS_2026.IA_TERMS.streamlined, earliestCSEDMonths);
    const monthlyPayment = term > 0 ? totalDebt / term : 0;
    const ddiaRequired = totalDebt > IRS_2026.DDIA_REQUIRED_THRESHOLD;
    const confidence = eligible ? 0.9 : 0;

    results.push({
      program: 'StreamlinedIA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'No financial disclosure (Form 433-F) required',
        'Streamlined processing — faster approval than non-streamlined',
        'Up to 72 months to pay, keeping monthly payments manageable',
        ddiaRequired
          ? 'DDIA required for balance over $25K — reduces setup fee to $22'
          : 'DDIA optional but reduces setup fee from $69 to $22',
      ],
      disadvantages: [
        'Penalties and interest continue to accrue throughout the agreement',
        'NFTL may be filed for balances between $25K-$50K',
        ddiaRequired
          ? 'Direct Debit Installment Agreement (DDIA) is mandatory'
          : 'Balance must stay at or below $50K for the duration',
        'Defaulting triggers enforced collection after a 30-day notice',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? monthlyPayment * term : undefined,
      termMonths: eligible ? term : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 4. Expanded Streamlined Installment Agreement
  // IRM 5.14.5.3.1 — Balance $50K-$100K, max 84 months, DDIA mandatory.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      totalDebt > IRS_2026.STREAMLINED_IA_MAX &&
      totalDebt <= IRS_2026.EXPANDED_IA_MAX &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy;

    const reasons: string[] = [];
    if (totalDebt <= IRS_2026.STREAMLINED_IA_MAX) {
      reasons.push('Balance qualifies for standard Streamlined IA (more favorable)');
    }
    if (totalDebt > IRS_2026.EXPANDED_IA_MAX) reasons.push('Balance exceeds $100,000');
    if (!pq.allReturnsFiled) reasons.push('All tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (eligible) {
      reasons.push('Balance $50K-$100K qualifies for expanded streamlined processing');
    }

    const term = Math.min(IRS_2026.IA_TERMS.expanded, earliestCSEDMonths);
    const monthlyPayment = term > 0 ? totalDebt / term : 0;
    const confidence = eligible ? 0.85 : 0;

    results.push({
      program: 'ExpandedStreamlinedIA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'Only limited financial disclosure (simplified 433-F) required',
        'Up to 84 months to pay — longer term than standard streamlined',
        'DDIA reduces setup fee to $22 (online)',
        'Avoids the full financial review of non-streamlined agreements',
      ],
      disadvantages: [
        'DDIA is mandatory — must authorize direct bank debits',
        'Limited financial disclosure still required (simplified 433-F)',
        'NFTL will likely be filed',
        'Penalties and interest continue throughout the 84-month term',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? monthlyPayment * term : undefined,
      termMonths: eligible ? term : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 5. Non-Streamlined Installment Agreement
  // IRM 5.14.5.4 — Balance $100K-$250K, max 120 months, full financials.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      totalDebt > IRS_2026.EXPANDED_IA_MAX &&
      totalDebt <= IRS_2026.NON_STREAMLINED_IA_MAX &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy;

    const reasons: string[] = [];
    if (totalDebt <= IRS_2026.EXPANDED_IA_MAX) {
      reasons.push('Balance qualifies for Expanded Streamlined IA (less disclosure)');
    }
    if (totalDebt > IRS_2026.NON_STREAMLINED_IA_MAX) reasons.push('Balance exceeds $250,000');
    if (!pq.allReturnsFiled) reasons.push('All tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (eligible) {
      reasons.push('Balance $100K-$250K — requires non-streamlined processing with financials');
    }

    const term = Math.min(IRS_2026.IA_TERMS.nonStreamlined, earliestCSEDMonths);
    const monthlyPayment = term > 0 ? totalDebt / term : 0;
    const confidence = eligible ? 0.65 : 0;

    results.push({
      program: 'NonStreamlinedIA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'Allows up to 120 months to pay — substantial time for large balances',
        'Still results in full payment of the liability (avoids OIC complexity)',
        'May negotiate payment amount based on financial analysis',
        'Penalties reduced to 0.25%/month failure-to-pay rate while active',
      ],
      disadvantages: [
        'Full financial disclosure (Form 433-F or 433-A) required',
        'IRS will conduct a thorough review of assets and income',
        'NFTL will almost certainly be filed',
        'Revenue Officer involvement likely for balances over $100K',
        'Higher setup fee if not using DDIA',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? monthlyPayment * term : undefined,
      termMonths: eligible ? term : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 6. Regular Installment Agreement
  // IRM 5.14.1 — Balance > $250K, fully negotiated, 433-A required.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      totalDebt > IRS_2026.NON_STREAMLINED_IA_MAX &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy;

    const reasons: string[] = [];
    if (totalDebt <= IRS_2026.NON_STREAMLINED_IA_MAX) {
      reasons.push('Balance qualifies for a lower-tier IA with less disclosure');
    }
    if (!pq.allReturnsFiled) reasons.push('All tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (eligible) {
      reasons.push(
        'Balance exceeds $250K — fully negotiated agreement with 433-A required'
      );
    }

    const term = Math.min(120, earliestCSEDMonths);
    const monthlyPayment = term > 0 ? totalDebt / term : 0;
    const confidence = eligible ? 0.5 : 0;

    results.push({
      program: 'RegularIA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'Provides a structured path to resolve very large liabilities',
        'Payment amounts are negotiable based on demonstrated ability to pay',
        'Stops more aggressive collection actions (levies, garnishments)',
        'Failure-to-Pay penalty reduced to 0.25%/month while active',
      ],
      disadvantages: [
        'Full Form 433-A (Collection Information Statement) required',
        'IRS will closely scrutinize all assets, income, and expenses',
        'Revenue Officer will be assigned to the case',
        'NFTL will be filed; may require asset liquidation to reduce balance',
        'Negotiations can be prolonged and adversarial',
        'Manager approval required for large-dollar agreements',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? monthlyPayment * term : undefined,
      termMonths: eligible ? term : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 7. Partial Pay Installment Agreement (PPIA)
  // IRC 6159(a) — When MDI * CSED months < total debt. Pay what you can.
  // ──────────────────────────────────────────────────────────────────────
  {
    const collectibleBeforeCSED = mdi * earliestCSEDMonths;
    const eligible =
      mdi > 0 &&
      collectibleBeforeCSED < totalDebt &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy;

    const reasons: string[] = [];
    if (mdi <= 0) reasons.push('MDI is zero or negative — CNC may be more appropriate');
    if (collectibleBeforeCSED >= totalDebt) {
      reasons.push('MDI over CSED is sufficient to full-pay — standard IA is appropriate');
    }
    if (!pq.allReturnsFiled) reasons.push('All tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Active bankruptcy disqualifies');
    if (eligible) {
      reasons.push(
        `Can collect $${collectibleBeforeCSED.toLocaleString()} of ` +
          `$${totalDebt.toLocaleString()} before CSED — qualifies for partial pay`
      );
    }

    const monthlyPayment = Math.max(0, mdi);
    const confidence = eligible ? 0.6 : 0;

    results.push({
      program: 'PPIA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'Monthly payment is based on actual ability to pay, not the full balance',
        'Remaining balance is forgiven when CSED expires',
        'Stops levies and garnishments while the agreement is active',
        'Alternative to OIC when the taxpayer has some disposable income',
      ],
      disadvantages: [
        'Full Form 433-A required with detailed financial disclosure',
        'Subject to biennial (every 2 years) financial review by the IRS',
        'NFTL will be filed and maintained',
        'Penalties and interest continue to accrue on the unpaid balance',
        'If financial situation improves, IRS may increase payment or convert to full-pay IA',
        'CSED tolling applies during the agreement, extending the collection window',
      ],
      monthlyPayment: eligible ? monthlyPayment : undefined,
      totalPayment: eligible ? monthlyPayment * earliestCSEDMonths : undefined,
      termMonths: eligible ? earliestCSEDMonths : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 8. OIC — Doubt as to Collectibility (DATC)
  // IRM 5.8 — RCP < total debt; settle for less than full amount.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible =
      rcpLumpSum < totalDebt &&
      pq.allReturnsFiled &&
      !pq.inBankruptcy &&
      pq.estimatedPaymentsCurrent &&
      !pq.auditOpen &&
      !pq.oicPending;

    const reasons: string[] = [];
    if (rcpLumpSum >= totalDebt) {
      reasons.push('RCP meets or exceeds total debt — IRS will not accept an OIC for DATC');
    }
    if (!pq.allReturnsFiled) reasons.push('All required tax returns must be filed');
    if (pq.inBankruptcy) reasons.push('Cannot submit OIC during active bankruptcy');
    if (!pq.estimatedPaymentsCurrent) reasons.push('Estimated tax payments must be current');
    if (pq.auditOpen) reasons.push('Open audit must be resolved first');
    if (pq.oicPending) reasons.push('Existing pending OIC must be resolved first');
    if (eligible) {
      const savings = totalDebt - rcpLumpSum;
      reasons.push(
        `RCP ($${rcpLumpSum.toLocaleString()}) is less than debt ($${totalDebt.toLocaleString()}) ` +
          `— potential savings of $${savings.toLocaleString()}`
      );
    }

    /**
     * Confidence is based on how much the RCP is below the total debt.
     * Greater gap = higher confidence the IRS will accept.
     */
    let confidence = 0;
    if (eligible) {
      const ratio = rcpLumpSum / totalDebt;
      if (ratio <= 0.1) confidence = 0.8;
      else if (ratio <= 0.25) confidence = 0.7;
      else if (ratio <= 0.5) confidence = 0.6;
      else if (ratio <= 0.75) confidence = 0.5;
      else confidence = 0.4;
    }

    results.push({
      program: 'OIC_DATC',
      eligible,
      confidence,
      reasons,
      advantages: [
        'Settle the entire liability for less than the full amount owed',
        'Fresh start — accepted offer clears the tax debt permanently',
        'Stops all collection activity during OIC evaluation (typically 12-24 months)',
        'CSED is tolled during evaluation, but forgiveness offsets this',
        'Low-income taxpayers may qualify for fee and initial payment waivers',
      ],
      disadvantages: [
        '$205 application fee (non-refundable unless low-income)',
        '20% lump-sum initial payment required with application',
        'Full Form 433-A (OIC) required with extensive financial documentation',
        'Processing time averages 12-24 months',
        'Must remain in full compliance for 5 years after acceptance',
        'Refunds for the tax year of acceptance and prior may be applied to the offer',
        'All tax liens remain until the offer amount is fully paid',
      ],
      monthlyPayment: eligible ? rcpLumpSum * 0.2 : undefined,
      totalPayment: eligible ? rcpLumpSum : undefined,
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 9. OIC — Doubt as to Liability (DATL)
  // IRM 5.8.2 — Taxpayer disputes the assessed liability.
  // Always shown as an available option.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible = true; // Always available as an option

    results.push({
      program: 'OIC_DATL',
      eligible,
      confidence: 0.3,
      reasons: [
        'OIC based on Doubt as to Liability is always available when the taxpayer ' +
          'disputes the correctness of the assessed tax amount',
        'Requires documentation demonstrating why the liability is incorrect',
      ],
      advantages: [
        'No $205 application fee — DATL offers are fee-exempt',
        'No 20% initial payment required',
        'Can resolve incorrectly assessed liabilities (e.g., SFR assessments)',
        'Appropriate when the taxpayer has evidence the tax was computed incorrectly',
      ],
      disadvantages: [
        'Burden of proof is on the taxpayer to demonstrate the liability is wrong',
        'Requires strong documentation (amended returns, proof of deductions, etc.)',
        'Processing can take 12+ months',
        'If rejected, appeals rights are limited',
        'Does not address collectibility — even if liability is reduced, remainder must be paid',
      ],
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 10. OIC — Effective Tax Administration (ETA)
  // IRM 5.8.11 — RCP >= debt but collection creates exceptional hardship.
  // Always shown as an option with explanatory note.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible = true; // Always available as an option
    const rcpCoversDebt = rcpLumpSum >= totalDebt;

    results.push({
      program: 'OIC_ETA',
      eligible,
      confidence: rcpCoversDebt ? 0.25 : 0.15,
      reasons: [
        rcpCoversDebt
          ? 'RCP covers the full debt, but ETA may apply if collection would cause exceptional hardship'
          : 'RCP does not cover full debt — DATC is likely the stronger basis, but ETA remains an option',
        'Requires demonstrating that collection of the full amount would be ' +
          'detrimental to the taxpayer or their dependents, or that exceptional ' +
          'circumstances (age, illness, disability) make full payment inequitable',
      ],
      advantages: [
        'Available even when the taxpayer has the ability to pay in full',
        'Considers factors beyond pure financial analysis (health, equity, public policy)',
        'Can result in significant debt reduction despite sufficient assets/income',
        'Appropriate for elderly, disabled, or seriously ill taxpayers',
      ],
      disadvantages: [
        'Hardest OIC type to get accepted — requires compelling special circumstances',
        '$205 application fee applies (unless low-income)',
        '20% initial payment required for lump-sum offers',
        'Full financial disclosure and documentation of hardship required',
        'IRS rarely grants ETA offers without extraordinary facts',
        'Processing takes 12-24 months with uncertain outcome',
      ],
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 11. Currently Not Collectible (CNC) Status
  // IRM 5.16 — MDI <= 0 and minimal assets (NRE < $5,000).
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible = mdi <= 0 && nre < 5000;

    const reasons: string[] = [];
    if (mdi > 0) {
      reasons.push(
        `MDI is $${mdi.toLocaleString()}/month — taxpayer has disposable income`
      );
    }
    if (nre >= 5000) {
      reasons.push(
        `NRE is $${nre.toLocaleString()} — taxpayer has realizable asset equity`
      );
    }
    if (eligible) {
      reasons.push(
        'MDI is zero or negative and asset equity is minimal — taxpayer cannot pay without hardship'
      );
    }

    const confidence = eligible
      ? mdi < -500 && nre < 1000
        ? 0.9
        : 0.7
      : 0;

    results.push({
      program: 'CNC',
      eligible,
      confidence,
      reasons,
      advantages: [
        'All active collection stops — no levies, garnishments, or seizures',
        'No monthly payment required',
        'CSED continues to run — debt may expire if CNC status is maintained',
        'No financial disclosure beyond what is needed to demonstrate hardship',
        'Can be converted to an IA or OIC later if circumstances change',
      ],
      disadvantages: [
        'Debt is NOT forgiven — it remains on the books until CSED expires',
        'Penalties and interest continue to accrue on the full balance',
        'Annual income review — IRS may reclassify if income improves',
        'NFTL will typically be filed as a protective measure',
        'Tax refunds will be offset against the outstanding balance',
        'Passport may be revoked if balance exceeds $66,000 (2026 threshold)',
      ],
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 12. Penalty Abatement — First Time Abate (FTA)
  // IRM 20.1.1.3.6.1 — No penalties in prior 3 years, all returns filed.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible = !pq.hasPriorPenalties && pq.allReturnsFiled;

    const reasons: string[] = [];
    if (pq.hasPriorPenalties) {
      reasons.push('Taxpayer has penalties assessed in the prior 3 tax years — FTA not available');
    }
    if (!pq.allReturnsFiled) {
      reasons.push('All tax returns must be filed to qualify for FTA');
    }
    if (eligible) {
      reasons.push(
        'No penalties in prior 3 years and all returns filed — qualifies for First Time Abate'
      );
    }

    const confidence = eligible ? 0.92 : 0;

    results.push({
      program: 'PenaltyAbatement_FTA',
      eligible,
      confidence,
      reasons,
      advantages: [
        'Administrative waiver — no need to demonstrate reasonable cause',
        'Can abate Failure-to-File (FTF) and Failure-to-Pay (FTP) penalties',
        'Quick processing — often approved in a single phone call',
        'Associated interest on abated penalties is also removed',
        'Can be combined with other resolution options (IA, OIC, etc.)',
      ],
      disadvantages: [
        'Only available once — cannot be used again for 3 years',
        'Does not abate interest (only penalties and related interest on penalties)',
        'Only applies to one tax year per request',
        'Does not apply to estimated tax penalties (IRC 6654/6655)',
        'Must have a clean 3-year penalty history',
      ],
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // 13. Penalty Abatement — Reasonable Cause (RC)
  // IRM 20.1.1.3 — Always eligible to attempt; requires documented cause.
  // ──────────────────────────────────────────────────────────────────────
  {
    const eligible = true; // Always eligible to attempt

    results.push({
      program: 'PenaltyAbatement_RC',
      eligible,
      confidence: 0.35,
      reasons: [
        'Reasonable Cause penalty abatement is always available to request',
        'Requires documentation showing the taxpayer exercised ordinary business care ' +
          'and prudence but was unable to comply due to circumstances beyond their control',
      ],
      advantages: [
        'Available regardless of prior penalty history (unlike FTA)',
        'Can be applied to multiple tax years simultaneously',
        'Covers a wide range of penalties (FTF, FTP, estimated tax, etc.)',
        'Associated interest on abated penalties is also removed',
        'Can be requested retroactively for prior years',
        'Appeals process available if initially denied',
      ],
      disadvantages: [
        'Burden of proof is on the taxpayer',
        'Requires detailed written explanation with supporting documentation',
        'Approval rates vary significantly by the specific cause cited',
        'IRS applies a facts-and-circumstances test — outcomes are less predictable',
        'Common reasons (forgot, didn\'t know) are generally not accepted',
        'Processing may take several months for complex cases',
      ],
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // Sort: eligible programs first (by confidence descending),
  // then ineligible programs (by program order).
  // ──────────────────────────────────────────────────────────────────────
  results.sort((a, b) => {
    // Eligible programs first
    if (a.eligible && !b.eligible) return -1;
    if (!a.eligible && b.eligible) return 1;

    // Within eligible/ineligible groups, sort by confidence descending
    return b.confidence - a.confidence;
  });

  return results;
}
