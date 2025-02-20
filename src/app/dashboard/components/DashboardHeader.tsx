'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
        >
          <div className="text-center sm:text-left">
            <h1 className="dashboard-title text-white">
              Welcome, {session?.user?.name || 'Guest'}
            </h1>
            <p className="dashboard-text text-white/80 mt-1">
              Manage your events and tickets
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
