import { NextRequest, NextResponse } from "next/server";
import { getCountry } from "./utils";

const allowedCountries = [
  "Australia",
  "Belgium",
  "Brunei",
  "Canada",
  "Czechia",
  "France",
  "Germany",
  "Italy",
  "Kuwait",
  "Malaysia",
  "New Zealand",
  "Oman",
  "Poland",
  "Saudi Arabia",
  "Singapore",
  "Spain",
  "South Africa",
  "Switzerland",
  "Turkey",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Vietnam",
];

const noneAuthRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value || "";

  const ip = req.ip || "";
  const country = await getCountry(ip);

  if (!allowedCountries.includes(country)) {
    return NextResponse.redirect(new URL("/international", req.nextUrl));
  }

  const isPublic = noneAuthRoutes.includes(req.nextUrl.pathname);

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (req.nextUrl.pathname.includes("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/about",
    "/accounts",
    "/contact",
    "/privacy",
    "/reviews",
    "/terms",
    "/faqs",
    "/reset-password",
    "/forgot-password",
    "/dashboard/:path*",
  ],
};
