import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, title, price, image, quantity, artist }]
      totalAmount: 0,
      totalCount: 0,

      // Recalculates total values after changes
      recalculate: () => {
        const items = get().items
        const totalAmount = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
        const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0)
        set({ totalAmount, totalCount })
      },

      setItems: (items) => {
        set({ items })
        get().recalculate()
      },

      addItemLocal: (item) => {
        const items = [...get().items]
        const existingIndex = items.findIndex((i) => i.id === item.id)

        if (existingIndex > -1) {
          items[existingIndex].quantity = (items[existingIndex].quantity || 1) + 1
        } else {
          items.push({ ...item, quantity: 1 })
        }

        set({ items })
        get().recalculate()
      },

      removeItemLocal: (itemId) => {
        const items = get().items.filter((i) => i.id !== itemId)
        set({ items })
        get().recalculate()
      },

      clearCartLocal: () => {
        set({ items: [], totalAmount: 0, totalCount: 0 })
      },

      // Computed getters
      get total() {
        return get().totalAmount
      },

      // Aliases for easier use
      addItem: (item) => get().addItemLocal(item),
      removeItem: (itemId) => get().removeItemLocal(itemId),
      updateQuantity: (itemId, quantity) => {
        const items = get().items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
        set({ items })
        get().recalculate()
      },
      clearCart: () => get().clearCartLocal(),
    }),
    {
      name: 'imakwa-cart', // localStorage key
    }
  )
)
