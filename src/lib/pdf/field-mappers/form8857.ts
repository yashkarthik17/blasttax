import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 8857 (Innocent Spouse Relief) PDF fields.
 */
export function mapForm8857Fields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  // Requesting Spouse
  fields.push(
    { label: 'Full Name', value: c.taxpayer_name ?? draft.name ?? '', section: 'Requesting Spouse' },
    { label: 'SSN', value: c.ssn ?? draft.ssn ?? '', section: 'Requesting Spouse' },
    { label: 'Address', value: `${c.address ?? ''}, ${c.city ?? ''}, ${c.state ?? ''} ${c.zip ?? ''}`, section: 'Requesting Spouse' },
    { label: 'Phone', value: c.phone ?? draft.phone ?? '', section: 'Requesting Spouse' },
  )

  // Non-Requesting Spouse
  fields.push(
    { label: 'Full Name', value: c.spouse_name ?? draft.nrSpouseName ?? '', section: 'Non-Requesting Spouse / Former Spouse' },
    { label: 'SSN', value: c.spouse_ssn ?? draft.nrSpouseSsn ?? '', section: 'Non-Requesting Spouse / Former Spouse' },
  )

  // Marriage Info
  fields.push(
    { label: 'Date of Marriage', value: draft.marriageDate ?? '', section: 'Marriage Information' },
    { label: 'Currently Married', value: draft.isCurrentlyMarried !== false ? 'Yes' : 'No', section: 'Marriage Information' },
  )
  if (draft.isCurrentlyMarried === false) {
    fields.push({ label: 'Separation/Divorce Date', value: draft.separationDate ?? '', section: 'Marriage Information' })
  }

  // Tax Years
  const selectedYears: string[] = draft.selectedYears ?? []
  fields.push({
    label: 'Tax Years for Relief',
    value: selectedYears.join(', ') || 'Not specified',
    section: 'Tax Years',
  })

  // Relief Type
  const reliefLabels: Record<string, string> = {
    traditional: 'Traditional Innocent Spouse Relief — Section 6015(b)',
    separation: 'Separation of Liability — Section 6015(c)',
    equitable: 'Equitable Relief — Section 6015(f)',
  }
  fields.push({
    label: 'Type of Relief',
    value: reliefLabels[draft.reliefType ?? 'traditional'] ?? draft.reliefType ?? '',
    section: 'Relief Requested',
  })

  // Knowledge
  const knowledgeLabels: Record<string, string> = {
    no: 'No — Did not know about the understatement',
    yes: 'Yes — Knew about the understatement',
    partial: 'Partially — Had some knowledge',
  }
  fields.push({
    label: 'Knowledge of Understatement',
    value: knowledgeLabels[draft.knewAboutUnderstatement ?? 'no'] ?? '',
    section: 'Knowledge Questions',
  })
  if (draft.knewAboutUnderstatement === 'yes' || draft.knewAboutUnderstatement === 'partial') {
    fields.push({
      label: 'Details',
      value: draft.knewDetails ?? '',
      section: 'Knowledge Questions',
    })
  }

  // Economic Hardship
  fields.push({
    label: 'Economic Hardship',
    value: draft.economicHardship ? 'Yes' : 'No',
    section: 'Economic Hardship',
  })
  if (draft.economicHardship) {
    fields.push({
      label: 'Hardship Details',
      value: draft.hardshipDetails ?? '',
      section: 'Economic Hardship',
    })
  }

  // Abuse
  fields.push({
    label: 'Abuse / Domestic Violence',
    value: draft.abuseIndicator ? 'Yes — Indicator reported' : 'No',
    section: 'Abuse / Domestic Violence',
  })
  if (draft.abuseIndicator && draft.abuseDetails) {
    fields.push({
      label: 'Details (Confidential)',
      value: draft.abuseDetails,
      section: 'Abuse / Domestic Violence',
    })
  }

  return fields
}
