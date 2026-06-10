import { useQuery } from '@tanstack/react-query'
import { getCollection } from '../api/gallery'

export function useCollection(id) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollection(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
