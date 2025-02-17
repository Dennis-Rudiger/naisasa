import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Events background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-down">
            Discover Amazing Events Near You
          </h1>
          <p className="text-xl mb-8 text-secondary animate-fade-up">
            Find and book tickets for the best local events, concerts, and experiences
          </p>
          
          <div className="flex items-center max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-full p-2">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full bg-transparent border-none text-white placeholder-white/70 focus:ring-0 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn-accent">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/events?category=${category.name}`}
                className="group hover-lift hover-glow"
              >
                <div className="aspect-square rounded-2xl bg-white p-6 flex flex-col items-center justify-center text-center">
                  <category.icon className="h-12 w-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <h3 className="font-display font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold">Featured Events</h2>
            <Link href="/events" className="btn-primary">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="card hover-lift hover-glow"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{event.date}</p>
                <div className="flex justify-between items-center">
                  <span className="text-success font-medium">KES {event.price}</span>
                  <span className="text-sm text-gray-500">{event.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Dummy data - replace with actual API calls
const categories = [
  { id: 1, name: 'Music', icon: MagnifyingGlassIcon },
  { id: 2, name: 'Sports', icon: MagnifyingGlassIcon },
  // Add more categories
];

const featuredEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    date: 'Aug 15, 2024',
    price: '2,500',
    location: 'Nairobi',
    image: '/images/event1.jpg',
  },
  // Add more events
];
