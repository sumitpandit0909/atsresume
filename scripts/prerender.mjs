// Writes real HTML for every route after the client build, so pages have content before JavaScript runs.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

const root = process.cwd();
const outDir = path.join(root, "dist", "public");
const ssrDir = path.join(root, ".ssr-build");
const SITE = "https://www.atsscorecheckerfree.com";

const { render, routes } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = readFileSync(path.join(outDir, "index.html"), "utf-8");

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setAttr(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`Template is missing ${pattern}`);
  return html.replace(pattern, (_, start, end) => `${start}${escapeAttr(value)}${end}`);
}

function buildPage(route, { html, meta }) {
  let page = template.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
  if (page === template) throw new Error("Template is missing the root element");

  if (route !== "/") {
    page = page.replace(/<!-- home-structured-data -->[\s\S]*?<!-- \/home-structured-data -->/, "");
  }

  if (meta) {
    const title = meta.title;
    const description = meta.description;
    page = page.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeAttr(title)}</title>`);
    page = setAttr(page, /(<meta name="description" content=")[^"]*(")/, description);
    if (meta.keywords) page = setAttr(page, /(<meta name="keywords" content=")[^"]*(")/, meta.keywords);
    page = setAttr(page, /(<meta property="og:title" content=")[^"]*(")/, title);
    page = setAttr(page, /(<meta property="og:description" content=")[^"]*(")/, description);
    page = setAttr(page, /(<meta property="twitter:title" content=")[^"]*(")/, title);
    page = setAttr(page, /(<meta property="twitter:description" content=")[^"]*(")/, description);
    page = setAttr(page, /(<link rel="canonical" href=")[^"]*(")/, meta.canonicalUrl ?? `${SITE}${route}`);
    if (meta.structuredData) {
      const json = JSON.stringify(meta.structuredData).replace(/</g, "\\u003c");
      page = page.replace("</head>", () => `<script type="application/ld+json" data-page-ld>${json}</script></head>`);
    }
  }
  return page;
}

const sitemap = readFileSync(path.join(root, "public", "sitemap.xml"), "utf-8");
for (const route of routes) {
  const rendered = render(route);
  if (!rendered.html.includes("<")) throw new Error(`Empty render for ${route}`);
  if (route !== "/" && !rendered.meta) throw new Error(`No MetaTags on ${route}`);
  if (!sitemap.includes(`<loc>${SITE}${route}</loc>`)) throw new Error(`${route} is missing from public/sitemap.xml`);

  const dir = path.join(outDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), buildPage(route, rendered));
}

// Unknown URLs get a real 404 page that search engines will not index.
let notFound = buildPage("/404", render("/404"))
  .replace(/<link rel="canonical"[^>]*>\s*/, "")
  .replace("</head>", '<meta name="robots" content="noindex"></head>')
  .replace(/<title>[\s\S]*?<\/title>/, "<title>Page Not Found – ATS Score Checker Free</title>");
writeFileSync(path.join(outDir, "404.html"), notFound);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages and 404.html`);
