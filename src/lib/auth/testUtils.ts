import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
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
