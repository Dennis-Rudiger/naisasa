import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Naisasa Events',
  description: 'Find and book local events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="bottom-center"
            containerStyle={{
              bottom: 40,
              left: 20,
              right: 20,
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
