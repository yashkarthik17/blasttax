'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Tax Period Row                                                      */
/* ------------------------------------------------------------------ */

interface TaxPeriodRow {
  year: string
  form1040: boolean
  form941: boolean
  form940: boolean
  formOther: string
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form656Page() {
  const router = useRouter()
  const { answers, caseId } = useWizard()

  // Section 1: Taxpayer Info
  const [name] = useState(answers.taxpayerName ?? 'Jane M. Doe')
  const [ssn] = useState(answers.ssn ?? '***-**-4589')
  const [address] = useState(answers.address ?? '1234 Elm Street, Austin, TX 78701')
  const [primaryPhone, setPrimaryPhone] = useState(answers.phone ?? '(512) 555-0198')
  const [altPhone, setAltPhone] = useState('')
  const [email, setEmail] = useState(answers.email ?? 'jane.doe@email.com')

  // Joint filing
  const [spouseName, setSpouseName] = useState(answers.spouseName ?? '')
  const [spouseSsn, setSpouseSsn] = useState(answers.spouseSsn ?? '')
  const [spouseDob, setSpouseDob] = useState(answers.spouseDob ?? '')

  // Section 2: Tax Periods
  const [taxPeriods, setTaxPeriods] = useState<TaxPeriodRow[]>(() => {
    if (answers.taxDebts && Array.isArray(answers.taxDebts)) {
      return answers.taxDebts.map((d: { taxYear: number; taxForm: string }) => ({
        year: String(d.taxYear),
        form1040: d.taxForm === '1040',
        form941: d.taxForm === '941',
        form940: d.taxForm === '940',
        formOther: !['1040', '941', '940'].includes(d.taxForm) ? d.taxForm : '',
      }))
    }
    return [
      { year: '2023', form1040: true, form941: false, form940: false, formOther: '' },
      { year: '2022', form1040: true, form941: false, form940: false, formOther: '' },
      { year: '2021', form1040: true, form941: false, form940: false, formOther: '' },
    ]
  })

  // Section 3: OIC Basis
  const [oicBasis, setOicBasis] = useState<'DATC' | 'ETA'>('DATC')

  // Section 4: Payment
  const [paymentOption, setPaymentOption] = useState<'lump' | 'periodic'>('lump')
  const rcpMinimum = answers.rcpLumpSum ?? answers.minimumOffer ?? 33668
  const rcpPeriodicMin = answers.rcpPeriodic ?? 0
  const [offerAmount, setOfferAmount] = useState(String(rcpMinimum))

  // Section 5: Low Income
  const [lowIncomeCert, setLowIncomeCert] = useState(answers.isLowIncome ?? false)

  // Section 6: Terms acknowledged
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Keep offer amount at or above minimum
  const minimumForOption = paymentOption === 'lump' ? rcpMinimum : rcpPeriodicMin
  useEffect(() => {
    if (Number(offerAmount) < minimumForOption && minimumForOption > 0) {
      setOfferAmount(String(minimumForOption))
    }
  }, [paymentOption, minimumForOption, offerAmount])

  function updateTaxPeriodForm(index: number, value: string) {
    setTaxPeriods((prev) =>
      prev.map((row, i) =>
        i === index
          ? { ...row, form1040: value === '1040', form941: value === '941', form940: value === '940', formOther: '' }
          : row
      )
    )
  }

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-656' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-656-OIC.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    router.push('/forms/submission')
    setSubmitting(false)
  }

