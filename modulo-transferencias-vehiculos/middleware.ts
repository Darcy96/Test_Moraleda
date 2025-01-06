// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/transfers'];

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth-token');
    const userRole = request.cookies.get('user-role');


    if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        if (!authToken || !userRole) {
            const loginUrl = new URL('/auth', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}
