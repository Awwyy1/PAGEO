// API route to track page views — uses service role key to bypass RLS
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> | null = null;
  try {
    const text = await request.text();
    body = JSON.parse(text);
  } catch {
    body = null;
  }

  const username = body?.username;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey || anonKey);

  // Strategy 1: Direct select + update (most reliable, works without RPC)
  if (serviceKey) {
    try {
      const { data: profile, error: selectError } = await supabase
        .from("profiles")
        .select("page_views")
        .eq("username", username)
        .maybeSingle();

      if (selectError) {
        console.error("View select failed:", selectError.message);
      } else if (profile) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ page_views: (profile.page_views || 0) + 1 })
          .eq("username", username);

        if (!updateError) {
          return NextResponse.json({ success: true });
        }
        console.error("View update failed:", updateError.message);
      }
    } catch (e) {
      console.error("View direct update error:", e);
    }
  }

  // Strategy 2: Try RPC as fallback
  try {
    const { error } = await supabase.rpc("increment_page_views", {
      profile_username: username,
    });

    if (!error) {
      return NextResponse.json({ success: true });
    }
    console.error("View RPC failed:", error.message);
  } catch (e) {
    console.error("View RPC error:", e);
  }

  return NextResponse.json({ success: false }, { status: 200 });
}
