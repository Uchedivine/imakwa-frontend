import client from './client'

export const getCart = async () => {
  const response = await client.get('/cart')
  return response.data
}

export const addToCart = async (artworkId) => {
  const response = await client.post('/cart/items', { artworkId })
  return response.data
}

export const removeFromCart = async (artworkId) => {
  const response = await client.delete(`/cart/items/${artworkId}`)
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
