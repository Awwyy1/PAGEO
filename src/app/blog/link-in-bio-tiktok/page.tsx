import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Link in Bio for TikTok: How to Set Up & Optimize (2026)",
  description:
    "TikTok only lets you add one link. Here\u2019s how to use a link in bio page to share all your links, grow your audience, and drive sales \u2014 free setup guide.",
  alternates: {
    canonical: "https://allme.site/blog/link-in-bio-tiktok",
  },
  openGraph: {
    title: "Link in Bio for TikTok: How to Set Up & Optimize (2026)",
    description:
      "TikTok only lets you add one link. Here\u2019s how to use a link in bio page to share all your links, grow your audience, and drive sales \u2014 free setup guide.",
    url: "https://allme.site/blog/link-in-bio-tiktok",
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
          name: "Link in Bio for TikTok: How to Set Up & Optimize (2026)",
          item: "https://allme.site/blog/link-in-bio-tiktok",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Link in Bio for TikTok: How to Set Up & Optimize (2026)",
      description:
        "TikTok only lets you add one link. Here\u2019s how to use a link in bio page to share all your links, grow your audience, and drive sales \u2014 free setup guide.",
      datePublished: "2026-03-28T00:00:00Z",
      dateModified: "2026-03-28T00:00:00Z",
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
        "@id": "https://allme.site/blog/link-in-bio-tiktok",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I add a link in bio on TikTok for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. TikTok allows one link in your bio on both personal and Business accounts. You can point it to a free link-in-bio page like Allme to share multiple links from a single URL.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need 1000 followers to add a link on TikTok?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The 1000-follower requirement applies to the clickable website link on personal accounts in some regions. Switching to a TikTok Business account removes this restriction and lets you add a link immediately regardless of follower count.",
          },
        },
        {
          "@type": "Question",
          name: "What should I put in my TikTok link in bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Point your TikTok bio link to a page that collects all the places you want viewers to go: your latest YouTube video, your store, your newsletter, your other social profiles. Update it whenever you post a video that references a specific link.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best link in bio tool for TikTok?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best tool depends on your needs. Allme is a free option with no link limits, custom themes, and click analytics. Linktree is the most recognized name but limits links on the free plan. Beacons targets creators with monetization features. For most TikTok creators just getting started, a free tool with unlimited links is enough.",
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

const steps = [
  {
    number: "1",
    title: "Switch to a Business or Creator account",
    body: "Go to Settings → Manage account → Switch to Business Account. Business accounts can add a website link in their bio immediately, regardless of follower count. Creator accounts may need 1,000 followers depending on your region.",
  },
  {
    number: "2",
    title: "Create your link-in-bio page",
    body: "Sign up on a link-in-bio platform and add every link you want to share — your YouTube channel, store, newsletter, other social profiles. Give your page a clean title and a photo that matches your TikTok profile.",
  },
  {
    number: "3",
    title: "Copy your link-in-bio URL",
    body: "Every platform gives you a short URL like allme.site/yourname. Copy that URL.",
  },
  {
    number: "4",
    title: "Paste the link into your TikTok bio",
    body: 'On TikTok: tap your profile icon → Edit profile → Website. Paste your link-in-bio URL and save. It will appear as a clickable link under your bio.',
  },
  {
    number: "5",
    title: "Tell people in every video",
    body: 'End your videos with "link in bio" when you reference something. The more you say it, the more clicks your page gets. You can also pin a comment with your link on high-traffic videos.',
  },
];

const tips = [
  {
    heading: "Update the link to match your latest video",
    body: "If your video mentions a specific product, article, or tool — update your link-in-bio page to put that link first. Viewers who tap the link right after watching will see exactly what they were looking for.",
  },
  {
    heading: "Keep the page short",
    body: "Aim for 4 to 6 links maximum. TikTok audiences are fast-moving. A crowded page with 15 options causes decision fatigue. Surface your highest-priority links at the top.",
  },
  {
    heading: "Use a recognizable photo",
    body: "Your link-in-bio page should use the same profile photo as your TikTok. When someone taps your link, they want instant confirmation they\u2019re in the right place.",
  },
  {
    heading: "Match your page style to your content",
    body: "A dark theme fits a gaming or music creator. A clean minimal look fits a business or education account. Small details like this build trust and reduce bounce.",
  },
  {
    heading: "Check your click analytics",
    body: "Most link-in-bio tools show you which links get clicked most. Use this to remove low-traffic links and promote whatever is actually working.",
  },
];

export default function TikTokLinkInBioPage() {
  return (
    <main className="min-h-screen bg-background">
      <ArticleJsonLd />

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
            Get Started Free
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li>/</li>
            <li className="text-foreground">Link in Bio for TikTok</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Guide</span>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">TikTok</span>
            <span className="text-xs text-muted-foreground">March 2026 · 8 min read</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Link in Bio for TikTok: How to Set Up & Optimize (2026)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TikTok gives you one link. That&apos;s it. One URL in your bio to send people wherever you want them to go. If you&apos;re trying to promote a product, grow a newsletter, link to your YouTube, and share your merch store all at once — one link isn&apos;t going to cut it.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-3">
            That&apos;s why most TikTok creators point their bio link to a link-in-bio page — a single page that holds all their important links in one place. This guide explains how to set one up, what to put on it, and how to get more clicks from it.
          </p>
        </div>

        {/* TL;DR box */}
        <div className="rounded-xl border border-border bg-muted/30 p-5 mb-10">
          <p className="text-sm font-semibold text-foreground mb-2">Quick summary</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>TikTok allows one clickable link in your bio</li>
            <li>Point it to a link-in-bio page to share multiple links at once</li>
            <li>Business accounts can add a link immediately (no follower minimum)</li>
            <li>Update your page whenever a video references something specific</li>
            <li>Keep it short — 4 to 6 links is enough</li>
          </ul>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why one link isn&apos;t enough</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A typical TikTok creator has at least three or four places they want people to visit: their Instagram, their YouTube, their online store, maybe a Patreon or newsletter. If you swap out one link every time you post a new video, you lose traffic to everything else. If you leave one link up permanently, half your videos are sending people to something irrelevant.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A link-in-bio page solves this. Instead of replacing your link constantly, you update the page itself. Your bio URL stays the same — but what visitors see when they tap it can change any time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It&apos;s also just cleaner. A page with your photo, your name, and a few clearly labeled buttons looks more professional than a bare URL to a YouTube channel or an Amazon storefront.
          </p>
        </section>

        {/* Section 2 - Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to add a link in bio on TikTok (step by step)</h2>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA inline */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-12">
          <p className="font-semibold text-foreground mb-1">Need a free link-in-bio page?</p>
          <p className="text-sm text-muted-foreground mb-4">
            Allme is free with no link limits. Set up your page in under 2 minutes.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Create your free page <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Section 3 - What to put on your page */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What to put on your TikTok link-in-bio page</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The links you include depend on what you&apos;re trying to accomplish. Here are the most common setups:
          </p>

          <div className="space-y-5">
            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">Content creators</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                YouTube channel, Instagram, newsletter sign-up, merch store, Patreon or membership. Put your most-promoted content at the top and rotate it based on what you&apos;re currently pushing in your videos.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">Small businesses & brands</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Online store, latest product or sale page, booking link, email newsletter, contact form. If you run promotions regularly, keep a "Current deals" link at the top so people who saw your ad video land exactly where they need to be.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">Musicians & artists</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Streaming link (Spotify, Apple Music), latest music video on YouTube, ticket sales, merch, Instagram. Services like Linktree and Allme both handle this well — the key is putting your newest release at the top whenever you drop something.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">Educators & coaches</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Free resource or lead magnet, paid course or coaching page, podcast, email list. TikTok brings in a lot of top-of-funnel traffic, so having a free resource at the top of your page converts better than linking straight to a paid product.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 - Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5 tips to get more clicks from your TikTok link in bio</h2>

          <div className="space-y-5">
            {tips.map((tip, i) => (
              <div key={i} className="rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">{tip.heading}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 - Tool comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Which link-in-bio tool should you use for TikTok?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            There are dozens of options. Here&apos;s a quick comparison of the most popular ones:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Tool</th>
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Free plan</th>
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Link limit</th>
                  <th className="text-left py-3 font-semibold text-foreground">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Allme</td>
                  <td className="py-3 pr-4 text-muted-foreground">Yes</td>
                  <td className="py-3 pr-4 text-muted-foreground">Unlimited</td>
                  <td className="py-3 text-muted-foreground">Creators who want a clean, fast setup</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Linktree</td>
                  <td className="py-3 pr-4 text-muted-foreground">Yes</td>
                  <td className="py-3 pr-4 text-muted-foreground">5 links (free)</td>
                  <td className="py-3 text-muted-foreground">Creators who want a recognizable brand</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Beacons</td>
                  <td className="py-3 pr-4 text-muted-foreground">Yes</td>
                  <td className="py-3 pr-4 text-muted-foreground">Unlimited</td>
                  <td className="py-3 text-muted-foreground">Creators who want built-in monetization</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Later</td>
                  <td className="py-3 pr-4 text-muted-foreground">Limited</td>
                  <td className="py-3 pr-4 text-muted-foreground">Varies</td>
                  <td className="py-3 text-muted-foreground">Brands already using Later for scheduling</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            If you&apos;re just starting out, any free tool with unlimited links will do the job. The most important thing is having a page — not which platform it&apos;s on.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">Can I add a link in bio on TikTok for free?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes. TikTok allows one link in your bio on both personal and Business accounts. You can point it to a free link-in-bio page like Allme to share multiple links from a single URL.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">Do I need 1,000 followers to add a link on TikTok?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The 1,000-follower requirement applies to the clickable website link on personal accounts in some regions. Switching to a TikTok Business account removes this restriction and lets you add a link immediately regardless of follower count.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">What should I put in my TikTok link in bio?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Point your TikTok bio link to a page that collects all the places you want viewers to go: your latest YouTube video, your store, your newsletter, your other social profiles. Update it whenever you post a video that references a specific link.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-2">What is the best link in bio tool for TikTok?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The best tool depends on your needs. Allme is free with no link limits, custom themes, and click analytics. Linktree is the most recognized name but caps links at 5 on the free plan. Beacons targets creators with monetization features. For most TikTok creators just getting started, a free tool with unlimited links is enough.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to set up your TikTok link in bio?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create a free Allme page in under 2 minutes. No follower minimum, no link limit, no credit card.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get your free page <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </main>
  );
}
