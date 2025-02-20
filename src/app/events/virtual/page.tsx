'use client'

import { motion } from 'framer-motion'
import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import EventCard from '@/components/EventCard/Card'
import { getVirtualEvents } from '@/data/events'

export default function VirtualEventsPage() {
  const virtualEvents = getVirtualEvents()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-display font-bold">
              Virtual Events
            </h1>
          </motion.div>
          <p className="text-gray-600">
            Join amazing events from anywhere in the world
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {virtualEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.3
                  }
                }
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
