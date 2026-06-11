import { useQuery } from '@tanstack/react-query'
import { getUserDigitalOrders } from '../api/orders'

export function useDigitalOrders() {
  return useQuery({
    queryKey: ['digital-orders'],
    queryFn: getUserDigitalOrders,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
