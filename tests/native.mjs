// Tests de la couche native avec un faux Capacitor (plugins simulés qui enregistrent les appels).
import pw from 'playwright';
const { chromium } = pw;
const [FILE, OUT] = process.argv.slice(2);
let fails = 0;
const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };

const fakeCap = () => {
  window.__calls = []; const L = {};
  window.__emit = (n, ev, d) => (L[n + ':' + ev] || []).forEach(f => f(d));
  const S = 'SpeechRecognition';
  const impls = {
    SpeechRecognition: {
      requestPermissions: () => ({ speechRecognition: 'granted' }),
      start: o => { setTimeout(() => {
        window.__emit(S, 'partialResults', { matches: ['Ich heiße'] });
        window.__emit(S, 'partialResults', { matches: ['Ich heiße Anna'], accumulatedText: 'Ich heiße Anna' });
        if (o.continuousPTT) window.__emit(S, 'partialResults', { matches: ['Ich heiße Anna'], accumulated: 'Ich heiße Anna', isRestarting: true });
        if (o.continuousPTT) window.__emit(S, 'partialResults', { matches: ['ich wohne in Berlin'], accumulatedText: 'Ich heiße Anna ich wohne in Berlin' });
        if (!o.continuousPTT) window.__emit(S, 'listeningState', { state: 'stopped', status: 'stopped' });
      }, 40); return {}; },
      stop: () => { setTimeout(() => window.__emit(S, 'listeningState', { state: 'stopped', status: 'stopped' }), 10); return {}; },
    },
    LocalNotifications: { requestPermissions: () => ({ display: 'granted' }) },
    Filesystem: { writeFile: o => ({ uri: 'file:///cache/' + o.path }) },
  };
  const mk = n => new Proxy({}, { get: (_, m) => m === 'addListener'
    ? (ev, fn) => { (L[n + ':' + ev] ||= []).push(fn); return Promise.resolve({ remove() {} }); }
    : (...a) => { window.__calls.push([n, m, a]); return Promise.resolve(impls[n]?.[m] ? impls[n][m](...a) : {}); } });
  window.Capacitor = { isNativePlatform: () => true, isPluginAvailable: () => true, registerPlugin: mk };
};
const calls = (page, n, m) => page.evaluate(([n, m]) => window.__calls.filter(c => c[0] === n && (!m || c[1] === m)), [n, m]);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 }, colorScheme: 'dark' });
await ctx.addInitScript(fakeCap);
const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.goto('file://' + FILE); await page.waitForTimeout(1200);

// accueil : rappel proposé dans l'appli, programmé à 19 h
ok(await page.locator('#onbNotifRow').isVisible(), 'accueil : option « me rappeler chaque jour à 19 h »');
await page.click('#onbGo'); await page.waitForTimeout(400);
let sch = await calls(page, 'LocalNotifications', 'schedule');
const n0 = sch[0]?.[2][0].notifications[0];
ok(n0 && n0.schedule.on.hour === 19 && n0.isExactNotification === false, 'rappel programmé à 19 h, alarme non exacte');
ok((await calls(page, 'StatusBar', 'setStyle')).some(c => c[2][0].style === 'DARK'), 'barre d\'état claire sur thème sombre');

// réglages : changer l'heure
await page.click('.settings summary'); await page.waitForTimeout(150);
ok(await page.locator('#notifBox').isVisible(), 'réglages : choix du rappel visible dans l\'appli');
await page.selectOption('#notifTime', '20:00'); await page.waitForTimeout(300);
sch = await calls(page, 'LocalNotifications', 'schedule');
ok(sch.at(-1)[2][0].notifications[0].schedule.on.hour === 20, 'rappel déplacé à 20 h');
await page.selectOption('#notifTime', 'off'); await page.waitForTimeout(300);
ok((await calls(page, 'LocalNotifications', 'schedule')).length === sch.length && (await calls(page, 'LocalNotifications', 'cancel')).length >= 3, 'rappel désactivé : annulé, rien de reprogrammé');

