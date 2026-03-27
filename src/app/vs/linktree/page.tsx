import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Allme vs Linktree: Free Alternative (2026)",
  description:
    "Allme vs Linktree honest comparison. Both free plans side by side — links, themes, analytics, branding. See which link in bio tool fits you.",
  alternates: {
    canonical: "https://allme.site/vs/linktree",
  },
  openGraph: {
    title: "Allme vs Linktree: Free Link in Bio Alternative (2026)",
    description:
      "Honest side-by-side comparison of Allme and Linktree free plans. Features, pricing, and who each tool is best for.",
    url: "https://allme.site/vs/linktree",
    siteName: "Allme",
  },
};

function VsJsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://allme.site",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Allme vs Linktree",
          item: "https://allme.site/vs/linktree",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Allme a good free Linktree alternative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Allme's free plan offers 5 links, 3 themes, and basic analytics — comparable to Linktree's free tier. Allme also removes its branding on the Business plan, while Linktree requires a paid plan for branding removal.",
          },
        },
        {
          "@type": "Question",
          name: "How do I switch from Linktree to Allme?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Create a free Allme account at allme.site, add your links manually, then update your bio URL on Instagram, TikTok, and other platforms to your new allme.site/yourname link.",
          },
        },
        {
          "@type": "Question",
          name: "Does Allme have more themes than Linktree on the free plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Allme's free plan includes 3 themes (Light, Dark, Gradient), while Linktree's free plan offers 1 theme. Allme Pro unlocks 10 premium themes.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

const tableRows = [
  {
    feature: "Price (free plan)",
    allme: { value: "$0 forever", positive: true },
    linktree: { value: "$0 forever", positive: true },
  },
  {
    feature: "Links on free plan",
    allme: { value: "5 links", positive: true },
    linktree: { value: "5 links", positive: true },
  },
  {
    feature: "Themes on free plan",
    allme: { value: "3 themes", positive: true },
    linktree: { value: "1 theme", positive: false },
  },
  {
    feature: "Analytics on free plan",
    allme: { value: "Basic click counts", positive: true },
    linktree: { value: "Limited", positive: false },
  },
  {
    feature: "Branding removal",
    allme: { value: "Business plan ($9.99/mo)", positive: null },
    linktree: { value: "Paid plan required", positive: null },
  },
  {
    feature: "Scheduled links",
    allme: { value: "Pro plan ($3.99/mo)", positive: null },
    linktree: { value: "Paid plan required", positive: null },
  },
  {
    feature: "Custom OG preview",
    allme: { value: "Pro plan ($3.99/mo)", positive: null },
    linktree: { value: "Paid plan required", positive: null },
  },
  {
    feature: "Domain rating (Ahrefs)",
    allme: { value: "New — building", positive: false },
    linktree: { value: "~93 (established)", positive: true },
  },
];

function Cell({ value, positive }: { value: string; positive: boolean | null }) {
  return (
    <td className="px-4 py-3 text-sm">
      <div className="flex items-center gap-2">
        {positive === true && <Check className="h-4 w-4 text-green-500 shrink-0" />}
        {positive === false && <X className="h-4 w-4 text-red-400 shrink-0" />}
        {positive === null && <Minus className="h-4 w-4 text-muted-foreground shrink-0" />}
        <span className={positive === false ? "text-muted-foreground" : ""}>{value}</span>
      </div>
    </td>
  );
}

export default function VsLinktreePage() {
  return (
    <>
      <VsJsonLd />
      <main className="min-h-screen bg-background">
        {/* Nav */}
        <nav className="border-b border-border/40 px-6 h-14 flex items-center">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <img src="/icon.png" alt="Allme" className="h-6 w-6 rounded-full" />
              allme
            </Link>
            <Link
              href="/auth/register"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Try Free
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Allme vs Linktree</li>
            </ol>
          </nav>

          {/* H1 */}
          <div className="mb-4 text-sm font-medium text-primary">Comparison · Last updated March 2026</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Allme vs Linktree: Free Link in Bio Alternative (2026)
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            An honest, up-to-date comparison of both tools. We&apos;ll tell you where Linktree wins too — because that&apos;s the only way this is useful.
          </p>

          {/* TLDR Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">TL;DR — Feature Comparison</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Feature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Allme</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Linktree</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="px-4 py-3 text-sm font-medium">{row.feature}</td>
                      <Cell {...row.allme} />
                      <Cell {...row.linktree} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who should use what */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Who Should Use Which?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border p-6">
                <div className="text-sm font-semibold text-muted-foreground mb-3">CHOOSE LINKTREE IF…</div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-foreground">→</span> You need a tool with a long proven track record</li>
                  <li className="flex gap-2"><span className="text-foreground">→</span> Your team already uses Linktree and migration is a hassle</li>
                  <li className="flex gap-2"><span className="text-foreground">→</span> You need specific integrations (Shopify, Mailchimp, etc.)</li>
                  <li className="flex gap-2"><span className="text-foreground">→</span> Brand recognition matters for your audience</li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
                <div className="text-sm font-semibold text-primary mb-3">CHOOSE ALLME IF…</div>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2"><span className="text-primary">→</span> You want more themes on the free plan (3 vs 1)</li>
                  <li className="flex gap-2"><span className="text-primary">→</span> You&apos;re starting out and want zero cost, zero commitment</li>
                  <li className="flex gap-2"><span className="text-primary">→</span> You want scheduled links at $3.99/mo instead of Linktree&apos;s higher tiers</li>
                  <li className="flex gap-2"><span className="text-primary">→</span> You prefer a fast, clean, modern design out of the box</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Switch guide */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">How to Switch from Linktree to Allme</h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Create your free Allme account",
                  desc: 'Go to allme.site and sign up. Pick your username — ideally the same one you use on Linktree so your audience recognises it.',
                },
                {
                  step: "2",
                  title: "Add your links",
                  desc: "Copy your links from Linktree one by one into Allme. Pick a theme, upload your avatar. Takes about 5 minutes.",
                },
                {
                  step: "3",
                  title: "Update your bio URL",
                  desc: "Replace your Linktree URL with your new allme.site/yourname link on Instagram, TikTok, YouTube, Twitter, and anywhere else you use it.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {step}
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2">Is Allme a good free Linktree alternative?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes. Allme&apos;s free plan is comparable to Linktree&apos;s free tier — both allow 5 links. Allme gives you more themes (3 vs 1) on the free plan, and paid plans start at $3.99/mo vs Linktree&apos;s higher pricing.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">How do I switch from Linktree to Allme?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Create a free account, add your links, then update your bio URL on each platform. The whole process takes under 10 minutes and your old Linktree page stays live during the transition.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Does Allme have more themes than Linktree on the free plan?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes — Allme free includes 3 themes (Light, Dark, Gradient). Linktree&apos;s free plan offers 1 theme. Allme Pro unlocks 10 premium themes for $3.99/mo.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Try Allme Free — No Credit Card Required</h2>
            <p className="text-muted-foreground mb-6">
              Create your link in bio page in under 30 seconds.{" "}
              <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground transition-colors">
                See all plans →
              </Link>
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Create Your Free Page
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
