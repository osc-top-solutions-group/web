"use client";

import { motion, useReducedMotion } from "framer-motion";

const words = [
  { text: "Orquestamos la",              accent: false },
  { text: "continuidad operativa",       accent: true  },
  { text: "de infraestructuras críticas", accent: false },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/video%20hero%20banner.mp4"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,0,20,0.82) 0%, rgba(0,0,60,0.65) 50%, rgba(0,0,10,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle horizontal scan line */}
      {!reduced && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,87,0.25), transparent)" }}
          animate={{ top: ["10%", "90%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          aria-hidden="true"
        />
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06))" }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 pt-36 pb-28 flex flex-col items-center text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-full px-5 py-2 mb-14 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 bg-[#FF0057] rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.28em]">
            Beyond Tech · Beyond Limits
          </span>
        </motion.div>

        {/* Title — word by word reveal */}
        <h1
          className="flex flex-col items-center gap-1 mb-0"
          aria-label="Integrador tecnológico para infraestructuras críticas en LATAM — orquestamos la continuidad operativa"
        >
          {words.map(({ text, accent }, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: reduced ? 0 : 0.65,
                delay: reduced ? 0 : 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`block font-bold leading-[1.05] tracking-tight select-none
                text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]
                ${accent ? "text-[#FF0057]" : "text-white"}
              `}
            >
              {text}
            </motion.span>
          ))}
        </h1>

        {/* Thin underline accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-24 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, #FF0057, transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="w-5 h-9 border border-white/25 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-0.5 h-2.5 bg-white/50 rounded-full"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
