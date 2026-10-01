/**
 * Validación de los formularios públicos.
 *
 * Estos endpoints reciben tráfico anónimo de internet (el sitio no tiene IAP),
 * así que el Route Handler es el único control antes de escribir en Firestore.
 * Todo campo tiene tope de longitud: sin él, un POST con un `mensaje` de varios
 * MB llega hasta el driver de Firestore antes de fallar.
 */

/** Países atendidos. Es la fuente de verdad: la usa el <select> y la valida el servidor. */
export const COUNTRIES = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia",
  "Costa Rica", "Ecuador", "El Salvador", "Estados Unidos",
  "Guatemala", "Honduras", "México", "Nicaragua", "Panamá",
  "Perú", "Uruguay",
] as const;

/**
 * Verticales atendidas. Igual que `COUNTRIES`, es la fuente de verdad: la usa
 * el <select> de la landing y la valida el servidor.
 */
export const SECTORES = [
  "Power & Utilities", "Energía y Minería", "Puertos y Logística",
  "Gobierno y Seguridad Ciudadana", "Telecomunicaciones", "Otro",
] as const;

/** Ventana de atención que declara el lead. Ordena la cola de respuesta. */
export const HORIZONTES = ["30 días", "90 días", "6 meses"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tope de longitud por campo. `email` usa el máximo de la RFC 5321. */
const MAX = {
  nombre: 120,
  empresa: 160,
  rol: 120,
  email: 254,
  telefono: 40,
  mensaje: 4000,
  prioridad: 4000,
} as const;

export type Validated<T> = { ok: true; value: T } | { ok: false; error: string };

/**
 * Normaliza a string recortado. Rechaza cualquier tipo que no sea string
 * (objetos, arrays, números).
 *
 * `normalize("NFC")` unifica la representación de los acentos: "México" puede
 * llegar como "é" (U+00E9) o como "e" + acento combinante según el sistema del
 * cliente. Sin esto, la comparación con COUNTRIES falla para un usuario legítimo.
 */
function text(raw: unknown): string | null {
  return typeof raw === "string" ? raw.normalize("NFC").trim() : null;
}

/**
 * Caracteres de control ASCII (incluye CR y LF) salvo el tab. Un salto de
 * línea en un campo de una sola línea nunca es legítimo y sí es el vector
 * clásico de inyección de cabeceras de correo: `nombre` y `empresa` viajan al
 * `Subject` de la notificación y `email` al `Reply-To`.
 */
const CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F]+/g;
/** Igual que CONTROL_RE pero conserva CR/LF: para los campos de texto largo. */
const CONTROL_MULTILINE_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/g;

/** Campo de una línea: colapsa cualquier control (incl. saltos) a un espacio. */
function line(raw: unknown): string | null {
  const v = text(raw);
  return v === null ? null : v.replace(CONTROL_RE, " ").replace(/ {2,}/g, " ").trim();
}

/** Campo de párrafo: conserva saltos de línea, elimina el resto de controles. */
function paragraph(raw: unknown): string | null {
  const v = text(raw);
  return v === null ? null : v.replace(CONTROL_MULTILINE_RE, "").trim();
}

function required(raw: unknown, campo: string, max: number, multiline = false): Validated<string> {
  const v = multiline ? paragraph(raw) : line(raw);
  if (!v) return { ok: false, error: `El campo "${campo}" es obligatorio` };
  if (v.length > max) return { ok: false, error: `El campo "${campo}" excede ${max} caracteres` };
  return { ok: true, value: v };
}

function optional(raw: unknown, campo: string, max: number, multiline = false): Validated<string | null> {
  const v = multiline ? paragraph(raw) : line(raw);
  if (!v) return { ok: true, value: null };
  if (v.length > max) return { ok: false, error: `El campo "${campo}" excede ${max} caracteres` };
  return { ok: true, value: v };
}

