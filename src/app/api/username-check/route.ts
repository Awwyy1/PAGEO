// API route to check username availability — works without auth (for registration)
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const RESERVED_USERNAMES = [
    "admin", "demo", "allme", "test", "user", "help",
    "support", "about", "blog", "api", "app", "www", "mail",
    "dashboard", "auth", "pricing", "privacy", "terms",
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username")?.toLowerCase();

    if (!username || username.length < 3 || username.length > 30) {
        return NextResponse.json({ available: false, reason: "invalid" });
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
