'use client'

import { useState } from 'react'
import EventCard from '@/components/EventCard'
import { 
  CalendarDaysIcon, 
  FunnelIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'

const allEvents = [
  {
    id: 'e1',
    title: 'Summer Music Festival',
    date: 'Aug 15, 2024',
    location: 'Carnivore Grounds, Nairobi',
    price: '2,500',
    image: '/images/event1.jpg',
  },
  {
    id: 'e2',
    title: 'Tech Conference 2024',
    date: 'Sep 20, 2024',
    location: 'KICC, Nairobi',
    price: '3,000',
    image: '/images/tech1.jpg',
    isVirtual: true,
    virtualLink: 'https://zoom.us/tech-conf'
  },
  {
    id: 'e3',
    title: 'Food & Wine Festival',
    date: 'Oct 5, 2024',
    location: 'Westlands, Nairobi',
    price: '1,500',
    image: '/images/wine.jpg',
  },
  {
    id: 'e4',
    title: 'Community Workshop',
    date: 'Jul 15, 2024',
    location: 'iHub, Nairobi',
    price: '0',
    image: '/images/community.jpg',
    isFree: true
  },
  {
    id: 'e5',
    title: 'Art Exhibition',
    date: 'Aug 1, 2024',
    location: 'National Museum',
    price: '500',
    image: '/images/art.jpg',
  },
  {
    id: 'e6',
    title: 'Digital Marketing Summit',
    date: 'Sep 10, 2024',
    location: 'Online',
    price: '1,000',
    image: '/images/marketing.jpg',
    isVirtual: true,
    virtualLink: 'https://zoom.us/marketing'
  },
  {
    id: 'e7',
    title: 'Fitness Bootcamp',
    date: 'Jul 20, 2024',
    location: 'Uhuru Gardens',
    price: '800',
    image: '/images/fitness.jpg',
  },
  {
    id: 'e8',
    title: 'Comedy Night',
    date: 'Aug 25, 2024',
    location: 'Kenya National Theatre',
    price: '1,200',
    image: '/images/comedy.jpg',
  },
  {
    id: 'e9',
    title: 'Startup Networking',
    date: 'Sep 5, 2024',
    location: 'Workable, Westlands',
    price: '0',
    image: '/images/networking.jpg',
    isFree: true
  }
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'virtual' | 'free'>('all')

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'virtual') return matchesSearch && event.isVirtual
    if (selectedFilter === 'free') return matchesSearch && event.isFree
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-display font-bold flex items-center gap-3">
            <CalendarDaysIcon className="h-8 w-8 text-primary" />
            All Events
          </h1>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 sm:min-w-[300px]">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="w-full appearance-none pl-10 pr-8 py-2 rounded-lg border-gray-200 focus:border-primary focus:ring-primary bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'virtual' | 'free')}
              >
                <option value="all">All Events</option>
                <option value="virtual">Virtual Events</option>
                <option value="free">Free Events</option>
              </select>
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
