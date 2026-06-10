import { useQuery } from '@tanstack/react-query'
import { getArtists } from '../api/gallery'

export function useArtists(params = {}) {
  return useQuery({
    queryKey: ['artists', params],
    queryFn: () => getArtists(params),
    staleTime: 1000 * 60 * 5,
  })
}
