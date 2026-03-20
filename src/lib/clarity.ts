// Microsoft Clarity integration — tracking script + custom event helpers
// Docs: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Type declarations for the global clarity function
declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Returns true if Clarity is loaded and the project ID is configured */
export function isClarityReady(): boolean {
  return typeof window !== "undefined" && typeof window.clarity === "function" && !!CLARITY_ID;
}

/**
 * Identify the current user to Clarity.
 * Links session recordings & heatmaps to a specific user.
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#identify
 */
export function clarityIdentify(userId: string, sessionId?: string, pageName?: string, friendlyName?: string) {
  if (!isClarityReady()) return;
  window.clarity!("identify", userId, sessionId, pageName, friendlyName);
}

/**
 * Set a custom tag (key-value) for filtering in Clarity dashboard.
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#set
 */
export function claritySet(key: string, value: string) {
  if (!isClarityReady()) return;
  window.clarity!("set", key, value);
}

/**
 * Fire a custom Clarity event (appears in the session timeline).
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#event
 */
export function clarityEvent(name: string) {
  if (!isClarityReady()) return;
  window.clarity!("event", name);
}

/**
 * Upgrade the current session priority in Clarity.
 * Useful to flag "important" sessions (e.g. paid user, error occurred).
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#upgrade
 */
export function clarityUpgrade(reason: string) {
  if (!isClarityReady()) return;
  window.clarity!("upgrade", reason);
}
