import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "15 Best Link in Bio Examples for Inspiration (2026)",
  description:
    "See 15 real-world link in bio examples for creators, businesses, developers, and musicians — with breakdowns of what works and why.",
  alternates: {
    canonical: "https://allme.site/blog/link-in-bio-examples",
  },
  openGraph: {
    title: "15 Best Link in Bio Examples for Inspiration (2026)",
    description:
      "See 15 real-world link in bio examples for creators, businesses, developers, and musicians — with breakdowns of what works and why.",
    url: "https://allme.site/blog/link-in-bio-examples",
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
          name: "15 Best Link in Bio Examples for Inspiration (2026)",
          item: "https://allme.site/blog/link-in-bio-examples",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "15 Best Link in Bio Examples for Inspiration (2026)",
      description:
        "See 15 real-world link in bio examples for creators, businesses, developers, and musicians — with breakdowns of what works and why.",
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
        "@id": "https://allme.site/blog/link-in-bio-examples",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many links should I put on my link in bio page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Three to five is the sweet spot for most people. Allme's free plan supports up to 5 links, which covers most use cases comfortably. If you genuinely need more, the Pro plan ($3.99/mo) goes up to 15.",
          },
        },
        {
          "@type": "Question",
          name: "Should I use my real name or my brand name as my username?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use whatever matches your primary social handle. If your Instagram is @sarahfits, your link at allme.site/sarahfits is instantly recognisable and easy to remember. Consistency between platforms matters more than the name itself.",
          },
        },
        {
          "@type": "Question",
          name: "How often should I update my link in bio page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Whenever you post something you want people to take action on. The most effective pages get updated at least weekly. If that sounds like a lot of manual work, the Pro plan's scheduled links feature lets you set links to go live and expire automatically.",
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

const creatorExamples = [
  {
    handle: "@sarahfits",
    niche: "Fitness creator",
    theme: "Gradient",
    links: [
      "Free 7-Day Workout Plan (PDF download)",
      "YouTube (full workouts)",
      "Favourite supplements (affiliate)",
      "1-on-1 coaching enquiry",
      "Instagram Reels",
    ],
    analysis: "The free PDF leads because it gives something before asking for anything. It also builds her email list, which is worth more long-term than any individual click. The coaching link is last, deliberately. By the time someone reaches it, they\u2019ve already seen the free content, the YouTube channel, and the affiliate picks. They\u2019re warm.",
  },
  {
    handle: "@marcusroams",
    niche: "Travel blogger",
    theme: "Light",
    links: [
      "Latest blog post (updated weekly)",
      "How I afford to travel full time (YouTube)",
      "My gear list (Amazon affiliate)",
      "Subscribe to my newsletter",
    ],
    analysis: "Four links. No filler. Marcus rotates the first link every time he publishes something new, which means returning visitors always see something fresh. That\u2019s a small habit that makes a real difference over time.",
  },
  {
    handle: "@bellakitchen",
    niche: "Food creator",
    theme: "Dark",
    links: [
      "This week\u2019s recipe (YouTube)",
      "My cookbook, pre-order now",
      "Recipe blog",
      "Cooking class, next date",
      "Behind the scenes on Patreon",
    ],
    analysis: "The cookbook is second, not first, because the recipe is what people come for. Once they\u2019re on the page, they\u2019ll see the pre-order link naturally. When the book launches, that link becomes \u201cBuy now.\u201d Patreon is at the bottom for a reason: it\u2019s for the most engaged audience, not someone who just discovered her.",
  },
  {
    handle: "@zoeliving",
    niche: "Lifestyle influencer",
    theme: "Light",
    links: [
      "Shop my home (LTK/affiliate)",
      "Morning routine video",
      "Wellness journal, 10% off (brand partnership)",
      "DM me on Instagram",
      "Subscribe for weekly inspo",
    ],
    analysis: "The affiliate shop comes first because that\u2019s where the commercial value is. The discount on the brand partnership is included in the label itself, which builds trust. A lot of creators bury that information. Zoe puts it upfront.",
  },
  {
    handle: "@pixelkaigg",
    niche: "Gaming streamer",
    theme: "Dark",
    links: [
      "Live now on Twitch",
      "YouTube highlights",
      "Discord server",
      "Support me on Ko-fi",
      "Merch drop",
    ],
    analysis: "The \u201cLive now\u201d link is always first because Kai updates it every time he goes live. He uses scheduled links (available on the Pro plan) to automate this so the link activates exactly when his stream starts. Discord is in there because building a community outside of Twitch is what keeps a streaming career sustainable long-term.",
  },
];

const businessExamples = [
  {
    handle: "@brewdepthlondon",
    niche: "Coffee shop",
    theme: "Light",
    links: [
      "Our menu",
      "Reserve a table",
      "Find us on Google Maps",
      "Order on Deliveroo",
      "Follow us on Instagram",
    ],
    analysis: "This is exactly the four things a local customer actually wants. Menu, booking, directions, delivery. The Google Maps link also nudges people who haven\u2019t been before to check where the shop is and consider visiting.",
  },
  {
    handle: "@lensbyjamie",
    niche: "Photographer",
    theme: "Light",
    links: [
      "View my portfolio",
      "Book a shoot",
      "Pricing guide (PDF)",
      "Recent weddings",
      "Get in touch",
    ],
    analysis: "The pricing PDF is doing quiet but important work here. People who download it are already serious. It filters out tyre-kickers before they reach the booking form. \u201cRecent weddings\u201d is a separate link from the main portfolio because wedding clients specifically want to see wedding work. Mixing it in with everything else dilutes the message.",
  },
  {
    handle: "@trainwithnico",
    niche: "Personal trainer",
    theme: "Gradient",
    links: [
      "Book a free intro call",
      "Online coaching, join waitlist",
      "Client transformations",
      "Free training tips on YouTube",
      "Download my nutrition guide",
    ],
    analysis: "The free intro call is at the top because it\u2019s low commitment. No one has to pay or commit to anything to book a call. The waitlist for online coaching creates scarcity without Nico having to say anything pushy. And the transformation stories sit exactly where someone would look while deciding whether to book.",
  },
  {
    handle: "@threadsbynova",
    niche: "Online store",
    theme: "Light",
    links: [
      "Shop new arrivals",
      "Custom orders, enquire here",
      "Behind the making (TikTok)",
      "Newsletter, 10% off your first order",
    ],
    analysis: "Custom orders are higher margin than Etsy sales, so they\u2019re surfaced early. The newsletter offer converts casual visitors into repeat buyers. Four links covering the full customer journey from \u201cI\u2019m browsing\u201d to \u201cI want something made just for me.\u201d",
  },
];

const devExamples = [
  {
    handle: "@devbytom",
    niche: "Frontend developer",
    theme: "Light",
    links: [
      "Portfolio (selected work)",
      "GitHub",
      "Available for projects, book a call",
      "Writing on DEV.to",
      "Download my CV",
    ],
    analysis: "The order here tells a story. Who am I, where\u2019s my code, how do you hire me, what do I write about, here\u2019s my CV if you need it. \u201cAvailable for projects\u201d as a link label also does something useful: it tells visitors immediately that Tom is open to work without him having to say it in his bio.",
  },
  {
    handle: "@uxbymaya",
    niche: "UX designer",
    theme: "Light",
    links: [
      "Portfolio (case studies)",
      "Free UX resources (Gumroad)",
      "Book a design critique",
      "Figma templates",
      "Newsletter, design tips weekly",
    ],
    analysis: "The free resources are early. People who find value in what she gives away for free are more likely to pay for templates or book a critique session. It\u2019s a funnel built into a five-link page.",
  },
  {
    handle: "@writtenbypriya",
    niche: "Freelance writer",
    theme: "Light",
    links: [
      "My work (published articles)",
      "Services and rates",
      "Book a discovery call",
      "LinkedIn",
      "Newsletter for writers",
    ],
    analysis: "Putting rates at position two filters immediately. Anyone who\u2019s not in the right budget range will know quickly, which saves everyone time. The discovery call sits after the rates, not before, for the same reason.",
  },
];

const musicExamples = [
  {
    handle: "@hazelaurasings",
    niche: "Indie musician",
    theme: "Gradient",
    links: [
      "New single, listen now (Spotify / Apple Music)",
      "Upcoming tour dates",
      "Merch store",
      "Support on Bandcamp",
      "YouTube (live sessions)",
    ],
    analysis: "New music is always first. Always. Tour dates are time-sensitive so they come second. Bandcamp sits alongside streaming because it lets fans buy your music directly, which pays artists far more than streaming ever will.",
  },
  {
    handle: "@inkbyrafael",
    niche: "Visual artist",
    theme: "Dark",
    links: [
      "Shop prints, new collection",
      "Commission enquiry",
      "Process videos on YouTube",
      "Patreon (exclusive work)",
    ],
    analysis: "Four links. The YouTube process videos are doing something specific here: people who see how the work is made tend to value it more. That translates into more print sales and more commission enquiries. It\u2019s not just content for its own sake.",
  },
  {
    handle: "@mindwithellen",
    niche: "Podcast host",
    theme: "Light",
    links: [
      "Latest episode",
      "Subscribe on Spotify",
      "Subscribe on Apple Podcasts",
      "Guest application",
      "Newsletter (weekly notes)",
    ],
    analysis: "Spotify and Apple are listed separately because podcast listeners are loyal to their platform. Linking to one and not the other loses half the audience. The guest application link surfaces the show to people who might want to be on it, which drives organic outreach without Ellen having to pitch anyone.",
  },
];

function ExampleCard({ n, handle, niche, theme, links, analysis }: {
  n: number;
  handle: string;
  niche: string;
  theme: string;
  links: string[];
  analysis: string;
}) {
  return (
    <div className="rounded-xl border border-border p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-0.5">#{n}</div>
          <h3 className="text-lg font-bold">{niche}</h3>
          <div className="text-sm text-muted-foreground">{handle} &middot; {theme} theme</div>
        </div>
      </div>
      <ul className="space-y-1 mb-4">
        {links.map((link) => (
          <li key={link} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
            {link}
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">{analysis}</p>
    </div>
  );
}

export default function LinkInBioExamplesPost() {
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
              <li className="text-foreground">Link in Bio Examples</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Inspiration</span>
              <span className="text-xs text-muted-foreground">March 2026 · 9 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              15 Best Link in Bio Examples for Inspiration (2026)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your link in bio page is often the first real landing experience someone has with you. Instagram, TikTok, and YouTube give you one clickable link, and that link needs to work.
            </p>
          </div>

          <div className="space-y-16">

            {/* Intro */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The difference between a forgettable page and one that actually converts is rarely about design. It&apos;s about what you put on it, in what order, and whether it matches what people expect when they arrive. Below are 15 examples across different niches, with a look at the thinking behind each setup.
              </p>
              <p className="text-sm bg-muted/50 border border-border rounded-xl px-4 py-3">
                Note: the examples below are illustrative. They&apos;re based on how real people use link in bio pages, but the names and usernames are fictional.
              </p>
            </div>

            {/* What makes a great page */}
            <section>
              <h2 className="text-2xl font-bold mb-6">What Makes a Great Link in Bio Page?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A few things separate the pages that get clicks from the ones that don&apos;t.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Focus",
                    body: "If everything is a priority, nothing is. The pages that perform best lead with one or two things that matter right now, whether that\u2019s a new video, a booking link, or a product launch. Everything else is secondary and should feel that way.",
                  },
                  {
                    title: "Clarity",
                    body: "\u201cBook a session\u201d beats \u201cClick here.\u201d \u201cMy portfolio\u201d beats \u201cWebsite.\u201d If someone has to guess what a link does, they\u2019ll probably skip it.",
                  },
                  {
                    title: "Relevance",
                    body: "This one most people get wrong. A link in bio page isn\u2019t a set-and-forget thing. The best pages are updated regularly to match what\u2019s happening now. A link to something from four months ago tells visitors you\u2019re not paying attention.",
                  },
                  {
                    title: "Visual consistency",
                    body: "The page should feel like it belongs to the same brand as the profile. A Dark theme for a night photography account, Light for a minimal lifestyle brand. It\u2019s a small thing that adds up.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border p-5">
                    <div className="font-semibold text-foreground mb-1">{item.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Creators */}
            <section>
              <h2 className="text-2xl font-bold mb-2">Link in Bio Examples for Creators & Influencers</h2>
              <p className="text-sm text-muted-foreground mb-6">
                See also: <Link href="/for/creators" className="underline underline-offset-4 hover:text-foreground transition-colors">how creators use Allme</Link>
              </p>
              <div className="space-y-6">
                {creatorExamples.map((ex, i) => (
                  <ExampleCard key={ex.handle} n={i + 1} {...ex} />
                ))}
              </div>
            </section>

            {/* Business */}
            <section>
              <h2 className="text-2xl font-bold mb-2">Link in Bio Examples for Small Business</h2>
              <p className="text-sm text-muted-foreground mb-6">
                See also: <Link href="/for/business" className="underline underline-offset-4 hover:text-foreground transition-colors">Allme for small business</Link>
              </p>
              <div className="space-y-6">
                {businessExamples.map((ex, i) => (
                  <ExampleCard key={ex.handle} n={i + 6} {...ex} />
                ))}
              </div>
            </section>

            {/* Developers */}
            <section>
              <h2 className="text-2xl font-bold mb-2">Link in Bio Examples for Developers & Freelancers</h2>
              <p className="text-sm text-muted-foreground mb-6">
                See also: <Link href="/for/developers" className="underline underline-offset-4 hover:text-foreground transition-colors">Allme for developers and freelancers</Link>
              </p>
              <div className="space-y-6">
                {devExamples.map((ex, i) => (
                  <ExampleCard key={ex.handle} n={i + 10} {...ex} />
                ))}
              </div>
            </section>

            {/* Musicians */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Link in Bio Examples for Musicians & Artists</h2>
              <div className="space-y-6">
                {musicExamples.map((ex, i) => (
                  <ExampleCard key={ex.handle} n={i + 13} {...ex} />
                ))}
              </div>
            </section>

            {/* Takeaways */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Key Takeaways: What the Best Examples Have in Common</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "The first link is always the most important thing right now",
                    body: "Not the most important thing in general. Right now. It changes.",
                  },
                  {
                    title: "Shorter lists outperform longer ones",
                    body: "The pages that get the most clicks are almost always the ones with three to five links, not ten. More options means more decisions, and people avoid decisions.",
                  },
                  {
                    title: "Labels are specific",
                    body: "\u201cBook a free intro call\u201d not \u201cContact.\u201d \u201cNew single, listen now\u201d not \u201cMusic.\u201d The specificity is what drives the click.",
                  },
                  {
                    title: "The theme matches the person",
                    body: "Every example here made a deliberate choice about Light, Dark, or Gradient. It\u2019s a small thing that makes the page feel considered rather than default.",
                  },
                  {
                    title: "The best pages get updated",
                    body: "This sounds obvious. Most people still don\u2019t do it. A link in bio page that hasn\u2019t changed in six months is losing traffic every day to one that has.",
                  },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border border-border p-5">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">{i + 1}</span>
                    <div>
                      <div className="font-semibold text-foreground mb-1">{item.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-2">How many links should I put on my link in bio page?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Three to five is the sweet spot for most people. Allme&apos;s free plan supports up to 5 links, which covers most use cases comfortably. If you genuinely need more, the Pro plan ($3.99/mo) goes up to 15.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-8">
                  <h3 className="font-semibold mb-2">Should I use my real name or my brand name as my username?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Use whatever matches your primary social handle. If your Instagram is @sarahfits, your link at{" "}
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">allme.site/sarahfits</code>{" "}
                    is instantly recognisable and easy to remember. Consistency between platforms matters more than the name itself.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-8">
                  <h3 className="font-semibold mb-2">How often should I update my link in bio page?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Whenever you post something you want people to take action on. The most effective pages get updated at least weekly. If that sounds like a lot of manual work, the Pro plan&apos;s scheduled links feature lets you set links to go live and expire automatically.
                  </p>
                </div>
              </div>
            </section>

            {/* Internal links */}
            <section className="rounded-xl bg-muted/40 border border-border p-6">
              <div className="text-sm font-semibold text-foreground mb-3">More on specific use cases</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/for/creators" className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
                    Link in bio for creators and influencers
                  </Link>
                </li>
                <li>
                  <Link href="/for/business" className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
                    Link in bio for small business
                  </Link>
                </li>
                <li>
                  <Link href="/for/developers" className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
                    Link in bio for developers and freelancers
                  </Link>
                </li>
                <li>
                  <Link href="/vs/linktree" className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
                    How Allme compares to Linktree
                  </Link>
                </li>
              </ul>
            </section>

            {/* CTA */}
            <section className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center">
              <h2 className="text-2xl font-bold mb-3">Create Your Link in Bio Page Free</h2>
              <p className="text-muted-foreground mb-6">
                5 links, 3 themes, click analytics. Free forever, no credit card required.
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
        </div>
      </main>
    </>
  );
}
