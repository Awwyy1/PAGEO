// Notification bell — shows click activity on links
"use client";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Link as LinkType } from "@/types/database";

interface NotificationBellProps {
    links: LinkType[];
    profileId: string;
}

export function NotificationBell({ links, profileId }: NotificationBellProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [newClicks, setNewClicks] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const totalClicks = links.reduce((sum, l) => sum + l.click_count, 0);
    const linksWithClicks = [...links]
        .filter((l) => l.click_count > 0)
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 8);

    // Calculate new clicks since last seen
    useEffect(() => {
        const key = `allme_last_seen_clicks_${profileId}`;
        const lastSeen = parseInt(localStorage.getItem(key) || "0", 10);
        setNewClicks(Math.max(0, totalClicks - lastSeen));
    }, [totalClicks, profileId]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);

    // Mark as seen when dropdown opens
    const handleToggle = () => {
        const opening = !isOpen;
        setIsOpen(opening);
        if (opening) {
            const key = `allme_last_seen_clicks_${profileId}`;
            localStorage.setItem(key, totalClicks.toString());
            setNewClicks(0);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className={cn(
                    "relative flex items-center justify-center rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    isOpen && "bg-accent text-accent-foreground"
                )}
                aria-label="Notifications"
            >
                <Bell className="h-[18px] w-[18px]" />
                {newClicks > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
                        {newClicks > 99 ? "99+" : newClicks}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border bg-card shadow-lg z-50 overflow-hidden">
                    {/* Header */}
                    <div className="border-b px-4 py-3">
                        <h3 className="text-sm font-semibold">Activity</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {totalClicks} total {totalClicks === 1 ? "click" : "clicks"} across all links
                        </p>
                    </div>

                    {/* Content */}
                    <div className="max-h-72 overflow-y-auto">
                        {linksWithClicks.length === 0 ? (
                            <div className="px-4 py-8 text-center">
                                <Bell className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">No clicks yet</p>
                                <p className="text-xs text-muted-foreground/60 mt-1">
                                    Share your page to start getting clicks
                                </p>
                            </div>
                        ) : (
                            <ul className="py-1">
                                {linksWithClicks.map((link) => (
                                    <li
                                        key={link.id}
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                                            <span className="text-xs font-bold text-violet-600">
                                                {link.click_count}
                                            </span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium truncate">{link.title}</p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {link.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {linksWithClicks.length > 0 && (
                        <div className="border-t px-4 py-2.5">
                            <a
                                href="/dashboard/analytics"
                                className="text-xs font-medium text-violet-600 hover:underline"
                            >
                                View full analytics →
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
