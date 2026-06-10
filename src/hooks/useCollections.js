import { useQuery } from '@tanstack/react-query'
import { getCollections } from '../api/gallery'

export function useCollections(params = {}) {
  return useQuery({
    queryKey: ['collections', params],
    queryFn: () => getCollections(params),
    staleTime: 1000 * 60 * 5,
  })
}
