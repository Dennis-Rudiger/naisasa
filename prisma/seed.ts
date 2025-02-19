import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('password123', 10),
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Music' },
      update: {},
      create: { name: 'Music', icon: '/images/categories/music.jpg' }
    }),
    prisma.category.upsert({
      where: { name: 'Sports' },
      update: {},
      create: { name: 'Sports', icon: '/images/categories/sports.jpg' }
    }),
    prisma.category.upsert({
      where: { name: 'Arts' },
      update: {},
      create: { name: 'Arts', icon: '/images/categories/arts.jpg' }
    }),
    prisma.category.upsert({
      where: { name: 'Food' },
      update: {},
      create: { name: 'Food', icon: '/images/categories/food.jpg' }
    }),
  ])

  // Create test contact message
  await prisma.contact.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test contact message',
      status: 'PENDING'
    }
  })

  console.log({ adminUser, categories })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
