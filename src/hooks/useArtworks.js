import { useQuery } from '@tanstack/react-query'
import { getArtworks } from '../api/gallery'

export function useArtworks(filters = {}) {
  return useQuery({
    queryKey: ['artworks', filters],
    queryFn: () => getArtworks(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (prev) => prev, // keep previous data while refetching
  })
}
