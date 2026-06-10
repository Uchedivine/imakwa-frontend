import client from './client'

export const getFavorites = async () => {
  const response = await client.get('/favorites')
  return response.data
}

export const toggleFavorite = async (artworkId) => {
  const response = await client.post('/favorites/toggle', { artworkId })
  return response.data
}
