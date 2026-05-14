const ITEMS = [
  'OpenAI raises $40B at $340B valuation',
  'a16z closes $20B Fund VIII',
  'Mistral AI valued at $6B in Series C',
  'Sequoia leads $500M Databricks extension',
  'xAI hits $50B post-money after close',
  'Global VC up 23% YoY in Q1 2026',
  'General Catalyst backs $200M AI infra round',
  'Founders Fund closes $4B defence AI vehicle',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{ background: 'var(--accent)', height: 28, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div className="font-mono" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.5)', padding: '0 14px', background: 'rgba(0,0,0,0.1)', height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0, whiteSpace: 'nowrap' }}>
        LIVE
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 38s linear infinite' }}>
          {doubled.map((item, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 500, color: '#1a1a00', padding: '0 24px', borderRight: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 7, height: 28 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', flexShrink: 0, display: 'inline-block' }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
