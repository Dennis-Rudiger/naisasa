import Link from 'next/link'
import Image from 'next/image'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid layout for footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Naisasa"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-gray-300 text-sm">
              Your one-stop platform for discovering and booking amazing events in Kenya.
            </p>
            <div className="space-y-2">
              <a href="tel:+254712345678" className="flex items-center text-sm text-gray-300 hover:text-white">
                <PhoneIcon className="h-4 w-4 mr-2" />
                +254 712 345 678
              </a>
              <a href="mailto:info@naisasa.com" className="flex items-center text-sm text-gray-300 hover:text-white">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                info@naisasa.com
              </a>
              <div className="flex items-center text-sm text-gray-300">
                <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <Link href="/events" className="text-gray-300 hover:text-white text-sm">
                Browse Events
              </Link>

              <Link href="/contact" className="text-gray-300 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <Link href="/events/music" className="text-gray-300 hover:text-white text-sm">
                Music
              </Link>
              <Link href="/events/sports" className="text-gray-300 hover:text-white text-sm">
                Sports
              </Link>
              <Link href="/events/arts" className="text-gray-300 hover:text-white text-sm">
                Arts & Theatre
              </Link>
              <Link href="/events/food" className="text-gray-300 hover:text-white text-sm">
                Food & Drinks
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 text-sm bg-white/10 rounded-lg border border-white/20 
                         placeholder-gray-400 text-white focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm bg-accent hover:bg-accent/90 rounded-lg 
                         transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Naisasa. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
