#!/usr/bin/env python3
"""Builds src/data/blog/posts.json from the saved archive pages in _wb/pages."""
import glob, json, os, re, sys
from bs4 import BeautifulSoup, NavigableString

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KLARA = "https://l.klara.com/RMc47XV4DhKeJncQ"
SERVICES = {os.path.basename(p)[:-5] for p in []}
for f in glob.glob(os.path.join(ROOT, "src/data/services/*.json")):
    d = json.load(open(f)); L = d if isinstance(d, list) else d.get("services", d)
    SERVICES |= {s["slug"] for s in L}
SLUGS = {os.path.basename(f)[:-5] for f in glob.glob(os.path.join(ROOT, "_wb/pages/*.html"))}
ALIAS = {"pediatric-care": "pediatric-podiatry", "pediatric-podiatrist": "pediatric-podiatry", "ingrown-toenails": "ingrown-toenail", "hammertoe": "hammer-toe"}
SIMPLE = {"/services", "/provider", "/about", "/testimonials", "/"}
unmatched = []

# keyword -> (service slug, category), checked in order against title + slug
RULES = [
 ("plantar wart", "pediatric-podiatry", "Kids' Foot Care"), ("flat feet in children", "childrens-flat-feet", "Kids' Foot Care"),
 ("child", "pediatric-podiatry", "Kids' Foot Care"), ("kid", "pediatric-podiatry", "Kids' Foot Care"), ("pediatric", "pediatric-podiatry", "Kids' Foot Care"),
 ("arthrit", "arthritic-foot-ankle-care", "Foot Conditions"), ("neuropathy", "arthritic-foot-ankle-care", "Foot Conditions"), ("diabet", "arthritic-foot-ankle-care", "Foot Conditions"),
 ("plantar", "plantar-fasciitis", "Heel Pain"), ("heel spur", "heel-spurs", "Heel Pain"), ("night splint", "heel-spurs", "Heel Pain"),
 ("heel", "heel-pain", "Heel Pain"), ("ingrown", "ingrown-toenail", "Toenail Care"), ("bunion", "bunions", "Bunions"),
 ("hammertoe", "hammer-toe", "Toe Problems"), ("hammer toe", "hammer-toe", "Toe Problems"), ("athlete\u2019s foot", "athletes-foot", "Skin and Nails"), ("athlete", "athletes-foot", "Skin and Nails"),
 ("shin splint", "shin-splints", "Running and Sports"), ("achilles", "achilles-tendonitis", "Running and Sports"),
 ("flat feet", "flat-feet", "Foot Conditions"), ("orthotic", "orthotics", "Orthotics"), ("gait", "biomechanics", "Biomechanics"), ("biomechanic", "biomechanics", "Biomechanics"),
 ("back pain", "low-back-pain", "Back Pain"), ("posture", "orthotics", "Back Pain"),
 ("running", "sports-medicine", "Running and Sports"), ("runner", "sports-medicine", "Running and Sports"), ("treadmill", "sports-medicine", "Running and Sports"),
 ("overtrain", "sports-medicine", "Running and Sports"), ("play", "sports-medicine", "Running and Sports"), ("stay active", "sports-medicine", "Running and Sports"),
 ("shoe", "sports-medicine", "Footwear"), ("footwear", "sports-medicine", "Footwear"), ("sport", "sports-medicine", "Running and Sports"),
 ("sprain", "trauma", "Ankle Care"), ("fracture", "trauma", "Ankle Care"), ("broken", "trauma", "Ankle Care"), ("ankle", "trauma", "Ankle Care"),
 ("arch", "flat-feet", "Foot Conditions"),
]

def classify(title, slug):
    t = (title + " " + slug.replace("-", " ")).lower()
    for kw, svc, cat in RULES:
        if kw in t:
            return (svc if svc in SERVICES else None), cat
    return None, "Foot Care"

