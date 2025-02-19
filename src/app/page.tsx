'use client'

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
import EventCard from '@/components/EventCard'

const heroImages = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg'
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

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
                    <Image
                      src={category.icon}
                      alt={category.name}
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

      {/* Virtual Events Section */}
      <section className="py-8 md:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl md:text-3xl font-display font-bold">
                Virtual Events
              </h2>
            </div>
            <Link href="/events/virtual" className="btn-primary bg-blue-600 hover:bg-blue-700 text-sm md:text-base">
              View All Virtual Events <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {virtualEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Events Section */}
      <section className="py-8 md:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <GiftIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl md:text-3xl font-display font-bold">
                Free Events
              </h2>
            </div>
            <Link href="/events/free" className="btn-primary bg-green-600 hover:bg-green-700 text-sm md:text-base">
              View All Free Events <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {freeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Events */}
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
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

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

const virtualEvents = [
  {
    id: 'v1',
    title: 'Tech Conference 2024',
    date: 'Mar 15, 2024',
    location: 'Online',
    price: '1,500',
    image: '/images/virtual-conf.jpg',
    isVirtual: true,
    virtualLink: 'https://meet.google.com/virtual-conference'
  },
  {
    id: 'v2',
    title: 'Digital Art Workshop',
    date: 'Apr 1, 2024',
    location: 'Online',
    price: '800',
    image: '/images/virtual-art.jpg',
    isVirtual: true,
    virtualLink: 'https://zoom.us/art-workshop'
  },
  {
    id: 'v3',
    title: 'Virtual Fitness Class',
    date: 'Mar 20, 2024',
    location: 'Online',
    price: '500',
    image: '/images/virtual-fitness.jpg',
    isVirtual: true,
    virtualLink: 'https://zoom.us/fitness-class'
  }
]

const freeEvents = [
  {
    id: 'f1',
    title: 'Community Workshop',
    date: 'Mar 10, 2024',
    location: 'Nairobi Community Center',
    price: '0',
    image: '/images/community.jpg',
    isFree: true
  },
  {
    id: 'f2',
    title: 'Tech Meetup',
    date: 'Mar 25, 2024',
    location: 'iHub Nairobi',
    price: '0',
    image: '/images/meetup.jpg',
    isFree: true
  },
  {
    id: 'f3',
    title: 'Art Exhibition',
    date: 'Apr 5, 2024',
    location: 'National Museum',
    price: '0',
    image: '/images/exhibition.jpg',
    isFree: true
  }
]

const trendingEvents = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: 'Aug 15, 2024',
    location: 'Nairobi',
    price: '2,500',
    image: '/images/event1.jpg',
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    date: 'Sep 20, 2024',
    location: 'Mombasa',
    price: '3,000',
    image: '/images/tech1.jpg',
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    date: 'Oct 5, 2024',
    location: 'Kisumu',
    price: '1,500',
    image: '/images/wine.jpg',
  }
]
