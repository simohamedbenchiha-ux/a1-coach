// Assemble www/ pour l'appli Android / iOS (Capacitor) à partir du site :
// - sans la partie PWA (l'appli n'a pas besoin de service worker) ;
// - polices, Motion et jsPDF pris dans vendor/ au lieu des CDN (aucun serveur contacté) ;
// - capacitor.js ajouté avant les scripts de l'appli (accès aux plugins natifs).
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from "node:fs";
const root = new URL("../", import.meta.url), www = new URL("www/", root);
const need = p => { if (!existsSync(new URL(p, root))) throw new Error(`${p} manquant : lance d'abord ${p.startsWith("vendor") ? "node scripts/vendor.mjs" : "npm install"}`); };
["vendor/fonts.css", "vendor/motion.js", "vendor/jspdf.umd.min.js", "node_modules/@capacitor/core/dist/capacitor.js"].forEach(need);

let html = readFileSync(new URL("index.html", root), "utf8");
const swap = (re, to, what) => { if (!re.test(html)) throw new Error("introuvable dans index.html : " + what); html = html.replace(re, to); };
swap(/<!--pwa[\s\S]*?<!--\/pwa-->\n?/, "", "bloc PWA");
swap(/<link rel="preconnect"[^\n]*\n/, "", "preconnect");
swap(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*">/, '<link rel="stylesheet" href="vendor/fonts.css">', "Google Fonts");
swap(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/motion@[^"]*"><\/script>/, '<script src="vendor/motion.js"></script>', "Motion");
swap(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/jspdf\/[^"]*"><\/script>/, '<script src="vendor/jspdf.umd.min.js"></script>', "jsPDF");
swap(/<script src="src\/data\.js"><\/script>/, '<script src="vendor/capacitor.js"></script>\n<script src="src/data.js"></script>', "data.js");
if (/https?:\/\/(fonts\.googleapis|cdn\.jsdelivr|cdnjs\.cloudflare)/.test(html)) throw new Error("un lien CDN reste dans www/index.html");

rmSync(www, { recursive: true, force: true });
mkdirSync(new URL("src/", www), { recursive: true });
writeFileSync(new URL("index.html", www), html);
for (const f of ["styles.css", "data.js", "app.js", "pdf.js"]) cpSync(new URL("src/" + f, root), new URL("src/" + f, www));
cpSync(new URL("vendor/", root), new URL("vendor/", www), { recursive: true });
cpSync(new URL("node_modules/@capacitor/core/dist/capacitor.js", root), new URL("vendor/capacitor.js", www));
cpSync(new URL("privacy.html", root), new URL("privacy.html", www));
console.log("www/ prêt pour Capacitor");
