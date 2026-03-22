'use client'

import Link from 'next/link'

export default function W2EntryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/income-checklist" className="w-9 h-9 rounded-xl bg-[#FAFAFF] border border-[#F0F0F5] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1A1A2E" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#1A1A2E]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#8585A0]">Step 3/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F0F0F5] rounded-full overflow-hidden">
          <div className="h-full bg-[#1A1A2E] rounded-full" style={{ width: '50%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3.5">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.3rem] font-extrabold text-[#1A1A2E] tracking-tight mb-1">Enter your W-2 information</h1>
          <p className="text-[0.82rem] text-[#8585A0] font-normal leading-relaxed">
            From employer: <strong className="text-[#1A1A2E]">Acme Corp</strong>
          </p>
        </div>

        {/* Scan W-2 Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border-[1.5px] border-dashed border-[#D5D5E0] rounded-[14px] text-[0.84rem] font-semibold text-[#5C5C7A] hover:bg-[#EFF4FF] hover:border-[#1A1A2E] hover:text-[#1A1A2E] active:scale-[0.97] transition-all">
          <svg width="16" height="16" fill="#1A1A2E" viewBox="0 0 24 24"><path d="M12 15.2l3.2-3.2h-2.4V4h-1.6v8H8.8l3.2 3.2zM20 4h-3.17L15.41 2H8.59L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.42-2h5.06l1.42 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
          Scan W-2 with Camera
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2.5 py-0.5">
          <div className="flex-1 h-px bg-[#D5D5E0]" />
          <span className="text-[0.7rem] font-semibold text-[#B0B0C8] uppercase tracking-wider">or enter manually</span>
          <div className="flex-1 h-px bg-[#D5D5E0]" />
        </div>

        {/* Form */}
        <div className="bg-white rounded-[16px] p-[18px] border border-[#D5D5E0]">
          {/* Employer Name */}
          <div className="mb-3.5">
            <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Employer Name</label>
            <input type="text" defaultValue="Acme Corp" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all placeholder:text-[#B0B0C8] placeholder:font-normal" />
          </div>

          {/* Employer EIN */}
          <div className="mb-3.5">
            <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Employer EIN</label>
            <input type="text" defaultValue="12-3456789" placeholder="XX-XXXXXXX" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all placeholder:text-[#B0B0C8] placeholder:font-normal" />
          </div>

          {/* Row: Wages + Fed Tax */}
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 1 -- Wages</label>
              <input type="text" defaultValue="$52,000" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 2 -- Fed Tax Withheld</label>
              <input type="text" defaultValue="$6,240" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
          </div>

          {/* Row: SS Wages + SS Tax */}
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 3 -- SS Wages</label>
              <input type="text" defaultValue="$52,000" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 4 -- SS Tax</label>
              <input type="text" defaultValue="$3,224" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
          </div>

          {/* Row: Medicare Wages + Medicare Tax */}
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 5 -- Medicare Wages</label>
              <input type="text" defaultValue="$52,000" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 6 -- Medicare Tax</label>
              <input type="text" defaultValue="$754" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
          </div>

          {/* Row: State Wages + State Tax */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 16 -- State Wages</label>
              <input type="text" defaultValue="$52,000" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">Box 17 -- State Tax</label>
              <input type="text" defaultValue="$2,600" className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all" />
            </div>
          </div>
        </div>

        {/* Add Another */}
        <div className="text-center">
          <button className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-[#1A1A2E]">
            <svg width="14" height="14" fill="#1A1A2E" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
            Add another W-2
          </button>
        </div>

        {/* Continue Button */}
        <div className="pt-1">
          <Link href="/tax-filing/other-income" className="w-full flex items-center justify-center gap-2 bg-[#1A1A2E] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
