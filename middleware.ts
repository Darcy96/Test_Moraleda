import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🔒 List of routes that require authentication
const protectedRoutes = ['/transfers'];

/**
 * 🌐 Middleware function to handle authentication and route protection.
 * 
 * This middleware:
 * - Redirects authenticated users away from `/auth` to `/transfers`.
 * - Protects specific routes (`protectedRoutes`) by ensuring users are authenticated.
 * - Allows public access to other routes.
 * 
 * @param request - The incoming Next.js request object.
 * @returns A response object to redirect or continue the request.
 */
export function middleware(request: NextRequest) {
    // 🍪 Retrieve authentication token and user role from cookies
    const authToken = request.cookies.get('auth-token');
    const userRole = request.cookies.get('user-role');

    // 🚫 If the user is authenticated and tries to access `/auth`, redirect them to `/transfers`
    if (request.nextUrl.pathname === '/auth' && authToken) {
        return NextResponse.redirect(new URL('/transfers', request.url));
    }

    // 🔐 Protect specified routes by verifying authentication
    if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        // If the user is not authenticated or lacks a role, redirect to the login page
        if (!authToken || !userRole) {
            const loginUrl = new URL('/auth', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // ✅ Allow the request to proceed
    return NextResponse.next();
}
