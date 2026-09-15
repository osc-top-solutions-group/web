import { getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firestore vía Admin SDK — SOLO servidor (Route Handlers / Server Actions).
 *
 * Autenticación por Application Default Credentials:
 *   · Cloud Run  → identidad de sa-web-corporativa@intranet-428417.iam.gserviceaccount.com
 *   · Local      → `gcloud auth application-default login`
 * No se descargan llaves JSON de service account (estándar §2.5).
 *
 * El Admin SDK omite las reglas de seguridad por diseño: la autorización
 * de estos endpoints la hace el propio Route Handler. `firestore.rules`
 * deniega todo acceso desde cliente.
 */

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT ?? "intranet-428417";

/** Base de la colección de formularios (estándar §8.3: `formularios/{modulo}/envios/{docId}`). */
export const FORMULARIOS = "formularios";

/** Módulos que expone el sitio público. El prefijo `web_` los distingue de los formularios internos de la Intranet. */
export const MODULOS = {
  contacto: "web_contacto",
  suscriptores: "web_suscriptores",
} as const;

function app(): App {
  const existing = getApps();
  return existing.length > 0 ? existing[0] : initializeApp({ projectId: PROJECT_ID });
}

let cached: Firestore | undefined;

export function db(): Firestore {
  if (!cached) {
    cached = getFirestore(app());
    // Los campos opcionales se escriben como null explícito; esto es red de seguridad.
    cached.settings({ ignoreUndefinedProperties: true });
  }
  return cached;
}

/** Colección de envíos de un módulo: `formularios/{modulo}/envios`. */
export function envios(modulo: (typeof MODULOS)[keyof typeof MODULOS]) {
  return db().collection(FORMULARIOS).doc(modulo).collection("envios");
}
