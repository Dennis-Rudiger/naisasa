'use client'

import { useState, useEffect } from 'react'
import { CalendarDaysIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  date: string
  location: string
  image: string
  category: string
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data fetch - replace with real API call
    setTimeout(() => {
      setEvents([
        {
          id: 'evt-1',
          title: 'Music Festival 2023',
          date: '2023-12-18T18:00:00',
          location: 'Nairobi National Park',
          image: '/images/events/music-festival.jpg',
          category: 'Music',
        },
        {
          id: 'evt-2',
          title: 'Tech Conference',
          date: '2023-12-22T10:00:00',
          location: 'KICC, Nairobi',
          image: '/images/events/tech-conference.jpg',
          category: 'Tech',
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4 md:gap-6">
            <div className="rounded-lg bg-gray-200 w-24 h-24 md:w-32 md:h-32 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming events</h3>
        <p className="mt-1 text-gray-500">Browse events and book tickets to see them here</p>
        <Link href="/events" className="btn-primary mt-4">
          Browse Events
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Upcoming Events</h2>
        <Link href="/events" className="text-primary hover:text-primary-dark text-sm">
          Browse more events
        </Link>
      </div>

      <div className="space-y-6">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 bg-gray-50 p-4 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <div className="relative rounded-lg overflow-hidden w-full sm:w-32 h-32">
              <ImageWithFallback
                src={event.image}
                category={event.category}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded">
                  {event.category}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary" />
                  {format(new Date(event.date), 'EEEE, MMM d, yyyy • h:mm a')}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
                  {event.location}
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Link 
                  href={`/events/${event.id}`}
                  className="btn-primary py-1.5 px-4 text-sm"
                >
                  View Details
                </Link>
                <Link 
                  href={`/tickets/${event.id}`}
                  className="btn-secondary py-1.5 px-4 text-sm"
                >
                  <TicketIcon className="h-4 w-4 mr-1.5" />
                  View Ticket
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
