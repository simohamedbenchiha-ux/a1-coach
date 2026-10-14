/* Logique de l'appli : état, entraînement adaptatif, Heute, Wortschatz, Sprechen, Schreiben, Prüfung, Motion, Claude. */
let st={box:{},hist:[],exam:"",err:{}};
try{const s=JSON.parse(localStorage.getItem("a1coach")||"null");if(s)st=Object.assign(st,s)}catch(e){}
const save=()=>{try{localStorage.setItem("a1coach",JSON.stringify(st))}catch(e){}authQueue()}; // authQueue : envoi au compte (auth.js)
LANG=pickLang(st.lang);
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nl=s=>esc(s).replace(/\n/g,"<br>");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>String(s).toLowerCase().replace(/[\s.\-\/]/g,"");
const mmss=ms=>`${ms/6e4|0}:${String((ms/1e3|0)%60).padStart(2,"0")}`;

function acc(s){const h=st.hist.filter(e=>e.s===s).slice(-12);return h.length<2?null:h.reduce((a,e)=>a+e.v,0)/h.length}
const todayStr=()=>new Date().toLocaleDateString("sv");
function bump(k){const d=todayStr();
  if(!st.day||st.day.date!==d){const yest=new Date(Date.now()-864e5).toLocaleDateString("sv");
    st.streak=st.day&&st.day.date===yest?(st.streak||0)+1:1;st.day={date:d,Q:0,V:0,S:0,W:0,E:0}}
  st.day[k]=(st.day[k]||0)+1;
  const G={Q:20,V:15,S:3,W:1,E:1},N={Q:"Training",V:"Wortschatz",S:"Sprechen",W:"Schreiben",E:"Modellprüfung"};
  if(st.day[k]===G[k]&&typeof toast==="function"){toast(t("mission.done",{m:N[k]}));confetti(innerWidth/2,90,22)}}
function streakNow(){if(!st.day)return 0;const yest=new Date(Date.now()-864e5).toLocaleDateString("sv");return st.day.date===todayStr()||st.day.date===yest?st.streak||0:0}
function record(s,v,id){st.hist.push({s,v});if(st.hist.length>500)st.hist=st.hist.slice(-500);
  if(id){const b=st.box[id]||0;st.box[id]=v>=1?Math.min(b+1,4):v>0?b:0;schedule(id,v);
    if(!id.startsWith("v_")){st.err=st.err||{};if(v<1)st.err[id]=1;else if(st.box[id]>=2)delete st.err[id]}}
  snapDay();bump({H:"Q",L:"Q",G:"Q",V:"V",S:"S",W:"W"}[s]||"Q");save();renderMeter()}

/* Répétition espacée : un item revient INT[boîte] jours plus tard (raté : aujourd'hui ; aidé : demain),
   et toujours avant la date d'examen. st.due[id] = "AAAA-MM-JJ". */
const INT=[0,1,3,7,14];
const dayPlus=n=>new Date(Date.now()+n*864e5).toLocaleDateString("sv");
function schedule(id,v){let n=INT[st.box[id]||0];if(v<1)n=Math.min(n,1);
  const gap=st.exam?dGap(todayStr(),st.exam):null;if(gap!==null&&gap>1)n=Math.min(n,gap-1); // au plus tard la veille
  st.due=st.due||{};st.due[id]=dayPlus(n)}
/* dû au jour `day` ; un item vu avant l'arrivée des dates (boîte sans date) est dû tout de suite */
const dueBy=(id,day)=>st.due&&st.due[id]?st.due[id]<=day:st.box[id]!==undefined;
const isDue=id=>dueBy(id,todayStr());
const countDue=(items,day)=>items.filter(x=>dueBy(x.id,day)).length;
/* ordre de tirage : révisions dues, puis notions jamais vues, puis avance sur le programme */
function srsFirst(items){const due=items.filter(x=>isDue(x.id));if(due.length)return due;
  const fresh=items.filter(x=>st.box[x.id]===undefined);return fresh.length?fresh:items}
/* Courbe de progression : score de chaque épreuve officielle en fin de journée (même calcul que la jauge). */
function snapDay(){const o={};["H","L","W","S"].forEach(k=>{const a=acc(k);if(a!==null)o[k]=Math.round(a*100)});
  st.snap=st.snap||{};st.snap[todayStr()]=o;Object.keys(st.snap).sort().slice(0,-180).forEach(d=>delete st.snap[d])}

function renderMeter(){
  const off=["H","L","W","S"];let sum=0,n=0;
  $("#bars").innerHTML=[...off,"V","G"].map(k=>{const a=acc(k);if(a!==null&&off.includes(k)){sum+=a;n++}
    const p=a===null?0:Math.round(a*100);
    return `<div class="bar ${off.includes(k)?"":"aux"}"><span>${SK[k]}</span><div class="track" role="img" aria-label="${SK[k]} ${a===null?t("meter.untested"):p+" %"}"><div class="fill ${a===null?"":p>=60?"ok":"low"}" style="width:${p}%"></div></div><span class="pct">${a===null?"–":p+"%"}</span></div>`}).join("");
  if(!n){$("#overall").textContent="–";$("#verdict").textContent=t("meter.start");return}
  const o=Math.round(sum/n*100),weak=off.filter(k=>acc(k)!==null&&acc(k)<.6).map(k=>SK[k]);
  $("#overall").textContent=o+" %";
  $("#verdict").textContent=n<4?t("meter.more",{n:4-n}):weak.length?t("meter.priority",{list:weak.join(", ")}):t("meter.allOk");
}
function renderCountdown(){
  renderBoard();
  $("#examDate").value=st.exam||"";
  if(!st.exam){$("#countdown").textContent="";return}
  const d=Math.ceil((new Date(st.exam+"T09:00")-new Date())/864e5);
  $("#countdown").textContent="";
}
$("#examDate").addEventListener("change",e=>{st.exam=e.target.value;save();renderCountdown();if($('[data-tab="heute"]').getAttribute("aria-selected")==="true")heute()});

/* design settings: palette + light/dark, remembered per viewer */
const PALETTES=[["ubahn","Indigo","#5b3df5"],["rhein","Aqua","#0e7a90"],["bundes","Magma","#c01f6a"],["wald","Emerald","#07845a"],["lavendel","Violet","#7c3aed"]];
const MODES=[["system","Auto"],["light","☀️ Hell"],["dark","🌙 Dunkel"]];
function applyDesign(){const r=document.documentElement;
  if(st.pal&&st.pal!=="ubahn")r.dataset.palette=st.pal;else delete r.dataset.palette;
  if(st.mode==="light"||st.mode==="dark")r.dataset.theme=st.mode;else if(st.mode==="system")delete r.dataset.theme;
  $("#palettes").innerHTML=PALETTES.map(([k,n,c])=>`<button class="sw" data-pal="${k}" aria-pressed="${(st.pal||"ubahn")===k}"><i style="background:${c}"></i>${n}</button>`).join("");
  $("#modes").innerHTML=MODES.map(([k,n])=>`<button class="sw" data-mode="${k}" aria-pressed="${(st.mode||"system")===k}">${n}</button>`).join("");
  $$("[data-pal]").forEach(b=>b.onclick=()=>{st.pal=b.dataset.pal;save();applyDesign()});
  $$("[data-mode]").forEach(b=>b.onclick=()=>{st.mode=b.dataset.mode;save();applyDesign()});
  requestAnimationFrame(()=>moveInd(true));if(typeof statusBar==="function")statusBar()}
/* langue des explications : textes statiques (data-i18n), sens de lecture, sélecteurs (accueil + réglages) */
const rtl=()=>langInfo().dir==="rtl"; // explication arabe : paragraphe à part, sinon l'allemand qui la précède mélange l'ordre des mots
function applyLang(){const L=langInfo(),r=document.documentElement;r.lang=L.id;r.dir=L.dir;
  $$("[data-i18n]").forEach(e=>{e.textContent=t(e.dataset.i18n)});
  $$("[data-i18n-aria]").forEach(e=>e.setAttribute("aria-label",t(e.dataset.i18nAria)));
  const pick=LANGS.map(l=>`<button type="button" class="sw" data-lang="${l.id}" aria-pressed="${l.id===LANG}" lang="${l.id}" dir="${l.dir}">${l.flag} ${l.name}</button>`).join("");
  $$(".langPick").forEach(b=>{b.innerHTML=pick});
  $$("[data-lang]").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));renderLevels()}
function renderLevels(){const cur=level().id,el=$("#levels");if(!el)return;
  el.innerHTML=LEVELS.map(l=>`<button type="button" class="sw lvl" data-level="${l.id}" aria-pressed="${l.id===cur}"${l.ready?"":" disabled"}><b lang="de">${esc(l.label||l.id)}</b> <span${l.ready?' lang="de"':""}>${l.ready?esc(l.exam):t("level.soon")}</span></button>`).join("");
  $$("[data-level]").forEach(b=>b.onclick=()=>{if(b.disabled||st.level===b.dataset.level)return;st.level=b.dataset.level;save();renderLevels();
    const cur=$('[data-tab][aria-selected="true"]');if(!ex)show(cur?cur.dataset.tab:"heute")})}
function setLang(id){if(!LANGS.some(l=>l.id===id))return;LANG=id;st.lang=id;save();applyLang();
  renderMeter();renderAbout();bkInfo();renderAccount();notifSync();renderInstall();renderCountdown();if(st.notif&&st.notif!=="off")notifApply();
  const cur=$('[data-tab][aria-selected="true"]');if(!ex)show(cur?cur.dataset.tab:"heute")}

/* ===== Appli native (Capacitor, App Store / Play Store) : NATIVE n'est vrai que dans l'appli Android / iOS.
   Sans bundler, l'appli embarque vendor/capacitor.js ; un plugin natif n'est joignable qu'après
   Capacitor.registerPlugin(nom). plug() l'enregistre une fois, ou renvoie null s'il est absent. ===== */
const APP_VERSION="1.4.0";
const NATIVE=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());
const plugs={};
function plug(n){if(!NATIVE)return null;
  if(!(n in plugs)){const C=window.Capacitor;plugs[n]=C.registerPlugin&&C.isPluginAvailable&&C.isPluginAvailable(n)?C.registerPlugin(n):null}
  return plugs[n]}

/* Enregistrer un fichier : claude.ai (capacité downloads) → appli native (feuille de partage) → navigateur. */
const toB64=blob=>new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).split(",")[1]);r.onerror=ko;r.readAsDataURL(blob)});
async function saveFile(name,blob){
  const dl=window.claude&&window.claude.use?await window.claude.use("downloads"):null;
  if(dl){await dl.save({filename:name,data:blob});return "claude"}
  const fs=plug("Filesystem"),sh=plug("Share");
  if(fs&&sh){const {uri}=await fs.writeFile({path:name,data:await toB64(blob),directory:"CACHE"});await sh.share({title:name,files:[uri]});return "share"}
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000);return "browser"}
const cancelled=e=>e&&(e.code==="declined"||/cancel/i.test(e.message||""));

/* ===== Sauvegarde de la progression (fichier JSON) : changer d'appareil, passer du site à l'appli.
   Un fichier importé est reconstruit champ par champ : rien d'autre n'entre dans l'état. ===== */
const isDay=v=>typeof v==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(v);
function cleanState(o){if(!o||typeof o!=="object")return null;const out={box:{},hist:[],exam:"",err:{}},obj=v=>v&&typeof v==="object"&&!Array.isArray(v);
  if(obj(o.box))for(const [k,v] of Object.entries(o.box))if(Number.isInteger(v)&&v>=0&&v<=4)out.box[k]=v;
  if(obj(o.due)){out.due={};for(const [k,v] of Object.entries(o.due))if(isDay(v))out.due[k]=v}
  if(Array.isArray(o.hist))out.hist=o.hist.filter(e=>e&&SK[e.s]&&typeof e.v==="number"&&e.v>=0&&e.v<=1).slice(-500).map(e=>({s:e.s,v:e.v}));
  if(obj(o.snap)){out.snap={};for(const [d,v] of Object.entries(o.snap))if(isDay(d)&&obj(v)){const x={};["H","L","W","S"].forEach(k=>{if(Number.isFinite(v[k])&&v[k]>=0&&v[k]<=100)x[k]=Math.round(v[k])});out.snap[d]=x}}
  if(obj(o.err))for(const k of Object.keys(o.err))out.err[k]=1;
  if(obj(o.day)&&isDay(o.day.date)){out.day={date:o.day.date};["Q","V","S","W","E"].forEach(k=>out.day[k]=Number.isFinite(o.day[k])?Math.max(0,o.day[k]|0):0)}
  if(Number.isFinite(o.streak))out.streak=Math.max(0,o.streak|0);
  ["exam","lastBackup"].forEach(k=>{if(isDay(o[k]))out[k]=o[k]});
  if(PALETTES.some(p=>p[0]===o.pal))out.pal=o.pal;
  if(MODES.some(m=>m[0]===o.mode))out.mode=o.mode;
  if(LANGS.some(l=>l.id===o.lang))out.lang=o.lang;
  if(LEVELS.some(l=>l.id===o.level&&l.ready))out.level=o.level;
  if(typeof o.notif==="string"&&/^([01]\d|2[0-3]):00$|^off$/.test(o.notif))out.notif=o.notif;
  out.onboarded=true;return out}
