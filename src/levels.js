/* Niveaux : catalogue A1 → C2 et format d'examen de chacun. L'examen blanc (exam(), startFull(), finishFull()
   dans app.js) se construit à partir d'ici : pour un nouveau niveau, on ajoute son contenu puis on passe
   ready à true. Voir NIVEAUX.md.
   scoring "total" (A1, A2) : chaque module ramené à 100/4 points, total sur 100, réussite à pass.
   scoring "modules" (B1 → C2) : chaque module sur 100, réussi à pass ; chaque module se repasse seul.
   Un module à choix (H, L) donne ses parties : p = code de partie des questions de Q, n = nombre d'items. */
const LEVELS=[
  {id:"A1",exam:"Start Deutsch 1",ready:true,scoring:"total",pass:60,factor:1.66,
   modules:[
    {s:"H",min:20,max:15,teile:[{p:"H1",n:6},{p:"H2",n:4},{p:"H3",n:5}]},
    {s:"L",min:25,max:15,teile:[{p:"L1",n:5},{p:"L2",n:5},{p:"L3",n:5}]},
    {s:"W",min:20,max:15,parts:["Formular (5 P.)","E-Mail (10 P.)"]},
    {s:"S",min:15,max:15,parts:["Teil 1–3"]}]},
  {id:"A2",exam:"Goethe-Zertifikat A2",ready:false,scoring:"total",pass:60,
   modules:[{s:"L",min:30,parts:["4 Teile"]},{s:"H",min:30,parts:["4 Teile"]},{s:"W",min:30,parts:["SMS","E-Mail"]},{s:"S",min:15,parts:["3 Teile"],pair:true}]},
  {id:"B1",exam:"Goethe-Zertifikat B1",ready:false,scoring:"modules",pass:60,
   modules:[{s:"L",min:65,parts:["5 Teile"]},{s:"H",min:40,parts:["4 Teile"]},{s:"W",min:60,parts:["3 Teile"]},{s:"S",min:15,parts:["3 Teile"],pair:true}]},
  {id:"B2",exam:"Goethe-Zertifikat B2",ready:false,scoring:"modules",pass:60,
   modules:[{s:"L",min:65,parts:["5 Teile"]},{s:"H",min:40,parts:["4 Teile"]},{s:"W",min:75,parts:["2 Teile"]},{s:"S",min:15,parts:["2 Teile"],pair:true}]},
  {id:"C1",exam:"Goethe-Zertifikat C1",ready:false,scoring:"modules",pass:60,
   modules:[{s:"L",min:65,parts:["4 Teile"]},{s:"H",min:40,parts:["2 Teile"]},{s:"W",min:80,parts:["2 Teile"]},{s:"S",min:15,parts:["2 Teile"],pair:true}]},
  {id:"C2",exam:"Goethe-Zertifikat C2: GDS",ready:false,scoring:"modules",pass:60,
   modules:[{s:"L",min:80,parts:["4 Teile"]},{s:"H",min:35,parts:["2 Teile"]},{s:"W",min:80,parts:["2 Teile"]},{s:"S",min:15,parts:["2 Teile"]}]}
];
const levelOf=id=>LEVELS.find(l=>l.id===id&&l.ready)||LEVELS[0];
