'use client'
import type { NewsPayload } from '@/types'

interface Props {
  data: NewsPayload
  loading: boolean
}

const SL = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
    <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--body-muted)', whiteSpace: 'nowrap' }}>{label}</span>
    <div style={{ flex: 1, height: 1, background: 'var(--body-border)' }} />
  </div>
)

const DOT_COLORS: Record<string, string> = { dg: '#4ade80', dy: '#facc15', dr: '#f87171', db: '#60a5fa' }

export default function NewsSection({ data, loading }: Props) {
  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56px 24px', gap: 14 }}>
      <div style={{ width: 20, height: 20, border: '2px solid #ccc8c0', borderTopColor: '#1a4fa0', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <div className="font-mono" style={{ fontSize: 11, color: 'var(--body-muted)', letterSpacing: '0.08em' }}>Scanning sources...</div>
    </div>
  )

  const { hero, secondary, cards, feed, signals, source } = data

  return (
    <div>
      {source === 'fallback' && (
        <div style={{ background: '#fef9ec', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#92400e', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>&#9432;</span> Showing curated stories — add ANTHROPIC_API_KEY to .env.local for live AI generation
        </div>
      )}

      <SL label="Top story" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 28, background: 'var(--body-border)', gap: 1 }}>
        <div style={{ background: 'var(--body-surface)', padding: '28px 28px 22px', cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#fdfbf8')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--body-surface)')}>
          <span className={`tag ${hero.tag}`}>{hero.cat}</span>
          <h2 className="font-serif" style={{ fontSize: 28, lineHeight: 1.2, color: 'var(--body-text)', margin: '10px 0 8px', letterSpacing: '-0.4px' }}>{hero.hed}</h2>
          <p style={{ fontSize: 13, color: 'var(--body-secondary)', lineHeight: 1.65, marginBottom: 16 }}>{hero.dek}</p>
          {hero.amount && <div className="font-mono" style={{ fontSize: 20, fontWeight: 500, color: '#1a4fa0', margin: '6px 0 14px' }}>{hero.amount}</div>}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--body-border)' }}>
            <span className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{hero.src}</span>
            <span style={{ fontSize: 11, color: 'var(--body-muted)' }}>{hero.time}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', marginLeft: 'auto', animation: 'blink 1.5s ease-in-out infinite', display: 'inline-block' }} />
          </div>
        </div>
        <div style={{ background: 'var(--body-surface)', display: 'flex', flexDirection: 'column' }}>
          {secondary.map((s, i) => (
            <div key={s.id} style={{ background: 'var(--body-surface)', padding: '18px 20px', borderTop: i === 0 ? 'none' : '1px solid var(--body-border)', flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 7 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fdfbf8')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--body-surface)')}>
              <span className={`tag ${s.tag}`}>{s.cat}</span>
              <div className="font-serif" style={{ fontSize: 15, lineHeight: 1.3, color: 'var(--body-text)' }}>{s.hed}</div>
              <div style={{ fontSize: 12, color: 'var(--body-secondary)', lineHeight: 1.55 }}>{s.dek}</div>
              {s.amount && <div className="font-mono" style={{ fontSize: 13, color: '#1a4fa0', fontWeight: 500 }}>{s.amount}</div>}
              <div style={{ fontSize: 11, color: 'var(--body-muted)' }}>{s.time}</div>
            </div>
          ))}
        </div>
      </div>

      <SL label="Latest rounds" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden', background: 'var(--body-border)', gap: 1, marginBottom: 28 }}>
        {cards.map(c => (
          <div key={c.id} style={{ background: 'var(--body-surface)', padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8 }}
            onMouseEnter={e => (e.currentTarget.style.background = '#fdfbf8')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--body-surface)')}>
            <span className={`tag ${c.tag}`}>{c.cat}</span>
            <div className="font-serif" style={{ fontSize: 16, lineHeight: 1.3, color: 'var(--body-text)' }}>{c.hed}</div>
            <p style={{ fontSize: 12, color: 'var(--body-secondary)', lineHeight: 1.6, flex: 1 }}>{c.body}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--body-border)' }}>
              {c.amount ? <span className="font-mono" style={{ fontSize: 13, color: '#1a4fa0', fontWeight: 500 }}>{c.amount}</span> : <span />}
              <span className="font-mono" style={{ fontSize: 11, color: 'var(--body-muted)' }}>{c.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <div>
          <SL label="Deal feed" />
          <div style={{ border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden' }}>
            {feed.map((f, i) => (
              <div key={f.id} style={{ background: 'var(--body-surface)', padding: '14px 18px', borderTop: i === 0 ? 'none' : '1px solid var(--body-border)', display: 'flex', gap: 14, cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fdfbf8')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--body-surface)')}>
                <span className="font-mono" style={{ fontSize: 11, color: 'var(--body-muted)', flexShrink: 0, paddingTop: 2, minWidth: 18 }}>0{i+1}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--body-text)', lineHeight: 1.4, marginBottom: 5 }}>{f.hed}</div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--body-muted)', alignItems: 'center' }}>
                    <span className={`tag ${f.tag}`} style={{ padding: '1px 6px', fontSize: 9 }}>{f.cat}</span>
                    <span>{f.src}</span>
                    <span>{f.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SL label="Signals" />
          <div style={{ border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: 'var(--body-surface2)', padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--body-muted)', borderBottom: '1px solid var(--body-border)' }}>Market intelligence</div>
            {signals.map((s, i) => (
              <div key={i} style={{ background: 'var(--body-surface)', padding: '11px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--body-border)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: DOT_COLORS[s.dot], flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 12, color: 'var(--body-secondary)', lineHeight: 1.5 }}>{s.text}</div>
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)', marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ border: '1px solid var(--body-border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: 'var(--body-surface2)', padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--body-muted)', borderBottom: '1px solid var(--body-border)' }}>Top investors this week</div>
            {[['Andreessen Horowitz', '4 deals · $1.2B deployed'], ['Sequoia Capital', '3 deals · $890M deployed'], ['General Catalyst', '5 deals · $650M deployed']].map(([name, sub], i) => (
              <div key={i} style={{ background: 'var(--body-surface)', padding: '11px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--body-border)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 12, color: 'var(--body-secondary)' }}>{name}</div>
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--body-muted)', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
