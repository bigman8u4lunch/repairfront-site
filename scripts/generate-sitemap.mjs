import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteBase = "https://www.repairfront.com";

/** Redirect stubs — canonical lives elsewhere; omit from sitemap. */
const EXCLUDE = new Set(["ecosystem.html", "features.html"]);

function listHtmlPages() {
  return fs
    .readdirSync(root)
    .filter((name) => name.endsWith(".html") && !EXCLUDE.has(name))
    .sort();
}

function toLoc(filename) {
  return filename === "index.html" ? `${siteBase}/` : `${siteBase}/${filename}`;
}

function lastModified(filename) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filename}"`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) return iso.slice(0, 10);
  } catch {
    /* fall through */
  }
  return new Date(fs.statSync(path.join(root, filename)).mtime).toISOString().slice(0, 10);
}

function buildSitemap(pages) {
  const urls = pages
    .map((filename) => {
      const loc = toLoc(filename);
      const lastmod = lastModified(filename);
      const priority = filename === "index.html" ? "1.0" : "0.7";
      const changefreq = filename === "index.html" || filename === "pricing.html" ? "weekly" : "monthly";
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${siteBase}/sitemap.xml
`;
}

const pages = listHtmlPages();
const sitemapPath = path.join(root, "sitemap.xml");
const robotsPath = path.join(root, "robots.txt");

fs.writeFileSync(sitemapPath, buildSitemap(pages));
fs.writeFileSync(robotsPath, buildRobots());

console.log(`Wrote ${pages.length} URLs to sitemap.xml and robots.txt`);
