'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import FormScreen from '@/components/wizard/FormScreen'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  dataUrl: string
}

const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function TranscriptPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [files, setFiles] = useState<UploadedFile[]>(answers.transcriptFiles ?? [])
  const [showEducation, setShowEducation] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    Array.from(fileList).forEach((file) => {
      // Only accept PDF and image files
      if (!file.type.match(/^(application\/pdf|image\/(png|jpeg|jpg|gif|webp))$/)) return
      // Max 10MB per file
      if (file.size > 10 * 1024 * 1024) return

      const reader = new FileReader()
      reader.onload = () => {
        setFiles((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            type: file.type,
            dataUrl: reader.result as string,
          },
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

  function handleSkip() {
    setAnswers({ transcriptFiles: [], transcriptSkipped: true })
    router.push('/analysis/case-info')
  }

  return (
    <FormScreen
      title="IRS Transcript"
      description="Upload your IRS tax transcript so we can automatically extract your debt details."
      onNext={handleNext}
      onBack={() => router.push('/analysis/household')}
      isValid={true}
    >
      {/* Education Section */}
      {showEducation && (
        <div className={cardClass}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">What is an IRS Transcript?</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  An IRS transcript is an official summary of your tax account. It shows your filing history,
                  balances owed, payments made, and penalty/interest assessments. We use it to accurately
                  calculate your resolution options.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowEducation(false)}
              className="ml-2 shrink-0 text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4 text-sm text-zinc-400">
            <p className="font-medium text-zinc-300">Types of transcripts:</p>
            <ul className="mt-2 space-y-1 pl-4">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span><strong className="text-zinc-300">Account Transcript</strong> — Shows balances, payments, penalties, and interest (most useful)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                <span><strong className="text-zinc-300">Record of Account</strong> — Combined return and account information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                <span><strong className="text-zinc-300">Tax Return Transcript</strong> — Shows most line items from your return</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Upload Transcript</h3>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragActive(false)
            handleFiles(e.dataTransfer.files)
          }}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
            dragActive
              ? 'border-emerald-500 bg-emerald-500/5'
              : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600'
          }`}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-medium text-zinc-300">
            Drag & drop your transcript here
          </p>
          <p className="mt-1 text-xs text-zinc-500">or</p>
          <label className="mt-3 cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500">
            Browse Files
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg,image/jpg,image/gif,image/webp"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </label>
          <p className="mt-3 text-xs text-zinc-500">PDF or images, max 10MB each</p>
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-zinc-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-zinc-500 transition-colors hover:text-red-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Don't Have Transcript */}
      <div className={cardClass}>
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-300">I don&apos;t have my transcript</span>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-zinc-500 transition-transform duration-200 ${showHelp ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {showHelp && (
          <div className="mt-4 space-y-4 border-t border-zinc-800 pt-4">
            <p className="text-sm leading-relaxed text-zinc-400">
              You can get your transcript in several ways:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg bg-zinc-800/60 p-4">
                <p className="text-sm font-semibold text-zinc-300">1. Online (Fastest)</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Go to{' '}
                  <a
                    href="https://www.irs.gov/individuals/get-transcript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline"
                  >
                    IRS.gov/Get Transcript
                  </a>
                  {' '}and create or sign in to your IRS online account. Download the &quot;Account Transcript&quot; for each year you owe.
                </p>
              </div>
              <div className="rounded-lg bg-zinc-800/60 p-4">
                <p className="text-sm font-semibold text-zinc-300">2. By Mail (5-10 business days)</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Request via IRS.gov or call 1-800-908-9946. Transcripts will be mailed to the address on file.
                </p>
              </div>
              <div className="rounded-lg bg-zinc-800/60 p-4">
                <p className="text-sm font-semibold text-zinc-300">3. Form 4506-T</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Submit IRS Form 4506-T (Request for Transcript of Tax Return) by mail or fax. Processing takes 5-10 business days.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Skip Option */}
      <button
        type="button"
        onClick={handleSkip}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 py-4 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 5l7 7-7 7" /><path d="M5 5l7 7-7 7" />
        </svg>
        Skip for now — I&apos;ll enter my debt manually
      </button>
    </FormScreen>
  )
}
