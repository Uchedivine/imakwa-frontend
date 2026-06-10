import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCart, addToCart, removeFromCart, clearCart, mergeCart } from '../api/cart'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

export function useCart() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthStore()
  const { addItemLocal, removeItemLocal, clearCartLocal, setItems } = useCartStore()

  // Fetch server cart only when authenticated
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      if (data?.items) setItems(data.items)
    },
  })

  const addMutation = useMutation({
    mutationFn: (artwork) => {
      addItemLocal(artwork)
      if (isAuthenticated) return addToCart(artwork.id)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  const removeMutation = useMutation({
    mutationFn: (artworkId) => {
      removeItemLocal(artworkId)
      if (isAuthenticated) return removeFromCart(artworkId)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  const clearMutation = useMutation({
    mutationFn: () => {
      clearCartLocal()
      if (isAuthenticated) return clearCart()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  const mergeMutation = useMutation({
    mutationFn: (items) => mergeCart(items),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  return {
    cartQuery,
    addToCart: addMutation.mutate,
    removeFromCart: removeMutation.mutate,
    clearCart: clearMutation.mutate,
    mergeCart: mergeMutation.mutate,
    isAddingToCart: addMutation.isPending,
  }
}
