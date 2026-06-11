import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Generate or retrieve persistent session ID for guest cart
function getSessionId() {
  const KEY = 'imakwa-session-id'
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
  }
  return id
}

// Request Interceptor: Inject token from Zustand persisted localStorage
client.interceptors.request.use(
  (config) => {
    try {
      const authData = localStorage.getItem('imakwa-auth')
      if (authData) {
        const { state } = JSON.parse(authData)
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      }
    } catch (error) {
      console.error('Error reading auth token in API client:', error)
    }
    config.headers['X-Session-ID'] = getSessionId()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle auth errors (e.g. 401 Unauthorized)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear localStorage auth state to force logout on token expiration
      localStorage.removeItem('imakwa-auth')
      
      // Dispatch custom event to trigger app-wide redirects or states if needed
      window.dispatchEvent(new Event('auth-unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default client
