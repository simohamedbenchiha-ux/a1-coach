// Chaque langue dans le navigateur : sens d'écriture, aucune clé non traduite visible, les 6 onglets,
// un examen complet jusqu'au résultat, le sélecteur de niveau (A1 actif, A2 → C2 « bientôt »).
// Captures en largeur téléphone dans OUT (lang-<id>-<onglet>.png).
import pw from 'playwright';
const { chromium } = pw;
const FILE = process.argv[2], OUT = process.argv[3] || '.';
const browser = await chromium.launch();
let fails = 0;
const check = (ok, msg) => { console.log((ok ? 'ok   ' : 'FAIL ') + msg); if (!ok) fails++; };
const ids = await (async () => { const p = await browser.newPage(); await p.goto('file://' + FILE); const r = await p.evaluate(() => LANGS.map(l => [l.id, l.dir])); await p.close(); return r; })();
// une clé oubliée s'afficherait telle quelle (« set.title », « rev.none »…)
const KEY = /\b(set|board|meter|foot|mission|bk|notif|install|onb|audio|chip|help|err|tr|fb|kbd|mic|sp|sw|heute|mis|phase|rev|prog|tip|ai|chat|v|pdf|exam|res|level|common)\.[a-z][A-Za-z]+\b/;
for (const [id, dir] of ids) {
  const ctx = await browser.newContext({ locale: 'fr-FR', viewport: { width: 390, height: 860 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(l => localStorage.setItem('a1coach', JSON.stringify({ onboarded: true, lang: l, exam: '2026-12-01' })), id);
  const page = await ctx.newPage(); const errs = [];
  page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto('file://' + FILE); await page.waitForTimeout(900);
  check(await page.evaluate(([l, d]) => document.documentElement.lang === l && document.documentElement.dir === d, [id, dir]), `${id} : <html lang dir>`);
  const leaked = [];
  for (const tab of ['heute', 'smart', 'wortschatz', 'sprechen', 'schreiben', 'exam']) {
    await page.click(`[data-tab="${tab}"]`); await page.waitForTimeout(350);
    const txt = await page.evaluate(() => document.body.innerText);
    const m = txt.match(KEY); if (m) leaked.push(`${tab}: ${m[0]}`);
    if (['ar', 'ary', 'en'].includes(id) && ['heute', 'smart', 'exam'].includes(tab)) await page.screenshot({ path: `${OUT}/lang-${id}-${tab}.png` });
  }
  check(!leaked.length, `${id} : aucune clé brute visible ${leaked.join(', ')}`);
  // réglages : sélecteur de langue et de niveau
  await page.evaluate(() => { document.querySelector('.settings').open = true; });
  const lv = await page.evaluate(() => [...document.querySelectorAll('#levels [data-level]')].map(b => [b.dataset.level, b.disabled, b.getAttribute('aria-pressed')]));
  check(lv.length === 8 && lv[0][0] === 'A1' && !lv[0][1] && lv[0][2] === 'true' && lv.slice(1).every(x => x[1]), `${id} : niveaux A1 actif, A2 → C2 bientôt`);
  check(await page.$$eval('#langs [data-lang]', b => b.length) === ids.length, `${id} : ${ids.length} langues proposées`);
  if (id === 'ar') await page.screenshot({ path: `${OUT}/lang-ar-settings.png`, fullPage: false });
  await page.evaluate(() => { document.querySelector('.settings').open = false; });
  // examen complet : répondre au hasard jusqu'au résultat
  await page.click('[data-tab="exam"]'); await page.click('#full');
  for (let k = 0; k < 2; k++) { await page.click('#go');
    for (let i = 0; i < 15;) { if (await page.$('#bspGo')) { await page.click('#bspGo'); continue; } await page.click('.opt >> nth=0'); i++; } }
  await page.click('#done'); await page.click('#ev'); await page.waitForTimeout(300);
  const res = await page.evaluate(() => document.querySelector('#panel .big')?.textContent || '');
  check(/\/ 100$/.test(res), `${id} : examen complet → ${res}`);
  const perTeil = await page.evaluate(() => document.querySelectorAll('#panel .label + ul.check')[0].children.length);
  check(perTeil === 6, `${id} : détail par Teil (${perTeil})`);
  check(!errs.length, `${id} : aucune erreur JS ${errs.slice(0, 3).join(' ; ')}`);
  await ctx.close();
}
await browser.close();
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
