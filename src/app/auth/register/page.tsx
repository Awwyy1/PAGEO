// Register page — create account with email + password + pick username
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const RESERVED_USERNAMES = [
  "admin", "demo", "allme", "test", "user", "help",
  "support", "about", "blog", "api", "app", "www", "mail",
  "dashboard", "auth", "pricing", "privacy", "terms",
];

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid" | "too_short";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");

  // Debounced real-time username availability check
  useEffect(() => {
    if (!username) {
      setUsernameStatus("idle");
      return;
    }

    if (username.length < 3) {
      setUsernameStatus("too_short");
      return;
    }

    if (username.length > 30) {
      setUsernameStatus("invalid");
      return;
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
      setUsernameStatus("invalid");
      return;
    }

    if (RESERVED_USERNAMES.includes(username)) {
      setUsernameStatus("taken");
      return;
    }

    setUsernameStatus("checking");

    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      setUsernameStatus(data ? "taken" : "available");
    }, 400);

    return () => clearTimeout(timer);
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  const canSubmit =
    usernameStatus === "available" &&
    email.length > 0 &&
    password.length >= 6 &&
    !loading;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (usernameStatus !== "available") {
      setError("Please choose an available username.");
      return;
    }

    setLoading(true);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, full_name: username },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Create profile row immediately so the dashboard has data on first load
    if (signUpData.user) {
      await supabase.from("profiles").insert({
        id: signUpData.user.id,
        username,
        display_name: username,
        bio: null,
        avatar_url: null,
        theme: "light",
      });
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            allme
          </Link>
          <p className="text-muted-foreground mt-2 text-sm">
            Create your page
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                allme.site/
              </span>
              <div className="relative flex-1">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                  placeholder="yourname"
                  required
                  className={cn(
                    "pr-9",
                    usernameStatus === "available" &&
                    "border-emerald-500 focus-visible:ring-emerald-500",
                    (usernameStatus === "taken" || usernameStatus === "invalid") &&
                    "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {/* Status icon */}
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  {usernameStatus === "checking" && (
                    <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                  )}
                  {usernameStatus === "available" && (
                    <Check className="h-4 w-4 text-emerald-500" />
                  )}
                  {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                </div>
              </div>
            </div>
            {/* Status message */}
            <div className="min-h-[18px] ml-[calc(4.5rem+0.5rem)]">
              {usernameStatus === "available" && (
                <p className="text-xs text-emerald-600">
                  allme.site/{username} is yours!
                </p>
              )}
              {usernameStatus === "taken" && (
                <p className="text-xs text-destructive">
                  This username is already taken.
                </p>
              )}
              {usernameStatus === "too_short" && username.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  At least 3 characters required.
                </p>
              )}
              {usernameStatus === "invalid" && (
                <p className="text-xs text-destructive">
                  Only lowercase letters, numbers, hyphens, and underscores.
                </p>
              )}
            </div>
          </div>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-1">
            By continuing, you agree to Allme&apos;s{" "}
            <Link
              href="/privacy"
              className="underline hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="underline hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            .
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
