'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

const ARTICLES: Record<
  string,
  {
    title: string
    publishDate: string
    readTime: string
    category: string
    content: { type: 'h2' | 'p' | 'callout'; text: string }[]
    related: { slug: string; title: string }[]
  }
> = {
  'understanding-installment-agreements': {
    title: 'Understanding Installment Agreements',
    publishDate: 'March 15, 2026',
    readTime: '8 min read',
    category: 'Resolution Options',
    content: [
      { type: 'p', text: 'An installment agreement is a payment plan with the IRS that allows you to pay your tax debt over time in monthly installments. This is one of the most common resolution options and is available to most taxpayers who owe the IRS.' },
      { type: 'h2', text: 'Types of Installment Agreements' },
      { type: 'p', text: 'The IRS offers several types of installment agreements depending on the amount you owe and your financial situation. These include Guaranteed Installment Agreements (for debts under $10,000), Streamlined Agreements (for debts under $50,000), and Partial Payment Installment Agreements.' },
      { type: 'callout', text: 'If you owe less than $50,000, you may qualify for a streamlined installment agreement without providing detailed financial information to the IRS.' },
      { type: 'h2', text: 'How to Apply' },
      { type: 'p', text: 'You can apply online through the IRS Online Payment Agreement tool, by phone, or by mailing Form 9465 (Installment Agreement Request). The application process varies based on the amount owed and the type of agreement you are requesting.' },
      { type: 'h2', text: 'What to Expect' },
      { type: 'p', text: 'Once approved, you will make monthly payments until your debt is paid in full. Interest and penalties continue to accrue on the unpaid balance, so paying as much as possible each month will reduce your total cost.' },
    ],
    related: [
      { slug: 'oic-explained', title: 'OIC Explained' },
      { slug: 'currently-not-collectible', title: 'Currently Not Collectible (CNC) Status' },
    ],
  },
  'oic-explained': {
    title: 'OIC Explained',
    publishDate: 'March 10, 2026',
    readTime: '12 min read',
    category: 'Resolution Options',
    content: [
      { type: 'p', text: 'An Offer in Compromise (OIC) allows you to settle your tax debt for less than the full amount you owe. It may be a legitimate option if you cannot pay your full tax liability, or doing so creates a financial hardship.' },
      { type: 'h2', text: 'How the IRS Evaluates an OIC' },
      { type: 'p', text: 'The IRS considers your ability to pay, income, expenses, and asset equity when evaluating your offer. They calculate your Reasonable Collection Potential (RCP) to determine the minimum acceptable offer amount.' },
      { type: 'callout', text: 'The IRS accepts approximately 30-40% of all OIC submissions. Having accurate financial documentation significantly improves your chances of acceptance.' },
      { type: 'h2', text: 'Eligibility Requirements' },
      { type: 'p', text: 'You must be current on all filing requirements, have made all required estimated tax payments, and not be in an open bankruptcy proceeding. Additionally, the IRS must believe that the amount offered represents the most they can expect to collect.' },
    ],
    related: [
      { slug: 'understanding-installment-agreements', title: 'Understanding Installment Agreements' },
      { slug: 'csed-tax-debt-expiration', title: 'CSED: Your Tax Debt Has an Expiration Date' },
    ],
  },
}

const DEFAULT_ARTICLE = {
  title: 'Article',
  publishDate: 'March 2026',
  readTime: '5 min read',
  category: 'Tax Basics',
  content: [
    { type: 'p' as const, text: 'This article is coming soon. Check back later for detailed educational content about this topic.' },
    { type: 'callout' as const, text: 'BlastTax is continuously adding new educational content. Follow our updates for the latest articles.' },
  ],
  related: [
    { slug: 'understanding-installment-agreements', title: 'Understanding Installment Agreements' },
    { slug: 'oic-explained', title: 'OIC Explained' },
  ],
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = ARTICLES[slug] || {
    ...DEFAULT_ARTICLE,
    title: slugToTitle(slug),
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Back Link */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learn
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
            <span>{article.publishDate}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--muted-foreground)]" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-6">
          {article.content.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="text-xl font-semibold pt-2">
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'callout') {
              return (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-5"
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm leading-relaxed text-[var(--foreground)]">{block.text}</p>
                  </div>
                </div>
              )
            }
            return (
              <p key={i} className="text-[var(--muted-foreground)] leading-relaxed">
                {block.text}
              </p>
            )
          })}
        </div>

        {/* Related Articles */}
        {article.related.length > 0 && (
          <div className="border-t border-[var(--border)] pt-8">
            <h3 className="text-lg font-semibold">Related Articles</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {article.related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/learn/${rel.slug}`}
                  className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--muted-foreground)]"
                >
                  <p className="font-medium group-hover:text-[var(--primary)] transition">
                    {rel.title}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-[var(--primary)]">
                    Read
                    <svg className="h-3 w-3 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
