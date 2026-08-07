// API route to track link clicks — increments click_count and logs analytics event
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { parseDevice, parseReferrerDomain } from "@/lib/analytics-utils";
import { visitorHash, dedupWindowStart } from "@/lib/visitor";

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

  const linkId = body?.linkId;
  const referrer = (body?.referrer as string) || null;

  if (!linkId || typeof linkId !== "string") {
    return NextResponse.json({ error: "linkId required" }, { status: 400 });
  }

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey || anonKey);

  const country = request.headers.get("x-vercel-ip-country") || null;
  const ua = request.headers.get("user-agent") || "";
  const device = parseDevice(ua);
  const referrerDomain = parseReferrerDomain(referrer);

  // Strategy 1: Direct select + update (most reliable, works without RPC)
  if (serviceKey) {
    try {
      const { data: link, error: selectError } = await supabase
        .from("links")
        .select("click_count, profile_id")
        .eq("id", linkId)
        .maybeSingle();

      if (selectError) {
        console.error("Click select failed:", selectError.message);
      } else if (link) {
        // Deduplicated per link, on the same window as page views. Both sides
        // of CTR then mean the same thing — unique visitors — so a link's CTR
        // can never come out above 100%.
        const hash = visitorHash(request, link.profile_id);
        const { data: recent } = await supabase
          .from("analytics_events")
          .select("id")
          .eq("profile_id", link.profile_id)
          .eq("visitor_hash", hash)
          .eq("event_type", "link_click")
          .eq("link_id", linkId)
          .gte("created_at", dedupWindowStart())
          .limit(1);

        if (recent && recent.length > 0) {
          return NextResponse.json({ success: true, counted: false });
        }

        const { error: updateError } = await supabase
          .from("links")
          .update({ click_count: (link.click_count || 0) + 1 })
          .eq("id", linkId);

        if (updateError) {
          console.error("Click update failed:", updateError.message);
        }

        // Log analytics event
        await supabase.from("analytics_events").insert({
          profile_id: link.profile_id,
          link_id: linkId,
          event_type: "link_click",
          referrer: referrerDomain,
          country,
          device,
          visitor_hash: hash,
        });

        if (!updateError) {
          return NextResponse.json({ success: true, counted: true });
        }
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
