// API route to track page views — increments page_views and logs analytics event
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

  const username = body?.username;
  const referrer = (body?.referrer as string) || null;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
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
      const { data: profile, error: selectError } = await supabase
        .from("profiles")
        .select("id, page_views")
        .eq("username", username)
        .maybeSingle();

      if (selectError) {
        console.error("View select failed:", selectError.message);
      } else if (profile) {
        // Has this visitor already been counted on this page recently?
        // Without this, a refresh, a back-navigation, or the owner checking
        // their own page each added a view, and CTR was computed against a
        // denominator nobody could trust.
        const hash = visitorHash(request, profile.id);
        const { data: recent } = await supabase
          .from("analytics_events")
          .select("id")
          .eq("profile_id", profile.id)
          .eq("visitor_hash", hash)
          .eq("event_type", "page_view")
          .gte("created_at", dedupWindowStart())
          .limit(1);

        if (recent && recent.length > 0) {
          return NextResponse.json({ success: true, counted: false });
        }

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ page_views: (profile.page_views || 0) + 1 })
          .eq("username", username);

        if (updateError) {
          console.error("View update failed:", updateError.message);
        }

        // Log analytics event
        await supabase.from("analytics_events").insert({
          profile_id: profile.id,
          link_id: null,
          event_type: "page_view",
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
