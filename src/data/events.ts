import type { Event } from '@/types/events'

const virtualEvents: Event[] = [
  {
    id: 'v1',
    title: 'Tech Conference 2024',
    description: 'Join leading tech experts for a day of innovation and learning. Featuring workshops, keynotes, and networking opportunities.',
    date: '2024-03-15T09:00:00',
    location: 'Online',
    price: '1,500',
    image: '/images/tech-conf.jpg',
    isVirtual: true,
    virtualLink: 'https://meet.google.com/virtual-conference'
  },
  {
    id: 'v2',
    title: 'Digital Art Workshop',
    description: 'Learn digital art techniques from professional artists. Perfect for beginners and intermediate artists.',
    date: '2024-04-01T14:00:00',
    location: 'Online',
    price: '800',
    image: '/images/art-virtual.jpg',
    isVirtual: true,
    virtualLink: 'https://zoom.us/art-workshop'
  },
  {
    id: 'v3',
    title: 'Virtual Fitness Class',
    description: 'Stay fit with our expert-led virtual fitness class. Suitable for all fitness levels.',
    date: '2024-03-20T17:30:00',
    location: 'Online',
    price: '500',
    image: '/images/fitness.jpg',
    isVirtual: true,
    virtualLink: 'https://zoom.us/fitness-class'
  }
]

const musicEvents: Event[] = [
  {
    id: 'm1',
    title: 'Summer Music Festival',
    description: 'A day of amazing live performances featuring top local and international artists.',
    date: '2024-07-15T12:00:00',
    location: 'Carnivore Grounds, Nairobi',
    price: '2,500',
    image: '/images/concert.jpg',
  },
  {
    id: 'm2',
    title: 'Jazz Night Under Stars',
    description: 'An evening of smooth jazz and fine dining under the stars.',
    date: '2024-04-20T19:00:00',
    location: 'Karen Blixen Coffee Garden',
    price: '3,000',
    image: '/images/jazz.jpg',
  },
  {
    id: 'm3',
    title: 'Classical Music Concert',
    description: 'Experience the magic of classical music performed by the National Symphony Orchestra.',
    date: '2024-05-10T18:00:00',
    location: 'Kenya National Theatre',
    price: '1,500',
    image: '/images/classical.jpg',
  }
]

const sportsEvents: Event[] = [
  {
    id: 's1',
    title: 'Marathon 2024',
    description: 'Annual city marathon promoting health and fitness in the community.',
    date: '2024-06-01T06:00:00',
    location: 'Uhuru Gardens',
    price: '1,000',
    image: '/images/marathon.jpg',
  },
  {
    id: 's2',
    title: 'Rugby Tournament',
    description: 'Exciting rugby matches featuring top teams from across the region.',
    date: '2024-05-15T14:00:00',
    location: 'RFUEA Ground',
    price: '500',
    image: '/images/rugby.jpg',
  },
  {
    id: 's3',
    title: 'Basketball Championship',
    description: 'National basketball championship finals with the countrys best teams.',
    date: '2024-04-30T15:00:00',
    location: 'Kasarani Indoor Arena',
    price: '300',
    image: '/images/basketball.jpg',
  }
]

const artEvents: Event[] = [
  {
    id: 'a1',
    title: 'Art Exhibition',
    description: 'Contemporary art exhibition featuring works from emerging local artists.',
    date: '2024-04-05T10:00:00',
    location: 'National Museum',
    price: '0',
    image: '/images/art-gallery.jpg',
    isFree: true
  },
  {
    id: 'a2',
    title: 'Photography Workshop',
    description: 'Learn photography basics and advanced techniques from professional photographers.',
    date: '2024-03-25T09:00:00',
    location: 'iHub Nairobi',
    price: '1,500',
    image: '/images/photography.jpg',
  },
  {
    id: 'a3',
    title: 'Street Art Festival',
    description: 'Celebrate urban art culture with live painting, music, and food.',
    date: '2024-05-20T11:00:00',
    location: 'Nairobi CBD',
    price: '0',
    image: '/images/street-art.jpg',
    isFree: true
  }
]

const foodEvents: Event[] = [
  {
    id: 'f1',
    title: 'Food & Wine Festival',
    description: 'Experience the finest local cuisines paired with international wines.',
    date: '2024-06-10T12:00:00',
    location: 'Westgate Mall',
    price: '3,500',
    image: '/images/food-fest.jpg',
  },
  {
    id: 'f2',
    title: 'Cooking Masterclass',
    description: 'Learn to cook authentic dishes from professional chefs.',
    date: '2024-04-15T10:00:00',
    location: 'Culinary Institute',
    price: '2,000',
    image: '/images/cooking.jpg',
  },
  {
    id: 'f3',
    title: 'Street Food Festival',
    description: 'Celebrate local street food culture with vendors from across the city.',
    date: '2024-05-01T11:00:00',
    location: 'Ngong Road',
    price: '500',
    image: '/images/street-food.jpg',
  }
]

export const getFreeEvents = () => {
  return [
    artEvents[0],
    artEvents[2],
    // Add more free events
  ]
}

export const getVirtualEvents = () => {
  return virtualEvents
}

export const getTrendingEvents = () => {
  return [
    musicEvents[0],
    foodEvents[0],
    sportsEvents[0],
    // Add more trending events
  ]
}

export const getEventsByCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'music':
      return musicEvents
    case 'sports':
      return sportsEvents
    case 'arts':
      return artEvents
    case 'food':
      return foodEvents
    default:
      return []
  }
}
