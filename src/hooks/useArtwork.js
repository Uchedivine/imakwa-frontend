import { useQuery } from '@tanstack/react-query'
import { getArtwork } from '../api/gallery'

export function useArtwork(id) {
  return useQuery({
    queryKey: ['artwork', id],
    queryFn: () => getArtwork(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
