'use client'

import { useState } from 'react'
import Link from 'next/link'

const taxForms = [
  { name: 'Income Tax (Form 1040)', desc: 'Individual income tax return', defaultChecked: true },
  { name: 'Employment Tax (Form 941)', desc: 'Quarterly employment tax', defaultChecked: false },
  { name: 'Employment Tax (Form 940)', desc: 'Annual federal unemployment tax', defaultChecked: false },
  { name: 'Corporate Tax (Form 1120)', desc: 'Corporate income tax return', defaultChecked: false },
  { name: 'Partnership (Form 1065)', desc: 'Partnership return of income', defaultChecked: false },
  { name: 'Excise Tax (Form 720)', desc: 'Quarterly federal excise tax', defaultChecked: false },
]

const initialPeriods = [
  { year: '2023', end: '12/31/2023' },
  { year: '2022', end: '12/31/2022' },
  { year: '2021', end: '12/31/2021' },
  { year: '2020', end: '12/31/2020' },
]

export default function Form8821Page() {
  const [formChecks, setFormChecks] = useState(taxForms.map(f => f.defaultChecked))
  const [periods, setPeriods] = useState(initialPeriods)
  const [specificUse, setSpecificUse] = useState(false)
  const [certify, setCertify] = useState(false)

  const toggleFormCheck = (idx: number) => {
    setFormChecks(prev => prev.map((v, i) => i === idx ? !v : v))
  }

  const removePeriod = (idx: number) => {
    setPeriods(prev => prev.filter((_, i) => i !== idx))
  }

  const addPeriod = () => {
    setPeriods(prev => [...prev, { year: '', end: '' }])
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => window.history.back()} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F3F4F6]">
            <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Form 8821</h1>
          <div className="w-9" />
        </div>

        <div className="px-5 pb-8 space-y-3.5 pt-2">
          {/* Heading */}
          <div>
            <div className="text-[1.25rem] font-extrabold text-[#0A1628] tracking-tight leading-tight">Tax Information Authorization</div>
            <div className="text-[0.78rem] text-[#94A3B8] mt-1 leading-relaxed">IRS Form 8821 &mdash; Allow a third party to view your tax info</div>
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-2.5 p-3 bg-[#EBF0FF] border border-[rgba(37,99,235,0.1)] rounded-[14px]">
            <svg className="w-[13px] h-[13px] text-[#2563EB] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
            </svg>
            <div className="text-xs text-[#1E40AF] leading-relaxed">
              Form 8821 allows a third party to <strong>VIEW</strong> your tax information only. Unlike Form 2848, it does <strong>NOT</strong> authorize them to represent you before the IRS.
            </div>
          </div>

          {/* Link to 2848 */}
          <Link href="/expert/poa-education" className="flex items-center gap-2.5 p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
            <svg className="w-3 h-3 text-[#7C3AED]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5Z" />
            </svg>
            <span className="text-[0.78rem] font-semibold text-[#0A1628] flex-1">Need full representation? Use Form 2848 instead</span>
            <svg className="w-2.5 h-2.5 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* Section 1: Taxpayer Info */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#EFF4FF] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Taxpayer Information</div>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Taxpayer Name</div>
                <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3 relative">
                  <span className="text-[0.82rem] font-semibold text-[#0A1628]">Jane M. Doe</span>
                  <svg className="w-3 h-3 text-[#CBD5E1] absolute right-3 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">SSN / EIN</div>
                  <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3 relative">
                    <span className="text-[0.82rem] font-semibold text-[#0A1628] tracking-wider">***-**-4589</span>
                    <svg className="w-3 h-3 text-[#CBD5E1] absolute right-3 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Phone</div>
                  <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3">
                    <span className="text-[0.82rem] font-semibold text-[#0A1628]">(512) 555-0199</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Address</div>
                <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3 relative">
                  <span className="text-[0.82rem] font-semibold text-[#0A1628]">1234 Elm Street, Austin, TX 78701</span>
                  <svg className="w-3 h-3 text-[#CBD5E1] absolute right-3 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Designee */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#F5F0FF] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Designee Information</div>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Designee Name</div>
                <input type="text" defaultValue="Five Star Tax Resolution LLC" placeholder="Tax professional or firm name" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">CAF Number</div>
                  <input type="text" defaultValue="1234-56789" placeholder="CAF #" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">PTIN</div>
                  <input type="text" defaultValue="P00123456" placeholder="P00000000" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Phone</div>
                  <input type="text" defaultValue="(512) 555-8821" placeholder="(555) 000-0000" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Fax</div>
                  <input type="text" defaultValue="(512) 555-8822" placeholder="(555) 000-0000" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
                </div>
              </div>
              <div>
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Designee Address</div>
                <input type="text" defaultValue="100 Tax Pros Way, Austin, TX 78703" placeholder="Street, City, State, ZIP" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
              </div>
            </div>
          </div>

          {/* Section 3: Tax Information */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#E6F9EE] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Tax Information to Disclose</div>
            </div>
            <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2">Tax Form Types</div>
            {taxForms.map((form, i) => (
              <div key={form.name} className={`flex items-center gap-2.5 py-2.5 ${i < taxForms.length - 1 ? 'border-b border-[#F8FAFC]' : ''}`}>
                <input
                  type="checkbox"
                  checked={formChecks[i]}
                  onChange={() => toggleFormCheck(i)}
                  className="w-[18px] h-[18px] accent-[#0A1628] shrink-0"
                />
                <div>
                  <span className="text-[0.82rem] font-semibold text-[#0A1628]">{form.name}</span>
                  <div className="text-[0.65rem] text-[#94A3B8]">{form.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Tax Periods */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#FFFBEB] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#D97706]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Tax Periods</div>
            </div>
            {periods.map((p, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input type="text" defaultValue={p.year} placeholder="Year" className="w-[70px] text-center px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
                <input type="text" defaultValue={p.end} placeholder="Period end" className="flex-1 px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white transition" />
                <button onClick={() => removePeriod(i)} className="w-6 h-6 rounded-md bg-[#FEF2F2] flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button onClick={addPeriod} className="flex items-center gap-1.5 px-3.5 py-2 bg-[#EFF4FF] rounded-lg mt-1">
              <svg className="w-2.5 h-2.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-xs font-semibold text-[#2563EB]">Add Period</span>
            </button>
          </div>

          {/* Section 5: Specific Use */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#F0FDFA] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Specific Use Authorization</div>
            </div>
            <div className="flex items-start gap-2.5">
              <input type="checkbox" checked={specificUse} onChange={() => setSpecificUse(!specificUse)} className="w-[18px] h-[18px] accent-[#0A1628] shrink-0 mt-0.5" />
              <label className="text-[0.78rem] text-[#64748B] leading-relaxed cursor-pointer" onClick={() => setSpecificUse(!specificUse)}>
                Check here if this authorization is for a <strong className="text-[#0A1628]">specific use not recorded on CAF</strong>. If checked, this form will not be recorded on the Centralized Authorization File.
              </label>
            </div>
          </div>

          {/* Signature */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#F5F0FF] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                </svg>
              </div>
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Signature &amp; Date</div>
            </div>
            <div className="text-[0.72rem] text-[#64748B] leading-relaxed mb-3.5">
              If signed by a corporate officer, partner, guardian, executor, or other authorized person, I certify that I have the authority to execute this form.
            </div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <input type="checkbox" checked={certify} onChange={() => setCertify(!certify)} className="w-5 h-5 accent-[#0A1628] shrink-0" />
              <label className="text-[0.78rem] font-semibold text-[#0A1628] cursor-pointer" onClick={() => setCertify(!certify)}>I authorize this tax information disclosure</label>
            </div>
            <div className="flex gap-2.5">
              <div className="flex-1">
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Taxpayer Signature</div>
                <div className="h-12 bg-[#F8FAFC] border-[1.5px] border-dashed border-[#CBD5E1] rounded-[10px] flex items-center justify-center">
                  <span className="text-[0.72rem] text-[#CBD5E1]">Tap to sign</span>
                </div>
              </div>
              <div className="w-[100px]">
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Date</div>
                <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-3 py-2.5">
                  <span className="text-[0.78rem] font-semibold text-[#0A1628]">03/17/2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button className="w-full py-4 bg-[#00A651] text-white rounded-full text-[0.88rem] font-bold hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
              Submit Form 8821
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="w-full py-3 text-[#94A3B8] text-[0.82rem] font-semibold flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              Save &amp; Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
