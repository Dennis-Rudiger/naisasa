import prisma from '@/lib/prisma'

export async function getEventsByCategory(category: string) {
  try {
    const events = await prisma.event.findMany({
      where: {
        category: {
          name: {
            equals: category,
            mode: 'insensitive'
          }
        },
        status: 'ACTIVE'
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}
