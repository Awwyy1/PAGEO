// Client component for public profile — handles animations, click tracking, social icons, and custom themes
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSocialIcon } from "@/lib/social-icons";
import { Share2, Check } from "lucide-react";
import type { Profile, Link } from "@/types/database";
import { getFontClass, getAlignmentClass } from "@/lib/fonts";

const themeBg: Record<string, string> = {
  gradient: "bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white",
  ocean: "bg-blue-600 text-white",
  sunset: "bg-rose-500 text-white",
  forest: "bg-emerald-600 text-white",
  midnight: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white",
  rose: "bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 text-gray-900",
  cyber: "bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white",
  minimal: "bg-stone-50 text-stone-900",
};

interface Props {
  profile: Profile;
  links: Link[];
}

export function ProfilePageClient({ profile, links }: Props) {
  const theme = profile.theme;
  const isCustom = theme === "custom";
  const cc = profile.custom_colors;
  const isGradient = !isCustom && theme !== "light" && theme !== "dark";
  const showBranding = profile.plan !== "business";
  const [copied, setCopied] = useState(false);

  // Filter out scheduled links that haven't arrived yet
  const visibleLinks = links.filter((link) => {
    if (!link.scheduled_at) return true;
    return new Date(link.scheduled_at) <= new Date();
  });

  const initial = (
    profile.display_name ||
    profile.username ||
    "?"
  )[0].toUpperCase();

  // Track page view once on mount
  useEffect(() => {
    fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: profile.username, referrer: document.referrer }),
    }).catch(() => { });
  }, [profile.username]);

  const handleLinkClick = (linkId: string) => {
    const data = JSON.stringify({ linkId, referrer: document.referrer });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/click", new Blob([data], { type: "application/json" }));
    } else {
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
        keepalive: true,
      }).catch(() => { });
    }
  };

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const title = `${profile.display_name || profile.username} — allme`;
    // Try native Web Share API first (mobile + some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or API failed — fall through to clipboard
      }
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort: prompt
      window.prompt("Copy this link:", url);
    }
  }, [profile.display_name, profile.username]);

  const fontClass = getFontClass(profile.font);
  const alignClass = getAlignmentClass(profile.content_alignment);

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center px-4 py-12 transition-colors duration-300",
        fontClass,
        isCustom
          ? ""
          : theme === "dark"
            ? "bg-gray-950 text-white"
            : isGradient
              ? themeBg[theme]
              : "bg-gradient-to-b from-primary/5 to-background text-foreground"
      )}
      style={isCustom && cc ? { backgroundColor: cc.bg, color: cc.text } : undefined}
    >
      <div className={cn("w-full max-w-md flex flex-col", alignClass)}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 relative"
        >
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center",
                isCustom
                  ? ""
                  : isGradient
                    ? "bg-white/20"
                    : theme === "dark"
                      ? "bg-primary/30"
                      : "bg-primary/20"
              )}
              style={isCustom && cc ? { backgroundColor: `${cc.buttonBg}30` } : undefined}
            >
              <span
                className={cn(
                  "text-3xl font-bold",
                  isCustom
                    ? ""
                    : isGradient ? "text-white" : "text-primary"
                )}
                style={isCustom && cc ? { color: cc.text } : undefined}
              >
                {initial}
              </span>
            </div>
          )}
          {/* Verified badge — Business plan only */}
          {profile.plan === "business" && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
                <g transform="translate(1.407 1.407) scale(2.81)">
                  <polygon points="45,6.18 57.06,0 64.41,11.38 77.94,12.06 78.62,25.59 90,32.94 83.82,45 90,57.06 78.62,64.41 77.94,77.94 64.41,78.62 57.06,90 45,83.82 32.94,90 25.59,78.62 12.06,77.94 11.38,64.41 0,57.06 6.18,45 0,32.94 11.38,25.59 12.06,12.06 25.59,11.38 32.94,0" fill="rgb(0,150,241)" />
                  <polygon points="40.16,58.47 26.24,45.08 29.7,41.48 40.15,51.52 61.22,31.08 64.7,34.67" fill="white" />
                </g>
              </svg>
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold"
          style={isCustom && cc ? { color: cc.text } : undefined}
        >
          {profile.display_name || profile.username}
        </motion.h1>

        {profile.bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "text-sm mt-2 mb-4 whitespace-pre-line",
              isCustom
                ? ""
                : isGradient
                  ? "text-white/70"
                  : theme === "dark"
                    ? "text-gray-400"
                    : "text-muted-foreground"
            )}
            style={isCustom && cc ? { color: `${cc.text}99` } : undefined}
          >
            {profile.bio}
          </motion.p>
        )}

        {/* Share button — hidden for now, code preserved */}
        {false && <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={handleShare}
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all mt-2 mb-6",
            isCustom
              ? ""
              : isGradient
                ? "bg-white/15 text-white/80 hover:bg-white/25 backdrop-blur"
                : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 border border-border"
          )}
          style={isCustom && cc ? {
            backgroundColor: `${cc?.buttonBg}20`,
            color: `${cc?.text}cc`,
            borderColor: `${cc?.buttonBg}40`,
          } : undefined}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5" />
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>}

        {/* Links with social icons */}
        <div className="w-full space-y-3 mt-4">
          {visibleLinks.map((link, i) => {
            const social = getSocialIcon(link.url);
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center w-full rounded-2xl p-4 text-sm font-medium transition-shadow gap-3",
                  isCustom
                    ? "shadow-sm hover:shadow-md"
                    : isGradient
                      ? "bg-white/15 text-white shadow-sm hover:shadow-md hover:bg-white/20 backdrop-blur"
                      : theme === "dark"
                        ? "bg-gray-800 border border-gray-700 text-gray-200 shadow-sm hover:shadow-md hover:bg-gray-700"
                        : "border bg-card shadow-sm hover:shadow-md"
                )}
                style={isCustom && cc ? {
                  backgroundColor: cc.buttonBg,
                  color: cc.buttonText,
                } : undefined}
              >
                <social.Icon
                  className="h-5 w-5 shrink-0"
                  style={{
                    color: isCustom && cc
                      ? `${cc.buttonText}cc`
                      : isGradient || theme === "dark"
                        ? "rgba(255,255,255,0.7)"
                        : social.color,
                  }}
                />
                <span className="flex-1 text-center pr-8">{link.title}</span>
              </motion.a>
            );
          })}
        </div>

        {visibleLinks.length === 0 && (
          <p
            className={cn(
              "text-sm mt-8",
              isCustom
                ? ""
                : isGradient || theme === "dark"
                  ? "text-white/50"
                  : "text-muted-foreground"
            )}
            style={isCustom && cc ? { color: `${cc.text}60` } : undefined}
          >
            No links yet
          </p>
        )}

        {/* Footer — Allme branding (hidden for Business) */}
        {showBranding && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={cn(
              "mt-12 text-xs",
              isCustom
                ? ""
                : isGradient || theme === "dark"
                  ? "text-white/40"
                  : "text-muted-foreground"
            )}
            style={isCustom && cc ? { color: `${cc.text}40` } : undefined}
          >
            Made with{" "}
            <a href="/" className="font-semibold hover:underline">
              allme
            </a>
          </motion.p>
        )}
      </div>
    </main>
  );
}
