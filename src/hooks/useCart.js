import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCart, addToCart, removeFromCart, clearCart, mergeCart } from '../api/cart'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { parsePrice } from '../lib/utils'

export function useCart() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthStore()
  const { setItems, clearCartLocal } = useCartStore()

  // Fetch cart from server for BOTH authenticated users AND guests (session-based)
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: true, // Always fetch cart (backend uses session ID for guests)
    onSuccess: (data) => {
      if (data?.items) {
        setItems(data.items.map(ci => ({
          id: ci.itemable_id || ci.item_id,
          cartItemId: ci.id,         // the CartItem row ID
          artworkId: ci.itemable_id || ci.item_id,
          title: ci.itemable?.title || ci.item?.title,
          price: parsePrice(ci.itemable?.price || ci.item?.price || ci.price),
          image: ci.itemable?.primary_image?.url || ci.itemable?.primaryImage?.url || ci.item?.primary_image_url || 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&q=80',
          artist: ci.itemable?.artist?.name || ci.item?.artist?.name || 'Unknown Artist',
          quantity: parseInt(ci.quantity) || 1,
        })))
      }
    },
  })

  const addMutation = useMutation({
    mutationFn: async (artwork) => {
      console.log('🛒 [USE CART] Adding to cart:', { artworkId: artwork.id, artwork })
      // Always call backend for both guests and authenticated users
      const response = await addToCart(artwork.id)
      console.log('✅ [USE CART] Add to cart response:', response)
      return response
    },
    onSuccess: () => {
      console.log('✅ [USE CART] Item added successfully, invalidating cart query')
      // Reload cart from backend to get updated state
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('❌ [USE CART] Add to cart failed:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        error: error.response?.data
      })
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (cartItemId) => {
      // Call backend to remove item
      await removeFromCart(cartItemId)
    },
    onSuccess: () => {
      // Reload cart from backend
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const clearMutation = useMutation({
    mutationFn: async () => {
      // Call backend to clear cart
      await clearCart()
      // Also clear local state
      clearCartLocal()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const mergeMutation = useMutation({
    mutationFn: (items) => mergeCart(items),
    onSuccess: () => {
      // Reload cart after merge
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  return {
    cartQuery,
    addToCart: addMutation.mutate,
    removeFromCart: removeMutation.mutate,
    clearCart: clearMutation.mutate,
    mergeCart: mergeMutation.mutate,
    isAddingToCart: addMutation.isPending,
    isLoadingCart: cartQuery.isLoading,
  }
}
