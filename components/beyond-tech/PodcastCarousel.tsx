"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const episodes = [
  {
    num: 5,
    title: "Reinvención para Crecer",
    guest: "Miguel Vilchez — Territory Manager Bolivia",
    image: "/Episodio 5.jpeg",
    src: "https://open.spotify.com/embed/episode/0rbVeEaylLDJ4YHVkjeHAh/video?utm_source=generator",
  },
  {
    num: 4,
    title: "Redes más Inteligentes",
    guest: "Christian Ferigra — Global Account Director, Power Utilities",
    image: "/Episodio 4.jpeg",
    src: "https://open.spotify.com/embed/episode/0Cps6nIn1APTYvXM3wMjWo/video?utm_source=generator",
  },
  {
    num: 3,
    title: "Anticipar para Trascender",
    guest: "Andrés Gallego — Chief Commercial & Marketing Officer",
    image: "/Episodio 3.jpeg",
    src: "https://open.spotify.com/embed/episode/6eVL9FeskTrztAiL4ii9mD/video?utm_source=generator",
  },
  {
    num: 2,
    title: "La Tecnología suma, Lo humano multiplica",
    guest: "Angélica D'Haro — Chief Business Development and Investment Officer",
    image: "/Episodio 2.jpeg",
    src: "https://open.spotify.com/embed/episode/2nMyO99r4sTmF5V2k1xYYG/video?utm_source=generator",
  },
  {
    num: 1,
    title: "Toda gran idea, tiene un Origen",
    guest: "Mauricio Rubio — CEO",
    image: "/Episodio 1.jpeg",
    src: "https://open.spotify.com/embed/episode/4Mkr3F6rcVZEuORW6Tjoo9/video?utm_source=generator",
  },
];

const CARD_W = 272;

export default function PodcastCarousel() {
  const [openEp, setOpenEp] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeEp = episodes.find((e) => e.num === openEp);
  const reduced = useReducedMotion();

  const slide = (dir: "prev" | "next") => {
    scrollRef.current?.scrollBy({ left: dir === "next" ? CARD_W : -CARD_W, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Carousel ── */}
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">Episodios</p>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => slide("prev")}
              aria-label="Anterior"
              whileHover={reduced ? undefined : { scale: 1.1 }}
              whileTap={reduced ? undefined : { scale: 0.9 }}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#FF0057]/50 hover:text-[#FF0057] transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => slide("next")}
              aria-label="Siguiente"
              whileHover={reduced ? undefined : { scale: 1.1 }}
              whileTap={reduced ? undefined : { scale: 0.9 }}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-[#FF0057]/50 hover:text-[#FF0057] transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-4 overflow-x-auto"
          style={{ scrollSnapType: "x mandatory", cursor: "grab" }}
          onMouseDown={(e) => {
            const el = scrollRef.current;
            if (!el) return;
            const startX = e.pageX - el.offsetLeft;
            const startScroll = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX);
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
              if (el) el.style.cursor = "grab";
            };
            el.style.cursor = "grabbing";
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          {episodes.map((ep) => (
            <motion.div
              key={ep.num}
              className="flex-none group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              style={{
                width: "256px",
                scrollSnapAlign: "start",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setOpenEp(ep.num)}
              whileHover={reduced ? undefined : {
                y: -5,
                borderColor: "rgba(255,0,87,0.35)",
                backgroundColor: "rgba(255,255,255,0.07)",
              }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg,#FF0057,transparent)" }}
              />

              {/* ── Image header (if photo exists) ── */}
              {ep.image ? (
                <div className="relative h-36 w-full overflow-hidden flex-shrink-0">
                  <img
                    src={ep.image}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(13,21,37,0.75) 100%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: "linear-gradient(135deg,#FF0057 0%,#b0003e 100%)" }}
                      whileHover={reduced ? undefined : { scale: 1.12 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                        <path d="M2 1.5l10 6-10 6V1.5z" fill="white" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-2 left-3 flex items-center gap-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#FF0057]">
                      Episodio {ep.num}
                    </p>
                    {ep.num === 5 && (
                      <span className="text-[7px] font-black uppercase tracking-[0.1em] text-white/50 border border-white/20 px-1.5 py-0.5 rounded-full bg-black/30">
                        Nuevo
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="px-5 pt-5 pb-0">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: "linear-gradient(135deg,#FF0057 0%,#b0003e 100%)" }}
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path d="M2 1.5l9 5.5-9 5.5V1.5z" fill="white" />
                    </svg>
                  </div>
                </div>
              )}

              {/* ── Card body ── */}
              <div className="flex flex-col flex-1 px-5 py-4">
                {!ep.image && (
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#FF0057]">
                      Episodio {ep.num}
                    </p>
                    {ep.num === 5 && (
                      <span className="text-[7px] font-black uppercase tracking-[0.1em] text-white/30 border border-white/12 px-1.5 py-0.5 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                )}
                <p className="text-white text-[13px] font-bold leading-snug flex-1 mb-4">
                  {ep.title}
                </p>
                <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.07)" }} />
                <p className="text-[10px] font-light leading-snug pb-1" style={{ color: "rgba(255,255,255,0.32)" }}>
                  {ep.guest}
                </p>
              </div>

              {!ep.image && (
                <span
                  className="absolute right-3 bottom-1 text-[80px] font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.035)" }}
                >
                  {ep.num}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Modal — animated enter/exit ── */}
      <AnimatePresence>
        {activeEp && (
          <motion.div
            key="podcast-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenEp(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Panel */}
            <motion.div
              className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.10)" }}
              initial={reduced ? {} : { scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={reduced ? {} : { scale: 0.92, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between px-6 pt-5 pb-4 gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(180deg,#FF0057,#0F172A)" }} />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#FF0057] mb-1">
                      Episodio {activeEp.num}
                    </p>
                    <p className="text-white text-sm font-bold leading-snug">{activeEp.title}</p>
                    <p className="text-[11px] font-light mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>{activeEp.guest}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setOpenEp(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.4)" }}
                  whileHover={reduced ? undefined : { scale: 1.1, borderColor: "rgba(255,0,87,0.45)", color: "#fff" }}
                  whileTap={reduced ? undefined : { scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  aria-label="Cerrar"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </motion.button>
              </div>
              <div className="p-4">
                <iframe
                  style={{ borderRadius: "10px", display: "block" }}
                  src={activeEp.src}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
