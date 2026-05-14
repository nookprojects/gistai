export type NewsCategory = 'VC' | 'AI' | 'M&A' | 'Funding' | 'Markets'
export type TagClass = 'tag-vc' | 'tag-ai' | 'tag-ma' | 'tag-fund' | 'tag-break'
export type DotColor = 'dg' | 'dy' | 'dr' | 'db'

export interface NewsStory {
  id: string
  cat: NewsCategory
  tag: TagClass
  hed: string
  dek?: string
  body?: string
  amount?: string
  src: string
  time: string
  url?: string
  publishedAt?: string
}

export interface Signal {
  dot: DotColor
  text: string
  label: string
}

export interface NewsPayload {
  hero: NewsStory
  secondary: NewsStory[]
  cards: NewsStory[]
  feed: NewsStory[]
  signals: Signal[]
  source: 'live' | 'ai' | 'fallback'
  generatedAt: string
}

export interface FundEntry {
  id: string
  firm: string
  fundName: string
  size: string
  focus: string
  closedAt: string
  stage: string
  geo: string
}

export interface Deal {
  id: string
  company: string
  round: string
  amount: string
  investors: string[]
  sector: string
  geo: string
  date: string
  valuation?: string
  url?: string
}

export interface StatsBar {
  vcWeek: string
  vcWeekDelta: string
  aiDeals: string
  aiDealsDelta: string
  largestRound: string
  largestCo: string
  maDeals: number
  maDelta: string
  unicorns: number
  unicornDelta: string
}
