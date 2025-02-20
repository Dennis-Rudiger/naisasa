'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TicketIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface Ticket {
  id: string
  eventId: string
  event: {
    title: string
    date: Date
    location: string
    image: string
  }
  quantity: number
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'USED'
}

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets/my-tickets')
        const data = await response.json()
        setTickets(data)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse dashboard-card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-32 aspect-video sm:aspect-square bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-card text-center py-12"
        >
          <TicketIcon className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No tickets yet</h3>
          <p className="mt-2 text-gray-500">When you buy tickets, they will appear here</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative w-full sm:w-32 aspect-video sm:aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={ticket.event.image}
                    alt={ticket.event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-medium truncate">{ticket.event.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : ''}
                      ${ticket.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${ticket.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                      ${ticket.status === 'USED' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {ticket.status}
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                    <div>
                      <p className="font-medium">Date</p>
                      <p>{new Date(ticket.event.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tickets</p>
                      <p>{ticket.quantity}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total</p>
                      <p>KES {ticket.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="dashboard-button bg-primary text-white hover:bg-primary-dark">
                      View Ticket
                    </button>
                    <button className="dashboard-button bg-gray-100 text-gray-700 hover:bg-gray-200">
                      <QrCodeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