const bkStats=x=>{const ids=Object.keys(x.box),v=ids.filter(i=>i.startsWith("v_")).length;return t("bk.stats",{q:ids.length-v,v})};
function bkInfo(t){const m=$("#bkMsg");m.hidden=false;m.textContent=t||(st.lastBackup?window.t("bk.last",{d:fmtD(st.lastBackup)}):window.t("bk.none"))}
async function backupSave(){const d=todayStr(),blob=new Blob([JSON.stringify({app:"a1coach",v:1,date:d,state:st})],{type:"application/json"});
  try{await saveFile(`a1coach-sauvegarde-${d}.json`,blob);st.lastBackup=d;save();bkInfo()}
  catch(e){bkInfo(cancelled(e)?t("bk.cancelled"):t("bk.failed"))}}
async function backupLoad(file){const c=$("#bkConfirm");c.hidden=true;if(!file)return;
  let o=null;try{o=JSON.parse(await file.text())}catch(e){}
  const x=o&&o.app==="a1coach"?cleanState(o.state):null;
  if(!x)return bkInfo(t("bk.notOurs"));
  c.hidden=false;c.innerHTML=`<p class="small" style="margin:0">${t("bk.confirm",{d:fmtD(isDay(o.date)?o.date:todayStr()),stats:bkStats(x)})}</p>
    <div class="swatches"><button class="sw" id="bkYes">${t("bk.replace")}</button><button class="sw" id="bkNo">${t("common.cancel")}</button></div>`;
  $("#bkNo").onclick=()=>{c.hidden=true};
  $("#bkYes").onclick=()=>{st=x;LANG=pickLang(st.lang);save();c.hidden=true;applyDesign();applyLang();bkInfo(t("bk.restored"));renderMeter();renderCountdown();notifSync();show("heute");toast(t("bk.restored"))}}

/* ===== Accueil au premier lancement + À propos ===== */
function onboard(){const d=$("#onb");if(!d||!d.showModal)return;$("#onbDate").value=st.exam||"";$("#onbDate").min=todayStr();
  const nr=$("#onbNotifRow");if(nr)nr.hidden=!plug("LocalNotifications");
  d.onclose=()=>{const v=$("#onbDate").value;if(isDay(v)&&v>=todayStr()){st.exam=v;renderCountdown()}
    if(nr&&!nr.hidden&&!st.onboarded&&$("#onbNotif").checked){st.notif="19:00";notifSync();notifApply()}
    st.onboarded=true;save();show("heute")};
  try{d.showModal()}catch(e){}}
/* Rappel quotidien (appli seulement) : notification locale répétée chaque jour, alarme non exacte. */
async function notifApply(){const LN=plug("LocalNotifications");if(!LN)return;
  try{await LN.cancel({notifications:[{id:1}]})}catch(e){}
  if(!st.notif||st.notif==="off")return;
  try{const p=await LN.requestPermissions();
    if(p.display!=="granted"){st.notif="off";save();notifSync();bkInfo(t("notif.denied"));return}
    await LN.schedule({notifications:[{id:1,title:"A1 Coach",body:t("notif.body"),
      schedule:{on:{hour:+st.notif.slice(0,2),minute:0},allowWhileIdle:false},isExactNotification:false,smallIcon:"ic_stat_notify"}]})}
  catch(e){}}
function notifSync(){const box=$("#notifBox");if(!box)return;box.hidden=!plug("LocalNotifications");if(box.hidden)return;
  const sel=$("#notifTime"),hours=[7,8,9,12,17,18,19,20,21];
  sel.innerHTML=`<option value="off">${t("notif.off")}</option>`+hours.map(h=>`<option value="${String(h).padStart(2,"0")}:00">${t("notif.at",{h})}</option>`).join("");
  sel.value=st.notif||"off";sel.onchange=()=>{st.notif=sel.value;save();notifApply()}}
const appPlug=plug("App");
if(appPlug)appPlug.addListener("backButton",()=>{const d=$("#onb");if(d&&d.open)return d.close();
  if($(".settings").open)return void($(".settings").open=false);
  const cur=$('[data-tab][aria-selected="true"]');if(cur&&cur.dataset.tab!=="heute")return show("heute");
  appPlug.exitApp()});
/* barre d'état : texte clair sur fond sombre, et l'inverse (suit le thème choisi ou celui du système) */
function statusBar(){const sb=plug("StatusBar");if(!sb)return;const r=document.documentElement.dataset.theme;
  const dark=r?r==="dark":matchMedia("(prefers-color-scheme: dark)").matches;sb.setStyle({style:dark?"DARK":"LIGHT"}).catch(()=>{})}
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",statusBar)}catch(e){}
function renderAbout(){$("#about").textContent=t("about",{v:APP_VERSION,app:NATIVE})+" "+t("about.telc")}

/* ===== Appli hors ligne (PWA) : seulement quand la page est hébergée en https (ou localhost) avec son
   manifeste. Le fichier unique (artifact claude.ai) n'a pas de manifeste : rien ne s'active. ===== */
const PWA=!!document.querySelector('link[rel="manifest"]')&&"serviceWorker" in navigator&&(location.protocol==="https:"||/^(localhost|127\.0\.0\.1)$/.test(location.hostname));
let installEvt=null;
function renderInstall(){const box=$("#installBox");if(!box||!PWA)return;
  const installed=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true,ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  box.hidden=installed||!(installEvt||ios);$("#installBtn").hidden=!installEvt;
  $("#installTip").textContent=installEvt?t("install.tip"):ios?t("install.ios"):""}
if(PWA){addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
  addEventListener("beforeinstallprompt",e=>{e.preventDefault();installEvt=e;renderInstall()});
  addEventListener("appinstalled",()=>{installEvt=null;renderInstall();toast(t("install.done"))});
  $("#installBtn").onclick=async()=>{if(!installEvt)return;installEvt.prompt();try{await installEvt.userChoice}catch(e){}installEvt=null;renderInstall()};
  renderInstall()}

/* ===== Motion layer (motion.dev). Every effect answers a user action, except the one board flip on load. ===== */
const MO=window.Motion||null;
const RM=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}})();
const canMove=()=>!!MO&&!RM;
function anim(el,kf,opt){if(!canMove()||!el)return null;try{return MO.animate(el,kf,opt)}catch(e){return null}}
const SPRING={type:"spring",stiffness:420,damping:32};
/* split-flap departure board */
const FLAPCH="ABCDEFGHIJKLMNOPRSTUVWZÄÖÜ0123456789";
function flapHtml(t){return [...t].map(c=>`<span class="flap${c===" "?" sp":""}" data-c="${esc(c)}">${c===" "?"":esc(c)}</span>`).join("")}
function flipBoard(){const tiles=$$("#boardRows .flap:not(.sp)");
  if(!canMove()){tiles.forEach(t=>t.textContent=t.dataset.c);return}
  tiles.forEach((t,i)=>{const fin=t.dataset.c,steps=4+(i%5)+(i>>2);let n=0;
    const step=()=>{n++;t.textContent=n>=steps?fin:FLAPCH[Math.random()*FLAPCH.length|0];anim(t,{rotateX:[-80,0]},{duration:.09,ease:"easeOut"});if(n<steps)setTimeout(step,75)};
    setTimeout(step,120+i*28)})}
function renderBoard(){const box=$("#boardRows");if(!box)return;const d=daysLeft();
  const [left,cap,num]=d===null?["DATUM WÄHLEN",t("board.noDate"),"--"]:d<0?["GESCHAFFT",t("board.past"),"--"]:d===0?["PRÜFUNG HEUTE","Viel Erfolg !","00"]:["PRÜFUNG",d===1?"Abfahrt morgen":"Abfahrt in Tagen",String(Math.min(d,99)).padStart(2,"0")];
  box.innerHTML=`<div class="bRow"><div><div class="bCap">Nächster Halt</div><div class="flaps">${flapHtml(left)}</div></div>
    <div><div class="bCap" style="text-align:right">${esc(cap)}</div><div class="flaps bigNum" style="justify-content:flex-end">${flapHtml(num)}</div></div></div>`;
  flipBoard()}
/* sliding tab indicator */
let indReady=false;
function moveInd(instant){const nav=$(".tabs"),ind=$("#tabInd");if(!nav||!ind)return;
  if(!MO){nav.classList.add("noInd");ind.hidden=true;return}
  const b=nav.querySelector('.tab[aria-selected="true"]');if(!b)return;
  const kf={x:b.offsetLeft,width:b.offsetWidth};
  try{MO.animate(ind,kf,instant||!indReady||RM?{duration:0}:{type:"spring",stiffness:520,damping:38})}catch(e){}indReady=true}
addEventListener("resize",()=>moveInd(true));
/* answer feedback */
function confetti(x,y,n){if(!canMove())return;const cols=["var(--mark)","var(--brand)","var(--good)","var(--fr)"];
  for(let i=0;i<(n||14);i++){const c=document.createElement("span");c.className="confetti";c.style.left=x+"px";c.style.top=y+"px";c.style.background=cols[i%cols.length];document.body.appendChild(c);
    const a=Math.random()*Math.PI*2,r=50+Math.random()*70;
    const p=anim(c,{x:[0,Math.cos(a)*r],y:[0,Math.sin(a)*r-40,Math.sin(a)*r+30],rotate:[0,(Math.random()-.5)*540],opacity:[1,1,0]},{duration:.9,ease:"easeOut"});
    if(p&&p.finished)p.finished.then(()=>c.remove(),()=>c.remove());else setTimeout(()=>c.remove(),1000)}}
function fx(ok,el){if(!el)return;const hp=plug("Haptics");if(hp)hp.notification({type:ok?"SUCCESS":"ERROR"}).catch(()=>{});
  if(ok){anim(el,{scale:[1,1.045,1]},{duration:.4,ease:"easeOut"});const r=el.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,14)}
  else anim(el,{x:[0,-9,9,-6,6,-3,0]},{duration:.42})}
/* toast */
function toast(msg){const t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.innerHTML=`<i>✓</i>${esc(msg)}`;document.body.appendChild(t);
  anim(t,{y:[-40,0],opacity:[0,1]},SPRING);setTimeout(()=>{const p=anim(t,{y:[0,-30],opacity:[1,0]},{duration:.25});if(p&&p.finished)p.finished.then(()=>t.remove(),()=>t.remove());else t.remove()},2400)}
/* number ticker */
function tick(el,to,fmt){if(!el)return;fmt=fmt||(v=>String(v));if(!canMove()){el.textContent=fmt(to);return}
  try{MO.animate(0,to,{duration:.9,ease:[.2,.9,.3,1],onUpdate:v=>{el.textContent=fmt(Math.round(v))}})}catch(e){el.textContent=fmt(to)}}

/* audio */
let rate=.85;
/* Synthèse vocale : dans l'appli, voix natives du système (la WebView Android n'a pas speechSynthesis ;
   sur iPhone, « playback » joue même en mode silencieux). Sur le web, Web Speech API. */
let speakId=0;
function hush(){speakId++;try{speechSynthesis.cancel()}catch(e){}const t=plug("TextToSpeech");if(t)t.stop().catch(()=>{})}
/* Voix : un dialogue (répliques séparées par « – ») est lu à deux voix, comme à l'examen (deux voix allemandes
   si l'appareil en a deux, sinon une voix plus grave pour la 2e personne). done() : appelé à la fin de la lecture. */
