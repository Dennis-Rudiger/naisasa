import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const favoriteSchema = z.object({
  eventId: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { eventId } = favoriteSchema.parse(body)

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId,
        },
      },
    })

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Favorite removed',
      })
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        eventId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Favorite added',
      favorite,
    })

  } catch (error) {
    console.error('[FAVORITE_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        event: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json(favorites)

  } catch (error) {
    console.error('[FAVORITES_GET_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
