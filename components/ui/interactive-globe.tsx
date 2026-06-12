"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

interface GlobeProps {
  className?: string;
  size?: number;
}

// Hub central — Estados Unidos
const HUB: [number, number] = [38, -97];

// 16 puntos distribuidos uniformemente por TODA la esfera (360° lon, 180° lat)
const MARKERS = [
  // ── HUB ──────────────────────────────── lng  -97  (USA, frente)
  { lat:  38,  lng:  -97, label: "Estados Unidos", isHub: true  },

  // ── Cuadrante 1: Américas  (lng -60 → -120) ─────────────────────────
  { lat:   5,  lng:  -74, label: "Colombia",    isHub: false }, // Suramérica norte
  { lat:  20,  lng: -100, label: "México",      isHub: false }, // Centroamérica norte
  { lat:  10,  lng:  -83, label: "Costa Rica",  isHub: false }, // Centroamérica sur
  { lat:  -8,  lng:  -55, label: "Brasil",      isHub: false }, // Suramérica este
  { lat: -34,  lng:  -64, label: "Argentina",   isHub: false }, // Cono sur

  // ── Cuadrante 2: Europa / África  (lng -10 → +40) ───────────────────
  { lat:  52,  lng:   -2, label: "Honduras",    isHub: false }, // Europa noroeste
  { lat:  41,  lng:   12, label: "El Salvador", isHub: false }, // Europa sur
  { lat:  60,  lng:   30, label: "Guatemala",   isHub: false }, // Europa norte
  { lat:   6,  lng:    3, label: "Panamá",      isHub: false }, // África oeste
  { lat: -26,  lng:   28, label: "Ecuador",     isHub: false }, // África sur

  // ── Cuadrante 3: Asia / Medio Oriente  (lng +45 → +120) ─────────────
  { lat:  25,  lng:   55, label: "Perú",        isHub: false }, // Medio Oriente
  { lat:  28,  lng:   77, label: "Bolivia",     isHub: false }, // Asia sur
  { lat:  35,  lng:  110, label: "Paraguay",    isHub: false }, // Asia este

  // ── Cuadrante 4: Pacífico  (lng +130 → +170 / -140 → -160) ──────────
  { lat:  36,  lng:  140, label: "Chile",       isHub: false }, // Japón / Pacífico norte
  { lat: -28,  lng:  134, label: "Uruguay",     isHub: false }, // Oceanía
];

const CONNECTIONS = MARKERS
  .filter(m => !m.isHub)
  .map(m => ({ from: HUB, to: [m.lat, m.lng] as [number, number] }));

