import { NextResponse } from "next/server";
import { auth } from "@/auth";
import squareWasm from './square.wasm?module';

export default auth(async (req) => {
  const isAuthenticated = !!req.auth;
  const { nextUrl } = req;
  const isAuthPage = nextUrl.pathname.startsWith("/auth");

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && (nextUrl.pathname.startsWith("/saved-trips") || nextUrl.pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  // If the user is authenticated and trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // WebAssembly code logic
  const m = await WebAssembly.instantiate(squareWasm);
  const answer = m.exports.square(9);

  const response = NextResponse.next();
  response.headers.set('x-square', answer.toString());

  return response;
});

// Optionally, you can export config to match specific paths
export const config = {
  matcher: ["/saved-trips/:path*", "/profile/:path*", "/auth/:path*"],
}
