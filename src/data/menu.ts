/**
 * Main menu, based on the rundoctor.com menu.
 * Page URLs follow the old site's slugs (/services/heel-pain etc.) so old
 * Google links keep working once those pages are built.
 */

export type MenuLink = {
  label: string;
  href: string;
  note?: string;
  external?: boolean;
};

export type MegaMenu = {
  kind: "mega";
  label: string;
  href: string;
  columns: { title: string; links: MenuLink[] }[];
  feature: {
    eyebrow: string;
    title: string;
    text: string;
    img: string;
    cta: MenuLink;
  };
};

export type DropMenu = {
  kind: "drop";
  label: string;
  href: string;
  links: MenuLink[];
  aside?: { title: string; text: string; cta: MenuLink };
};

export type PlainLink = { kind: "link"; label: string; href: string };

export type MenuItem = MegaMenu | DropMenu | PlainLink;

export const menu: MenuItem[] = [
  {
    kind: "drop",
    label: "About",
    href: "/about",
    links: [
      {
        label: "About Our Practice",
        href: "/about",
        note: "Our story and approach to care",
      },
      {
        label: "Providers",
        href: "/provider",
        note: "Dr. Maurer and Dr. Vincent",
      },
      {
        label: "Testimonials",
        href: "/testimonials",
        note: "4.94 stars from 510+ reviews",
      },
      {
        label: "Dr. Maurer Photos",
        href: "https://maurerphoto.com/",
        note: "NFL, MLS and landscape work",
        external: true,
      },
    ],
    aside: {
      title: "New patient?",
      text: "Most visits start with a full biomechanical exam and gait analysis.",
      cta: { label: "Book a visit", href: "/#contact" },
    },
  },
  {
    kind: "mega",
    label: "Services",
    href: "/services",
    columns: [
      {
        title: "Heel & Arch",
        links: [
          { label: "Heel Pain", href: "/services/heel-pain" },
          { label: "Plantar Fasciitis", href: "/services/plantar-fasciitis" },
          { label: "Heel Spurs", href: "/services/heel-spurs" },
          {
            label: "Achilles Tendonitis",
            href: "/services/achilles-tendonitis",
          },
          { label: "Flat Feet", href: "/services/flat-feet" },
        ],
      },
      {
        title: "Toes & Forefoot",
        links: [
          { label: "Bunions", href: "/services/bunions" },
          { label: "Hammer Toe", href: "/services/hammer-toe" },
          { label: "Neuroma", href: "/services/neuroma" },
          { label: "Ingrown Toenail", href: "/services/ingrown-toenail" },
          { label: "Athlete's Foot", href: "/services/athletes-foot" },
        ],
      },
      {
        title: "Sports & Treatment",
        links: [
          { label: "Sports Medicine", href: "/services/sports-medicine" },
          { label: "Orthotics", href: "/services/orthotics" },
          { label: "Biomechanics", href: "/services/biomechanics" },
          { label: "Shin Splints", href: "/services/shin-splints" },
          { label: "Trauma", href: "/services/trauma" },
        ],
      },
      {
        title: "Specialized Care",
        links: [
          { label: "Low Back Pain", href: "/services/low-back-pain" },
          {
            label: "Arthritic Foot & Ankle Care",
            href: "/services/arthritic-foot-ankle-care",
          },
          { label: "Pediatric Podiatry", href: "/services/pediatric-podiatry" },
        ],
      },
    ],
    feature: {
      eyebrow: "Not sure what's wrong?",
      title: "Start with a gait analysis",
      text: "We find the cause of your pain, not just the symptom.",
      img: "/images/sports-medicine.webp",
      cta: { label: "View all services", href: "/services" },
    },
  },
  {
    kind: "drop",
    label: "Patients",
    href: "/contents/patient-forms",
    links: [
      {
        label: "Patient Forms",
        href: "/contents/patient-forms",
        note: "Fill out before your visit",
      },
      {
        label: "Educational Videos",
        href: "/contents/educational-videos",
        note: "Learn about your condition",
      },
      { label: "Insurance", href: "/#insurance", note: "Plans we accept" },
      {
        label: "Pay Bill",
        href: "https://wfasm.ema.md/ema/pay/onlinepay#/pm/payfac/pay",
        note: "Secure online payment",
        external: true,
      },
    ],
  },
  { kind: "link", label: "Blog", href: "/#blog" },
  { kind: "link", label: "Contact", href: "/#contact" },
];
