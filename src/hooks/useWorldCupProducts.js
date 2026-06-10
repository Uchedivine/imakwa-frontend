import { useQuery } from '@tanstack/react-query'
import { getWorldCupProducts } from '../api/worldcup'

export function useWorldCupProducts() {
  return useQuery({
    queryKey: ['worldcup-products'],
    queryFn: getWorldCupProducts,
    staleTime: 1000 * 60 * 10,
  })
}
