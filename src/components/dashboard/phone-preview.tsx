// Real-time phone mockup preview of the user's public page
"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Profile, Link } from "@/types/database";

interface PhonePreviewProps {
  profile: Profile;
  links: Link[];
}

export function PhonePreview({ profile, links }: PhonePreviewProps) {
  const activeLinks = links.filter((l) => l.is_active);

  return (
    <div className="hidden lg:flex items-start justify-center pt-8 sticky top-8">
      {/* Phone frame */}
      <div className="w-[320px] h-[580px] rounded-[3rem] border-[8px] border-foreground/10 bg-background overflow-hidden shadow-xl">
        {/* Notch */}
        <div className="flex justify-center pt-2 pb-4">
          <div className="w-24 h-5 rounded-full bg-foreground/10" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 flex flex-col items-center overflow-y-auto h-[calc(100%-3rem)]">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-primary">
              {(profile.display_name || profile.username || "?")[0].toUpperCase()}
            </span>
          </div>

          <h2 className="font-semibold text-base">
            {profile.display_name || profile.username}
          </h2>
          {profile.bio && (
            <p className="text-xs text-muted-foreground text-center mt-1 mb-4">
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
                  className="w-full rounded-xl border bg-card p-3 text-center text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
                >
                  {link.title}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {activeLinks.length === 0 && (
            <p className="text-xs text-muted-foreground mt-8">
              No active links yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
