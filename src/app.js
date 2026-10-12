/* Logique de l'appli : état, entraînement adaptatif, Heute, Wortschatz, Sprechen, Schreiben, Prüfung, Motion, Claude. */
let st={box:{},hist:[],exam:"",err:{}};
try{const s=JSON.parse(localStorage.getItem("a1coach")||"null");if(s)st=Object.assign(st,s)}catch(e){}
const save=()=>{try{localStorage.setItem("a1coach",JSON.stringify(st))}catch(e){}};
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
  if(st.day[k]===G[k]&&typeof toast==="function"){toast(`Mission ${N[k]} terminée`);confetti(innerWidth/2,90,22)}}
function streakNow(){if(!st.day)return 0;const yest=new Date(Date.now()-864e5).toLocaleDateString("sv");return st.day.date===todayStr()||st.day.date===yest?st.streak||0:0}
function record(s,v,id){st.hist.push({s,v});if(st.hist.length>500)st.hist=st.hist.slice(-500);
  if(id){const b=st.box[id]||0;st.box[id]=v>=1?Math.min(b+1,4):v>0?b:0;
    if(!id.startsWith("v_")){st.err=st.err||{};if(v<1)st.err[id]=1;else if(st.box[id]>=2)delete st.err[id]}}
  bump({H:"Q",L:"Q",G:"Q",V:"V",S:"S",W:"W"}[s]||"Q");save();renderMeter()}

function renderMeter(){
  const off=["H","L","W","S"];let sum=0,n=0;
  $("#bars").innerHTML=[...off,"V","G"].map(k=>{const a=acc(k);if(a!==null&&off.includes(k)){sum+=a;n++}
    const p=a===null?0:Math.round(a*100);
    return `<div class="bar ${off.includes(k)?"":"aux"}"><span>${SK[k]}</span><div class="track" role="img" aria-label="${SK[k]} ${a===null?"pas encore testé":p+" %"}"><div class="fill ${a===null?"":p>=60?"ok":"low"}" style="width:${p}%"></div></div><span class="pct">${a===null?"–":p+"%"}</span></div>`}).join("");
  if(!n){$("#overall").textContent="–";return}
  const o=Math.round(sum/n*100),weak=off.filter(k=>acc(k)!==null&&acc(k)<.6).map(k=>SK[k]);
  $("#overall").textContent=o+" %";
  $("#verdict").textContent=n<4?`Encore ${4-n} épreuve(s) à tester pour un diagnostic complet.`:weak.length?`Priorité : ${weak.join(", ")}.`:"Au-dessus du seuil partout. Fais une Modellprüfung complète.";
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
  requestAnimationFrame(()=>moveInd(true));}

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
  const [left,cap,num]=d===null?["DATUM WÄHLEN","Date d'examen ci-dessous","--"]:d<0?["GESCHAFFT","Examen passé","--"]:d===0?["PRÜFUNG HEUTE","Viel Erfolg !","00"]:["PRÜFUNG",d===1?"Abfahrt morgen":"Abfahrt in Tagen",String(Math.min(d,99)).padStart(2,"0")];
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
function fx(ok,el){if(!el)return;
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
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang="de-DE";u.rate=rate;
  const v=speechSynthesis.getVoices().find(v=>/^de/i.test(v.lang));if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u);return true}catch(e){return false}}
const rateLabel=()=>`Tempo: ${rate<1?"langsam":"normal"}`;

/* question helpers */
const isRF=q=>q.rf!==undefined;
const answerOf=q=>isRF(q)?(q.rf?"Richtig":"Falsch"):q.ab?"ab"[q.c]:q.o[0];
const optsOf=q=>isRF(q)?["Richtig","Falsch"]:q.ab?["a","b"]:shuffle(q.o);
const fmtQ=s=>esc(s).replace(/___/g,'<span class="blank"></span>');
const teilName=q=>q.p==="G"?"Grammatik":`${SK[q.s]} Teil ${q.p[1]}`;

