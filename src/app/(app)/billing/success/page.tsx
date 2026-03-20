'use client'

import Link from 'next/link'

const receiptItems = [
  { label: 'Plan', value: 'Pro Plan' },
  { label: 'Amount', value: '$49.00/mo' },
  { label: 'Next billing date', value: 'Apr 16, 2026' },
  { label: 'Payment method', value: 'Visa ****4242' },
]

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-6 relative">
      {/* Confetti dots (CSS-only subtle animation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 6, color: 'bg-green-400', top: '12%', left: '15%', delay: '0.3s' },
          { size: 5, color: 'bg-blue-400', top: '8%', left: '70%', delay: '0.5s' },
          { size: 7, color: 'bg-amber-400', top: '15%', left: '40%', delay: '0.4s' },
          { size: 4, color: 'bg-red-400', top: '10%', left: '85%', delay: '0.7s' },
          { size: 6, color: 'bg-violet-400', top: '5%', left: '55%', delay: '0.2s' },
          { size: 5, color: 'bg-teal-400', top: '18%', left: '25%', delay: '0.6s' },
        ].map((dot, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${dot.color} animate-pulse`}
            style={{
              width: dot.size,
              height: dot.size,
              top: dot.top,
              left: dot.left,
              animationDelay: dot.delay,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 w-full">
        {/* Checkmark Circle */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/25">
          <svg className="h-8 w-8 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-[#0A1628] mb-1">Payment Successful!</h1>
          <p className="text-sm text-[#64748B] font-medium">Your Pro Plan is now active</p>
        </div>

        {/* Receipt Summary Card */}
        <div className="w-full bg-white border border-[#F1F5F9] rounded-2xl p-[18px]">
          <div className="flex items-center gap-2 mb-3.5">
            <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
            </svg>
            <span className="text-sm font-bold text-[#0A1628]">Receipt Summary</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {receiptItems.map((item, i) => (
              <div key={item.label}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">{item.label}</span>
                  <span className="text-sm font-semibold text-[#0A1628]">{item.value}</span>
                </div>
                {i === 2 && <div className="h-px bg-[#F1F5F9] mt-2.5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Receipt Email Note */}
        <div className="flex items-center gap-1.5 text-center">
          <svg className="h-3 w-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="text-xs text-[#94A3B8] font-medium">Receipt sent to jane@email.com</span>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2.5 mt-1">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center py-4 bg-white text-[#0A1628] rounded-full text-[0.9375rem] font-bold hover:bg-[#E2E8F0] transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/billing"
            className="w-full flex items-center justify-center py-3.5 bg-white border border-[#F1F5F9] text-[#0A1628] rounded-full text-sm font-semibold hover:border-[#E2E8F0] transition-colors"
          >
            View Billing
          </Link>
        </div>
      </div>
    </div>
  )
}
