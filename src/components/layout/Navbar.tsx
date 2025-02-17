import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, UserCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-display text-2xl text-primary hover:text-primary-dark">
              naisasa
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/events" className="nav-link">
              Discover Events
            </Link>
            {session ? (
              <>
                <Link href="/events/create" className="btn-primary">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create Event
                </Link>
                <div className="relative group">
                  <button className="nav-link flex items-center">
                    <UserCircleIcon className="w-6 h-6 mr-2" />
                    Profile
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/30">
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary/30"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/auth/signin" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile navigation items */}
          <Link href="/events" className="block nav-link">
            Discover Events
          </Link>
          {session ? (
            <>
              <Link href="/events/create" className="block nav-link">
                Create Event
              </Link>
              <Link href="/dashboard" className="block nav-link">
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="block w-full text-left nav-link"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="block nav-link">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
