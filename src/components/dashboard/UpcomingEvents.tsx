'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import EventCard from '../EventCard'

interface Event {
  id: string
  title: string
  date: string
  location: string
  price: string
  image: string
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingEvents()
  }, [])

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch('/api/events/upcoming')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching upcoming events:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {events.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
          <p className="text-gray-500">Check back later for new events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
