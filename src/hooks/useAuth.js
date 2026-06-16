import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login as loginApi, register as registerApi, logout as logoutApi, getMe } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { useCart } from './useCart'

export function useAuth() {
  const queryClient = useQueryClient()
  const { login: storeLogin, logout: storeLogout, isAuthenticated, user, token } = useAuthStore()
  const { items: localCartItems } = useCartStore()
  const { mergeCart } = useCart()

  // Fetch current user profile when authenticated
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isAuthenticated && !!token,
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log('🎉 [USE AUTH] Login mutation succeeded:', {
        hasUser: !!data.user,
        hasToken: !!data.token,
        tokenLength: data.token?.length,
        localCartItemsCount: localCartItems.length
      })
      
      console.log('📞 [USE AUTH] Calling storeLogin...')
      storeLogin(data.user, data.token)
      console.log('✅ [USE AUTH] storeLogin completed')

      // Merge guest cart into server cart on login
      if (localCartItems.length > 0) {
        console.log('🛒 [USE AUTH] Merging cart with', localCartItems.length, 'items')
        mergeCart(localCartItems)
      }

      console.log('♻️ [USE AUTH] Invalidating queries...')
      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      console.log('✅ [USE AUTH] Login flow complete')
    },
    onError: (error) => {
      console.error('❌ [USE AUTH] Login mutation failed:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors
      })
    }
  })

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      storeLogin(data.user, data.token)
      
      // Merge guest cart into server cart on registration
      if (localCartItems.length > 0) {
        mergeCart(localCartItems)
      }

      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      storeLogout()
      queryClient.clear()
    },
  })

  return {
    user: meQuery.data ?? user,
    isAuthenticated,
    isLoadingUser: meQuery.isLoading,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutate,
  }
}
