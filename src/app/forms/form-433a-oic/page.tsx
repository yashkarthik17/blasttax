'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Collapsible Section                                                 */
/* ------------------------------------------------------------------ */

function SectionCard({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  badge,
  rightLabel,
  rightLabelColor,
  defaultOpen = false,
  children,
}: {
  icon: string
  iconBg: string
  iconColor: string
  title: string
  subtitle?: string
  badge?: string
  rightLabel?: string
  rightLabelColor?: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: 18, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: 12 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className={`fas ${icon}`} style={{ fontSize: 12, color: iconColor }} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>{title}</div>
            {subtitle && <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>{subtitle}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {badge && <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#00A651' }}>{badge}</span>}
          {rightLabel && <span style={{ fontSize: '0.78rem', fontWeight: 700, color: rightLabelColor || '#1A1A2E' }}>{rightLabel}</span>}
          <i className="fas fa-chevron-down" style={{ fontSize: 10, color: '#B0B0C8', transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
      </div>
      {open && <div>{children}</div>}
    </div>
  )
}

function PrefilledField({ label, value, locked = true, letterSpacing }: { label: string; value: string; locked?: boolean; letterSpacing?: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>{label}</div>
      <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 12, padding: '12px 16px', position: 'relative' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', letterSpacing: letterSpacing }}>{value}</span>
        {locked && <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: 12 }} />}
      </div>
    </div>
  )
}

function ExpenseRow({ label, value, sub, bold, valueColor }: { label: string; value: string; sub?: string; bold?: boolean; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FAFAFF' }}>
      <div>
        <span style={{ fontSize: '0.78rem', fontWeight: bold ? 700 : 400, color: bold ? '#1A1A2E' : '#5C5C7A' }}>{label}</span>
        {sub && <div style={{ fontSize: '0.6rem', color: '#B0B0C8' }}>{sub}</div>}
      </div>
      <span style={{ fontSize: bold ? '0.82rem' : '0.78rem', fontWeight: bold ? 800 : (valueColor ? 600 : 700), color: valueColor || '#1A1A2E' }}>{value}</span>
    </div>
  )
}

function AssetRow({ name, detail, fmv, fmvColor, qsv }: { name: string; detail: string; fmv: string; fmvColor?: string; qsv: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #FAFAFF' }}>
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{name}</div>
        <div style={{ fontSize: '0.65rem', color: '#8585A0' }}>{detail}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: fmvColor || '#1A1A2E' }}>{fmv}</div>
        <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#FFFBEB', borderRadius: 9999, fontSize: '0.62rem', fontWeight: 700, color: '#92400E' }}>{qsv}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form433AOICPage() {
  const router = useRouter()
  const { answers } = useWizard()

  const [futureIncomeMultiplier, setFutureIncomeMultiplier] = useState<12 | 24>(12)
  const [hasDissipated, setHasDissipated] = useState(false)
  const [dissipatedDesc, setDissipatedDesc] = useState('')
  const [dissipatedValue, setDissipatedValue] = useState('')
  const [dissipatedDate, setDissipatedDate] = useState('')
  const [dissipatedTo, setDissipatedTo] = useState('')
  const [certify, setCertify] = useState(false)

  const mdi = 511
  const nre = 37250
  const futureIncome = mdi * futureIncomeMultiplier
  const rcpTotal = nre + futureIncome

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5',
    borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 8, paddingBottom: 20 }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Collection Information Statement</div>
        <div style={{ fontSize: '0.78rem', color: '#8585A0', marginTop: 4, lineHeight: 1.5 }}>IRS Form 433-A(OIC) &mdash; Required for your Offer in Compromise</div>
      </div>

      {/* Info banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#EBF0FF', border: '1px solid rgba(37,99,235,0.1)', borderRadius: 14 }}>
        <i className="fas fa-info-circle" style={{ fontSize: 13, color: '#2563EB', flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.75rem', color: '#1E40AF', lineHeight: 1.5 }}>
          We&apos;ve pre-filled this from your financial analysis. Review each section and confirm accuracy.
        </div>
      </div>

      {/* Section 1: Personal Information */}
      <SectionCard icon="fa-user" iconBg="#EFF4FF" iconColor="#2563EB" title="Section 1: Personal Information" subtitle="Pre-filled from profile" badge="COMPLETE">
        <PrefilledField label="Full Name" value="Jane M. Doe" />
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 1 }}><PrefilledField label="SSN" value="***-**-4589" letterSpacing="0.03em" /></div>
          <div style={{ flex: 1 }}><PrefilledField label="Date of Birth" value="04/15/1984" /></div>
        </div>
        <PrefilledField label="Address" value="1234 Elm Street, Austin, TX 78701" />
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}><PrefilledField label="Home Phone" value="(512) 555-0147" locked={false} /></div>
          <div style={{ flex: 1 }}><PrefilledField label="Cell Phone" value="(512) 555-0199" locked={false} /></div>
        </div>
      </SectionCard>

      {/* Section 2: Employment */}
      <SectionCard icon="fa-briefcase" iconBg="#F5F0FF" iconColor="#7C3AED" title="Section 2: Employment" subtitle="Current employer details" badge="COMPLETE">
        <PrefilledField label="Employer Name" value="Acme Technology Inc." locked={false} />
        <PrefilledField label="Employer Address" value="500 Tech Blvd, Austin, TX 78702" locked={false} />
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}><PrefilledField label="Occupation" value="Software Engineer" locked={false} /></div>
          <div style={{ flex: 1 }}><PrefilledField label="How Long Employed" value="3 years, 4 months" locked={false} /></div>
        </div>
      </SectionCard>

      {/* Section 3: Asset Summary */}
      <SectionCard icon="fa-piggy-bank" iconBg="#E6F9EE" iconColor="#00A651" title="Section 3: Asset Summary" subtitle="QSV calculations from Screen 27" rightLabel="$51,250" defaultOpen>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Bank Accounts</div>
        <AssetRow name="Chase Checking ****3421" detail="QSV = Actual Balance" fmv="$3,400" qsv="QSV $3,400" />
        <AssetRow name="Ally Savings ****7890" detail="QSV = Actual Balance" fmv="$800" qsv="QSV $800" />

        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '12px 0 8px' }}>Real Estate</div>
        <AssetRow name="Primary Residence" detail={`FMV $320K \u00D7 80% \u2212 $285K mtg \u2212 $20K HELOC`} fmv="-$49,000" fmvColor="#E63946" qsv="QSV $0" />

        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '12px 0 8px' }}>Vehicles</div>
        <AssetRow name="2020 Honda Civic" detail={`FMV $18.5K \u00D7 80% \u2212 $13.3K loan`} fmv="$1,500" qsv="QSV $1,500" />

        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '12px 0 8px' }}>Retirement Accounts</div>
        <AssetRow name="401(k) &mdash; Fidelity" detail="$42K - 10% penalty - ~25% tax (age 42)" fmv="$28,350" qsv="QSV $28,350" />

        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '12px 0 8px' }}>Life Insurance</div>
        <AssetRow name="Whole Life &mdash; Net CSV" detail="CSV $4,500 - $1,300 policy loans" fmv="$3,200" qsv="QSV $3,200" />

        {/* NRE Total */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#1A1A2E', borderRadius: 12, marginTop: 10 }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net Realizable Equity (NRE)</span>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: 'white' }}>$37,250</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: '0.68rem', color: '#8585A0' }}>
          <i className="fas fa-wand-magic-sparkles" style={{ fontSize: 9, color: '#2563EB' }} />
          Auto-calculated from Screen 27 asset data
        </div>
      </SectionCard>

      {/* Section 4: Monthly Income */}
      <SectionCard icon="fa-wallet" iconBg="#E6F9EE" iconColor="#00A651" title="Section 4: Monthly Income" subtitle="Per-person breakout" rightLabel="$5,200/mo" rightLabelColor="#00A651">
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Taxpayer &mdash; Jane Doe</div>
        <ExpenseRow label="Gross wages/salary" value="$6,250" />
        <ExpenseRow label="Federal tax withheld" value="-$625" valueColor="#E63946" />
        <ExpenseRow label="State tax withheld" value="$0" valueColor="#E63946" />
        <ExpenseRow label="FICA (Social Security + Medicare)" value="-$425" valueColor="#E63946" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: 'none' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>Net monthly income</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1A1A2E' }}>$5,200</span>
        </div>
      </SectionCard>

      {/* Section 5: Monthly Expenses */}
      <SectionCard icon="fa-receipt" iconBg="#FFF0F1" iconColor="#E63946" title="Section 5: Monthly Expenses" subtitle="IRS standards caps applied" rightLabel="$4,689/mo" rightLabelColor="#E63946">
        <ExpenseRow label="Food, clothing, misc" value="$785" sub="IRS cap: $785/mo" />
        <ExpenseRow label="Housing & utilities" value="$1,850" sub="IRS cap: $2,138/mo" />
        <ExpenseRow label="Transportation (ownership)" value="$662" />
        <ExpenseRow label="Transportation (operating)" value="$294" />
        <ExpenseRow label="Healthcare" value="$84" sub="Under 65: $84/person" />
        <ExpenseRow label="Health insurance" value="$450" />
        <ExpenseRow label="Court-ordered payments" value="$0" />
        <ExpenseRow label="Child/dependent care" value="$564" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFF', borderRadius: 10, marginTop: 4 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>Total allowable expenses</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E63946' }}>$4,689</span>
        </div>
      </SectionCard>

      {/* Section 6: Monthly Disposable Income */}
      <div style={{ background: 'white', borderRadius: 16, padding: 18, border: '1.5px solid #E6F9EE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-calculator" style={{ fontSize: 12, color: '#00A651' }} />
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Section 6: Monthly Disposable Income</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFAFF', borderRadius: 10, marginBottom: 6 }}>
          <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Net monthly income</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>$5,200</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFAFF', borderRadius: 10, marginBottom: 6 }}>
          <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Total allowable expenses</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#E63946' }}>-$4,689</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: '#E6F9EE', borderRadius: 10 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Monthly Disposable Income (MDI)</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#00A651' }}>$511</span>
        </div>
      </div>

      {/* Section 7: Future Income */}
      <div style={{ background: 'white', borderRadius: 16, padding: 18, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-chart-line" style={{ fontSize: 12, color: '#2563EB' }} />
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Section 7: Future Income</div>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {([12, 24] as const).map((months) => (
            <button
              key={months}
              type="button"
              onClick={() => setFutureIncomeMultiplier(months)}
              style={{
                flex: 1, display: 'flex', gap: 10, padding: 14,
                background: futureIncomeMultiplier === months ? '#EBF0FF' : 'white',
                border: futureIncomeMultiplier === months ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0',
                borderRadius: 14, cursor: 'pointer', textAlign: 'left' as const,
                boxShadow: futureIncomeMultiplier === months ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: 20, height: 20, border: `2px solid ${futureIncomeMultiplier === months ? '#1A1A2E' : '#D5D5E0'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 1, background: futureIncomeMultiplier === months ? '#1A1A2E' : 'transparent', transition: 'all 0.3s ease',
              }}>
                {futureIncomeMultiplier === months && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A2E' }}>{months === 12 ? 'Lump Sum' : 'Periodic'}</div>
                <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>MDI &times; {months} months</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFAFF', borderRadius: 10, marginBottom: 6 }}>
          <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>MDI</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>$511</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFAFF', borderRadius: 10, marginBottom: 6 }}>
          <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Multiplier</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>&times; {futureIncomeMultiplier} months</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: '#EBF0FF', borderRadius: 10 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Future Income</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#2563EB' }}>${futureIncome.toLocaleString()}</span>
        </div>
      </div>

      {/* Section 8: Dissipated Assets */}
      <div style={{ background: 'white', borderRadius: 16, padding: 18, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-triangle-exclamation" style={{ fontSize: 12, color: '#D97706' }} />
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Section 8: Dissipated Assets</div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#5C5C7A', lineHeight: 1.5, marginBottom: 12 }}>
          Have you transferred, sold, or gifted any assets worth $1,000+ in the past 12 months?
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <button
            type="button"
            onClick={() => setHasDissipated(true)}
            style={{
              flex: 1, textAlign: 'center', padding: 12, background: hasDissipated ? '#EBF0FF' : 'white',
              border: hasDissipated ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0', borderRadius: 12, cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E',
              boxShadow: hasDissipated ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >Yes</button>
          <button
            type="button"
            onClick={() => setHasDissipated(false)}
            style={{
              flex: 1, textAlign: 'center', padding: 12, background: !hasDissipated ? '#EBF0FF' : 'white',
              border: !hasDissipated ? '1.5px solid #1A1A2E' : '1.5px solid #E8E8F0', borderRadius: 12, cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E',
              boxShadow: !hasDissipated ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >No</button>
        </div>
        {hasDissipated && (
          <div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Description of Asset</div>
              <input type="text" style={fieldInputStyle} placeholder="e.g., Sold 2018 Toyota Camry" value={dissipatedDesc} onChange={(e) => setDissipatedDesc(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Value / Sale Price</div>
                <input type="text" style={fieldInputStyle} placeholder="$0" value={dissipatedValue} onChange={(e) => setDissipatedValue(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Date</div>
                <input type="date" style={fieldInputStyle} value={dissipatedDate} onChange={(e) => setDissipatedDate(e.target.value)} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Transferred To / Buyer</div>
              <input type="text" style={fieldInputStyle} placeholder="Name of recipient" value={dissipatedTo} onChange={(e) => setDissipatedTo(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section 9: Total RCP */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #1E3A5F 100%)', borderRadius: 16, padding: 20, color: 'white' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Section 9: Reasonable Collection Potential</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>Net Realizable Equity (NRE)</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white' }}>${nre.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>Future Income ({futureIncomeMultiplier === 12 ? 'Lump Sum' : 'Periodic'})</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white' }}>${futureIncome.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: 4 }}>
          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'white' }}>Total RCP</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#00A651' }}>${rcpTotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '10px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
          <i className="fas fa-lightbulb" style={{ fontSize: 10, color: '#F59E0B' }} />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>Your minimum OIC offer must be &ge; ${rcpTotal.toLocaleString()}. The IRS will reject any offer below your RCP.</span>
        </div>
      </div>

      {/* Signature Section */}
      <div style={{ background: 'white', borderRadius: 16, padding: 18, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-signature" style={{ fontSize: 12, color: '#7C3AED' }} />
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Signature &amp; Certification</div>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#5C5C7A', lineHeight: 1.6, marginBottom: 14 }}>
          Under penalties of perjury, I declare that I have examined this statement and, to the best of my knowledge and belief, it is true, correct, and complete.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <input type="checkbox" checked={certify} onChange={(e) => setCertify(e.target.checked)} style={{ width: 20, height: 20, accentColor: '#1A1A2E', flexShrink: 0 }} />
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E', cursor: 'pointer' }}>I certify this information is accurate</label>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Taxpayer Signature</div>
            <div style={{ height: 48, background: '#FAFAFF', border: '1.5px dashed #B0B0C8', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#B0B0C8' }}>Tap to sign</span>
            </div>
          </div>
          <div style={{ width: 100 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>Date</div>
            <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: 10, padding: '10px 12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>03/17/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
        <button
          onClick={() => router.push('/forms/form-656a')}
          style={{
            padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white',
            fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Continue <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
        </button>
        <button
          style={{
            padding: 12, textAlign: 'center', color: '#8585A0', fontSize: '0.82rem', fontWeight: 600,
            background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <i className="fas fa-bookmark" style={{ marginRight: 6, fontSize: 11 }} /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
