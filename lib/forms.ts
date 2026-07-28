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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tope de longitud por campo. `email` usa el máximo de la RFC 5321. */
const MAX = {
  nombre: 120,
  empresa: 160,
  rol: 120,
  email: 254,
  telefono: 40,
  mensaje: 4000,
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

function required(raw: unknown, campo: string, max: number): Validated<string> {
  const v = text(raw);
  if (!v) return { ok: false, error: `El campo "${campo}" es obligatorio` };
  if (v.length > max) return { ok: false, error: `El campo "${campo}" excede ${max} caracteres` };
  return { ok: true, value: v };
}

function optional(raw: unknown, campo: string, max: number): Validated<string | null> {
  const v = text(raw);
  if (!v) return { ok: true, value: null };
  if (v.length > max) return { ok: false, error: `El campo "${campo}" excede ${max} caracteres` };
  return { ok: true, value: v };
}

function email(raw: unknown): Validated<string> {
  const v = text(raw)?.toLowerCase();
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

  const mensaje = optional(b.mensaje, "mensaje", MAX.mensaje);
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
