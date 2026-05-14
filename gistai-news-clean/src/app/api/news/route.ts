import { NextRequest, NextResponse } from 'next/server'
import { generateNewsWithAI } from '@/lib/ai'
import { fetchRssStories } from '@/lib/rss'
import { FALLBACK_NEWS } from '@/lib/fallback'

// Simple in-memory cache — revalidates every 15 minutes
const cache = new Map<string, { data: unknown; ts: number }>()
const CACHE_TTL = 15 * 60 * 1000

export async function GET(req: NextRequest) {
  const filter = req.nextUrl.searchParams.get('filter') || 'all'
  const cacheKey = `news-${filter}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data)
  }

  try {
    // 1. Try to fetch real RSS stories to ground the AI
    const rssStories = await fetchRssStories().catch(() => [])

    // 2. Generate AI-curated news payload (grounded by RSS context)
    const payload = await generateNewsWithAI(filter, rssStories)

    cache.set(cacheKey, { data: payload, ts: Date.now() })
    return NextResponse.json(payload)
  } catch (err) {
    console.error('[/api/news] Error:', err)
    // Return fallback — never show a broken page
    return NextResponse.json({ ...FALLBACK_NEWS, source: 'fallback' })
  }
}
