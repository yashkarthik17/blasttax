'use client'

import Link from 'next/link'

const entries = [
  {
    num: 1,
    payer: 'Uber Technologies',
    type: '1099-NEC',
    amount: '$24,500',
    expenses: '$8,200',
    netProfit: '$16,300',
  },
  {
    num: 2,
    payer: 'Freelance Web Design',
    type: '1099-NEC',
    amount: '$12,000',
    expenses: '$3,400',
    netProfit: '$8,600',
  },
]

export default function Contractor1099Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/other-income" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#64748B" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">1099 Income</div>
        <div className="w-9 shrink-0" />
      </div>

      {/* Progress bar */}
      <div className="px-5 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.7rem] font-semibold text-[#94A3B8]">Step 3 of 6</span>
          <span className="text-[0.7rem] font-bold text-[#0A1628]">50%</span>
        </div>
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full relative" style={{ width: '50%' }}>
            <div className="absolute right-0 -top-px w-[7px] h-[7px] bg-[#2563EB] rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3.5 pt-2">
        {/* Heading */}
        <div>
          <div className="text-[1.25rem] font-extrabold text-[#0A1628] tracking-tight leading-tight">1099 &amp; Contractor Income</div>
          <div className="text-[0.78rem] text-[#94A3B8] mt-1 leading-relaxed">Report all independent contractor and gig income</div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-2.5 px-3.5 py-3 bg-[#EBF0FF] border border-[#2563EB]/10 rounded-[14px]">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
          <div className="text-[0.75rem] text-[#1E40AF] leading-relaxed">
            Independent contractors and gig workers: report all 1099 income here. You can deduct related business expenses to reduce your taxable self-employment income.
          </div>
        </div>

        {/* 1099 Entries */}
        {entries.map((entry) => (
          <div key={entry.num} className="bg-white border border-[#F3F4F6] rounded-[16px] p-[18px] relative shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <button className="absolute top-3 right-3 w-6 h-6 rounded-md bg-[#FEF2F2] flex items-center justify-center hover:bg-[#FEE2E2] transition-colors">
              <svg width="10" height="10" fill="#E63946" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>

            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-[26px] h-[26px] rounded-[7px] bg-[#EFF4FF] flex items-center justify-center">
                <span className="text-[0.68rem] font-extrabold text-[#2563EB]">{entry.num}</span>
              </div>
              <span className="text-[0.82rem] font-bold text-[#0A1628]">1099 Entry</span>
            </div>

            <div className="mb-2.5">
              <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Payer Name</div>
              <input type="text" defaultValue={entry.payer} placeholder="Company or individual name" className="w-full py-2.5 px-3 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:ring-[2px] focus:ring-[#0A1628]/6 transition-all" />
            </div>

            <div className="flex gap-2.5 mb-2.5">
              <div className="flex-1">
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">1099 Type</div>
                <select defaultValue={entry.type} className="w-full py-2.5 px-3 pr-7 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201.5L6%206.5L11%201.5%27%20stroke=%27%238585A0%27%20stroke-width=%271.5%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center]">
                  <option>1099-NEC</option>
                  <option>1099-MISC</option>
                  <option>1099-K</option>
                </select>
              </div>
              <div className="flex-1">
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Amount Received</div>
                <input type="text" defaultValue={entry.amount} placeholder="$0" className="w-full py-2.5 px-3 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:ring-[2px] focus:ring-[#0A1628]/6 transition-all" />
              </div>
            </div>

            <div className="mb-2.5">
              <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Related Business Expenses (Sched. C)</div>
              <input type="text" defaultValue={entry.expenses} placeholder="$0" className="w-full py-2.5 px-3 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:ring-[2px] focus:ring-[#0A1628]/6 transition-all" />
            </div>

            <div className="flex justify-between px-3.5 py-2.5 bg-[#E6F9EE] rounded-[10px]">
              <span className="text-[0.78rem] font-semibold text-[#065F46]">Net profit</span>
              <span className="text-[0.82rem] font-extrabold text-[#00A651]">{entry.netProfit}</span>
            </div>
          </div>
        ))}

        {/* Add another */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-[1.5px] border-dashed border-[#0A1628]/15 rounded-[14px] hover:border-[#0A1628] transition-all">
          <svg width="12" height="12" fill="#2563EB" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          <span className="text-[0.82rem] font-bold text-[#0A1628]">Add Another 1099</span>
        </button>

        {/* Summary Card */}
        <div className="bg-white rounded-[16px] p-[18px] border-[1.5px] border-[#E6F9EE] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-[30px] h-[30px] rounded-lg bg-[#E6F9EE] flex items-center justify-center">
              <svg width="12" height="12" fill="#00A651" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
            </div>
            <div className="text-[0.82rem] font-bold text-[#0A1628]">1099 Income Summary</div>
          </div>

          <div className="flex justify-between py-2 border-b border-[#F8FAFC]">
            <span className="text-[0.78rem] text-[#64748B]">Total 1099 income</span>
            <span className="text-[0.78rem] font-bold text-[#0A1628]">$36,500</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#F8FAFC]">
            <span className="text-[0.78rem] text-[#64748B]">Total expenses</span>
            <span className="text-[0.78rem] font-bold text-[#E63946]">-$11,600</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[0.82rem] font-bold text-[#0A1628]">Net self-employment income</span>
            <span className="text-[0.88rem] font-extrabold text-[#00A651]">$24,900</span>
          </div>

          <div className="h-px bg-[#F1F5F9] my-2.5" />

          {/* SE Tax Estimate */}
          <div className="flex justify-between px-3.5 py-2.5 bg-[#FFFBEB] rounded-[10px] mb-2">
            <div>
              <span className="text-[0.78rem] font-semibold text-[#92400E]">Self-employment tax (15.3%)</span>
              <div className="text-[0.62rem] text-[#B45309]">$24,900 x 92.35% x 15.3%</div>
            </div>
            <span className="text-[0.82rem] font-extrabold text-[#D97706]">$3,517</span>
          </div>

          {/* Quarterly reminder */}
          <div className="flex items-start gap-2 px-3 py-2.5 bg-[#F8FAFC] rounded-[10px]">
            <svg width="10" height="10" fill="#2563EB" viewBox="0 0 24 24" className="shrink-0 mt-0.5"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            <div className="text-[0.72rem] text-[#64748B] leading-relaxed">
              <strong className="text-[#0A1628]">Quarterly estimated payments:</strong> As a self-employed individual, you&apos;re required to make quarterly estimated tax payments (Form 1040-ES) to avoid penalties.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-1">
          <Link href="/tax-filing/state-filing" className="w-full py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 active:scale-[0.97] transition-all">
            Continue <span className="ml-1.5">&#8594;</span>
          </Link>
          <button className="w-full py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold hover:-translate-y-0.5 active:scale-[0.97] transition-all">
            <svg width="11" height="11" fill="#94A3B8" viewBox="0 0 24 24" className="inline mr-1.5"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
            Save &amp; Exit
          </button>
        </div>
      </div>
    </div>
  )
}
