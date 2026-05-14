import { NextResponse } from 'next/server'
import { FALLBACK_FUNDS } from '@/lib/fallback'

export async function GET() {
  // In production: swap for Crunchbase API or scraped fund data
  return NextResponse.json(FALLBACK_FUNDS)
}
