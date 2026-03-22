'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DIFF_ROWS = [
  { label: 'IRS Form', innocent: '8857', injured: '8379' },
  { label: 'Issue', innocent: 'Spouse caused wrong tax amount', injured: "Refund taken for spouse's debt" },
  { label: 'Relief Type', innocent: 'Remove liability from you', injured: 'Refund your portion' },
  { label: 'Deadline', innocent: 'Generally 2 years from first collection', injured: 'File with return or within 3 years' },
  { label: 'Knowledge', innocent: "Must show you didn't know of errors", injured: 'No knowledge requirement' },
]

export default function SpouseReliefHubPage() {
  const router = useRouter()
  const [comparisonOpen, setComparisonOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <div
            onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 12, background: '#FAFAFF', border: '1px solid #E8E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>Spouse Relief</div>
          <div style={{ width: 36, flexShrink: 0 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '8px 20px 20px' }}>
          {/* Heading */}
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Spouse Tax Relief</div>
            <div style={{ fontSize: '0.78rem', color: '#8585A0', marginTop: 4, lineHeight: 1.5 }}>Choose the type of relief that fits your situation</div>
          </div>

          {/* Innocent Spouse Card */}
          <Link
            href="/forms/form-8857"
            style={{ textDecoration: 'none', display: 'block', background: 'white', border: '1.5px solid #E8E8F0', borderRadius: 16, padding: 20, cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-shield-heart" style={{ fontSize: 20, color: '#7C3AED' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1A1A2E' }}>Innocent Spouse</span>
                  <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#F5F0FF', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#7C3AED' }}>FORM 8857</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#5C5C7A', lineHeight: 1.5 }}>
                  Request relief from joint tax liability caused by your spouse&apos;s errors or omissions on a joint return.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#2563EB' }}>Get started</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: 10, color: '#2563EB' }} />
                </div>
              </div>
            </div>
          </Link>

          {/* Injured Spouse Card */}
          <Link
            href="#"
            style={{ textDecoration: 'none', display: 'block', background: 'white', border: '1.5px solid #E8E8F0', borderRadius: 16, padding: 20, cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-hand-holding-heart" style={{ fontSize: 20, color: '#E63946' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1A1A2E' }}>Injured Spouse</span>
                  <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#FFF0F1', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#E63946' }}>FORM 8379</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#5C5C7A', lineHeight: 1.5 }}>
                  Claim your share of a joint refund that was offset by your spouse&apos;s prior debt (child support, student loans, back taxes).
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#2563EB' }}>Get started</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: 10, color: '#2563EB' }} />
                </div>
              </div>
            </div>
          </Link>

          {/* "Which do I need?" Expandable */}
          <div
            style={{ background: 'white', border: '1px solid #D5D5E0', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', ...(comparisonOpen ? { borderColor: 'rgba(10,22,40,0.15)' } : {}) }}
          >
            <div
              onClick={() => setComparisonOpen(!comparisonOpen)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-circle-question" style={{ fontSize: 12, color: '#2563EB' }} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A2E' }}>Which do I need?</span>
              </div>
              <i className="fas fa-chevron-down" style={{ fontSize: 11, color: '#B0B0C8', transition: 'transform 0.3s ease', transform: comparisonOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>

            {comparisonOpen && (
              <div style={{ padding: '0 16px 16px' }}>
                {/* Quick descriptions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                  <div style={{ padding: '10px 12px', background: '#F5F0FF', borderRadius: 10 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7C3AED', marginBottom: 2 }}>Innocent Spouse</div>
                    <div style={{ fontSize: '0.72rem', color: '#5C5C7A', lineHeight: 1.5 }}>You were wrongly assessed tax due to your spouse&apos;s actions &mdash; underreported income, false deductions, or fraud on a joint return.</div>
                  </div>
                  <div style={{ padding: '10px 12px', background: '#FFF0F1', borderRadius: 10 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E63946', marginBottom: 2 }}>Injured Spouse</div>
                    <div style={{ fontSize: '0.72rem', color: '#5C5C7A', lineHeight: 1.5 }}>Your share of a joint refund was taken (offset) to pay your spouse&apos;s separate debt &mdash; past-due child support, federal student loans, or prior-year taxes.</div>
                  </div>
                  <div style={{ padding: '10px 12px', background: '#F0FDFA', borderRadius: 10 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0D9488', marginBottom: 2 }}>Equitable Relief</div>
                    <div style={{ fontSize: '0.72rem', color: '#5C5C7A', lineHeight: 1.5 }}>A catch-all when you don&apos;t qualify for innocent or injured spouse. Available when it would be inequitable to hold you liable. Filed via Form 8857.</div>
                  </div>
                </div>

                {/* Key Differences Table */}
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Key Differences</div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '28%', fontSize: '0.62rem', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 6px', textAlign: 'left', borderBottom: '1px solid #F0F0F5' }} />
                      <th style={{ width: '36%', fontSize: '0.62rem', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 6px', textAlign: 'left', borderBottom: '1px solid #F0F0F5' }}>Innocent</th>
                      <th style={{ width: '36%', fontSize: '0.62rem', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 6px', textAlign: 'left', borderBottom: '1px solid #F0F0F5' }}>Injured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DIFF_ROWS.map((row, i) => (
                      <tr key={row.label}>
                        <td style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.72rem', padding: '8px 6px', borderBottom: i === DIFF_ROWS.length - 1 ? 'none' : '1px solid #FAFAFF', verticalAlign: 'top', lineHeight: 1.4 }}>{row.label}</td>
                        <td style={{ fontSize: '0.72rem', color: '#5C5C7A', padding: '8px 6px', borderBottom: i === DIFF_ROWS.length - 1 ? 'none' : '1px solid #FAFAFF', verticalAlign: 'top', lineHeight: 1.4 }}>{row.innocent}</td>
                        <td style={{ fontSize: '0.72rem', color: '#5C5C7A', padding: '8px 6px', borderBottom: i === DIFF_ROWS.length - 1 ? 'none' : '1px solid #FAFAFF', verticalAlign: 'top', lineHeight: 1.4 }}>{row.injured}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Not sure? CTA */}
          <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #1E3A5F 100%)', borderRadius: 16, padding: 20, textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <i className="fas fa-headset" style={{ fontSize: 18, color: 'white' }} />
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'white', marginBottom: 4 }}>Not sure which you need?</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 14 }}>
              Our tax experts can review your situation and recommend the right path forward.
            </div>
            <Link
              href="/chat"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#00A651', borderRadius: 9999, color: 'white', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}
            >
              <i className="fas fa-message" style={{ fontSize: 12 }} /> Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
