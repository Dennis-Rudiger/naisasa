import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasourceUrl: process.env.DATABASE_URL,
  // Connection pooling should be configured in the DATABASE_URL
  // Example: postgresql://user:password@localhost:5432/mydb?connection_limit=20
  // https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-pool
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
