# Run Doctor — website

Stack: **Astro** (pages & layout) · **React** (only for interactive parts) · **Tailwind CSS v4** · **Framer Motion** (animations)

## Getting started

```bash
npm install      # first time only
npm run dev      # open http://localhost:4321
```

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the local dev server      |
| `npm run build`   | Type-check and build to `dist/` |
| `npm run preview` | Preview the built site locally  |
| `npm run format`  | Format all files with Prettier  |

## Folder structure

```
src/
  pages/            → each file = one page/URL (index.astro = "/")
  layouts/          → shared page shell (<head>, fonts, etc.)
  components/       → .astro components (no JS sent to the browser)
  components/react/ → React components (interactive + Framer Motion)
  styles/global.css → Tailwind import + brand colors (@theme)
public/             → images, favicon, files served as-is
```

## Rules of thumb

- Build with `.astro` components by default — they ship zero JavaScript.
- Use React only when something needs to move or react to the user.
- React components need a `client:*` directive to run in the browser:
  - `client:load` — load right away (above-the-fold interactive stuff)
  - `client:visible` — load when scrolled into view (best for animations)
  - `client:idle` — load when the browser is free
- Import with the `@/` alias, e.g. `import FadeIn from "@/components/react/FadeIn"`.
- Brand colors live in `src/styles/global.css` → use them like `bg-brand-500`.

`Counter.tsx` is only a demo — delete it once real pages exist.
