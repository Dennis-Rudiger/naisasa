import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { notFound } from 'next/navigation'

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  price: string
  image: string
  seats: number
}

interface CategoryEvents {
  [key: string]: Event[]
}

interface PageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: PageProps) {
  const category = params.category.toLowerCase()
  
  // Validate category exists
  if (!Object.keys(categoryEvents).includes(category)) {
    notFound()
  }

  const events = categoryEvents[category]

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-4 capitalize">{category} Events</h1>
          <p className="text-gray-600 max-w-2xl">
            Discover amazing {category.toLowerCase()} events happening near you. Book your tickets now!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link 
              key={event.id}
              href={`/events/${category}/${event.id}`}
              className="card hover-lift hover-glow overflow-hidden"
            >
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-xl mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">KES {event.price}</span>
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {event.seats} seats left
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Add metadata generation
export async function generateMetadata({ params }: PageProps) {
  const category = params.category.toLowerCase()
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Events | Naisasa`,
    description: `Discover amazing ${category} events happening near you.`,
  }
}

// Update static params generation
export function generateStaticParams() {
  const categories = ['music', 'sports', 'arts', 'food']
  return categories.map((category) => ({
    category: category,
  }))
}

// Update categoryEvents to use lowercase keys
const categoryEvents: CategoryEvents = {
  'music': [
    {
      id: 1,
      title: 'Summer Jazz Festival',
      description: 'Experience the best of jazz music with international and local artists.',
      date: 'Aug 15, 2024',
      location: 'Nairobi Arboretum',
      price: '2,500',
      image: '/images/events/music/jazz-festival.jpg',
      seats: 150
    },
    {
      id: 2,
      title: 'Rock Night Live',
      description: 'A night of classic and modern rock with top local bands.',
      date: 'Sep 5, 2024',
      location: 'KICC Ground',
      price: '1,800',
      image: '/images/events/music/rock-night.jpg',
      seats: 200
    },
    {
      id: 3,
      title: 'Afrobeats Festival',
      description: 'Celebrate African music with top artists from across the continent.',
      date: 'Oct 20, 2024',
      location: 'Uhuru Gardens',
      price: '3,000',
      image: '/images/events/music/afrobeats.jpg',
      seats: 300
    }
  ],
  'sports': [
    {
      id: 1,
      title: 'Marathon Challenge 2024',
      description: 'Join the biggest marathon event in East Africa.',
      date: 'Sep 10, 2024',
      location: 'Ngong Road',
      price: '1,500',
      image: '/images/events/sports/marathon.jpg',
      seats: 500
    },
    {
      id: 2,
      title: 'Soccer Tournament Finals',
      description: 'Watch the exciting finals of the national soccer tournament.',
      date: 'Oct 15, 2024',
      location: 'Kasarani Stadium',
      price: '1,000',
      image: '/images/events/sports/soccer.jpg',
      seats: 1000
    },
    {
      id: 3,
      title: 'Rugby Sevens',
      description: 'International rugby sevens tournament featuring top teams.',
      date: 'Nov 1, 2024',
      location: 'Nyayo Stadium',
      price: '2,000',
      image: '/images/events/sports/rugby.jpg',
      seats: 800
    }
  ],
  'arts': [
    {
      id: 1,
      title: 'Contemporary Art Exhibition',
      description: 'Featuring works from emerging African artists.',
      date: 'Oct 1, 2024',
      location: 'National Museum',
      price: '800',
      image: '/images/events/arts/exhibition.jpg',
      seats: 100
    },
    {
      id: 2,
      title: 'Photography Workshop',
      description: 'Learn from professional photographers in this hands-on workshop.',
      date: 'Oct 8, 2024',
      location: 'Kenya Cultural Centre',
      price: '1,500',
      image: '/images/events/arts/photography.jpg',
      seats: 50
    },
    {
      id: 3,
      title: 'Theater Performance',
      description: 'A compelling drama about Kenyan history and culture.',
      date: 'Oct 15, 2024',
      location: 'Kenya National Theatre',
      price: '1,200',
      image: '/images/events/arts/theater.jpg',
      seats: 150
    }
  ],
  'food': [
    {
      id: 1,
      title: 'Food & Wine Festival',
      description: 'Taste exceptional cuisines and fine wines from around the world.',
      date: 'Nov 5, 2024',
      location: 'Carnivore Gardens',
      price: '3,500',
      image: '/images/events/food/food-festival.jpg',
      seats: 200
    },
    {
      id: 2,
      title: 'Street Food Festival',
      description: 'Experience the best of local street food culture.',
      date: 'Nov 12, 2024',
      location: 'Nairobi Street Kitchen',
      price: '1,000',
      image: '/images/events/food/street-food.jpg',
      seats: 300
    },
    {
      id: 3,
      title: 'Coffee & Chocolate Fair',
      description: 'Discover premium coffee and chocolate from local producers.',
      date: 'Nov 19, 2024',
      location: 'Sarit Centre',
      price: '1,500',
      image: '/images/events/food/coffee.jpg',
      seats: 150
    }
  ]
}
