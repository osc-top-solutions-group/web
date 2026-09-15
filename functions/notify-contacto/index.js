/**
 * notify-web-contacto — Cloud Function (gen2, trigger Eventarc/Firestore).
 *
 * Se dispara al crearse un documento en `formularios/web_contacto/envios/{docId}`
 * y notifica el lead por correo vía Gmail API con delegación de dominio.
 *
 * Seguridad (por qué existe esta función y no envía la web):
 *   · La web pública NO tiene permisos de Gmail; solo escribe el lead en Firestore.
 *   · Esta función corre con una service account dedicada, privada, con el scope
 *     mínimo (`gmail.send`) autorizado por delegación de dominio en Workspace.
 *   · Autenticación sin llaves JSON: el JWT se firma con la API de IAM Credentials
 *     (requiere `roles/iam.serviceAccountTokenCreator` de la SA sobre sí misma).
 *
 * Variables de entorno:
 *   · SA_EMAIL      service account delegada (la misma con la que corre la función)
 *   · MAIL_SENDER   buzón de Workspace que figura como remitente (impersonado)
 *   · NOTIFY_TO     destinatario de los leads
 */

const functions = require("@google-cloud/functions-framework");
const { IAMCredentialsClient } = require("@google-cloud/iam-credentials");
const { initializeApp, getApps } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const SA_EMAIL = process.env.SA_EMAIL || "sa-notificaciones-web@intranet-428417.iam.gserviceaccount.com";
const MAIL_SENDER = process.env.MAIL_SENDER || "soporte.sistemas@osctopsolutionsgroup.com";
const NOTIFY_TO = process.env.NOTIFY_TO || "alexander.ayala@osctopsolutionsgroup.com";
const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";

const iamClient = new IAMCredentialsClient();

function db() {
  if (getApps().length === 0) initializeApp();
  return getFirestore();
}

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

/** Headers de correo deben ser ASCII (RFC 2047); sin esto las tildes llegan corruptas. */
function encodeHeader(text = "") {
  if (/^[\x00-\x7F]*$/.test(text)) return text;
  return `=?UTF-8?B?${Buffer.from(text, "utf-8").toString("base64")}?=`;
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
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;color:#0F172A;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:6px 12px;color:#475569">${value ? esc(value) : "—"}</td>
  </tr>`;
}

function leadHtml(lead, docId) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px">
      <h2 style="color:#0F172A;margin-bottom:4px">Nuevo lead — formulario de contacto</h2>
      <p style="color:#475569;margin-top:0">Recibido desde la web corporativa (ref. Firestore: ${esc(docId)}).</p>
      <table style="border-collapse:collapse;background:#F8FAFC;border-radius:8px;width:100%">
        ${row("Nombre", lead.nombre)}
        ${row("Empresa", lead.empresa)}
        ${row("Rol / Cargo", lead.rol)}
        ${row("Email", lead.email)}
        ${row("Teléfono", lead.telefono)}
        ${row("País", lead.pais)}
        ${row("Mensaje", lead.mensaje)}
      </table>
      <p style="color:#94A3B8;font-size:12px">Puede responder directamente a este correo: el Reply-To es el email del contacto.</p>
    </div>`;
}

async function sendMail({ to, replyTo, subject, html }) {
  const accessToken = await workspaceAccessToken();
  const lines = [
    `To: ${to}`,
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

functions.cloudEvent("notifyContacto", async (cloudEvent) => {
  // Eventarc expone la ruta del documento como atributo del CloudEvent.
  const docPath = cloudEvent.document;
  if (!docPath) throw new Error("CloudEvent sin atributo 'document'");

  const ref = db().doc(docPath);
  const snap = await ref.get();
  if (!snap.exists) {
    console.warn(`[notify] el documento ${docPath} ya no existe; nada que notificar`);
    return;
  }
  const lead = snap.data();

  // Eventarc puede reintentar la entrega: si ya se notificó, no duplicar el correo.
  if (lead.notificadoAt) {
    console.log(`[notify] ${docPath} ya notificado; se omite`);
    return;
  }

  await sendMail({
    to: NOTIFY_TO,
    replyTo: lead.email,
    subject: `Nuevo contacto web: ${lead.nombre} — ${lead.empresa}`,
    html: leadHtml(lead, snap.id),
  });

  await ref.update({ notificadoAt: FieldValue.serverTimestamp() });
  console.log(`[notify] lead ${snap.id} notificado a ${NOTIFY_TO}`);
});
