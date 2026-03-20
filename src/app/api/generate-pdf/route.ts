import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { generatePdf } from '@/lib/pdf/generator'

/**
 * PDF Generation API Endpoint
 *
 * Receives POST { caseId, formType } and returns a PDF as a downloadable response.
 *
 * Supported form types:
 *   form-656, form-9465, form-843, form-433a-oic, form-656a, form-433f,
 *   form-12153, form-8857
 */

const VALID_FORM_TYPES = new Set([
  'form-656',
  'form-9465',
  'form-843',
  'form-433a-oic',
  'form-656a',
  'form-433f',
  'form-12153',
  'form-8857',
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { caseId, formType } = body

    if (!caseId || typeof caseId !== 'string') {
      return NextResponse.json({ error: 'caseId is required' }, { status: 400 })
    }

    if (!formType || !VALID_FORM_TYPES.has(formType)) {
      return NextResponse.json(
        { error: `Invalid formType. Must be one of: ${[...VALID_FORM_TYPES].join(', ')}` },
        { status: 400 }
      )
    }

    // Fetch case data from Supabase
    const supabase = await createServerSupabaseClient()

    const { data: caseData, error: caseError } = await supabase
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .single()

    if (caseError || !caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      )
    }

    // Fetch calculated results
    const { data: calculations } = await supabase
      .from('calculations')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Fetch form draft data (if user saved a draft)
    const { data: formDraft } = await supabase
      .from('form_drafts')
      .select('*')
      .eq('case_id', caseId)
      .eq('form_type', formType)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    // Generate PDF
    const pdfBuffer = await generatePdf(formType, {
      caseData,
      calculations: calculations ?? {},
      formDraft: formDraft ?? {},
    })

    // Return PDF as downloadable response
    const filename = `${formType}-${caseId.slice(0, 8)}.pdf`

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
