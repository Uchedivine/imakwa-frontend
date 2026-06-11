import { useQuery } from '@tanstack/react-query'
import { getSearchFilters } from '../api/search'

export function useSearchFilters() {
  return useQuery({
    queryKey: ['searchFilters'],
    queryFn: getSearchFilters,
    staleTime: 1000 * 60 * 10, // Cache filters for 10 minutes
  })
}
