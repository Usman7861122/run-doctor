import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Staggered hero headline reveal. */
export default function HeroText() {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <div className="max-w-3xl">
      <motion.p {...item(0.1)} className="eyebrow text-ember-400!">
        Kirkland, Washington
      </motion.p>
      <motion.h1
        {...item(0.25)}
        className="mt-6 text-5xl leading-[1.02] text-white! sm:text-7xl lg:text-8xl"
      >
        Keep moving. <br />
        <span className="text-ember-400 italic">Pain free.</span>
      </motion.h1>
      <motion.p
        {...item(0.45)}
        className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl"
      >
        Expert foot and ankle care for runners, athletes and everyone who loves
        to stay active.
      </motion.p>
      <motion.div {...item(0.6)} className="mt-10 flex flex-wrap gap-4">
        <a href="#contact" className="btn-primary">
          Book an Appointment
        </a>
        <a href="#physicians" className="btn-ghost-light">
          Meet Our Physicians
        </a>
      </motion.div>
    </div>
  );
}
