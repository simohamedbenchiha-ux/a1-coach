// Tour complet de l'appli : chaque onglet et ses sous-écrans, en téléphone (390 px) et ordinateur (1280 px),
// clair et sombre, français et arabe. Signale : erreurs JS, défilement horizontal, éléments qui débordent
// de l'écran, images (img.js) cassées, clés de traduction visibles. Captures dans OUT (tour-*.png).
// node tests/tour.mjs dist/a1-coach.html <dossier>
import pw from 'playwright';
const { chromium } = pw;
const FILE = process.argv[2], OUT = process.argv[3] || '.';
const browser = await chromium.launch();
let fails = 0; const notes = [];
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL ' + m); } };
const KEY = /\b(set|board|meter|foot|mission|bk|notif|install|onb|audio|chip|help|err|tr|fb|kbd|mic|sp|sw|heute|mis|phase|rev|prog|tip|ai|chat|v|pdf|exam|res|level|common|auth|acc|about)\.[a-z][A-Za-z]+\b/;
const progress = { onboarded: true, exam: '2026-12-15', streak: 4, day: { date: new Date().toLocaleDateString('sv'), Q: 8, V: 5, S: 1, W: 0, E: 0 },
  box: { h1: 2, l3: 1, g1: 3, v_person0: 2 }, hist: Array.from({ length: 30 }, (_, i) => ({ s: 'HLWSG'[i % 5], v: i % 3 ? 1 : 0 })) };

async function audit(page, tag) {
  const r = await page.evaluate(() => {
    const W = document.documentElement.clientWidth, out = [];
    if (document.documentElement.scrollWidth > W + 1) out.push('défilement horizontal (' + document.documentElement.scrollWidth + ' > ' + W + ')');
    for (const el of document.querySelectorAll('#panel *, .board *, .meter *')) {
      const b = el.getBoundingClientRect(); if (!b.width || getComputedStyle(el).position === 'fixed') continue;
      if (el.closest('.settings:not([open]) .setPanel, [hidden], .tabs, .chartBox, .flaps, svg')) continue;
      if (b.right > W + 2 || b.left < -2) { out.push('déborde : ' + el.tagName.toLowerCase() + '.' + [...el.classList].join('.') + ' « ' + (el.textContent || '').trim().slice(0, 30) + ' »'); if (out.length > 4) break; }
    }
    const badSvg = [...document.querySelectorAll('.pic')].filter(p => !p.querySelector('svg')).length;
    if (badSvg) out.push(badSvg + ' image(s) vide(s)');
    return out;
  });
  const txt = await page.evaluate(() => document.body.innerText), k = txt.match(KEY);
  if (k) r.push('clé brute visible : ' + k[0]);
  r.forEach(x => notes.push(`[${tag}] ${x}`)); ok(!r.length, `${tag} : ${r.join(' ; ')}`);
}
const shot = (page, name) => page.screenshot({ path: `${OUT}/tour-${name}.png`, fullPage: true });

for (const [w, h, dev] of [[390, 844, 'tel'], [1280, 900, 'pc']]) for (const scheme of ['light', 'dark']) for (const lang of ['fr', 'ar']) {
  if (dev === 'pc' && lang === 'ar' && scheme === 'dark') continue;
  const tag = `${dev}-${scheme}-${lang}`;
  const ctx = await browser.newContext({ locale: 'fr-FR', viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1 });
  await ctx.addInitScript(([s, l]) => localStorage.setItem('a1coach', JSON.stringify({ ...s, lang: l })), [progress, lang]);
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto('file://' + FILE); await page.waitForTimeout(1500);
  await audit(page, tag + ' heute'); await shot(page, tag + '-1-heute');
  // Training : 4 questions (dont une à images si possible)
  await page.click('[data-tab="smart"]'); await page.waitForTimeout(400);
  for (let i = 0; i < 4; i++) {
    await audit(page, tag + ' training ' + i); if (i === 0) await shot(page, tag + '-2-training');
    const opt = await page.$('.opt'); if (!opt) break; await opt.click(); await page.waitForTimeout(300);
    if (i === 0) await shot(page, tag + '-3-feedback');
    const next = await page.$('#next'); if (next) { await next.click(); await page.waitForTimeout(300); }
  }
  // une question à images, rendue directement
  for (const f of ['pics', 'sign']) {
    await page.evaluate(f => { const q = Q.find(x => x[f] && (f !== 'sign' || x.pic)); if (q) smart(q); }, f); await page.waitForTimeout(300);
    await audit(page, tag + ' training ' + f); await shot(page, tag + '-3-' + f);
  }
  await page.click('[data-tab="wortschatz"]'); await page.waitForTimeout(500); await audit(page, tag + ' wörter'); await shot(page, tag + '-4-woerter');
  await page.click('[data-tab="sprechen"]'); await page.waitForTimeout(500); await audit(page, tag + ' sprechen'); await shot(page, tag + '-5-sprechen');
  await page.click('[data-tab="schreiben"]'); await page.waitForTimeout(500); await audit(page, tag + ' schreiben'); await shot(page, tag + '-6-schreiben');
  await page.click('[data-tab="exam"]'); await page.waitForTimeout(500); await audit(page, tag + ' prüfung'); await shot(page, tag + '-7-pruefung');
  await page.click('#full'); await page.click('#go'); await page.waitForTimeout(300); await audit(page, tag + ' examen'); await shot(page, tag + '-8-examen');
  await page.evaluate(() => { document.querySelector('.settings').open = true; }); await page.waitForTimeout(300);
  await audit(page, tag + ' réglages'); await shot(page, tag + '-9-reglages');
  ok(!errs.length, `${tag} : erreurs JS ${errs.slice(0, 3).join(' ; ')}`);
  await ctx.close();
}
await browser.close();
console.log(notes.length ? notes.length + ' remarque(s)' : 'aucune remarque');
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
