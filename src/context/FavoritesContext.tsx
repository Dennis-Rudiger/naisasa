'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface FavoritesContextType {
  favorites: string[]
  isFavorite: (eventId: string) => boolean
  toggleFavorite: (eventId: string) => Promise<void>
  isLoading: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
        setFavorites(data.map((fav: any) => fav.eventId))
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [session])

  const isFavorite = (eventId: string) => favorites.includes(eventId)

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
      
      setFavorites(prev => 
        isFavorited 
          ? [...prev, eventId]
          : prev.filter(id => id !== eventId)
      )
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, isLoading }}>
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
