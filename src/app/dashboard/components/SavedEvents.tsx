'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'
import EventCard from '@/components/EventCard/Card'
import { useFavorites } from '@/context/FavoritesContext'
import type { Event } from '@/types/events'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

export default function SavedEvents() {
  const { favorites, isLoading, error, refreshFavorites } = useFavorites()

  // Force refresh favorites when component mounts
  useEffect(() => {
    refreshFavorites()
  }, [refreshFavorites])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} className="animate-pulse">
            <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => refreshFavorites()}
          className="btn-secondary"
        >
          Try Again
        </button>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((event) => (
        <motion.div 
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EventCard 
            event={event} 
            onFavoriteToggled={() => refreshFavorites()}
          />
        </motion.div>
      ))}
    </div>
  )
}
