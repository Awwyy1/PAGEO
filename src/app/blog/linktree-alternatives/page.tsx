import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "7 Best Free Linktree Alternatives in 2026",
  description:
    "Linktree's free plan limits links and themes. Here are 7 free alternatives — what each offers, who it's for, and where each falls short.",
  alternates: {
    canonical: "https://allme.site/blog/linktree-alternatives",
  },
  openGraph: {
    title: "7 Best Free Linktree Alternatives in 2026",
    description:
      "Honest comparison of 7 free Linktree alternatives. Features, limits, and who each tool suits best.",
    url: "https://allme.site/blog/linktree-alternatives",
    siteName: "Allme",
    type: "article",
  },
};

function ArticleJsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://allme.site" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://allme.site/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: "7 Best Free Linktree Alternatives in 2026",
          item: "https://allme.site/blog/linktree-alternatives",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "7 Best Free Linktree Alternatives in 2026",
      description:
        "Linktree's free plan limits links and themes. Here are 7 free alternatives — what each offers, who it's for, and where each falls short.",
      datePublished: "2026-03-01T00:00:00Z",
      dateModified: "2026-03-27T00:00:00Z",
      author: {
        "@type": "Organization",
        name: "Allme",
        url: "https://allme.site",
      },
      publisher: {
        "@type": "Organization",
        name: "Allme",
        logo: { "@type": "ImageObject", url: "https://allme.site/icon.png" },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://allme.site/blog/linktree-alternatives" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best free Linktree alternative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on your needs. Allme is a solid free option with 5 links, 3 themes, and analytics. Beacons works well for creators who want a more visual page. Carrd is better if you need a simple one-page website rather than a pure link list.",
          },
        },
        {
          "@type": "Question",
          name: "Why do people look for Linktree alternatives?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Linktree's free plan limits you to one theme and basic features. Some users want more customisation, lower-cost paid plans, or a tool without Linktree branding on their page.",
          },
        },
        {
          "@type": "Question",
          name: "Can I switch from Linktree to another tool without losing traffic?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — update your bio link on each platform to your new URL. Your old Linktree page stays live during the transition, so you won't lose traffic if you update quickly.",
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

const tools = [
  {
    name: "Allme",
    url: "https://allme.site",
    tagline: "Free link in bio for creators, developers, and businesses",
    what: "Allme is a link in bio tool built on Next.js, designed to be fast and easy to set up. Your page lives at allme.site/yourname.",
    free: "Up to 5 links, 3 themes (Light, Dark, Gradient), basic click analytics, profile avatar and bio. Free forever, no credit card required.",
    paidNote: "Pro plan ($3.99/mo) adds 15 links, 10 themes, daily analytics, custom OG preview, scheduled links, and a QR code. Business plan ($9.99/mo) adds unlimited links, custom colors, advanced analytics with geo and device breakdown, branding removal, and a verified badge.",
    suitedFor: "Creators, developers, and small businesses who want a clean, fast page and honest analytics without a high monthly cost.",
    cons: "Newer product — smaller ecosystem, no third-party integrations (Shopify, Mailchimp, etc.) yet. Limited to 5 links on the free plan.",
    internal: true,
  },
  {
    name: "Beacons",
    url: null,
    tagline: "Creator-focused with AI features",
    what: "Beacons is a link in bio tool with a strong focus on creators — it includes monetisation features like tipping, digital product sales, and email capture alongside standard link pages.",
    free: "Free tier available with basic link page, limited analytics, and Beacons branding. The monetisation features that make Beacons distinctive are mostly on paid tiers.",
    paidNote: "Paid plans start around $8/mo and unlock more features. Pricing is higher than some alternatives.",
    suitedFor: "Creators who want to sell digital products or accept tips directly through their link page.",
    cons: "Free plan is limited. Paid plan costs are higher than most alternatives on this list. Can feel complex if you only need a simple link list.",
    internal: false,
  },
  {
    name: "Carrd",
    url: null,
    tagline: "Simple one-page website builder",
    what: "Carrd is a one-page website builder, not a dedicated link in bio tool. You can build a link page with it, but it's designed for more flexible single-page sites — portfolios, landing pages, and personal sites.",
    free: "Free tier allows up to 3 sites with Carrd branding. Very limited compared to paid tiers.",
    paidNote: "Paid plans start at $19/year and unlock custom domains, forms, and more site slots.",
    suitedFor: "People who want more design flexibility or a simple portfolio page rather than a pure link list.",
    cons: "Not purpose-built for link in bio use. Free tier is heavily restricted. Requires more design effort than a dedicated link tool.",
    internal: false,
  },
  {
    name: "Bio.link",
    url: null,
    tagline: "Minimal, straightforward free option",
    what: "Bio.link is a straightforward link in bio tool with a clean interface. It focuses on simplicity — add links, pick a theme, share your URL.",
    free: "Free plan includes unlimited links and basic themes. No analytics on the free tier.",
    paidNote: "Paid plans add analytics, custom domains, and more themes. Pricing is competitive.",
    suitedFor: "Users who want a simple, no-frills link page with unlimited links and don't need analytics on the free tier.",
    cons: "No analytics on the free plan. Less active development compared to larger tools. Smaller user base means fewer resources and tutorials.",
    internal: false,
  },
  {
    name: "Taplink",
    url: null,
    tagline: "Popular in CIS markets, messenger integration",
    what: "Taplink is a link in bio tool popular in Russia and CIS countries. It supports WhatsApp and Telegram links as first-class elements, which is relevant for markets where those messengers dominate.",
    free: "Free plan available with basic features and Taplink branding.",
    paidNote: "Paid plans add analytics, more blocks, and custom design. Pricing is moderate.",
    suitedFor: "Users who rely on WhatsApp or Telegram for business and want those prominently featured. Good fit for CIS-region businesses.",
    cons: "Interface feels dated compared to newer tools. Less polished design options on free tier. Less known outside of CIS markets.",
    internal: false,
  },
  {
    name: "Milkshake",
    url: null,
    tagline: "Mobile-first, app-based",
    what: "Milkshake is a mobile app for building link pages. You create and manage your page entirely from your phone, which suits creators who handle everything from their phone anyway.",
    free: "Free plan available with basic cards and themes. All management is done through the iOS or Android app.",
    paidNote: "Paid tier adds more customisation and removes Milkshake branding.",
    suitedFor: "Mobile-first creators who prefer managing their page from their phone rather than a browser dashboard.",
    cons: "No desktop management — you must use the app. Limited flexibility compared to browser-based tools. Less control over layout and design.",
    internal: false,
  },
  {
    name: "Later (Linkin.bio)",
    url: null,
    tagline: "Social scheduling tool with a bio link feature",
    what: "Later is primarily a social media scheduling tool. Its Linkin.bio feature creates a shoppable link page that mirrors your Instagram grid — each post links to a URL you specify. It's a different concept from the other tools on this list.",
    free: "Later has a free plan for scheduling, but Linkin.bio (the link page feature) requires a paid plan starting around $16.67/mo.",
    paidNote: "Linkin.bio is only available on paid Later plans. It's a premium feature, not a free tool.",
    suitedFor: "Businesses and creators already using Later for social scheduling who want their Instagram grid to be shoppable. Not worth it as a standalone link page tool.",
    cons: "Not free for the link page feature. Overkill if you don't need social scheduling. High cost for what is otherwise a simple link page.",
    internal: false,
  },
];

export default function LinktreeAlternativesPost() {
  return (
    <>
      <ArticleJsonLd />
      <main className="min-h-screen bg-background">
        {/* Nav */}
        <nav className="border-b border-border/40 px-6 h-14 flex items-center">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <img src="/icon.png" alt="Allme" className="h-6 w-6 rounded-full" />
              allme
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                Blog
              </Link>
              <Link
                href="/auth/register"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Try Allme Free
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-foreground">Linktree Alternatives</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Comparison</span>
              <span className="text-xs text-muted-foreground">March 2026 · 8 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              7 Best Free Linktree Alternatives in 2026
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Linktree is the most recognised name in link in bio tools, but its free plan has real limitations. Here are 7 alternatives — including one we built ourselves — with an honest look at what each one offers and where each falls short.
            </p>
          </div>

          {/* Intro */}
          <div className="prose-section mb-12 space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">Why people look for Linktree alternatives</h2>
            <p>
              Linktree&apos;s free plan gives you unlimited links, but locks you to a single theme — the classic Linktree look that by now most audiences will recognise as generic. Analytics are limited, and the Linktree logo appears on every free page. It works, but it&apos;s deliberately constrained to push you toward a paid plan.
            </p>
            <p>
              That&apos;s a reasonable business model, but it means free users are stuck with one look and minimal data. If you want a page that feels like yours, or you want to know which links are actually getting clicks, you&apos;ll either pay up or look elsewhere.
            </p>
            <p>
              The tools below cover a range of approaches — some are direct replacements, some take a different angle entirely. We&apos;ve included our own product (Allme) at the top because that&apos;s the honest thing to do when you&apos;re writing about your own category. Where competitors do something better, we&apos;ll say so.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-12 mb-16">
            {tools.map((tool, i) => (
              <article key={tool.name} className={`rounded-xl border p-7 ${tool.internal ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">#{i + 1}</div>
                    <h2 className="text-2xl font-bold">
                      {tool.internal ? (
                        <Link href="/" className="hover:text-primary transition-colors">{tool.name}</Link>
                      ) : (
                        tool.name
                      )}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{tool.tagline}</p>
                  </div>
                  {tool.internal && (
                    <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      This is us
                    </span>
                  )}
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-semibold text-foreground mb-1">What it is</div>
                    <p className="text-muted-foreground leading-relaxed">{tool.what}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">What&apos;s free</div>
                    <p className="text-muted-foreground leading-relaxed">{tool.free}</p>
                  </div>
                  {tool.paidNote && (
                    <div>
                      <div className="font-semibold text-foreground mb-1">Paid plans</div>
                      <p className="text-muted-foreground leading-relaxed">{tool.paidNote}</p>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground mb-1">Suited for</div>
                    <p className="text-muted-foreground leading-relaxed">{tool.suitedFor}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Worth noting</div>
                    <p className="text-muted-foreground leading-relaxed">{tool.cons}</p>
                  </div>
                </div>

                {tool.internal && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Try Allme Free <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/vs/linktree"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Allme vs Linktree comparison
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* How to choose */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">How to Choose the Right Linktree Alternative</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The right tool depends on what you actually need. A few questions to guide the decision:
              </p>
              <div className="space-y-3">
                {[
                  {
                    q: "Do you need more than 5 links on the free plan?",
                    a: "Bio.link offers unlimited links on its free tier. Allme, Beacons, and Linktree cap you at 5 on free plans.",
                  },
                  {
                    q: "Do you need analytics without paying?",
                    a: "Allme includes basic click analytics on the free plan. Linktree and most others reserve analytics for paid tiers.",
                  },
                  {
                    q: "Do you want to sell products or accept tips through your link page?",
                    a: "Beacons is the strongest option here — it's built around creator monetisation.",
                  },
                  {
                    q: "Do you want a one-page site rather than a link list?",
                    a: "Carrd gives you more design control. It's more effort to set up but more flexible in what you can build.",
                  },
                  {
                    q: "Do you manage everything from your phone?",
                    a: "Milkshake is the only app-first tool on this list. If a browser dashboard feels like friction, Milkshake removes it.",
                  },
                  {
                    q: "Are you already using a social scheduling tool?",
                    a: "Later's Linkin.bio integrates with its scheduler. Only worth considering if you're already paying for Later.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="rounded-xl border border-border p-4">
                    <div className="font-semibold text-foreground text-sm mb-1">{q}</div>
                    <div className="text-sm">{a}</div>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                If you&apos;re starting out and want the simplest path:{" "}
                <Link href="/for/creators" className="underline underline-offset-4 hover:text-foreground transition-colors">
                  creators
                </Link>{" "}
                and{" "}
                <Link href="/for/creators" className="underline underline-offset-4 hover:text-foreground transition-colors text-foreground">
                  small businesses
                </Link>{" "}
                can get a working page in under two minutes on any of the free tiers above. Pick one, try it for a week, and switch if it doesn&apos;t fit.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2">What is the best free Linktree alternative?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  It depends on your needs. Allme gives you 3 themes and analytics on the free plan. Bio.link gives you unlimited links for free. Beacons suits creators who want to monetise directly. There&apos;s no universal answer — the{" "}
                  <Link href="/vs/linktree" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    Allme vs Linktree comparison
                  </Link>{" "}
                  covers the most common side-by-side questions.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Why do people look for Linktree alternatives?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Linktree&apos;s free plan limits you to one theme and minimal analytics. Some users want more customisation, lower-cost paid plans, or a page without the Linktree logo. Paid alternatives often offer similar feature sets for less.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Can I switch from Linktree without losing traffic?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes — your old Linktree page stays live when you create a new account elsewhere. Add your new link, update your bio on each platform, and then remove the old Linktree link once you&apos;re satisfied with the new page. The transition takes less than 10 minutes.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Try Allme Free — No Credit Card Required</h2>
            <p className="text-muted-foreground mb-2">
              5 links, 3 themes, click analytics. Free forever.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground transition-colors">
                See all plans →
              </Link>
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Create Your Free Page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
