const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // First clean up any existing data
  await prisma.contact.deleteMany()
  
  // Create some test contacts
  await prisma.contact.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        subject: 'Event Inquiry',
        message: 'I would like to know more about hosting events.',
        status: 'PENDING'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Feedback',
        message: 'Great platform! Looking forward to more events.',
        status: 'RESOLVED'
      }
    ]
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
