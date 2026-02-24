// Analytics page — real click stats from Supabase, gated by plan
"use client";

import { useEffect } from "react";
import { useProfile } from "@/lib/profile-context";
import { getPlanLimits } from "@/lib/plan-config";
import { BarChart3, MousePointerClick, Eye, TrendingUp, ExternalLink, RefreshCw, Crown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";
import Link from "next/link";

export default function AnalyticsPage() {
  const { profile, links, refreshData } = useProfile();
  const [refreshing, setRefreshing] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const currentPlan = profile.plan || "free";
  const limits = getPlanLimits(currentPlan);

  // Refresh data on mount to get latest analytics
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  const handleCsvExport = () => {
    if (!limits.hasCsvExport) {
      setShowUpgrade(true);
      return;
    }
    const headers = ["Title", "URL", "Clicks", "Active", "Created"];
    const rows = links.map((l) => [
      l.title,
      l.url,
      l.click_count.toString(),
      l.is_active ? "Yes" : "No",
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `allme-analytics-${profile.username}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalClicks = links.reduce((sum, l) => sum + l.click_count, 0);
  const activeLinks = links.filter((l) => l.is_active).length;
  const pageViews = profile.page_views || 0;
  const ctr = pageViews > 0 ? ((totalClicks / pageViews) * 100).toFixed(1) : "0.0";

  const sortedLinks = [...links].sort((a, b) => b.click_count - a.click_count);
  const topLink = sortedLinks[0];

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track how your links are performing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* CSV Export button — all plans see it, Biz can use it */}
          <button
            onClick={handleCsvExport}
            className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title="Export CSV"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats cards — Total Clicks always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MousePointerClick className="h-4 w-4" />
            <span className="text-xs font-medium">Total Clicks</span>
          </div>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>

        {/* Pro/Biz stats */}
        {limits.hasFullAnalytics ? (
          <>
            <div className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-medium">Page Views</span>
              </div>
              <p className="text-3xl font-bold">{pageViews}</p>
            </div>
            <div className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">CTR</span>
              </div>
              <p className="text-3xl font-bold">{ctr}%</p>
            </div>
            <div className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-medium">Active Links</span>
              </div>
              <p className="text-3xl font-bold">{activeLinks}</p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-medium">Page Views</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Crown className="h-3.5 w-3.5" />
                  Upgrade
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">CTR</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Crown className="h-3.5 w-3.5" />
                  Upgrade
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-medium">Active Links</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Crown className="h-3.5 w-3.5" />
                  Upgrade
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Top performing link — Pro/Biz */}
      {limits.hasFullAnalytics && topLink && topLink.click_count > 0 && (
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">Top Performing Link</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="font-medium truncate">{topLink.title}</p>
              <p className="text-xs text-muted-foreground truncate">{topLink.url}</p>
            </div>
            <div className="text-right ml-4">
              <p className="text-2xl font-bold">{topLink.click_count}</p>
              <p className="text-xs text-muted-foreground">clicks</p>
            </div>
          </div>
        </div>
      )}

      {/* Per-link breakdown — Pro/Biz */}
      {limits.hasFullAnalytics ? (
        <div className="rounded-2xl border bg-card">
          <div className="p-5 border-b">
            <h2 className="text-sm font-medium">Clicks per link</h2>
          </div>
          {links.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No links yet. Add links to start tracking clicks.</p>
            </div>
          ) : (
            <div className="divide-y">
              {sortedLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      link.is_active ? "bg-emerald-500" : "bg-muted-foreground/30"
                    )} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{link.title}</p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground truncate hover:underline flex items-center gap-1"
                      >
                        {link.url}
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${totalClicks > 0 ? (link.click_count / totalClicks) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10 text-right tabular-nums">
                      {link.click_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border bg-card p-8 text-center">
          <Crown className="h-8 w-8 mx-auto mb-3 text-violet-500" />
          <h3 className="font-semibold mb-1">Detailed link analytics</h3>
          <p className="text-sm text-muted-foreground mb-3">
            See per-link clicks, top performers, and CTR with Pro.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View plans
          </Link>
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center">
        Analytics update in real-time as visitors interact with your page.
      </p>

      {showUpgrade && (
        <UpgradeModal
          feature="CSV Export"
          requiredPlan="business"
          currentPlan={currentPlan}
          onClose={() => setShowUpgrade(false)}
        />
      )}
    </div>
  );
}
