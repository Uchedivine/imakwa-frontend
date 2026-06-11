import { useQuery } from '@tanstack/react-query'
import { getUpcoming } from '../api/worldcup'

/**
 * Hook for fetching upcoming World Cup matches
 * Returns next N matches (default 10 from backend)
 * Refetches every 5 minutes to stay in sync with backend cache
 */
export function useUpcoming() {
  return useQuery({
    queryKey: ['worldcup-upcoming'],
    queryFn: getUpcoming,
    staleTime: 1000 * 60 * 5, // 5 minutes - matches backend cache
    refetchInterval: 1000 * 60 * 5, // Poll every 5 minutes
    refetchOnWindowFocus: true, // Refresh when user returns
  })
}
