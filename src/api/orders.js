import client from './client'

export const getOrders = async (params = {}) => {
  const response = await client.get('/orders', { params })
  return response.data
}

export const getOrder = async (id) => {
  const response = await client.get(`/orders/${id}`)
  return response.data
}

export const createOrder = async (orderData) => {
  const response = await client.post('/orders', orderData)
  return response.data
}
