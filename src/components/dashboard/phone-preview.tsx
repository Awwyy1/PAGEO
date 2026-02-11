// Real-time phone mockup preview — reflects theme, avatar, and profile changes
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Profile, Link } from "@/types/database";

interface PhonePreviewProps {
  profile: Profile;
  links: Link[];
  avatarPreview?: string | null;
}

const themeBg: Record<string, string> = {
  gradient: "border-violet-400/30 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700",
  ocean: "border-blue-500/30 bg-blue-600",
  sunset: "border-rose-400/30 bg-rose-500",
  forest: "border-emerald-500/30 bg-emerald-600",
};

export function PhonePreview({ profile, links, avatarPreview }: PhonePreviewProps) {
  const activeLinks = links.filter((l) => l.is_active);
  const theme = profile.theme;
  const isGradient = theme !== "light" && theme !== "dark";

  const initial = (
    profile.display_name ||
    profile.username ||
    "?"
  )[0].toUpperCase();

  return (
    <div className="hidden lg:flex items-start justify-center pt-8 sticky top-8">
      {/* Phone frame */}
      <div
        className={cn(
          "w-[320px] h-[580px] rounded-[3rem] border-[8px] overflow-hidden shadow-xl transition-colors duration-300",
          theme === "dark"
            ? "border-gray-700 bg-gray-950"
            : isGradient
              ? themeBg[theme]
              : "border-foreground/10 bg-background"
        )}
      >
        {/* Notch */}
        <div className="flex justify-center pt-2 pb-4">
          <div
            className={cn(
              "w-24 h-5 rounded-full",
              theme === "dark"
                ? "bg-gray-800"
                : isGradient
                  ? "bg-white/15"
                  : "bg-foreground/10"
            )}
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 flex flex-col items-center overflow-y-auto h-[calc(100%-3rem)]">
          {/* Avatar */}
          <div className="mb-3">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />
            ) : (
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center",
                  isGradient
                    ? "bg-white/20"
                    : theme === "dark"
                      ? "bg-primary/30"
                      : "bg-primary/20"
                )}
              >
                <span
                  className={cn(
                    "text-2xl font-bold",
                    isGradient
                      ? "text-white"
                      : "text-primary"
                  )}
                >
                  {initial}
                </span>
              </div>
            )}
          </div>

          <h2
            className={cn(
              "font-semibold text-base",
              theme === "dark" || isGradient
                ? "text-white"
                : "text-foreground"
            )}
          >
            {profile.display_name || profile.username}
          </h2>

          {profile.bio && (
            <p
              className={cn(
                "text-xs text-center mt-1 mb-4",
                isGradient
                  ? "text-white/70"
                  : theme === "dark"
                    ? "text-gray-400"
                    : "text-muted-foreground"
              )}
            >
              {profile.bio}
            </p>
          )}

          {/* Links */}
          <div className="w-full space-y-2.5 mt-2">
            <AnimatePresence mode="popLayout">
              {activeLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "w-full rounded-xl p-3 text-center text-sm font-medium transition-colors cursor-pointer",
                    isGradient
                      ? "bg-white/15 text-white hover:bg-white/25"
                      : theme === "dark"
                        ? "bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700"
                        : "border bg-card text-foreground hover:bg-accent"
                  )}
                >
                  {link.title}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {activeLinks.length === 0 && (
            <p
              className={cn(
                "text-xs mt-8",
                isGradient || theme === "dark"
                  ? "text-white/50"
                  : "text-muted-foreground"
              )}
            >
              No active links yet
            </p>
          )}

          {/* Footer */}
          <p
            className={cn(
              "mt-auto pt-4 text-[10px]",
              isGradient || theme === "dark"
                ? "text-white/30"
                : "text-muted-foreground/50"
            )}
          >
            Powered by <span className="font-semibold">Pageo</span>
          </p>
        </div>
      </div>
    </div>
  );
}
