import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFavorites, toggleFavorite } from '../api/favorites'
import { useFavoritesStore } from '../store/favoritesStore'
import { useAuthStore } from '../store/authStore'

export function useFavorites() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthStore()
  const { favorites, toggleFavoriteLocal, isFavorited, setFavorites } = useFavoritesStore()

  // Fetch server favorites when authenticated
  useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      if (data?.ids) setFavorites(data.ids)
    },
  })

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
