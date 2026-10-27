console.log(`[runtime] Node ${process.version} (${process.platform}/${process.arch})`); // trazabilidad CVE-2026-111497
/**
 * notify-web-leads — notificación por correo de los leads de la web pública.
 *
 * Un solo código fuente, tres despliegues (ver deploy.ps1):
 *
 *   · notify-web-contacto         trigger Firestore  formularios/web_contacto/envios/{docId}
 *   · notify-web-frente-critico   trigger Firestore  formularios/web_frente_critico/envios/{docId}
 *   · resend-pending-leads        HTTP (Cloud Scheduler cada 10 min): barre los
 *                                 leads con `notificado == false` y reintenta.
 *
 * Por qué tres y no un trigger comodín `formularios/{modulo}/envios/{docId}`:
 * la colección `formularios` la comparten siete módulos internos de la
 * Intranet; el comodín dispararía esta función por cada envío de ellos.
 *
 * Garantía de entrega ("SIEMPRE notificar"), en capas:
 *   1. El trigger envía en segundos. Si falla, lanza → Eventarc reintenta
 *      (los triggers se despliegan con --retry) con backoff hasta 24 h.
 *   2. El barrido cada 10 min recoge lo que el trigger no logró (bug, cuota
 *      de Gmail agotada, incidente de Eventarc) y lo reintenta hasta lograrlo.
 *   3. Cada intento fallido queda en el documento (`notificacionError`,
 *      `notificacionIntentos`) para poder investigar.
 * Idempotencia: antes de enviar se "reclama" el documento en una transacción
 * (`notificado`, `notificandoDesde`), así trigger y barrido no duplican correo.
 *
 * Seguridad (por qué existe esta función y no envía la web):
 *   · La web pública NO tiene permisos de Gmail; solo escribe el lead en Firestore.
 *   · Esta función corre con una service account dedicada, privada, con el scope
 *     mínimo (`gmail.send`) autorizado por delegación de dominio en Workspace.
 *   · Autenticación sin llaves JSON: el JWT se firma con la API de IAM Credentials
 *     (requiere `roles/iam.serviceAccountTokenCreator` de la SA sobre sí misma).
 *   · Las cabeceras del correo se construyen solo con valores saneados: sin
 *     CR/LF (inyección de cabeceras) y el Reply-To solo si es un correo válido.
 *
 * Variables de entorno:
 *   · SA_EMAIL      service account delegada (la misma con la que corre la función)
 *   · MAIL_SENDER   buzón de Workspace que figura como remitente (impersonado)
 *   · NOTIFY_TO     destinatario por defecto de los leads
 *   · NOTIFY_TO_<MODULO>  destinatario específico, p. ej. NOTIFY_TO_WEB_FRENTE_CRITICO
 */

const functions = require("@google-cloud/functions-framework");
const { IAMCredentialsClient } = require("@google-cloud/iam-credentials");
const { initializeApp, getApps } = require("firebase-admin/app");
const { getFirestore, FieldValue, Timestamp } = require("firebase-admin/firestore");

const SA_EMAIL = process.env.SA_EMAIL || "sa-notificaciones-web@intranet-428417.iam.gserviceaccount.com";
const MAIL_SENDER = process.env.MAIL_SENDER || "soporte.sistemas@osctopsolutionsgroup.com";
const NOTIFY_TO = process.env.NOTIFY_TO || "alexander.ayala@osctopsolutionsgroup.com";
const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";

/** Colección raíz de formularios (estándar §8.3: `formularios/{modulo}/envios/{docId}`). */
const FORMULARIOS = "formularios";

/** Edad mínima de un lead para que el barrido lo tome: deja que el trigger actúe primero. */
const SWEEP_MIN_AGE_MS = 5 * 60 * 1000;
/** Un reclamo (`notificandoDesde`) más viejo que esto se considera abandonado y se puede volver a intentar. */
const CLAIM_TTL_MS = 2 * 60 * 1000;
/** Tope de leads por ejecución del barrido. */
const SWEEP_LIMIT = 50;

const iamClient = new IAMCredentialsClient();

function db() {
  if (getApps().length === 0) initializeApp();
  return getFirestore();
}

/* ── Plantillas por módulo ─────────────────────────────────────────────── */

/**
 * Qué se notifica de cada módulo público. Agregar un formulario nuevo a la
 * web = agregar una entrada aquí + un trigger en deploy.ps1.
 */
