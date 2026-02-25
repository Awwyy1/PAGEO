// Dashboard layout — sidebar + main content area + persistent phone preview on all pages
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, BarChart3, Settings, ExternalLink, LogOut, Crown, Sparkles, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/profile-context";

import { PhonePreview } from "@/components/dashboard/phone-preview";
import { QrCodeButton } from "@/components/dashboard/qr-code-modal";
import type { Plan } from "@/types/database";

const planConfig: Record<Plan, { label: string; icon: typeof Sparkles; color: string; bg: string }> = {
  free: { label: "Free", icon: Sparkles, color: "text-muted-foreground", bg: "bg-muted" },
  pro: { label: "Pro", icon: Crown, color: "text-violet-600", bg: "bg-violet-500/10" },
  business: { label: "Business", icon: Building2, color: "text-amber-600", bg: "bg-amber-500/10" },
};

const navItems = [
  { href: "/dashboard", label: "Links", icon: Link2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { signOut, profile, links, avatarPreview } = useProfile();
  const publicUrl = `/${profile.username}`;
  const currentPlan = planConfig[profile.plan || "free"];
  const PlanIcon = currentPlan.icon;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card p-6 gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <img src="/icon.png" alt="Allme" className="h-6 w-6 rounded-md" />
            allme
          </Link>
          <a
            href="/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
              currentPlan.bg,
              currentPlan.color
            )}
          >
            <PlanIcon className="h-3 w-3" />
            {currentPlan.label}
          </a>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2">
          <Link
            href={publicUrl}
            className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View my page
          </Link>
          <QrCodeButton username={profile.username} plan={profile.plan || "free"} />
          <button
            onClick={async () => {
              try {
                await signOut();
              } catch (err) {
                console.error("Sign out error:", err);
              }
              window.location.href = "/";
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex md:hidden items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1.5 text-lg font-bold">
              <img src="/icon.png" alt="Allme" className="h-5 w-5 rounded-md" />
              allme
            </Link>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                currentPlan.bg,
                currentPlan.color
              )}
            >
              <PlanIcon className="h-2.5 w-2.5" />
              {currentPlan.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={publicUrl}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="View my page"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <QrCodeButton username={profile.username} variant="mobile" plan={profile.plan || "free"} />
            <button
              onClick={async () => {
                try {
                  await signOut();
                } catch (err) {
                  console.error("Sign out error:", err);
                }
                window.location.href = "/";
              }}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex md:hidden border-b px-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-6">
          <div className="flex gap-10 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0">{children}</div>
            {/* Divider + Phone preview — desktop only (side) */}
            <div className="hidden lg:block w-px self-stretch bg-border/60" />
            <div className="hidden lg:block">
              <PhonePreview
                profile={profile}
                links={links}
                avatarPreview={avatarPreview}
              />
            </div>
          </div>
          {/* Phone preview — mobile only (below content, hidden on settings page to allow custom placement) */}
          <div className={cn("lg:hidden mt-8 flex justify-center pb-8", pathname === "/dashboard/settings" && "hidden")}>
            <PhonePreview
              profile={profile}
              links={links}
              avatarPreview={avatarPreview}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
