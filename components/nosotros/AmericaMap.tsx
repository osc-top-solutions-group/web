"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const PRESENCE_IDS = new Set([
  840, 484, 320, 340, 222, 558, 188, 591, 214,
  170, 218, 604, 68, 76, 600, 858, 32, 152,
]);

const OTHER_AMERICAS = new Set([
  "Canada", "Cuba", "Haiti", "Jamaica", "Trinidad and Tobago",
  "Venezuela", "Guyana", "Suriname", "Belize",
]);

const presenceCountries: { name: string; coordinates: [number, number] }[] = [
  { name: "Estados Unidos",  coordinates: [-100,   40]   },
  { name: "México",          coordinates: [-102,   24]   },
  { name: "Guatemala",       coordinates: [-90.5,  15.5] },
  { name: "Honduras",        coordinates: [-87,    14.5] },
  { name: "El Salvador",     coordinates: [-89,    13.7] },
  { name: "Nicaragua",       coordinates: [-85,    13]   },
  { name: "Costa Rica",      coordinates: [-84,    10]   },
  { name: "Panamá",          coordinates: [-80,     9]   },
  { name: "Rep. Dominicana", coordinates: [-70,    19]   },
  { name: "Colombia",        coordinates: [-74,     4]   },
  { name: "Ecuador",         coordinates: [-78.5,  -2]   },
  { name: "Perú",            coordinates: [-76,   -10]   },
  { name: "Bolivia",         coordinates: [-65,   -17]   },
  { name: "Brasil",          coordinates: [-53,   -10]   },
  { name: "Paraguay",        coordinates: [-58,   -23]   },
  { name: "Argentina",       coordinates: [-65,   -35]   },
  { name: "Chile",           coordinates: [-71,   -33]   },
];

export default function AmericaMap() {
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ background: "#060C1F" }}
    >
      {/* Tech grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center top, rgba(255,0,87,0.08) 0%, transparent 70%)" }}
      />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#FF0057]/40 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#FF0057]/40 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-12 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FF0057]/40 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-12 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FF0057]/40 rounded-br-lg pointer-events-none" />

      {/* Header HUD */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
          OSC Network · 17 países activos
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -130%)" }}
        >
          <div
            className="rounded-xl px-4 py-2 shadow-2xl text-center border border-white/15 backdrop-blur-md"
            style={{ background: "rgba(6,12,31,0.92)" }}
          >
            <p className="font-bold text-xs text-white tracking-wide">{tooltip.name}</p>
            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-white/15"
              style={{ background: "rgba(6,12,31,0.92)" }}
            />
          </div>
        </div>
      )}

      {/* Map */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-70, -5], scale: 340 }}
        width={900}
        height={680}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numId = parseInt(geo.id, 10);
                const isPresence = PRESENCE_IDS.has(numId);
                const isOtherAmerica = OTHER_AMERICAS.has(geo.properties?.name);

                if (!isPresence && !isOtherAmerica) {
                  const lon = geo.bbox ? (geo.bbox[0] + geo.bbox[2]) / 2 : 0;
                  const lat = geo.bbox ? (geo.bbox[1] + geo.bbox[3]) / 2 : 0;
                  if (lon < -170 || lon > -20 || lat < -60 || lat > 85) return null;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={0.6}
                    style={{
                      default: {
                        fill: isPresence ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.06)",
                        outline: "none",
                        transition: "fill 0.25s, filter 0.25s",
                        filter: isPresence ? "drop-shadow(0 0 6px rgba(255,255,255,0.2))" : "none",
                      },
                      hover: {
                        fill: isPresence ? "#FF0057" : "rgba(255,255,255,0.12)",
                        outline: "none",
                        cursor: isPresence ? "pointer" : "default",
                        filter: isPresence ? "drop-shadow(0 0 10px rgba(255,0,87,0.5))" : "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Pins */}
          {presenceCountries.map((country, idx) => (
            <Marker
              key={country.name}
              coordinates={country.coordinates}
              onMouseEnter={(e: React.MouseEvent) => {
                const svgEl = (e.currentTarget as SVGElement).closest("svg");
                if (!svgEl) return;
                const svgRect = svgEl.getBoundingClientRect();
                setTooltip({
                  name: country.name,
                  x: e.clientX - svgRect.left,
                  y: e.clientY - svgRect.top,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Outer pulse */}
              <circle r={14} fill="transparent" stroke="#FF0057" strokeWidth={1} strokeOpacity={0}>
                <animate attributeName="r" from="6" to="22" dur="2.5s" begin={`${idx * 0.12}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.6" to="0" dur="2.5s" begin={`${idx * 0.12}s`} repeatCount="indefinite" />
              </circle>
              {/* Inner pulse */}
              <circle r={8} fill="#FF0057" fillOpacity={0}>
                <animate attributeName="r" from="4" to="12" dur="2.5s" begin={`${idx * 0.12 + 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="0.3" to="0" dur="2.5s" begin={`${idx * 0.12 + 0.3}s`} repeatCount="indefinite" />
              </circle>
              {/* Core dot */}
              <circle
                r={4}
                fill="#FF0057"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={1.5}
                style={{ cursor: "pointer", filter: "drop-shadow(0 0 5px rgba(255,0,87,0.8))" }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Bottom HUD bar */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-white/8"
        style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-white/85" style={{ boxShadow: "0 0 6px rgba(255,255,255,0.3)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Presencia OSC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF0057]" style={{ boxShadow: "0 0 6px rgba(255,0,87,0.6)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Nodo activo</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] text-white/20 font-mono">LAT 0°N · LON 70°W</span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="text-[10px] text-white/20 font-mono">ZOOM 1×</span>
        </div>
      </div>
    </div>
  );
}
