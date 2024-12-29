import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname

    // Define public paths
    const isPublicPath = path === "/login" || path === '/signup' || path === '/verifyemail'
    const token = request.cookies.get("token")?.value || ''

    // Redirect to home if user is already logged in and trying to access login, signup, or verifyemail
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    // Redirect to login if trying to access protected routes without token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// Define paths to apply the middleware to
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',
    '/logout'
  ],
}
