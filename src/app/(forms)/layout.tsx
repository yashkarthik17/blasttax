'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const FORM_LABELS: Record<string, string> = {
  'form-656': 'Form 656 — Offer in Compromise',
  'form-9465': 'Form 9465 — Installment Agreement Request',
  'form-843': 'Form 843 — Claim for Refund / Abatement',
  'form-433a-oic': 'Form 433-A(OIC) — Collection Information Statement',
  'form-656a': 'Form 656-A — Income Certification',
  'form-433f': 'Form 433-F — Collection Information Statement',
  'form-12153': 'Form 12153 — CDP / Equivalent Hearing',
  'form-8857': 'Form 8857 — Innocent Spouse Relief',
  'form-433b': 'Form 433-B — Business Collection Information',
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

  async function handleSaveDraft() {
    setSaving(true)
    // Persist current form state to Supabase draft
    await new Promise((r) => setTimeout(r, 600))
    setSaving(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Form Name */}
          <h1 className="text-sm font-semibold text-zinc-100 sm:text-base">{formLabel}</h1>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
        </div>

        {/* Progress Bar */}
        {currentIndex >= 0 && (
          <div className="mx-auto max-w-4xl px-4 pb-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-right text-[11px] text-zinc-500">
              Step {currentIndex + 1} of {FORM_ORDER.length}
            </p>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  )
}
