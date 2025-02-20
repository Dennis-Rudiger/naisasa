'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TicketIcon, 
  HeartIcon, 
  UserIcon, 
  KeyIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'

const navItems = [
  { name: 'My Tickets', icon: TicketIcon, href: '/dashboard' },
  { name: 'Saved Events', icon: HeartIcon, href: '/dashboard/saved' },
  { name: 'Account Settings', icon: UserIcon, href: '/dashboard/settings' },
  { name: 'Security', icon: KeyIcon, href: '/dashboard/security' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileNavOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Mobile Nav Toggle */}
      <div className="lg:hidden fixed top-20 right-4 z-50">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 rounded-full bg-white shadow-md"
        >
          {isMobileNavOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <nav className="hidden lg:block w-64 py-8">
            <div className="space-y-2 sticky top-24">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                  onClick={() => handleNavigation(item.href)}
                />
              ))}
              <SignOutButton />
            </div>
          </nav>

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {isMobileNavOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsMobileNavOpen(false)}
                />
                <motion.nav
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-50 p-6 pt-20 lg:hidden"
                >
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.name}
                        item={item}
                        isActive={pathname === item.href}
                        onClick={() => handleNavigation(item.href)}
                      />
                    ))}
                    <SignOutButton />
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 py-8 px-4 lg:px-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function NavItem({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: typeof navItems[number]
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
        transition-all duration-200 ${
          isActive 
            ? 'bg-primary text-white shadow-lg shadow-primary/30'
            : 'hover:bg-white hover:shadow-md text-gray-600'
        }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.name}</span>
    </motion.button>
  )
}

function SignOutButton() {
  return (
    <motion.button
      onClick={() => signOut()}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
        text-red-600 hover:bg-red-50 transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      <span className="font-medium">Sign Out</span>
    </motion.button>
  )
}
