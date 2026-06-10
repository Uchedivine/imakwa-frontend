import { useQuery } from '@tanstack/react-query'
import { getDownloadInfo } from '../api/worldcup'

export function useDownloadInfo(token) {
  return useQuery({
    queryKey:  ['download-info', token],
    queryFn:   () => getDownloadInfo(token),
    enabled:   !!token,
    retry:     false,
    staleTime: Infinity,
  })
}
