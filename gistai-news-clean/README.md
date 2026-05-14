# GistAI News

AI-powered VC, funding & tech news site. Built with Next.js 14, Anthropic Claude, and RSS feeds.

## Features

- **Live news feed** — AI-generated stories grounded by real RSS feeds (TechCrunch, Bloomberg, Axios)
- **Deals database** — filterable, sortable table of recent funding rounds
- **Fund tracker** — VC fund closes with capital stats
- **Market signals** — AI-curated intelligence on VC trends
- **15-min cache** — server-side caching to avoid API overuse

## Quick start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your API key**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add: ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Run locally**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import the repo at vercel.com/new
3. Add environment variable: `ANTHROPIC_API_KEY` = your key
4. Deploy — done

## Add real deal data (optional)

To replace the seed data with live Crunchbase data:
1. Get a Crunchbase Basic API key at crunchbase.com/api
2. Add `CRUNCHBASE_API_KEY=...` to .env.local
3. Update `src/app/api/deals/route.ts` to call `https://api.crunchbase.com/api/v4/searches/funding_rounds`

## Project structure

```
src/
  app/
    api/
      news/route.ts      ← AI news generation + RSS grounding
      deals/route.ts     ← Deals database API
      funds/route.ts     ← Fund tracker API
    page.tsx             ← Main page (client)
    layout.tsx
    globals.css
  components/
    Header.tsx           ← Nav + filter tabs + section switcher
    Ticker.tsx           ← Live ticker bar
    StatsBar.tsx         ← Dark stats strip
    NewsSection.tsx      ← Hero + cards + feed + signals
    DealsDB.tsx          ← Filterable deals table
    FundTracker.tsx      ← Fund cards grid
  lib/
    ai.ts                ← Anthropic SDK call
    rss.ts               ← RSS feed fetcher + categoriser
    fallback.ts          ← Seed data for cold starts
  types/index.ts
```
