"use client";

// Reusable Framer Motion primitives with a mechanical character.
// All animations use tight springs — snappy, not floaty.

import { motion, type Variants } from "framer-motion";

// Spring presets
export const spring = {
  stiff: { type: "spring" as const, stiffness: 500, damping: 30 },
  snap:  { type: "spring" as const, stiffness: 700, damping: 35, mass: 0.8 },
};

// Shared variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { ...spring.stiff } },
};

export const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.07 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 600, damping: 28 },
  },
};

export const stagger = (delay = 0.06): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

// ─── Components ───────────────────────────────────────────────────────────────

/** Section that reveals when scrolled into view — fade + slide up */
export function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...spring.stiff, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Grid/list that staggers its children on scroll */
export function StaggerGrid({
  children,
  className,
  delayStep = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  delayStep?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(delayStep)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/** Single item inside a StaggerGrid */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Mechanical "stamp" appear — for hero headline */
export function StampHeadline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={stampIn}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

/** Mechanical button press (scale 0.96 on tap) */
export const MotionButton = motion.a;
export const motionPress = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.02 },
  transition: spring.snap,
};

/** Accent red line that "draws" itself (used under section titles) */
export function AccentLine({
  className,
  delay = 0.2,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`block h-[3px] bg-brand-700 mt-3 ${className ?? ""}`}
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 48, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
