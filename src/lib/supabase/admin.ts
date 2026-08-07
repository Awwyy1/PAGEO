// Service-role Supabase client.
//
// This key bypasses RLS completely, so it must never reach the browser: import
// this only from route handlers and server actions, never from a component that
// ships to the client. It is the only way to reach auth.admin.*, which is what
// account deletion needs to remove the auth.users row.
//
// Returns null when SUPABASE_SERVICE_ROLE_KEY is absent so callers can degrade
// on purpose rather than crash on an undefined key.
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
