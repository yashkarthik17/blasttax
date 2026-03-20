'use client'

import Link from 'next/link'

const fields = [
  { label: 'Full Name', value: 'Jane Doe' },
  { label: 'Social Security Number', value: '\u2022\u2022\u2022-\u2022\u2022-1234', secure: true },
  { label: 'Date of Birth', value: 'January 15, 1985' },
  { label: 'Filing Status', value: 'Single' },
  {
    label: 'Mailing Address',
    value: '123 Main Street',
    sub: 'Los Angeles, CA 90001',
  },
]

export default function PersonalInfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#94A3B8]">Step 1/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full" style={{ width: '16.6%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-[18px]">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.4rem] font-extrabold text-[#0A1628] tracking-tight mb-1.5">Personal Information</h1>
          <p className="text-[0.85rem] text-[#94A3B8] font-normal leading-relaxed">Let&apos;s confirm your details</p>
        </div>

        {/* Pre-filled badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF4FF] border border-[#0A1628]/10 rounded-full text-[0.72rem] font-semibold text-[#0A1628] self-start">
          <svg width="10" height="10" fill="#0A1628" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
          Pre-filled from your profile
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] px-4 py-3.5 flex items-center justify-between cursor-pointer hover:border-[#0A1628]/20 hover:bg-[#F8FAFC] active:scale-[0.99] transition-all"
            >
              <div>
                <div className="text-[0.7rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-0.5">{field.label}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.92rem] font-semibold text-[#0A1628]" style={field.label === 'Social Security Number' ? { letterSpacing: '0.05em' } : undefined}>
                    {field.value}
                  </span>
                  {field.secure && (
                    <svg width="10" height="10" fill="#00A651" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
                  )}
                </div>
                {field.sub && <div className="text-[0.82rem] font-semibold text-[#0A1628] mt-0.5">{field.sub}</div>}
              </div>
              <svg width="12" height="12" fill="#CBD5E1" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/></svg>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#ECFDF5] rounded-xl">
          <svg width="14" height="14" fill="#00A651" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          <span className="text-[0.8rem] text-[#065F46] font-medium">Everything look correct?</span>
        </div>

        {/* Continue Button */}
        <div className="pt-1">
          <Link href="/tax-filing/taxpayer" className="w-full flex items-center justify-center gap-2 bg-[#0A1628] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
