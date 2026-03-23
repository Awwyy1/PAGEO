// Analytics helper utilities — device parsing, referrer extraction, country display

export function parseDevice(ua: string): "mobile" | "desktop" | "tablet" {
  if (/iPad|Tablet|PlayBook/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

export function parseReferrerDomain(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

export function countryToFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

export function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}
