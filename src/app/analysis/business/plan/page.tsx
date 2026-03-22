'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RESOLUTION_TYPES = [
  'In-Business Trust Fund Express IA',
  'Out-of-Business Streamlined IA',
  'Non-Streamlined Installment Agreement',
  'Business Offer in Compromise',
  'Penalty Abatement',
  'Collection Due Process (CDP)',
] as const

const FORMS_CHECKLIST: Record<string, string[]> = {
  'In-Business Trust Fund Express IA': [
    'Form 9465 (Installment Agreement Request)',
    'Proof of EFTPS enrollment',
    'All unfiled returns',
  ],
  'Out-of-Business Streamlined IA': [
    'Form 9465 (Installment Agreement Request)',
    'Final returns filed',
    'All unfiled returns',
  ],
  'Non-Streamlined Installment Agreement': [
    'Form 433-B (Collection Information Statement for Businesses)',
    'Form 9465 (Installment Agreement Request)',
    'Proof of EFTPS enrollment',
    'Bank statements (3 months)',
    'Profit & loss statements',
    'All unfiled returns',
  ],
  'Business Offer in Compromise': [
    'Form 656 (Offer in Compromise)',
    'Form 433-B (OIC) (Collection Information Statement)',
    '$205 application fee',
    '20% initial payment (lump sum) or first month payment (periodic)',
    'Bank statements (3 months)',
    'Asset documentation',
    'All unfiled returns',
  ],
  'Penalty Abatement': [
    'Written penalty abatement request letter',
    'Supporting documentation for reasonable cause',
    'Compliance history records',
  ],
  'Collection Due Process (CDP)': [
    'Form 12153 (Request for a Collection Due Process Hearing)',
    'Filed within 30 days of levy/lien notice',
    'Supporting documentation',
  ],
}

const TIMELINES: Record<string, string> = {
  'In-Business Trust Fund Express IA': '30-60 days',
  'Out-of-Business Streamlined IA': '30-60 days',
  'Non-Streamlined Installment Agreement': '60-120 days',
  'Business Offer in Compromise': '6-12 months',
  'Penalty Abatement': '30-90 days',
  'Collection Due Process (CDP)': '3-6 months',
}

const ACTION_ITEMS: Record<string, string[]> = {
  'In-Business Trust Fund Express IA': [
    'Verify total trust fund balance is within $25K threshold',
    'Ensure EFTPS is enrolled and current deposits are being made',
    'File all missing returns',
    'Submit Form 9465 with proposed payment amount',
  ],
  'Out-of-Business Streamlined IA': [
    'Confirm business has ceased operations',
    'File all final returns with "Final" box checked',
    'Verify total liability is within $25K threshold',
    'Submit Form 9465',
  ],
  'Non-Streamlined Installment Agreement': [
    'Complete Form 433-B with full financial disclosure',
    'Gather 3 months of bank statements',
    'Prepare profit & loss statements',
    'Ensure filing and deposit compliance',
    'Propose monthly payment amount',
  ],
  'Business Offer in Compromise': [
    'Calculate RCP (business + personal)',
    'Prepare Form 433-B (OIC) with supporting documentation',
    'Determine offer amount (must exceed RCP)',
    'Prepare $205 application fee',
    'Prepare 20% initial payment or first monthly installment',
    'Ensure full filing and deposit compliance',
  ],
  'Penalty Abatement': [
    'Identify penalty type and amount',
    'Document reasonable cause or verify first-time abatement eligibility',
    'Draft penalty abatement request letter',
    'Gather supporting evidence',
  ],
  'Collection Due Process (CDP)': [
    'Verify you received a qualifying notice',
    'Confirm you are within the 30-day window',
    'Complete Form 12153',
    'Prepare proposed resolution alternative',
  ],
}

export default function BusinessPlanPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string>(RESOLUTION_TYPES[0])

  const forms = FORMS_CHECKLIST[selected] || []
  const timeline = TIMELINES[selected] || 'Varies'
  const actions = ACTION_ITEMS[selected] || []

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF] px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E]">
            Resolution Plan
          </h1>
          <p className="mt-3 text-base text-[#5C5C7A]">
            Select your resolution strategy and review the action plan.
          </p>
        </div>

        <div className="space-y-6">
          {/* Resolution Type Selector */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <p className="mb-4 font-medium text-[#1A1A2E]">
              Selected Resolution Type
            </p>
            <div className="space-y-2">
              {RESOLUTION_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelected(type)}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition-all ${
                    selected === type
                      ? 'border-emerald-500/50 bg-[#00A651]/10 text-[#1A1A2E]'
                      : 'border-[#D5D5E0] bg-[#FAFAFF] text-[#334155] hover:border-[#D5D5E0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        selected === type
                          ? 'border-emerald-500 bg-[#00A651]'
                          : 'border-[#D5D5E0]'
                      }`}
                    />
                    {type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium text-[#1A1A2E]">Estimated Timeline</p>
              <span className="rounded-full bg-[#00A651]/15 px-3 py-1 text-sm font-semibold text-[#00A651]">
                {timeline}
              </span>
            </div>
          </div>

          {/* Required Forms */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <p className="mb-4 font-medium text-[#1A1A2E]">Required Forms</p>
            <ul className="space-y-3">
              {forms.map((form) => (
                <li key={form} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 shrink-0 text-[#8585A0]"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                  <span className="text-sm leading-relaxed text-[#334155]">
                    {form}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <p className="mb-4 font-medium text-[#1A1A2E]">Action Items</p>
            <ol className="space-y-3">
              {actions.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A651]/15 text-xs font-bold text-[#00A651]">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-[#334155]">
                    {action}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Proceed to Forms */}
        <button
          onClick={() => router.push('/forms')}
          className="mt-10 w-full rounded-xl bg-[#00A651] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#008C44] active:bg-[#008C44]"
        >
          Proceed to Forms
        </button>
      </div>
    </div>
  )
}
