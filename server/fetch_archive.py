#!/usr/bin/env python3
"""
Downloads the old rundoctor.com blog posts (and their images) from the Internet
Archive into ./_wb so they can be rebuilt on the new site.

Run from the project folder:   python3 server/fetch_archive.py
Safe to stop and run again: files already saved are skipped.
"""
import os, re, sys, time, urllib.request, urllib.error

TS = "20250815094955"          # snapshot date to prefer (the archive picks the nearest capture)
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "_wb")
os.makedirs(os.path.join(OUT, "pages"), exist_ok=True)
os.makedirs(os.path.join(OUT, "uploads"), exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (rundoctor migration script)"}

def get(url, tries=4):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(3 * (i + 1))
        except Exception:
            time.sleep(3 * (i + 1))
    return None

slugs = [s.strip() for s in open(os.path.join(HERE, "old-blog-slugs.txt")) if s.strip()]
img_re = re.compile(r'https?://(?:www\.)?rundoctor\.com/wp-content/uploads/[^"\'\s)>,]+\.(?:jpe?g|png|webp|gif)', re.I)
ok = missing = 0
for n, slug in enumerate(slugs, 1):
    dest = os.path.join(OUT, "pages", slug + ".html")
    if not os.path.exists(dest):
        data = get(f"https://web.archive.org/web/{TS}id_/https://www.rundoctor.com/blog/{slug}")
        if not data:
            print(f"[{n}/{len(slugs)}] MISSING {slug}"); missing += 1; time.sleep(1); continue
        open(dest, "wb").write(data)
        time.sleep(1.2)
    html = open(dest, encoding="utf-8", errors="ignore").read()
    print(f"[{n}/{len(slugs)}] ok {slug}"); ok += 1
    for url in sorted(set(img_re.findall(html))):
        path = re.sub(r"^https?://(?:www\.)?rundoctor\.com/wp-content/uploads/", "", url).split("?")[0]
        target = os.path.join(OUT, "uploads", path)
        if os.path.exists(target):
            continue
        img = get(f"https://web.archive.org/web/{TS}im_/{url}")
        if img:
            os.makedirs(os.path.dirname(target), exist_ok=True)
            open(target, "wb").write(img)
        time.sleep(0.6)
print(f"\nDone. pages saved: {ok}, not in archive: {missing}. Output folder: {OUT}")
