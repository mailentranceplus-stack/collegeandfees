#!/usr/bin/env node
/**
 * CollegeAndFees — Automated Audit Script
 * Usage: BASE_URL=https://collegeandfees.vercel.app node scripts/audit.js
 */

const BASE_URL = (process.env.BASE_URL || "https://collegeandfees.vercel.app").replace(/\/$/, "");

const ACTIVE_SLUGS = [
  "rvce-bangalore",
  "christ-university-bangalore",
  "bms-college-of-engineering",
  "msrit-bangalore",
  "pes-university-bangalore",
  "amc-engineering-college",
  "jss-science-technology-university-mysore",
];
const INACTIVE_SLUGS = [];

const HTML_ROUTES = [
  "/",
  "/engineering-colleges/bangalore",
  "/management-quota/bangalore",
  "/direct-admission/bangalore",
  "/bangalore",
  "/colleges/rvce-bangalore",
  "/colleges/rvce-bangalore/fees",
  "/management-quota/rvce-bangalore",
  "/direct-admission/rvce-bangalore",
  "/colleges/christ-university-bangalore",
  "/colleges/christ-university-bangalore/fees",
  "/colleges/bms-college-of-engineering",
  "/colleges/bms-college-of-engineering/fees",
  "/colleges/amc-engineering-college",
  "/colleges/jss-science-technology-university-mysore",
];

let passCount = 0;
let failCount = 0;
const allFailures = [];

function pass(label) {
  console.log(`    PASS ✅  ${label}`);
  passCount++;
}

