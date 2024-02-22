import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/sign-in") return;
  const currentUser = request.cookies.get("auth-session")?.value;

  if (currentUser) {
    return;
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
