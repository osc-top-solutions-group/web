"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

// Shared easing curve — matches Hero.tsx blur-reveal
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const distance = 44;

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: EASE,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      // Skip animation entirely when user prefers reduced motion
      initial={reduced ? false : "hidden"}
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