def fix_href(href, slug):
    h = href.strip()
    m = re.match(r"https?://(?:www\.)?rundoctor\.com(/[^?#]*)?", h, re.I)
    if not m:
        return h
    path = (m.group(1) or "/").rstrip("/") or "/"
    if path in SIMPLE: return path
    path = re.sub(r"^/contents/services/", "/services/", path)
    mm = re.match(r"/services/([^/]+)$", path)
    if mm:
        s = ALIAS.get(mm.group(1), mm.group(1))
        if s in SERVICES: return f"/services/{s}"
        unmatched.append((slug, h)); return "/services"
    mm = re.match(r"/blog/([^/]+)$", path)
    if mm:
        return f"/blog/{mm.group(1)}" if mm.group(1) in SLUGS else "/blog"
    if path in ("/schedule", "/contactus", "/contact"): return KLARA
    unmatched.append((slug, h)); return "/services" if path.startswith("/service") else KLARA if "appoint" in path or "contact" in path else "/"

def clean_text(s):
    return s.replace("—", ", ").replace(" – ", ", ").replace(" ", " ")

posts = []
for f in sorted(glob.glob(os.path.join(ROOT, "_wb/pages/*.html"))):
    slug = os.path.basename(f)[:-5]
    b = BeautifulSoup(open(f, encoding="utf-8", errors="ignore").read(), "lxml")
    sec = b.select_one("section.blog-post")
    if not sec: print("skip", slug); continue
    title = re.split(r":\s*Washington Foot", b.title.get_text())[0].strip() if b.title else slug
    md = b.find("meta", attrs={"name": "description"})
    desc = clean_text((md.get("content") if md else "") or "").strip()
    hero = sec.select_one(".blog-img img")
    image = ""; order = 0
    if hero and hero.get("src"):
        name = hero["src"].rsplit("/", 1)[1]
        if os.path.exists(os.path.join(ROOT, "public/blog-images", name)): image = "/blog-images/" + name
        m = re.match(r"(\d+)", name); order = int(m.group(1)) if m else 0
    for e in sec.select(".blog-img"): e.decompose()
    for t in sec.find_all(["script", "style", "iframe", "form"]): t.decompose()
    for t in sec.find_all("span"): t.unwrap()
    for t in sec.find_all(True):
        for a in list(t.attrs):
            if a not in ("href", "src", "alt", "target", "rel"): del t.attrs[a]
    for a in sec.find_all("a"):
        if a.get("href"):
            a["href"] = fix_href(a["href"], slug)
            if a["href"].startswith("http"): a["target"] = "_blank"; a["rel"] = "noopener"
    for im in sec.find_all("img"):
        src = im.get("src", "")
        name = src.rsplit("/", 1)[-1]
        if os.path.exists(os.path.join(ROOT, "public/blog-images", name)): im["src"] = "/blog-images/" + name
        else: im.decompose()
    for p in sec.find_all("p"):
        if not p.get_text(strip=True) and not p.find("img"): p.decompose()
    html = clean_text("".join(str(c) for c in sec.children)).strip()
    html = re.sub(r"\s*\n\s*", "\n", html)
    svc, cat = classify(title, slug)
    posts.append({"slug": slug, "title": clean_text(title), "category": cat, **({"service": svc} if svc else {}),
                  "metaDescription": desc, "excerpt": desc, "image": image, "order": order,
                  "modified": "2026-11-16", "html": html})
posts.sort(key=lambda p: -p["order"])
json.dump(posts, open(os.path.join(ROOT, "src/data/blog/posts.json"), "w"), ensure_ascii=False, indent=1)
print(len(posts), "posts written;", sum(1 for p in posts if not p["image"]), "without image;", sum(1 for p in posts if "service" not in p), "without service link")
from collections import Counter
print(Counter(p["category"] for p in posts))
print("unmatched links:", unmatched[:20], len(unmatched))
print("avg words:", sum(len(re.sub('<[^>]+>',' ',p['html']).split()) for p in posts)//len(posts))
