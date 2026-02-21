// Dynamic OG image generator — creates beautiful social preview images for user profiles
import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("Missing username", { status: 400 });
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url, username, theme")
    .eq("username", username)
    .maybeSingle();

  // Fetch link count
  const { count } = await supabase
    .from("links")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true)
    .eq(
      "profile_id",
      (
        await supabase
          .from("profiles")
          .select("id")
          .eq("username", username)
          .maybeSingle()
      ).data?.id || ""
    );

  const displayName = profile?.display_name || username;
  const bio = profile?.bio || "";
  const linkCount = count || 0;
  const avatarUrl = profile?.avatar_url;
  const initial = displayName[0]?.toUpperCase() || "?";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 30%, #2d1b69 60%, #1a0a2e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)",
          }}
        />

        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid rgba(255,255,255,0.15)",
              marginBottom: "24px",
            }}
          />
        ) : (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              border: "4px solid rgba(255,255,255,0.15)",
            }}
          >
            <span style={{ fontSize: "48px", fontWeight: 700, color: "#fff" }}>
              {initial}
            </span>
          </div>
        )}

        {/* Name */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "8px",
          }}
        >
          {displayName}
        </div>

        {/* Username */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "16px",
          }}
        >
          @{username}
        </div>

        {/* Bio */}
        {bio && (
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.4,
              marginBottom: "24px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {bio.slice(0, 120)}
          </div>
        )}

        {/* Stats pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50px",
            padding: "10px 28px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>
            {linkCount} {linkCount === 1 ? "link" : "links"}
          </span>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.3)" }}>
            •
          </span>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>
            allme.site/{username}
          </span>
        </div>

        {/* Branding */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "16px",
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
