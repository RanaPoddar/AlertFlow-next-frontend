import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// Auth routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup'];

// Public routes that don't require authentication
const publicRoutes = ['/', '/about', '/contact', '/pricing'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated via NextAuth
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // Check if user is authenticated via custom JWT
  const customToken = request.headers.get('authorization')?.replace('Bearer ', '');
  
  const isAuthenticated = !!(token || customToken);
  
  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Handle auth routes
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
