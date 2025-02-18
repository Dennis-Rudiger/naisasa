'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { TicketIcon, CalendarIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline'
import MyTickets from '@/components/dashboard/MyTickets'
import SavedEvents from '@/components/dashboard/SavedEvents'
import PurchaseHistory from '@/components/dashboard/PurchaseHistory'
import UpcomingEvents from '@/components/dashboard/UpcomingEvents'

export default function Dashboard() {
  const tabs = [
    { name: 'My Tickets', icon: TicketIcon, component: MyTickets },
    { name: 'Saved Events', icon: HeartIcon, component: SavedEvents },
    { name: 'Purchase History', icon: ClockIcon, component: PurchaseHistory },
    { name: 'Upcoming Events', icon: CalendarIcon, component: UpcomingEvents },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Tab.Group>
        <Tab.List className="flex space-x-4 overflow-x-auto pb-4">
          {tabs.map(({ name, icon: Icon }) => (
            <Tab
              key={name}
              className={({ selected }) =>
                `flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  selected
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white hover:bg-gray-50'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8">
          {tabs.map(({ name, component: Component }) => (
            <Tab.Panel key={name}>
              <Component />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
