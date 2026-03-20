'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Basic tax resolution analysis',
    features: [
      '1 active case',
      'Basic resolution analysis',
      'Educational content',
      'Community support',
    ],
    cta: 'Current Plan',
    current: true,
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Full-featured tax resolution',
    features: [
      'Unlimited cases',
      'Advanced resolution analysis',
      'OIC & RCP calculations',
      'Form generation (9465, 656)',
      'AI assistant access',
      'Document vault',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    current: false,
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For tax professionals',
    features: [
      'Everything in Pro',
      'Multi-client management',
      'API access',
      'Custom branding',
      'Bulk analysis',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    current: false,
    highlighted: false,
  },
]

const TABS = [
  { key: '', label: 'Overview', href: '/billing' },
  { key: 'plans', label: 'Plans', href: '/billing/plans' },
  { key: 'payment-methods', label: 'Payment Methods', href: '/billing/payment-methods' },
  { key: 'invoices', label: 'Invoices', href: '/billing/invoices' },
]

export default function BillingPage() {
  const params = useParams()
  const pathSegments = (params.path as string[]) || []
  const currentSection = pathSegments[0] || ''

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">
            Manage your subscription, payment methods, and invoices.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--border)]">
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={`relative px-5 py-3 text-sm font-medium transition ${
                  currentSection === tab.key
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {tab.label}
                {currentSection === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        {currentSection === '' && <OverviewSection />}
        {currentSection === 'plans' && <PlansSection />}
        {currentSection === 'payment-methods' && <PaymentMethodsSection />}
        {currentSection === 'invoices' && <InvoicesSection />}
      </div>
    </div>
  )
}

/* ---- Overview ---- */
function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Free Plan</h2>
              <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                Current
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              Basic access to tax resolution analysis tools.
            </p>
          </div>
          <Link
            href="/billing/plans"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
        <h3 className="text-lg font-semibold">Usage</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Active Cases</p>
            <p className="mt-1 text-2xl font-bold">0 / 1</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--secondary)]">
              <div className="h-1.5 w-0 rounded-full bg-[var(--primary)]" />
            </div>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Analyses Run</p>
            <p className="mt-1 text-2xl font-bold">0</p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Documents Stored</p>
            <p className="mt-1 text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Plans ---- */
function PlansSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-xl border p-6 ${
            plan.highlighted
              ? 'border-[var(--primary)] bg-[var(--card)]'
              : 'border-[var(--border)] bg-[var(--card)]'
          }`}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-medium text-white">
              Most Popular
            </span>
          )}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{plan.description}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-[var(--muted-foreground)]">{plan.period}</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-4 w-4 shrink-0 text-[var(--primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                plan.current
                  ? 'border border-[var(--border)] bg-[var(--secondary)] text-[var(--muted-foreground)] cursor-default'
                  : plan.highlighted
                    ? 'bg-[var(--primary)] text-white hover:opacity-90'
                    : 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---- Payment Methods ---- */
function PaymentMethodsSection() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Payment Methods</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Card
        </button>
      </div>

      {/* Empty State */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
            <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold">No payment methods</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Add a credit or debit card to upgrade your plan.
          </p>
        </div>
      </div>

      {/* Add Card Form (mock) */}
      {showAddForm && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <h3 className="text-lg font-semibold">Add New Card</h3>
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">Card Number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">CVC</label>
              <input
                type="text"
                placeholder="123"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
            >
              Cancel
            </button>
            <button className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Save Card
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---- Invoices ---- */
function InvoicesSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Invoice History</h2>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-4 gap-4 border-b border-[var(--border)] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
          <span>Invoice</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
            <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold">No invoices yet</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Invoices will appear here once you upgrade your plan.
          </p>
        </div>
      </div>
    </div>
  )
}
