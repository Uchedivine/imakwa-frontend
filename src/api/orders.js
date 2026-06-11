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

export const initStripeIntent = async (orderId) => {
  const response = await client.post('/payments/stripe/intent', { order_id: orderId })
  return response.data
}

export const initPaystackPayment = async (orderId) => {
  const response = await client.post('/payments/paystack/init', { order_id: orderId })
  return response.data
}
