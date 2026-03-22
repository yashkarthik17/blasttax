'use client'

import Link from 'next/link'

const sections: { label: string; icon: React.ReactNode; docs: { name: string; pages: string; iconBg: string; hasEye?: boolean }[] }[] = [
  {
    label: 'IRS Forms',
    icon: (
      <svg className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    docs: [
      { name: 'Form 656', pages: '3 pages', iconBg: 'bg-[#EFF4FF]', hasEye: true },
      { name: 'Form 433-A(OIC)', pages: '8 pages', iconBg: 'bg-[#EFF4FF]', hasEye: true },
    ],
  },
  {
    label: 'Financial Documents',
    icon: (
      <svg className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
    docs: [
      { name: 'Bank Statements (3 months)', pages: '12 pages', iconBg: 'bg-[#E6F9EE]' },
      { name: 'Pay Stubs (3 months)', pages: '6 pages', iconBg: 'bg-[#E6F9EE]' },
    ],
  },
  {
    label: 'IRS Documents',
    icon: (
      <svg className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
    docs: [
      { name: 'Account Transcript', pages: '4 pages', iconBg: 'bg-[#F5F0FF]' },
      { name: 'Notice of Intent', pages: '2 pages', iconBg: 'bg-[#F5F0FF]' },
    ],
  },
  {
    label: 'Identification',
    icon: (
      <svg className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
      </svg>
    ),
    docs: [
      { name: 'Government ID', pages: '1 page', iconBg: 'bg-[#FFFBEB]' },
    ],
  },
]

export default function HandoffDocumentsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/handoff/intake" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-4 h-4 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Document Package</h1>
          <div className="w-10" />
        </div>

        {/* Step Indicator */}
        <div className="px-5 pb-2">
          <div className="flex items-center gap-2">
            {/* Step 1 complete */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#00A651] flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div className="w-10 h-[3px] bg-[#00A651] rounded-full" />
            </div>
            {/* Step 2 active */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#1A1A2E] flex items-center justify-center">
                <span className="text-[0.7rem] font-bold text-white">2</span>
              </div>
              <div className="w-10 h-[3px] bg-[#D5D5E0] rounded-full" />
            </div>
            {/* Step 3 */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#D5D5E0] flex items-center justify-center">
                <span className="text-[0.7rem] font-bold text-[#B0B0C8]">3</span>
              </div>
              <div className="w-10 h-[3px] bg-[#D5D5E0] rounded-full" />
            </div>
            {/* Step 4 */}
            <div className="w-6 h-6 rounded-full bg-[#D5D5E0] flex items-center justify-center">
              <span className="text-[0.7rem] font-bold text-[#B0B0C8]">4</span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-10 space-y-[18px]">
          {/* Heading */}
          <div>
            <div className="text-[1.25rem] font-extrabold text-[#1A1A2E] tracking-tight leading-tight">Review Your Document Package</div>
            <div className="text-[0.82rem] text-[#8585A0] mt-1.5 leading-relaxed">These documents will be sent to your tax professional</div>
          </div>

          {/* Document Sections */}
          {sections.map((section) => (
            <div key={section.label}>
              <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-2.5 flex items-center gap-1">
                {section.icon}
                {section.label}
              </div>
              <div className="bg-white rounded-2xl px-4 py-1 border border-[#F0F0F5]">
                {section.docs.map((doc, i) => (
                  <div key={doc.name} className={`flex items-center gap-3 py-3 ${i < section.docs.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
                    <div className={`w-9 h-9 rounded-[10px] ${doc.iconBg} flex items-center justify-center shrink-0`}>
                      <svg className="w-3.5 h-3.5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.85rem] font-semibold text-[#1A1A2E]">{doc.name}</div>
                      <div className="text-[0.7rem] text-[#8585A0]">{doc.pages}</div>
                    </div>
                    {doc.hasEye && (
                      <svg className="w-[13px] h-[13px] text-[#B0B0C8] cursor-pointer mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                    <div className="w-[22px] h-[22px] rounded-full bg-[#E6F9EE] flex items-center justify-center">
                      <svg className="w-[9px] h-[9px] text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-7 h-7 rounded-full bg-[#EFF4FF] flex items-center justify-center">
              <svg className="w-3 h-3 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            </div>
            <span className="text-[0.82rem] font-bold text-[#1A1A2E]">7 documents</span>
            <span className="text-[0.72rem] text-[#8585A0]">&bull;</span>
            <span className="text-[0.82rem] font-bold text-[#1A1A2E]">36 pages</span>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/expert/handoff/review"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#00A651] text-white rounded-full text-[0.88rem] font-bold hover:-translate-y-0.5 transition-transform"
            >
              <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
              Send to Expert
            </Link>
            <button className="flex items-center justify-center gap-1.5 w-full py-3 border-2 border-[#D5D5E0] bg-white text-[#1A1A2E] rounded-full text-[0.82rem] font-semibold hover:border-[#1A1A2E] transition">
              <svg className="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add More Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
