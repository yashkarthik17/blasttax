'use client'

import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SIMULTANEOUS = [
  'IA + Penalty Abatement',
  'IA + Innocent Spouse (pending)',
  'IA + Amended Return',
  'CNC + Penalty Abatement',
  'CDP + Any collection alternative',
]

const EXCLUSIVE = [
  { combo: 'IA + OIC', reason: 'Must terminate IA first' },
  { combo: 'IA + CNC', reason: "Paying vs. can't pay conflict" },
  { combo: 'OIC + CNC', reason: 'Both address inability to pay' },
  { combo: 'OIC + Bankruptcy', reason: 'TC 520 blocks OIC processing' },
]

const SEQUENTIAL = [
  { combo: 'Penalty Abatement -> OIC', reason: 'Reduce balance first, then offer' },
  { combo: 'Amended Return -> OIC', reason: 'Wait for processing before filing' },
  { combo: 'Innocent Spouse -> IA/OIC', reason: 'Resolve allocation first' },
]

const SPECIAL = [
  { text: 'Different resolutions for different tax years', detail: 'CNC for 2020, IA for 2023 -- allowed', allowed: true },
  { text: 'Business 941 + Individual 1040', detail: 'Separate tracks, separate resolutions', allowed: true },
  { text: 'Cannot have two IAs for same tax type', detail: 'Only one active IA per entity type', allowed: false },
]

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function CompatibilityMatrixPage() {
  const router = useRouter()

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628]">Resolution Compatibility</h1>
        <p className="mt-1 text-sm text-[#64748B]">Not all resolutions can run together</p>
      </div>

      {/* SIMULTANEOUS */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#00A651]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A651]">Simultaneous</span>
          <span className="text-xs text-[#94A3B8]">Can coexist</span>
        </div>
        <div className="space-y-2">
          {SIMULTANEOUS.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-[#F1F5F9] bg-white px-4 py-3 transition-all hover:border-[#E2E8F0]">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#00A651]/15">
                <svg className="h-3 w-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#0A1628]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MUTUALLY EXCLUSIVE */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#E63946]">Mutually Exclusive</span>
          <span className="text-xs text-[#94A3B8]">Cannot coexist</span>
        </div>
        <div className="space-y-2">
          {EXCLUSIVE.map((item) => (
            <div key={item.combo} className="flex items-center gap-3 rounded-xl border border-red-500/10 bg-white px-4 py-3 transition-all hover:border-red-500/20">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/15">
                <svg className="h-3 w-3 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0A1628]">{item.combo}</p>
                <p className="text-xs text-[#94A3B8]">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEQUENTIAL */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#2563EB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Sequential</span>
          <span className="text-xs text-[#94A3B8]">Do one, then the other</span>
        </div>
        <div className="space-y-2">
          {SEQUENTIAL.map((item) => (
            <div key={item.combo} className="flex items-center gap-3 rounded-xl border border-blue-500/10 bg-white px-4 py-3 transition-all hover:border-blue-500/20">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15">
                <svg className="h-3 w-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0A1628]">{item.combo}</p>
                <p className="text-xs text-[#94A3B8]">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIAL CASES */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Special Cases</span>
        </div>
        <div className="space-y-2">
          {SPECIAL.map((item) => (
            <div key={item.text} className="flex items-start gap-3 rounded-xl border border-[#F1F5F9] bg-white px-4 py-3.5">
              <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${item.allowed ? 'text-[#00A651]' : 'text-[#E63946]'}`} fill="currentColor" viewBox="0 0 20 20">
                {item.allowed ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                )}
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#0A1628]">{item.text}</p>
                <p className="mt-0.5 text-xs text-[#94A3B8]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="pt-4 text-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#94A3B8] transition-colors hover:text-[#334155]"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Strategy
        </button>
      </div>
    </div>
  )
}
