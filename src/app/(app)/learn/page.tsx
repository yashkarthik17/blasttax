'use client'

import { useState } from 'react'
import Link from 'next/link'

type Category = 'all' | 'resolution' | 'notices' | 'basics' | 'forms'

interface Article {
  slug: string
  title: string
  description: string
  readTime: string
  category: Category
  categoryLabel: string
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'resolution', label: 'Resolution Options' },
  { key: 'notices', label: 'IRS Notices' },
  { key: 'basics', label: 'Tax Basics' },
  { key: 'forms', label: 'Forms Guide' },
]

const ARTICLES: Article[] = [
  {
    slug: 'understanding-installment-agreements',
    title: 'Understanding Installment Agreements',
    description:
      'Learn how IRS installment agreements work, eligibility requirements, and which type of payment plan is right for your situation.',
    readTime: '8 min read',
    category: 'resolution',
    categoryLabel: 'Resolution Options',
  },
  {
    slug: 'oic-explained',
    title: 'OIC Explained',
    description:
      'A complete guide to Offers in Compromise - how the IRS evaluates your ability to pay and when settling for less than you owe is possible.',
    readTime: '12 min read',
    category: 'resolution',
    categoryLabel: 'Resolution Options',
  },
  {
    slug: 'what-happens-when-you-owe-the-irs',
    title: 'What Happens When You Owe the IRS',
    description:
      'Understanding the IRS collection process from initial notice through enforced collection, and what your rights are at each stage.',
    readTime: '10 min read',
    category: 'basics',
    categoryLabel: 'Tax Basics',
  },
  {
    slug: 'how-to-read-your-irs-transcript',
    title: 'How to Read Your IRS Transcript',
    description:
      'Decode transaction codes, understand assessment dates, and learn how to extract the critical information from your account transcript.',
    readTime: '15 min read',
    category: 'forms',
    categoryLabel: 'Forms Guide',
  },
  {
    slug: 'csed-tax-debt-expiration',
    title: 'CSED: Your Tax Debt Has an Expiration Date',
    description:
      'The Collection Statute Expiration Date gives the IRS 10 years to collect. Learn how it works, what extends it, and how it affects your strategy.',
    readTime: '7 min read',
    category: 'basics',
    categoryLabel: 'Tax Basics',
  },
  {
    slug: 'understanding-cp2000-notice',
    title: 'Understanding the CP2000 Notice',
    description:
      'What to do when you receive a CP2000 notice for unreported income, how to respond, and common mistakes to avoid.',
    readTime: '6 min read',
    category: 'notices',
    categoryLabel: 'IRS Notices',
  },
  {
    slug: 'currently-not-collectible',
    title: 'Currently Not Collectible (CNC) Status',
    description:
      'When you can\'t afford to pay the IRS anything, CNC status may pause collection. Learn the qualifications and implications.',
    readTime: '9 min read',
    category: 'resolution',
    categoryLabel: 'Resolution Options',
  },
  {
    slug: 'irs-form-9465-guide',
    title: 'IRS Form 9465: Payment Plan Request',
    description:
      'Step-by-step guide to completing Form 9465 and requesting an installment agreement with the IRS.',
    readTime: '11 min read',
    category: 'forms',
    categoryLabel: 'Forms Guide',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  resolution: 'bg-blue-500/10 text-blue-400',
  notices: 'bg-amber-500/10 text-amber-400',
  basics: 'bg-emerald-500/10 text-emerald-400',
  forms: 'bg-purple-500/10 text-purple-400',
}

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredArticles =
    activeCategory === 'all'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Learn</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">
            Educational resources to help you understand tax resolution.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.key
                  ? 'bg-[var(--primary)] text-white'
                  : 'border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--muted-foreground)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      CATEGORY_COLORS[article.category] || ''
                    }`}
                  >
                    {article.categoryLabel}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-[var(--primary)] transition">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {article.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--primary)]">
                Read article
                <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
