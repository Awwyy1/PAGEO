// Supabase middleware helper — refreshes auth tokens on each request
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip Supabase auth if credentials are not configured
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  // Explicit cookie options to ensure consistent behavior across browsers (especially Chrome).
  // Chrome enforces SameSite=Lax by default and requires Secure for SameSite=None.
  const isSecure = supabaseUrl.startsWith("https://") || request.nextUrl.protocol === "https:";

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          const cookieOptions = {
            ...options,
            httpOnly: false, // must be readable by createBrowserClient
            sameSite: (options?.sameSite ?? "lax") as "lax" | "strict" | "none",
            secure: options?.secure ?? isSecure,
            path: options?.path ?? "/",
            maxAge: options?.maxAge ?? 60 * 60 * 24 * 365, // 1 year default
          };
          supabaseResponse.cookies.set(name, value, cookieOptions);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from dashboard
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
