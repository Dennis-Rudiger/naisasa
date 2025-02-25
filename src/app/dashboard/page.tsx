'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tab } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarDaysIcon as CalendarIcon,
  HeartIcon,
  ClockIcon,
  UserIcon,
  TicketIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import SavedEvents from './components/SavedEvents'
import UpcomingEvents from './components/UpcomingEvents'
import PastEvents from './components/PastEvents'
import Profile from './components/Profile'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const tabs = [
  { name: 'Upcoming', icon: CalendarIcon, color: 'bg-primary/10 text-primary' },
  { name: 'Saved', icon: HeartIcon, color: 'bg-pink-100 text-pink-600' },
  { name: 'Past', icon: ClockIcon, color: 'bg-purple-100 text-purple-600' },
  { name: 'Profile', icon: UserIcon, color: 'bg-blue-100 text-blue-600' },
]

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(0)
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Set the active tab based on URL query parameter
  useEffect(() => {
    if (tabParam) {
      switch(tabParam.toLowerCase()) {
        case 'upcoming':
          setSelectedTab(0)
          break
        case 'saved':
          setSelectedTab(1)
          break
        case 'past':
          setSelectedTab(2)
          break
        case 'profile':
          setSelectedTab(3)
          break
        default:
          setSelectedTab(0)
      }
    }
  }, [tabParam])
  
  // Update URL when tab changes
  const handleTabChange = (index: number) => {
    setSelectedTab(index)
    const tabNames = ['upcoming', 'saved', 'past', 'profile']
    router.push(`/dashboard?tab=${tabNames[index]}`, { scroll: false })
  }
  
  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center h-[70vh] flex-col">
        <Image 
          src="/images/auth-required.svg" 
          alt="Authentication required" 
          width={300} 
          height={300} 
        />
        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">Authentication Required</h2>
        <p className="text-gray-600 mb-4">Please sign in to access your dashboard</p>
        <a href="/auth/login" className="btn-primary">Sign In</a>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto"></div>
          <div className="h-72 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Dashboard Header */}
        <div className="mb-8 md:mb-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                Your Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {session?.user?.name || 'Guest'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-4 py-2"
                  aria-label="Notifications"
                >
                  <BellIcon className="h-5 w-5 mr-2" />
                  <span>Notifications</span>
                </motion.button>
              </div>
              
              {/* Mobile menu toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline px-4 py-2 border border-gray-300 rounded-full hover:border-primary flex items-center sm:hidden"
                aria-label="Options"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: 'Events Attended', value: '12', icon: TicketIcon, color: 'bg-blue-50 text-blue-500' },
            { label: 'Saved Events', value: '8', icon: HeartIcon, color: 'bg-pink-50 text-pink-500' },
            { label: 'Upcoming Events', value: '3', icon: CalendarIcon, color: 'bg-primary/10 text-primary' },
            { label: 'Reward Points', value: '270', icon: CalendarIcon, color: 'bg-purple-50 text-purple-500' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`${stat.color} p-3 rounded-lg w-fit mb-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-display font-bold mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Desktop Tabs */}
        <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
          <Tab.List className="grid grid-cols-4 gap-2 sm:flex sm:space-x-2 rounded-xl bg-white p-2 shadow-sm mb-6 border border-gray-100">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 px-3 md:px-4 text-sm font-medium leading-5 
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none
                  flex flex-col items-center sm:flex-row sm:justify-center 
                  transition-all duration-200
                  ${selected 
                    ? 'bg-primary text-white shadow' 
                    : 'text-gray-600 hover:bg-primary/5'
                  }`
                }
              >
                <tab.icon className="h-5 w-5 sm:mr-2 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <UpcomingEvents />
              </motion.div>
            </Tab.Panel>
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <SavedEvents />
              </motion.div>
            </Tab.Panel>
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <PastEvents />
              </motion.div>
            </Tab.Panel>
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <Profile />
              </motion.div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-1 pt-5 pb-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                    Profile
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <BellIcon className="h-5 w-5 text-gray-500 mr-3" />
                    Notifications
                    <span className="ml-auto bg-primary text-white py-0.5 px-2 rounded-full text-xs">
                      3
                    </span>
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/help"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    Help Center
                  </Link>
                  <button
                    className="flex w-full items-center px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
