// Terms of Service page
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service — Allme",
    description:
        "Read the Terms of Service for using Allme, the link-in-bio platform.",
};

export default function TermsPage() {
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
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground mb-12">
                        Effective date: February 23, 2026
                    </p>

                    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-[15px] leading-relaxed text-foreground/90">
                        {/* 1 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                1. Agreement to Terms
                            </h2>
                            <p>
                                By accessing or using <strong>Allme</strong> (the
                                &quot;Service&quot;), operated at{" "}
                                <strong>allme.site</strong>, you agree to be bound by these
                                Terms of Service (&quot;Terms&quot;). If you do not agree with
                                any part of these Terms, you may not use the Service.
                            </p>
                        </section>

                        {/* 2 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                2. Eligibility
                            </h2>
                            <p>
                                You must be at least 13 years old to use the Service. By using
                                Allme, you represent that you meet this age requirement and have
                                the legal capacity to enter into these Terms.
                            </p>
                        </section>

                        {/* 3 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                3. Account Registration
                            </h2>
                            <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                                <li>
                                    You must provide accurate, complete information when creating
                                    an account.
                                </li>
                                <li>
                                    You are responsible for maintaining the confidentiality of
                                    your password and for all activity under your account.
                                </li>
                                <li>
                                    You agree to notify us immediately of any unauthorized use of
                                    your account.
                                </li>
                                <li>
                                    Each person may maintain only one free account. We reserve
                                    the right to remove duplicate accounts.
                                </li>
                            </ul>
                        </section>

                        {/* 4 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                4. Acceptable Use
                            </h2>
                            <p>You agree not to use the Service to:</p>
                            <ul className="list-disc pl-5 space-y-1.5 mt-2 text-foreground/80">
                                <li>
                                    Post or link to content that is illegal, harmful,
                                    threatening, abusive, defamatory, or otherwise objectionable.
                                </li>
                                <li>
                                    Distribute spam, malware, phishing links, or deceptive
                                    content.
                                </li>
                                <li>
                                    Impersonate another person or entity, or misrepresent your
                                    affiliation.
                                </li>
                                <li>
                                    Interfere with or disrupt the Service, servers, or networks
                                    connected to the Service.
                                </li>
                                <li>
                                    Attempt to gain unauthorized access to other accounts,
                                    systems, or data.
                                </li>
                                <li>
                                    Scrape, crawl, or use automated tools to access the Service
                                    without our permission.
                                </li>
                            </ul>
                            <p className="mt-2">
                                We reserve the right to suspend or terminate your account if
                                you violate these rules.
                            </p>
                        </section>

                        {/* 5 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                5. Your Content
                            </h2>
                            <p>
                                You retain ownership of the content you post on your Allme page
                                (links, text, images). By using the Service, you grant us a
                                non&#8209;exclusive, worldwide, royalty&#8209;free license to
                                host, display, and distribute your content solely for the
                                purpose of operating the Service.
                            </p>
                            <p className="mt-2">
                                You are solely responsible for the content you publish. We do
                                not endorse user content and are not liable for it.
                            </p>
                        </section>

                        {/* 6 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                6. Paid Plans &amp; Billing
                            </h2>
                            <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                                <li>
                                    Some features require a paid subscription (Pro or Business).
                                    Prices are listed on our{" "}
                                    <Link
                                        href="/pricing"
                                        className="underline hover:text-foreground"
                                    >
                                        Pricing
                                    </Link>{" "}
                                    page.
                                </li>
                                <li>
                                    Payments are processed securely by Stripe. By subscribing,
                                    you authorize recurring charges.
                                </li>
                                <li>
                                    You may cancel your subscription at any time from your
                                    dashboard. Cancellation takes effect at the end of the
                                    current billing period.
                                </li>
                                <li>
                                    We offer a 14&#8209;day money&#8209;back guarantee for new
                                    subscriptions. Contact support to request a refund.
                                </li>
                                <li>
                                    We reserve the right to change pricing with 30 days&apos;
                                    notice.
                                </li>
                            </ul>
                        </section>

                        {/* 7 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                7. Intellectual Property
                            </h2>
                            <p>
                                The Allme name, logo, design, and all underlying technology are
                                owned by us and protected by intellectual property laws. You may
                                not copy, modify, or distribute any part of the Service without
                                our prior written consent.
                            </p>
                        </section>

                        {/* 8 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                8. Termination
                            </h2>
                            <p>
                                We may suspend or terminate your account at any time, with or
                                without notice, if you violate these Terms or for any other
                                reason at our discretion. Upon termination:
                            </p>
                            <ul className="list-disc pl-5 space-y-1.5 mt-2 text-foreground/80">
                                <li>Your right to use the Service ceases immediately.</li>
                                <li>
                                    Your page and data may be deleted within 30 days.
                                </li>
                                <li>
                                    We are not liable for any loss resulting from termination.
                                </li>
                            </ul>
                            <p className="mt-2">
                                You may also delete your account at any time from your
                                dashboard settings.
                            </p>
                        </section>

                        {/* 9 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                9. Disclaimer of Warranties
                            </h2>
                            <p>
                                The Service is provided &quot;as is&quot; and &quot;as
                                available&quot; without warranties of any kind, express or
                                implied. We do not warrant that the Service will be
                                uninterrupted, error&#8209;free, or secure.
                            </p>
                        </section>

                        {/* 10 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                10. Limitation of Liability
                            </h2>
                            <p>
                                To the maximum extent permitted by law, Allme and its
                                operators shall not be liable for any indirect, incidental,
                                special, consequential, or punitive damages, including loss of
                                profits, data, or goodwill, arising from your use of the
                                Service. Our total liability shall not exceed the amount you
                                paid us in the 12 months preceding the claim.
                            </p>
                        </section>

                        {/* 11 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                11. Governing Law
                            </h2>
                            <p>
                                These Terms shall be governed by and construed in accordance
                                with the laws of the jurisdiction in which we operate, without
                                regard to conflict of law principles. Any disputes arising from
                                these Terms shall be resolved in the courts of that
                                jurisdiction.
                            </p>
                        </section>

                        {/* 12 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                12. Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms from time to time. We will notify you
                                of material changes by posting the updated Terms on this page
                                and updating the &quot;Effective date.&quot; Your continued use
                                of the Service after changes constitutes acceptance of the
                                revised Terms.
                            </p>
                        </section>

                        {/* 13 */}
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">
                                13. Contact Us
                            </h2>
                            <p>
                                If you have questions about these Terms, please contact us at:
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
