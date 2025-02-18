'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

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
      <section className="relative h-[80vh] flex items-center">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-down">
              Discover Amazing Events in Your Area
            </h1>
            <p className="text-xl mb-8 text-secondary/90 animate-fade-up">
              Find and book tickets for concerts, workshops, sports events and more
            </p>

            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 mb-8">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-transparent border-none text-white placeholder-white/70 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn-accent">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Trending Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold">Trending Events</h2>
            <Link href="/events" className="btn-primary">
              View All <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="card hover-lift hover-glow"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <span className="text-success font-medium">
                    KES {event.price}
                  </span>
                </div>
              </Link>
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

const trendingEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    date: 'Aug 15, 2024',
    location: 'Nairobi',
    price: '2,500',
    image: '/images/event1.jpg',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    date: 'Sep 20, 2024',
    location: 'Mombasa',
    price: '3,000',
    image: '/images/tech1.jpg',
  },
  {
    id: 3,
    title: 'Food & Wine Festival',
    date: 'Oct 5, 2024',
    location: 'Kisumu',
    price: '1,500',
    image: '/images/wine.jpg',
  }
]
