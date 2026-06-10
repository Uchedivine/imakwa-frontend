import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [], // Array of artwork IDs

      setFavorites: (ids) => {
        set({ favorites: ids })
      },

      toggleFavoriteLocal: (artworkId) => {
        const favorites = get().favorites
        const exists = favorites.includes(artworkId)
        
        if (exists) {
          set({ favorites: favorites.filter((id) => id !== artworkId) })
        } else {
          set({ favorites: [...favorites, artworkId] })
        }
      },

      isFavorited: (artworkId) => {
        return get().favorites.includes(artworkId)
      },

      clearFavoritesLocal: () => {
        set({ favorites: [] })
      },
    }),
    {
      name: 'imakwa-favorites', // localStorage key
    }
  )
)
