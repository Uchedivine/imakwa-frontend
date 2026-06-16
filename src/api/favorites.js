import client from './client'

export const getFavorites = async () => {
  console.log('💖 [FAVORITES API] Fetching favorites...')
  try {
    const response = await client.get('/user/favorites')
    console.log('✅ [FAVORITES API] Response:', {
      count: response.data?.length,
      sample: response.data?.[0]
    })
    return response.data
  } catch (error) {
    console.error('❌ [FAVORITES API] Failed:', {
      status: error.response?.status,
      message: error.response?.data?.message
    })
    throw error
  }
}

export const toggleFavorite = async (artworkId) => {
  const response = await client.post('/favorites/toggle', {
    item_type: 'artwork',
    item_id: artworkId,
  })
  return response.data
}
