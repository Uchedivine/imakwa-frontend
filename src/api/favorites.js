import client from './client'

export const getFavorites = async () => {
  const response = await client.get('/favorites')
  return response.data
}

export const toggleFavorite = async (artworkId) => {
  const response = await client.post('/favorites/toggle', {
    item_type: 'artwork',
    item_id: artworkId,
  })
  return response.data
}
