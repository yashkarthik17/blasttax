'use client'

import Link from 'next/link'

export default function HandoffReviewPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/handoff/documents" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-4 h-4 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Review</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-8 space-y-[18px]">
          {/* Status Timeline */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0F0F5]">
            {/* Step 1: Documents Sent */}
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#00A651] flex items-center justify-center shrink-0">
                <svg className="w-[13px] h-[13px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-bold text-[#1A1A2E]">Documents Sent</div>
                <div className="text-[0.7rem] text-[#00A651] font-medium">Mar 12</div>
              </div>
            </div>
            <div className="w-0.5 h-7 bg-[#00A651] ml-[15px]" />

            {/* Step 2: Expert Received */}
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#00A651] flex items-center justify-center shrink-0">
                <svg className="w-[13px] h-[13px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-bold text-[#1A1A2E]">Expert Received</div>
                <div className="text-[0.7rem] text-[#00A651] font-medium">Mar 12</div>
              </div>
            </div>
            <div className="w-0.5 h-7 bg-[#00A651] ml-[15px]" />

            {/* Step 3: Under Review (active) */}
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0">
                <svg className="w-[13px] h-[13px] text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-bold text-[#1A1A2E]">Under Review</div>
                <div className="text-[0.7rem] text-[#2563EB] font-semibold">Mar 13 &mdash; In progress</div>
              </div>
            </div>
            <div className="w-0.5 h-7 bg-[#D5D5E0] ml-[15px]" />

            {/* Step 4: Recommendation Ready (pending) */}
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#F0F0F5] border-2 border-dashed border-[#D5D5E0] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#8585A0]">Recommendation Ready</div>
                <div className="text-[0.7rem] text-[#B0B0C8] font-medium">Expected Mar 15</div>
              </div>
            </div>
          </div>

          {/* Expert Activity Card */}
          <div className="bg-white rounded-2xl p-4 border border-[#F0F0F5]">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="relative w-11 h-11 shrink-0">
                <div className="w-full h-full rounded-full bg-[#1A1A2E] flex items-center justify-center">
                  <span className="text-[0.88rem] font-extrabold text-white">MC</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A651] rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <div className="text-[0.9rem] font-bold text-[#1A1A2E]">Michael Chen is reviewing your case</div>
                <div className="text-[0.72rem] text-[#8585A0] mt-0.5 flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Last active: 2 hours ago
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.78rem] font-semibold text-[#5C5C7A]">Documents reviewed</span>
              <span className="text-[0.78rem] font-bold text-[#1A1A2E]">5 of 7</span>
            </div>
            <div className="h-[5px] bg-[#F0F0F5] rounded-full overflow-hidden">
              <div className="h-full bg-[#1A1A2E] rounded-full" style={{ width: '71%' }} />
            </div>
          </div>

          {/* Notes from Expert */}
          <div>
            <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-2.5">Notes from Expert</div>
            <div className="bg-white rounded-2xl p-4 border border-[#F0F0F5] relative">
              <div className="absolute top-0 left-6 w-[3px] h-full bg-[#1A1A2E] rounded-full" />
              <div className="pl-4">
                <p className="text-[0.85rem] text-[#1A1A2E] leading-relaxed font-medium mb-2.5">
                  &ldquo;Initial review looks promising. Strong case for OIC. Will have full recommendation by tomorrow.&rdquo;
                </p>
                <div className="flex items-center gap-1.5">
                  <svg className="w-2.5 h-2.5 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="text-[0.7rem] text-[#8585A0]">Today, 2:34 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Expert Button */}
          <Link
            href="/expert/chat"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-7 border-2 border-[#D5D5E0] bg-white text-[#1A1A2E] rounded-full text-[0.88rem] font-bold hover:border-[#1A1A2E] transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            Message Expert
          </Link>

          {/* Estimated Completion */}
          <div className="text-center py-1">
            <div className="flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span className="text-[0.78rem] text-[#8585A0] font-medium">Estimated completion: <strong className="text-[#1A1A2E]">1-2 business days</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
