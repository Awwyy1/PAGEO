// API route to track page views — increments page_views via security-definer RPC
// Uses a standalone Supabase client (not SSR) for reliable anonymous access
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const username = body?.username;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.rpc("increment_page_views", {
    profile_username: username,
  });

  if (error) {
    console.error("View RPC failed:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 200 });
  }

  return NextResponse.json({ success: true });
}
