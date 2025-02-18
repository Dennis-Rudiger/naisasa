'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EventCard from '@/components/EventCard'
import { mockEvents } from '@/data/mockEvents'
import { MusicalNoteIcon, BoltIcon, PaintBrushIcon, CakeIcon } from '@heroicons/react/24/outline'

const categoryIcons = {
  music: MusicalNoteIcon,
  sports: BoltIcon,
  arts: PaintBrushIcon,
  food: CakeIcon,
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    image: string;
  }
  
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  
  const Icon = categoryIcons[category as keyof typeof categoryIcons]

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setEvents(mockEvents[category as keyof typeof mockEvents] || [])
      setLoading(false)
    }

    loadEvents()
  }, [category])

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          {Icon && <Icon className="h-8 w-8 text-primary" />}
          <h1 className="text-4xl font-display font-bold capitalize">
            {category} Events
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event}
                buttonText="Buy Tickets"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No {category} events available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
