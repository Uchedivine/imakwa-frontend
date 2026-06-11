import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/orders'
import { useAuthStore } from '../store/authStore'

export function useOrders() {
  const { isAuthenticated } = useAuthStore()
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    enabled: isAuthenticated,
  })
}
