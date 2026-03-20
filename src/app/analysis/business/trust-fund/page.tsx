'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface QuarterData {
  label: string
  incomeTax: string
  ssTax: string
  medTax: string
  addMed: string
}

export default function TrustFundPage() {
  const router = useRouter()
  const [quarters, setQuarters] = useState<QuarterData[]>([
    { label: 'Q3 2025 (941)', incomeTax: '12400', ssTax: '8200', medTax: '1920', addMed: '0' },
    { label: 'Q4 2025 (941)', incomeTax: '11800', ssTax: '7600', medTax: '1780', addMed: '0' },
  ])

  function updateField(qi: number, field: keyof QuarterData, value: string) {
    setQuarters((prev) => prev.map((q, i) => i === qi ? { ...q, [field]: value } : q))
  }

  const totals = useMemo(() => {
    let tf = 0, ntf = 0
    quarters.forEach((q) => {
      const it = parseFloat(q.incomeTax) || 0
      const ss = parseFloat(q.ssTax) || 0
      const med = parseFloat(q.medTax) || 0
      const am = parseFloat(q.addMed) || 0
      tf += it + ss / 2 + med / 2 + am
      ntf += ss / 2 + med / 2
    })
    const total = tf + ntf
    return { tf, ntf, pct: total > 0 ? Math.round((tf / total) * 100) : 0 }
  }, [quarters])

  const fmt = (n: number) => '$' + n.toLocaleString()

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1.5px solid #F1F5F9',
    borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
    color: '#0A1628', outline: 'none', boxSizing: 'border-box' as const,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600, color: '#94A3B8',
    textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '5px',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#E2E8F0', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: '30%', borderRadius: '9999px', background: '#0A1628', transition: 'all 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Step 3 of 8</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>Trust Fund Split</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Trust Fund vs Non-Trust Fund</h1>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px', lineHeight: 1.5 }}>This is the most critical classification in business tax resolution. Trust fund = personal liability via TFRP.</p>
          </div>

          {/* Warning Alert */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#FFFBEB', border: '1px solid rgba(245,166,35,0.2)', borderRadius: '14px', marginBottom: '14px' }}>
            <i className="fa-solid fa-piggy-bank" style={{ color: '#D97706' }} />
            <span style={{ fontSize: '12px', color: '#92400E' }}>Always designate payments to trust fund first. Undesignated payments go to non-trust fund (benefits IRS, not you).</span>
          </div>

          {/* Q3 2025 */}
          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '8px' }}>
              <i className="fa-solid fa-calculator" style={{ fontSize: '12px', color: '#2563EB' }} /> {quarters[0].label}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 3: Income Tax Withheld</label>
                <input type="text" placeholder="$0" value={'$' + quarters[0].incomeTax} onChange={(e) => updateField(0, 'incomeTax', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
                <div style={{ fontSize: '9px', color: '#00A651', fontWeight: 600, marginTop: '2px' }}>100% Trust Fund</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 5a: Social Security Tax</label>
                <input type="text" placeholder="$0" value={'$' + quarters[0].ssTax} onChange={(e) => updateField(0, 'ssTax', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
                <div style={{ fontSize: '9px', color: '#F59E0B', fontWeight: 600, marginTop: '2px' }}>50/50 Split</div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 5c: Medicare Tax</label>
                <input type="text" placeholder="$0" value={'$' + quarters[0].medTax} onChange={(e) => updateField(0, 'medTax', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
                <div style={{ fontSize: '9px', color: '#F59E0B', fontWeight: 600, marginTop: '2px' }}>50/50 Split</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 5d: Additional Medicare</label>
                <input type="text" placeholder="$0" value={'$' + quarters[0].addMed} onChange={(e) => updateField(0, 'addMed', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
                <div style={{ fontSize: '9px', color: '#00A651', fontWeight: 600, marginTop: '2px' }}>100% Trust Fund</div>
              </div>
            </div>
          </div>

          {/* Q4 2025 */}
          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '8px' }}>
              <i className="fa-solid fa-calculator" style={{ fontSize: '12px', color: '#2563EB' }} /> {quarters[1].label}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 3: Income Tax Withheld</label>
                <input type="text" placeholder="$0" value={'$' + quarters[1].incomeTax} onChange={(e) => updateField(1, 'incomeTax', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 5a: Social Security Tax</label>
                <input type="text" placeholder="$0" value={'$' + quarters[1].ssTax} onChange={(e) => updateField(1, 'ssTax', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 5c: Medicare Tax</label>
                <input type="text" placeholder="$0" value={'$' + quarters[1].medTax} onChange={(e) => updateField(1, 'medTax', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Line 5d: Additional Medicare</label>
                <input type="text" placeholder="$0" value={'$' + quarters[1].addMed} onChange={(e) => updateField(1, 'addMed', e.target.value.replace(/[^0-9]/g, ''))} style={fieldInputStyle} />
              </div>
            </div>
          </div>

          {/* Summary Bar */}
          <div style={{ background: '#0A1628', borderRadius: '14px', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Total Trust Fund</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10B981', letterSpacing: '-0.02em', marginTop: '2px' }}>{fmt(totals.tf)}</div>
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const }}>Non-Trust Fund</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{fmt(totals.ntf)}</div>
            </div>
            <div style={{ textAlign: 'right' as const }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>TF %</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{totals.pct}%</div>
            </div>
          </div>

          {/* TFRP Exposure */}
          <div style={{ marginTop: '12px', padding: '12px', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
              <i className="fa-solid fa-user-shield" style={{ fontSize: '11px' }} /> TFRP Exposure
            </div>
            <div style={{ fontSize: '11.5px', color: '#991B1B', marginTop: '4px' }}>Each responsible person is personally liable for the full {fmt(totals.tf)} trust fund amount. This is separate from the business debt.</div>
          </div>

          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={() => router.push('/analysis/business/results')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '16px', background: '#0A1628', color: 'white', fontSize: '15px', fontWeight: 700, padding: '16px 28px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
