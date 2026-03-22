'use client'

import { useRouter } from 'next/navigation'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the BlastTax application ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you may not access or use the Service. These Terms constitute a legally binding agreement between you and Five Star Tax Resolution, LLC ("Company," "we," "us").',
  },
  {
    title: '2. Eligibility',
    content: 'You must be at least 18 years old and a legal resident of the United States to use this Service. By using the Service, you represent and warrant that you meet these eligibility requirements and have the legal capacity to enter into a binding agreement.',
  },
  {
    title: '3. Account Registration',
    content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are solely responsible for all activities that occur under your account.',
  },
  {
    title: '4. Services Description',
    content: 'BlastTax provides tax resolution analysis tools, educational resources, and connects users with licensed tax professionals. The Service utilizes AI-powered algorithms to analyze tax situations and recommend potential resolution strategies. The Service does not constitute legal, tax, or financial advice.',
  },
  {
    title: '5. Fees and Payments',
    content: 'Certain features of the Service may require payment. All fees are stated in U.S. dollars and are non-refundable unless otherwise specified. We reserve the right to change our pricing at any time, with reasonable notice to existing subscribers. Payment processing is handled by secure third-party providers.',
  },
  {
    title: '6. Limitations of Use',
    content: 'You agree not to misuse the Service, including but not limited to: attempting to gain unauthorized access, using automated tools to scrape data, submitting false information, or using the Service for any illegal purpose. We reserve the right to suspend or terminate accounts that violate these terms.',
  },
  {
    title: '7. Disclaimer of Warranties',
    content: 'The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the Service will be error-free, uninterrupted, or that any information provided will be accurate or complete. Tax resolution outcomes depend on many factors outside our control, including IRS decisions.',
  },
  {
    title: '8. Privacy',
    content: 'Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information, including sensitive tax data. By using the Service, you consent to the practices described in the Privacy Policy.',
  },
  {
    title: '9. Termination',
    content: 'Either party may terminate this agreement at any time. Upon termination, your right to use the Service will immediately cease. We may retain certain data as required by law or for legitimate business purposes. You may request deletion of your data in accordance with our Privacy Policy.',
  },
  {
    title: '10. Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.',
  },
]

export default function TermsOfServicePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Terms of Service</h1>
        </div>

        {/* Last Updated */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F0F0F5] bg-[#FAFAFF] px-3 py-1.5">
          <svg className="h-2.5 w-2.5 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[0.72rem] font-semibold text-[#8585A0]">Last updated: March 1, 2026</span>
        </div>

        {/* Sections */}
        <div>
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="mb-2 text-[0.9rem] font-bold text-[#1A1A2E]">{section.title}</h3>
              <p className="text-[0.8rem] leading-[1.65] text-[#5C5C7A]">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Accept Button */}
        <div className="py-2">
          <button
            onClick={() => router.back()}
            className="flex w-full items-center justify-center rounded-full bg-[#1A1A2E] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  )
}
