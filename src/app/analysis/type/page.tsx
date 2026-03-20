'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

type EntityType = 'individual' | 'business' | 'both'
type DepthType = 'full' | 'quick' | 'penalty' | 'csed'

export default function AnalysisTypePage() {
  const router = useRouter()
  const setTaxpayerType = useWizard((s) => s.setTaxpayerType)
  const setAnswer = useWizard((s) => s.setAnswer)

  const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(null)
  const [selectedDepth, setSelectedDepth] = useState<DepthType | null>(null)
  const [showDepth, setShowDepth] = useState(false)

  function selectEntity(type: EntityType) {
    setSelectedEntity(type)
    if (!showDepth) setShowDepth(true)
  }

  function selectDepth(type: DepthType) {
    setSelectedDepth(type)
  }

  function handleContinue() {
    if (!selectedEntity || !selectedDepth) return
    const tp = selectedEntity === 'business' ? 'Business' : 'Individual'
    setTaxpayerType(tp)
    setAnswer('entityType', selectedEntity)
    setAnswer('analysisDepth', selectedDepth)
    router.push('/analysis/welcome')
  }

  const canContinue = selectedEntity !== null && selectedDepth !== null

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer',
              color: '#0A1628', fontSize: 16,
            }}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#0A1628' }}>New Analysis</span>
          <div style={{ width: 40 }} />
        </div>

        {/* Content */}
        <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Heading */}
          <div style={{ padding: '4px 0 20px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 6 }}>
              What type of tax debt?
            </h1>
            <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
              This determines which resolution paths we evaluate
            </p>
          </div>

          {/* Entity Type Selection */}
          <div>
            {/* Individual */}
            <button
              onClick={() => selectEntity('individual')}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px',
                background: selectedEntity === 'individual' ? '#EFF4FF' : 'white',
                border: `2px solid ${selectedEntity === 'individual' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 16, cursor: 'pointer', width: '100%', textAlign: 'left',
                position: 'relative', overflow: 'hidden',
                boxShadow: selectedEntity === 'individual' ? '0 0 0 2px rgba(10,22,40,0.08)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, flexShrink: 0, color: 'white', background: '#0A1628',
              }}>
                <i className="fa-solid fa-user" />
              </div>
              <div style={{ flex: 1, paddingRight: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 3 }}>Individual (1040)</div>
                <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>Personal income tax debt</div>
              </div>
              <div style={{
                width: 22, height: 22, border: `2px solid ${selectedEntity === 'individual' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedEntity === 'individual' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedEntity === 'individual' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
              {/* Most Common badge */}
              <div style={{
                position: 'absolute', top: -1, right: 16, background: '#0A1628', color: 'white',
                fontSize: 9, fontWeight: 700, padding: '3px 10px 4px', borderRadius: '0 0 8px 8px',
                letterSpacing: '0.04em', textTransform: 'uppercase' as const,
              }}>
                Most Common
              </div>
            </button>

            {/* Business */}
            <button
              onClick={() => selectEntity('business')}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px',
                background: selectedEntity === 'business' ? '#EFF4FF' : 'white',
                border: `2px solid ${selectedEntity === 'business' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 16, cursor: 'pointer', width: '100%', textAlign: 'left',
                marginTop: 10,
                boxShadow: selectedEntity === 'business' ? '0 0 0 2px rgba(10,22,40,0.08)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, flexShrink: 0, color: 'white', background: '#0D9488',
              }}>
                <i className="fa-solid fa-building" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 3 }}>Business (941/940)</div>
                <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>Payroll tax / employment tax</div>
              </div>
              <div style={{
                width: 22, height: 22, border: `2px solid ${selectedEntity === 'business' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedEntity === 'business' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedEntity === 'business' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
            </button>

            {/* Both */}
            <button
              onClick={() => selectEntity('both')}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px',
                background: selectedEntity === 'both' ? '#EFF4FF' : 'white',
                border: `2px solid ${selectedEntity === 'both' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 16, cursor: 'pointer', width: '100%', textAlign: 'left',
                marginTop: 10,
                boxShadow: selectedEntity === 'both' ? '0 0 0 2px rgba(10,22,40,0.08)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, flexShrink: 0, color: 'white', background: '#7C3AED',
              }}>
                <i className="fa-solid fa-users" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 3 }}>Both Individual & Business</div>
                <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>I have both types of debt</div>
              </div>
              <div style={{
                width: 22, height: 22, border: `2px solid ${selectedEntity === 'both' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedEntity === 'both' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedEntity === 'both' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
            </button>
          </div>

          {/* Analysis Depth (hidden until entity selected) */}
          <div style={{
            maxHeight: showDepth ? 600 : 0, overflow: 'hidden',
            opacity: showDepth ? 1 : 0, marginTop: showDepth ? 24 : 0,
            transition: 'max-height 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), margin 0.4s ease',
          }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Analysis Depth
              </div>
            </div>

            {/* Full Resolution */}
            <button
              onClick={() => selectDepth('full')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                background: selectedDepth === 'full' ? '#EFF4FF' : 'white',
                border: `1.5px solid ${selectedDepth === 'full' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 14, cursor: 'pointer', width: '100%', textAlign: 'left',
                marginBottom: 10, position: 'relative',
                boxShadow: selectedDepth === 'full' ? '0 0 0 2px rgba(10,22,40,0.06)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, background: '#EFF4FF', color: '#0A1628' }}>
                <i className="fa-solid fa-compass" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Full Resolution Analysis</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 9, fontWeight: 700,
                    color: '#2563EB', background: 'rgba(10,22,40,0.08)', padding: '2px 7px', borderRadius: 6,
                    textTransform: 'uppercase' as const, letterSpacing: '0.03em',
                  }}>
                    <i className="fa-solid fa-star" style={{ fontSize: 7 }} /> Recommended
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>Complete assessment of all 13+ resolution options</div>
              </div>
              <div style={{
                width: 20, height: 20, border: `2px solid ${selectedDepth === 'full' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedDepth === 'full' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedDepth === 'full' && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />}
              </div>
            </button>

            {/* Quick Check */}
            <button
              onClick={() => selectDepth('quick')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                background: selectedDepth === 'quick' ? '#EFF4FF' : 'white',
                border: `1.5px solid ${selectedDepth === 'quick' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 14, cursor: 'pointer', width: '100%', textAlign: 'left',
                marginBottom: 10,
                boxShadow: selectedDepth === 'quick' ? '0 0 0 2px rgba(10,22,40,0.06)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, background: '#FEF3C7', color: '#D97706' }}>
                <i className="fa-solid fa-bolt" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 2 }}>Quick Eligibility Check</div>
                <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>Fast screening for common resolution types</div>
              </div>
              <div style={{
                width: 20, height: 20, border: `2px solid ${selectedDepth === 'quick' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedDepth === 'quick' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedDepth === 'quick' && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />}
              </div>
            </button>

            {/* Penalty Review */}
            <button
              onClick={() => selectDepth('penalty')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                background: selectedDepth === 'penalty' ? '#EFF4FF' : 'white',
                border: `1.5px solid ${selectedDepth === 'penalty' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 14, cursor: 'pointer', width: '100%', textAlign: 'left',
                marginBottom: 10,
                boxShadow: selectedDepth === 'penalty' ? '0 0 0 2px rgba(10,22,40,0.06)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, background: '#F5F0FF', color: '#7C3AED' }}>
                <i className="fa-solid fa-eraser" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 2 }}>Penalty Review Only</div>
                <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>Check penalty abatement eligibility</div>
              </div>
              <div style={{
                width: 20, height: 20, border: `2px solid ${selectedDepth === 'penalty' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedDepth === 'penalty' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedDepth === 'penalty' && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />}
              </div>
            </button>

            {/* CSED Calculator */}
            <button
              onClick={() => selectDepth('csed')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                background: selectedDepth === 'csed' ? '#EFF4FF' : 'white',
                border: `1.5px solid ${selectedDepth === 'csed' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: 14, cursor: 'pointer', width: '100%', textAlign: 'left',
                marginBottom: 10,
                boxShadow: selectedDepth === 'csed' ? '0 0 0 2px rgba(10,22,40,0.06)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, background: '#F0FDFA', color: '#0D9488' }}>
                <i className="fa-solid fa-clock" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 2 }}>CSED Calculator</div>
                <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>Calculate when your debts expire</div>
              </div>
              <div style={{
                width: 20, height: 20, border: `2px solid ${selectedDepth === 'csed' ? '#2563EB' : '#F1F5F9'}`,
                borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selectedDepth === 'csed' ? '#2563EB' : 'transparent',
                marginLeft: 'auto', transition: 'all 0.2s ease',
              }}>
                {selectedDepth === 'csed' && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />}
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            style={{
              marginTop: 20, width: '100%', padding: 15, border: 'none', borderRadius: 9999,
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, cursor: canContinue ? 'pointer' : 'default',
              background: canContinue ? '#00A651' : '#E2E8F0',
              color: canContinue ? 'white' : '#CBD5E1',
              boxShadow: canContinue ? '0 1px 2px rgba(0,0,0,0.03)' : 'none',
              pointerEvents: canContinue ? 'auto' : 'none',
              transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
          </button>
        </div>
      </div>
    </div>
  )
}
