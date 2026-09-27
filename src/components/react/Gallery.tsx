import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Photo = { img: string; title: string; tag: string };
const FALLBACK = "/images/placeholder.svg";

/** Photo grid with hover reveal + a lightbox on click. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const grid = useRef<HTMLDivElement>(null);

  // Images that failed before React hydrated never fire onError, so check once on mount.
  useEffect(() => {
    grid.current?.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) img.src = FALLBACK;
    });
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight")
        setOpen((o) => (o === null ? o : (o + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpen((o) =>
          o === null ? o : (o - 1 + photos.length) % photos.length,
        );
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, photos.length]);

  // Asymmetric editorial grid on desktop
  const spans = [
    "lg:col-span-7 lg:row-span-2",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
  ];

  return (
    <>
      <div
        ref={grid}
        className="grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-12"
      >
        {photos.map((p, k) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setOpen(k)}
            className={`group bg-navy-800 relative overflow-hidden rounded-2xl text-left ${spans[k] ?? "lg:col-span-4"}`}
            aria-label={`Open photo: ${p.title}`}
          >
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              decoding="async"
              onError={(e) => (e.currentTarget.src = FALLBACK)}
              className="absolute inset-0 size-full object-cover grayscale-[35%] transition duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:grayscale-0 group-focus-visible:scale-110"
            />
            <span className="from-navy-950/90 via-navy-950/10 absolute inset-0 bg-gradient-to-t to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-3 rounded-xl border border-white/0 transition-all duration-700 group-hover:inset-4 group-hover:border-white/40" />
            <span className="absolute right-6 bottom-6 left-6 translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
              <span className="text-ember-400 text-xs font-semibold tracking-[0.2em] uppercase">
                {p.tag}
              </span>
              <span className="mt-1 block font-serif text-2xl text-white">
                {p.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={photos[open].title}
            className="bg-navy-950/95 fixed inset-0 z-[100] grid place-items-center p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[open].img.replace(/w=\d+/, "w=1800")}
                alt={photos[open].title}
                onError={(e) => (e.currentTarget.src = FALLBACK)}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
              <figcaption className="mt-4 text-center font-serif text-2xl text-white">
                {photos[open].title}
              </figcaption>
            </motion.figure>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              aria-label="Close photo"
              className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
