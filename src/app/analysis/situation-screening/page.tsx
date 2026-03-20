'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface Specialty {
  id: string
  label: string
  description: string
  iconBg: string
  iconColor: string
  icon: string
}

const SPECIALTIES: Specialty[] = [
  { id: 'lien-levy', label: 'Tax Lien or Levy', description: 'Received notice of federal tax lien or bank levy', iconBg: '#FEF2F2', iconColor: '#E63946', icon: 'fa-solid fa-link-slash' },
  { id: 'military', label: 'Active-Duty Military', description: 'Currently serving or recently returned from deployment', iconBg: '#EFF4FF', iconColor: '#0A1628', icon: 'fa-solid fa-shield-halved' },
  { id: 'fbar', label: 'Foreign Bank Accounts', description: 'Accounts over $10,000 combined in foreign banks', iconBg: '#F0FDFA', iconColor: '#0D9488', icon: 'fa-solid fa-globe' },
  { id: 'deceased', label: 'Deceased Taxpayer', description: 'Handling tax matters for someone who has passed', iconBg: '#F1F5F9', iconColor: '#64748B', icon: 'fa-solid fa-scroll' },
  { id: 'sfr', label: 'IRS Filed My Return', description: 'IRS created a Substitute for Return (SFR)', iconBg: '#FFFBEB', iconColor: '#D97706', icon: 'fa-solid fa-file-circle-exclamation' },
  { id: 'passport', label: 'Passport Issue', description: 'Passport denied or revoked due to tax debt', iconBg: '#FFFBEB', iconColor: '#D97706', icon: 'fa-solid fa-passport' },
  { id: 'injured-spouse', label: 'Injured Spouse', description: 'Want to protect your refund from spouse\'s debt', iconBg: '#FDF2F8', iconColor: '#DB2777', icon: 'fa-solid fa-heart-crack' },
  { id: 'audit', label: 'Audited by IRS', description: 'Received an audit notice or disagreed with results', iconBg: '#FFFBEB', iconColor: '#D97706', icon: 'fa-solid fa-rotate-left' },
]

const toggleCardStyle = (isSelected: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  background: isSelected ? '#EFF4FF' : 'white',
  border: isSelected ? '1px solid #0A1628' : '1px solid #F3F4F6',
  borderRadius: 14,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
  boxShadow: isSelected ? '0 0 0 2px rgba(10, 22, 40, 0.06)' : 'none',
  width: '100%',
  textAlign: 'left' as const,
  fontFamily: 'inherit',
})

const cardIconStyle = (bg: string, color: string): React.CSSProperties => ({
  width: 40, height: 40, borderRadius: 10,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 16, flexShrink: 0,
  background: bg, color: color,
})

const cardCheckStyle = (isSelected: boolean): React.CSSProperties => ({
  width: 24, height: 24, borderRadius: '50%',
  background: '#0A1628',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
  opacity: isSelected ? 1 : 0,
  transform: isSelected ? 'scale(1)' : 'scale(0.5)',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
})

export default function SituationScreeningPage() {
  const router = useRouter()
  const { setAnswers } = useWizard()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [noneSelected, setNoneSelected] = useState(false)

  function toggleCard(id: string) {
    setNoneSelected(false)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function selectNone() {
    setSelected(new Set())
    setNoneSelected(true)
  }

  const canContinue = selected.size > 0 || noneSelected

  function handleContinue() {
    if (!canContinue) return
    setAnswers({ specialCircumstances: Array.from(selected), noneApply: noneSelected })
    router.push('/analysis/household')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '45%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>Step 3 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Special Circumstances</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 20px' }}>
          {/* Question */}
          <div style={{ marginBottom: 6 }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, letterSpacing: '-0.01em', margin: 0 }}>
              Do any of these apply to you?
            </h1>
          </div>

          {/* Context */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
              These help us find additional relief options. Select all that apply.
            </p>
          </div>

          {/* Toggle Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SPECIALTIES.map((spec) => {
              const isSelected = selected.has(spec.id)
              return (
                <button
                  key={spec.id}
                  onClick={() => toggleCard(spec.id)}
                  style={toggleCardStyle(isSelected)}
                >
                  <div style={cardIconStyle(spec.iconBg, spec.iconColor)}>
                    <i className={spec.icon} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', display: 'block', lineHeight: 1.3 }}>{spec.label}</span>
                    <span style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4 }}>{spec.description}</span>
                  </div>
                  <div style={cardCheckStyle(isSelected)}>
                    <i className="fa-solid fa-check" style={{ fontSize: 10, color: 'white' }} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* None of these apply */}
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button
              onClick={selectNone}
              style={{
                fontSize: 13, fontWeight: 600,
                color: noneSelected ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', transition: 'color 0.2s ease',
                background: 'none', border: 'none', fontFamily: 'inherit', padding: 0,
              }}
            >
              None of these apply
            </button>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Navigation Buttons */}
          <div style={{ padding: '16px 0 20px', display: 'flex', gap: 12 }}>
            <button
              onClick={() => router.back()}
              style={{
                width: 48, height: 48, borderRadius: 14,
                border: '1.5px solid #F1F5F9', background: 'white',
                color: '#64748B', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s ease', fontFamily: 'inherit',
              }}
            >
              <i className="fa-solid fa-arrow-left" style={{ fontSize: 14 }} />
            </button>
            <button
              onClick={handleContinue}
              style={{
                flex: 1,
                padding: '16px 28px',
                background: '#00A651',
                borderRadius: 9999,
                fontSize: 15, fontWeight: 700,
                color: 'white',
                border: 'none', cursor: canContinue ? 'pointer' : 'default',
                opacity: canContinue ? 1 : 0.5,
                pointerEvents: canContinue ? 'auto' : 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