function fail(label, actual) {
  const detail = actual !== undefined ? ` — got: ${String(actual).slice(0, 120)}` : "";
  console.log(`    FAIL ❌  ${label}${detail}`);
  failCount++;
  allFailures.push(`${label}${detail}`);
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractMeta(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*name=["']${name}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

function extractCanonical(html) {
  const patterns = [
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
    /<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

function pathContainsSlug(path, slugs) {
  return slugs.some((slug) => path.includes(slug));
}

async function fetchUrl(path) {
  const url = BASE_URL + path;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "CollegeAndFeesAudit/1.0" },
    });
    const body = await res.text();
    return { status: res.status, body };
  } catch (err) {
    return { status: null, body: null, error: err.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function auditHtmlRoute(route) {
  console.log(`\n  [${route}]`);

  const { status, body: html, error } = await fetchUrl(route);

  if (error || html === null) {
    fail("HTTP fetch", error || "no response");
    return;
  }

  // ── 1. HTTP 200 ──────────────────────────────────────────────────────────
  if (status === 200) {
    pass("HTTP 200");
  } else {
    fail("HTTP 200", status);
  }

  // ── 2. <title> non-empty ─────────────────────────────────────────────────
  const title = extractTitle(html);
  if (title && title.length > 0) {
    pass(`<title> non-empty ("${title.slice(0, 70)}${title.length > 70 ? "…" : ""}")`);
  } else {
    fail("<title> non-empty", title === null ? "tag not found" : "empty string");
  }

  // ── 3. canonical starts with https://collegeandfees.com ──────────────────
  const canonical = extractCanonical(html);
  if (canonical && canonical.startsWith("https://collegeandfees.com")) {
    pass(`canonical OK ("${canonical}")`);
  } else {
    fail("canonical starts with https://collegeandfees.com", canonical ?? "not found");
  }

  // ── 4. meta description non-empty ────────────────────────────────────────
  const desc = extractMeta(html, "description");
  if (desc && desc.length > 0) {
    pass(`meta description non-empty ("${desc.slice(0, 60)}…")`);
  } else {
    fail("meta description non-empty", desc === null ? "tag not found" : "empty string");
  }

  // ── 5. No literal "undefined" or "null" in HTML ──────────────────────────
  const undefinedPatterns = [">undefined<", '="undefined"', ">undefined ", " undefined<"];
  const nullPatterns = [">null<", '="null"'];
  const foundUndefined = undefinedPatterns.find((p) => html.includes(p));
  const foundNull = nullPatterns.find((p) => html.includes(p));
  if (foundUndefined) {
    fail('no literal "undefined" in HTML', `found: "${foundUndefined}"`);
  } else if (foundNull) {
    fail('no literal "null" in HTML', `found: "${foundNull}"`);
  } else {
    pass('no literal "undefined" or "null" in HTML');
  }

  // ── 6. No placeholder fee amounts ₹100 or ₹175 ──────────────────────────
  const hasRs100 = html.includes("₹100");
  const hasRs175 = html.includes("₹175");
  if (!hasRs100 && !hasRs175) {
    pass("no placeholder fees (₹100, ₹175)");
  } else {
    fail("no placeholder fees (₹100, ₹175)", hasRs100 ? "₹100 found in HTML" : "₹175 found in HTML");
  }

  // ── Active-college-only checks ───────────────────────────────────────────
  if (pathContainsSlug(route, ACTIVE_SLUGS)) {
    const robots = extractMeta(html, "robots");

    // 7. robots does NOT contain noindex
    if (robots && !robots.toLowerCase().includes("noindex")) {
      pass(`robots does not contain noindex ("${robots}")`);
    } else {
      fail("robots does not contain noindex", robots ?? "tag not found");
    }

    // 8. Title contains "2026"
    if (title && title.includes("2026")) {
      pass('title contains "2026"');
    } else {
      fail('title contains "2026"', title ?? "title not found");
    }
  }

  // ── Inactive-college-only checks ─────────────────────────────────────────
  if (pathContainsSlug(route, INACTIVE_SLUGS)) {
    const robots = extractMeta(html, "robots");

    // 9. robots contains noindex
    if (robots && robots.toLowerCase().includes("noindex")) {
      pass(`robots contains noindex ("${robots}")`);
    } else {
      fail("robots contains noindex", robots ?? "tag not found");
    }
  }
}

async function auditRobotsTxt() {
  console.log("\n  [/robots.txt]");

  const { status, body, error } = await fetchUrl("/robots.txt");

  if (error || body === null) {
    fail("HTTP fetch", error || "no response");
    return;
  }

  // HTTP 200
  if (status === 200) {
    pass("HTTP 200");
  } else {
    fail("HTTP 200", status);
  }

  // Contains "Disallow: /"
  if (body.includes("Disallow: /")) {
    pass('body contains "Disallow: /"');
  } else {
    fail('body contains "Disallow: /"', body.slice(0, 200).replace(/\n/g, "\\n"));
  }
}

async function auditSitemapXml() {
  console.log("\n  [/sitemap.xml]");

  const { status, body, error } = await fetchUrl("/sitemap.xml");

  if (error || body === null) {
    fail("HTTP fetch", error || "no response");
    return;
  }

  // HTTP 200
  if (status === 200) {
    pass("HTTP 200");
  } else {
    fail("HTTP 200", status);
  }

  // Contains rvce-bangalore
  if (body.includes("rvce-bangalore")) {
    pass("sitemap contains rvce-bangalore");
  } else {
    fail("sitemap contains rvce-bangalore");
  }

  // Contains christ-university-bangalore
  if (body.includes("christ-university-bangalore")) {
    pass("sitemap contains christ-university-bangalore");
  } else {
    fail("sitemap contains christ-university-bangalore");
  }

  // Contains bms-college-of-engineering (now active)
  if (body.includes("bms-college-of-engineering")) {
    pass("sitemap contains bms-college-of-engineering");
  } else {
    fail("sitemap contains bms-college-of-engineering");
  }

  // Contains msrit-bangalore (now active)
  if (body.includes("msrit-bangalore")) {
    pass("sitemap contains msrit-bangalore");
  } else {
    fail("sitemap contains msrit-bangalore");
  }

  // Contains pes-university-bangalore (now active)
  if (body.includes("pes-university-bangalore")) {
    pass("sitemap contains pes-university-bangalore");
  } else {
    fail("sitemap contains pes-university-bangalore");
  }
}

async function main() {
  const BAR = "═".repeat(62);
  console.log(`\n${BAR}`);
  console.log(`  🔍  CollegeAndFees Audit`);
  console.log(`  📡  ${BASE_URL}`);
  console.log(`${BAR}`);

  for (const route of HTML_ROUTES) {
    await auditHtmlRoute(route);
  }

  await auditRobotsTxt();
  await auditSitemapXml();

  console.log(`\n${BAR}`);
  console.log(`  📊  Summary: ${passCount} passed, ${failCount} failed`);

  if (failCount > 0) {
    console.log(`\n  ❌  Failed checks:`);
    for (const f of allFailures) {
      console.log(`     • ${f}`);
    }
    console.log(`\n${BAR}\n`);
    process.exit(1);
  } else {
    console.log(`\n  ✅  All checks passed!\n${BAR}\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
