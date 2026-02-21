// Dashboard layout — sidebar + main content area + persistent phone preview on all pages
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, BarChart3, Settings, ExternalLink, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/profile-context";
import { useRouter } from "next/navigation";
import { PhonePreview } from "@/components/dashboard/phone-preview";
import { QrCodeButton } from "@/components/dashboard/qr-code-modal";

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
  const router = useRouter();
  const { signOut, profile, links, avatarPreview } = useProfile();
  const publicUrl = `/${profile.username}`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card p-6 gap-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          allme
        </Link>

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
          <QrCodeButton username={profile.username} />
          <button
            onClick={async () => {
              await signOut();
              router.push("/");
              router.refresh();
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
          <Link href="/" className="text-lg font-bold">
            allme
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={publicUrl}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
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
            {/* Divider + Phone preview — visible on all dashboard pages */}
            <div className="hidden lg:block w-px self-stretch bg-border/60" />
            <div className="hidden lg:block">
              <PhonePreview
                profile={profile}
                links={links}
                avatarPreview={avatarPreview}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
