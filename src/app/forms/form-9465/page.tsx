'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form9465Page() {
  const { answers, caseId } = useWizard()

  const totalOwed = 47250
  const [monthlyPayment, setMonthlyPayment] = useState(657)
  const minPayment = 657
  const maxPayment = 2000

  const [paymentMethod, setPaymentMethod] = useState<'ddia' | 'check' | 'payroll'>('ddia')
  const [routingNumber, setRoutingNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking')

  // Spouse fields
  const [spouseName, setSpouseName] = useState('')
  const [spouseSsn, setSpouseSsn] = useState('')
  const [spouseEmployerName, setSpouseEmployerName] = useState('')
  const [spouseEmployerAddress, setSpouseEmployerAddress] = useState('')

  // Employer fields
  const [employerName, setEmployerName] = useState(answers.employerName ?? 'Acme Corp')
  const [employerAddress, setEmployerAddress] = useState(answers.employerAddress ?? '500 Tech Blvd, Austin, TX 78702')

  const [generating, setGenerating] = useState(false)

  const payoffMonths = monthlyPayment > 0 ? Math.ceil(totalOwed / monthlyPayment) : 0
  const sliderPct = ((monthlyPayment - minPayment) / (maxPayment - minPayment)) * 100

  const payoffDate = (() => {
    const d = new Date(2026, 2)
    d.setMonth(d.getMonth() + payoffMonths)
    return `~${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} ${d.getFullYear()}`
  })()

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-9465' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-9465-IA-Request.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  const methods = [
    { key: 'ddia' as const, label: 'Direct Debit', badge: 'RECOMMENDED', desc: 'Automatic withdrawal, lower setup fee' },
    { key: 'check' as const, label: 'Check / Money Order', desc: 'Mail monthly payment to IRS' },
    { key: 'payroll' as const, label: 'Payroll Deduction', desc: 'Deducted from your paycheck' },
  ]

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Heading */}
      <div>
        <div className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Set up your Installment Agreement</div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-[#EBF0FF] rounded-full text-[0.72rem] font-semibold text-[#0A1628]">
          <i className="fas fa-shield-check text-[10px]" /> Streamlined IA (under $50,000)
        </div>
      </div>

      {/* Taxpayer Info */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Taxpayer Info (Lines 1a-4)</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between mb-2"><span className="text-[0.78rem] text-[#94A3B8]">Name</span><span className="text-[0.78rem] font-semibold text-[#0A1628]">Jane M. Doe</span></div>
          <div className="flex justify-between mb-2"><span className="text-[0.78rem] text-[#94A3B8]">SSN</span><span className="text-[0.78rem] font-semibold text-[#0A1628] tracking-wider">***-**-4589</span></div>
          <div className="flex justify-between"><span className="text-[0.78rem] text-[#94A3B8]">Address</span><span className="text-[0.78rem] font-semibold text-[#0A1628] text-right max-w-[55%]">1234 Elm St, Austin, TX</span></div>
        </div>
      </div>

      {/* Spouse Info */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Spouse Info (Lines 1b-2b) <span className="text-[0.65rem] font-medium normal-case tracking-normal text-[#94A3B8]">if filing jointly</span></div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Spouse Name (Line 1b)</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="Spouse full legal name" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} /></div>
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Spouse SSN (Line 2b)</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="***-**-****" value={spouseSsn} onChange={(e) => setSpouseSsn(e.target.value)} /></div>
          </div>
        </div>
      </div>

      {/* Employer — Taxpayer */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Employer &mdash; Taxpayer (Line 5)</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Employer Name</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={employerName} onChange={(e) => setEmployerName(e.target.value)} /></div>
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Employer Address</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)} /></div>
          </div>
        </div>
      </div>

      {/* Employer — Spouse */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Employer &mdash; Spouse (Line 6) <span className="text-[0.65rem] font-medium normal-case tracking-normal text-[#94A3B8]">if filing jointly</span></div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Employer Name</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="Spouse employer name" value={spouseEmployerName} onChange={(e) => setSpouseEmployerName(e.target.value)} /></div>
          <div><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Employer Address</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]" placeholder="Street, City, State, ZIP" value={spouseEmployerAddress} onChange={(e) => setSpouseEmployerAddress(e.target.value)} /></div>
          </div>
        </div>
      </div>

      {/* Total Amount Owed */}
      <div className="bg-[#FFF0F1] rounded-2xl p-[18px] border border-[rgba(230,57,70,0.1)]">
        <div className="text-[0.72rem] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">Total Amount Owed</div>
        <div className="text-[1.8rem] font-black text-[#E63946] tracking-tight leading-none">${totalOwed.toLocaleString()}</div>
      </div>

      {/* Tax Owed by Period */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Tax Owed by Period (Lines 7-9)</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex pb-1.5 border-b border-[#E2E8F0] mb-1">
            <span className="flex-1 text-[0.65rem] font-bold text-[#94A3B8] uppercase tracking-wider">Year</span>
            <span className="w-[70px] text-center text-[0.65rem] font-bold text-[#94A3B8] uppercase tracking-wider">Form</span>
            <span className="w-[80px] text-right text-[0.65rem] font-bold text-[#94A3B8] uppercase tracking-wider">Amount</span>
          </div>
          {[{year:'2023',amount:'$18,500'},{year:'2022',amount:'$16,200'},{year:'2021',amount:'$12,550'}].map((row, idx) => (
            <div key={idx} className={`flex items-center py-2 ${idx < 2 ? 'border-b border-[#F1F5F9]' : ''}`}>
              <span className="flex-1 text-[0.82rem] font-semibold text-[#0A1628]">{row.year}</span>
              <select className="w-[70px] px-1.5 py-1 bg-[#F8FAFC] border border-[#F3F4F6] rounded-md text-[0.7rem] font-semibold text-[#0A1628] outline-none text-center">
                <option>1040</option><option>1120</option><option>941</option>
              </select>
              <span className="w-[80px] text-right text-[0.82rem] font-bold text-[#E63946]">{row.amount}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t-2 border-[#E2E8F0] mt-1">
            <span className="text-[0.85rem] font-extrabold text-[#0A1628]">Total</span>
            <span className="text-base font-black text-[#E63946]">$47,250</span>
          </div>
        </div>
      </div>

      {/* Monthly Payment Slider */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Proposed Monthly Payment</div>
        <div className="bg-white rounded-[20px] px-5 py-6 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-center mb-5">
            <div className="text-[2.2rem] font-black text-[#0A1628] tracking-tight leading-none">${monthlyPayment.toLocaleString()}</div>
            <div className="text-[0.72rem] text-[#94A3B8] mt-1.5">per month</div>
          </div>
          <div className="px-1">
            <input
              type="range"
              min={minPayment}
              max={maxPayment}
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              className="w-full h-1.5 rounded-full outline-none appearance-none cursor-pointer accent-[#0A1628]"
              style={{
                background: `linear-gradient(to right, #0A1628 0%, #0A1628 ${sliderPct}%, #F1F5F9 ${sliderPct}%, #F1F5F9 100%)`,
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[0.65rem] font-semibold text-[#CBD5E1]">${minPayment}/mo</span>
              <span className="text-[0.65rem] font-semibold text-[#CBD5E1]">${maxPayment.toLocaleString()}/mo</span>
            </div>
          </div>
          <div className="mt-4 px-3.5 py-3 bg-[#EBF0FF] rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5">
              <i className="fas fa-calendar text-[11px] text-[#0A1628]" />
              <span className="text-[0.82rem] font-bold text-[#0A1628]">Payoff in {payoffMonths} months</span>
            </div>
            <div className="text-[0.7rem] text-[#64748B] mt-1">{payoffDate}</div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[0.72rem] text-[#94A3B8]">
            <i className="fas fa-lightbulb text-[10px] text-[#F5A623]" />
            Minimum suggested: $657/mo (72-month term)
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Payment Method</div>
        {methods.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setPaymentMethod(m.key)}
            className={`flex gap-3.5 p-4 bg-white border-[1.5px] rounded-[14px] mb-2 w-full text-left transition-all ${
              paymentMethod === m.key ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] hover:border-[#0A1628]'
            }`}
          >
            <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-px transition-all ${
              paymentMethod === m.key ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {paymentMethod === m.key && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[0.85rem] font-bold text-[#0A1628]">{m.label}</span>
                {m.badge && <span className="inline-flex px-2 py-0.5 bg-[#E6F9EE] rounded-full text-[0.58rem] font-bold text-[#00A651]">{m.badge}</span>}
              </div>
              <div className="text-[0.75rem] text-[#94A3B8] leading-snug">{m.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* DDIA Bank Details */}
      {paymentMethod === 'ddia' && (
        <div className="bg-white rounded-2xl p-4 border-[1.5px] border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Direct Debit Details (Lines 13a-c)</div>
          <div className="mb-2.5"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Bank Routing Number (Line 13a)</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none tracking-wider focus:border-[#0A1628]" placeholder="9-digit routing number" maxLength={9} value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} /></div>
          <div className="mb-2.5"><div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Bank Account Number (Line 13b)</div><input type="text" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none tracking-wider focus:border-[#0A1628]" placeholder="Account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} /></div>
          <div className="mb-2.5">
            <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Account Type (Line 13c)</div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setAccountType('checking')} className={`flex-1 py-2.5 text-center border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] transition-all ${accountType === 'checking' ? 'border-[#0A1628] bg-[#EBF0FF]' : 'border-[#F3F4F6] bg-white'}`}>Checking</button>
              <button type="button" onClick={() => setAccountType('savings')} className={`flex-1 py-2.5 text-center border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] transition-all ${accountType === 'savings' ? 'border-[#0A1628] bg-[#EBF0FF]' : 'border-[#F3F4F6] bg-white'}`}>Savings</button>
            </div>
          </div>
          <div className="text-[0.68rem] text-[#94A3B8] leading-relaxed px-2 py-1.5 bg-[#F8FAFC] rounded-md">
            <i className="fas fa-lock text-[8px] mr-1" />
            Your bank information is encrypted and only used for IRS direct debit authorization.
          </div>
        </div>
      )}

      {/* DDIA Requirement Note */}
      <div className="flex items-start gap-2.5 px-4 py-3.5 bg-[#FFF0F1] border-[1.5px] border-[rgba(230,57,70,0.15)] rounded-[14px]">
        <i className="fas fa-exclamation-triangle text-sm text-[#E63946] flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[0.82rem] font-bold text-[#991B1B] mb-1">DDIA Required for Your Balance</div>
          <div className="text-[0.75rem] text-[#991B1B] leading-relaxed">
            For Streamlined IA balances between $25,001 and $50,000, <strong>Direct Debit (DDIA) is mandatory</strong> per IRM 5.14.5.3. The IRS will not approve a Streamlined IA without DDIA for this balance range.
          </div>
        </div>
      </div>

      {/* Setup Fee Info */}
      <div className="flex items-start gap-2.5 px-4 py-3.5 bg-[#FFFBEB] border border-[rgba(245,166,35,0.15)] rounded-[14px]">
        <i className="fas fa-info-circle text-sm text-[#D97706] flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[0.82rem] font-bold text-[#92400E] mb-1">Setup Fee</div>
          <div className="text-[0.75rem] text-[#92400E] leading-relaxed">
            <strong>$22</strong> online DDIA &middot; <strong>$69</strong> online non-DDIA &middot; <strong>$107</strong> phone/mail DDIA &middot; <strong>$178</strong> phone/mail non-DDIA
          </div>
        </div>
      </div>

      {/* Low-Income Fee Reduction */}
      <div className="flex items-start gap-2.5 px-4 py-3.5 bg-[#E6F9EE] border border-[rgba(0,166,81,0.15)] rounded-[14px]">
        <i className="fas fa-hand-holding-dollar text-sm text-[#00A651] flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[0.82rem] font-bold text-[#065F46] mb-1">Low-Income Fee Reduction</div>
          <div className="text-[0.75rem] text-[#065F46] leading-relaxed">
            If your income is at or below 250% of the Federal Poverty Level, the setup fee is reduced to <strong>$43</strong> (or waived for online DDIA). You may also be eligible for <strong>reimbursement</strong> of the user fee upon completion.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          Continue <i className="fas fa-arrow-right ml-1.5 text-xs" />
        </button>
        <button onClick={handleGeneratePdf} disabled={generating} className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-50">
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  )
}
