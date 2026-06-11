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
      if (data?.items) {
        setItems(data.items.map(ci => ({
          id: ci.itemable_id || ci.item_id,
          cartItemId: ci.id,         // the CartItem row ID
          artworkId: ci.itemable_id || ci.item_id,
          title: ci.itemable?.title || ci.item?.title,
          price: ci.itemable?.price || ci.item?.price || ci.price,
          image: ci.itemable?.primary_image?.url || ci.itemable?.primaryImage?.url || ci.item?.primary_image_url || 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&q=80',
          artist: ci.itemable?.artist?.name || ci.item?.artist?.name || 'Unknown Artist',
          quantity: ci.quantity,
        })))
      }
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
      const cartItem = useCartStore.getState().items.find(i => i.artworkId === artworkId || i.id === artworkId)
      removeItemLocal(artworkId)
      if (isAuthenticated && cartItem?.cartItemId) return removeFromCart(cartItem.cartItemId)
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
