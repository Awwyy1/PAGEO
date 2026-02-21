// API route to track link clicks — increments click_count via security-definer RPC
// Uses a standalone Supabase client (not SSR) for reliable anonymous access
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const linkId = body?.linkId;

  if (!linkId || typeof linkId !== "string") {
    return NextResponse.json({ error: "linkId required" }, { status: 400 });
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  // Use standalone client — avoids SSR cookie issues for anonymous visitors
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Try RPC first (security definer — bypasses RLS)
  const { error: rpcError } = await supabase.rpc("increment_click_count", {
    link_id: linkId,
  });

  if (rpcError) {
    console.error("Click RPC failed:", rpcError.message);

    // Fallback: direct SQL increment via the anon role won't work with RLS,
    // so we create a simple workaround — call a raw update that the RPC should handle.
    // If RPC doesn't exist, log the error for debugging.
    console.error(
      "increment_click_count RPC may not exist in your Supabase. Run migration 002_storage_and_rpc.sql."
    );

    return NextResponse.json({ success: false, error: rpcError.message }, { status: 200 });
  }

  return NextResponse.json({ success: true });
}
