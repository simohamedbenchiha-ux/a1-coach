// Test PWA : sert le projet sur localhost, installe le service worker, coupe le réseau, recharge.
import pw from 'playwright';
import { spawn } from 'node:child_process';
const { chromium } = pw;
const DIR = process.argv[2], DIST = process.argv[3], PORT = 8765, URL = `http://localhost:${PORT}/`;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const srv = spawn('python3', ['-I', '-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '--directory', DIR], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 900));
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ locale: 'fr-FR', viewport: { width: 400, height: 900 } });
  await ctx.addInitScript(() => { if (!localStorage.getItem('a1coach')) localStorage.setItem('a1coach', JSON.stringify({ onboarded: true })); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'load' });
  // manifeste + icônes
  const man = await page.evaluate(async () => { const m = await (await fetch('manifest.webmanifest')).json();
    const icons = await Promise.all(m.icons.map(async i => (await fetch(i.src)).status)); return { name: m.short_name, display: m.display, icons }; });
  ok(man.display === 'standalone' && man.icons.every(s => s === 200), `manifeste valide (${man.name}, icônes ${man.icons})`);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload({ waitUntil: 'networkidle' });             // 2e passage en ligne : polices mises en cache
  ok(await page.evaluate(() => !!navigator.serviceWorker.controller), 'service worker actif et contrôle la page');
  const keys = await page.evaluate(async () => { const v = (await caches.keys()).find(k => k.startsWith('a1coach-')); return (await (await caches.open(v)).keys()).map(r => r.url); });
  ok(['/src/app.js', '/src/data.js', '/src/i18n.js', '/src/lang/ar.js', '/index.html', 'motion.js', 'jspdf.umd.min.js'].every(k => keys.some(u => u.endsWith(k))), `cache : ${keys.length} fichiers dont l'appli, les langues, Motion et jsPDF`);
  ok(keys.some(u => u.includes('fonts.gstatic.com')), 'polices mises en cache');
  // hors ligne
  await ctx.setOffline(true);
  await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(1500);
  const off = await page.evaluate(() => ({
    flaps: document.querySelectorAll('#boardRows .flap').length, tabs: document.querySelectorAll('.tabs .tab').length,
    motion: !!window.Motion, pdf: !!window.jspdf, font: document.fonts.check('700 20px Unbounded'), heute: !!document.querySelector('.missions'),
  }));
  ok(off.flaps > 0 && off.tabs === 6 && off.heute, 'hors ligne : l\'appli s\'affiche (tableau, onglets, plan du jour)');
  ok(off.motion && off.pdf, 'hors ligne : animations (Motion) et PDF (jsPDF) disponibles');
  ok(off.font, 'hors ligne : police Unbounded chargée');
  await page.click('[data-tab="smart"]'); await page.waitForTimeout(400);
  await page.locator('.opt').first().click(); await page.waitForTimeout(300);
  ok(await page.locator('.fb').count() === 1, 'hors ligne : on peut répondre à une question');
  ok(errs.length === 0, 'aucune erreur JS ' + errs.join(' ; '));
  await ctx.close();
  // fichier unique (artifact) : rien de la PWA
  const p2 = await browser.newPage({ locale: 'fr-FR' }); await p2.addInitScript(() => localStorage.setItem('a1coach', JSON.stringify({ onboarded: true }))); await p2.goto('file://' + DIST); await p2.waitForTimeout(800);
  const d = await p2.evaluate(() => ({ man: !!document.querySelector('link[rel="manifest"]'), pwa: PWA, box: document.querySelector('#installBox').hidden }));
  ok(!d.man && !d.pwa && d.box, 'fichier unique : pas de manifeste, PWA inactive, rien d\'affiché');
} finally { await browser.close(); srv.kill(); }
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
