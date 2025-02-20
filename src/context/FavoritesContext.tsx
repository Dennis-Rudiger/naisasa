'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (eventId: string) => Promise<void>
  isFavorite: (eventId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = useCallback(async (eventId: string) => {
    if (!session?.user) {
      toast.error('Please sign in to save events')
      return
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      })

      if (!response.ok) throw new Error('Failed to update favorites')

      setFavorites(prev => 
        prev.includes(eventId)
          ? prev.filter(id => id !== eventId)
          : [...prev, eventId]
      )

      toast.success(
        favorites.includes(eventId)
          ? 'Removed from favorites'
          : 'Added to favorites'
      )
    } catch (error) {
      toast.error('Failed to update favorites')
    }
  }, [session, favorites])

  const isFavorite = useCallback((eventId: string) => {
    return favorites.includes(eventId)
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
