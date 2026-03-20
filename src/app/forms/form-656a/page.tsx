'use client'

import { useState, useMemo } from 'react'
import { useWizard } from '@/hooks/useWizard'

const FPL_THRESHOLDS: Record<number, number> = { 1: 39900, 2: 54100, 3: 68300, 4: 82500, 5: 96700, 6: 110900 }
const FPL_PER_ADDITIONAL = 14200

function getFPL(size: number) {
  if (size <= 6) return FPL_THRESHOLDS[size]
  return FPL_THRESHOLDS[6] + (size - 6) * FPL_PER_ADDITIONAL
}

export default function Form656APage() {
  const { answers, caseId } = useWizard()

  const [householdSize, setHouseholdSize] = useState(answers.familySize ?? 1)
  const [incomes, setIncomes] = useState<string[]>(['$6,250'])
  const [certify, setCertify] = useState(false)
  const [generating, setGenerating] = useState(false)

  function adjustHousehold(delta: number) {
    const newSize = Math.max(1, Math.min(10, householdSize + delta))
    setHouseholdSize(newSize)
    // Adjust incomes array
    if (newSize > incomes.length) {
      setIncomes([...incomes, ...Array(newSize - incomes.length).fill('$0')])
    } else {
      setIncomes(incomes.slice(0, newSize))
    }
  }

  const totalMonthly = useMemo(() => {
    return incomes.reduce((sum, val) => sum + (parseInt(val.replace(/[^0-9]/g, '')) || 0), 0)
  }, [incomes])

  const annualIncome = totalMonthly * 12
  const threshold = getFPL(householdSize)
  const qualified = annualIncome <= threshold

  function updateIncome(idx: number, val: string) {
    setIncomes(prev => prev.map((v, i) => i === idx ? val : v))
  }

  const memberLabels = ['You (Taxpayer)', 'Spouse', 'Member 3', 'Member 4', 'Member 5', 'Member 6', 'Member 7', 'Member 8', 'Member 9', 'Member 10']
  const memberIcons = ['fa-user', 'fa-user-group', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user']
  const memberIconBgs = ['bg-[#EFF4FF]', 'bg-[#F5F0FF]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]', 'bg-[#F0FDFA]']
  const memberIconColors = ['text-[#2563EB]', 'text-[#7C3AED]', 'text-[#0D9488]', 'text-[#0D9488]', 'text-[#0D9488]', 'text-[#0D9488]', 'text-[#0D9488]', 'text-[#0D9488]', 'text-[#0D9488]', 'text-[#0D9488]']

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-656a' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-656A-Income-Certification.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <div>
        <div className="text-[1.25rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">Income Certification</div>
        <div className="text-[0.78rem] text-[#94A3B8] mt-1 leading-relaxed">OIC Application Fee &amp; Payment Waiver</div>
      </div>

      {/* Info banner */}
      <details className="bg-[#F5F0FF] rounded-[14px] border border-[rgba(124,58,237,0.1)] overflow-hidden group">
        <summary className="px-3.5 py-3 flex items-center gap-2.5 cursor-pointer list-none">
          <div className="w-[30px] h-[30px] rounded-lg bg-[rgba(124,58,237,0.1)] flex items-center justify-center flex-shrink-0">
            <i className="fas fa-lightbulb text-xs text-[#7C3AED]" />
          </div>
          <div className="flex-1 text-[0.78rem] font-semibold text-[#64748B]">What is this form for?</div>
          <i className="fas fa-chevron-down text-[10px] text-[#CBD5E1] transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-3.5 pb-3">
          <div className="text-[0.75rem] text-[#94A3B8] leading-relaxed">
            If your household income is at or below <strong className="text-[#64748B]">250% of the Federal Poverty Level</strong>, the IRS waives the $205 application fee and the 20% initial payment requirement. Form 656-A certifies your eligibility.
          </div>
        </div>
      </details>

      {/* Household Size */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Household Size</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[0.85rem] font-semibold text-[#0A1628]">Number of people in household</span>
            <div className="flex items-center gap-3">
              <button onClick={() => adjustHousehold(-1)} className="w-8 h-8 rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] flex items-center justify-center transition-all hover:bg-[#F1F5F9]">
                <i className="fas fa-minus text-[10px] text-[#64748B]" />
              </button>
              <span className="text-[1.2rem] font-black text-[#0A1628] min-w-[20px] text-center">{householdSize}</span>
              <button onClick={() => adjustHousehold(1)} className="w-8 h-8 rounded-[10px] bg-[#0A1628] flex items-center justify-center transition-all hover:bg-[#1a2a40]">
                <i className="fas fa-plus text-[10px] text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gross Monthly Income */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Gross Monthly Income</div>
        <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {incomes.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2.5 py-2.5 border-b border-[#F8FAFC] last:border-b-0">
              <div className={`w-7 h-7 rounded-lg ${memberIconBgs[idx]} flex items-center justify-center flex-shrink-0`}>
                <i className={`fas ${memberIcons[idx]} text-[10px] ${memberIconColors[idx]}`} />
              </div>
              <div className="flex-1">
                <div className="text-[0.78rem] font-semibold text-[#0A1628]">{memberLabels[idx]}</div>
              </div>
              <div className="w-[100px]">
                <input
                  type="text"
                  className="w-full px-2.5 py-2 bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none text-right focus:border-[#0A1628]"
                  value={val}
                  onChange={(e) => updateIncome(idx, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t-[1.5px] border-[#F1F5F9]">
            <span className="text-[0.82rem] font-bold text-[#0A1628]">Total Gross Monthly</span>
            <span className="text-base font-black text-[#0A1628]">${totalMonthly.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-[0.78rem] text-[#64748B]">Annual Income</span>
            <span className="text-[0.85rem] font-bold text-[#0A1628]">${annualIncome.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* FPL Comparison Table */}
      <div>
        <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">250% Federal Poverty Level (2026)</div>
        <div className="bg-white rounded-2xl p-3.5 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {[1,2,3,4,5,6].map(size => {
            const isActive = size === Math.min(householdSize, 6)
            return (
              <div key={size} className={`flex items-center justify-between px-3.5 py-2.5 ${isActive ? 'bg-[#EBF0FF] rounded-[10px] my-1' : 'border-b border-[#F8FAFC] last:border-b-0'}`}>
                {isActive ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[0.72rem] font-bold text-[#2563EB]">{householdSize <= 6 ? `${householdSize} person${householdSize > 1 ? 's' : ''}` : `${householdSize} persons`}</span>
                    <i className="fas fa-arrow-left text-[8px] text-[#2563EB]" />
                  </div>
                ) : (
                  <span className="text-[0.72rem] text-[#64748B]">{size} person{size > 1 ? 's' : ''}</span>
                )}
                <span className={`text-[0.78rem] font-${isActive ? 'bold' : 'semibold'} text-[#0A1628]`}>${getFPL(isActive && householdSize > 6 ? householdSize : size).toLocaleString()}</span>
              </div>
            )
          })}
          <div className="px-3.5 py-2 text-[0.65rem] text-[#94A3B8]">Each additional person: +$14,200</div>
        </div>
      </div>

      {/* Determination Result */}
      <div className={`rounded-2xl p-5 text-center transition-all ${qualified ? 'bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border-[1.5px] border-[rgba(0,166,81,0.2)]' : 'bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6]'}`}>
        <div className={`w-12 h-12 rounded-[14px] ${qualified ? 'bg-[#E6F9EE]' : 'bg-[#F1F5F9]'} flex items-center justify-center mx-auto mb-3`}>
          <i className={`fas ${qualified ? 'fa-check text-[#00A651]' : 'fa-times text-[#94A3B8]'} text-xl`} />
        </div>
        <div className={`text-base font-extrabold ${qualified ? 'text-[#00A651]' : 'text-[#0A1628]'} mb-1.5`}>
          {qualified ? 'You qualify for fee waiver!' : 'You do not qualify for fee waiver'}
        </div>
        <div className="text-[0.78rem] text-[#94A3B8] leading-relaxed">
          Your annual income of <strong className="text-[#0A1628]">${annualIncome.toLocaleString()}</strong> {qualified ? 'is at or below' : 'exceeds'} the 250% FPL threshold of <strong className="text-[#0A1628]">${threshold.toLocaleString()}</strong> for {householdSize} person{householdSize > 1 ? 's' : ''}.
        </div>
      </div>

      {/* Fees / Waivers */}
      {!qualified ? (
        <div>
          <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Fees Due with OIC Submission</div>
          <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between mb-2">
              <span className="text-[0.78rem] text-[#64748B]">Application fee</span>
              <span className="text-[0.78rem] font-bold text-[#0A1628]">$205</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[0.78rem] text-[#64748B]">20% initial payment (Lump Sum)</span>
              <span className="text-[0.78rem] font-bold text-[#0A1628]">$1,700</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Waivers Applied</div>
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white rounded-xl mb-2 border border-[#D1FAE5]">
            <div className="w-7 h-7 rounded-lg bg-[#E6F9EE] flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-[10px] text-[#00A651]" />
            </div>
            <div className="flex-1 text-[0.78rem] font-semibold text-[#0A1628]">$205 application fee waived</div>
            <span className="text-[0.82rem] font-bold text-[#00A651] line-through">$205</span>
          </div>
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white rounded-xl border border-[#D1FAE5]">
            <div className="w-7 h-7 rounded-lg bg-[#E6F9EE] flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-[10px] text-[#00A651]" />
            </div>
            <div className="flex-1 text-[0.78rem] font-semibold text-[#0A1628]">20% initial payment waived</div>
            <span className="text-[0.82rem] font-bold text-[#00A651] line-through">$1,700</span>
          </div>
        </div>
      )}

      {/* Certification */}
      <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-start gap-2.5 mb-3.5">
          <input type="checkbox" checked={certify} onChange={(e) => setCertify(e.target.checked)} className="w-5 h-5 accent-[#0A1628] flex-shrink-0 mt-0.5" />
          <label className="text-[0.75rem] text-[#64748B] leading-relaxed cursor-pointer">
            I certify under penalties of perjury that the information provided above regarding my household income and size is true and correct. I understand that providing false information on this form may result in a $5,000 penalty.
          </label>
        </div>
        <div className="flex gap-2.5">
          <div className="flex-1">
            <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Signature</div>
            <div className="h-11 bg-[#F8FAFC] border-[1.5px] border-dashed border-[#CBD5E1] rounded-[10px] flex items-center justify-center">
              <span className="text-[0.72rem] text-[#CBD5E1]">Tap to sign</span>
            </div>
          </div>
          <div className="w-[90px]">
            <div className="text-[0.72rem] font-semibold text-[#64748B] mb-1.5">Date</div>
            <div className="bg-[#F8FAFC] border-[1.5px] border-[#F3F4F6] rounded-[10px] px-2.5 py-2.5">
              <span className="text-[0.75rem] font-semibold text-[#0A1628]">03/17/26</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <button className="py-4 bg-[#00A651] rounded-full text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          Continue <i className="fas fa-arrow-right ml-1.5 text-xs" />
        </button>
        <button
          onClick={handleGeneratePdf}
          disabled={generating || !certify}
          className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-50"
        >
          <i className="fas fa-file-pdf mr-1.5 text-[11px]" /> {generating ? 'Generating...' : 'Generate PDF'}
        </button>
        <button className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97]">
          <i className="fas fa-bookmark mr-1.5 text-[11px]" /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
