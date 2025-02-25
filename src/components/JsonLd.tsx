'use client'

import { Event } from '@/types/events'

interface JsonLdProps {
  data: Event
}

export default function JsonLd({ data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.title,
    description: data.description,
    image: data.image,
    startDate: data.date,
    endDate: new Date(new Date(data.date).getTime() + 3 * 60 * 60 * 1000).toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: data.isVirtual 
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: data.isVirtual
      ? {
          '@type': 'VirtualLocation',
          url: 'https://naisasa.com',
        }
      : {
          '@type': 'Place',
          name: data.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.location,
            addressCountry: 'KE',
          },
        },
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      url: `https://naisasa.com/events/${data.id}`,
    },
    organizer: {
      '@type': 'Organization',
      name: data.creator?.name || 'Naisasa Events',
      url: 'https://naisasa.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
