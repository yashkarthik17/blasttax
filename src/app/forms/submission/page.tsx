'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

export default function SubmissionPage() {
  const router = useRouter()
  const { answers } = useWizard()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center pt-5 pb-10 gap-0 bg-white -mx-5 -mt-4 min-h-[80vh] px-5">
        {/* Animated Checkmark */}
        <div className="w-[100px] h-[100px] rounded-full bg-[#00A651] flex items-center justify-center mt-5 mb-6 animate-[checkScale_0.8s_0.1s_cubic-bezier(0.34,1.56,0.64,1)_both]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M12 24L20 32L36 16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center mb-1.5">
          <div className="text-[1.5rem] font-black text-[#0A1628] tracking-tight leading-tight">Submission Complete!</div>
        </div>
        <div className="text-center mb-6">
          <div className="text-[0.88rem] text-[#64748B] font-medium leading-relaxed">Your Form 656 has been submitted to the IRS</div>
        </div>

        {/* Summary Card */}
        <div className="w-full bg-white rounded-[20px] p-5 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)] mb-5">
          {[
            { label: 'Case', value: '#1042' },
            { label: 'Resolution', value: 'Offer in Compromise' },
            { label: 'Offer Amount', value: '$8,500', highlight: true },
            { label: 'Submitted', value: 'March 15, 2026' },
            { label: 'Expected Response', value: '6-12 months' },
          ].map((row, idx, arr) => (
            <div key={idx} className={`flex justify-between items-center ${idx < arr.length - 1 ? 'pb-3 border-b border-[#F1F5F9] mb-3' : ''}`}>
              <span className="text-[0.75rem] font-semibold text-[#94A3B8]">{row.label}</span>
              <span className={`text-[0.82rem] font-bold ${row.highlight ? 'text-[#00A651] text-[0.88rem] font-extrabold' : 'text-[#0A1628]'}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* What Happens Next */}
        <div className="w-full mb-4">
          <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3 px-1">What happens next?</div>
          <div className="bg-white rounded-2xl border border-[#F3F4F6] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {[
              { num: '1', title: 'IRS will acknowledge receipt', sub: 'Within 30 days of submission' },
              { num: '2', title: 'Examiner reviews your financials', sub: 'Detailed review of assets and income' },
              { num: '3', title: "You'll receive a decision letter", sub: 'Accept, reject, or counter-offer' },
            ].map((step, idx) => (
              <div key={idx} className={`flex items-start gap-3 px-4 py-3.5 ${idx < 2 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <div className="w-7 h-7 rounded-full bg-[#EBF0FF] flex items-center justify-center flex-shrink-0 mt-px">
                  <span className="text-[0.72rem] font-extrabold text-[#0A1628]">{step.num}</span>
                </div>
                <div>
                  <div className="text-[0.82rem] font-bold text-[#0A1628]">{step.title}</div>
                  <div className="text-[0.72rem] text-[#94A3B8] mt-0.5">{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance */}
        <div className="w-full flex items-center gap-2.5 px-4 py-3 bg-[#E6F9EE] rounded-xl border border-[rgba(0,166,81,0.12)] mb-5">
          <i className="fas fa-shield-check text-base text-[#00A651] flex-shrink-0" />
          <div className="text-[0.8rem] text-[#065F46] font-medium leading-relaxed">
            We&apos;ll notify you of any updates and guide you through every step.
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => router.push('/')}
            className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <i className="fas fa-house mr-2" /> Go to Dashboard
          </button>
          <button
            className="py-3 text-center text-[#0A1628] text-[0.82rem] font-semibold cursor-pointer"
          >
            View Case Details <i className="fas fa-arrow-right ml-1 text-[11px]" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div>
        <h1 className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Submission Review</h1>
        <p className="text-[0.82rem] text-[#94A3B8] mt-1.5 leading-relaxed">Review everything before submitting.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-[20px] p-5 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        {[
          { label: 'Case', value: '#1042' },
          { label: 'Resolution', value: 'Offer in Compromise' },
          { label: 'Offer Amount', value: '$8,500', highlight: true },
        ].map((row, idx, arr) => (
          <div key={idx} className={`flex justify-between items-center ${idx < arr.length - 1 ? 'pb-3 border-b border-[#F1F5F9] mb-3' : ''}`}>
            <span className="text-[0.75rem] font-semibold text-[#94A3B8]">{row.label}</span>
            <span className={`text-[0.82rem] font-bold ${row.highlight ? 'text-[#00A651] text-[0.88rem] font-extrabold' : 'text-[#0A1628]'}`}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Reassurance */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#E6F9EE] rounded-xl border border-[rgba(0,166,81,0.12)]">
        <i className="fas fa-shield-check text-base text-[#00A651] flex-shrink-0" />
        <div className="text-[0.8rem] text-[#065F46] font-medium leading-relaxed">
          We&apos;ll notify you of any updates and guide you through every step.
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-3 pt-1">
        <button
          onClick={() => setSubmitted(true)}
          className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
        >
          Submit to IRS <i className="fas fa-arrow-right ml-1.5 text-xs" />
        </button>
      </div>
    </div>
  )
}
