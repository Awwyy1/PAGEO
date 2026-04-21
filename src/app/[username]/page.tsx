// Public profile page — server-rendered, fetches from Supabase by username
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Link } from "@/types/database";
import type { Metadata } from "next";
import { ProfilePageClient } from "./profile-page-client";
import { RESERVED_USERNAMES } from "@/lib/reserved-usernames";

function ProfileJsonLd({ profile, links }: { profile: Profile; links: Link[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: profile.created_at,
    dateModified: profile.created_at,
    mainEntity: {
      "@type": "Person",
      name: profile.display_name || profile.username,
      alternateName: profile.username,
      ...(profile.bio && { description: profile.bio }),
      ...(profile.avatar_url && { image: profile.avatar_url }),
      url: `https://allme.site/${profile.username}`,
      sameAs: links
        .filter((l) => l.is_active && l.url)
        .map((l) => l.url),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Disable caching so scheduled links appear on time
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  noStore();
  const { username } = await params;
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, bio, avatar_url")
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    return { title: "Not Found | allme" };
  }

  const { data: activeLinks } = await supabase
    .from("links")
    .select("title")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("position", { ascending: true });

  const links = activeLinks ?? [];
  const linkCount = links.length;
  const topLinks = links.slice(0, 3).map((l) => l.title).filter(Boolean);
  const shouldIndex = linkCount >= 1;

  const displayName = profile.display_name || username;
  const canonicalUsername = username.toLowerCase();
  const url = `https://allme.site/${canonicalUsername}`;

  const title = `${displayName} (@${canonicalUsername}) — Links & Bio | allme`;

  const description = profile.bio
    ? `${profile.bio.slice(0, 120)}. Find all ${displayName}'s links — ${topLinks.join(", ")} and more.`
    : `Check out ${displayName}'s ${linkCount} links on allme`;

  const ogDescription = profile.bio
    ? `${profile.bio.slice(0, 100)} ✦ allme.site/${canonicalUsername}`
    : `${linkCount} links in one place ✦ allme.site/${canonicalUsername}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
    },
    openGraph: {
      type: "profile",
      title: `${displayName} — @${canonicalUsername}`,
      description: ogDescription,
      url,
      siteName: "Allme",
      images: [
        {
          url: `https://allme.site/api/og?username=${username}`,
          width: 1200,
          height: 630,
          alt: `${displayName}'s allme page`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} — @${canonicalUsername}`,
      description: ogDescription,
      images: [`https://allme.site/api/og?username=${username}`],
    },
  };
}

export default async function UserProfilePage({ params }: Props) {
  noStore();
  const { username } = await params;

  // Skip static routes that aren't usernames
  if (RESERVED_USERNAMES.includes(username)) {
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

  // Filter out scheduled links that haven't arrived yet (server-side)
  const now = new Date();
  const visibleLinks = (links || []).filter((link: Link) => {
    if (!link.scheduled_at) return true;
    return new Date(link.scheduled_at) <= now;
  });

  return (
    <>
      <ProfileJsonLd profile={profile as Profile} links={visibleLinks as Link[]} />
      <ProfilePageClient
        profile={profile as Profile}
        links={visibleLinks as Link[]}
      />
    </>
  );
}
