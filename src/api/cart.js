import client from './client'

export const getCart = async () => {
  const response = await client.get('/cart')
  return response.data
}

export const addToCart = async (artworkId) => {
  const response = await client.post('/cart/items', {
    item_type: 'artwork',
    item_id: artworkId,
  })
  return response.data
}

export const removeFromCart = async (cartItemId) => {
  const response = await client.delete(`/cart/items/${cartItemId}`)
  return response.data
}

export const clearCart = async () => {
  const response = await client.delete('/cart')
  return response.data
}

export const mergeCart = async (items) => {
  const response = await client.post('/cart/merge', { items })
  return response.data
}
