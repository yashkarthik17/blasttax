import Link from 'next/link'

export default function SplashPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold tracking-tight">
          Blast<span className="text-[var(--primary)]">Tax</span>
        </div>
        <p className="text-[var(--muted-foreground)] text-lg">
          Resolve your IRS tax debt — guided step by step
        </p>
        <div className="space-y-3 pt-4">
          <Link
            href="/login"
            className="block w-full rounded-lg bg-[var(--primary)] px-6 py-3 text-center font-medium text-white hover:opacity-90 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="block w-full rounded-lg border border-[var(--border)] px-6 py-3 text-center font-medium hover:bg-[var(--secondary)] transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
