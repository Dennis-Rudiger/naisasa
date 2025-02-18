'use client'

import { useState, useEffect } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import EventCard from '../EventCard'

interface SavedEvent {
  id: string
  title: string
  date: string
  location: string
  price: string
  image: string
}

export default function SavedEvents() {
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSavedEvents()
  }, [])

  const fetchSavedEvents = async () => {
    try {
      const response = await fetch('/api/events/saved')
      const data = await response.json()
      setSavedEvents(data)
    } catch (error) {
      console.error('Error fetching saved events:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {savedEvents.length === 0 ? (
        <div className="text-center py-12">
          <HeartIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved events</h3>
          <p className="text-gray-500">Events you save will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
