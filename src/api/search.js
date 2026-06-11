import client from './client'

export const search = async (q) => {
  const response = await client.get('/search', { params: { q } })
  return response.data
}

export const getSearchFilters = async () => {
  const response = await client.get('/search/filters')
  return response.data
}
