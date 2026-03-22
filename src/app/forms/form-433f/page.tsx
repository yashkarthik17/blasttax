'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

function SectionCard({ icon, iconBg, iconColor, title, subtitle, badge, badgeColor, rightLabel, rightLabelColor, defaultOpen = false, children }: {
  icon: string; iconBg: string; iconColor: string; title: string; subtitle?: string;
  badge?: string; badgeColor?: string; rightLabel?: string; rightLabelColor?: string;
  defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer', paddingBottom: '12px', background: 'none', border: 'none', fontFamily: 'inherit' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className={`fas ${icon}`} style={{ fontSize: '12px', color: iconColor }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>{title}</div>
            {subtitle && <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>{subtitle}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {badge && <span style={{ display: 'inline-flex', padding: '2px 8px', background: badgeColor || '#E6F9EE', borderRadius: '9999px', fontSize: '0.58rem', fontWeight: 700, color: '#00A651' }}>{badge}</span>}
          {rightLabel && <span style={{ fontSize: '0.78rem', fontWeight: 700, color: rightLabelColor || '#1A1A2E' }}>{rightLabel}</span>}
          <i className={`fas fa-chevron-down`} style={{ transition: 'transform 0.3s ease', fontSize: '10px', color: '#B0B0C8', transform: open ? 'rotate(180deg)' : 'none' }} />
        </div>
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function ExpenseRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FAFAFF' }}>
      <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>{label}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '90px', textAlign: 'right', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
    </div>
  )
}

export default function Form433FPage() {
  const { answers, caseId } = useWizard()

  const [employerName, setEmployerName] = useState('Acme Technology Inc.')
  const [grossIncome, setGrossIncome] = useState('$6,250')
  const [netIncome, setNetIncome] = useState('$5,200')
  const [expenses, setExpenses] = useState({ food: '$785', rent: '$1,850', utilities: '$288', transport: '$956', health: '$534', court: '$0', child: '$564' })
  const [otherIncome, setOtherIncome] = useState({ ss: '$0', pension: '$0', childSupport: '$0', rental: '$0', other: '$0' })
  const [generating, setGenerating] = useState(false)

  async function handleGenerate() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-433f' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-433F-Collection-Info.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '8px', paddingBottom: '20px' }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Collection Information Statement</div>
        <div style={{ fontSize: '0.78rem', color: '#8585A0', marginTop: '4px', lineHeight: 1.5 }}>IRS Form 433-F &mdash; Simplified Financial Disclosure</div>
      </div>

      {/* CNC Banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#EBF0FF', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '14px' }}>
        <i className="fas fa-info-circle" style={{ fontSize: '13px', color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.75rem', color: '#1E40AF', lineHeight: 1.5 }}>
          <strong>This form is used for CNC (Currently Not Collectible) requests</strong> and some Installment Agreement types. It collects fewer details than Form 433-A.
        </div>
      </div>

      {/* Section 1: Personal Info */}
      <SectionCard icon="fa-user" iconBg="#EFF4FF" iconColor="#2563EB" title="Section 1: Personal Info" badge="COMPLETE">
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Full Name</div>
          <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: '12px', padding: '12px 16px', position: 'relative' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Jane M. Doe</span>
            <i className="fas fa-lock" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: '12px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>SSN</div>
            <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: '12px', padding: '12px 16px', position: 'relative' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.03em' }}>***-**-4589</span>
              <i className="fas fa-lock" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: '12px' }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Phone</div>
            <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: '12px', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>(512) 555-0199</span>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Address</div>
          <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: '12px', padding: '12px 16px', position: 'relative' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>1234 Elm Street, Austin, TX 78701</span>
            <i className="fas fa-lock" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#B0B0C8', fontSize: '12px' }} />
          </div>
        </div>
      </SectionCard>

      {/* Section 2: Bank Accounts */}
      <SectionCard icon="fa-piggy-bank" iconBg="#E6F9EE" iconColor="#00A651" title="Section 2: Bank Accounts" subtitle="2 accounts" rightLabel="$4,200" defaultOpen>
        {[{ name: 'Chase Checking', bal: '$3,400', bankName: 'Chase Bank' }, { name: 'Ally Savings', bal: '$800', bankName: 'Ally Bank' }].map((acc, i) => (
          <div key={i} style={{ background: '#FAFAFF', borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{acc.name}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>{acc.bal}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Bank Name</div>
                <input type="text" defaultValue={acc.bankName} style={{ width: '100%', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Balance</div>
                <input type="text" defaultValue={acc.bal} style={{ width: '100%', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', textAlign: 'right', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
        ))}
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#EFF4FF', color: '#1A1A2E', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><i className="fa-solid fa-plus" style={{ fontSize: '10px' }} /> Add Account</button>
      </SectionCard>

      {/* Section 3: Other Assets */}
      <SectionCard icon="fa-house" iconBg="#F5F0FF" iconColor="#7C3AED" title="Section 3: Other Assets" subtitle="Real estate & vehicles">
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Real Estate</div>
        <div style={{ background: '#FAFAFF', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '8px' }}>Primary Residence</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Fair Market Value</div>
              <input type="text" defaultValue="$320,000" style={{ width: '100%', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Loan Balance</div>
              <input type="text" defaultValue="$305,000" style={{ width: '100%', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFFBEB', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#92400E' }}>Equity</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#92400E' }}>$15,000</span>
          </div>
        </div>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Vehicles</div>
        <div style={{ background: '#FAFAFF', borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '8px' }}>2020 Honda Civic</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Fair Market Value</div>
              <input type="text" defaultValue="$18,500" style={{ width: '100%', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Loan Balance</div>
              <input type="text" defaultValue="$13,300" style={{ width: '100%', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFFBEB', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#92400E' }}>Equity</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#92400E' }}>$5,200</span>
          </div>
        </div>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#EFF4FF', color: '#1A1A2E', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><i className="fa-solid fa-plus" style={{ fontSize: '10px' }} /> Add Asset</button>
      </SectionCard>

      {/* Section 4: Employment */}
      <SectionCard icon="fa-briefcase" iconBg="#FEF3C7" iconColor="#D97706" title="Section 4: Employment" rightLabel="$6,250/mo" rightLabelColor="#00A651">
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Employer Name</div>
          <input type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Gross Monthly Income</div>
            <input type="text" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Net Monthly Income</div>
            <input type="text" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
      </SectionCard>

      {/* Section 5: Other Income */}
      <SectionCard icon="fa-hand-holding-dollar" iconBg="#F0FDFA" iconColor="#0D9488" title="Section 5: Other Income" rightLabel="$0/mo" rightLabelColor="#8585A0">
        <ExpenseRow label="Social Security" value={otherIncome.ss} onChange={(v) => setOtherIncome({...otherIncome, ss: v})} />
        <ExpenseRow label="Pension" value={otherIncome.pension} onChange={(v) => setOtherIncome({...otherIncome, pension: v})} />
        <ExpenseRow label="Child support received" value={otherIncome.childSupport} onChange={(v) => setOtherIncome({...otherIncome, childSupport: v})} />
        <ExpenseRow label="Rental income" value={otherIncome.rental} onChange={(v) => setOtherIncome({...otherIncome, rental: v})} />
        <ExpenseRow label="Other" value={otherIncome.other} onChange={(v) => setOtherIncome({...otherIncome, other: v})} />
      </SectionCard>

      {/* Section 6: Monthly Expenses */}
      <SectionCard icon="fa-receipt" iconBg="#FFF0F1" iconColor="#E63946" title="Section 6: Monthly Expenses" subtitle="Simplified categories" rightLabel="$4,689/mo" rightLabelColor="#E63946">
        <ExpenseRow label="Food & clothing" value={expenses.food} onChange={(v) => setExpenses({...expenses, food: v})} />
        <ExpenseRow label="Rent / mortgage" value={expenses.rent} onChange={(v) => setExpenses({...expenses, rent: v})} />
        <ExpenseRow label="Utilities" value={expenses.utilities} onChange={(v) => setExpenses({...expenses, utilities: v})} />
        <ExpenseRow label="Transportation" value={expenses.transport} onChange={(v) => setExpenses({...expenses, transport: v})} />
        <ExpenseRow label="Healthcare / insurance" value={expenses.health} onChange={(v) => setExpenses({...expenses, health: v})} />
        <ExpenseRow label="Court-ordered payments" value={expenses.court} onChange={(v) => setExpenses({...expenses, court: v})} />
        <ExpenseRow label="Child / dependent care" value={expenses.child} onChange={(v) => setExpenses({...expenses, child: v})} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'none', padding: '10px 12px', background: '#FAFAFF', borderRadius: '10px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>Total monthly expenses</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E63946' }}>$4,977</span>
        </div>
      </SectionCard>

      {/* Section 7: Monthly Disposable Income */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1.5px solid #E6F9EE', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-calculator" style={{ fontSize: '12px', color: '#00A651' }} />
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Section 7: Monthly Disposable Income</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFAFF', borderRadius: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Total monthly income</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>$5,200</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFAFF', borderRadius: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Total monthly expenses</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#E63946' }}>-$4,977</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: '#E6F9EE', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Monthly Disposable Income</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#00A651' }}>$223</span>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: '#FFFBEB', border: '1px solid rgba(245,166,35,0.15)', borderRadius: '10px' }}>
          <i className="fas fa-info-circle" style={{ fontSize: '11px', color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.72rem', color: '#92400E', lineHeight: 1.5 }}>
            <strong>CNC Indicator:</strong> If your MDI is $0 or negative, you likely qualify for Currently Not Collectible status. The IRS may also approve CNC with a small positive MDI if hardship is demonstrated.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
        <button onClick={handleGenerate} disabled={generating} style={{
          padding: '16px', background: '#00A651', borderRadius: '9999px', textAlign: 'center', color: 'white',
          fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', border: 'none',
          cursor: generating ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: generating ? 0.5 : 1,
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          {generating ? 'Generating...' : 'Generate Form 433-F'} {!generating && <i className="fas fa-file-export" style={{ marginLeft: '6px', fontSize: '12px' }} />}
        </button>
        <button style={{ padding: '12px', textAlign: 'center', color: '#8585A0', fontSize: '0.82rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          <i className="fas fa-bookmark" style={{ marginRight: '6px', fontSize: '11px' }} /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
