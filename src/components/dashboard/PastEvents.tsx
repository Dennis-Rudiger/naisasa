'use client'

import { useState, useEffect } from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import EventCard from '../EventCard'

interface Event {
  id: string
  title: string
  date: string
  location: string
  price: string
  image: string
}

export default function PastEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const response = await fetch('/api/events/past')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching past events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPastEvents()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <ClockIcon className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No Past Events</h3>
        <p className="mt-2 text-gray-500">You haven't attended any events yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
