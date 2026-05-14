import Parser from 'rss-parser'
import type { NewsStory } from '@/types'
import { formatDistanceToNow } from 'date-fns'

const parser = new Parser({ timeout: 5000 })

// Curated RSS feeds for VC / tech news
const RSS_FEEDS = [
  { url: 'https://techcrunch.com/feed/', src: 'TECHCRUNCH' },
  { url: 'https://feeds.bloomberg.com/technology/news.rss', src: 'BLOOMBERG' },
  { url: 'https://www.axios.com/feeds/feed.rss', src: 'AXIOS' },
]

const VC_KEYWORDS = ['raises', 'funding', 'million', 'billion', 'series', 'venture', 'valuation', 'unicorn', 'acquisition', 'acquires', 'merger', 'IPO', 'round']

function categorise(title: string) {
  const t = title.toLowerCase()
  if (t.includes('acqui') || t.includes('merger') || t.includes('buys')) return { cat: 'M&A' as const, tag: 'tag-ma' as const }
  if (t.includes(' ai ') || t.includes('artificial intelligence') || t.includes('llm') || t.includes('model')) return { cat: 'AI' as const, tag: 'tag-ai' as const }
  if (t.includes('ipo') || t.includes('market') || t.includes('nasdaq') || t.includes('stock')) return { cat: 'Markets' as const, tag: 'tag-ma' as const }
  if (t.includes('fund') || t.includes('close') || t.includes('vehicle')) return { cat: 'VC' as const, tag: 'tag-vc' as const }
  return { cat: 'Funding' as const, tag: 'tag-fund' as const }
}

function extractAmount(title: string): string | undefined {
  const m = title.match(/\$[\d.]+\s*[BMK](?:illion)?/i)
  return m?.[0]
}

export async function fetchRssStories(): Promise<NewsStory[]> {
  const stories: NewsStory[] = []

  await Promise.allSettled(
    RSS_FEEDS.map(async ({ url, src }) => {
      try {
        const feed = await parser.parseURL(url)
        const items = feed.items.slice(0, 20)
        for (const item of items) {
          const title = item.title || ''
          const isRelevant = VC_KEYWORDS.some(kw => title.toLowerCase().includes(kw))
          if (!isRelevant) continue
          const { cat, tag } = categorise(title)
          const pubDate = item.pubDate ? new Date(item.pubDate) : new Date()
          stories.push({
            id: item.guid || item.link || Math.random().toString(36),
            cat,
            tag,
            hed: title,
            dek: item.contentSnippet?.slice(0, 200),
            amount: extractAmount(title),
            src,
            time: formatDistanceToNow(pubDate, { addSuffix: true }),
            url: item.link,
            publishedAt: pubDate.toISOString(),
          })
        }
      } catch {
        // Feed unavailable — skip silently
      }
    })
  )

  // Sort newest first
  return stories.sort((a, b) =>
    new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  )
}
