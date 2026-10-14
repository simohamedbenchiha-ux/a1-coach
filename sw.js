/* Mode hors ligne (PWA). Actif seulement quand l'appli est servie en https (ou localhost) :
   pas dans l'artifact claude.ai, ni en ouvrant index.html comme fichier local.
   Stratégie « stale-while-revalidate » : réponse immédiate depuis le cache, mise à jour en arrière-plan,
   donc une modification des fichiers arrive au chargement suivant sans rien changer ici.
   Augmenter VERSION seulement quand la liste SHELL ou CDN change. */
const VERSION = "a1coach-v3";
const SHELL = ["./", "index.html", "src/styles.css", "src/data.js", "src/levels.js", "src/img.js", "src/i18n.js", "src/lang/en.js", "src/lang/ar.js", "src/lang/ary.js",
  "src/lang/es.js", "src/lang/it.js", "src/config.js", "src/auth.js", "src/app.js", "src/pdf.js",
  "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
const CDN = ["https://cdn.jsdelivr.net/npm/motion@12.23.12/dist/motion.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Space+Grotesk:wght@500;600;700&family=Atkinson+Hyperlegible:wght@400;700&family=Noto+Kufi+Arabic:wght@700;800&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"];
const CDN_HOSTS = /^(cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;

self.addEventListener("install", e => e.waitUntil((async () => {
  const c = await caches.open(VERSION);
  await c.addAll(SHELL);
  // les CDN répondent parfois en « opaque » : addAll les refuserait, on les range un par un
  await Promise.all(CDN.map(u => fetch(u, { mode: "no-cors" }).then(r => c.put(u, r)).catch(() => {})));
  await self.skipWaiting();
})()));

self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url), local = url.origin === location.origin;
  if (!local && !CDN_HOSTS.test(url.hostname)) return;
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    const hit = await c.match(req, { ignoreSearch: local }) || (req.mode === "navigate" ? await c.match("index.html") : undefined);
    const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit || Response.error());
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  })());
});
