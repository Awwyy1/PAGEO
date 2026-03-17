// API route to check username availability — works without auth (for registration)
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { RESERVED_USERNAMES } from "@/lib/reserved-usernames";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username")?.toLowerCase();
    const plan = searchParams.get("plan") || "free";

    if (!username || username.length < 3 || username.length > 30) {
        return NextResponse.json({ available: false, reason: "invalid" });
    }

    // 3-char usernames require Pro or Business plan
    if (username.length === 3 && plan === "free") {
        return NextResponse.json({ available: false, reason: "plan_required" });
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
        return NextResponse.json({ available: false, reason: "invalid" });
    }

    if (RESERVED_USERNAMES.includes(username)) {
        return NextResponse.json({ available: false, reason: "reserved" });
    }

    const supabase = createClient();

    const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

    return NextResponse.json({
        available: !data,
        reason: data ? "taken" : null,
    });
}
