import Image from 'next/image'
import { CalendarIcon, MapPinIcon, TicketIcon, ClockIcon } from '@heroicons/react/24/outline'

interface PageProps {
  params: {
    category: string
    eventId: string
  }
}

export default function EventPage({ params }: PageProps) {
  // In a real app, fetch event data from API/database
  const event = {
    id: params.eventId,
    title: 'Summer Jazz Festival',
    description: 'Experience the best of jazz music with international and local artists.',
    longDescription: `Join us for an unforgettable evening of jazz music featuring both international 
    and local artists. The festival will showcase various jazz styles including bebop, swing, and contemporary jazz.
    
    Food and drinks will be available for purchase. Don't miss this amazing musical experience!`,
    date: 'Aug 15, 2024',
    time: '6:00 PM - 11:00 PM',
    location: 'Nairobi Arboretum',
    price: '2,500',
    image: '/images/events/music/jazz-festival.jpg',
    seats: 150,
    organizer: 'Jazz Kenya Foundation',
    category: params.category
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl font-display font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-5 w-5 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2" />
                {event.location}
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg mb-4">{event.description}</p>
              <h2 className="text-2xl font-display font-bold mb-4">About This Event</h2>
              <p>{event.longDescription}</p>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-2xl font-bold mb-6">Book Tickets</h3>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Price per ticket</span>
                <span className="text-2xl font-bold">KES {event.price}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <TicketIcon className="h-5 w-5" />
                <span>{event.seats} tickets remaining</span>
              </div>
              <button className="btn-primary w-full">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
