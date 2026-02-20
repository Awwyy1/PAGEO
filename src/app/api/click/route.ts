// API route to track link clicks — increments click_count for a given link
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const linkId = body?.linkId;

  if (!linkId || typeof linkId !== "string") {
    return NextResponse.json({ error: "linkId required" }, { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase.rpc("increment_click_count", {
    link_id: linkId,
  });

  if (error) {
    // Fallback: direct update if RPC not yet created
    await supabase
      .from("links")
      .update({ click_count: 0 }) // will be overwritten below
      .eq("id", linkId);

    // Use raw SQL-like increment via Supabase
    const { data: link } = await supabase
      .from("links")
      .select("click_count")
      .eq("id", linkId)
      .single();

    if (link) {
      await supabase
        .from("links")
        .update({ click_count: link.click_count + 1 })
        .eq("id", linkId);
    }
  }

  return NextResponse.json({ success: true });
}
