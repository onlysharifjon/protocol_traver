// Edge-compatible session helpers (Web Crypto only — usable in middleware).
export const SESSION_COOKIE = "pa_session";

const enc = new TextEncoder();

function secret(): string {
  return process.env.SESSION_SECRET ?? "dev-insecure-secret";
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
  return safeEqual(sig, expected);
}

export function verifyCredentials(user: string, pass: string): boolean {
  return (
    user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD
  );
}
