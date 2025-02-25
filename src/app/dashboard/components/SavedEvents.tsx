'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'
import EventCard from '@/components/EventCard/Card'
import { useFavorites } from '@/context/FavoritesContext'
import type { Event } from '@/types/events'

export default function SavedEvents() {
  const { favorites, isLoading } = useFavorites()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} className="animate-pulse">
            {/* ...existing loading skeleton... */}
          </motion.div>
        ))}
      </div>
    )
  }

  if (!favorites.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <HeartIcon className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No Saved Events</h3>
        <p className="mt-2 text-gray-500">Events you save will appear here</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favorites.map((event) => (
        <motion.div 
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </div>
  )
}
