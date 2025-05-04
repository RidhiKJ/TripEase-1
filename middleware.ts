import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthenticated = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (!isAuthenticated && (req.nextUrl.pathname.startsWith("/saved-trips") || req.nextUrl.pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/saved-trips/:path*", "/profile/:path*", "/auth/:path*"],
};
