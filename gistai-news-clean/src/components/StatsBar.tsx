import type { StatsBar } from '@/types'

interface Props { stats: StatsBar }

export default function StatsBar({ stats }: Props) {
  const cells = [
    { label: 'VC raised this week', val: stats.vcWeek, delta: stats.vcWeekDelta, up: true },
    { label: 'AI deals (Q1 2026)', val: stats.aiDeals, delta: stats.aiDealsDelta, up: true },
    { label: 'Largest round', val: stats.largestRound, delta: stats.largestCo, up: null },
    { label: 'M&A activity', val: `${stats.maDeals} deals`, delta: stats.maDelta, up: false },
    { label: 'New unicorns (2026)', val: String(stats.unicorns), delta: stats.unicornDelta, up: true },
  ]
  return (
    <div style={{ background: 'var(--hdr-bg)', borderBottom: '1px solid var(--hdr-border)', display: 'flex', padding: '0 28px', overflowX: 'auto' }}>
      {cells.map((c, i) => (
        <div key={i} style={{ padding: '12px 24px 12px 0', marginRight: 24, borderRight: i < cells.length - 1 ? '1px solid var(--hdr-border)' : 'none', flexShrink: 0 }}>
          <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 3 }}>{c.label}</div>
          <div className="font-serif" style={{ fontSize: 18, color: '#f0ede8', letterSpacing: '-0.3px' }}>{c.val}</div>
          <div className="font-mono" style={{ fontSize: 10, marginTop: 2, color: c.up === true ? '#4ade80' : c.up === false ? '#f87171' : '#555' }}>{c.delta}</div>
        </div>
      ))}
    </div>
  )
}
