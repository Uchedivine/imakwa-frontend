import { useQuery } from '@tanstack/react-query'
import { getFixtures } from '../api/worldcup'

/**
 * Hook for fetching the full World Cup fixture schedule
 * Data is real from Football-Data.org, not mock
 * Cached for 1 hour to match backend TTL
 */
export function useFixtures() {
  return useQuery({
    queryKey: ['worldcup-fixtures'],
    queryFn: getFixtures,
    staleTime: 1000 * 60 * 60, // 1 hour - matches backend cache
    refetchOnWindowFocus: false, // Fixtures don't change often
  })
}
