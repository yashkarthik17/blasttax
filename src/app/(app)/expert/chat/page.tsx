'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ExpertChatPage() {
  const [message, setMessage] = useState('')

  return (
    <div className="min-h-screen bg-[#FAFAFF] flex flex-col">
      <div className="mx-auto max-w-md w-full flex flex-col flex-1">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#D5D5E0]">
          <Link href="/expert/workspace" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-5 h-5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="relative w-9 h-9 shrink-0">
            <div className="w-full h-full rounded-full bg-[#1A1A2E] flex items-center justify-center">
              <span className="text-[0.78rem] font-bold text-white">MC</span>
            </div>
            <div className="absolute -bottom-px -right-px w-[11px] h-[11px] bg-[#00A651] rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Michael Chen, EA</div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
              <span className="text-[0.7rem] text-[#00A651] font-medium">Online</span>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-3.5 h-3.5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 relative">
          {/* Date separator */}
          <div className="text-center">
            <span className="text-[0.68rem] font-semibold text-[#B0B0C8] bg-[#FAFAFF] px-3 py-1 rounded-full border border-[#F0F0F5]">Today, 10:24 AM</span>
          </div>

          {/* Expert message 1 */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0">
              <span className="text-[0.6rem] font-bold text-white">MC</span>
            </div>
            <div className="bg-white border border-[#D5D5E0] rounded-[18px_18px_18px_4px] px-4 py-3 text-[0.84rem] text-[#1A1A2E] leading-relaxed max-w-[82%] shadow-sm">
              Hi Jane, I&apos;ve reviewed your OIC application. Everything looks great. I have a few suggestions to strengthen your case.
            </div>
          </div>

          {/* Expert message 2 */}
          <div className="flex items-end gap-2">
            <div className="w-7 shrink-0" />
            <div className="bg-white border border-[#D5D5E0] rounded-[18px_18px_18px_4px] px-4 py-3 text-[0.84rem] text-[#1A1A2E] leading-relaxed max-w-[82%] shadow-sm">
              For the income section, I&apos;d recommend including documentation of your medical expenses as they may increase your allowable expenses.
            </div>
          </div>

          {/* User message */}
          <div>
            <div className="bg-[#1A1A2E] rounded-[18px_18px_4px_18px] px-4 py-3 text-[0.84rem] text-white leading-relaxed max-w-[82%] ml-auto shadow-sm">
              That makes sense. Should I include the receipts from last year too?
            </div>
            <div className="text-right mt-1">
              <span className="text-[0.65rem] text-[#B0B0C8]">10:28 AM</span>
              <svg className="w-2.5 h-2.5 text-[#2563EB] inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Expert message 3 */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0">
              <span className="text-[0.6rem] font-bold text-white">MC</span>
            </div>
            <div className="bg-white border border-[#D5D5E0] rounded-[18px_18px_18px_4px] px-4 py-3 text-[0.84rem] text-[#1A1A2E] leading-relaxed max-w-[82%] shadow-sm">
              Yes, include the last 12 months of medical receipts. This could reduce your offer amount by ~$1,200.
            </div>
          </div>

          {/* File attachment from expert */}
          <div className="flex items-end gap-2">
            <div className="w-7 shrink-0" />
            <div className="max-w-[82%]">
              <div className="bg-[#FAFAFF] border border-[#D5D5E0] rounded-xl p-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-[#EFF4FF] hover:border-[rgba(0,61,165,0.15)] transition">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#FFF0F1] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.8rem] font-semibold text-[#1A1A2E] truncate">OIC_Tips_Guide.pdf</div>
                  <div className="text-[0.68rem] text-[#8585A0]">245 KB</div>
                </div>
                <svg className="w-[13px] h-[13px] text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <div className="mt-1">
                <span className="text-[0.65rem] text-[#B0B0C8]">10:31 AM</span>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0">
              <span className="text-[0.6rem] font-bold text-white">MC</span>
            </div>
            <div className="bg-white border border-[#D5D5E0] rounded-[18px_18px_18px_4px] px-[18px] py-3.5 flex gap-[5px] items-center">
              <span className="w-[7px] h-[7px] rounded-full bg-[#B0B0C8] animate-bounce" />
              <span className="w-[7px] h-[7px] rounded-full bg-[#B0B0C8] animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-[7px] h-[7px] rounded-full bg-[#B0B0C8] animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          <div className="h-10" />
        </div>

        {/* Schedule Call Floating Pill */}
        <div className="flex justify-center -mt-20 mb-4 relative z-10">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white rounded-full text-[0.8rem] font-semibold shadow-sm hover:-translate-y-0.5 transition-transform">
            <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Schedule a call
          </button>
        </div>

        {/* Message Input */}
        <div className="px-4 py-3 bg-white border-t border-[#D5D5E0] shrink-0">
          <div className="flex items-center gap-2.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-full py-1.5 px-2 pl-4">
            <button className="p-1">
              <svg className="w-4 h-4 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border-none outline-none text-[0.84rem] text-[#1A1A2E] bg-transparent placeholder:text-[#8585A0]"
            />
            <button className="w-9 h-9 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-[13px] h-[13px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
