'use client'

import { useCart } from '@/context/CartContext'
import { CalendarIcon, MapPinIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
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
}

export default function EventCard({ event }: EventCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: event.id,
      title: event.title,
      price: parseFloat(event.price.replace(',', '')),
      quantity: 1,
      image: event.image
    })
    toast.success('Added to cart')
  }

  return (
    <div className="card hover-lift hover-glow">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/events/${event.id}`}>
            <h3 className="font-display font-bold text-xl hover:text-primary transition-colors">
              {event.title}
            </h3>
          </Link>
          <span className="text-success font-medium">
            KES {event.price}
          </span>
        </div>
        <div className="space-y-2 text-gray-600 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
