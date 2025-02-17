'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/80" />
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Events background"
            fill
            className="object-cover"
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
                href={`/events?category=${category.name}`}
                className="group hover-lift hover-glow"
              >
                <div className="card text-center">
                  <category.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:text-accent transition-colors" />
                  <h3 className="font-display font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{category.count} Events</p>
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
  { name: 'Music', icon: MagnifyingGlassIcon, count: 42 },
  { name: 'Sports', icon: CalendarIcon, count: 28 },
  { name: 'Arts', icon: MapPinIcon, count: 35 },
  { name: 'Food', icon: ArrowRightIcon, count: 21 },
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
  // Add more events...
]
