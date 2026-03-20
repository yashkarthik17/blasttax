'use client'

import { useParams, useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import { useState, useEffect } from 'react'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---------------------------------------------------------------------------
// IA Detail
// ---------------------------------------------------------------------------
function IADetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const totalDebt = (result.totalDebt as number) ?? 47250
  const mdi = ((result.mdi as { mdi: number })?.mdi) ?? 0

  const iaTypes = [
    { name: 'Short-Term Plan', range: '(\u2264180 days)', eligible: false, badge: 'Not Eligible', badgeColor: 'bg-[#FFFBEB] text-[#92400E]', reason: 'Cannot pay full balance within 180 days based on MDI.' },
    { name: 'Guaranteed IA', range: '(\u2264$10K)', eligible: false, badge: 'Not Eligible', badgeColor: 'bg-[#FEF2F2] text-[#E63946]', reason: 'Balance exceeds $10,000 assessed tax threshold.' },
    { name: 'Streamlined IA', range: '(\u2264$50K)', eligible: totalDebt <= 50000, badge: 'Eligible', badgeColor: 'bg-[#E6F9EE] text-[#00A651]', recommended: true, monthlyPayment: Math.ceil(totalDebt / 72), term: 72 },
    { name: 'Expanded IA', range: '($50K-$100K)', eligible: false, badge: 'N/A', badgeColor: 'bg-[#EFF4FF] text-[#2563EB]', reason: 'Currently below threshold.' },
    { name: 'Non-Streamlined', range: '($100K-$250K)', eligible: false, badge: 'N/A', badgeColor: 'bg-[#EFF4FF] text-[#2563EB]', reason: 'Balance below threshold.' },
    { name: 'Partial Payment IA', range: '', eligible: mdi > 0, badge: 'Eligible', badgeColor: 'bg-[#E6F9EE] text-[#00A651]', alternative: true, monthlyPayment: mdi },
  ]

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-extrabold text-[#0A1628] mb-1">Payment Plan Options</h1>
        <p className="text-sm text-[#94A3B8]">Pay your tax debt over time with monthly payments</p>
      </div>

      {/* What is IA */}
      <div className="rounded-2xl border border-[rgba(0,61,165,0.08)] bg-[#EFF4FF] p-4.5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#0A1628]"><i className="fa-solid fa-calendar-check text-sm text-white" /></div>
          <h3 className="text-[0.95rem] font-extrabold text-[#0A1628]">What is an Installment Agreement?</h3>
        </div>
        <p className="text-[0.82rem] leading-relaxed text-[#374151]">A <strong>payment plan</strong> with the IRS. Instead of paying everything at once, you make <strong>monthly payments</strong> over time until your debt is paid off.</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-[rgba(0,61,165,0.1)] bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#0A1628]"><i className="fa-solid fa-user text-[13px] text-white" /></div>
          <span className="text-[13px] font-bold text-[#0A1628]">YOUR PROFILE</span>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex-1 text-center"><div className="text-[11px] font-semibold text-[#94A3B8] mb-0.5">Total Debt</div><div className="text-lg font-extrabold text-[#E63946]">{fmt(totalDebt)}</div></div>
          <div className="w-px bg-[#F1F5F9]" />
          <div className="flex-1 text-center"><div className="text-[11px] font-semibold text-[#94A3B8] mb-0.5">MDI</div><div className="text-lg font-extrabold text-[#0A1628]">{fmt(mdi)}<span className="text-[11px] font-medium text-[#64748B]">/mo</span></div></div>
        </div>
      </div>

      {/* IA Type Cards */}
      {iaTypes.map((ia) => (
        <div key={ia.name} className={`relative overflow-hidden rounded-2xl border-[1.5px] p-4 ${ia.eligible ? 'border-[rgba(0,166,81,0.25)] shadow-[0_1px_2px_rgba(0,0,0,0.03)]' : 'border-[#F1F5F9] opacity-70'}`}>
          <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl ${ia.eligible ? 'bg-[#00A651]' : ia.badge === 'N/A' ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'}`} />
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0A1628]">{ia.name}</span>
              {ia.range && <span className="text-[11px] text-[#64748B]">{ia.range}</span>}
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${ia.badgeColor}`}>{ia.badge}</span>
          </div>
          {ia.recommended && <div className="mb-2.5 inline-flex items-center gap-1 rounded-md bg-[rgba(0,166,81,0.08)] px-2 py-0.5 text-[11px] font-semibold text-[#00A651]"><i className="fa-solid fa-star text-[9px]" /> Recommended</div>}
          {ia.alternative && <div className="mb-2.5 inline-flex items-center gap-1 rounded-md bg-[rgba(37,99,235,0.08)] px-2 py-0.5 text-[11px] font-semibold text-[#2563EB]"><i className="fa-solid fa-shuffle text-[9px]" /> Alternative Option</div>}
          {ia.eligible && ia.monthlyPayment && (
            <div className="mb-2.5 rounded-xl bg-[#F8FAFC] p-3 space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-[#64748B]">Monthly Payment</span><span className="font-bold text-[#0A1628]">{fmt(ia.monthlyPayment)}/mo</span></div>
              {ia.term && <div className="flex justify-between text-xs"><span className="text-[#64748B]">Duration</span><span className="font-semibold text-[#0A1628]">{ia.term} months</span></div>}
              {ia.recommended && <div className="flex justify-between text-xs"><span className="text-[#64748B]">Financial Statement</span><span className="font-semibold text-[#00A651]">Not Required</span></div>}
            </div>
          )}
          {!ia.eligible && ia.reason && <p className="text-xs leading-snug text-[#64748B]">{ia.reason}</p>}
          {ia.eligible && ia.recommended && (
            <button onClick={() => router.push('/forms/form-9465')} className="mt-2 rounded-xl bg-[#00A651] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#008C44]">
              Apply Now <i className="fa-solid fa-arrow-right ml-1 text-[11px]" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// OIC Detail
// ---------------------------------------------------------------------------
function OICDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const totalDebt = (result.totalDebt as number) ?? 47250
  const nre = ((result.nre as { totalNRE: number })?.totalNRE) ?? 0
  const mdi = ((result.mdi as { mdi: number })?.mdi) ?? 0
  const rcp = nre + Math.max(0, mdi) * 12
  const savingsPct = Math.round(((totalDebt - rcp) / totalDebt) * 100)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#0A1628] mb-1">Settle Your Debt for Less</h1>
        <p className="text-sm text-[#94A3B8]">Negotiate a reduced payoff amount with the IRS</p>
      </div>

      <div className="rounded-2xl border border-[rgba(0,166,81,0.08)] bg-[#ECFDF5] p-4.5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#00A651]"><i className="fa-solid fa-handshake text-sm text-white" /></div>
          <h3 className="text-[0.95rem] font-extrabold text-[#0A1628]">What is an Offer in Compromise?</h3>
        </div>
        <p className="text-[0.82rem] leading-relaxed text-[#374151]">A deal with the IRS to <strong>settle your tax debt for less than you owe</strong>. If you {"can't"} pay the full amount and the IRS agrees, you pay a reduced amount and the rest is forgiven.</p>
      </div>

      {/* DATC - Eligible */}
      <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-[rgba(0,166,81,0.25)] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00A651]" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-[#0A1628]">Doubt as to Collectibility</span>
          <span className="rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[10px] font-bold text-[#00A651]"><i className="fa-solid fa-check mr-0.5 text-[9px]" /> Eligible</span>
        </div>
        <div className="mb-3 flex gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-[rgba(0,166,81,0.08)] px-2 py-0.5 text-[10px] font-bold text-[#00A651]"><i className="fa-solid fa-star text-[8px]" /> Recommended</span>
          <span className="rounded-md bg-[#F8FAFC] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">Most Common OIC Type</span>
        </div>

        {/* RCP calc */}
        <div className="mb-3 rounded-xl bg-[#F8FAFC] p-3">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">RCP Calculation</div>
          <div className="flex justify-between py-1.5 text-xs border-b border-[#F1F5F9]"><span className="text-[#64748B]">Asset Equity</span><span className="font-semibold text-[#0A1628]">{fmt(nre)}</span></div>
          <div className="flex justify-between py-1.5 text-xs border-b border-[#F1F5F9]"><span className="text-[#64748B]">Future Income (Lump Sum)</span><span className="font-semibold text-[#0A1628]">{fmt(mdi)} x 12 = {fmt(Math.max(0, mdi) * 12)}</span></div>
          <div className="flex justify-between py-1.5 text-xs border-t-2 border-[#F1F5F9] mt-1"><span className="font-bold text-[#0A1628]">Minimum Offer (RCP)</span><span className="font-extrabold text-[#2563EB]">{fmt(rcp)}</span></div>
        </div>

        {/* Savings */}
        <div className="mb-3.5 flex items-center justify-between">
          <div><div className="text-xs text-[#64748B] mb-0.5">Your offer vs owed</div><div className="text-base font-extrabold text-[#0A1628]">{fmt(rcp)} <span className="text-xs font-medium text-[#64748B]">vs {fmt(totalDebt)}</span></div></div>
          <div className="inline-flex items-center gap-1 rounded-[10px] border border-[rgba(0,166,81,0.2)] bg-[#E6F9EE] px-3 py-1.5 text-[13px] font-extrabold text-[#065F46]">
            <i className="fa-solid fa-arrow-down text-[11px]" /> Save {savingsPct}%
          </div>
        </div>

        {/* Payment Options */}
        <div className="mb-3 rounded-xl bg-[#F8FAFC] p-3">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">Payment Options</div>
          <div className="flex gap-2">
            <div className="flex-1 rounded-[10px] border border-[#F1F5F9] bg-white p-2.5">
              <div className="text-[11px] font-bold text-[#2563EB] mb-1">Lump Sum</div>
              <div className="text-xs font-semibold text-[#0A1628]">20% down ({fmt(rcp * 0.2)})</div>
              <div className="text-[11px] text-[#64748B]">Remainder in 5 months</div>
            </div>
            <div className="flex-1 rounded-[10px] border border-[#F1F5F9] bg-white p-2.5">
              <div className="text-[11px] font-bold text-[#7C3AED] mb-1">Periodic</div>
              <div className="text-xs font-semibold text-[#0A1628]">{fmt(Math.ceil(rcp / 24))}/mo</div>
              <div className="text-[11px] text-[#64748B]">For 24 months</div>
            </div>
          </div>
        </div>

        <button onClick={() => router.push('/forms/form-656')} className="w-full rounded-xl bg-[#00A651] py-3 text-[13px] font-semibold text-white hover:bg-[#008C44]">
          Begin OIC Application <i className="fa-solid fa-arrow-right ml-1 text-[11px]" />
        </button>
      </div>

      {/* DATL */}
      <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-[rgba(37,99,235,0.15)] bg-white p-4">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#2563EB]" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-[#0A1628]">Doubt as to Liability</span>
          <span className="rounded-full bg-[#EFF4FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]"><i className="fa-solid fa-magnifying-glass mr-0.5 text-[9px]" /> Review Needed</span>
        </div>
        <p className="text-xs leading-snug text-[#64748B]">Dispute the amount the IRS says you owe. No financial disclosure required.</p>
      </div>

      {/* ETA */}
      <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-[rgba(124,58,237,0.15)] bg-white p-4">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#7C3AED]" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-[#0A1628]">Effective Tax Administration</span>
          <span className="rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-bold text-[#7C3AED]"><i className="fa-solid fa-hand-holding-heart mr-0.5 text-[9px]" /> Special</span>
        </div>
        <p className="text-xs leading-snug text-[#64748B]">You can pay but it creates exceptional hardship. Applies to medical/disability situations or public policy cases.</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CNC Detail
// ---------------------------------------------------------------------------
function CNCDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const mdi = ((result.mdi as { mdi: number })?.mdi) ?? 0
  const [csedAnimated, setCsedAnimated] = useState(false)
  useEffect(() => { setTimeout(() => setCsedAnimated(true), 800) }, [])

  const points = [
    { icon: 'fa-circle-check', color: '#00A651', text: 'IRS stops active collection (levies, garnishments)', bold: true },
    { icon: 'fa-circle-check', color: '#00A651', text: 'CSED continues running -- debt can expire!', bold: true },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'Interest & penalties continue accruing', bold: false },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'IRS reviews annually -- if income increases, CNC revoked', bold: false },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'Tax refunds will still be offset', bold: false },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'Lien may still be filed for balance >$10K', bold: false },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#0A1628] mb-1">Pause Collection Activity</h1>
        <p className="text-sm text-[#94A3B8]">Stop IRS collections while your debt clock runs down</p>
      </div>

      <div className="rounded-2xl border border-[rgba(124,58,237,0.08)] bg-[#F5F3FF] p-4.5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#7C3AED]"><i className="fa-solid fa-pause-circle text-sm text-white" /></div>
          <h3 className="text-[0.95rem] font-extrabold text-[#0A1628]">What is Currently Not Collectible?</h3>
        </div>
        <p className="text-[0.82rem] leading-relaxed text-[#374151]">The IRS <strong>temporarily pauses all collection efforts</strong> because paying would cause financial hardship. Your debt {"doesn't"} go away, but the IRS stops trying to collect.</p>
      </div>

      {/* MDI Warning */}
      {mdi > 0 && (
        <div className="rounded-2xl border border-[#F3F4F6] bg-[#FFFBEB] p-4">
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#F59E0B]"><i className="fa-solid fa-triangle-exclamation text-[13px] text-white" /></div>
            <span className="text-[13px] font-bold text-[#92400E]">ELIGIBILITY CONCERN</span>
          </div>
          <div className="mb-1.5 flex items-baseline gap-2">
            <span className="text-[11px] font-semibold text-[#92400E]">Your MDI:</span>
            <span className="text-[22px] font-extrabold text-[#92400E]">{fmt(mdi)}<span className="text-xs font-medium">/mo</span></span>
          </div>
          <p className="text-xs leading-snug text-[#78350F]">CNC typically requires $0 monthly disposable income. Your MDI of {fmt(mdi)} may disqualify you unless expenses increase or income drops.</p>
        </div>
      )}

      {/* What CNC Means */}
      <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">What CNC Means</div>
        {points.map((pt, i) => (
          <div key={i} className="flex items-start gap-2.5 py-2 text-[13px] leading-snug">
            <i className={`fa-solid ${pt.icon} mt-0.5 shrink-0 text-sm`} style={{ color: pt.color }} />
            <span className={pt.bold ? 'font-medium text-[#0A1628]' : 'text-[#64748B]'}>{pt.text}</span>
          </div>
        ))}
      </div>

      {/* CSED Timeline */}
      <div className="rounded-2xl border border-[#F3F4F6] bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <i className="fa-solid fa-clock text-base text-[#0D9488]" />
          <span className="text-[13px] font-bold text-[#0A1628]">CSED Expiration Timeline</span>
        </div>
        <div className="relative h-8 overflow-hidden rounded-xl bg-[#F8FAFC] p-1">
          <div className="flex h-full items-center justify-center rounded-[10px] bg-[#0D9488] text-[10px] font-bold text-white transition-all duration-[1500ms]" style={{ width: csedAnimated ? '40%' : '0%' }}>
            40% elapsed
          </div>
        </div>
        <div className="mt-2.5 rounded-[10px] bg-[rgba(13,148,136,0.06)] p-2.5">
          <div className="text-xs font-semibold text-[#065F46] leading-snug">
            <i className="fa-solid fa-sparkles mr-1 text-[11px]" />
            If CNC is maintained: <strong>$0 paid</strong>, debt gone at expiration
          </div>
        </div>
      </div>

      {/* Required Docs */}
      <div className="rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">
          <i className="fa-solid fa-file-lines mr-1 text-[10px]" /> Required Documentation
        </div>
        {['Form 433-F (Collection Info Statement)', 'Bank statements (3 months)', 'Income proof (pay stubs, benefits letters)'].map(doc => (
          <div key={doc} className="flex items-center gap-2 py-1.5 text-xs text-[#0A1628]">
            <i className="fa-solid fa-file text-xs text-[#2563EB]" />
            <span className="font-medium">{doc}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {mdi <= 0 ? (
        <button onClick={() => router.push('/forms/form-433f')} className="w-full rounded-xl bg-[#00A651] py-3.5 text-sm font-semibold text-white hover:bg-[#008C44]">
          Request CNC Status <i className="fa-solid fa-arrow-right ml-1 text-[11px]" />
        </button>
      ) : (
        <div>
          <button disabled className="w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white py-3.5 text-sm font-semibold text-[#64748B] opacity-60">
            <i className="fa-solid fa-ban mr-1.5 text-xs" /> Not Eligible -- Your MDI is {fmt(mdi)}
          </button>
          <div className="mt-2 text-center">
            <button onClick={() => router.push('/analysis/detail/oic')} className="text-[13px] font-semibold text-[#2563EB]">
              <i className="fa-solid fa-arrow-right mr-1 text-[11px]" /> Consider OIC Instead
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Penalty Detail
// ---------------------------------------------------------------------------
function PenaltyDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const penalties = (result.penalties as { taxYear: number; ftfAmount: number; ftpAmount: number; totalPenalties: number; ftaEligible: boolean }[]) ?? []
  const totalFTF = penalties.reduce((s, p) => s + p.ftfAmount, 0)
  const totalFTP = penalties.reduce((s, p) => s + p.ftpAmount, 0)
  const totalPen = totalFTF + totalFTP

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#00A651] mb-1">Remove {fmt(totalPen || 5300)} in Penalties</h1>
        <p className="text-sm text-[#94A3B8]">Eliminate IRS penalties from your balance</p>
      </div>

      <div className="rounded-2xl border border-[rgba(245,166,35,0.12)] bg-[#FFFBEB] p-4.5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F59E0B]"><i className="fa-solid fa-eraser text-sm text-white" /></div>
          <h3 className="text-[0.95rem] font-extrabold text-[#0A1628]">What is Penalty Abatement?</h3>
        </div>
        <p className="text-[0.82rem] leading-relaxed text-[#374151]"><strong>Removing penalties</strong> the IRS added to your tax debt. If you had a good reason for filing late or paying late, the IRS may waive those penalties entirely.</p>
      </div>

      {/* Penalty Breakdown */}
      <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">Your Penalty Breakdown</div>
        <div className="flex items-center gap-3 py-2.5">
          <div className="min-w-[100px]"><div className="text-xs font-semibold text-[#0A1628]">Failure to File</div><div className="text-[10px] text-[#64748B]">TC 170</div></div>
          <div className="h-2 flex-1 overflow-hidden rounded bg-[#F1F5F9]"><div className="h-full rounded bg-[#E63946]" style={{ width: '60%' }} /></div>
          <span className="min-w-[50px] text-right text-sm font-bold text-[#E63946]">{fmt(totalFTF || 3200)}</span>
        </div>
        <div className="flex items-center gap-3 py-2.5">
          <div className="min-w-[100px]"><div className="text-xs font-semibold text-[#0A1628]">Failure to Pay</div><div className="text-[10px] text-[#64748B]">TC 276</div></div>
          <div className="h-2 flex-1 overflow-hidden rounded bg-[#F1F5F9]"><div className="h-full rounded bg-[#F59E0B]" style={{ width: '40%' }} /></div>
          <span className="min-w-[50px] text-right text-sm font-bold text-[#F59E0B]">{fmt(totalFTP || 2100)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t-2 border-[#F1F5F9] pt-2.5">
          <span className="text-[13px] font-bold text-[#0A1628]">Total Penalties</span>
          <span className="text-xl font-extrabold text-[#E63946]">{fmt(totalPen || 5300)}</span>
        </div>
      </div>

      {/* FTA Eligibility */}
      <div className="rounded-2xl border-[1.5px] border-[rgba(0,166,81,0.25)] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="mb-3.5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#00A651]"><i className="fa-solid fa-shield-check text-base text-white" /></div>
          <div>
            <div className="text-sm font-bold text-[#0A1628]">FTA Eligibility</div>
            <span className="rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[10px] font-bold text-[#00A651]">You Qualify!</span>
          </div>
        </div>
        {['No penalties in past 3 years', 'All returns filed', 'Current on payments/IA'].map(check => (
          <div key={check} className="flex items-center gap-2 py-1.5 text-xs">
            <i className="fa-solid fa-circle-check text-[13px] text-[#00A651]" />
            <span className="font-medium text-[#0A1628]">{check}</span>
          </div>
        ))}
        <div className="mt-3 rounded-xl border border-[rgba(0,166,81,0.15)] bg-white p-3.5 text-center">
          <div className="text-xs text-[#64748B] mb-1">Estimated Savings</div>
          <div className="text-[28px] font-black tracking-tight text-[#00A651]">{fmt(totalPen || 5300)}</div>
          <div className="text-[11px] font-semibold text-[#065F46]">100% of penalties removed</div>
        </div>
      </div>

      {/* How FTA Works */}
      <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">How FTA Works</div>
        {[
          { step: 1, title: 'Call IRS at 800-829-1040', desc: 'Or have your representative call on your behalf' },
          { step: 2, title: 'Request First-Time Abatement', desc: 'Reference IRC \u00A7 6651 administrative waiver' },
          { step: 3, title: 'TC 271 posts -- penalties removed', desc: 'Usually processed same day by phone' },
          { step: 4, title: `Balance drops to ${fmt((result.totalDebt as number ?? 47250) - (totalPen || 5300))}`, desc: `From ${fmt(result.totalDebt as number ?? 47250)} (saved ${fmt(totalPen || 5300)})`, green: true },
        ].map((s) => (
          <div key={s.step} className="relative flex gap-3.5 py-3">
            {s.step < 4 && <div className="absolute left-[15px] top-[42px] bottom-0 w-0.5 bg-[#F1F5F9]" />}
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white z-[1] ${s.green ? 'bg-[#00A651]' : 'bg-[#0A1628]'}`}>{s.step}</div>
            <div>
              <div className="text-[13px] font-bold text-[#0A1628]">{s.title}</div>
              <div className="mt-0.5 text-[11px] text-[#64748B]">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Tip */}
      <div className="flex items-start gap-3 rounded-[14px] border-[1.5px] border-[rgba(0,61,165,0.15)] bg-white p-4">
        <i className="fa-solid fa-chess-knight mt-0.5 text-lg text-[#2563EB]" />
        <div>
          <div className="text-[13px] font-bold text-[#0A1628] mb-1">Pro Tip: Apply FTA BEFORE Filing an OIC</div>
          <div className="text-xs leading-snug text-[#64748B]">Lower balance = lower RCP = lower offer amount. This is <strong className="text-[#2563EB]">{"\"Play A: Balance Reducer\""}</strong> strategy.</div>
        </div>
      </div>

      <button onClick={() => router.push('/forms/form-843')} className="w-full rounded-xl bg-[#00A651] py-3.5 text-sm font-semibold text-white hover:bg-[#008C44]">
        Request FTA Now <i className="fa-solid fa-phone ml-1.5 text-xs" />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function DetailPage() {
  const params = useParams()
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as Record<string, unknown> | undefined
  const type = params.type as string

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
        <h1 className="text-2xl font-extrabold text-[#0A1628]">No Results</h1>
        <p className="mt-2 text-sm text-[#64748B]">Run your analysis first to see details.</p>
        <button onClick={() => router.push('/analysis/results')} className="mt-4 text-sm font-medium text-[#2563EB]">Back to Results</button>
      </div>
    )
  }

  const titles: Record<string, string> = {
    ia: 'Installment Agreement', oic: 'Offer in Compromise', cnc: 'Currently Not Collectible', penalty: 'Penalty Abatement',
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md px-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 pb-3">
          <button onClick={() => router.push('/analysis/results')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white transition-all hover:border-[#2563EB]">
            <i className="fa-solid fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <span className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">{titles[type] ?? 'Resolution Detail'}</span>
          <div className="w-10 shrink-0" />
        </div>

        {type === 'ia' && <IADetail result={result} />}
        {type === 'oic' && <OICDetail result={result} />}
        {type === 'cnc' && <CNCDetail result={result} />}
        {type === 'penalty' && <PenaltyDetail result={result} />}

        {/* Compare link */}
        <div className="mt-4 text-center">
          <button onClick={() => router.push('/analysis/compare')} className="text-[13px] font-semibold text-[#2563EB]">
            <i className="fa-solid fa-arrows-left-right mr-1 text-[11px]" /> Compare with other options
          </button>
        </div>
      </div>
    </div>
  )
}
