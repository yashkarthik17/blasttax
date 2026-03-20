'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form8857Page() {
  const { answers, caseId } = useWizard()

  const [reliefType, setReliefType] = useState<'innocent' | 'separation' | 'equitable'>('innocent')
  const [spouseName, setSpouseName] = useState('')
  const [spouseSsn, setSpouseSsn] = useState('')
  const [marriageDate, setMarriageDate] = useState('')
  const [separationDate, setSeparationDate] = useState('')
  const [selectedYears, setSelectedYears] = useState<string[]>(['2021', '2022'])
  const [reason, setReason] = useState('')
  const [benefited, setBenefited] = useState<'yes' | 'no'>('no')
  const [generating, setGenerating] = useState(false)

  function toggleYear(year: string) {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year])
  }

  const reliefOptions = [
    { key: 'innocent' as const, title: 'Innocent Spouse Relief', irc: 'IRC 6015(b)', desc: "You didn't know about the error", detail: 'You may qualify if you filed a joint return with an understatement of tax that is attributable to erroneous items of your spouse.' },
    { key: 'separation' as const, title: 'Separation of Liability', irc: 'IRC 6015(c)', desc: 'Divide the tax between spouses', detail: 'Allocates the understatement of tax between you and your former spouse, assigning each person their share.' },
    { key: 'equitable' as const, title: 'Equitable Relief', irc: 'IRC 6015(f)', desc: 'Other circumstances warrant relief', detail: "If you don't qualify under (b) or (c), you may still get relief if it would be unfair to hold you liable." },
  ]

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-8857' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-8857-Innocent-Spouse.pdf'; a.click(); URL.revokeObjectURL(url) }
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
          <div className="w-2 h-2 rounded-full bg-[#F1F5F9]" />
          <div className="w-2 h-2 rounded-full bg-[#F1F5F9]" />
        </div>
        <span className="text-[11px] font-semibold text-[#94A3B8]">Step 1 of 5</span>
      </div>

      <div className="mb-3.5">
        <h1 className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight">Request Innocent Spouse Relief</h1>
      </div>

      {/* Relief Type */}
      <div className="mb-2">
        <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Relief Type</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {reliefOptions.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => setReliefType(opt.key)}
          className={`flex items-start gap-3 p-4 bg-white border-[1.5px] rounded-[14px] mb-2 w-full text-left transition-all ${
            reliefType === opt.key ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F1F5F9] hover:border-[#0A1628]'
          }`}
        >
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
            reliefType === opt.key ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#F1F5F9]'
          }`}>
            {reliefType === opt.key && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-[#0A1628] mb-0.5">{opt.title}</div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex px-2 py-0.5 bg-[#F8FAFC] rounded-md text-[10px] font-bold text-[#64748B]">{opt.irc}</span>
            </div>
            <div className="text-xs text-[#94A3B8] leading-snug">{opt.desc}</div>
            {reliefType === opt.key && (
              <div className="mt-2.5 pt-2.5 border-t border-[rgba(0,61,165,0.1)]">
                <div className="text-[11px] text-[#64748B] leading-relaxed">{opt.detail}</div>
              </div>
            )}
          </div>
        </button>
      ))}
      </div>

      {/* Spouse Information */}
      <div className="mt-4">
        <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2.5">Spouse Information</div>
        <div className="flex gap-2.5 mb-3">
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Spouse Name</label><input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB] placeholder:text-[#CBD5E1] placeholder:font-normal" placeholder="Full name" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} /></div>
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">SSN</label><input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB] placeholder:text-[#CBD5E1] placeholder:font-normal" placeholder="***-**-****" value={spouseSsn} onChange={(e) => setSpouseSsn(e.target.value)} /></div>
        </div>
        <div className="flex gap-2.5">
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Date of Marriage</label><input type="date" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} /></div>
          <div className="flex-1"><label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Separation/Divorce</label><input type="date" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" value={separationDate} onChange={(e) => setSeparationDate(e.target.value)} /></div>
        </div>
      </div>

      {/* Tax Years */}
      <div className="mt-4">
        <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Tax Years Requesting Relief</div>
        <div className="flex gap-2 flex-wrap">
          {['2020','2021','2022','2023'].map(year => (
            <button key={year} type="button" onClick={() => toggleYear(year)} className={`inline-flex items-center px-4 py-2 border-[1.5px] rounded-full text-[13px] font-semibold transition-all ${selectedYears.includes(year) ? 'border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]' : 'border-[#F1F5F9] bg-white text-[#64748B]'}`}>{year}</button>
          ))}
        </div>
      </div>

      {/* Reason */}
      <div className="mt-4">
        <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Why are you requesting relief?</label>
        <textarea className="w-full min-h-[70px] px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-sm font-semibold text-[#0A1628] outline-none resize-y focus:border-[#2563EB] placeholder:text-[#CBD5E1] placeholder:font-normal" placeholder="Describe your situation..." value={reason} onChange={(e) => setReason(e.target.value)} />
      </div>

      {/* Benefit Question */}
      <div className="mt-1">
        <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Did you benefit from the understatement?</div>
        <div className="flex gap-2.5">
          <button type="button" onClick={() => setBenefited('yes')} className={`flex-1 py-3 border-[1.5px] rounded-xl text-center text-[13px] font-semibold transition-all ${benefited === 'yes' ? 'border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]' : 'border-[#F1F5F9] bg-white text-[#0A1628]'}`}>Yes</button>
          <button type="button" onClick={() => setBenefited('no')} className={`flex-1 py-3 border-[1.5px] rounded-xl text-center text-[13px] font-semibold transition-all ${benefited === 'no' ? 'border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]' : 'border-[#F1F5F9] bg-white text-[#0A1628]'}`}>No</button>
        </div>
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
