import client from './client'

export const login = async ({ email, password }) => {
  const response = await client.post('/auth/login', { email, password })
  return response.data
}

export const register = async ({ name, email, password, role }) => {
  const response = await client.post('/auth/register', { name, email, password, role })
  return response.data
}

export const logout = async () => {
  const response = await client.post('/auth/logout')
  return response.data
}

export const getMe = async () => {
  const response = await client.get('/auth/me')
  return response.data
}
