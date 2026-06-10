import client from './client'

// Products & countdown
export const getWorldCupProducts = async () => {
  const response = await client.get('/worldcup/products')
  return response.data
}

export const getCountdown = async () => {
  const response = await client.get('/worldcup/countdown')
  return response.data
}

// Step 1 of checkout — creates the pending order, returns order.id
export const createWorldCupCheckout = async ({ email, tierId, paymentGateway }) => {
  const response = await client.post('/worldcup/checkout', {
    email,
    tier_id: tierId,
    payment_gateway: paymentGateway,
  })
  return response.data
}

// Step 2a — Stripe: get client_secret to initialise Stripe Elements
export const initStripePayment = async ({ orderId }) => {
  const response = await client.post('/worldcup/stripe/init', {
    order_id: orderId,
  })
  return response.data // { client_secret, payment_intent_id }
}

// Step 2b — Paystack: get authorization_url to redirect buyer
export const initPaystackPayment = async ({ orderId, email }) => {
  const response = await client.post('/worldcup/paystack/init', {
    order_id: orderId,
    email,
  })
  return response.data // { authorization_url, reference }
}

// Poll order status by ID (used after Stripe payment confirmation)
export const getOrderStatus = async (orderId) => {
  const response = await client.get(`/worldcup/order-status/${orderId}`)
  return response.data
}

// Poll order status by reference (used after Paystack redirect — no ID in the URL)
export const getOrderStatusByReference = async (reference) => {
  const response = await client.get(`/worldcup/order-by-reference/${reference}`)
  return response.data
}

// Check a download token without consuming it
export const getDownloadInfo = async (token) => {
  const response = await client.get(`/downloads/${token}/info`)
  return response.data
}

// Consume the download token — one-time use, triggers file delivery
export const redeemDownload = async (token) => {
  const response = await client.get(`/downloads/${token}`)
  return response.data
}

// Recovery: find paid orders by email address
export const lookupOrdersByEmail = async (email) => {
  const response = await client.post('/worldcup/lookup', { email })
  return response.data
}
