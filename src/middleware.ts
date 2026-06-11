import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const gymAdminRoutes = ["/dashboard", "/members", "/classes", "/transfers", "/benchmarks", "/billing", "/branding", "/staff", "/settings"];
  const isGymAdminRoute = gymAdminRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));

  if (isGymAdminRoute) {
    const token = request.cookies.get("auth_token_gym");
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/platform")) {
    const token = request.cookies.get("auth_token_platform");
    if (!token) {
      const loginUrl = new URL("/platform-login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/members/:path*",
    "/classes/:path*",
    "/transfers/:path*",
    "/benchmarks/:path*",
    "/billing/:path*",
    "/branding/:path*",
    "/staff/:path*",
    "/settings/:path*",
    "/platform/:path*",
  ],
};
