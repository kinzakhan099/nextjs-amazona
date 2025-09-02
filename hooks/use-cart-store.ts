import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Cart, OrderItem } from '@/types'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.action'

// Define the initial state
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  deliveryDateIndex: undefined,
}
// Define the store
interface CartState {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string | undefined>
  init: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,

      addItem: async (item: OrderItem, quantity: number) => {
        const { items } = get().cart
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )
        // check if item is in stock
        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Not enough items in stock')
          }
        } else {
          // compare incoming quantity (not item.quantity)
          if (item.countInStock < quantity) {
            throw new Error('Not enough items in stock')
          }
        }
        // check if item is already in cart
        const updatedCartItems = existItem
          ? items.map((x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x
            ) // update quantity
          : [...items, { ...item, quantity }]
        // update cart
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
            })),
          },
        })

        return updatedCartItems.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )?.clientId // return clientid
      },
      init: () => set({ cart: initialState }),
    }),
    {
      name: 'cart-store',
    }
  )
)
export default useCartStore
