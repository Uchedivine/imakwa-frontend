import client from './client'

export const getUserProfile = async () => {
  const response = await client.get('/user/profile')
  return response.data
}

export const updateUserProfile = async (profileData) => {
  const response = await client.put('/user/profile', profileData)
  return response.data
}

export const changeUserPassword = async (passwordData) => {
  const response = await client.post('/user/change-password', passwordData)
  return response.data
}

export const getUserOrders = async () => {
  const response = await client.get('/user/orders')
  return response.data
}

export const getUserFavorites = async () => {
  const response = await client.get('/user/favorites')
  return response.data
}

export const getUserDigitalOrders = async () => {
  const response = await client.get('/user/digital-orders')
  return response.data
}
