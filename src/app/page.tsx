// Landing page — hero with features, use-cases & CTA
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Palette,
  BarChart3,
  Shield,
  MousePointer2,
  Share2,
  Menu,
  X,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            allme
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
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
          {/* Mobile burger */}
          <button
            className="sm:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col p-4 gap-3">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  Pricing
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[100px]" />
          <div className="absolute top-60 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/[0.04] blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Left content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/80 backdrop-blur px-4 py-2 text-sm mb-8 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-muted-foreground">
                  Now in{" "}
                  <strong className="text-foreground">Open Beta</strong> &mdash; join now
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.08]"
              >
                Your links.
                <br />
                <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  One beautiful page.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-lg mx-auto lg:mx-0"
              >
                Create a stunning link&#8209;in&#8209;bio page in seconds. Share
                all your important links with a single URL.{" "}
                <span className="text-foreground font-medium">
                  Try it now.
                </span>
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link
                  href="/auth/register"
                  className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 gap-2"
                >
                  Create your page
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-background px-8 text-sm font-medium transition-all hover:bg-accent hover:-translate-y-0.5"
                >
                  View pricing
                </Link>
              </motion.div>

              {/* Value props row */}
              <motion.div
                variants={fadeUp}
                className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                  Setup in 30 sec
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Shield className="h-3.5 w-3.5 text-primary shrink-0" />
                  No setup needed
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Share2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  One link for all
                </span>
              </motion.div>
            </motion.div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/20 to-pink-500/20 blur-[60px] scale-125 rounded-full" />

                {/* Phone */}
                <div className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] rounded-[3rem] border-[6px] border-foreground/[0.08] bg-gradient-to-b from-background to-muted/30 overflow-hidden shadow-2xl shadow-black/[0.08]">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-3">
                    <div className="w-20 h-[22px] rounded-full bg-foreground/[0.07]" />
                  </div>

                  {/* Content */}
                  <div className="px-5 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.9,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-primary via-violet-500 to-pink-500 flex items-center justify-center mb-3 shadow-lg shadow-primary/20"
                    >
                      <span className="text-xl font-bold text-white">A</span>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      className="font-semibold text-sm"
                    >
                      Alex Johnson
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="text-[11px] text-muted-foreground text-center mt-1 mb-5"
                    >
                      Designer &amp; developer
                    </motion.p>

                    {[
                      "My Portfolio",
                      "GitHub",
                      "Twitter / X",
                      "Read my Blog",
                    ].map((title, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.12 }}
                        className="w-full rounded-xl border border-border/60 bg-card/80 backdrop-blur p-3 text-center text-xs font-medium mb-2.5 shadow-sm"
                      >
                        {title}
                      </motion.div>
                    ))}

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      className="text-[10px] text-muted-foreground mt-4"
                    >
                      Made with{" "}
                      <span className="font-semibold text-foreground/60">
                        Allme
                      </span>
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6 border-y border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "6", label: "Beautiful themes" },
            { value: "\u221E", label: "Links per page" },
            { value: "99.9%", label: "Uptime" },
            { value: "< 30s", label: "Setup time" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Powerful features to help you grow your audience and track your
              impact.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: MousePointer2,
                title: "Drag & Drop Editor",
                desc: "Reorder your links instantly with intuitive drag-and-drop. No coding required.",
              },
              {
                icon: Palette,
                title: "Custom Themes",
                desc: "Choose from beautiful themes to match your brand. Light, dark, or gradient.",
              },
              {
                icon: BarChart3,
                title: "Detailed Analytics",
                desc: "Track clicks, views, and engagement. Know exactly what\u2019s working.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Pages load instantly. Optimized for performance on every device.",
              },
              {
                icon: Share2,
                title: "One Link to Share",
                desc: "Replace your messy bio with one clean URL. Works everywhere.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data is yours. Built with enterprise-grade security from the ground up.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/15">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Get started in 3 steps
            </h2>
            <p className="text-muted-foreground mt-3">
              It takes less than a minute to launch your page.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                step: "01",
                title: "Create your account",
                desc: "Sign up with email in seconds. Pick your unique username and you're set.",
              },
              {
                step: "02",
                title: "Add your links",
                desc: "Drop in all the links you want to share. Customize titles and order.",
              },
              {
                step: "03",
                title: "Share your page",
                desc: "Get your unique allme.site/username URL. Share it everywhere.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-6xl font-bold bg-gradient-to-b from-primary/25 to-primary/5 bg-clip-text text-transparent mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for everyone
            </h2>
            <p className="text-muted-foreground mt-3">
              Whether you&apos;re a creator, freelancer, or business &mdash; Allme fits your workflow.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                emoji: "\uD83C\uDFA8",
                title: "Creators & Influencers",
                desc: "One link in your bio for all platforms. YouTube, TikTok, Instagram &mdash; everything in one place.",
              },
              {
                emoji: "\uD83D\uDCBB",
                title: "Developers & Freelancers",
                desc: "Showcase your portfolio, GitHub, resume, and contact info with a clean, professional page.",
              },
              {
                emoji: "\uD83C\uDFEA",
                title: "Small Businesses",
                desc: "Menu, booking, social media, reviews &mdash; give your customers everything they need instantly.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border/60 bg-card p-6"
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-3xl mx-auto text-center rounded-3xl overflow-hidden border border-border/40 p-12 sm:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-violet-500/[0.06] to-pink-500/[0.08]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to stand out?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Create your page in seconds and share everything that matters
              with a single link.
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

      {/* ── Footer ── */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold tracking-tight">allme</span>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Allme. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
