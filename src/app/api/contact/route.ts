import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import type { Contact, Prisma } from '@prisma/client'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    // Try using direct prisma call without transaction
    const message = await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone ?? null, // Use nullish coalescing
        subject: validatedData.subject,
        message: validatedData.message,
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      contactId: message.id
    })

  } catch (error) {
    // Add more detailed error logging
    console.error('Contact form error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    // Return more specific error message
    return NextResponse.json(
      { 
        error: 'Failed to send message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
