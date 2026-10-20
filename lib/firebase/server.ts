import { getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { ENTORNO } from "@/lib/entorno";

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

/**
 * Módulos que expone el sitio público. El prefijo `web_` los distingue de los
 * formularios internos de la Intranet.
 *
 * En QA llevan el sufijo `_qa` (`web_contacto_qa`, ...): la base `(default)`
 * es la misma que producción (y que la Intranet), así que la separación de
 * datos es por módulo, igual que la raíz `sgc_qa` del SGC. Efecto deliberado:
 * las Cloud Functions `notify-web-*` y el barrido `resend-pending-leads` solo
 * escuchan los módulos de producción, de modo que un envío de prueba nunca
 * dispara un correo real. Para probar la notificación, apuntar un despliegue
 * de la función al módulo `_qa` (ver README § Ambientes).
 */
const SUFIJO_MODULO = ENTORNO === "prod" ? "" : `_${ENTORNO}`;

export const MODULOS = {
  contacto: `web_contacto${SUFIJO_MODULO}`,
  suscriptores: `web_suscriptores${SUFIJO_MODULO}`,
  frenteCritico: `web_frente_critico${SUFIJO_MODULO}`,
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
export function envios(modulo: string) {
  return db().collection(FORMULARIOS).doc(modulo).collection("envios");
}
