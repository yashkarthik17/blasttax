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
  iconContent: React.ReactNode
  recommended?: boolean
  recommendedLabel?: string
  conditionLabel?: string
  conditionColor?: string
  conditionBg?: string
  conditionBorder?: string
  tags: { label: string; color: string; bg: string; separator?: 'arrow' | 'plus' }[]
  savings: string
  timeline: string
  complexity: number
  qualify: 'yes' | 'maybe'
  steps: { title: string; description: string }[]
  example?: { parts: { text: string; color?: string; weight?: string; size?: string }[] }
  tip?: { icon: string; color: string; bg: string; text: string }
  links?: { label: string; href: string; icon: string; color: string; bg: string }[]
  yearSplit?: { year: string; yearColor: string; badge: string; badgeBg: string; badgeBorder: string; badgeColor: string; desc: string }[]
  isSpecialty?: boolean
}

const STRATEGIES: Strategy[] = [
  {
    id: 'a', playLabel: 'Play A', playColor: '#00A651', title: 'Balance Reducer',
    iconBg: '#E6F9EE', iconContent: <span style={{ fontSize: 18 }}>&#9312;</span>,
    recommended: true, recommendedLabel: 'Recommended for you',
    tags: [
      { label: 'Penalty Abatement', color: '#1A1A2E', bg: '#EBF0FF', separator: 'arrow' },
      { label: 'OIC', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: '~$25K+', timeline: '4-8 mo', complexity: 3, qualify: 'yes',
    steps: [
      { title: 'Step 1: Request FTA', description: 'Remove penalties via First Time Abate' },
      { title: 'Step 2: TC 271 Posts', description: 'Balance drops after penalty removal' },
      { title: 'Step 3: File OIC on Lower Balance', description: 'Offer in Compromise on reduced amount' },
    ],
    example: { parts: [
      { text: '$80K', color: 'var(--brand-red, #E63946)', weight: '700', size: '0.8125rem' },
      { text: 'FTA removes $25K', color: 'var(--color-muted, #5C5C7A)', size: '0.75rem' },
      { text: 'OIC on $55K', color: '#00A651', weight: '700', size: '0.8125rem' },
      { text: '= lower offer', color: 'var(--color-muted, #5C5C7A)', size: '0.6875rem' },
    ] },
  },
  {
    id: 'b', playLabel: 'Play B', playColor: '#7C3AED', title: 'Double Reduction',
    iconBg: '#FFFFFF', iconContent: <span style={{ fontSize: 18 }}>&#9313;</span>,
    tags: [
      { label: 'Amended Return', color: '#0D9488', bg: '#F0FDFA', separator: 'arrow' },
      { label: 'FTA', color: '#1A1A2E', bg: '#EBF0FF', separator: 'arrow' },
      { label: 'OIC', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: '~$50K+', timeline: '6-12 mo', complexity: 4, qualify: 'yes',
    steps: [
      { title: 'File 1040-X (Amended Return)', description: 'TC 291 posts, balance decreases' },
      { title: 'Request FTA', description: 'TC 271 posts, penalties removed' },
      { title: 'File OIC on Minimal Balance', description: 'Offer based on greatly reduced amount' },
    ],
    example: { parts: [
      { text: '$100K', color: 'var(--brand-red, #E63946)', weight: '700', size: '0.8125rem' },
      { text: '$70K (amended)', color: 'var(--color-muted, #5C5C7A)', size: '0.75rem' },
      { text: '$50K (FTA)', color: 'var(--color-muted, #5C5C7A)', size: '0.75rem' },
      { text: 'OIC on $50K', color: '#00A651', weight: '700', size: '0.8125rem' },
    ] },
  },
  {
    id: 'c', playLabel: 'Play C', playColor: '#D97706', title: 'CDP Leverage',
    iconBg: '#FEF3C7', iconContent: <span style={{ fontSize: 18 }}>&#9314;</span>,
    tags: [
      { label: 'CDP Hearing', color: '#D97706', bg: '#FEF3C7', separator: 'plus' },
      { label: 'OIC Proposal', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: 'Varies', timeline: '3-9 mo', complexity: 4, qualify: 'maybe',
    steps: [
      { title: 'Receive Levy Notice', description: 'Letter 1058 or LT11 triggers CDP right' },
      { title: 'File Form 12153', description: 'Within 30 days of notice' },
      { title: 'Propose OIC at Hearing', description: 'Present offer during CDP hearing' },
    ],
    tip: { icon: 'fa-shield-halved', color: '#1A1A2E', bg: '#EBF0FF', text: 'Benefits: levy protection + OIC consideration in one process' },
  },
  {
    id: 'd', playLabel: 'Play D', playColor: '#E63946', title: 'Spouse Shield',
    iconBg: '#FFF0F1', iconContent: <span style={{ fontSize: 18 }}>&#9315;</span>,
    tags: [
      { label: 'Innocent Spouse', color: '#E63946', bg: '#FFF0F1', separator: 'plus' },
      { label: 'IA', color: '#1A1A2E', bg: '#EBF0FF' },
    ],
    savings: 'Up to 50%', timeline: '6-18 mo', complexity: 5, qualify: 'maybe',
    steps: [
      { title: 'File Form 8857', description: 'Request innocent spouse relief' },
      { title: 'Enter IA on Full Balance', description: 'Protect against collection while pending' },
      { title: 'If Relief Granted: Modify IA', description: 'Reduce IA payments based on new allocation' },
    ],
  },
  {
    id: 'e', playLabel: 'Play E', playColor: '#0D9488', title: 'Expiration Play',
    iconBg: '#F0FDFA', iconContent: <span style={{ fontSize: 18 }}>&#9316;</span>,
    tags: [
      { label: 'CNC', color: '#0D9488', bg: '#F0FDFA', separator: 'plus' },
      { label: 'FTA', color: '#1A1A2E', bg: '#EBF0FF', separator: 'plus' },
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
  {
    id: 'f', playLabel: 'Play F', playColor: '#2563EB', title: 'Multi-Year Split',
    iconBg: '#EEF2FF', iconContent: <span style={{ fontSize: 18 }}>&#9317;</span>,
    tags: [
      { label: 'Different Resolution Per Year', color: '#2563EB', bg: '#EEF2FF' },
    ],
    savings: 'Varies', timeline: 'Ongoing', complexity: 3, qualify: 'yes',
    steps: [],
    yearSplit: [
      { year: '2020', yearColor: '#0D9488', badge: 'CNC', badgeBg: '#F0FDFA', badgeBorder: 'rgba(13,148,136,0.2)', badgeColor: '#0D9488', desc: 'Near CSED expiration -- let it expire' },
      { year: '2023', yearColor: '#1A1A2E', badge: 'IA', badgeBg: '#EBF0FF', badgeBorder: 'rgba(0,61,165,0.15)', badgeColor: '#1A1A2E', desc: 'Recent year -- installment agreement' },
    ],
  },
]

const SPECIALTY_STRATEGIES: Strategy[] = [
  {
    id: 'g', playLabel: 'Play G', playColor: '#7C3AED', title: 'CSED Expiration Play',
    iconBg: '#F5F0FF', iconContent: <i className="fa-solid fa-hourglass-half" style={{ fontSize: 16, color: '#7C3AED' }} />,
    isSpecialty: true,
    conditionLabel: 'Best if CSED < 3 years', conditionColor: '#7C3AED', conditionBg: '#F5F0FF', conditionBorder: 'rgba(124,58,237,0.2)',
    tags: [
      { label: 'CNC', color: '#0D9488', bg: '#F0FDFA', separator: 'plus' },
      { label: 'CSED Wait', color: '#D97706', bg: '#FEF3C7' },
    ],
    savings: '100%', timeline: 'Until CSED', complexity: 2, qualify: 'yes',
    steps: [
      { title: 'Step 1: Request CNC Status', description: 'Demonstrate financial hardship to halt collections' },
      { title: 'Step 2: Maintain Compliance', description: 'File and pay current taxes on time' },
      { title: 'Step 3: Wait for CSED Expiration', description: 'Monitor countdown without triggering tolling events' },
      { title: 'Step 4: Debt Legally Expires (TC 608)', description: 'IRS can no longer collect -- balance goes to $0' },
    ],
    links: [{ label: 'Open CSED Tolling Calculator', href: '/tools/csed-calculator', icon: 'fa-calculator', color: '#7C3AED', bg: '#F5F0FF' }],
  },
  {
    id: 'h', playLabel: 'Play H', playColor: '#E63946', title: 'Lien Release Before Resolution',
    iconBg: '#FFF0F1', iconContent: <i className="fa-solid fa-lock-open" style={{ fontSize: 16, color: '#E63946' }} />,
    isSpecialty: true,
    conditionLabel: 'If active lien exists', conditionColor: '#E63946', conditionBg: '#FFF0F1', conditionBorder: 'rgba(230,57,70,0.2)',
    tags: [
      { label: 'Lien Subordination', color: '#E63946', bg: '#FFF0F1', separator: 'arrow' },
      { label: 'OIC', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: 'Varies', timeline: '3-6 mo', complexity: 4, qualify: 'maybe',
    steps: [
      { title: 'Step 1: Request Form 14134 (Subordination)', description: 'Apply for lien subordination or discharge' },
      { title: 'Step 2: Refinance/Sell Property', description: 'Leverage freed-up equity for resolution funds' },
      { title: 'Step 3: Use Proceeds for OIC Initial Payment', description: 'Fund your OIC with refinance or sale proceeds' },
      { title: 'Step 4: File OIC with Stronger Position', description: 'Submit offer backed by demonstrated ability to pay' },
    ],
    links: [{ label: 'Lien & Levy Release Guide', href: '/tools/lien-levy', icon: 'fa-file-lines', color: '#E63946', bg: '#FFF0F1' }],
  },
  {
    id: 'i', playLabel: 'Play I', playColor: '#D97706', title: 'SFR Correction + Amend + Resolve',
    iconBg: '#FEF3C7', iconContent: <i className="fa-solid fa-file-pen" style={{ fontSize: 16, color: '#D97706' }} />,
    isSpecialty: true,
    conditionLabel: 'If IRS filed your return', conditionColor: '#D97706', conditionBg: '#FEF3C7', conditionBorder: 'rgba(217,119,6,0.2)',
    tags: [
      { label: 'SFR Replace', color: '#D97706', bg: '#FEF3C7', separator: 'arrow' },
      { label: 'FTA', color: '#1A1A2E', bg: '#EBF0FF', separator: 'arrow' },
      { label: 'OIC/IA', color: '#7C3AED', bg: '#F5F0FF' },
    ],
    savings: '40-60%', timeline: '4-10 mo', complexity: 4, qualify: 'yes',
    steps: [
      { title: 'Step 1: File Correct Return (Replaces SFR)', description: 'Include all deductions and credits the IRS missed' },
      { title: 'Step 2: TC 291 Posts (Assessment Drops)', description: 'Balance reduced by 40-60% on average' },
      { title: 'Step 3: Request FTA on Remaining Penalties', description: 'Remove penalties from the corrected balance' },
      { title: 'Step 4: File OIC/IA on Reduced Balance', description: 'Resolve at a fraction of the original SFR amount' },
    ],
    links: [
      { label: 'SFR Dispute', href: '/tools/sfr-dispute', icon: 'fa-file-circle-xmark', color: '#D97706', bg: '#FEF3C7' },
      { label: 'Amended Return', href: '/tools/amended-return', icon: 'fa-file-pen', color: '#1A1A2E', bg: '#EBF0FF' },
    ],
  },
  {
    id: 'j', playLabel: 'Play J', playColor: '#1A1A2E', title: 'SCRA Protection Stack',
    iconBg: '#EBF0FF', iconContent: <i className="fa-solid fa-shield-halved" style={{ fontSize: 16, color: '#1A1A2E' }} />,
    isSpecialty: true,
    conditionLabel: 'Active-duty military', conditionColor: '#1A1A2E', conditionBg: '#EBF0FF', conditionBorder: 'rgba(0,61,165,0.2)',
    tags: [
      { label: 'SCRA', color: '#1A1A2E', bg: '#EBF0FF', separator: 'plus' },
      { label: 'CSED Tolling', color: '#0D9488', bg: '#F0FDFA', separator: 'plus' },
      { label: 'Extensions', color: '#D97706', bg: '#FEF3C7' },
    ],
    savings: 'Varies', timeline: 'During service', complexity: 3, qualify: 'maybe',
    steps: [
      { title: 'Step 1: Notify IRS of Military Status', description: 'Submit orders and SCRA documentation' },
      { title: 'Step 2: Request 6% Interest Cap', description: 'Reduce interest on pre-service debt to 6%' },
      { title: 'Step 3: File Extensions for Combat Zone Years', description: 'Deadline extensions for deployed servicemembers' },
      { title: 'Step 4: Apply for Resolution After Service', description: 'File OIC/IA with tolled CSED advantage' },
    ],
    links: [{ label: 'Military SCRA Protections', href: '/tools/military-scra', icon: 'fa-shield-halved', color: '#1A1A2E', bg: '#EBF0FF' }],
  },
]

function StrategyCard({ s, isExpanded, onToggle }: { s: Strategy; isExpanded: boolean; onToggle: () => void }) {
  const router = useRouter()

  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer overflow-hidden rounded-2xl border-[1.5px] bg-white transition-all duration-[350ms] ${
        s.recommended
          ? 'border-[#00A651]'
          : isExpanded ? 'border-[#1A1A2E] shadow-[0_1px_2px_rgba(0,0,0,0.03)]' : 'border-[#F0F0F5] hover:border-[rgba(0,61,165,0.2)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
      }`}
    >
      {/* Header */}
      <div style={{ padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {s.iconContent}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: s.playColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.playLabel}</span>
            {s.recommended && (
              <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'white', background: '#00A651', padding: '2px 8px', borderRadius: 20 }}>{s.recommendedLabel}</span>
            )}
            {s.conditionLabel && (
              <span style={{ fontSize: '0.625rem', fontWeight: 600, color: s.conditionColor, background: s.conditionBg, border: `1px solid ${s.conditionBorder}`, padding: '2px 8px', borderRadius: 20 }}>{s.conditionLabel}</span>
            )}
          </div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 2 }}>{s.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            {s.tags.map((tag, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: tag.color, background: tag.bg, padding: '2px 8px', borderRadius: 8 }}>{tag.label}</span>
                {tag.separator && i < s.tags.length - 1 && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#B0B0C8', fontSize: 10, margin: '0 4px' }}>
                    <i className={`fa-solid fa-${tag.separator === 'arrow' ? 'arrow-right' : 'plus'}`} style={{ fontSize: tag.separator === 'plus' ? 8 : 10 }} />
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
        <i className={`fa-solid fa-chevron-down transition-transform duration-[350ms] ${isExpanded ? 'rotate-180' : ''}`} style={{ color: '#B0B0C8', fontSize: 12, marginTop: 4 }} />
      </div>

      {/* Expandable Body */}
      <div style={{ maxHeight: isExpanded ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid #F0F0F5' }}>
          <div style={{ paddingTop: 14 }}>
            {/* Description for specialty cards */}
            {s.isSpecialty && s.id === 'g' && (
              <p style={{ fontSize: '0.8125rem', color: '#5C5C7A', lineHeight: 1.5, marginBottom: 14 }}>If your Collection Statute Expiration Date is within 3 years, combining CNC status with strategic waiting may result in the debt expiring entirely -- at zero cost.</p>
            )}
            {s.isSpecialty && s.id === 'h' && (
              <p style={{ fontSize: '0.8125rem', color: '#5C5C7A', lineHeight: 1.5, marginBottom: 14 }}>If you have an active NFTL, getting a lien subordination or discharge first enables refinancing or property sales that fund your OIC or IA.</p>
            )}
            {s.isSpecialty && s.id === 'i' && (
              <p style={{ fontSize: '0.8125rem', color: '#5C5C7A', lineHeight: 1.5, marginBottom: 14 }}>Substitute for Returns overstate your tax because they miss your deductions and credits. Filing your own return first can reduce your balance by 40-60% before starting resolution.</p>
            )}
            {s.isSpecialty && s.id === 'j' && (
              <p style={{ fontSize: '0.8125rem', color: '#5C5C7A', lineHeight: 1.5, marginBottom: 14 }}>Servicemembers can stack multiple protections: 6% interest cap, CSED tolling during service, filing extensions, and collection halt -- maximizing time and reducing cost.</p>
            )}

            {/* Meta Row */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Savings</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, color: '#00A651' }}>{s.savings}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Timeline</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E' }}>{s.timeline}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Complexity</p>
                <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <i key={n} className={`${n <= s.complexity ? 'fa-solid' : 'fa-regular'} fa-star`} style={{ fontSize: 10, color: n <= s.complexity ? '#F5A623' : '#E8E8F0' }} />
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Qualify?</p>
                {s.qualify === 'yes' ? (
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#00A651' }}><i className="fa-solid fa-circle-check" /> Yes</span>
                ) : (
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623' }}><i className="fa-solid fa-circle-exclamation" /> Maybe</span>
                )}
              </div>
            </div>

            {/* Steps */}
            {s.steps.length > 0 && (
              <div style={{ position: 'relative', paddingLeft: 24 }}>
                <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: '#1A1A2E', borderRadius: 2 }} />
                {s.steps.map((step) => (
                  <div key={step.title} style={{ position: 'relative', padding: '8px 0' }}>
                    <div style={{ position: 'absolute', left: -20, top: 14, width: 10, height: 10, borderRadius: '50%', background: '#1A1A2E', border: '2px solid white', boxShadow: '0 0 0 2px #1A1A2E' }} />
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A2E' }}>{step.title}</p>
                    <p style={{ fontSize: '0.75rem', color: '#5C5C7A' }}>{step.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Year Split */}
            {s.yearSplit && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.yearSplit.map(ys => (
                  <div key={ys.year} style={{ padding: 12, background: ys.badgeBg, borderRadius: 10, border: `1px solid ${ys.badgeBorder}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: ys.yearColor }}>{ys.year}</span>
                      <span style={{ fontSize: '0.625rem', fontWeight: 600, background: ys.badgeBg, color: ys.badgeColor, border: `1px solid ${ys.badgeBorder}`, padding: '1px 8px', borderRadius: 8 }}>{ys.badge}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#5C5C7A' }}>{ys.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Example */}
            {s.example && (
              <div style={{ marginTop: 14, padding: 12, background: '#FAFAFF', borderRadius: 12, border: '1px solid #F0F0F5' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Example</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {s.example.parts.map((part, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: part.size || '0.8125rem', fontWeight: part.weight ? Number(part.weight) : 400, color: part.color || '#5C5C7A' }}>{part.text}</span>
                      {i < s.example!.parts.length - 1 && <i className="fa-solid fa-arrow-right" style={{ fontSize: 9, color: '#B0B0C8' }} />}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tip */}
            {s.tip && (
              <div style={{ marginTop: 14, padding: '10px 12px', background: s.tip.bg, borderRadius: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <i className={`fa-solid ${s.tip.icon}`} style={{ color: s.tip.color, fontSize: 13, marginTop: 2 }} />
                <p style={{ fontSize: '0.75rem', color: s.tip.color, fontWeight: 500 }}>{s.tip.text}</p>
              </div>
            )}

            {/* Links */}
            {s.links && (
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                {s.links.map(link => (
                  <button key={link.label} onClick={(e) => { e.stopPropagation(); router.push(link.href) }} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: link.bg, borderRadius: 10, border: 'none', cursor: 'pointer', textDecoration: 'none' }}>
                    <i className={`fa-solid ${link.icon}`} style={{ color: link.color, fontSize: 13 }} />
                    <p style={{ fontSize: '0.75rem', color: link.color, fontWeight: 600, margin: 0 }}>{link.label}</p>
                    {s.links!.length === 1 && <i className="fa-solid fa-arrow-right" style={{ color: link.color, fontSize: 10, marginLeft: 'auto' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StrategicPlaysPage() {
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function toggleCard(id: string) {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px' }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 16, color: '#1A1A2E' }} />
          </button>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E' }}>Resolution Strategies</span>
          <button style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fa-solid fa-info-circle" style={{ fontSize: 16, color: '#8585A0' }} />
          </button>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          {/* Title */}
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25, marginBottom: 6 }}>Advanced Resolution Strategies</h1>
          <p style={{ fontSize: '0.8125rem', color: '#5C5C7A', marginBottom: 20 }}>Combine multiple approaches for optimal outcomes</p>

          {/* Strategy Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STRATEGIES.map(s => (
              <StrategyCard key={s.id} s={s} isExpanded={expandedId === s.id} onToggle={() => toggleCard(s.id)} />
            ))}

            {/* Specialty Section Divider */}
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: '#F0F0F5' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>Specialty-Aware Plays</span>
              <div style={{ flex: 1, height: 1, background: '#F0F0F5' }} />
            </div>

            {SPECIALTY_STRATEGIES.map(s => (
              <StrategyCard key={s.id} s={s} isExpanded={expandedId === s.id} onToggle={() => toggleCard(s.id)} />
            ))}
          </div>

          {/* CTA Section */}
          <div style={{ marginTop: 24 }}>
            <button onClick={() => router.push('/expert')} style={{ width: '100%', padding: '16px 28px', background: '#1A1A2E', color: 'white', border: 'none', borderRadius: 9999, fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <i className="fa-solid fa-comments" /> Discuss with Expert
            </button>
          </div>
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <Link href="/analysis/results" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#5C5C7A', textDecoration: 'none' }}>
              <i className="fa-solid fa-arrow-left" style={{ fontSize: 10, marginRight: 4 }} /> Back to Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
