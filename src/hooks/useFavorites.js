import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFavorites, toggleFavorite } from '../api/favorites'
import { useFavoritesStore } from '../store/favoritesStore'
import { useAuthStore } from '../store/authStore'

export function useFavorites() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthStore()
  const { favorites, toggleFavoriteLocal, isFavorited, setFavorites } = useFavoritesStore()

  // Fetch server favorites when authenticated
  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
  })

  // Update local store when data changes
  if (favoritesQuery.data && Array.isArray(favoritesQuery.data)) {
    const ids = favoritesQuery.data.map((f) => f.favoriteable_id || f.id)
    if (JSON.stringify(ids) !== JSON.stringify(favorites)) {
      setFavorites(ids)
    }
  }

  const toggleMutation = useMutation({
    mutationFn: (artworkId) => {
      // Optimistically update local store
      toggleFavoriteLocal(artworkId)
      if (isAuthenticated) return toggleFavorite(artworkId)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
    onError: (_err, artworkId) => {
      // Rollback on error
      toggleFavoriteLocal(artworkId)
    },
  })

  return {
    favorites,
    isFavorited,
    toggle: (artworkId) => toggleMutation.mutate(artworkId),
    isToggling: toggleMutation.isPending,
  }
}
