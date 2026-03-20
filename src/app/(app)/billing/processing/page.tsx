'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProcessingPage() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (success) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-6">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-6 shadow-lg shadow-green-600/25 animate-bounce-once">
          <svg className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Text */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-extrabold text-white mb-2">Payment Successful!</h1>
          <p className="text-sm text-zinc-400">Your Pro Plan subscription is now active</p>
        </div>

        {/* Receipt Summary */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-sm text-zinc-400">Amount</span>
            <span className="text-sm font-bold text-white">$49.00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-sm text-zinc-400">Plan</span>
            <span className="text-sm font-semibold text-white">Pro Monthly</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-zinc-400">Next billing</span>
            <span className="text-sm font-semibold text-white">Apr 17, 2026</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center py-4 bg-white text-zinc-900 rounded-full text-[0.9rem] font-bold hover:bg-zinc-200 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-6 space-y-6">
      {/* Spinner */}
      <div className="w-[72px] h-[72px] border-4 border-zinc-800 border-t-white rounded-full animate-spin" />

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-xl font-extrabold text-white mb-2">Processing Your Payment...</h1>
        <p className="text-sm text-zinc-500">Please don&apos;t close this page</p>
      </div>

      {/* Animated Dots */}
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Amount */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-7 py-5 text-center">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Amount Being Charged</div>
        <div className="text-3xl font-black text-white tracking-tight">$49.00</div>
        <div className="text-xs text-zinc-500 mt-1">Pro Plan - Monthly</div>
      </div>

      {/* Secure Badge */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 rounded-full">
        <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <span className="text-xs font-semibold text-green-400">Secure payment via Stripe</span>
      </div>
    </div>
  )
}