const turnsOf=s=>String(s).split(/\s+[–—]\s+/).map(x=>x.trim()).filter(Boolean);
function speak(text,done){const id=++speakId,parts=turnsOf(text),fin=()=>{if(id===speakId&&done)done()},tts=plug("TextToSpeech");
  if(tts){(async()=>{for(let i=0;i<parts.length;i++){if(id!==speakId)return;
      try{await tts.speak({text:parts[i],lang:"de-DE",rate,pitch:i%2?.8:1,category:"playback",queueStrategy:0})}catch(e){return}}fin()})();return true}
  try{const vs=speechSynthesis.getVoices().filter(v=>/^de/i.test(v.lang));speechSynthesis.cancel();
    parts.forEach((p,i)=>{const u=new SpeechSynthesisUtterance(p);u.lang="de-DE";u.rate=rate;
      const v=vs.length>1?vs[i%2]:vs[0];if(v)u.voice=v;if(vs.length<2&&i%2)u.pitch=.75;
      if(i===parts.length-1)u.onend=u.onerror=fin;speechSynthesis.speak(u)});return true}catch(e){return false}}
const rateLabel=()=>`Tempo: ${rate<1?"langsam":"normal"}`;

/* question helpers */
const isRF=q=>q.rf!==undefined;
const answerOf=q=>isRF(q)?(q.rf?"Richtig":"Falsch"):q.ab?"ab"[q.c]:q.o[0];
const optsOf=q=>isRF(q)?["Richtig","Falsch"]:q.ab?["a","b"]:shuffle(q.o);
const fmtQ=s=>esc(s).replace(/___/g,'<span class="blank"></span>');
const teilName=q=>q.p==="G"?"Grammatik":`${SK[q.s]} Teil ${q.p[1]}`;

function qBody(q,training){
  let h=`<div class="meta"><span class="chip">${teilName(q)}</span><span class="chip">${esc(q.t)}</span>${training?`<span class="chip ${(st.box[q.id]||0)===0&&st.hist.length?"hot":""}">Box ${(st.box[q.id]||0)}/4</span>${isDue(q.id)?`<span class="chip">${t("chip.review")}</span>`:""}`:""}</div>`;
  h+=`<p class="instr">${TEIL[q.p].i}</p>`;
  if(q.audio)h+=`<div class="row"><button class="btn mark" id="play">▶ Hören</button><button class="btn ghost" id="rate">${rateLabel()}</button></div>${training?"":`<p class="status" id="hStat" lang="de" role="status"></p>`}`;
  if(q.mail)h+=`<div class="mail">${esc(q.mail)}</div>`;
  if(q.ab)h+=`<p class="q" lang="de">${esc(q.q)}</p><div class="ab">${q.ab.map((t,i)=>{const [l1,...r]=t.split("\n"),web=/^www\./.test(l1); // page web : barre d'adresse, comme dans le cahier
    return web?`<div class="sign web"><b>${"ab"[i]}</b><div class="url" dir="ltr">${esc(l1)}</div>${esc(r.join("\n"))}</div>`:`<div class="sign"><b>${"ab"[i]}</b>${esc(t)}</div>`}).join("")}</div>`;
  else{if(q.sign)h+=`<div class="sign${q.pic?" withPic":""}" lang="de">${picHtml(q.pic)}<span>${esc(q.sign)}</span></div>`;else if(q.pic)h+=picHtml(q.pic,"big");h+=`<p class="q" lang="de">${fmtQ(q.q)}</p>`}
  if(training)h+=`<div><button class="btn help" id="help">${t("help.btn")}</button><p class="fr" id="frT" hidden>${esc(tq(q).fr)}</p></div>`;
  return h;
}
/* Images (img.js) : dessins au trait originaux, jamais les visuels du Goethe-Institut ou de telc. */
const picHtml=(tok,cls)=>tok&&typeof IMG!=="undefined"&&IMG.has(tok)?`<span class="pic ${cls||""}" aria-hidden="true">${IMG.svg(tok)}</span>`:"";
function optsHtml(q,opts){const letters=!isRF(q)&&!q.ab,pics=q.pics&&q.o&&typeof IMG!=="undefined";
  return `<div class="opts ${isRF(q)||q.ab?"two":""}${pics?" pics":""}">${opts.map((o,i)=>`<button class="opt${pics?" picOpt":""}" dir="ltr" lang="de" data-i="${i}">${pics?picHtml(q.pics[q.o.indexOf(o)]):""}${letters?`<span class="ltr">${"abc"[i]}</span>`:""}<span>${esc(o)}</span></button>`).join("")}</div>`}
function bindAudio(q,maxPlays){if(!q.audio)return;let plays=0;
  $("#play").onclick=()=>{if(maxPlays&&plays>=maxPlays)return;
    if(!speak(q.audio)){$("#play").textContent=t("audio.unavailable");return}
    plays++;if(maxPlays){$("#play").textContent=plays<maxPlays?"▶ Noch einmal hören":"Kein Hören mehr";$("#play").disabled=plays>=maxPlays}};
  $("#rate").onclick=e=>{rate=rate<1?1:.85;e.target.textContent=rateLabel()}}

/* adaptive picker: weakest skill is drawn most, then lowest Leitner box */
let recent=[];
function pick(pool){
  const skills=[...new Set(pool.map(q=>q.s))];
  const w=skills.map(s=>{const a=acc(s);return (s==="G"?.1:.15)+(a===null?.7:1-a)*(s==="G"?.6:1)});
  let r=Math.random()*w.reduce((a,b)=>a+b),si=0;while(si<w.length-1&&r>w[si]){r-=w[si];si++}
  let items=pool.filter(q=>q.s===skills[si]&&!recent.includes(q.id));
  if(!items.length)items=pool.filter(q=>q.s===skills[si]);
  items=srsFirst(items);
  const min=Math.min(...items.map(q=>st.box[q.id]||0));
  items=items.filter(q=>(st.box[q.id]||0)===min);
  const q=items[Math.random()*items.length|0];
  recent=[q.id,...recent].slice(0,Math.min(10,pool.length-1));return q;
}

let errMode=false;
const errIds=()=>Q.filter(q=>st.err&&st.err[q.id]);
function smart(force){ // force : une question précise (tests, liens directs)
  let pool=Q,banner="";
  if(errMode){pool=errIds();
    if(!pool.length){errMode=false;pool=Q;banner=`<div class="ai-box"><b>${t("err.emptyT")}</b><span class="small">${t("err.empty")}</span></div>`}
    else banner=`<div class="ai-box"><div class="row" style="justify-content:space-between"><b>${t("err.banner",{n:pool.length})}</b><button class="btn ghost" id="exitErr" style="padding:6px 12px;font-size:13px">${t("err.quit")}</button></div><span class="small">${t("err.rule")}</span></div>`}
  const q=force||pick(pool),opts=optsOf(q),ans=answerOf(q);let used=false;
  const pl=TEIL[q.p].plays;
  $("#panel").innerHTML=`<div class="card">${banner}${qBody(q,true)}${pl?`<p class="small">${t("tr.plays",{n:pl})}</p>`:""}${optsHtml(q,opts)}<div id="after"></div></div>`;
  bindAudio(q);
  if($("#exitErr"))$("#exitErr").onclick=()=>{errMode=false;smart()};
  $("#help").onclick=()=>{used=true;$("#frT").hidden=false;$("#help").disabled=true};
  $$(".opt").forEach(b=>b.onclick=()=>{
    const ok=opts[b.dataset.i]===ans;
    $$(".opt").forEach(x=>{x.disabled=true;if(opts[x.dataset.i]===ans)x.classList.add("right")});
    if(!ok)b.classList.add("wrong");fx(ok,ok?b:b);
    record(q.s,ok?(used?.5:1):0,q.id);
    $("#after").innerHTML=`<div class="fb ${ok?"":"no"}"><p><b lang="de">${ok?"Richtig!":"Leider falsch."}</b>${rtl()?"":" "+esc(tq(q).x)}</p>${rtl()?`<p dir="${dirOf(tq(q).x)}">${esc(tq(q).x)}</p>`:""}${q.audio?`<p class="tr" lang="de">„${esc(q.audio)}“</p>`:""}<p class="fr">${esc(tq(q).fr)}</p>${!ok?`<p class="small">${t("fb.again")}</p>`:used?`<p class="small">${t("fb.helpUsed")}</p>`:""}</div><div class="row" style="margin-top:12px"><button class="btn" id="next">Weiter →</button></div>`;
    $("#next").onclick=()=>smart();$("#next").focus();
  });
}

let spPart=2,spIdx=0,tmr=null;
/* ===== Dictée en allemand, deux modes. Les boutons micro ne disparaissent jamais.
   - apiMic : reconnaissance vocale du navigateur (Chrome, Edge, Safari), transcription en direct ;
   - sinon (appli installée sur iPhone, artifact sans micro, Firefox, micro refusé) : le bouton 🎙️ ouvre
     le champ de texte et explique comment dicter avec le micro du clavier ou du système (KBD). ===== */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const NSR=plug("SpeechRecognition"); // appli native : reconnaissance du système (marche aussi sur iPhone)
let rec=null,apiMic=NSR?true:!!SR;
const UA=navigator.userAgent,IOS=/iphone|ipad|ipod/i.test(UA)||(/Macintosh/.test(UA)&&navigator.maxTouchPoints>1);
const kbdKey=IOS?"kbd.ios":/android/i.test(UA)?"kbd.android":/Mac/.test(UA)?"kbd.mac":/Win/.test(UA)?"kbd.win":"kbd.other";
const KBD=()=>t(kbdKey);
const MICERR_K={"not-allowed":"mic.notAllowed","service-not-allowed":"mic.serviceNotAllowed","audio-capture":"mic.noMic","no-speech":"mic.noSpeech","network":"mic.network"};
const MICERR=new Proxy({},{get:(_,k)=>MICERR_K[k]?t(MICERR_K[k]):undefined});
function listen(o){if(!apiMic)return false;stopListen();hush();return NSR?nativeListen(o):webListen(o)}
/* Appli : plugin @capgo/capacitor-speech-recognition. En mode continu (carte de 30 s, « Dicter »), continuousPTT
   relance l'écoute après chaque pause ; « stopped » n'arrive qu'à la vraie fin de session. */
function nativeListen({continuous,onText,onEnd,onErr}){
  let last="",done=false,stopped=false;const subs=[],join=(a,b)=>(a+" "+b).replace(/\s+/g," ").trim();
  const txt=e=>e.accumulatedText||(e.isRestarting?e.accumulated:join(e.accumulated||"",e.matches&&e.matches[0]||""))||"";
  const h={stop:()=>{stopped=true;(continuous?NSR.setPTTState({held:false}):Promise.resolve()).catch(()=>{}).then(()=>NSR.stop()).catch(()=>{})}};
  const finish=()=>{if(done)return;done=true;if(rec===h)rec=null;subs.forEach(p=>Promise.resolve(p).then(x=>x&&x.remove()).catch(()=>{}));onEnd&&onEnd(last)};
  rec=h;
  (async()=>{try{
      const p=await NSR.requestPermissions();
      if(p.speechRecognition!=="granted"){apiMic=false;onErr&&onErr(MICERR["not-allowed"]+" "+KBD());return finish()}
      subs.push(NSR.addListener("partialResults",e=>{const t=txt(e);if(t&&!done){last=t;onText&&onText(t)}}));
      subs.push(NSR.addListener("listeningState",e=>{if((e.state||e.status)==="stopped")finish()}));
      if(stopped)return finish();
      await NSR.start({language:"de-DE",partialResults:true,popup:false,addPunctuation:true,continuousPTT:!!continuous});
      if(continuous)await NSR.setPTTState({held:true});
    }catch(e){if(!last)onErr&&onErr(MICERR["no-speech"]);finish()}})();
  return true}
function webListen({continuous,onText,onEnd,onErr}){
  let fin="";const r=new SR();r.lang="de-DE";r.interimResults=true;r.continuous=!!continuous;
  const clean=t=>t.replace(/\s+/g," ").trim();
  r.onresult=e=>{let tmp="";for(let i=e.resultIndex;i<e.results.length;i++){const x=e.results[i];if(x.isFinal)fin+=x[0].transcript+" ";else tmp+=x[0].transcript}onText&&onText(clean(fin+tmp))};
  r.onerror=e=>{if(e.error==="aborted")return;if(/not-allowed|audio-capture/.test(e.error))apiMic=false; // la suite passe au clavier
    onErr&&onErr((MICERR[e.error]||t("mic.stopped"))+(apiMic?"":" "+KBD()))};
  r.onend=()=>{if(rec===r)rec=null;onEnd&&onEnd(clean(fin))};
  try{r.start();rec=r;return true}catch(e){return false}}
function stopListen(){if(rec){const r=rec;rec=null;try{r.stop()}catch(e){}}}

/* La correction et le partenaire de conversation passent par claude.ai : ailleurs (site, appli des stores),
   on ne montre pas de bouton qui ne marcherait pas, on propose de comparer au modèle. */
