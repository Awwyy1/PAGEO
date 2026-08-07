// Visitor identification for analytics deduplication. Server-only.
//
// The goal is to recognise "this is the same visitor as a minute ago" without
// storing anything that identifies a person. The hash mixes in today's date, so
// it changes every day and cannot be used to follow someone over time — the
// same approach privacy-first analytics tools use. The raw IP never reaches the
// database.
import { createHash } from "crypto";

/** How long the same visitor is considered to be on the same visit. */
export const DEDUP_WINDOW_MINUTES = 30;

/**
 * Stable-for-today identifier for a visitor on one profile.
 *
 * Scoped per profile on purpose: the same person visiting two different pages
 * produces two unrelated hashes, so the table can't be used to reconstruct
 * someone's browsing across profiles.
 */
export function visitorHash(
  request: Request,
  profileId: string,
  now = new Date()
): string {
  const headers = request.headers;

  // Vercel puts the real client address in x-forwarded-for; the first entry is
  // the client, the rest are proxies. Falling back to the user agent alone is
  // fine — it degrades to coarser deduplication rather than failing.
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown";

  const userAgent = headers.get("user-agent") || "unknown";
  const day = now.toISOString().slice(0, 10);

  return createHash("sha256")
    .update(`${ip}|${userAgent}|${profileId}|${day}`)
    .digest("hex")
    .slice(0, 32);
}

/** ISO timestamp marking the start of the current deduplication window. */
export function dedupWindowStart(now = new Date()): string {
  return new Date(now.getTime() - DEDUP_WINDOW_MINUTES * 60_000).toISOString();
}
