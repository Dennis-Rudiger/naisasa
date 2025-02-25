import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getPlaceholderImage } from '@/utils/imageUtils'

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        creator: {
          select: { 
            id: true,
            name: true, 
            image: true 
          }
        }
      }
    })
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    // Transform the data and ensure we have an image
    const transformedEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      image: event.image || getPlaceholderImage(event.category.name),
      price: event.price.toString(),
      isFree: event.isFree,
      isVirtual: event.isVirtual,
      capacity: event.capacity,
      category: event.category.name,
      categoryId: event.categoryId,
      creator: {
        id: event.creator.id,
        name: event.creator.name,
        image: event.creator.image
      },
      status: event.status,
    }
    
    return NextResponse.json(transformedEvent)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}
