'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Event } from '@/types/events'

interface FavoritesContextType {
  favorites: Event[]
  isLoading: boolean
  error: string | null
  isFavorite: (eventId: string) => boolean
  toggleFavorite: (eventId: string) => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user) {
        setFavorites([])
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/favorites')
        if (!response.ok) throw new Error('Failed to fetch favorites')
        const data = await response.json()
        setFavorites(data) // data should now be full Event objects
      } catch (error) {
        console.error('Error fetching favorites:', error)
        setError('Error fetching favorites')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [session])

  const isFavorite = (eventId: string) => favorites.some(event => event.id === eventId)

  const toggleFavorite = async (eventId: string) => {
    if (!session?.user) return

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      })

      if (!response.ok) throw new Error('Failed to update favorite')
      
      const { isFavorited } = await response.json()
      
      const updatedEvent = await fetch(`/api/events/${eventId}`).then(res => res.json())
      setFavorites(prev => 
        isFavorited 
          ? [...prev, updatedEvent]
          : prev.filter(event => event.id !== eventId)
      )
    } catch (error) {
      console.error('Error toggling favorite:', error)
      setError('Error toggling favorite')
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, isLoading, error }}>
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
