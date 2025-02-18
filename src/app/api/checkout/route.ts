import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { mpesa } from '@/lib/mpesa'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const checkoutSchema = z.object({
  cartItems: z.array(z.object({
    id: z.string(),
    quantity: z.number().min(1),
    price: z.number().positive(),
  })),
  phone: z.string()
    .regex(/^254[17]\d{8}$/, 'Please enter a valid Safaricom number starting with 254'),
  total: z.number().positive(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = checkoutSchema.parse(body)

    // First, verify all events exist and are available
    const events = await prisma.event.findMany({
      where: {
        id: {
          in: validatedData.cartItems.map(item => item.id)
        },
        status: 'ACTIVE'
      }
    })

    if (events.length !== validatedData.cartItems.length) {
      return NextResponse.json(
        { error: 'One or more events are not available' },
        { status: 400 }
      )
    }

    // Create the payment first
    const payment = await prisma.payment.create({
      data: {
        amount: validatedData.total,
        provider: 'MPESA',
        status: 'PENDING',
        referenceId: null
      }
    })

    // Then create tickets with the payment ID
    await prisma.ticket.createMany({
      data: validatedData.cartItems.map(item => ({
        eventId: item.id,
        userId: session.user.id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        status: 'PENDING',
        paymentId: payment.id
      }))
    })

    // Initiate MPesa STK Push
    const mpesaResponse = await mpesa.stkPush({
      amount: validatedData.total,
      phone: validatedData.phone,
      reference: payment.id
    })

    if (!mpesaResponse.success) {
      // Update payment status to failed if STK push fails
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' }
      })
      throw new Error('MPesa payment initiation failed')
    }

    return NextResponse.json({
      success: true,
      checkoutRequestId: mpesaResponse.checkoutRequestId,
      paymentId: payment.id,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment failed' },
      { status: 500 }
    )
  }
}