function latLngToXYZ(lat: number, lng: number, r: number): [number, number, number] {
  const phi   = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(r * Math.sin(phi) * Math.cos(theta)),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ];
}
function ry(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
function rx(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function proj(x: number, y: number, z: number, cx: number, cy: number): [number, number] {
  const s = 600 / (600 + z);
  return [x * s + cx, y * s + cy];
}

export function InteractiveGlobe({ className, size = 420 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({
    rotY: -0.4,   // start showing Americas
    rotX: -0.15,
    time: 0,
    dragging: false,
    lastX: 0, lastY: 0,
    dots: [] as [number, number, number][],
    canvasW: 0, canvasH: 0,
    lastFrameTime: 0,
  });
  const rafRef = useRef<number>(0);

  // Generate fewer dots once
  useEffect(() => {
    const state = stateRef.current;
    let seed = 42317;
    const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0xffffffff; };
    state.dots = Array.from({ length: 700 }, () => {
      const u = rand(), v = rand();
      const theta = 2 * Math.PI * u;
      const phi   = Math.acos(2 * v - 1);
      return [
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      ] as [number, number, number];
    });
  }, []);

  // Drag handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    const onDown = (e: MouseEvent) => { s.dragging = true; s.lastX = e.clientX; s.lastY = e.clientY; e.preventDefault(); };
    const onTouchDown = (e: TouchEvent) => { if (!e.touches.length) return; s.dragging = true; s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY; };
    const onMove = (e: MouseEvent) => { if (!s.dragging) return; s.rotY += (e.clientX - s.lastX) * 0.006; s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX + (e.clientY - s.lastY) * 0.006)); s.lastX = e.clientX; s.lastY = e.clientY; };
    const onTouchMove = (e: TouchEvent) => { if (!s.dragging || !e.touches.length) return; s.rotY += (e.touches[0].clientX - s.lastX) * 0.006; s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX + (e.touches[0].clientY - s.lastY) * 0.006)); s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY; };
    const onUp = () => { s.dragging = false; };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("touchstart", onTouchDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("touchstart", onTouchDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  // Render loop — capped at 30 fps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (timestamp: number) => {
      // ── 30 fps cap ───────────────────────────────
      const s = stateRef.current;
      if (timestamp - s.lastFrameTime < 33) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      s.lastFrameTime = timestamp;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = canvas.clientWidth;
      const h   = canvas.clientHeight;
      if (s.canvasW !== w || s.canvasH !== h) {
        canvas.width  = w * dpr;
        canvas.height = h * dpr;
        s.canvasW = w; s.canvasH = h;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w / 2, cy = h / 2;
      const radius = Math.min(w, h) * 0.44;
      const { rotY: ryA, rotX: rxA, dots } = s;

      if (!s.dragging) s.rotY += 0.006; // rotación visible ~36s/vuelta
      s.time += 0.012;
      const time = s.time;

      ctx.clearRect(0, 0, w, h);

      // ── Atmosphere glow (outside sphere) ───────
      const atm = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.28);
      atm.addColorStop(0,   "rgba(255,0,87,0.08)");
      atm.addColorStop(0.6, "rgba(255,0,87,0.03)");
      atm.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // ── Sphere body ─────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.22, cy - radius * 0.22, 0,
        cx, cy, radius
      );
      sphereGrad.addColorStop(0,   "rgba(24, 44, 88, 0.97)");
      sphereGrad.addColorStop(0.55,"rgba(10, 22, 54, 0.98)");
      sphereGrad.addColorStop(1,   "rgba(4,  10, 30, 1)");
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // ── Clip to sphere ──────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Dots — batch by alpha bucket for fewer state changes
      const dotsByAlpha: Record<string, Array<[number, number]>> = {};
      for (const d of dots) {
        let [x, y, z] = [d[0] * radius, d[1] * radius, d[2] * radius];
        [x, y, z] = rx(x, y, z, rxA);
        [x, y, z] = ry(x, y, z, ryA);
        if (z > 0) continue;
        const depth = (-z) / radius;
        const alpha = Math.max(0.04, depth * 0.5);
        const key   = alpha.toFixed(1);
        if (!dotsByAlpha[key]) dotsByAlpha[key] = [];
        const [sx, sy] = proj(x, y, z, cx, cy);
        dotsByAlpha[key].push([sx, sy]);
      }
      for (const [alpha, pts] of Object.entries(dotsByAlpha)) {
        ctx.fillStyle = `rgba(255,0,87,${alpha})`;
        ctx.beginPath();
        for (const [sx, sy] of pts) {
          ctx.moveTo(sx + 0.85, sy);
          ctx.arc(sx, sy, 0.85, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Connections
      for (const conn of CONNECTIONS) {
        let [x1, y1, z1] = latLngToXYZ(conn.from[0], conn.from[1], radius);
        let [x2, y2, z2] = latLngToXYZ(conn.to[0], conn.to[1], radius);
        [x1, y1, z1] = rx(x1, y1, z1, rxA); [x1, y1, z1] = ry(x1, y1, z1, ryA);
        [x2, y2, z2] = rx(x2, y2, z2, rxA); [x2, y2, z2] = ry(x2, y2, z2, ryA);
        // only draw if both endpoints are on front half
        if (z1 > radius * 0.6 && z2 > radius * 0.6) continue;

        const [sx1, sy1] = proj(x1, y1, z1, cx, cy);
        const [sx2, sy2] = proj(x2, y2, z2, cx, cy);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, mz = (z1 + z2) / 2;
        const ml = Math.sqrt(mx * mx + my * my + mz * mz);
        const ah = radius * 1.22;
        const [scx, scy] = proj((mx / ml) * ah, (my / ml) * ah, (mz / ml) * ah, cx, cy);

        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.quadraticCurveTo(scx, scy, sx2, sy2);
        ctx.strokeStyle = "rgba(255,0,87,0.35)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Traveling dot
        const t  = (Math.sin(time * 1.0 + conn.to[0] * 0.12) + 1) / 2;
        const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
        const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
        ctx.beginPath();
        ctx.arc(tx, ty, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0057";
        ctx.fill();
      }

      // Markers
      for (const m of MARKERS) {
        let [x, y, z] = latLngToXYZ(m.lat, m.lng, radius);
        [x, y, z] = rx(x, y, z, rxA);
        [x, y, z] = ry(x, y, z, ryA);
        if (z > radius * 0.25) continue;
        const [sx, sy] = proj(x, y, z, cx, cy);
        const pulse = Math.sin(time * 2.2 + m.lat) * 0.5 + 0.5;

        if (m.isHub) {
          ctx.beginPath();
          ctx.arc(sx, sy, 12 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,0,87,${(0.07 + pulse * 0.07).toFixed(2)})`;
          ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath();
          ctx.arc(sx, sy, 6 + pulse * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,0,87,${(0.25 + pulse * 0.15).toFixed(2)})`;
          ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FF0057"; ctx.fill();
          ctx.font = "bold 9px system-ui,sans-serif";
          ctx.fillStyle = "rgba(255,255,255,0.90)";
          ctx.fillText("Estados Unidos · Hub", sx + 9, sy + 3.5);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, 5 + pulse * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,0,87,${(0.10 + pulse * 0.09).toFixed(2)})`;
          ctx.lineWidth = 0.8; ctx.stroke();
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "#FF0057"; ctx.fill();
          ctx.font = "9px system-ui,sans-serif";
          ctx.fillStyle = "rgba(255,255,255,0.65)";
          ctx.fillText(m.label, sx + 6, sy + 3);
        }
      }

      // Inner rim (vignette)
      const rim = ctx.createRadialGradient(cx, cy, radius * 0.62, cx, cy, radius);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,20,0.65)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, w, h);

      ctx.restore(); // end clip

      // ── Sphere border ─────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,0,87,0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,0,87,0.05)";
      ctx.lineWidth = 4;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("cursor-grab active:cursor-grabbing select-none", className)}
      style={{ width: size, height: size, willChange: "transform" }}
    />
  );
}