function email(raw: unknown): Validated<string> {
  const v = line(raw)?.toLowerCase();
  if (!v) return { ok: false, error: 'El campo "email" es obligatorio' };
  if (v.length > MAX.email) return { ok: false, error: "El correo excede la longitud permitida" };
  if (!EMAIL_RE.test(v)) return { ok: false, error: "El correo no tiene un formato válido" };
  // `EMAIL_RE` admite "/" y el correo se usa como ID de documento en
  // `web_suscriptores/envios/{email}`; una barra partiría la ruta de Firestore.
  if (v.includes("/")) return { ok: false, error: "El correo no tiene un formato válido" };
  return { ok: true, value: v };
}

export interface ContactoInput {
  nombre: string;
  empresa: string;
  rol: string;
  email: string;
  telefono: string | null;
  pais: string;
  mensaje: string | null;
}

/**
 * Valida el cuerpo de `POST /api/contacto`.
 * Devuelve un objeto con exactamente los campos esperados — el input del
 * usuario nunca se propaga por spread hacia Firestore.
 */
export function validateContacto(body: unknown): Validated<ContactoInput> {
  if (!body || typeof body !== "object") return { ok: false, error: "Cuerpo de la petición inválido" };
  const b = body as Record<string, unknown>;

  const nombre = required(b.nombre, "nombre", MAX.nombre);
  if (!nombre.ok) return nombre;

  const empresa = required(b.empresa, "empresa", MAX.empresa);
  if (!empresa.ok) return empresa;

  const rol = required(b.rol, "rol", MAX.rol);
  if (!rol.ok) return rol;

  const mail = email(b.email);
  if (!mail.ok) return mail;

  const telefono = optional(b.telefono, "telefono", MAX.telefono);
  if (!telefono.ok) return telefono;

  const mensaje = optional(b.mensaje, "mensaje", MAX.mensaje, true);
  if (!mensaje.ok) return mensaje;

  // COUNTRIES está en NFC en el fuente y `text()` normaliza la entrada, así que
  // la comparación exacta es segura.
  const pais = text(b.pais);
  if (!pais) return { ok: false, error: 'El campo "pais" es obligatorio' };
  if (!(COUNTRIES as readonly string[]).includes(pais)) {
    return { ok: false, error: "El país seleccionado no es válido" };
  }

  return {
    ok: true,
    value: {
      nombre: nombre.value,
      empresa: empresa.value,
      rol: rol.value,
      email: mail.value,
      telefono: telefono.value,
      pais,
      mensaje: mensaje.value,
    },
  };
}

/** Valida el cuerpo de `POST /api/subscribe`. Devuelve el correo normalizado a minúsculas. */
export function validateSuscripcion(body: unknown): Validated<string> {
  if (!body || typeof body !== "object") return { ok: false, error: "Cuerpo de la petición inválido" };
  return email((body as Record<string, unknown>).email);
}

export interface FrenteCriticoInput {
  nombre: string;
  empresa: string;
  cargo: string | null;
  email: string;
  telefono: string | null;
  pais: string;
  sector: string;
  horizonte: string;
  prioridad: string;
  /** Evidencia de la autorización de contacto (Ley 1581 / Habeas Data). Siempre `true` si el envío es válido. */
  consentimiento: true;
}

/**
 * Valida el cuerpo de `POST /api/frente-critico`.
 *
 * No reutiliza `validateContacto` a propósito: `sector` y `horizonte` son los
 * campos que deciden a quién se deriva el lead y con qué urgencia, así que
 * viajan como campos propios y validados contra listas cerradas. Meterlos
 * dentro de `mensaje` los convertiría en texto libre, imposible de filtrar.
 *
 * Igual que con `pais`: las listas están en NFC en el fuente y `text()`
 * normaliza la entrada, así que la comparación exacta es segura pese a los
 * acentos de "Energía y Minería" y "30 días".
 */
