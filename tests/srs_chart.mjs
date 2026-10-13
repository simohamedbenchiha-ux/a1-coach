// Tests : répétition espacée (dates, ordre de tirage) + courbe de progression (rendu, survol, tableau).
import pw from 'playwright';
const { chromium } = pw;
const FILE = process.argv[2], OUT = process.argv[3];
const day = n => new Date(Date.now() + n * 864e5).toLocaleDateString('sv');
let fails = 0;
const ok = (cond, msg) => { console.log((cond ? 'ok   ' : 'FAIL ') + msg); if (!cond) fails++; };

// Historique simulé : 12 jours d'entraînement, examen dans 9 jours.
const snap = {};
for (let i = 12; i >= 0; i--) {
  if (i === 5 || i === 9) continue; // jours sans entraînement
  const p = 12 - i;
  snap[day(-i)] = { H: 35 + p * 4, L: 50 + p * 2, W: 20 + p * 5, ...(p > 3 ? { S: 40 + p * 3 } : {}) };
}
const seeded = { box: {}, hist: [{ s: 'H', v: 1 }, { s: 'H', v: 1 }], exam: day(9), err: {}, snap, due: {} };

const browser = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ locale: 'fr-FR', viewport: { width: 760, height: 1300 }, deviceScaleFactor: 2, colorScheme: scheme });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('a1coach', s); sessionStorage.setItem('seeded', '1'); } }, JSON.stringify(seeded));
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + FILE); await page.waitForTimeout(1500);

  if (scheme === 'light') {
    // --- répétition espacée ---
    const r = await page.evaluate(() => {
      const out = {};
      const w = WORDS[0].id, w2 = WORDS[1].id;
      record('V', 1, w);                       // juste : boîte 1 -> revient dans 1 jour
      out.right = [st.box[w], st.due[w]];
      record('V', 0, w2);                      // faux : boîte 0 -> revient aujourd'hui
      out.wrong = [st.box[w2], st.due[w2]];
      st.box[w] = 4; record('V', 1, w);        // boîte 4 : 14 j, plafonné avant l'examen (9 j -> 8 j)
      out.capped = st.due[w];
      // tirage : une question Hören due doit sortir avant les autres de la même compétence
      const hq = Q.filter(q => q.s === 'H'); hq.forEach(q => { st.box[q.id] = 2; st.due[q.id] = '2999-01-01'; });
      st.due[hq[3].id] = '2000-01-01';
      const pool = Q.filter(q => q.s === 'H'); recent = [];
      out.pickDue = Array.from({ length: 5 }, () => (recent = [], pick(pool).id === hq[3].id)).every(Boolean);
      out.dueCount = countDue(Q, todayStr());
      return out;
    });
    ok(r.right[0] === 1 && r.right[1] === day(1), `bonne réponse -> boîte 1, révision demain (${r.right})`);
    ok(r.wrong[0] === 0 && r.wrong[1] === day(0), `mauvaise réponse -> boîte 0, révision aujourd'hui (${r.wrong})`);
    ok(r.capped === day(8), `boîte 4 plafonnée avant l'examen : ${r.capped} (attendu ${day(8)})`);
    ok(r.pickDue, 'le tirage donne la priorité à la question due');
    ok(r.dueCount >= 1, `compteur de révisions dues = ${r.dueCount}`);
    await page.evaluate(() => show('heute')); await page.waitForTimeout(600);
    const rev = await page.locator('.phase', { hasText: 'Révisions du jour' }).innerText();
    ok(/à revoir/.test(rev) && /question/.test(rev), 'bloc « Révisions du jour » affiché : ' + rev.split('\n')[0]);
  }

  // --- courbe ---
  const c = await page.evaluate(() => ({
    paths: document.querySelectorAll('#prog .ln').length,
    dots: document.querySelectorAll('#prog .dot').length,
    exam: !!document.querySelector('#prog .examLine'),
    rows: document.querySelectorAll('#progTbl tr').length,
    endLbls: [...document.querySelectorAll('#prog .endLbl')].map(t => t.textContent),
  }));
  ok(c.paths === 4 && c.dots === 4, `4 lignes et 4 points finaux (${c.paths}/${c.dots})`);
  ok(c.exam, 'repère de la date d\'examen présent');
  ok(c.rows === 12, `tableau : en-tête + 11 jours (${c.rows} lignes)`);
  await page.locator('#prog').scrollIntoViewIfNeeded();
  const svgBox = await page.locator('#prog svg').boundingBox();
  await page.mouse.move(svgBox.x + svgBox.width * 0.3, svgBox.y + 60);
  await page.waitForTimeout(150);
  const tip = await page.locator('#prog .tip').innerText();
  ok(/%/.test(tip), 'infobulle au survol : ' + tip.replace(/\n/g, ' | '));
  ok(errs.length === 0, 'aucune erreur JS ' + (errs.join(' ; ') || ''));
  const card = await page.locator('.prog').boundingBox();
  await page.screenshot({ path: `${OUT}/prog-${scheme}.png`, clip: { x: card.x - 10, y: card.y - 10, width: card.width + 20, height: card.height + 20 } });
  await ctx.close();
}
await browser.close();
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
