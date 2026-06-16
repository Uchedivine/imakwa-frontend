import { useQuery } from '@tanstack/react-query'
import { getOrders, getOrder } from '../api/orders'
import { useAuthStore } from '../store/authStore'

export function useOrders() {
  const { isAuthenticated } = useAuthStore()
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    enabled: isAuthenticated,
  })
}

export function useOrder(id) {
  const { isAuthenticated } = useAuthStore()
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
    enabled: isAuthenticated && !!id,
  })
}
