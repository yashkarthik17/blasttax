'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TaxpayerDetailsPage() {
  const [healthInsurance, setHealthInsurance] = useState<'yes' | 'no' | null>(null)
  const [dependent, setDependent] = useState<'yes' | 'no' | null>(null)
  const [irsNotices, setIrsNotices] = useState<'yes' | 'no' | null>(null)
  const [identityTheft, setIdentityTheft] = useState<'yes' | 'no' | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/personal" className="w-9 h-9 rounded-xl bg-[#FAFAFF] border border-[#F0F0F5] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1A1A2E" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#1A1A2E]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#8585A0]">Step 2/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F0F0F5] rounded-full overflow-hidden">
          <div className="h-full bg-[#1A1A2E] rounded-full" style={{ width: '33.3%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.4rem] font-extrabold text-[#1A1A2E] tracking-tight mb-1.5">Taxpayer Details</h1>
          <p className="text-[0.85rem] text-[#8585A0] font-normal leading-relaxed">Additional information needed for your return</p>
        </div>

        {/* SSN Entry */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[16px] p-[18px]">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#EFF4FF] flex items-center justify-center">
              <svg width="11" height="11" fill="#1A1A2E" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
            </div>
            <span className="text-[0.82rem] font-bold text-[#1A1A2E]">Social Security Number</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="XXX-XX-XXXX"
              maxLength={11}
              className="w-full py-[13px] px-4 pr-10 bg-white border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-semibold text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all placeholder:text-[#B0B0C8] placeholder:font-normal"
              style={{ letterSpacing: '0.1em' }}
            />
            <svg width="13" height="13" fill="#B0B0C8" viewBox="0 0 24 24" className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
          </div>
          <div className="text-[0.68rem] text-[#8585A0] mt-1.5 flex items-center gap-1">
            <svg width="9" height="9" fill="#00A651" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            Encrypted and stored securely
          </div>
        </div>

        {/* Occupation */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[16px] p-[18px]">
          <div className="text-[0.82rem] font-bold text-[#1A1A2E] mb-2.5">Occupation</div>
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            className="w-full py-[13px] px-4 bg-white border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-semibold text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all placeholder:text-[#B0B0C8] placeholder:font-normal"
          />
          <div className="text-[0.68rem] text-[#8585A0] mt-1.5">As it will appear on your tax return</div>
        </div>

        {/* Health Insurance */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[16px] p-[18px]">
          <div className="text-[0.82rem] font-bold text-[#1A1A2E]">Did you have health insurance all year?</div>
          <div className="text-[0.72rem] text-[#8585A0] mt-1">Required for Form 8965 / ACA compliance</div>
          <div className="flex gap-2 mt-2.5">
            <button
              onClick={() => setHealthInsurance('yes')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                healthInsurance === 'yes'
                  ? 'bg-[#EFF4FF] border-[#1A1A2E] text-[#1A1A2E]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setHealthInsurance('no')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                healthInsurance === 'no'
                  ? 'bg-[#FFF0F1] border-[#E63946] text-[#E63946]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Dependent */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[16px] p-[18px]">
          <div className="text-[0.82rem] font-bold text-[#1A1A2E]">Can anyone else claim you as a dependent?</div>
          <div className="text-[0.72rem] text-[#8585A0] mt-1">This affects your standard deduction amount</div>
          <div className="flex gap-2 mt-2.5">
            <button
              onClick={() => setDependent('yes')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                dependent === 'yes'
                  ? 'bg-[#EFF4FF] border-[#1A1A2E] text-[#1A1A2E]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setDependent('no')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                dependent === 'no'
                  ? 'bg-[#FFF0F1] border-[#E63946] text-[#E63946]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* IRS Notices */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[16px] p-[18px]">
          <div className="text-[0.82rem] font-bold text-[#1A1A2E]">Did you receive any IRS notices?</div>
          <div className="text-[0.72rem] text-[#8585A0] mt-1">Letters or notices from the IRS this tax year</div>
          <div className="flex gap-2 mt-2.5">
            <button
              onClick={() => setIrsNotices('yes')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                irsNotices === 'yes'
                  ? 'bg-[#EFF4FF] border-[#1A1A2E] text-[#1A1A2E]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setIrsNotices('no')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                irsNotices === 'no'
                  ? 'bg-[#FFF0F1] border-[#E63946] text-[#E63946]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              No
            </button>
          </div>
          {irsNotices === 'yes' && (
            <div className="mt-3">
              <select className="w-full py-[13px] px-4 pr-9 bg-white border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.85rem] font-medium text-[#5C5C7A] outline-none focus:border-[#1A1A2E] focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M6%208L1%203h10z%22%20fill%3D%22%2394A3B8%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]">
                <option value="">Select notice type</option>
                <option value="cp2000">CP2000 - Income Discrepancy</option>
                <option value="cp14">CP14 - Balance Due</option>
                <option value="cp504">CP504 - Intent to Levy</option>
                <option value="other">Other Notice</option>
              </select>
            </div>
          )}
        </div>

        {/* Identity Theft */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[16px] p-[18px]">
          <div className="text-[0.82rem] font-bold text-[#1A1A2E]">Were you a victim of identity theft?</div>
          <div className="text-[0.72rem] text-[#8585A0] mt-1">Tax-related identity theft involving your SSN</div>
          <div className="flex gap-2 mt-2.5">
            <button
              onClick={() => setIdentityTheft('yes')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                identityTheft === 'yes'
                  ? 'bg-[#EFF4FF] border-[#1A1A2E] text-[#1A1A2E]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setIdentityTheft('no')}
              className={`flex-1 py-2.5 border-[1.5px] rounded-[10px] text-[0.82rem] font-semibold text-center transition-all ${
                identityTheft === 'no'
                  ? 'bg-[#FFF0F1] border-[#E63946] text-[#E63946]'
                  : 'bg-white border-[#D5D5E0] text-[#5C5C7A] hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-2">
          <Link href="/tax-filing/security" className="w-full flex items-center justify-center gap-2 bg-[#1A1A2E] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
