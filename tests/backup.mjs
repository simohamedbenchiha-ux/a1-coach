// Tests : accueil au premier lancement, À propos, sauvegarde / restauration (dont fichier piégé), PDF.
import pw from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const { chromium } = pw;
const [FILE, OUT] = process.argv.slice(2);
let fails = 0;
const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const day = n => new Date(Date.now() + n * 864e5).toLocaleDateString('sv');
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 860 }, deviceScaleFactor: 2, acceptDownloads: true });
const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + FILE); await page.waitForTimeout(1500);

// --- accueil
ok(await page.locator('#onb').evaluate(d => d.open), 'premier lancement : accueil affiché');
await page.screenshot({ path: OUT + '/onboarding.png' });
await page.fill('#onbDate', day(20));
await page.click('#onbGo'); await page.waitForTimeout(500);
const s1 = await page.evaluate(() => ({ open: document.querySelector('#onb').open, exam: st.exam, onb: st.onboarded }));
ok(!s1.open && s1.exam === day(20) && s1.onb, `accueil fermé, date d'examen enregistrée (${s1.exam})`);
await page.reload(); await page.waitForTimeout(1200);
ok(!(await page.locator('#onb').evaluate(d => d.open)), 'accueil non réaffiché au lancement suivant');

// --- À propos
await page.click('.settings summary'); await page.waitForTimeout(200);
const about = await page.locator('#about').innerText();
ok(/non affiliée au Goethe-Institut/.test(about) && /1\.2\.0/.test(about), 'À propos : version + non-affiliation');
ok((await page.getAttribute('#privacyLink', 'href')).endsWith('/privacy.html'), 'lien vers la politique de confidentialité');

// --- sauvegarde
await page.evaluate(() => { record('V', 1, WORDS[0].id); record('H', 1, Q.find(q => q.s === 'H').id); });
const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#bkSave')]);
const path = OUT + '/backup.json'; await dl.saveAs(path);
const bk = JSON.parse(readFileSync(path, 'utf8'));
ok(bk.app === 'a1coach' && Object.keys(bk.state.box).length === 2 && dl.suggestedFilename().startsWith('a1coach-sauvegarde-'), `fichier de sauvegarde : ${dl.suggestedFilename()}`);
ok(/Dernière sauvegarde/.test(await page.locator('#bkMsg').innerText()), 'date de dernière sauvegarde affichée');

// --- restauration après effacement
await page.evaluate(() => { st = { box: {}, hist: [], exam: '', err: {}, onboarded: true }; save(); });
await page.setInputFiles('#bkFile', path); await page.waitForTimeout(300);
const conf = await page.locator('#bkConfirm').innerText();
ok(/1 question et 1 mot/.test(conf), 'confirmation avec résumé : ' + conf.split('\n')[0].slice(0, 70));
await page.click('#bkYes'); await page.waitForTimeout(400);
const s2 = await page.evaluate(() => ({ n: Object.keys(st.box).length, exam: st.exam }));
ok(s2.n === 2 && s2.exam === day(20), 'progression restaurée (boîtes + date d\'examen)');

// --- fichier piégé : rien d'inattendu ne doit entrer
const evil = { app: 'a1coach', state: { box: { x: '<img src=x onerror=alert(1)>', ok1: 3, big: 99 }, exam: '<script>', pal: 'evil"><b>', mode: 'x',
  hist: [{ s: 'H', v: 5 }, { s: '<i>', v: 1 }, { s: 'L', v: 1 }], snap: { '2026-01-01': { H: 'x', L: 50 }, 'bad': { H: 1 } }, day: { date: '2026-01-01', Q: '9' }, notif: '25:00' } };
writeFileSync(OUT + '/evil.json', JSON.stringify(evil));
let dialogs = 0; page.on('dialog', d => { dialogs++; d.dismiss(); });
await page.setInputFiles('#bkFile', OUT + '/evil.json'); await page.waitForTimeout(300);
await page.click('#bkYes'); await page.waitForTimeout(400);
const s3 = await page.evaluate(() => JSON.stringify(st));
const st3 = JSON.parse(s3);
ok(JSON.stringify(st3.box) === '{"ok1":3}' && st3.exam === '' && !st3.pal && !st3.mode && st3.hist.length === 1 && !st3.notif, 'fichier piégé : seuls les champs valides sont gardés');
ok(JSON.stringify(st3.snap) === '{"2026-01-01":{"L":50}}' && st3.day.Q === 0, 'fichier piégé : courbe et missions nettoyées');
ok(dialogs === 0 && !(await page.content()).includes('onerror=alert'), 'fichier piégé : aucun code injecté dans la page');
// --- fichier quelconque
writeFileSync(OUT + '/other.json', '{"hello":1}');
await page.setInputFiles('#bkFile', OUT + '/other.json'); await page.waitForTimeout(300);
ok(/pas une sauvegarde/.test(await page.locator('#bkMsg').innerText()) && await page.locator('#bkConfirm').isHidden(), 'fichier étranger refusé');
await page.click('.settings summary');

// --- PDF (navigateur) via saveFile
await page.click('[data-tab="exam"]'); await page.waitForTimeout(400);
const [pdf] = await Promise.all([page.waitForEvent('download', { timeout: 15000 }), page.click('#pdf')]);
ok(pdf.suggestedFilename().endsWith('.pdf'), 'PDF téléchargé : ' + pdf.suggestedFilename());
ok(errs.length === 0, 'aucune erreur JS ' + errs.join(' ; '));
await browser.close();
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