export function validateFrenteCritico(body: unknown): Validated<FrenteCriticoInput> {
  if (!body || typeof body !== "object") return { ok: false, error: "Cuerpo de la petición inválido" };
  const b = body as Record<string, unknown>;

  const nombre = required(b.nombre, "nombre", MAX.nombre);
  if (!nombre.ok) return nombre;

  const empresa = required(b.empresa, "empresa", MAX.empresa);
  if (!empresa.ok) return empresa;

  const cargo = optional(b.cargo, "cargo", MAX.rol);
  if (!cargo.ok) return cargo;

  const mail = email(b.email);
  if (!mail.ok) return mail;

  const telefono = optional(b.telefono, "telefono", MAX.telefono);
  if (!telefono.ok) return telefono;

  const prioridad = required(b.prioridad, "prioridad", MAX.prioridad, true);
  if (!prioridad.ok) return prioridad;

  const pais = text(b.pais);
  if (!pais) return { ok: false, error: 'El campo "pais" es obligatorio' };
  if (!(COUNTRIES as readonly string[]).includes(pais)) {
    return { ok: false, error: "El país seleccionado no es válido" };
  }

  const sector = text(b.sector);
  if (!sector) return { ok: false, error: 'El campo "sector" es obligatorio' };
  if (!(SECTORES as readonly string[]).includes(sector)) {
    return { ok: false, error: "El sector seleccionado no es válido" };
  }

  const horizonte = text(b.horizonte);
  if (!horizonte) return { ok: false, error: 'El campo "horizonte" es obligatorio' };
  if (!(HORIZONTES as readonly string[]).includes(horizonte)) {
    return { ok: false, error: "El horizonte seleccionado no es válido" };
  }

  // El checkbox es obligatorio en el cliente, pero la evidencia legal de la
  // autorización se guarda en el servidor: solo se acepta el booleano `true`.
  if (b.consentimiento !== true) {
    return { ok: false, error: "Necesitamos su autorización para poder contactarle" };
  }

  return {
    ok: true,
    value: {
      nombre: nombre.value,
      empresa: empresa.value,
      cargo: cargo.value,
      email: mail.value,
      telefono: telefono.value,
      pais,
      sector,
      horizonte,
      prioridad: prioridad.value,
      consentimiento: true,
    },
  };
}

/* ── Anti-bots ─────────────────────────────────────────────────────────── */

/**
 * Nombre del campo honeypot. Los formularios lo renderizan oculto (fuera del
 * flujo visual y del orden de tabulación); un humano nunca lo llena, un bot
 * que rellena todo lo que parece un input sí. Se llama `website` a propósito:
 * es el nombre genérico que más suelen completar los bots.
 */
export const HONEYPOT_FIELD = "website";

/** Tiempo mínimo entre que el formulario se muestra y se envía. Nadie llena 7+ campos en menos. */
const MIN_FILL_MS = 3_000;
/** Un `iniciadoEn` más viejo que esto ya no es una sesión de formulario creíble (o es un replay). */
const MAX_FILL_MS = 12 * 60 * 60 * 1000;

export type Antibot = { bot: false } | { bot: true; motivo: string };

/**
 * Heurísticas anti-bots sin fricción para el usuario. Se aplican ANTES de la
 * validación de campos y no revelan nada al cliente: el handler responde el
 * mismo `{ ok: true }` que a un envío legítimo, pero no guarda ni notifica.
 *
 *   · honeypot: cualquier valor no vacío en `website` es un bot.
 *   · tiempo de llenado: `iniciadoEn` (epoch ms que fija el cliente al montar
 *     el formulario) debe estar entre MIN_FILL_MS y MAX_FILL_MS en el pasado.
 *     Un bot que hace POST directo sin cargar la página no lo envía o lo
 *     inventa; los que sí lo envían correctamente quedan para el rate limit
 *     del balanceador.
 */
export function detectBot(body: unknown, now = Date.now()): Antibot {
  if (!body || typeof body !== "object") return { bot: false };
  const b = body as Record<string, unknown>;

  const hp = b[HONEYPOT_FIELD];
  if (typeof hp === "string" ? hp.trim() !== "" : hp !== undefined && hp !== null) {
    return { bot: true, motivo: "honeypot" };
  }

  const iniciadoEn = typeof b.iniciadoEn === "number" ? b.iniciadoEn : Number(b.iniciadoEn);
  if (!Number.isFinite(iniciadoEn)) return { bot: true, motivo: "sin-iniciadoEn" };
  const elapsed = now - iniciadoEn;
  if (elapsed < MIN_FILL_MS) return { bot: true, motivo: `llenado-en-${Math.max(0, elapsed)}ms` };
  if (elapsed > MAX_FILL_MS) return { bot: true, motivo: "iniciadoEn-vencido" };

  return { bot: false };
}