// sauvegarde : fichier écrit puis feuille de partage
await page.click('#bkSave'); await page.waitForTimeout(400);
const wf = await calls(page, 'Filesystem', 'writeFile'), sh = await calls(page, 'Share', 'share');
ok(wf.length === 1 && wf[0][2][0].directory === 'CACHE' && sh[0]?.[2][0].files[0].endsWith('.json'), 'sauvegarde : fichier + partage natif');
await page.click('.settings summary');

// Training : vibration selon la réponse
await page.click('[data-tab="smart"]'); await page.waitForTimeout(300);
await page.locator('.opt').first().click(); await page.waitForTimeout(200);
const hp = await calls(page, 'Haptics', 'notification');
ok(hp.length === 1 && ['SUCCESS', 'ERROR'].includes(hp[0][2][0].type), 'vibration de réponse : ' + hp[0]?.[2][0].type);

// synthèse vocale native (Hören)
await page.evaluate(() => speak('Der Zug fährt um acht Uhr.')); await page.waitForTimeout(100);
const tts = await calls(page, 'TextToSpeech', 'speak');
ok(tts.length === 1 && tts[0][2][0].lang === 'de-DE' && tts[0][2][0].category === 'playback', 'écoute : voix native allemande, même en mode silencieux');
await page.click('[data-tab="exam"]'); await page.waitForTimeout(200);
ok((await calls(page, 'TextToSpeech', 'stop')).length >= 1, 'changer d\'onglet coupe la voix');

// Sprechen : dictée native continue (relance après pause), sans Claude
await page.click('[data-tab="sprechen"]'); await page.waitForTimeout(300);
ok(await page.locator('[data-p="4"]').count() === 0, 'sans Claude : onglet Gespräch masqué');
ok(await page.locator('#spAi').count() === 0 && await page.locator('#spCmp').count() === 1, 'sans Claude : « Comparer au modèle » à la place de « Faire corriger »');
await page.click('#go'); await page.waitForTimeout(300);
const st0 = await calls(page, 'SpeechRecognition', 'start');
ok(st0[0]?.[2][0].language === 'de-DE' && st0[0][2][0].continuousPTT === true, 'dictée native en allemand, mode continu');
ok((await calls(page, 'SpeechRecognition', 'setPTTState')).some(c => c[2][0].held === true), 'session maintenue pendant les pauses');
ok((await page.locator('#spLive').innerText()) === 'Ich heiße Anna ich wohne in Berlin', 'texte accumulé après la relance, sans doublon');
await page.click('#show'); await page.waitForTimeout(300);
ok((await page.inputValue('#spTxt')) === 'Ich heiße Anna ich wohne in Berlin', 'fin de session : réponse copiée dans la zone de texte');
ok((await calls(page, 'SpeechRecognition', 'setPTTState')).some(c => c[2][0].held === false), 'arrêt propre (bouton relâché puis stop)');
await page.click('#spCmp'); await page.waitForTimeout(300);
ok(/ta réponse/i.test(await page.locator('#spOut').innerText()) && await page.locator('#m .model').count() === 1, 'comparaison : ta réponse + Musterlösung affichées');
await page.screenshot({ path: OUT + '/native-compare.png', fullPage: true });

// bouton retour Android
await page.click('[data-tab="wortschatz"]'); await page.waitForTimeout(300);
await page.evaluate(() => window.__emit('App', 'backButton', {})); await page.waitForTimeout(300);
ok(await page.getAttribute('[data-tab="heute"]', 'aria-selected') === 'true', 'retour : revient à Heute');
await page.click('.settings summary'); await page.waitForTimeout(100);
await page.evaluate(() => window.__emit('App', 'backButton', {})); await page.waitForTimeout(100);
ok(!(await page.locator('.settings').evaluate(d => d.open)), 'retour : ferme les réglages');
await page.evaluate(() => window.__emit('App', 'backButton', {})); await page.waitForTimeout(100);
ok((await calls(page, 'App', 'exitApp')).length === 1, 'retour depuis Heute : quitte l\'appli');
ok(errs.length === 0, 'aucune erreur JS ' + errs.join(' ; '));
await browser.close();
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
