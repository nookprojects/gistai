'use client'
import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import Ticker from '@/components/Ticker'
import StatsBar from '@/components/StatsBar'
import NewsSection from '@/components/NewsSection'
import DealsDB from '@/components/DealsDB'
import FundTracker from '@/components/FundTracker'
import { FALLBACK_NEWS, FALLBACK_STATS } from '@/lib/fallback'
import type { NewsPayload } from '@/types'

export default function Home() {
  const [section, setSection] = useState('News')
  const [filter, setFilter] = useState('all')
  const [news, setNews] = useState<NewsPayload>(FALLBACK_NEWS)
  const [loading, setLoading] = useState(true)

  const loadNews = useCallback(async (f = filter) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/news?filter=${f}`)
      const data = await res.json()
      setNews(data)
    } catch {
      setNews({ ...FALLBACK_NEWS, source: 'fallback' })
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => { loadNews(filter) }, [filter])

  const handleFilter = (f: string) => {
    setFilter(f)
    loadNews(f)
  }

  return (
    <>
      <Header
        activeFilter={filter}
        onFilter={handleFilter}
        onRefresh={() => loadNews(filter)}
        loading={loading}
        activeSection={section}
        onSection={setSection}
      />
      <Ticker />
      <StatsBar stats={FALLBACK_STATS} />

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '28px 24px' }}>
        {section === 'News' && <NewsSection data={news} loading={loading} />}
        {section === 'Deals DB' && <DealsDB />}
        {section === 'Fund Tracker' && <FundTracker />}
      </main>

      <footer style={{ borderTop: '1px solid var(--body-border)', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
        <span className="font-serif" style={{ fontSize: 16, color: 'var(--body-text)' }}>GistAI News</span>
        <span className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)', letterSpacing: '0.06em' }}>AI-powered VC & tech intelligence · Updated every 15 min</span>
      </footer>
    </>
  )
}
