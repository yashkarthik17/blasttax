'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const FORM_LABELS: Record<string, string> = {
  'form-656': 'Form 656 — OIC',
  'form-9465': 'Form 9465 — IA',
  'form-843': 'Form 843 — Abatement',
  'form-433a-oic': 'Form 433-A(OIC)',
  'form-656a': 'Form 656-A',
  'form-433f': 'Form 433-F',
  'form-12153': 'Form 12153 — CDP Hearing',
  'form-8857': 'Form 8857 — Innocent Spouse',
  'form-433b': 'Form 433-B — Business Financials',
  submission: 'Submission Review',
}

const FORM_ORDER = [
  'form-656a',
  'form-433a-oic',
  'form-433f',
  'form-656',
  'form-9465',
  'form-843',
  'form-12153',
  'form-8857',
  'form-433b',
  'submission',
]

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const segment = pathname.split('/').filter(Boolean).pop() ?? ''
  const formLabel = FORM_LABELS[segment] ?? 'IRS Form'

  const currentIndex = FORM_ORDER.indexOf(segment)
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / FORM_ORDER.length) * 100 : 0
  const stepLabel = currentIndex >= 0 ? `Step ${currentIndex + 1} of ${FORM_ORDER.length}` : ''

  async function handleSaveDraft() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setSaving(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#F1F5F9]">
        <div className="mx-auto flex max-w-md md:max-w-2xl lg:max-w-4xl items-center justify-between px-5 py-3.5">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F3F4F6] transition-all hover:bg-[#F1F5F9] flex-shrink-0"
            aria-label="Go back"
          >
            <i className="fas fa-arrow-left text-sm text-[#64748B]" />
          </button>

          {/* Form Name */}
          <h1 className="text-[0.95rem] font-extrabold text-[#0A1628] text-center flex-1 px-3">{formLabel}</h1>

          {/* Save Draft / spacer */}
          <div className="w-9 flex-shrink-0" />
        </div>

        {/* Progress Bar */}
        {currentIndex >= 0 && (
          <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[0.7rem] font-semibold text-[#94A3B8]">{stepLabel}</span>
              <span className="text-[0.7rem] font-bold text-[#0A1628]">{Math.round(progress)}%</span>
            </div>
            <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#F1F5F9]">
              <div
                className="relative h-full rounded-full bg-[#0A1628] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -top-[1px] right-0 h-[7px] w-[7px] rounded-full bg-[#2563EB]" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-4xl flex-1 px-5 py-4 pb-24">
        {children}
      </main>
    </div>
  )
}
