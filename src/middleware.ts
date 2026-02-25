// Next.js middleware — protects /dashboard routes via Supabase auth
// and intercepts recovery redirects from Supabase
import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Supabase sends recovery/magic-link users to Site URL root with ?code=
  // Intercept and redirect to /auth/callback so the code gets exchanged
  const code = request.nextUrl.searchParams.get("code");
  if (code && request.nextUrl.pathname === "/") {
    const callbackUrl = new URL("/auth/callback", request.url);
    callbackUrl.searchParams.set("code", code);
    callbackUrl.searchParams.set("next", "/auth/reset-password");
    return NextResponse.redirect(callbackUrl);
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};
