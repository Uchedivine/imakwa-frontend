import { useQuery } from '@tanstack/react-query'
import { getWorldCupProduct } from '../api/worldcup'

export function useWorldCupProduct(id) {
  return useQuery({
    queryKey: ['worldcup-product', id],
    queryFn: () => getWorldCupProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}
