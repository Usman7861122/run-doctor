/**
 * Blog posts live in src/data/blog/posts.json (one object per post).
 * Fields: slug, title, date (YYYY-MM-DD), category, excerpt, metaDescription,
 * image (optional, e.g. /wp-content/uploads/2023/05/x.jpg), service (optional
 * service slug for the "related treatment" link), html (post body).
 * An empty file keeps the blog hidden: nav links fall back to the home page.
 */
import raw from "./blog/posts.json";

export type Post = {
  slug: string;
  title: string;
  date?: string;
  order?: number;
  modified?: string;
  category?: string;
  excerpt?: string;
  metaDescription?: string;
  seoTitle?: string;
  image?: string;
  service?: string;
  html: string;
};

/** Remove scripts, inline styles and event handlers that WordPress exports can carry. */
const clean = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');

export const posts: Post[] = (raw as Post[])
  .filter((p) => p.slug && p.title && p.html)
  .map((p) => ({ ...p, html: clean(p.html) }))
  .sort((a, b) => (b.order ?? 0) - (a.order ?? 0) || (b.date ?? "").localeCompare(a.date ?? ""));

export const hasPosts = posts.length > 0;

export const plainText = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

/** Meta description, cut at a word boundary so it never ends mid-word. */
export const postDescription = (p: Post) => {
  const d = p.metaDescription || p.excerpt || plainText(p.html);
  if (d.length <= 158) return d;
  const cut = d.slice(0, 155);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "...";
};

/** Full teaser text for cards (not cut). */
export const postTeaser = (p: Post) => p.excerpt || p.metaDescription || plainText(p.html).slice(0, 200);

export const postTitle = (p: Post) => {
  const base = p.seoTitle || p.title;
  return base.length + 13 <= 60 ? `${base} | Run Doctor` : base;
};

export const fmtDate = (d?: string) =>
  !d ? "" :
  new Date(d + (d.length === 10 ? "T00:00:00" : "")).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
