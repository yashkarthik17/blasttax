'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const STEPS = [
  'welcome',
  'name',
  'dob',
  'email',
  'filing-status',
  'spouse',
  'dependents',
  'income-sources',
  'business-info',
  'address',
  'situation',
  'complete',
] as const

type StepName = (typeof STEPS)[number]

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

const FILING_STATUSES = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Filing Jointly' },
  { value: 'mfs', label: 'Married Filing Separately' },
  { value: 'hoh', label: 'Head of Household' },
  { value: 'qw', label: 'Qualifying Widow(er)' },
]

const INCOME_SOURCES = ['W-2', '1099', 'Self-employed', 'Social Security', 'Pension', 'Other']

const TAX_SITUATIONS = [
  'IRS debt',
  'Unfiled returns',
  'Under audit',
  'Penalties',
  'Liens/levies',
  'Other',
]

const CAROUSEL_SLIDES = [
  {
    title: 'Resolve Your Tax Debt',
    description: 'BlastTax guides you through every step of IRS tax resolution — no tax professional required.',
    icon: '🎯',
  },
  {
    title: 'Smart Analysis',
    description: 'Our engine analyzes your situation and recommends the best resolution strategy for your case.',
    icon: '📊',
  },
  {
    title: 'Track Everything',
    description: 'Monitor your cases, deadlines, and submissions all in one place with real-time status updates.',
    icon: '📋',
  },
]

interface OnboardingData {
  firstName: string
  lastName: string
  dobMonth: string
  dobDay: string
  dobYear: string
  email: string
  filingStatus: string
  spouseFirstName: string
  spouseLastName: string
  dependentCount: number
  dependentNames: string[]
  incomeSources: string[]
  hasBusiness: boolean
  entityType: string
  street: string
  city: string
  state: string
  zip: string
  taxSituations: string[]
}

const DEFAULT_DATA: OnboardingData = {
  firstName: '',
  lastName: '',
  dobMonth: '',
  dobDay: '',
  dobYear: '',
  email: '',
  filingStatus: '',
  spouseFirstName: '',
  spouseLastName: '',
  dependentCount: 0,
  dependentNames: [],
  incomeSources: [],
  hasBusiness: false,
  entityType: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  taxSituations: [],
}

function loadData(): OnboardingData {
  if (typeof window === 'undefined') return DEFAULT_DATA
  try {
    const stored = localStorage.getItem('blasttax_onboarding')
    if (stored) return { ...DEFAULT_DATA, ...JSON.parse(stored) }
  } catch {
    // ignore
  }
  return DEFAULT_DATA
}

function saveData(data: OnboardingData) {
  if (typeof window === 'undefined') return
  localStorage.setItem('blasttax_onboarding', JSON.stringify(data))
}

