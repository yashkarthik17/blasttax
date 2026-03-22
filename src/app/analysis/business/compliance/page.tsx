'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OPERATING_ITEMS = [
  'All Form 941s filed for all quarters?',
  'All Form 940s filed for all years?',
  'Current quarter 941 filed (or not yet due)?',
  'All income returns filed (1120/1120-S/1065)?',
]

const OOB_ITEMS = [
  'Final 941 filed with "Final Return" checked?',
  'Final 940 filed and marked as final?',
  'Form W-3 and W-2s issued for final year?',
  'Final income return filed and marked final?',
]

const QUARTERS = [
  { quarter: 'Q1 2025', filed: true, tc150: '04/30/2025', sfr: 'No' },
  { quarter: 'Q2 2025', filed: true, tc150: '07/31/2025', sfr: 'No' },
  { quarter: 'Q3 2025', filed: false, tc150: '--', sfr: '--' },
  { quarter: 'Q4 2025', filed: false, tc150: '--', sfr: '--' },
]

export default function BusinessCompliancePage() {
  const router = useRouter()
  const [opChecks, setOpChecks] = useState<Record<number, boolean>>({})
  const [oobChecks, setOobChecks] = useState<Record<number, boolean>>({})

  const toggleSwitchStyle = (checked: boolean): React.CSSProperties => ({
    width: '36px', height: '20px', appearance: 'none' as const, background: checked ? '#2563EB' : '#D5D5E0',
    borderRadius: '10px', position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0, border: 'none',
  })

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5',
    borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
    color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#D5D5E0', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: '20%', borderRadius: '9999px', background: '#1A1A2E', transition: 'all 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8585A0' }}>Step 2 of 8</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>Filing Compliance</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25 }}>Filing Compliance Check</h1>
            <p style={{ fontSize: '13px', color: '#8585A0', marginTop: '4px', lineHeight: 1.5 }}>IRS requires all returns filed before any resolution. Check each item below.</p>
          </div>

          {/* Warning Alert */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#FEF2F2', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '14px', marginBottom: '14px' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ color: '#E63946' }} />
            <span style={{ fontSize: '12px', color: '#991B1B' }}>Filing compliance is the FIRST gate. IRS will not process any resolution request until the business is in compliance.</span>
          </div>

          {/* Operating Checklist */}
          <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', marginBottom: '12px' }}>
              <i className="fa-solid fa-file-lines" style={{ fontSize: '12px', color: '#2563EB' }} /> Operating Business Checklist
            </div>
            {OPERATING_ITEMS.map((item, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={opChecks[i] || false}
                  onChange={() => setOpChecks((p) => ({ ...p, [i]: !p[i] }))}
                  style={toggleSwitchStyle(opChecks[i] || false)}
                />
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#5C5C7A' }}>{item}</span>
              </label>
            ))}
          </div>

          {/* OOB Checklist */}
          <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', marginBottom: '12px' }}>
              <i className="fa-solid fa-door-closed" style={{ fontSize: '12px', color: '#92400E' }} /> Out-of-Business Checklist
            </div>
            {OOB_ITEMS.map((item, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={oobChecks[i] || false}
                  onChange={() => setOobChecks((p) => ({ ...p, [i]: !p[i] }))}
                  style={toggleSwitchStyle(oobChecks[i] || false)}
                />
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#5C5C7A' }}>{item}</span>
              </label>
            ))}
          </div>

          {/* Per-Quarter Table */}
          <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', marginBottom: '12px' }}>
              <i className="fa-solid fa-table" style={{ fontSize: '12px', color: '#2563EB' }} /> Per-Quarter 941 Filing Status
            </div>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' as const }}>
                <thead>
                  <tr style={{ background: '#FAFAFF' }}>
                    <th style={{ padding: '8px', textAlign: 'left' as const, fontWeight: 600, color: '#8585A0' }}>Quarter</th>
                    <th style={{ padding: '8px', textAlign: 'left' as const, fontWeight: 600, color: '#8585A0' }}>Filed?</th>
                    <th style={{ padding: '8px', textAlign: 'left' as const, fontWeight: 600, color: '#8585A0' }}>TC 150</th>
                    <th style={{ padding: '8px', textAlign: 'left' as const, fontWeight: 600, color: '#8585A0' }}>SFR?</th>
                  </tr>
                </thead>
                <tbody>
                  {QUARTERS.map((q, i) => (
                    <tr key={i} style={{ borderBottom: i < QUARTERS.length - 1 ? '1px solid #F0F0F5' : 'none' }}>
                      <td style={{ padding: '8px', fontWeight: 600 }}>{q.quarter}</td>
                      <td style={{ padding: '8px' }}>
                        <span style={{ color: q.filed ? '#00A651' : '#E63946', fontWeight: 700 }}>{q.filed ? 'Yes' : 'No'}</span>
                      </td>
                      <td style={{ padding: '8px' }}>{q.tc150}</td>
                      <td style={{ padding: '8px' }}>{q.sfr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Result */}
          <div style={{ padding: '14px', background: '#FEF2F2', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-circle-xmark" style={{ color: '#E63946', fontSize: '16px' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#991B1B' }}>Not in Compliance</span>
                <p style={{ fontSize: '11.5px', color: '#991B1B', marginTop: '2px' }}>2 unfiled quarterly returns detected. Must resolve before proceeding with any resolution request.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={() => router.push('/analysis/business/deposits')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '16px', background: '#1A1A2E', color: 'white', fontSize: '15px', fontWeight: 700, padding: '16px 28px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
