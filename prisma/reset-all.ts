import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

async function resetAll() {
  console.log('🔄 Starting complete reset...')
  
  // 1. Delete node_modules/.prisma
  const prismaDir = path.join(__dirname, '..', 'node_modules', '.prisma')
  if (fs.existsSync(prismaDir)) {
    fs.rmSync(prismaDir, { recursive: true, force: true })
    console.log('✅ Cleared Prisma cache')
  }

  // 2. Delete migrations
  const migrationsDir = path.join(__dirname, 'migrations')
  if (fs.existsSync(migrationsDir)) {
    fs.rmSync(migrationsDir, { recursive: true, force: true })
    console.log('✅ Cleared migrations')
  }

  // 3. Reset database
  const prisma = new PrismaClient()
  try {
    await prisma.$executeRawUnsafe(`DROP SCHEMA public CASCADE;`)
    await prisma.$executeRawUnsafe(`CREATE SCHEMA public;`)
    console.log('✅ Reset database')
  } catch (error) {
    console.error('Failed to reset database:', error)
  } finally {
    await prisma.$disconnect()
  }

  // 4. Regenerate prisma client
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✅ Regenerated Prisma Client')

  console.log('✨ Reset complete! Now run:')
  console.log('1. npx prisma migrate dev')
}

resetAll().catch(console.error)
