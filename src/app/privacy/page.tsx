// Privacy Policy page
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Allme",
  description:
    "Learn how Allme collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            allme
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Create
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="relative pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Effective date: February 23, 2026
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-[15px] leading-relaxed text-foreground/90">
            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>Allme</strong> (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). We operate the website{" "}
                <strong>allme.site</strong> and provide a link-in-bio platform
                that lets you create a personal page with all your important
                links. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our services.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                2. Information We Collect
              </h2>

              <h3 className="text-base font-medium mt-4 mb-2 text-foreground">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                <li>
                  <strong>Account data:</strong> email address, username, and
                  password when you register.
                </li>
                <li>
                  <strong>Profile data:</strong> display name, bio, avatar
                  image, and the links you add to your page.
                </li>
                <li>
                  <strong>Payment data:</strong> if you subscribe to a paid plan,
                  payment information is processed by our third&#8209;party
                  payment processor (Stripe). We do not store your full credit
                  card number.
                </li>
                <li>
                  <strong>Communications:</strong> any messages you send us via
                  email or support channels.
                </li>
              </ul>

              <h3 className="text-base font-medium mt-4 mb-2 text-foreground">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                <li>
                  <strong>Usage data:</strong> pages visited, features used,
                  click events, and timestamps.
                </li>
                <li>
                  <strong>Device data:</strong> browser type, operating system,
                  IP address, and device identifiers.
                </li>
                <li>
                  <strong>Cookies:</strong> we use essential cookies to maintain
                  your session and preferences. See Section 5.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                <li>To create and manage your account and link page.</li>
                <li>
                  To provide analytics about clicks and views on your page.
                </li>
                <li>To process payments and manage subscriptions.</li>
                <li>
                  To communicate with you about updates, changes, or support
                  inquiries.
                </li>
                <li>To improve and optimize our platform and user experience.</li>
                <li>
                  To detect, prevent, and address security issues and abuse.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                4. How We Share Your Information
              </h2>
              <p>
                We do <strong>not</strong> sell your personal information. We may
                share data with:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2 text-foreground/80">
                <li>
                  <strong>Service providers:</strong> such as Supabase
                  (authentication &amp; database), Stripe (payments), and
                  hosting providers that help us operate the platform.
                </li>
                <li>
                  <strong>Legal obligations:</strong> when required by law,
                  regulation, or legal process.
                </li>
                <li>
                  <strong>Business transfers:</strong> in connection with a
                  merger, acquisition, or sale of assets.
                </li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                5. Cookies
              </h2>
              <p>
                We use essential cookies to keep you signed in and to remember
                your preferences (e.g., theme choice). We do not use
                third&#8209;party advertising or tracking cookies. You can
                disable cookies in your browser settings, but some features may
                not function properly.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                6. Data Security
              </h2>
              <p>
                We implement industry&#8209;standard security measures,
                including encryption in transit (TLS) and at rest, to protect
                your data. However, no method of transmission over the Internet
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                7. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as your account
                is active or as needed to provide you with our services. If you
                delete your account, we will delete your personal data within 30
                days, except where we are required to retain it by law.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                8. Your Rights
              </h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2 text-foreground/80">
                <li>Access, correct, or delete your personal information.</li>
                <li>Object to or restrict certain processing of your data.</li>
                <li>Export your data in a portable format.</li>
                <li>Withdraw consent at any time where processing is based on consent.</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, contact us at{" "}
                <strong>support@allme.site</strong>.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our service is not directed to individuals under 13 years of
                age. We do not knowingly collect personal information from
                children. If we learn we have collected data from a child under
                13, we will take steps to delete it promptly.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of material changes by posting the updated policy on
                this page and updating the &quot;Effective date&quot; at the
                top. Your continued use of our services constitutes acceptance
                of the updated policy.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                11. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact
                us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> support@allme.site
              </p>
            </section>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold tracking-tight">allme</span>
          <div className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Allme. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
