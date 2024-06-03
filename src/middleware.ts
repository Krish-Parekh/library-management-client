import { NextRequest, NextResponse } from "next/server";
import { AccessTokenKey } from "@/constants/strings";

export const protectedRoutes = ["/"];
<<<<<<< Updated upstream

=======
export const adminRoutes = ["/admin"];
>>>>>>> Stashed changes
export const publicRoutes = ["/login", "/signup", "/reset-password"];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(AccessTokenKey);
  const { pathname } = request.nextUrl;
<<<<<<< Updated upstream
=======
  const role = request.cookies.get("role")?.value;
>>>>>>> Stashed changes
  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (isAuthenticated && publicRoutes.includes(pathname)) {
<<<<<<< Updated upstream
    return NextResponse.redirect(new URL('/', request.url));
=======
    return NextResponse.redirect(new URL("/", request.url));
  } else if (isAuthenticated && adminRoutes.includes(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
>>>>>>> Stashed changes
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
