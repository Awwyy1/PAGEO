// Payment success page — shown after successful Creem checkout
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const planLabel = plan === "business" ? "Business" : plan === "pro" ? "Pro" : "your new";

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment successful!</h1>
        <p className="text-muted-foreground mb-8">
          You&apos;ve been upgraded to the <strong>{planLabel}</strong> plan. Enjoy all
          the new features!
        </p>

        <Link
          href="/dashboard"
          className="group inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 gap-2"
        >
          Go to dashboard
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
