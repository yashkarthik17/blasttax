'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form843Page() {
  const { answers, caseId } = useWizard()

  const [phone, setPhone] = useState(answers.phone ?? '(512) 555-0198')
  const [taxPeriod, setTaxPeriod] = useState('2023')
  const [quarter, setQuarter] = useState('Annual')
  const [formNumber, setFormNumber] = useState('1040')
  const [refundAmount, setRefundAmount] = useState('$5,300')
  const [ftfDate, setFtfDate] = useState('2024-08-15')
  const [ftpDate, setFtpDate] = useState('2024-04-16')
  const [interestAbatement, setInterestAbatement] = useState(false)
  const [abatementType, setAbatementType] = useState<'fta' | 'reasonable'>('fta')
  const [reasonChecks, setReasonChecks] = useState<boolean[]>([false, false, false, false, false])
  const [explanation, setExplanation] = useState('')
  const [generating, setGenerating] = useState(false)

  const reasons = ['Death or serious illness', 'Natural disaster', 'Unable to obtain records', 'IRS error or incorrect advice', 'Other']

  function toggleReason(idx: number) {
    setReasonChecks(prev => prev.map((v, i) => i === idx ? !v : v))
  }

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-843' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-843-Abatement.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div>
        <div className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Request Penalty Abatement</div>
        <div className="text-[0.82rem] text-[#94A3B8] mt-1.5 leading-relaxed">Select the type of abatement that best fits your situation.</div>
      </div>

      {/* Taxpayer Identification */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Taxpayer Identification (Lines 1-2)</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="mb-2.5"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Name (as shown on return)</div><div className="relative px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.85rem] font-semibold text-[#0A1628]">Jane M. Doe<i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-[11px]" /></div></div>
          <div className="flex gap-2 mb-2.5">
            <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">SSN / EIN</div><div className="px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.85rem] font-semibold text-[#0A1628] tracking-wider">***-**-4589</div></div>
            <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Daytime Phone</div><input type="tel" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          </div>
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Address</div><div className="relative px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.85rem] font-semibold text-[#0A1628]">1234 Elm Street, Austin, TX 78701<i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-[11px]" /></div></div>
        </div>
      </div>

      {/* Tax Period & Form */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Tax Period &amp; Form (Line 3)</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex gap-2 mb-2.5">
            <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Tax Period(s)</div><div className="flex gap-1.5">
              <select className="flex-1 px-2.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" value={taxPeriod} onChange={(e) => setTaxPeriod(e.target.value)}><option>2023</option><option>2022</option><option>2021</option><option>2020</option></select>
              <select className="w-[70px] px-2.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" value={quarter} onChange={(e) => setQuarter(e.target.value)}><option>Annual</option><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select>
            </div></div>
          </div>
          <div className="mb-2.5"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Tax Form Number</div><select className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" value={formNumber} onChange={(e) => setFormNumber(e.target.value)}><option value="1040">1040 — Individual Income Tax</option><option value="941">941 — Employer&apos;s Quarterly Federal Tax</option><option value="940">940 — Employer&apos;s Annual FUTA Tax</option><option value="1120">1120 — Corporation Income Tax</option></select></div>
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Amount of Refund/Credit Claimed</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} /></div>
        </div>
      </div>

      {/* Penalty Assessment Dates */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Penalty Assessment Dates</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {[{label:'Failure to File',color:'bg-[#E63946]',date:ftfDate,setDate:setFtfDate,disabled:false},{label:'Failure to Pay',color:'bg-[#F59E0B]',date:ftpDate,setDate:setFtpDate,disabled:false},{label:'Accuracy-Related',color:'bg-[#D5D5E0]',date:'',setDate:()=>{},disabled:true}].map((p,i) => (
            <div key={i} className={`flex items-center justify-between py-2 ${i < 2 ? 'border-b border-[#F1F5F9]' : ''}`}>
              <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${p.color}`} /><span className={`text-[0.78rem] font-semibold ${p.disabled ? 'text-[#94A3B8]' : 'text-[#0A1628]'}`}>{p.label}</span></div>
              <input type="date" className={`px-2.5 py-1.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-lg text-[0.72rem] font-semibold outline-none ${p.disabled ? 'text-[#94A3B8]' : 'text-[#0A1628]'}`} value={p.date} onChange={(e) => p.setDate(e.target.value)} disabled={p.disabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Interest Abatement */}
      <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Interest Abatement (IRC 6404(e))</div>
        <div className="flex items-start gap-2.5 py-2.5">
          <input type="checkbox" checked={interestAbatement} onChange={(e) => setInterestAbatement(e.target.checked)} className="w-5 h-5 mt-0.5 flex-shrink-0 accent-[#0A1628]" />
          <div>
            <div className="text-[0.82rem] font-semibold text-[#0A1628] mb-1">Request interest abatement</div>
            <div className="text-[0.75rem] text-[#94A3B8] leading-relaxed">Interest may be abated if it resulted from an IRS ministerial or managerial act. Applies under IRC Section 6404(e).</div>
          </div>
        </div>
      </div>

      {/* Abatement Type */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Abatement Type</div>
        <button type="button" onClick={() => setAbatementType('fta')} className={`flex gap-3.5 p-[18px] bg-white border-[1.5px] rounded-2xl mb-2.5 w-full text-left transition-all ${abatementType === 'fta' ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6]'}`}>
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${abatementType === 'fta' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'}`}>{abatementType === 'fta' && <div className="w-2 h-2 rounded-full bg-white" />}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap"><span className="text-[0.88rem] font-bold text-[#0A1628]">First-Time Abatement (FTA)</span><span className="inline-flex px-2 py-0.5 bg-[#E6F9EE] rounded-full text-[0.6rem] font-bold text-[#00A651]">RECOMMENDED</span></div>
            <div className="text-[0.78rem] text-[#94A3B8] leading-relaxed">Automatic if you have a clean 3-year compliance history. No additional documentation needed.</div>
          </div>
        </button>
        <button type="button" onClick={() => setAbatementType('reasonable')} className={`flex gap-3.5 p-[18px] bg-white border-[1.5px] rounded-2xl w-full text-left transition-all ${abatementType === 'reasonable' ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6]'}`}>
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${abatementType === 'reasonable' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'}`}>{abatementType === 'reasonable' && <div className="w-2 h-2 rounded-full bg-white" />}</div>
          <div className="flex-1">
            <span className="text-[0.88rem] font-bold text-[#0A1628]">Reasonable Cause</span>
            <div className="text-[0.78rem] text-[#94A3B8] leading-relaxed mt-1">Provide evidence for why penalties should be removed due to circumstances beyond your control.</div>
          </div>
        </button>
      </div>

      {/* Penalty Breakdown */}
      <div className="bg-white rounded-[20px] p-5 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3.5">Penalty Breakdown</div>
        {[{label:'Failure to File',color:'bg-[#E63946]',amount:'$3,200',amountColor:'text-[#E63946]'},{label:'Failure to Pay',color:'bg-[#F59E0B]',amount:'$2,100',amountColor:'text-[#F5A623]'},{label:'Accuracy-Related',color:'bg-[#D5D5E0]',amount:'$0',amountColor:'text-[#94A3B8]',muted:true}].map((p,i) => (
          <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${p.color}`} /><span className={`text-[0.82rem] font-semibold ${p.muted ? 'text-[#94A3B8]' : 'text-[#0A1628]'}`}>{p.label}</span></div>
            <span className={`text-[0.88rem] font-extrabold ${p.amountColor}`}>{p.amount}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-3.5">
          <span className="text-[0.88rem] font-extrabold text-[#0A1628]">Total Penalties</span>
          <span className="text-[1.15rem] font-black text-[#E63946] tracking-tight">$5,300</span>
        </div>
      </div>

      {/* Reasonable Cause Section */}
      {abatementType === 'reasonable' && (
        <>
          <div className="bg-white rounded-[20px] p-5 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3.5">Reason for Abatement</div>
            {reasons.map((reason, idx) => (
              <button key={idx} type="button" onClick={() => toggleReason(idx)} className="flex items-center gap-3 py-3 px-1 border-b border-[#F1F5F9] last:border-b-0 w-full text-left transition-colors hover:bg-[#F8FAFC]">
                <div className={`w-[22px] h-[22px] rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${reasonChecks[idx] ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'}`}>
                  {reasonChecks[idx] && <i className="fas fa-check text-[10px] text-white" />}
                </div>
                <span className="text-[0.82rem] font-semibold text-[#0A1628]">{reason}</span>
              </button>
            ))}
          </div>
          <div>
            <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Explanation</div>
            <textarea className="w-full min-h-[100px] px-4 py-3.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl text-[0.82rem] font-medium text-[#0A1628] resize-y outline-none focus:border-[#0A1628] focus:bg-white placeholder:text-[#CBD5E1]" placeholder="Describe your circumstances and why penalties should be abated..." value={explanation} onChange={(e) => { if (e.target.value.length <= 500) setExplanation(e.target.value) }} />
            <div className="text-[0.68rem] text-[#CBD5E1] mt-1.5 text-right">{explanation.length} / 500 characters</div>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          Continue <i className="fas fa-arrow-right ml-1.5 text-xs" />
        </button>
        <button onClick={handleGeneratePdf} disabled={generating} className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all disabled:opacity-50">
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  )
}
