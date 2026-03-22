'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function AssetRow({ label, detail, detail2, amount, qsv }: { label: string; detail: string; detail2?: string; amount: string; qsv?: string }) {
  return (
    <div className="flex items-start justify-between border-b border-[#F0F0F5] py-2.5 last:border-0">
      <div>
        <div className="text-sm font-semibold text-[#1A1A2E]">{label}</div>
        <div className="text-xs text-[#8585A0]">{detail}</div>
        {detail2 && <div className="text-xs text-[#8585A0]">{detail2}</div>}
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-[#1A1A2E]">{amount}</div>
        {qsv && (
          <span className="inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400">
            QSV {qsv}
          </span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function IndividualRCPPage() {
  const router = useRouter()
  const [paymentType, setPaymentType] = useState<'lump' | 'periodic'>('lump')
  const [tipsOpen, setTipsOpen] = useState(false)

  const mdi = 511
  const months = paymentType === 'lump' ? 12 : 24
  const futureIncome = mdi * months
  const nre = 37250
  const totalRcp = nre + futureIncome

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1A1A2E]">Your Reasonable Collection Potential</h1>
        <p className="mt-1 text-sm text-[#5C5C7A]">How the IRS calculates what they can collect from you</p>
      </div>

      {/* Section 1: Net Realizable Equity */}
      <div className="rounded-2xl border border-[#F0F0F5] bg-white p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A651]/15">
            <svg className="h-3.5 w-3.5 text-[#00A651]" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
          </div>
          <div>
            <div className="text-sm font-bold text-[#1A1A2E]">Section 1: Net Realizable Equity (NRE)</div>
            <div className="text-xs text-[#8585A0]">Per-asset QSV breakdown</div>
          </div>
        </div>

        <h4 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#8585A0]">Bank Accounts</h4>
        <AssetRow label="Cash & Checking" detail="No discount -- full balance" amount="$4,200" qsv="$4,200" />

        <h4 className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8585A0]">Real Estate</h4>
        <AssetRow label="Primary Residence" detail="FMV $320K x 80% = $256K" detail2="- $285K mtg - $20K HELOC" amount="-$49,000" qsv="$0" />

        <h4 className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8585A0]">Vehicles</h4>
        <AssetRow label="2020 Honda Civic" detail="FMV $18.5K x 80% = $14.8K" detail2="- $13.3K loan" amount="$1,500" qsv="$1,500" />

        <h4 className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8585A0]">Retirement Accounts</h4>
        <AssetRow label="401(k) -- Fidelity" detail="Balance $42K - 10% penalty - 25% tax" amount="$28,350" qsv="$28,350" />

        <h4 className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8585A0]">Life Insurance</h4>
        <AssetRow label="Whole Life -- Net CSV" detail="CSV $4,500 - $1,300 loans" amount="$3,200" qsv="$3,200" />

        <h4 className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8585A0]">Other Assets</h4>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-sm text-[#8585A0]">None reported</span>
          <span className="text-sm font-bold text-[#1A1A2E]">$0</span>
        </div>

        {/* NRE Total */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#FAFAFF] px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C5C7A]">Total NRE</span>
          <span className="text-lg font-black text-[#1A1A2E]">{fmt(nre)}</span>
        </div>
      </div>

      {/* Section 2: Future Income */}
      <div className="rounded-2xl border border-[#F0F0F5] bg-white p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/15">
            <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
          </div>
          <div>
            <div className="text-sm font-bold text-[#1A1A2E]">Section 2: Future Income</div>
            <div className="text-xs text-[#8585A0]">MDI x payment period multiplier</div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between rounded-lg bg-[#FAFAFF] px-3 py-2.5">
          <span className="text-sm text-[#5C5C7A]">Monthly Disposable Income (MDI)</span>
          <span className="text-sm font-bold text-[#1A1A2E]">$511/mo</span>
        </div>

        {/* Toggle */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          {(['lump', 'periodic'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setPaymentType(type)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                paymentType === type
                  ? 'border-blue-500/40 bg-[#2563EB]/10 ring-1 ring-blue-500/20'
                  : 'border-[#D5D5E0] bg-[#FAFAFF] hover:border-[#D5D5E0]'
              }`}
            >
              <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${paymentType === type ? 'border-blue-500 bg-[#2563EB]' : 'border-[#D5D5E0]'}`}>
                {paymentType === type && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A1A2E]">{type === 'lump' ? 'Lump Sum' : 'Periodic'}</div>
                <div className="text-xs text-[#8585A0]">MDI x {type === 'lump' ? '12' : '24'} months</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between rounded-lg bg-[#FAFAFF] px-3 py-2.5">
          <span className="text-sm text-[#5C5C7A]">Multiplier</span>
          <span className="text-sm font-bold text-[#1A1A2E]">x {months} months</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#2563EB]/10 px-3 py-3">
          <span className="text-sm font-bold text-[#1A1A2E]">Future Income</span>
          <span className="text-lg font-black text-[#2563EB]">{fmt(futureIncome)}</span>
        </div>
      </div>

      {/* Section 3: Total RCP */}
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-5">
        <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-[#5C5C7A]">Section 3: Total RCP</h4>
        <div className="flex items-center justify-between border-b border-[#F0F0F5] py-2">
          <span className="text-sm text-[#5C5C7A]">Net Realizable Equity (NRE)</span>
          <span className="text-sm font-bold text-[#1A1A2E]">{fmt(nre)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#F0F0F5] py-2">
          <span className="text-sm text-[#5C5C7A]">Future Income</span>
          <span className="text-sm font-bold text-[#1A1A2E]">{fmt(futureIncome)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between py-3">
          <span className="text-lg font-extrabold text-[#1A1A2E]">Total RCP</span>
          <span className="text-2xl font-black text-[#00A651]">{fmt(totalRcp)}</span>
        </div>
      </div>

      {/* Callout */}
      <div className="flex items-start gap-3 rounded-xl bg-[#00A651]/10 px-4 py-3 ring-1 ring-emerald-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00A651]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        <div>
          <div className="text-sm font-bold text-[#1A1A2E]">This is your minimum OIC offer</div>
          <p className="mt-1 text-xs text-[#00A651] leading-relaxed">
            The IRS will reject any Offer in Compromise below your RCP of <strong>{fmt(totalRcp)}</strong>. Your offer must equal or exceed this amount.
          </p>
        </div>
      </div>

      {/* Tips Toggle */}
      <div className="rounded-2xl border border-[#F0F0F5] bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => setTipsOpen(!tipsOpen)}
          className="flex w-full items-center justify-between px-4 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15">
              <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v7.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V3z" /></svg>
            </div>
            <span className="text-sm font-bold text-[#1A1A2E]">How to lower your RCP</span>
          </div>
          <svg className={`h-3 w-3 text-[#8585A0] transition-transform ${tipsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {tipsOpen && (
          <div className="space-y-3 px-4 pb-4">
            {[
              { num: 1, title: 'Reduce asset equity:', text: 'Pay down credit cards with cash (converts assets to lower-value liabilities).' },
              { num: 2, title: 'Maximize allowable expenses:', text: 'Ensure all IRS-permitted living expenses are documented.' },
              { num: 3, title: 'Choose lump sum:', text: 'The 12-month multiplier is lower than periodic (24 months). Pay 20% upfront.' },
              { num: 4, title: 'Document special circumstances:', text: 'Medical conditions, disability, or economic hardship can lower what the IRS considers collectible.' },
            ].map((tip) => (
              <div key={tip.num} className="flex items-start gap-3">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#2563EB]/15 text-[10px] font-extrabold text-[#2563EB]">
                  {tip.num}
                </div>
                <p className="text-xs text-[#5C5C7A] leading-relaxed">
                  <strong className="text-[#1A1A2E]">{tip.title}</strong> {tip.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAFAFF] px-6 py-4 text-base font-bold text-[#1A1A2E] transition-all hover:bg-[#F0F0F5] active:scale-[0.98]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Back to Results
      </button>
    </div>
  )
}
