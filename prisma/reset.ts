const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Drop all tables
    await prisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE;`
    await prisma.$executeRaw`CREATE SCHEMA public;`
    console.log('Database reset successful')
  } catch (error) {
    console.error('Error resetting database:', error)
    throw error
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