const MODULOS = {
  web_contacto: {
    titulo: "Nuevo lead — formulario de contacto",
    origen: "la web corporativa",
    subject: (l) => `Nuevo contacto web: ${l.nombre} — ${l.empresa}`,
    filas: (l) => [
      ["Nombre", l.nombre],
      ["Empresa", l.empresa],
      ["Rol / Cargo", l.rol],
      ["Email", l.email],
      ["Teléfono", l.telefono],
      ["País", l.pais],
      ["Mensaje", l.mensaje],
    ],
  },
  web_frente_critico: {
    titulo: "Nuevo lead — Diagnóstico de Prioridades Operativas (/frente-critico)",
    origen: "la landing /frente-critico (compromiso: respuesta técnica en 48 h hábiles)",
    subject: (l) => `Lead Frente Crítico [${l.sector} · ${l.horizonte}]: ${l.nombre} — ${l.empresa}`,
    filas: (l) => [
      ["Nombre", l.nombre],
      ["Empresa", l.empresa],
      ["Cargo", l.cargo],
      ["Email", l.email],
      ["Teléfono", l.telefono],
      ["País", l.pais],
      ["Sector", l.sector],
      ["Horizonte de atención", l.horizonte],
      ["Prioridad más crítica", l.prioridad],
      ["Autorización de contacto", l.consentimiento === true ? "Sí" : "No registrada"],
    ],
  },
};

/** `formularios/<modulo>/envios/<docId>` → `<modulo>`; null si la ruta no tiene esa forma. */
function moduloDe(docPath) {
  const parts = String(docPath).split("/");
  return parts.length === 4 && parts[0] === FORMULARIOS && parts[2] === "envios" ? parts[1] : null;
}

function destinatario(modulo) {
  return process.env[`NOTIFY_TO_${modulo.toUpperCase()}`] || NOTIFY_TO;
}

/* ── Gmail ─────────────────────────────────────────────────────────────── */

/** Access token de Workspace impersonando a MAIL_SENDER, con scope mínimo gmail.send. */
async function workspaceAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({
    iss: SA_EMAIL,
    sub: MAIL_SENDER,
    scope: GMAIL_SEND_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });

  const [signed] = await iamClient.signJwt({
    name: `projects/-/serviceAccounts/${SA_EMAIL}`,
    payload,
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signed.signedJwt,
    }),
  });
  if (!res.ok) throw new Error(`Google OAuth rechazó la petición: ${await res.text()}`);
  return (await res.json()).access_token;
}

/**
 * Valor seguro para una cabecera: sin caracteres de control (CR/LF incluidos).
 * La web ya los filtra, pero la cabecera es la última línea de defensa y este
 * código también procesa documentos que no vinieron de la web.
 */
function headerSafe(text = "") {
  return String(text).replace(/[\x00-\x1F\x7F]+/g, " ").trim();
}

/** Headers de correo deben ser ASCII (RFC 2047); sin esto las tildes llegan corruptas. */
function encodeHeader(text = "") {
  const safe = headerSafe(text);
  if (/^[\x00-\x7F]*$/.test(safe)) return safe;
  return `=?UTF-8?B?${Buffer.from(safe, "utf-8").toString("base64")}?=`;
}

/** Solo se pone Reply-To si el valor tiene forma de un único correo. */
const EMAIL_RE = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;
function replyToSafe(email) {
  const v = headerSafe(email).toLowerCase();
  return EMAIL_RE.test(v) ? v : null;
}

function toBase64Url(str) {
  return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function esc(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  const html = value ? esc(value).replace(/\r?\n/g, "<br>") : "—";
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;color:#0F172A;white-space:nowrap;vertical-align:top">${esc(label)}</td>
    <td style="padding:6px 12px;color:#475569">${html}</td>
  </tr>`;
}

function leadHtml(plantilla, lead, docId) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px">
      <h2 style="color:#0F172A;margin-bottom:4px">${esc(plantilla.titulo)}</h2>
      <p style="color:#475569;margin-top:0">Recibido desde ${esc(plantilla.origen)} (ref. Firestore: ${esc(docId)}).</p>
      <table style="border-collapse:collapse;background:#F8FAFC;border-radius:8px;width:100%">
        ${plantilla.filas(lead).map(([label, value]) => row(label, value)).join("")}
      </table>
      <p style="color:#94A3B8;font-size:12px">Puede responder directamente a este correo: el Reply-To es el email del contacto.</p>
    </div>`;
}

async function sendMail({ to, replyTo, subject, html }) {
  const accessToken = await workspaceAccessToken();
  const lines = [
    `To: ${headerSafe(to)}`,
    `From: "Web OSC" <${MAIL_SENDER}>`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ].filter((l) => l !== null);

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: toBase64Url(lines.join("\n")) }),
  });
  if (!res.ok) throw new Error(`Gmail API respondió ${res.status}: ${await res.text()}`);
}

/* ── Núcleo: notificar un documento exactamente una vez ───────────────── */

/**
 * Reclama el documento en una transacción. Devuelve los datos del lead si
 * este proceso debe enviarlo, o null si ya se notificó o alguien lo está
 * enviando ahora mismo (reclamo vigente).
 */
