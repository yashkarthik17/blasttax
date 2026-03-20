'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form12153Page() {
  const { answers, caseId } = useWizard()

  const [phone, setPhone] = useState(answers.phone ?? '(512) 555-0198')
  const [hearingType, setHearingType] = useState<'cdp' | 'equivalent'>('cdp')
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022'])
  const [quarter, setQuarter] = useState('Annual (1040)')
  const [taxType, setTaxType] = useState('Income Tax')
  const [noticeNumber, setNoticeNumber] = useState('LT11')
  const [noticeType, setNoticeType] = useState('LT11 — Final Notice of Intent to Levy')
  const [noticeDate, setNoticeDate] = useState('2026-03-01')
  const [issues, setIssues] = useState([true, false, false, false, false, false, false])
  const [otherText, setOtherText] = useState('')
  const [generating, setGenerating] = useState(false)

  const issueLabels = [
    'I want to set up an installment agreement',
    'I want to make an offer in compromise',
    'I am currently not collectible',
    'The statute of limitations has expired',
    'I received a substitute return (SFR) and want to file my own',
    'I want to raise an innocent spouse claim',
    'Other',
  ]

  function toggleYear(year: string) {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year])
  }

  function toggleIssue(idx: number) {
    setIssues(prev => prev.map((v, i) => i === idx ? !v : v))
  }

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-12153' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-12153-CDP-Hearing.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Step Dots */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-2 rounded-full bg-[#2563EB]" />
          <div className="w-2 h-2 rounded-full bg-[#F1F5F9]" />
          <div className="w-2 h-2 rounded-full bg-[#F1F5F9]" />
        </div>
        <span className="text-[11px] font-semibold text-[#94A3B8]">Step 1 of 3</span>
      </div>

      <div className="mb-1.5">
        <h1 className="text-[1.2rem] font-extrabold text-[#0A1628] leading-tight">Request a Collection Due Process Hearing</h1>
        <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">You have 30 days from the date of your notice to request a CDP hearing</p>
      </div>

      {/* Taxpayer Information */}
      <div className="bg-white border border-[#F1F5F9] rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center"><i className="fa-solid fa-user text-sm text-[#2563EB]" /></div>
          <span className="text-sm font-bold text-[#0A1628]">Taxpayer Information</span>
        </div>
        <div className="mb-3"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Full Name (Line 1)</label><div className="relative w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-sm font-semibold text-[#0A1628]">Jane M. Doe<i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-[11px]" /></div></div>
        <div className="flex gap-2.5 mb-3">
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">SSN / EIN (Line 2)</label><div className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-sm font-semibold text-[#0A1628] tracking-wider">***-**-4589</div></div>
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Phone Number</label><input type="tel" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        </div>
        <div><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Address (Line 3)</label><div className="relative w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-sm font-semibold text-[#0A1628]">1234 Elm Street, Austin, TX 78701<i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-[11px]" /></div></div>
      </div>

      {/* Hearing Type */}
      <div className="bg-white border border-[#F1F5F9] rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center"><i className="fa-solid fa-scale-balanced text-sm text-[#2563EB]" /></div>
          <span className="text-sm font-bold text-[#0A1628]">Hearing Type</span>
        </div>
        {/* CDP */}
        <button type="button" onClick={() => setHearingType('cdp')} className={`flex gap-3 p-3.5 border-[1.5px] rounded-[14px] mb-2 w-full text-left transition-all ${hearingType === 'cdp' ? 'border-[#0A1628] bg-[#EBF0FF]' : 'border-[#F1F5F9] bg-white'}`}>
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-px ${hearingType === 'cdp' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'}`}>{hearingType === 'cdp' && <div className="w-2 h-2 rounded-full bg-white" />}</div>
          <div className="flex-1">
            <div className="text-[0.85rem] font-bold text-[#0A1628] mb-1">CDP Hearing <span className="inline-flex px-1.5 py-0.5 bg-[#E6F9EE] rounded-full text-[0.58rem] font-bold text-[#00A651] ml-1">WITHIN 30 DAYS</span></div>
            <div className="text-[0.72rem] text-[#64748B] leading-relaxed space-y-0.5">
              <div><i className="fa-solid fa-check text-[8px] text-[#00A651] mr-1" /> Collection <strong>suspended</strong> during hearing</div>
              <div><i className="fa-solid fa-check text-[8px] text-[#00A651] mr-1" /> CSED <strong>tolled</strong> (clock pauses)</div>
              <div><i className="fa-solid fa-check text-[8px] text-[#00A651] mr-1" /> <strong>Tax Court rights</strong> if you disagree</div>
            </div>
          </div>
        </button>
        {/* Equivalent */}
        <button type="button" onClick={() => setHearingType('equivalent')} className={`flex gap-3 p-3.5 border-[1.5px] rounded-[14px] w-full text-left transition-all ${hearingType === 'equivalent' ? 'border-[#0A1628] bg-[#EBF0FF]' : 'border-[#F1F5F9] bg-white'}`}>
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-px ${hearingType === 'equivalent' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'}`}>{hearingType === 'equivalent' && <div className="w-2 h-2 rounded-full bg-white" />}</div>
          <div className="flex-1">
            <div className="text-[0.85rem] font-bold text-[#0A1628] mb-1">Equivalent Hearing <span className="inline-flex px-1.5 py-0.5 bg-[#FFF0F1] rounded-full text-[0.58rem] font-bold text-[#E63946] ml-1">AFTER 30 DAYS</span></div>
            <div className="text-[0.72rem] text-[#64748B] leading-relaxed space-y-0.5">
              <div><i className="fa-solid fa-xmark text-[8px] text-[#E63946] mr-1" /> Collection <strong>NOT suspended</strong></div>
              <div><i className="fa-solid fa-xmark text-[8px] text-[#E63946] mr-1" /> CSED <strong>NOT tolled</strong></div>
              <div><i className="fa-solid fa-xmark text-[8px] text-[#E63946] mr-1" /> <strong>No Tax Court rights</strong></div>
            </div>
          </div>
        </button>
      </div>

      {/* Tax Periods */}
      <div className="bg-white border border-[#F1F5F9] rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#E6F9EE] flex items-center justify-center"><i className="fa-solid fa-calendar-days text-sm text-[#00A651]" /></div>
          <span className="text-sm font-bold text-[#0A1628]">Tax Periods (Line 4)</span>
        </div>
        <div className="mb-3"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Tax Year(s)</label>
          <div className="flex gap-1.5 flex-wrap">
            {['2023','2022','2021','2020'].map(year => (
              <button key={year} type="button" onClick={() => toggleYear(year)} className={`px-3 py-1.5 border-[1.5px] rounded-lg text-xs font-semibold transition-all ${selectedYears.includes(year) ? 'border-[#0A1628] bg-[#0A1628] text-white' : 'border-[#F3F4F6] bg-[#F8FAFC] text-[#0A1628]'}`}>{year}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-2.5 mb-2.5">
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Quarter (if applicable)</label><select className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none" value={quarter} onChange={(e) => setQuarter(e.target.value)}><option>Annual (1040)</option><option>Q1 (Jan-Mar)</option><option>Q2 (Apr-Jun)</option><option>Q3 (Jul-Sep)</option><option>Q4 (Oct-Dec)</option></select></div>
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Tax Type</label><select className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none" value={taxType} onChange={(e) => setTaxType(e.target.value)}><option>Income Tax</option><option>Employment Tax</option><option>Excise Tax</option></select></div>
        </div>
        <div><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Notice Number / Letter</label><input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" value={noticeNumber} onChange={(e) => setNoticeNumber(e.target.value)} placeholder="e.g., LT11, Letter 1058, CP504" /></div>
      </div>

      {/* Notice Information */}
      <div className="bg-white border border-[#F1F5F9] rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#FFFBEB] flex items-center justify-center"><i className="fa-solid fa-envelope-open-text text-sm text-[#F59E0B]" /></div>
          <span className="text-sm font-bold text-[#0A1628]">Notice Information</span>
        </div>
        <div className="mb-3"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Notice Type</label><select className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none" value={noticeType} onChange={(e) => setNoticeType(e.target.value)}><option>LT11 — Final Notice of Intent to Levy</option><option>Letter 1058 — Final Notice</option><option>CP504 — Intent to Levy</option><option>Letter 3172 — Notice of Federal Tax Lien</option></select></div>
        <div className="flex gap-2.5">
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Date of Notice</label><input type="date" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} /></div>
          <div className="flex items-end"><div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-bold bg-[#FFFBEB] text-[#92400E] border border-[rgba(245,166,35,0.15)]"><i className="fa-solid fa-clock text-xs" /><span>15 days remaining</span></div></div>
        </div>
      </div>

      {/* Issues to Raise */}
      <div className="bg-white border border-[#F1F5F9] rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center"><i className="fa-solid fa-list-check text-sm text-[#2563EB]" /></div>
          <span className="text-sm font-bold text-[#0A1628]">Issues to Raise at Hearing</span>
        </div>
        {issueLabels.map((label, idx) => (
          <button key={idx} type="button" onClick={() => toggleIssue(idx)} className="flex items-start gap-3 py-3 border-b border-[#F1F5F9] last:border-b-0 w-full text-left">
            <div className={`w-[22px] h-[22px] border-2 rounded-md flex-shrink-0 flex items-center justify-center mt-px transition-all ${issues[idx] ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#F1F5F9]'}`}>
              {issues[idx] && <i className="fas fa-check text-[11px] text-white" />}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-[#0A1628]">{label}</div>
              {idx === 6 && issues[6] && (
                <textarea className="mt-2 w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[13px] text-[#0A1628] outline-none resize-y min-h-[60px] focus:border-[#2563EB]" placeholder="Describe the issue you want to raise..." value={otherText} onChange={(e) => setOtherText(e.target.value)} onClick={(e) => e.stopPropagation()} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Important Notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#E6F9EE] border border-[rgba(0,166,81,0.15)] rounded-[14px]">
        <i className="fa-solid fa-shield-halved text-sm text-[#00A651]" />
        <span className="text-[0.78rem] text-[#065F46]"><strong>Important:</strong> Filing a CDP request stops levy action while your hearing is pending</span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-3 pb-5">
        <button className="py-4 bg-[#00A651] rounded-full text-center text-white text-[15px] font-bold transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          Continue <i className="fa-solid fa-arrow-right text-[13px] ml-1" />
        </button>
        <button onClick={handleGeneratePdf} disabled={generating} className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all disabled:opacity-50">
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  )
}
