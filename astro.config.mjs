// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Production address (used for canonical URLs and the sitemap).
// CHANGE to the real domain before launch, or build with SITE_URL=https://yourdomain.com
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
