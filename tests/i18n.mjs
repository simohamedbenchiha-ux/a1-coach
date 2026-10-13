// Traductions : chaque langue a toutes les clés d'interface du français (même type : texte ou fonction),
// tout le contenu (questions, mots, cartes d'oral, formulaires, e-mails), aucun texte vide,
// la bonne écriture (arabe pour ar / ary, latine pour ary-Latn), et les fonctions marchent pour n = 0, 1, 2, 3, 11.
// node tests/i18n.mjs            → toutes les langues
// node tests/i18n.mjs ar ary     → seulement celles-ci
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import { source } from "../scripts/i18n-source.mjs";

const root = new URL("../", import.meta.url), src = source();
const ctx = {}; vm.createContext(ctx);
vm.runInContext(readFileSync(new URL("src/i18n.js", root), "utf8") + ";this.X={LANGS,I18N}", ctx);
const { LANGS } = ctx.X;
const ids = LANGS.map(l => l.id).filter(id => id !== "fr");
const only = process.argv.slice(2), todo = only.length ? only : ids;
for (const id of todo) {
  const f = new URL(`src/lang/${id}.js`, root);
  if (!existsSync(f)) { console.log(`FAIL ${id} : src/lang/${id}.js manquant`); continue; }
  vm.runInContext(readFileSync(f, "utf8"), ctx);
}
const { I18N } = ctx.X, FR = I18N.fr.ui;
const AR = /[؀-ۿ]/;
const VARS = n => ({ n, m: n, q: n, v: n, d: "12.10.2026", stats: "…", list: "Hören, Lesen", h: 19, app: true,
  s: "Hören", p: 42, w: 50, need: 10, f: 4 });
let fails = 0;
const fail = (id, msg) => { fails++; console.log(`FAIL ${id} : ${msg}`); };

// identifiants uniques dans data.js (la progression est indexée dessus)
const qids = Object.keys(src.q);
const dataSrc = readFileSync(new URL("src/data.js", root), "utf8");
const all = [...dataSrc.matchAll(/\{id:"([^"]+)"/g)].map(m => m[1]);
const dup = all.filter((x, i) => all.indexOf(x) !== i);
if (dup.length) fail("data", "identifiants en double : " + dup.join(", "));

for (const id of todo) {
  const P = I18N[id], info = LANGS.find(l => l.id === id);
  if (!P) { fail(id, "I18N." + id + " absent"); continue; }
  let n0 = fails;
  const texts = [];
  for (const k of Object.keys(FR)) {
    const v = P.ui[k];
    if (v === undefined) { fail(id, `ui « ${k} » manquante`); continue; }
    if (typeof v !== typeof FR[k]) { fail(id, `ui « ${k} » : ${typeof FR[k]} attendu`); continue; }
    if (typeof v === "function") {
      for (const n of [0, 1, 2, 3, 11]) {
        let r; try { r = v(VARS(n)); } catch (e) { fail(id, `ui « ${k} »(n=${n}) : ${e.message}`); break; }
        if (typeof r !== "string" || !r.trim() || /undefined|NaN|\[object/.test(r)) { fail(id, `ui « ${k} »(n=${n}) → ${JSON.stringify(r)}`); break; }
        texts.push(r);
      }
    } else texts.push(v);
  }
  for (const k of Object.keys(P.ui)) if (!(k in FR)) fail(id, `ui « ${k} » inconnue en français`);
  for (const q of qids) {
    const x = P.q && P.q[q];
    if (!Array.isArray(x) || x.length !== 2) { fail(id, `question ${q} manquante ou mal formée`); continue; }
    texts.push(...x);
  }
  for (const k of Object.keys(P.q || {})) if (!(k in src.q)) fail(id, `question ${k} inconnue`);
  for (const k of Object.keys(src.v)) { if (!P.v || !P.v[k]) fail(id, `mot ${k} manquant`); else texts.push(P.v[k]); }
  for (const k of Object.keys(P.v || {})) if (!(k in src.v)) fail(id, `mot ${k} inconnu`);
  for (const k of Object.keys(src.sp)) { if (!P.sp || !P.sp[k]) fail(id, `carte d'oral ${k} manquante`); else texts.push(P.sp[k]); }
  if (!P.fm || P.fm.length !== src.fm.length) fail(id, `formulaires : ${src.fm.length} attendus`); else texts.push(...P.fm);
  if (!P.wr || P.wr.length !== src.wr.length) fail(id, `e-mails : ${src.wr.length} attendus`);
  else P.wr.forEach((w, i) => { if (w.length !== src.wr[i].length) fail(id, `e-mail ${i} : ${src.wr[i].length} éléments attendus`); texts.push(...w); });
  const empty = texts.filter(s => typeof s !== "string" || !s.trim());
  if (empty.length) fail(id, `${empty.length} texte(s) vide(s)`);
  // écriture : l'arabe et la Darija en lettres arabes doivent être en arabe ; l'arabizi jamais
  const prose = texts.filter(s => typeof s === "string" && /[a-zA-Z؀-ۿ]{4}/.test(s));
  if (info.dir === "rtl") {
    const latin = prose.filter(s => !AR.test(s));
    if (latin.length > prose.length * 0.08) fail(id, `${latin.length} textes sans écriture arabe, ex. ${JSON.stringify(latin.slice(0, 3))}`);
  } else {
    const ar = prose.filter(s => AR.test(s));
    if (ar.length) fail(id, `${ar.length} textes en écriture arabe, ex. ${JSON.stringify(ar.slice(0, 2))}`);
  }
  if (!String(P.ui["help.btn"] || "").includes("Hilfe")) fail(id, "help.btn doit garder le mot Hilfe");
  console.log(`${fails > n0 ? "FAIL" : "ok  "} ${id} : ${Object.keys(P.ui).length} clés, ${Object.keys(P.q || {}).length} questions, ${Object.keys(P.v || {}).length} mots`);
}
console.log(fails ? `${fails} ÉCHEC(S)` : "TOUT PASSE");
process.exit(fails ? 1 : 0);
