import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Instagram, Youtube, Music, Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "Link in Bio for Creators & Influencers | Allme",
  description:
    "The best link in bio page for content creators. Share your Instagram, TikTok, YouTube, and Twitch links in one place. Free forever, no credit card.",
  alternates: {
    canonical: "https://allme.site/for/creators",
  },
  openGraph: {
    title: "Link in Bio for Creators & Influencers | Allme",
    description:
      "One link for all your platforms. Share Instagram, TikTok, YouTube, Twitch — everything in one clean page.",
    url: "https://allme.site/for/creators",
    siteName: "Allme",
  },
};

function CreatorsJsonLd() {
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
          name: "Link in Bio for Creators",
          item: "https://allme.site/for/creators",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best free link in bio tool for creators?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allme is a free link in bio tool for creators. The free plan includes up to 5 links, 3 themes, and basic click analytics — enough for most creators starting out. The Pro plan ($3.99/mo) adds 15 links, 10 themes, daily analytics, and scheduled links.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add my Instagram, TikTok, and YouTube links on one page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. With Allme you create a single page at allme.site/yourname and add links to any platform — Instagram, TikTok, YouTube, Twitch, Spotify, or anywhere else. Share that one URL in every bio.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a paid plan to use Allme as a creator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The free plan is a great starting point — 5 links, 3 themes, and click analytics at no cost. If you need more links (up to 15), scheduled posts, or a QR code, the Pro plan is $3.99/mo.",
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

const platforms = [
  {
    icon: Instagram,
    name: "Instagram",
    tip: "Instagram only allows one clickable link in your bio. Make it your Allme page — and put everything behind it.",
  },
  {
    icon: Music,
    name: "TikTok",
    tip: "TikTok bio links are unlocked at 1,000 followers. When you hit that milestone, point it straight to your Allme page.",
  },
  {
    icon: Youtube,
    name: "YouTube",
    tip: "Add your Allme link to your YouTube channel description and About section so subscribers can find all your other content.",
  },
  {
    icon: Tv,
    name: "Twitch",
    tip: "Put your Allme page in your Twitch panels to direct viewers to your merch, socials, and donation links.",
  },
];

const examples = [
  {
    type: "Musician",
    username: "jess.music",
    links: ["New single on Spotify", "YouTube channel", "Merch store", "Tour dates"],
    theme: "Dark",
  },
  {
    type: "Fitness creator",
    username: "marcus.fit",
    links: ["Free workout plan PDF", "Instagram", "YouTube workouts", "1:1 coaching"],
    theme: "Gradient",
  },
  {
    type: "Lifestyle blogger",
    username: "sophiablogs",
    links: ["Latest blog post", "TikTok", "Pinterest", "Collaboration enquiries"],
    theme: "Light",
  },
];

const steps = [
  {
    n: "1",
    title: "Create your free account",
    desc: "Sign up at allme.site — choose your username. Pick something consistent with your handles on other platforms.",
  },
  {
    n: "2",
    title: "Add your links",
    desc: "Add up to 5 links on the free plan. Your Instagram, TikTok, YouTube, latest drop — whatever matters most right now.",
  },
  {
    n: "3",
    title: "Drop your link everywhere",
    desc: "Replace your bio link on Instagram, TikTok, YouTube, and Twitter with allme.site/yourname. One update, everywhere.",
  },
];

export default function ForCreatorsPage() {
  return (
    <>
      <CreatorsJsonLd />
      <main className="min-h-screen bg-background">
        {/* Nav */}
        <nav className="border-b border-border/40 px-6 h-14 flex items-center">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <img src="/icon.png" alt="Allme" className="h-6 w-6 rounded-full" />
              allme
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                Pricing
              </Link>
              <Link
                href="/auth/register"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Link in Bio for Creators</li>
            </ol>
          </nav>

          {/* H1 + intro */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              For content creators &amp; influencers
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              The Best Link in Bio for Creators &amp; Influencers
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              One link for every platform. Share your Instagram, TikTok, YouTube, Twitch, and anything else — all from a single clean page at{" "}
              <span className="font-mono text-sm text-foreground">allme.site/yourname</span>.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Create Your Creator Page Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Why creators need it */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Why Creators Need a Link in Bio Page</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Instagram gives you one link. TikTok gives you one link. Twitter gives you one link. But you have a YouTube channel, a Spotify, a merch store, a newsletter — and new content every week.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A link in bio page is a micro-site that lives at one URL and holds everything. You update it once, and it&apos;s updated everywhere your bio link appears. No more choosing between your latest video or your shop — show both.
            </p>
          </section>

          {/* Platform breakdown */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Works Everywhere You Create</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {platforms.map(({ icon: Icon, name, tip }) => (
                <div key={name} className="flex gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{name}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features for creators — real plan data only */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Features Built for Content Creators</h2>
            <p className="text-sm text-muted-foreground mb-8">
              All prices accurate as of 2026.{" "}
              <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground transition-colors">
                See full pricing →
              </Link>
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  plan: "Free",
                  price: "$0 forever",
                  highlight: false,
                  features: [
                    "Up to 5 links",
                    "3 themes (Light, Dark, Gradient)",
                    "Basic click analytics",
                    "Profile avatar & bio",
                    "allme.site/username URL",
                  ],
                },
                {
                  plan: "Pro",
                  price: "$3.99/mo",
                  highlight: true,
                  features: [
                    "Up to 15 links",
                    "10 premium themes",
                    "Daily analytics breakdown",
                    "Custom OG preview image",
                    "Scheduled links",
                    "QR code",
                  ],
                },
                {
                  plan: "Business",
                  price: "$9.99/mo",
                  highlight: false,
                  features: [
                    "Unlimited links",
                    "Custom brand colors",
                    "Geo & device analytics",
                    "CSV export",
                    "Remove Allme branding",
                    "Verified badge",
                  ],
                },
              ].map(({ plan, price, highlight, features }) => (
                <div
                  key={plan}
                  className={`rounded-xl border p-5 ${highlight ? "border-primary/40 bg-primary/5" : "border-border"}`}
                >
                  <div className="font-bold mb-1">{plan}</div>
                  <div className={`text-sm font-semibold mb-4 ${highlight ? "text-primary" : "text-muted-foreground"}`}>
                    {price}
                  </div>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${highlight ? "bg-primary" : "bg-muted-foreground/40"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Creator examples */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">How Creators Use Allme</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {examples.map(({ type, username, links, theme }) => (
                <div key={username} className="rounded-xl border border-border p-5">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    {type}
                  </div>
                  <div className="font-mono text-sm text-primary mb-4">allme.site/{username}</div>
                  <ul className="space-y-2 mb-4">
                    {links.map((l) => (
                      <li key={l} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="h-1 w-3 rounded-full bg-border" />
                        {l}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-muted-foreground">Theme: {theme}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Setup guide */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Set Up Your Creator Page in 30 Seconds</h2>
            <div className="space-y-4">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {n}
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{title}</div>
                    <p className="text-sm text-muted-foreground">{desc}</p>
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
                <h3 className="font-semibold mb-2">What is the best free link in bio tool for creators?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Allme is a solid free option — 5 links, 3 themes, and click analytics on the free plan. If you need more links or daily analytics, the Pro plan is $3.99/mo. Compare options on our{" "}
                  <Link href="/vs/linktree" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    Allme vs Linktree page
                  </Link>.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Can I add my Instagram, TikTok, and YouTube links on one page?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes — add links to any platform you use. On the free plan you can add up to 5 links, which covers your main platforms. Upgrade to Pro for up to 15 links.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Do I need a paid plan to use Allme as a creator?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No. The free plan is enough to get started — 5 links, 3 themes, and basic analytics, free forever. Upgrade when your audience grows and you need more.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Create Your Creator Page Free</h2>
            <p className="text-muted-foreground mb-6">
              Free forever. No credit card.{" "}
              <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground transition-colors">
                See all plans →
              </Link>
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
