import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })
  const isAuthenticated = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

  if (!isAuthenticated && (req.nextUrl.pathname.startsWith("/saved-trips") || req.nextUrl.pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/auth/signin", req.url))
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/saved-trips/:path*", "/profile/:path*", "/auth/:path*"]
}
