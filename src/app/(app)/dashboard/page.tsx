'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface OnboardingData {
  firstName: string
  lastName: string
}

export default function DashboardPage() {
  const [name, setName] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('blasttax_onboarding')
      if (stored) {
        const data: OnboardingData = JSON.parse(stored)
        setName(data.firstName || '')
      }
    } catch {
      // ignore
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back{name ? `, ${name}` : ''}
            </h1>
            <p className="mt-1 text-[var(--muted-foreground)]">
              Here&apos;s an overview of your tax resolution progress.
            </p>
          </div>
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-bold text-[var(--primary)] hover:bg-[var(--secondary)] transition"
          >
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </Link>
        </div>

        {/* Quick Action Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Start New Analysis - Primary */}
          <Link
            href="/analysis/type"
            className="group relative overflow-hidden rounded-xl bg-[var(--primary)] p-6 text-white shadow-lg transition hover:opacity-90"
          >
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/10" />
            <div className="relative space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Start New Analysis</h3>
                <p className="mt-1 text-sm text-white/70">
                  Analyze your tax situation and get resolution options.
                </p>
              </div>
            </div>
          </Link>

          {/* View Cases */}
          <Link
            href="/cases"
            className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--muted-foreground)]"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--secondary)]">
                <svg className="h-6 w-6 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">View Cases</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  Review and manage your existing cases.
                </p>
              </div>
            </div>
          </Link>

          {/* Resolution Center */}
          <Link
            href="/resolution"
            className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--muted-foreground)]"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--secondary)]">
                <svg className="h-6 w-6 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Resolution Center</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  Explore resolution strategies and track progress.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Status Indicators */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">Filed Returns</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--success)]/10">
                <svg className="h-4 w-4 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">Active Resolutions</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)]/10">
                <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">Pending Submissions</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--warning)]/10">
                <svg className="h-4 w-4 text-[var(--warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>
        </div>

        {/* Recent Cases */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-semibold">Recent Cases</h2>
          <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
              <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="mt-4 text-[var(--muted-foreground)]">
              No analyses yet. Start your first analysis to see resolution options.
            </p>
            <Link
              href="/analysis/type"
              className="mt-4 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Start Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
