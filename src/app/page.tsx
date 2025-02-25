'use client'

import dynamic from 'next/dynamic'
import { Suspense, lazy } from 'react'
import { useImagePreload } from '@/hooks/useImagePreload'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ArrowRightIcon,
  ComputerDesktopIcon,
  GiftIcon 
} from '@heroicons/react/24/outline'
import { getVirtualEvents, getFreeEvents, getTrendingEvents } from '@/data/events'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { getPlaceholderImage } from '@/utils/imageUtils'

// Lazy load components
const EventCard = lazy(() => import('@/components/EventCard/Card'))

const heroImages = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg'
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)

  // Preload hero images
  useImagePreload(heroImages)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Replace the hardcoded event data with imported data
  const virtualEvents = getVirtualEvents()
  const freeEvents = getFreeEvents()
  const trendingEvents = getTrendingEvents()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/80" />
        <div className="absolute inset-0">
          <Image
            src={heroImages[currentHeroIndex]}
            alt="Events background"
            fill
            className="object-cover transition-opacity duration-1000"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 animate-fade-down">
              Discover Amazing Events in Your Area
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-secondary/90 animate-fade-up">
              Find and book tickets for concerts, workshops, sports events and more
            </p>

            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 md:p-3">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn-accent !p-2 md:!p-3">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Suspense fallback={<CategorySkeleton />}>
        <section className="py-8 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 md:mb-8">
              Browse Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/events/${category.name.toLowerCase()}`} // Update href to match the folder structure
                  className="group transform transition-all duration-300 hover:scale-105"
                >
                  <div className="card overflow-hidden">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={category.icon}
                        alt={category.name}
                        category={category.name.toLowerCase()}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center justify-center">
                      <span className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                        {category.count} Events
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Suspense>

      {/* Virtual Events Section */}
      <Suspense fallback={<EventsSkeleton />}>
        <section className="py-8 md:py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  Virtual Events
                </h2>
              </div>
              <Link 
                href="/events/virtual" 
                className="btn-primary bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
              >
                View All Virtual Events <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {virtualEvents.map((event) => (
                <Suspense key={event.id} fallback={<EventCardSkeleton />}>
                  <EventCard event={event} />
                </Suspense>
              ))}
            </div>
          </div>
        </section>
      </Suspense>

      {/* Free Events Section */}
      <Suspense fallback={<EventsSkeleton />}>
        <section className="py-8 md:py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <GiftIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  Free Events
                </h2>
              </div>
              <Link 
                href="/events/free" 
                className="btn-primary bg-green-600 hover:bg-green-700 text-sm md:text-base"
              >
                View All Free Events <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {freeEvents.map((event) => (
                <Suspense key={event.id} fallback={<EventCardSkeleton />}>
                  <EventCard event={event} />
                </Suspense>
              ))}
            </div>
          </div>
        </section>
      </Suspense>

      {/* Trending Events */}
      <Suspense fallback={<EventsSkeleton />}>
        <section className="py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 sm:mb-0">
                Trending Events
              </h2>
              <Link href="/events" className="btn-primary text-sm md:text-base">
                View All <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {trendingEvents.map((event) => (
                <Suspense key={event.id} fallback={<EventCardSkeleton />}>
                  <EventCard event={event} />
                </Suspense>
              ))}
            </div>
          </div>
        </section>
      </Suspense>
    </div>
  )
}

// Skeleton components
const EventCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-200 w-3/4 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
  </div>
)

const CategorySkeleton = () => (
  <div className="py-8 md:py-16 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 w-48 rounded mb-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 w-3/4 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 w-1/3 rounded mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const EventsSkeleton = () => (
  <div className="py-8 md:py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-gray-200 w-48 rounded"></div>
        <div className="h-10 bg-gray-200 w-32 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(3)].map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
)

// ... other skeleton components

const categories = [
  { 
    name: 'Music', 
    icon: '/images/categories/music.jpg', 
    count: 42 
  },
  { 
    name: 'Sports', 
    icon: '/images/categories/sports.jpg', 
    count: 28 
  },
  { 
    name: 'Arts', 
    icon: '/images/categories/arts.jpg', 
    count: 35 
  },
  { 
    name: 'Food', 
    icon: '/images/categories/food.jpg', 
    count: 21 
  },
]
