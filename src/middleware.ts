import { NextRequest, NextResponse } from "next/server";
import { AccessTokenKey } from "@/constants/strings";

export const protectedRoutes = ["/", "/admin"];
export const publicRoutes = ["/login", "/signup", "/reset-password"];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(AccessTokenKey);
  const { pathname } = request.nextUrl;

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
