// Rassemble index.html + src/* en un seul fichier autonome : dist/a1-coach.html
// (format attendu pour le publier comme artifact sur claude.ai).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
let html = read("index.html");
// la version installable (manifeste, icônes, service worker) n'a pas de sens dans le fichier unique
html = html.replace(/<!--pwa[\s\S]*?<!--\/pwa-->\n?/, "");
html = html.replace('<link rel="stylesheet" href="src/styles.css">', () => `<style>\n${read("src/styles.css")}</style>`);
for (const f of ["data.js", "app.js", "pdf.js"]) {
  html = html.replace(`<script src="src/${f}"></script>`, () => `<script>\n${read("src/" + f)}</script>`);
}
mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("../dist/a1-coach.html", import.meta.url), html);
console.log("dist/a1-coach.html écrit (" + Math.round(html.length / 1024) + " Ko)");
