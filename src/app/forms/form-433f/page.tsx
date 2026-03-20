'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

function SectionCard({ icon, iconBg, iconColor, title, subtitle, badge, rightLabel, defaultOpen = false, children }: { icon: string; iconBg: string; iconColor: string; title: string; subtitle?: string; badge?: string; rightLabel?: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-between w-full pb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-[30px] h-[30px] rounded-lg ${iconBg} flex items-center justify-center`}><i className={`fas ${icon} text-xs ${iconColor}`} /></div>
          <div className="text-left"><div className="text-[0.82rem] font-bold text-[#0A1628]">{title}</div>{subtitle && <div className="text-[0.68rem] text-[#94A3B8]">{subtitle}</div>}</div>
        </div>
        <div className="flex items-center gap-2">
          {badge && <span className="inline-flex px-2 py-0.5 bg-[#E6F9EE] rounded-full text-[0.58rem] font-bold text-[#00A651]">{badge}</span>}
          {rightLabel && <span className="text-[0.78rem] font-bold text-[#0A1628]">{rightLabel}</span>}
          <i className={`fas fa-chevron-down text-[10px] text-[#CBD5E1] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function ExpenseInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F8FAFC] last:border-b-0">
      <span className="text-[0.78rem] text-[#64748B]">{label}</span>
      <input type="text" className="w-[90px] px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] text-right outline-none focus:border-[#0A1628]" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default function Form433FPage() {
  const { answers, caseId } = useWizard()

  const [employerName, setEmployerName] = useState('Acme Technology Inc.')
  const [grossIncome, setGrossIncome] = useState('$6,250')
  const [netIncome, setNetIncome] = useState('$5,200')
  const [expenses, setExpenses] = useState({ food: '$785', rent: '$1,850', utilities: '$288', transport: '$956', health: '$534', court: '$0', child: '$564' })
  const [otherIncome, setOtherIncome] = useState({ ss: '$0', pension: '$0', childSupport: '$0', rental: '$0', other: '$0' })
  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-433f' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-433F-Collection-Info.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <div className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Collection Information Statement</div>
        <div className="text-[0.78rem] text-[#94A3B8] mt-1 leading-relaxed">IRS Form 433-F &mdash; Simplified Financial Disclosure</div>
      </div>

      <div className="flex items-start gap-2.5 px-3.5 py-3 bg-[#EBF0FF] border border-[rgba(37,99,235,0.1)] rounded-[14px]">
        <i className="fas fa-info-circle text-[13px] text-[#2563EB] flex-shrink-0 mt-0.5" />
        <div className="text-[0.75rem] text-[#1E40AF] leading-relaxed"><strong>This form is used for CNC (Currently Not Collectible) requests</strong> and some Installment Agreement types. It collects fewer details than Form 433-A.</div>
      </div>

      {/* Section 1: Personal Info */}
      <SectionCard icon="fa-user" iconBg="bg-[#EFF4FF]" iconColor="text-[#2563EB]" title="Section 1: Personal Info" badge="COMPLETE">
        <div className="mb-2.5"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Full Name</div><div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3"><span className="text-[0.82rem] font-semibold text-[#0A1628]">Jane M. Doe</span><i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" /></div></div>
        <div className="flex gap-2.5 mb-2.5">
          <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">SSN</div><div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3"><span className="text-[0.82rem] font-semibold text-[#0A1628] tracking-wider">***-**-4589</span><i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" /></div></div>
          <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Phone</div><div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3"><span className="text-[0.82rem] font-semibold text-[#0A1628]">(512) 555-0199</span></div></div>
        </div>
        <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Address</div><div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3"><span className="text-[0.82rem] font-semibold text-[#0A1628]">1234 Elm Street, Austin, TX 78701</span><i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" /></div></div>
      </SectionCard>

      {/* Section 2: Bank Accounts */}
      <SectionCard icon="fa-piggy-bank" iconBg="bg-[#E6F9EE]" iconColor="text-[#00A651]" title="Section 2: Bank Accounts" subtitle="2 accounts" rightLabel="$4,200" defaultOpen>
        {[{name:'Chase Checking',bal:'$3,400',bankName:'Chase Bank'},{name:'Ally Savings',bal:'$800',bankName:'Ally Bank'}].map((acc,i) => (
          <div key={i} className="bg-[#F8FAFC] rounded-xl p-3.5 mb-2.5">
            <div className="flex justify-between mb-2"><span className="text-[0.78rem] font-semibold text-[#0A1628]">{acc.name}</span><span className="text-[0.78rem] font-bold text-[#0A1628]">{acc.bal}</span></div>
            <div className="flex gap-2.5">
              <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Bank Name</div><input type="text" className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" defaultValue={acc.bankName} /></div>
              <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Balance</div><input type="text" className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none text-right" defaultValue={acc.bal} /></div>
            </div>
          </div>
        ))}
        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#EFF4FF] text-[#0A1628] rounded-lg text-[11px] font-semibold transition-all hover:bg-[#dbe4ff]"><i className="fa-solid fa-plus text-[10px]" /> Add Account</button>
      </SectionCard>

      {/* Section 3: Other Assets */}
      <SectionCard icon="fa-house" iconBg="bg-[#F5F0FF]" iconColor="text-[#7C3AED]" title="Section 3: Other Assets" subtitle="Real estate & vehicles">
        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2">Real Estate</div>
        <div className="bg-[#F8FAFC] rounded-xl p-3.5 mb-3">
          <div className="text-[0.78rem] font-semibold text-[#0A1628] mb-2">Primary Residence</div>
          <div className="flex gap-2.5 mb-2"><div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Fair Market Value</div><input type="text" className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" defaultValue="$320,000" /></div><div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Loan Balance</div><input type="text" className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" defaultValue="$305,000" /></div></div>
          <div className="flex justify-between px-2.5 py-2 bg-[#FFFBEB] rounded-lg"><span className="text-[0.7rem] font-semibold text-[#92400E]">Equity</span><span className="text-[0.7rem] font-bold text-[#92400E]">$15,000</span></div>
        </div>
        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2">Vehicles</div>
        <div className="bg-[#F8FAFC] rounded-xl p-3.5 mb-2.5">
          <div className="text-[0.78rem] font-semibold text-[#0A1628] mb-2">2020 Honda Civic</div>
          <div className="flex gap-2.5 mb-2"><div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Fair Market Value</div><input type="text" className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" defaultValue="$18,500" /></div><div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Loan Balance</div><input type="text" className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" defaultValue="$13,300" /></div></div>
          <div className="flex justify-between px-2.5 py-2 bg-[#FFFBEB] rounded-lg"><span className="text-[0.7rem] font-semibold text-[#92400E]">Equity</span><span className="text-[0.7rem] font-bold text-[#92400E]">$5,200</span></div>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#EFF4FF] text-[#0A1628] rounded-lg text-[11px] font-semibold transition-all hover:bg-[#dbe4ff]"><i className="fa-solid fa-plus text-[10px]" /> Add Asset</button>
      </SectionCard>

      {/* Section 4: Employment */}
      <SectionCard icon="fa-briefcase" iconBg="bg-[#FEF3C7]" iconColor="text-[#D97706]" title="Section 4: Employment" rightLabel="$6,250/mo">
        <div className="mb-2.5"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Employer Name</div><input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" value={employerName} onChange={(e) => setEmployerName(e.target.value)} /></div>
        <div className="flex gap-2.5">
          <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Gross Monthly Income</div><input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} /></div>
          <div className="flex-1"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Net Monthly Income</div><input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} /></div>
        </div>
      </SectionCard>

      {/* Section 5: Other Income */}
      <SectionCard icon="fa-hand-holding-dollar" iconBg="bg-[#F0FDFA]" iconColor="text-[#0D9488]" title="Section 5: Other Income" rightLabel="$0/mo">
        <ExpenseInput label="Social Security" value={otherIncome.ss} onChange={(v) => setOtherIncome({...otherIncome, ss: v})} />
        <ExpenseInput label="Pension" value={otherIncome.pension} onChange={(v) => setOtherIncome({...otherIncome, pension: v})} />
        <ExpenseInput label="Child support received" value={otherIncome.childSupport} onChange={(v) => setOtherIncome({...otherIncome, childSupport: v})} />
        <ExpenseInput label="Rental income" value={otherIncome.rental} onChange={(v) => setOtherIncome({...otherIncome, rental: v})} />
        <ExpenseInput label="Other" value={otherIncome.other} onChange={(v) => setOtherIncome({...otherIncome, other: v})} />
      </SectionCard>

      {/* Section 6: Monthly Expenses */}
      <SectionCard icon="fa-receipt" iconBg="bg-[#FFF0F1]" iconColor="text-[#E63946]" title="Section 6: Monthly Expenses" subtitle="Simplified categories" rightLabel="$4,689/mo">
        <ExpenseInput label="Food & clothing" value={expenses.food} onChange={(v) => setExpenses({...expenses, food: v})} />
        <ExpenseInput label="Rent / mortgage" value={expenses.rent} onChange={(v) => setExpenses({...expenses, rent: v})} />
        <ExpenseInput label="Utilities" value={expenses.utilities} onChange={(v) => setExpenses({...expenses, utilities: v})} />
        <ExpenseInput label="Transportation" value={expenses.transport} onChange={(v) => setExpenses({...expenses, transport: v})} />
        <ExpenseInput label="Healthcare / insurance" value={expenses.health} onChange={(v) => setExpenses({...expenses, health: v})} />
        <ExpenseInput label="Court-ordered payments" value={expenses.court} onChange={(v) => setExpenses({...expenses, court: v})} />
        <ExpenseInput label="Child / dependent care" value={expenses.child} onChange={(v) => setExpenses({...expenses, child: v})} />
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#F8FAFC] rounded-[10px] mt-1">
          <span className="text-[0.78rem] font-bold text-[#0A1628]">Total monthly expenses</span>
          <span className="text-[0.85rem] font-extrabold text-[#E63946]">$4,977</span>
        </div>
      </SectionCard>

      {/* Section 7: Monthly Disposable Income */}
      <div className="bg-white rounded-2xl p-[18px] border-[1.5px] border-[#E6F9EE]">
        <div className="flex items-center gap-2.5 mb-3"><div className="w-[30px] h-[30px] rounded-lg bg-[#E6F9EE] flex items-center justify-center"><i className="fas fa-calculator text-xs text-[#00A651]" /></div><div className="text-[0.82rem] font-bold text-[#0A1628]">Section 7: Monthly Disposable Income</div></div>
        <div className="flex justify-between px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] mb-1.5"><span className="text-[0.78rem] text-[#64748B]">Total monthly income</span><span className="text-[0.78rem] font-bold text-[#0A1628]">$5,200</span></div>
        <div className="flex justify-between px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] mb-1.5"><span className="text-[0.78rem] text-[#64748B]">Total monthly expenses</span><span className="text-[0.78rem] font-bold text-[#E63946]">-$4,977</span></div>
        <div className="flex justify-between px-3.5 py-3 bg-[#E6F9EE] rounded-[10px]"><span className="text-[0.82rem] font-bold text-[#0A1628]">Monthly Disposable Income</span><span className="text-[0.95rem] font-black text-[#00A651]">$223</span></div>
        <div className="mt-2.5 flex items-start gap-2 px-3 py-2.5 bg-[#FFFBEB] border border-[rgba(245,166,35,0.15)] rounded-[10px]">
          <i className="fas fa-info-circle text-[11px] text-[#D97706] flex-shrink-0 mt-0.5" />
          <div className="text-[0.72rem] text-[#92400E] leading-relaxed"><strong>CNC Indicator:</strong> If your MDI is $0 or negative, you likely qualify for Currently Not Collectible status. The IRS may also approve CNC with a small positive MDI if hardship is demonstrated.</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          Generate Form 433-F <i className="fas fa-file-export ml-1.5 text-xs" />
        </button>
        <button onClick={handleGeneratePdf} disabled={generating} className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all disabled:opacity-50">
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
        <button className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold"><i className="fas fa-bookmark mr-1.5 text-[11px]" /> Save &amp; Exit</button>
      </div>
    </div>
  )
}
