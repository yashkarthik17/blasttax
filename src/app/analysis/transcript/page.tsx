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

const optionIconStyle = (bg: string, color: string): React.CSSProperties => ({
  width: 40, height: 40, borderRadius: 12,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 16, flexShrink: 0,
  background: bg, color: color,
})

const uploadOptionStyle: React.CSSProperties = {
  background: 'white',
  border: '1px solid #F0F0F5',
  borderRadius: 16,
  padding: 16,
  marginBottom: 10,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
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
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#D5D5E0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '35%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#8585A0' }}>Step 3 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Transcript</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 20px' }}>
          {/* Heading */}
          <div style={{ marginBottom: 6 }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25, margin: 0 }}>Upload Your IRS Transcript</h1>
            <p style={{ fontSize: 13, color: '#8585A0', marginTop: 4, lineHeight: 1.5, margin: '4px 0 0' }}>Your transcript helps us verify your tax account details and find all penalties, payments, and assessments</p>
          </div>

          {/* Option 1: Download from IRS */}
          <div style={uploadOptionStyle} onClick={() => setShowGuide(!showGuide)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={optionIconStyle('#EFF4FF', '#2563EB')}>
                <i className="fa-solid fa-globe" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>Download from IRS.gov</div>
                <div style={{ fontSize: 12, color: '#8585A0' }}>Step-by-step guide</div>
              </div>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 11, color: '#B0B0C8', transition: 'transform 0.3s ease', transform: showGuide ? 'rotate(180deg)' : 'none' }} />
            </div>
            {showGuide && (
              <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0F0F5' }}>
                {[
                  { num: '1', text: 'Go to irs.gov/transcripts' },
                  { num: '2', text: 'Sign in with your ID.me or IRS account' },
                  { num: '3', text: 'Select "Account Transcript" for each year' },
                  { num: '4', text: 'Download as PDF and upload below' },
                ].map((step) => (
                  <div key={step.num} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#EFF4FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {step.num}
                    </div>
                    <div style={{ fontSize: 12, color: '#5C5C7A', lineHeight: 1.5 }}>{step.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Option 2: Upload PDF */}
          <div style={uploadOptionStyle} onClick={() => setShowUpload(!showUpload)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={optionIconStyle('#E6F9EE', '#00A651')}>
                <i className="fa-solid fa-cloud-arrow-up" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>Upload PDF</div>
                <div style={{ fontSize: 12, color: '#8585A0' }}>Drag and drop or browse</div>
              </div>
            </div>
            {showUpload && (
              <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 12 }}>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files) }}
                  style={{
                    border: '2px dashed ' + (dragActive ? '#2563EB' : '#F0F0F5'),
                    borderRadius: 14,
                    padding: '28px 20px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    background: dragActive ? '#EFF4FF' : 'transparent',
                  }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#FAFAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 20, color: '#5C5C7A' }}>
                    <i className="fa-solid fa-file-arrow-up" />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>Drop your transcript here</div>
                  <div style={{ fontSize: 12, color: '#8585A0' }}>or tap to browse</div>
                  <label style={{ display: 'inline-block', marginTop: 12, cursor: 'pointer', borderRadius: 8, background: '#00A651', padding: '8px 20px', fontSize: 14, fontWeight: 700, color: 'white' }}>
                    Browse Files
                    <input type="file" accept=".pdf,image/png,image/jpeg" multiple onChange={(e) => handleFiles(e.target.files)} style={{ display: 'none' }} />
                  </label>
                  <div style={{ fontSize: 11, color: '#B0B0C8', marginTop: 8 }}>Accepts PDF, PNG, JPG</div>
                </div>
                {files.map((file) => (
                  <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#E6F9EE', border: '1px solid #BBF7D0', borderRadius: 12, marginTop: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#E63946', flexShrink: 0 }}>
                      <i className="fa-solid fa-file-pdf" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{file.name}</div>
                      <div style={{ fontSize: 11, color: '#8585A0' }}>{formatFileSize(file.size)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fa-solid fa-circle-check" style={{ color: '#00A651', fontSize: 16 }} />
                      <button onClick={() => removeFile(file.id)} style={{ fontSize: 12, color: '#E63946', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Option 3: Connect e-Services */}
          <div style={uploadOptionStyle} onClick={() => setShowConnect(!showConnect)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={optionIconStyle('#F5F0FF', '#7C3AED')}>
                <i className="fa-solid fa-link" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>Connect IRS e-Services</div>
                <div style={{ fontSize: 12, color: '#8585A0' }}>Automatically retrieve your transcript</div>
              </div>
            </div>
            {showConnect && (
              <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 12 }}>
                <button style={{ padding: '12px 20px', fontSize: 13, border: '1px solid #D5D5E0', borderRadius: 12, background: 'white', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fa-solid fa-plug" style={{ fontSize: 12 }} />
                  Connect to IRS
                </button>
              </div>
            )}
          </div>

          {/* Info Alert */}
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#EFF4FF', border: '1px solid #BFDBFE', borderRadius: 12, fontSize: 13, color: '#1A1A2E' }}>
            <i className="fa-solid fa-circle-info" style={{ flexShrink: 0, color: '#2563EB' }} />
            <span>We look for Transaction Codes (TC) that determine your eligibility for each resolution type</span>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 10 }}>
            <div onClick={() => setShowFaq(!showFaq)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '10px 0' }}>
              <i className="fa-solid fa-question-circle" style={{ fontSize: 14, color: '#5C5C7A' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#5C5C7A' }}>What is a tax transcript?</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, color: '#B0B0C8', marginLeft: 'auto', transition: 'transform 0.3s ease', transform: showFaq ? 'rotate(180deg)' : 'none' }} />
            </div>
            {showFaq && (
              <div style={{ fontSize: 12, color: '#8585A0', lineHeight: 1.6, padding: '0 0 8px 28px' }}>
                A tax transcript is an official IRS document that shows your tax account activity. It includes all assessments, payments, penalties, and transaction codes for each tax year. It&apos;s different from your tax return - it shows what the IRS has on record for your account.
              </div>
            )}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1, minHeight: 12 }} />

          {/* Continue */}
          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={handleNext}
              style={{ width: '100%', padding: '16px 28px', background: '#00A651', borderRadius: 9999, fontSize: 15, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
