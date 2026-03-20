import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 433-F (Simplified Collection Information Statement) PDF fields.
 */
export function mapForm433FFields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const calc = data.calculations as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  // Income
  const incomeRecords: any[] = calc.income_records ?? draft.incomeRecords ?? []
  for (const inc of incomeRecords) {
    fields.push({
      label: `${inc.income_type ?? inc.incomeType ?? 'Income'} (${inc.person ?? ''})`,
      value: `$${Number(inc.gross_monthly ?? inc.grossMonthly ?? 0).toLocaleString()}/mo`,
      section: 'Monthly Income',
    })
  }
  const totalIncome = Number(calc.total_income ?? calc.mdi_total_income ?? 0)
  fields.push({
    label: 'Total Gross Monthly Income',
    value: `$${totalIncome.toLocaleString()}/mo`,
    section: 'Monthly Income',
  })

  // Bank Accounts
  const bankAccounts: any[] = calc.bank_accounts ?? draft.bankAccounts ?? []
  for (const bank of bankAccounts) {
    fields.push({
      label: bank.institution ?? 'Bank Account',
      value: `${bank.account_type ?? bank.accountType ?? 'Account'} — $${Number(bank.balance ?? 0).toLocaleString()}`,
      section: 'Bank Accounts',
    })
  }
  const totalBank = bankAccounts.reduce((s: number, b: any) => s + Number(b.balance ?? 0), 0)
  fields.push({ label: 'Total Bank Balances', value: `$${totalBank.toLocaleString()}`, section: 'Bank Accounts' })

  // Assets
  fields.push(
    { label: 'Real Estate Equity', value: `$${Number(calc.real_estate_equity ?? draft.realEstateEquity ?? 0).toLocaleString()}`, section: 'Asset Summary' },
    { label: 'Vehicle Equity', value: `$${Number(calc.vehicle_equity ?? draft.vehicleEquity ?? 0).toLocaleString()}`, section: 'Asset Summary' },
    { label: 'Other Assets', value: `$${Number(calc.other_assets ?? draft.otherAssetsValue ?? 0).toLocaleString()}`, section: 'Asset Summary' },
    { label: 'Total NRE', value: `$${Number(calc.total_nre ?? draft.totalNRE ?? 0).toLocaleString()}`, section: 'Asset Summary' },
  )

  // Expenses
  const expenseBreakdown: any[] = calc.expense_breakdown ?? []
  let totalAllowable = 0
  for (const exp of expenseBreakdown) {
    const allowable = Number(exp.allowable ?? 0)
    totalAllowable += allowable
    fields.push({
      label: String(exp.category ?? '').replace(/([A-Z])/g, ' $1').trim(),
      value: `Actual: $${Number(exp.actual ?? 0).toLocaleString()} | Allowable: $${allowable.toLocaleString()} | Standard: $${Number(exp.standard ?? 0).toLocaleString()}`,
      section: 'Monthly Expenses',
    })
  }
  fields.push({
    label: 'Total Allowable Expenses',
    value: `$${totalAllowable.toLocaleString()}`,
    section: 'Monthly Expenses',
  })

  // MDI
  const mdi = Number(calc.mdi ?? 0)
  fields.push(
    { label: 'Gross Monthly Income', value: `$${totalIncome.toLocaleString()}`, section: 'MDI Calculation' },
    { label: 'Total Allowable Expenses', value: `-$${totalAllowable.toLocaleString()}`, section: 'MDI Calculation' },
    { label: 'Monthly Disposable Income (MDI)', value: `$${mdi.toLocaleString()}`, section: 'MDI Calculation' },
  )

  if (mdi <= 0) {
    fields.push({
      label: 'CNC Determination',
      value: 'MDI is zero or negative — supports Currently Not Collectible status.',
      section: 'MDI Calculation',
    })
  }

  return fields
}
