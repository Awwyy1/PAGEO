// API route to track link clicks — uses service role key to bypass RLS
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Prefer service role key (server-only, bypasses RLS entirely)
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(request: NextRequest) {
  // sendBeacon may send as text/plain — parse text then JSON
  let body: Record<string, unknown> | null = null;
  try {
    const text = await request.text();
    body = JSON.parse(text);
  } catch {
    body = null;
  }

  const linkId = body?.linkId;

  if (!linkId || typeof linkId !== "string") {
    return NextResponse.json({ error: "linkId required" }, { status: 400 });
  }

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  // Use service role key if available (bypasses RLS), otherwise anon
  const supabase = createClient(supabaseUrl, serviceKey || anonKey);

  // Try RPC (security definer — bypasses RLS)
  const { error: rpcError } = await supabase.rpc("increment_click_count", {
    link_id: linkId,
  });

  if (!rpcError) {
    return NextResponse.json({ success: true });
  }

  console.error("Click RPC failed:", rpcError.message);

  // Fallback: direct SQL update (works if service role key is set)
  if (serviceKey) {
    const { data: link } = await supabase
      .from("links")
      .select("click_count")
      .eq("id", linkId)
      .maybeSingle();

    if (link) {
      await supabase
        .from("links")
        .update({ click_count: (link.click_count || 0) + 1 })
        .eq("id", linkId);

      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ success: false }, { status: 200 });
}
