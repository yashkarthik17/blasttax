'use client'

import Link from 'next/link'

export default function ExpertLandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/bridge" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-5 h-5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Help</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-10 space-y-5">
          {/* Hero Section */}
          <div className="bg-[#1A1A2E] rounded-[20px] p-7 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full bg-white/[0.08]" />
            <div className="absolute -bottom-[30px] -left-[30px] w-[100px] h-[100px] rounded-full bg-white/[0.05]" />
            <div className="absolute top-1/2 right-5 w-[60px] h-[60px] rounded-full bg-white/[0.04]" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Get Expert Help</h1>
              <p className="text-[0.85rem] text-white/80 font-normal leading-relaxed">Connect with licensed tax professionals for personalized guidance</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-3 px-1">Why Choose Our Experts</div>
            <div className="flex flex-col gap-3">
              {/* Benefit 1 */}
              <div className="bg-white rounded-2xl p-[18px] border border-[#D5D5E0] flex items-center gap-3.5 hover:-translate-y-0.5 transition-transform">
                <div className="w-12 h-12 rounded-[14px] bg-[#EFF4FF] flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-[0.9rem] font-bold text-[#1A1A2E] mb-0.5">Licensed Professionals</div>
                  <div className="text-[0.78rem] text-[#8585A0] font-normal leading-[1.45]">Enrolled Agents, CPAs, and Tax Attorneys</div>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-2xl p-[18px] border border-[#D5D5E0] flex items-center gap-3.5 hover:-translate-y-0.5 transition-transform">
                <div className="w-12 h-12 rounded-[14px] bg-[#F5F0FF] flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[0.9rem] font-bold text-[#1A1A2E] mb-0.5">Dedicated Support</div>
                  <div className="text-[0.78rem] text-[#8585A0] font-normal leading-[1.45]">One-on-one guidance through your resolution</div>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-2xl p-[18px] border border-[#D5D5E0] flex items-center gap-3.5 hover:-translate-y-0.5 transition-transform">
                <div className="w-12 h-12 rounded-[14px] bg-[#F0FDFA] flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[0.9rem] font-bold text-[#1A1A2E] mb-0.5">IRS Representation</div>
                  <div className="text-[0.78rem] text-[#8585A0] font-normal leading-[1.45]">We handle IRS communications for you</div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-3.5 px-1">How It Works</div>
            <div className="bg-white rounded-2xl p-5 border border-[#D5D5E0]">
              {/* Step 1 */}
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center text-[0.8rem] font-bold shrink-0">1</div>
                <div>
                  <div className="text-[0.88rem] font-bold text-[#1A1A2E]">We review your case</div>
                  <div className="text-xs text-[#8585A0] mt-0.5">Our team analyzes your tax situation</div>
                </div>
              </div>
              <div className="w-0.5 h-6 bg-[#D5D5E0] ml-[15px]" />
              {/* Step 2 */}
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center text-[0.8rem] font-bold shrink-0">2</div>
                <div>
                  <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Match you with an expert</div>
                  <div className="text-xs text-[#8585A0] mt-0.5">Paired based on your specific needs</div>
                </div>
              </div>
              <div className="w-0.5 h-6 bg-[#D5D5E0] ml-[15px]" />
              {/* Step 3 */}
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center text-[0.8rem] font-bold shrink-0">3</div>
                <div>
                  <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Expert guides your resolution</div>
                  <div className="text-xs text-[#8585A0] mt-0.5">Ongoing support until resolved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-[20px] p-6 border border-[rgba(0,61,165,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A1A2E]" />
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1A1A2E] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Consultation</div>
            </div>
            <div className="flex items-baseline gap-1 mb-1.5">
              <span className="text-[2rem] font-black text-[#1A1A2E] tracking-tight">$149</span>
              <span className="text-[0.82rem] text-[#8585A0] font-medium">/session</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(0,166,81,0.08)] border border-[rgba(0,166,81,0.15)] rounded-full text-[0.72rem] font-semibold text-[#00A651]">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
              </svg>
              Included in Pro plan
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/expert/pending"
              className="flex items-center justify-center gap-2 w-full py-4 px-7 bg-[#1A1A2E] text-white rounded-full text-[0.95rem] font-bold hover:opacity-90 transition"
            >
              Get Started
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <div className="text-center">
              <Link href="/expert/pending" className="text-[0.82rem] font-semibold text-[#1A1A2E]">
                Already on Pro plan? <span className="underline">Start now</span>
              </Link>
            </div>
          </div>

          {/* Reassurance */}
          <div className="flex items-center justify-center gap-1.5 py-2">
            <svg className="w-3 h-3 text-[#00A651]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
            </svg>
            <span className="text-[0.72rem] text-[#8585A0] font-medium">Secure &amp; confidential consultations</span>
          </div>
        </div>
      </div>
    </div>
  )
}
