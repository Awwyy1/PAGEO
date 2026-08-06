// Link URL safety — the public profile page renders user-supplied URLs into
// href attributes, so a stored `javascript:` URL would execute in our own
// origin when a visitor clicks it. Auth cookies are readable by JavaScript
// (@supabase/ssr needs that), so such a click means session theft.
//
// Parsing goes through the real URL parser rather than string matching, which
// handles the usual obfuscations for free: embedded tabs and newlines are
// stripped by the parser, and the protocol comes back lowercased, so
// "Java\nscript:alert(1)" resolves to the javascript: protocol and is rejected.

const SAFE_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

/**
 * Normalize user input into a safe absolute URL.
 *
 * Bare domains get an https:// prefix, so "example.com" keeps working — before
 * this existed it was stored verbatim and rendered as a broken relative link.
 * Returns null when the input can't be made into a safe URL.
 */
export function safeUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  const candidate = hasScheme
    ? trimmed
    : `https://${trimmed.replace(/^\/+/, "")}`;

  try {
    const url = new URL(candidate);
    if (!SAFE_PROTOCOLS.includes(url.protocol)) return null;
    if ((url.protocol === "http:" || url.protocol === "https:") && !url.hostname) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

/** True when the input can be stored and rendered as a link. */
export function isSafeUrl(raw: string | null | undefined): boolean {
  return safeUrl(raw) !== null;
}
