import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://naisasa.com'

  // Get all events
  const events = await prisma.event.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true, updatedAt: true }
  })

  // Get all categories
  const categories = await prisma.category.findMany({
    select: { name: true, updatedAt: true }
  })

  // Static routes
  const routes = [
    '',
    '/events',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Event routes
  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: event.updatedAt.toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/events/category/${category.name.toLowerCase()}`,
    lastModified: category.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...eventRoutes, ...categoryRoutes]
}
