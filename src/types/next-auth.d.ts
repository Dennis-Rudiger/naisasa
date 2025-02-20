import 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string | null
    email: string
    image?: string | null
  }

  interface Session {
    user: User & {
      id: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
  }
}
