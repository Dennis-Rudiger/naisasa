import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
