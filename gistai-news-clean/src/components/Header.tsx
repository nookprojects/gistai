'use client'
import { useState } from 'react'

const FILTERS = ['All', 'VC Raises', 'AI', 'M&A', 'Markets']
const FILTER_KEYS: Record<string, string> = { 'All': 'all', 'VC Raises': 'vc', 'AI': 'ai', 'M&A': 'ma', 'Markets': 'markets' }

interface Props {
  activeFilter: string
  onFilter: (f: string) => void
  onRefresh: () => void
  loading: boolean
  activeSection: string
  onSection: (s: string) => void
}

export default function Header({ activeFilter, onFilter, onRefresh, loading, activeSection, onSection }: Props) {
  return (
    <header style={{ background: 'var(--hdr-bg)', borderBottom: '1px solid var(--hdr-border)', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span className="font-serif" style={{ fontSize: 22, color: '#f0ede8', letterSpacing: '-0.4px' }}>GistAI</span>
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: 2 }}>News</span>
        <div style={{ display: 'flex', gap: 2, marginLeft: 16 }}>
          {['News', 'Deals DB', 'Fund Tracker'].map(s => (
            <button key={s} onClick={() => onSection(s)}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: activeSection === s ? '#f0ede8' : '#555', padding: '4px 10px', borderRadius: 4, border: 'none', background: activeSection === s ? 'rgba(255,255,255,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.15s' }}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <nav style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {activeSection === 'News' && FILTERS.map(f => (
          <button key={f} onClick={() => onFilter(FILTER_KEYS[f])}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, color: activeFilter === FILTER_KEYS[f] ? 'var(--accent-dark)' : '#666', padding: '5px 13px', borderRadius: 999, border: '1px solid transparent', background: activeFilter === FILTER_KEYS[f] ? 'var(--accent)' : 'none', cursor: 'pointer', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
        <button onClick={onRefresh} disabled={loading}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#666', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', marginLeft: 10, opacity: loading ? 0.4 : 1, transition: 'all 0.15s' }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: loading ? 'spin 0.7s linear infinite' : 'none' }}>
            <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5M13.5 2.5v4h-4"/>
          </svg>
          refresh
        </button>
      </nav>
    </header>
  )
}
