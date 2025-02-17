import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';

export default function EventDetails() {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Event Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/event-detail.jpg"
              alt="Event name"
              fill
              className="object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold mb-4">Summer Music Festival</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Aug 15, 2024</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>Nairobi</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p>
                Join us for an unforgettable evening of music and entertainment...
              </p>
            </div>

            {/* Ticket Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-xl mb-4">Get Tickets</h3>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xl font-bold text-success">KES 2,500</p>
                  <p className="text-sm text-gray-600">per ticket</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn-secondary p-2"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn-secondary p-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="btn-primary w-full">
                <TicketIcon className="h-5 w-5 mr-2" />
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
