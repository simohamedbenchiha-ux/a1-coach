/* Comptes : connexion par e-mail + mot de passe (Supabase Auth) et progression enregistrée en ligne.
   Inactif tant que AUTH_CFG (config.js) est vide, dans l'artifact claude.ai, et dans l'appli des stores
   sauf AUTH_CFG.inApp. Actif : un écran de connexion (#authGate) précède l'appli ; la bibliothèque
   Supabase n'est chargée qu'à ce moment-là (CDN sur le site, vendor/ dans l'appli).
   Table progress (une ligne par compte, protégée par RLS) et fonction delete_user() : supabase/schema.sql.
   Chargé avant app.js : n'utilise st, save(), t()… qu'au moment des appels. */
const SB_URL="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js";
let sb=null,authUser=null,authMode="login",authReady=null,pushT=0;
const authCfg=()=>window.A1_AUTH_TEST||AUTH_CFG; // A1_AUTH_TEST : tests automatiques seulement (faux serveur)
function authEnabled(){const c=authCfg();if(!c||!c.url||!c.anon)return false;
  if(window.claude&&window.claude.use)return false; // artifact claude.ai : pas de compte
  const nat=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());
  return !nat||!!c.inApp}
const authEmail=()=>authUser&&authUser.email||"";

function loadSb(){if(window.supabase&&supabase.createClient)return Promise.resolve();
  return new Promise((ok,ko)=>{const s=document.createElement("script");
    const nat=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());
    s.src=nat?"vendor/supabase.js":SB_URL;s.onload=ok;s.onerror=()=>ko(new Error("offline"));document.head.appendChild(s)})}

/* Écran de connexion. Modes : login | signup | forgot | newpw | wait */
function gateShow(on){const g=$("#authGate"),w=$(".wrap");g.hidden=!on;
  if(w){w.inert=on;on?w.setAttribute("aria-hidden","true"):w.removeAttribute("aria-hidden")}}
function gateMsg(k,bad){const m=$("#authMsg");if(!k){m.hidden=true;return}m.hidden=false;m.textContent=t(k);m.classList.toggle("bad",!!bad)}
function gateMode(m){authMode=m;const T={login:"auth.title",signup:"auth.signupTitle",forgot:"auth.forgotTitle",newpw:"auth.newPwTitle",wait:"auth.title"};
  $("#authTitle").textContent=t(T[m]);$("#authSub").hidden=m!=="login"&&m!=="signup";
  $("#authEmailRow").hidden=m==="newpw";$("#authPwRow").hidden=m==="forgot";
  const pw=$("#authPw");pw.autocomplete=m==="login"?"current-password":"new-password";$("#authPwLabel").textContent=t(m==="newpw"?"auth.pw2":"auth.pw");
  $("#authGo").textContent=t({login:"auth.login",signup:"auth.signup",forgot:"auth.sendReset",newpw:"auth.savePw",wait:"auth.loading"}[m]);
  $("#authGo").disabled=m==="wait";
  $("#authSwitch").hidden=$("#authForgot").hidden=m==="newpw"||m==="wait";
  $("#authSwitch").textContent=t(m==="login"?"auth.toSignup":"auth.toLogin");
  $("#authForgot").hidden=m!=="login";gateMsg(null)}
const authErr=e=>{const c=e&&(e.code||""),s=e&&e.status,msg=String(e&&e.message||"");
  if(msg==="offline"||!navigator.onLine)return "auth.offline";
  if(c==="invalid_credentials"||/invalid login/i.test(msg))return "auth.badLogin";
  if(c==="email_not_confirmed")return "auth.notConfirmed";
  if(c==="weak_password"||/password should/i.test(msg))return "auth.weak";
  if(c==="user_already_exists"||c==="email_exists")return "auth.exists";
  if(c==="email_address_invalid"||c==="validation_failed")return "auth.badEmail";
  if(s===429||/rate limit/i.test(msg))return "auth.rate";
  return "auth.failed"};
