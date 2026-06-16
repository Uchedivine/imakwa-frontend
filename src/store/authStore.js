import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Initialize from localStorage on app start
  initAuth: () => {
    console.log('🔄 [AUTH STORE] initAuth() called - loading from localStorage...')
    console.log('🔍 [AUTH STORE] localStorage keys:', Object.keys(localStorage))
    
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('authUser')
    
    console.log('📦 [AUTH STORE] Retrieved from localStorage:', {
      hasToken: !!token,
      hasUser: !!user,
      tokenLength: token?.length,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'null',
      userPreview: user?.substring(0, 50)
    })
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user)
        set({
          token,
          user: parsedUser,
          isAuthenticated: true,
        })
        console.log('✅ [AUTH STORE] Auth restored:', {
          userId: parsedUser.id,
          userEmail: parsedUser.email,
          isAuthenticated: true,
          tokenInState: !!token
        })
      } catch (error) {
        console.error('❌ [AUTH STORE] Failed to parse user from localStorage:', error)
      }
    } else {
      console.log('ℹ️ [AUTH STORE] No auth data found in localStorage')
    }
  },

  // Save to localStorage AND state
  login: (user, token) => {
    console.log('💾 [AUTH STORE] login() called with:', {
      hasUser: !!user,
      hasToken: !!token,
      tokenLength: token?.length,
      userId: user?.id,
      userEmail: user?.email
    })
    
    try {
      localStorage.setItem('authToken', token)
      localStorage.setItem('authUser', JSON.stringify(user))
      
      console.log('✅ [AUTH STORE] Saved to localStorage:', {
        savedToken: localStorage.getItem('authToken'),
        savedUser: localStorage.getItem('authUser'),
        tokenMatches: localStorage.getItem('authToken') === token
      })
      
      set({ user, token, isAuthenticated: true })
      
      console.log('✅ [AUTH STORE] State updated, isAuthenticated: true')
    } catch (error) {
      console.error('❌ [AUTH STORE] Failed to save to localStorage:', error)
      throw error
    }
  },

  // Clear localStorage AND state
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    set({ user: null, token: null, isAuthenticated: false })
  },

  setUser: (user) => {
    localStorage.setItem('authUser', JSON.stringify(user))
    set({ user })
  },
}))
