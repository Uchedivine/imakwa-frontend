import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { getCountdown } from '../api/worldcup'

export function useCountdown() {
  const { data, ...rest } = useQuery({
    queryKey: ['countdown'],
    queryFn: getCountdown,
    // Refetch every minute to stay fresh
    refetchInterval: 1000 * 60,
    staleTime: 0,
  })

  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!data?.endsAt) return

    const target = new Date(data.endsAt).getTime()

    const tick = () => {
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [data?.endsAt])

  return { timeLeft, licensesRemaining: data?.licensesRemaining, ...rest }
}
