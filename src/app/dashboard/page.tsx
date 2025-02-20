'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { 
  TicketIcon, 
  HeartIcon,
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import UpcomingEvents from '@/components/dashboard/UpcomingEvents'
import SavedEvents from '@/components/dashboard/SavedEvents'
import PastEvents from '@/components/dashboard/PastEvents'
import Profile from '@/components/dashboard/Profile'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: 'Upcoming Events', icon: CalendarIcon },
    { name: 'Saved Events', icon: HeartIcon },
    { name: 'Past Events', icon: ClockIcon },
    { name: 'Profile', icon: UserCircleIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-2 rounded-xl bg-white p-1 shadow-sm mb-8">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 px-4 text-sm font-medium leading-5
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none
                  ${selected 
                    ? 'bg-primary text-white shadow' 
                    : 'text-gray-600 hover:bg-primary/[0.12] hover:text-primary'
                  }`
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <UpcomingEvents />
            </Tab.Panel>
            <Tab.Panel>
              <SavedEvents />
            </Tab.Panel>
            <Tab.Panel>
              <PastEvents />
            </Tab.Panel>
            <Tab.Panel>
              <Profile />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
