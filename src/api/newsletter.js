import client from './client'

export const subscribeNewsletter = async (email) => {
  const response = await client.post('/newsletter/subscribe', { email })
  return response.data
}

export const unsubscribeNewsletter = async (email) => {
  const response = await client.post('/newsletter/unsubscribe', { email })
  return response.data
}
