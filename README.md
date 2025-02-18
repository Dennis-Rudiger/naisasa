# Naisasa Events Platform

A modern event ticketing and management platform built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

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
