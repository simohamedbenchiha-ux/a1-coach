// Comptes (auth.js) avec un faux Supabase servi à la place du CDN : inscription, e-mail à confirmer,
// connexion, envoi de la progression, fusion avec un deuxième appareil, mot de passe oublié,
// suppression du compte, hors ligne, arabe. Sans configuration : aucun écran de connexion.
import pw from 'playwright';
import http from 'node:http';
import { readFileSync } from 'node:fs';
const { chromium } = pw;
const FILE = process.argv[2], OUT = process.argv[3] || '.';
const SB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';
// servi en http comme un vrai site : le stockage local d'une page file:// est peu fiable au rechargement sous Chromium automatisé
const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); r.end(readFileSync(FILE)); });
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const URL_ = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
let fails = 0;
const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };

// Faux serveur : comptes et lignes « progress » dans localStorage (clé fakesb), session dans fakesb-session.
const FAKE = `(()=>{const K="fakesb",S="fakesb-session",db=()=>JSON.parse(localStorage.getItem(K)||'{"users":{},"progress":{},"calls":[]}'),put=d=>localStorage.setItem(K,JSON.stringify(d));
const log=c=>{const d=db();d.calls.push(c);put(d)};let subs=[];const emit=(e,s)=>subs.forEach(f=>f(e,s));
const sess=()=>JSON.parse(localStorage.getItem(S)||"null");
window.supabase={createClient(){const auth={
 async getSession(){return {data:{session:sess()}}},
 onAuthStateChange(f){subs.push(f);if(location.hash.includes("type=recovery")){const d=db(),u=Object.values(d.users)[0];const s={user:{id:u.id,email:u.email}};localStorage.setItem(S,JSON.stringify(s));history.replaceState(null,"",location.pathname);setTimeout(()=>emit("PASSWORD_RECOVERY",s),0)}return {data:{subscription:{unsubscribe(){}}}}},
 async signUp({email,password}){const d=db();if(d.users[email])return {data:{user:{identities:[]},session:null},error:null};d.users[email]={id:"u-"+Object.keys(d.users).length,email,password,confirmed:false};put(d);log("signUp");return {data:{user:d.users[email],session:null},error:null}},
 async signInWithPassword({email,password}){const u=db().users[email];if(!u||u.password!==password)return {data:{},error:{code:"invalid_credentials",message:"Invalid login credentials",status:400}};
   if(!u.confirmed)return {data:{},error:{code:"email_not_confirmed",message:"Email not confirmed",status:400}};const s={user:{id:u.id,email}};localStorage.setItem(S,JSON.stringify(s));log("signIn");setTimeout(()=>emit("SIGNED_IN",s),0);return {data:{session:s},error:null}},
 async resetPasswordForEmail(email){log("reset:"+email);return {data:{},error:null}},
 async updateUser({password}){const d=db(),s=sess();const u=Object.values(d.users).find(x=>x.id===s.user.id);u.password=password;put(d);log("updateUser");return {data:{user:s.user},error:null}},
 async signOut(){localStorage.removeItem(S);log("signOut");emit("SIGNED_OUT",null);return {error:null}}};
 return {auth,
  from(){return {select(){return {eq(_,id){return {async maybeSingle(){const r=db().progress[id];return {data:r?{state:r}:null,error:null}}}}}},
    async upsert(row){const d=db();d.progress[row.user_id]=row.state;d.calls.push("upsert");put(d);return {error:null}}}},
  async rpc(n){const d=db(),s=sess();if(n==="delete_user"&&s){const e=Object.keys(d.users).find(k=>d.users[k].id===s.user.id);delete d.users[e];delete d.progress[s.user.id];d.calls.push("delete_user");put(d)}return {error:null}}}}};
window.fakesb={confirm(e){const d=db();d.users[e].confirmed=true;put(d)},db}})();`;

async function ctxWith({ cfg = true, state, lang = 'fr', offline = false } = {}) {
  const ctx = await browser.newContext({ locale: 'fr-FR', viewport: { width: 390, height: 860 } });
  await ctx.route(SB, r => offline ? r.abort() : r.fulfill({ contentType: 'application/javascript', body: FAKE }));
  await ctx.addInitScript(([cfg, state, lang]) => {
    if (cfg) window.A1_AUTH_TEST = { url: 'https://test.supabase.co', anon: 'anon-key' };
    if (state && !localStorage.getItem('a1coach')) localStorage.setItem('a1coach', JSON.stringify(state));
    if (lang && !localStorage.getItem('a1coach')) localStorage.setItem('a1coach', JSON.stringify({ lang }));
  }, [cfg, state, lang]);
  return ctx;
}
const open = async ctx => { const p = await ctx.newPage(), errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto(URL_); await p.waitForTimeout(700); p.errs = errs; return p; };
const gate = p => p.evaluate(() => !document.querySelector('#authGate').hidden);
const entered = p => p.waitForFunction(() => authUser && document.querySelector('#authGate').hidden, null, { timeout: 8000 }).catch(() => {});
const msg = p => p.evaluate(() => document.querySelector('#authMsg').textContent);

// 1. sans configuration : pas d'écran de connexion
{ const ctx = await ctxWith({ cfg: false }); const p = await open(ctx);
  ok(!(await gate(p)), 'sans configuration : pas d\'écran de connexion'); await ctx.close(); }

