import ReactPDF from '@react-pdf/renderer'
import { mapForm656Fields } from '@/lib/pdf/field-mappers/form656'
import { mapForm9465Fields } from '@/lib/pdf/field-mappers/form9465'
import { mapForm843Fields } from '@/lib/pdf/field-mappers/form843'
import { mapForm433AOICFields } from '@/lib/pdf/field-mappers/form433aOic'
import { mapForm656AFields } from '@/lib/pdf/field-mappers/form656a'
import { mapForm433FFields } from '@/lib/pdf/field-mappers/form433f'
import { mapForm12153Fields } from '@/lib/pdf/field-mappers/form12153'
import { mapForm8857Fields } from '@/lib/pdf/field-mappers/form8857'
import { FormPdfDocument } from '@/lib/pdf/templates/FormPdfDocument'

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface PdfDataSource {
  caseData: Record<string, unknown>
  calculations: Record<string, unknown>
  formDraft: Record<string, unknown>
}

export interface FormField {
  label: string
  value: string
  section?: string
}

/* ------------------------------------------------------------------ */
/* Field Mapper Registry                                               */
/* ------------------------------------------------------------------ */

type FieldMapper = (data: PdfDataSource) => FormField[]

const FIELD_MAPPERS: Record<string, FieldMapper> = {
  'form-656': mapForm656Fields,
  'form-9465': mapForm9465Fields,
  'form-843': mapForm843Fields,
  'form-433a-oic': mapForm433AOICFields,
  'form-656a': mapForm656AFields,
  'form-433f': mapForm433FFields,
  'form-12153': mapForm12153Fields,
  'form-8857': mapForm8857Fields,
}

/* ------------------------------------------------------------------ */
/* Form Label Registry                                                 */
/* ------------------------------------------------------------------ */

const FORM_TITLES: Record<string, string> = {
  'form-656': 'Form 656 — Offer in Compromise',
  'form-9465': 'Form 9465 — Installment Agreement Request',
  'form-843': 'Form 843 — Claim for Refund and Request for Abatement',
  'form-433a-oic': 'Form 433-A(OIC) — Collection Information Statement',
  'form-656a': 'Form 656-A — Income Certification for OIC',
  'form-433f': 'Form 433-F — Collection Information Statement',
  'form-12153': 'Form 12153 — Request for CDP/Equivalent Hearing',
  'form-8857': 'Form 8857 — Request for Innocent Spouse Relief',
}

/* ------------------------------------------------------------------ */
/* PDF Generation Coordinator                                          */
/* ------------------------------------------------------------------ */

/**
 * Generates a PDF for the specified IRS form type.
 *
 * 1. Looks up the field mapper for the given form type.
 * 2. Calls the mapper to extract and format all field data from the
 *    case data, calculations, and form draft.
 * 3. Renders a formatted PDF document using @react-pdf/renderer.
 * 4. Returns the PDF as a Node.js Buffer.
 *
 * The generated PDF includes all form field data in a clean, organized
 * layout. Exact IRS form replication (field placement on official form
 * templates) will be implemented in a future phase.
 *
 * @param formType - The IRS form identifier (e.g., 'form-656').
 * @param data - Combined data from case, calculations, and form draft.
 * @returns A Buffer containing the PDF file contents.
 */
export async function generatePdf(
  formType: string,
  data: PdfDataSource
): Promise<Buffer> {
  const mapper = FIELD_MAPPERS[formType]

  if (!mapper) {
    throw new Error(`No field mapper registered for form type: ${formType}`)
  }

  const title = FORM_TITLES[formType] ?? formType
  const fields = mapper(data)

  // Render the React PDF document to a Node.js stream, then collect into a Buffer
  const pdfStream = await ReactPDF.renderToStream(
    FormPdfDocument({ title, fields, formType })
  )

  // Collect the stream into a Buffer
  const chunks: Uint8Array[] = []
  for await (const chunk of pdfStream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks)
}
