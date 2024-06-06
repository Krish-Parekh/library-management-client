import { NextRequest, NextResponse } from "next/server";
import { AccessTokenKey, RoleKey, UserIdKey } from "@/constants/strings";

export const protectedRoutes = ["/"];
export const adminRoutes = ["/admin"];
export const publicRoutes = ["/login", "/signup", "/reset-password"];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(AccessTokenKey);
  const { pathname } = request.nextUrl;
  const role = request.cookies.get(RoleKey)?.value;
  if (!isAuthenticated) {
    if (protectedRoutes.includes(pathname) || adminRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (adminRoutes.includes(pathname) && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
