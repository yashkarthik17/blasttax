'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PlanId = 'free' | 'starter' | 'pro' | 'enterprise'

interface Plan {
  id: PlanId
  name: string
  price: string
  period?: string
  badge?: string
  recommended?: boolean
  current?: boolean
  features: string[]
  cta?: string
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    current: true,
    badge: 'Current Plan',
    features: ['Basic tax screening', '1 resolution analysis', 'Learn articles'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    period: '/mo',
    features: ['Full resolution analysis', 'IRS form preparation', 'AI chat assistant'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/mo',
    recommended: true,
    badge: 'Recommended',
    features: ['Everything in Starter', 'Expert consultation included', 'IRS representation', 'Priority support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: ['For tax professionals', 'Multi-client management', 'Custom integrations & API'],
    cta: 'Contact Sales',
  },
]

export default function PaywallPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('pro')

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Close */}
        <div className="flex justify-end">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(10,22,40,0.06)]"
          >
            <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="px-2.5 text-center">
          <div className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#0A1628]">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          </div>
          <h1 className="mb-1.5 text-2xl font-extrabold tracking-tight text-[#0A1628]">Unlock Full Access</h1>
          <p className="text-sm text-[#94A3B8]">Choose the plan that fits your needs</p>
        </div>

        {/* Plans */}
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => !plan.current && setSelectedPlan(plan.id)}
              className={`relative cursor-pointer overflow-hidden rounded-2xl border-[1.5px] p-[18px] transition hover:-translate-y-0.5 ${
                plan.current
                  ? 'border-[#E2E8F0] bg-[#F8FAFC]'
                  : plan.recommended
                    ? 'border-transparent p-5'
                    : 'border-[#E2E8F0] bg-white'
              } ${selectedPlan === plan.id && !plan.current ? 'ring-2 ring-[#0A1628]' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute right-4 top-0">
                  <div className="rounded-b-[10px] bg-[#0A1628] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-[#0A1628] ${plan.recommended ? 'text-[1.05rem] font-extrabold' : 'text-[0.95rem]'}`}>
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${
                        plan.current
                          ? 'bg-[#E2E8F0] text-[#64748B]'
                          : 'bg-[#EFF4FF] text-[#0A1628]'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>
                {plan.id !== 'enterprise' ? (
                  <div>
                    <span className={`font-extrabold text-[#0A1628] ${plan.recommended ? 'text-[1.4rem]' : plan.current ? 'text-[0.82rem]' : 'text-[1.25rem]'}`}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-[0.78rem] text-[#94A3B8]">{plan.period}</span>}
                  </div>
                ) : (
                  <span className="text-[0.88rem] font-semibold text-[#7C3AED]">{plan.price}</span>
                )}
              </div>
              <div className="space-y-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 py-0.5">
                    {plan.recommended ? (
                      <svg className="h-3 w-3 text-[#0A1628]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    ) : (
                      <svg className="h-2.5 w-2.5 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className={`text-[0.78rem] ${plan.recommended ? 'font-medium text-[#0A1628]' : 'text-[#64748B]'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              {plan.cta && (
                <div className="mt-2.5">
                  <span className="flex items-center gap-1 text-[0.8rem] font-semibold text-[#7C3AED]">
                    {plan.cta}
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00A651] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2v11h3v9l7-12h-4l4-8z" />
          </svg>
          Start Pro Trial &mdash; 7 days free
        </button>

        {/* Compare */}
        <div className="text-center">
          <button className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[#94A3B8] transition hover:text-[#0A1628]">
            Compare all features
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Reassurance */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          <svg className="h-3 w-3 text-[#00A651]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <span className="text-[0.72rem] font-medium text-[#94A3B8]">No commitment, cancel anytime</span>
        </div>
      </div>
    </div>
  )
}
