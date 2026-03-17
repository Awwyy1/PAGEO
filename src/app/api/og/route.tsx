// Dynamic OG image generator — creates beautiful social preview images for user profiles
import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

// Use Node.js runtime (edge causes 0-byte responses with Supabase fetch)
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("Missing username", { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new Response("Not configured", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch profile + id in one query
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, bio, avatar_url, username, theme")
    .eq("username", username)
    .maybeSingle();

  let linkCount = 0;
  if (profile?.id) {
    const { count } = await supabase
      .from("links")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("profile_id", profile.id);
    linkCount = count || 0;
  }

  const displayName = profile?.display_name || username;
  const bio = profile?.bio ? profile.bio.slice(0, 100) : "";
  const avatarUrl = profile?.avatar_url;
  const initial = displayName[0]?.toUpperCase() || "?";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 30%, #2d1b69 60%, #1a0a2e 100%)",
          position: "relative",
        }}
      >
        {/* Decorative circles — simple solid colors (satori doesn't support radial-gradient) */}
        <div
          style={{
            position: "absolute",
            top: "-100",
            right: "-100",
            width: "400",
            height: "400",
            borderRadius: "200",
            backgroundColor: "rgba(139,92,246,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80",
            left: "-80",
            width: "350",
            height: "350",
            borderRadius: "175",
            backgroundColor: "rgba(236,72,153,0.06)",
          }}
        />

        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            width={120}
            height={120}
            style={{
              borderRadius: "60",
              border: "4px solid rgba(255,255,255,0.15)",
              marginBottom: "24",
            }}
          />
        ) : (
          <div
            style={{
              width: "120",
              height: "120",
              borderRadius: "60",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24",
              border: "4px solid rgba(255,255,255,0.15)",
            }}
          >
            <span style={{ fontSize: "48", fontWeight: 700, color: "#fff" }}>
              {initial}
            </span>
          </div>
        )}

        {/* Name */}
        <div
          style={{
            fontSize: "48",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "8",
          }}
        >
          {displayName}
        </div>

        {/* Username */}
        <div
          style={{
            fontSize: "22",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "16",
          }}
        >
          @{username}
        </div>

        {/* Bio — simple text, no -webkit properties */}
        {bio && (
          <div
            style={{
              fontSize: "20",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600",
              textAlign: "center",
              marginBottom: "24",
            }}
          >
            {bio}
          </div>
        )}

        {/* Stats pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: "50",
            padding: "10px 28px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ fontSize: "18", color: "rgba(255,255,255,0.7)" }}>
            {linkCount} {linkCount === 1 ? "link" : "links"}
          </span>
          <span style={{ fontSize: "18", color: "rgba(255,255,255,0.3)" }}>
            •
          </span>
          <span style={{ fontSize: "18", color: "rgba(255,255,255,0.7)" }}>
            allme.site/{username}
          </span>
        </div>

        {/* Branding */}
        <div
          style={{
            position: "absolute",
            bottom: "30",
            fontSize: "16",
            fontWeight: 600,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          allme
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
