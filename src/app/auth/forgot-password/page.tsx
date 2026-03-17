// Forgot password page — sends a password reset link to the user's email
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    const supabase = createClient();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <Link href="/" className="text-2xl font-bold tracking-tight">
                        allme
                    </Link>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Reset your password
                    </p>
                </div>

                {sent ? (
                    <div className="rounded-xl border bg-card p-6 text-center space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">Check your email</h3>
                        <p className="text-sm text-muted-foreground">
                            We sent a password reset link to{" "}
                            <span className="font-medium text-foreground">{email}</span>.
                            Click the link in the email to set a new password.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Didn&apos;t receive it? Check your spam folder or{" "}
                            <button
                                type="button"
                                onClick={() => setSent(false)}
                                className="text-primary hover:underline font-medium"
                            >
                                try again
                            </button>
                            .
                        </p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleReset} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Send reset link"
                                )}
                            </Button>
                        </form>
                    </>
                )}

                <p className="text-center text-sm text-muted-foreground">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        Back to sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}
