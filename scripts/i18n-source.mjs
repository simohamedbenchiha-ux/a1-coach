// Extrait le contenu à traduire (les explications en français de src/data.js), indexé par identifiant stable.
// node scripts/i18n-source.mjs > i18n-source.json   (référence pour traduire)
// Utilisé aussi par les tests pour vérifier que chaque langue est complète.
import { readFileSync } from "node:fs";
import vm from "node:vm";
export function source() {
  const c = {}; vm.createContext(c);
  vm.runInContext(readFileSync(new URL("../src/data.js", import.meta.url), "utf8") + ";this.D={Q,WORDS,SPEAK,FORMS,WRITE,VOC}", c);
  const { Q, WORDS, SPEAK, FORMS, WRITE } = c.D, out = { q: {}, v: {}, sp: {}, fm: [], wr: [] };
  for (const q of Q) out.q[q.id] = [q.fr, q.x];
  for (const w of WORDS) out.v[w.id] = w.f;
  for (const n of Object.keys(SPEAK)) SPEAK[n].items.forEach((it, i) => { out.sp[`${n}_${i}`] = it.fr; });
  for (const f of FORMS) out.fm.push(f.fr);
  for (const w of WRITE) out.wr.push([w.fr, ...w.pts.map(p => p[1])]);
  return out;
}
if (import.meta.url === `file://${process.argv[1]}`) console.log(JSON.stringify(source(), null, 1));
