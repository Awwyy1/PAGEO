import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, FileText, Globe, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Link in Bio for Developers & Freelancers | Allme",
  description:
    "One link for your GitHub, portfolio, resume, and blog. Free link in bio page for developers and freelancers. No credit card required.",
  alternates: {
    canonical: "https://allme.site/for/developers",
  },
  openGraph: {
    title: "Link in Bio for Developers & Freelancers | Allme",
    description:
      "One link for your GitHub, portfolio, resume, and blog. Free forever.",
    url: "https://allme.site/for/developers",
    siteName: "Allme",
  },
};

function DevelopersJsonLd() {
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
          name: "Link in Bio for Developers",
          item: "https://allme.site/for/developers",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do developers need a link in bio page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — a link in bio page is a simple way to share your GitHub, portfolio, resume, and blog from a single URL. It's useful for Twitter/X bios, LinkedIn, and anywhere recruiters or clients might look you up.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Allme as a developer portfolio link page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Add links to your GitHub profile, live portfolio, resume PDF, and blog. The free plan supports up to 5 links — enough for most developers. Pro ($3.99/mo) allows up to 15 links and adds a custom OG preview image.",
          },
        },
        {
          "@type": "Question",
          name: "Is Allme free for developers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — the free plan is free forever. It includes up to 5 links, 3 themes, and basic click analytics. No credit card required.",
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

const techLinks = [
  {
    icon: Github,
    name: "GitHub Profile",
    desc: "Link directly to your GitHub so recruiters and collaborators can browse your repos, contributions, and open-source work.",
  },
  {
    icon: Globe,
    name: "Portfolio / Projects",
    desc: "Point to your portfolio site or a specific project demo. Swap it out when you ship something new — one update, everywhere.",
  },
  {
    icon: FileText,
    name: "Resume / CV",
    desc: "Link to a PDF resume or a hosted version. Useful for job hunting without handing out a direct file link in every message.",
  },
  {
    icon: BookOpen,
    name: "Blog / DEV.to",
    desc: "Share your writing — whether that's a personal blog, DEV.to, Hashnode, or a Substack. Writing builds credibility.",
  },
];

const examples = [
  {
    type: "Frontend developer",
    username: "alex.dev",
    links: ["GitHub — @alexdev", "Portfolio & projects", "Resume PDF", "DEV.to articles"],
    note: "Free plan — 4 links",
  },
  {
    type: "Backend / API developer",
    username: "priya.backend",
    links: ["GitHub profile", "Open-source library docs", "Resume", "LinkedIn", "Technical blog"],
    note: "Pro plan — 5 links shown",
  },
  {
    type: "Freelance developer",
    username: "tomfreelance",
    links: ["Portfolio site", "GitHub", "Calendly — book a call", "Client testimonials", "Resume"],
    note: "Pro plan — 5 links shown",
  },
];

const steps = [
  {
    n: "1",
    title: "Pick your username",
    desc: "Use your handle from GitHub or Twitter so it's easy to remember. allme.site/yourname is what you'll share everywhere.",
  },
  {
    n: "2",
    title: "Add your dev links",
    desc: "GitHub, portfolio, resume, blog — add up to 5 on the free plan. Arrange them by priority: what do you most want people to click first?",
  },
  {
    n: "3",
    title: "Put it in every bio",
    desc: "Add your Allme link to your GitHub profile, Twitter/X bio, LinkedIn, and email signature. One URL, all your work.",
  },
];

export default function ForDevelopersPage() {
  return (
    <>
      <DevelopersJsonLd />
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
              <li className="text-foreground">Link in Bio for Developers</li>
            </ol>
          </nav>

          {/* H1 + intro */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              For developers &amp; freelancers
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Developer Portfolio — One Link for GitHub, Resume &amp; Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Stop updating five different profiles when someone asks where to find your work. One page at{" "}
              <span className="font-mono text-sm text-foreground">allme.site/yourname</span> with your GitHub, portfolio, resume, and blog — updated once, reflected everywhere.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Create Your Developer Page Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Why developers */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Why Developers Use a Link in Bio Page</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your GitHub bio gives you one link. Your Twitter/X bio gives you one link. But you have a portfolio, a resume, a blog, and maybe a few open-source projects worth highlighting.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A link page solves this without building another side project. It takes two minutes to set up, and when you ship something new you update one place — not five. Recruiters and clients get a single URL that shows everything relevant.
            </p>
          </section>

          {/* Tech link types */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">What to Put on Your Developer Page</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {techLinks.map(({ icon: Icon, name, desc }) => (
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

          {/* Plans — real data only */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Pricing — Simple and Honest</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Most developers do fine on the free plan.{" "}
              <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground transition-colors">
                Full pricing details →
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
            <h2 className="text-2xl font-bold mb-8">Developer Page Examples</h2>
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
            <h2 className="text-2xl font-bold mb-8">Set Up in Under 2 Minutes</h2>
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
                <h3 className="font-semibold mb-2">Do developers need a link in bio page?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  It&apos;s a simple way to share your GitHub, portfolio, resume, and blog from one URL — useful for Twitter/X bios, LinkedIn, and anywhere a recruiter or client might look you up.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Can I use Allme as a developer portfolio link page?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes. Add links to your GitHub, live portfolio, resume, and blog. The free plan supports up to 5 links — enough for most developers. See also:{" "}
                  <Link href="/for/creators" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    link in bio for creators
                  </Link>.
                </p>
              </div>
              <div className="border-t border-border/40 pt-8">
                <h3 className="font-semibold mb-2">Is Allme free for developers?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes — the free plan is free forever. Up to 5 links, 3 themes, basic analytics. No credit card required.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Create Your Developer Page Free</h2>
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
