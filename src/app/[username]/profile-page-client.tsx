// Client component for public profile — handles animations, click tracking, social icons, and custom themes
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSocialIcon } from "@/lib/social-icons";
import type { Profile, Link } from "@/types/database";

const themeBg: Record<string, string> = {
  gradient: "bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white",
  ocean: "bg-blue-600 text-white",
  sunset: "bg-rose-500 text-white",
  forest: "bg-emerald-600 text-white",
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
      body: JSON.stringify({ username: profile.username }),
    }).catch(() => {});
  }, [profile.username]);

  const handleLinkClick = (linkId: string) => {
    const data = JSON.stringify({ linkId });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/click", new Blob([data], { type: "application/json" }));
    } else {
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
        keepalive: true,
      }).catch(() => {});
    }
  };

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center px-4 py-12 transition-colors duration-300",
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
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
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
              "text-sm text-center mt-2 mb-8",
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

        {/* Links with social icons */}
        <div className="w-full space-y-3 mt-4">
          {links.map((link, i) => {
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

        {links.length === 0 && (
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

        {/* Footer */}
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
      </div>
    </main>
  );
}
