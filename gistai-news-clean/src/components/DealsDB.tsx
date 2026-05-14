'use client'
import { useState, useEffect } from 'react'
import type { Deal } from '@/types'

const SECTORS = ['All', 'AI', 'Fintech', 'Defence Tech', 'SaaS', 'Healthcare']

export default function DealsDB() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [sector, setSector] = useState('all')
  const [sort, setSort] = useState('date')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/deals?sector=${sector}&sort=${sort}`)
      .then(r => r.json())
      .then(d => { setDeals(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sector, sort])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {SECTORS.map(s => (
            <button key={s} onClick={() => setSector(s === 'All' ? 'all' : s)}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, padding: '5px 12px', borderRadius: 999, border: '1px solid var(--body-border)', background: (s === 'All' ? 'all' : s) === sector || (s === 'All' && sector === 'all') ? 'var(--body-text)' : 'var(--body-surface)', color: (s === 'All' ? 'all' : s) === sector || (s === 'All' && sector === 'all') ? '#fff' : 'var(--body-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}>
              {s}
            </button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, padding: '5px 10px', border: '1px solid var(--body-border)', borderRadius: 6, background: 'var(--body-surface)', color: 'var(--body-secondary)', cursor: 'pointer' }}>
          <option value="date">Sort: Recent</option>
          <option value="amount">Sort: Largest</option>
        </select>
      </div>

      <div style={{ border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr', background: 'var(--body-surface2)', padding: '10px 20px', borderBottom: '1px solid var(--body-border)' }}>
          {['Company', 'Round', 'Amount', 'Investors', 'Sector', 'Date'].map(h => (
            <div key={h} className="font-mono" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--body-muted)' }}>{h}</div>
          ))}
        </div>
        {loading ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--body-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>Loading deals...</div>
        ) : deals.map((d, i) => (
          <div key={d.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr', padding: '14px 20px', borderTop: i === 0 ? 'none' : '1px solid var(--body-border)', background: 'var(--body-surface)', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#fdfbf8')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--body-surface)')}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--body-text)' }}>{d.company}</div>
              {d.valuation && <div className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)', marginTop: 2 }}>val: {d.valuation}</div>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--body-secondary)' }}>{d.round}</div>
            <div className="font-mono" style={{ fontSize: 13, color: '#1a4fa0', fontWeight: 500 }}>{d.amount}</div>
            <div style={{ fontSize: 11, color: 'var(--body-secondary)' }}>{d.investors.slice(0, 2).join(', ')}{d.investors.length > 2 ? ` +${d.investors.length - 2}` : ''}</div>
            <span className="tag tag-vc" style={{ fontSize: 9, padding: '2px 6px', alignSelf: 'flex-start' }}>{d.sector}</span>
            <div className="font-mono" style={{ fontSize: 11, color: 'var(--body-muted)' }}>{d.date}</div>
          </div>
        ))}
      </div>
      <div className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)', marginTop: 12, textAlign: 'right' }}>
        {deals.length} deals · Updated hourly · <span style={{ color: '#1a4fa0' }}>Connect Crunchbase API for live data</span>
      </div>
    </div>
  )
}
