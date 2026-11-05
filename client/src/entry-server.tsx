import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { ssrMeta } from "@/components/meta-tags";
import { articles } from "@/content/articles";

export const routes = [
  "/",
  "/blog",
  ...articles.map((article) => `/blog/${article.slug}`),
  "/features",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-conditions",
  "/disclaimer",
  "/dmca",
];

export function render(path: string) {
  ssrMeta.current = null;
  const html = renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );
  return { html, meta: ssrMeta.current };
}
