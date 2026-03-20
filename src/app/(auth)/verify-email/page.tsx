'use client'

import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl">
          {/* Branding */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Blast<span className="text-[var(--primary)]">Tax</span>
            </h1>
          </div>

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[var(--primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Message */}
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
              Check your email
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-[var(--muted-foreground)]">
              We&apos;ve sent a verification link to your email address.
              Please click the link to verify your account and get started.
            </p>
            <p className="mb-6 text-xs text-[var(--muted-foreground)]">
              Didn&apos;t receive the email? Check your spam folder or try
              registering again.
            </p>
          </div>

          {/* Back to login */}
          <div className="text-center">
            <Link
              href="/login"
              className="inline-block rounded-lg bg-[var(--secondary)] px-6 py-2.5 text-sm font-medium text-[var(--secondary-foreground)] transition-opacity hover:opacity-80"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
