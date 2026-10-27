// Trazabilidad del runtime (boletín Node.js oct-2026, CVE-2026-111497):
// deja en Cloud Logging la versión exacta de Node con la que arrancó la revisión.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log(`[runtime] Node ${process.version} (${process.platform}/${process.arch}) · Next standalone`);
  }
}
