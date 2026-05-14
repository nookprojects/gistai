import Anthropic from '@anthropic-ai/sdk'
import type { NewsPayload, NewsStory } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const FILTER_PROMPTS: Record<string, string> = {
  all: 'Cover VC fundraising, AI startup news, M&A deals, and tech market trends.',
  vc: 'Focus exclusively on venture capital fundraising rounds, fund closes, and investor activity.',
  ai: 'Focus exclusively on AI company news, model releases, and AI startup funding.',
  ma: 'Focus on mergers, acquisitions, and strategic tech deals.',
  markets: 'Focus on public market trends, IPOs, and tech financial performance.',
}

export async function generateNewsWithAI(
  filter: string = 'all',
  rssContext: NewsStory[] = []
): Promise<NewsPayload> {
  const focus = FILTER_PROMPTS[filter] || FILTER_PROMPTS.all

  const rssSnippet = rssContext.length > 0
    ? `\n\nHere are some real headlines from RSS feeds to inspire realistic stories (use as context, not verbatim):\n${rssContext.slice(0, 8).map(s => `- ${s.hed} (${s.src})`).join('\n')}`
    : ''

  const prompt = `You are a senior editor at GistAI News, a premium VC and tech news publication. Generate realistic, plausible news items as of May 2026. ${focus}${rssSnippet}

Return ONLY valid JSON — no markdown fences, no extra text. Exact shape:
{"hero":{"id":"h1","cat":"VC","tag":"tag-vc","hed":"...","dek":"2-3 sentence summary.","amount":"$XB","src":"SOURCE","time":"X hours ago"},"secondary":[{"id":"s1","cat":"AI","tag":"tag-ai","hed":"...","dek":"1-2 sentences.","amount":"$XM","src":"SOURCE","time":"Xh ago"},{"id":"s2","cat":"M&A","tag":"tag-ma","hed":"...","dek":"1-2 sentences.","src":"SOURCE","time":"Xh ago"},{"id":"s3","cat":"Funding","tag":"tag-fund","hed":"...","dek":"1-2 sentences.","amount":"$XM","src":"SOURCE","time":"Xh ago"}],"cards":[{"id":"c1","cat":"VC","tag":"tag-vc","hed":"...","body":"2 sentences.","amount":"$XM","src":"SOURCE","time":"Xh ago"},{"id":"c2","cat":"AI","tag":"tag-ai","hed":"...","body":"2 sentences.","src":"SOURCE","time":"Xh ago"},{"id":"c3","cat":"Markets","tag":"tag-ma","hed":"...","body":"2 sentences.","src":"SOURCE","time":"Xh ago"}],"feed":[{"id":"f1","cat":"VC","tag":"tag-vc","hed":"...","src":"SOURCE","time":"Xh ago"},{"id":"f2","cat":"AI","tag":"tag-ai","hed":"...","src":"SOURCE","time":"Xh ago"},{"id":"f3","cat":"Funding","tag":"tag-fund","hed":"...","src":"SOURCE","time":"Xh ago"},{"id":"f4","cat":"M&A","tag":"tag-ma","hed":"...","src":"SOURCE","time":"Xh ago"},{"id":"f5","cat":"Markets","tag":"tag-ma","hed":"...","src":"SOURCE","time":"Xh ago"},{"id":"f6","cat":"VC","tag":"tag-vc","hed":"...","src":"SOURCE","time":"Xh ago"}],"signals":[{"dot":"dg","text":"...","label":"Trend"},{"dot":"dy","text":"...","label":"Watch"},{"dot":"dr","text":"...","label":"Risk"},{"dot":"db","text":"...","label":"Emerging"}]}`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = (message.content[0] as { text: string }).text
    .trim()
    .replace(/```json|```/g, '')
    .trim()

  const parsed = JSON.parse(raw)
  return {
    ...parsed,
    source: 'ai',
    generatedAt: new Date().toISOString(),
  } as NewsPayload
}
