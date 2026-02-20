// Browser-side Supabase client (for Client Components)
import { createBrowserClient } from "@supabase/ssr";

// Dummy values let the build pass when env vars are missing (e.g. Vercel first deploy).
// The app will show demo mode; real Supabase calls won't work until vars are set.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
}
