'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Types and data                                                     */
/* ------------------------------------------------------------------ */

type DocStatus = 'pending' | 'complete' | 'generated'

interface FormItem {
  name: string
  description: string
  status: DocStatus
}

interface SupportingDoc {
  name: string
  description: string
  status: DocStatus
}

const STATUS_CONFIG: Record<DocStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-amber-400', bgColor: 'bg-amber-500/15' },
  complete: { label: 'Complete', color: 'text-emerald-400', bgColor: 'bg-emerald-500/15' },
  generated: { label: 'Generated', color: 'text-blue-400', bgColor: 'bg-blue-500/15' },
}

// Sample data — would come from context/API based on selected resolution
const RESOLUTION_DATA = {
  type: 'oic' as const,
  label: 'Offer in Compromise',
  rcp: {
    nre: 13700,
    mdiMonthly: 141,
    multiplier: 12,
    total: 15392,
    offerAmount: 15392,
  },
  forms: [
    { name: 'Form 656', description: 'Offer in Compromise application', status: 'generated' as DocStatus },
    { name: 'Form 433-A (OIC)', description: 'Collection Information Statement for Individuals', status: 'generated' as DocStatus },
    { name: 'Form 656-L', description: 'Offer in Compromise (Lump Sum)', status: 'pending' as DocStatus },
  ] satisfies FormItem[],
  supportingDocs: [
    { name: 'Last 3 months bank statements', description: 'All personal and business bank accounts', status: 'pending' as DocStatus },
    { name: 'Last 3 months pay stubs', description: 'Most recent pay stubs or proof of income', status: 'complete' as DocStatus },
    { name: 'Property valuation', description: 'Zillow estimate or recent appraisal for owned property', status: 'pending' as DocStatus },
    { name: 'Vehicle valuation', description: 'KBB or NADA valuation for each vehicle owned', status: 'complete' as DocStatus },
    { name: 'Retirement account statements', description: 'Most recent statements for 401(k), IRA, etc.', status: 'pending' as DocStatus },
    { name: 'Monthly expense documentation', description: 'Utility bills, rent/mortgage statements, insurance', status: 'pending' as DocStatus },
    { name: '$205 application fee', description: 'Non-refundable OIC application fee (or Form 656-A for Low Income Certification)', status: 'pending' as DocStatus },
    { name: 'Initial payment', description: '20% of offer amount ($3,078) with submission OR monthly payments while pending', status: 'pending' as DocStatus },
  ] satisfies SupportingDoc[],
  timeline: '6-18 months for IRS decision',
  mailingAddress: {
    state: 'NY', // Would determine Brookhaven vs Memphis
    center: 'Brookhaven',
    address: [
      'IRS - COIC Unit',
      'P.O. Box 9007',
      'Holtsville, NY 11742-9007',
    ],
  },
}

