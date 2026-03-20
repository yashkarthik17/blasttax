'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

function AccordionSection({ id, icon, iconBg, iconColor, title, subtitle, defaultOpen = false, children }: {
  id: string; icon: string; iconBg: string; iconColor: string; title: string; subtitle?: string; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: 'white', border: '1px solid #F3F4F6', borderRadius: '16px', overflow: 'hidden', marginBottom: '10px', transition: 'all 0.3s ease' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', width: '100%',
        cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', transition: 'background 0.2s ease',
      }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <i className={`fas ${icon}`} style={{ fontSize: '14px', color: iconColor }} />
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628' }}>{title}</div>
          {subtitle && <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{subtitle}</div>}
        </div>
        <i className="fas fa-chevron-down" style={{ fontSize: '11px', color: '#CBD5E1', transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && <div style={{ padding: '0 16px 14px' }}>{children}</div>}
    </div>
  )
}

export default function Form433BPage() {
  const router = useRouter()
  const { answers, caseId } = useWizard()

  const [businessType, setBusinessType] = useState(answers.businessType ?? 'LLC')
  const [arTotal, setArTotal] = useState('$8,500')
  const [grossReceipts, setGrossReceipts] = useState('$18,500')
  const [cogsAmount, setCogsAmount] = useState('$4,200')
  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-433b' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-433B-Business.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', background: '#F8FAFC', border: '1.5px solid #F3F4F6',
    borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: '#0A1628',
    outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s ease',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px', paddingBottom: '40px' }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Business Financial Information</div>
        <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.5 }}>Required for business tax debt resolutions</div>
      </div>

      {/* Business Info Card */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F3F4F6' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Business Details</div>

        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>Business Name</div>
          <input type="text" defaultValue="Doe's Consulting LLC" readOnly style={inputStyle} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>EIN</div>
          <div style={{ background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: '12px', padding: '12px 16px', position: 'relative' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628', letterSpacing: '0.04em' }}>**-***4321</span>
            <i className="fas fa-lock" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: '12px' }} />
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>Business Type</div>
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} style={{
            ...inputStyle,
            appearance: 'none' as const,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238585A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: '40px',
          }}>
            <option>Sole Proprietorship</option>
            <option>LLC</option>
            <option>S-Corp</option>
            <option>C-Corp</option>
            <option>Partnership</option>
          </select>
        </div>
      </div>

      {/* Accordion Sections */}
      <div>
        {/* Business Bank Accounts */}
        <AccordionSection id="acc-bank" icon="fa-university" iconBg="#EBF0FF" iconColor="#0A1628" title="Business Bank Accounts" defaultOpen>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0A1628' }}>Chase Business Checking</div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>****6789</div>
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0A1628' }}>$12,340</span>
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#EBF0FF', border: 'none', borderRadius: '9999px', fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 700, color: '#0A1628', cursor: 'pointer' }}>
            <i className="fas fa-plus" style={{ fontSize: '9px' }} /> Add Account
          </button>
        </AccordionSection>

        {/* Accounts Receivable */}
        <AccordionSection id="acc-receivable" icon="fa-file-invoice-dollar" iconBg="#E6F9EE" iconColor="#00A651" title="Accounts Receivable" subtitle="Total: $8,500">
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>Total Outstanding</div>
            <input type="text" value={arTotal} onChange={(e) => setArTotal(e.target.value)} placeholder="$0" style={inputStyle} />
          </div>
        </AccordionSection>

        {/* Business Assets */}
        <AccordionSection id="acc-assets" icon="fa-box" iconBg="#F5F0FF" iconColor="#7C3AED" title="Business Assets" subtitle="Equipment, inventory, vehicles">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
            {[{ label: 'Equipment', amount: '$15,000' }, { label: 'Inventory', amount: '$6,200' }, { label: 'Vehicles', amount: '$8,500' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#F8FAFC', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0A1628' }}>{item.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A1628' }}>{item.amount}</span>
              </div>
            ))}
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#EBF0FF', border: 'none', borderRadius: '9999px', fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 700, color: '#0A1628', cursor: 'pointer' }}>
              <i className="fas fa-plus" style={{ fontSize: '9px' }} /> Add Asset
            </button>
          </div>
        </AccordionSection>

        {/* Business Income */}
        <AccordionSection id="acc-income" icon="fa-chart-line" iconBg="#FFFBEB" iconColor="#D97706" title="Business Income" subtitle="Monthly gross receipts">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>Monthly Gross Receipts</div>
              <input type="text" value={grossReceipts} onChange={(e) => setGrossReceipts(e.target.value)} placeholder="$0" style={inputStyle} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>Cost of Goods Sold</div>
              <input type="text" value={cogsAmount} onChange={(e) => setCogsAmount(e.target.value)} placeholder="$0" style={inputStyle} />
            </div>
          </div>
        </AccordionSection>

        {/* Business Expenses */}
        <AccordionSection id="acc-expenses" icon="fa-receipt" iconBg="#FFF0F1" iconColor="#E63946" title="Business Expenses" subtitle="Rent, utilities, payroll, etc.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
            {[{ label: 'Rent', amount: '$3,200' }, { label: 'Utilities', amount: '$450' }, { label: 'Insurance', amount: '$380' }, { label: 'Payroll', amount: '$6,800' }, { label: 'Supplies', amount: '$920' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#F8FAFC', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0A1628' }}>{item.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A1628' }}>{item.amount}</span>
              </div>
            ))}
          </div>
        </AccordionSection>
      </div>

      {/* Net Business Income */}
      <div style={{ background: '#EBF0FF', borderRadius: '16px', padding: '16px', border: '1px solid rgba(0,61,165,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748B' }}>Net Business Income</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0A1628' }}>$2,550/mo</span>
        </div>
        <div style={{ height: '1px', background: 'rgba(0,61,165,0.1)', margin: '8px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748B' }}>Total Business Equity</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0A1628' }}>$29,700</span>
        </div>
      </div>

      {/* Continue Button */}
      <div style={{ paddingTop: '4px' }}>
        <button onClick={() => router.push('/forms/submission')} style={{
          width: '100%', padding: '16px', background: '#00A651', borderRadius: '9999px', textAlign: 'center',
          color: 'white', fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          Continue <i className="fas fa-arrow-right" style={{ marginLeft: '6px', fontSize: '12px' }} />
        </button>
      </div>
    </div>
  )
}
