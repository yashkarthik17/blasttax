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
  { slug: 'oic-explained', title: 'What is an Offer in Compromise?', readTime: '5 min read', category: 'resolution', categoryLabel: 'Resolution', icon: 'fa-handshake', iconColor: '#0A1628', thumbBg: '#EFF4FF', tagBg: '#EFF4FF', tagColor: '#0A1628' },
  { slug: 'installment-agreements', title: 'Installment Agreement Types Explained', readTime: '7 min read', category: 'resolution', categoryLabel: 'Resolution', icon: 'fa-calendar-check', iconColor: '#00A651', thumbBg: '#E6F9EE', tagBg: '#E6F9EE', tagColor: '#00A651' },
  { slug: 'transaction-codes', title: 'Understanding IRS Transaction Codes', readTime: '10 min read', category: 'irs', categoryLabel: 'IRS Process', icon: 'fa-code', iconColor: '#7C3AED', thumbBg: '#F5F0FF', tagBg: '#EEF2FF', tagColor: '#4F46E5' },
  { slug: 'csed-expiration', title: 'CSED: When Does Your Tax Debt Expire?', readTime: '6 min read', category: 'irs', categoryLabel: 'IRS Process', icon: 'fa-hourglass-half', iconColor: '#D97706', thumbBg: '#FEF3C7', tagBg: '#FEF3C7', tagColor: '#D97706' },
  { slug: 'penalty-abatement', title: 'Penalty Abatement: FTA vs Reasonable Cause', readTime: '4 min read', category: 'tips', categoryLabel: 'Tips', icon: 'fa-eraser', iconColor: '#E63946', thumbBg: '#FFF0F1', tagBg: '#FFF0F1', tagColor: '#E63946' },
]

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredArticles =
    activeCategory === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Learn</div>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#0A1628' }}>
            <i className="fas fa-magnifying-glass" style={{ fontSize: 16 }} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '0 20px 20px' }}>
          {/* Featured Article */}
          <div
            style={{
              background: '#0A1628',
              borderRadius: 20,
              padding: 24,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 9999,
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: 14,
                }}
              >
                <i className="fas fa-star" style={{ fontSize: 8 }} /> FEATURED
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 10 }}>Understanding IRS Tax Debt: Your Complete Guide</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                  <i className="far fa-clock" style={{ fontSize: 10 }} /> 12 min read
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 9999,
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  Tax Basics
                </div>
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 9999,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  border: '1px solid',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  ...(activeCategory === cat.key
                    ? { background: '#0A1628', color: 'white', borderColor: '#0A1628' }
                    : { background: 'white', color: '#64748B', borderColor: '#F3F4F6' }),
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-4">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '14px 0',
                  borderBottom: '1px solid #F1F5F9',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: article.thumbBg,
                  }}
                >
                  <i className={`fas ${article.icon}`} style={{ fontSize: 22, color: article.iconColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', lineHeight: 1.35, marginBottom: 6 }}>{article.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <i className="far fa-clock" style={{ fontSize: 9 }} /> {article.readTime}
                    </span>
                    <span style={{ padding: '2px 8px', background: article.tagBg, borderRadius: 9999, fontSize: '0.6rem', fontWeight: 600, color: article.tagColor }}>{article.categoryLabel}</span>
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