async function reclamar(ref) {
  return db().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return null;
    const d = snap.data();
    if (d.notificado === true || d.notificadoAt) return null;
    const desde = d.notificandoDesde instanceof Timestamp ? d.notificandoDesde.toMillis() : 0;
    if (desde && Date.now() - desde < CLAIM_TTL_MS) return null;
    tx.update(ref, { notificandoDesde: FieldValue.serverTimestamp() });
    return d;
  });
}

/**
 * Notifica el documento `docPath`. Devuelve "enviado" | "omitido".
 * Lanza si el envío falla, dejando el error registrado en el documento para
 * que el reintento (Eventarc o barrido) lo vuelva a tomar.
 */
async function notificarDocumento(docPath, { via }) {
  const modulo = moduloDe(docPath);
  const plantilla = modulo && MODULOS[modulo];
  if (!plantilla) {
    console.warn(`[notify] ${docPath}: módulo desconocido, se omite`);
    return "omitido";
  }

  const ref = db().doc(docPath);
  const lead = await reclamar(ref);
  if (!lead) {
    console.log(`[notify] ${docPath} ya notificado o en curso; se omite (${via})`);
    return "omitido";
  }

  const to = destinatario(modulo);
  try {
    await sendMail({
      to,
      replyTo: replyToSafe(lead.email),
      subject: plantilla.subject(lead),
      html: leadHtml(plantilla, lead, ref.id),
    });
  } catch (err) {
    // Se libera el reclamo y se deja rastro; el reintento lo volverá a tomar.
    await ref.update({
      notificandoDesde: FieldValue.delete(),
      notificacionIntentos: FieldValue.increment(1),
      notificacionError: String(err && err.message ? err.message : err).slice(0, 1000),
      notificacionErrorAt: FieldValue.serverTimestamp(),
    });
    throw err;
  }

  await ref.update({
    notificado: true,
    notificadoAt: FieldValue.serverTimestamp(),
    notificadoA: to,
    notificadoVia: via,
    notificandoDesde: FieldValue.delete(),
    notificacionError: FieldValue.delete(),
  });
  console.log(`[notify] lead ${docPath} notificado a ${to} (${via})`);
  return "enviado";
}

/* ── Entrypoint 1: trigger de Firestore (uno por módulo) ──────────────── */

functions.cloudEvent("notifyLead", async (cloudEvent) => {
  // Eventarc expone la ruta del documento como atributo del CloudEvent.
  const docPath = cloudEvent.document;
  if (!docPath) throw new Error("CloudEvent sin atributo 'document'");
  await notificarDocumento(docPath, { via: "trigger" });
});

/* ── Entrypoint 2: barrido de pendientes (Cloud Scheduler → HTTP) ─────── */

/**
 * GET/POST /  → reintenta todos los leads con `notificado == false` de más
 *               de SWEEP_MIN_AGE_MS de antigüedad.
 * GET/POST /?doc=formularios/web_x/envios/abc → fuerza uno concreto (útil
 *               para un lead antiguo que no tenga el campo `notificado`).
 *
 * La función se despliega SIN acceso anónimo: la invoca Cloud Scheduler con
 * un token OIDC de la misma service account (IAM run.invoker).
 */
functions.http("resendPendingLeads", async (req, res) => {
  const forzado = typeof req.query.doc === "string" ? req.query.doc : null;
  const resultado = { enviados: 0, omitidos: 0, fallidos: [] };

  const intentar = async (docPath) => {
    try {
      const r = await notificarDocumento(docPath, { via: "barrido" });
      resultado[r === "enviado" ? "enviados" : "omitidos"]++;
    } catch (err) {
      console.error(`[barrido] ${docPath}: ${err.message}`);
      resultado.fallidos.push(docPath);
    }
  };

  if (forzado) {
    if (!moduloDe(forzado)) {
      res.status(400).json({ error: "doc debe tener la forma formularios/<modulo>/envios/<id>" });
      return;
    }
    await intentar(forzado);
    res.json(resultado);
    return;
  }

  const limite = Timestamp.fromMillis(Date.now() - SWEEP_MIN_AGE_MS);
  for (const modulo of Object.keys(MODULOS)) {
    // Un solo campo en el where: no necesita índice compuesto. La edad se filtra en código.
    const snap = await db()
      .collection(FORMULARIOS).doc(modulo).collection("envios")
      .where("notificado", "==", false)
      .limit(SWEEP_LIMIT)
      .get();
    for (const doc of snap.docs) {
      const createdAt = doc.get("createdAt");
      if (createdAt instanceof Timestamp && createdAt.toMillis() > limite.toMillis()) continue;
      await intentar(doc.ref.path);
    }
  }

  console.log(`[barrido] ${JSON.stringify(resultado)}`);
  // 500 si algo falló: así el job de Scheduler queda en rojo y alerta.
  res.status(resultado.fallidos.length ? 500 : 200).json(resultado);
});
