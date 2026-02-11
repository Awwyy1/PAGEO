// Analytics page — click stats overview (demo mode)
"use client";

import { useProfile } from "@/lib/profile-context";
import { BarChart3, MousePointerClick, Eye } from "lucide-react";

export default function AnalyticsPage() {
  const { links } = useProfile();
  const totalClicks = links.reduce((sum, l) => sum + l.click_count, 0);
  const activeLinks = links.filter((l) => l.is_active).length;

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track how your links are performing.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MousePointerClick className="h-4 w-4" />
            <span className="text-xs font-medium">Total Clicks</span>
          </div>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Eye className="h-4 w-4" />
            <span className="text-xs font-medium">Page Views</span>
          </div>
          <p className="text-3xl font-bold">1.2k</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs font-medium">Active Links</span>
          </div>
          <p className="text-3xl font-bold">{activeLinks}</p>
        </div>
      </div>

      {/* Per-link breakdown */}
      <div className="rounded-2xl border bg-card">
        <div className="p-5 border-b">
          <h2 className="text-sm font-medium">Clicks per link</h2>
        </div>
        <div className="divide-y">
          {[...links]
            .sort((a, b) => b.click_count - a.click_count)
            .map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{link.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.url}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(link.click_count / Math.max(totalClicks, 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right">
                    {link.click_count}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
