import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Link in Bio Tips & Guides | Allme",
  description:
    "Guides, comparisons, and tips for getting more from your link in bio page. Honest, practical content for creators, developers, and businesses.",
  alternates: {
    canonical: "https://allme.site/blog",
  },
};

const posts = [
  {
    slug: "linktree-alternatives",
    title: "7 Best Free Linktree Alternatives in 2026",
    description:
      "Linktree's free plan has limits. Here are 7 free alternatives — what each one offers, who it's for, and where each one falls short.",
    date: "March 2026",
    readTime: "8 min read",
    tags: ["Comparison", "Free tools"],
  },
];

export default function BlogIndexPage() {
  return (
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
            Get Started Free
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-foreground">Blog</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-muted-foreground mb-12">
          Guides and comparisons for getting the most from your link in bio.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-border p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
              <span className="inline-block mt-4 text-sm font-medium text-primary">Read article →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
