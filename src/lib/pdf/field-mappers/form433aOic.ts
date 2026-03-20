import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 433-A(OIC) (Collection Information Statement) PDF fields.
 */
export function mapForm433AOICFields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const calc = data.calculations as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  // Section 1: Personal Info
  fields.push(
    { label: 'Full Name', value: c.taxpayer_name ?? draft.name ?? '', section: 'Section 1: Personal Information' },
    { label: 'SSN', value: c.ssn ?? draft.ssn ?? '', section: 'Section 1: Personal Information' },
    { label: 'Date of Birth', value: draft.dob ?? '', section: 'Section 1: Personal Information' },
    { label: 'Marital Status', value: c.filing_status ?? draft.maritalStatus ?? '', section: 'Section 1: Personal Information' },
    { label: 'Address', value: `${c.address ?? ''}, ${c.city ?? ''}, ${c.state ?? ''} ${c.zip ?? ''}`, section: 'Section 1: Personal Information' },
    { label: 'Phone', value: c.phone ?? draft.phone ?? '', section: 'Section 1: Personal Information' },
  )

  // Section 2: Employment
  fields.push(
    { label: 'Employer', value: draft.employerName ?? '', section: 'Section 2: Employment Information' },
    { label: 'Employer Address', value: draft.employerAddress ?? '', section: 'Section 2: Employment Information' },
    { label: 'Occupation', value: draft.occupation ?? '', section: 'Section 2: Employment Information' },
    { label: 'Years Employed', value: String(draft.yearsEmployed ?? ''), section: 'Section 2: Employment Information' },
  )

  // Section 3: Assets
  const nreBreakdown: any[] = calc.nre_breakdown ?? draft.nreBreakdown ?? []
  const assetsByType: Record<string, number> = {}
  for (const asset of nreBreakdown) {
    const type = asset.asset_type ?? asset.assetType ?? 'other'
    assetsByType[type] = (assetsByType[type] ?? 0) + Math.max(0, Number(asset.qsv ?? 0))
  }

  for (const [type, qsv] of Object.entries(assetsByType)) {
    fields.push({
      label: type.replace(/([A-Z])/g, ' $1').trim(),
      value: `QSV: $${qsv.toLocaleString()}`,
      section: 'Section 3: Assets (Quick Sale Values)',
    })
  }

  const totalNRE = Number(calc.total_nre ?? draft.totalNRE ?? 0)
  fields.push({
    label: 'Total Net Realizable Equity (NRE)',
    value: `$${totalNRE.toLocaleString()}`,
    section: 'Section 3: Assets (Quick Sale Values)',
  })

  // Section 4: Self-Employment
  if (draft.isSelfEmployed) {
    fields.push(
      { label: 'Business Name', value: draft.businessName ?? '', section: 'Section 4: Self-Employment' },
      { label: 'Business EIN', value: draft.businessEin ?? '', section: 'Section 4: Self-Employment' },
      { label: 'Business Type', value: draft.businessType ?? '', section: 'Section 4: Self-Employment' },
    )
  }

  // Section 5: Monthly Income
  const totalIncome = Number(calc.total_income ?? calc.mdi_total_income ?? 0)
  fields.push({
    label: 'Total Gross Monthly Income',
    value: `$${totalIncome.toLocaleString()}`,
    section: 'Section 5: Monthly Income',
  })

  // Section 6: Monthly Expenses
  const expenseBreakdown: any[] = calc.expense_breakdown ?? []
  let totalAllowable = 0
  for (const exp of expenseBreakdown) {
    const allowable = Number(exp.allowable ?? 0)
    totalAllowable += allowable
    fields.push({
      label: String(exp.category ?? '').replace(/([A-Z])/g, ' $1').trim(),
      value: `Actual: $${Number(exp.actual ?? 0).toLocaleString()} | Allowable: $${allowable.toLocaleString()}`,
      section: 'Section 6: Monthly Expenses',
    })
  }
  fields.push({
    label: 'Total Allowable Expenses',
    value: `$${totalAllowable.toLocaleString()}`,
    section: 'Section 6: Monthly Expenses',
  })

  // Calculation Summary
  const mdi = Number(calc.mdi ?? 0)
  const rcpLump = Number(calc.rcp_lump_sum ?? 0)
  const rcpPeriodic = Number(calc.rcp_periodic ?? 0)
  const futureIncome12 = Math.max(0, mdi) * 12
  const futureIncome24 = Math.max(0, mdi) * 24

  fields.push(
    { label: 'Monthly Disposable Income (MDI)', value: `$${mdi.toLocaleString()}`, section: 'Calculation Summary' },
    { label: 'Future Income (Lump Sum — 12 mo)', value: `$${futureIncome12.toLocaleString()}`, section: 'Calculation Summary' },
    { label: 'Future Income (Periodic — 24 mo)', value: `$${futureIncome24.toLocaleString()}`, section: 'Calculation Summary' },
    { label: 'RCP (Lump Sum)', value: `$${rcpLump.toLocaleString()}`, section: 'Calculation Summary' },
    { label: 'RCP (Periodic)', value: `$${rcpPeriodic.toLocaleString()}`, section: 'Calculation Summary' },
  )

  // Dissipated Assets
  if (draft.hasDissipated) {
    fields.push({
      label: 'Dissipated Assets Description',
      value: draft.dissipatedDescription ?? '',
      section: 'Dissipated Assets',
    })
  }

  return fields
}
