/*
 * Bootstrap de Google Tag Manager + configuración de gtag (GA4).
 * Se sirve como archivo externo del propio dominio para quedar cubierto por
 * 'self' en la CSP (script-src), evitando scripts inline y hashes frágiles.
 */

/* Google Tag Manager */
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-WD44GWZQ");

/* Google Analytics 4 */
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-WYRMMQVMJZ");