const hasAI=()=>!!(window.claude&&window.claude.use);
function sprechen(){
  clearInterval(tmr);stopListen();
  if(spPart===4&&!hasAI())spPart=2;
  const spTabs=`<div class="sublist">${(hasAI()?[1,2,3,4]:[1,2,3]).map(n=>`<button class="tab" data-p="${n}" aria-selected="${n===spPart}">${n===4?"💬 Gespräch":"Teil "+n}</button>`).join("")}</div>`;
  if(spPart===4){gespraech(spTabs);$$("[data-p]").forEach(b=>b.onclick=()=>{spPart=+b.dataset.p;spIdx=0;sprechen()});return}
  const P=SPEAK[spPart],ii=spIdx%P.items.length,it=P.items[ii];
  $("#panel").innerHTML=`<div class="card">
   ${spTabs}
   <div class="label">${P.title} · ${P.max} Punkte</div><div class="sign${it.pic?" withPic":""}" lang="de">${picHtml(it.pic,"card")}<span>${esc(it.p)}</span></div>${it.hint?`<p class="instr" lang="de">${esc(it.hint)}</p>`:""}
   <div><button class="btn help" id="help">${t("help.btn")}</button><p class="fr" id="frT" hidden>${esc(tsp(spPart,ii,it))}</p></div>
   <div class="row"><span class="timer" id="t">0:30</span><button class="btn mark" id="go">${apiMic?"🎙️ ":""}Laut sprechen (30 s)</button></div>
   <p class="small" style="margin:0">${t(apiMic?(hasAI()?"sp.hintApiAI":"sp.hintApiCmp"):(hasAI()?"sp.hintKbdAI":"sp.hintKbdCmp"))}</p>
   <p class="liveTx" id="spLive" hidden></p><p class="status" id="micMsg" hidden></p>
   <div id="m"></div>
   <div class="row"><button class="btn ghost" id="show">Musterlösung</button></div>
   <details class="aiWrap" id="spWrap"><summary>${t(hasAI()?"sp.summaryAI":"sp.summaryCmp")}</summary>
    <textarea id="spTxt" lang="de" style="min-height:90px" placeholder="${t("sp.placeholder")}"></textarea>
    <div class="row">${hasAI()?`<button class="btn" id="spAi">${t("sp.correct")}</button>`:`<button class="btn" id="spCmp">${t("sp.compare")}</button>`}<button class="btn ghost mic" id="spMic">${t("sp.dictate")}</button></div>
    <p class="small" id="spKbd" hidden></p><div id="spOut"></div></details></div>`;
  const card=$("#panel").firstElementChild,alive=()=>card.isConnected; // ignore une dictée qui finit après un changement de carte
  const msg=t=>{if(!alive())return;const m=$("#micMsg");m.hidden=!t;m.textContent=t||""};
  const live=t=>{if(!alive())return;const l=$("#spLive");l.hidden=false;l.textContent=t};
  $$("[data-p]").forEach(b=>b.onclick=()=>{spPart=+b.dataset.p;spIdx=0;sprechen()});
  if($("#spAi"))$("#spAi").onclick=()=>aiSpeak(spPart,it,$("#spTxt").value,$("#spOut"),$("#spAi"));
  $("#help").onclick=()=>{$("#frT").hidden=false;$("#help").disabled=true};
  $("#go").onclick=()=>{let s=30;clearInterval(tmr);$("#go").disabled=true;msg("");
    if(listen({continuous:true,onText:live,onErr:msg,onEnd:txt=>{if(!alive()||!txt)return;$("#spTxt").value=txt;$("#spWrap").open=true;
      msg(t(hasAI()?"sp.transcribedAI":"sp.transcribedCmp"))}}))live(t("sp.listening"));
    tmr=setInterval(()=>{s--;$("#t").textContent="0:"+String(s).padStart(2,"0");if(s<=0){clearInterval(tmr);reveal()}},1000)};
  const reveal=()=>{clearInterval(tmr);stopListen();$("#m").innerHTML=`<div class="model" lang="de">${nl(it.m)}</div><div class="row" style="margin-top:10px"><span class="small">Hat es geklappt?</span><button class="btn" data-r="1">Ja</button><button class="btn ghost" data-r=".5">Teilweise</button><button class="btn ghost" data-r="0">Nein</button></div>`;
    $("#show").textContent="🔊 Muster anhören";$("#show").onclick=()=>speak(it.m.replace(/Frage:|Antwort:|–/g,""));
    $$("[data-r]").forEach(b=>b.onclick=()=>{record("S",+b.dataset.r);spIdx++;sprechen()})};
  $("#show").onclick=reveal;
  if($("#spCmp"))$("#spCmp").onclick=()=>{const txt=$("#spTxt").value.trim();
    if(!txt){$("#spOut").innerHTML=`<div class="ai-box"><span class="small">${t("sp.writeFirst")}</span></div>`;return}
    if(!$("#m").innerHTML)reveal();
    $("#spOut").innerHTML=`<div class="ai-box"><div class="label">${t("sp.yours")}</div><div class="model" lang="de">${nl(txt)}</div>
      <span class="small">${t("sp.compareTip")}</span></div>`;
    $("#m").scrollIntoView({behavior:RM?"auto":"smooth",block:"center"})};
  const mic=$("#spMic"),tip=t=>{if(!alive())return;const k=$("#spKbd");k.hidden=false;k.textContent=t};
  const viaKbd=()=>{tip(KBD());$("#spTxt").focus()}; // le focus ouvre le clavier du téléphone
  mic.onclick=()=>{if(mic.classList.contains("rec")){stopListen();return}
    if(!apiMic)return viaKbd();
    const base=$("#spTxt").value.trim(),done=()=>{mic.classList.remove("rec");mic.textContent=t("sp.dictate")};
    if(listen({continuous:true,onText:t=>{if(alive())$("#spTxt").value=(base?base+" ":"")+t},
      onErr:t=>{done();tip(t)},onEnd:done})){mic.classList.add("rec");mic.textContent="⏹ Stop";$("#spKbd").hidden=true}
    else viaKbd()};
}

/* Schreiben: reusable renderers + graders */
const formHtml=F=>`<div class="mail">${esc(F.text)}</div><div class="form">${F.f.map((f,i)=>{const id="ff"+i;
  const ctrl=Array.isArray(f[1])?`<select id="${id}"><option value="">– bitte wählen –</option>${f[1].slice(1).map(o=>`<option>${esc(o)}</option>`).join("")}</select>`:`<input id="${id}" autocomplete="off">`;
  return `<div class="f" id="w${i}"><label for="${id}">${esc(f[0])}</label>${ctrl}</div>`}).join("")}</div>`;
/* Formulaire : comme à l'examen, une faute d'orthographe est acceptée si le mot reste reconnaissable
   (« Donerstag »), mais un nombre doit être exact. */
const lev=(a,b)=>{const d=Array.from({length:b.length+1},(_,j)=>j);for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;
  for(let j=1;j<=b.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t}}return d[b.length]};
const fieldOk=(v,sol)=>{const a=norm(v),b=norm(sol);if(a===b)return true;if(/\d/.test(b)||b.length<4)return false;
  return lev(a,b)<=(b.length>=8?2:1)};
function gradeForm(F,show){let ok=0;
  F.f.forEach((f,i)=>{const sol=Array.isArray(f[1])?f[1][0]:f[1],good=fieldOk($("#ff"+i).value,sol);if(good)ok++;
    if(show){const row=$("#w"+i);row.className="f "+(good?"ok":"no");row.querySelector(".sol")?.remove();
      if(!good)row.insertAdjacentHTML("beforeend",`<span class="sol">Lösung: ${esc(sol)}</span>`)}});return ok}
const mailHtml=w=>`<p class="q">${esc(w.task)}</p><p class="instr">Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.</p><ul>${w.pts.map(p=>`<li>${esc(p[0])}</li>`).join("")}</ul>`;
/* Barème officiel de Schreiben Teil 2 (Goethe et telc) : 3 points par point de contenu, 1 point pour la forme
   (formule d'appel 0,5 + salutation finale 0,5), soit 10. Un texte trop court ne vaut que la moitié par point. */
function gradeMail(w,t){const words=(t.match(/\S+/g)||[]).length;
  const anr=/^\s*(liebe|lieber|hallo|hi|sehr geehrte)/i.test(t),gr=/grüße|grüßen|gruß|grüsse|bis bald|bis morgen|bis dann|bis samstag|tschüss/i.test(t);
  const hit=w.pts.map(p=>p[2].test(t)),per=words<12?1.5:3;
  const c=[["Anrede (Liebe/Lieber/Hallo/Sehr geehrte …)",anr],...w.pts.map((p,i)=>[p[0],hit[i]]),
    ["Gruß am Ende (Viele Grüße, Bis bald …)",gr],[`Länge: ${words} Wörter (Ziel: etwa 30)`,words>=20&&words<=50]];
  const pts=per*hit.filter(Boolean).length+(anr?.5:0)+(gr?.5:0);
  return {c,sc:pts/10,pts}}
const checkHtml=c=>`<ul class="check">${c.map(x=>`<li class="${x[1]?"ok":""}">${esc(x[0])}</li>`).join("")}</ul>`;

let wPart=2,wIdx=0,fIdx=0;
function schreiben(){
  const tabs=`<div class="sublist">${[[1,"Teil 1 · Formular"],[2,"Teil 2 · E-Mail"]].map(([n,l])=>`<button class="tab" data-w="${n}" aria-selected="${n===wPart}">${l}</button>`).join("")}</div>`;
  const bindW=()=>$$("[data-w]").forEach(b=>b.onclick=()=>{wPart=+b.dataset.w;schreiben()});
  if(wPart===1){
    const fi=fIdx%FORMS.length,F=FORMS[fi];
    $("#panel").innerHTML=`<div class="card">${tabs}<div class="meta"><span class="chip">Schreiben Teil 1 · 5 Punkte</span><span class="chip">${esc(F.title)}</span></div>
     <p class="instr">Lesen Sie den Text und füllen Sie das Formular aus.</p>${formHtml(F)}
     <div><button class="btn help" id="help">${t("help.btn")}</button><p class="fr" id="frT" hidden>${esc(tfm(fi,F))}</p></div>
     <div class="row"><button class="btn" id="chk">Korrigieren</button><button class="btn ghost" id="nx">Neues Formular</button></div><div id="res"></div></div>`;
    bindW();$("#help").onclick=()=>{$("#frT").hidden=false;$("#help").disabled=true};
    $("#nx").onclick=()=>{fIdx++;schreiben()};
    $("#chk").onclick=()=>{const ok=gradeForm(F,true);record("W",ok/F.f.length);
      $("#res").innerHTML=`<div class="fb ${ok>=3?"":"no"}"><p><b>${ok} / 5 Punkte</b></p><p class="small">${t("sw.tip")}</p></div>`};
    return;
  }
  const wi=wIdx%WRITE.length,w=WRITE[wi],wt=twr(wi,w);
  $("#panel").innerHTML=`<div class="card">${tabs}<div class="meta"><span class="chip">Schreiben Teil 2 · 10 Punkte</span><span class="chip">${esc(w.title)}</span></div>
   ${mailHtml(w)}
   <div><button class="btn help" id="help">${t("help.btn")}</button><div id="frT" hidden><p class="fr">${esc(wt.fr)}</p><ul class="fr">${wt.pts.map(p=>`<li>${esc(p)}</li>`).join("")}</ul></div></div>
   <label class="label" for="txt">Ihre E-Mail</label><textarea id="txt" placeholder="Liebe … / Lieber … / Sehr geehrte …"></textarea>
   <div class="row"><button class="btn" id="chk">Korrigieren</button>${hasAI()?`<button class="btn ghost" id="ai">${t("sw.ai")}</button>`:""}<button class="btn ghost" id="nx">Neue Aufgabe</button></div><div id="aiOut"></div><div id="res"></div></div>`;
  if($("#ai"))$("#ai").onclick=()=>aiMail(w,$("#txt").value,$("#aiOut"),$("#ai"));
  bindW();$("#help").onclick=()=>{$("#frT").hidden=false;$("#help").disabled=true};
  $("#nx").onclick=()=>{wIdx++;schreiben()};
  $("#chk").onclick=()=>{const g=gradeMail(w,$("#txt").value);record("W",g.sc);
    $("#res").innerHTML=`<div class="fb ${g.sc>=.6?"":"no"}"><p><b>≈ ${Math.round(g.sc*10)} / 10 Punkte</b></p>${checkHtml(g.c)}<p class="small">${t("sw.estimate")}</p></div><div class="label" style="margin-top:12px">Musterlösung</div><div class="model" lang="de">${nl(w.model)}</div>`};
}

