'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import Cart from '@/components/Cart'

export default function Navbar() {
  const { data: session } = useSession()
  const { state } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Naisasa"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-8">
              {session ? (
                <>
                  {/* Cart */}
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 hover:text-primary">
                      <UserCircleIcon className="h-6 w-6" />
                      <span>{session.user?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-50">
                        Dashboard
                      </Link>
                      <button 
                        onClick={() => signOut()} 
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/auth/login" className="btn-secondary">
                    Sign in
                  </Link>
                  <Link href="/auth/register" className="btn-primary">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Slideover */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
