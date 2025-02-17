import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Redirect authenticated users away from signin page
    if (request.nextUrl.pathname.startsWith('/auth/signin') && request.nextauth.token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/events/create',
    '/events/edit/:path*',
    '/auth/signin',
  ],
};
