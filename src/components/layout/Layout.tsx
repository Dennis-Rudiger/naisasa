import Navbar from './Navbar'
import Navigation from './Navigation'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="bg-primary-dark text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-secondary">© 2024 naisasa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
