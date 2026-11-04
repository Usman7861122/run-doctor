// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Production address (used for canonical URLs, sitemap, robots.txt and schema).
// Override with SITE_URL=... only for test builds.
// @ts-ignore
const site = process.env.SITE_URL ?? "https://www.rundoctor.com";

// https://astro.build/config
export default defineConfig({
  site,
  // Clean URLs without a trailing slash: /services/heel-pain
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
