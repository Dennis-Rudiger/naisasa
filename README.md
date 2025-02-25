# Naisasa Events Platform

A modern event ticketing and management platform built with Next.js 14, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Cloudinary account (for image uploads)
- M-Pesa API credentials (for payments)

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/naisasa.git
cd naisasa
```

2. Install dependencies:
```bash
npm install
```

3. Copy .env.example to .env and update the variables:
```bash
cp .env.example .env
```

Required environment variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/naisasa"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
MPESA_CONSUMER_KEY=""
MPESA_CONSUMER_SECRET=""
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Payment**: M-Pesa Integration
- **Image Upload**: Cloudinary
- **State Management**: React Context

## 🎯 Current Features

- User authentication (login/register)
- Event browsing and searching
- Category-based event filtering
- Shopping cart functionality
- Secure checkout process
- User dashboard
- Ticket management
- Responsive design

## 🌟 Planned Features

### User Experience
- [ ] Advanced search filters
- [ ] Event recommendations
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Push notifications
- [ ] User reviews and ratings
- [ ] Social sharing

### Event Management
- [ ] Event creation wizard
- [ ] Multiple ticket types
- [ ] Seating arrangements
- [ ] Bulk ticket sales
- [ ] Discount codes
- [ ] Early bird pricing
- [ ] Waitlist management

### Payment & Ticketing
- [ ] Multiple payment methods
- [ ] QR code tickets
- [ ] Ticket transfer
- [ ] Refund processing
- [ ] Group bookings
- [ ] Gift tickets

### Analytics & Reporting
- [ ] Sales analytics
- [ ] Event performance metrics
- [ ] User behavior tracking
- [ ] Revenue reports
- [ ] Attendance tracking

### Social Features
- [ ] Follow organizers
- [ ] Event comments
- [ ] Social media integration
- [ ] Event sharing
- [ ] User profiles

### Additional Enhancements
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support
- [ ] Calendar integration
- [ ] Maps integration
- [ ] Virtual event support

## 📁 Project Structure

```
naisasa/
├── src/
│   ├── app/              # App router pages
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript types
│   ├── styles/          # Global styles
│   └── context/         # React context
├── prisma/              # Database schema
├── public/              # Static assets
└── tests/              # Test files
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for deployment platform
- Prisma team for the great ORM
- Tailwind CSS team for the utility-first CSS framework

## 🔗 Links

- [Documentation](https://docs.naisasa.com)
- [Live Demo](https://naisasa.vercel.app)
- [API Reference](https://api.naisasa.com)

## 📧 Contact

For questions and support, please email [support@naisasa.com](mailto:support@naisasa.com)

## Suggested Features to Implement

### 1. User Experience Enhancements
- [ ] Push Notifications for event reminders
- [ ] Email notifications for ticket purchases and event updates
- [ ] In-app messaging system between event organizers and attendees
- [ ] Dark mode support
- [ ] Language localization (English and Swahili)

### 2. Payment and Ticketing
- [ ] Multiple payment methods integration (M-Pesa, cards, bank transfer)
- [ ] Group booking discounts
- [ ] Promo code system
- [ ] Ticket resale marketplace
- [ ] Flexible refund policies

### 3. Event Management
- [ ] Recurring events support
- [ ] Waitlist system for sold-out events
- [ ] Event series management
- [ ] Dynamic pricing based on demand
- [ ] Capacity management with seating plans

### 4. Social Features
- [ ] Event sharing with social media integration
- [ ] Event reviews and ratings
- [ ] User profiles with event history
- [ ] Follow organizers and venues
- [ ] Event recommendations based on user preferences

### 5. Content and Media
- [ ] Live streaming integration for virtual events
- [ ] Event photo galleries
- [ ] Video highlights
- [ ] Interactive venue maps
- [ ] Virtual venue tours

### 6. Analytics and Reporting
- [ ] Event performance metrics
- [ ] Sales analytics dashboard
- [ ] Attendee demographics
- [ ] Marketing campaign tracking
- [ ] Revenue reports

### 7. Security and Verification
- [ ] Two-factor authentication
- [ ] Ticket validation system
- [ ] Fraud prevention measures
- [ ] Blockchain-based ticket verification
- [ ] Identity verification for high-value purchases

### 8. Mobile Experience
- [ ] Progressive Web App (PWA) support
- [ ] Mobile ticket scanning
- [ ] Offline functionality
- [ ] Location-based event discovery
- [ ] Mobile wallet integration

### 9. Organizer Tools
- [ ] Bulk ticket management
- [ ] Custom registration forms
- [ ] Event cloning
- [ ] Staff management
- [ ] Check-in app for organizers

### 10. Integration Features
- [ ] Calendar integration (Google, Apple, Outlook)
- [ ] CRM integration
- [ ] Social media automation
- [ ] Hotel and transport booking integration
- [ ] Weather updates for outdoor events

## Implementation Priority

High Priority:
1. Push Notifications
2. Multiple Payment Methods
3. Event Reviews System
4. Mobile Responsiveness
5. Analytics Dashboard

Medium Priority:
1. Social Features
2. Promo Codes
3. Event Series Management
4. Two-factor Authentication
5. Calendar Integration

Low Priority:
1. Live Streaming
2. Blockchain Verification
3. Virtual Tours
4. Hotel Booking Integration
5. Weather Updates

## Technical Requirements

```json
{
  "dependencies": {
    "@tanstack/react-query": "latest",
    "firebase": "latest",
    "socket.io-client": "latest",
    "web-push": "latest",
    "react-big-calendar": "latest",
    "chart.js": "latest",
    "@stripe/stripe-js": "latest"
  }
}
```

## API Endpoints to Add

```typescript
// New API routes to implement
/api/notifications
/api/analytics
/api/reviews
/api/waitlist
/api/promo-codes
/api/streaming
/api/check-in
```

## Database Schema Updates

```prisma
// New models to add to schema.prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  userId    String
  eventId   String
  // ...
}

model Notification {
  id        String   @id @default(cuid())
  type      String
  message   String
  userId    String
  // ...
}

model PromoCode {
  id        String   @id @default(cuid())
  code      String   @unique
  discount  Float
  // ...
}
```

Each feature should be implemented in a separate branch following the naming convention:
`feature/feature-name`

## Getting Started with Implementation

1. Create a new feature branch
2. Install required dependencies
3. Update database schema
4. Create API endpoints
5. Implement UI components
6. Write tests
7. Submit PR for review
