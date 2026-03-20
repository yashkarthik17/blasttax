'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Collapsible Section                                                 */
/* ------------------------------------------------------------------ */

function SectionCard({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  badge,
  rightLabel,
  defaultOpen = false,
  children,
}: {
  icon: string
  iconBg: string
  iconColor: string
  title: string
  subtitle?: string
  badge?: string
  rightLabel?: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-between w-full pb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-[30px] h-[30px] rounded-lg ${iconBg} flex items-center justify-center`}>
            <i className={`fas ${icon} text-xs ${iconColor}`} />
          </div>
          <div className="text-left">
            <div className="text-[0.82rem] font-bold text-[#0A1628]">{title}</div>
            {subtitle && <div className="text-[0.68rem] text-[#94A3B8]">{subtitle}</div>}
          </div>
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

function PrefilledField({ label, value, locked = true }: { label: string; value: string; locked?: boolean }) {
  return (
    <div className="mb-2.5">
      <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">{label}</div>
      <div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3">
        <span className="text-[0.82rem] font-semibold text-[#0A1628]">{value}</span>
        {locked && <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" />}
      </div>
    </div>
  )
}

function ExpenseRow({ label, value, sub, bold }: { label: string; value: string; sub?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F8FAFC] last:border-b-0">
      <div>
        <span className={`text-[0.78rem] ${bold ? 'font-bold text-[#0A1628]' : 'text-[#64748B]'}`}>{label}</span>
        {sub && <div className="text-[0.6rem] text-[#CBD5E1]">{sub}</div>}
      </div>
      <span className={`text-[0.78rem] ${bold ? 'font-extrabold text-[#0A1628]' : 'font-bold text-[#0A1628]'}`}>{value}</span>
    </div>
  )
}

function AssetRow({ name, detail, fmv, qsv }: { name: string; detail: string; fmv: string; qsv: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#F8FAFC] last:border-b-0">
      <div>
        <div className="text-[0.78rem] font-semibold text-[#0A1628]">{name}</div>
        <div className="text-[0.65rem] text-[#94A3B8]">{detail}</div>
      </div>
      <div className="text-right">
        <div className="text-[0.78rem] font-bold text-[#0A1628]">{fmv}</div>
        <span className="inline-flex px-2 py-0.5 bg-[#FFFBEB] rounded-full text-[0.62rem] font-bold text-[#92400E]">{qsv}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form433AOICPage() {
  const router = useRouter()
  const { answers, caseId } = useWizard()

  const [futureIncomeMultiplier, setFutureIncomeMultiplier] = useState<12 | 24>(12)
  const [hasDissipated, setHasDissipated] = useState(false)
  const [dissipatedDesc, setDissipatedDesc] = useState('')
  const [dissipatedValue, setDissipatedValue] = useState('')
  const [dissipatedDate, setDissipatedDate] = useState('')
  const [dissipatedTo, setDissipatedTo] = useState('')
  const [certify, setCertify] = useState(false)
  const [generating, setGenerating] = useState(false)

  const mdi = 511
  const nre = 37250
  const futureIncome = mdi * futureIncomeMultiplier
  const rcpTotal = nre + futureIncome

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-433a-oic' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-433A-OIC.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-3.5">
      {/* Heading */}
      <div>
        <div className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Collection Information Statement</div>
        <div className="text-[0.78rem] text-[#94A3B8] mt-1 leading-relaxed">IRS Form 433-A(OIC) &mdash; Required for your Offer in Compromise</div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 bg-[#EBF0FF] border border-[rgba(37,99,235,0.1)] rounded-[14px]">
        <i className="fas fa-info-circle text-[13px] text-[#2563EB] flex-shrink-0 mt-0.5" />
        <div className="text-[0.75rem] text-[#1E40AF] leading-relaxed">
          We&apos;ve pre-filled this from your financial analysis. Review each section and confirm accuracy.
        </div>
      </div>

      {/* Section 1: Personal Information */}
      <SectionCard icon="fa-user" iconBg="bg-[#EFF4FF]" iconColor="text-[#2563EB]" title="Section 1: Personal Information" subtitle="Pre-filled from profile" badge="COMPLETE">
        <PrefilledField label="Full Name" value="Jane M. Doe" />
        <div className="flex gap-2.5 mb-2.5">
          <div className="flex-1"><PrefilledField label="SSN" value="***-**-4589" /></div>
          <div className="flex-1"><PrefilledField label="Date of Birth" value="04/15/1984" /></div>
        </div>
        <PrefilledField label="Address" value="1234 Elm Street, Austin, TX 78701" />
        <div className="flex gap-2.5">
          <div className="flex-1"><PrefilledField label="Home Phone" value="(512) 555-0147" locked={false} /></div>
          <div className="flex-1"><PrefilledField label="Cell Phone" value="(512) 555-0199" locked={false} /></div>
        </div>
      </SectionCard>

      {/* Section 2: Employment */}
      <SectionCard icon="fa-briefcase" iconBg="bg-[#F5F0FF]" iconColor="text-[#7C3AED]" title="Section 2: Employment" subtitle="Current employer details" badge="COMPLETE">
        <PrefilledField label="Employer Name" value="Acme Technology Inc." locked={false} />
        <PrefilledField label="Employer Address" value="500 Tech Blvd, Austin, TX 78702" locked={false} />
        <div className="flex gap-2.5">
          <div className="flex-1"><PrefilledField label="Occupation" value="Software Engineer" locked={false} /></div>
          <div className="flex-1"><PrefilledField label="How Long Employed" value="3 years, 4 months" locked={false} /></div>
        </div>
      </SectionCard>

      {/* Section 3: Asset Summary */}
      <SectionCard icon="fa-piggy-bank" iconBg="bg-[#E6F9EE]" iconColor="text-[#00A651]" title="Section 3: Asset Summary" subtitle="QSV calculations from Screen 27" rightLabel="$51,250" defaultOpen>
        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2">Bank Accounts</div>
        <AssetRow name="Chase Checking ****3421" detail="QSV = Actual Balance" fmv="$3,400" qsv="QSV $3,400" />
        <AssetRow name="Ally Savings ****7890" detail="QSV = Actual Balance" fmv="$800" qsv="QSV $800" />

        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mt-3 mb-2">Real Estate</div>
        <AssetRow name="Primary Residence" detail="FMV $320K x 80% - $285K mtg - $20K HELOC" fmv="-$49,000" qsv="QSV $0" />

        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mt-3 mb-2">Vehicles</div>
        <AssetRow name="2020 Honda Civic" detail="FMV $18.5K x 80% - $13.3K loan" fmv="$1,500" qsv="QSV $1,500" />

        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mt-3 mb-2">Retirement Accounts</div>
        <AssetRow name="401(k) — Fidelity" detail="$42K - 10% penalty - ~25% tax (age 42)" fmv="$28,350" qsv="QSV $28,350" />

        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mt-3 mb-2">Life Insurance</div>
        <AssetRow name="Whole Life — Net CSV" detail="CSV $4,500 - $1,300 policy loans" fmv="$3,200" qsv="QSV $3,200" />

        {/* NRE Total */}
        <div className="flex items-center justify-between px-3.5 py-3 bg-[#0A1628] rounded-xl mt-2.5">
          <span className="text-[0.65rem] font-semibold text-white/50 uppercase tracking-wider">Net Realizable Equity (NRE)</span>
          <span className="text-base font-black text-white">$37,250</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[0.68rem] text-[#94A3B8]">
          <i className="fas fa-wand-magic-sparkles text-[9px] text-[#2563EB]" />
          Auto-calculated from Screen 27 asset data
        </div>
      </SectionCard>

      {/* Section 4: Monthly Income */}
      <SectionCard icon="fa-wallet" iconBg="bg-[#E6F9EE]" iconColor="text-[#00A651]" title="Section 4: Monthly Income" subtitle="Per-person breakout" rightLabel="$5,200/mo">
        <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2">Taxpayer &mdash; Jane Doe</div>
        <ExpenseRow label="Gross wages/salary" value="$6,250" />
        <ExpenseRow label="Federal tax withheld" value="-$625" />
        <ExpenseRow label="State tax withheld" value="$0" />
        <ExpenseRow label="FICA (Social Security + Medicare)" value="-$425" />
        <ExpenseRow label="Net monthly income" value="$5,200" bold />
      </SectionCard>

      {/* Section 5: Monthly Expenses */}
      <SectionCard icon="fa-receipt" iconBg="bg-[#FFF0F1]" iconColor="text-[#E63946]" title="Section 5: Monthly Expenses" subtitle="IRS standards caps applied" rightLabel="$4,689/mo">
        <ExpenseRow label="Food, clothing, misc" value="$785" sub="IRS cap: $785/mo" />
        <ExpenseRow label="Housing & utilities" value="$1,850" sub="IRS cap: $2,138/mo" />
        <ExpenseRow label="Transportation (ownership)" value="$662" />
        <ExpenseRow label="Transportation (operating)" value="$294" />
        <ExpenseRow label="Healthcare" value="$84" sub="Under 65: $84/person" />
        <ExpenseRow label="Health insurance" value="$450" />
        <ExpenseRow label="Court-ordered payments" value="$0" />
        <ExpenseRow label="Child/dependent care" value="$564" />
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#F8FAFC] rounded-[10px] mt-1">
          <span className="text-[0.78rem] font-bold text-[#0A1628]">Total allowable expenses</span>
          <span className="text-[0.85rem] font-extrabold text-[#E63946]">$4,689</span>
        </div>
      </SectionCard>

      {/* Section 6: Monthly Disposable Income */}
      <div className="bg-white rounded-2xl p-[18px] border-[1.5px] border-[#E6F9EE]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#E6F9EE] flex items-center justify-center">
            <i className="fas fa-calculator text-xs text-[#00A651]" />
          </div>
          <div className="text-[0.82rem] font-bold text-[#0A1628]">Section 6: Monthly Disposable Income</div>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] mb-1.5">
          <span className="text-[0.78rem] text-[#64748B]">Net monthly income</span>
          <span className="text-[0.78rem] font-bold text-[#0A1628]">$5,200</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] mb-1.5">
          <span className="text-[0.78rem] text-[#64748B]">Total allowable expenses</span>
          <span className="text-[0.78rem] font-bold text-[#E63946]">-$4,689</span>
        </div>
        <div className="flex justify-between px-3.5 py-3 bg-[#E6F9EE] rounded-[10px]">
          <span className="text-[0.82rem] font-bold text-[#0A1628]">Monthly Disposable Income (MDI)</span>
          <span className="text-[0.95rem] font-black text-[#00A651]">$511</span>
        </div>
      </div>

      {/* Section 7: Future Income */}
      <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#EFF4FF] flex items-center justify-center">
            <i className="fas fa-chart-line text-xs text-[#2563EB]" />
          </div>
          <div className="text-[0.82rem] font-bold text-[#0A1628]">Section 7: Future Income</div>
        </div>

        <div className="flex gap-2 mb-3.5">
          <button
            type="button"
            onClick={() => setFutureIncomeMultiplier(12)}
            className={`flex-1 flex gap-2.5 p-3.5 border-[1.5px] rounded-[14px] text-left transition-all ${
              futureIncomeMultiplier === 12 ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] bg-white'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
              futureIncomeMultiplier === 12 ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {futureIncomeMultiplier === 12 && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <div className="text-[0.8rem] font-bold text-[#0A1628]">Lump Sum</div>
              <div className="text-[0.68rem] text-[#94A3B8]">MDI x 12 months</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFutureIncomeMultiplier(24)}
            className={`flex-1 flex gap-2.5 p-3.5 border-[1.5px] rounded-[14px] text-left transition-all ${
              futureIncomeMultiplier === 24 ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] bg-white'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
              futureIncomeMultiplier === 24 ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {futureIncomeMultiplier === 24 && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <div className="text-[0.8rem] font-bold text-[#0A1628]">Periodic</div>
              <div className="text-[0.68rem] text-[#94A3B8]">MDI x 24 months</div>
            </div>
          </button>
        </div>

        <div className="flex justify-between px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] mb-1.5">
          <span className="text-[0.78rem] text-[#64748B]">MDI</span>
          <span className="text-[0.78rem] font-bold text-[#0A1628]">$511</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] mb-1.5">
          <span className="text-[0.78rem] text-[#64748B]">Multiplier</span>
          <span className="text-[0.78rem] font-bold text-[#0A1628]">&times; {futureIncomeMultiplier} months</span>
        </div>
        <div className="flex justify-between px-3.5 py-3 bg-[#EBF0FF] rounded-[10px]">
          <span className="text-[0.82rem] font-bold text-[#0A1628]">Future Income</span>
          <span className="text-[0.95rem] font-black text-[#2563EB]">${futureIncome.toLocaleString()}</span>
        </div>
      </div>

      {/* Section 8: Dissipated Assets */}
      <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#FFFBEB] flex items-center justify-center">
            <i className="fas fa-triangle-exclamation text-xs text-[#D97706]" />
          </div>
          <div className="text-[0.82rem] font-bold text-[#0A1628]">Section 8: Dissipated Assets</div>
        </div>
        <div className="text-[0.75rem] text-[#64748B] leading-relaxed mb-3">
          Have you transferred, sold, or gifted any assets worth $1,000+ in the past 12 months?
        </div>
        <div className="flex gap-2.5 mb-3">
          <button
            type="button"
            onClick={() => setHasDissipated(true)}
            className={`flex-1 text-center py-3 border-[1.5px] rounded-xl text-[0.82rem] font-bold text-[#0A1628] transition-all ${
              hasDissipated ? 'border-[#0A1628] bg-[#EBF0FF]' : 'border-[#F3F4F6] bg-white'
            }`}
          >Yes</button>
          <button
            type="button"
            onClick={() => setHasDissipated(false)}
            className={`flex-1 text-center py-3 border-[1.5px] rounded-xl text-[0.82rem] font-bold text-[#0A1628] transition-all ${
              !hasDissipated ? 'border-[#0A1628] bg-[#EBF0FF]' : 'border-[#F3F4F6] bg-white'
            }`}
          >No</button>
        </div>
        {hasDissipated && (
          <div className="space-y-2.5">
            <div>
              <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Description of Asset</div>
              <input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="e.g., Sold 2018 Toyota Camry" value={dissipatedDesc} onChange={(e) => setDissipatedDesc(e.target.value)} />
            </div>
            <div className="flex gap-2.5">
              <div className="flex-1">
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Value / Sale Price</div>
                <input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="$0" value={dissipatedValue} onChange={(e) => setDissipatedValue(e.target.value)} />
              </div>
              <div className="flex-1">
                <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Date</div>
                <input type="date" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={dissipatedDate} onChange={(e) => setDissipatedDate(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Transferred To / Buyer</div>
              <input type="text" className="w-full px-3 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="Name of recipient" value={dissipatedTo} onChange={(e) => setDissipatedTo(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section 9: Total RCP */}
      <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)' }}>
        <div className="text-[0.68rem] font-semibold text-white/50 uppercase tracking-wider mb-3.5">Section 9: Reasonable Collection Potential</div>
        <div className="flex justify-between py-2 border-b border-white/10">
          <span className="text-[0.78rem] text-white/70">Net Realizable Equity (NRE)</span>
          <span className="text-[0.78rem] font-bold text-white">${nre.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/10">
          <span className="text-[0.78rem] text-white/70">Future Income ({futureIncomeMultiplier === 12 ? 'Lump Sum' : 'Periodic'})</span>
          <span className="text-[0.78rem] font-bold text-white">${futureIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-3 mt-1">
          <span className="text-[0.92rem] font-extrabold text-white">Total RCP</span>
          <span className="text-[1.2rem] font-black text-[#00A651]">${rcpTotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 px-3 py-2.5 bg-white/[0.08] rounded-[10px]">
          <i className="fas fa-lightbulb text-[10px] text-[#F59E0B]" />
          <span className="text-[0.7rem] text-white/70 leading-snug">Your minimum OIC offer must be &ge; ${rcpTotal.toLocaleString()}. The IRS will reject any offer below your RCP.</span>
        </div>
      </div>

      {/* Signature Section */}
      <div className="bg-white rounded-2xl p-[18px] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#F5F0FF] flex items-center justify-center">
            <i className="fas fa-signature text-xs text-[#7C3AED]" />
          </div>
          <div className="text-[0.82rem] font-bold text-[#0A1628]">Signature &amp; Certification</div>
        </div>
        <div className="text-[0.72rem] text-[#64748B] leading-relaxed mb-3.5">
          Under penalties of perjury, I declare that I have examined this statement and, to the best of my knowledge and belief, it is true, correct, and complete.
        </div>
        <div className="flex items-center gap-2.5 mb-3.5">
          <input type="checkbox" checked={certify} onChange={(e) => setCertify(e.target.checked)} className="w-5 h-5 accent-[#0A1628] flex-shrink-0" />
          <label className="text-[0.78rem] font-semibold text-[#0A1628] cursor-pointer">I certify this information is accurate</label>
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
            <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] px-3 py-2.5">
              <span className="text-[0.78rem] font-semibold text-[#0A1628]">03/17/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button
          onClick={() => router.push('/forms/form-656a')}
          className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
        >
          Continue <i className="fas fa-arrow-right ml-1.5 text-xs" />
        </button>
        <button
          onClick={handleGeneratePdf}
          disabled={generating}
          className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-50"
        >
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
        <button className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          <i className="fas fa-bookmark mr-1.5 text-[11px]" /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
