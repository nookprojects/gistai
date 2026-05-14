import type { NewsPayload, FundEntry, Deal, StatsBar } from '@/types'

export const FALLBACK_STATS: StatsBar = {
  vcWeek: '$18.4B',
  vcWeekDelta: '↑ 12%',
  aiDeals: '1,247',
  aiDealsDelta: '↑ 34% YoY',
  largestRound: '$40B',
  largestCo: 'OpenAI — Series F',
  maDeals: 89,
  maDelta: '↓ 8%',
  unicorns: 23,
  unicornDelta: '↑ 5 this week',
}

export const FALLBACK_NEWS: NewsPayload = {
  source: 'fallback',
  generatedAt: new Date().toISOString(),
  hero: {
    id: 'h1',
    cat: 'VC',
    tag: 'tag-vc',
    hed: 'Andreessen Horowitz Closes Record $22B Fund VIII, Doubling Down on AI Infrastructure',
    dek: "The firm's largest fund to date will focus heavily on foundational AI infrastructure, compute, and next-generation model companies. Partners signalled a shift away from pure SaaS toward companies with defensible data moats and proprietary training pipelines.",
    amount: '$22B',
    src: 'THE INFORMATION',
    time: '2 hours ago',
  },
  secondary: [
    { id: 's1', cat: 'AI', tag: 'tag-ai', hed: 'Cohere Raises $500M Series E Led by Salesforce Ventures at $5.5B Valuation', dek: 'The enterprise-focused LLM provider secured fresh capital to expand its private cloud and on-premise deployment business.', amount: '$500M', src: 'BLOOMBERG', time: '4h ago' },
    { id: 's2', cat: 'M&A', tag: 'tag-ma', hed: 'Databricks Acquires MosaicML Rival Nemo in $1.2B All-Cash Deal', dek: 'The data intelligence platform continues its aggressive acquisition strategy, absorbing a key training optimisation startup.', src: 'WSJ', time: '5h ago' },
    { id: 's3', cat: 'Funding', tag: 'tag-fund', hed: 'Paris-Based Poolside Closes $400M Round to Build Code-Specific Foundation Model', dek: 'The coding AI startup backed by prominent European and US investors is racing to release its developer-first model by Q3.', amount: '$400M', src: 'TECHCRUNCH', time: '6h ago' },
  ],
  cards: [
    { id: 'c1', cat: 'VC', tag: 'tag-vc', hed: 'Accel and Lightspeed Co-Lead $180M Series B for AI Governance Platform Monitaur', body: 'The round values the San Francisco company at $1.4B, making it one of the fastest unicorns in the AI compliance space.', amount: '$180M', src: 'TECHCRUNCH', time: '3h ago' },
    { id: 'c2', cat: 'AI', tag: 'tag-ai', hed: 'Mistral Releases Le Chat Pro with Real-Time Web Grounding and 128k Context', body: "The French AI lab's flagship assistant now rivals GPT-4o on several key enterprise benchmarks, ahead of an anticipated IPO.", src: 'WIRED', time: '5h ago' },
    { id: 'c3', cat: 'Markets', tag: 'tag-ma', hed: 'Nasdaq Tech Index Hits All-Time High as AI Earnings Beat Expectations', body: 'Five of the seven largest tech companies reported better-than-expected AI revenue in Q1 2026, sending the index to a record close.', src: 'FT', time: '7h ago' },
  ],
  feed: [
    { id: 'f1', cat: 'VC', tag: 'tag-vc', hed: 'General Catalyst Leads $120M Round for Agentic Workflow Startup Merge AI', src: 'AXIOS', time: '1h ago' },
    { id: 'f2', cat: 'AI', tag: 'tag-ai', hed: 'xAI Launches Grok 3 API With Vision and Tool-Use Capabilities', src: 'TECHCRUNCH', time: '2h ago' },
    { id: 'f3', cat: 'Funding', tag: 'tag-fund', hed: 'African Fintech Moniepoint Raises $110M to Expand Across West Africa', src: 'BLOOMBERG', time: '3h ago' },
    { id: 'f4', cat: 'M&A', tag: 'tag-ma', hed: 'Salesforce in Advanced Talks to Acquire AI CRM Startup Dust for $900M', src: 'WSJ', time: '4h ago' },
    { id: 'f5', cat: 'Markets', tag: 'tag-ma', hed: 'SoftBank Vision Fund Returns to Profit After Three Consecutive Loss Quarters', src: 'FT', time: '5h ago' },
    { id: 'f6', cat: 'VC', tag: 'tag-vc', hed: 'Founders Fund Quietly Closes $4B New Vehicle Focused on Defence AI', src: 'THE INFORMATION', time: '6h ago' },
  ],
  signals: [
    { dot: 'dg', text: 'Enterprise AI procurement budgets up 41% YoY — infrastructure plays leading spend', label: 'Trend' },
    { dot: 'dy', text: 'Late-stage valuations compressing as LPs push back on 100x+ multiples', label: 'Watch' },
    { dot: 'dr', text: 'Regulatory scrutiny intensifying in EU and UK around foundation model compute thresholds', label: 'Risk' },
    { dot: 'db', text: 'Agentic workflow tooling emerging as the fastest-growing sub-category in AI tooling', label: 'Emerging' },
  ],
}

