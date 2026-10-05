import type { APIRoute } from "astro";
import { services } from "@/data/services";
import { lastUpdated } from "@/data/site";

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://www.rundoctor.com");
  const pages = [
    { path: "/", priority: "1.0" },
    { path: "/services", priority: "0.9" },
    { path: "/about", priority: "0.7" },
    { path: "/provider", priority: "0.7" },
    { path: "/testimonials", priority: "0.6" },
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      // Kids pages are the featured focus, so they get a slight boost
      priority: s.category === "Kids & Teens" ? "0.9" : "0.8",
    })),
  ];
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${new URL(p.path, base).href}</loc>\n    <lastmod>${lastUpdated}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