async function gateSubmit(e){e.preventDefault();const email=$("#authEmail").value.trim(),pw=$("#authPw").value,m=authMode;
  if(m!=="newpw"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return gateMsg("auth.badEmail",true);
  if(m!=="forgot"&&pw.length<8)return gateMsg("auth.weak",true);
  const go=$("#authGo");go.disabled=true;gateMsg("auth.loading");
  try{if(m==="login"){const {error}=await sb.auth.signInWithPassword({email,password:pw});if(error)throw error}
    else if(m==="signup"){const {data,error}=await sb.auth.signUp({email,password:pw,options:{emailRedirectTo:location.href.split("#")[0]}});if(error)throw error;
      if(!data.session){gateMode("login");$("#authEmail").value=email;gateMsg("auth.checkMail")}}
    else if(m==="forgot"){const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.href.split("#")[0]});if(error)throw error;
      gateMode("login");gateMsg("auth.resetSent")}
    else if(m==="newpw"){const {error}=await sb.auth.updateUser({password:pw});if(error)throw error;
      $("#authPw").value="";authMode="login";toast(t("auth.pwSaved"));await enterApp(authUser)}}
  catch(err){gateMsg(authErr(err),true)}
  go.disabled=false}

/* Progression en ligne : à la connexion, fusion avec celle de l'appareil ; ensuite, envoi 4 s après chaque save(). */
function mergeProgress(a,b){if(!b)return a;const o=Object.assign({},b,a),pick=(x,y)=>x===undefined?y:x;
  o.box={...b.box};o.due={...(b.due||{})};
  for(const [k,v] of Object.entries(a.box)){const r=b.box[k];
    if(r===undefined||v>r||(v===r&&a.due&&a.due[k]&&(!o.due[k]||a.due[k]<o.due[k]))){o.box[k]=Math.max(v,r||0);if(a.due&&a.due[k])o.due[k]=a.due[k]}}
  o.err={...b.err,...a.err};for(const k of Object.keys(o.err))if((o.box[k]||0)>=2&&!(a.err[k]&&b.err[k]))delete o.err[k];
  o.hist=(a.hist.length>=b.hist.length?a.hist:b.hist).slice(-500);
  o.snap={...(b.snap||{})};for(const [d,v] of Object.entries(a.snap||{})){const x={...(o.snap[d]||{})};for(const [k,n] of Object.entries(v))x[k]=Math.max(n,x[k]||0);o.snap[d]=x}
  o.streak=Math.max(a.streak||0,b.streak||0);o.day=!a.day?b.day:!b.day?a.day:a.day.date>=b.day.date?a.day:b.day;
  o.exam=a.exam||b.exam||"";o.lastBackup=[a.lastBackup,b.lastBackup].filter(Boolean).sort().pop();
  for(const k of ["pal","mode","lang","level","notif"])o[k]=pick(a[k],b[k]);
  for(const k of Object.keys(o))if(o[k]===undefined)delete o[k];
  return o}
async function authPull(){try{const {data,error}=await sb.from("progress").select("state").eq("user_id",authUser.id).maybeSingle();if(error)throw error;
  const remote=data&&cleanState(data.state),local=cleanState(st)||st;
  const hasLocal=Object.keys(st.box||{}).length||(st.hist||[]).length;
  st=remote?(hasLocal?mergeProgress(local,remote):Object.assign(remote,{lang:st.lang||remote.lang,onboarded:true})):st;
  if(remote){st.onboarded=true;LANG=pickLang(st.lang)}
  try{localStorage.setItem("a1coach",JSON.stringify(st))}catch(e){}
  authPush(true)}catch(e){}}
function authQueue(){if(!sb||!authUser)return;clearTimeout(pushT);pushT=setTimeout(authPush,4000)}
async function authPush(now){if(!sb||!authUser)return;clearTimeout(pushT);
  try{await sb.from("progress").upsert({user_id:authUser.id,state:st,updated_at:new Date().toISOString()})}catch(e){}}
