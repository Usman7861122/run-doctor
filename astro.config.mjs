// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // site: "https://your-domain.com", // set this before going live (sitemap, SEO)
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
