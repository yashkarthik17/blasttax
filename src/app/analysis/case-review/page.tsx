'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface TaxYearEntry {
  id: string; taxYear: string; balance: string; taxForm: string; filingStatus: string
  assessmentDate: string; lastPaymentDate: string; isSfr: boolean; assessmentType: string
  totalPenalty?: string; interest?: string; ftfPenalty?: string; ftpPenalty?: string; accuracyPenalty?: string
}

function parseMoney(s: string): number {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}
function formatCurrency(v: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v)
}
function formatDate(d: string): string {
  if (!d) return '--'
  const date = new Date(d + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
}
function csedDate(assessDate: string): string {
  if (!assessDate) return '--'
  const d = new Date(assessDate + 'T00:00:00')
  d.setFullYear(d.getFullYear() + 10)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function Accordion({ icon, iconBg, iconColor, title, subtitle, editLabel, onEdit, defaultOpen, children }: {
  icon: string; iconBg: string; iconColor: string; title: string; subtitle: string
  editLabel?: string; onEdit?: () => void; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <div className="mb-2.5 overflow-hidden rounded-[16px] border border-[#F1F5F9] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#F8FAFC]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-sm" style={{ background: iconBg, color: iconColor }}>
          <i className={icon} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-[#0A1628]">{title}</div>
          <div className="mt-px text-[11px] text-[#94A3B8]">{subtitle}</div>
        </div>
        {editLabel && onEdit && (
          <span
            onClick={(e) => { e.stopPropagation(); onEdit() }}
            className="cursor-pointer text-xs font-semibold text-[#2563EB]"
          >
            {editLabel}
          </span>
        )}
        <i className={`fa-solid fa-chevron-down text-xs text-[#CBD5E1] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className="border-t border-[#F1F5F9] px-4 pb-3.5">
          {children}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#F1F5F9] py-2 text-[13px] last:border-b-0">
      <span className="font-medium text-[#94A3B8]">{label}</span>
      <span className="font-semibold" style={{ color: valueColor ?? '#0A1628' }}>{value}</span>
    </div>
  )
}

export default function CaseReviewPage() {
  const router = useRouter()
  const { answers } = useWizard()
  const personalInfo = answers.personalInfo as Record<string, string> | undefined
  const entries = (answers.taxDebts as TaxYearEntry[]) ?? []
  const sorted = [...entries].sort((a, b) => Number(a.taxYear) - Number(b.taxYear))
  const totalBalance = entries.reduce((sum, e) => sum + parseMoney(e.balance), 0)

  function handleRunAnalysis() {
    router.push('/analysis/assets/bank-accounts')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto flex min-h-screen max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex-col">
        {/* Progress */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[45%] rounded-full bg-[#00A651]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          {/* Heading */}
          <div className="mb-1.5">
            <h1 className="text-[1.3rem] font-extrabold leading-tight text-[#0A1628]">Review Your Information</h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[#94A3B8]">Make sure everything is accurate before we run your analysis</p>
          </div>

          {/* Personal Information */}
          <Accordion
            icon="fa-solid fa-user"
            iconBg="#EFF4FF"
            iconColor="#2563EB"
            title="Personal Information"
            subtitle="Name, SSN, Filing Status"
            editLabel="Edit"
            onEdit={() => router.push('/analysis/personal-info')}
            defaultOpen={true}
          >
            <InfoRow label="Name" value={personalInfo ? `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || '--' : '--'} />
            <InfoRow label="SSN" value={personalInfo?.ssn ? `***-**-${personalInfo.ssn.slice(-4)}` : '--'} />
            <InfoRow label="Date of Birth" value={personalInfo?.dob ? formatDate(personalInfo.dob) : '--'} />
            <InfoRow label="Address" value={personalInfo ? `${personalInfo.street || ''}, ${personalInfo.city || ''}, ${personalInfo.state || ''}`.replace(/^, /, '').replace(/, $/, '') || '--' : '--'} />
          </Accordion>

          {/* Tax Debt Summary */}
          <Accordion
            icon="fa-solid fa-file-invoice-dollar"
            iconBg="#FFF0F1"
            iconColor="#E63946"
            title="Tax Debt Summary"
            subtitle={`${entries.length} year${entries.length !== 1 ? 's' : ''} · ${formatCurrency(totalBalance)} total`}
            editLabel="Edit"
            onEdit={() => router.push('/analysis/case-info')}
          >
            <div className="pt-2.5">
              {sorted.map((entry) => (
                <div key={entry.id} className="mb-2 rounded-[14px] border border-[#F1F5F9] bg-white p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-[#0A1628]">{entry.taxYear || '--'}</span>
                      <span className="rounded bg-[#F8FAFC] px-1.5 py-0.5 text-[10px] font-semibold text-[#94A3B8]">
                        {entry.taxForm} · {entry.filingStatus}
                      </span>
                    </div>
                    <button onClick={() => router.push('/analysis/case-info')} className="text-[11px] font-semibold text-[#2563EB]">
                      <i className="fa-solid fa-pen mr-1 text-[9px]" />Edit
                    </button>
                  </div>
                  <InfoRow label="Balance" value={parseMoney(entry.balance) > 0 ? formatCurrency(parseMoney(entry.balance)) : '--'} valueColor="#E63946" />
                  <InfoRow label="Assessment Date" value={formatDate(entry.assessmentDate)} />
                  <InfoRow
                    label="CSED Expiration"
                    value={entry.assessmentDate ? csedDate(entry.assessmentDate) : '--'}
                  />
                  <InfoRow label="Assessment" value={entry.assessmentType || 'Self-assessed'} />
                  {(entry.ftfPenalty || entry.ftpPenalty || entry.accuracyPenalty) && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {entry.ftfPenalty && <span className="rounded-md bg-[#F8FAFC] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">FTF: {entry.ftfPenalty}</span>}
                      {entry.ftpPenalty && <span className="rounded-md bg-[#F8FAFC] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">FTP: {entry.ftpPenalty}</span>}
                      {entry.accuracyPenalty && <span className="rounded-md bg-[#F8FAFC] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">Accuracy: {entry.accuracyPenalty}</span>}
                    </div>
                  )}
                </div>
              ))}
              {/* Total */}
              <div className="mt-1 flex items-center justify-between border-t-2 border-[#F1F5F9] pt-2.5">
                <span className="text-[13px] font-bold text-[#0A1628]">Total</span>
                <span className="text-[15px] font-extrabold text-[#E63946]">{formatCurrency(totalBalance)}</span>
              </div>
            </div>
          </Accordion>

          {/* Screening Results */}
          <Accordion
            icon="fa-solid fa-clipboard-check"
            iconBg="#E6F9EE"
            iconColor="#00A651"
            title="Screening Results"
            subtitle="Pre-qualifier summary"
            editLabel="View"
            onEdit={() => router.push('/analysis/screening-result')}
          >
            {[
              { label: 'All returns filed', pass: answers.allReturnsFiled === true },
              { label: 'No active bankruptcy', pass: answers.inBankruptcy !== true },
              { label: 'No open audit', pass: answers.auditOpen !== true },
              { label: 'Current estimated payments', pass: answers.estimatedPaymentsCurrent === true },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 py-1.5 text-[13px]">
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  item.pass ? 'bg-[#E6F9EE] text-[#00A651]' : 'bg-[#FEF3C7] text-[#F59E0B]'
                }`}>
                  <i className={item.pass ? 'fa-solid fa-check' : 'fa-solid fa-exclamation'} />
                </div>
                <span className="font-medium text-[#0A1628]">{item.label}</span>
              </div>
            ))}
          </Accordion>

          {/* Household */}
          <Accordion
            icon="fa-solid fa-house-user"
            iconBg="#F5F0FF"
            iconColor="#7C3AED"
            title="Household"
            subtitle={`${(answers.household as any)?.memberCount ?? 1} member${((answers.household as any)?.memberCount ?? 1) !== 1 ? 's' : ''} · ${(answers.household as any)?.vehicleCount ?? 0} vehicle${((answers.household as any)?.vehicleCount ?? 0) !== 1 ? 's' : ''}`}
            editLabel="Edit"
            onEdit={() => router.push('/analysis/household')}
          >
            <InfoRow label="Members" value={String((answers.household as any)?.memberCount ?? '--')} />
            <InfoRow label="Vehicles" value={String((answers.household as any)?.vehicleCount ?? '--')} />
            <InfoRow label="County" value={(answers.household as any)?.county ? `${(answers.household as any).county}, ${(answers.household as any).state}` : '--'} />
          </Accordion>

          {/* Spacer */}
          <div className="min-h-4 flex-1" />

          {/* Actions */}
          <div className="space-y-2.5 pb-5 pt-2">
            <button
              onClick={handleRunAnalysis}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00A651] px-7 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <i className="fa-solid fa-bolt text-sm" />
              Run Analysis
            </button>
            <button
              onClick={() => router.push('/analysis/case-info')}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-7 py-3.5 text-sm font-medium text-[#0A1628] transition-all hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-pen text-xs" />
              Edit Information
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
