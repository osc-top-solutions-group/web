"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, FileText, BarChart2,
  Clock, ExternalLink, ArrowUpRight,
  Shield, Users, Layers,
} from "lucide-react";
import type { IndustryResource } from "@/app/industrias/_data";

/* ── Per-type design tokens ─────────────────────────────── */
const TYPE_CONFIG = {
  whitepaper: {
    label: "Whitepaper",
    icon: BookOpen,
    color: "#000086",
    colorLight: "#818CF8",
    colorMid: "#4F54D4",
    bg: "rgba(129,140,248,0.10)",
    border: "rgba(129,140,248,0.20)",
    glow: "rgba(129,140,248,0.14)",
    headerGradient:
      "linear-gradient(145deg, rgba(0,0,134,0.32) 0%, rgba(79,84,212,0.10) 60%, rgba(0,0,0,0) 100%)",
    badgeBg: "rgba(129,140,248,0.14)",
    readTime: "12 min",
    pages: "24 págs",
  },
  guia: {
    label: "Guía Técnica",
    icon: FileText,
    color: "#0D9488",
    colorLight: "#2DD4BF",
    colorMid: "#14B8A6",
    bg: "rgba(45,212,191,0.10)",
    border: "rgba(45,212,191,0.20)",
    glow: "rgba(45,212,191,0.12)",
    headerGradient:
      "linear-gradient(145deg, rgba(13,148,136,0.30) 0%, rgba(20,184,166,0.08) 60%, rgba(0,0,0,0) 100%)",
    badgeBg: "rgba(45,212,191,0.12)",
    readTime: "8 min",
    pages: "16 págs",
  },
  reporte: {
    label: "Reporte",
    icon: BarChart2,
    color: "#FF0057",
    colorLight: "#FF5580",
    colorMid: "#FF2266",
    bg: "rgba(255,85,128,0.10)",
    border: "rgba(255,85,128,0.20)",
    glow: "rgba(255,85,128,0.12)",
    headerGradient:
      "linear-gradient(145deg, rgba(255,0,87,0.28) 0%, rgba(255,34,102,0.08) 60%, rgba(0,0,0,0) 100%)",
    badgeBg: "rgba(255,85,128,0.12)",
    readTime: "6 min",
    pages: "18 págs",
  },
} as const;

const NUMS = ["01", "02", "03", "04"];

/* Grid columns by count — full strings required for Tailwind purge */
const COL_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

interface Props {
  resources: IndustryResource[];
  vertical: string;
}

/* ── Main component ──────────────────────────────────────── */
export default function ResourceCaptureForm({ resources }: Props) {
  const colClass = COL_CLASS[resources.length] ?? "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-8">
      {/* ── Card grid ── */}
      <div className={`grid grid-cols-1 ${colClass} gap-5`}>
        {resources.map((res, idx) => {
          const cfg = TYPE_CONFIG[res.type];
          const Icon = cfg.icon;
          const href = res.href ?? "/contacto";

          return (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={href} className="block h-full group">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="relative flex flex-col h-full rounded-3xl overflow-hidden border"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Top accent line — reveals on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${cfg.colorMid}, ${cfg.colorLight}80)`,
                    }}
                  />

                  {/* Border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      boxShadow: `0 0 0 1px ${cfg.color}35, 0 20px 48px ${cfg.glow}`,
                    }}
                  />

                  {/* ── Header area ── */}
                  <div
                    className="relative flex flex-col items-start justify-between p-6 pb-5 overflow-hidden"
                    style={{
                      background: cfg.headerGradient,
                      borderBottom: `1px solid rgba(255,255,255,0.07)`,
                      minHeight: "132px",
                    }}
                  >
                    {/* Radial glow orb */}
                    <div
                      className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Top row: number + type badge */}
                    <div className="relative flex items-center justify-between w-full mb-4">
                      <span
                        className="text-[10px] font-black tabular-nums"
                        style={{ color: `${cfg.colorLight}40` }}
                      >
                        {NUMS[idx]}
                      </span>

                      <span
                        className="text-[9px] font-black uppercase tracking-[0.22em] px-2.5 py-1 rounded-full border"
                        style={{
                          color: cfg.colorLight,
                          background: cfg.badgeBg,
                          borderColor: cfg.border,
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${cfg.bg}, rgba(255,255,255,0.03))`,
                        border: `1px solid ${cfg.border}`,
                        boxShadow: `0 4px 20px ${cfg.glow}`,
                      }}
                    >
                      <Icon size={22} style={{ color: cfg.colorLight }} />
                    </div>
                  </div>

                  {/* ── Body ── */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3
                      className="font-bold text-base leading-snug mb-3 transition-colors duration-200 group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.90)" }}
                    >
                      {res.title}
                    </h3>

                    <p className="text-white/35 text-xs font-light leading-relaxed flex-1 mb-6">
                      {res.description}
                    </p>

                    {/* ── Footer ── */}
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      {/* Meta */}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] text-white/25">
                          <Clock size={9} />
                          {cfg.readTime}
                        </span>
                        <span className="w-px h-3 bg-white/10" />
                        <span className="flex items-center gap-1.5 text-[10px] text-white/25">
                          <Layers size={9} />
                          {cfg.pages}
                        </span>
                      </div>

                      {/* CTA arrow */}
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: cfg.bg,
                          border: `1px solid ${cfg.border}`,
                        }}
                      >
                        {res.href ? (
                          <ExternalLink
                            size={13}
                            style={{ color: cfg.colorLight }}
                            className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
                          />
                        ) : (
                          <ArrowUpRight
                            size={13}
                            style={{ color: cfg.colorLight }}
                            className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── Trust bar ── */}
      <div className="flex items-center gap-6 px-1">
        <div className="flex items-center gap-1.5 text-white/20 text-[10px]">
          <ExternalLink size={9} />
          Consulta en línea
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5 text-white/20 text-[10px]">
          <Shield size={9} />
          Acceso inmediato
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5 text-white/20 text-[10px]">
          <Users size={9} />
          +2,400 profesionales
        </div>
      </div>
    </div>
  );
}
