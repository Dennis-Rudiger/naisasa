'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CalendarDaysIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import axios from 'axios'
import Link from 'next/link'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { QRCodeSVG } from 'qrcode.react'

interface Event {
  id: string
  title: string
  date: string
  location: string
  image: string
  category: string
}

interface Ticket {
  id: string
  quantity: number
  totalPrice: number
  status: string
  createdAt: string
  event: Event
}

export default function UpcomingEvents() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/tickets')
        
        // Filter only upcoming events
        const upcomingTickets = response.data.filter((ticket: Ticket) => 
          new Date(ticket.event.date) > new Date()
        )
        
        setTickets(upcomingTickets)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4 md:gap-6">
            <div className="rounded-lg bg-gray-200 w-24 h-24 md:w-32 md:h-32 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming events</h3>
        <p className="mt-1 text-gray-500">You haven't purchased any tickets yet</p>
        <Link href="/events" className="btn-primary mt-4 inline-flex">
          Browse Events
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Your Upcoming Event Tickets</h2>

      <div className="space-y-6">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-primary/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-48 h-48">
                <ImageWithFallback
                  src={ticket.event.image}
                  category={ticket.event.category}
                  alt={ticket.event.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{ticket.event.title}</h3>
                      <div className="text-sm text-primary font-medium">{ticket.quantity} {ticket.quantity > 1 ? 'Tickets' : 'Ticket'}</div>
                    </div>
                    
                    <div className="bg-primary-light/20 text-primary rounded-full px-3 py-1 text-xs font-medium">
                      {ticket.status}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary" />
                      {format(new Date(ticket.event.date), 'EEEE, MMM d, yyyy • h:mm a')}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
                      {ticket.event.location}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Order date</div>
                    <div className="text-sm">{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/tickets/${ticket.id}`}
                      className="btn-primary py-1.5 px-4 text-sm"
                    >
                      <TicketIcon className="h-4 w-4 mr-1.5" />
                      View Ticket
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center justify-center bg-gray-50 p-6 w-48">
                <div className="bg-white p-2 rounded-lg">
                  <QRCodeSVG 
                    value={`TICKET:${ticket.id}`} 
                    size={120} 
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
