'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

interface ChecklistStep {
  id: string
  label: string
  detail: string
  completed: boolean
}

export default function PlanPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as {
    rcp?: { nre: number; rcpLumpSum: number }
    mdi?: { mdi: number }
    totalDebt?: number
  } | undefined

  const rcp = result?.rcp?.rcpLumpSum ?? 8500
  const downPayment = Math.round(rcp * 0.2)

  const [steps, setSteps] = useState<ChecklistStep[]>([
    { id: '1', label: 'Complete Form 656 (OIC Application)', detail: 'Main application form for Offer in Compromise.', completed: true },
    { id: '2', label: 'Complete Form 433-A(OIC) (Financial Statement)', detail: 'Detailed financial statement required for OIC processing.', completed: true },
    { id: '3', label: 'Gather supporting documents', detail: 'Bank statements, pay stubs, tax returns, and asset documentation from the last 3 months.', completed: false },
    { id: '4', label: 'Pay $205 application fee', detail: 'Non-refundable fee paid to the IRS. May be waived for low-income applicants (Form 656-A).', completed: false },
    { id: '5', label: `Submit 20% initial payment (${fmt(downPayment)})`, detail: 'Required with lump sum offers. This payment is applied to your tax liability if the offer is accepted.', completed: false },
    { id: '6', label: 'Submit to IRS', detail: "We'll compile everything and submit your complete OIC package to the IRS on your behalf.", completed: false },
  ])

  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({})

  const completedCount = steps.filter(s => s.completed).length
  const totalSteps = steps.length
  const progressPct = Math.round((completedCount / totalSteps) * 100)
  const circumference = 2 * Math.PI * 18
  const strokeDashoffset = circumference - (progressPct / 100) * circumference

  function toggleCheck(id: string) {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s))
  }

  function toggleExpand(id: string) {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0 12px' }}>
          <div onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, background: '#FAFAFF', border: '1px solid #E8E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>Your Action Plan</div>
          <div style={{ width: 36, flexShrink: 0 }} />
        </div>

        {/* Recommended Resolution Hero Card */}
        <div style={{ background: '#1A1A2E', borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden', marginBottom: 18 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 600, color: 'white', marginBottom: 14 }}>
            <i className="fas fa-star" style={{ fontSize: 8 }} /> RECOMMENDED
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: 6 }}>Offer in Compromise</div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 16 }}>Lump Sum Payment Option</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmt(rcp)}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>offer amount</div>
          </div>
          <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.5 }}>
              <i className="fas fa-info-circle" style={{ fontSize: 10, marginRight: 4 }} />
              20% down ({fmt(downPayment)}) + remaining within 5 months
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'white', borderRadius: 14, border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>{completedCount} of {totalSteps} steps complete</div>
            <div style={{ fontSize: '0.72rem', color: '#8585A0', marginTop: 2 }}>{"Keep going, you're making progress!"}</div>
          </div>
          <div style={{ position: 'relative', width: 44, height: 44 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#F0F0F5" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="#00A651" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#00A651' }}>{progressPct}%</div>
          </div>
        </div>

        {/* Checklist */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Required Steps</div>
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E8E8F0', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            {steps.map((step) => {
              const isExpanded = expandedSteps[step.id] && !step.completed
              return (
                <div key={step.id} style={{ borderBottom: step.id !== '6' ? '1px solid #F0F0F5' : undefined }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16 }}>
                    {/* Checkbox */}
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleCheck(step.id) }}
                      style={{
                        width: 24, height: 24, borderRadius: 8, border: `2px solid ${step.completed ? '#00A651' : '#D5D5E0'}`,
                        background: step.completed ? '#00A651' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, cursor: 'pointer', marginTop: 1,
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      {step.completed && <i className="fas fa-check" style={{ fontSize: 11, color: 'white' }} />}
                    </div>

                    {/* Label */}
                    <div style={{ flex: 1, cursor: step.completed ? 'default' : 'pointer' }} onClick={() => !step.completed && toggleExpand(step.id)}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: step.completed ? '#8585A0' : '#1A1A2E', textDecoration: step.completed ? 'line-through' : 'none', transition: 'all 0.3s ease' }}>
                        {step.label}
                      </div>
                      {step.completed && (
                        <div style={{ fontSize: '0.7rem', color: '#00A651', marginTop: 3, fontWeight: 500 }}>
                          <i className="fas fa-check-circle" style={{ fontSize: 9 }} /> Completed
                        </div>
                      )}
                      {isExpanded && (
                        <div style={{ marginTop: 8, fontSize: '0.72rem', lineHeight: 1.5, color: '#8585A0' }}>{step.detail}</div>
                      )}
                    </div>

                    {/* Chevron */}
                    <i
                      className="fas fa-chevron-down"
                      onClick={(e) => { e.stopPropagation(); if (!step.completed) toggleExpand(step.id) }}
                      style={{
                        fontSize: 10, color: '#B0B0C8', marginTop: 4, cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            onClick={() => router.push('/forms/form-656')}
            style={{ padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white', fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', cursor: 'pointer' }}
          >
            <i className="fas fa-file-pen" style={{ marginRight: 8 }} /> Begin Form 656
          </div>
          <div
            onClick={() => router.push('/expert')}
            style={{ padding: 14, background: 'white', border: '1.5px solid #E8E8F0', borderRadius: 9999, textAlign: 'center', color: '#5C5C7A', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
          >
            <i className="fas fa-headset" style={{ marginRight: 6, color: '#1A1A2E' }} /> Talk to an expert first
          </div>
        </div>
      </div>
    </div>
  )
}
