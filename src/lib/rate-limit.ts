/**
 * Simple in-memory sliding-window rate limiter.
 *
 * NOTE: This is best-effort on serverless environments (Vercel) because each
 * lambda instance has its own memory. It still provides meaningful protection
 * against automated attacks on a single instance and against clients that
 * receive the same instance (which is common with warm lambdas).
 * For a stricter guarantee, replace the store with Upstash Redis.
 */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

/** Remove expired entries to prevent unbounded memory growth. */
function cleanup() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

/**
 * @param key       Unique key (e.g. `login:127.0.0.1`)
 * @param max       Maximum allowed requests within the window
 * @param windowMs  Window duration in milliseconds
 */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

/** Extract the real client IP from Next.js request headers. */
export function getClientIp(request: Request): string {
  const headers = (request as Request & { headers: Headers }).headers;
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  return "unknown";
}
