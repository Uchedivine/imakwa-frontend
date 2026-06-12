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
      storeLogin(data.user, data.token)

      // Merge guest cart into server cart on login
      if (localCartItems.length > 0) {
        mergeCart(localCartItems)
      }

      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
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
