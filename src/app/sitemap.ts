import { MetadataRoute } from 'next';
import { createServerClient } from '@supabase/ssr';

// Revalidate sitemap every hour
export const revalidate = 3600;

const BASE_URL = 'https://allme.site';

function createSupabaseClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vs/linktree`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/link-in-bio-tiktok`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/link-in-bio-examples`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/link-in-bio-instagram`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/how-to-create-link-in-bio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/linktree-alternatives`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/for/creators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/for/developers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/for/business`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // List only profiles that have at least one active link.
  // Profiles come from the public_profiles view — the base table is readable
  // only by its owner so private columns (email, subscription_id) can't leak.
  // A view carries no foreign keys, so the active-link filter runs as a second
  // query instead of a PostgREST embed.
  // When is_public field is added to DB — append: .eq('is_public', true)
  const supabase = createSupabaseClient();

  const [profilesResult, linksResult] = await Promise.all([
    supabase.from('public_profiles').select('id, username, created_at'),
    supabase.from('links').select('profile_id').eq('is_active', true),
  ]);

  const error = profilesResult.error ?? linksResult.error;
  if (error) {
    console.error('[sitemap] Failed to fetch profiles:', error.message);
    return staticPages;
  }

  const hasActiveLink = new Set(
    (linksResult.data ?? []).map((l) => l.profile_id)
  );

  const profilePages: MetadataRoute.Sitemap = [];

  for (const profile of profilesResult.data ?? []) {
    if (!hasActiveLink.has(profile.id)) continue;

    profilePages.push({
      url: `${BASE_URL}/${profile.username}`,
      lastModified: new Date(profile.created_at),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return [...staticPages, ...profilePages];
}