/* ===== Heute: plan, missions, streak, Fehlerheft ===== */
const WD=["So","Mo","Di","Mi","Do","Fr","Sa"];
/* un nom très long (Staatsangehörigkeit) passe en plus petit pour tenir sur une ligne sans être coupé */
const wordCls=w=>/\s/.test(w)||w.length<17?"word":"word long";
function metroHtml(d){if(d===null||d<1)return"";
  const tail=innerWidth<520?2:4,days=[];for(let i=0;i<d;i++){if(d>tail+3&&i>=2&&i<d-tail){if(i===2)days.push({gap:1});continue}days.push({i})}
  const lbl=i=>i===0?"Heute":i===1?"Morgen":WD[new Date(Date.now()+i*864e5).getDay()];
  return `<div class="metro" aria-label="${t("heute.metro")}"><div class="metroLine">${days.map(x=>x.gap?`<div class="stn gap"><i></i><span>…</span></div>`
    :`<div class="stn ${x.i===0?"now":""}">${x.i===0&&!RM?'<span class="pulse"></span>':""}<i></i><span>${lbl(x.i)}</span></div>`).join("")}<div class="stn end"><i></i><span>Prüfung</span></div></div></div>`}
function daysLeft(){if(!st.exam)return null;return Math.ceil((new Date(st.exam+"T09:00")-new Date())/864e5)}
/* ===== Courbe de progression (SVG) : une ligne par épreuve, seuil 60 %, date d'examen à droite ===== */
const PROG=[["H","--s1"],["L","--s2"],["W","--s3"],["S","--s4"]]; // couleur fixe par épreuve (palette validée daltonisme)
const dGap=(a,b)=>Math.round((new Date(b+"T12:00")-new Date(a+"T12:00"))/864e5);
const fmtD=s=>{const p=s.split("-");return +p[2]+"/"+(+p[1])};
function drawProg(box,tbl){if(!box)return;
  const snap=st.snap||{},days=Object.keys(snap).sort().filter(d=>Object.keys(snap[d]).length),det=tbl&&tbl.closest("details");
  if(!days.length){box.innerHTML=`<p class="small" style="margin:0">${t("prog.empty")}</p>`;if(det)det.hidden=true;return}
  if(det)det.hidden=false;
  const today=todayStr(),first=days[0],exam=st.exam&&st.exam>today?st.exam:null;
  const end=exam||(dGap(first,today)<6?dayPlus(6-dGap(first,today)):today),span=Math.max(dGap(first,end),1);
  const W=Math.max(box.clientWidth,260),H=190,wide=W>=460,ml=30,mr=wide&&!exam?100:12,mt=14,mb=24;
  const X=d=>ml+dGap(first,d)/span*(W-ml-mr),Y=v=>mt+(100-v)/100*(H-mt-mb);
  const tx=(x,y,s,a,cls)=>`<text x="${x}" y="${y}" text-anchor="${a||"start"}" class="${cls||"ax"}">${s}</text>`;
  let g="";
  [0,50,100].forEach(v=>{g+=`<line x1="${ml}" x2="${W-mr}" y1="${Y(v)}" y2="${Y(v)}" class="grid"/>`+tx(ml-6,Y(v)+4,v,"end")});
  g+=`<line x1="${ml}" x2="${W-mr}" y1="${Y(60)}" y2="${Y(60)}" class="seuil"/>`+(exam?tx(W-mr-4,Y(60)-5,t("prog.threshold"),"end"):tx(ml+4,Y(60)-5,t("prog.threshold"))); // à droite : zone vide avant l'examen
  if(exam)g+=`<line x1="${X(exam)}" x2="${X(exam)}" y1="${mt}" y2="${H-mb}" class="examLine"/>`+tx(X(exam),H-6,"Prüfung "+fmtD(exam),"end");
  g+=tx(X(first),H-6,fmtD(first));
  const xt=X(today);if(dGap(first,today)>0&&xt-X(first)>44&&(!exam||X(exam)-xt>96))g+=tx(xt,H-6,t("prog.today"),"middle");
  const ends=[];
  PROG.forEach(([k,c])=>{const pts=days.filter(d=>snap[d][k]!==undefined).map(d=>[X(d),Y(snap[d][k]),snap[d][k]]);if(!pts.length)return;
    g+=`<path d="${pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join("")}" class="ln" style="stroke:var(${c})"/>`;
    const p=pts[pts.length-1];ends.push({k,c,x:p[0],y:p[1],v:p[2]})});
  ends.forEach(e=>g+=`<circle cx="${e.x}" cy="${e.y}" r="4" class="dot" style="fill:var(${e.c})"/>`);
  /* étiquettes en bout de ligne seulement si elles ne se chevauchent pas ; sinon légende + survol + tableau */
  const ys=ends.map(e=>e.y).sort((a,b)=>a-b);
  if(wide&&ends.every(e=>W-e.x>=100)&&ys.every((y,i)=>!i||y-ys[i-1]>=14))ends.forEach(e=>g+=tx(e.x+9,e.y+4,`${SK[e.k]} ${e.v}`,"start","endLbl"));
  g+=`<line class="cross" x1="0" x2="0" y1="${mt}" y2="${H-mb}" visibility="hidden"/><rect class="hit" x="${ml}" y="0" width="${W-ml-mr}" height="${H}" fill="transparent"/>`;
  box.innerHTML=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${t("prog.aria")}">${g}</svg><div class="tip" hidden></div>`
    +(days.length<2?`<p class="small" style="margin:6px 0 0">${t("prog.tomorrow")}</p>`:"");
  const svg=box.querySelector("svg"),cross=svg.querySelector(".cross"),tip=box.querySelector(".tip"),hit=svg.querySelector(".hit");
  const hover=ev=>{const r=svg.getBoundingClientRect(),mx=(ev.clientX-r.left)*W/r.width;
    const d=days.reduce((a,b)=>Math.abs(X(b)-mx)<Math.abs(X(a)-mx)?b:a),x=X(d);
    cross.setAttribute("x1",x);cross.setAttribute("x2",x);cross.setAttribute("visibility","visible");
    const head=document.createElement("b");head.textContent=fmtD(d)+(d===today?" · "+t("prog.todayLong"):"");tip.replaceChildren(head);
    PROG.forEach(([k,c])=>{if(snap[d][k]===undefined)return;const row=document.createElement("div"),key=document.createElement("i"),v=document.createElement("strong");
      key.style.background=`var(${c})`;v.textContent=snap[d][k]+" %";row.append(key,v,document.createTextNode(" "+SK[k]));tip.append(row)});
    tip.hidden=false;tip.style.left=Math.min(Math.max(x*r.width/W-tip.offsetWidth/2,0),r.width-tip.offsetWidth)+"px"};
  hit.addEventListener("pointermove",hover);hit.addEventListener("pointerdown",hover);
  hit.addEventListener("pointerleave",()=>{cross.setAttribute("visibility","hidden");tip.hidden=true});
  if(tbl)tbl.innerHTML=`<table class="scoreTbl"><tr><th>${t("prog.day")}</th>${PROG.map(([k])=>`<th class="n">${SK[k]}</th>`).join("")}</tr>${days.slice(-14).reverse().map(d=>`<tr><td>${fmtD(d)}</td>${PROG.map(([k])=>`<td class="n">${snap[d][k]===undefined?"–":snap[d][k]+" %"}</td>`).join("")}</tr>`).join("")}</table>`;
}
addEventListener("resize",()=>{const b=$("#prog");if(b)drawProg(b,$("#progTbl"))});
function heute(){
  const d=daysLeft(),day=st.day&&st.day.date===todayStr()?st.day:{Q:0,V:0,S:0,W:0,E:0},sk=streakNow(),errs=errIds().length;
  const M=[["Q","Training",t("mis.q"),20,"smart"],["V","Wortschatz",t("mis.v"),15,"wortschatz"],["S","Sprechen",t("mis.s"),3,"sprechen"],["W","Schreiben",t("mis.w"),1,"schreiben"]];
  if(d!==null&&d<=3&&d>0)M.push(["E","Modellprüfung",t("mis.e"),1,"exam"]);
  const done=M.filter(m=>(day[m[0]]||0)>=m[3]).length;
  const ph=d===null?"none":d<0?"past":d===0?"today":d<=3?"p3":d<=5?"p2":"p1",phase=[t(`phase.${ph}T`),t(`phase.${ph}`)];
  const off=["H","L","W","S"].map(k=>[k,acc(k)]).filter(x=>x[1]!==null).sort((a,b)=>a[1]-b[1]);
  const weak=off.length&&off[0][1]<.6?off[0][0]:null;
  const goTab={H:"smart",L:"smart",W:"schreiben",S:"sprechen"};
  const tmr2=dayPlus(1),dq=countDue(Q,todayStr()),dv=countDue(WORDS,todayStr()),soon=countDue(Q,tmr2)+countDue(WORDS,tmr2)-dq-dv;
  $("#panel").innerHTML=`<div class="card">
   <div class="todayHead"><h2>Dein Plan</h2>${sk?`<span class="streak">${t("heute.streak",{n:sk})}</span>`:""}</div>
   <div class="phase"><b>${phase[0]}</b><span class="small">${phase[1]}</span></div>
   ${metroHtml(d)}
   <div class="row" style="justify-content:space-between"><div class="label">${t("heute.missions")}</div><span class="small">${t("heute.done",{d:done,n:M.length})}</span></div>
   <div class="missions">${M.map(([k,n,desc,goal,tab])=>{const c=Math.min(day[k]||0,goal),ok=c>=goal;
     return `<button class="mis ${ok?"done":""}" data-go="${tab}"><span class="ic">${ok?"✓":""}</span><span><b>${n}</b> <span class="small">· ${desc}</span></span><span class="cnt">${c} / ${goal}</span><span class="mbar"><span data-w="${c/goal*100}" style="width:${c/goal*100}%"></span></span></button>`}).join("")}</div>
   <div class="phase"><div class="row" style="justify-content:space-between"><b>${t("rev.title")}</b><span class="cnt small">${t("rev.count",{n:dq+dv})}</span></div>
    <span class="small">${dq+dv?t("rev.text",{v:dv,q:dq}):t("rev.none")}${soon>0?t("rev.tomorrow",{n:soon}):""}</span>
    ${dq+dv?`<div class="row">${dv?`<button class="btn ghost" id="revV">${t("rev.words",{n:dv})}</button>`:""}${dq?`<button class="btn ghost" data-go="smart">${t("rev.questions",{n:dq})}</button>`:""}</div>`:""}</div>
   <div class="prog"><div class="row" style="justify-content:space-between;align-items:baseline"><b>${t("prog.title")}</b><span class="small">${t("prog.sub")}</span></div>
    <div class="legend">${PROG.map(([k,c])=>`<span><i style="background:var(${c})"></i>${SK[k]}</span>`).join("")}</div>
    <div class="chartBox" id="prog"></div>
    <details class="progTbl"><summary class="small">${t("prog.values")}</summary><div id="progTbl"></div></details></div>
   ${weak?`<div class="ai-box"><b>${t("tip.title",{s:SK[weak]})}</b><span class="small">${t("tip.text",{p:Math.round(acc(weak)*100)})}</span><div><button class="btn ghost" data-go="${goTab[weak]}">${t("tip.btn",{s:SK[weak]})}</button></div></div>`:""}
   <div class="phase"><div class="row" style="justify-content:space-between"><b>Fehlerheft</b><span class="cnt small">${t("err.count",{n:errs})}</span></div>
    <span class="small">${errs?t("err.has"):t("err.none")}</span>
    ${errs?`<div><button class="btn shine" id="goErr">${t("err.go")}</button></div>`:""}</div></div>`;
  $$("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
  if($("#revV"))$("#revV").onclick=()=>{vTheme="alle";vMode="karten";vRecent=[];show("wortschatz")};
  drawProg($("#prog"),$("#progTbl"));
  if(d>0)tick($("#dNum"),d);
  if(canMove())$$(".mbar span").forEach((s,i)=>{const w=+s.dataset.w;s.style.width="0%";anim(s,{width:[ "0%",w+"%"]},{delay:.2+i*.07,type:"spring",stiffness:180,damping:24})});
  if($("#goErr"))$("#goErr").onclick=()=>{errMode=true;show("smart")};
}

/* ===== Claude: correction + Gesprächspartner (sample capability) ===== */
let SAMPLE;
async function getSample(){if(SAMPLE!==undefined)return SAMPLE;try{SAMPLE=window.claude&&window.claude.use?await window.claude.use("sample"):null}catch(e){SAMPLE=null}return SAMPLE}
const aiErr=e=>{const c=e&&e.code;return t(["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(c)?"ai.unavail"
  :c==="rate_limited"?"ai.rate":c==="refused"?"ai.refused":c==="session_expired"?"ai.session":"ai.failed")};
const unavailable=()=>`<div class="ai-box"><span class="small">${t("ai.needClaude")}</span></div>`;
async function aiMail(w,txt,out,btn){
  if((txt.match(/\S+/g)||[]).length<8){out.innerHTML=`<div class="ai-box"><span class="small">${t("ai.writeFirst")}</span></div>`;return}
  const s=await getSample();if(!s){out.innerHTML=unavailable();return}
  btn.disabled=true;out.innerHTML=`<div class="ai-box"><span class="small">${t("ai.correcting")}</span></div>`;
  const prompt=`Du bist Prüfer für das Goethe-Zertifikat A1, Modul Schreiben Teil 2 (10 Punkte).
Aufgabe: ${w.task}
Inhaltspunkte: ${w.pts.map(p=>p[0]).join(" | ")}
Text des Kandidaten:
<<<
${txt.slice(0,3000)}
>>>
Bewerte streng nach A1-Maßstab: Erfüllung der drei Inhaltspunkte, kommunikative Gestaltung (Anrede, Gruß, passende Sätze), formale Richtigkeit. Kleine Fehler, die das Verständnis nicht stören, kosten wenig.
Antworte NUR mit JSON in genau dieser Form:
{"punkte":7.5,"kriterien":[{"name":"Inhaltspunkte","ok":true,"kommentar_fr":"..."},{"name":"Anrede und Gruß","ok":true,"kommentar_fr":"..."},{"name":"Sprache","ok":false,"kommentar_fr":"..."}],"fehler":[{"falsch":"...","richtig":"...","erklaerung_fr":"..."}],"korrigiert":"...","tipp_fr":"..."}
punkte: 0 bis 10 in halben Punkten. fehler: höchstens 6 wichtige Fehler. korrigiert: der Text des Kandidaten, korrigiert, auf A1-Niveau, mit Zeilenumbrüchen. Alle *_fr Felder auf ${langInfo().de}, kurz und einfach.`;
  try{const r=await s.json(prompt,{modelTier:"default"});
    const p=Math.max(0,Math.min(10,Number(r.punkte)||0));record("W",p/10);
    out.innerHTML=`<div class="ai-box"><div class="label">${t("ai.title")}</div><div class="score">${p} / 10</div>
     ${Array.isArray(r.kriterien)?`<ul class="check" style="padding:0">${r.kriterien.map(k=>`<li class="${k.ok?"ok":""}"><b>${esc(k.name||"")}</b> : ${esc(k.kommentar_fr||"")}</li>`).join("")}</ul>`:""}
     ${Array.isArray(r.fehler)&&r.fehler.length?`<div class="label">Fehler</div><ul>${r.fehler.map(f=>`<li><s>${esc(f.falsch||"")}</s> → <b>${esc(f.richtig||"")}</b><br><span class="small">${esc(f.erklaerung_fr||"")}</span></li>`).join("")}</ul>`:""}
     ${r.korrigiert?`<div class="label">${t("ai.corrected")}</div><div class="model" lang="de">${nl(r.korrigiert)}</div>`:""}
     ${r.tipp_fr?`<p class="fr">💡 ${esc(r.tipp_fr)}</p>`:""}<p class="small">${t("ai.estimate")}</p></div>`;
  }catch(e){out.innerHTML=`<div class="ai-box"><span class="small">${aiErr(e)}</span></div>`}
  finally{btn.disabled=false}
}
async function aiSpeak(part,it,txt,out,btn){
  if((txt.match(/\S+/g)||[]).length<3){out.innerHTML=`<div class="ai-box"><span class="small">${t("ai.speakFirst")}</span></div>`;return}
  const s=await getSample();if(!s){out.innerHTML=unavailable();return}
  const max=SPEAK[part].max;btn.disabled=true;out.innerHTML=`<div class="ai-box"><span class="small">${t("ai.listening")}</span></div>`;
  const prompt=`Du bist Prüfer im Goethe-Zertifikat A1, Sprechen Teil ${part} (${SPEAK[part].title}).
Aufgabe/Karte: ${it.p.replace(/\n/g," – ")}
Antwort des Kandidaten (so würde er sprechen):
<<<
${txt.slice(0,1500)}
>>>
Prüfe: Ist die Aufgabe erfüllt? Sind die Sätze verständlich und auf A1-Niveau korrekt?
Die Antwort kann von einer Spracherkennung stammen: Groß-/Kleinschreibung und Satzzeichen nicht bewerten.
Antworte NUR mit JSON: {"punkte":number,"feedback_fr":"...","korrigiert":"...","variante":"..."}
punkte: 0 bis ${max}. feedback_fr: höchstens zwei kurze Sätze auf ${langInfo().de}. korrigiert: die korrigierte Antwort (A1). variante: eine andere gute Antwort (A1).`;
  try{const r=await s.json(prompt,{modelTier:"quick"});const p=Math.max(0,Math.min(max,Number(r.punkte)||0));record("S",p/max);
    out.innerHTML=`<div class="ai-box"><div class="score">${p} / ${max}</div><span>${esc(r.feedback_fr||"")}</span>
     ${r.korrigiert?`<div class="label">${t("ai.corr")}</div><div class="model" lang="de">${nl(r.korrigiert)} <button class="btn ghost" data-say="k" style="padding:2px 10px;font-size:13px">🔊</button></div>`:""}
     ${r.variante?`<div class="label">${t("ai.alt")}</div><div class="model" lang="de">${nl(r.variante)} <button class="btn ghost" data-say="v" style="padding:2px 10px;font-size:13px">🔊</button></div>`:""}</div>`;
    out.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>speak(b.dataset.say==="k"?r.korrigiert:r.variante));
  }catch(e){out.innerHTML=`<div class="ai-box"><span class="small">${aiErr(e)}</span></div>`}
  finally{btn.disabled=false}
}
const THEMEN=["Essen und Trinken","Freizeit","Wohnen","Einkaufen","Familie","Arbeit","Reisen","Wetter"];
let chat={thema:"Freizeit",turns:[],busy:false,ctl:null};
const chatRules=()=>`Du bist ein freundlicher Gesprächspartner in einer mündlichen Prüfung Goethe-Zertifikat A1. Thema: ${chat.thema}.
Regeln: Sprich nur einfaches Deutsch (A1): kurze Sätze, Präsens, Alltagswörter. Höchstens zwei Sätze pro Antwort, dann stelle eine neue einfache Frage zum Thema. Keine Emojis, keine Listen.
Wenn die letzte Nachricht des Lerners einen Fehler hat, schreibe zuerst eine Zeile, die mit "Korrektur:" beginnt und den korrigierten Satz enthält. Danach antwortest du normal. Ohne Fehler: keine Korrektur-Zeile.
Der Lerner duzt dich, du duzt ihn.`;
function gespraech(tabs){
  $("#panel").innerHTML=`<div class="card">${tabs}
   <div class="label">Gesprächspartner · Claude</div>
   <p class="small" style="margin:0">${t("chat.intro")}${t(apiMic?"chat.introApi":"chat.introKbd")}</p>
   <div class="chips">${THEMEN.map(t=>`<button class="chipbtn" data-thema="${esc(t)}" aria-pressed="${t===chat.thema}">${esc(t)}</button>`).join("")}</div>
   <div class="chat" id="chat" aria-live="polite"></div>
   <form class="chatIn" id="chatForm"><input id="chatTxt" lang="de" autocomplete="off" placeholder="Antworte auf Deutsch…" aria-label="${t("chat.aria")}"><button type="button" class="btn ghost mic" id="chatMic" aria-label="${t("chat.mic")}" title="${t("chat.mic")}">🎙️</button><button class="btn" id="chatSend">Senden</button></form>
   <div class="row"><button class="btn ghost" id="chatNew">${chat.turns.length?"Neues Gespräch":"Gespräch starten"}</button><button class="btn ghost" id="chatStop" hidden>Stopp</button></div>
   <p class="status" id="chatStatus" hidden></p></div>`;
  renderChat();
  $$("[data-thema]").forEach(b=>b.onclick=()=>{chat.thema=b.dataset.thema;chat.turns=[];gespraech(tabs)});
  $("#chatNew").onclick=()=>{chat.turns=[];renderChat();chatSend(null)};
  $("#chatStop").onclick=()=>chat.ctl&&chat.ctl.abort();
  $("#chatForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#chatTxt").value.trim();if(!v||chat.busy)return;$("#chatTxt").value="";chatSend(v)});
  const cm=$("#chatMic"),out=$("#chatStatus"),say=t=>{if(cm.isConnected){out.hidden=false;out.textContent=t}};
  const viaKbd=()=>{say(KBD());$("#chatTxt").focus()};
  cm.onclick=()=>{if(cm.classList.contains("rec")){stopListen();return}
    if(!apiMic)return viaKbd();
    const reset=()=>{cm.classList.remove("rec");cm.textContent="🎙️"};
    if(listen({continuous:false,onText:t=>{if(cm.isConnected)$("#chatTxt").value=t},
      onErr:t=>{reset();say(t)},
      onEnd:t=>{reset();if(t&&cm.isConnected&&!chat.busy)$("#chatForm").requestSubmit()}})){cm.classList.add("rec");cm.textContent="⏹";out.hidden=true}
    else viaKbd()};
}
function bubHtml(t){if(t.role==="user")return `<div class="bub me" lang="de">${esc(t.content)}</div>`;
  const m=t.content.match(/^\s*Korrektur:\s*(.+)\n?([\s\S]*)$/);
  return `<div class="bub ai" lang="de">${m?`<span class="korr">✎ ${esc(m[1])}</span>${esc(m[2].trim())}`:esc(t.content)}</div>`}
