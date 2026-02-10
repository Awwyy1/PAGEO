// Landing page — hero section with CTA
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Your links.
          <br />
          <span className="text-primary">One page.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Create a beautiful page with all your important links and share it with the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get started free
          </Link>
          <Link
            href="/demo"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            See demo
          </Link>
        </div>
      </div>
    </main>
  );
}
