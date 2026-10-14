// Télécharge une fois les fichiers tiers dans vendor/ (commités) : l'appli Android / iOS les embarque,
// ne contacte aucun serveur et marche hors ligne dès le premier lancement.
// À relancer seulement si index.html change de version de Motion, de jsPDF ou de polices (ou auth.js de Supabase).
import { mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");
const pick = (re, what) => { const m = html.match(re); if (!m) throw new Error("introuvable dans index.html : " + what); return m[1]; };
const MOTION = pick(/<script src="(https:\/\/cdn\.jsdelivr\.net\/npm\/motion@[^"]+)"/, "Motion");
const JSPDF = pick(/<script src="(https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/jspdf\/[^"]+)"/, "jsPDF");
const SUPABASE = readFileSync(new URL("src/auth.js", root), "utf8").match(/const SB_URL="([^"]+)"/)[1]; // comptes (auth.js)
const FONTS = pick(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/, "Google Fonts").replace(/&amp;/g, "&");
// navigateur récent : Google Fonts répond en woff2 découpé par alphabet
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
const get = async (url, bin) => { const r = await fetch(url, { headers: { "user-agent": UA } }); if (!r.ok) throw new Error(`${r.status} ${url}`); return bin ? Buffer.from(await r.arrayBuffer()) : r.text(); };

const out = new URL("vendor/", root);
rmSync(out, { recursive: true, force: true });
mkdirSync(new URL("fonts/", out), { recursive: true });
writeFileSync(new URL("motion.js", out), await get(MOTION));
writeFileSync(new URL("jspdf.umd.min.js", out), await get(JSPDF));
writeFileSync(new URL("supabase.js", out), await get(SUPABASE));

// alphabets gardés : latin et latin-ext (allemand, français…) et arabe (arabe, Darija), pas le cyrillique ni le vietnamien
const css = await get(FONTS);
const blocks = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face\s*{[^}]+})/g)].filter(m => ["latin", "latin-ext", "arabic"].includes(m[1]));
let local = "/* Polices embarquées (scripts/vendor.mjs) : " + new Date().toISOString().slice(0, 10) + " */\n";
const saved = new Map(); // polices variables : plusieurs graisses partagent le même fichier
for (const [, subset, face] of blocks) {
  const fam = face.match(/font-family: '([^']+)'/)[1].replace(/\s+/g, "");
  const url = face.match(/url\((https:[^)]+\.woff2)\)/)[1];
  if (!saved.has(url)) {
    const w = face.match(/font-weight: ([\d ]+);/)[1].trim().split(/\s+/)[0];
    const name = `${fam}-${subset}-${w}.woff2`;
    writeFileSync(new URL("fonts/" + name, out), await get(url, true));
    saved.set(url, name);
  }
  local += `/* ${subset} */\n` + face.replace(url, "fonts/" + saved.get(url)) + "\n";
}
writeFileSync(new URL("fonts.css", out), local);
console.log(`vendor/ : Motion, jsPDF, Supabase, ${saved.size} fichiers de police pour ${blocks.length} styles`);
