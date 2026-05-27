import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, isValidAdminCookieEdge } from "@/lib/auth-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/studio/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/studio")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = await isValidAdminCookieEdge(token);
    if (!valid) {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (pathname.startsWith("/api/portfolio")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = await isValidAdminCookieEdge(token);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio", "/studio/:path*", "/api/portfolio", "/api/portfolio/:path*"],
};
