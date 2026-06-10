import client from './client'

export const getWorldCupProducts = async () => {
  const response = await client.get('/worldcup/products')
  return response.data
}

export const getCountdown = async () => {
  const response = await client.get('/worldcup/countdown')
  return response.data
}

export const createWorldCupCheckout = async ({ email, productId }) => {
  const response = await client.post('/worldcup/checkout', { email, productId })
  return response.data
}