function renderChat(extra){const c=$("#chat");if(!c)return;
  c.innerHTML=chat.turns.map(bubHtml).join("")+(extra||"")||`<p class="small" style="margin:auto;text-align:center">${t("chat.empty")}</p>`;c.scrollTop=c.scrollHeight}
async function chatSend(msg){
  const s=await getSample(),st2=$("#chatStatus");
  if(!s){st2.hidden=false;st2.textContent=t("chat.needClaude");return}
  if(msg){chat.turns.push({role:"user",content:msg});bump("S");save()}
  chat.turns=chat.turns.slice(-16);while(chat.turns.length&&chat.turns[0].role!=="assistant")chat.turns.shift();
  if(msg&&!chat.turns.length)chat.turns.push({role:"user",content:msg});
  const input=[{role:"user",content:chatRules()+"\n\nBeginne: Begrüße mich kurz und stelle die erste Frage."},...chat.turns];
  if(input[input.length-1].role!=="user")input.push({role:"user",content:"(weiter)"});
  chat.busy=true;chat.ctl=new AbortController();$("#chatSend").disabled=true;$("#chatStop").hidden=false;st2.hidden=true;
  renderChat(`<div class="bub ai" id="live">…</div>`);
  try{const {text}=await s(input,{modelTier:"quick",cache:false,signal:chat.ctl.signal,onText:({text})=>{const l=$("#live");if(l){l.outerHTML=bubHtml({role:"assistant",content:text}).replace('<div class="bub ai">','<div class="bub ai" id="live">');$("#chat").scrollTop=1e6}}});
    chat.turns.push({role:"assistant",content:text});renderChat();speak(text.replace(/^\s*Korrektur:.*\n?/,""));}
  catch(e){renderChat();if(e&&e.code!=="cancelled"){st2.hidden=false;st2.textContent=aiErr(e)}}
  finally{chat.busy=false;const b=$("#chatSend");if(b)b.disabled=false;const sb=$("#chatStop");if(sb)sb.hidden=true;$("#chatNew")&&($("#chatNew").textContent="Neues Gespräch")}
}

