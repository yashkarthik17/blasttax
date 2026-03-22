'use client'

import Link from 'next/link'

const docs = [
  { name: 'Form 656', sub: 'Generated', done: true },
  { name: 'Form 433-A(OIC)', sub: 'Generated', done: true },
  { name: 'IRS Transcript', sub: 'Retrieved', done: true },
  { name: 'Last 3 months bank statements', sub: 'Upload needed', done: false },
  { name: 'Last 3 pay stubs', sub: 'Upload needed', done: false },
  { name: 'Photo ID', sub: 'Upload needed', done: false },
]

export default function HandoffIntakePage() {
  const completedCount = docs.filter(d => d.done).length
  const progressPercent = Math.round((completedCount / docs.length) * 100)

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-[18px] h-[18px] text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Handoff</h1>
        </div>

        <div className="px-5 pb-10 space-y-5">
          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {/* Step 1 active */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#1A1A2E] flex items-center justify-center">
                <span className="text-[0.7rem] font-bold text-white">1</span>
              </div>
              <div className="w-10 h-[3px] bg-[#1A1A2E] rounded-full" />
            </div>
            {/* Step 2 */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#D5D5E0] flex items-center justify-center">
                <span className="text-[0.7rem] font-bold text-[#B0B0C8]">2</span>
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

          {/* Heading */}
          <div>
            <div className="text-[1.3rem] font-extrabold text-[#1A1A2E] tracking-tight leading-tight">Prepare Your Case for Expert Review</div>
            <div className="text-[0.82rem] text-[#8585A0] font-medium mt-2 leading-relaxed">We&apos;ll package everything your tax professional needs</div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white rounded-2xl border border-[#F0F0F5] overflow-hidden shadow-sm">
            {docs.map((doc, i) => (
              <div key={doc.name} className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#FAFAFF] transition ${i < docs.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
                {doc.done ? (
                  <div className="w-8 h-8 rounded-full bg-[#00A651] flex items-center justify-center shrink-0">
                    <svg className="w-[13px] h-[13px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F1] border-2 border-dashed border-[#D5D5E0] flex items-center justify-center shrink-0">
                    <svg className="w-[11px] h-[11px] text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[0.85rem] font-semibold text-[#1A1A2E]">{doc.name}</div>
                  <div className={`text-[0.7rem] font-medium mt-0.5 ${doc.done ? 'text-[#00A651]' : 'text-[#E63946]'}`}>{doc.sub}</div>
                </div>
                {doc.done ? (
                  <svg className="w-4 h-4 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ) : (
                  <button className="px-3.5 py-1.5 bg-[#EFF4FF] rounded-full text-[0.72rem] font-bold text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white transition">Upload</button>
                )}
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.82rem] font-semibold text-[#1A1A2E]">{completedCount} of {docs.length} documents ready</span>
              <span className="text-xs font-bold text-[#1A1A2E]">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-[#D5D5E0] rounded-full overflow-hidden">
              <div className="h-full bg-[#1A1A2E] rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Link
              href="/expert/handoff/documents"
              className="flex items-center justify-center gap-2 w-full py-4 px-7 bg-[#1A1A2E] text-white rounded-full text-[0.95rem] font-bold opacity-50 pointer-events-none"
            >
              Continue to Review
              <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <div className="text-center mt-2.5 text-[0.72rem] text-[#8585A0] font-medium flex items-center justify-center gap-1">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
              Upload remaining documents to continue
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
