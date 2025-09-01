import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type BrowsingHistory = {
  // recently viewed products
  products: { id: string; category: string }[]
}
const initialState: BrowsingHistory = {
  products: [],
}

export const browsingHistoryStore = create<BrowsingHistory>()(
  // Create the store
  persist(() => initialState, {
    // Persist the store
    name: 'browsingHistoryStore',
  })
)

export default function useBrowsingHistory() {
  const { products } = browsingHistoryStore() // Get the products from the store
  return {
    products,
    addItem: (product: { id: string; category: string }) => {
      // Add a product to the browsing history
      const index = products.findIndex((p) => p.id === product.id) // Check if the product already exists
      if (index !== -1) products.splice(index, 1) // Remove duplicate if it exists
      products.unshift(product) // Add id to the start

      if (products.length > 10) products.pop() // Remove excess items if length exceeds 10

      browsingHistoryStore.setState({
        // Update the store
        products,
      })
    },

    clear: () => {
      browsingHistoryStore.setState({
        // Clear the browsing history
        products: [],
      })
    },
  }
}
