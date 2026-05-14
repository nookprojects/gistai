'use client'
import { useState, useEffect } from 'react'
import type { FundEntry } from '@/types'

const STAGES = ['All', 'Multi-stage', 'Early-stage', 'Growth', 'Seed / Series A']

export default function FundTracker() {
  const [funds, setFunds] = useState<FundEntry[]>([])
  const [stage, setStage] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/funds')
      .then(r => r.json())
      .then(d => { setFunds(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = stage === 'All' ? funds : funds.filter(f => f.stage === stage)
  const totalCapital = filtered.reduce((acc, f) => {
    const n = parseFloat(f.size.replace(/[^0-9.]/g, ''))
    const mult = f.size.includes('B') ? 1 : 0.001
    return acc + n * mult
  }, 0)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--body-border)', border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
        {[
          { label: 'Funds closed (2026)', val: String(funds.length), delta: '↑ 3 this month' },
          { label: 'Total capital raised', val: `$${totalCapital.toFixed(1)}B`, delta: 'In view' },
          { label: 'Avg fund size', val: funds.length ? `$${(totalCapital / funds.length).toFixed(1)}B` : '—', delta: 'Multi-stage skews up' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'var(--body-surface)', padding: '18px 20px' }}>
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--body-muted)', marginBottom: 6 }}>{c.label}</div>
            <div className="font-serif" style={{ fontSize: 26, color: 'var(--body-text)', letterSpacing: '-0.4px' }}>{c.val}</div>
            <div className="font-mono" style={{ fontSize: 10, color: '#4ade80', marginTop: 4 }}>{c.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {STAGES.map(s => (
          <button key={s} onClick={() => setStage(s)}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, padding: '5px 12px', borderRadius: 999, border: '1px solid var(--body-border)', background: stage === s ? 'var(--body-text)' : 'var(--body-surface)', color: stage === s ? '#fff' : 'var(--body-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'var(--body-border)', border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ gridColumn: 'span 2', padding: 32, textAlign: 'center', color: 'var(--body-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--body-surface)' }}>Loading funds...</div>
        ) : filtered.map((f) => (
          <div key={f.id} style={{ background: 'var(--body-surface)', padding: '18px 20px', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#fdfbf8')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--body-surface)')}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--body-text)' }}>{f.firm}</div>
                <div style={{ fontSize: 12, color: 'var(--body-secondary)', marginTop: 2 }}>{f.fundName}</div>
              </div>
              <div className="font-mono" style={{ fontSize: 16, fontWeight: 500, color: '#1a4fa0' }}>{f.size}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="tag tag-vc" style={{ fontSize: 9, padding: '2px 6px' }}>{f.stage}</span>
              <span className="tag tag-fund" style={{ fontSize: 9, padding: '2px 6px' }}>{f.geo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--body-border)' }}>
              <span style={{ fontSize: 11, color: 'var(--body-secondary)' }}>{f.focus}</span>
              <span className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)' }}>{f.closedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
