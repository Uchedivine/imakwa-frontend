import client from './client'

export const login = async ({ email, password }) => {
  const response = await client.post('/auth/login', { email, password })
  return response.data
}

export const register = async ({ name, email, password, password_confirmation, role }) => {
  const response = await client.post('/auth/register', { name, email, password, password_confirmation, role })
  return response.data
}

export const logout = async () => {
  const response = await client.post('/auth/logout')
  return response.data
}

export const getMe = async () => {
  const response = await client.get('/auth/user')
  return response.data
}

export const forgotPassword = async ({ email }) => {
  // TODO: Implement when backend endpoint is ready
  // const response = await client.post('/auth/forgot-password', { email })
  // return response.data
  
  // Stub for now - simulate success
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Password reset link sent to your email' })
    }, 1000)
  })
}

export const updateProfile = async (profileData) => {
  const response = await client.put('/user/profile', profileData)
  return response.data
}

export const changePassword = async (passwordData) => {
  const response = await client.post('/user/change-password', passwordData)
  return response.data
}
