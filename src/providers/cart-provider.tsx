'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react'
import type { CartItem, Dimension, Product } from '@/types'

const STORAGE_KEY = 'tapis-cart'
const CART_OPEN_KEY = 'tapis-cart-open'

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] }

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity: number, selectedColor: string, selectedDimension: Dimension) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

function generateCartItemId(productId: string, color: string, dimension: Dimension): string {
  const dimKey = `${dimension.width}x${dimension.height}`
  return `${productId}__${color}__${dimKey}`
}

function calculateItemPrice(product: Product, dimension: Dimension): number {
  const basePrice = product.sale_price ?? product.price
  return basePrice + dimension.price_modifier
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id)
      if (existingIndex >= 0) {
        const updated = [...state.items]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        }
        return { ...state, items: updated }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== action.payload.itemId) }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'OPEN_CART':
      return { ...state, isCartOpen: true }
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false }
    case 'HYDRATE':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function loadCartOpenFromStorage(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(CART_OPEN_KEY) === 'true'
  } catch {
    return false
  }
}

function persistCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* storage full or unavailable */
  }
}

function persistCartOpen(isOpen: boolean): void {
  if (typeof window === 'undefined') return
  try {
    if (isOpen) {
      localStorage.setItem(CART_OPEN_KEY, 'true')
    } else {
      localStorage.removeItem(CART_OPEN_KEY)
    }
  } catch {
    /* noop */
  }
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isCartOpen: false,
  })

  useEffect(() => {
    const items = loadCartFromStorage()
    const isCartOpen = loadCartOpenFromStorage()
    if (items.length > 0 || isCartOpen) {
      dispatch({ type: 'HYDRATE', payload: items })
      if (isCartOpen) {
        dispatch({ type: 'OPEN_CART' })
      }
    }
  }, [])

  useEffect(() => {
    persistCart(state.items)
  }, [state.items])

  useEffect(() => {
    persistCartOpen(state.isCartOpen)
  }, [state.isCartOpen])

  const addItem = useCallback(
    (product: Product, quantity: number, selectedColor: string, selectedDimension: Dimension) => {
      const id = generateCartItemId(product.id, selectedColor, selectedDimension)
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id,
          product,
          quantity,
          selectedColor,
          selectedDimension,
        },
      })
    },
    [],
  )

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' })
  }, [])

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' })
  }, [])

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0)
  }, [state.items])

  const totalPrice = useMemo(() => {
    return state.items.reduce((sum, item) => {
      return sum + calculateItemPrice(item.product, item.selectedDimension) * item.quantity
    }, 0)
  }, [state.items])

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen: state.isCartOpen,
      openCart,
      closeCart,
    }),
    [state.items, state.isCartOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, totalItems, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
