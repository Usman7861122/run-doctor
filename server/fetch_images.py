#!/usr/bin/env python3
"""
Downloads the images used by the old blog posts (saved in ./_wb/pages) into
public/blog-images. Tries the Internet Archive first, then the original address.
Safe to stop and run again.   Run from the project folder:  python3 server/fetch_images.py
"""
import os, re, time, glob, urllib.request, urllib.error

TS = "20250815094955"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "blog-images")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (rundoctor migration script)"}

def get(url):
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                data = r.read()
                if data[:4] in (b"\xff\xd8\xff\xe0", b"\xff\xd8\xff\xe1", b"\xff\xd8\xff\xdb", b"\x89PNG", b"RIFF") or data[:3] == b"\xff\xd8\xff":
                    return data
                return None
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(2 * (i + 1))
        except Exception:
            time.sleep(2 * (i + 1))
    return None

urls = set()
for f in glob.glob(os.path.join(ROOT, "_wb", "pages", "*.html")):
    html = open(f, encoding="utf-8", errors="ignore").read()
    i = html.find('<section class="blog-post">')
    if i < 0:
        continue
    j = html.find("</section>", i)
    chunk = html[i:j]
    urls.update(re.findall(r'https?://[^"\'\s]*patientpop\.com/[^"\'\s]+\.(?:jpe?g|png|webp)', chunk, re.I))
print(len(urls), "images to fetch")
got = fail = 0
for n, url in enumerate(sorted(urls), 1):
    name = url.rsplit("/", 1)[1]
    target = os.path.join(OUT, name)
    if os.path.exists(target) and os.path.getsize(target) > 1000:
        got += 1; continue
    data = get(f"https://web.archive.org/web/{TS}im_/{url}") or get(url)
    if data:
        open(target, "wb").write(data); got += 1
        print(f"[{n}/{len(urls)}] ok {name}")
    else:
        fail += 1
        print(f"[{n}/{len(urls)}] MISSING {url}")
    time.sleep(0.8)
print(f"\nDone. images saved: {got}, missing: {fail}. Folder: {OUT}")
