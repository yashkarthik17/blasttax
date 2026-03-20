'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

function AccordionSection({ icon, iconBg, title, subtitle, defaultOpen = false, children }: { icon: string; iconBg: string; title: string; subtitle?: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white border border-[#F3F4F6] rounded-2xl overflow-hidden mb-2.5 transition-all">
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-colors hover:bg-[#F8FAFC]">
        <div className={`w-8 h-8 rounded-[10px] ${iconBg} flex items-center justify-center flex-shrink-0`}><i className={`fas ${icon} text-sm`} /></div>
        <div className="flex-1"><div className="text-[0.85rem] font-bold text-[#0A1628]">{title}</div>{subtitle && <div className="text-[0.7rem] text-[#94A3B8]">{subtitle}</div>}</div>
        <i className={`fas fa-chevron-down text-[11px] text-[#CBD5E1] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-3.5">{children}</div>}
    </div>
  )
}

function LineItem({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 bg-[#F8FAFC] rounded-[10px]">
      <span className="text-[0.82rem] font-semibold text-[#0A1628]">{label}</span>
      <span className="text-[0.82rem] font-bold text-[#0A1628]">{amount}</span>
    </div>
  )
}

export default function Form433BPage() {
  const router = useRouter()
  const { answers, caseId } = useWizard()

  const [businessType, setBusinessType] = useState(answers.businessType ?? 'LLC')
  const [arTotal, setArTotal] = useState('$8,500')
  const [grossReceipts, setGrossReceipts] = useState('$18,500')
  const [cogsAmount, setCogsAmount] = useState('$4,200')
  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-433b' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-433B-Business.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <div>
        <div className="text-[1.2rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Business Financial Information</div>
        <div className="text-[0.82rem] text-[#94A3B8] mt-1.5 leading-relaxed">Required for business tax debt resolutions</div>
      </div>

      {/* Business Details Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6]">
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Business Details</div>

        <div className="mb-2.5">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Business Name</div>
          <input type="text" className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl text-[0.85rem] font-semibold text-[#0A1628] outline-none" defaultValue="Doe's Consulting LLC" readOnly />
        </div>

        <div className="mb-2.5">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">EIN</div>
          <div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3">
            <span className="text-[0.85rem] font-semibold text-[#0A1628] tracking-wider">**-***4321</span>
            <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" />
          </div>
        </div>

        <div>
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Business Type</div>
          <select className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl text-[0.85rem] font-semibold text-[#0A1628] outline-none" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
            <option>Sole Proprietorship</option><option>LLC</option><option>S-Corp</option><option>C-Corp</option><option>Partnership</option>
          </select>
        </div>
      </div>

      {/* Business Bank Accounts */}
      <AccordionSection icon="fa-university" iconBg="bg-[#EBF0FF] text-[#0A1628]" title="Business Bank Accounts" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#F8FAFC] rounded-[10px]">
            <div><div className="text-[0.82rem] font-semibold text-[#0A1628]">Chase Business Checking</div><div className="text-[0.7rem] text-[#94A3B8]">****6789</div></div>
            <span className="text-[0.88rem] font-bold text-[#0A1628]">$12,340</span>
          </div>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#EBF0FF] rounded-full text-[0.72rem] font-bold text-[#0A1628] transition-all hover:bg-[#0A1628] hover:text-white"><i className="fas fa-plus text-[9px]" /> Add Account</button>
        </div>
      </AccordionSection>

      {/* Accounts Receivable */}
      <AccordionSection icon="fa-file-invoice-dollar" iconBg="bg-[#E6F9EE] text-[#00A651]" title="Accounts Receivable" subtitle="Total: $8,500">
        <div className="mb-2">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Total Outstanding</div>
          <input type="text" className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl text-[0.85rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={arTotal} onChange={(e) => setArTotal(e.target.value)} placeholder="$0" />
        </div>
      </AccordionSection>

      {/* Business Assets */}
      <AccordionSection icon="fa-box" iconBg="bg-[#F5F0FF] text-[#7C3AED]" title="Business Assets" subtitle="Equipment, inventory, vehicles">
        <div className="flex flex-col gap-2">
          <LineItem label="Equipment" amount="$15,000" />
          <LineItem label="Inventory" amount="$6,200" />
          <LineItem label="Vehicles" amount="$8,500" />
          <div className="pt-1"><button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#EBF0FF] rounded-full text-[0.72rem] font-bold text-[#0A1628] transition-all hover:bg-[#0A1628] hover:text-white"><i className="fas fa-plus text-[9px]" /> Add Asset</button></div>
        </div>
      </AccordionSection>

      {/* Business Income */}
      <AccordionSection icon="fa-chart-line" iconBg="bg-[#FFFBEB] text-[#D97706]" title="Business Income" subtitle="Monthly gross receipts">
        <div className="flex flex-col gap-2">
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Monthly Gross Receipts</div><input type="text" className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl text-[0.85rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={grossReceipts} onChange={(e) => setGrossReceipts(e.target.value)} /></div>
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Cost of Goods Sold</div><input type="text" className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl text-[0.85rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={cogsAmount} onChange={(e) => setCogsAmount(e.target.value)} /></div>
        </div>
      </AccordionSection>

      {/* Business Expenses */}
      <AccordionSection icon="fa-receipt" iconBg="bg-[#FFF0F1] text-[#E63946]" title="Business Expenses" subtitle="Rent, utilities, payroll, etc.">
        <div className="flex flex-col gap-2">
          <LineItem label="Rent" amount="$3,200" />
          <LineItem label="Utilities" amount="$450" />
          <LineItem label="Insurance" amount="$380" />
          <LineItem label="Payroll" amount="$6,800" />
          <LineItem label="Supplies" amount="$920" />
        </div>
      </AccordionSection>

      {/* Net Business Income Summary */}
      <div className="bg-[#EBF0FF] rounded-2xl p-4 border border-[rgba(0,61,165,0.12)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[0.82rem] font-semibold text-[#64748B]">Net Business Income</span>
          <span className="text-[1.1rem] font-black text-[#0A1628]">$2,550/mo</span>
        </div>
        <div className="h-px bg-[rgba(0,61,165,0.1)] my-2" />
        <div className="flex items-center justify-between">
          <span className="text-[0.82rem] font-semibold text-[#64748B]">Total Business Equity</span>
          <span className="text-[1.1rem] font-black text-[#0A1628]">$29,700</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button
          onClick={() => router.push('/forms/submission')}
          className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
        >
          Continue <i className="fas fa-arrow-right ml-1.5 text-xs" />
        </button>
        <button onClick={handleGeneratePdf} disabled={generating} className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all disabled:opacity-50">
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
        <button onClick={() => router.back()} className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold">
          <i className="fas fa-bookmark mr-1.5 text-[11px]" /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
