import { NextResponse } from "next/server";

export async function middleware(request) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const origin = request.nextUrl.origin;
  const pathname = request.nextUrl.pathname;
  const authRouts = ["/login", "/register"];

  const protectedRouts = [
    "/dashboard",
    "/maintenance",
    "/message",
    "/notifications",
    "/bills",
    "/properties",
    "/maintainers",
    "/janitors",
    "/tenants",
    "/finance",
    "/reports",
    "/subscription",
    "/settings",
  ];

  const isAuthRoute = authRouts.includes(pathname);
  const isProtectedRoute = protectedRouts.includes(pathname);

  try {
    console.log("middleware called");
    const requestHeaders = new Headers(request.headers);
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: requestHeaders,
    });

    const data = await res.json();

    console.log("middleware data", data);
    const user = data.user;

    if (isProtectedRoute && !user) {
      return NextResponse.redirect(`${origin}/login`);
    }

    if (isAuthRoute && user) {
      console.log("middleware user", user);
      return NextResponse.redirect(`${origin}/dashboard`);
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(`${origin}`);
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
