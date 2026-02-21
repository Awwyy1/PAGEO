// API route to track link clicks — uses service role key to bypass RLS
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
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

  const supabase = createClient(supabaseUrl, serviceKey || anonKey);

  // Strategy 1: Direct select + update (most reliable, works without RPC)
  if (serviceKey) {
    try {
      const { data: link, error: selectError } = await supabase
        .from("links")
        .select("click_count")
        .eq("id", linkId)
        .maybeSingle();

      if (selectError) {
        console.error("Click select failed:", selectError.message);
      } else if (link) {
        const { error: updateError } = await supabase
          .from("links")
          .update({ click_count: (link.click_count || 0) + 1 })
          .eq("id", linkId);

        if (!updateError) {
          return NextResponse.json({ success: true });
        }
        console.error("Click update failed:", updateError.message);
      }
    } catch (e) {
      console.error("Click direct update error:", e);
    }
  }

  // Strategy 2: Try RPC as fallback
  try {
    const { error } = await supabase.rpc("increment_click_count", {
      link_id: linkId,
    });

    if (!error) {
      return NextResponse.json({ success: true });
    }
    console.error("Click RPC failed:", error.message);
  } catch (e) {
    console.error("Click RPC error:", e);
  }

  return NextResponse.json({ success: false }, { status: 200 });
}
