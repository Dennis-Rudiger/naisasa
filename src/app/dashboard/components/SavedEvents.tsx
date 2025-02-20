'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'
import EventCard from '@/components/EventCard/Card'
import { useFavorites } from '@/context/FavoritesContext'
import type { Event } from '@/types/events'

export default function SavedEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { loadFavorites } = useFavorites()

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const response = await fetch('/api/user/favorites')
        const data = await response.json()
        setEvents(data.map((f: any) => f.event))
        await loadFavorites()
      } catch (error) {
        console.error('Error fetching saved events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedEvents()
  }, [loadFavorites])

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="dashboard-grid">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} className="animate-pulse dashboard-card">
              <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </motion.div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-card text-center py-12"
        >
          <HeartIcon className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No Saved Events</h3>
          <p className="mt-2 text-gray-500">Events you save will appear here</p>
        </motion.div>
      ) : (
        <div className="dashboard-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
