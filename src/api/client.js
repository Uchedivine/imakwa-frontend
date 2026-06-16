import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

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

// Request Interceptor: Inject token from localStorage
client.interceptors.request.use(
  (config) => {
    // Get token directly from localStorage (simple and reliable)
    const token = localStorage.getItem('authToken')
    
    console.log('🔐 [AXIOS INTERCEPTOR] Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 10)}...` : 'null',
      headers: config.headers
    })
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add session ID for guest users
    config.headers['X-Session-ID'] = getSessionId()
    
    console.log('📤 [AXIOS INTERCEPTOR] Final headers:', {
      Authorization: config.headers.Authorization ? 'Set' : 'Not set',
      'X-Session-ID': config.headers['X-Session-ID']
    })
    
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
      // Clear localStorage auth state on token expiration
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
      
      // Dispatch custom event to trigger app-wide logout
      window.dispatchEvent(new Event('auth-unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default client
