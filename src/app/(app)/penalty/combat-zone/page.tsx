'use client'

import { useRouter } from 'next/navigation'

const BENEFITS = [
  { title: '6% Interest Rate Cap', desc: 'Interest on pre-service tax debt capped at 6% during active duty', iconBg: 'bg-[#E6F9EE]', iconColor: 'text-[#00A651]' },
  { title: 'CSED Tolling', desc: 'Collection statute of limitations pauses during deployment period', iconBg: 'bg-[#F5F0FF]', iconColor: 'text-[#7C3AED]' },
  { title: 'Filing Extensions', desc: 'Automatic 180-day extension after leaving combat zone', iconBg: 'bg-[#EBF0FF]', iconColor: 'text-[#0A1628]' },
  { title: 'Penalty Protection', desc: 'FTF/FTP penalties suspended during active military service', iconBg: 'bg-[#FFF0F1]', iconColor: 'text-[#E63946]' },
  { title: 'Collection Activity Halt', desc: 'No levies, liens, or seizures during deployment period', iconBg: 'bg-[#F0FDFA]', iconColor: 'text-[#0D9488]' },
]

const QUALIFYING_SERVICE = [
  'Active duty in a designated combat zone',
  'Supporting operations in hazardous duty areas',
  'Hospitalization from combat zone service',
]

const HOW_TO_CLAIM = [
  { title: 'File Form 7508-A', desc: 'Or attach a combat zone statement to your return' },
  { title: 'Write "COMBAT ZONE" on return', desc: 'Write it clearly across the top of your tax return' },
  { title: 'Include deployment orders', desc: 'Attach copies of your official deployment orders as documentation' },
]

export default function PenaltyCombatZonePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Military Tax Relief</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-8">
        {/* Heading */}
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF0FF] px-3 py-1 text-[0.65rem] font-bold text-[#0A1628] mb-2.5">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            MILITARY PROTECTIONS
          </span>
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">
            Service Member Protections
          </h1>
        </div>

        {/* SCRA Label */}
        <div className="flex items-center gap-2 px-1">
          <div className="text-[0.7rem] font-bold text-[#CBD5E1] uppercase tracking-wider">SCRA Benefits</div>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        {/* Benefit Cards */}
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-start gap-3 rounded-[14px] border border-[#E2E8F0] bg-white p-3.5 transition-all hover:shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:-translate-y-px"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${benefit.iconBg} shrink-0`}>
              <svg className={`h-3.5 w-3.5 ${benefit.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.82rem] font-bold text-[#0A1628]">{benefit.title}</div>
              <div className="text-[0.72rem] text-[#94A3B8] mt-0.5 leading-relaxed">{benefit.desc}</div>
            </div>
          </div>
        ))}

        {/* Qualifying Service */}
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.7rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Qualifying Service</div>
          {QUALIFYING_SERVICE.map((item) => (
            <div key={item} className="flex items-center gap-2 py-[7px]">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0A1628] shrink-0">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[0.78rem] font-medium text-[#0A1628]">{item}</span>
            </div>
          ))}
        </div>

        {/* How to Claim */}
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EBF0FF]">
              <svg className="h-3 w-3 text-[#0A1628]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/></svg>
            </div>
            <span className="text-[0.85rem] font-bold text-[#0A1628]">How to Claim</span>
          </div>

          {HOW_TO_CLAIM.map((step, index) => (
            <div key={step.title} className={`flex items-start gap-3 py-3 ${index < HOW_TO_CLAIM.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EBF0FF] text-[0.7rem] font-extrabold text-[#0A1628] shrink-0">
                {index + 1}
              </div>
              <div>
                <div className="text-[0.8rem] font-semibold text-[#0A1628]">{step.title}</div>
                <div className="text-[0.72rem] text-[#94A3B8] mt-0.5 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Callout */}
        <div className="flex items-start gap-2.5 rounded-[14px] border border-[#C5D5F5] bg-[#EBF0FF] px-4 py-3.5">
          <svg className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <p className="text-[0.75rem] text-[#1E40AF] leading-relaxed font-medium">
            <strong>Timeline:</strong> Protections begin on your deployment date and extend 180 days after your return from the combat zone.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-1">
          <button className="w-full rounded-full bg-[#0A1628] py-4 text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
            <svg className="inline-block h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Military Tax Support
          </button>
        </div>
      </div>
    </div>
  )
}
