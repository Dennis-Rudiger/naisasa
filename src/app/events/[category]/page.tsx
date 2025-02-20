'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import EventCard from '@/components/EventCard/Card'
import { Event } from '@/types/events'
import { 
  MusicalNoteIcon,
  BoltIcon,
  PaintBrushIcon,
  CakeIcon,
} from '@heroicons/react/24/outline'
import { getEventsByCategory } from '@/data/events'

const categoryIcons = {
  music: MusicalNoteIcon,
  sports: BoltIcon,
  arts: PaintBrushIcon,
  food: CakeIcon,
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const category = params.category
  const Icon = categoryIcons[category as keyof typeof categoryIcons]

  useEffect(() => {
    // Use the imported function instead of API call
    const categoryEvents = getEventsByCategory(params.category)
    setEvents(categoryEvents)
    setLoading(false)
  }, [params.category])

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            {Icon && <Icon className="h-8 w-8 text-primary" />}
            <h1 className="text-4xl font-display font-bold capitalize">
              {category} Events
            </h1>
          </motion.div>
          <p className="text-gray-600">
            Discover amazing {category} events happening near you
          </p>
        </div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {loading ? (
            // Loading skeletons
            [...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3
                    }
                  }
                }}
              >
                <EventCard event={event} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No {category} events available at the moment.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Sample events data - replace with API call
const sampleEvents = [
  {
    id: '1',
    title: 'Sample Event 1',
    description: 'This is a sample event description that shows more details about the event.',
    date: '2024-03-15',
    location: 'Nairobi, Kenya',
    price: '2,500',
    image: '/images/event1.jpg',
  },
  {
    id: '2',
    title: 'Sample Event 2',
    description: 'Another sample event with more information to display.',
    date: '2024-03-20',
    location: 'Mombasa, Kenya',
    price: '1,800',
    image: '/images/event2.jpg',
  },
  // Add more sample events as needed
]
