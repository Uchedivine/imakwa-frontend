import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Initialize from localStorage on app start
  initAuth: () => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('authUser')
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      })
    }
  },

  // Save to localStorage AND state
  login: (user, token) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
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
