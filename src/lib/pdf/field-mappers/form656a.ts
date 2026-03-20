import type { PdfDataSource, FormField } from '@/lib/pdf/generator'

/**
 * Maps case data to Form 656-A (Income Certification) PDF fields.
 */
export function mapForm656AFields(data: PdfDataSource): FormField[] {
  const c = data.caseData as Record<string, any>
  const calc = data.calculations as Record<string, any>
  const draft = data.formDraft as Record<string, any>

  const fields: FormField[] = []

  const householdSize = Number(c.family_size ?? draft.householdSize ?? 1)
  const grossMonthly = Number(calc.total_income ?? draft.grossMonthlyIncome ?? 0)
  const annualIncome = grossMonthly * 12

  // FPL 250% lookup
  const fpl250: Record<number, number> = { 1: 39900, 2: 54100, 3: 68300, 4: 82500 }
  const perAdditional = 14200
  const fplThreshold = householdSize <= 4
    ? (fpl250[householdSize] ?? fpl250[1])
    : fpl250[4] + (householdSize - 4) * perAdditional

  const isBelow = annualIncome <= fplThreshold

  fields.push(
    { label: 'Household Size', value: String(householdSize), section: 'Household Information' },
    { label: 'Gross Monthly Income', value: `$${grossMonthly.toLocaleString()}`, section: 'Household Information' },
    { label: 'Annual Income', value: `$${annualIncome.toLocaleString()}`, section: 'Income Determination' },
    { label: '250% FPL Threshold', value: `$${fplThreshold.toLocaleString()}`, section: 'Income Determination' },
    {
      label: 'Determination',
      value: isBelow
        ? `Income ($${annualIncome.toLocaleString()}) is AT OR BELOW 250% FPL ($${fplThreshold.toLocaleString()}) — QUALIFIES for fee waiver`
        : `Income ($${annualIncome.toLocaleString()}) is ABOVE 250% FPL ($${fplThreshold.toLocaleString()}) — Does NOT qualify`,
      section: 'Income Determination',
    },
    {
      label: 'Application Fee',
      value: isBelow ? 'WAIVED ($0)' : '$205',
      section: 'Fee Determination',
    },
    {
      label: 'Initial Payment',
      value: isBelow ? 'WAIVED ($0)' : 'Required (20% of offer amount)',
      section: 'Fee Determination',
    },
    {
      label: 'Certification',
      value: draft.certified ? 'Certified under penalty of perjury' : 'Not yet certified',
      section: 'Certification',
    },
  )

  return fields
}
