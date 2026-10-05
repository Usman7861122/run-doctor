/** Shared JSON-LD (schema.org) builders for SEO. */
import { practice, siteUrl } from "@/data/site";

const abs = (path: string) => new URL(path, siteUrl).href;

export const clinicSchema = {
  "@type": "MedicalClinic",
  "@id": `${siteUrl}/#clinic`,
  name: practice.name,
  alternateName: practice.shortName,
  url: abs("/"),
  telephone: "+1-425-899-3234",
  image: abs("/images/og-default.jpg"),
  logo: abs("/logos/rundoctor-logo-on-light.svg"),
  medicalSpecialty: ["Podiatric", "SportsMedicine"],
  address: {
    "@type": "PostalAddress",
    streetAddress: practice.address.line1,
    addressLocality: "Kirkland",
    addressRegion: "WA",
    postalCode: "98034",
    addressCountry: "US",
  },
  areaServed: [
    "Kirkland",
    "Totem Lake",
    "Bellevue",
    "Redmond",
    "Woodinville",
    "Bothell",
    "Seattle",
  ].map((name) => ({ "@type": "City", name })),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: abs("/"),
  name: practice.name,
  publisher: { "@id": `${siteUrl}/#clinic` },
  inLanguage: "en-US",
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const graph = (nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
