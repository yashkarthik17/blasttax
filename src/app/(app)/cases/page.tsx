'use client'

import { useState } from 'react'
import Link from 'next/link'

type FilterKey = 'all' | 'active' | 'pending' | 'resolved'

const FILTERS: { key: FilterKey; label: string; dotColor?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active', dotColor: '#00A651' },
  { key: 'pending', label: 'Pending', dotColor: '#F59E0B' },
  { key: 'resolved', label: 'Resolved', dotColor: '#8585A0' },
]

interface CaseItem {
  id: string
  caseNumber: string
  status: FilterKey
  statusLabel: string
  statusBg: string
  statusColor: string
  resolutionType: string
  resolutionIcon: string
  resolutionIconColor: string
  debt: string
  updated: string
  progressLabel: string
  progressPercent: number
  progressColor: string
  progressDotColor: string
  isComplete?: boolean
}

const CASES: CaseItem[] = [
  {
    id: '1042', caseNumber: 'Case #1042', status: 'active', statusLabel: 'Active',
    statusBg: '#E6F9EE', statusColor: '#00A651',
    resolutionType: 'Offer in Compromise', resolutionIcon: 'fa-handshake', resolutionIconColor: '#1A1A2E',
    debt: '$47,250', updated: 'Updated 2h ago',
    progressLabel: 'Under IRS Review', progressPercent: 60, progressColor: '#1A1A2E', progressDotColor: '#2563EB',
  },
  {
    id: '1038', caseNumber: 'Case #1038', status: 'pending', statusLabel: 'Pending Review',
    statusBg: '#FFFBEB', statusColor: '#D97706',
    resolutionType: 'Installment Agreement', resolutionIcon: 'fa-calendar-check', resolutionIconColor: '#7C3AED',
    debt: '$12,800', updated: 'Updated 1d ago',
    progressLabel: 'Documents Prepared', progressPercent: 85, progressColor: '#7C3AED', progressDotColor: '#A78BFA',
  },
  {
    id: '985', caseNumber: 'Case #985', status: 'resolved', statusLabel: 'Resolved',
    statusBg: '#FAFAFF', statusColor: '#8585A0',
    resolutionType: 'Penalty Abatement', resolutionIcon: 'fa-eraser', resolutionIconColor: '#0D9488',
    debt: '$5,200', updated: 'Resolved Feb 28',
    progressLabel: 'Complete', progressPercent: 100, progressColor: '#00A651', progressDotColor: '',
    isComplete: true,
  },
]

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredCases = activeFilter === 'all' ? CASES : CASES.filter((c) => c.status === activeFilter)

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFF' }}>
      <div className="mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em' }}>My Cases</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: '#FAFAFF',
                    border: '1px solid #F0F0F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-sliders" style={{ fontSize: 14, color: '#5C5C7A' }} />
                </div>
                <Link
                  href="/analysis/type"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: '#1A1A2E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-plus" style={{ fontSize: 14, color: 'white' }} />
                </Link>
              </div>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    border: '1.5px solid transparent',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    ...(activeFilter === f.key
                      ? { background: '#1A1A2E', color: 'white', borderColor: '#1A1A2E' }
                      : { background: 'white', color: '#5C5C7A', borderColor: '#D5D5E0' }),
                  }}
                >
                  {f.dotColor && (
                    <i
                      className="fas fa-circle"
                      style={{
                        fontSize: 6,
                        color: activeFilter === f.key ? 'white' : f.dotColor,
                        marginRight: 4,
                      }}
                    />
                  )}
                  {f.label}
                </button>
              ))}
            </div>

            {/* Case Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCases.map((c) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.id}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    borderRadius: 20,
                    padding: 20,
                    border: '1px solid #F0F0F5',
                    position: 'relative',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {/* Top row: case number + status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1A1A2E' }}>{c.caseNumber}</span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '3px 10px',
                          background: c.statusBg,
                          borderRadius: 9999,
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          color: c.statusColor,
                        }}
                      >
                        {c.isComplete ? (
                          <i className="fas fa-check" style={{ fontSize: 8 }} />
                        ) : (
                          <i className="fas fa-circle" style={{ fontSize: 5 }} />
                        )}{' '}
                        {c.statusLabel}
                      </span>
                    </div>
                    <i className="fas fa-chevron-right" style={{ fontSize: 12, color: '#B0B0C8' }} />
                  </div>
                  {/* Resolution type */}
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#5C5C7A', marginBottom: 6 }}>
                    <i className={`fas ${c.resolutionIcon}`} style={{ fontSize: 11, color: c.resolutionIconColor, marginRight: 4 }} />
                    {c.resolutionType}
                  </div>
                  {/* Debt + timestamp */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em' }}>{c.debt}</div>
                    <div style={{ fontSize: '0.68rem', color: '#B0B0C8', fontWeight: 500 }}>{c.updated}</div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, color: c.isComplete ? '#00A651' : '#8585A0' }}>
                        {c.isComplete && <i className="fas fa-circle-check" style={{ fontSize: 10, marginRight: 2 }} />}
                        {c.progressLabel}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: c.isComplete ? '#00A651' : c.status === 'pending' ? '#7C3AED' : '#1A1A2E',
                        }}
                      >
                        {c.progressPercent}%
                      </span>
                    </div>
                    <div style={{ height: 5, background: '#F0F0F5', borderRadius: 9999, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${c.progressPercent}%`,
                          height: '100%',
                          background: c.progressColor,
                          borderRadius: 9999,
                          position: 'relative',
                        }}
                      >
                        {!c.isComplete && c.progressDotColor && (
                          <div
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: -1,
                              width: 7,
                              height: 7,
                              background: c.progressDotColor,
                              borderRadius: '50%',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Empty State: Start New Analysis */}
              <Link
                href="/analysis/type"
                style={{
                  border: '2px dashed #D5D5E0',
                  borderRadius: 20,
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: '#FAFAFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className="fas fa-plus" style={{ fontSize: 18, color: '#B0B0C8' }} />
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#5C5C7A' }}>Start a new analysis</div>
                <div style={{ fontSize: '0.75rem', color: '#B0B0C8', fontWeight: 400, lineHeight: 1.5 }}>Get a personalized resolution recommendation</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
