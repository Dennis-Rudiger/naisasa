'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (eventId: string) => Promise<void>
  isFavorite: (eventId: string) => boolean
  loadFavorites: () => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
  loadFavorites: async () => {}
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

  const loadFavorites = async () => {
    if (!session?.user) return

    try {
      const response = await fetch('/api/user/favorites/check')
      if (!response.ok) throw new Error('Failed to fetch favorites')
      const { favorites } = await response.json()
      setFavorites(favorites)
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
