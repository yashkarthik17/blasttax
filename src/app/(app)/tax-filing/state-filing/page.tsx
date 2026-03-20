'use client'

import { useState } from 'react'
import Link from 'next/link'

const stateOptions = [
  { abbr: 'CA', name: 'California', rate: '9.3%', fee: '$39.99' },
  { abbr: 'NY', name: 'New York', rate: '8.82%', fee: '$39.99' },
  { abbr: 'TX', name: 'Texas', rate: '0%', fee: '$0' },
  { abbr: 'FL', name: 'Florida', rate: '0%', fee: '$0' },
  { abbr: 'IL', name: 'Illinois', rate: '4.95%', fee: '$29.99' },
]

export default function StateFilingPage() {
  const [skipState, setSkipState] = useState(false)
  const [selectedState, setSelectedState] = useState<typeof stateOptions[number] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStates = stateOptions.filter((s) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return s.abbr.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/contractor-1099" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#94A3B8]">Step 3/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full" style={{ width: '55%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3.5">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] tracking-tight mb-1">State Tax Return</h1>
          <p className="text-[0.82rem] text-[#94A3B8] font-normal leading-relaxed">Select your state to include a state return</p>
        </div>

        {/* Skip Toggle */}
        <button
          onClick={() => setSkipState(!skipState)}
          className="w-full flex items-center justify-between px-4 py-3.5 bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] select-none hover:border-[#0A1628]/15 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <svg width="13" height="13" fill="#94A3B8" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
            <span className="text-[0.84rem] font-semibold text-[#0A1628]">I don&apos;t need to file a state return</span>
          </div>
          <div className={`w-11 h-[26px] rounded-[13px] relative transition-colors shrink-0 ${skipState ? 'bg-[#0A1628]' : 'bg-[#D5D5E0]'}`}>
            <div className={`absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform ${skipState ? 'translate-x-[18px]' : ''}`} />
          </div>
        </button>

        {/* Filing Content */}
        <div className={`space-y-3.5 transition-opacity ${skipState ? 'opacity-40 pointer-events-none' : ''}`}>
          {/* Search */}
          <div>
            <div className="relative">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#CBD5E1" strokeWidth="2" className="absolute left-3.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                placeholder="Search states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-[38px] pr-4 bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.88rem] font-medium text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition-all placeholder:text-[#CBD5E1] placeholder:font-normal"
              />
            </div>

            {/* State chips */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              {filteredStates.map((state) => (
                <button
                  key={state.abbr}
                  onClick={() => setSelectedState(state)}
                  className={`px-4 py-[7px] rounded-[20px] border-[1.5px] text-[0.8rem] font-semibold select-none transition-all active:scale-[0.96] ${
                    selectedState?.abbr === state.abbr
                      ? 'border-[#0A1628] bg-[#EFF4FF] text-[#0A1628]'
                      : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#0A1628]/25 hover:bg-[#F8FAFC]'
                  }`}
                >
                  {state.abbr}
                </button>
              ))}
            </div>
          </div>

          {/* Selected State Card */}
          {selectedState && (
            <div className="bg-white border-[1.5px] border-[#0A1628] rounded-[14px] p-4">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center">
                    <svg width="15" height="15" fill="#0A1628" viewBox="0 0 24 24"><path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/></svg>
                  </div>
                  <div>
                    <div className="text-[0.92rem] font-bold text-[#0A1628]">{selectedState.name}</div>
                    <div className="flex items-center gap-2.5 mt-0.5">
                      <span className="text-[0.7rem] font-semibold text-[#94A3B8]">Tax rate: <span className="text-[#0A1628]">{selectedState.rate}</span></span>
                      <span className="text-[0.7rem] font-semibold text-[#94A3B8]">Filing fee: <span className="text-[#00A651]">{selectedState.fee}</span></span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedState(null)} className="p-1">
                  <svg width="14" height="14" fill="#CBD5E1" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* State Filing Details */}
          {selectedState && (
            <div className="space-y-3.5">
              <div className="bg-white rounded-[16px] p-[18px] border border-[#E2E8F0]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.72rem] font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">State Wages</label>
                    <input type="text" defaultValue="$52,000" className="w-full py-3 px-3.5 bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.88rem] font-medium text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">State Tax Withheld</label>
                    <input type="text" defaultValue="$2,080" className="w-full py-3 px-3.5 bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.88rem] font-medium text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all" />
                  </div>
                </div>
              </div>

              {/* Info Alert */}
              <div className="flex items-start gap-2.5 px-3.5 py-3 bg-[#EFF4FF] rounded-xl">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
                <span className="text-[0.78rem] text-[#0A1628] font-medium leading-relaxed">State return will be filed alongside your federal return</span>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="pt-1">
          <Link href="/tax-filing/deductions" className="w-full flex items-center justify-center gap-2 bg-[#0A1628] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
