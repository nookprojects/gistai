import { NextRequest, NextResponse } from 'next/server'
import { FALLBACK_DEALS } from '@/lib/fallback'

export async function GET(req: NextRequest) {
  const sector = req.nextUrl.searchParams.get('sector')
  const sort = req.nextUrl.searchParams.get('sort') || 'date'

  let deals = [...FALLBACK_DEALS]

  if (sector && sector !== 'all') {
    deals = deals.filter(d => d.sector.toLowerCase().includes(sector.toLowerCase()))
  }

  if (sort === 'amount') {
    deals.sort((a, b) => {
      const parse = (s: string) => parseFloat(s.replace(/[^0-9.]/g, '')) * (s.includes('B') ? 1000 : 1)
      return parse(b.amount) - parse(a.amount)
    })
  }

  return NextResponse.json(deals)
}
