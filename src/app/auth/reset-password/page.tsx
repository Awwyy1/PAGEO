// Reset password page — user sets a new password after clicking the email link
"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            // Use server-side API to update password (bypasses Chrome AbortError)
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to update password.");
                setLoading(false);
                return;
            }

            setSuccess(true);
        } catch {
            setError("Connection error. Please try again.");
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
                        Set a new password
                    </p>
                </div>

                {success ? (
                    <div className="rounded-xl border bg-card p-6 text-center space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold">Password updated!</h3>
                        <p className="text-sm text-muted-foreground">
                            Your password has been changed successfully.
                        </p>
                        <button
                            onClick={() => { window.location.href = "/dashboard"; }}
                            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSetPassword} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">New password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Confirm password</label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Update password"
                                )}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}
