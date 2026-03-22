'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface TaxYearEntry {
  id: string; taxYear: string; balance: string; taxForm: string; filingStatus: string
  assessmentDate: string; lastPaymentDate: string; isSfr: boolean; assessmentType: string
  totalPenalty?: string; interest?: string; ftfPenalty?: string; ftpPenalty?: string; accuracyPenalty?: string
}

function parseMoney(s: string): number {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}
function formatCurrency(v: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v)
}
function formatDate(d: string): string {
  if (!d) return '--'
  const date = new Date(d + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
}
function csedDate(assessDate: string): string {
  if (!assessDate) return '--'
  const d = new Date(assessDate + 'T00:00:00')
  d.setFullYear(d.getFullYear() + 10)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const accordionIconStyle = (bg: string, color: string): React.CSSProperties => ({
  width: 36, height: 36, borderRadius: 10,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14, flexShrink: 0,
  background: bg, color: color,
})

const infoRowStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '8px 0', fontSize: 13,
}

function Accordion({ icon, iconBg, iconColor, title, subtitle, editLabel, onEdit, defaultOpen, children }: {
  icon: string; iconBg: string; iconColor: string; title: string; subtitle: string
  editLabel?: string; onEdit?: () => void; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: 16, overflow: 'hidden', marginBottom: 10 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', transition: 'background 0.2s ease', userSelect: 'none' }}
      >
        <div style={accordionIconStyle(iconBg, iconColor)}>
          <i className={icon} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#8585A0', marginTop: 1 }}>{subtitle}</div>
        </div>
        {editLabel && onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit() }}
            style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', padding: '4px 0' }}
          >
            {editLabel}
          </button>
        )}
        <i className="fa-solid fa-chevron-down" style={{ color: '#B0B0C8', fontSize: 12, transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
      </div>
      <div style={{ maxHeight: open ? 800 : 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid #F0F0F5' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, valueColor, valueStyle }: { label: string; value: string | React.ReactNode; valueColor?: string; valueStyle?: React.CSSProperties }) {
  return (
    <div style={{ ...infoRowStyle, borderBottom: '1px solid #F0F0F5' }}>
      <span style={{ color: '#8585A0', fontWeight: 500 }}>{label}</span>
      <span style={{ color: valueColor ?? '#1A1A2E', fontWeight: 600, ...valueStyle }}>{value}</span>
    </div>
  )
}

export default function CaseReviewPage() {
  const router = useRouter()
  const { answers } = useWizard()
  const personalInfo = answers.personalInfo as Record<string, string> | undefined
  const entries = (answers.taxDebts as TaxYearEntry[]) ?? []
  const sorted = [...entries].sort((a, b) => Number(a.taxYear) - Number(b.taxYear))
  const totalBalance = entries.reduce((sum, e) => sum + parseMoney(e.balance), 0)

  function handleRunAnalysis() {
    router.push('/analysis/assets/bank-accounts')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#D5D5E0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '45%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 20px' }}>
          {/* Heading */}
          <div style={{ marginBottom: 6 }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25, margin: 0 }}>Review Your Information</h1>
            <p style={{ fontSize: 13, color: '#8585A0', marginTop: 4, lineHeight: 1.5, margin: '4px 0 0' }}>Make sure everything is accurate before we run your analysis</p>
          </div>

          {/* Personal Information */}
          <Accordion
            icon="fa-solid fa-user"
            iconBg="#EFF4FF"
            iconColor="#2563EB"
            title="Personal Information"
            subtitle="Name, SSN, Filing Status"
            editLabel="Edit"
            onEdit={() => router.push('/analysis/personal-info')}
            defaultOpen={true}
          >
            <InfoRow label="Name" value={personalInfo ? `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || '--' : '--'} />
            <InfoRow label="SSN" value={personalInfo?.ssn ? `***-**-${personalInfo.ssn.slice(-4)}` : '--'} />
            <InfoRow label="Date of Birth" value={personalInfo?.dob ? formatDate(personalInfo.dob) : '--'} />
            <InfoRow label="Filing Status" value="Single" />
            <InfoRow label="Address" value={personalInfo ? `${personalInfo.street || ''}, ${personalInfo.city || ''}, ${personalInfo.state || ''}`.replace(/^, /, '').replace(/, $/, '') || '--' : '--'} valueStyle={{ textAlign: 'right', maxWidth: '55%' }} />
          </Accordion>

          {/* Tax Debt Summary */}
          <Accordion
            icon="fa-solid fa-file-invoice-dollar"
            iconBg="#FFF0F1"
            iconColor="#E63946"
            title="Tax Debt Summary"
            subtitle={`${entries.length} year${entries.length !== 1 ? 's' : ''} \u00B7 ${formatCurrency(totalBalance)} total`}
            editLabel="Edit"
            onEdit={() => router.push('/analysis/case-info')}
          >
            <div style={{ paddingTop: 10 }}>
              {sorted.map((entry) => (
                <div key={entry.id} style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: 14, padding: 14, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E' }}>{entry.taxYear || '--'}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: '#8585A0', background: '#FAFAFF', padding: '2px 6px', borderRadius: 4 }}>
                        {entry.taxForm} &middot; {entry.filingStatus}
                      </span>
                    </div>
                    <button onClick={() => router.push('/analysis/case-info')} style={{ fontSize: 11, fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <i className="fa-solid fa-pen" style={{ fontSize: 9 }} /> Edit
                    </button>
                  </div>
                  <InfoRow label="Balance" value={parseMoney(entry.balance) > 0 ? formatCurrency(parseMoney(entry.balance)) : '--'} valueColor="#E63946" />
                  <InfoRow label="Assessment Date" value={formatDate(entry.assessmentDate)} />
                  <InfoRow
                    label="CSED Expiration"
                    value={
                      entry.assessmentDate ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: '#EFF4FF', color: '#1A1A2E' }}>
                          <i className="fa-solid fa-hourglass-half" style={{ fontSize: 8 }} /> {csedDate(entry.assessmentDate)}
                        </span>
                      ) : '--'
                    }
                  />
                  <InfoRow label="Assessment" value={entry.assessmentType || 'Self-assessed'} />
                  {(entry.ftfPenalty || entry.ftpPenalty || entry.accuracyPenalty) && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                      {entry.ftfPenalty && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', background: '#FAFAFF', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#5C5C7A' }}>FTF: {entry.ftfPenalty}</span>}
                      {entry.ftpPenalty && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', background: '#FAFAFF', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#5C5C7A' }}>FTP: {entry.ftpPenalty}</span>}
                      {entry.accuracyPenalty && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', background: '#FAFAFF', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#5C5C7A' }}>Accuracy: {entry.accuracyPenalty}</span>}
                    </div>
                  )}
                </div>
              ))}
              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #F0F0F5', marginTop: 4, paddingTop: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>Total</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#E63946' }}>{formatCurrency(totalBalance)}</span>
              </div>
            </div>
          </Accordion>

          {/* Screening Results */}
          <Accordion
            icon="fa-solid fa-clipboard-check"
            iconBg="#E6F9EE"
            iconColor="#00A651"
            title="Screening Results"
            subtitle="5 passed \u00B7 1 warning"
            editLabel="View"
            onEdit={() => router.push('/analysis/screening-result')}
          >
            {[
              { label: 'All returns filed', pass: true },
              { label: 'No active bankruptcy', pass: true },
              { label: 'No open audit', pass: true },
              { label: 'Current estimated payments', pass: true },
              { label: 'Debt over $10,000', pass: true },
              { label: 'CSED within 24 months on 1 year', pass: false },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, flexShrink: 0,
                  background: item.pass ? '#E6F9EE' : '#FEF3C7',
                  color: item.pass ? '#00A651' : '#F59E0B',
                }}>
                  <i className={item.pass ? 'fa-solid fa-check' : 'fa-solid fa-exclamation'} />
                </div>
                <span style={{ color: '#1A1A2E', fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </Accordion>

          {/* Household */}
          <Accordion
            icon="fa-solid fa-house-user"
            iconBg="#F5F0FF"
            iconColor="#7C3AED"
            title="Household"
            subtitle={`${(answers.household as Record<string, number>)?.memberCount ?? 1} member${((answers.household as Record<string, number>)?.memberCount ?? 1) !== 1 ? 's' : ''} \u00B7 ${(answers.household as Record<string, number>)?.vehicleCount ?? 0} vehicle${((answers.household as Record<string, number>)?.vehicleCount ?? 0) !== 1 ? 's' : ''}`}
            editLabel="Edit"
            onEdit={() => router.push('/analysis/household')}
          >
            <InfoRow label="Members" value={String((answers.household as Record<string, number>)?.memberCount ?? '--')} />
            <InfoRow label="Vehicles" value={String((answers.household as Record<string, number>)?.vehicleCount ?? '--')} />
            <InfoRow label="County" value={(answers.household as Record<string, string>)?.county ? `${(answers.household as Record<string, string>).county}, ${(answers.household as Record<string, string>).state}` : '--'} />
          </Accordion>

          {/* Penalties */}
          <Accordion
            icon="fa-solid fa-shield-halved"
            iconBg="#E6F9EE"
            iconColor="#00A651"
            title="Penalties"
            subtitle="FTA eligible \u00B7 $5,300 savings"
            editLabel="View"
          >
            <InfoRow label="FTA Eligible" value={<span style={{ display: 'inline-block', padding: '2px 8px', background: '#E6F9EE', color: '#00A651', borderRadius: 9999, fontSize: 10, fontWeight: 700 }}>Qualified</span>} />
            <InfoRow label="Potential Savings" value="$5,300" valueColor="#00A651" />
            <InfoRow label="Total Penalties" value="$6,100" />
          </Accordion>

          {/* Spacer */}
          <div style={{ flex: 1, minHeight: 16 }} />

          {/* Actions */}
          <div style={{ padding: '8px 0 20px' }}>
            <button
              onClick={handleRunAnalysis}
              style={{ width: '100%', padding: '16px 28px', background: '#00A651', borderRadius: 9999, fontSize: 15, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <i className="fa-solid fa-bolt" style={{ fontSize: 14 }} />
              Run Analysis
            </button>
            <button
              onClick={() => router.push('/analysis/case-info')}
              style={{ width: '100%', padding: '14px 24px', background: 'white', border: '1px solid #D5D5E0', borderRadius: 9999, fontSize: 14, fontWeight: 600, color: '#1A1A2E', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <i className="fa-solid fa-pen" style={{ fontSize: 12 }} />
              Edit Information
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
