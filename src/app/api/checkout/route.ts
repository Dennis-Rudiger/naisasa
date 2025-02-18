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
  paymentMethod: z.enum(['mpesa', 'card', 'paypal']),
  phone: z.string().optional(),
  total: z.number().positive(),
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
    const validatedData = checkoutSchema.parse(body)
    let paymentRecord

    // Create payment record
    try {
      paymentRecord = await prisma.payment.create({
        data: {
          amount: validatedData.total,
          provider: validatedData.paymentMethod,
          status: 'PENDING',
        }
      })
    } catch (error) {
      console.error('Payment record creation failed:', error)
      throw new Error('Failed to initialize payment')
    }

    // Handle different payment methods
    switch (validatedData.paymentMethod) {
      case 'mpesa':
        if (!validatedData.phone) {
          throw new Error('Phone number required for M-Pesa payment')
        }
        
        const mpesaResponse = await mpesa.stkPush({
          amount: validatedData.total,
          phone: validatedData.phone,
          reference: paymentRecord.id
        })

        if (!mpesaResponse.success) {
          throw new Error('M-Pesa payment failed')
        }
        break

      case 'card':
        // Implement card payment logic
        throw new Error('Card payment not implemented yet')

      case 'paypal':
        // Implement PayPal payment logic
        throw new Error('PayPal payment not implemented yet')

      default:
        throw new Error('Invalid payment method')
    }

    // Create tickets
    const tickets = await prisma.ticket.createMany({
      data: validatedData.cartItems.map(item => ({
        eventId: item.id,
        userId: session.user.id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        status: 'PENDING',
        paymentId: paymentRecord.id
      }))
    })

    // Update payment record with ticket information
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: validatedData.paymentMethod === 'mpesa' ? 'PENDING' : 'COMPLETED'
      }
    })

    return NextResponse.json({
      success: true,
      paymentId: paymentRecord.id,
      tickets
    })

  } catch (error) {
    console.error('Checkout error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment processing failed' },
      { status: 500 }
    )
  }
}
