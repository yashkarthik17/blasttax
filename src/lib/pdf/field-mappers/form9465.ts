import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 9465 (Installment Agreement Request) PDF fields.
 */
export function mapForm9465Fields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const calc = data.calculations as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  // Taxpayer Info
  fields.push(
    { label: 'Full Name', value: c.taxpayer_name ?? draft.name ?? '', section: 'Taxpayer Information' },
    { label: 'Social Security Number', value: c.ssn ?? draft.ssn ?? '', section: 'Taxpayer Information' },
    { label: 'Street Address', value: c.address ?? draft.address ?? '', section: 'Taxpayer Information' },
    { label: 'City, State, ZIP', value: `${c.city ?? ''}, ${c.state ?? ''} ${c.zip ?? ''}`, section: 'Taxpayer Information' },
  )

  if (c.filing_status === 'MFJ') {
    fields.push(
      { label: 'Spouse Name', value: c.spouse_name ?? draft.spouseName ?? '', section: 'Taxpayer Information' },
      { label: 'Spouse SSN', value: c.spouse_ssn ?? draft.spouseSsn ?? '', section: 'Taxpayer Information' },
    )
  }

  // Employer
  fields.push(
    { label: 'Employer Name', value: draft.employerName ?? '', section: 'Employer Information' },
    { label: 'Employer Address', value: draft.employerAddress ?? '', section: 'Employer Information' },
  )

  if (c.filing_status === 'MFJ') {
    fields.push(
      { label: 'Spouse Employer', value: draft.spouseEmployerName ?? '', section: 'Employer Information' },
      { label: 'Spouse Employer Address', value: draft.spouseEmployerAddress ?? '', section: 'Employer Information' },
    )
  }

  // Tax Debts
  const debts: any[] = c.tax_debts ?? draft.debts ?? []
  let totalOwed = 0
  debts.forEach((debt: any, i: number) => {
    const amount = Number(debt.balance ?? debt.amount ?? 0)
    totalOwed += amount
    fields.push({
      label: `Tax Year ${debt.tax_year ?? debt.taxYear ?? ''}`,
      value: `Form ${debt.tax_form ?? debt.formType ?? '1040'} — $${amount.toLocaleString()}`,
      section: 'Tax Periods and Amounts Owed',
    })
  })
  fields.push({ label: 'Total Amount Owed', value: `$${totalOwed.toLocaleString()}`, section: 'Tax Periods and Amounts Owed' })

  // Payment Details
  const iaType = calc.ia_recommended_type ?? draft.iaType ?? 'StreamlinedIA'
  const monthlyPayment = Number(calc.ia_monthly_payment ?? draft.monthlyPayment ?? 0)
  const termMonths = Number(calc.ia_term_months ?? draft.termMonths ?? 72)

  fields.push(
    { label: 'IA Type', value: iaType, section: 'Payment Details' },
    { label: 'Monthly Payment', value: `$${monthlyPayment.toLocaleString()}`, section: 'Payment Details' },
    { label: 'Term (Months)', value: String(termMonths), section: 'Payment Details' },
    { label: 'Total to be Paid', value: `$${(monthlyPayment * termMonths).toLocaleString()}`, section: 'Payment Details' },
  )

  // Payment Method
  const method = draft.paymentMethod ?? 'ddia'
  fields.push(
    { label: 'Payment Method', value: method === 'ddia' ? 'Direct Debit (DDIA)' : method === 'check' ? 'Check/Money Order' : 'Payroll Deduction', section: 'Payment Method' },
    { label: 'Payment Day of Month', value: draft.paymentDay ?? '15', section: 'Payment Method' },
  )

  if (method === 'ddia') {
    fields.push(
      { label: 'Bank Routing Number', value: draft.routingNumber ?? '(to be provided)', section: 'Payment Method' },
      { label: 'Account Number', value: draft.accountNumber ?? '(to be provided)', section: 'Payment Method' },
      { label: 'Account Type', value: draft.accountType ?? 'Checking', section: 'Payment Method' },
    )
  }

  // Setup Fee
  fields.push(
    { label: 'Setup Fee', value: `$${Number(calc.ia_setup_fee ?? draft.setupFee ?? 22).toLocaleString()}`, section: 'Fees' },
    { label: 'DDIA Required', value: calc.ia_ddia_required || draft.ddiaRequired ? 'Yes' : 'No', section: 'Fees' },
  )

  return fields
}
