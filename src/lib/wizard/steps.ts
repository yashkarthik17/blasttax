export interface WizardStep {
  id: string
  path: string
  title: string
  phase: string
  order: number
  conditional?: (answers: Record<string, any>) => boolean
}

export const INDIVIDUAL_STEPS: WizardStep[] = [
  { id: 'type', path: '/analysis/type', title: 'Analysis Type', phase: 'setup', order: 0 },
  { id: 'welcome', path: '/analysis/welcome', title: 'Welcome', phase: 'setup', order: 1 },
  // Pre-qualifier (16 questions)
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `pq-${i + 1}`,
    path: `/analysis/pre-qualifier/${i + 1}`,
    title: `Pre-Qualifier ${i + 1}`,
    phase: 'pre-qualifier',
    order: 10 + i,
  })),
  { id: 'screening-result', path: '/analysis/screening-result', title: 'Screening Result', phase: 'screening', order: 30 },
  { id: 'personal-info', path: '/analysis/personal-info', title: 'Personal Information', phase: 'collection', order: 31 },
  { id: 'employment', path: '/analysis/employment', title: 'Employment', phase: 'collection', order: 32 },
  { id: 'household', path: '/analysis/household', title: 'Household', phase: 'collection', order: 33 },
  { id: 'transcript', path: '/analysis/transcript', title: 'Transcript Upload', phase: 'collection', order: 34 },
  { id: 'case-info', path: '/analysis/case-info', title: 'Tax Debt Entry', phase: 'collection', order: 35 },
  { id: 'case-review', path: '/analysis/case-review', title: 'Debt Review', phase: 'collection', order: 36 },
  // Assets (8 categories)
  ...['bank-accounts', 'investments', 'retirement', 'real-estate', 'vehicles', 'life-insurance', 'crypto', 'other'].map((cat, i) => ({
    id: `asset-${cat}`,
    path: `/analysis/assets/${cat}`,
    title: cat.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
    phase: 'assets',
    order: 40 + i,
  })),
  { id: 'income-expenses', path: '/analysis/income-expenses', title: 'Income & Expenses', phase: 'financial', order: 50 },
  { id: 'csed-review', path: '/analysis/csed-review', title: 'CSED Review', phase: 'financial', order: 51 },
  { id: 'penalty-screening', path: '/analysis/penalty-screening', title: 'Penalty Screening', phase: 'financial', order: 52, conditional: (a) => a.hasPriorPenalties === true },
  { id: 'verification', path: '/analysis/verification', title: 'Final Verification', phase: 'verification', order: 60 },
  { id: 'processing', path: '/analysis/processing', title: 'Processing', phase: 'processing', order: 61 },
  { id: 'results', path: '/analysis/results', title: 'Your Results', phase: 'results', order: 70 },
]

export const BUSINESS_STEPS: WizardStep[] = [
  // Same PQ steps, then business-specific...
  { id: 'biz-screening', path: '/analysis/business/screening', title: 'Business Screening', phase: 'business', order: 31 },
  { id: 'biz-entity', path: '/analysis/business/entity-type', title: 'Entity Type', phase: 'business', order: 32 },
  { id: 'biz-compliance', path: '/analysis/business/compliance', title: 'Filing Compliance', phase: 'business', order: 33 },
  { id: 'biz-deposits', path: '/analysis/business/deposits', title: 'Deposit Compliance', phase: 'business', order: 34 },
  { id: 'biz-trust-fund', path: '/analysis/business/trust-fund', title: 'Trust Fund Split', phase: 'business', order: 35 },
]

export function getStepsForTrack(track: 'Individual' | 'Business', answers: Record<string, any> = {}): WizardStep[] {
  const steps = track === 'Business'
    ? [...INDIVIDUAL_STEPS.filter(s => s.phase === 'setup' || s.phase === 'pre-qualifier' || s.phase === 'screening'), ...BUSINESS_STEPS, ...INDIVIDUAL_STEPS.filter(s => ['collection', 'assets', 'financial', 'verification', 'processing', 'results'].includes(s.phase))]
    : INDIVIDUAL_STEPS
  return steps.filter(s => !s.conditional || s.conditional(answers)).sort((a, b) => a.order - b.order)
}
