'use client'

import { useRouter } from 'next/navigation'

const QUALIFIES = [
  'Written response from IRS to your inquiry',
  'Published IRS guidance that was later corrected',
  'IRS processing delay caused the penalty',
]

const NOT_QUALIFIES = [
  'Verbal advice from IRS phone representative',
  'Tax preparer error (that\'s your preparer\'s liability)',
  'Misunderstanding of published guidance',
]

const HOW_TO_REQUEST = [
  { title: 'Gather the original IRS correspondence', desc: 'Locate the letter or notice containing the erroneous advice' },
  { title: 'File Form 843 with explanation', desc: 'Use Form 843 (Claim for Refund and Request for Abatement)' },
  { title: 'Attach copies of the erroneous advice', desc: 'Include copies (not originals) of the IRS correspondence' },
  { title: 'Reference IRC \u00A7 6404(f) specifically', desc: 'Cite this section to ensure the IRS processes your claim correctly' },
]

export default function PenaltyIrsErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D5D5E0] bg-[#FAFAFF] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">IRS Error Relief</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-8">
        {/* Heading */}
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F1] px-3 py-1 text-[0.65rem] font-bold text-[#E63946] mb-2.5">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            IRS MISTAKES
          </span>
          <h1 className="text-[1.3rem] font-extrabold text-[#1A1A2E] leading-tight tracking-tight">
            Penalties Caused by IRS Mistakes
          </h1>
        </div>

        {/* Explanation */}
        <div className="rounded-[14px] bg-[#FAFAFF] border border-[#D5D5E0] p-3.5 px-4">
          <p className="text-[0.78rem] text-[#5C5C7A] leading-relaxed">
            If the IRS gave you incorrect written advice that led to a penalty, or made a processing error, you may qualify for complete penalty removal under IRC &sect; 6404(f).
          </p>
        </div>

        {/* Section Label */}
        <div className="text-[0.7rem] font-bold text-[#B0B0C8] uppercase tracking-wider px-1">
          Two Types of IRS Error Relief
        </div>

        {/* Type 1: Written IRS Advice */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="h-[3px] bg-[#1A1A2E]" />
          <div className="p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EBF0FF]">
                <svg className="h-4 w-4 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div>
                <div className="text-[0.88rem] font-extrabold text-[#1A1A2E]">Written IRS Advice</div>
                <div className="text-[0.68rem] text-[#8585A0] mt-px">IRC &sect; 6404(f)</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {[
                'Must be written response to YOUR specific question',
                'You relied on the advice in good faith',
                'You provided accurate and complete information to IRS',
                'Keep the original IRS letter or notice as documentation',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#1A1A2E] mt-1.5 shrink-0" />
                  <span className="text-[0.75rem] text-[#5C5C7A] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Type 2: IRS Processing Error */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="h-[3px] bg-[#7C3AED]" />
          <div className="p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F5F0FF]">
                <svg className="h-4 w-4 text-[#7C3AED]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
              </div>
              <div>
                <div className="text-[0.88rem] font-extrabold text-[#1A1A2E]">IRS Processing Error</div>
                <div className="text-[0.68rem] text-[#8585A0] mt-px">System / Clerical Mistakes</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {[
                'IRS made a clerical or processing mistake',
                'Penalty resulted from IRS system error',
                'TC 290 or TC 300 posted incorrectly on your transcript',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                  <span className="text-[0.75rem] text-[#5C5C7A] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What Qualifies */}
        <div className="rounded-[18px] border border-[#D5D5E0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.7rem] font-bold text-[#00A651] uppercase tracking-wider mb-2.5 flex items-center gap-1">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            What Qualifies
          </div>
          {QUALIFIES.map((item) => (
            <div key={item} className="flex items-start gap-2 py-[7px]">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#00A651] shrink-0">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[0.78rem] font-medium text-[#1A1A2E]">{item}</span>
            </div>
          ))}
        </div>

        {/* What Doesn't Qualify */}
        <div className="rounded-[18px] border border-[#D5D5E0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.7rem] font-bold text-[#E63946] uppercase tracking-wider mb-2.5 flex items-center gap-1">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
            What Doesn&apos;t Qualify
          </div>
          {NOT_QUALIFIES.map((item) => (
            <div key={item} className="flex items-start gap-2 py-[7px]">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#E63946] shrink-0">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-[0.78rem] font-medium text-[#1A1A2E]">{item}</span>
            </div>
          ))}
        </div>

        {/* How to Request */}
        <div className="rounded-[18px] border border-[#D5D5E0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EBF0FF]">
              <svg className="h-3 w-3 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
            </div>
            <span className="text-[0.85rem] font-bold text-[#1A1A2E]">How to Request</span>
          </div>

          {HOW_TO_REQUEST.map((step, index) => (
            <div key={step.title} className={`flex items-start gap-3 py-3 ${index < HOW_TO_REQUEST.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EBF0FF] text-[0.7rem] font-extrabold text-[#1A1A2E] shrink-0">
                {index + 1}
              </div>
              <div>
                <div className="text-[0.8rem] font-semibold text-[#1A1A2E]">{step.title}</div>
                <div className="text-[0.72rem] text-[#8585A0] mt-0.5 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-1">
          <button className="w-full rounded-full bg-[#00A651] py-4 text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
            <svg className="inline-block h-3.5 w-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg>
            File Form 843
          </button>
        </div>
      </div>
    </div>
  )
}
