// npm test : construit le fichier unique, puis lance chaque suite dans Chromium (Playwright).
// npm test -- voice native   → seulement ces suites.
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist/a1-coach.html"), out = mkdtempSync(join(tmpdir(), "a1-tests-"));
execFileSync("node", [join(root, "scripts/build.mjs")], { stdio: "inherit" });

const suites = [
  ["backup", "accueil, sauvegarde/restauration (dont fichier piégé), PDF", [dist, out]],
  ["srs_chart", "répétition espacée, courbe de progression", [dist, out]],
  ["voice", "dictée web, micro refusé, mode clavier iPhone", [dist, out]],
  ["native", "couche native simulée : dictée, voix, rappel, retour, partage", [dist, out]],
  ["pwa", "hors ligne (service worker sur localhost)", [root, dist]],
  ["audit", "mots allemands jamais coupés, aucune erreur JS", [dist, out]],
];
const only = process.argv.slice(2);
let bad = 0;
for (const [name, what, args] of suites) {
  if (only.length && !only.includes(name)) continue;
  const r = spawnSync("node", [join(root, "tests", name + ".mjs"), ...args], { encoding: "utf8", timeout: 600000 });
  const log = (r.stdout || "") + (r.stderr || "");
  const ok = r.status === 0 && /TOUT PASSE/.test(log);
  console.log(`${ok ? "✓" : "✗"} ${name.padEnd(10)} ${what}`);
  if (!ok) { bad++; console.log(log.split("\n").filter(l => /FAIL|Error|ÉCHEC/.test(l)).slice(0, 20).map(l => "    " + l).join("\n")); }
}
console.log(bad ? `\n${bad} suite(s) en échec` : "\nToutes les suites passent");
process.exit(bad ? 1 : 0);
