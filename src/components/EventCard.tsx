'use client'

import { useCart } from '@/context/CartContext'
import { useSession } from 'next-auth/react'
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    location: string
    price: string
    image: string
  }
  buttonText?: string
}

export default function EventCard({ event, buttonText = "Buy Tickets" }: EventCardProps) {
  const { addItem } = useCart()
  const { data: session } = useSession()

  const handleAddToCart = () => {
    addItem({
      id: event.id,
      title: event.title,
      price: parseFloat(event.price.replace(',', '')),
      quantity: 1,
      image: event.image
    })
    toast.success('Tickets added to cart')
  }

  return (
    <div className="card group hover:border-primary/30">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <span className="text-success font-medium whitespace-nowrap">
            KES {event.price}
          </span>
        </div>
        
        <div className="space-y-2 text-gray-600 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
            {event.date}
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
            {event.location}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full btn-primary flex items-center justify-center gap-2 group-hover:scale-105"
        >
          <TicketIcon className="h-5 w-5" />
          {buttonText}
        </button>
      </div>
    </div>
  )
}
