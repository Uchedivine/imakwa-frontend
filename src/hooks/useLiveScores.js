import { useQuery } from '@tanstack/react-query'
import { getLiveScores } from '../api/worldcup'
import { useCountdown } from './useCountdown'

/**
 * Hook for fetching live World Cup scores
 * Only polls when the tournament has started (worldCupStarted === true)
 * Polls every 60 seconds when enabled
 */
export function useLiveScores() {
  const { data: countdown } = useCountdown()
  const worldCupStarted = countdown?.worldCupStarted || false

  return useQuery({
    queryKey: ['worldcup-live-scores'],
    queryFn: getLiveScores,
    enabled: worldCupStarted, // Only fetch if tournament has started
    refetchInterval: worldCupStarted ? 60000 : false, // Poll every 60s when active
    staleTime: 60000, // Consider data fresh for 60s
    refetchOnWindowFocus: worldCupStarted, // Refresh when user returns to tab
  })
}
