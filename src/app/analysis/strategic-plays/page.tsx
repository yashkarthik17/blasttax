'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Strategy {
  id: string
  playLabel: string
  playColor: string
  title: string
  iconBg: string
  iconContent: string
  recommended?: boolean
  tags: { label: string; color: string; bg: string }[]
  savings: string
  timeline: string
  complexity: number
  qualify: 'yes' | 'maybe'
  steps: { title: string; description: string }[]
  example?: { content: string }
  tip?: { icon: string; color: string; bg: string; text: string }
  links?: { label: string; href: string; icon: string; color: string; bg: string }[]
}

const STRATEGIES: Strategy[] = [
  {
    id: 'a', playLabel: 'Play A', playColor: '#00A651', title: 'Balance Reducer', iconBg: 'bg-[#E6F9EE]', iconContent: '\u2460', recommended: true,
    tags: [
      { label: 'Penalty Abatement', color: '#0A1628', bg: '#EBF0FF' },
      { label: 'OIC', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: '~$25K+', timeline: '4-8 mo', complexity: 3, qualify: 'yes',
    steps: [
      { title: 'Step 1: Request FTA', description: 'Remove penalties via First Time Abate' },
      { title: 'Step 2: TC 271 Posts', description: 'Balance drops after penalty removal' },
      { title: 'Step 3: File OIC on Lower Balance', description: 'Offer in Compromise on reduced amount' },
    ],
    example: { content: '$80K -> FTA removes $25K -> OIC on $55K = lower offer' },
  },
  {
    id: 'b', playLabel: 'Play B', playColor: '#7C3AED', title: 'Double Reduction', iconBg: 'bg-white', iconContent: '\u2461',
    tags: [
      { label: 'Amended Return', color: '#0D9488', bg: '#F0FDFA' },
      { label: 'FTA', color: '#0A1628', bg: '#EBF0FF' },
      { label: 'OIC', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: '~$50K+', timeline: '6-12 mo', complexity: 4, qualify: 'yes',
    steps: [
      { title: 'File 1040-X (Amended Return)', description: 'TC 291 posts, balance decreases' },
      { title: 'Request FTA', description: 'TC 271 posts, penalties removed' },
      { title: 'File OIC on Minimal Balance', description: 'Offer based on greatly reduced amount' },
    ],
    example: { content: '$100K -> $70K (amended) -> $50K (FTA) -> OIC on $50K' },
  },
  {
    id: 'c', playLabel: 'Play C', playColor: '#D97706', title: 'CDP Leverage', iconBg: 'bg-[#FEF3C7]', iconContent: '\u2462',
    tags: [
      { label: 'CDP Hearing', color: '#D97706', bg: '#FEF3C7' },
      { label: 'OIC Proposal', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: 'Varies', timeline: '3-9 mo', complexity: 4, qualify: 'maybe',
    steps: [
      { title: 'Receive Levy Notice', description: 'Letter 1058 or LT11 triggers CDP right' },
      { title: 'File Form 12153', description: 'Within 30 days of notice' },
      { title: 'Propose OIC at Hearing', description: 'Present offer during CDP hearing' },
    ],
    tip: { icon: 'fa-shield-halved', color: '#0A1628', bg: '#EBF0FF', text: 'Benefits: levy protection + OIC consideration in one process' },
  },
  {
    id: 'e', playLabel: 'Play E', playColor: '#0D9488', title: 'Expiration Play', iconBg: 'bg-[#F0FDFA]', iconContent: '\u2464',
    tags: [
      { label: 'CNC', color: '#0D9488', bg: '#F0FDFA' },
      { label: 'FTA', color: '#0A1628', bg: '#EBF0FF' },
      { label: 'CSED', color: '#D97706', bg: '#FEF3C7' },
    ],
    savings: '100%', timeline: 'Until CSED', complexity: 2, qualify: 'yes',
    steps: [
      { title: 'Get CNC Status', description: 'Demonstrate hardship, TC 530 posts' },
      { title: 'Request FTA', description: 'Reduce balance while in CNC' },
      { title: 'Monitor CSED', description: 'Debt expires, TC 608 posts. Pay $0.' },
    ],
    tip: { icon: 'fa-clock', color: '#00A651', bg: '#E6F9EE', text: 'Pay $0, debt legally gone when CSED expires' },
  },
]

export default function StrategicPlaysPage() {
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function toggleCard(id: string) {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-[#0A1628]">
            <i className="fas fa-arrow-left text-base" />
          </button>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Resolution Strategies</h1>
          <button className="flex h-10 w-10 items-center justify-center text-[#94A3B8]">
            <i className="fas fa-info-circle text-base" />
          </button>
        </div>

        <div className="px-5 pb-8">
          <h2 className="mb-1.5 text-[1.25rem] font-extrabold leading-tight text-[#0A1628]">Advanced Resolution Strategies</h2>
          <p className="mb-5 text-[0.8125rem] text-[#64748B]">Combine multiple approaches for optimal outcomes</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STRATEGIES.map((s) => {
              const isExpanded = expandedId === s.id
              return (
                <div
                  key={s.id}
                  onClick={() => toggleCard(s.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border-[1.5px] bg-white transition ${
                    s.recommended
                      ? isExpanded ? 'border-[#00A651]' : 'border-[#00A651]'
                      : isExpanded ? 'border-[#0A1628]' : 'border-[#F1F5F9] hover:border-[rgba(0,61,165,0.2)]'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.iconBg} text-lg`}>
                      {s.iconContent}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-[0.6875rem] font-bold uppercase tracking-wider" style={{ color: s.playColor }}>{s.playLabel}</span>
                        {s.recommended && (
                          <span className="rounded-full bg-[#00A651] px-2 py-0.5 text-[0.625rem] font-semibold text-white">Recommended for you</span>
                        )}
                      </div>
                      <p className="mb-0.5 text-[0.9375rem] font-bold text-[#0A1628]">{s.title}</p>
                      <div className="flex flex-wrap items-center gap-1">
                        {s.tags.map((tag, i) => (
                          <span key={i}>
                            <span className="rounded-lg px-2 py-0.5 text-[0.6875rem] font-semibold" style={{ color: tag.color, background: tag.bg }}>{tag.label}</span>
                            {i < s.tags.length - 1 && <i className="fas fa-arrow-right mx-1 text-[10px] text-[#CBD5E1]" />}
                          </span>
                        ))}
                      </div>
                    </div>
                    <i className={`fas fa-chevron-down mt-1 text-xs text-[#CBD5E1] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expandable Body */}
                  {isExpanded && (
                    <div className="border-t border-[#F1F5F9] px-4 pb-4 pt-3.5">
                      {/* Meta Row */}
                      <div className="mb-3.5 flex gap-4">
                        <div>
                          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#64748B]">Savings</p>
                          <p className="text-[0.875rem] font-extrabold text-[#00A651]">{s.savings}</p>
                        </div>
                        <div>
                          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#64748B]">Timeline</p>
                          <p className="text-[0.875rem] font-bold text-[#0A1628]">{s.timeline}</p>
                        </div>
                        <div>
                          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#64748B]">Complexity</p>
                          <div className="mt-0.5 flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <i key={n} className={`${n <= s.complexity ? 'fas' : 'far'} fa-star text-[10px] ${n <= s.complexity ? 'text-[#F5A623]' : 'text-[#E8E8F0]'}`} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#64748B]">Qualify?</p>
                          {s.qualify === 'yes' ? (
                            <span className="text-[0.6875rem] font-bold text-[#00A651]"><i className="fas fa-circle-check" /> Yes</span>
                          ) : (
                            <span className="text-[0.6875rem] font-bold text-[#F5A623]"><i className="fas fa-circle-exclamation" /> Maybe</span>
                          )}
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="relative pl-6">
                        <div className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded bg-[#0A1628]" />
                        {s.steps.map((step) => (
                          <div key={step.title} className="relative py-2">
                            <div className="absolute -left-[13px] top-3.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#0A1628] shadow-[0_0_0_2px_#0A1628]" />
                            <p className="text-[0.8125rem] font-semibold text-[#0A1628]">{step.title}</p>
                            <p className="text-[0.75rem] text-[#64748B]">{step.description}</p>
                          </div>
                        ))}
                      </div>

                      {/* Example */}
                      {s.example && (
                        <div className="mt-3.5 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3">
                          <p className="mb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[#64748B]">Example</p>
                          <p className="text-[0.8125rem] text-[#64748B]">{s.example.content}</p>
                        </div>
                      )}

                      {/* Tip */}
                      {s.tip && (
                        <div className="mt-3.5 flex items-start gap-2 rounded-[10px] p-2.5 px-3" style={{ background: s.tip.bg }}>
                          <i className={`fas ${s.tip.icon} mt-0.5 text-[13px]`} style={{ color: s.tip.color }} />
                          <p className="text-[0.75rem] font-medium" style={{ color: s.tip.color }}>{s.tip.text}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-6">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-7 py-4 text-base font-bold text-white transition hover:opacity-90">
              <i className="fas fa-comments" /> Discuss with Expert
            </button>
          </div>
          <div className="mt-3 text-center">
            <Link href="/analysis/results" className="text-[0.8125rem] font-semibold text-[#64748B] no-underline">
              <i className="fas fa-arrow-left mr-1 text-[10px]" /> Back to Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
