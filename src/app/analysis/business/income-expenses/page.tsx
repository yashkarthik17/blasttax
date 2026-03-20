'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function num(s: string): number {
  const n = parseFloat(String(s).replace(/[^0-9.-]/g, ''))
  return isNaN(n) ? 0 : n
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BusinessIncomeExpensesPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()

  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly')

  // Income fields
  const [grossRevenue, setGrossRevenue] = useState<string>(answers.bizGrossRevenue ?? '$45,000')
  const [cogs, setCogs] = useState<string>(answers.bizCogs ?? '$12,000')

  // Expense fields
  const [wages, setWages] = useState<string>(answers.bizWages ?? '$18,000')
  const [rent, setRent] = useState<string>(answers.bizRent ?? '$3,500')
  const [supplies, setSupplies] = useState<string>(answers.bizSupplies ?? '$1,200')
  const [utilities, setUtilities] = useState<string>(answers.bizUtilities ?? '$800')
  const [insurance, setInsurance] = useState<string>(answers.bizInsurance ?? '$1,500')
  const [taxes, setTaxes] = useState<string>(answers.bizTaxes ?? '$2,200')
  const [otherExpenses, setOtherExpenses] = useState<string>(answers.bizOtherExpenses ?? '$1,800')

  const grossProfit = useMemo(() => num(grossRevenue) - num(cogs), [grossRevenue, cogs])
  const totalExpenses = useMemo(() =>
    num(wages) + num(rent) + num(supplies) + num(utilities) + num(insurance) + num(taxes) + num(otherExpenses),
    [wages, rent, supplies, utilities, insurance, taxes, otherExpenses]
  )
  const netIncome = grossProfit - totalExpenses

  // Shared input styling matching HTML prototype
  const fieldInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: '#F8FAFC',
    border: '1.5px solid #F1F5F9',
    borderRadius: '10px',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    color: '#0A1628',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box' as const,
  }

  const fieldLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    marginBottom: '5px',
  }

  function handleContinue() {
    setAnswers({
      bizGrossRevenue: grossRevenue,
      bizCogs: cogs,
      bizWages: wages,
      bizRent: rent,
      bizSupplies: supplies,
      bizUtilities: utilities,
      bizInsurance: insurance,
      bizTaxes: taxes,
      bizOtherExpenses: otherExpenses,
      bizGrossProfit: grossProfit,
      bizTotalExpenses: totalExpenses,
      bizNetIncome: netIncome,
    })
    router.push('/analysis/business/rcp')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 20px 32px' }}>

        {/* Progress Bar */}
        <div style={{ padding: '16px 0 0' }}>
          <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', background: '#0A1628', borderRadius: '9999px', width: '55%', transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Step 5 of 8</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>Income & Expenses</span>
          </div>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '6px', paddingTop: '16px' }}>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>
            Business Income & Expenses
          </h1>
          <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
            Form 433-B Section 4 layout. Enter monthly figures.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <button
            onClick={() => setPeriod('monthly')}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 12px',
              background: period === 'monthly' ? '#EFF4FF' : '#F8FAFC',
              border: `1.5px solid ${period === 'monthly' ? '#2563EB' : '#F1F5F9'}`,
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              color: period === 'monthly' ? '#2563EB' : '#64748B',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('annual')}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 12px',
              background: period === 'annual' ? '#EFF4FF' : '#F8FAFC',
              border: `1.5px solid ${period === 'annual' ? '#2563EB' : '#F1F5F9'}`,
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              color: period === 'annual' ? '#2563EB' : '#64748B',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
          >
            Annual
          </button>
        </div>

        {/* Income Section Card */}
        <div style={{
          background: 'white',
          border: '1px solid #F1F5F9',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '8px' }}>
            <i className="fa-solid fa-arrow-trend-up" style={{ fontSize: '12px', color: '#00A651', marginRight: '6px' }} />
            Income
          </div>

          {/* Gross Revenue + COGS row */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Gross Revenue</label>
              <input
                type="text"
                value={grossRevenue}
                onChange={(e) => setGrossRevenue(e.target.value)}
                placeholder="$0"
                style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Cost of Goods Sold</label>
              <input
                type="text"
                value={cogs}
                onChange={(e) => setCogs(e.target.value)}
                placeholder="$0"
                style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Gross Profit */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Gross Profit</label>
              <div style={{
                padding: '10px 12px',
                background: '#F8FAFC',
                border: '1.5px solid #F1F5F9',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#00A651',
              }}>
                {fmt(grossProfit)}
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Section Card */}
        <div style={{
          background: 'white',
          border: '1px solid #F1F5F9',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '8px' }}>
            <i className="fa-solid fa-arrow-trend-down" style={{ fontSize: '12px', color: '#E63946', marginRight: '6px' }} />
            Expenses
          </div>

          {/* Row 1: Wages + Rent */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Wages / Salaries</label>
              <input type="text" value={wages} onChange={(e) => setWages(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Rent / Lease</label>
              <input type="text" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Row 2: Supplies + Utilities */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Supplies</label>
              <input type="text" value={supplies} onChange={(e) => setSupplies(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Utilities</label>
              <input type="text" value={utilities} onChange={(e) => setUtilities(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Row 3: Insurance + Taxes */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Insurance</label>
              <input type="text" value={insurance} onChange={(e) => setInsurance(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Taxes (State/Local)</label>
              <input type="text" value={taxes} onChange={(e) => setTaxes(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Row 4: Other Expenses */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={fieldLabelStyle}>Other Expenses</label>
              <input type="text" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)} placeholder="$0" style={fieldInputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 2px rgba(10,22,40,0.06)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F1F5F9'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Summary Bar - Dark */}
        <div style={{
          background: '#0A1628',
          borderRadius: '14px',
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '16px',
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              Net Business Income
            </span>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: netIncome >= 0 ? '#10B981' : '#E63946', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {fmt(netIncome)}
            </div>
          </div>
          <div style={{ textAlign: 'right' as const }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
              Monthly Cash Flow
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>
              {netIncome >= 0 ? 'Positive' : 'Negative'}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: '16px' }} />

        {/* Continue Button */}
        <div style={{ padding: '12px 0 20px' }}>
          <button
            onClick={handleContinue}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: 'none',
              borderRadius: '9999px',
              padding: '16px 28px',
              fontFamily: 'inherit',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              background: '#00A651',
              color: 'white',
              width: '100%',
              boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
            }}
          >
            Continue
            <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />
          </button>
        </div>
      </div>
    </div>
  )
}
