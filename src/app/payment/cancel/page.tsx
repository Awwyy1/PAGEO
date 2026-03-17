// Payment cancelled page — shown when user cancels Creem checkout
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <X className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment cancelled</h1>
        <p className="text-muted-foreground mb-8">
          No worries — you haven&apos;t been charged. You can try again whenever
          you&apos;re ready.
        </p>

        <Link
          href="/pricing"
          className="group inline-flex h-11 items-center justify-center rounded-full border border-border/60 bg-background px-8 text-sm font-medium transition-all hover:bg-accent gap-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to pricing
        </Link>
      </motion.div>
    </main>
  );
}
