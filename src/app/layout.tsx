import { Inter, Poppins } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '../styles/globals.css'

// Load fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7857FF'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://naisasa.com'),
  title: {
    default: 'Naisasa Events | Find and Book Local Events',
    template: '%s | Naisasa Events'
  },
  description: 'Discover and book local events in Kenya. Find concerts, workshops, sports events, and more.',
  keywords: ['events', 'tickets', 'Kenya', 'Nairobi', 'concerts', 'workshops', 'entertainment'],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://naisasa.com',
    siteName: 'Naisasa Events',
    title: 'Naisasa Events | Find and Book Local Events',
    description: 'Discover and book local events in Kenya. Find concerts, workshops, sports events, and more.',
    images: [{
      url: '/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Naisasa Events'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naisasa Events',
    description: 'Discover and book local events in Kenya',
    creator: '@naisasaevents',
    images: ['/images/twitter-card.jpg']
  },
  verification: {
    google: 'google-site-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${poppins.variable}`}
    >
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
