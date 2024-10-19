import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const subscriptionRouts = ["/subscription"];
  const authRouts = ["/login", "/register", "/forgot-password", "/reset-password"];
  const superAdminRoutes = ["/clients", "/contact-messages", "/activation-codes", "/tickets", "/feedbacks", "/subscription-plan", "/pages"];

  const protectedRouts = [
    "/dashboard",
    "/maintenance",
    "/message",
    "/notice",
    "/notifications",
    "/bills",
    "/properties",
    "/maintainers",
    "/janitors",
    "/tenants",
    "/finance",
    "/reports",
    "/settings",
    "/myrentals",
  ];

  const isAuthRoute = authRouts.includes(pathname);
  const isProtectedRoute = protectedRouts.includes(pathname);
  const isSubscriptionRoute = subscriptionRouts.includes(pathname);
  const isSuperAdminRoute = superAdminRoutes.includes(pathname);

  try {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      async function (config) {
        const cookieStore = cookies();
        config.headers.cookie = cookieStore;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const res = await instance.get("/auth/me");
    const user = res.data?.user || null;

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

    if (isSuperAdminRoute && user && user.role !== "SUPERADMIN") {
      console.log("redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (isProtectedRoute || isSubscriptionRoute || isSuperAdminRoute) {
        console.log("redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }
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
