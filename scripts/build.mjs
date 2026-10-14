// Rassemble index.html + src/* en un seul fichier autonome : dist/a1-coach.html
// (format attendu pour le publier comme artifact sur claude.ai).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
let html = read("index.html");
// la version installable (manifeste, icônes, service worker) n'a pas de sens dans le fichier unique
html = html.replace(/<!--pwa[\s\S]*?<!--\/pwa-->\n?/, "");
html = html.replace('<link rel="stylesheet" href="src/styles.css">', () => `<style>\n${read("src/styles.css")}</style>`);
// tous les scripts locaux (données, langues, appli, PDF), dans l'ordre de index.html
// sans comptes : l'artifact claude.ai n'a pas d'écran de connexion (config.js vidé)
html = html.replace(/<script src="(src\/[^"]+\.js)"><\/script>/g, (_, f) => `<script>\n${f === "src/config.js" ? 'const AUTH_CFG={url:"",anon:"",inApp:false};\n' : read(f)}</script>`);
mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("../dist/a1-coach.html", import.meta.url), html);
console.log("dist/a1-coach.html écrit (" + Math.round(html.length / 1024) + " Ko)");