function qBody(q,training){
  let h=`<div class="meta"><span class="chip">${teilName(q)}</span><span class="chip">${esc(q.t)}</span>${training?`<span class="chip ${(st.box[q.id]||0)===0&&st.hist.length?"hot":""}">Box ${(st.box[q.id]||0)}/4</span>`:""}</div>`;
  h+=`<p class="instr">${TEIL[q.p].i}</p>`;
  if(q.audio)h+=`<div class="row"><button class="btn mark" id="play">▶ Hören</button><button class="btn ghost" id="rate">${rateLabel()}</button></div>`;
  if(q.mail)h+=`<div class="mail">${esc(q.mail)}</div>`;
  if(q.ab)h+=`<p class="q">${esc(q.q)}</p><div class="ab">${q.ab.map((t,i)=>`<div class="sign"><b>${"ab"[i]}</b>${esc(t)}</div>`).join("")}</div>`;
  else{if(q.sign)h+=`<div class="sign">${esc(q.sign)}</div>`;h+=`<p class="q">${fmtQ(q.q)}</p>`}
  if(training)h+=`<div><button class="btn help" id="help">🇫🇷 Hilfe</button><p class="fr" id="frT" hidden>${esc(q.fr)}</p></div>`;
  return h;
}
function optsHtml(q,opts){const letters=!isRF(q)&&!q.ab;
  return `<div class="opts ${isRF(q)||q.ab?"two":""}">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${letters?`<span class="ltr">${"abc"[i]}</span>`:""}<span>${esc(o)}</span></button>`).join("")}</div>`}
function bindAudio(q,maxPlays){if(!q.audio)return;let plays=0;
  $("#play").onclick=()=>{if(maxPlays&&plays>=maxPlays)return;
    if(!speak(q.audio)){$("#play").textContent="Audio indisponible sur cet appareil";return}
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
  const min=Math.min(...items.map(q=>st.box[q.id]||0));
  items=items.filter(q=>(st.box[q.id]||0)===min);
  const q=items[Math.random()*items.length|0];
  recent=[q.id,...recent].slice(0,Math.min(10,pool.length-1));return q;
}

let errMode=false;
const errIds=()=>Q.filter(q=>st.err&&st.err[q.id]);
function smart(){
  let pool=Q,banner="";
  if(errMode){pool=errIds();
    if(!pool.length){errMode=false;pool=Q;banner=`<div class="ai-box"><b>Fehlerheft vide. Bravo !</b><span class="small">Toutes tes erreurs ont été corrigées deux fois de suite. Retour au Training normal.</span></div>`}
    else banner=`<div class="ai-box"><div class="row" style="justify-content:space-between"><b>Fehlerheft · ${pool.length} question${pool.length>1?"s":""} à revoir</b><button class="btn ghost" id="exitErr" style="padding:6px 12px;font-size:13px">Quitter</button></div><span class="small">Une question sort du Fehlerheft quand tu la réussis deux fois.</span></div>`}
  const q=pick(pool),opts=optsOf(q),ans=answerOf(q);let used=false;
  const pl=TEIL[q.p].plays;
  $("#panel").innerHTML=`<div class="card">${banner}${qBody(q,true)}${pl?`<p class="small">À l'examen : ${pl===1?"une seule écoute":"deux écoutes"}. Ici, écoute autant que tu veux.</p>`:""}${optsHtml(q,opts)}<div id="after"></div></div>`;
  bindAudio(q);
  if($("#exitErr"))$("#exitErr").onclick=()=>{errMode=false;smart()};
  $("#help").onclick=()=>{used=true;$("#frT").hidden=false;$("#help").disabled=true};
  $$(".opt").forEach(b=>b.onclick=()=>{
    const ok=opts[b.dataset.i]===ans;
    $$(".opt").forEach(x=>{x.disabled=true;if(opts[x.dataset.i]===ans)x.classList.add("right")});
    if(!ok)b.classList.add("wrong");fx(ok,ok?b:b);
    record(q.s,ok?(used?.5:1):0,q.id);
    $("#after").innerHTML=`<div class="fb ${ok?"":"no"}"><p><b>${ok?"Richtig!":"Leider falsch."}</b> ${esc(q.x)}</p>${q.audio?`<p class="tr">„${esc(q.audio)}“</p>`:""}<p class="fr">${esc(q.fr)}</p>${!ok?'<p class="small">Cette question reviendra bientôt.</p>':used?'<p class="small">Aide utilisée : la question reviendra pour la valider sans traduction.</p>':""}</div><div class="row" style="margin-top:12px"><button class="btn" id="next">Weiter →</button></div>`;
    $("#next").onclick=smart;$("#next").focus();
  });
}

let spPart=2,spIdx=0,tmr=null;
function sprechen(){
  clearInterval(tmr);
  const spTabs=`<div class="sublist">${[1,2,3,4].map(n=>`<button class="tab" data-p="${n}" aria-selected="${n===spPart}">${n===4?"💬 Gespräch":"Teil "+n}</button>`).join("")}</div>`;
  if(spPart===4){gespraech(spTabs);$$("[data-p]").forEach(b=>b.onclick=()=>{spPart=+b.dataset.p;spIdx=0;sprechen()});return}
  const P=SPEAK[spPart],it=P.items[spIdx%P.items.length];
  $("#panel").innerHTML=`<div class="card">
   ${spTabs}
   <div class="label">${P.title} · ${P.max} Punkte</div><div class="sign">${esc(it.p)}</div>${it.hint?`<p class="instr">${esc(it.hint)}</p>`:""}
   <div><button class="btn help" id="help">🇫🇷 Hilfe</button><p class="fr" id="frT" hidden>${esc(it.fr)}</p></div>
   <div class="row"><span class="timer" id="t">0:30</span><button class="btn mark" id="go">Laut sprechen (30 s)</button></div>
   <div id="m"></div>
   <div class="row"><button class="btn ghost" id="show">Musterlösung</button></div>
   <details class="aiWrap"><summary>✍️ Écrire ma réponse et la faire corriger par Claude</summary>
    <textarea id="spTxt" style="min-height:90px" placeholder="Écris ici ce que tu dirais, en allemand…"></textarea>
    <div><button class="btn" id="spAi">Faire corriger</button></div><div id="spOut"></div></details></div>`;
  $$("[data-p]").forEach(b=>b.onclick=()=>{spPart=+b.dataset.p;spIdx=0;sprechen()});
  $("#spAi").onclick=()=>aiSpeak(spPart,it,$("#spTxt").value,$("#spOut"),$("#spAi"));
  $("#help").onclick=()=>{$("#frT").hidden=false;$("#help").disabled=true};
  $("#go").onclick=()=>{let s=30;clearInterval(tmr);$("#go").disabled=true;tmr=setInterval(()=>{s--;$("#t").textContent="0:"+String(s).padStart(2,"0");if(s<=0){clearInterval(tmr);reveal()}},1000)};
  const reveal=()=>{clearInterval(tmr);$("#m").innerHTML=`<div class="model">${nl(it.m)}</div><div class="row" style="margin-top:10px"><span class="small">Hat es geklappt?</span><button class="btn" data-r="1">Ja</button><button class="btn ghost" data-r=".5">Teilweise</button><button class="btn ghost" data-r="0">Nein</button></div>`;
    $("#show").textContent="🔊 Muster anhören";$("#show").onclick=()=>speak(it.m.replace(/Frage:|Antwort:|–/g,""));
    $$("[data-r]").forEach(b=>b.onclick=()=>{record("S",+b.dataset.r);spIdx++;sprechen()})};
  $("#show").onclick=reveal;
}

/* Schreiben: reusable renderers + graders */
const formHtml=F=>`<div class="mail">${esc(F.text)}</div><div class="form">${F.f.map((f,i)=>{const id="ff"+i;
  const ctrl=Array.isArray(f[1])?`<select id="${id}"><option value="">– bitte wählen –</option>${f[1].slice(1).map(o=>`<option>${esc(o)}</option>`).join("")}</select>`:`<input id="${id}" autocomplete="off">`;
  return `<div class="f" id="w${i}"><label for="${id}">${esc(f[0])}</label>${ctrl}</div>`}).join("")}</div>`;
function gradeForm(F,show){let ok=0;
  F.f.forEach((f,i)=>{const sol=Array.isArray(f[1])?f[1][0]:f[1],good=norm($("#ff"+i).value)===norm(sol);if(good)ok++;
    if(show){const row=$("#w"+i);row.className="f "+(good?"ok":"no");row.querySelector(".sol")?.remove();
      if(!good)row.insertAdjacentHTML("beforeend",`<span class="sol">Lösung: ${esc(sol)}</span>`)}});return ok}
const mailHtml=w=>`<p class="q">${esc(w.task)}</p><p class="instr">Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.</p><ul>${w.pts.map(p=>`<li>${esc(p[0])}</li>`).join("")}</ul>`;
function gradeMail(w,t){const words=(t.match(/\S+/g)||[]).length;
  const c=[["Anrede (Liebe/Lieber/Hallo/Sehr geehrte …)",/^\s*(liebe|lieber|hallo|hi|sehr geehrte)/i.test(t)],
    ...w.pts.map(p=>[p[0],p[2].test(t)]),
    ["Gruß am Ende (Viele Grüße, Bis bald …)",/grüße|gruß|bis bald|bis samstag|bis dann/i.test(t)],
    [`Länge: ${words} Wörter (Ziel: 25–45)`,words>=25&&words<=45]];
  return {c,sc:c.filter(x=>x[1]).length/c.length}}
const checkHtml=c=>`<ul class="check">${c.map(x=>`<li class="${x[1]?"ok":""}">${esc(x[0])}</li>`).join("")}</ul>`;

let wPart=2,wIdx=0,fIdx=0;
function schreiben(){
  const tabs=`<div class="sublist">${[[1,"Teil 1 · Formular"],[2,"Teil 2 · E-Mail"]].map(([n,l])=>`<button class="tab" data-w="${n}" aria-selected="${n===wPart}">${l}</button>`).join("")}</div>`;
  const bindW=()=>$$("[data-w]").forEach(b=>b.onclick=()=>{wPart=+b.dataset.w;schreiben()});
  if(wPart===1){
    const F=FORMS[fIdx%FORMS.length];
    $("#panel").innerHTML=`<div class="card">${tabs}<div class="meta"><span class="chip">Schreiben Teil 1 · 5 Punkte</span><span class="chip">${esc(F.title)}</span></div>
     <p class="instr">Lesen Sie den Text und füllen Sie das Formular aus.</p>${formHtml(F)}
     <div><button class="btn help" id="help">🇫🇷 Hilfe</button><p class="fr" id="frT" hidden>${esc(F.fr)}</p></div>
     <div class="row"><button class="btn" id="chk">Korrigieren</button><button class="btn ghost" id="nx">Neues Formular</button></div><div id="res"></div></div>`;
    bindW();$("#help").onclick=()=>{$("#frT").hidden=false;$("#help").disabled=true};
    $("#nx").onclick=()=>{fIdx++;schreiben()};
    $("#chk").onclick=()=>{const ok=gradeForm(F,true);record("W",ok/F.f.length);
      $("#res").innerHTML=`<div class="fb ${ok>=3?"":"no"}"><p><b>${ok} / 5 Punkte</b></p><p class="small">Astuce : recopie exactement les mots du texte.</p></div>`};
    return;
  }
  const w=WRITE[wIdx%WRITE.length];
  $("#panel").innerHTML=`<div class="card">${tabs}<div class="meta"><span class="chip">Schreiben Teil 2 · 10 Punkte</span><span class="chip">${esc(w.title)}</span></div>
   ${mailHtml(w)}
   <div><button class="btn help" id="help">🇫🇷 Hilfe</button><div id="frT" hidden><p class="fr">${esc(w.fr)}</p><ul class="fr">${w.pts.map(p=>`<li>${esc(p[1])}</li>`).join("")}</ul></div></div>
   <label class="label" for="txt">Ihre E-Mail</label><textarea id="txt" placeholder="Liebe … / Lieber … / Sehr geehrte …"></textarea>
   <div class="row"><button class="btn" id="chk">Korrigieren</button><button class="btn ghost" id="ai">✨ Correction détaillée par Claude</button><button class="btn ghost" id="nx">Neue Aufgabe</button></div><div id="aiOut"></div><div id="res"></div></div>`;
  $("#ai").onclick=()=>aiMail(w,$("#txt").value,$("#aiOut"),$("#ai"));
  bindW();$("#help").onclick=()=>{$("#frT").hidden=false;$("#help").disabled=true};
  $("#nx").onclick=()=>{wIdx++;schreiben()};
  $("#chk").onclick=()=>{const g=gradeMail(w,$("#txt").value);record("W",g.sc);
    $("#res").innerHTML=`<div class="fb ${g.sc>=.6?"":"no"}"><p><b>≈ ${Math.round(g.sc*10)} / 10 Punkte</b></p>${checkHtml(g.c)}<p class="small">Estimation par mots-clés : à l'examen, deux correcteurs notent aussi la correction de la langue.</p></div><div class="label" style="margin-top:12px">Musterlösung</div><div class="model">${nl(w.model)}</div>`};
}