export default function OnboardingStepPage() {
  const router = useRouter()
  const params = useParams()
  const stepSegments = params.step as string[]
  const currentStep = (stepSegments?.[0] ?? 'welcome') as StepName
  const stepIndex = STEPS.indexOf(currentStep)

  const [data, setData] = useState<OnboardingData>(DEFAULT_DATA)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setData(loadData())
    setMounted(true)
  }, [])

  const update = useCallback(
    (partial: Partial<OnboardingData>) => {
      setData((prev) => {
        const next = { ...prev, ...partial }
        saveData(next)
        return next
      })
    },
    [],
  )

  if (stepIndex === -1) {
    router.replace('/welcome')
    return null
  }

  const totalSteps = STEPS.length
  const isFirst = stepIndex === 0
  const isLast = stepIndex === totalSteps - 1

  function getNextStep(): StepName {
    if (currentStep === 'filing-status') {
      const needsSpouse = data.filingStatus === 'mfj' || data.filingStatus === 'mfs'
      return needsSpouse ? 'spouse' : 'dependents'
    }
    return STEPS[stepIndex + 1]
  }

  function getPrevStep(): StepName {
    if (currentStep === 'dependents') {
      const needsSpouse = data.filingStatus === 'mfj' || data.filingStatus === 'mfs'
      return needsSpouse ? 'spouse' : 'filing-status'
    }
    return STEPS[stepIndex - 1]
  }

  function handleContinue() {
    const next = getNextStep()
    router.push(`/${next}`)
  }

  function handleBack() {
    const prev = getPrevStep()
    router.push(`/${prev}`)
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-4 sm:p-8">
      {/* Progress indicator */}
      {!isLast && (
        <div className="mb-8 w-full max-w-lg">
          <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted-foreground)]">
            <span>Step {stepIndex + 1} of {totalSteps}</span>
            <span>{Math.round(((stepIndex + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--secondary)]">
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-lg">
        {/* ============ WELCOME ============ */}
        {currentStep === 'welcome' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">
                Welcome to Blast<span className="text-[var(--primary)]">Tax</span>
              </h1>
              <p className="mt-2 text-[var(--muted-foreground)]">
                Let&apos;s get your tax situation sorted out.
              </p>
            </div>

            {/* Carousel */}
            <div className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)] p-6">
              <div className="text-center space-y-3">
                <div className="text-4xl">{CAROUSEL_SLIDES[carouselIndex].icon}</div>
                <h2 className="text-xl font-semibold">{CAROUSEL_SLIDES[carouselIndex].title}</h2>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {CAROUSEL_SLIDES[carouselIndex].description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === carouselIndex
                        ? 'w-6 bg-[var(--primary)]'
                        : 'w-2 bg-[var(--muted-foreground)]/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90 transition"
            >
              Get Started
            </button>
          </div>
        )}

        {/* ============ NAME ============ */}
        {currentStep === 'name' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What&apos;s your name?</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                We&apos;ll use this throughout your tax resolution process.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                  First Name
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  placeholder="John"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                  Last Name
                </label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => update({ lastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============ DOB ============ */}
        {currentStep === 'dob' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Date of Birth</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Required for IRS forms and identity verification.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">Month</label>
                <select
                  value={data.dobMonth}
                  onChange={(e) => update({ dobMonth: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">Day</label>
                <select
                  value={data.dobDay}
                  onChange={(e) => update({ dobDay: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">Year</label>
                <select
                  value={data.dobYear}
                  onChange={(e) => update({ dobYear: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 80 }, (_, i) => {
                    const year = new Date().getFullYear() - 18 - i
                    return <option key={year} value={String(year)}>{year}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ============ EMAIL ============ */}
        {currentStep === 'email' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Your Email</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                We&apos;ll use this for account access and important notifications.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                Email Address
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          </div>
        )}

        {/* ============ FILING STATUS ============ */}
        {currentStep === 'filing-status' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Filing Status</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Select the filing status that applies to you.
              </p>
            </div>
            <div className="space-y-2">
              {FILING_STATUSES.map((status) => (
                <button
                  key={status.value}
                  onClick={() => update({ filingStatus: status.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-left font-medium transition ${
                    data.filingStatus === status.value
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                      : 'border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--muted-foreground)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        data.filingStatus === status.value
                          ? 'border-[var(--primary)]'
                          : 'border-[var(--muted-foreground)]'
                      }`}
                    >
                      {data.filingStatus === status.value && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                      )}
                    </div>
                    {status.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ SPOUSE ============ */}
        {currentStep === 'spouse' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Spouse Information</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Since you selected a married filing status, we need your spouse&apos;s details.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                  Spouse First Name
                </label>
                <input
                  type="text"
                  value={data.spouseFirstName}
                  onChange={(e) => update({ spouseFirstName: e.target.value })}
                  placeholder="Jane"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                  Spouse Last Name
                </label>
                <input
                  type="text"
                  value={data.spouseLastName}
                  onChange={(e) => update({ spouseLastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============ DEPENDENTS ============ */}
        {currentStep === 'dependents' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Dependents</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                How many dependents do you claim on your tax return?
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                Number of Dependents
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const count = Math.max(0, data.dependentCount - 1)
                    const names = data.dependentNames.slice(0, count)
                    update({ dependentCount: count, dependentNames: names })
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-lg font-bold hover:bg-[var(--secondary)] transition"
                >
                  -
                </button>
                <span className="min-w-[3rem] text-center text-2xl font-bold">
                  {data.dependentCount}
                </span>
                <button
                  onClick={() => {
                    const count = data.dependentCount + 1
                    const names = [...data.dependentNames, '']
                    update({ dependentCount: count, dependentNames: names })
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-lg font-bold hover:bg-[var(--secondary)] transition"
                >
                  +
                </button>
              </div>
            </div>
            {data.dependentCount > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[var(--muted-foreground)]">
                  Dependent Names
                </label>
                {Array.from({ length: data.dependentCount }, (_, i) => (
                  <input
                    key={i}
                    type="text"
                    value={data.dependentNames[i] ?? ''}
                    onChange={(e) => {
                      const names = [...data.dependentNames]
                      names[i] = e.target.value
                      update({ dependentNames: names })
                    }}
                    placeholder={`Dependent ${i + 1} full name`}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============ INCOME SOURCES ============ */}
        {currentStep === 'income-sources' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Income Sources</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Select all income types that apply to you.
              </p>
            </div>
            <div className="space-y-2">
              {INCOME_SOURCES.map((source) => {
                const checked = data.incomeSources.includes(source)
                return (
                  <button
                    key={source}
                    onClick={() => {
                      const next = checked
                        ? data.incomeSources.filter((s) => s !== source)
                        : [...data.incomeSources, source]
                      update({ incomeSources: next })
                    }}
                    className={`w-full rounded-lg border px-4 py-3 text-left font-medium transition ${
                      checked
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--muted-foreground)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                          checked ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--muted-foreground)]'
                        }`}
                      >
                        {checked && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {source}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ============ BUSINESS INFO ============ */}
        {currentStep === 'business-info' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Business Information</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Do you own or operate a business?
              </p>
            </div>
            <div>
              <button
                onClick={() => update({ hasBusiness: !data.hasBusiness })}
                className="flex items-center gap-3"
              >
                <div
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    data.hasBusiness ? 'bg-[var(--primary)]' : 'bg-[var(--muted-foreground)]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      data.hasBusiness ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <span className="font-medium">
                  {data.hasBusiness ? 'Yes, I have a business' : 'No business'}
                </span>
              </button>
            </div>
            {data.hasBusiness && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">
                  Entity Type
                </label>
                <select
                  value={data.entityType}
                  onChange={(e) => update({ entityType: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="">Select entity type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="single-member-llc">Single-Member LLC</option>
                  <option value="multi-member-llc">Multi-Member LLC</option>
                  <option value="s-corp">S Corporation</option>
                  <option value="c-corp">C Corporation</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* ============ ADDRESS ============ */}
        {currentStep === 'address' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Your Address</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                We need your mailing address for IRS correspondence.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">Street Address</label>
                <input
                  type="text"
                  value={data.street}
                  onChange={(e) => update({ street: e.target.value })}
                  placeholder="123 Main St"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">City</label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => update({ city: e.target.value })}
                  placeholder="Los Angeles"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">State</label>
                  <select
                    value={data.state}
                    onChange={(e) => update({ state: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  >
                    <option value="">State</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]">ZIP Code</label>
                  <input
                    type="text"
                    value={data.zip}
                    onChange={(e) => update({ zip: e.target.value })}
                    placeholder="90001"
                    maxLength={5}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ SITUATION ============ */}
        {currentStep === 'situation' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Your Tax Situation</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Select all that apply to your current situation.
              </p>
            </div>
            <div className="space-y-2">
              {TAX_SITUATIONS.map((situation) => {
                const checked = data.taxSituations.includes(situation)
                return (
                  <button
                    key={situation}
                    onClick={() => {
                      const next = checked
                        ? data.taxSituations.filter((s) => s !== situation)
                        : [...data.taxSituations, situation]
                      update({ taxSituations: next })
                    }}
                    className={`w-full rounded-lg border px-4 py-3 text-left font-medium transition ${
                      checked
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--muted-foreground)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                          checked ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--muted-foreground)]'
                        }`}
                      >
                        {checked && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {situation}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ============ COMPLETE ============ */}
        {currentStep === 'complete' && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--success)]/10">
              <svg className="h-10 w-10 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">You&apos;re All Set!</h2>
              <p className="mt-2 text-[var(--muted-foreground)]">
                Welcome aboard, {data.firstName || 'there'}! Your profile is complete. Head to your dashboard to start resolving your tax situation.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-block w-full rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Navigation buttons (not on welcome or complete) */}
        {currentStep !== 'welcome' && currentStep !== 'complete' && (
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex-1 rounded-lg border border-[var(--border)] px-6 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90 transition"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
