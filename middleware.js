import { NextResponse } from "next/server";

export async function middleware(request) {
  console.log("middleware called");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const pathname = request.nextUrl.pathname;

  const subscriptionRouts = ["/subscription"];
  const authRouts = ["/login", "/register", "/forgot-password", "/reset-password"];

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
    "/settings",
  ];

  const isAuthRoute = authRouts.includes(pathname);
  const isProtectedRoute = protectedRouts.includes(pathname);
  const isSubscriptionRoute = subscriptionRouts.includes(pathname);

  try {
    const requestHeaders = new Headers(request.headers);

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: requestHeaders,
    });

    const data = await res.json();
    console.log("middleware-data", data);
    const user = data?.user || null;
    console.log("middleware-user", user);

    if (isProtectedRoute && !user) {
      console.log("redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtectedRoute && user && !user.isSubscribed) {
      console.log("redirecting to subscription");
      return NextResponse.redirect(new URL("/subscription", request.url));
    }

    if (isSubscriptionRoute && !user) {
      console.log("redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthRoute && user && user.isSubscribed) {
      console.log("redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isAuthRoute && user && !user.isSubscribed) {
      console.log("redirecting to subscription");
      return NextResponse.redirect(new URL("/subscription", request.url));
    }
    console.log("middleware-next");
    return NextResponse.next();
  } catch (error) {
    console.log("middleware-error", error);

    return NextResponse.error(new Error("Internal Server Error"));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.ico|sitemap.xml|robots.txt).*)",
  ],
};
