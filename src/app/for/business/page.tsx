import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed, CalendarCheck, Star, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Link in Bio for Small Business — Free | Allme",
  description:
    "Free link in bio page for small businesses. Share your menu, booking link, Google Reviews, and social media in one place. No credit card required.",
  alternates: {
    canonical: "https://allme.site/for/business",
  },
  openGraph: {
    title: "Link in Bio for Small Business — Free | Allme",
    description:
      "Menu, booking, reviews, socials — all in one free link. Perfect for restaurants, cafés, and local businesses.",
    url: "https://allme.site/for/business",
    siteName: "Allme",
  },
};

function BusinessJsonLd() {
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
          name: "Link in Bio for Business",
          item: "https://allme.site/for/business",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can a small business use a link in bio page instead of a website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — for many local businesses a link in bio page is enough to start. It can hold your menu, booking link, Google Reviews, phone number, and social media in one place. It's faster to set up than a website and free to use.",
          },
        },
        {
          "@type": "Question",
          name: "Is Allme free for small businesses?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The free plan is free forever and includes up to 5 links, 3 themes, and basic click analytics. No credit card required. The Business plan ($9.99/mo) adds unlimited links, custom colors, and advanced analytics.",
          },
        },
        {
          "@type": "Question",
          name: "What links should a small business put on their bio page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with your most important actions: online menu or product catalogue, booking or reservation link, Google Reviews page, and your main social media profile. With 5 free links you can cover all of these.",
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

const useCases = [
  {
    icon: UtensilsCrossed,
    name: "Online menu",
    desc: "Link to your PDF menu, Google menu, or a menu page. Customers scanning your Instagram or table QR code get straight to it.",
  },
  {
    icon: CalendarCheck,
    name: "Booking & appointments",
    desc: "Link to your booking system — Booksy, Calendly, OpenTable, or whatever you use. Reduce DMs asking 'how do I book?'",
  },
  {
    icon: Star,
    name: "Google Reviews",
    desc: "A direct link to your Google Reviews page makes it easy for happy customers to leave a review. More reviews, better local ranking.",
  },
  {
    icon: Share2,
    name: "Social media",
    desc: "Link to your Instagram, Facebook, or TikTok. Customers who find you on one platform can follow you on the others.",
  },
];

const examples = [
  {
    type: "Restaurant",
    username: "pizzeria.roma",
    links: ["View our menu", "Reserve a table (OpenTable)", "Google Reviews", "Instagram"],
    note: "Free plan — 4 links",
  },
  {
    type: "Coffee shop",
    username: "beanandbrewco",
    links: ["Order online", "Our story", "Instagram", "Google Reviews", "Gift cards"],
    note: "Pro plan — 5 links shown",
  },
  {
    type: "Local service (salon)",
    username: "studiobloom",
    links: ["Book an appointment", "Our services & prices", "Instagram", "Google Reviews", "Gift vouchers"],
    note: "Pro plan — 5 links shown",
  },
];

const steps = [
  {
    n: "1",
    title: "Create your free page",
    desc: "Sign up at allme.site and choose a username — your business name or handle works well. Takes under a minute.",
  },
  {
    n: "2",
    title: "Add your most important links",
    desc: "Menu, booking, Google Reviews, social media. With 5 free links you can cover the essentials. Arrange them by priority.",
  },
  {
    n: "3",
    title: "Share it everywhere",
    desc: "Put your allme.site link in your Instagram bio, Facebook page, email signature, and printed materials like menus or receipts.",
  },
];

export default function ForBusinessPage() {
  return (
    <>
      <BusinessJsonLd />
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
              <li className="text-foreground">Link in Bio for Business</li>
            </ol>
          </nav>

          {/* H1 + intro */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              For small businesses &amp; local shops
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Free Link in Bio Page for Your Small Business
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              One link for your menu, bookings, reviews, and social media. Add it to your Instagram bio, Facebook page, and printed materials — customers always land in the right place.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Create Your Business Page Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Why */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">One Smart Link for Your Whole Business</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most small businesses have an Instagram, a Facebook page, a Google listing, a booking system, and maybe a menu — all at different URLs. When a customer lands on your Instagram and wants to book a table, where do they go?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A link in bio page puts everything behind one URL. You add it to your Instagram bio, and that single link handles menu, bookings, reviews, and everything else. No website needed to get started.
            </p>
          </section>

          {/* Use cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">What to Put on Your Business Page</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {useCases.map(({ icon: Icon, name, desc }) => (
                <div key={name} className="flex gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{name}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Plans */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Most small businesses start on the free plan.{" "}
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

          {/* Examples */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Business Page Examples</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {examples.map(({ type, username, links, note }) => (
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
                  <div className="text-xs text-muted-foreground">{note}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Setup */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Get Your Business Page Live in 3 Steps</h2>
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
                <h3 className="font-semibold mb-2">Can a small business use a link in bio page instead of a website?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For many local businesses, yes — a link page covers the essentials: menu, booking, reviews, and social links. It&apos;s faster to set up and free to use. When you&apos;re ready for a full site, the two can coexist.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Is Allme free for small businesses?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes — the free plan is free forever. Up to 5 links, 3 themes, and basic click analytics. No credit card required. The Business plan ($9.99/mo) adds unlimited links, custom colors, and advanced analytics. Also worth reading:{" "}
                  <Link href="/for/creators" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    link in bio for creators
                  </Link>{" "}
                  and{" "}
                  <Link href="/for/developers" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    for developers
                  </Link>.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">What links should a small business put on their bio page?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start with your most important actions: menu, booking link, Google Reviews, and your main social profile. With 5 free links you can cover all of these from day one.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Create Your Business Page Free</h2>
            <p className="text-muted-foreground mb-6">
              Free forever. No credit card. Live in under 2 minutes.{" "}
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
