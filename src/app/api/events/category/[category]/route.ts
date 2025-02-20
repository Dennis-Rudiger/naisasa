import { NextResponse } from 'next/server'
import { getEventsByCategory } from '@/lib/api/events'

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const events = await getEventsByCategory(params.category)
    return NextResponse.json(events)
  } catch (error) {
    console.error('Category events error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
