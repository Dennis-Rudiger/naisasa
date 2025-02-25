import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getPlaceholderImage } from '@/utils/imageUtils'

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get('q')
    const categoryId = url.searchParams.get('category')
    const limit = parseInt(url.searchParams.get('limit') || '100')
    
    // Build filter conditions
    let whereClause: any = {
      status: 'ACTIVE',
    }
    
    if (searchQuery) {
      whereClause.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { location: { contains: searchQuery, mode: 'insensitive' } },
      ]
    }
    
    if (categoryId) {
      whereClause.categoryId = categoryId
    }
    
    // Fetch events
    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { date: 'asc' },
      take: limit,
      include: {
        category: true,
        creator: {
          select: { name: true, image: true }
        },
      },
    })
    
    // Transform the events data
    const transformedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      image: event.image || getPlaceholderImage(event.category.name), // Add placeholder if no image
      price: event.price.toString(),
      isFree: event.isFree,
      isVirtual: event.isVirtual,
      capacity: event.capacity,
      category: event.category.name,
      categoryId: event.categoryId,
      creator: {
        name: event.creator.name,
        image: event.creator.image
      },
      status: event.status,
    }))
    
    return NextResponse.json(transformedEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
