import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Extract the callback data
    const {
      Body: {
        stkCallback: {
          MerchantRequestID,
          CheckoutRequestID,
          ResultCode,
          ResultDesc,
          CallbackMetadata,
        },
      },
    } = body

    // Find the payment record
    const payment = await prisma.payment.findFirst({
      where: {
        referenceId: CheckoutRequestID,
      },
    })

    if (!payment) {
      throw new Error('Payment record not found')
    }

    if (ResultCode === 0) {
      // Payment successful
      const amount = CallbackMetadata.Item.find((item: any) => item.Name === 'Amount')?.Value
      const mpesaReceiptNumber = CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value
      const transactionDate = CallbackMetadata.Item.find((item: any) => item.Name === 'TransactionDate')?.Value

      // Update payment record
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          referenceId: mpesaReceiptNumber,
        },
      })

      // Update associated tickets
      await prisma.ticket.updateMany({
        where: { paymentId: payment.id },
        data: { status: 'CONFIRMED' },
      })
    } else {
      // Payment failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          referenceId: CheckoutRequestID,
        },
      })

      // Update associated tickets
      await prisma.ticket.updateMany({
        where: { paymentId: payment.id },
        data: { status: 'CANCELLED' },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('MPesa callback error:', error)
    return NextResponse.json(
      { error: 'Callback processing failed' },
      { status: 500 }
    )
  }
}
