import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { 
  HomeIcon, 
  TicketIcon, 
  PlusCircleIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Events', href: '/events', icon: TicketIcon },
    ...(session ? [
      { name: 'Create Event', href: '/events/create', icon: PlusCircleIcon },
      { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon },
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-display text-2xl font-bold text-primary">
              naisasa
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link flex items-center ${
                  router.pathname === item.href ? 'bg-secondary/30' : ''
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
            
            {session ? (
              <button
                onClick={() => signOut()}
                className="btn-secondary"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/auth/signin" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-primary hover:bg-secondary/30"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link flex items-center ${
                  router.pathname === item.href ? 'bg-secondary/30' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
            
            {session ? (
              <button
                onClick={() => signOut()}
                className="w-full text-left nav-link"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                href="/auth/signin" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
