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

  const [submitting, setSubmitting] = useState(false)

  // Expandable info card
  const [infoOpen, setInfoOpen] = useState(false)

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

  /* Shared select arrow SVG as a data URI */
  const selectArrow = "url(\"data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238585A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8, paddingBottom: 20 }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          Let&apos;s prepare your Offer in Compromise
        </div>
        <div style={{ fontSize: '0.82rem', color: '#8585A0', marginTop: 6, lineHeight: 1.5 }}>
          We&apos;ve pre-filled your info from onboarding. Just review and continue.
        </div>
      </div>

      {/* Section: Taxpayer Information */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Taxpayer Information</div>

        {/* Name field (pre-filled) */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Full Name</div>
          <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, padding: '12px 16px', position: 'relative' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>{name}</span>
            <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: 12 }} />
          </div>
        </div>

        {/* SSN field (masked) */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Social Security Number</div>
          <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, padding: '12px 16px', position: 'relative' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.05em' }}>{ssn}</span>
            <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: 12 }} />
          </div>
        </div>

        {/* Address field (pre-filled) */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Address</div>
          <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, padding: '12px 16px', position: 'relative' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>{address}</span>
            <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: 12 }} />
          </div>
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Phone Number(s)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="tel"
              style={{ flex: 1, padding: '12px 16px', background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', outline: 'none' }}
              placeholder="Primary phone"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
            />
            <input
              type="tel"
              style={{ flex: 1, padding: '12px 16px', background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', outline: 'none' }}
              placeholder="Alternate"
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Email Address</div>
          <input
            type="email"
            style={{ width: '100%', padding: '12px 16px', background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Section: Spouse Information (for joint offers) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Spouse Information <span style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'none', letterSpacing: '0', color: '#8585A0' }}>(joint offers only)</span>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Spouse Full Name</div>
            <input
              type="text"
              style={{ width: '100%', padding: '12px 16px', background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
              placeholder="Spouse full legal name"
              value={spouseName}
              onChange={(e) => setSpouseName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Spouse SSN</div>
              <input
                type="text"
                style={{ width: '100%', padding: '12px 16px', background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
                placeholder="***-**-****"
                value={spouseSsn}
                onChange={(e) => setSpouseSsn(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Spouse DOB</div>
              <input
                type="date"
                style={{ width: '100%', padding: '12px 16px', background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
                value={spouseDob}
                onChange={(e) => setSpouseDob(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Tax Years Included in Offer */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Tax Years Included in Offer</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          {taxPeriods.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: idx < taxPeriods.length - 1 ? '1px solid #F0F0F5' : 'none',
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>{row.year}</span>
              <select
                style={{
                  padding: '6px 28px 6px 10px',
                  background: '#FAFAFF',
                  border: '1.5px solid #E8E8F0',
                  borderRadius: 8,
                  fontFamily: 'inherit',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#1A1A2E',
                  outline: 'none',
                  appearance: 'none' as const,
                  backgroundImage: selectArrow,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                }}
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

      {/* Section: OIC Basis */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Offer Basis</div>

        {/* DATC */}
        <button
          type="button"
          onClick={() => setOicBasis('DATC')}
          style={{
            display: 'flex',
            gap: 14,
            padding: 16,
            background: oicBasis === 'DATC' ? '#EBF0FF' : 'white',
            border: oicBasis === 'DATC' ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0',
            borderRadius: 16,
            marginBottom: 8,
            width: '100%',
            textAlign: 'left' as const,
            cursor: 'pointer',
            boxShadow: oicBasis === 'DATC' ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{
            width: 22, height: 22, border: `2px solid ${oicBasis === 'DATC' ? '#1A1A2E' : '#D5D5E0'}`,
            borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 2, background: oicBasis === 'DATC' ? '#1A1A2E' : 'transparent', transition: 'all 0.3s ease',
          }}>
            {oicBasis === 'DATC' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A2E' }}>Doubt as to Collectibility (DATC)</span>
              <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.6rem', fontWeight: 700, color: '#00A651' }}>COMMON</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8585A0', lineHeight: 1.5 }}>Your assets and income are less than the full amount owed. The IRS doubts they can collect the full balance.</div>
          </div>
        </button>

        {/* ETA */}
        <button
          type="button"
          onClick={() => setOicBasis('ETA')}
          style={{
            display: 'flex',
            gap: 14,
            padding: 16,
            background: oicBasis === 'ETA' ? '#EBF0FF' : 'white',
            border: oicBasis === 'ETA' ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0',
            borderRadius: 16,
            width: '100%',
            textAlign: 'left' as const,
            cursor: 'pointer',
            boxShadow: oicBasis === 'ETA' ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{
            width: 22, height: 22, border: `2px solid ${oicBasis === 'ETA' ? '#1A1A2E' : '#D5D5E0'}`,
            borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 2, background: oicBasis === 'ETA' ? '#1A1A2E' : 'transparent', transition: 'all 0.3s ease',
          }}>
            {oicBasis === 'ETA' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>Effective Tax Administration (ETA)</div>
            <div style={{ fontSize: '0.75rem', color: '#8585A0', lineHeight: 1.5 }}>You can pay in full, but doing so would cause exceptional hardship or would be unfair due to special circumstances (e.g., disability, serious illness).</div>
          </div>
        </button>
      </div>

      {/* Section: Offer Amount */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Offer Amount</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 20, border: '1.5px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: '#B0B0C8' }}>$</span>
            <input
              type="text"
              value={offerAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '')
                if (val) setOfferAmount(parseInt(val).toLocaleString())
                else setOfferAmount('')
              }}
              placeholder="0"
              style={{
                fontSize: '2rem', fontWeight: 900, color: '#1A1A2E', letterSpacing: '-0.02em',
                background: 'transparent', border: 'none', outline: 'none', width: '100%',
                fontFamily: 'inherit', caretColor: '#1A1A2E',
              }}
            />
          </div>
          <div style={{ fontSize: '0.72rem', color: '#1A1A2E', marginTop: 6, padding: '6px 10px', background: '#EBF0FF', borderRadius: 8 }}>
            <i className="fas fa-calculator" style={{ fontSize: 10, marginRight: 3, color: '#2563EB' }} />
            <strong>Minimum offer based on your RCP: ${rcpMinimum.toLocaleString()}</strong>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 6, lineHeight: 1.5 }}>
            This amount is pulled from your Reasonable Collection Potential (RCP) analysis on the Results screen. You may offer more but cannot offer less.
          </div>
        </div>
      </div>

      {/* Section: Payment Option */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Payment Option</div>

        {/* Lump Sum (selected) */}
        <button
          type="button"
          onClick={() => setPaymentOption('lump')}
          style={{
            display: 'flex',
            gap: 14,
            padding: 18,
            background: paymentOption === 'lump' ? '#EBF0FF' : 'white',
            border: paymentOption === 'lump' ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0',
            borderRadius: 16,
            marginBottom: 10,
            width: '100%',
            textAlign: 'left' as const,
            cursor: 'pointer',
            boxShadow: paymentOption === 'lump' ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{
            width: 22, height: 22, border: `2px solid ${paymentOption === 'lump' ? '#1A1A2E' : '#D5D5E0'}`,
            borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 2, background: paymentOption === 'lump' ? '#1A1A2E' : 'transparent', transition: 'all 0.3s ease',
          }}>
            {paymentOption === 'lump' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E' }}>Lump Sum</span>
              <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.6rem', fontWeight: 700, color: '#00A651' }}>RECOMMENDED</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8585A0', lineHeight: 1.5 }}>20% upfront ($1,700), remainder within 5 months of acceptance</div>
          </div>
        </button>

        {/* Periodic Payment */}
        <button
          type="button"
          onClick={() => setPaymentOption('periodic')}
          style={{
            display: 'flex',
            gap: 14,
            padding: 18,
            background: paymentOption === 'periodic' ? '#EBF0FF' : 'white',
            border: paymentOption === 'periodic' ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0',
            borderRadius: 16,
            width: '100%',
            textAlign: 'left' as const,
            cursor: 'pointer',
            boxShadow: paymentOption === 'periodic' ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{
            width: 22, height: 22, border: `2px solid ${paymentOption === 'periodic' ? '#1A1A2E' : '#D5D5E0'}`,
            borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 2, background: paymentOption === 'periodic' ? '#1A1A2E' : 'transparent', transition: 'all 0.3s ease',
          }}>
            {paymentOption === 'periodic' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>Periodic Payment</div>
            <div style={{ fontSize: '0.78rem', color: '#8585A0', lineHeight: 1.5 }}>Monthly payments over 6-24 months during IRS review</div>
          </div>
        </button>
      </div>

      {/* Low-Income Certification */}
      <div style={{ background: '#FFFBEB', borderRadius: 16, padding: 16, border: '1px solid rgba(245,166,35,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <input
            type="checkbox"
            checked={lowIncomeCert}
            onChange={(e) => setLowIncomeCert(e.target.checked)}
            style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0, accentColor: '#1A1A2E' }}
          />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400E', marginBottom: 4 }}>Low-Income Certification</div>
            <div style={{ fontSize: '0.75rem', color: '#92400E', lineHeight: 1.5 }}>
              If your household income is at or below 250% of the Federal Poverty Level, application fees and initial payments may be waived.
            </div>
            <button
              onClick={() => router.push('/forms/form-656a')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <i className="fas fa-external-link-alt" style={{ fontSize: 9 }} />
              Complete Form 656-A (Income Certification)
            </button>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1.5px solid #E8E8F0' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Terms &amp; Conditions</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0, accentColor: '#1A1A2E' }}
          />
          <div style={{ fontSize: '0.78rem', color: '#5C5C7A', lineHeight: 1.6 }}>
            I understand that if my offer is accepted, I must remain in full compliance with all tax filing and payment obligations for <strong style={{ color: '#1A1A2E' }}>5 years</strong> from the date of acceptance. Failure to comply will default the offer and reinstate the full original balance.
          </div>
        </div>
      </div>

      {/* Required Companion Form Note */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', background: '#EFF4FF', border: '1px solid #BFDBFE', borderRadius: 14 }}>
        <i className="fas fa-file-circle-check" style={{ fontSize: 14, color: '#2563EB', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>Required Companion Form</div>
          <div style={{ fontSize: '0.75rem', color: '#5C5C7A', lineHeight: 1.5 }}>
            <strong>Form 433-A(OIC)</strong> (Collection Information Statement) must accompany this form. It will be generated from your financial data.
          </div>
          <button
            onClick={() => router.push('/forms/form-433a-oic')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <i className="fas fa-arrow-right" style={{ fontSize: 9 }} />
            Review Form 433-A(OIC)
          </button>
        </div>
      </div>

      {/* Helpful Info Card */}
      <div>
        <div
          onClick={() => setInfoOpen(!infoOpen)}
          style={{ background: '#F5F0FF', borderRadius: 16, border: '1px solid rgba(124,58,237,0.1)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease' }}
        >
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="fas fa-lightbulb" style={{ fontSize: 14, color: '#7C3AED' }} />
            </div>
            <div style={{ flex: 1, fontSize: '0.82rem', fontWeight: 600, color: '#5C5C7A' }}>How is the offer amount calculated?</div>
            <i className="fas fa-chevron-down" style={{ fontSize: 10, color: '#B0B0C8', transition: 'transform 0.3s ease', transform: infoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {infoOpen && (
            <div style={{ padding: '0 16px 14px' }}>
              <div style={{ fontSize: '0.78rem', color: '#8585A0', lineHeight: 1.6 }}>
                The IRS uses a formula based on your <strong style={{ color: '#5C5C7A' }}>Reasonable Collection Potential (RCP)</strong>: your assets&apos; equity plus future disposable income. Our AI analyzed your financial data to calculate the lowest defensible offer amount.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
        <button
          onClick={handleSubmit}
          disabled={submitting || !termsAccepted}
          style={{
            padding: 16,
            background: '#00A651',
            borderRadius: 9999,
            textAlign: 'center',
            color: 'white',
            fontSize: '0.88rem',
            fontWeight: 700,
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            border: 'none',
            cursor: submitting || !termsAccepted ? 'not-allowed' : 'pointer',
            opacity: submitting || !termsAccepted ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Continue <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
        </button>
        <button
          style={{
            padding: 12,
            textAlign: 'center',
            color: '#8585A0',
            fontSize: '0.82rem',
            fontWeight: 600,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <i className="fas fa-bookmark" style={{ marginRight: 6, fontSize: 11 }} /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
