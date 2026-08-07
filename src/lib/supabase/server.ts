// Server-side Supabase client (for Server Components, Server Actions, Route Handlers)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export function createClient() {
  const cookieStore = cookies();
  const isSecure = SUPABASE_URL.startsWith("https://");

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, {
              ...options,
              // Must match the middleware. /auth/callback writes the session
              // here after exchanging a recovery or OAuth code, and
              // createBrowserClient reads that session out of document.cookie —
              // an HttpOnly cookie is invisible to it, so the browser would land
              // on the dashboard behaving as if nobody were signed in.
              httpOnly: false,
              sameSite: (options?.sameSite ?? "lax") as "lax" | "strict" | "none",
              secure: options?.secure ?? isSecure,
              path: options?.path ?? "/",
              maxAge: options?.maxAge ?? 60 * 60 * 24 * 365,
            })
          );
        } catch {
          // Ignored in Server Components where cookies can't be set
        }
      },
    },
  });
}
