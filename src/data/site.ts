/**
 * All homepage content lives here, so text can be edited without touching layout.
 * Images are placeholders (Unsplash). If an image fails to load, the site shows
 * /images/placeholder.svg instead. Swap in real practice photos later.
 *
 * Items marked PLACEHOLDER need real info from the practice.
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const practice = {
  name: "Washington Foot & Ankle Sports Medicine",
  shortName: "Run Doctor",
  tagline: "Podiatry & Sports Medicine Physicians in Kirkland, WA",
  phone: "425-899-3234",
  phoneHref: "tel:+14258993234",
  address: {
    line1: "12911 120th Ave. NE, Suite C-50",
    line2: "Kirkland, WA 98034",
    mapsQuery: "12911 120th Ave NE Suite C-50, Kirkland, WA 98034",
  },
  // PLACEHOLDER hours, confirm with the office
  hours: [
    { days: "Monday to Thursday", time: "8:00 AM to 5:00 PM" },
    { days: "Friday", time: "8:00 AM to 12:00 PM" },
    { days: "Saturday & Sunday", time: "Closed" },
  ],
  rating: { score: "4.94", count: "510" },
  photographySite: "https://www.maurerphoto.com",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Conditions", href: "#conditions" },
  { label: "Treatments", href: "#treatments" },
  { label: "Physicians", href: "#physicians" },
  { label: "Insurance", href: "#insurance" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const images = {
  hero: u("1476480862126-209bfaa8edc8", 2000),
  about: u("1552674605-db6ffd4facb5", 1200),
  aboutSmall: u("1579684385127-1ef15d508118", 800),
  physiciansBg: u("1461896836934-ffe607ba8211", 2000),
  maurerWork: u("1431324155629-1a6deb1dec8d", 1400),
  oofos: u("1600185365483-26d7a4cc7519", 1200),
};

export const aboutPoints = [
  {
    title: "Biomechanical exams",
    text: "We look at how your whole body moves, not just where it hurts.",
  },
  {
    title: "Gait analysis",
    text: "Video and in-person analysis to find the root cause of pain.",
  },
  {
    title: "Conservative first",
    text: "Surgery only when it is truly the best option for you.",
  },
];

export const stats = [
  { value: "4.94", label: "Average rating" },
  { value: "510+", label: "Patient reviews" },
  { value: "2", label: "Foot & ankle physicians" },
];

// PLACEHOLDER staff names and roles
export const staff = [
  {
    name: "Jessica",
    role: "Practice Manager",
    img: u("1573496359142-b8d87734a5a2", 700),
  },
  {
    name: "Maria",
    role: "Medical Assistant",
    img: u("1594824476967-48c8b964273f", 700),
  },
  {
    name: "Emily",
    role: "Patient Coordinator",
    img: u("1438761681033-6461ffad8d80", 700),
  },
  {
    name: "Daniel",
    role: "Orthotics Technician",
    img: u("1500648767791-00dcc994a43e", 700),
  },
];

export type FlipItem = {
  title: string;
  excerpt: string;
  href: string;
  img: string;
};

export const conditions: FlipItem[] = [
  {
    title: "Heel Pain",
    excerpt:
      "Sharp or aching pain under the heel can stop you in your tracks. We find the cause and build a plan to get you moving again.",
    href: "#",
    img: u("1571008887538-b36bb32f4571", 800),
  },
  {
    title: "Plantar Fasciitis",
    excerpt:
      "The most common cause of morning heel pain. Most patients get relief with stretching, orthotics and targeted care.",
    href: "#",
    img: u("1434596922112-19c563067271", 800),
  },
  {
    title: "Achilles Tendonitis",
    excerpt:
      "Overuse pain along the back of the ankle, common in runners. Early care helps prevent a long layoff or a rupture.",
    href: "#",
    img: u("1486218119243-13883505764c", 800),
  },
  {
    title: "Bunions",
    excerpt:
      "A bony bump at the base of the big toe. We offer both conservative options and modern surgical correction.",
    href: "#",
    img: u("1460353581641-37baddab0fa2", 800),
  },
];

export const treatments: FlipItem[] = [
  {
    title: "Custom Orthotics",
    excerpt:
      "Inserts made from a scan of your feet to correct alignment, ease pain and support your sport or daily routine.",
    href: "#",
    img: u("1542291026-7eec264c27ff", 800),
  },
  {
    title: "Sports Medicine",
    excerpt:
      "Care for athletes of every level, from weekend runners to pros, with a focus on safe and fast return to play.",
    href: "#",
    img: u("1517649763962-0c623066013b", 800),
  },
  {
    title: "Gait & Biomechanics",
    excerpt:
      "A detailed look at how you walk and run, so we can treat the root cause and prevent the next injury.",
    href: "#",
    img: u("1544367567-0f2fcb009e0b", 800),
  },
  {
    title: "Foot & Ankle Surgery",
    excerpt:
      "When surgery is needed, our surgeons use proven techniques with a clear plan for your recovery.",
    href: "#",
    img: u("1576091160399-112ba8d25d1d", 800),
  },
];

export const physicians = [
  {
    name: "Lawrence Maurer, DPM",
    title: "Foot and Ankle Surgeon",
    img: "/images/dr-maurer.webp",
    bio: "Dr. Maurer trained at Barry University and completed his surgical residency in Kentucky. He is an avid runner, skier and mountain biker, and he lectures for the Northwest Podiatric Foundation.",
    tags: ["Sports medicine", "Biomechanics", "Surgery"],
  },
  {
    name: "Kate Cryderman, DPM",
    title: "Podiatric Physician & Surgeon",
    img: "/images/dr-cryderman-circle.webp",
    bio: "A Kirkland native and former college athlete, Dr. Cryderman trained at Samuel Merritt University and served as Chief Resident at Rochester General Hospital. She loves helping patients of every age stay active.",
    tags: ["Sports medicine", "Biomechanics", "All ages"],
  },
];

export const maurerWork = [
  {
    label: "NFL Photographer",
    text: "Sideline photographer for the Seattle Seahawks and wireimage.com.",
  },
  {
    label: "Seattle Sounders",
    text: "Capturing the speed and emotion of Major League Soccer.",
  },
  {
    label: "Lecturer",
    text: "Teaches fellow doctors through the Northwest Podiatric Foundation.",
  },
  {
    label: "Published Research",
    text: "Research published in leading podiatric journals.",
  },
];

export const gallery = [
  {
    img: "/images/match-day.webp",
    title: "Match Day",
    tag: "Sports",
  },
  {
    img: u("1470071459604-3b5ec3a7fe05", 900),
    title: "Cascade Mist",
    tag: "Landscape",
  },
  {
    img: u("1517649763962-0c623066013b", 900),
    title: "The Peloton",
    tag: "Sports",
  },
  {
    img: u("1506905925346-21bda4d32df4", 900),
    title: "Above the Clouds",
    tag: "Landscape",
  },
  {
    img: u("1431324155629-1a6deb1dec8d", 900),
    title: "Under the Lights",
    tag: "Stadium",
  },
  {
    img: u("1501785888041-af3ef285b470", 900),
    title: "Still Water",
    tag: "Landscape",
  },
];

export const insurances = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "EBMS",
  "First Choice Health",
  "LifeWise",
  "Meritain Health",
  "Premera",
  "Providence",
  "Regence",
  "UMR",
  "Uniform Medical Plan",
  "Kaiser (Access PPO only)",
  "United Healthcare (Commercial)",
];

export const blog = [
  {
    title:
      "Don't Ignore That Ankle Sprain: How to Prevent Chronic Pain and Instability",
    excerpt:
      "A simple sprain can turn into a long term problem. Here is how to heal it right the first time.",
    category: "Injury Care",
    img: u("1571019613454-1cb2f99b2d8b", 900),
    href: "#",
  },
  {
    title:
      "Getting Ready For School Sports: Understanding Your Options with Sports Medicine",
    excerpt:
      "Help young athletes start the season strong and avoid the most common foot injuries.",
    category: "Sports Medicine",
    img: "/images/sports-medicine.webp",
    href: "#",
  },
  {
    title: "Why Do My Heels Hurt in The Morning?",
    excerpt:
      "Those painful first steps have a common cause. Learn what it is and how we treat it.",
    category: "Heel Pain",
    img: u("1434596922112-19c563067271", 900),
    href: "#",
  },
];

export const testimonials = [
  {
    quote:
      "I send everyone I know to Dr. Maurer. He is knowledgeable and great to work with.",
    name: "Robert G.",
    source: "Google",
  },
  {
    quote: "I would recommend it if you are tired of all the pain!",
    name: "Ada W.",
    source: "Google",
  },
  {
    quote: "I have been coming here for years and I could not be happier.",
    name: "Angela M.",
    source: "Google",
  },
  {
    quote:
      "The docs and staff are great! I'm extremely pleased with the care I have been given.",
    name: "Dawn N.",
    source: "Google",
  },
  {
    quote:
      "Amazing doctors and staff! Hope I won't be back but will not go anywhere else!",
    name: "Michael J.",
    source: "Google",
  },
];

/** Dr. Kate Cryderman welcome section (from the practice announcement). */
export const cryderman = {
  name: "Dr. Kate Cryderman",
  credentials: "DPM",
  portrait: "/images/dr-cryderman.webp",
  intro:
    "Dr. Kate Cryderman is excited to return home to the Eastside and serve the community where she was born and raised.",
  story:
    "A Kirkland native and graduate of Juanita High School, she developed a lifelong passion for sports while competing in basketball and track. Later, working as a medical assistant at our practice and coaching young athletes strengthened her passion for keeping athletes healthy and inspired her to pursue podiatric medicine.",
  focus:
    "With a special interest in sports medicine and biomechanics, Dr. Cryderman cares for patients of all ages and activity levels. Whether you're a young athlete playing your first sport, a competitive high school or collegiate athlete, a weekend warrior, or simply someone who wants to stay active, she builds personalized treatment plans that help you move comfortably and return to doing what you love.",
  journey: [
    {
      place: "Juanita High School",
      detail: "Kirkland native. Competed in basketball and track.",
    },
    {
      place: "Northwest Nazarene University",
      detail:
        "Bachelor's degree in Biology while competing in basketball and track.",
    },
    {
      place: "Washington Foot & Ankle Sports Medicine",
      detail:
        "Worked here as a medical assistant, coached track at Juanita and college basketball in Idaho.",
    },
    {
      place: "Samuel Merritt University",
      detail: "Doctor of Podiatric Medicine, 2023.",
    },
    {
      place: "Rochester General Hospital",
      detail:
        "Comprehensive surgical residency in Rochester, New York. Chief Resident in her final year.",
    },
  ],
  offDuty:
    "You'll often find her kayaking on local lakes, walking her seven-year-old French Bulldog, Harley, or spending time with her family across the Seattle area.",
};

/** Notice for patients of Dr. Vincent, who has left the practice. */
export const vincentNotice = {
  title: "A note for Dr. Vincent's patients",
  text: "Dr. Peter Vincent has departed from our practice. Your care remains our top priority and there will be no interruption in service. Dr. Maurer and Dr. Cryderman are both accepting appointments. If you would like to continue with Dr. Vincent, call us and we will share his new contact information as soon as it becomes available.",
};
