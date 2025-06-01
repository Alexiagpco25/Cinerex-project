import { NextRequest, NextResponse } from "next/server";
import { TOKEN_NAME } from "./constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME)?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(token ? "/admin" : "/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"], 
};