// 2. inscription, confirmation, connexion, envoi de la progression
const ctx = await ctxWith(); let p = await open(ctx);
ok(await gate(p) && await p.evaluate(() => document.querySelector('.wrap').inert), 'écran de connexion, appli inerte derrière');
await p.click('#authSwitch'); await p.fill('#authEmail', 'lea@example.com'); await p.fill('#authPw', 'court');
await p.click('#authGo'); ok(/8 caractères/.test(await msg(p)), 'mot de passe trop court refusé');
await p.fill('#authPw', 'motdepasse1'); await p.click('#authGo'); await p.waitForTimeout(200);
ok(/confirmation/.test(await msg(p)), 'inscription : message « ouvre l\'e-mail de confirmation »');
await p.click('#authGo'); await p.waitForTimeout(200);
ok(/Confirme d'abord/.test(await msg(p)), 'connexion avant confirmation refusée');
await p.evaluate(() => fakesb.confirm('lea@example.com'));
await p.fill('#authPw', 'mauvais-mdp'); await p.click('#authGo'); await p.waitForTimeout(200);
ok(/incorrect/.test(await msg(p)), 'mauvais mot de passe refusé');
await p.fill('#authPw', 'motdepasse1'); await p.click('#authGo'); await entered(p); await p.waitForTimeout(300);
ok(!(await gate(p)), 'connecté : écran de connexion fermé');
ok(await p.evaluate(() => document.querySelector('#onb').open), 'premier lancement : accueil affiché après la connexion');
await p.click('#onbGo'); await p.waitForTimeout(300);
await p.click('[data-tab="smart"]'); await p.waitForTimeout(300); await p.click('.opt >> nth=0'); await p.waitForTimeout(4600);
const remote = await p.evaluate(() => { const d = fakesb.db(); return d.progress[d.users['lea@example.com'].id]; });
ok(remote && Object.keys(remote.box).length === 1, 'progression envoyée au compte 4 s après la réponse');
await p.evaluate(() => document.querySelector('.settings').open = true);
ok(/lea@example.com/.test(await p.textContent('#accWho')), 'Réglages → Mon compte affiche l\'adresse');
await p.screenshot({ path: OUT + '/auth-account.png' });

// 3. rechargement : session gardée, pas d'écran de connexion
await p.reload(); await entered(p);
ok(!(await gate(p)), 'session gardée après rechargement');

// 4. deuxième appareil avec sa propre progression : fusion
const db = await p.evaluate(() => localStorage.getItem('fakesb'));
const ctx2 = await ctxWith({ state: { box: { v_person0: 3 }, hist: [{ s: 'V', v: 1 }], onboarded: true } });
await ctx2.addInitScript(d => { if (!localStorage.getItem('fakesb')) localStorage.setItem('fakesb', d); }, db);
const p2 = await open(ctx2);
await p2.fill('#authEmail', 'lea@example.com'); await p2.fill('#authPw', 'motdepasse1'); await p2.click('#authGo'); await entered(p2); await p2.waitForTimeout(300);
const merged = await p2.evaluate(() => JSON.parse(localStorage.getItem('a1coach')).box);
ok(merged.v_person0 === 3 && Object.keys(merged).length === 2, 'deuxième appareil : progressions fusionnées (' + JSON.stringify(merged) + ')');
ok(!(await p2.evaluate(() => document.querySelector('#onb').open)), 'deuxième appareil : pas d\'accueil (déjà fait)');
await ctx2.close();

// 5. suppression du compte
await p.evaluate(() => document.querySelector('.settings').open = true);
await p.click('#accDel'); await p.click('#accDelYes'); await p.waitForTimeout(1600);
const after = await p.evaluate(() => { const d = fakesb.db(); return { users: Object.keys(d.users).length, call: d.calls.includes('delete_user') }; });
ok(after.call && after.users === 0, 'compte supprimé (delete_user)');
ok(await gate(p), 'après suppression : retour à l\'écran de connexion');
ok(!p.errs.length, 'aucune erreur JS ' + p.errs.join(' ; '));
await ctx.close();

// 6. mot de passe oublié puis lien de réinitialisation
{ const c = await ctxWith(); await c.addInitScript(() => { if (!localStorage.getItem('fakesb')) localStorage.setItem('fakesb', JSON.stringify({ users: { 'sam@example.com': { id: 'u-9', email: 'sam@example.com', password: 'ancienmdp1', confirmed: true } }, progress: {}, calls: [] })); });
  const q = await open(c);
  await q.click('#authForgot'); await q.fill('#authEmail', 'sam@example.com'); await q.click('#authGo'); await q.waitForTimeout(200);
  ok(/lien vient de partir/.test(await msg(q)), 'mot de passe oublié : e-mail envoyé');
  await q.goto('about:blank'); await q.goto(URL_ + '#access_token=x&type=recovery'); await q.waitForTimeout(900);
  ok(await q.evaluate(() => !document.querySelector('#authPwRow').hidden && document.querySelector('#authEmailRow').hidden), 'lien reçu : formulaire « nouveau mot de passe »');
  await q.fill('#authPw', 'nouveaumdp1'); await q.click('#authGo'); await q.waitForTimeout(900);
  const pwd = await q.evaluate(() => fakesb.db().users['sam@example.com'].password);
  ok(pwd === 'nouveaumdp1' && !(await gate(q)), 'nouveau mot de passe enregistré, appli ouverte');
  await c.close(); }

// 7. hors ligne : message clair ; 8. arabe : écran de droite à gauche
{ const c = await ctxWith({ offline: true }); const q = await open(c); await q.waitForTimeout(300);
  ok(/internet/.test(await msg(q)), 'hors ligne : message « pas de connexion internet »'); await c.close(); }
{ const c = await ctxWith({ lang: 'ar' }); const q = await open(c);
  ok(await q.evaluate(() => document.documentElement.dir === 'rtl' && /الدخول/.test(document.querySelector('#authTitle').textContent)), 'écran de connexion en arabe, de droite à gauche');
  await q.screenshot({ path: OUT + '/auth-ar.png' }); await c.close(); }

await browser.close(); server.close();
console.log(fails ? `${fails} ÉCHEC(S)` : 'TOUT PASSE');
