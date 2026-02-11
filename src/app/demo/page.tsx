// Public demo profile page — shows how a Pageo page looks (reflects theme + avatar)
"use client";

import { motion } from "framer-motion";
import { useProfile } from "@/lib/profile-context";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const themeBg: Record<string, string> = {
  gradient: "bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white",
  ocean: "bg-blue-600 text-white",
  sunset: "bg-rose-500 text-white",
  forest: "bg-emerald-600 text-white",
};

export default function DemoPage() {
  const { profile, links, avatarPreview } = useProfile();
  const activeLinks = links.filter((l) => l.is_active);
  const theme = profile.theme;
  const isGradient = theme !== "light" && theme !== "dark";

  const initial = (
    profile.display_name ||
    profile.username ||
    "?"
  )[0].toUpperCase();

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center px-4 py-12 transition-colors duration-300",
        theme === "dark"
          ? "bg-gray-950 text-white"
          : isGradient
            ? themeBg[theme]
            : "bg-gradient-to-b from-primary/5 to-background text-foreground"
      )}
    >
      {/* Back link */}
      <Link
        href="/dashboard"
        className={cn(
          "self-start mb-8 flex items-center gap-1 text-sm transition-colors",
          theme === "dark" || isGradient
            ? "text-white/60 hover:text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center",
                isGradient
                  ? "bg-white/20"
                  : theme === "dark"
                    ? "bg-primary/30"
                    : "bg-primary/20"
              )}
            >
              <span
                className={cn(
                  "text-3xl font-bold",
                  isGradient ? "text-white" : "text-primary"
                )}
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
              isGradient
                ? "text-white/70"
                : theme === "dark"
                  ? "text-gray-400"
                  : "text-muted-foreground"
            )}
          >
            {profile.bio}
          </motion.p>
        )}

        {/* Links */}
        <div className="w-full space-y-3">
          {activeLinks.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center justify-center w-full rounded-2xl p-4 text-sm font-medium transition-shadow",
                isGradient
                  ? "bg-white/15 text-white shadow-sm hover:shadow-md hover:bg-white/20 backdrop-blur"
                  : theme === "dark"
                    ? "bg-gray-800 border border-gray-700 text-gray-200 shadow-sm hover:shadow-md hover:bg-gray-700"
                    : "border bg-card shadow-sm hover:shadow-md"
              )}
            >
              {link.title}
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={cn(
            "mt-12 text-xs",
            isGradient || theme === "dark"
              ? "text-white/40"
              : "text-muted-foreground"
          )}
        >
          Made with <span className="font-semibold">Pageo</span>
        </motion.p>
      </div>
    </main>
  );
}
