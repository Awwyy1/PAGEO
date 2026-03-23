// Analytics page — event-based analytics with charts, trends, and plan gating
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useProfile } from "@/lib/profile-context";
import { getPlanLimits } from "@/lib/plan-config";
import { countryToFlag, countryName } from "@/lib/analytics-utils";
import {
  BarChart3,
  MousePointerClick,
  Eye,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  Crown,
  Download,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";

type Period = "7d" | "30d" | "90d" | "all";

interface AnalyticsData {
  summary: {
    totalClicks: number;
    totalViews: number;
    ctr: number;
    activeLinks: number;
    clicksTrend: number;
    viewsTrend: number;
  };
  clicksOverTime: Array<{ date: string; clicks: number; views: number }>;
  topReferrers: Array<{ domain: string; count: number; percentage: number }>;
  topLinks: Array<{
    id: string;
    title: string;
    url: string;
    is_active: boolean;
    clicks: number;
    trend: number;
  }>;
  devices: Array<{ device: string; count: number; percentage: number }>;
  countries: Array<{ country: string; count: number; percentage: number }>;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
  { value: "all", label: "All" },
];

const deviceIcons: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

function TrendBadge({ value }: { value: number }) {
  if (value > 0)
    return (
      <span className="text-xs text-emerald-600">▲ +{value}%</span>
    );
  if (value < 0)
    return (
      <span className="text-xs text-red-500">▼ {value}%</span>
    );
  return <span className="text-xs text-muted-foreground">— 0%</span>;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-muted rounded", className)} />;
}

function LockedOverlay({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-2xl z-10">
      <a
        href="/pricing"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
      >
        <Crown className="h-3.5 w-3.5" />
        {label || "Upgrade"}
      </a>
    </div>
  );
}

// --- SVG Area Chart ---
function AreaChart({
  data,
}: {
  data: Array<{ date: string; clicks: number; views: number }>;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
        No data yet for this period
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => Math.max(d.clicks, d.views)), 1);
  const w = 600;
  const h = 200;
  const padX = 40;
  const padY = 20;
  const chartW = w - padX * 2;
  const chartH = h - padY * 2;

  const xStep = data.length > 1 ? chartW / (data.length - 1) : chartW;

  const toX = (i: number) => padX + i * xStep;
  const toY = (v: number) => padY + chartH - (v / maxVal) * chartH;

  const buildPath = (key: "clicks" | "views") => {
    const points = data.map((d, i) => `${toX(i)},${toY(d[key])}`);
    const line = `M${points.join(" L")}`;
    const area = `${line} L${toX(data.length - 1)},${padY + chartH} L${padX},${padY + chartH} Z`;
    return { line, area };
  };

  const viewsPath = buildPath("views");
  const clicksPath = buildPath("clicks");

  // Y-axis labels
  const ySteps = 4;
  const yLabels = Array.from({ length: ySteps + 1 }, (_, i) =>
    Math.round((maxVal / ySteps) * (ySteps - i))
  );

  // X-axis labels — show ~5-7 labels max
  const xLabelStep = Math.max(1, Math.floor(data.length / 6));

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yLabels.map((label, i) => {
          const y = padY + (chartH / ySteps) * i;
          return (
            <g key={i}>
              <line
                x1={padX}
                y1={y}
                x2={w - padX}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
              />
              <text
                x={padX - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize="9"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* X labels */}
        {data.map((d, i) => {
          if (i % xLabelStep !== 0 && i !== data.length - 1) return null;
          const dateObj = new Date(d.date);
          const label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
          return (
            <text
              key={i}
              x={toX(i)}
              y={h - 2}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="9"
            >
              {label}
            </text>
          );
        })}

        {/* Views area (lighter) */}
        <path d={viewsPath.area} fill="url(#viewsGrad)" />
        <path
          d={viewsPath.line}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Clicks area */}
        <path d={clicksPath.area} fill="url(#clicksGrad)" />
        <path
          d={clicksPath.line}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Hover areas */}
        {data.map((d, i) => (
          <g key={i}>
            <rect
              x={toX(i) - xStep / 2}
              y={padY}
              width={xStep}
              height={chartH}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
            {hoverIdx === i && (
              <>
                <line
                  x1={toX(i)}
                  y1={padY}
                  x2={toX(i)}
                  y2={padY + chartH}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  strokeOpacity="0.4"
                />
                <circle
                  cx={toX(i)}
                  cy={toY(d.clicks)}
                  r="4"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                />
                <circle
                  cx={toX(i)}
                  cy={toY(d.views)}
                  r="3"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.4"
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                />
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoverIdx !== null && data[hoverIdx] && (
        <div
          className="absolute top-2 bg-popover border rounded-lg px-3 py-2 text-xs shadow-lg pointer-events-none z-20"
          style={{
            left: `${((toX(hoverIdx)) / w) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <p className="font-medium mb-1">
            {new Date(data[hoverIdx].date).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-primary">
            {data[hoverIdx].clicks} clicks
          </p>
          <p className="text-muted-foreground">
            {data[hoverIdx].views} views
          </p>
        </div>
      )}
    </div>
  );
}

// Mock data for locked chart
const MOCK_CHART_DATA = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10),
  clicks: Math.floor(Math.random() * 30 + 5),
  views: Math.floor(Math.random() * 50 + 10),
}));

export default function AnalyticsPage() {
  const { profile, links, refreshData } = useProfile();
  const [period, setPeriod] = useState<Period>("7d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const currentPlan = profile.plan || "free";
  const limits = getPlanLimits(currentPlan);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch(`/api/analytics?period=${period}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silently fail — user sees existing data or skeletons
    }
  }, [period]);

  useEffect(() => {
    setLoading(true);
    fetchAnalytics().finally(() => setLoading(false));
  }, [fetchAnalytics]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshData(), fetchAnalytics()]);
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

  const summary = data?.summary;
  const totalClicks = summary?.totalClicks ?? links.reduce((s, l) => s + l.click_count, 0);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track how your links are performing.
          </p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Period selector */}
      <div className="inline-flex rounded-xl border p-1 bg-muted/30">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-lg transition-colors",
              period === p.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {/* Total Clicks — always visible */}
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MousePointerClick className="h-4 w-4" />
            <span className="text-xs font-medium">Total Clicks</span>
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <>
              <p className="text-3xl font-bold">{totalClicks}</p>
              {limits.hasFullAnalytics && summary && (
                <TrendBadge value={summary.clicksTrend} />
              )}
            </>
          )}
        </div>

        {/* Page Views */}
        <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Eye className="h-4 w-4" />
            <span className="text-xs font-medium">Page Views</span>
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <>
              <p className="text-3xl font-bold">
                {summary?.totalViews ?? profile.page_views ?? 0}
              </p>
              {limits.hasFullAnalytics && summary && (
                <TrendBadge value={summary.viewsTrend} />
              )}
            </>
          )}
          {!limits.hasFullAnalytics && <LockedOverlay />}
        </div>

        {/* CTR */}
        <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">CTR</span>
          </div>
          {loading ? (
            <Skeleton className="h-9 w-12" />
          ) : (
            <p className="text-3xl font-bold">{summary?.ctr ?? 0}%</p>
          )}
          {!limits.hasFullAnalytics && <LockedOverlay />}
        </div>

        {/* Active Links */}
        <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs font-medium">Active Links</span>
          </div>
          {loading ? (
            <Skeleton className="h-9 w-10" />
          ) : (
            <p className="text-3xl font-bold">{summary?.activeLinks ?? 0}</p>
          )}
          {!limits.hasFullAnalytics && <LockedOverlay />}
        </div>
      </motion.div>

      {/* Activity chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border bg-card p-5 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium">Activity</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Clicks & views over time
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              Clicks
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/30" />
              Views
            </span>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-48 w-full" />
        ) : limits.hasFullAnalytics ? (
          <AreaChart data={data?.clicksOverTime || []} />
        ) : (
          <>
            <div className="blur-sm pointer-events-none">
              <AreaChart data={MOCK_CHART_DATA} />
            </div>
            <LockedOverlay label="Upgrade to Pro" />
          </>
        )}
      </motion.div>

      {/* Traffic Sources */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border bg-card p-5 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">Traffic Sources</h2>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        ) : limits.hasFullAnalytics ? (
          data?.topReferrers && data.topReferrers.length > 0 ? (
            <div className="space-y-3">
              {data.topReferrers.map((ref) => (
                <div key={ref.domain} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium">{ref.domain}</span>
                    <span className="text-muted-foreground ml-2 tabular-nums">
                      {ref.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${ref.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No referrer data yet
            </p>
          )
        ) : (
          <>
            <div className="blur-sm pointer-events-none space-y-3">
              {["instagram.com", "twitter.com", "Direct"].map((d) => (
                <div key={d} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{d}</span>
                    <span>33%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted">
                    <div className="h-full bg-primary rounded-full w-1/3" />
                  </div>
                </div>
              ))}
            </div>
            <LockedOverlay label="Upgrade to Pro" />
          </>
        )}
      </motion.div>

      {/* Link Performance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border bg-card relative overflow-hidden"
      >
        <div className="p-5 border-b">
          <h2 className="text-sm font-medium">Link Performance</h2>
        </div>
        {loading ? (
          <div className="p-5 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : limits.hasFullAnalytics ? (
          data?.topLinks && data.topLinks.length > 0 ? (
            <div className="divide-y">
              {data.topLinks.map((link) => {
                const maxClicks = Math.max(
                  ...data.topLinks.map((l) => l.clicks),
                  1
                );
                return (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full shrink-0",
                          link.is_active
                            ? "bg-emerald-500"
                            : "bg-muted-foreground/30"
                        )}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {link.title}
                        </p>
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
                            width: `${(link.clicks / maxClicks) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-10 text-right tabular-nums">
                        {link.clicks}
                      </span>
                      {link.trend !== 0 && (
                        <span
                          className={cn(
                            "text-xs w-10 text-right",
                            link.trend > 0
                              ? "text-emerald-600"
                              : "text-red-500"
                          )}
                        >
                          {link.trend > 0 ? "+" : ""}
                          {link.trend}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">
                No links yet. Add links to start tracking clicks.
              </p>
            </div>
          )
        ) : (
          <>
            <div className="blur-sm pointer-events-none divide-y">
              {["YouTube", "Portfolio", "Twitter"].map((name) => (
                <div key={name} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        example.com
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">42</span>
                </div>
              ))}
            </div>
            <LockedOverlay label="Upgrade to Pro" />
          </>
        )}
      </motion.div>

      {/* Devices + Countries */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Devices */}
        <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
          <h2 className="text-sm font-medium mb-4">Devices</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : limits.hasFullAnalytics && currentPlan === "business" ? (
            data?.devices && data.devices.length > 0 ? (
              <div className="space-y-3">
                {data.devices.map((d) => {
                  const Icon = deviceIcons[d.device] || Monitor;
                  return (
                    <div key={d.device} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium capitalize">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          {d.device}
                        </span>
                        <span className="text-muted-foreground tabular-nums">
                          {d.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${d.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No device data yet
              </p>
            )
          ) : (
            <>
              <div className="blur-sm pointer-events-none space-y-3">
                {[
                  { name: "Mobile", pct: 65 },
                  { name: "Desktop", pct: 30 },
                  { name: "Tablet", pct: 5 },
                ].map((d) => (
                  <div key={d.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{d.name}</span>
                      <span>{d.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <LockedOverlay
                label={
                  limits.hasFullAnalytics
                    ? "Upgrade to Business"
                    : "Upgrade"
                }
              />
            </>
          )}
        </div>

        {/* Countries */}
        <div className="rounded-2xl border bg-card p-5 relative overflow-hidden">
          <h2 className="text-sm font-medium mb-4">Top Countries</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : limits.hasFullAnalytics && currentPlan === "business" ? (
            data?.countries && data.countries.length > 0 ? (
              <div className="space-y-3">
                {data.countries.map((c) => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <span>{countryToFlag(c.country)}</span>
                        {countryName(c.country)}
                      </span>
                      <span className="text-muted-foreground tabular-nums">
                        {c.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${c.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No country data yet
              </p>
            )
          ) : (
            <>
              <div className="blur-sm pointer-events-none space-y-3">
                {[
                  { flag: "🇺🇸", name: "United States", pct: 40 },
                  { flag: "🇬🇪", name: "Georgia", pct: 35 },
                  { flag: "🇹🇷", name: "Turkey", pct: 25 },
                ].map((c) => (
                  <div key={c.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {c.flag} {c.name}
                      </span>
                      <span>{c.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <LockedOverlay
                label={
                  limits.hasFullAnalytics
                    ? "Upgrade to Business"
                    : "Upgrade"
                }
              />
            </>
          )}
        </div>
      </motion.div>

      {/* Footer */}
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
