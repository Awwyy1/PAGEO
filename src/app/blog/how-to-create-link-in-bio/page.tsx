import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Create a Link in Bio Page (Step-by-Step)",
  description:
    "Learn how to create a link in bio page in under 5 minutes. Step-by-step guide for Instagram, TikTok, and YouTube. Free tools, no credit card required.",
  alternates: {
    canonical: "https://allme.site/blog/how-to-create-link-in-bio",
  },
  openGraph: {
    title: "How to Create a Link in Bio Page (Step-by-Step Guide)",
    description:
      "Step-by-step guide to creating a link in bio page. Choose a tool, set up your profile, add links, and share it everywhere in under 5 minutes.",
    url: "https://allme.site/blog/how-to-create-link-in-bio",
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
          name: "How to Create a Link in Bio Page",
          item: "https://allme.site/blog/how-to-create-link-in-bio",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Create a Link in Bio Page (Step-by-Step Guide)",
      description:
        "Step-by-step guide to creating a link in bio page for Instagram, TikTok, and YouTube. Choose a tool, add your links, and share in under 5 minutes.",
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://allme.site/blog/how-to-create-link-in-bio",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does it take to create a link in bio page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under two minutes for a basic page — sign up, choose a username, and add 3 to 5 links. A well-optimised page with a bio, photo, and curated links takes about 10 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Is a link in bio page free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — tools like Allme offer a free plan that is free forever. The free plan covers 5 links, 3 themes, and basic click analytics. No credit card required.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a link in bio page if I already have a website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, for social media. Social platforms only give you one link slot in your bio. A link in bio page lets you promote your latest post, product, or page without changing your bio link constantly.",
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
    name: "Allme",
    desc: "Free forever. The free plan includes up to 5 links, 3 themes (Light, Dark, Gradient), and basic click analytics. Pro is $3.99/mo for 15 links, 10 themes, daily analytics, scheduled links, and a QR code. Business is $9.99/mo for unlimited links, custom colors, advanced analytics, and branding removal. No credit card required to start.",
    tag: "Recommended for this guide",
    highlight: true,
  },
  {
    name: "Linktree",
    desc: "The most well-known option. Free plan gives you unlimited links but only one theme and limited analytics. Paid plans start higher than Allme. Good choice if brand recognition matters or if you need specific integrations like Shopify or Mailchimp.",
    tag: null,
    highlight: false,
  },
  {
    name: "Build it yourself",
    desc: "If you're a developer, a simple HTML page on GitHub Pages or Vercel is free and fully under your control. Not practical for most people — takes hours instead of minutes and requires ongoing maintenance.",
    tag: "For developers only",
    highlight: false,
  },
];

const bioInstructions = [
  {
    platform: "Instagram",
    steps: [
      "Open your Instagram profile and tap Edit profile",
      "In the Website field, paste your Allme link",
      "Tap Done",
    ],
    note: "Your link is now clickable from your profile and from the \"Link in bio\" prompt on your stories.",
  },
  {
    platform: "TikTok",
    steps: [
      "TikTok requires 1,000 followers before you can add a clickable bio link",
      "Once you hit that threshold: go to your profile and tap Edit profile",
      "In the Website field, paste your Allme link and save",
    ],
    note: null,
  },
  {
    platform: "YouTube",
    steps: [
      "Go to your YouTube channel and click Customize Channel",
      "In the Basic info tab, find Links",
      'Add your Allme URL with a label like "All my links"',
      "Save",
    ],
    note: null,
  },
  {
    platform: "Twitter / X",
    steps: [
      "Edit your profile",
      "Paste your Allme link in the Website field",
    ],
    note: null,
  },
];

const tips = [
  {
    title: "Mention it in your content",
    desc: "\"Link in bio\" is a phrase that works. On Instagram and TikTok where you can\u2019t add links in captions, explicitly telling your audience drives clicks. Use it whenever you publish something worth promoting.",
  },
  {
    title: "Keep your page short",
    desc: "More links don\u2019t mean more clicks \u2014 they often mean fewer. If someone sees 12 links they don\u2019t know where to look. Start with 3\u20135 and remove or archive anything outdated.",
  },
  {
    title: "Update it regularly",
    desc: "A stale link page with old content is wasted real estate. Refresh your top link every time you publish something worth promoting.",
  },
  {
    title: "Check your analytics",
    desc: "Allme shows click counts on every link. Look at which links get clicks and put similar content higher up. On the Pro plan you get daily breakdowns \u2014 useful for seeing which content actually drives traffic.",
  },
  {
    title: "Match the visual to your brand",
    desc: "If your Instagram grid is dark, use the Dark theme. If your brand is clean and minimal, Light works well. Visual consistency between your social profile and your link page builds trust.",
  },
];

