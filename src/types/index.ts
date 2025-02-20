import { Prisma } from '@prisma/client'

export type SafeUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: string
  updatedAt: string
}

export type SafeEvent = {
  id: string
  title: string
  description: string
  location: string
  date: string
  image: string | null
  price: number
  capacity: number
  status: string
  isVirtual: boolean
  isFree: boolean
  virtualLink: string | null
  createdAt: string
  updatedAt: string
  categoryId: string
  category: { name: string }
  creator: SafeUser
}

export type ContactFormData = Prisma.ContactCreateInput
export type FavoriteData = Prisma.FavoriteCreateInput
