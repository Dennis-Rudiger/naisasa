import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import type { User } from '@prisma/client'

export async function verifyCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !await bcrypt.compare(password, user.password)) {
    return null
  }

  return user
}

export async function createUser(data: {
  email: string
  password: string
  name: string
}) {
  const hashedPassword = await bcrypt.hash(data.password, 12)
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    }
  })
}
