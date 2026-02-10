// Public demo profile page — shows how a Pageo page looks to visitors
"use client";

import { motion } from "framer-motion";
import { mockProfile, mockLinks } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DemoPage() {
  const profile = mockProfile;
  const activeLinks = mockLinks.filter((l) => l.is_active);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-primary/5 to-background">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="self-start mb-8 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4"
        >
          <span className="text-3xl font-bold text-primary">
            {(profile.display_name || "?")[0].toUpperCase()}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold"
        >
          {profile.display_name}
        </motion.h1>

        {profile.bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground text-center mt-2 mb-8"
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
              className="flex items-center justify-center w-full rounded-2xl border bg-card p-4 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
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
          className="mt-12 text-xs text-muted-foreground"
        >
          Made with <span className="font-semibold">Pageo</span>
        </motion.p>
      </div>
    </main>
  );
}
