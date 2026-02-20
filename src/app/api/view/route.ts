// API route to track page views — increments page_views for a profile
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const username = body?.username;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase.rpc("increment_page_views", {
    profile_username: username,
  });

  if (error) {
    // Fallback if RPC doesn't exist yet
    const { data: profile } = await supabase
      .from("profiles")
      .select("page_views")
      .eq("username", username)
      .single();

    if (profile) {
      await supabase
        .from("profiles")
        .update({ page_views: (profile.page_views || 0) + 1 })
        .eq("username", username);
    }
  }

  return NextResponse.json({ success: true });
}
