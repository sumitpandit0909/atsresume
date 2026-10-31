import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { copyFileSync } from "fs";

// Custom plugin to copy SEO files
const copySEOFiles = () => {
  return {
    name: 'copy-seo-files',
    writeBundle() {
      try {
        copyFileSync('public/sitemap.xml', 'dist/public/sitemap.xml');
        copyFileSync('public/robots.txt', 'dist/public/robots.txt');
        copyFileSync('public/ads.txt', 'dist/public/ads.txt');
        console.log('✅ SEO files copied to dist/public/');
      } catch (error) {
        console.warn('⚠️ Could not copy SEO files:', error);
      }
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copySEOFiles(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
