'use client'

import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </FavoritesProvider>
    </SessionProvider>
  )
}
