'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image
              src={session?.user?.image || '/images/default-avatar.png'}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">
              Welcome, {session?.user?.name || 'Guest'}
            </h1>
            <p className="text-white/80">
              Manage your events and tickets
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