/* ===== Wortschatz ===== */
let vTheme="alle",vMode="karten",vRecent=[];
const vFull=x=>(x.a?x.a+" ":"")+x.w;
function vPool(){let p=vTheme==="alle"?WORDS:WORDS.filter(x=>x.th===vTheme);const noun=x=>/^(der|die|das)$/.test(x.a)&&!/^\(/.test(x.p);
  if(vMode==="artikel"){p=p.filter(noun);if(!p.length)p=WORDS.filter(noun)}return p}
function vPick(p){const c=p.filter(x=>!vRecent.includes(x.id));const pool=srsFirst(c.length?c:p);
  const min=Math.min(...pool.map(x=>st.box[x.id]||0));const l=pool.filter(x=>(st.box[x.id]||0)===min);
  const x=l[Math.random()*l.length|0];vRecent=[x.id,...vRecent].slice(0,Math.min(12,p.length-1));return x}
function vStats(p){const m=p.filter(x=>(st.box[x.id]||0)>=2).length;return {m,n:p.length,pct:Math.round(m/p.length*100)}}
function wortschatz(){
  const p=vPool(),s=vStats(vTheme==="alle"?WORDS:WORDS.filter(x=>x.th===vTheme)),x=vPick(p);
  const th=VOC.find(t=>t.k===x.th);
  const head=`<div class="label">${t("v.theme")}</div>
   <div class="chips">${[["alle","Alle"],...VOC.map(t=>[t.k,t.n])].map(([k,n])=>`<button class="chipbtn" data-th="${k}" aria-pressed="${k===vTheme}">${esc(n)}</button>`).join("")}</div>
   <div class="sublist">${[["karten","Karteikarten"],["bedeutung","Bedeutung"],["artikel","der · die · das"]].map(([k,n])=>`<button class="tab" data-vm="${k}" aria-selected="${k===vMode}">${n}</button>`).join("")}</div>
   <div class="row" style="justify-content:space-between"><span class="small">${t("v.mastered",{m:s.m,n:s.n})}</span><span class="small">${th.n}${th.g?" · Wortgruppe":""}</span></div>
   <div class="progress" role="img" aria-label="${t("v.masteredAria",{p:s.pct})}"><span style="width:${s.pct}%"></span></div>`;
  let body="";
  const wordHtml=(showArt)=>`${picHtml(typeof IMG!=="undefined"&&IMG.word(x.w),"wpic")}<p class="${wordCls(x.w)}">${x.a&&showArt?`<span class="art art-${x.a}">${esc(x.a)}</span> `:""}${esc(x.w)}</p>${x.p&&showArt?`<p class="plural">Plural: ${/^\(/.test(x.p)?esc(x.p):"die "+esc(x.p)}</p>`:""}`;
  if(vMode==="karten"){
    body=`${wordHtml(true)}<div class="row" style="justify-content:center"><button class="btn ghost" id="say">🔊 Anhören</button><button class="btn" id="flip">Umdrehen</button></div><div id="back"></div>`;
  }else if(vMode==="bedeutung"){
    const others=shuffle(WORDS.filter(y=>y.th===x.th&&tv(y)!==tv(x))).slice(0,2).map(tv);
    const opts=shuffle([tv(x),...others]);
    body=`<p class="instr">Was bedeutet das Wort?</p>${wordHtml(true)}<div class="row" style="justify-content:center"><button class="btn ghost" id="say">🔊 Anhören</button></div>
     <div class="opts">${opts.map((o,i)=>`<button class="opt" dir="${dirOf(o)}" data-o="${esc(o)}"><span class="ltr">${"abc"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div><div id="back"></div>`;
  }else{
    body=`<p class="instr">Welcher Artikel passt?</p>${wordHtml(false)}<p class="plural">${esc(tv(x))}</p>
     <div class="opts" style="grid-template-columns:repeat(3,1fr)">${["der","die","das"].map(a=>`<button class="opt" data-o="${a}" style="justify-content:center"><span class="art-${a}" style="font-weight:700">${a}</span></button>`).join("")}</div><div id="back"></div>`;
  }
  $("#panel").innerHTML=`<div class="card">${head}<div class="meta"><span class="chip">${esc(th.n)}</span><span class="chip ${(st.box[x.id]||0)===0&&st.hist.length?"hot":""}">Box ${(st.box[x.id]||0)}/4</span>${isDue(x.id)?`<span class="chip">${t("chip.review")}</span>`:""}</div>${body}</div>`;
  $$("[data-th]").forEach(b=>b.onclick=()=>{vTheme=b.dataset.th;vRecent=[];wortschatz()});
  $$("[data-vm]").forEach(b=>b.onclick=()=>{vMode=b.dataset.vm;vRecent=[];wortschatz()});
  const sayBtn=$("#say");if(sayBtn)sayBtn.onclick=()=>speak(vFull(x));
  const back=ok=>`<div class="fb ${ok===false?"no":""}"><p><b lang="de">${esc(vFull(x))}</b> = ${esc(tv(x))}</p>${x.e?`<p class="tr" lang="de">„${esc(x.e)}“ <button class="btn ghost" id="sayEx" style="padding:4px 10px;font-size:13px">🔊</button></p>`:""}</div>`;
  const next=()=>`<div class="row" style="margin-top:12px"><button class="btn" id="nx">Weiter →</button></div>`;
  const bindNext=()=>{const e=$("#sayEx");if(e)e.onclick=()=>speak(x.e);$("#nx").onclick=wortschatz;$("#nx").focus()};
  if(vMode==="karten"){
    $("#flip").onclick=()=>{$("#flip").disabled=true;speak(vFull(x));
      $("#back").innerHTML=`<div class="flip">${back()}<div class="row" style="justify-content:center"><span class="small">${t("v.knew")}</span><button class="btn" data-k="1">Gewusst</button><button class="btn ghost" data-k="0">Nicht gewusst</button></div></div>`;
      const e=$("#sayEx");if(e)e.onclick=()=>speak(x.e);
      $$("[data-k]").forEach(b=>b.onclick=()=>{record("V",+b.dataset.k,x.id);wortschatz()})};
  }else{
    const right=vMode==="bedeutung"?tv(x):x.a;
    $$("[data-o]").forEach(b=>b.onclick=()=>{const ok=b.dataset.o===right;
      $$("[data-o]").forEach(y=>{y.disabled=true;if(y.dataset.o===right)y.classList.add("right")});if(!ok)b.classList.add("wrong");fx(ok,ok?b:b);
      record("V",ok?1:0,x.id);speak(vFull(x));
      $("#back").innerHTML=back(ok)+(vMode==="artikel"&&!ok?`<p class="small">${t("v.tip")}</p>`:"")+next();bindNext()});
  }
}



async function downloadExamPDF(){
  const s=$("#pdfStatus");s.hidden=false;
  if(!window.jspdf){s.textContent=t("pdf.noLib");return}
  s.textContent=t("pdf.making");
  /* les polices de jsPDF n'ont pas l'arabe : explications du PDF en anglais pour l'arabe et la Darija en alphabet arabe */
  const sol=$("#withSol").checked,keep=LANG;if(langInfo().dir==="rtl")LANG="en";
  let doc;try{doc=makeExamPDF(window.jspdf.jsPDF,sol)}finally{LANG=keep}
  const name=`Modellpruefung_A1_${todayStr()}${sol?"_mit_Loesungen":""}.pdf`;
  try{const how=await saveFile(name,new Blob([doc.output("arraybuffer")],{type:"application/pdf"}));
    s.textContent=t(how==="share"?"pdf.readyShare":"pdf.ready")+t("pdf.newEach")}
  catch(e){s.textContent=t(cancelled(e)?"pdf.cancelled":e&&e.code==="rate_limited"?"pdf.busy":"pdf.failed")}
}

/* ===== Prüfung ===== */
let ex=null,exT=null;
function stopExam(){clearInterval(exT);ex=null;hush();}
function exam(){
  stopExam();
  const LV=level(),aufbau=m=>m.s==="S"?t("exam.selfEval"):m.teile?m.teile.map((x,i)=>`Teil ${i+1}: ${x.n}`).join(" · "):m.parts.join(" · ");
  $("#panel").innerHTML=`<div class="card"><h2>Modellprüfung ${LV.id}</h2>
   <p>${t("exam.same")}</p>
   <table class="scoreTbl"><tr><th>Modul</th><th>Aufbau</th><th class="n">Zeit</th></tr>
    ${LV.modules.map(m=>`<tr><td>${SK[m.s]}</td><td>${aufbau(m)}</td><td class="n">${m.s==="H"||m.s==="S"?"≈ ":""}${m.min} min</td></tr>`).join("")}</table>
   <p class="small">${t("exam.scale")}</p><p class="small">${t("exam.telc")}</p>
   <div class="row"><button class="btn shine" id="full">Komplette Prüfung starten</button><button class="btn ghost" id="exp">Express (12 Aufgaben, 10 min)</button></div>
   <div class="pdfBox"><div class="label">${t("exam.paper")}</div>
    <p class="small" style="margin:0">${t("exam.paperDesc")}</p>
    <label><input type="checkbox" id="withSol" checked> ${t("exam.withSol")}</label>
    <div class="row"><button class="btn ghost" id="pdf">📄 PDF herunterladen</button></div>
    <p class="status" id="pdfStatus" hidden></p></div></div>`;
  $("#full").onclick=startFull;$("#exp").onclick=startExpress;$("#pdf").onclick=downloadExamPDF;
}
const takeTeil=(p,n)=>shuffle(Q.filter(q=>q.p===p)).slice(0,n);
const level=()=>levelOf(st.level),modOf=s=>level().modules.find(m=>m.s===s);
function startFull(){
  ex={mode:"full",mods:level().modules.filter(m=>m.teile).map(m=>({s:m.s,qs:m.teile.flatMap(x=>takeTeil(x.p,x.n)),ms:m.min*6e4})),
    m:0,i:0,seq:0,ans:[],raw:{H:0,L:0,W:0,S:null}};
  modIntro();
}
function startExpress(){
  const by=s=>shuffle(Q.filter(q=>q.s===s)).slice(0,4);
  ex={mode:"express",mods:[{s:"X",qs:shuffle([...by("H"),...by("L"),...by("G")]),ms:10*6e4}],m:0,i:0,ans:[]};
  runMod();
}
function stepper(){if(ex.mode!=="full")return"";const steps=["H","L","W","S"],cur=ex.stage||ex.mods[ex.m]?.s;
  return `<div class="stepper" aria-hidden="true">${steps.map(s=>`<span class="${steps.indexOf(s)<=steps.indexOf(cur)?"on":""}"></span>`).join("")}</div>`}
function modIntro(){const M=ex.mods[ex.m];ex.stage=M.s;
  $("#panel").innerHTML=`<div class="card">${stepper()}<div class="label">Modul ${ex.m+1} von ${level().modules.length}</div><h2>${SK[M.s]}</h2><p>${M.qs.length} Aufgaben · ${M.ms/6e4} Minuten.${M.s==="H"?" "+playsNote(modOf("H")):""}</p><div class="row"><button class="btn mark" id="go">Beginnen</button></div></div>`;
  $("#go").onclick=runMod}
function playsNote(m){const by=k=>m.teile.map((x,i)=>TEIL[x.p].plays===k?i+1:0).filter(Boolean),two=by(2),one=by(1),
  ls=a=>a.length>1?a.slice(0,-1).join(", ")+" und "+a[a.length-1]:a[0];
  return [two.length?`Teil ${ls(two)}: zweimal hören.`:"",one.length?`Teil ${ls(one)}: nur einmal hören.`:""].filter(Boolean).join(" ")}
function runMod(){const M=ex.mods[ex.m];ex.i=0;ex.end=Date.now()+M.ms;clearInterval(exT);
  exT=setInterval(()=>{const r=Math.max(0,ex.end-Date.now()),e=$("#et");if(e)e.textContent=mmss(r);if(!r)endMod()},500);examQ()}
function examQ(){const M=ex.mods[ex.m];
  if(ex.i>=M.qs.length)return endMod();
  const q=M.qs[ex.i],opts=optsOf(q),ans=answerOf(q);
  if(ex.mode==="full"&&!(ex.bsp=ex.bsp||{})[q.p]){ex.bsp[q.p]=1;return beispiel(q.p,M)}
  $("#panel").innerHTML=`<div class="card">${stepper()}<div class="row" style="justify-content:space-between"><span class="label">Aufgabe ${ex.i+1} / ${M.qs.length}</span><span class="timer" id="et" style="font-size:20px">${mmss(ex.end-Date.now())}</span></div>${qBody(q,false)}${optsHtml(q,opts)}</div>`;
  bindAudio(q,TEIL[q.p].plays);
  $$(".opt").forEach(b=>b.onclick=()=>{hush();ex.ans.push({q,ok:opts[b.dataset.i]===ans});ex.i++;examQ()});
  if(q.audio&&ex.mode==="full")examAudio(q);
}
/* Comme dans le cahier d'examen : chaque Teil commence par un exemple déjà résolu (« Beispiel »), hors barème. */
function beispiel(p,M){const used=new Set(M.qs.map(x=>x.id)),pool=Q.filter(x=>x.p===p&&!used.has(x.id)),q=pool[Math.random()*pool.length|0];
  if(!q)return examQ();const opts=optsOf(q),ans=answerOf(q);
  $("#panel").innerHTML=`<div class="card bsp">${stepper()}<div class="row" style="justify-content:space-between"><span class="label">${SK[q.s]} Teil ${p[1]} · Beispiel</span><span class="timer" id="et" style="font-size:20px">${mmss(ex.end-Date.now())}</span></div>${qBody(q,false)}${optsHtml(q,opts)}<p class="small" lang="de">Lösung: <b>${esc(ans)}</b></p><div class="row"><button class="btn mark" id="bspGo">Weiter</button></div></div>`;
  $$(".opt").forEach(b=>{b.disabled=true;if(opts[b.dataset.i]===ans)b.classList.add("right")});
  const hs=$("#hStat");if(hs)hs.remove();bindAudio(q);$("#bspGo").onclick=()=>{hush();examQ()};$("#bspGo").focus()}
/* Examen complet : déroulé de l'enregistrement officiel (mesuré sur un test d'entraînement) :
   7 s pour lire la tâche, le texte (deux fois en Teil 1 et 3, avec une courte pause), puis le temps de répondre. */
function examAudio(q){const tok=++ex.seq,plays=TEIL[q.p].plays||1,st=$("#hStat"),btn=$("#play"),alive=()=>ex&&ex.seq===tok;
  if(!st||!btn)return;btn.hidden=true;$("#rate").hidden=true;let n=0,left=7;
  const say=m=>{if(alive())st.textContent=m};
  const play=()=>{if(!alive())return;n++;say(n===1?"🔊 Sie hören den Text.":"🔊 Sie hören den Text noch einmal.");
    if(!speak(q.audio,()=>{if(!alive())return;if(n<plays){say("…");setTimeout(play,2500)}else say("✍️ Kreuzen Sie jetzt an.")})){btn.hidden=false;say("")}};
  const tick=()=>{if(!alive())return;if(left<=0)return play();say(`⏳ Lesen Sie die Aufgabe: ${left} s`);left--;setTimeout(tick,1000)};
  tick()}
function endMod(){clearInterval(exT);hush();
  const M=ex.mods[ex.m];M.qs.slice(ex.i).forEach(q=>ex.ans.push({q,ok:false}));ex.i=M.qs.length;
  if(ex.mode==="express")return finishExpress();
  ex.raw[M.s]=ex.ans.filter(a=>a.q.s===M.s&&a.ok).length;
  ex.m++;if(ex.m<ex.mods.length)return modIntro();
  schreibenExam();
}
function schreibenExam(){ex.stage="W";
  const F=FORMS[Math.random()*FORMS.length|0],w=WRITE[Math.random()*WRITE.length|0];ex.F=F;ex.w=w;
  $("#panel").innerHTML=`<div class="card">${stepper()}<div class="row" style="justify-content:space-between"><h2>Schreiben</h2><span class="timer" id="et" style="font-size:20px">${mmss(modOf("W").min*6e4)}</span></div>
   <div class="label">Teil 1 · Formular (5 Punkte)</div><p class="instr">Lesen Sie den Text und füllen Sie das Formular aus.</p>${formHtml(F)}
   <div class="label">Teil 2 · E-Mail (10 Punkte)</div>${mailHtml(w)}
   <textarea id="txt" aria-label="Ihre E-Mail" placeholder="Liebe … / Lieber … / Sehr geehrte …"></textarea>
   <div class="row"><button class="btn mark" id="done">Abgeben</button></div></div>`;
  ex.end=Date.now()+modOf("W").min*6e4;clearInterval(exT);
  exT=setInterval(()=>{const r=Math.max(0,ex.end-Date.now()),e=$("#et");if(e)e.textContent=mmss(r);if(!r)submitW()},500);
  $("#done").onclick=submitW;
}
function submitW(){clearInterval(exT);
  const f=gradeForm(ex.F,false),g=gradeMail(ex.w,$("#txt").value),m=Math.round(g.sc*10);
  ex.W={f,m,c:g.c};ex.raw.W=f+m;record("W",(f+m)/15);sprechenExam()}
/* Sprechen : grille officielle (Goethe et telc). Teil 1 : se présenter, épeler, un nombre (1 point chacun).
   Teil 2 : deux cartes de thème, chacune une question (2) et une réponse (1). Teil 3 : deux cartes image,
   chacune une demande (2) et une réaction (1). Total 15 ; chaque critère : réussi, à moitié, pas réussi. */
function sprechenExam(){ex.stage="S";
  const two=n=>{const it=shuffle(SPEAK[n].items),a=it[0],b=it.find(x=>x.p.split("\n")[0]!==a.p.split("\n")[0])||it[1];return [a,b]};
  const t1=SPEAK[1].items[0],t2=two(2),t3=two(3);let k=0;
  const row=(lab,max)=>{const id="sr"+k++;return `<div class="rate"><label for="${id}" class="small" lang="de">${lab}</label><select id="${id}" data-max="${max}">${[[0,"nicht geschafft"],[max/2,"teilweise"],[max,"gut"]].map(([v,l])=>`<option value="${v}">${l} (${String(v).replace(".",",")} P.)</option>`).join("")}</select></div>`};
  const card=(it,cls)=>`<div class="sign${it.pic?" withPic":""}" lang="de">${picHtml(it.pic,"card")}<span>${esc(it.p)}</span></div>${it.hint?`<p class="instr" lang="de">${esc(it.hint)}</p>`:""}`;
  $("#panel").innerHTML=`<div class="card">${stepper()}<h2>Sprechen</h2><p class="small">${t("exam.speakIntro")}</p>
   <div class="label">${SPEAK[1].title} · 3 Punkte</div>${card(t1)}<p class="instr" lang="de">Buchstabieren Sie Ihren Namen. Sagen Sie eine Zahl (Telefonnummer, Hausnummer).</p>
   <p class="small">${t("exam.how")}</p>${row("Sich vorstellen",1)}${row("Buchstabieren",1)}${row("Zahlen",1)}
   <div class="label">${SPEAK[2].title} · 6 Punkte</div>${t2.map((it,i)=>card(it)+row(`Frage ${i+1}`,2)+row(`Antwort ${i+1}`,1)).join("")}
   <div class="label">${SPEAK[3].title} · 6 Punkte</div>${t3.map((it,i)=>card(it)+row(`Bitte ${i+1}`,2)+row(`Reaktion ${i+1}`,1)).join("")}
   <div class="row"><button class="btn mark" id="ev">Auswerten</button><button class="btn ghost" id="skip">Ohne Sprechen auswerten</button></div></div>`;
  $("#ev").onclick=()=>{const s=[...$$("#panel select")].reduce((a,e)=>a+ +e.value,0);ex.raw.S=Math.round(s*2)/2;record("S",s/15);finishFull()};
  $("#skip").onclick=finishFull;
}
function grade(p){return p>=90?"sehr gut":p>=80?"gut":p>=70?"befriedigend":p>=60?"ausreichend":"nicht bestanden"}
function finishFull(){
  const LV=level(),R=ex.raw,pts=k=>R[k]===null?null:Math.round(R[k]*LV.factor*10)/10,P=LV.pass,max=modOf("H").max,wMax=Math.round(3*max*LV.factor);
  ex.ans.forEach(a=>record(a.q.s,a.ok?1:0,a.q.id));
  const written=pts("H")+pts("L")+pts("W"),total=R.S===null?null:Math.round(written+pts("S"));
  const row=(k,label)=>`<tr><td>${label}</td><td class="n">${R[k]===null?"–":String(R[k]).replace(".",",")+" / "+modOf(k).max}</td><td class="n">${R[k]===null?"–":pts(k).toFixed(1)}</td></tr>`;
  const perTeil=LV.modules.flatMap(m=>m.teile?m.teile.map(x=>x.p):[]).map(p=>{const a=ex.ans.filter(x=>x.q.p===p);return `<li class="${a.filter(x=>x.ok).length/a.length>=.6?"ok":""}">${SK[p[0]]} Teil ${p[1]}: ${a.filter(x=>x.ok).length}/${a.length}</li>`}).join("");
  const wrong=ex.ans.filter(a=>!a.ok).map(a=>`<li>${a.q.ab?esc(a.q.q):fmtQ(a.q.q)} → <b>${esc(answerOf(a.q))}</b><div class="small" dir="${dirOf(tq(a.q).x)}">${esc(tq(a.q).x)}</div></li>`).join("");
  const verdict=total===null?t("res.written",{w:Math.round(written),need:Math.max(0,P-Math.round(written))})
    :total>=P?`<b>Bestanden – ${grade(total)}.</b> ${t("res.pass")}`:`<b>Nicht bestanden.</b> ${t("res.fail",{n:P-total})}`;
  const W=ex.W;ex=null;bump("E");save();
  $("#panel").innerHTML=`<div class="card"><div class="label">Ergebnis</div>${authEmail()?`<p class="small" style="margin:0">${esc(t("res.account",{e:authEmail()}))}</p>`:""}<div class="big">${total===null?Math.round(written)+" / "+wMax:total+" / 100"}</div><p>${verdict}</p>
   <table class="scoreTbl"><tr><th>Modul</th><th class="n">Rohpunkte</th><th class="n">× ${String(LV.factor).replace(".",",")}</th></tr>${row("H","Hören")}${row("L","Lesen")}${row("W","Schreiben")}${row("S","Sprechen")}
   <tr class="total"><td>Gesamt</td><td></td><td class="n">${total===null?Math.round(written)+" / "+wMax:total+" / 100"}</td></tr></table>
   <div class="label">${t("res.perTeil")}</div><ul class="check">${perTeil}</ul>
   <div class="label">Schreiben</div><p class="small">${t("res.write",{f:W.f,m:W.m})}</p>${checkHtml(W.c)}
   ${wrong?`<div class="label">Fehler</div><ul>${wrong}</ul>`:""}
   <div class="row"><button class="btn" id="ag">Neue Prüfung</button><button class="btn ghost" id="tr">Fehler trainieren</button></div></div>`;
  $("#ag").onclick=exam;$("#tr").onclick=()=>{errMode=true;show("smart")};
}
function finishExpress(){
  ex.ans.forEach(a=>record(a.q.s,a.ok?1:0,a.q.id));
  const tot=ex.ans.filter(a=>a.ok).length,p=Math.round(tot/ex.ans.length*100);
  const per=["H","L","G"].map(s=>{const a=ex.ans.filter(x=>x.q.s===s),k=a.filter(x=>x.ok).length;return `<li class="${k>=3?"ok":""}">${SK[s]}: ${k}/${a.length}</li>`}).join("");
  const wrong=ex.ans.filter(a=>!a.ok).map(a=>`<li>${a.q.ab?esc(a.q.q):fmtQ(a.q.q)} → <b>${esc(answerOf(a.q))}</b><div class="small" dir="${dirOf(tq(a.q).x)}">${esc(tq(a.q).x)}</div></li>`).join("");
  ex=null;
  $("#panel").innerHTML=`<div class="card"><div class="label">Ergebnis Express</div><div class="big">${p} %</div><p class="verdict">${p>=60?"Über der 60-%-Grenze. Weiter so!":"Unter 60 %. "+t("res.expFail")}</p><ul class="check">${per}</ul>${wrong?`<div class="label">Fehler</div><ul>${wrong}</ul>`:""}<div class="row"><button class="btn" id="ag">Zurück</button><button class="btn ghost" id="tr">Fehler trainieren</button></div></div>`;
  $("#ag").onclick=exam;$("#tr").onclick=()=>{errMode=true;show("smart")};
}

function show(t){clearInterval(tmr);stopExam();stopListen();
  $$("[data-tab]").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===t));
  ({heute,smart,wortschatz,sprechen,schreiben,exam})[t]();try{window.scrollTo({top:0})}catch(e){}
  moveInd();anim($("#panel").firstElementChild,{opacity:[0,1],y:[16,0]},SPRING)}
$$("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));
try{speechSynthesis.getVoices()}catch(e){}
if(st.hist.length&&!(st.snap&&st.snap[todayStr()])){snapDay();save()}
$("#bkSave").onclick=backupSave;$("#bkLoad").onclick=()=>$("#bkFile").click();
$("#bkFile").onchange=e=>{backupLoad(e.target.files[0]);e.target.value=""};
$("#onbAgain").onclick=()=>{$(".settings").open=false;onboard()};
applyDesign();applyLang();renderMeter();renderCountdown();renderAbout();bkInfo();notifSync();heute();
authStart(()=>{if(!st.onboarded){if(st.hist.length){st.onboarded=true;save()}else onboard()}}); // écran de connexion si les comptes sont activés
