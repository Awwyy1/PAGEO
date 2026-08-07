/** @type {import('next').NextConfig} */

// Supabase origin, so connect-src can name it exactly rather than wildcarding
// every project on supabase.co. Falls back to the wildcard if the env var is
// missing or malformed, which happens during some CI builds.
function supabaseOrigin() {
  try {
    const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return raw ? new URL(raw).origin : "https://*.supabase.co";
  } catch {
    return "https://*.supabase.co";
  }
}

// Everything the app actually loads from somewhere other than our own domain:
//   - Microsoft Clarity (session recording) — script + its own beacons
//   - api.qrserver.com — renders the QR code in the share modal
//   - Supabase — REST/auth calls and avatar images from storage
//   - Vercel Analytics posts to /_vercel/insights on our own origin
//
// 'unsafe-inline' in script-src is required because Next.js emits inline
// hydration scripts without a nonce. Adding nonces means making every page
// dynamic, which would undo the caching work on the public profile pages.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin()} https://*.supabase.co https://*.clarity.ms https://api.qrserver.com https://vitals.vercel-insights.com`,
  // Clarity creates a hidden same-domain iframe for cross-origin storage.
  "frame-src 'self' https://*.clarity.ms",
  // blob: because bundlers and some libraries start workers from a Blob URL.
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Clickjacking protection. This one is enforced rather than report-only:
  // the app renders no iframes, so it cannot break anything, and it is what
  // actually stops the dashboard being framed invisibly on someone else's page.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },

  // Stop the browser guessing a response is a script when it isn't.
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Send the full URL only to our own origin; other sites see the domain only.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Features the app never uses. navigator.clipboard and navigator.share are
  // deliberately left alone — the share button on public pages depends on them.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },

  // Refuse plain http for a year. No `preload`: joining the browser preload
  // list is difficult to reverse and should be a deliberate decision.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },

  // Enforcing, after a report-only pass over the dashboard, a public page, the
  // QR modal and pricing produced no violations.
  //
  // To roll back: rename this key to Content-Security-Policy-Report-Only and
  // redeploy. That reverts to reporting without blocking, and nothing else in
  // this file has to change.
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
