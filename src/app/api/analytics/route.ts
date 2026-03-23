// GET endpoint — aggregated analytics data for the authenticated user
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PERIOD_DAYS: Record<string, number | null> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  all: null,
};

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const period = request.nextUrl.searchParams.get("period") || "7d";
  const days = PERIOD_DAYS[period] ?? 7;

  const profileId = user.id;

  // Build date filters
  const now = new Date();
  const periodStart = days
    ? new Date(now.getTime() - days * 86400000).toISOString()
    : null;
  const prevPeriodStart = days
    ? new Date(now.getTime() - days * 2 * 86400000).toISOString()
    : null;

  // Fetch current period events
  let eventsQuery = supabase
    .from("analytics_events")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: true });

  if (periodStart) {
    eventsQuery = eventsQuery.gte("created_at", periodStart);
  }

  const { data: events } = await eventsQuery;
  const allEvents = events || [];

  // Fetch previous period events for trends
  let prevEvents: typeof allEvents = [];
  if (periodStart && prevPeriodStart) {
    const { data } = await supabase
      .from("analytics_events")
      .select("event_type, link_id")
      .eq("profile_id", profileId)
      .gte("created_at", prevPeriodStart)
      .lt("created_at", periodStart);
    prevEvents = data || [];
  }

  // Fetch links for the user
  const { data: linksData } = await supabase
    .from("links")
    .select("id, title, url, is_active, click_count")
    .eq("profile_id", profileId)
    .order("position", { ascending: true });
  const links = linksData || [];

  // Summary
  const currentClicks = allEvents.filter(
    (e) => e.event_type === "link_click"
  ).length;
  const currentViews = allEvents.filter(
    (e) => e.event_type === "page_view"
  ).length;
  const prevClicks = prevEvents.filter(
    (e) => e.event_type === "link_click"
  ).length;
  const prevViews = prevEvents.filter(
    (e) => e.event_type === "page_view"
  ).length;

  const activeLinks = links.filter((l) => l.is_active).length;
  const ctr =
    currentViews > 0
      ? Math.round((currentClicks / currentViews) * 1000) / 10
      : 0;

  const calcTrend = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 1000) / 10;
  };

  // Clicks over time — group by day
  const dayMap = new Map<string, { clicks: number; views: number }>();
  const numDays = days || 30;
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    dayMap.set(key, { clicks: 0, views: 0 });
  }
  for (const e of allEvents) {
    const key = e.created_at.slice(0, 10);
    const entry = dayMap.get(key);
    if (entry) {
      if (e.event_type === "link_click") entry.clicks++;
      else entry.views++;
    }
  }
  const clicksOverTime = Array.from(dayMap.entries()).map(([date, data]) => ({
    date,
    ...data,
  }));

  // Top referrers
  const refCounts = new Map<string, number>();
  for (const e of allEvents) {
    if (e.event_type === "page_view") {
      const domain = e.referrer || "Direct";
      refCounts.set(domain, (refCounts.get(domain) || 0) + 1);
    }
  }
  const totalRefViews = Array.from(refCounts.values()).reduce(
    (a, b) => a + b,
    0
  );
  const topReferrers = Array.from(refCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([domain, count]) => ({
      domain,
      count,
      percentage:
        totalRefViews > 0 ? Math.round((count / totalRefViews) * 1000) / 10 : 0,
    }));

  // Top links with trends
  const linkClicksCurrent = new Map<string, number>();
  const linkClicksPrev = new Map<string, number>();
  for (const e of allEvents) {
    if (e.event_type === "link_click" && e.link_id) {
      linkClicksCurrent.set(
        e.link_id,
        (linkClicksCurrent.get(e.link_id) || 0) + 1
      );
    }
  }
  for (const e of prevEvents) {
    if (e.event_type === "link_click" && e.link_id) {
      linkClicksPrev.set(
        e.link_id,
        (linkClicksPrev.get(e.link_id) || 0) + 1
      );
    }
  }
  const topLinks = links
    .map((l) => ({
      id: l.id,
      title: l.title,
      url: l.url,
      is_active: l.is_active,
      clicks: linkClicksCurrent.get(l.id) || 0,
      trend: (linkClicksCurrent.get(l.id) || 0) - (linkClicksPrev.get(l.id) || 0),
    }))
    .sort((a, b) => b.clicks - a.clicks);

  // Devices
  const deviceCounts = new Map<string, number>();
  for (const e of allEvents) {
    if (e.event_type === "page_view" && e.device) {
      deviceCounts.set(e.device, (deviceCounts.get(e.device) || 0) + 1);
    }
  }
  const totalDevices = Array.from(deviceCounts.values()).reduce(
    (a, b) => a + b,
    0
  );
  const devices = Array.from(deviceCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([device, count]) => ({
      device,
      count,
      percentage:
        totalDevices > 0 ? Math.round((count / totalDevices) * 1000) / 10 : 0,
    }));

  // Countries
  const countryCounts = new Map<string, number>();
  for (const e of allEvents) {
    if (e.event_type === "page_view" && e.country) {
      countryCounts.set(e.country, (countryCounts.get(e.country) || 0) + 1);
    }
  }
  const totalCountries = Array.from(countryCounts.values()).reduce(
    (a, b) => a + b,
    0
  );
  const countries = Array.from(countryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, count]) => ({
      country,
      count,
      percentage:
        totalCountries > 0
          ? Math.round((count / totalCountries) * 1000) / 10
          : 0,
    }));

  return NextResponse.json({
    summary: {
      totalClicks: currentClicks,
      totalViews: currentViews,
      ctr,
      activeLinks,
      clicksTrend: calcTrend(currentClicks, prevClicks),
      viewsTrend: calcTrend(currentViews, prevViews),
    },
    clicksOverTime,
    topReferrers,
    topLinks,
    devices,
    countries,
  });
}