export default function HowToCreateLinkInBioPost() {
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
              <li className="text-foreground">How to Create a Link in Bio Page</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Guide</span>
              <span className="text-xs text-muted-foreground">March 2026 · 7 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              How to Create a Link in Bio Page (Step-by-Step Guide)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Instagram gives you one link in your bio. TikTok gives you one. Twitter gives you one. But you have a YouTube channel, a portfolio, a newsletter, a store — and new content every week. That one slot is never enough.
            </p>
          </div>

          {/* Intro */}
          <div className="mb-12 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A link in bio page solves this. It&apos;s a simple web page at a single URL — like{" "}
              <span className="font-mono text-sm text-foreground">allme.site/yourname</span> — that holds all your links in one place. You put that one URL in every bio, and your audience can find everything from there.
            </p>
            <p>
              This guide walks through how to set one up, step by step. By the end you&apos;ll have a live page ready to add to your Instagram, TikTok, and YouTube bios.
            </p>
          </div>

          {/* What is section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is a Link in Bio Page?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A link in bio page is a lightweight web page designed to hold multiple links in one place. You share the URL in your social media bios, and visitors can reach all your important destinations from a single tap.
              </p>
              <p>Common things people put on their link in bio page:</p>
              <ul className="space-y-2 pl-4">
                {[
                  "Their latest YouTube video, blog post, or product",
                  "An online store or product catalogue",
                  "Social media profiles they want to cross-promote",
                  "A contact, booking, or appointment link",
                  "A newsletter signup",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                One link, everything. No more updating your bio every time you publish something new — you update the page instead, and the link stays the same.
              </p>
            </div>
          </section>

          {/* Steps */}
          <div className="space-y-12 mb-16">
            {/* Step 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
                <h2 className="text-2xl font-bold">Choose Your Platform</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Three realistic options, depending on your needs and technical comfort:
              </p>
              <div className="space-y-4">
                {platforms.map(({ name, desc, tag, highlight }) => (
                  <div
                    key={name}
                    className={`rounded-xl border p-5 ${highlight ? "border-primary/40 bg-primary/5" : "border-border"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-bold">{name}</div>
                      {tag && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${highlight ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                We&apos;ll use Allme for the rest of this guide since it&apos;s what we built — but the steps are similar for any tool.
              </p>
            </section>

            {/* Step 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
                <h2 className="text-2xl font-bold">Sign Up and Set Up Your Profile</h2>
              </div>
              <div className="space-y-3">
                {[
                  { n: "1", text: "Go to allme.site and click Get Started Free" },
                  { n: "2", text: "Enter your email and create a password" },
                  {
                    n: "3",
                    text: "Choose your username — this becomes your URL: allme.site/yourname. Pick something consistent with your handles on other platforms so it\u2019s easy to remember",
                  },
                  {
                    n: "4",
                    text: "Add your display name — this is what visitors see at the top of your page. Usually your real name or brand name",
                  },
                  {
                    n: "5",
                    text: "Write a short bio — one or two sentences. This shows under your name and also gets used in your page\u2019s meta description, which helps with Google",
                  },
                  {
                    n: "6",
                    text: "Upload a profile photo — your face, logo, or brand image",
                  },
                ].map(({ n, text }) => (
                  <div key={n} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="shrink-0 font-semibold text-foreground">{n}.</span>
                    <span className="leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                The whole thing takes about 90 seconds.
              </p>
            </section>

            {/* Step 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</div>
                <h2 className="text-2xl font-bold">Add Your Links</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Start with your three most important destinations — the ones you&apos;d tell someone about if you had 30 seconds. For most people that&apos;s:
                </p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Your primary social profile (the one you're most active on)",
                    "Your latest content, product, or project",
                    "A contact or booking link",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm">
                  On the free plan you have 5 link slots. Don&apos;t feel like you need to fill them all — three strong links outperform five mediocre ones.
                </p>
                <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
                  <div className="font-semibold text-foreground">Practical tips</div>
                  <div>Use clear link titles. &quot;My Portfolio&quot; works better than &quot;Click here&quot;.</div>
                  <div>Put your highest-priority link at the top — most visitors won&apos;t scroll far.</div>
                  <div>Update your links regularly. A link to content from six months ago sends the wrong signal.</div>
                  <div>On the Pro plan ($3.99/mo), scheduled links let you swap in a new link at a specific date — useful for launches or limited-time offers.</div>
                </div>
              </div>
            </section>

            {/* Step 4 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</div>
                <h2 className="text-2xl font-bold">Choose a Theme</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Your link in bio page should feel like yours, not like everyone else&apos;s.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { name: "Light", desc: "Clean white background, dark text. Works well for minimal or professional brands." },
                    { name: "Dark", desc: "Dark background, light text. Good for creators with a dark or moody aesthetic." },
                    { name: "Gradient", desc: "Subtle gradient background. Adds visual interest without being loud." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="rounded-xl border border-border p-4">
                      <div className="font-semibold mb-1 text-sm">{name}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm">
                  These three themes are available on the free plan. The Pro plan ($3.99/mo) adds 10 additional premium themes. The Business plan ($9.99/mo) lets you set fully custom colors — exact hex codes for background, text, and buttons.
                </p>
              </div>
            </section>

            {/* Step 5 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</div>
                <h2 className="text-2xl font-bold">Copy Your Link and Add It to Your Bio</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your page is live at{" "}
                <span className="font-mono text-sm text-foreground">allme.site/yourname</span>. Now put it everywhere.
              </p>
              <div className="space-y-4">
                {bioInstructions.map(({ platform, steps: pSteps, note }) => (
                  <div key={platform} className="rounded-xl border border-border p-5">
                    <div className="font-semibold mb-3">{platform}</div>
                    <ol className="space-y-1.5">
                      {pSteps.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-medium text-foreground">{i + 1}.</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                    {note && (
                      <p className="text-xs text-muted-foreground mt-3 italic">{note}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Once it&apos;s in your bios, you don&apos;t need to change it again. When you want to promote something new, update your Allme page — all your bios stay the same.
              </p>
            </section>
          </div>

          {/* Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Tips to Get More Clicks on Your Link in Bio</h2>
            <div className="space-y-4">
              {tips.map(({ title, desc }) => (
                <div key={title} className="rounded-xl border border-border p-5">
                  <div className="font-semibold mb-1 text-sm">{title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2">How long does it take to create a link in bio page?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Under two minutes for a basic page — sign up, choose a username, add 3 to 5 links. A well-optimised page with a bio, photo, and curated links takes about 10 minutes.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Is a link in bio page free?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes — Allme&apos;s free plan is free forever. It includes 5 links, 3 themes, and basic click analytics. No credit card required.{" "}
                  <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    See all plans →
                  </Link>
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Do I need a link in bio page if I already have a website?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes, for social media. Social platforms only give you one link slot in your bio — your website URL alone doesn&apos;t solve the problem of directing people to specific content. A link in bio page lets you promote your latest post, product, or page without changing your bio link constantly.
                </p>
              </div>
            </div>
          </section>

          {/* Also read */}
          <div className="rounded-xl border border-border p-5 mb-10">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Also worth reading</div>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog/linktree-alternatives" className="text-sm underline underline-offset-4 hover:text-primary transition-colors">
                7 Best Free Linktree Alternatives
              </Link>
              <Link href="/for/creators" className="text-sm underline underline-offset-4 hover:text-primary transition-colors">
                Link in Bio for Creators
              </Link>
              <Link href="/vs/linktree" className="text-sm underline underline-offset-4 hover:text-primary transition-colors">
                Allme vs Linktree
              </Link>
            </div>
          </div>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Create Your Free Link in Bio Page</h2>
            <p className="text-muted-foreground mb-6">
              5 links, 3 themes, click analytics — free forever. No credit card required.
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
