import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value || "";

  const isPublic = publicRoutes.includes(req.nextUrl.pathname);

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
