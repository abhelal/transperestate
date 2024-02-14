import { NextResponse } from "next/server";

export async function middleware(request) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const origin = request.nextUrl.origin;
  const pathname = request.nextUrl.pathname;
  let user = null;
  console.log("middleware called");

  // try {
  //   const requestHeaders = new Headers(request.headers);
  //   const res = await fetch(`${API_BASE_URL}/auth/me`, {
  //     headers: requestHeaders,
  //   });
  //   const data = await res.json();
  //   if (data.success) {
  //     user = data.user;
  //   }
  // } catch (error) {
  //   console.log("mid", error);
  // }

  // if (pathname.startsWith("/login") && user) {
  //   return NextResponse.redirect(`${origin}/dashboard`);
  // }

  // if (pathname.startsWith("/dashbosdhghsdlgkhlsk")) {
  //   return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  // }
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
