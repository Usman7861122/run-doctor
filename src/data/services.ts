/**
 * Service pages. Content lives in src/data/services/*.json (one file per
 * category). Edit the JSON to change page text, titles or SEO fields.
 * Photos are mapped in `photoFor` below.
 */
import kids from "./services/kids.json";
import heel from "./services/heel.json";
import toes from "./services/toes.json";
import sports from "./services/sports.json";

export type Service = {
  slug: string;
  title: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  summary: string;
  quickFacts: { label: string; value: string }[];
  overview: string[];
  symptoms: string[];
  causes: { title: string; text: string }[];
  diagnosis: string;
  treatments: { title: string; text: string }[];
  whenToSeeUs: string[];
  prevention: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  imageAlt: string;
};

export const services: Service[] = [
  ...kids,
  ...heel,
  ...toes,
  ...sports,
] as Service[];

export const categories = [
  {
    title: "Kids & Teens",
    featured: true,
    blurb:
      "Gentle, expert foot and ankle care for children and teens, from first steps to varsity seasons.",
  },
  {
    title: "Heel & Arch",
    featured: false,
    blurb: "Heel pain, plantar fasciitis, Achilles problems and flat feet.",
  },
  {
    title: "Toes & Forefoot",
    featured: false,
    blurb: "Bunions, hammer toes, neuromas, nail and skin problems.",
  },
  {
    title: "Sports & Treatment",
    featured: false,
    blurb: "Sports medicine, custom orthotics, gait analysis and injury care.",
  },
  {
    title: "Specialized Care",
    featured: false,
    blurb: "Whole-body links and long-term joint care for feet and ankles.",
  },
];

export const servicesIn = (category: string) =>
  services.filter((s) => s.category === category);

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

/** Photo for each service page (files live in public/images/services/). */
const photoFor: Record<string, string> = {};
export const photoOf = (slug: string) =>
  `/images/services/${photoFor[slug] ?? slug}.webp`;
export const ogOf = (slug: string) =>
  `/images/services/og/${photoFor[slug] ?? slug}.jpg`;
export { photoFor };
export const thumbOf = (slug: string) =>
  `/images/services/thumb/${photoFor[slug] ?? slug}.webp`;
