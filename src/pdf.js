/* Génération du sujet PDF imprimable (jsPDF). */
/*PDF-START*/
/* Printable exam: cover, Hören, Lesen, Schreiben, Sprechen, Antwortbogen, optional Lösungen. Uses jsPDF core fonts (WinAnsi). */
function makeExamPDF(JsPDF,withSol){
  const doc=new JsPDF({unit:"mm",format:"a4"});
  const PW=210,PH=297,M=18,CW=PW-2*M,BR=[14,107,112],MK=[255,209,102],INK=[21,35,37],MUT=[90,106,108],LN=[205,214,215];
  let y=M;
  const clean=s=>String(s).replace(/→/g,"->").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️‍]/gu,"").replace(/[ \t]+\n/g,"\n").trim();
  const pt=s=>s*0.3528;
  const font=(size,style,col)=>{doc.setFont("helvetica",style||"normal");doc.setFontSize(size);doc.setTextColor(...(col||INK))};
  const split=(t,size,w)=>{doc.setFontSize(size);return doc.splitTextToSize(clean(t),w)};
  const newPage=()=>{doc.addPage();y=M};
  const ensure=h=>{if(y+h>PH-M-8)newPage()};
  const write=(t,size,style,o)=>{o=o||{};size=size||10.5;const ind=o.indent||0;font(size,style,o.col);const L=split(t,size,o.w||CW-ind);const lh=pt(size)*1.4;
    L.forEach(l=>{ensure(lh);font(size,style,o.col);doc.text(l,M+ind,y+pt(size));y+=lh});y+=(o.after===undefined?1.5:o.after)};
  const section=(title,sub)=>{newPage();doc.setFillColor(...BR);doc.roundedRect(M,y,CW,13,2,2,"F");font(15,"bold",[255,255,255]);doc.text(clean(title),M+5,y+8.8);
    if(sub){font(9.5,"normal",[255,255,255]);doc.text(clean(sub),PW-M-5,y+8.6,{align:"right"})}y+=19};
  const teilHead=(t,instr)=>{ensure(22);doc.setFillColor(...MK);doc.rect(M,y,2.2,6.5,"F");font(12,"bold",INK);doc.text(clean(t),M+5,y+5);y+=9;write(instr,9.5,"italic",{col:MUT,after:4})};
  const boxOf=(t,o)=>{o=o||{};const size=o.size||10,x=o.x===undefined?M:o.x,w=o.w||CW;const L=split(t,size,w-8),lh=pt(size)*1.4,h=L.length*lh+6;
    return {h,draw:yy=>{doc.setDrawColor(...INK);doc.setLineWidth(o.bold?0.7:0.25);if(o.fill){doc.setFillColor(244,246,246);doc.roundedRect(x,yy,w,h,1.5,1.5,"FD")}else doc.roundedRect(x,yy,w,h,1.5,1.5);
      L.forEach((l,i)=>{font(size,(o.bold||(o.firstBold&&i===0))?"bold":"normal");doc.text(l,x+4,yy+3+pt(size)+i*lh)})}}};
  const check=(x,yy)=>{doc.setDrawColor(...INK);doc.setLineWidth(0.3);doc.rect(x,yy-3.3,3.8,3.8)};
  const badge=(n,yy)=>{doc.setFillColor(...BR);doc.circle(M+3.2,yy+3,3.2,"F");font(8.5,"bold",[255,255,255]);doc.text(String(n),M+3.2,yy+4.1,{align:"center"})};
  const rule=()=>{doc.setDrawColor(...LN);doc.setLineWidth(0.2);doc.line(M,y,PW-M,y);y+=5};
  const key=[];
  const item=(nr,q,sec)=>{
    const isRF=q.rf!==undefined;const opts=isRF?["Richtig","Falsch"]:q.ab?["a","b"]:shuffle(q.o);
    key.push({sec,nr,q,ans:isRF?(q.rf?"Richtig":"Falsch"):q.ab?"ab"[q.c]:"abc"[opts.indexOf(q.o[0])]});
    const text=q.mail||q.sign;const B=text?boxOf(text,{x:M+10,w:CW-10,bold:!!q.sign,fill:!!q.mail}):null;
    ensure(Math.min(80,(B?B.h+4:0)+(q.ab?40:0)+22));badge(nr,y);
    if(B){B.draw(y);y+=B.h+3}
    write(q.q,10.5,"bold",{indent:10,after:2});
    if(q.ab){const w=(CW-14)/2,A=boxOf("a\n"+q.ab[0],{x:M+10,w,firstBold:true}),Bb=boxOf("b\n"+q.ab[1],{x:M+14+w,w,firstBold:true}),h=Math.max(A.h,Bb.h);ensure(h+3);A.draw(y);Bb.draw(y);y+=h+4}
    if(isRF||q.ab){ensure(8);let x=M+10;opts.forEach(o=>{check(x,y+4);font(10.5);doc.text(o,x+6,y+4);x+=40});y+=8}
    else opts.forEach((o,i)=>{const L=split(o,10.5,CW-26);ensure(L.length*5+2);check(M+10,y+4);font(10.5,"bold");doc.text("abc"[i],M+16,y+4);font(10.5);L.forEach((l,j)=>doc.text(l,M+21,y+4+j*5));y+=L.length*5+1.5});
    y+=2;rule();
  };
  const lines=(n,gap)=>{for(let i=0;i<n;i++){ensure(gap);y+=gap;doc.setDrawColor(...LN);doc.setLineWidth(0.25);doc.line(M,y,PW-M,y)}y+=4};

  /* choose the set exactly like the in-app Modellprüfung */
  const set=(p,n)=>shuffle(Q.filter(q=>q.p===p)).slice(0,n);
  const H=[...set("H1",6),...set("H2",4),...set("H3",5)],L=[...set("L1",5),...set("L2",5),...set("L3",5)];
  const F=FORMS[Math.random()*FORMS.length|0],Wt=WRITE[Math.random()*WRITE.length|0];
  const sp={1:SPEAK[1].items,2:shuffle(SPEAK[2].items).slice(0,2),3:shuffle(SPEAK[3].items).slice(0,2)};

  /* cover */
  doc.setFillColor(...BR);doc.rect(0,0,PW,70,"F");
  font(10,"normal",[255,255,255]);doc.text("GOETHE-ZERTIFIKAT A1 · FORMAT START DEUTSCH 1",M,22);
  font(30,"bold",[255,255,255]);doc.text("Modellprüfung A1",M,38);
  doc.setFillColor(...MK);doc.roundedRect(M,45,74,10,2,2,"F");font(12,"bold",INK);doc.text("Übungssatz zum Ausdrucken",M+3,51.8);
  y=86;font(11,"bold");doc.text("Name:",M,y);doc.setDrawColor(...INK);doc.line(M+16,y+1,M+100,y+1);doc.text("Datum:",M+108,y);doc.line(M+124,y+1,PW-M,y+1);
  y+=14;font(12,"bold",BR);doc.text("Prüfungsteile",M,y);y+=4;
  const rows=[["Hören","15 Aufgaben (Teil 1–3)","ca. 20 Min."],["Lesen","15 Aufgaben (Teil 1–3)","25 Min."],["Schreiben","Formular + kurze E-Mail","20 Min."],["Sprechen","Teil 1–3 (Gruppe)","ca. 15 Min."]];
  rows.forEach(r=>{doc.setDrawColor(...LN);doc.line(M,y+8,PW-M,y+8);font(11,"bold");doc.text(r[0],M,y+6);font(10.5);doc.text(r[1],M+32,y+6);doc.text(r[2],M+108,y+6);doc.text("____ / 15",PW-M,y+6,{align:"right"});y+=9});
  y+=6;write("Bewertung: Jedes Modul hat 15 Punkte. Die Punkte werden mit 1,66 multipliziert. Gesamt: 100 Punkte. Bestanden ab 60 Punkten.",10,"normal",{after:2});
  write("90–100 sehr gut · 80–89 gut · 70–79 befriedigend · 60–69 ausreichend · unter 60 nicht bestanden",9.5,"normal",{col:MUT,after:6});
  const tip=boxOf("Hinweis zum Hören: Die Audiotexte findest du im Coach (Tab „Training“). Ohne App: Eine zweite Person liest die Transkripte im Lösungsteil vor – Teil 1 und 3 zweimal, Teil 2 nur einmal.\nCe sujet est un entraînement original au format officiel, pas un sujet du Goethe-Institut.",{fill:true,size:9.5});tip.draw(y);y+=tip.h+4;

  /* Hören */
  section("Hören","ca. 20 Minuten");let n=1;
  [["H1","Teil 1"],["H2","Teil 2"],["H3","Teil 3"]].forEach(([p,t])=>{teilHead(t,TEIL[p].i);H.filter(q=>q.p===p).forEach(q=>item(n++,q,"Hören"))});
  /* Lesen */
  section("Lesen","25 Minuten");n=1;
  [["L1","Teil 1"],["L2","Teil 2"],["L3","Teil 3"]].forEach(([p,t])=>{teilHead(t,TEIL[p].i);L.filter(q=>q.p===p).forEach(q=>item(n++,q,"Lesen"))});
  /* Schreiben */
  section("Schreiben","20 Minuten");
  teilHead("Teil 1 · Formular (5 Punkte)","Lesen Sie den Text und füllen Sie das Formular aus.");
  const FB=boxOf(F.text,{fill:true});ensure(FB.h);FB.draw(y);y+=FB.h+5;
  font(11,"bold");doc.text(clean(F.title),M,y+4);y+=8;
  F.f.forEach((f,i)=>{ensure(10);font(10.5,"bold");doc.text(`${i+1}  ${f[0]}`,M+2,y+5);
    if(Array.isArray(f[1])){let x=M+58;f[1].slice(1).forEach(o=>{check(x,y+5);font(10.5);doc.text(o,x+6,y+5);x+=36})}
    else{doc.setDrawColor(...INK);doc.setLineWidth(0.3);doc.line(M+58,y+6,PW-M,y+6)}y+=10});
  y+=4;teilHead("Teil 2 · E-Mail (10 Punkte)","Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.");
  write(Wt.task,10.5,"bold",{after:2});Wt.pts.forEach(p=>write("•  "+p[0],10.5,"normal",{indent:4,after:0.5}));y+=2;lines(9,9);
  /* Sprechen */
  section("Sprechen","ca. 15 Minuten");
  [[1,"Teil 1 · Sich vorstellen (3 Punkte)"],[2,"Teil 2 · Fragen und antworten (6 Punkte)"],[3,"Teil 3 · Bitten formulieren (6 Punkte)"]].forEach(([k,t])=>{
    teilHead(t,k===1?"Stellen Sie sich vor. Benutzen Sie die Stichwörter.":k===2?"Ziehen Sie eine Karte. Stellen Sie eine Frage mit dem Wort und antworten Sie.":"Ziehen Sie eine Karte. Formulieren Sie eine Bitte und reagieren Sie.");
    const w=(CW-6)/2;let col=0,rowH=0;
    sp[k].forEach(it=>{const B=boxOf(it.p+(it.hint?"\n"+it.hint:""),{x:M+col*(w+6),w,bold:true,size:11});if(col===0)ensure(B.h+4);B.draw(y);rowH=Math.max(rowH,B.h);col++;if(col===2){col=0;y+=rowH+5;rowH=0}});
    if(col)y+=rowH+5;y+=2});
  /* Antwortbogen */
  section("Antwortbogen","Antworten hier übertragen");
  ["Hören","Lesen"].forEach(sec=>{font(12,"bold",BR);ensure(12);doc.text(sec,M,y+4);y+=8;
    key.filter(k=>k.sec===sec).forEach((k,i)=>{const c=i%3,x=M+c*(CW/3);if(c===0)ensure(9);font(10,"bold");doc.text(String(k.nr).padStart(2," "),x,y+4);
      const labels=k.q.rf!==undefined?["R","F"]:k.q.ab?["a","b"]:["a","b","c"];labels.forEach((l,j)=>{check(x+9+j*12,y+4);font(9.5);doc.text(l,x+13.5+j*12,y+4)});if(c===2||i===14)y+=9});y+=4});
  /* Lösungen */
  if(withSol){
    section("Lösungen","Corrigé · Transkripte · Muster");
    ["Hören","Lesen"].forEach(sec=>{font(12,"bold",BR);ensure(12);doc.text(sec,M,y+4);y+=8;
      key.filter(k=>k.sec===sec).forEach((k,i)=>{const c=i%5,x=M+c*(CW/5);if(c===0)ensure(7);font(10,"bold");doc.text(`${k.nr}`,x,y+4);font(10);doc.text(k.ans,x+7,y+4);if(c===4||i===14)y+=7});y+=4});
    teilHead("Transkripte Hören","Diese Texte vorlesen lassen, wenn du ohne App übst.");
    key.filter(k=>k.sec==="Hören").forEach(k=>{ensure(10);write(`${k.nr}.  ${k.q.audio}`,10,"normal",{after:2})});
    teilHead("Erklärungen","Pourquoi c'est la bonne réponse.");
    key.forEach(k=>write(`${k.sec} ${k.nr}: ${k.q.x}`,9.5,"normal",{after:1}));
    y+=3;teilHead("Schreiben Teil 1 · Lösung","Ein Punkt pro richtiges Feld.");
    F.f.forEach((f,i)=>write(`${i+1}  ${f[0]}: ${Array.isArray(f[1])?f[1][0]:f[1]}`,10,"normal",{after:0.5}));
    y+=3;teilHead("Schreiben Teil 2 · Musterlösung","Bewertet werden: alle drei Punkte, Anrede und Gruß, verständliche Sätze.");
    const MB=boxOf(Wt.model,{fill:true});ensure(MB.h);MB.draw(y);y+=MB.h+5;
    teilHead("Sprechen · Musterantworten","Exemples de réponses de niveau A1.");
    [1,2,3].forEach(k=>sp[k].forEach(it=>{write(it.p.replace(/\n/g," – "),10,"bold",{after:0.5});write(it.m,10,"normal",{indent:4,after:3})}));
  }
  /* footer */
  const total=doc.getNumberOfPages();
  for(let i=2;i<=total;i++){doc.setPage(i);font(8,"normal",MUT);doc.text("Start Deutsch 1 Coach · Übungsprüfung (kein Originalmaterial)",M,PH-8);doc.text(`Seite ${i} / ${total}`,PW-M,PH-8,{align:"right"})}
  return doc;
}
/*PDF-END*/