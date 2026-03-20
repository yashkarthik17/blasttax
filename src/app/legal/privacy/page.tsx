'use client'

import { useRouter } from 'next/navigation'

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly, including: name, email address, phone number, Social Security Number (SSN), tax identification numbers, financial information, IRS transcripts, and tax return data. We also automatically collect device information, usage data, and analytics to improve our Service. All SSN and sensitive financial data is encrypted at rest and in transit using AES-256 encryption.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use your information to: provide tax resolution analysis and recommendations, connect you with licensed tax professionals, process payments, communicate with you about your account and cases, improve our algorithms and Service, comply with legal obligations, and prevent fraud or unauthorized access to your account.',
  },
  {
    title: '3. Data Security',
    content: 'We implement industry-standard security measures to protect your personal information, including: AES-256 encryption for data at rest, TLS 1.3 for data in transit, multi-factor authentication, regular security audits, SOC 2 Type II compliance, and restricted access controls. We never store raw SSN data in plain text. However, no method of transmission over the Internet is 100% secure.',
  },
  {
    title: '4. Third-Party Sharing',
    content: 'We do not sell your personal information. We may share your data with: licensed tax professionals you choose to work with, payment processors (Stripe), IRS e-Services (with your explicit authorization), cloud infrastructure providers (AWS), and analytics services. All third-party partners are contractually obligated to protect your data.',
  },
  {
    title: '5. Your Rights',
    content: 'You have the right to: access your personal data, correct inaccurate data, request deletion of your data, opt out of marketing communications, download a copy of your data, and withdraw consent at any time. California residents have additional rights under the CCPA. To exercise these rights, contact us at privacy@blasttax.com.',
  },
  {
    title: '6. Cookies and Tracking',
    content: 'We use essential cookies for authentication and security, functional cookies for preferences, and analytics cookies to understand usage patterns. You can manage cookie preferences through your browser settings. We do not use cookies for advertising purposes. Our analytics data is anonymized and aggregated.',
  },
  {
    title: '7. Contact Us',
    content: 'If you have questions about this Privacy Policy or our data practices, contact our Data Protection Officer at privacy@blasttax.com, or write to: Five Star Tax Resolution, LLC, Privacy Department, 123 Main Street, Suite 400, Los Angeles, CA 90001.',
  },
]

export default function PrivacyPolicyPage() {
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
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>

        {/* Last Updated */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F1F5F9] bg-[#F8FAFC] px-3 py-1.5">
          <svg className="h-2.5 w-2.5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[0.72rem] font-semibold text-[#94A3B8]">Last updated: March 1, 2026</span>
        </div>

        {/* Encryption Banner */}
        <div className="flex items-center gap-2.5 rounded-[14px] border border-[#D1FAE5] bg-[#ECFDF5] px-4 py-3.5">
          <svg className="h-4 w-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <span className="text-[0.78rem] font-semibold text-[#065F46]">Your data is protected</span>
            <span className="block text-[0.68rem] text-[#6B7280]">256-bit AES encryption for all sensitive data including SSNs</span>
          </div>
        </div>

        {/* Sections */}
        <div>
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="mb-2 text-[0.9rem] font-bold text-[#0A1628]">{section.title}</h3>
              <p className="text-[0.8rem] leading-[1.65] text-[#64748B]">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
