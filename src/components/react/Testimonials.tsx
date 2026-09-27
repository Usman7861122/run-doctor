import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type T = { quote: string; name: string; source: string };

export default function Testimonials({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback(
    (d: number) => setI((p) => (p + d + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, go]);

  const t = items[i];

  return (
    <div
      className="relative mx-auto max-w-4xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="text-ember-400 flex justify-center gap-1"
        aria-label="5 out of 5 stars"
      >
        {Array.from({ length: 5 }).map((_, k) => (
          <svg
            key={k}
            viewBox="0 0 24 24"
            className="size-5 fill-current"
            aria-hidden="true"
          >
            <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
          </svg>
        ))}
      </div>

      <div
        className="relative mt-8 min-h-[13rem] sm:min-h-[11rem]"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-serif text-3xl leading-snug text-white sm:text-4xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm tracking-widest text-white/60 uppercase">
              {t.name} <span className="text-ember-400">&middot;</span>{" "}
              {t.source}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="hover:border-ember-400 hover:text-ember-400 grid size-12 place-items-center rounded-full border border-white/25 text-white transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="flex gap-2">
          {items.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show review ${k + 1}`}
              aria-current={k === i}
              className="grid size-6 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${k === i ? "bg-ember-400 w-6" : "w-1.5 bg-white/30"}`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="hover:border-ember-400 hover:text-ember-400 grid size-12 place-items-center rounded-full border border-white/25 text-white transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
