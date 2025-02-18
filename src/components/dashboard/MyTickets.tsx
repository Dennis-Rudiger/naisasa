'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TicketIcon, QrCodeIcon } from '@heroicons/react/24/outline'

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
    fetchTickets()
  }, [])

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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <TicketIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
          <p className="text-gray-500">When you buy tickets, they will appear here.</p>
        </div>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src={ticket.event.image}
                  alt={ticket.event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{ticket.event.title}</h3>
                <div className="mt-1 text-sm text-gray-500">
                  <p>{new Date(ticket.event.date).toLocaleDateString()}</p>
                  <p>{ticket.event.location}</p>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'}
                  </span>
                  <span className="text-sm text-primary font-medium">
                    KES {ticket.totalPrice.toFixed(2)}
                  </span>
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : ''}
                    ${ticket.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${ticket.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                    ${ticket.status === 'USED' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg">
                <QrCodeIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