export const FALLBACK_FUNDS: FundEntry[] = [
  { id: 'fu1', firm: 'Andreessen Horowitz', fundName: 'Fund VIII', size: '$22B', focus: 'AI Infrastructure, Crypto', closedAt: 'May 2026', stage: 'Multi-stage', geo: 'Global' },
  { id: 'fu2', firm: 'Sequoia Capital', fundName: 'Global Growth IV', size: '$9B', focus: 'Growth-stage tech', closedAt: 'Apr 2026', stage: 'Growth', geo: 'Global' },
  { id: 'fu3', firm: 'General Catalyst', fundName: 'GC XIV', size: '$6B', focus: 'AI, Healthcare, Climate', closedAt: 'Mar 2026', stage: 'Multi-stage', geo: 'US, Europe' },
  { id: 'fu4', firm: 'Accel', fundName: 'Accel XV', size: '$3.6B', focus: 'Enterprise SaaS, AI', closedAt: 'Feb 2026', stage: 'Early-stage', geo: 'US, Europe, India' },
  { id: 'fu5', firm: 'Lightspeed', fundName: 'Select V', size: '$7B', focus: 'Consumer, Enterprise AI', closedAt: 'Jan 2026', stage: 'Multi-stage', geo: 'Global' },
  { id: 'fu6', firm: 'Founders Fund', fundName: 'FF IX', size: '$4B', focus: 'Deep Tech, Defence AI', closedAt: 'May 2026', stage: 'Multi-stage', geo: 'US' },
  { id: 'fu7', firm: 'Benchmark', fundName: 'Benchmark X', size: '$950M', focus: 'Early-stage consumer & SaaS', closedAt: 'Mar 2026', stage: 'Seed / Series A', geo: 'US' },
  { id: 'fu8', firm: 'Index Ventures', fundName: 'Growth VI', size: '$2.3B', focus: 'European tech, AI', closedAt: 'Apr 2026', stage: 'Growth', geo: 'Europe, US' },
]

export const FALLBACK_DEALS: Deal[] = [
  { id: 'd1', company: 'OpenAI', round: 'Series F', amount: '$40B', investors: ['SoftBank', 'Microsoft', 'Tiger Global'], sector: 'AI', geo: 'US', date: 'May 2026', valuation: '$340B' },
  { id: 'd2', company: 'Cohere', round: 'Series E', amount: '$500M', investors: ['Salesforce Ventures', 'NVIDIA', 'Oracle'], sector: 'AI', geo: 'US/Canada', date: 'May 2026', valuation: '$5.5B' },
  { id: 'd3', company: 'Poolside', round: 'Series B', amount: '$400M', investors: ['DST Global', 'Felicis', 'Redpoint'], sector: 'AI / Dev Tools', geo: 'France', date: 'Apr 2026', valuation: '$2.8B' },
  { id: 'd4', company: 'Merge AI', round: 'Series B', amount: '$120M', investors: ['General Catalyst', 'a16z', 'Spark Capital'], sector: 'AI / Workflow', geo: 'US', date: 'May 2026', valuation: '$900M' },
  { id: 'd5', company: 'Mistral AI', round: 'Series C', amount: '$600M', investors: ['General Atlantic', 'Salesforce', 'BNP Paribas'], sector: 'AI', geo: 'France', date: 'Mar 2026', valuation: '$6B' },
  { id: 'd6', company: 'Monitaur', round: 'Series B', amount: '$180M', investors: ['Accel', 'Lightspeed'], sector: 'AI Governance', geo: 'US', date: 'May 2026', valuation: '$1.4B' },
  { id: 'd7', company: 'Moniepoint', round: 'Series D', amount: '$110M', investors: ['QED Investors', 'Development Partners'], sector: 'Fintech', geo: 'Nigeria', date: 'Apr 2026' },
  { id: 'd8', company: 'Anduril Industries', round: 'Series F', amount: '$1.5B', investors: ['Founders Fund', 'Andreessen Horowitz'], sector: 'Defence Tech', geo: 'US', date: 'Mar 2026', valuation: '$28B' },
]
