'use client'

import { type PropsWithChildren } from 'react'
import { CartProvider } from '@/providers/cart-provider'

export function Providers({ children }: PropsWithChildren) {
  return <CartProvider>{children}</CartProvider>
}
