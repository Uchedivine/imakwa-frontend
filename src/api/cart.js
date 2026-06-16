import client from './client'

export const getCart = async () => {
  const response = await client.get('/cart')
  return response.data
}

export const addToCart = async (artworkId) => {
  console.log('🛒 [CART API] Adding to cart:', { artworkId })
  try {
    const response = await client.post('/cart/items', {
      item_type: 'artwork',
      item_id: artworkId,
    })
    console.log('✅ [CART API] Add response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ [CART API] Add to cart failed:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    })
    throw error
  }
}

export const removeFromCart = async (cartItemId) => {
  const response = await client.delete(`/cart/items/${cartItemId}`)
  return response.data
}

export const clearCart = async () => {
  const response = await client.delete('/cart')
  return response.data
}

export const mergeCart = async () => {
  const response = await client.post('/cart/merge')
  return response.data
}