  const selectedForm = (row: TaxPeriodRow) => {
    if (row.form1040) return '1040'
    if (row.form941) return '941'
    if (row.form940) return '940'
    return '1040'
  }

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Heading */}
      <div>
        <div className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">
          Let&apos;s prepare your Offer in Compromise
        </div>
        <div className="text-[0.82rem] text-[#94A3B8] mt-1.5 leading-relaxed">
          We&apos;ve pre-filled your info from onboarding. Just review and continue.
        </div>
      </div>

      {/* Section: Taxpayer Information */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Taxpayer Information</div>

        {/* Name (pre-filled) */}
        <div className="mb-3">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Full Name</div>
          <div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3">
            <span className="text-[0.85rem] font-semibold text-[#0A1628]">{name}</span>
            <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" />
          </div>
        </div>

        {/* SSN */}
        <div className="mb-3">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Social Security Number</div>
          <div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3">
            <span className="text-[0.85rem] font-semibold text-[#0A1628] tracking-wider">{ssn}</span>
            <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" />
          </div>
        </div>

        {/* Address */}
        <div className="mb-3">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Address</div>
          <div className="relative bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl px-4 py-3">
            <span className="text-[0.85rem] font-semibold text-[#0A1628]">{address}</span>
            <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[#CBD5E1] text-xs" />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-3">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Phone Number(s)</div>
          <div className="flex gap-2">
            <input
              type="tel"
              className="flex-1 px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl font-semibold text-[0.85rem] text-[#0A1628] outline-none focus:border-[#0A1628] transition-colors"
              placeholder="Primary phone"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
            />
            <input
              type="tel"
              className="flex-1 px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl font-semibold text-[0.85rem] text-[#0A1628] outline-none focus:border-[#0A1628] transition-colors"
              placeholder="Alternate"
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Email Address</div>
          <input
            type="email"
            className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl font-semibold text-[0.85rem] text-[#0A1628] outline-none focus:border-[#0A1628] transition-colors"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Section: Spouse Information */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">
          Spouse Information <span className="text-[0.65rem] font-medium normal-case tracking-normal text-[#94A3B8]">(joint offers only)</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="mb-3">
            <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Spouse Full Name</div>
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl font-semibold text-[0.85rem] text-[#0A1628] outline-none focus:border-[#0A1628] transition-colors"
              placeholder="Spouse full legal name"
              value={spouseName}
              onChange={(e) => setSpouseName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Spouse SSN</div>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl font-semibold text-[0.85rem] text-[#0A1628] outline-none focus:border-[#0A1628] transition-colors"
                placeholder="***-**-****"
                value={spouseSsn}
                onChange={(e) => setSpouseSsn(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Spouse DOB</div>
              <input
                type="date"
                className="w-full px-4 py-3 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-xl font-semibold text-[0.85rem] text-[#0A1628] outline-none focus:border-[#0A1628] transition-colors"
                value={spouseDob}
                onChange={(e) => setSpouseDob(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Tax Years */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Tax Years Included in Offer</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {taxPeriods.map((row, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between py-2.5 ${idx < taxPeriods.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}
            >
              <span className="text-[0.82rem] font-semibold text-[#0A1628]">{row.year}</span>
              <select
                className="px-2.5 py-1.5 bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-lg font-semibold text-[0.75rem] text-[#0A1628] outline-none"
                value={selectedForm(row)}
                onChange={(e) => updateTaxPeriodForm(idx, e.target.value)}
              >
                <option value="1040">1040</option>
                <option value="1120">1120</option>
                <option value="941">941</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Offer Basis */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Offer Basis</div>

        {/* DATC */}
        <button
          type="button"
          onClick={() => setOicBasis('DATC')}
          className={`flex gap-3.5 p-4 bg-white border-[1.5px] rounded-2xl mb-2 w-full text-left transition-all ${
            oicBasis === 'DATC' ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] hover:border-[#0A1628]'
          }`}
        >
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
            oicBasis === 'DATC' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
          }`}>
            {oicBasis === 'DATC' && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[0.85rem] font-bold text-[#0A1628]">Doubt as to Collectibility (DATC)</span>
              <span className="inline-flex px-2 py-0.5 bg-[#E6F9EE] rounded-full text-[0.6rem] font-bold text-[#00A651]">COMMON</span>
            </div>
            <div className="text-[0.75rem] text-[#94A3B8] leading-relaxed">Your assets and income are less than the full amount owed. The IRS doubts they can collect the full balance.</div>
          </div>
        </button>

        {/* ETA */}
        <button
          type="button"
          onClick={() => setOicBasis('ETA')}
          className={`flex gap-3.5 p-4 bg-white border-[1.5px] rounded-2xl w-full text-left transition-all ${
            oicBasis === 'ETA' ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] hover:border-[#0A1628]'
          }`}
        >
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
            oicBasis === 'ETA' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
          }`}>
            {oicBasis === 'ETA' && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <div className="text-[0.85rem] font-bold text-[#0A1628] mb-1">Effective Tax Administration (ETA)</div>
            <div className="text-[0.75rem] text-[#94A3B8] leading-relaxed">You can pay in full, but doing so would cause exceptional hardship or would be unfair due to special circumstances (e.g., disability, serious illness).</div>
          </div>
        </button>
      </div>

      {/* Section: Offer Amount */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Offer Amount</div>
        <div className="bg-white rounded-2xl p-5 border-[1.5px] border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-1">
            <span className="text-[2rem] font-black text-[#CBD5E1]">$</span>
            <input
              className="text-[2rem] font-black text-[#0A1628] tracking-tight bg-transparent border-none outline-none w-full caret-[#0A1628]"
              type="text"
              value={offerAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '')
                if (val) setOfferAmount(parseInt(val).toLocaleString())
                else setOfferAmount('')
              }}
              placeholder="0"
            />
          </div>
          <div className="text-[0.72rem] text-[#0A1628] mt-1.5 px-2.5 py-1.5 bg-[#EBF0FF] rounded-lg">
            <i className="fas fa-calculator text-[10px] mr-1 text-[#2563EB]" />
            <strong>Minimum offer based on your RCP: ${rcpMinimum.toLocaleString()}</strong>
          </div>
          <div className="text-[0.68rem] text-[#94A3B8] mt-1.5 leading-relaxed">
            This amount is pulled from your Reasonable Collection Potential (RCP) analysis on the Results screen. You may offer more but cannot offer less.
          </div>
        </div>
      </div>

      {/* Section: Payment Option */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Payment Option</div>

        {/* Lump Sum */}
        <button
          type="button"
          onClick={() => setPaymentOption('lump')}
          className={`flex gap-3.5 p-[18px] bg-white border-[1.5px] rounded-2xl mb-2.5 w-full text-left transition-all ${
            paymentOption === 'lump' ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] hover:border-[#0A1628]'
          }`}
        >
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
            paymentOption === 'lump' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
          }`}>
            {paymentOption === 'lump' && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[0.88rem] font-bold text-[#0A1628]">Lump Sum</span>
              <span className="inline-flex px-2 py-0.5 bg-[#E6F9EE] rounded-full text-[0.6rem] font-bold text-[#00A651]">RECOMMENDED</span>
            </div>
            <div className="text-[0.78rem] text-[#94A3B8] leading-relaxed">20% upfront ($1,700), remainder within 5 months of acceptance</div>
          </div>
        </button>

        {/* Periodic */}
        <button
          type="button"
          onClick={() => setPaymentOption('periodic')}
          className={`flex gap-3.5 p-[18px] bg-white border-[1.5px] rounded-2xl w-full text-left transition-all ${
            paymentOption === 'periodic' ? 'border-[#0A1628] bg-[#EBF0FF] shadow-[0_0_0_3px_rgba(0,61,165,0.1)]' : 'border-[#F3F4F6] hover:border-[#0A1628]'
          }`}
        >
          <div className={`w-[22px] h-[22px] rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
            paymentOption === 'periodic' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
          }`}>
            {paymentOption === 'periodic' && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <div className="text-[0.88rem] font-bold text-[#0A1628] mb-1">Periodic Payment</div>
            <div className="text-[0.78rem] text-[#94A3B8] leading-relaxed">Monthly payments over 6-24 months during IRS review</div>
          </div>
        </button>
      </div>

      {/* Low-Income Certification */}
      <div className="bg-[#FFFBEB] rounded-2xl p-4 border border-[rgba(245,166,35,0.15)]">
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={lowIncomeCert}
            onChange={(e) => setLowIncomeCert(e.target.checked)}
            className="w-5 h-5 mt-0.5 flex-shrink-0 accent-[#0A1628]"
          />
          <div>
            <div className="text-[0.82rem] font-bold text-[#92400E] mb-1">Low-Income Certification</div>
            <div className="text-[0.75rem] text-[#92400E] leading-relaxed">
              If your household income is at or below 250% of the Federal Poverty Level, application fees and initial payments may be waived.
            </div>
            <button
              onClick={() => router.push('/forms/form-656a')}
              className="inline-flex items-center gap-1 mt-2 text-[0.72rem] font-bold text-[#2563EB]"
            >
              <i className="fas fa-external-link-alt text-[9px]" />
              Complete Form 656-A (Income Certification)
            </button>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-white rounded-2xl p-4 border-[1.5px] border-[#F3F4F6]">
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Terms &amp; Conditions</div>
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-5 h-5 mt-0.5 flex-shrink-0 accent-[#0A1628]"
          />
          <div className="text-[0.78rem] text-[#64748B] leading-relaxed">
            I understand that if my offer is accepted, I must remain in full compliance with all tax filing and payment obligations for <strong className="text-[#0A1628]">5 years</strong> from the date of acceptance. Failure to comply will default the offer and reinstate the full original balance.
          </div>
        </div>
      </div>

      {/* Required Companion Form Note */}
      <div className="flex items-start gap-2.5 px-4 py-3.5 bg-[#EFF4FF] border border-[#BFDBFE] rounded-[14px]">
        <i className="fas fa-file-circle-check text-sm text-[#2563EB] flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[0.82rem] font-bold text-[#0A1628] mb-1">Required Companion Form</div>
          <div className="text-[0.75rem] text-[#64748B] leading-relaxed">
            <strong>Form 433-A(OIC)</strong> (Collection Information Statement) must accompany this form. It will be generated from your financial data.
          </div>
          <button
            onClick={() => router.push('/forms/form-433a-oic')}
            className="inline-flex items-center gap-1 mt-1.5 text-[0.72rem] font-bold text-[#2563EB]"
          >
            <i className="fas fa-arrow-right text-[9px]" />
            Review Form 433-A(OIC)
          </button>
        </div>
      </div>

      {/* Helpful Info Card */}
      <details className="bg-[#F5F0FF] rounded-2xl border border-[rgba(124,58,237,0.1)] overflow-hidden group">
        <summary className="px-4 py-3.5 flex items-center gap-2.5 cursor-pointer list-none">
          <div className="w-8 h-8 rounded-[10px] bg-[rgba(124,58,237,0.1)] flex items-center justify-center flex-shrink-0">
            <i className="fas fa-lightbulb text-sm text-[#7C3AED]" />
          </div>
          <div className="flex-1 text-[0.82rem] font-semibold text-[#64748B]">How is the offer amount calculated?</div>
          <i className="fas fa-chevron-down text-[10px] text-[#CBD5E1] transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-3.5">
          <div className="text-[0.78rem] text-[#94A3B8] leading-relaxed">
            The IRS uses a formula based on your <strong className="text-[#64748B]">Reasonable Collection Potential (RCP)</strong>: your assets&apos; equity plus future disposable income. Our AI analyzed your financial data to calculate the lowest defensible offer amount.
          </div>
        </div>
      </details>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button
          onClick={handleSubmit}
          disabled={submitting || !termsAccepted}
          className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
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
