// Public profile page — server-rendered, fetches from Supabase by username
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Link } from "@/types/database";
import type { Metadata } from "next";
import { ProfilePageClient } from "./profile-page-client";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url")
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    return { title: "Not Found | allme" };
  }

  const displayName = profile.display_name || username;
  const title = `${displayName} | allme`;
  const description = profile.bio || `Check out ${displayName}'s links on allme`;
  const url = `https://allme.site/${username}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "profile",
      title: `${displayName} — @${username}`,
      description,
      url,
      siteName: "Allme",
      images: [
        {
          url: `/api/og?username=${username}`,
          width: 1200,
          height: 630,
          alt: `${displayName}'s allme page`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} — @${username}`,
      description,
      images: [`/api/og?username=${username}`],
    },
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  // Skip static routes that aren't usernames
  const reserved = ["dashboard", "auth", "demo", "api", "pricing", "_next"];
  if (reserved.includes(username)) {
    notFound();
  }

  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("position", { ascending: true });

  return (
    <ProfilePageClient
      profile={profile as Profile}
      links={(links || []) as Link[]}
    />
  );
}
