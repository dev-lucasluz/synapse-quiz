// scripts/test-agentic-readiness.mjs
import assert from "node:assert";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log(`Running Agentic Readiness tests against ${BASE_URL}...\n`);
  let passed = 0;
  let failed = 0;

  // 1. Content negotiation: Accept text/markdown on /
  try {
    const res = await fetch(`${BASE_URL}/`, {
      headers: { Accept: "text/markdown" },
    });
    assert.strictEqual(res.status, 200, "Expected status 200 for Accept: text/markdown on /");
    const ct = res.headers.get("content-type") || "";
    assert(ct.includes("text/markdown"), `Expected Content-Type text/markdown, got ${ct}`);
    const vary = (res.headers.get("vary") || "").toLowerCase();
    assert(vary.includes("accept"), `Expected Vary header containing Accept, got ${vary}`);
    const body = await res.text();
    assert(body.includes("# Synapse Quiz"), "Expected Markdown body to contain # Synapse Quiz");
    assert(body.length > 500, `Expected Markdown body length > 500 chars, got ${body.length}`);
    console.log("✔ Test 1 Passed: GET / with Accept: text/markdown returns 200, text/markdown, Vary: Accept");
    passed++;
  } catch (err) {
    console.error("✖ Test 1 Failed:", err.message);
    failed++;
  }

  // 2. Content negotiation: Accept text/markdown on /dashboard
  try {
    const res = await fetch(`${BASE_URL}/dashboard`, {
      headers: { Accept: "text/markdown" },
    });
    assert.strictEqual(res.status, 200, "Expected status 200 for Accept: text/markdown on /dashboard");
    const ct = res.headers.get("content-type") || "";
    assert(ct.includes("text/markdown"), `Expected Content-Type text/markdown, got ${ct}`);
    const vary = (res.headers.get("vary") || "").toLowerCase();
    assert(vary.includes("accept"), `Expected Vary header containing Accept, got ${vary}`);
    const body = await res.text();
    assert(body.includes("Painel do Estudante"), "Expected Markdown body to contain Dashboard title");
    assert(body.length > 500, `Expected Markdown body length > 500 chars, got ${body.length}`);
    console.log("✔ Test 2 Passed: GET /dashboard with Accept: text/markdown returns 200, text/markdown, Vary: Accept");
    passed++;
  } catch (err) {
    console.error("✖ Test 2 Failed:", err.message);
    failed++;
  }

  // 3. Agent-friendly 404: Nonexistent path with Accept: text/markdown
  try {
    const probePath = "/__ora-404-probe-z8lc40qk";
    const res = await fetch(`${BASE_URL}${probePath}`, {
      headers: { Accept: "text/markdown" },
    });
    assert.strictEqual(res.status, 404, "Expected status 404 for nonexistent path");
    const ct = res.headers.get("content-type") || "";
    assert(ct.includes("text/markdown"), `Expected Content-Type text/markdown, got ${ct}`);
    const vary = (res.headers.get("vary") || "").toLowerCase();
    assert(vary.includes("accept"), `Expected Vary header containing Accept, got ${vary}`);
    const body = await res.text();
    assert(body.length >= 20, `Expected Markdown error body >= 20 chars, got ${body.length}`);
    assert(body.includes("404"), "Expected error body to mention 404");
    assert(body.includes("sitemap.xml") || body.includes("llms.txt"), "Expected error body to link to sitemap or llms.txt");
    console.log("✔ Test 3 Passed: GET /__ora-404-probe-z8lc40qk with Accept: text/markdown returns 404, text/markdown, Vary: Accept, Markdown body with links");
    passed++;
  } catch (err) {
    console.error("✖ Test 3 Failed:", err.message);
    failed++;
  }

  // 4. Raw HTML without JavaScript on /
  try {
    const res = await fetch(`${BASE_URL}/`, {
      headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
    });
    assert.strictEqual(res.status, 200, "Expected status 200 for HTML on /");
    const ct = res.headers.get("content-type") || "";
    assert(ct.includes("text/html"), `Expected Content-Type text/html, got ${ct}`);
    const vary = (res.headers.get("vary") || "").toLowerCase();
    assert(vary.includes("accept"), `Expected Vary header containing Accept, got ${vary}`);
    const html = await res.text();

    // Check JSON-LD
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(jsonLdMatch, "Expected JSON-LD script tag in HTML");
    const jsonLd = JSON.parse(jsonLdMatch[1]);
    assert.strictEqual(jsonLd["@type"], "SoftwareApplication", "Expected @type SoftwareApplication");
    assert(jsonLd.name, "Expected JSON-LD name property");
    assert(jsonLd.description, "Expected JSON-LD description property");
    assert(jsonLd.url, "Expected JSON-LD url property");

    // Check headings
    const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
      tag: m[1].toLowerCase(),
      text: m[2].replace(/<[^>]+>/g, "").trim(),
    }));
    const hasH1 = headings.some((h) => h.tag === "h1");
    assert(hasH1, "Expected at least one H1 heading in HTML");

    // Check heading hierarchy: must not jump levels (e.g. h1 -> h3)
    let maxLevel = 0;
    for (const h of headings) {
      const level = parseInt(h.tag[1], 10);
      assert(level <= maxLevel + 1, `Invalid heading sequence: jumped to h${level} after h${maxLevel}`);
      maxLevel = Math.max(maxLevel, level);
    }

    // Text content length without scripts/styles
    const cleanText = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    assert(cleanText.length >= 500, `Expected at least 500 chars of text, got ${cleanText.length}`);

    console.log(`✔ Test 4 Passed: Raw HTML has ${cleanText.length} chars (>500), H1, sequential headings, and valid SoftwareApplication JSON-LD`);
    passed++;
  } catch (err) {
    console.error("✖ Test 4 Failed:", err.message);
    failed++;
  }

  // 5. llms.txt, sitemap.xml, robots.txt endpoints
  try {
    const [llmsRes, sitemapRes, robotsRes] = await Promise.all([
      fetch(`${BASE_URL}/llms.txt`),
      fetch(`${BASE_URL}/sitemap.xml`),
      fetch(`${BASE_URL}/robots.txt`),
    ]);

    assert.strictEqual(llmsRes.status, 200, "Expected 200 for /llms.txt");
    const llmsBody = await llmsRes.text();
    assert(llmsBody.includes("# Synapse Quiz"), "Expected llms.txt to contain title");

    assert.strictEqual(sitemapRes.status, 200, "Expected 200 for /sitemap.xml");
    const sitemapBody = await sitemapRes.text();
    assert(sitemapBody.includes("<urlset"), "Expected sitemap.xml to be valid XML urlset");

    assert.strictEqual(robotsRes.status, 200, "Expected 200 for /robots.txt");
    const robotsBody = await robotsRes.text();
    assert(robotsBody.includes("sitemap.xml"), "Expected robots.txt to link to sitemap.xml");

    console.log("✔ Test 5 Passed: /llms.txt, /sitemap.xml, and /robots.txt all return 200 with valid content");
    passed++;
  } catch (err) {
    console.error("✖ Test 5 Failed:", err.message);
    failed++;
  }

  // 6. Direct .md URL extension (Dashboard.md)
  try {
    const res = await fetch(`${BASE_URL}/dashboard.md`);
    assert.strictEqual(res.status, 200, "Expected 200 for /dashboard.md");
    const ct = res.headers.get("content-type") || "";
    assert(ct.includes("text/markdown"), `Expected Content-Type text/markdown, got ${ct}`);
    const body = await res.text();
    assert(body.includes("Painel do Estudante"), "Expected dashboard markdown content");
    console.log("✔ Test 6 Passed: /dashboard.md returns 200 text/markdown directly");
    passed++;
  } catch (err) {
    console.error("✖ Test 6 Failed:", err.message);
    failed++;
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

runTests();
