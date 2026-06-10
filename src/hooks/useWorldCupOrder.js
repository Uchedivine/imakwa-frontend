import { useQuery } from '@tanstack/react-query'
import { getOrderStatus, getOrderStatusByReference } from '../api/worldcup'

export function useWorldCupOrder({ orderId, reference } = {}) {
  return useQuery({
    queryKey: ['worldcup-order', orderId ?? reference],
    queryFn: () =>
      orderId
        ? getOrderStatus(orderId)
        : getOrderStatusByReference(reference),
    enabled: !!(orderId || reference),
    refetchInterval: (data) =>
      data?.payment_status === 'paid' ? false : 3000,
    retry: false,
  })
}