/* ===== Heute: plan, missions, streak, Fehlerheft ===== */
const WD=["So","Mo","Di","Mi","Do","Fr","Sa"];
function metroHtml(d){if(d===null||d<1)return"";
  const days=[];for(let i=0;i<d;i++){if(d>7&&i>=2&&i<d-4){if(i===2)days.push({gap:1});continue}days.push({i})}
  const lbl=i=>i===0?"Heute":i===1?"Morgen":WD[new Date(Date.now()+i*864e5).getDay()];
  return `<div class="metro" aria-label="Ligne jusqu'à l'examen"><div class="metroLine">${days.map(x=>x.gap?`<div class="stn gap"><i></i><span>…</span></div>`
    :`<div class="stn ${x.i===0?"now":""}">${x.i===0&&!RM?'<span class="pulse"></span>':""}<i></i><span>${lbl(x.i)}</span></div>`).join("")}<div class="stn end"><i></i><span>Prüfung</span></div></div></div>`}
function daysLeft(){if(!st.exam)return null;return Math.ceil((new Date(st.exam+"T09:00")-new Date())/864e5)}
function heute(){
  const d=daysLeft(),day=st.day&&st.day.date===todayStr()?st.day:{Q:0,V:0,S:0,W:0,E:0},sk=streakNow(),errs=errIds().length;
  const M=[["Q","Training","20 questions adaptatives",20,"smart"],["V","Wortschatz","15 mots",15,"wortschatz"],["S","Sprechen","3 cartes d'oral",3,"sprechen"],["W","Schreiben","1 formulaire ou e-mail",1,"schreiben"]];
  if(d!==null&&d<=3&&d>0)M.push(["E","Modellprüfung","1 examen complet",1,"exam"]);
  const done=M.filter(m=>(day[m[0]]||0)>=m[3]).length;
  const phase=d===null?["Pas encore de date","Indique la date de ton examen en haut de la page pour un plan jour par jour."]
    :d<0?["Examen passé","Tu peux continuer à t'entraîner pour garder ton niveau."]
    :d===0?["Jour J","Rien de nouveau aujourd'hui : relis ta présentation (Sprechen Teil 1) et un modèle d'e-mail. Viel Erfolg !"]
    :d<=3?["Phase 3 · Simulation","Une Modellprüfung complète par jour, puis le Fehlerheft. Dors bien la veille."]
    :d<=5?["Phase 2 · Formats","Entraîne chaque partie dans son format officiel : Training, Schreiben et Sprechen tous les jours."]
    :["Phase 1 · Bases","Vocabulaire et grammaire chaque jour, puis découvre les formats d'examen dans le Training."];
  const off=["H","L","W","S"].map(k=>[k,acc(k)]).filter(x=>x[1]!==null).sort((a,b)=>a[1]-b[1]);
  const weak=off.length&&off[0][1]<.6?off[0][0]:null;
  const goTab={H:"smart",L:"smart",W:"schreiben",S:"sprechen"};
  $("#panel").innerHTML=`<div class="card">
   <div class="todayHead"><h2>Dein Plan</h2>${sk?`<span class="streak">🔥 ${sk} jour${sk>1?"s":""} d'affilée</span>`:""}</div>
   <div class="phase"><b>${phase[0]}</b><span class="small">${phase[1]}</span></div>
   ${metroHtml(d)}
   <div class="row" style="justify-content:space-between"><div class="label">Missions du jour</div><span class="small">${done} / ${M.length} terminées</span></div>
   <div class="missions">${M.map(([k,n,desc,goal,tab])=>{const c=Math.min(day[k]||0,goal),ok=c>=goal;
     return `<button class="mis ${ok?"done":""}" data-go="${tab}"><span class="ic">${ok?"✓":""}</span><span><b>${n}</b> <span class="small">· ${desc}</span></span><span class="cnt">${c} / ${goal}</span><span class="mbar"><span data-w="${c/goal*100}" style="width:${c/goal*100}%"></span></span></button>`}).join("")}</div>
   ${weak?`<div class="ai-box"><b>Conseil du jour : ${SK[weak]}</b><span class="small">C'est ta partie la plus faible (${Math.round(acc(weak)*100)} %). Une session de plus aujourd'hui fera la différence.</span><div><button class="btn ghost" data-go="${goTab[weak]}">Travailler ${SK[weak]}</button></div></div>`:""}
   <div class="phase"><div class="row" style="justify-content:space-between"><b>Fehlerheft</b><span class="cnt small">${errs} question${errs>1?"s":""}</span></div>
    <span class="small">${errs?"Les questions que tu as ratées, à revoir jusqu'à deux bonnes réponses de suite.":"Aucune erreur en attente. Les questions ratées apparaîtront ici."}</span>
    ${errs?`<div><button class="btn shine" id="goErr">Revoir mes erreurs</button></div>`:""}</div></div>`;
  $$("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
  if(d>0)tick($("#dNum"),d);
  if(canMove())$$(".mbar span").forEach((s,i)=>{const w=+s.dataset.w;s.style.width="0%";anim(s,{width:[ "0%",w+"%"]},{delay:.2+i*.07,type:"spring",stiffness:180,damping:24})});
  if($("#goErr"))$("#goErr").onclick=()=>{errMode=true;show("smart")};
}

/* ===== Claude: correction + Gesprächspartner (sample capability) ===== */
let SAMPLE;
async function getSample(){if(SAMPLE!==undefined)return SAMPLE;try{SAMPLE=window.claude&&window.claude.use?await window.claude.use("sample"):null}catch(e){SAMPLE=null}return SAMPLE}
const aiErr=e=>{const c=e&&e.code;return ["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(c)?"La correction par Claude n'est pas disponible ici."
  :c==="rate_limited"?"Trop de demandes pour le moment. Réessaie dans quelques minutes.":c==="refused"?"Claude n'a pas pu traiter ce texte. Reformule-le.":c==="session_expired"?"Reconnecte-toi à Claude, puis réessaie.":"La correction n'a pas abouti. Réessaie."};
const unavailable=`<div class="ai-box"><span class="small">La correction par Claude fonctionne quand l'appli est ouverte dans claude.ai ou dans l'app Claude.</span></div>`;
async function aiMail(w,t,out,btn){
  if((t.match(/\S+/g)||[]).length<8){out.innerHTML=`<div class="ai-box"><span class="small">Écris d'abord ton e-mail (au moins une phrase par point).</span></div>`;return}
  const s=await getSample();if(!s){out.innerHTML=unavailable;return}
  btn.disabled=true;out.innerHTML=`<div class="ai-box"><span class="small">Claude corrige ton e-mail… (environ 20 secondes)</span></div>`;
  const prompt=`Du bist Prüfer für das Goethe-Zertifikat A1, Modul Schreiben Teil 2 (10 Punkte).
Aufgabe: ${w.task}
Inhaltspunkte: ${w.pts.map(p=>p[0]).join(" | ")}
Text des Kandidaten:
<<<
${t.slice(0,3000)}
>>>
Bewerte streng nach A1-Maßstab: Erfüllung der drei Inhaltspunkte, kommunikative Gestaltung (Anrede, Gruß, passende Sätze), formale Richtigkeit. Kleine Fehler, die das Verständnis nicht stören, kosten wenig.
Antworte NUR mit JSON in genau dieser Form:
{"punkte":7.5,"kriterien":[{"name":"Inhaltspunkte","ok":true,"kommentar_fr":"..."},{"name":"Anrede und Gruß","ok":true,"kommentar_fr":"..."},{"name":"Sprache","ok":false,"kommentar_fr":"..."}],"fehler":[{"falsch":"...","richtig":"...","erklaerung_fr":"..."}],"korrigiert":"...","tipp_fr":"..."}
punkte: 0 bis 10 in halben Punkten. fehler: höchstens 6 wichtige Fehler. korrigiert: der Text des Kandidaten, korrigiert, auf A1-Niveau, mit Zeilenumbrüchen. Alle *_fr Felder auf Französisch, kurz und einfach.`;
  try{const r=await s.json(prompt,{modelTier:"default"});
    const p=Math.max(0,Math.min(10,Number(r.punkte)||0));record("W",p/10);
    out.innerHTML=`<div class="ai-box"><div class="label">Correction par Claude</div><div class="score">${p} / 10</div>
     ${Array.isArray(r.kriterien)?`<ul class="check" style="padding:0">${r.kriterien.map(k=>`<li class="${k.ok?"ok":""}"><b>${esc(k.name||"")}</b> : ${esc(k.kommentar_fr||"")}</li>`).join("")}</ul>`:""}
     ${Array.isArray(r.fehler)&&r.fehler.length?`<div class="label">Fehler</div><ul>${r.fehler.map(f=>`<li><s>${esc(f.falsch||"")}</s> → <b>${esc(f.richtig||"")}</b><br><span class="small">${esc(f.erklaerung_fr||"")}</span></li>`).join("")}</ul>`:""}
     ${r.korrigiert?`<div class="label">Ton texte corrigé</div><div class="model">${nl(r.korrigiert)}</div>`:""}
     ${r.tipp_fr?`<p class="fr">💡 ${esc(r.tipp_fr)}</p>`:""}<p class="small">Estimation : à l'examen, deux correcteurs notent ton texte.</p></div>`;
  }catch(e){out.innerHTML=`<div class="ai-box"><span class="small">${aiErr(e)}</span></div>`}
  finally{btn.disabled=false}
}
async function aiSpeak(part,it,t,out,btn){
  if((t.match(/\S+/g)||[]).length<3){out.innerHTML=`<div class="ai-box"><span class="small">Écris ce que tu dirais à voix haute, en une ou plusieurs phrases.</span></div>`;return}
  const s=await getSample();if(!s){out.innerHTML=unavailable;return}
  const max=SPEAK[part].max;btn.disabled=true;out.innerHTML=`<div class="ai-box"><span class="small">Claude écoute ta réponse…</span></div>`;
  const prompt=`Du bist Prüfer im Goethe-Zertifikat A1, Sprechen Teil ${part} (${SPEAK[part].title}).
Aufgabe/Karte: ${it.p.replace(/\n/g," – ")}
Antwort des Kandidaten (so würde er sprechen):
<<<
${t.slice(0,1500)}
>>>
Prüfe: Ist die Aufgabe erfüllt? Sind die Sätze verständlich und auf A1-Niveau korrekt?
Antworte NUR mit JSON: {"punkte":number,"feedback_fr":"...","korrigiert":"...","variante":"..."}
punkte: 0 bis ${max}. feedback_fr: höchstens zwei kurze Sätze auf Französisch. korrigiert: die korrigierte Antwort (A1). variante: eine andere gute Antwort (A1).`;
  try{const r=await s.json(prompt,{modelTier:"quick"});const p=Math.max(0,Math.min(max,Number(r.punkte)||0));record("S",p/max);
    out.innerHTML=`<div class="ai-box"><div class="score">${p} / ${max}</div><span>${esc(r.feedback_fr||"")}</span>
     ${r.korrigiert?`<div class="label">Corrigé</div><div class="model">${nl(r.korrigiert)} <button class="btn ghost" data-say="k" style="padding:2px 10px;font-size:13px">🔊</button></div>`:""}
     ${r.variante?`<div class="label">Autre possibilité</div><div class="model">${nl(r.variante)} <button class="btn ghost" data-say="v" style="padding:2px 10px;font-size:13px">🔊</button></div>`:""}</div>`;
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
   <p class="small" style="margin:0">Claude te pose des questions simples sur un thème, comme à l'oral. Il corrige tes fautes au passage et lit ses réponses à voix haute.</p>
   <div class="chips">${THEMEN.map(t=>`<button class="chipbtn" data-thema="${esc(t)}" aria-pressed="${t===chat.thema}">${esc(t)}</button>`).join("")}</div>
   <div class="chat" id="chat" aria-live="polite"></div>
   <form class="chatIn" id="chatForm"><input id="chatTxt" autocomplete="off" placeholder="Antworte auf Deutsch…" aria-label="Ta réponse"><button class="btn" id="chatSend">Senden</button></form>
   <div class="row"><button class="btn ghost" id="chatNew">${chat.turns.length?"Neues Gespräch":"Gespräch starten"}</button><button class="btn ghost" id="chatStop" hidden>Stopp</button></div>
   <p class="status" id="chatStatus" hidden></p></div>`;
  renderChat();
  $$("[data-thema]").forEach(b=>b.onclick=()=>{chat.thema=b.dataset.thema;chat.turns=[];gespraech(tabs)});
  $("#chatNew").onclick=()=>{chat.turns=[];renderChat();chatSend(null)};
  $("#chatStop").onclick=()=>chat.ctl&&chat.ctl.abort();
  $("#chatForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#chatTxt").value.trim();if(!v||chat.busy)return;$("#chatTxt").value="";chatSend(v)});
}
function bubHtml(t){if(t.role==="user")return `<div class="bub me">${esc(t.content)}</div>`;
  const m=t.content.match(/^\s*Korrektur:\s*(.+)\n?([\s\S]*)$/);
  return `<div class="bub ai">${m?`<span class="korr">✎ ${esc(m[1])}</span>${esc(m[2].trim())}`:esc(t.content)}</div>`}
function renderChat(extra){const c=$("#chat");if(!c)return;
  c.innerHTML=chat.turns.map(bubHtml).join("")+(extra||"")||`<p class="small" style="margin:auto;text-align:center">Choisis un thème puis appuie sur « Gespräch starten ».</p>`;c.scrollTop=c.scrollHeight}
async function chatSend(msg){
  const s=await getSample(),st2=$("#chatStatus");
  if(!s){st2.hidden=false;st2.textContent="Le partenaire de conversation fonctionne quand l'appli est ouverte dans claude.ai ou dans l'app Claude.";return}
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
function vPick(p){const c=p.filter(x=>!vRecent.includes(x.id));const pool=c.length?c:p;
  const min=Math.min(...pool.map(x=>st.box[x.id]||0));const l=pool.filter(x=>(st.box[x.id]||0)===min);
  const x=l[Math.random()*l.length|0];vRecent=[x.id,...vRecent].slice(0,Math.min(12,p.length-1));return x}
function vStats(p){const m=p.filter(x=>(st.box[x.id]||0)>=2).length;return {m,n:p.length,pct:Math.round(m/p.length*100)}}
function wortschatz(){
  const p=vPool(),s=vStats(vTheme==="alle"?WORDS:WORDS.filter(x=>x.th===vTheme)),x=vPick(p);
  const th=VOC.find(t=>t.k===x.th);
  const head=`<div class="label">Thème</div>
   <div class="chips">${[["alle","Alle"],...VOC.map(t=>[t.k,t.n])].map(([k,n])=>`<button class="chipbtn" data-th="${k}" aria-pressed="${k===vTheme}">${esc(n)}</button>`).join("")}</div>
   <div class="sublist">${[["karten","Karteikarten"],["bedeutung","Bedeutung"],["artikel","der · die · das"]].map(([k,n])=>`<button class="tab" data-vm="${k}" aria-selected="${k===vMode}">${n}</button>`).join("")}</div>
   <div class="row" style="justify-content:space-between"><span class="small">${s.m} / ${s.n} mots maîtrisés</span><span class="small">${th.n}${th.g?" · Wortgruppe":""}</span></div>
   <div class="progress" role="img" aria-label="${s.pct} % maîtrisés"><span style="width:${s.pct}%"></span></div>`;
  let body="";
  const wordHtml=(showArt)=>`<p class="word">${x.a&&showArt?`<span class="art art-${x.a}">${esc(x.a)}</span> `:""}${esc(x.w)}</p>${x.p&&showArt?`<p class="plural">Plural: ${/^\(/.test(x.p)?esc(x.p):"die "+esc(x.p)}</p>`:""}`;
  if(vMode==="karten"){
    body=`${wordHtml(true)}<div class="row" style="justify-content:center"><button class="btn ghost" id="say">🔊 Anhören</button><button class="btn" id="flip">Umdrehen</button></div><div id="back"></div>`;
  }else if(vMode==="bedeutung"){
    const others=shuffle(WORDS.filter(y=>y.th===x.th&&y.f!==x.f)).slice(0,2).map(y=>y.f);
    const opts=shuffle([x.f,...others]);
    body=`<p class="instr">Was bedeutet das Wort?</p>${wordHtml(true)}<div class="row" style="justify-content:center"><button class="btn ghost" id="say">🔊 Anhören</button></div>
     <div class="opts">${opts.map((o,i)=>`<button class="opt" data-o="${esc(o)}"><span class="ltr">${"abc"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div><div id="back"></div>`;
  }else{
    body=`<p class="instr">Welcher Artikel passt?</p>${wordHtml(false)}<p class="plural">${esc(x.f)}</p>
     <div class="opts" style="grid-template-columns:repeat(3,1fr)">${["der","die","das"].map(a=>`<button class="opt" data-o="${a}" style="justify-content:center"><span class="art-${a}" style="font-weight:700">${a}</span></button>`).join("")}</div><div id="back"></div>`;
  }
  $("#panel").innerHTML=`<div class="card">${head}<div class="meta"><span class="chip">${esc(th.n)}</span><span class="chip ${(st.box[x.id]||0)===0&&st.hist.length?"hot":""}">Box ${(st.box[x.id]||0)}/4</span></div>${body}</div>`;
  $$("[data-th]").forEach(b=>b.onclick=()=>{vTheme=b.dataset.th;vRecent=[];wortschatz()});
  $$("[data-vm]").forEach(b=>b.onclick=()=>{vMode=b.dataset.vm;vRecent=[];wortschatz()});
  const sayBtn=$("#say");if(sayBtn)sayBtn.onclick=()=>speak(vFull(x));
  const back=ok=>`<div class="fb ${ok===false?"no":""}"><p><b>${esc(vFull(x))}</b> = ${esc(x.f)}</p>${x.e?`<p class="tr">„${esc(x.e)}“ <button class="btn ghost" id="sayEx" style="padding:4px 10px;font-size:13px">🔊</button></p>`:""}</div>`;
  const next=()=>`<div class="row" style="margin-top:12px"><button class="btn" id="nx">Weiter →</button></div>`;
  const bindNext=()=>{const e=$("#sayEx");if(e)e.onclick=()=>speak(x.e);$("#nx").onclick=wortschatz;$("#nx").focus()};
  if(vMode==="karten"){
    $("#flip").onclick=()=>{$("#flip").disabled=true;speak(vFull(x));
      $("#back").innerHTML=`<div class="flip">${back()}<div class="row" style="justify-content:center"><span class="small">Tu le savais ?</span><button class="btn" data-k="1">Gewusst</button><button class="btn ghost" data-k="0">Nicht gewusst</button></div></div>`;
      const e=$("#sayEx");if(e)e.onclick=()=>speak(x.e);
      $$("[data-k]").forEach(b=>b.onclick=()=>{record("V",+b.dataset.k,x.id);wortschatz()})};
  }else{
    const right=vMode==="bedeutung"?x.f:x.a;
    $$("[data-o]").forEach(b=>b.onclick=()=>{const ok=b.dataset.o===right;
      $$("[data-o]").forEach(y=>{y.disabled=true;if(y.dataset.o===right)y.classList.add("right")});if(!ok)b.classList.add("wrong");fx(ok,ok?b:b);
      record("V",ok?1:0,x.id);speak(vFull(x));
      $("#back").innerHTML=back(ok)+(vMode==="artikel"&&!ok?`<p class="small">Astuce : apprends toujours le nom avec son article et sa couleur (der bleu, die rouge, das vert).</p>`:"")+next();bindNext()});
  }
}



async function downloadExamPDF(){
  const s=$("#pdfStatus");s.hidden=false;
  if(!window.jspdf){s.textContent="Le module PDF n'a pas pu se charger. Vérifie ta connexion et recharge la page.";return}
  const dl=window.claude&&window.claude.use?await window.claude.use("downloads"):null;
  s.textContent="Création du PDF…";
  const sol=$("#withSol").checked,doc=makeExamPDF(window.jspdf.jsPDF,sol);
  const d=new Date().toISOString().slice(0,10);
  if(!dl){try{doc.save(`Modellpruefung_A1_${d}${sol?"_mit_Loesungen":""}.pdf`);s.textContent="PDF téléchargé. Ouvre-le et choisis « Imprimer »."}catch(e){s.textContent="Le téléchargement n'est pas disponible dans cette vue."}return}
  try{await dl.save({filename:`Modellpruefung_A1_${d}${sol?"_mit_Loesungen":""}.pdf`,data:new Blob([doc.output("arraybuffer")])});
    s.textContent="PDF prêt. Ouvre-le et choisis « Imprimer » pour l'avoir sur papier. Chaque clic crée un nouveau sujet."}
  catch(e){s.textContent=e&&e.code==="declined"?"Téléchargement annulé.":e&&e.code==="rate_limited"?"Une fenêtre de téléchargement est déjà ouverte. Réessaie dans un instant.":"Le téléchargement n'a pas abouti."}
}

/* ===== Prüfung ===== */
let ex=null,exT=null;
function stopExam(){clearInterval(exT);ex=null;try{speechSynthesis.cancel()}catch(e){}}
function exam(){
  stopExam();
  $("#panel").innerHTML=`<div class="card"><h2>Modellprüfung A1</h2>
   <p>Même déroulé que l'examen officiel. Pas d'aide en français, pas de correction avant la fin.</p>
   <table class="scoreTbl"><tr><th>Modul</th><th>Aufbau</th><th class="n">Zeit</th></tr>
    <tr><td>Hören</td><td>Teil 1: 6 · Teil 2: 4 · Teil 3: 5</td><td class="n">≈ 20 min</td></tr>
    <tr><td>Lesen</td><td>Teil 1: 5 · Teil 2: 5 · Teil 3: 5</td><td class="n">25 min</td></tr>
    <tr><td>Schreiben</td><td>Formular (5 P.) · E-Mail (10 P.)</td><td class="n">20 min</td></tr>
    <tr><td>Sprechen</td><td>Teil 1–3, auto-évaluation</td><td class="n">≈ 15 min</td></tr></table>
   <p class="small">Barème officiel : chaque module sur 15, multiplié par 1,66. Total sur 100, réussite à partir de 60.</p>
   <div class="row"><button class="btn shine" id="full">Komplette Prüfung starten</button><button class="btn ghost" id="exp">Express (12 Aufgaben, 10 min)</button></div>
   <div class="pdfBox"><div class="label">Version papier · PDF A4</div>
    <p class="small" style="margin:0">Un nouveau sujet complet à imprimer : couverture avec barème, Hören, Lesen, Schreiben, cartes d'oral et feuille de réponses.</p>
    <label><input type="checkbox" id="withSol" checked> Avec corrigé, transcriptions audio et modèles</label>
    <div class="row"><button class="btn ghost" id="pdf">📄 PDF herunterladen</button></div>
    <p class="status" id="pdfStatus" hidden></p></div></div>`;
  $("#full").onclick=startFull;$("#exp").onclick=startExpress;$("#pdf").onclick=downloadExamPDF;
}
const takeTeil=(p,n)=>shuffle(Q.filter(q=>q.p===p)).slice(0,n);
function startFull(){
  ex={mode:"full",mods:[
    {s:"H",qs:[...takeTeil("H1",6),...takeTeil("H2",4),...takeTeil("H3",5)],ms:20*6e4},
    {s:"L",qs:[...takeTeil("L1",5),...takeTeil("L2",5),...takeTeil("L3",5)],ms:25*6e4}],
    m:0,i:0,ans:[],raw:{H:0,L:0,W:0,S:null}};
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
  $("#panel").innerHTML=`<div class="card">${stepper()}<div class="label">Modul ${ex.m+1} von 4</div><h2>${SK[M.s]}</h2><p>${M.qs.length} Aufgaben · ${M.ms/6e4} Minuten.${M.s==="H"?" Teil 1 und 3: zweimal hören. Teil 2: nur einmal hören.":""}</p><div class="row"><button class="btn mark" id="go">Beginnen</button></div></div>`;
  $("#go").onclick=runMod}
function runMod(){const M=ex.mods[ex.m];ex.i=0;ex.end=Date.now()+M.ms;clearInterval(exT);
  exT=setInterval(()=>{const r=Math.max(0,ex.end-Date.now()),e=$("#et");if(e)e.textContent=mmss(r);if(!r)endMod()},500);examQ()}
function examQ(){const M=ex.mods[ex.m];
  if(ex.i>=M.qs.length)return endMod();
  const q=M.qs[ex.i],opts=optsOf(q),ans=answerOf(q);
  $("#panel").innerHTML=`<div class="card">${stepper()}<div class="row" style="justify-content:space-between"><span class="label">Aufgabe ${ex.i+1} / ${M.qs.length}</span><span class="timer" id="et" style="font-size:20px">${mmss(ex.end-Date.now())}</span></div>${qBody(q,false)}${optsHtml(q,opts)}</div>`;
  bindAudio(q,TEIL[q.p].plays);
  $$(".opt").forEach(b=>b.onclick=()=>{ex.ans.push({q,ok:opts[b.dataset.i]===ans});ex.i++;examQ()});
}
function endMod(){clearInterval(exT);try{speechSynthesis.cancel()}catch(e){}
  const M=ex.mods[ex.m];M.qs.slice(ex.i).forEach(q=>ex.ans.push({q,ok:false}));ex.i=M.qs.length;
  if(ex.mode==="express")return finishExpress();
  ex.raw[M.s]=ex.ans.filter(a=>a.q.s===M.s&&a.ok).length;
  ex.m++;if(ex.m<ex.mods.length)return modIntro();
  schreibenExam();
}
function schreibenExam(){ex.stage="W";
  const F=FORMS[Math.random()*FORMS.length|0],w=WRITE[Math.random()*WRITE.length|0];ex.F=F;ex.w=w;
  $("#panel").innerHTML=`<div class="card">${stepper()}<div class="row" style="justify-content:space-between"><h2>Schreiben</h2><span class="timer" id="et" style="font-size:20px">20:00</span></div>
   <div class="label">Teil 1 · Formular (5 Punkte)</div><p class="instr">Lesen Sie den Text und füllen Sie das Formular aus.</p>${formHtml(F)}
   <div class="label">Teil 2 · E-Mail (10 Punkte)</div>${mailHtml(w)}
   <textarea id="txt" aria-label="Ihre E-Mail" placeholder="Liebe … / Lieber … / Sehr geehrte …"></textarea>
   <div class="row"><button class="btn mark" id="done">Abgeben</button></div></div>`;
  ex.end=Date.now()+20*6e4;clearInterval(exT);
  exT=setInterval(()=>{const r=Math.max(0,ex.end-Date.now()),e=$("#et");if(e)e.textContent=mmss(r);if(!r)submitW()},500);
  $("#done").onclick=submitW;
}
function submitW(){clearInterval(exT);
  const f=gradeForm(ex.F,false),g=gradeMail(ex.w,$("#txt").value),m=Math.round(g.sc*10);
  ex.W={f,m,c:g.c};ex.raw.W=f+m;record("W",(f+m)/15);sprechenExam()}
function sprechenExam(){ex.stage="S";
  const cards=[1,2,3].map(n=>{const P=SPEAK[n];return {n,P,it:P.items[Math.random()*P.items.length|0]}});
  const lv=max=>max===3?[[0,"nicht geschafft"],[1.5,"teilweise"],[3,"gut"]]:[[0,"nicht geschafft"],[3,"teilweise"],[6,"gut"]];
  $("#panel").innerHTML=`<div class="card">${stepper()}<h2>Sprechen</h2><p class="small">Parle à voix haute pour chaque carte (environ 1 minute), puis évalue-toi honnêtement.</p>
   ${cards.map(c=>`<div class="label">${c.P.title} · ${c.P.max} Punkte</div><div class="sign">${esc(c.it.p)}</div>${c.it.hint?`<p class="instr">${esc(c.it.hint)}</p>`:""}
     <div class="rate"><label for="s${c.n}" class="small">Comment ça s'est passé ?</label><select id="s${c.n}">${lv(c.P.max).map(([v,l])=>`<option value="${v}">${l} (${v} P.)</option>`).join("")}</select></div>`).join("")}
   <div class="row"><button class="btn mark" id="ev">Auswerten</button><button class="btn ghost" id="skip">Ohne Sprechen auswerten</button></div></div>`;
  $("#ev").onclick=()=>{const s=[1,2,3].reduce((a,n)=>a+ +$("#s"+n).value,0);ex.raw.S=Math.round(s);record("S",s/15);finishFull()};
  $("#skip").onclick=finishFull;
}
function grade(p){return p>=90?"sehr gut":p>=80?"gut":p>=70?"befriedigend":p>=60?"ausreichend":"nicht bestanden"}
function finishFull(){
  const R=ex.raw,pts=k=>R[k]===null?null:Math.round(R[k]*1.66*10)/10;
  ex.ans.forEach(a=>record(a.q.s,a.ok?1:0,a.q.id));
  const written=pts("H")+pts("L")+pts("W"),total=R.S===null?null:Math.round(written+pts("S"));
  const row=(k,label)=>`<tr><td>${label}</td><td class="n">${R[k]===null?"–":R[k]+" / 15"}</td><td class="n">${R[k]===null?"–":pts(k).toFixed(1)}</td></tr>`;
  const perTeil=["H1","H2","H3","L1","L2","L3"].map(p=>{const a=ex.ans.filter(x=>x.q.p===p);return `<li class="${a.filter(x=>x.ok).length/a.length>=.6?"ok":""}">${SK[p[0]]} Teil ${p[1]}: ${a.filter(x=>x.ok).length}/${a.length}</li>`}).join("");
  const wrong=ex.ans.filter(a=>!a.ok).map(a=>`<li>${a.q.ab?esc(a.q.q):fmtQ(a.q.q)} → <b>${esc(answerOf(a.q))}</b><br><span class="small">${esc(a.q.x)}</span></li>`).join("");
  const verdict=total===null?`Partie écrite : <b>${Math.round(written)} / 75</b>. Il te faut au moins ${Math.max(0,60-Math.round(written))} points sur 25 à l'oral pour réussir.`
    :total>=60?`<b>Bestanden – ${grade(total)}.</b> Tu dépasses le seuil de 60 points.`:`<b>Nicht bestanden.</b> Il manque ${60-total} points. Tes erreurs reviennent en priorité dans le Training.`;
  const W=ex.W;ex=null;bump("E");save();
  $("#panel").innerHTML=`<div class="card"><div class="label">Ergebnis</div><div class="big">${total===null?Math.round(written)+" / 75":total+" / 100"}</div><p>${verdict}</p>
   <table class="scoreTbl"><tr><th>Modul</th><th class="n">Rohpunkte</th><th class="n">× 1,66</th></tr>${row("H","Hören")}${row("L","Lesen")}${row("W","Schreiben")}${row("S","Sprechen")}
   <tr class="total"><td>Gesamt</td><td></td><td class="n">${total===null?Math.round(written)+" / 75":total+" / 100"}</td></tr></table>
   <div class="label">Détail par Teil</div><ul class="check">${perTeil}</ul>
   <div class="label">Schreiben</div><p class="small">Formular : ${W.f}/5 · E-Mail : ≈ ${W.m}/10 (estimation par mots-clés)</p>${checkHtml(W.c)}
   ${wrong?`<div class="label">Fehler</div><ul>${wrong}</ul>`:""}
   <div class="row"><button class="btn" id="ag">Neue Prüfung</button><button class="btn ghost" id="tr">Fehler trainieren</button></div></div>`;
  $("#ag").onclick=exam;$("#tr").onclick=()=>{errMode=true;show("smart")};
}
function finishExpress(){
  ex.ans.forEach(a=>record(a.q.s,a.ok?1:0,a.q.id));
  const tot=ex.ans.filter(a=>a.ok).length,p=Math.round(tot/ex.ans.length*100);
  const per=["H","L","G"].map(s=>{const a=ex.ans.filter(x=>x.q.s===s),k=a.filter(x=>x.ok).length;return `<li class="${k>=3?"ok":""}">${SK[s]}: ${k}/${a.length}</li>`}).join("");
  const wrong=ex.ans.filter(a=>!a.ok).map(a=>`<li>${a.q.ab?esc(a.q.q):fmtQ(a.q.q)} → <b>${esc(answerOf(a.q))}</b><br><span class="small">${esc(a.q.x)}</span></li>`).join("");
  ex=null;
  $("#panel").innerHTML=`<div class="card"><div class="label">Ergebnis Express</div><div class="big">${p} %</div><p class="verdict">${p>=60?"Über der 60-%-Grenze. Weiter so!":"Unter 60 %. Les erreurs ci-dessous reviendront en priorité."}</p><ul class="check">${per}</ul>${wrong?`<div class="label">Fehler</div><ul>${wrong}</ul>`:""}<div class="row"><button class="btn" id="ag">Zurück</button><button class="btn ghost" id="tr">Fehler trainieren</button></div></div>`;
  $("#ag").onclick=exam;$("#tr").onclick=()=>{errMode=true;show("smart")};
}

function show(t){clearInterval(tmr);stopExam();
  $$("[data-tab]").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===t));
  ({heute,smart,wortschatz,sprechen,schreiben,exam})[t]();try{window.scrollTo({top:0})}catch(e){}
  moveInd();anim($("#panel").firstElementChild,{opacity:[0,1],y:[16,0]},SPRING)}
$$("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));
try{speechSynthesis.getVoices()}catch(e){}
applyDesign();renderMeter();renderCountdown();heute();
