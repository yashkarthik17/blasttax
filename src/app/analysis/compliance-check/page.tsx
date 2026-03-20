'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Answer = 'yes' | 'no' | 'unsure' | null

interface Question {
  id: string
  question: string
  hint: string
}

const QUESTIONS: Question[] = [
  { id: 'q1', question: 'Have you filed ALL required tax returns?', hint: 'Check all years -- unfiled returns block most resolutions' },
  { id: 'q2', question: 'Are you current on estimated tax payments?', hint: 'Self-employed: quarterly 1040-ES payments' },
  { id: 'q3', question: 'Are you current on payroll tax deposits?', hint: '941/940 deposits must be current for OIC' },
  { id: 'q4', question: 'Do you have an existing installment agreement?', hint: 'TC 971 AC 043 -- must close before filing OIC' },
  { id: 'q5', question: 'Are you currently in bankruptcy?', hint: 'TC 520 -- blocks most resolution types' },
  { id: 'q6', question: 'Have you had an OIC accepted in the past 5 years?', hint: 'TC 481 -- 5-year compliance period blocks new OIC' },
]

function computeEligibility(answers: Record<string, Answer>) {
  const res: Record<string, { eligible: boolean; reason: string }> = {
    OIC: { eligible: true, reason: '' },
    IA: { eligible: true, reason: '' },
    CNC: { eligible: true, reason: '' },
    FTA: { eligible: true, reason: '' },
  }

  if (answers.q1 === 'no') {
    res.OIC = { eligible: false, reason: 'Unfiled returns' }
    res.IA = { eligible: false, reason: 'Unfiled returns' }
  }
  if (answers.q4 === 'yes') {
    res.OIC = { eligible: false, reason: 'Existing IA must close first' }
  }
  if (answers.q5 === 'yes') {
    res.OIC = { eligible: false, reason: 'TC 520 blocks' }
    res.IA = { eligible: false, reason: 'TC 520 blocks' }
    res.CNC = { eligible: false, reason: 'TC 520 blocks' }
  }
  if (answers.q6 === 'yes') {
    res.OIC = { eligible: false, reason: '5-year compliance period' }
  }

  return res
}

export default function ComplianceCheckPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

  function selectAnswer(qId: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  const answeredCount = Object.keys(answers).length
  const eligibility = computeEligibility(answers)
  const eligible = Object.entries(eligibility).filter(([, v]) => v.eligible)
  const blocked = Object.entries(eligibility).filter(([, v]) => !v.eligible)

  const cardBorder = (qId: string) => {
    const a = answers[qId]
    if (a === 'yes') return '1.5px solid rgba(0, 166, 81, 0.25)'
    if (a === 'no') return '1.5px solid rgba(230, 57, 70, 0.2)'
    if (a === 'unsure') return '1.5px solid rgba(245, 166, 35, 0.25)'
    return '1.5px solid #F1F5F9'
  }

  const btnStyle = (qId: string, value: Answer): React.CSSProperties => {
    const current = answers[qId]
    const base: React.CSSProperties = {
      padding: '6px 14px', borderRadius: 20, fontSize: '0.75rem',
      fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
      transition: 'all 0.25s ease', border: '1.5px solid #F1F5F9',
      background: 'white', color: '#64748B',
    }
    if (current === value) {
      if (value === 'yes') return { ...base, borderColor: '#00A651', background: '#E6F9EE', color: '#00A651' }
      if (value === 'no') return { ...base, borderColor: '#E63946', background: '#FFF0F1', color: '#E63946' }
      if (value === 'unsure') return { ...base, borderColor: '#F59E0B', background: '#FFFBEB', color: '#D97706' }
    }
    return base
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px', flexShrink: 0 }}>
          <div style={{
            height: 4, width: '100%', borderRadius: 9999,
            background: '#E2E8F0', overflow: 'hidden',
          }}>
            <div style={{ height: '100%', width: '20%', borderRadius: 9999, background: '#00A651', transition: 'all 0.5s' }} />
          </div>
          <p style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 600, marginTop: 6 }}>Step 3 of 15</p>
        </div>

        <div style={{ padding: '0 20px', paddingBottom: 140 }}>
          {/* Title */}
          <div style={{ marginTop: 16, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, margin: 0 }}>
              Are You Current with the IRS?
            </h1>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
              The IRS requires compliance before most resolution options
            </p>
          </div>

          {/* Compliance Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                style={{
                  padding: 16, background: 'white', border: cardBorder(q.id),
                  borderRadius: 14, transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0A1628', marginBottom: 4, marginTop: 0 }}>
                  {q.question}
                </p>
                <p style={{ fontSize: '0.6875rem', color: '#64748B', marginBottom: 10, marginTop: 0 }}>
                  {q.hint}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['yes', 'no', 'unsure'] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => selectAnswer(q.id, val)}
                      style={btnStyle(q.id, val)}
                    >
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Eligibility Bar */}
        <div style={{
          position: 'sticky', bottom: 0, left: 0, right: 0,
          padding: '14px 20px', background: 'white',
          borderTop: '1px solid #F1F5F9', zIndex: 10,
        }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {answeredCount === 0 ? (
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#94A3B8' }}>
                Answer questions to see eligibility...
              </span>
            ) : (
              <>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748B', marginRight: 4 }}>Eligible:</span>
                {eligible.map(([name]) => (
                  <span key={name} style={{
                    fontSize: '0.625rem', fontWeight: 600, color: '#00A651', background: '#E6F9EE',
                    padding: '2px 8px', borderRadius: 10,
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    {name} <i className="fa-solid fa-check" style={{ fontSize: 8 }} />
                  </span>
                ))}
                {blocked.length > 0 && (
                  <>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748B', marginRight: 4 }}>Blocked:</span>
                    {blocked.map(([name]) => (
                      <span key={name} style={{
                        fontSize: '0.625rem', fontWeight: 600, color: '#E63946', background: '#FFF0F1',
                        padding: '2px 8px', borderRadius: 10,
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}>
                        {name} <i className="fa-solid fa-xmark" style={{ fontSize: 8 }} />
                      </span>
                    ))}
                  </>
                )}
                {blocked.length === 0 && (
                  <>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748B', marginRight: 4 }}>Blocked:</span>
                    <span style={{ fontSize: '0.625rem', fontWeight: 500, color: '#00A651' }}>None</span>
                  </>
                )}
              </>
            )}
          </div>
          <button
            onClick={() => router.push('/analysis/situation-screening')}
            disabled={answeredCount < QUESTIONS.length}
            style={{
              width: '100%', padding: '14px 24px', fontSize: 15, fontWeight: 700,
              background: '#00A651', color: 'white', border: 'none', borderRadius: 9999,
              cursor: answeredCount >= QUESTIONS.length ? 'pointer' : 'default',
              opacity: answeredCount >= QUESTIONS.length ? 1 : 0.4,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'inherit',
              transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            Continue
            <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
          </button>
        </div>
      </div>
    </div>
  )
}
