'use client'

import { useState } from 'react'
import Link from 'next/link'

const documents = [
  { name: 'Form 656', desc: 'Offer in Compromise form', status: 'Complete', statusBg: 'bg-[#E6F9EE]', statusColor: 'text-[#00A651]', iconBg: 'bg-[#E6F9EE]', iconColor: 'text-[#00A651]' },
  { name: 'Form 433-A', desc: 'Collection information statement', status: 'Complete', statusBg: 'bg-[#E6F9EE]', statusColor: 'text-[#00A651]', iconBg: 'bg-[#E6F9EE]', iconColor: 'text-[#00A651]' },
  { name: 'Bank Statements', desc: 'Last 6 months required', status: 'Pending', statusBg: 'bg-[#FFFBEB]', statusColor: 'text-[#D97706]', iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#F59E0B]' },
  { name: 'Pay Stubs', desc: 'Last 3 months required', status: 'Pending', statusBg: 'bg-[#FFFBEB]', statusColor: 'text-[#D97706]', iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#F59E0B]' },
]

export default function ExpertWorkspacePage() {
  const [activeTab, setActiveTab] = useState('Documents')

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/poa-education" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-5 h-5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Review</h1>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EFF4FF] border border-[rgba(0,61,165,0.12)] rounded-full text-[0.68rem] font-semibold text-[#1A1A2E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            In Progress
          </div>
        </div>

        <div className="px-5 pb-8 space-y-4">
          {/* Expert Profile Card */}
          <div className="bg-white rounded-2xl p-[18px] border border-[#D5D5E0] flex items-center gap-3.5">
            <div className="relative w-[52px] h-[52px] shrink-0">
              <div className="w-full h-full rounded-full bg-[#1A1A2E] flex items-center justify-center">
                <span className="text-[1.1rem] font-extrabold text-white">MC</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00A651] rounded-full border-[2.5px] border-white" />
            </div>
            <div className="flex-1">
              <div className="text-[0.95rem] font-bold text-[#1A1A2E]">Michael Chen, EA</div>
              <div className="text-[0.78rem] text-[#8585A0] font-normal">Enrolled Agent</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[0.72rem] font-semibold text-[#1A1A2E]">4.9</span>
                </div>
                <span className="text-[0.68rem] text-[#B0B0C8]">|</span>
                <span className="text-[0.72rem] text-[#8585A0] font-medium">15 years exp.</span>
              </div>
            </div>
            <button className="w-9 h-9 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
              </svg>
            </button>
          </div>

          {/* Case Summary Card */}
          <div className="bg-white rounded-2xl p-[18px] border border-[rgba(0,61,165,0.08)]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[0.72rem] font-bold text-[#B0B0C8] uppercase tracking-wider">Case Summary</div>
              <div className="px-2 py-0.5 bg-white border border-[#D5D5E0] rounded-full text-[0.68rem] font-semibold text-[#5C5C7A]">Case #1042</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[0.7rem] text-[#8585A0] font-medium">Resolution Type</div>
                <div className="text-[0.88rem] font-bold text-[#1A1A2E] mt-0.5">Offer in Compromise</div>
              </div>
              <div>
                <div className="text-[0.7rem] text-[#8585A0] font-medium">Total Debt</div>
                <div className="text-[0.88rem] font-bold text-[#E63946] mt-0.5">$47,250</div>
              </div>
              <div>
                <div className="text-[0.7rem] text-[#8585A0] font-medium">Offer Amount</div>
                <div className="text-[0.88rem] font-bold text-[#00A651] mt-0.5">$8,500</div>
              </div>
              <div>
                <div className="text-[0.7rem] text-[#8585A0] font-medium">Savings</div>
                <div className="text-[0.88rem] font-bold text-[#1A1A2E] mt-0.5">82%</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#D5D5E0] -mx-5 px-5">
            {['Documents', 'Notes', 'Recommendations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-[18px] py-2.5 text-[0.82rem] font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-[#1A1A2E] border-[#1A1A2E]'
                    : 'text-[#8585A0] border-transparent hover:text-[#5C5C7A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Upload Zone */}
          <div className="border-2 border-dashed border-[#D5D5E0] rounded-2xl p-6 text-center hover:border-[#1A1A2E] hover:bg-[#EFF4FF] transition cursor-pointer">
            <div className="w-11 h-11 rounded-[14px] bg-[#EFF4FF] flex items-center justify-center mx-auto mb-2.5">
              <svg className="w-[18px] h-[18px] text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
            </div>
            <div className="text-[0.85rem] font-semibold text-[#1A1A2E]">Drag &amp; drop files here</div>
            <div className="text-xs text-[#8585A0] mt-1">or tap to browse</div>
          </div>

          {/* Uploaded Documents */}
          <div>
            <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-2.5 px-1">Uploaded Documents</div>
            <div className="bg-white rounded-2xl border border-[#D5D5E0] overflow-hidden">
              {documents.map((doc, i) => (
                <div key={doc.name} className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#FAFAFF] transition ${i < documents.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
                  <div className={`w-[38px] h-[38px] rounded-[10px] ${doc.iconBg} flex items-center justify-center shrink-0`}>
                    <svg className={`w-[15px] h-[15px] ${doc.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.82rem] font-semibold text-[#1A1A2E]">{doc.name}</div>
                    <div className="text-[0.7rem] text-[#8585A0]">{doc.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 ${doc.statusBg} rounded-full text-[0.65rem] font-semibold ${doc.statusColor}`}>
                      {doc.status === 'Complete' ? (
                        <svg className="w-[9px] h-[9px]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-[9px] h-[9px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      )}
                      {doc.status}
                    </span>
                    <svg className="w-[13px] h-[13px] text-[#B0B0C8] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            <Link href="/expert/chat" className="bg-white border border-[#D5D5E0] rounded-[14px] p-3.5 flex flex-col items-center gap-2 hover:-translate-y-0.5 transition-transform">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EFF4FF] flex items-center justify-center">
                <svg className="w-[15px] h-[15px] text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <span className="text-[0.7rem] font-semibold text-[#1A1A2E]">Message</span>
            </Link>
            <button className="bg-white border border-[#D5D5E0] rounded-[14px] p-3.5 flex flex-col items-center gap-2 hover:-translate-y-0.5 transition-transform">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#F5F0FF] flex items-center justify-center">
                <svg className="w-[15px] h-[15px] text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <span className="text-[0.7rem] font-semibold text-[#1A1A2E]">Schedule Call</span>
            </button>
            <button className="bg-white border border-[#D5D5E0] rounded-[14px] p-3.5 flex flex-col items-center gap-2 hover:-translate-y-0.5 transition-transform">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#F0FDFA] flex items-center justify-center">
                <svg className="w-[15px] h-[15px] text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
              </div>
              <span className="text-[0.7rem] font-semibold text-[#1A1A2E]">Upload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
