'use client'

import { useParams, useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import { useState, useEffect } from 'react'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---------------------------------------------------------------------------
// IA Detail (29b)
// ---------------------------------------------------------------------------
function IADetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const totalDebt = (result.totalDebt as number) ?? 47250
  const mdi = ((result.mdi as { mdi: number })?.mdi) ?? 869
  const csedData = (result as Record<string, unknown>).csedData as { taxYear: number; remainingMonths: number; adjustedCSED: string; isExpired: boolean }[] | undefined

  const iaTypes = [
    { name: 'Short-Term Plan', range: '(\u2264180 days)', eligible: false, badge: 'Not Eligible', badgeIcon: 'fa-triangle-exclamation', badgeStyle: 'warning', reason: 'Cannot pay full balance within 180 days based on MDI.', note: 'Requires full payment within 180 days; balance must be under $100,000' },
    { name: 'Guaranteed IA', range: '(\u2264$10K)', eligible: false, badge: 'Not Eligible', badgeIcon: 'fa-xmark', badgeStyle: 'danger', reason: 'Balance exceeds $10,000 assessed tax threshold.', note: 'IRC \u00A7 6159(c) \u2014 automatic approval for \u2264$10K' },
    { name: 'Streamlined IA', range: '(\u2264$50K)', eligible: totalDebt <= 50000, badge: 'Eligible', badgeIcon: 'fa-check', badgeStyle: 'success', recommended: true, monthlyPayment: Math.ceil(totalDebt / 72), term: 72 },
    { name: 'Expanded IA', range: '($50K-$100K)', eligible: false, badge: 'N/A', badgeIcon: 'fa-circle-info', badgeStyle: 'info', reason: 'Currently below threshold. May qualify if balance increases.' },
    { name: 'Non-Streamlined', range: '($100K-$250K)', eligible: false, badge: 'N/A', badgeIcon: 'fa-circle-info', badgeStyle: 'info', reason: 'Balance below threshold. Not applicable for your situation.' },
    { name: 'Partial Payment IA', range: '', eligible: mdi > 0, badge: 'Eligible', badgeIcon: 'fa-check', badgeStyle: 'success', alternative: true, monthlyPayment: mdi },
  ]

  const badgeColors: Record<string, string> = {
    warning: 'background: #FFFBEB; color: #92400E;',
    danger: 'background: #FEF2F2; color: #E63946;',
    success: 'background: #E6F9EE; color: #00A651;',
    info: 'background: #EFF4FF; color: #2563EB;',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
      {/* Heading */}
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', marginBottom: 4 }}>Payment Plan Options</h1>
        <p style={{ fontSize: '0.82rem', color: '#8585A0' }}>Pay your tax debt over time with monthly payments</p>
      </div>

      {/* What is IA */}
      <div style={{ background: '#EFF4FF', borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(0,61,165,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-calendar-check" style={{ fontSize: 14, color: 'white' }} />
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>What is an Installment Agreement?</h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#2D2B3D', lineHeight: 1.6, margin: 0 }}>A <strong>payment plan</strong> with the IRS. Instead of paying everything at once, you make <strong>monthly payments</strong> over time until your debt is paid off. Think of it like financing -- manageable monthly amounts.</p>
      </div>

      {/* Profile Card */}
      <div style={{ background: 'white', border: '1px solid rgba(0,61,165,0.1)', borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-user" style={{ color: 'white', fontSize: 13 }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>YOUR PROFILE</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8585A0', fontWeight: 600, marginBottom: 2 }}>Total Debt</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#E63946' }}>{fmt(totalDebt)}</div>
          </div>
          <div style={{ width: 1, background: '#F0F0F5' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8585A0', fontWeight: 600, marginBottom: 2 }}>MDI</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E' }}>{fmt(mdi)}<span style={{ fontSize: 11, fontWeight: 500, color: '#5C5C7A' }}>/mo</span></div>
          </div>
          <div style={{ width: 1, background: '#F0F0F5' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8585A0', fontWeight: 600, marginBottom: 2 }}>CSED Range</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E' }}>2028-2031</div>
          </div>
        </div>
      </div>

      {/* IA Type Cards */}
      {iaTypes.map((ia) => {
        const topColor = ia.eligible ? '#00A651' : ia.badgeStyle === 'info' ? '#2563EB' : '#B0B0C8'
        const borderColor = ia.eligible ? 'rgba(0,166,81,0.25)' : ia.badgeStyle === 'info' ? 'rgba(37,99,235,0.15)' : '#F0F0F5'
        return (
          <div key={ia.name} style={{ background: 'white', border: `1.5px solid ${borderColor}`, borderRadius: 16, padding: 16, marginBottom: 0, position: 'relative', overflow: 'hidden', opacity: ia.eligible ? 1 : 0.7, boxShadow: ia.eligible ? '0 1px 2px rgba(0,0,0,0.03)' : undefined, transition: 'all 0.3s ease' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: topColor }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: ia.eligible ? 10 : 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>{ia.name}</span>
                {ia.range && <span style={{ fontSize: 11, color: '#5C5C7A' }}>{ia.range}</span>}
              </div>
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, fontWeight: 700, ...Object.fromEntries(badgeColors[ia.badgeStyle].split(';').filter(Boolean).map(s => { const [k, v] = s.split(':').map(x => x.trim()); return [k, v] })) }}>
                <i className={`fa-solid ${ia.badgeIcon}`} style={{ fontSize: 9, marginRight: 3 }} />
                {ia.badge}
              </span>
            </div>

            {ia.recommended && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(0,166,81,0.08)', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#00A651', marginBottom: 10 }}>
                <i className="fa-solid fa-star" style={{ fontSize: 9 }} /> Recommended
              </div>
            )}

            {ia.alternative && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(37,99,235,0.08)', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#2563EB', marginBottom: 10 }}>
                <i className="fa-solid fa-shuffle" style={{ fontSize: 9 }} /> Alternative Option
              </div>
            )}

            {ia.eligible && ia.recommended && (
              <div style={{ fontSize: 13, color: '#065F46', fontWeight: 600, marginBottom: 10, lineHeight: 1.4 }}>
                Your {fmt(totalDebt)} balance qualifies for streamlined processing
              </div>
            )}

            {ia.eligible && ia.monthlyPayment && (
              <div style={{ background: '#FAFAFF', borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12 }}>
                  <span style={{ color: '#5C5C7A' }}>Monthly Payment</span>
                  <span style={{ fontWeight: 700, color: '#1A1A2E' }}>{fmt(ia.monthlyPayment)}/mo</span>
                </div>
                {ia.term && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                    <span style={{ color: '#5C5C7A' }}>Duration</span>
                    <span style={{ fontWeight: 600, color: '#1A1A2E' }}>{ia.term} months</span>
                  </div>
                )}
                {ia.recommended && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                      <span style={{ color: '#5C5C7A' }}>Financial Statement</span>
                      <span style={{ fontWeight: 600, color: '#00A651' }}>Not Required</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                      <span style={{ color: '#5C5C7A' }}>Lien Status</span>
                      <span style={{ fontWeight: 600, color: '#1A1A2E' }}>No lien under $25K</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                      <span style={{ color: '#5C5C7A' }}>$25K-$50K requires</span>
                      <span style={{ fontWeight: 600, color: '#1A1A2E' }}>DDIA (auto-pay)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                      <span style={{ color: '#5C5C7A' }}>Setup Fee</span>
                      <span style={{ fontWeight: 600, color: '#1A1A2E' }}>$22 (online+DDIA) to $178</span>
                    </div>
                  </>
                )}
                {ia.alternative && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                      <span style={{ color: '#5C5C7A' }}>Duration</span>
                      <span style={{ fontWeight: 600, color: '#1A1A2E' }}>Until CSED (2028-2031)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
                      <span style={{ color: '#5C5C7A' }}>Review Cycle</span>
                      <span style={{ fontWeight: 600, color: '#F59E0B' }}>Every 2 years</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {ia.alternative && ia.eligible && (
              <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5 }}>
                Pay {fmt(mdi)}/mo, remaining balance expires at CSED. Lower monthly payment but longer obligation with financial review every 2 years.
              </div>
            )}

            {!ia.eligible && ia.reason && (
              <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5, marginBottom: 8 }}>{ia.reason}</div>
            )}

            {!ia.eligible && ia.note && (
              <div style={{ fontSize: 11, color: '#8585A0' }}>
                <i className="fa-solid fa-info-circle" style={{ fontSize: 10, marginRight: 4 }} />
                {ia.note}
              </div>
            )}

            {ia.eligible && ia.recommended && (
              <button onClick={() => router.push('/forms/form-9465')} style={{ marginTop: 8, padding: '10px 20px', background: '#00A651', color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Apply Now <i className="fa-solid fa-arrow-right" style={{ fontSize: 11 }} />
              </button>
            )}
          </div>
        )
      })}

      {/* Primary CTA */}
      <div style={{ marginTop: 4 }}>
        <button onClick={() => router.push('/forms/form-9465')} style={{ width: '100%', padding: '14px 28px', background: '#00A651', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
          Choose Streamlined IA <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => router.push('/analysis/compare')} style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrows-left-right" style={{ fontSize: 11, marginRight: 4 }} />
            Compare with OIC
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// OIC Detail (29c)
// ---------------------------------------------------------------------------
function OICDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const totalDebt = (result.totalDebt as number) ?? 47250
  const nre = ((result.nre as { totalNRE: number })?.totalNRE) ?? 23400
  const mdi = ((result.mdi as { mdi: number })?.mdi) ?? 869
  const rcp = nre + Math.max(0, mdi) * 12
  const savingsPct = Math.round(((totalDebt - rcp) / totalDebt) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', marginBottom: 4 }}>Settle Your Debt for Less</h1>
        <p style={{ fontSize: '0.82rem', color: '#8585A0' }}>Negotiate a reduced payoff amount with the IRS</p>
      </div>

      {/* What is OIC */}
      <div style={{ background: '#ECFDF5', borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(0,166,81,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-handshake" style={{ fontSize: 14, color: 'white' }} />
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>What is an Offer in Compromise?</h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#2D2B3D', lineHeight: 1.6, margin: 0 }}>A deal with the IRS to <strong>settle your tax debt for less than you owe</strong>. If you {"can't"} pay the full amount and the IRS agrees, you pay a reduced amount and the rest is forgiven. {"It's"} the IRS&apos;s &quot;fresh start&quot; program.</p>
      </div>

      {/* Profile Card */}
      <div style={{ background: 'white', border: '1px solid rgba(0,61,165,0.1)', borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-user" style={{ color: 'white', fontSize: 13 }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>YOUR PROFILE</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8585A0', fontWeight: 600, marginBottom: 2 }}>Total Debt</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#E63946' }}>{fmt(totalDebt)}</div>
          </div>
          <div style={{ width: 1, background: '#F0F0F5' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8585A0', fontWeight: 600, marginBottom: 2 }}>MDI</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E' }}>{fmt(mdi)}<span style={{ fontSize: 11, fontWeight: 500, color: '#5C5C7A' }}>/mo</span></div>
          </div>
          <div style={{ width: 1, background: '#F0F0F5' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8585A0', fontWeight: 600, marginBottom: 2 }}>CSED Range</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E' }}>2028-2031</div>
          </div>
        </div>
      </div>

      {/* DATC - Eligible */}
      <div style={{ background: 'white', border: '1.5px solid rgba(0,166,81,0.25)', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#00A651' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>Doubt as to Collectibility</span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, fontWeight: 700, background: '#E6F9EE', color: '#00A651' }}>
            <i className="fa-solid fa-check" style={{ fontSize: 9, marginRight: 3 }} /> Eligible
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(0,166,81,0.08)', padding: '2px 7px', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#00A651' }}>
            <i className="fa-solid fa-star" style={{ fontSize: 8 }} /> Recommended
          </span>
          <span style={{ fontSize: 10, color: '#5C5C7A', padding: '2px 7px', background: '#FAFAFF', borderRadius: 6, fontWeight: 600 }}>Most Common OIC Type</span>
        </div>

        {/* RCP calc */}
        <div style={{ background: '#FAFAFF', borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>RCP Calculation</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 12 }}>
            <span style={{ color: '#5C5C7A' }}>Asset Equity</span>
            <span style={{ fontWeight: 600, color: '#1A1A2E' }}>{fmt(nre)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 12, borderTop: '1px solid #F0F0F5' }}>
            <span style={{ color: '#5C5C7A' }}>Future Income (Lump Sum)</span>
            <span style={{ fontWeight: 600, color: '#1A1A2E' }}>{fmt(mdi)} x 12 = {fmt(Math.max(0, mdi) * 12)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 12, borderTop: '2px solid #F0F0F5' }}>
            <span style={{ fontWeight: 700, color: '#1A1A2E' }}>Minimum Offer (RCP)</span>
            <span style={{ fontWeight: 800, color: '#2563EB' }}>{fmt(rcp)}</span>
          </div>
        </div>

        {/* Savings */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: '#5C5C7A', marginBottom: 2 }}>Your offer vs owed</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E' }}>{fmt(rcp)} <span style={{ fontSize: 12, color: '#5C5C7A', fontWeight: 500 }}>vs {fmt(totalDebt)}</span></div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#E6F9EE', color: '#065F46', fontSize: 13, fontWeight: 800, padding: '6px 12px', borderRadius: 10, border: '1px solid rgba(0,166,81,0.2)' }}>
            <i className="fa-solid fa-arrow-down" style={{ fontSize: 11 }} />
            Save {savingsPct}%
          </div>
        </div>

        {/* Payment Options */}
        <div style={{ background: '#FAFAFF', borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Payment Options</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: 'white', border: '1px solid #F0F0F5', borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', marginBottom: 4 }}>Lump Sum</div>
              <div style={{ fontSize: 12, color: '#1A1A2E', fontWeight: 600 }}>20% down ({fmt(Math.round(rcp * 0.2))})</div>
              <div style={{ fontSize: 11, color: '#5C5C7A' }}>Remainder in 5 months</div>
            </div>
            <div style={{ flex: 1, background: 'white', border: '1px solid #F0F0F5', borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>Periodic</div>
              <div style={{ fontSize: 12, color: '#1A1A2E', fontWeight: 600 }}>{fmt(Math.ceil(rcp / 24))}/mo</div>
              <div style={{ fontSize: 11, color: '#5C5C7A' }}>For 24 months</div>
            </div>
          </div>
        </div>

        {/* Low-income note */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(37,99,235,0.05)', borderRadius: 10, padding: 10, marginBottom: 4 }}>
          <i className="fa-solid fa-circle-info" style={{ color: '#2563EB', fontSize: 13, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: '#1e40af', lineHeight: 1.4 }}>At 250% FPL ($39,900), application fee may be waived</span>
        </div>
      </div>

      {/* DATL */}
      <div style={{ background: 'white', border: '1.5px solid rgba(37,99,235,0.15)', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#2563EB' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>Doubt as to Liability</span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, fontWeight: 700, background: '#EFF4FF', color: '#2563EB' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: 9, marginRight: 3 }} /> Review Needed
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5, marginBottom: 8 }}>
          Dispute the amount the IRS says you owe. No financial disclosure required.
        </div>
        <div style={{ fontSize: 11, color: '#8585A0' }}>
          <i className="fa-solid fa-file-lines" style={{ fontSize: 10, marginRight: 4 }} />
          Use Form 656-L instead of Form 656
        </div>
      </div>

      {/* ETA */}
      <div style={{ background: 'white', border: '1.5px solid rgba(124,58,237,0.15)', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#7C3AED' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>Effective Tax Administration</span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, fontWeight: 700, background: '#F5F0FF', color: '#7C3AED' }}>
            <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: 9, marginRight: 3 }} /> Special
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5 }}>
          You can pay but it creates exceptional hardship. Applies to medical/disability situations or public policy cases.
        </div>
      </div>

      {/* TC Code Eligibility Checks */}
      <div style={{ background: '#FAFAFF', border: '1px solid #F0F0F5', borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
          <i className="fa-solid fa-shield-check" style={{ fontSize: 10, marginRight: 4 }} />
          Eligibility Checks
        </div>
        {['No TC 520 (No bankruptcy)', 'No TC 420/424 (No open audit)', 'No TC 480 (No pending OIC)', 'TC 150 all years (Returns filed)', 'No TC 481 in past 5 years'].map(check => (
          <div key={check} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
            <i className="fa-solid fa-circle-check" style={{ color: '#00A651', fontSize: 14 }} />
            <span style={{ color: '#1A1A2E', fontWeight: 500, fontSize: 12 }}>{check}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 4 }}>
        <button onClick={() => router.push('/forms/form-656')} style={{ width: '100%', padding: '14px 28px', background: '#00A651', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
          Begin OIC Application <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => router.push('/analysis/compare')} style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrows-left-right" style={{ fontSize: 11, marginRight: 4 }} />
            Compare with IA
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CNC Detail (29e)
// ---------------------------------------------------------------------------
function CNCDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const mdi = ((result.mdi as { mdi: number })?.mdi) ?? 869
  const rcp = ((result.rcp as { rcpLumpSum: number })?.rcpLumpSum) ?? 8500
  const [csedAnimated, setCsedAnimated] = useState(false)
  useEffect(() => { setTimeout(() => setCsedAnimated(true), 800) }, [])

  const points = [
    { icon: 'fa-circle-check', color: '#00A651', text: 'IRS stops active collection (levies, garnishments)', bold: true },
    { icon: 'fa-circle-check', color: '#00A651', text: 'CSED continues running \u2014 debt can expire!', bold: true },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'Interest & penalties continue accruing', bold: false },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'IRS reviews annually \u2014 if income increases, CNC revoked', bold: false },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'Tax refunds will still be offset', bold: false },
    { icon: 'fa-triangle-exclamation', color: '#F5A623', text: 'Lien may still be filed for balance >$10K', bold: false },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', marginBottom: 4 }}>Pause Collection Activity</h1>
        <p style={{ fontSize: '0.82rem', color: '#8585A0' }}>Stop IRS collections while your debt clock runs down</p>
      </div>

      {/* What is CNC */}
      <div style={{ background: '#F5F3FF', borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(124,58,237,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-pause-circle" style={{ fontSize: 14, color: 'white' }} />
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>What is Currently Not Collectible?</h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#2D2B3D', lineHeight: 1.6, margin: 0 }}>The IRS <strong>temporarily pauses all collection efforts</strong> because paying would cause financial hardship. Your debt {"doesn't"} go away, but the IRS stops trying to collect. If the debt reaches its expiration date (CSED), {"it's"} gone forever.</p>
      </div>

      {/* MDI Warning */}
      {mdi > 0 && (
        <div style={{ background: '#FFFBEB', border: '1px solid #E8E8F0', borderRadius: 16, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: 'white', fontSize: 13 }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#92400E' }}>ELIGIBILITY CONCERN</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>Your MDI:</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#92400E' }}>{fmt(mdi)}<span style={{ fontSize: 12, fontWeight: 500 }}>/mo</span></span>
          </div>
          <div style={{ fontSize: 12, color: '#78350F', lineHeight: 1.5 }}>
            CNC typically requires $0 monthly disposable income. Your MDI of {fmt(mdi)} may disqualify you unless expenses increase or income drops.
          </div>
        </div>
      )}

      {/* What CNC Means */}
      <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>What CNC Means</div>
        {points.map((pt, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', fontSize: 13, lineHeight: 1.5 }}>
            <i className={`fa-solid ${pt.icon}`} style={{ fontSize: 14, color: pt.color, marginTop: 2, flexShrink: 0 }} />
            <span style={{ color: pt.bold ? '#1A1A2E' : '#5C5C7A', fontWeight: pt.bold ? 500 : 400 }}>{pt.text}</span>
          </div>
        ))}
      </div>

      {/* CSED Timeline */}
      <div style={{ background: 'white', border: '1px solid #E8E8F0', borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <i className="fa-solid fa-clock" style={{ color: '#0D9488', fontSize: 16 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>CSED Expiration Timeline</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5C5C7A', marginBottom: 6 }}>
          <span>Today (2026)</span>
          <span>Debts Expire (2028-2031)</span>
        </div>
        <div style={{ position: 'relative', background: '#FAFAFF', borderRadius: 12, padding: 4, height: 32, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 10, background: '#0D9488', transition: 'width 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)', width: csedAnimated ? '40%' : '0%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
            40% elapsed
          </div>
        </div>
        <div style={{ marginTop: 10, padding: 10, background: 'rgba(13,148,136,0.06)', borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: '#065F46', fontWeight: 600, lineHeight: 1.5 }}>
            <i className="fa-solid fa-sparkles" style={{ fontSize: 11, marginRight: 4 }} />
            If CNC is maintained: <strong>$0 paid</strong>, debt gone by 2031
          </div>
        </div>
      </div>

      {/* CNC vs OIC Decision */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>CNC vs OIC Decision</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'white', border: '1.5px solid rgba(13,148,136,0.2)', borderRadius: 14, padding: 14 }}>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0FDFA', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fa-solid fa-pause" style={{ color: '#0D9488', fontSize: 14 }} />
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', textAlign: 'center', marginBottom: 6 }}>CNC</div>
            <div style={{ fontSize: 11, color: '#5C5C7A', lineHeight: 1.5 }}>Pay nothing. Wait 2-5 years. Risk of annual review & revocation.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 700, color: '#B0B0C8' }}>vs</div>
          <div style={{ flex: 1, background: 'white', border: '1.5px solid rgba(0,166,81,0.2)', borderRadius: 14, padding: 14 }}>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E6F9EE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fa-solid fa-handshake" style={{ color: '#00A651', fontSize: 14 }} />
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', textAlign: 'center', marginBottom: 6 }}>OIC</div>
            <div style={{ fontSize: 11, color: '#5C5C7A', lineHeight: 1.5 }}>Pay {fmt(rcp)} now. Resolved in 6-12 months. Certainty.</div>
          </div>
        </div>
      </div>

      {/* Required Docs */}
      <div style={{ background: '#FAFAFF', border: '1px solid #F0F0F5', borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
          <i className="fa-solid fa-file-lines" style={{ fontSize: 10, marginRight: 4 }} /> Required Documentation
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { icon: 'fa-file', text: 'Form 433-F (Collection Info Statement)' },
            { icon: 'fa-building-columns', text: 'Bank statements (3 months)' },
            { icon: 'fa-receipt', text: 'Income proof (pay stubs, benefits letters)' },
          ].map(doc => (
            <div key={doc.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#1A1A2E' }}>
              <i className={`fa-solid ${doc.icon}`} style={{ color: '#2563EB', fontSize: 12 }} />
              <span style={{ fontWeight: 500 }}>{doc.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 4 }}>
        {mdi <= 0 ? (
          <button onClick={() => router.push('/forms/form-433f')} style={{ width: '100%', padding: '14px 28px', background: '#00A651', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Request CNC Status <i className="fa-solid fa-arrow-right" style={{ fontSize: 11 }} />
          </button>
        ) : (
          <>
            <button disabled style={{ width: '100%', padding: '14px 28px', background: 'white', color: '#5C5C7A', border: '1.5px solid #D5D5E0', borderRadius: 14, fontSize: 14, fontWeight: 600, opacity: 0.6, pointerEvents: 'none', marginBottom: 8 }}>
              <i className="fa-solid fa-ban" style={{ fontSize: 12, marginRight: 6 }} /> Not Eligible &mdash; Your MDI is {fmt(mdi)}
            </button>
            <div style={{ textAlign: 'center', marginTop: 6 }}>
              <button onClick={() => router.push('/analysis/detail/oic')} style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: 11, marginRight: 4 }} /> Consider OIC Instead
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Penalty Detail (29f)
// ---------------------------------------------------------------------------
function PenaltyDetail({ result }: { result: Record<string, unknown> }) {
  const router = useRouter()
  const totalDebt = (result.totalDebt as number) ?? 47250
  const penalties = (result.penalties as { taxYear: number; ftfAmount: number; ftpAmount: number; totalPenalties: number; ftaEligible: boolean }[]) ?? []
  const totalFTF = penalties.length > 0 ? penalties.reduce((s, p) => s + p.ftfAmount, 0) : 3200
  const totalFTP = penalties.length > 0 ? penalties.reduce((s, p) => s + p.ftpAmount, 0) : 2100
  const totalPen = totalFTF + totalFTP

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#00A651', marginBottom: 4 }}>Remove {fmt(totalPen)} in Penalties</h1>
        <p style={{ fontSize: '0.82rem', color: '#8585A0' }}>Eliminate IRS penalties from your balance</p>
      </div>

      {/* What is Penalty Abatement */}
      <div style={{ background: '#FFFBEB', borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(245,166,35,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-eraser" style={{ fontSize: 14, color: 'white' }} />
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>What is Penalty Abatement?</h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#2D2B3D', lineHeight: 1.6, margin: 0 }}><strong>Removing penalties</strong> the IRS added to your tax debt. If you had a good reason for filing late or paying late (like illness, disaster, or a clean prior record), the IRS may waive those penalties entirely.</p>
      </div>

      {/* Penalty Breakdown */}
      <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Your Penalty Breakdown</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
          <div style={{ minWidth: 100 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A2E' }}>Failure to File</div>
            <div style={{ fontSize: 10, color: '#5C5C7A' }}>TC 170</div>
          </div>
          <div style={{ flex: 1, height: 8, background: '#F0F0F5', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 4, width: '60%', background: '#E63946' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#E63946', minWidth: 50, textAlign: 'right' }}>{fmt(totalFTF)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
          <div style={{ minWidth: 100 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A2E' }}>Failure to Pay</div>
            <div style={{ fontSize: 10, color: '#5C5C7A' }}>TC 276</div>
          </div>
          <div style={{ flex: 1, height: 8, background: '#F0F0F5', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 4, width: '40%', background: '#F59E0B' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#F59E0B', minWidth: 50, textAlign: 'right' }}>{fmt(totalFTP)}</span>
        </div>
        <div style={{ borderTop: '2px solid #F0F0F5', marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>Total Penalties</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#E63946' }}>{fmt(totalPen)}</span>
        </div>
      </div>

      {/* FTA Eligibility */}
      <div style={{ background: 'white', border: '1.5px solid rgba(0,166,81,0.25)', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-shield-check" style={{ color: 'white', fontSize: 16 }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>FTA Eligibility</div>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, fontWeight: 700, background: '#E6F9EE', color: '#00A651', marginTop: 2, display: 'inline-block' }}>You Qualify!</span>
          </div>
        </div>
        {['No penalties in past 3 years (2022-2024 clean)', 'All returns filed', 'Current on payments/IA'].map(check => (
          <div key={check} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12 }}>
            <i className="fa-solid fa-circle-check" style={{ color: '#00A651', fontSize: 13 }} />
            <span style={{ color: '#1A1A2E', fontWeight: 500 }}>{check}</span>
          </div>
        ))}
        <div style={{ background: 'white', borderRadius: 12, padding: 14, textAlign: 'center', border: '1px solid rgba(0,166,81,0.15)', marginTop: 12 }}>
          <div style={{ fontSize: 12, color: '#5C5C7A', marginBottom: 4 }}>Estimated Savings</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#00A651', letterSpacing: '-0.02em' }}>{fmt(totalPen)}</div>
          <div style={{ fontSize: 11, color: '#065F46', fontWeight: 600 }}>100% of penalties removed</div>
        </div>
      </div>

      {/* How FTA Works */}
      <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>How FTA Works</div>
        {[
          { step: 1, title: 'Call IRS at 800-829-1040', desc: 'Or have your representative call on your behalf', green: false },
          { step: 2, title: 'Request First-Time Abatement', desc: 'Reference IRC \u00A7 6651 administrative waiver', green: false },
          { step: 3, title: 'TC 271 posts \u2014 penalties removed', desc: 'Usually processed same day by phone', green: false },
          { step: 4, title: `Balance drops to ${fmt(totalDebt - totalPen)}`, desc: `From ${fmt(totalDebt)} \u2192 ${fmt(totalDebt - totalPen)} (saved ${fmt(totalPen)})`, green: true },
        ].map((s) => (
          <div key={s.step} style={{ display: 'flex', gap: 14, padding: '12px 0', position: 'relative' }}>
            {s.step < 4 && <div style={{ position: 'absolute', left: 15, top: 42, bottom: 0, width: 2, background: '#F0F0F5' }} />}
            <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, background: s.green ? '#00A651' : '#1A1A2E', color: 'white', zIndex: 1 }}>{s.step}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{s.title}</div>
              <div style={{ fontSize: 11, color: '#5C5C7A', marginTop: 2 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Tip */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'white', border: '1.5px solid rgba(0,61,165,0.15)', borderRadius: 14, padding: 16 }}>
        <i className="fa-solid fa-chess-knight" style={{ color: '#2563EB', fontSize: 18 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>Pro Tip: Apply FTA BEFORE Filing an OIC</div>
          <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5 }}>Lower balance = lower RCP = lower offer amount. This is <strong style={{ color: '#2563EB' }}>&quot;Play A: Balance Reducer&quot;</strong> strategy.</div>
        </div>
      </div>

      {/* Reasonable Cause Backup */}
      <div style={{ background: '#FAFAFF', border: '1px solid #F0F0F5', borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <i className="fa-solid fa-shield-halved" style={{ color: '#5C5C7A', fontSize: 14 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>Reasonable Cause (Backup)</span>
        </div>
        <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5, marginBottom: 8 }}>If FTA is denied, try Reasonable Cause abatement. Qualifying reasons include:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['Serious illness or hospitalization', 'Natural disaster or casualty', 'Death of immediate family member', 'Inability to obtain records', 'IRS error or incorrect advice'].map(reason => (
            <div key={reason} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8585A0' }}>
              <i className="fa-solid fa-circle" style={{ fontSize: 4 }} /> {reason}
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 4 }}>
        <button onClick={() => router.push('/forms/form-843')} style={{ width: '100%', padding: '14px 28px', background: '#00A651', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
          Request FTA Now <i className="fa-solid fa-phone" style={{ fontSize: 12 }} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => router.push('/analysis/detail/oic')} style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fa-solid fa-chess" style={{ fontSize: 11, marginRight: 4 }} /> Use with OIC Strategy
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function DetailPage() {
  const params = useParams()
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as Record<string, unknown> | undefined
  const type = params.type as string

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFF] px-4">
        <h1 className="text-2xl font-extrabold text-[#1A1A2E]">No Results</h1>
        <p className="mt-2 text-sm text-[#5C5C7A]">Run your analysis first to see details.</p>
        <button onClick={() => router.push('/analysis/results')} className="mt-4 text-sm font-medium text-[#2563EB]">Back to Results</button>
      </div>
    )
  }

  const titles: Record<string, string> = {
    ia: 'Installment Agreement', oic: 'Offer in Compromise', cnc: 'Currently Not Collectible', penalty: 'Penalty Abatement',
  }

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, paddingBottom: 12 }}>
          <button onClick={() => router.push('/analysis/results')} style={{ width: 40, height: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, border: '1px solid #D5D5E0', background: 'white', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </button>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E' }}>{titles[type] ?? 'Resolution Detail'}</span>
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>

        {type === 'ia' && <IADetail result={result} />}
        {type === 'oic' && <OICDetail result={result} />}
        {type === 'cnc' && <CNCDetail result={result} />}
        {type === 'penalty' && <PenaltyDetail result={result} />}
      </div>
    </div>
  )
}
