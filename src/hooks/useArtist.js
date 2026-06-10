import { useQuery } from '@tanstack/react-query'
import { getArtist } from '../api/gallery'

export function useArtist(id) {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtist(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
