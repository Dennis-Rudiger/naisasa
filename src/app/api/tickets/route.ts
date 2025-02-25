import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const ticketSchema = z.object({
  eventId: z.string(),
  quantity: z.number().int().positive(),
  totalPrice: z.number().positive(),
  paymentDetails: z.object({
    provider: z.string(),
    referenceId: z.string().optional(),
  })
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const validatedData = ticketSchema.parse(body)
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        amount: validatedData.totalPrice,
        provider: validatedData.paymentDetails.provider,
        referenceId: validatedData.paymentDetails.referenceId,
        status: 'COMPLETED'
      }
    })

    // Create ticket
    const ticket = await prisma.ticket.create({
      data: {
        eventId: validatedData.eventId,
        userId: user.id,
        status: 'CONFIRMED',
        quantity: validatedData.quantity,
        totalPrice: validatedData.totalPrice,
        paymentId: payment.id
      },
      include: {
        event: true
      }
    })

    return NextResponse.json({
      success: true,
      ticket
    })
  } catch (error) {
    console.error('Ticket creation error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    )
  }
}

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

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: user.id,
      },
      include: {
        event: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Get tickets error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}
