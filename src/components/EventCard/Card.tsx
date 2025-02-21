'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { format } from 'date-fns'
import { 
  CalendarIcon, 
  MapPinIcon, 
  HeartIcon as HeartOutline,
  ClockIcon,
  TicketIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'
import { Event } from '@/types/events'
import { useSession } from 'next-auth/react'
import ShareModal from '../ShareModal'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const { data: session } = useSession()
  const [isExpanded, setIsExpanded] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addItem } = useCart()
  const formattedDate = format(new Date(event.date), 'MMM d, yyyy')
  const formattedTime = format(new Date(event.date), 'h:mm a')
  const [isFavorited, setIsFavorited] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: event.id,
      title: event.title,
      price: parseFloat(event.price.toString().replace(',', '')),
      quantity: 1,
      image: event.image
    })
    toast.success('Added to cart')
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!session) {
      toast.error('Please sign in to save events')
      return
    }
    
    try {
      await toggleFavorite(event.id)
      toast.success(isFavorite(event.id) ? 'Removed from favorites' : 'Added to favorites')
    } catch (error) {
      toast.error('Failed to update favorites')
    }
  }

  return (
    <>
      <motion.div
        layout
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card Backdrop Overlay */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            relative z-50 bg-white rounded-2xl overflow-hidden
            transition-all duration-300 cursor-pointer
            ${isExpanded ? 'shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'}
          `}
          whileHover={!isExpanded ? { y: -4 } : {}}
        >
          {/* Image Section */}
          <motion.div layout className="relative aspect-[16/9]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Floating Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavoriteClick}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                {isFavorite(event.id) ? (
                  <HeartSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartOutline className="h-5 w-5 text-white" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsShareModalOpen(true)
                }}
              >
                <ShareIcon className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-0 w-full p-6 text-white">
              <motion.h3 
                layout="position"
                className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight"
              >
                {event.title}
              </motion.h3>
              <motion.div 
                layout="position"
                className="flex flex-wrap gap-4 text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary-light" />
                  {formattedDate}
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary-light" />
                  {event.location}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 space-y-6 border-t border-gray-100"
              >
                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Price per ticket</p>
                    <p className="text-3xl font-display font-bold text-primary">
                      KES {event.price}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="btn-primary"
                  >
                    <TicketIcon className="h-5 w-5 mr-2" />
                    Get Tickets
                  </motion.button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{formattedTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  {event.isVirtual && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-medium text-blue-700 mb-2">
                        Virtual Event
                      </h4>
                      <p className="text-sm text-blue-600">
                        Join link will be sent after registration
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <div>
                    <h4 className="font-display font-bold text-lg mb-3">
                      About This Event
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={event}
      />
    </>
  )
}
