// Pricing page — Free / Pro / Business tiers with elegant design
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X as XIcon, Sparkles, Crown, Building2, ArrowRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PromoCodeModal } from "@/components/promo-code-modal";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

type Billing = "monthly" | "yearly";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Sparkles,
    desc: "Everything you need to get started.",
    price: { monthly: 0, yearly: 0 },
    cta: "Create free",
    ctaHref: "/auth/register",
    highlighted: false,
    features: [
      { text: "Up to 10 links", included: true },
      { text: "3 themes (Light, Dark, Gradient)", included: true },
      { text: "Basic analytics (total clicks)", included: true },
      { text: "Profile avatar & bio", included: true },
      { text: "allme.site/username URL", included: true },
      { text: "Custom OG preview", included: false },
      { text: "Remove Allme branding", included: false },
      { text: "Scheduled links", included: false },
      { text: "QR code", included: false },
      { text: "Custom domain", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    desc: "For creators who want to stand out.",
    price: { monthly: 5, yearly: 48 },
    cta: "Upgrade to Pro",
    ctaHref: "/auth/register",
    highlighted: true,
    badge: "Most popular",
    features: [
      { text: "Unlimited links", included: true },
      { text: "All 6 themes + custom colors", included: true },
      { text: "Full analytics (CTR, charts, daily)", included: true },
      { text: "Profile avatar & bio", included: true },
      { text: "allme.site/username URL", included: true },
      { text: "Custom OG preview", included: true },
      { text: "Remove Allme branding", included: true },
      { text: "Scheduled links", included: true },
      { text: "QR code", included: true },
      { text: "Custom domain", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: Building2,
    desc: "Full control for brands and teams.",
    price: { monthly: 15, yearly: 144 },
    cta: "Go Business",
    ctaHref: "/auth/register",
    highlighted: false,
    features: [
      { text: "Unlimited links", included: true },
      { text: "All themes + custom CSS", included: true },
      { text: "Full analytics + CSV export", included: true },
      { text: "Profile avatar & bio", included: true },
      { text: "allme.site/username URL", included: true },
      { text: "Custom OG preview", included: true },
      { text: "Remove Allme branding", included: true },
      { text: "Scheduled links", included: true },
      { text: "QR code", included: true },
      { text: "Custom domain", included: true },
    ],
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            allme
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Create
            </Link>
          </div>
          <button
            className="sm:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col p-4 gap-3">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">
                  Sign in
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute top-[600px] -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
      </div>

      {/* Header */}
      <section className="relative pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Simple, transparent{" "}
              <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
                pricing
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto"
            >
              Start building your page today. Upgrade when you&apos;re ready.
            </motion.p>

            {/* Billing toggle */}
            <motion.div
              variants={fadeUp}
              className="mt-8 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/80 backdrop-blur p-1"
            >
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  billing === "monthly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all relative",
                  billing === "yearly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
                <span className="absolute -top-2.5 -right-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 rounded-full px-1.5 py-0.5">
                  -20%
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="relative py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-5"
          >
            {plans.map((plan) => {
              const price = plan.price[billing];
              const perMonth = billing === "yearly" && price > 0 ? (price / 12).toFixed(0) : price;

              return (
                <motion.div
                  key={plan.id}
                  variants={fadeUp}
                  className={cn(
                    "relative rounded-3xl border p-8 flex flex-col transition-all duration-300",
                    plan.highlighted
                      ? "border-primary/40 bg-card shadow-xl shadow-primary/[0.06] scale-[1.02] lg:scale-105"
                      : "border-border/60 bg-card hover:shadow-lg hover:shadow-primary/[0.03] hover:-translate-y-1"
                  )}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary via-violet-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-primary/25">
                        <Sparkles className="h-3 w-3" />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <div className={cn(
                      "w-11 h-11 rounded-2xl flex items-center justify-center mb-4",
                      plan.highlighted
                        ? "bg-primary/15"
                        : "bg-muted"
                    )}>
                      <plan.icon className={cn(
                        "h-5 w-5",
                        plan.highlighted ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {price === 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-muted-foreground text-sm">/forever</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold">
                            ${perMonth}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /month
                          </span>
                        </div>
                        {billing === "yearly" && (
                          <p className="text-xs text-muted-foreground mt-1">
                            ${price}/year &mdash; billed annually
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  {plan.id === "free" ? (
                    <Link
                      href={plan.ctaHref}
                      className={cn(
                        "group inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-all gap-2 mb-8",
                        "border border-border/60 bg-background hover:bg-accent hover:-translate-y-0.5"
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setPromoOpen(true)}
                      className={cn(
                        "group inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-all gap-2 mb-8",
                        plan.highlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                          : "border border-border/60 bg-background hover:bg-accent hover:-translate-y-0.5"
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-border/60 mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={cn(
                          "flex items-start gap-3 text-sm",
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        )}
                      >
                        {feature.included ? (
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <XIcon className="h-2.5 w-2.5 text-muted-foreground/40" />
                          </div>
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight text-center mb-10"
          >
            Frequently asked questions
          </motion.h2>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            {[
              {
                q: "Can I upgrade or downgrade at any time?",
                a: "Yes. You can change your plan at any time from your dashboard. Changes take effect immediately.",
              },
              {
                q: "What happens to my links if I downgrade?",
                a: "Your links will remain, but you'll be limited to 10 active links on the Free plan. You can choose which ones to keep active.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 14-day money-back guarantee. If you're not happy, just reach out and we'll refund you.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards via Stripe. All payments are secure and encrypted.",
              },
            ].map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className="rounded-2xl border border-border/60 bg-card p-5"
              >
                <h3 className="font-medium text-sm">{faq.q}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center rounded-3xl overflow-hidden border border-border/40 p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-violet-500/[0.06] to-pink-500/[0.08]" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Ready to build your page?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators sharing their links with Allme.
            </p>
            <Link
              href="/auth/register"
              className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-10 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 gap-2"
            >
              Create your page
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold tracking-tight">allme</span>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Allme. All rights reserved.
          </p>
        </div>
      </footer>

      <PromoCodeModal open={promoOpen} onClose={() => setPromoOpen(false)} />
    </main>
  );
}
