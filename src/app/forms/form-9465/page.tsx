'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form9465Page() {
  const { answers } = useWizard()

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

  const payoffMonths = monthlyPayment > 0 ? Math.ceil(totalOwed / monthlyPayment) : 0
  const sliderPct = ((monthlyPayment - minPayment) / (maxPayment - minPayment)) * 100

  const payoffDate = (() => {
    const d = new Date(2026, 2)
    d.setMonth(d.getMonth() + payoffMonths)
    return `~${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} ${d.getFullYear()}`
  })()

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6',
    borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628',
    outline: 'none', boxSizing: 'border-box',
  }

  const selectArrow = "url(\"data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238585A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"

  const methods = [
    { key: 'ddia' as const, label: 'Direct Debit', badge: 'RECOMMENDED', desc: 'Automatic withdrawal, lower setup fee' },
    { key: 'check' as const, label: 'Check / Money Order', badge: null, desc: 'Mail monthly payment to IRS' },
    { key: 'payroll' as const, label: 'Payroll Deduction', badge: null, desc: 'Deducted from your paycheck' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8, paddingBottom: 20 }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Set up your Installment Agreement</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '5px 12px', background: '#EBF0FF', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, color: '#0A1628' }}>
          <i className="fas fa-shield-check" style={{ fontSize: 10 }} /> Streamlined IA (under $50,000)
        </div>
      </div>

      {/* Pre-filled Taxpayer Info */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Taxpayer Info (Lines 1a-4)</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Name</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0A1628' }}>Jane M. Doe</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>SSN</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0A1628', letterSpacing: '0.03em' }}>***-**-4589</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Address</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0A1628', textAlign: 'right', maxWidth: '55%' }}>1234 Elm St, Austin, TX</span>
          </div>
        </div>
      </div>

      {/* Spouse Info (Lines 1b-2b) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Spouse Info (Lines 1b-2b) <span style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'none', letterSpacing: '0', color: '#94A3B8' }}>if filing jointly</span>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Spouse Name (Line 1b)</div>
            <input type="text" style={fieldInputStyle} placeholder="Spouse full legal name" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Spouse SSN (Line 2b)</div>
            <input type="text" style={fieldInputStyle} placeholder="***-**-****" value={spouseSsn} onChange={(e) => setSpouseSsn(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Employer Info - Taxpayer (Line 5) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Employer &mdash; Taxpayer (Line 5)</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Employer Name</div>
            <input type="text" style={fieldInputStyle} placeholder="Employer name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Employer Address</div>
            <input type="text" style={fieldInputStyle} placeholder="Street, City, State, ZIP" value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Employer Info - Spouse (Line 6) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Employer &mdash; Spouse (Line 6) <span style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'none', letterSpacing: '0', color: '#94A3B8' }}>if filing jointly</span>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Employer Name</div>
            <input type="text" style={fieldInputStyle} placeholder="Spouse employer name" value={spouseEmployerName} onChange={(e) => setSpouseEmployerName(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Employer Address</div>
            <input type="text" style={fieldInputStyle} placeholder="Street, City, State, ZIP" value={spouseEmployerAddress} onChange={(e) => setSpouseEmployerAddress(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Total Amount Owed */}
      <div style={{ background: '#FFF0F1', borderRadius: 16, padding: 18, border: '1px solid rgba(230,57,70,0.1)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Total Amount Owed</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#E63946', letterSpacing: '-0.02em', lineHeight: 1 }}>${totalOwed.toLocaleString()}</div>
      </div>

      {/* Per-Year Tax Amount Breakdown (Lines 7-9) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Tax Owed by Period (Lines 7-9)</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          {/* Header */}
          <div style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #E2E8F0', marginBottom: 4 }}>
            <span style={{ flex: 1, fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Year</span>
            <span style={{ width: 70, fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>Form</span>
            <span style={{ width: 80, fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Amount</span>
          </div>
          {[{ year: '2023', amount: '$18,500' }, { year: '2022', amount: '$16,200' }, { year: '2021', amount: '$12,550' }].map((row, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none' }}>
              <span style={{ flex: 1, fontSize: '0.82rem', fontWeight: 600, color: '#0A1628' }}>{row.year}</span>
              <select style={{
                width: 70, padding: '4px 6px', background: '#F8FAFC', border: '1px solid #F3F4F6',
                borderRadius: 6, fontFamily: 'inherit', fontSize: '0.7rem', fontWeight: 600, color: '#0A1628',
                outline: 'none', textAlign: 'center',
              }}>
                <option>1040</option><option>1120</option><option>941</option>
              </select>
              <span style={{ width: 80, fontSize: '0.82rem', fontWeight: 700, color: '#E63946', textAlign: 'right' }}>{row.amount}</span>
            </div>
          ))}
          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 4px', borderTop: '2px solid #E2E8F0', marginTop: 4 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0A1628' }}>Total</span>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#E63946' }}>$47,250</span>
          </div>
        </div>
      </div>

      {/* Proposed Monthly Payment + Slider */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Proposed Monthly Payment</div>
        <div style={{ background: 'white', borderRadius: 20, padding: '24px 20px', border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          {/* Amount display */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0A1628', letterSpacing: '-0.02em', lineHeight: 1 }}>${monthlyPayment.toLocaleString()}</div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 6 }}>per month</div>
          </div>

          {/* Slider */}
          <div style={{ padding: '0 4px' }}>
            <input
              type="range"
              min={minPayment}
              max={maxPayment}
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              style={{
                WebkitAppearance: 'none',
                appearance: 'none' as const,
                width: '100%',
                height: 6,
                borderRadius: 9999,
                background: `linear-gradient(to right, #0A1628 0%, #0A1628 ${sliderPct}%, #F1F5F9 ${sliderPct}%, #F1F5F9 100%)`,
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#CBD5E1' }}>${minPayment}/mo</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#CBD5E1' }}>${maxPayment.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Dynamic payoff info */}
          <div style={{ marginTop: 16, padding: '12px 14px', background: '#EBF0FF', borderRadius: 12, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <i className="fas fa-calendar" style={{ fontSize: 11, color: '#0A1628' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A1628' }}>Payoff in {payoffMonths} months</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: 4 }}>{payoffDate}</div>
          </div>

          {/* Minimum suggestion */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#94A3B8' }}>
            <i className="fas fa-lightbulb" style={{ fontSize: 10, color: '#F5A623' }} />
            Minimum suggested: $657/mo (72-month term)
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Payment Method</div>

        {methods.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setPaymentMethod(m.key)}
            style={{
              display: 'flex', gap: 14, padding: 16, background: paymentMethod === m.key ? '#EBF0FF' : 'white',
              border: paymentMethod === m.key ? '1.5px solid #0A1628' : '1.5px solid #F3F4F6',
              borderRadius: 14, marginBottom: 8, width: '100%', textAlign: 'left' as const, cursor: 'pointer',
              boxShadow: paymentMethod === m.key ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            <div style={{
              width: 22, height: 22, border: `2px solid ${paymentMethod === m.key ? '#0A1628' : '#D5D5E0'}`,
              borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 1, background: paymentMethod === m.key ? '#0A1628' : 'transparent', transition: 'all 0.3s ease',
            }}>
              {paymentMethod === m.key && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628' }}>{m.label}</span>
                {m.badge && <span style={{ display: 'inline-flex', padding: '2px 7px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#00A651' }}>{m.badge}</span>}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.4, marginTop: 3 }}>{m.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* DDIA Bank Details (Lines 13a-c) */}
      {paymentMethod === 'ddia' && (
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1.5px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Direct Debit Details (Lines 13a-c)</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Bank Routing Number (Line 13a)</div>
            <input type="text" style={{ ...fieldInputStyle, letterSpacing: '0.05em' }} placeholder="9-digit routing number" maxLength={9} value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Bank Account Number (Line 13b)</div>
            <input type="text" style={{ ...fieldInputStyle, letterSpacing: '0.05em' }} placeholder="Account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Account Type (Line 13c)</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => setAccountType('checking')} style={{
                flex: 1, padding: 10, textAlign: 'center', background: accountType === 'checking' ? '#EBF0FF' : 'white',
                border: accountType === 'checking' ? '1.5px solid #0A1628' : '1.5px solid #F3F4F6',
                borderRadius: 10, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628',
              }}>Checking</button>
              <button type="button" onClick={() => setAccountType('savings')} style={{
                flex: 1, padding: 10, textAlign: 'center', background: accountType === 'savings' ? '#EBF0FF' : 'white',
                border: accountType === 'savings' ? '1.5px solid #0A1628' : '1.5px solid #F3F4F6',
                borderRadius: 10, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628',
              }}>Savings</button>
            </div>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#94A3B8', lineHeight: 1.5, padding: '6px 8px', background: '#F8FAFC', borderRadius: 6 }}>
            <i className="fas fa-lock" style={{ fontSize: 8, marginRight: 3 }} />
            Your bank information is encrypted and only used for IRS direct debit authorization.
          </div>
        </div>
      )}

      {/* DDIA Requirement Note */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', background: '#FFF0F1', border: '1.5px solid rgba(230,57,70,0.15)', borderRadius: 14 }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: 14, color: '#E63946', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>DDIA Required for Your Balance</div>
          <div style={{ fontSize: '0.75rem', color: '#991B1B', lineHeight: 1.5 }}>
            For Streamlined IA balances between $25,001 and $50,000, <strong>Direct Debit (DDIA) is mandatory</strong> per IRM 5.14.5.3. The IRS will not approve a Streamlined IA without DDIA for this balance range.
          </div>
        </div>
      </div>

      {/* Setup Fee Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', background: '#FFFBEB', border: '1px solid rgba(245,166,35,0.15)', borderRadius: 14 }}>
        <i className="fas fa-info-circle" style={{ fontSize: 14, color: '#D97706', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400E', marginBottom: 4 }}>Setup Fee</div>
          <div style={{ fontSize: '0.75rem', color: '#92400E', lineHeight: 1.5 }}>
            <strong>$22</strong> online DDIA &middot; <strong>$69</strong> online non-DDIA &middot; <strong>$107</strong> phone/mail DDIA &middot; <strong>$178</strong> phone/mail non-DDIA
          </div>
        </div>
      </div>

      {/* Low-Income Fee Reduction */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', background: '#E6F9EE', border: '1px solid rgba(0,166,81,0.15)', borderRadius: 14 }}>
        <i className="fas fa-hand-holding-dollar" style={{ fontSize: 14, color: '#00A651', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065F46', marginBottom: 4 }}>Low-Income Fee Reduction</div>
          <div style={{ fontSize: '0.75rem', color: '#065F46', lineHeight: 1.5 }}>
            If your income is at or below 250% of the Federal Poverty Level, the setup fee is reduced to <strong>$43</strong> (or waived for online DDIA). You may also be eligible for <strong>reimbursement</strong> of the user fee upon completion.
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
        <button
          style={{
            padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white',
            fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Continue <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
        </button>
      </div>
    </div>
  )
}
