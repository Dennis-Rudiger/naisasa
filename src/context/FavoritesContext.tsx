'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Event } from '@/types/events'
import toast from 'react-hot-toast'

interface FavoritesContextType {
  favorites: Event[]
  isLoading: boolean
  error: string | null
  isFavorite: (eventId: string) => boolean
  toggleFavorite: (eventId: string) => Promise<void>
  refreshFavorites: () => Promise<void> // Add this function
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create a refreshFavorites function with useCallback
  const refreshFavorites = useCallback(async () => {
    if (!session?.user) {
      setFavorites([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/favorites')
      if (!response.ok) throw new Error('Failed to fetch favorites')
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      console.error('Error fetching favorites:', error)
      setError('Error fetching favorites')
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    refreshFavorites()
  }, [refreshFavorites])

  const isFavorite = (eventId: string) => favorites.some(event => event.id === eventId)

  const toggleFavorite = async (eventId: string) => {
    if (!session?.user) {
      toast.error('Please sign in to save events')
      return
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      })

      if (!response.ok) throw new Error('Failed to update favorite')
      
      const { isFavorited } = await response.json()
      
      // Update the local state optimistically
      if (isFavorited) {
        const eventResponse = await fetch(`/api/events/${eventId}`)
        const eventData = await eventResponse.json()
        setFavorites(prev => [...prev, eventData])
      } else {
        setFavorites(prev => prev.filter(event => event.id !== eventId))
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      setError('Error toggling favorite')
      // Refresh to ensure consistency with server state
      refreshFavorites()
    }
  }

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      isFavorite, 
      toggleFavorite, 
      isLoading, 
      error,
      refreshFavorites // Include the function in the context
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
