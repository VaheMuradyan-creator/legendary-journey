const COOKIE_NAME = "portfolio_admin";

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const secret = process.env.SESSION_SECRET ?? "dev-session-change-me";
  return sha256Hex(`${secret}:${password}`);
}

export async function isValidAdminCookieEdge(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await expectedToken();
  if (!expected) return false;
  return cookieValue === expected;
}

export { COOKIE_NAME };
