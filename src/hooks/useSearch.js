import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { search } from '../api/search'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce the query by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  const searchQuery = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => search(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 1000 * 30,
  })

  return {
    query,
    setQuery,
    results: searchQuery.data,
    isSearching: searchQuery.isFetching,
    isError: searchQuery.isError,
  }
}
