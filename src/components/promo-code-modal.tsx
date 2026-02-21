// Promo code redemption modal — shown when user clicks Upgrade on pricing
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromoCodeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (plan: string) => void;
}

export function PromoCodeModal({ open, onClose, onSuccess }: PromoCodeModalProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.plan);
        onSuccess?.(data.plan);
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      } else {
        setError(data.error || "Invalid promo code");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Enter promo code</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Enter your promo code to upgrade your plan instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError(null);
                }}
                placeholder="PRO-XXXXXX"
                className={cn(
                  "w-full h-12 rounded-xl border bg-transparent px-4 text-sm font-mono uppercase tracking-wider placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                  error && "border-destructive focus:ring-destructive"
                )}
                autoFocus
                disabled={loading || !!success}
              />

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {success && (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Check className="h-4 w-4" />
                  Upgraded to {success.charAt(0).toUpperCase() + success.slice(1)}!
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !code.trim() || !!success}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : success ? (
                  <>
                    <Check className="h-4 w-4" />
                    Upgraded!
                  </>
                ) : (
                  "Redeem code"
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
