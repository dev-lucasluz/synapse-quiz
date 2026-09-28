// scripts/test-security-audit.mjs
// Automated verification for security rules defined in .agents/skills/security.md

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function assert(desc, condition) {
  if (!condition) {
    console.error(`✖ FAILED: ${desc}`);
    process.exitCode = 1;
  } else {
    console.log(`✔ PASSED: ${desc}`);
  }
}

async function runSecurityTests() {
  console.log(`\nRunning Security & OWASP Audit Tests against ${BASE_URL}...\n`);

  // 1. Check HTTP Security Headers
  try {
    const res = await fetch(`${BASE_URL}/`);
    const h = res.headers;
    await assert("Security Header: Content-Security-Policy is present", !!h.get("content-security-policy"));
    await assert("Security Header: X-Frame-Options is DENY", h.get("x-frame-options") === "DENY");
    await assert("Security Header: X-Content-Type-Options is nosniff", h.get("x-content-type-options") === "nosniff");
    await assert("Security Header: Referrer-Policy is strict-origin-when-cross-origin", !!h.get("referrer-policy"));
    await assert("Security Header: Permissions-Policy restricts sensitive APIs", !!h.get("permissions-policy"));
  } catch (e) {
    console.error("Header check failed:", e.message);
    process.exitCode = 1;
  }

  // 2. Check Auth Requirement on Protected API (IDOR / BOLA Prevention)
  try {
    const resNotes = await fetch(`${BASE_URL}/api/notes`);
    await assert("Protected API: /api/notes rejects unauthenticated request (401)", resNotes.status === 401);

    const resSims = await fetch(`${BASE_URL}/api/simulations`);
    await assert("Protected API: /api/simulations rejects unauthenticated request (401)", resSims.status === 401);

    const resProfile = await fetch(`${BASE_URL}/api/profile`);
    await assert("Protected API: /api/profile rejects unauthenticated request (401)", resProfile.status === 401);
  } catch (e) {
    console.error("Auth check failed:", e.message);
    process.exitCode = 1;
  }

  // 3. Input Validation on Registration
  try {
    // Malformed email
    const badEmailRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.10" },
      body: JSON.stringify({ name: "Dr Test", email: "not-an-email", password: "validPassword123" }),
    });
    await assert("Input Validation: /api/auth/register rejects invalid email format (400)", badEmailRes.status === 400);

    // Short password
    const shortPassRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.11" },
      body: JSON.stringify({ name: "Dr Test", email: "test@med.br", password: "123" }),
    });
    await assert("Input Validation: /api/auth/register rejects password < 8 chars (400)", shortPassRes.status === 400);

    // Overlong password (> 72 chars, bcrypt DoS prevention)
    const longPassRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.12" },
      body: JSON.stringify({ name: "Dr Test", email: "test@med.br", password: "a".repeat(73) }),
    });
    await assert("Input Validation: /api/auth/register rejects password > 72 chars (400)", longPassRes.status === 400);
  } catch (e) {
    console.error("Register validation check failed:", e.message);
    process.exitCode = 1;
  }

  // 4. Rate Limiting on Login (Credential Stuffing / Brute Force Prevention)
  try {
    const testIp = `198.51.100.${Math.floor(Math.random() * 200) + 50}`;
    let hitRateLimit = false;
    for (let i = 0; i < 7; i++) {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": testIp },
        body: JSON.stringify({ email: "invalid_brute_test@med.br", password: "wrong_password" }),
      });
      if (res.status === 429) {
        hitRateLimit = true;
        break;
      }
    }
    await assert("Rate Limiting: /api/auth/login triggers HTTP 429 on brute force attempt", hitRateLimit);
  } catch (e) {
    console.error("Rate limit check failed:", e.message);
    process.exitCode = 1;
  }

  console.log("\nSecurity audit verification complete.\n");
}

runSecurityTests();
