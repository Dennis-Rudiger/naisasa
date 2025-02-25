import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// Validate favorite toggle request
const favoriteSchema = z.object({
  eventId: z.string().min(1, "Event ID is required")
})

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get favorites with full event details
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        event: {
          include: {
            category: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform the data to match the Event type
    const formattedEvents = favorites.map(favorite => ({
      id: favorite.event.id,
      title: favorite.event.title,
      description: favorite.event.description,
      location: favorite.event.location,
      date: favorite.event.date.toISOString(),
      image: favorite.event.image || '',
      price: favorite.event.price.toString(),
      isFree: favorite.event.isFree,
      isVirtual: favorite.event.isVirtual,
      category: favorite.event.category.name,
      status: favorite.event.status,
      favoriteId: favorite.id
    }))

    return NextResponse.json(formattedEvents)
  } catch (error) {
    console.error('Get favorites error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { eventId } = favoriteSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Check if the favorite already exists
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        eventId: eventId
      }
    })

    if (existingFavorite) {
      // Delete if already favorited
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      })
      
      return NextResponse.json({
        isFavorited: false,
        message: 'Event removed from favorites'
      })
    } else {
      // Create new favorite
      await prisma.favorite.create({
        data: {
          userId: user.id,
          eventId: eventId
        }
      })
      
      return NextResponse.json({
        isFavorited: true,
        message: 'Event added to favorites'
      })
    }
  } catch (error) {
    console.error('Toggle favorite error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update favorite' },
      { status: 500 }
    )
  }
}
