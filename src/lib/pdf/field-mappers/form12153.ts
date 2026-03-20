import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 12153 (CDP / Equivalent Hearing) PDF fields.
 */
export function mapForm12153Fields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  // Taxpayer Info
  fields.push(
    { label: 'Full Name', value: c.taxpayer_name ?? draft.name ?? '', section: 'Taxpayer Information' },
    { label: 'SSN', value: c.ssn ?? draft.ssn ?? '', section: 'Taxpayer Information' },
    { label: 'Address', value: `${c.address ?? ''}, ${c.city ?? ''}, ${c.state ?? ''} ${c.zip ?? ''}`, section: 'Taxpayer Information' },
    { label: 'Phone', value: c.phone ?? draft.phone ?? '', section: 'Taxpayer Information' },
  )

  // Tax Periods
  const selectedYears: string[] = draft.selectedYears ?? []
  fields.push(
    { label: 'Tax Periods', value: selectedYears.join(', ') || 'Not specified', section: 'Tax Periods Affected' },
    { label: 'Tax Type', value: draft.taxType ?? 'Income', section: 'Tax Periods Affected' },
  )

  // Notice Info
  const noticeLabels: Record<string, string> = {
    CP90: 'CP90 — Final Notice of Intent to Levy',
    LT11: 'LT11 — Final Notice of Intent to Levy',
    Letter1058: 'Letter 1058 — Final Notice',
    Letter3172: 'Letter 3172 — Notice of Federal Tax Lien Filing',
  }

  fields.push(
    { label: 'Notice Type', value: noticeLabels[draft.noticeType ?? ''] ?? draft.noticeType ?? '', section: 'Notice Information' },
    { label: 'Notice Date', value: draft.noticeDate ?? '', section: 'Notice Information' },
  )

  // Hearing Type
  const hearingType = draft.hearingType ?? 'CDP'
  fields.push({
    label: 'Hearing Type',
    value: hearingType === 'CDP' ? 'Collection Due Process (CDP) Hearing' : 'Equivalent Hearing',
    section: 'Hearing Request',
  })

  if (hearingType === 'Equivalent') {
    fields.push({
      label: 'Note',
      value: '30-day CDP deadline has passed. Equivalent hearing requested (no Tax Court review).',
      section: 'Hearing Request',
    })
  }

  // Issues
  const issueLabels: Record<string, string> = {
    installmentAgreement: 'Installment Agreement',
    offerInCompromise: 'Offer in Compromise',
    cnc: 'Currently Not Collectible',
    penaltyAbatement: 'Penalty Abatement',
    innocentSpouse: 'Innocent Spouse Relief',
    lienDischarge: 'Lien Discharge / Withdrawal',
  }

  const issues: Record<string, boolean> = draft.issues ?? {}
  const selectedIssues = Object.entries(issues)
    .filter(([, v]) => v)
    .map(([k]) => issueLabels[k] ?? k)

  fields.push({
    label: 'Issues to Raise',
    value: selectedIssues.length > 0 ? selectedIssues.join('; ') : 'None specified',
    section: 'Issues for Hearing',
  })

  // Additional Info
  if (draft.additionalInfo) {
    fields.push({
      label: 'Additional Information',
      value: draft.additionalInfo,
      section: 'Additional Information',
    })
  }

  return fields
}
