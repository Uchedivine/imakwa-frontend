import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { parsePrice } from '../lib/utils'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, title, price, image, quantity, artist, cartItemId }]
      totalAmount: 0,
      totalCount: 0,

      // Recalculates total values after changes
      recalculate: () => {
        const items = get().items
        const totalAmount = items.reduce((sum, item) => {
          const price = parsePrice(item.price)
          const quantity = parseInt(item.quantity) || 1
          return sum + (price * quantity)
        }, 0)
        const totalCount = items.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0)
        set({ totalAmount, totalCount })
      },

      // Set items from backend response
      setItems: (items) => {
        set({ items })
        get().recalculate()
      },

      // Clear cart (only used internally after backend clear)
      clearCartLocal: () => {
        set({ items: [], totalAmount: 0, totalCount: 0 })
      },
    }),
    {
      name: 'imakwa-cart', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Recalculate totals after rehydration from localStorage
        if (state) {
          state.recalculate()
        }
      },
    }
  )
)
