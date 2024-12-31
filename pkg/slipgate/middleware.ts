import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("redirect", request.url);
    return Response.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     */
    "/((?!_next/static/.*|_next/image/.*|assets/.*|auth/.*|auth|favicon.ico))",
  ],
}; 
