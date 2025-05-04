import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { nextUrl } = req
  const isAuthPage = nextUrl.pathname.startsWith("/auth")

  // Check the session token (depends on http/https)
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value

  const isAuthenticated = !!token

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && (nextUrl.pathname.startsWith("/saved-trips") || nextUrl.pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }

  // Redirect authenticated users trying to access login/signup
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next()
}

// Limit middleware to relevant paths only
export const config = {
  matcher: ["/saved-trips/:path*", "/profile/:path*", "/auth/:path*"],
}
