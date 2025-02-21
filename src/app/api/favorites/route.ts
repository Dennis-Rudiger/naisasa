import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        favorites: true
      }
    })

    return NextResponse.json(user?.favorites || [])
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

    const { eventId } = await request.json()
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: session.user.email }
    })

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId
        }
      }
    })

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      })
      return NextResponse.json({ isFavorited: false })
    }

    await prisma.favorite.create({
      data: {
        userId: user.id,
        eventId
      }
    })

    return NextResponse.json({ isFavorited: true })
  } catch (error) {
    console.error('Toggle favorite error:', error)
    return NextResponse.json(
      { error: 'Failed to update favorite' },
      { status: 500 }
    )
  }
}
