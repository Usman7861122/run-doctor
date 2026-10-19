/**
 * Main menu, based on the rundoctor.com menu.
 * Page URLs follow the old site's slugs (/services/heel-pain etc.) so old
 * Google links keep working once those pages are built.
 */

export type MenuLink = {
  label: string;
  href: string;
  note?: string;
  /** Icon name from components/ui/Icon.astro (used in the Services flyouts) */
  icon?: string;
  external?: boolean;
};

export type DropMenu = {
  kind: "drop";
  label: string;
  href: string;
  /** Simple list of links */
  links: MenuLink[];
  /** Or grouped links under small headings (used by Services) */
  groups?: {
    title: string;
    blurb?: string;
    icon?: string;
    featured?: boolean;
    links: MenuLink[];
  }[];
  /** Link shown at the bottom of a grouped drop-down */
  footer?: MenuLink;
  aside?: { title: string; text: string; cta: MenuLink };
};

export type PlainLink = { kind: "link"; label: string; href: string };

export type MenuItem = DropMenu | PlainLink;

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
        note: "Dr. Maurer and Dr. Cryderman",
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
    kind: "drop",
    label: "Services",
    href: "/services",
    links: [],
    groups: [
      {
        title: "Kids & Teens",
        blurb: "Gentle care from first steps to varsity seasons",
        icon: "heart",
        featured: true,
        links: [
          { label: "Pediatric Podiatry", href: "/services/pediatric-podiatry", icon: "heart", note: "Foot care from first steps to teens" },
          { label: "Shin Splints", href: "/services/shin-splints", icon: "zap", note: "Shin pain from running and sport" },
          { label: "In-Toeing & Out-Toeing", href: "/services/in-toeing-out-toeing", icon: "footprints", note: "Pigeon-toed feet that turn in or out" },
          { label: "Growing Heels (Sever's)", href: "/services/severs-disease", icon: "pin", note: "Heel pain in active, growing kids" },
          { label: "Other Growing Pains", href: "/services/growing-pains", icon: "trending-up", note: "Leg and foot aches, often at night" },
          { label: "Knee, Hip & Back Pain", href: "/services/kids-knee-hip-back-pain", icon: "activity", note: "Activity-related pain in young athletes" },
          { label: "Flat Feet in Kids", href: "/services/childrens-flat-feet", icon: "footprints", note: "Low arches and when to check them" },
          { label: "Toe Walking", href: "/services/toe-walking", icon: "footprints", note: "Walking on tiptoes" },
          { label: "Youth Sports Injuries", href: "/services/youth-sports-injuries", icon: "shield", note: "Sprains, overuse and growth issues" },
        ],
      },
      {
        title: "Heel & Arch",
        blurb: "Heel pain, arch pain and tendon problems",
        icon: "pin",
        links: [
          { label: "Heel Pain", href: "/services/heel-pain", note: "Find the real source of the pain" },
          { label: "Plantar Fasciitis", href: "/services/plantar-fasciitis", note: "Sharp pain with first steps" },
          { label: "Heel Spurs", href: "/services/heel-spurs", note: "A bony growth on the heel" },
          { label: "Achilles Tendonitis", href: "/services/achilles-tendonitis", note: "Pain at the back of the heel" },
          { label: "Flat Feet", href: "/services/flat-feet", note: "Low arches and arch pain" },
        ],
      },
      {
        title: "Toes & Forefoot",
        blurb: "Toe, nail and ball-of-foot problems",
        icon: "footprints",
        links: [
          { label: "Bunions", href: "/services/bunions", note: "A bump at the base of the big toe" },
          { label: "Hammer Toe", href: "/services/hammer-toe", note: "A toe that bends or curls" },
          { label: "Neuroma", href: "/services/neuroma", note: "Burning pain between the toes" },
          { label: "Ingrown Toenail", href: "/services/ingrown-toenail", note: "A nail growing into the skin" },
          { label: "Athlete's Foot", href: "/services/athletes-foot", note: "Itchy, peeling skin on the feet" },
        ],
      },
      {
        title: "Sports & Treatment",
        blurb: "Care for athletes and active people",
        icon: "activity",
        links: [
          { label: "Sports Medicine", href: "/services/sports-medicine", note: "Treat and prevent sports injuries" },
          { label: "Orthotics", href: "/services/orthotics", note: "Custom inserts made for your feet" },
          { label: "Biomechanics", href: "/services/biomechanics", note: "How your body moves, step by step" },
          { label: "Shin Splints", href: "/services/shin-splints", note: "Shin pain from running" },
          { label: "Trauma", href: "/services/trauma", note: "Sprains, breaks and sudden injuries" },
        ],
      },
      {
        title: "Specialized Care",
        blurb: "Pain linked to joints and the back",
        icon: "shield",
        links: [
          { label: "Low Back Pain", href: "/services/low-back-pain", note: "When feet and posture add to back pain" },
          { label: "Arthritic Foot & Ankle Care", href: "/services/arthritic-foot-ankle-care", note: "Comfort for stiff, sore joints" },
        ],
      },
    ],
    footer: { label: "View all services", href: "/services" },
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
