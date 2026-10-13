import pw from 'playwright';
const { chromium } = pw;
const FILE = process.argv[2], OUT = process.argv[3] || '.';
const browser = await chromium.launch();
const errors = [];

let fails = 0;
// 1) Long German nouns on the flashcard: do they overflow the card at phone widths?
for (const w of [360, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.addInitScript(() => localStorage.setItem('a1coach', JSON.stringify({ onboarded: true })));
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('file://' + FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await page.click('[data-tab="wortschatz"]');
  await page.waitForTimeout(800);
  const res = await page.evaluate(() => {
    const el = document.querySelector('.word');
    const box = el.clientWidth;
    const probe = el.cloneNode(false);
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;width:auto';
    el.parentNode.appendChild(probe);
    const bad = [];
    for (const x of WORDS) {
      probe.textContent = x.w;               // the noun alone must fit on one line
      if (probe.scrollWidth > box) bad.push(x.w);
    }
    probe.remove();
    return { box, total: WORDS.length, bad };
  });
  console.log(`${res.bad.length ? 'FAIL' : 'ok  '} ${w}px : ${res.bad.length}/${res.total} mots coupés au milieu`, res.bad.slice(0, 15).join(', '));
  if (res.bad.length) fails++;
  await page.close();
}

await browser.close();
console.log((errors.length ? 'FAIL' : 'ok  ') + ' aucune erreur JS', errors.join(' ; '));
if (errors.length) fails++;
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
