import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 843 (Claim for Refund / Abatement) PDF fields.
 */
export function mapForm843Fields(data: PdfDataSource): FormField[] {
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
    { label: 'Phone', value: c.phone ?? draft.phone ?? '', section: 'Taxpayer Information' },
  )

  // Tax Periods
  const selectedYears: string[] = draft.selectedYears ?? []
  fields.push(
    { label: 'Tax Periods', value: selectedYears.join(', ') || 'Not specified', section: 'Tax Periods for Abatement' },
    { label: 'Tax Form', value: draft.formNumber ?? '1040', section: 'Tax Periods for Abatement' },
  )

  // Penalty Types
  const penaltyTypes: string[] = []
  const penalties: any[] = draft.penalties ?? []
  let totalPenalty = 0

  for (const p of penalties) {
    if (p.checked) {
      penaltyTypes.push(p.label ?? p.type)
      totalPenalty += Number(p.amount ?? 0)
      fields.push({
        label: p.label ?? p.type,
        value: `$${Number(p.amount ?? 0).toLocaleString()}`,
        section: 'Penalties to Abate',
      })
    }
  }

  fields.push({
    label: 'Total Abatement Requested',
    value: `$${totalPenalty.toLocaleString()}`,
    section: 'Penalties to Abate',
  })

  // Abatement Type
  const abatementType = draft.abatementType ?? 'FTA'
  fields.push({
    label: 'Abatement Type',
    value: abatementType === 'FTA' ? 'First Time Abatement (FTA)' : 'Reasonable Cause',
    section: 'Abatement Basis',
  })

  if (abatementType === 'ReasonableCause') {
    fields.push({
      label: 'Reasonable Cause Narrative',
      value: draft.narrative ?? '',
      section: 'Abatement Basis',
    })
  }

  // Interest Abatement
  if (draft.interestAbatement) {
    fields.push(
      { label: 'Interest Abatement Requested', value: 'Yes', section: 'Interest Abatement' },
      { label: 'Error Type', value: draft.interestErrorType === 'ministerial' ? 'Ministerial Error' : 'Managerial Error', section: 'Interest Abatement' },
    )
  }

  return fields
}