addEventListener("pagehide",()=>{if(pushT)authPush()});

/* Réglages → Mon compte */
function renderAccount(){const box=$("#accBox");if(!box)return;box.hidden=!authUser;if(!authUser)return;
  $("#accWho").textContent=t("acc.signedAs",{e:authEmail()});$("#accConfirm").hidden=true}
function accBind(){$("#accOut").onclick=async()=>{await authPush();try{await sb.auth.signOut()}catch(e){}location.reload()};
  $("#accDel").onclick=()=>{const c=$("#accConfirm");c.hidden=false;
    c.innerHTML=`<p class="small" style="margin:0">${esc(t("acc.deleteConfirm"))}</p><div class="swatches"><button type="button" class="sw danger" id="accDelYes">${esc(t("acc.deleteYes"))}</button><button type="button" class="sw" id="accDelNo">${esc(t("common.cancel"))}</button></div>`;
    $("#accDelNo").onclick=()=>{c.hidden=true};
    $("#accDelYes").onclick=async()=>{const b=$("#accDelYes");b.disabled=true;
      try{const {error}=await sb.rpc("delete_user");if(error)throw error;clearTimeout(pushT);authUser=null;try{await sb.auth.signOut()}catch(e){}
        toast(t("acc.deleted"));setTimeout(()=>location.reload(),900)}
      catch(e){b.disabled=false;c.insertAdjacentHTML("beforeend",`<p class="small bad" style="margin:0">${esc(t("auth.failed"))}</p>`)}}}}

let authCb=null;
function authDone(){renderAccount();if(authCb){const cb=authCb;authCb=null;cb()}}
/* Entrée dans l'appli après connexion : progression en ligne fusionnée (2,5 s au plus, sinon on continue hors ligne). */
async function enterApp(user){if(authUser&&authUser.id===user.id&&!authCb)return;authUser=user;
  await Promise.race([authPull(),new Promise(r=>setTimeout(r,2500))]);
  gateShow(false);applyDesign();applyLang();renderMeter();renderCountdown();
  const cur=$('[data-tab][aria-selected="true"]');if(!ex)show(cur?cur.dataset.tab:"heute");
  authDone()}
/* Appelé à la fin de app.js : cb() lance l'appli (accueil, onglet Heute) une fois connecté, ou tout de suite sans compte. */
async function authStart(cb){if(!authEnabled())return cb();authCb=cb;
  $("#authForm").onsubmit=gateSubmit;$("#authSwitch").onclick=()=>gateMode(authMode==="login"?"signup":"login");
  $("#authForgot").onclick=()=>gateMode("forgot");accBind();
  gateShow(true);gateMode(/type=recovery/.test(location.hash)?"newpw":"wait"); // lien « mot de passe oublié » : pas d'entrée dans l'appli avant le nouveau mot de passe
  try{await loadSb();const c=authCfg();sb=supabase.createClient(c.url,c.anon,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})}
  catch(e){if(authMode!=="newpw")gateMode("login");$("#authGo").disabled=true;return gateMsg("auth.offline",true)}
  sb.auth.onAuthStateChange((ev,session)=>{
    if(ev==="PASSWORD_RECOVERY"){authUser=session&&session.user;gateShow(true);if(authMode!=="newpw")gateMode("newpw");return}
    if(ev==="SIGNED_IN"&&session&&authMode!=="newpw"&&(!authUser||authCb))setTimeout(()=>enterApp(session.user),0);
    if(ev==="SIGNED_OUT"){authUser=null;renderAccount()}});
  const {data}=await sb.auth.getSession();
  if(authMode==="newpw")return;
  if(data&&data.session)await enterApp(data.session.user);
  else if(authMode==="wait")gateMode("login")}
