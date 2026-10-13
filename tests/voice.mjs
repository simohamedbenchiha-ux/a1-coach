// Tests de la dictée avec une fausse SpeechRecognition (aucun vrai micro en navigateur sans interface).
import pw from 'playwright';
const { chromium } = pw;
const FILE = process.argv[2], OUT = process.argv[3];
let fails = 0;
const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };

const fake = mode => {
  window.__mode = mode;
  window.claude = { use: async () => null }; // comme sur claude.ai : l'onglet Gespräch existe (le cas sans Claude est testé dans native.mjs)
  if (mode === 'none') { delete window.webkitSpeechRecognition; delete window.SpeechRecognition; return; }
  class FakeSR {
    start() {
      window.__starts = (window.__starts || 0) + 1;
      setTimeout(() => {
        if (window.__mode === 'deny') { this.onerror?.({ error: 'not-allowed' }); this.onend?.(); return; }
        const r = (t, f) => { const a = [{ transcript: t }]; a.isFinal = f; return a; };
        this.onresult({ resultIndex: 0, results: [r('Ich heiße', false)] });
        this.onresult({ resultIndex: 0, results: [r(this.continuous ? 'Ich heiße Anna und ich wohne in Berlin' : 'Ich spiele gern Fußball', true)] });
        if (!this.continuous) this.onend?.();
      }, 60);
    }
    stop() { setTimeout(() => this.onend?.(), 10); }
  }
  window.webkitSpeechRecognition = FakeSR; window.SpeechRecognition = undefined;
};

const browser = await chromium.launch();
const open = async mode => {
  const ctx = await browser.newContext({ viewport: { width: 400, height: 1100 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(fake, mode);
  await ctx.addInitScript(() => { if (!localStorage.getItem('a1coach')) localStorage.setItem('a1coach', JSON.stringify({ onboarded: true })); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + FILE); await page.waitForTimeout(1200);
  await page.click('[data-tab="sprechen"]'); await page.waitForTimeout(400);
  return { ctx, page, errs };
};

// 1) Dictée réussie pendant les 30 s, puis Musterlösung
{
  const { ctx, page, errs } = await open('ok');
  ok(/🎙️/.test(await page.locator('#go').innerText()), 'bouton « 🎙️ Laut sprechen » affiché');
  await page.click('#go'); await page.waitForTimeout(250);
  const live = await page.locator('#spLive').innerText();
  ok(live.includes('Anna'), 'transcription en direct : ' + live);
  await page.click('#show'); await page.waitForTimeout(200);
  ok((await page.inputValue('#spTxt')).startsWith('Ich heiße Anna'), 'texte copié dans la zone de correction');
  ok(await page.locator('#spWrap').evaluate(d => d.open), 'zone « faire corriger par Claude » ouverte');
  ok(/corriger|compare/.test(await page.locator('#micMsg').innerText()), 'message d\'invitation à la correction');
  await page.screenshot({ path: OUT + '/voice-sprechen.png', fullPage: false, clip: { x: 0, y: 380, width: 400, height: 700 } });
  // bouton « Dicter » dans la zone de correction : ajoute à ce qui est déjà écrit
  await page.click('#spMic'); await page.waitForTimeout(150);
  ok(/Stop/.test(await page.locator('#spMic').innerText()), 'bouton Dicter passe en « ⏹ Stop »');
  await page.click('#spMic'); await page.waitForTimeout(100);
  ok(/Dicter/.test(await page.locator('#spMic').innerText()), 'Stop remet le bouton en « Dicter »');
  // Gespräch : phrase dictée envoyée automatiquement (hors claude.ai : message d'indisponibilité attendu)
  await page.click('[data-p="4"]'); await page.waitForTimeout(300);
  await page.click('#chatMic'); await page.waitForTimeout(300);
  const status = await page.locator('#chatStatus').innerText();
  ok(/claude\.ai/.test(status), 'conversation : phrase dictée envoyée (hors claude.ai -> ' + status.slice(0, 45) + '…)');
  ok(errs.length === 0, 'aucune erreur JS ' + errs.join(' ; '));
  await ctx.close();
}
// 2) Micro refusé (artifact claude.ai) : bascule en mode clavier, bouton toujours là
{
  const { ctx, page, errs } = await open('deny');
  await page.click('#go'); await page.waitForTimeout(250);
  const m = await page.locator('#micMsg').innerText();
  ok(/pas accès au micro/.test(m) && /dictée/.test(m), 'micro refusé : explication + aide clavier : ' + m.slice(0, 70) + '…');
  ok(await page.locator('#spMic').isVisible() || await page.locator('#spMic').count() === 1, 'micro refusé : bouton Dicter toujours présent');
  await page.click('#spWrap summary'); await page.click('#spMic'); await page.waitForTimeout(100);
  ok(await page.locator('#spKbd').isVisible(), 'Dicter en mode clavier : aide affichée');
  ok(await page.evaluate(() => document.activeElement.id) === 'spTxt', 'Dicter en mode clavier : champ de texte activé (clavier ouvert)');
  ok(await page.evaluate(() => window.__starts) === 1, 'plus de nouvel essai de la dictée intégrée après le refus');
  await page.waitForTimeout(1100);
  ok(/0:2\d/.test(await page.locator('#t').innerText()), 'le minuteur continue normalement');
  ok(errs.length === 0, 'aucune erreur JS');
  await ctx.close();
}
// 3) Appli installée sur iPhone : pas de dictée intégrée -> mode clavier avec l'aide iPhone
{
  const b2 = browser; const ctx = await b2.newContext({ viewport: { width: 390, height: 1000 }, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  await ctx.addInitScript(fake, 'none');
  await ctx.addInitScript(() => { if (!localStorage.getItem('a1coach')) localStorage.setItem('a1coach', JSON.stringify({ onboarded: true })); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + FILE); await page.waitForTimeout(1200);
  await page.click('[data-tab="sprechen"]'); await page.waitForTimeout(400);
  ok(!/🎙️/.test(await page.locator('#go').innerText()), 'iPhone : le minuteur ne prétend pas enregistrer');
  ok(/micro de ton clavier/.test(await page.locator('#panel .card').innerText()), 'iPhone : la carte indique comment dicter');
  await page.click('#spWrap summary'); await page.click('#spMic'); await page.waitForTimeout(100);
  const k = await page.locator('#spKbd').innerText();
  ok(/🌐/.test(k) && /Réglages/.test(k), 'iPhone : aide spécifique (clavier allemand 🌐, Réglages)');
  ok(await page.evaluate(() => document.activeElement.id) === 'spTxt', 'iPhone : champ activé pour dicter');
  await page.click('[data-p="4"]'); await page.waitForTimeout(300);
  ok(await page.locator('#chatMic').isVisible(), 'iPhone : bouton 🎙️ présent dans la conversation');
  await page.click('#chatMic'); await page.waitForTimeout(100);
  ok(/micro 🎤 du clavier/.test(await page.locator('#chatStatus').innerText()) && await page.evaluate(() => document.activeElement.id) === 'chatTxt', 'iPhone : conversation en mode clavier');
  await page.screenshot({ path: OUT + '/voice-iphone.png' });
  ok(errs.length === 0, 'aucune erreur JS ' + errs.join(' ; '));
  await ctx.close();
}
await browser.close();
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
