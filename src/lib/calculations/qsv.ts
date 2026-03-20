/**
 * Quick Sale Value (QSV) Calculator
 *
 * Per IRS guidelines (IRM 5.8.4), Quick Sale Value represents the amount
 * a taxpayer could reasonably expect to receive from a quick sale of an asset,
 * typically estimated at 80% of Fair Market Value (FMV) for most asset types,
 * minus any encumbrances (loans, mortgages, etc.).
 *
 * QSV is a key component in determining Net Realizable Equity (NRE) and
 * ultimately the Reasonable Collection Potential (RCP) for Offers in Compromise.
 */

import type { AssetPortfolio, QSVResult } from '@/lib/calculations/types';

/**
 * Calculates the Quick Sale Value for each asset in a taxpayer's portfolio.
 *
 * @param assets - The taxpayer's complete asset portfolio, organized by category.
 * @returns An array of QSVResult objects, one per asset, containing the
 *          calculated quick sale value along with identifying metadata.
 *
 * @remarks
 * IRS basis: IRM 5.8.4.3 — Assets are generally valued at 80% of FMV
 * (the "quick sale" discount), less any outstanding encumbrances. Certain
 * asset types (bank accounts, liquid investments, crypto) use full value
 * since they can be liquidated at or near market price without a forced-sale
 * discount.
 */
export function calculateQSV(assets: AssetPortfolio): QSVResult[] {
  const results: QSVResult[] = [];

  /**
   * Bank Accounts — IRM 5.8.4.4(1)
   * No discount applied. Bank balances are fully liquid and realizable
   * at face value.
   */
  if (assets.bankAccounts) {
    for (const account of assets.bankAccounts) {
      results.push({
        assetId: account.id,
        assetType: 'bankAccount',
        qsv: account.balance,
      });
    }
  }

  /**
   * Investments — IRM 5.8.4.6
   * Liquid investments (stocks, bonds, mutual funds) are valued at current
   * market value with no discount. Illiquid investments (limited partnerships,
   * private equity, etc.) receive a 20% discount (QSV = 80% of value).
   */
  if (assets.investments) {
    for (const investment of assets.investments) {
      if (investment.isLiquid) {
        results.push({
          assetId: investment.id,
          assetType: 'investmentLiquid',
          qsv: investment.currentValue,
        });
      } else {
        results.push({
          assetId: investment.id,
          assetType: 'investmentIlliquid',
          qsv: investment.currentValue * 0.80,
        });
      }
    }
  }

  /**
   * Retirement Accounts — IRM 5.8.4.4(7)
   * Treatment depends on the taxpayer's age:
   *
   * - Under 59.5: Subject to early withdrawal penalty (typically 10%) and
   *   income tax. QSV = max(0, value - loanBalance - penaltyAmount - taxAmount).
   *
   * - 59.5 to 65: No early withdrawal penalty but still subject to taxes
   *   (handled outside QSV). QSV = max(0, value - loanBalance).
   *
   * - 65+: Same formula as 59.5-65 but the IRS may exclude amounts needed
   *   for retirement sustenance under certain circumstances.
   */
  if (assets.retirementAccounts) {
    for (const account of assets.retirementAccounts) {
      let qsv: number;

      if (account.ownerAge < 59.5) {
        const penaltyAmount = account.currentValue * (account.earlyWithdrawalPenaltyPct / 100);
        const taxAmount = account.currentValue * (account.estimatedTaxRatePct / 100);
        qsv = Math.max(
          0,
          account.currentValue - account.loanBalance - penaltyAmount - taxAmount
        );
      } else {
        // Ages 59.5-65 and 65+: no early withdrawal penalty
        // For 65+, exclusions for needed-for-retirement may apply but are
        // handled at the case-review level, not in the base QSV formula.
        qsv = Math.max(0, account.currentValue - account.loanBalance);
      }

      results.push({
        assetId: account.id,
        assetType: 'retirementAccount',
        qsv,
      });
    }
  }

  /**
   * Real Estate — IRM 5.8.4.5
   * QSV = 80% of FMV minus all encumbrances (mortgage, HELOC, liens).
   * The 20% discount reflects the cost and time associated with a forced
   * or quick sale of real property.
   */
  if (assets.realEstate) {
    for (const property of assets.realEstate) {
      const qsv = Math.max(
        0,
        property.fmv * 0.80 - property.mortgageBalance - property.helocBalance
      );

      results.push({
        assetId: property.id,
        assetType: 'realEstate',
        qsv,
      });
    }
  }

  /**
   * Vehicles — IRM 5.8.4.6
   * QSV = 80% of FMV minus any outstanding loan balance.
   * Vehicles depreciate and a quick sale typically yields less than
   * fair market value.
   */
  if (assets.vehicles) {
    for (const vehicle of assets.vehicles) {
      const qsv = Math.max(0, vehicle.fmv * 0.80 - vehicle.loanBalance);

      results.push({
        assetId: vehicle.id,
        assetType: 'vehicle',
        qsv,
      });
    }
  }

  /**
   * Life Insurance — IRM 5.8.4.4(6)
   * Whole and Universal policies have a cash surrender value that is
   * realizable. QSV = cash surrender value minus any policy loans.
   * Term life insurance has no cash value and QSV = 0.
   */
  if (assets.lifeInsurance) {
    for (const policy of assets.lifeInsurance) {
      let qsv: number;

      if (policy.policyType === 'Term') {
        qsv = 0;
      } else {
        // Whole or Universal life insurance
        qsv = Math.max(0, policy.cashSurrenderValue - policy.policyLoans);
      }

      results.push({
        assetId: policy.id,
        assetType: 'lifeInsurance',
        qsv,
      });
    }
  }

  /**
   * Cryptocurrency — Treated similarly to liquid investments.
   * Valued at estimated current value with no forced-sale discount,
   * as crypto assets can generally be liquidated quickly on exchanges.
   */
  if (assets.cryptoAssets) {
    for (const holding of assets.cryptoAssets) {
      results.push({
        assetId: holding.id,
        assetType: 'crypto',
        qsv: holding.estimatedValue,
      });
    }
  }

  /**
   * Other Assets — IRM 5.8.4.6
   * Catch-all for assets not in the above categories (art, collectibles,
   * equipment, etc.). Standard 80% quick-sale discount applied, minus
   * any encumbrances.
   */
  if (assets.otherAssets) {
    for (const asset of assets.otherAssets) {
      const qsv = Math.max(0, asset.estimatedValue * 0.80 - asset.loanBalance);

      results.push({
        assetId: asset.id,
        assetType: 'other',
        qsv,
      });
    }
  }

  return results;
}
