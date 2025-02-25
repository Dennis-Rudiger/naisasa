import { Event } from './events'

export interface FavoritesContextType {
  favorites: Event[]
  isLoading: boolean
  error: string | null
  isFavorite: (eventId: string) => boolean
  toggleFavorite: (eventId: string) => Promise<void>
  refreshFavorites: () => Promise<void>
}
