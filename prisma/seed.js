const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Starting seed...')

    // Create admin user first
    const hashedPassword = await bcrypt.hash('admin123', 12)
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
      }
    })
    console.log('Created admin user')

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Music',
          icon: '/images/categories/music.jpg'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Sports',
          icon: '/images/categories/sports.jpg'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Arts',
          icon: '/images/categories/arts.jpg'
        }
      })
    ])
    console.log('Created categories')

    // Create sample events
    const events = await Promise.all([
      prisma.event.create({
        data: {
          title: 'Summer Music Festival',
          description: 'Annual summer music festival featuring local artists',
          location: 'Nairobi, Kenya',
          date: new Date('2024-07-15'),
          price: 2500.00,
          capacity: 1000,
          image: '/images/events/music-fest.jpg',
          categoryId: categories[0].id,
          creatorId: admin.id,
        }
      }),
      prisma.event.create({
        data: {
          title: 'Virtual Tech Conference',
          description: 'Online tech conference with industry leaders',
          location: 'Online',
          date: new Date('2024-08-20'),
          price: 1000.00,
          capacity: 500,
          image: '/images/events/tech-conf.jpg',
          isVirtual: true,
          virtualLink: 'https://meet.example.com/tech-conf',
          categoryId: categories[1].id,
          creatorId: admin.id,
        }
      }),
      prisma.event.create({
        data: {
          title: 'Community Art Workshop',
          description: 'Free art workshop for the community',
          location: 'Nairobi Art Gallery',
          date: new Date('2024-06-10'),
          price: 0.00,
          capacity: 50,
          image: '/images/events/art-workshop.jpg',
          isFree: true,
          categoryId: categories[2].id,
          creatorId: admin.id,
        }
      })
    ])
    console.log('Created events')

    // Add some sample favorites
    await prisma.favorite.create({
      data: {
        userId: admin.id,
        eventId: events[0].id,
      }
    })
    console.log('Created sample favorite')

    console.log('Seed completed successfully')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
