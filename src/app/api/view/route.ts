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

  const { error } = await supabase.rpc("increment_page_views", {
    profile_username: username,
  });

  if (error) {
    console.error("View RPC failed:", error.message);

    if (serviceKey) {
      const { data: p } = await supabase
        .from("profiles")
        .select("page_views")
        .eq("username", username)
        .maybeSingle();

      if (p) {
        await supabase
          .from("profiles")
          .update({ page_views: (p.page_views || 0) + 1 })
          .eq("username", username);

        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ success: false }, { status: 200 });
  }

  return NextResponse.json({ success: true });
}
