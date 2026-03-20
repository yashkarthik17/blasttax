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

/* Carousel slides matching 03-onboarding-welcome.html exactly */
const CAROUSEL_SLIDES = [
  {
    title: 'Understand Your Tax Debt',
    description: "We'll analyze your situation and find the best path forward",
    icon: 'fas fa-search-dollar',
    circleBg: '#EFF4FF',
    circleRingBg: 'rgba(10,22,40,0.06)',
    iconColor: '#0A1628',
  },
  {
    title: 'AI-Powered Analysis',
    description: 'Our smart engine evaluates 13+ resolution strategies to find your best option',
    icon: 'fas fa-wand-magic-sparkles',
    circleBg: '#F5F0FF',
    circleRingBg: 'rgba(124,58,237,0.06)',
    iconColor: '#7C3AED',
  },
  {
    title: 'Expert Support',
    description: 'Connect with licensed tax professionals when you need them',
    icon: 'fas fa-headset',
    circleBg: '#E6F9EE',
    circleRingBg: 'rgba(0,166,81,0.06)',
    iconColor: '#00A651',
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

  useEffect(() => {
    if (stepIndex === -1) {
      router.replace('/welcome')
    }
  }, [stepIndex, router])

  if (stepIndex === -1) {
    return null
  }

  const totalSteps = STEPS.length
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
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: '#0A1628', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  /* ============ WELCOME (carousel matching 03-onboarding-welcome.html) ============ */
  if (currentStep === 'welcome') {
    const slide = CAROUSEL_SLIDES[carouselIndex]
    const isLastSlide = carouselIndex === CAROUSEL_SLIDES.length - 1

    function goToSlide(index: number) {
      if (index < 0) index = 0
      if (index >= CAROUSEL_SLIDES.length) index = CAROUSEL_SLIDES.length - 1
      setCarouselIndex(index)
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center" style={{ background: '#F8FAFC', padding: 20 }}>
        <div
          className="w-full max-w-md flex flex-col"
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            overflow: 'hidden',
            minHeight: 600,
            maxHeight: '90vh',
            position: 'relative',
          }}
        >
          {/* Skip link */}
          <div className="flex justify-end" style={{ padding: '12px 20px 0', position: 'relative', zIndex: 5 }}>
            <button
              onClick={handleContinue}
              style={{
                fontSize: 14, fontWeight: 600, color: '#94A3B8',
                padding: '8px 16px', background: 'transparent',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                opacity: isLastSlide ? 0 : 1,
                pointerEvents: isLastSlide ? 'none' : 'auto',
              }}
            >
              Skip
            </button>
          </div>

          {/* Carousel content */}
          <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '0 32px', textAlign: 'center' }}>
            {/* Illustration circle */}
            <div
              style={{
                width: 180, height: 180, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 32, position: 'relative',
                background: slide.circleBg,
              }}
            >
              <div
                className="animate-[breathe_6s_ease-in-out_infinite]"
                style={{
                  position: 'absolute', inset: -12, borderRadius: '50%',
                  opacity: 0.4, background: slide.circleRingBg,
                }}
              />
              <i
                className={slide.icon}
                style={{ fontSize: 56, position: 'relative', zIndex: 1, color: slide.iconColor }}
              />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, marginBottom: 12 }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6, maxWidth: 280 }}>
              {slide.description}
            </p>
          </div>

          {/* Bottom section: dots + button */}
          <div style={{ position: 'relative', zIndex: 5, padding: '0 24px 40px', flexShrink: 0 }}>
            {/* Dot indicators */}
            <div className="flex justify-center" style={{ gap: 8, marginBottom: 24 }}>
              {CAROUSEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  style={{
                    width: i === carouselIndex ? 28 : 8,
                    height: 8,
                    borderRadius: 9999,
                    background: i === carouselIndex ? '#2563EB' : '#F1F5F9',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                />
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={() => {
                if (isLastSlide) {
                  handleContinue()
                } else {
                  goToSlide(carouselIndex + 1)
                }
              }}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                borderRadius: 9999,
                padding: '16px 28px',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: isLastSlide ? '#00A651' : '#0A1628',
                color: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
                transition: 'background 0.3s ease',
              }}
            >
              {isLastSlide ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>

        <style jsx global>{`
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
        `}</style>
      </div>
    )
  }

  /* ============ STEP FORM PAGES ============ */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: '#F8FAFC',
    border: '1.5px solid #F1F5F9',
    borderRadius: 12,
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: '#0A1628',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = '#0A1628'
    e.currentTarget.style.background = '#FFFFFF'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)'
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = '#F1F5F9'
    e.currentTarget.style.background = '#F8FAFC'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center" style={{ background: '#F8FAFC', padding: '16px 16px 32px' }}>
      {/* Progress indicator */}
      {!isLast && (
        <div className="mb-8 w-full max-w-lg">
          <div className="flex items-center justify-between" style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500, marginBottom: 8 }}>
            <span>Step {stepIndex + 1} of {totalSteps}</span>
            <span>{Math.round(((stepIndex + 1) / totalSteps) * 100)}%</span>
          </div>
          <div style={{ height: 4, width: '100%', overflow: 'hidden', borderRadius: 9999, background: '#F1F5F9' }}>
            <div
              style={{
                height: '100%', borderRadius: 9999, background: '#0A1628',
                transition: 'width 0.5s ease',
                width: `${((stepIndex + 1) / totalSteps) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-lg" style={{ borderRadius: 20, border: '1px solid #F1F5F9', background: '#FFFFFF', padding: '24px 24px 28px', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)' }}>
        {/* ============ NAME ============ */}
        {currentStep === 'name' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>What&apos;s your name?</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>We&apos;ll use this throughout your tax resolution process.</p>
            </div>
            <div className="flex flex-col" style={{ gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>First Name</label>
                <input type="text" value={data.firstName} onChange={(e) => update({ firstName: e.target.value })} placeholder="John" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Name</label>
                <input type="text" value={data.lastName} onChange={(e) => update({ lastName: e.target.value })} placeholder="Doe" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
          </div>
        )}

        {/* ============ DOB ============ */}
        {currentStep === 'dob' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Date of Birth</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>Required for IRS forms and identity verification.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Month</label>
                <select value={data.dobMonth} onChange={(e) => update({ dobMonth: e.target.value })} style={{ ...inputStyle, appearance: 'auto' } as React.CSSProperties} onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLSelectElement>} onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLSelectElement>}>
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (<option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Day</label>
                <select value={data.dobDay} onChange={(e) => update({ dobDay: e.target.value })} style={{ ...inputStyle, appearance: 'auto' } as React.CSSProperties} onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLSelectElement>} onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLSelectElement>}>
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (<option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Year</label>
                <select value={data.dobYear} onChange={(e) => update({ dobYear: e.target.value })} style={{ ...inputStyle, appearance: 'auto' } as React.CSSProperties} onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLSelectElement>} onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLSelectElement>}>
                  <option value="">Year</option>
                  {Array.from({ length: 80 }, (_, i) => { const year = new Date().getFullYear() - 18 - i; return <option key={year} value={String(year)}>{year}</option> })}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ============ EMAIL ============ */}
        {currentStep === 'email' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Your Email</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>We&apos;ll use this for account access and important notifications.</p>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <input type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="john@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>
        )}

        {/* ============ FILING STATUS ============ */}
        {currentStep === 'filing-status' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Filing Status</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>Select the filing status that applies to you.</p>
            </div>
            <div className="flex flex-col" style={{ gap: 8 }}>
              {FILING_STATUSES.map((status) => (
                <button
                  key={status.value}
                  onClick={() => update({ filingStatus: status.value })}
                  className="flex items-center"
                  style={{
                    width: '100%', gap: 14, padding: 16, textAlign: 'left',
                    background: data.filingStatus === status.value ? '#EFF4FF' : '#FFFFFF',
                    border: `1.5px solid ${data.filingStatus === status.value ? '#0A1628' : '#F1F5F9'}`,
                    borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: '0.9375rem', fontWeight: 500, color: '#0A1628',
                    transition: 'all 0.25s ease',
                    boxShadow: data.filingStatus === status.value ? '0 1px 3px rgba(10,22,40,0.06)' : 'none',
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 9999, border: `2px solid ${data.filingStatus === status.value ? '#0A1628' : '#E2E8F0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: data.filingStatus === status.value ? '#0A1628' : 'transparent', transition: 'all 0.15s ease',
                  }}>
                    {data.filingStatus === status.value && <div style={{ width: 8, height: 8, borderRadius: 9999, background: '#FFFFFF' }} />}
                  </div>
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ SPOUSE ============ */}
        {currentStep === 'spouse' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Spouse Information</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>Since you selected a married filing status, we need your spouse&apos;s details.</p>
            </div>
            <div className="flex flex-col" style={{ gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spouse First Name</label>
                <input type="text" value={data.spouseFirstName} onChange={(e) => update({ spouseFirstName: e.target.value })} placeholder="Jane" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spouse Last Name</label>
                <input type="text" value={data.spouseLastName} onChange={(e) => update({ spouseLastName: e.target.value })} placeholder="Doe" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
          </div>
        )}

        {/* ============ DEPENDENTS ============ */}
        {currentStep === 'dependents' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Dependents</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>How many dependents do you claim on your tax return?</p>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Number of Dependents</label>
              <div className="flex items-center gap-4">
                <button onClick={() => { const count = Math.max(0, data.dependentCount - 1); const names = data.dependentNames.slice(0, count); update({ dependentCount: count, dependentNames: names }) }} style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid #F1F5F9', background: '#F8FAFC', fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628' }}>-</button>
                <span style={{ minWidth: 48, textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, color: '#0A1628' }}>{data.dependentCount}</span>
                <button onClick={() => { const count = data.dependentCount + 1; const names = [...data.dependentNames, '']; update({ dependentCount: count, dependentNames: names }) }} style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid #F1F5F9', background: '#F8FAFC', fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628' }}>+</button>
              </div>
            </div>
            {data.dependentCount > 0 && (
              <div className="flex flex-col" style={{ gap: 12 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dependent Names</label>
                {Array.from({ length: data.dependentCount }, (_, i) => (
                  <input key={i} type="text" value={data.dependentNames[i] ?? ''} onChange={(e) => { const names = [...data.dependentNames]; names[i] = e.target.value; update({ dependentNames: names }) }} placeholder={`Dependent ${i + 1} full name`} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============ INCOME SOURCES ============ */}
        {currentStep === 'income-sources' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Income Sources</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>Select all income types that apply to you.</p>
            </div>
            <div className="flex flex-col" style={{ gap: 8 }}>
              {INCOME_SOURCES.map((source) => {
                const checked = data.incomeSources.includes(source)
                return (
                  <button key={source} onClick={() => { const next = checked ? data.incomeSources.filter((s) => s !== source) : [...data.incomeSources, source]; update({ incomeSources: next }) }} className="flex items-center" style={{ width: '100%', gap: 14, padding: 16, textAlign: 'left', background: checked ? '#EFF4FF' : '#FFFFFF', border: `1.5px solid ${checked ? '#0A1628' : '#F1F5F9'}`, borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9375rem', fontWeight: 500, color: '#0A1628', transition: 'all 0.25s ease', boxShadow: checked ? '0 1px 3px rgba(10,22,40,0.06)' : 'none' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? '#0A1628' : '#E2E8F0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: checked ? '#0A1628' : 'transparent', transition: 'all 0.15s ease' }}>
                      {checked && <i className="fas fa-check" style={{ fontSize: 10, color: '#FFFFFF' }} />}
                    </div>
                    {source}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ============ BUSINESS INFO ============ */}
        {currentStep === 'business-info' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Business Information</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>Do you own or operate a business?</p>
            </div>
            <div>
              <button onClick={() => update({ hasBusiness: !data.hasBusiness })} className="flex items-center" style={{ gap: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                <div style={{ position: 'relative', height: 24, width: 44, borderRadius: 9999, background: data.hasBusiness ? '#0A1628' : '#CBD5E1', transition: 'background 0.25s ease' }}>
                  <div style={{ position: 'absolute', top: 2, width: 20, height: 20, borderRadius: 9999, background: '#FFFFFF', transition: 'transform 0.25s ease', transform: data.hasBusiness ? 'translateX(20px)' : 'translateX(2px)' }} />
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9375rem', color: '#0A1628' }}>{data.hasBusiness ? 'Yes, I have a business' : 'No business'}</span>
              </button>
            </div>
            {data.hasBusiness && (
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Entity Type</label>
                <select value={data.entityType} onChange={(e) => update({ entityType: e.target.value })} style={{ ...inputStyle, appearance: 'auto' } as React.CSSProperties} onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLSelectElement>} onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLSelectElement>}>
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
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Your Address</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>We need your mailing address for IRS correspondence.</p>
            </div>
            <div className="flex flex-col" style={{ gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Street Address</label>
                <input type="text" value={data.street} onChange={(e) => update({ street: e.target.value })} placeholder="123 Main St" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</label>
                <input type="text" value={data.city} onChange={(e) => update({ city: e.target.value })} placeholder="Los Angeles" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>State</label>
                  <select value={data.state} onChange={(e) => update({ state: e.target.value })} style={{ ...inputStyle, appearance: 'auto' } as React.CSSProperties} onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLSelectElement>} onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLSelectElement>}>
                    <option value="">State</option>
                    {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ZIP Code</label>
                  <input type="text" value={data.zip} onChange={(e) => update({ zip: e.target.value })} placeholder="90001" maxLength={5} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ SITUATION ============ */}
        {currentStep === 'situation' && (
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Your Tax Situation</h2>
              <p style={{ marginTop: 4, fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>Select all that apply to your current situation.</p>
            </div>
            <div className="flex flex-col" style={{ gap: 8 }}>
              {TAX_SITUATIONS.map((situation) => {
                const checked = data.taxSituations.includes(situation)
                return (
                  <button key={situation} onClick={() => { const next = checked ? data.taxSituations.filter((s) => s !== situation) : [...data.taxSituations, situation]; update({ taxSituations: next }) }} className="flex items-center" style={{ width: '100%', gap: 14, padding: 16, textAlign: 'left', background: checked ? '#EFF4FF' : '#FFFFFF', border: `1.5px solid ${checked ? '#0A1628' : '#F1F5F9'}`, borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9375rem', fontWeight: 500, color: '#0A1628', transition: 'all 0.25s ease', boxShadow: checked ? '0 1px 3px rgba(10,22,40,0.06)' : 'none' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? '#0A1628' : '#E2E8F0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: checked ? '#0A1628' : 'transparent', transition: 'all 0.15s ease' }}>
                      {checked && <i className="fas fa-check" style={{ fontSize: 10, color: '#FFFFFF' }} />}
                    </div>
                    {situation}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ============ COMPLETE ============ */}
        {currentStep === 'complete' && (
          <div className="flex flex-col items-center text-center" style={{ gap: 24, padding: '20px 0' }}>
            <div className="flex items-center justify-center" style={{ width: 80, height: 80, borderRadius: '50%', background: '#E6F9EE' }}>
              <i className="fas fa-check" style={{ fontSize: 32, color: '#00A651' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>You&apos;re All Set!</h2>
              <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6 }}>
                Welcome aboard, {data.firstName || 'there'}! Your profile is complete. Head to your dashboard to start resolving your tax situation.
              </p>
            </div>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', borderRadius: 9999, padding: '16px 28px',
                fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600,
                background: '#00A651', color: '#FFFFFF', textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
                transition: 'opacity 0.15s ease',
              }}
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Navigation buttons (not on complete) */}
        {currentStep !== 'complete' && (
          <div className="flex items-center gap-3" style={{ marginTop: 32 }}>
            <button
              onClick={handleBack}
              style={{
                flex: 1, borderRadius: 9999, padding: '14px 24px',
                fontFamily: 'inherit', fontSize: '0.9375rem', fontWeight: 600,
                border: '1.5px solid #E2E8F0', background: '#FFFFFF', color: '#0A1628',
                cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              style={{
                flex: 1, borderRadius: 9999, padding: '14px 24px',
                fontFamily: 'inherit', fontSize: '0.9375rem', fontWeight: 600,
                border: 'none', background: '#0A1628', color: '#FFFFFF',
                cursor: 'pointer', transition: 'opacity 0.15s ease',
              }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
