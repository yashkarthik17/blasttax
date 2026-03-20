'use client'

import { useState } from 'react'
import Link from 'next/link'

type Category = 'all' | 'resolution' | 'filing' | 'irs' | 'tips'

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'filing', label: 'Tax Filing' },
  { key: 'irs', label: 'IRS Process' },
  { key: 'tips', label: 'Tips' },
]

interface Article {
  slug: string
  title: string
  readTime: string
  category: Category
  categoryLabel: string
  icon: string
  iconColor: string
  thumbBg: string
  tagBg: string
  tagColor: string
}

const ARTICLES: Article[] = [
  { slug: 'oic-explained', title: 'What is an Offer in Compromise?', readTime: '5 min read', category: 'resolution', categoryLabel: 'Resolution', icon: 'fa-handshake', iconColor: 'text-[#0A1628]', thumbBg: 'bg-[#EFF4FF]', tagBg: 'bg-[#EFF4FF]', tagColor: 'text-[#0A1628]' },
  { slug: 'installment-agreements', title: 'Installment Agreement Types Explained', readTime: '7 min read', category: 'resolution', categoryLabel: 'Resolution', icon: 'fa-calendar-check', iconColor: 'text-[#00A651]', thumbBg: 'bg-[#E6F9EE]', tagBg: 'bg-[#E6F9EE]', tagColor: 'text-[#00A651]' },
  { slug: 'transaction-codes', title: 'Understanding IRS Transaction Codes', readTime: '10 min read', category: 'irs', categoryLabel: 'IRS Process', icon: 'fa-code', iconColor: 'text-[#7C3AED]', thumbBg: 'bg-[#F5F0FF]', tagBg: 'bg-[#EEF2FF]', tagColor: 'text-[#4F46E5]' },
  { slug: 'csed-expiration', title: 'CSED: When Does Your Tax Debt Expire?', readTime: '6 min read', category: 'irs', categoryLabel: 'IRS Process', icon: 'fa-hourglass-half', iconColor: 'text-[#D97706]', thumbBg: 'bg-[#FEF3C7]', tagBg: 'bg-[#FEF3C7]', tagColor: 'text-[#D97706]' },
  { slug: 'penalty-abatement', title: 'Penalty Abatement: FTA vs Reasonable Cause', readTime: '4 min read', category: 'tips', categoryLabel: 'Tips', icon: 'fa-eraser', iconColor: 'text-[#E63946]', thumbBg: 'bg-[#FFF0F1]', tagBg: 'bg-[#FFF0F1]', tagColor: 'text-[#E63946]' },
]

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredArticles =
    activeCategory === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <h1 className="text-[1.2rem] font-extrabold text-[#0A1628]">Learn</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A1628]">
            <i className="fas fa-magnifying-glass text-base" />
          </button>
        </div>

        <div className="flex flex-col gap-[18px] px-5 pb-8">
          {/* Featured Article */}
          <div className="relative cursor-pointer overflow-hidden rounded-[20px] bg-[#0A1628] p-6 transition hover:-translate-y-0.5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.08]" />
            <div className="pointer-events-none absolute -bottom-[30px] -left-[30px] h-[120px] w-[120px] rounded-full bg-white/[0.05]" />
            <div className="relative z-10">
              <span className="mb-3.5 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[0.62rem] font-semibold text-white/90">
                <i className="fas fa-star text-[8px]" /> FEATURED
              </span>
              <div className="mb-2.5 text-[1.1rem] font-extrabold leading-tight text-white">
                Understanding IRS Tax Debt: Your Complete Guide
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[0.7rem] font-medium text-white/70">
                  <i className="far fa-clock text-[10px]" /> 12 min read
                </span>
                <span className="rounded-full bg-white/[0.15] px-2 py-0.5 text-[0.62rem] font-semibold text-white/90">
                  Tax Basics
                </span>
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 rounded-full px-4 py-[7px] text-[0.72rem] font-semibold transition ${
                  activeCategory === cat.key
                    ? 'border border-[#0A1628] bg-[#0A1628] text-white'
                    : 'border border-[#F3F4F6] bg-white text-[#64748B] hover:border-[#0A1628] hover:bg-[#EFF4FF] hover:text-[#0A1628]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="flex gap-3.5 py-3.5 no-underline transition hover:bg-[#F8FAFC] rounded-xl border border-transparent md:border-[#F1F5F9] md:px-3 md:bg-white"
              >
                <div className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl ${article.thumbBg}`}>
                  <i className={`fas ${article.icon} text-[22px] ${article.iconColor}`} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <div className="mb-1.5 text-[0.85rem] font-bold leading-tight text-[#1F2937]">{article.title}</div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1 text-[0.68rem] font-medium text-[#94A3B8]">
                      <i className="far fa-clock text-[9px]" /> {article.readTime}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${article.tagBg} ${article.tagColor}`}>
                      {article.categoryLabel}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
