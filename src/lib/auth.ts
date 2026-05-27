import { createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "portfolio_admin";

export function getAdminToken(): string {
  const secret = process.env.SESSION_SECRET ?? "dev-session-change-me";
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`${secret}:${password}`).digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || password.length !== expected.length) {
    return password === expected && expected.length > 0;
  }
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function isValidAdminCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const expected = getAdminToken();
  if (!process.env.ADMIN_PASSWORD) return false;
  if (cookieValue.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
