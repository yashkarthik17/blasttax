'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ExpertPendingPage() {
  const [notifications, setNotifications] = useState({ push: true, email: true })

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Screen Content (centered) */}
        <div className="flex flex-col items-center px-6 py-8 gap-0">

          {/* Animated Matching Illustration */}
          <div className="mb-6">
            <div className="relative w-40 h-40 mx-auto">
              {/* Outer dashed ring */}
              <div className="absolute inset-0 border-[3px] border-dashed border-[#E2E8F0] rounded-full animate-[spin_12s_linear_infinite]" />
              {/* Inner ring */}
              <div className="absolute inset-5 border-2 border-[rgba(0,61,165,0.15)] rounded-full animate-[spin_8s_linear_infinite_reverse]" />

              {/* Avatar slots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center text-sm font-bold text-white animate-pulse">MC</div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0D9488] flex items-center justify-center text-sm font-bold text-white animate-pulse" style={{ animationDelay: '0.4s' }}>SL</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D97706] flex items-center justify-center text-sm font-bold text-white animate-pulse" style={{ animationDelay: '0.8s' }}>RK</div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 rounded-full bg-[#E63946] flex items-center justify-center text-sm font-bold text-white animate-pulse" style={{ animationDelay: '1.2s' }}>AP</div>

              {/* Center icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#0A1628] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>

            {/* Matching text with dots */}
            <div className="text-center mt-4">
              <span className="text-[0.85rem] font-bold text-[#0A1628]">Matching</span>
              <div className="flex gap-1.5 justify-center mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A1628] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A1628] animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A1628] animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-extrabold text-[#0A1628] tracking-tight mb-2">Finding your expert</h1>
            <p className="text-[0.88rem] text-[#94A3B8] font-normal leading-relaxed max-w-[280px] mx-auto">We&apos;re matching you with the best tax professional for your case</p>
          </div>

          {/* Case Details Card */}
          <div className="w-full bg-white rounded-2xl p-4 border border-[#E2E8F0] mb-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-bold text-[#0A1628]">Case #1042</div>
                <div className="text-[0.72rem] text-[#94A3B8]">Offer in Compromise</div>
              </div>
              <div className="text-right">
                <div className="text-base font-extrabold text-[#E63946]">$47,250</div>
                <div className="text-[0.65rem] text-[#94A3B8]">Total debt</div>
              </div>
            </div>
          </div>

          {/* What We're Looking For */}
          <div className="w-full bg-white rounded-2xl p-4 border border-[#E2E8F0] mb-4 text-left">
            <div className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">What we&apos;re looking for</div>
            <div className="flex flex-col gap-2.5">
              {['Licensed Enrolled Agent or CPA', 'OIC specialization', '10+ years IRS experience', 'Available this week'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#E6F9EE] flex items-center justify-center shrink-0">
                    <svg className="w-[9px] h-[9px] text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-[0.82rem] font-semibold text-[#0A1628]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Average match time */}
          <div className="text-center mb-5">
            <div className="text-[0.78rem] text-[#94A3B8] mb-1.5">
              <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Average match time: <strong className="text-[#0A1628]">2-4 hours</strong>
            </div>
            <div className="text-[0.78rem] text-[#94A3B8]">
              <svg className="w-3 h-3 inline mr-1 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              We&apos;ll notify you when your expert is assigned
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="w-full bg-white rounded-2xl p-4 border border-[#E2E8F0] mb-5 text-left">
            <div className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">Notification Preference</div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setNotifications(n => ({ ...n, push: !n.push }))}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className={`w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${notifications.push ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#E2E8F0]'}`}>
                  {notifications.push && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Push Notifications</span>
              </button>
              <button
                onClick={() => setNotifications(n => ({ ...n, email: !n.email }))}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className={`w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${notifications.email ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#E2E8F0]'}`}>
                  {notifications.email && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Email</span>
              </button>
            </div>
          </div>

          {/* Go to Dashboard */}
          <div className="w-full">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-7 border-2 border-[#E2E8F0] bg-white text-[#0A1628] rounded-full text-[0.88rem] font-bold hover:border-[#0A1628] transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
