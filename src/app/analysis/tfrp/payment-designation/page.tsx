'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUARTERS = [
  'Q4 2025 (Oct-Dec)',
  'Q3 2025 (Jul-Sep)',
  'Q2 2025 (Apr-Jun)',
  'Q1 2025 (Jan-Mar)',
  'Q4 2024 (Oct-Dec)',
  'Q3 2024 (Jul-Sep)',
]

const DESIGNATION_OPTIONS = [
  { value: 'trust', label: 'Trust Fund', description: 'Reduces personal TFRP liability first' },
  { value: 'non-trust', label: 'Non-Trust Fund', description: "Employer's share (no personal liability)" },
  { value: 'specific', label: 'Specific Period', description: 'Apply to a specific tax quarter' },
]

export default function PaymentDesignationPage() {
  const router = useRouter()
  const [paymentAmount, setPaymentAmount] = useState('$5,000')
  const [designation, setDesignation] = useState('trust')
  const [quarter, setQuarter] = useState(QUARTERS[0])

  const designationLabel = DESIGNATION_OPTIONS.find((o) => o.value === designation)?.label ?? 'trust fund'

  const letterText = `Date: March 17, 2026

Internal Revenue Service
[Processing Center Address]

Re: Payment Designation
EIN: XX-XXXXXXX
Tax Form: 941
Tax Period: ${quarter} (10/01/25 - 12/31/25)

Dear Sir/Madam,

Enclosed is a payment of ${paymentAmount}.00. I am exercising my right under Rev. Rul. 79-284 to designate this voluntary payment as follows:

APPLY ENTIRE PAYMENT TO:
${designationLabel === 'Trust Fund' ? 'Trust Fund Taxes (employee withholding)' : designationLabel === 'Non-Trust Fund' ? 'Non-Trust Fund Taxes (employer share)' : `Specific Period: ${quarter}`}
for the quarter ending 12/31/2025.

Please do not apply this payment to any other period or tax type.

Sincerely,
[Taxpayer Name]
[Business Name]`

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F0F0F5]">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAFAFF] border border-[#F0F0F5]">
            <i className="fa-solid fa-arrow-left text-sm text-[#5C5C7A]" />
          </button>
          <span className="text-[15px] font-extrabold text-[#1A1A2E]">Payment Designation</span>
          <div className="w-9" />
        </div>

        <div className="flex flex-col gap-3.5 px-5 py-5 pb-8">
          {/* Heading */}
          <div>
            <div className="text-xl font-extrabold text-[#1A1A2E] tracking-tight leading-snug">Payment Designation</div>
            <div className="text-[12px] text-[#8585A0] mt-1 leading-relaxed">Control how the IRS applies your business tax payment</div>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#EBF0FF] border border-[rgba(37,99,235,0.1)] p-3.5">
            <i className="fa-solid fa-info-circle text-[13px] text-[#2563EB] shrink-0 mt-0.5" />
            <div className="text-xs text-[#1E40AF] leading-relaxed">
              When paying business tax debt, you can <strong>DESIGNATE</strong> how the IRS applies your payment. This is critical for reducing personal liability.
            </div>
          </div>

          {/* Why it matters */}
          <div className="rounded-2xl bg-white border border-[#E8E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-[18px] border-l-4 border-l-[#E63946]">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-triangle-exclamation text-[13px] text-[#E63946]" />
              <span className="text-[13px] font-bold text-[#1A1A2E]">Why This Matters</span>
            </div>
            <div className="text-[12px] text-[#5C5C7A] leading-relaxed">
              Payroll taxes have two parts: <strong className="text-[#1A1A2E]">trust fund</strong> (withheld from employees) and <strong className="text-[#1A1A2E]">non-trust fund</strong> (employer&apos;s share). Trust fund portions carry <strong className="text-[#E63946]">personal liability</strong> via the TFRP. Paying trust fund first reduces your personal exposure.
            </div>
          </div>

          {/* Designation Form */}
          <div className="rounded-2xl bg-white border border-[#E8E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-[18px]">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EFF4FF]">
                <i className="fa-solid fa-pen-to-square text-xs text-[#2563EB]" />
              </div>
              <div className="text-[13px] font-bold text-[#1A1A2E]">Designation Form</div>
            </div>

            <div className="mb-2.5">
              <div className="text-[11px] font-semibold text-[#5C5C7A] mb-1.5">Payment Amount</div>
              <input type="text" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="$0"
                className="w-full rounded-[10px] bg-[#FAFAFF] border-[1.5px] border-[#F0F0F5] py-2.5 px-3 text-[13px] font-semibold text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white" />
            </div>

            <div className="mb-2.5">
              <div className="text-[11px] font-semibold text-[#5C5C7A] mb-1.5">Designate To</div>
              <div className="flex flex-col gap-2">
                {DESIGNATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDesignation(opt.value)}
                    className={`flex items-start gap-2.5 rounded-[14px] p-3.5 text-left transition-all ${
                      designation === opt.value
                        ? 'bg-[#EBF0FF] border-[1.5px] border-[#1A1A2E] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]'
                        : 'bg-white border-[1.5px] border-[#E8E8F0] hover:border-[#1A1A2E] hover:translate-y-[-2px]'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      designation === opt.value ? 'border-[#1A1A2E] bg-[#1A1A2E]' : 'border-[#D5D5E0]'
                    }`}>
                      {designation === opt.value && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1A1A2E]">{opt.label}</div>
                      <div className="text-[11px] text-[#8585A0]">{opt.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2.5">
              <div className="text-[11px] font-semibold text-[#5C5C7A] mb-1.5">Tax Period (Quarter)</div>
              <select value={quarter} onChange={(e) => setQuarter(e.target.value)}
                className="w-full rounded-[10px] bg-[#FAFAFF] border-[1.5px] border-[#F0F0F5] py-2.5 px-3 text-[13px] font-semibold text-[#1A1A2E] outline-none focus:border-[#1A1A2E] appearance-none">
                {QUARTERS.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>

            <div className="rounded-[10px] bg-[#E6F9EE] p-2.5">
              <div className="text-xs font-semibold text-[#065F46] leading-relaxed">
                <i className="fa-solid fa-check-circle text-[10px] mr-1" />
                &quot;I want to designate this {paymentAmount} payment to <strong>trust fund</strong> for <strong>{quarter}</strong>&quot;
              </div>
            </div>
          </div>

          {/* Letter Template */}
          <div className="rounded-2xl bg-white border border-[#E8E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-[18px]">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#F5F0FF]">
                  <i className="fa-solid fa-file-lines text-xs text-[#7C3AED]" />
                </div>
                <div className="text-[13px] font-bold text-[#1A1A2E]">Designation Letter</div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(letterText)}
                className="flex items-center gap-1.5 rounded-lg bg-[#EFF4FF] px-2.5 py-1 text-[11px] font-semibold text-[#2563EB]"
              >
                <i className="fa-solid fa-copy text-[10px]" /> Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded-xl bg-[#FAFAFF] border-[1.5px] border-[#F0F0F5] p-3.5 font-mono text-[11px] text-[#1A1A2E] leading-[1.7]">
              {letterText}
            </pre>
          </div>

          {/* Reminder */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#FFFBEB] border border-[rgba(245,158,11,0.15)] p-3.5">
            <i className="fa-solid fa-bell text-[13px] text-[#D97706] shrink-0 mt-0.5" />
            <div className="text-xs text-[#92400E] leading-relaxed">
              <strong className="text-[#78350F]">Send with every payment.</strong> Include this letter each time you make a voluntary payment. Without it, the IRS applies payment to the oldest period first.
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#FEF2F2] border border-[rgba(239,68,68,0.1)] p-3.5">
            <i className="fa-solid fa-exclamation-triangle text-[13px] text-[#E63946] shrink-0 mt-0.5" />
            <div className="text-xs text-[#991B1B] leading-relaxed">
              <strong>If you don&apos;t designate,</strong> the IRS applies payment to the <strong>oldest period first</strong>, which may not reduce your trust fund (personal) liability optimally.
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00A651] py-4 text-sm font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <i className="fa-solid fa-download text-xs" /> Download Letter
            </button>
            <button
              onClick={() => router.back()}
              className="flex w-full items-center justify-center gap-2 py-3 text-[13px] font-semibold text-[#8585A0]"
            >
              <i className="fa-solid fa-arrow-left text-[11px]" /> Back to TFRP Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
