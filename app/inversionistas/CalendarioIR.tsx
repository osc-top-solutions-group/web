"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const DOW = ["L","M","M","J","V","S","D"];
const TODAY = new Date(2026, 4, 26); // May 26 2026 — pinned for demo

function slotsForDate(date: Date): string[] {
  const day = date.getDay();
  if (day === 0 || day === 6) return [];
  const minDate = new Date(TODAY); minDate.setHours(0,0,0,0);
  const maxDate = new Date(TODAY); maxDate.setMonth(maxDate.getMonth() + 3);
  if (date < minDate || date > maxDate) return [];
  const seed = date.getDate() + date.getMonth() * 31;
  const all = ["08:30","09:00","09:30","10:00","10:30","11:00","14:00","14:30","15:00","15:30","16:00","16:30"];
  const skip = new Set<number>();
  for (let i = 0; i < 5; i++) skip.add((seed * (i + 3)) % all.length);
  return all.filter((_, i) => !skip.has(i));
}

function sameDay(a: Date | null, b: Date): boolean {
  return !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CalendarioIR() {
  const [view, setView] = useState(() => new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState(30);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedWhen, setConfirmedWhen] = useState("");
  const [email, setEmail] = useState("");

  const minDate = new Date(TODAY); minDate.setHours(0,0,0,0);
  const maxDate = new Date(TODAY); maxDate.setMonth(maxDate.getMonth() + 3);

  const calDays = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    let lead = first.getDay() - 1;
    if (lead < 0) lead = 6;
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const days: Array<{ day: number; date: Date; muted: boolean; hasSlot: boolean; isToday: boolean } | null> = [];
    for (let i = 0; i < lead; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const slots = slotsForDate(date);
      const muted = date < minDate || date > maxDate || date.getDay() === 0 || date.getDay() === 6 || slots.length === 0;
      days.push({ day: d, date, muted, hasSlot: slots.length > 0 && !muted, isToday: sameDay(date, TODAY) });
    }
    return days;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const slots = useMemo(() => selectedDate ? slotsForDate(selectedDate) : [], [selectedDate]);

  const selectedDayLabel = selectedDate
    ? (() => {
        const dows = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
        const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
        return `${dows[selectedDate.getDay()]} ${selectedDate.getDate()} ${months[selectedDate.getMonth()]}`;
      })()
    : "Seleccione día";

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;
    const [h, m] = selectedSlot.split(":").map(Number);
    const end = new Date(selectedDate);
    end.setHours(h, m + duration);
    const endStr = String(end.getHours()).padStart(2,"0") + ":" + String(end.getMinutes()).padStart(2,"0");
    const dows = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    setConfirmedWhen(`${dows[selectedDate.getDay()]} ${selectedDate.getDate()} ${months[selectedDate.getMonth()]} · ${selectedSlot}–${endStr}`);
    setConfirmed(true);
  }

  function navPrev() {
    const prev = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    if (prev >= min) setView(prev);
  }
  function navNext() {
    const next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    if (next <= max) setView(next);
  }

  return (
    <div className="p-6 flex flex-col gap-4 bg-slate-50 min-h-[480px]">
      {/* Header */}
      <div className="flex justify-between items-start pb-3.5 border-b border-slate-200">
        <div>
          <div className="text-[17px] font-medium text-[#000086] tracking-tight leading-tight">
            Reserve reunión 1:1
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-slate-400 mt-1">
            30 min · Google Meet · GMT-5
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
          style={{ background: "linear-gradient(135deg, #000086, #FF0057)" }}
        >
          MR
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex justify-between items-center">
        <span className="text-[15px] font-medium text-[#000086] tracking-tight">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={navPrev}
            aria-label="Mes anterior"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-[#000086] hover:text-[#000086] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            onClick={navNext}
            aria-label="Mes siguiente"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-[#000086] hover:text-[#000086] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {DOW.map((d, i) => (
          <div key={i} className="text-center font-mono text-[9px] tracking-[0.12em] uppercase text-slate-400 py-1">
            {d}
          </div>
        ))}
        {calDays.map((cell, i) => {
          if (!cell) return <div key={`e-${i}`} />;
          const isSelected = sameDay(selectedDate, cell.date);
          return (
            <div
              key={cell.day}
              role={cell.muted ? undefined : "button"}
              tabIndex={cell.muted ? -1 : 0}
              aria-label={cell.muted ? undefined : `Seleccionar ${cell.date.toLocaleDateString("es-CL")}`}
              onClick={() => {
                if (!cell.muted) {
                  setSelectedDate(cell.date);
                  setSelectedSlot(null);
                }
              }}
              onKeyDown={(e) => {
                if (!cell.muted && (e.key === "Enter" || e.key === " ")) {
                  setSelectedDate(cell.date);
                  setSelectedSlot(null);
                }
              }}
              className={[
                "relative aspect-square flex items-center justify-center rounded-full text-[12px] leading-none select-none transition-colors duration-150",
                cell.muted
                  ? "text-slate-300 opacity-40 cursor-not-allowed"
                  : "text-[#000086] cursor-pointer hover:bg-slate-200",
                cell.isToday && !isSelected ? "border border-[#FF0057]" : "",
                isSelected ? "!bg-[#000086] !text-white" : "",
              ].join(" ")}
            >
              {cell.day}
              {cell.hasSlot && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF0057]" />
              )}
              {cell.hasSlot && isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
              )}
            </div>
          );
        })}
      </div>

      {/* Slot header */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-200">
        <span className="text-[13px] font-medium text-[#000086] tracking-tight">{selectedDayLabel}</span>
        <div className="flex gap-1.5">
          {[30, 45].map((d) => (
            <button
              key={d}
              onClick={() => { setDuration(d); setSelectedSlot(null); }}
              className={[
                "px-2.5 py-1 rounded-full border font-mono text-[9px] tracking-[0.06em] uppercase font-medium cursor-pointer transition-all duration-150",
                duration === d
                  ? "bg-[#000086] border-[#000086] text-white"
                  : "bg-white border-slate-200 text-slate-500 hover:border-[#000086] hover:text-[#000086]",
              ].join(" ")}
            >
              {d}m
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="grid grid-cols-3 gap-1.5 max-h-28 overflow-y-auto">
        {slots.length === 0 ? (
          <div className="col-span-3 py-4 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg bg-white">
            {selectedDate ? "Sin disponibilidad." : "Seleccione un día."}
          </div>
        ) : (
          slots.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedSlot(t)}
              className={[
                "py-2 text-center rounded-lg border font-mono text-[11px] font-medium cursor-pointer transition-all duration-150",
                selectedSlot === t
                  ? "border-[#FF0057] bg-[#FF0057]/8 text-[#FF0057]"
                  : "border-slate-200 bg-white text-[#000086] hover:border-[#000086]",
              ].join(" ")}
            >
              {t}
            </button>
          ))
        )}
      </div>

      {/* Confirm / confirmed */}
      {confirmed ? (
        <div className="flex items-center gap-2.5 px-3.5 py-3 bg-[#FF0057]/8 rounded-lg text-[#FF0057] font-mono text-[11px] tracking-[0.04em] font-medium">
          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{confirmedWhen}</span>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="flex gap-1.5 pt-3 border-t border-slate-200">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo corporativo"
            required
            className="flex-1 px-3.5 py-2 rounded-full border border-slate-200 bg-white text-[12px] text-[#000086] placeholder-slate-300 focus:outline-none focus:border-[#000086] transition-colors"
          />
          <button
            type="submit"
            disabled={!selectedDate || !selectedSlot}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#000086] text-white font-mono text-[10px] tracking-[0.1em] uppercase font-medium whitespace-nowrap cursor-pointer hover:bg-[#FF0057] disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Confirmar
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
          </button>
        </form>
      )}
    </div>
  );
}
