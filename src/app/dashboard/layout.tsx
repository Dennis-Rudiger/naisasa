'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  TicketIcon, 
  HeartIcon, 
  UserIcon, 
  KeyIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'

const navItems = [
  { name: 'My Tickets', icon: TicketIcon, href: '/dashboard' },
  { name: 'Saved Events', icon: HeartIcon, href: '/dashboard/saved' },
  { name: 'Account Settings', icon: UserIcon, href: '/dashboard/settings' },
  { name: 'Security', icon: KeyIcon, href: '/dashboard/security' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-64 py-8">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => router.push(item.href)}
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
              })}
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
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
