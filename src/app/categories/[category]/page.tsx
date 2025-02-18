import Image from 'next/image'
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { notFound } from 'next/navigation'

const categoryData = {
  music: {
    title: "Music Events",
    description: "Experience live performances, concerts, and festivals",
    coverImage: "/images/categories/music-header.jpg",
    events: [
      {
        id: 1,
        title: "Jazz Night Live",
        date: "Mar 15, 2024",
        location: "Nairobi CBD",
        price: "1,500",
        image: "/images/events/jazz.jpg",
        description: "An evening of smooth jazz and soul music"
      },
      // Add more music events...
    ]
  },
  sports: {
    title: "Sports Events",
    description: "Catch exciting matches, tournaments, and competitions",
    coverImage: "/images/categories/sports-header.jpg",
    events: [
      {
        id: 1,
        title: "Marathon 2024",
        date: "Apr 20, 2024",
        location: "Mombasa Road",
        price: "2,000",
        image: "/images/events/marathon.jpg",
        description: "Annual city marathon with prizes"
      },
      // Add more sports events...
    ]
  },
  // Add other categories...
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category as keyof typeof categoryData]
  
  if (!category) {
    notFound()
  }

  return (
    <div>
      {/* Category Header */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={category.coverImage}
            alt={category.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
          <p className="text-xl text-gray-200">{category.description}</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.events.map((event) => (
            <div key={event.id} className="card hover-lift">
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center text-gray-500 mb-2">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPinIcon className="h-5 w-5 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  KES {event.price}
                </span>
                <button className="btn-primary">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
