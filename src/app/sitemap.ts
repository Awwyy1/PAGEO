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
      url: `${BASE_URL}/pricing`,
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

  // Fetch only profiles that have at least one active link
  // Uses inner join: only profiles with matching active links are returned
  // When is_public field is added to DB — append: .eq('is_public', true)
  const supabase = createSupabaseClient();

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('username, created_at, links!inner(id)')
    .eq('links.is_active', true);

  if (error) {
    console.error('[sitemap] Failed to fetch profiles:', error.message);
    return staticPages;
  }

  // Deduplicate: inner join returns one row per active link, not per profile
  const seen = new Set<string>();
  const profilePages: MetadataRoute.Sitemap = [];

  for (const profile of profiles ?? []) {
    if (seen.has(profile.username)) continue;
    seen.add(profile.username);

    profilePages.push({
      url: `${BASE_URL}/${profile.username}`,
      lastModified: new Date(profile.created_at),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return [...staticPages, ...profilePages];
}
