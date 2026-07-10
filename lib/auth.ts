// Edge-compatible session helpers (Web Crypto only — usable in middleware).
export const SESSION_COOKIE = "pa_session";

const enc = new TextEncoder();

// Sessions are valid this long; older tokens are rejected even if the cookie
// still exists (a stolen token cannot be replayed forever).
export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET is not set");
    }
    return "dev-insecure-secret";
  }
  return s;
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function b64url(s: string): string {
  return Buffer.from(s, "utf8").toString("base64url");
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Token format: base64url(payload) "." hmac(base64url(payload))
// The signature is computed over the ENCODED body so verification never has to
// base64-decode — keeping it safe in the Edge (middleware) runtime.
export async function createSessionToken(user: string): Promise<string> {
  const body = b64url(`${user}.${Date.now()}`);
  const sig = await hmac(body);
  return `${body}.${sig}`;
}

// Edge-safe base64url decode (atob exists in both Edge and Node runtimes).
function fromB64url(s: string): string | null {
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    return atob(b64);
  } catch {
    return null;
  }
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!sig) return false;
  const expected = await hmac(body);
  if (!safeEqual(sig, expected)) return false;
  // Signature is good — now enforce expiry from the signed payload.
  const payload = fromB64url(body);
  if (!payload) return false;
  const issuedAt = Number(payload.slice(payload.lastIndexOf(".") + 1));
  if (!Number.isFinite(issuedAt)) return false;
  return Date.now() - issuedAt < SESSION_MAX_AGE_MS;
}

export function verifyCredentials(user: string, pass: string): boolean {
  return (
    user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD
  );
}
