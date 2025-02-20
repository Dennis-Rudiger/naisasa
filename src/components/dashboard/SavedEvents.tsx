'use client'

import { useState, useEffect } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import EventCard from '../EventCard'
import type { Event } from '@/types/events'

export default function SavedEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const response = await fetch('/api/favorites')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching saved events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedEvents()
  }, [])

  if (loading) return <div>Loading...</div>

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <HeartIcon className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No Saved Events</h3>
        <p className="mt-2 text-gray-500">Events you save will appear here.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={{...event, price: event.price.toString()}} />
      ))}
    </div>
  )
}
