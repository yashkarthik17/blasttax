'use client'

import Link from 'next/link'

const cards = [
  {
    icon: (
      <svg className="w-[18px] h-[18px] text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    iconBg: 'bg-[#EFF4FF]',
    title: 'Speak on Your Behalf',
    desc: 'Your tax professional can communicate with the IRS for you — no more stressful phone calls.',
  },
  {
    icon: (
      <svg className="w-[18px] h-[18px] text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    iconBg: 'bg-[#ECFDF5]',
    title: 'Access Your Records',
    desc: 'They can request transcripts, view your account, and gather information needed for your case.',
  },
  {
    icon: (
      <svg className="w-[18px] h-[18px] text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    iconBg: 'bg-[#F3E8FF]',
    title: 'Represent You',
    desc: 'They can attend hearings, negotiate with IRS agents, and fight for the best outcome.',
  },
  {
    icon: (
      <svg className="w-[18px] h-[18px] text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
    ),
    iconBg: 'bg-[#FFF7ED]',
    title: 'Revocable Anytime',
    desc: 'You can cancel this authorization at any time by filing a new Form 2848 or sending a written revocation.',
  },
]

export default function POAEducationPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/agreement" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F1F5F9]">
            <svg className="w-4 h-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Power of Attorney</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-10 space-y-[18px]">
          {/* Info Icon */}
          <div className="flex justify-center">
            <div className="w-11 h-11 rounded-full bg-[#EFF4FF] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <div className="text-[1.25rem] font-extrabold text-[#0A1628] tracking-tight mb-1.5">What is Form 2848?</div>
            <div className="text-[0.82rem] font-medium text-[#6B7280] leading-relaxed">This is an important document. Here&apos;s what you need to know.</div>
          </div>

          {/* Education Cards */}
          {cards.map((card) => (
            <div key={card.title} className="flex items-start gap-3.5 p-4 bg-white border border-[#F1F5F9] rounded-2xl">
              <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
              <div className="flex-1">
                <div className="text-[0.88rem] font-bold text-[#0A1628] mb-1">{card.title}</div>
                <div className="text-[0.78rem] font-medium text-[#6B7280] leading-relaxed">{card.desc}</div>
              </div>
            </div>
          ))}

          {/* Reassurance Alert */}
          <div className="flex items-start gap-2.5 p-3.5 bg-[#ECFDF5] rounded-xl">
            <svg className="w-[15px] h-[15px] text-[#10B981] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
            </svg>
            <span className="text-[0.78rem] font-semibold text-[#065F46] leading-relaxed">Your tax professional cannot file returns, make payments, or agree to settlements without your explicit approval.</span>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/expert/workspace"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#00A651] text-white rounded-full text-[0.88rem] font-bold hover:-translate-y-0.5 transition-transform"
            >
              Continue to Workspace
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <div className="py-2.5 text-center">
              <span className="text-[0.78rem] font-semibold text-[#2563EB] cursor-pointer">Learn more about Form 2848</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
