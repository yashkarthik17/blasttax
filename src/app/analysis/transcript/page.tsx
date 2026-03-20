'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface UploadedFile {
  id: string; name: string; size: number; type: string; dataUrl: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function TranscriptPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [files, setFiles] = useState<UploadedFile[]>(answers.transcriptFiles ?? [])
  const [showGuide, setShowGuide] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showConnect, setShowConnect] = useState(false)
  const [showFaq, setShowFaq] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    Array.from(fileList).forEach((file) => {
      if (!file.type.match(/^(application\/pdf|image\/(png|jpeg|jpg))$/)) return
      if (file.size > 10 * 1024 * 1024) return
      const reader = new FileReader()
      reader.onload = () => {
        setFiles((prev) => [
          ...prev,
          { id: crypto.randomUUID(), name: file.name, size: file.size, type: file.type, dataUrl: reader.result as string },
        ])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  function handleNext() {
    setAnswers({ transcriptFiles: files, transcriptSkipped: false })
    router.push('/analysis/case-info')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto flex min-h-screen max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex-col">
        {/* Progress */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[35%] rounded-full bg-[#00A651]" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 3 of 6</span>
            <span className="text-xs font-semibold text-[#2563EB]">Transcript</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          {/* Heading */}
          <div className="mb-1.5">
            <h1 className="text-[1.3rem] font-extrabold leading-tight text-[#0A1628]">Upload Your IRS Transcript</h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[#94A3B8]">Your transcript helps us verify your tax account details and find all penalties, payments, and assessments</p>
          </div>

          {/* Option 1: Download from IRS */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="mb-2.5 w-full rounded-[16px] border border-[#F1F5F9] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#2563EB]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF4FF] text-base text-[#2563EB]">
                <i className="fa-solid fa-globe" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#0A1628]">Download from IRS.gov</div>
                <div className="text-xs text-[#94A3B8]">Step-by-step guide</div>
              </div>
              <i className={`fa-solid fa-chevron-down text-[11px] text-[#CBD5E1] transition-transform ${showGuide ? 'rotate-180' : ''}`} />
            </div>
            {showGuide && (
              <div className="mt-3 border-t border-[#F1F5F9] pt-3" onClick={(e) => e.stopPropagation()}>
                {[
                  { num: '1', text: <>Go to <strong className="text-[#2563EB]">irs.gov/transcripts</strong></> },
                  { num: '2', text: 'Sign in with your ID.me or IRS account' },
                  { num: '3', text: <>Select <strong>&quot;Account Transcript&quot;</strong> for each year</> },
                  { num: '4', text: 'Download as PDF and upload below' },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-2.5 py-2">
                    <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] text-[11px] font-bold text-[#2563EB]">
                      {step.num}
                    </div>
                    <div className="text-xs leading-relaxed text-[#64748B]">{step.text}</div>
                  </div>
                ))}
              </div>
            )}
          </button>

          {/* Option 2: Upload PDF */}
          <div className="mb-2.5 rounded-[16px] border border-[#F1F5F9] bg-white p-4 transition-all hover:border-[#2563EB]">
            <button onClick={() => setShowUpload(!showUpload)} className="flex w-full items-center gap-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F9EE] text-base text-[#00A651]">
                <i className="fa-solid fa-cloud-arrow-up" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#0A1628]">Upload PDF</div>
                <div className="text-xs text-[#94A3B8]">Drag and drop or browse</div>
              </div>
            </button>
            {showUpload && (
              <div className="mt-3">
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files) }}
                  className={`flex flex-col items-center rounded-[14px] border-2 border-dashed px-5 py-7 text-center transition-all ${
                    dragActive ? 'border-[#2563EB] bg-[#EFF4FF]' : 'border-[#F1F5F9]'
                  }`}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F8FAFC] text-xl text-[#64748B]">
                    <i className="fa-solid fa-file-arrow-up" />
                  </div>
                  <div className="mb-1 text-sm font-bold text-[#0A1628]">Drop your transcript here</div>
                  <div className="text-xs text-[#94A3B8]">or tap to browse</div>
                  <label className="mt-3 cursor-pointer rounded-lg bg-[#00A651] px-5 py-2 text-sm font-bold text-white transition-all hover:bg-[#008C44]">
                    Browse Files
                    <input type="file" accept=".pdf,image/png,image/jpeg" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
                  </label>
                  <div className="mt-2 text-[11px] text-[#CBD5E1]">Accepts PDF, PNG, JPG</div>
                </div>
                {files.map((file) => (
                  <div key={file.id} className="mt-3 flex items-center gap-3 rounded-xl border border-[#BBF7D0] bg-[#E6F9EE] px-3.5 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-base text-[#E63946]">
                      <i className="fa-solid fa-file-pdf" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#0A1628]">{file.name}</div>
                      <div className="text-[11px] text-[#94A3B8]">{formatFileSize(file.size)}</div>
                    </div>
                    <i className="fa-solid fa-circle-check text-base text-[#00A651]" />
                    <button onClick={() => removeFile(file.id)} className="text-xs font-semibold text-[#E63946]">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Option 3: Connect e-Services */}
          <div className="mb-2.5 rounded-[16px] border border-[#F1F5F9] bg-white p-4 transition-all hover:border-[#2563EB]">
            <button onClick={() => setShowConnect(!showConnect)} className="flex w-full items-center gap-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F0FF] text-base text-[#7C3AED]">
                <i className="fa-solid fa-link" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#0A1628]">Connect IRS e-Services</div>
                <div className="text-xs text-[#94A3B8]">Automatically retrieve your transcript</div>
              </div>
            </button>
            {showConnect && (
              <div className="mt-3">
                <button className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-[13px] font-semibold text-[#0A1628] transition-all hover:border-[#2563EB]">
                  <i className="fa-solid fa-plug text-xs" />
                  Connect to IRS
                </button>
              </div>
            )}
          </div>

          {/* Info Alert */}
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF4FF] px-3.5 py-2.5 text-[13px] text-[#0A1628]">
            <i className="fa-solid fa-circle-info shrink-0 text-[#2563EB]" />
            <span>We look for Transaction Codes (TC) that determine your eligibility for each resolution type</span>
          </div>

          {/* FAQ */}
          <div className="mt-2.5">
            <button onClick={() => setShowFaq(!showFaq)} className="flex w-full items-center gap-2 py-2.5 text-left">
              <i className="fa-solid fa-question-circle text-sm text-[#64748B]" />
              <span className="flex-1 text-[13px] font-semibold text-[#64748B]">What is a tax transcript?</span>
              <i className={`fa-solid fa-chevron-down text-[10px] text-[#CBD5E1] transition-transform ${showFaq ? 'rotate-180' : ''}`} />
            </button>
            {showFaq && (
              <div className="pb-2 pl-7 text-xs leading-relaxed text-[#94A3B8]">
                A tax transcript is an official IRS document that shows your tax account activity. It includes all assessments, payments, penalties, and transaction codes for each tax year. It&apos;s different from your tax return - it shows what the IRS has on record for your account.
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="min-h-3 flex-1" />

          {/* Continue */}
          <div className="pt-3 pb-5">
            <button
              onClick={handleNext}
              className="w-full rounded-full bg-[#00A651] px-7 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Continue <i className="fa-solid fa-arrow-right ml-1 text-[13px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
