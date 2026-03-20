import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 656 (Offer in Compromise) PDF fields.
 */
export function mapForm656Fields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const calc = data.calculations as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  // Section 1: Taxpayer Information
  fields.push(
    { label: 'Full Name', value: c.taxpayer_name ?? draft.name ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'Social Security Number', value: c.ssn ?? draft.ssn ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'Street Address', value: c.address ?? draft.address ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'City', value: c.city ?? draft.city ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'State', value: c.state ?? draft.state ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'ZIP Code', value: c.zip ?? draft.zip ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'Phone', value: c.phone ?? draft.phone ?? '', section: 'Section 1: Taxpayer Information' },
    { label: 'Email', value: c.email ?? draft.email ?? '', section: 'Section 1: Taxpayer Information' },
  )

  if (c.filing_status === 'MFJ' || draft.isJoint) {
    fields.push(
      { label: 'Spouse Name', value: c.spouse_name ?? draft.spouseName ?? '', section: 'Section 1: Taxpayer Information' },
      { label: 'Spouse SSN', value: c.spouse_ssn ?? draft.spouseSsn ?? '', section: 'Section 1: Taxpayer Information' },
      { label: 'Spouse DOB', value: draft.spouseDob ?? '', section: 'Section 1: Taxpayer Information' },
    )
  }

  // Section 2: Tax Periods
  const taxDebts: any[] = c.tax_debts ?? draft.taxPeriods ?? []
  taxDebts.forEach((debt: any, i: number) => {
    fields.push({
      label: `Tax Year ${i + 1}`,
      value: `${debt.tax_year ?? debt.year ?? ''} — Form ${debt.tax_form ?? debt.formType ?? '1040'}`,
      section: 'Section 2: Tax Periods Included',
    })
  })

  // Section 3: Basis for Offer
  const basis = draft.oicBasis ?? 'DATC'
  fields.push(
    { label: 'Basis for Offer', value: basis === 'DATC' ? 'Doubt as to Collectibility' : 'Effective Tax Administration', section: 'Section 3: Basis for Offer' },
  )
  if (basis === 'ETA') {
    fields.push({ label: 'Hardship Description', value: draft.etaHardship ?? '', section: 'Section 3: Basis for Offer' })
  }

  // Section 4: Payment Option
  const paymentOption = draft.paymentOption ?? 'lump'
  fields.push(
    { label: 'Payment Option', value: paymentOption === 'lump' ? 'Lump Sum Cash' : 'Periodic Payment', section: 'Section 4: Payment Option' },
    { label: 'Offer Amount', value: `$${Number(draft.offerAmount ?? calc.rcp_lump_sum ?? 0).toLocaleString()}`, section: 'Section 4: Payment Option' },
  )

  if (paymentOption === 'lump') {
    const offerAmt = Number(draft.offerAmount ?? calc.rcp_lump_sum ?? 0)
    fields.push({ label: 'Initial Payment (20%)', value: `$${(offerAmt * 0.2).toLocaleString()}`, section: 'Section 4: Payment Option' })
  }

  // Section 5: Low-Income Certification
  fields.push(
    { label: 'Low-Income Certification', value: draft.lowIncomeCert || calc.is_low_income ? 'Yes' : 'No', section: 'Section 5: Low-Income Certification' },
    { label: 'Application Fee', value: draft.lowIncomeCert || calc.is_low_income ? 'Waived' : '$205', section: 'Section 5: Low-Income Certification' },
  )

  // Section 7: Signature
  fields.push(
    { label: 'Signature (Printed Name)', value: draft.signatureName ?? '', section: 'Section 7: Signature' },
    { label: 'Date', value: draft.signatureDate ?? '', section: 'Section 7: Signature' },
  )

  return fields
}
