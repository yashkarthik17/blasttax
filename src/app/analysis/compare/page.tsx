'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const fmt = (n: number | undefined) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function ComparePage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as {
    eligibility: { program: string; eligible: boolean; confidence: number; advantages: string[]; disadvantages: string[]; monthlyPayment?: number; totalPayment?: number; termMonths?: number }[]
    totalDebt: number
    rcp?: { rcpLumpSum: number }
  } | undefined

  const totalDebt = result?.totalDebt ?? 47250
  const rcp = result?.rcp?.rcpLumpSum ?? 8500
  const savingsPct = rcp > 0 ? Math.round(((totalDebt - rcp) / totalDebt) * 100) : 82

  const comparisonRows: { label: string; oic: string; sia: string; ppia: string; cnc: string; bestCols: number[]; redCols?: number[]; siaSmall?: boolean }[] = [
    { label: 'Monthly', oic: '$0-$354', sia: '$657', ppia: '$869', cnc: '$0', bestCols: [0, 3] },
    { label: 'Total Cost', oic: fmt(rcp || 8500), sia: fmt(totalDebt), ppia: '~$30,000', cnc: '$0', bestCols: [0, 3] },
    { label: 'Duration', oic: '5-24 mo', sia: '72 mo', ppia: 'CSED', cnc: 'CSED', bestCols: [] },
    { label: 'Savings', oic: `${savingsPct}%`, sia: '0%', ppia: '~36%', cnc: '100%*', bestCols: [0, 3] },
    { label: 'Lien Filed?', oic: 'Released after', sia: 'Under $25K: No', ppia: 'Yes', cnc: 'Maybe', bestCols: [], siaSmall: true },
    { label: 'Disclosure', oic: '433-A (Full)', sia: 'None', ppia: '433-A (Full)', cnc: '433-F', bestCols: [1] },
    { label: 'Approval', oic: '6-12 mo', sia: 'Immediate', ppia: '4-8 wk', cnc: '2-8 wk', bestCols: [1] },
    { label: 'Risk Level', oic: 'Medium', sia: 'Low', ppia: 'Low', cnc: 'Medium', bestCols: [1, 2] },
    { label: 'CSED Tolled?', oic: 'Yes', sia: 'No', ppia: 'No', cnc: 'No', bestCols: [1, 2, 3], redCols: [0] },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, paddingBottom: 12 }}>
          <button onClick={() => router.push('/analysis/results')} style={{ width: 40, height: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 14, color: '#64748B' }} />
          </button>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '0.95rem', fontWeight: 800, color: '#0A1628' }}>Compare Options</span>
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Compare Your Resolution Options</h1>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Side-by-side analysis of your eligible paths</p>
        </div>

        {/* Comparison Table */}
        <div style={{ overflowX: 'auto', margin: '0 -4px', padding: '0 4px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 11, borderRadius: 14, overflow: 'hidden', border: '1px solid #F1F5F9', background: 'white' }}>
            <thead>
              <tr>
                <th style={{ background: '#F8FAFC', padding: '10px 6px', fontWeight: 700, color: '#0A1628', textAlign: 'left', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.03em', borderBottom: '1.5px solid #F1F5F9', paddingLeft: 12, width: 72 }}>Factor</th>
                <th style={{ background: '#EBF0FF', padding: '10px 6px', fontWeight: 700, color: '#2563EB', textAlign: 'center', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.03em', borderBottom: '1.5px solid #F1F5F9' }}>OIC</th>
                <th style={{ background: '#F8FAFC', padding: '10px 6px', fontWeight: 700, color: '#0A1628', textAlign: 'center', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.03em', borderBottom: '1.5px solid #F1F5F9' }}>S-IA</th>
                <th style={{ background: '#F8FAFC', padding: '10px 6px', fontWeight: 700, color: '#0A1628', textAlign: 'center', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.03em', borderBottom: '1.5px solid #F1F5F9' }}>PPIA</th>
                <th style={{ background: '#F8FAFC', padding: '10px 6px', fontWeight: 700, color: '#0A1628', textAlign: 'center', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.03em', borderBottom: '1.5px solid #F1F5F9' }}>CNC</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIdx) => {
                const vals = [row.oic, row.sia, row.ppia, row.cnc]
                const isLast = rowIdx === comparisonRows.length - 1
                return (
                  <tr key={row.label}>
                    <td style={{ padding: '8px 6px', textAlign: 'left', paddingLeft: 12, fontWeight: 600, color: '#0A1628', fontSize: 10, borderBottom: isLast ? 'none' : '1px solid #F1F5F9', verticalAlign: 'middle' }}>{row.label}</td>
                    {vals.map((val, i) => {
                      const isBest = row.bestCols?.includes(i)
                      const isRed = (row as { redCols?: number[] }).redCols?.includes(i)
                      const isHighlight = i === 0
                      return (
                        <td key={i} style={{
                          padding: '8px 6px', textAlign: 'center', fontWeight: isBest ? 700 : isHighlight ? 600 : 500,
                          color: isBest ? '#00A651' : isRed ? '#E63946' : isHighlight ? '#2563EB' : '#64748B',
                          background: isHighlight ? 'rgba(235,240,255,0.3)' : undefined,
                          borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
                          verticalAlign: 'middle',
                          fontSize: (row as { siaSmall?: boolean }).siaSmall && i === 1 ? 10 : undefined,
                        }}>
                          {val}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Recommendation */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-start', gap: 10, borderRadius: 14, border: '1px solid #BFDBFE', background: '#EFF4FF', padding: 14 }}>
          <i className="fa-solid fa-lightbulb" style={{ color: '#2563EB', fontSize: 14, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, marginBottom: 2, fontSize: 13, color: '#1e3a5f' }}>Our Recommendation</div>
            <div style={{ fontSize: 12, lineHeight: 1.5, color: '#374151' }}>
              <strong>OIC</strong> offers the highest savings ({savingsPct}%), or <strong>Streamlined IA</strong> for fastest approval with zero disclosure.
            </div>
          </div>
        </div>

        {/* Strategic Plays */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            <i className="fa-solid fa-chess" style={{ fontSize: 11, marginRight: 4 }} /> Strategic Plays
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-3">
            {/* Play A */}
            <div style={{ background: 'white', border: '1.5px solid #F1F5F9', borderRadius: 16, padding: 16, marginBottom: 10, cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-arrow-trend-down" style={{ color: '#0A1628', fontSize: 14 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>Play A: Balance Reducer</div>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', background: '#0A1628', color: 'white', borderRadius: 6 }}>Compound Strategy</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5, marginBottom: 6 }}>
                Do FTA first to reduce balance by $5,300, then submit OIC with lower RCP = lower offer amount.
              </div>
              <button onClick={() => router.push('/analysis/detail/penalty')} style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Learn More <i className="fa-solid fa-arrow-right" style={{ fontSize: 10 }} />
              </button>
            </div>

            {/* Play E */}
            <div style={{ background: 'white', border: '1.5px solid #F1F5F9', borderRadius: 16, padding: 16, marginBottom: 10, cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-hourglass-half" style={{ color: '#0D9488', fontSize: 14 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>Play E: Expiration Play</div>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', background: '#F0FDFA', color: '#0D9488', borderRadius: 6 }}>Long-Term</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5, marginBottom: 6 }}>
                Request CNC + apply FTA, then wait for CSED to expire (2028-2031). Pay $0 if income stays low.
              </div>
              <button onClick={() => router.push('/analysis/detail/cnc')} style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Learn More <i className="fa-solid fa-arrow-right" style={{ fontSize: 10 }} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => router.push('/analysis/plan')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 14, background: '#00A651', padding: '16px 28px', color: 'white', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            Choose Your Resolution <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
          </button>
        </div>
      </div>
    </div>
  )
}
