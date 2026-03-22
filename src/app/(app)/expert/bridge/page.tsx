'use client'

import { useState } from 'react'
import Link from 'next/link'

const cases = [
  {
    id: '1042',
    icon: (
      <svg className="w-4 h-4 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-1.053M18 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.75 8.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    iconBg: 'bg-[#EFF4FF]',
    status: 'Active',
    statusBg: 'bg-[#ECFDF5]',
    statusColor: 'text-[#065F46]',
    type: 'Offer in Compromise',
    amount: '$47,250',
  },
  {
    id: '1038',
    icon: (
      <svg className="w-4 h-4 text-[#D97706]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    iconBg: 'bg-[#FEF3C7]',
    status: 'Pending',
    statusBg: 'bg-[#FEF3C7]',
    statusColor: 'text-[#92400E]',
    type: 'Installment Agreement',
    amount: '$12,800',
  },
  {
    id: '985',
    icon: (
      <svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
      </svg>
    ),
    iconBg: 'bg-[#F5F3FF]',
    status: 'Resolved',
    statusBg: 'bg-[#F0F0F5]',
    statusColor: 'text-[#5C5C7A]',
    type: 'Penalty Abatement',
    amount: '$5,200',
  },
]

export default function ExpertBridgePage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-5 h-5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Help</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-8 space-y-4">
          {/* Hero Section */}
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EFF4FF] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-[1.375rem] font-bold text-[#1A1A2E] mb-1.5">Get Expert Help</h2>
            <p className="text-[0.8125rem] text-[#5C5C7A] leading-relaxed">Connect with a licensed tax professional for personalized guidance on your case.</p>
          </div>

          {/* Select Case Section */}
          <p className="text-[0.6875rem] font-bold text-[#5C5C7A] uppercase tracking-wider">Select a case</p>

          {/* Case Cards */}
          {cases.map((c) => (
            <Link
              key={c.id}
              href="/expert/landing"
              onClick={() => setSelectedCase(c.id)}
              className={`flex items-center gap-3.5 p-4 bg-white border-[1.5px] rounded-2xl transition-colors ${
                selectedCase === c.id ? 'border-[#1A1A2E] bg-[#EFF4FF]' : 'border-[#F0F0F5] hover:border-[#1A1A2E]'
              }`}
            >
              <div className={`w-10 h-10 rounded-[10px] ${c.iconBg} flex items-center justify-center shrink-0`}>
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[0.8125rem] font-semibold text-[#1A1A2E]">Case #{c.id}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[0.625rem] font-bold ${c.statusBg} ${c.statusColor}`}>{c.status}</span>
                </div>
                <p className="text-xs text-[#5C5C7A]">{c.type} &mdash; {c.amount}</p>
              </div>
              <svg className="w-3 h-3 text-[#D1D5DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#F0F0F5]" />
            <span className="text-xs text-[#9CA3AF]">or</span>
            <div className="flex-1 h-px bg-[#F0F0F5]" />
          </div>

          {/* Start without case */}
          <Link
            href="/expert/landing"
            className="flex items-center justify-center gap-2 p-5 bg-white border-[1.5px] border-dashed border-[#F0F0F5] rounded-2xl hover:border-[#1A1A2E] transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p className="text-[0.8125rem] font-semibold text-[#1A1A2E]">Start without a case</p>
          </Link>

          {/* Info */}
          <div className="mt-5">
            <div className="flex gap-3 p-3.5 bg-[#F0F0F5] rounded-xl items-start">
              <svg className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-[#5C5C7A] leading-relaxed">Our experts are licensed Enrolled Agents, CPAs, and Tax Attorneys with 10+ years of IRS experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