// Mailing addresses based on state
const OIC_ADDRESSES: Record<string, { center: string; address: string[] }> = {
  brookhaven: {
    center: 'Brookhaven',
    address: ['IRS - COIC Unit', 'P.O. Box 9007', 'Holtsville, NY 11742-9007'],
  },
  memphis: {
    center: 'Memphis',
    address: ['IRS - COIC Unit', 'P.O. Box 30803, AMC', 'Memphis, TN 38130-0803'],
  },
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function PlanPage() {
  const [data] = useState(RESOLUTION_DATA)

  const completeForms = data.forms.filter((f) => f.status !== 'pending').length
  const completeDocs = data.supportingDocs.filter((d) => d.status === 'complete').length

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Back Navigation */}
        <Link
          href="/analysis/results"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Results
        </Link>

        {/* Header */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Resolution Plan</h1>
              <p className="mt-1 text-sm text-zinc-400">Your personalized action plan for resolving your tax debt</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-500/15 px-4 py-1.5 text-sm font-semibold text-blue-400">
              {data.label}
            </span>
          </div>
        </div>

        {/* RCP Breakdown */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">RCP Breakdown</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
              <div>
                <p className="text-sm text-zinc-400">Net Realizable Equity (NRE)</p>
                <p className="text-xs text-zinc-500">Total equity in all assets at quick sale value</p>
              </div>
              <span className="font-mono font-semibold text-white">${data.rcp.nre.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
              <div>
                <p className="text-sm text-zinc-400">Monthly Disposable Income (MDI)</p>
                <p className="text-xs text-zinc-500">Income minus allowable expenses</p>
              </div>
              <span className="font-mono font-semibold text-white">${data.rcp.mdiMonthly}/mo</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
              <div>
                <p className="text-sm text-zinc-400">Future Income (MDI x {data.rcp.multiplier})</p>
                <p className="text-xs text-zinc-500">Lump sum = 12 months, Periodic = 24 months</p>
              </div>
              <span className="font-mono font-semibold text-white">${(data.rcp.mdiMonthly * data.rcp.multiplier).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-white">Reasonable Collection Potential (RCP)</p>
                <p className="text-xs text-blue-400">This is your minimum offer amount</p>
              </div>
              <span className="font-mono text-xl font-bold text-blue-400">${data.rcp.total.toLocaleString()}</span>
            </div>
          </div>
          <Link
            href="/analysis/methodology"
            className="mt-4 inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            View full calculation methodology
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        {/* Required Forms Checklist */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Required Forms</h2>
            <span className="text-sm text-zinc-400">{completeForms}/{data.forms.length} ready</span>
          </div>
          <div className="space-y-3">
            {data.forms.map((form) => {
              const config = STATUS_CONFIG[form.status]
              return (
                <div key={form.name} className="flex items-center justify-between rounded-xl border border-[#27272a] bg-[#09090b] p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${form.status === 'pending' ? 'bg-zinc-800' : 'bg-blue-500/15'}`}>
                      {form.status === 'pending' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="16 13 12 17 8 13" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{form.name}</p>
                      <p className="text-xs text-zinc-500">{form.description}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${config.bgColor} ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Supporting Documents Checklist */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Supporting Documents</h2>
            <span className="text-sm text-zinc-400">{completeDocs}/{data.supportingDocs.length} collected</span>
          </div>
          {/* Progress bar */}
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
              style={{ width: `${(completeDocs / data.supportingDocs.length) * 100}%` }}
            />
          </div>
          <div className="space-y-2">
            {data.supportingDocs.map((doc) => {
              const config = STATUS_CONFIG[doc.status]
              return (
                <div key={doc.name} className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3">
                  <div className="flex items-center gap-3">
                    {doc.status === 'complete' ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-zinc-600" />
                    )}
                    <div>
                      <p className="text-sm text-white">{doc.name}</p>
                      <p className="text-xs text-zinc-500">{doc.description}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${config.bgColor} ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline Estimate */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Timeline Estimate</h2>
          <div className="flex items-center gap-3 rounded-xl bg-[#09090b] border border-[#27272a] p-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Expected Processing Time</p>
              <p className="text-sm text-zinc-400">{data.timeline}</p>
            </div>
          </div>
        </div>

        {/* Mailing Instructions */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Mailing Instructions</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Based on your state of residence ({data.mailingAddress.state}), mail your OIC package to the <span className="font-semibold text-white">{data.mailingAddress.center}</span> COIC Unit:
          </p>
          <div className="rounded-xl bg-[#09090b] border border-[#27272a] p-5">
            {data.mailingAddress.address.map((line, i) => (
              <p key={i} className="font-mono text-sm text-zinc-300">{line}</p>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">East of Mississippi</p>
              <p className="text-xs text-zinc-400">Brookhaven, NY</p>
            </div>
            <div className="rounded-lg border border-[#27272a] bg-[#09090b] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">West of Mississippi</p>
              <p className="text-xs text-zinc-400">Memphis, TN</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
            <p className="text-xs text-amber-400">
              <span className="font-semibold">Tip:</span> Send via USPS Certified Mail with Return Receipt Requested. Keep a complete copy of everything you submit.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <Link
            href="/forms/oic"
            className="block w-full rounded-xl bg-blue-600 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
          >
            Proceed to Forms
          </Link>
          <Link
            href="/analysis/results"
            className="block w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-center text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Change Resolution
          </Link>
        </div>
      </div>
    </div>
  )
}
