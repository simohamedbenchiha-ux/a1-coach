/* Illustrations originales au trait (style « cahier d'examen ») : icônes SVG monotrait qui suivent
   currentColor (thème clair/sombre). IMG.svg(token, label?) renvoie le balisage, IMG.has(token),
   IMG.word("Brot") → "bread", IMG.list = noms des icônes. Jetons générés : clock:14:30, price:12,50,
   date:3.5, num:17. Libellés (aria-label) en allemand. */
const IMG=(()=>{
  const F=' fill="currentColor"';
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const n=v=>+v.toFixed(2);
  const p=(d,f)=>`<path d="${d}"${f?F:""}/>`;
  const c=(x,y,r,f)=>`<circle cx="${x}" cy="${y}" r="${r}"${f?F:""}/>`;
  const e=(x,y,rx,ry,f)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${f?F:""}/>`;
  const r=(x,y,w,h,rx,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx?` rx="${rx}"`:""}${f?F:""}/>`;
  const FONT="Space Grotesk,Arial,Helvetica,sans-serif";
  const t=(x,y,s,str,w)=>`<text x="${x}" y="${y}" font-size="${s}" font-family="${FONT}" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none"${w?` textLength="${w}" lengthAdjust="spacingAndGlyphs"`:""}>${esc(str)}</text>`;
  // groupe transformé ; s = échelle, pour garder un trait de 2,5 à l'écran
  const g=(tf,body,s)=>`<g transform="${tf}"${s?` stroke-width="${n(2.5/s)}"`:""}>${body}</g>`;
  const sw=(w,body)=>`<g stroke-width="${w}">${body}</g>`;
  const pol=(cx,cy,R,a)=>[n(cx+R*Math.sin(a*Math.PI/180)),n(cy-R*Math.cos(a*Math.PI/180))];
  const ln=(a,b)=>`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`;
  const rays=(cx,cy,r1,r2,k,o=0)=>{let d="";for(let i=0;i<k;i++){const a=o+i*360/k;d+=ln(pol(cx,cy,r1,a),pol(cx,cy,r2,a));}return d;};
  const steam=(xs,y,h=8)=>xs.map(x=>`M${x} ${y}c-2-${h*.35} 2-${h*.6} 0-${h}`).join("");
  const wave=(y,x=6,k=6,w=8.67)=>`M${x} ${y}q${n(w/2)}-4 ${w} 0`+`t${w} 0`.repeat(k-1);

  // pièces partagées
  const CLOUD="M17 42h30a9 9 0 0 0 1.5-17.9A13 13 0 0 0 23 24.5 9 9 0 0 0 17 42z";
  const CAR=p("M13 44H8a2 2 0 0 1-2-2v-7c0-2 1.5-3.5 3.5-4l7-1.5 7-8.5c1-1.2 2.5-2 4-2h13c1.5 0 3 .8 4 2l6.5 8.5 4.5 1c2 .5 3.5 2 3.5 4V42a2 2 0 0 1-2 2h-6M23 44h18M21 29.5l5-6.5c.6-.7 1.3-1 2-1h4v7.5zM36 29.5V22h5c.8 0 1.5.3 2 1l5 6.5z")+c(18,44,5)+c(46,44,5);
  const PLANE=p("M32 6c2.5 0 3.5 3 3.5 6v12l20 12v5l-20-6v12l6 5v4l-9.5-3-9.5 3v-4l6-5V35l-20 6v-5l20-12V12c0-3 1-6 3.5-6z");
  const BED=p("M8 16v38M8 44h48v10M8 36h48v8M28 36v-5c0-2 1-3 3-3h22c2 0 3 1 3 3v5");
  const BOWL=(y)=>p(`M8 ${y}h48c0 13-10 21-24 21S8 ${y+13} 8 ${y}zM25 ${y+21}l-1 3h16l-1-3`);
  const BUILDING=(cols)=>p("M8 22L32 8l24 14zM10 26h44M10 50h44M6 55h52"+cols.map(x=>`M${x} 30v16`).join(""));
  const SHOP_BAG=(x,y,w,h)=>p(`M${x} ${y}h${w}l-2 ${h}H${x+2}zM${x+w/2-6} ${y}v-5a6 6 0 0 1 12 0v5`);
  // personnages (pictogrammes)
  const MAN=c(32,9,6)+p("M20 40V27a7 7 0 0 1 7-7h10a7 7 0 0 1 7 7v13M27 28v28M37 28v28");
  const WOMAN=c(32,9,6)+p("M26.5 4.5c-3 4-3 9 0 12M37.5 4.5c3 4 3 9 0 12")+p("M20 38V27a7 7 0 0 1 7-7h10a7 7 0 0 1 7 7v11M27 24l-5 22h20l-5-22M28 46v10M36 46v10");
  const KID=c(32,13,6)+p("M22 42V31a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v11M28 32v24M36 32v24");

  const I={
    // transports
    bus:["Bus",p("M13 46H10a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4h44a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4h-3M23 46h18M6 31h52M19 14v17M32 14v17M45 14v17")+c(18,46,5)+c(46,46,5)+p("M52 38h2")],
    tram:["Straßenbahn",p("M12 6h40M26 14l6-7 6 7")+r(16,14,32,38,7)+r(21,20,22,14,2)+c(23,43,2,1)+c(41,43,2,1)+p("M28 43h8M22 52l-4 6M42 52l4 6")],
    train:["Zug",p("M4 16h36c10 0 18 8 20 16v4a4 4 0 0 1-4 4H4M44 21c5 1 9 5 11 10H44zM2 50h60")+r(8,21,8,7,1.5)+r(20,21,8,7,1.5)+r(32,21,6,7,1.5)+c(14,45,3)+c(24,45,3)+c(48,45,3)],
    plane:["Flugzeug",g("rotate(45 32 31)",PLANE)],
    car:["Auto",g("translate(0 -2)",CAR)],
    bike:["Fahrrad",c(15,42,10)+c(49,42,10)+p("M15 42h15l-5-17h18M15 42l10-17M30 42l13-17 6 17M25 25v-4M20 21h9M43 25l-2-5h6")],
    taxi:["Taxi",g("translate(0 4)",CAR)+r(20,7,24,11,2)+t(32,15.6,8,"TAXI")+p("M32 18v4")],
    ticket:["Fahrkarte",g("rotate(-10 32 32)",p("M8 20h48v8a4 4 0 0 0 0 8v8H8v-8a4 4 0 0 0 0-8zM14 28h18M14 36h12")+'<path d="M43 22v20" stroke-dasharray="1 4.5"/>')],
    // lieux
    house:["Haus",p("M7 30L32 10l25 20M13 25v29h38V25M27 54V41h10v13M41 17V9h6v13")+r(18,31,6,6,1)+r(40,31,6,6,1)],
    hotel:["Hotel",r(12,7,40,49,3)+p("M12 22h40")+t(32,18.5,9.5,"HOTEL",30)+r(18,27,6,6,1)+r(29,27,6,6,1)+r(40,27,6,6,1)+r(18,37,6,6,1)+r(40,37,6,6,1)+p("M27 56V46h10v10")],
    doctor:["Arzt",g("translate(-4 3)",p("M20 9v15a12 12 0 0 0 24 0V9M32 36v6a9 9 0 0 0 18 0v-5")+c(50,32,5)+c(50,32,1.5,1)+c(20,8,2.2,1)+c(44,8,2.2,1))],
    pharmacy:["Apotheke",sw(6,p("M37 29l11-17"))+p("M8 30h48c0 11-9 19-24 19S8 41 8 30zM24 49l-2 6h20l-2-6M32 34v8M28 38h8")],
    supermarket:["Supermarkt",p("M5 12h8l7 30h31M15 20h42l-5 16H19M31 20l1 16M44 20l-1 16")+c(24,49,3.5)+c(46,49,3.5)],
    bakery:["Bäckerei",sw(3.5,p("M22 50C12 48 6 40 6 30 6 18 14 11 22 11c5 0 8 3 10 7 2-4 5-7 10-7 8 0 16 7 16 19 0 10-6 18-16 20M23 20c4 9 10 20 19 28M41 20c-4 9-10 20-19 28"))],
    bank:["Bank",BUILDING([15,49])+t(32,45,22,"€")],
    post:["Post",p("M18 54V22a14 14 0 0 1 28 0v32M12 55h40M25 21h14")+r(23,31,18,13,1.5)+p("M23 32l9 6.5 9-6.5")],
    school:["Schule",p("M9 31L32 17l23 14M14 28v26h36V28M32 17V5h10l-2.5 3 2.5 3H32M28 54V45h8v9M32 30v3h2")+r(18,35,6,6,1)+r(40,35,6,6,1)+c(32,32,4.5)],
    cinema:["Kino",g("translate(0 3)",r(10,30,44,24,2)+p("M10 30v-7h44v7M21 23l-5 7M32 23l-5 7M43 23l-5 7M54 23l-5 7")+g("rotate(-14 10 23)",p("M10 23v-7h44v7zM21 16l-5 7M32 16l-5 7M43 16l-5 7M54 16l-5 7")))],
    restaurant:["Restaurant",c(32,33,14)+c(32,33,9)+p("M7 10v10a4 4 0 0 0 8 0V10M11 10v44M57 54V10c-4 2-6 8-6 18h6")],
    cafe:["Café",p("M18 34h28M32 34v20M25 54h14M6 28v26M6 42h9v12M58 28v26M58 42h-9v12M25 21h14v4a7 7 0 0 1-14 0zM39 23h1.5a3 3 0 0 1 0 6H38")+steam([29,35],16,7)],
    park:["Park",p("M22 37c-7 0-12-4-12-10 0-4 2-7 5-8 0-6 4-10 7-10s7 4 7 10c3 1 5 4 5 8 0 6-5 10-12 10zM22 30v24M22 42l-5-4M4 54h56M34 38h24M34 46h24M37 46v8M55 46v8M37 38v8M55 38v8")],
    pool:["Schwimmbad",p("M26 40V16a6 6 0 0 0-12 0v2M44 40V16a6 6 0 0 0-12 0v2M26 23h18M26 32h18"+wave(46)+wave(55))],
    museum:["Museum",BUILDING([15,25,39,49])+c(32,17,2.5)],
    office:["Büro",r(14,6,36,50,2)+[13,22,31,40].map(y=>[20,29,38].map(x=>y>31&&x==29?"":r(x,y,6,5,1)).join("")).join("")+p("M28 56V48h8v8M8 56h48")],
    station:["Bahnhof",p("M6 18L32 8l26 10M10 17v37M54 17v37M4 55h56M32 14v3")+c(32,17,1.2,1)+c(32,17,4)+r(22,25,20,23,5)+r(26,29,12,8,1)+c(27,42,1.6,1)+c(37,42,1.6,1)+p("M26 48l-3 7M38 48l3 7")],
    airport:["Flughafen",g("translate(2 6) scale(.6)",g("rotate(45 32 31)",PLANE),.6)+p("M4 55h56M44 55V31M52 55V31M40 23h16l-2 8H42zM42 23l2-4h8l2 4M48 19v-5M46 23l1 8M50 23l-1 8")],
    hospital:["Krankenhaus",p("M8 54V26h14M42 26h14v28M4 54h56M22 54V8h20v46M28 54v-9h8v9")+sw(3.5,p("M32 13v12M26 19h12"))+r(12,32,6,6,1)+r(46,32,6,6,1)+r(12,42,6,6,1)+r(46,42,6,6,1)],
    // logement
    kitchen:["Küche",p("M12 16l6-8h28l6 8zM32 4v4")+r(12,32,40,24,2)+p("M12 39h40M16 24h24v3a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4zM40 26h12")+c(18,35.5,1.4,1)+c(24,35.5,1.4,1)+c(40,35.5,1.4,1)+c(46,35.5,1.4,1)+r(18,43,28,9,1.5)],
    bathroom:["Bad",p("M6 32h52M10 32v6a12 12 0 0 0 12 12h20a12 12 0 0 0 12-12v-6M18 50l-3 5M46 50l3 5M16 32V16a6 6 0 0 1 12 0v3")+c(40,25,3.5)+c(49,21,2.5)+c(47,28,1.5)],
    bedroom:["Schlafzimmer",g("translate(0 4)",BED+r(12,28,12,8,3))+p("M50 4a10 10 0 1 0 9 14 8 8 0 0 1-9-14z")+p("M38 8l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z",1)],
    bed:["Bett",g("translate(0 -2)",BED+r(12,28,12,8,3))],
    table:["Tisch",r(6,20,52,6,1.5)+p("M12 26v28M52 26v28M12 42h40")],
    chair:["Stuhl",p("M20 30V8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v22M20 14h24M20 21h24M14 30h36l-3 8H17zM19 38v18M45 38v18M25 38v12M39 38v12")],
    lamp:["Lampe",p("M22 8h20l8 22H14zM32 30v18M22 55l3-7h14l3 7zM44 30v6")+c(44,38.5,1.6,1)],
    window:["Fenster",r(12,6,40,48,2)+p("M32 6v48M12 29h40M7 58h50M12 54l-5 4M52 54l5 4")],
    door:["Tür",p("M18 56V8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v48M10 56h44")+r(23,12,18,14,1)+r(23,38,18,12,1)+c(40,32,2.2,1)],
    tv:["Fernseher",r(6,16,52,32,3)+r(11,21,32,22,2)+c(50,26,2)+c(50,34,2)+p("M24 6l8 10 8-10M18 55l4-7M46 55l-4-7")],
    fridge:["Kühlschrank",r(16,5,32,52,3)+p("M16 23h32M22 12v5M22 29v10M20 57v2M44 57v2")],
    shower:["Dusche",p("M20 18v-4a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v42M8 28a12 10 0 0 1 24 0zM13 34l-2 5M20 34v5M27 34l2 5M10 45l-2 5M20 45v5M30 45l2 5")],
    // nourriture
    bread:["Brot",p("M6 48V34c0-9 8-16 18-16h16c10 0 18 7 18 16v14zM20 24l-4 9M32 22l-4 10M44 24l-4 9")],
    roll:["Brötchen",p("M8 38c0-10 11-18 24-18s24 8 24 18c0 7-9 10-24 10S8 45 8 38zM15 32c8-5 26-5 34 0")+p("M14 52h36")],
    coffee:["Kaffee",p("M14 28h30v8a15 15 0 0 1-30 0zM44 31h3a5 5 0 0 1 0 10h-4.5M8 55h42")+steam([22,29,36],22,9)],
    tea:["Tee",p("M14 38c0-9 7-14 16-14s16 5 16 14-7 14-16 14-16-5-16-14zM15 34L7 27c-1 5 1 12 8 17M45 31c5 0 9 3 9 7s-4 8-9 9M22 24c0-3 4-5 8-5s8 2 8 5M20 55h20")+c(30,16,2.5)],
    water:["Wasser",p("M27 5h10M28 5v6c0 3-8 5-8 11v30a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V22c0-6-8-8-8-11V5M32 28c-3 4-6 8-6 11a6 6 0 0 0 12 0c0-3-3-7-6-11z")],
    milk:["Milch",p("M24 5h16v7l6 10v34H18V22l6-10zM24 12h16M18 22h28M18 35c5-3 9 3 14 0s9-3 14 0")+t(32,50,8,"MILCH",22)],
    juice:["Saft",p("M10 18h28l-4 38H14zM11 28h26M28 28l6-22h6")+c(50,46,9)+p(rays(50,46,0,6,6))],
    cheese:["Käse",p("M6 52V34L42 14l16 12v26zM6 34h52")+c(18,43,3)+c(33,45,3.5)+c(48,40,2.5)+c(45,26,2)],
    apple:["Apfel",p("M32 20c-4-3-10-4-15 0-6 5-6 15-2 23 3 6 8 11 13 10 2 0 3-1 4-1s2 1 4 1c5 1 10-4 13-10 4-8 4-18-2-23-5-4-11-3-15 0zM32 20c0-5 2-9 5-11M35 14c4-6 10-6 13-4-3 4-9 6-13 4z")],
    banana:["Banane",p("M14 13c-4 21 9 39 31 39 6 0 10-2 12-5-15 2-31-9-35-33zM14 13l1-6h6l1 7")],
    tomato:["Tomate",p("M32 20c-12 0-22 7-22 18s10 18 22 18 22-7 22-18-10-18-22-18zM32 21c-3-3-8-4-11-2 3 1 6 3 7 5M32 21c3-3 8-4 11-2-3 1-6 3-7 5M32 21v-9")],
    potato:["Kartoffel",p("M10 30c0-10 10-16 22-16s22 6 22 16c0 5-2 8 0 12 1 7-6 11-17 11-8 0-12-3-18-3s-11-3-11-9c0-4 2-6 2-11z")+c(22,27,1.4,1)+c(37,23,1.4,1)+c(44,38,1.4,1)+c(28,40,1.4,1)],
    fish:["Fisch",p("M6 32c6-9 16-14 26-13 7 1 12 6 16 13-4 7-9 12-16 13-10 1-20-4-26-13zM48 32l10-9v18zM26 22c3 6 3 14 0 20")+c(16,30,2,1)],
    meat:["Fleisch",p("M8 32c0-10 10-17 22-17s26 7 26 18-10 17-22 17c-6 0-9-4-15-4S8 42 8 32zM14 33c0-7 7-12 16-12")+c(40,30,5)+c(40,30,1.5,1)],
    chicken:["Hähnchen",p("M29 31a16 16 0 1 1 5 5M29 31l-10 10M34 36l-10 10")+c(16,41,3.5)+c(23,49,3.5)],
    cake:["Kuchen",r(12,32,40,22,3)+p("M12 40c4 3 6 3 10 0s6-3 10 0 6 3 10 0 6-3 10 0M7 58h50M24 32v-9M32 32v-9M40 32v-9")+[24,32,40].map(x=>p(`M${x} 19c-2-2-1-4 0-7 1 3 2 5 0 7z`,1)).join("")],
    pizza:["Pizza",p("M8 14c16-7 32-7 48 0L32 58zM12 21c13-5 27-5 40 0")+c(26,28,3.5)+c(39,30,3.5)+c(32,42,3)],
    egg:["Ei",p("M32 7c-10 0-18 16-18 29a18 18 0 0 0 36 0C50 23 42 7 32 7zM22 34c0-6 2-12 5-15")],
    rice:["Reis",BOWL(32)+p("M11 32c2-8 10-13 21-13s19 5 21 13M38 21L56 7M42 24L60 11")+[[22,28],[30,25],[27,30],[36,29],[42,27],[45,30]].map(([x,y])=>e(x,y,1.6,1,1)).join("")],
    soup:["Suppe",BOWL(30)+steam([24,32,40],22,10)+p("M38 30l14-22")],
    salad:["Salat",BOWL(32)+p("M11 32c-1-6 4-10 9-9 2-5 8-7 12-4 4-4 11-2 12 3 5 0 9 5 9 10M24 32l3-6M39 32l-2-7")+c(32,26,3)],
    // objets
    phone:["Handy",r(18,5,28,54,5)+p("M28 11h8")+c(32,52,2)],
    computer:["Computer",r(7,8,50,32,3)+p("M28 40v6h8v-6")+r(12,49,40,7,2)],
    book:["Buch",p("M32 16c-6-4-14-6-24-6v38c10 0 18 2 24 6 6-4 14-6 24-6V10c-10 0-18 2-24 6zM32 16v38")],
    pen:["Kugelschreiber",g("rotate(45 32 32)",p("M27 8h10v36l-5 11-5-11zM27 44h10M37 13h3v13M27 18h10"))],
    bag:["Tasche",p("M10 26h44l-4 28H14zM22 26v-6a10 10 0 0 1 20 0v6")+r(27,31,10,7,1.5)],
    key:["Schlüssel",c(16,32,10)+c(16,32,3)+p("M26 32h32M50 32v8M57 32v6M43 32v5")],
    umbrella:["Regenschirm",p("M6 32a26 24 0 0 1 52 0"+"c-2-3-4.5-4-6.5-4s-4.5 1-6.5 4".repeat(4)+"M32 32v17a5 5 0 0 1-10 0M32 8V4M32 8c-8 6-13 14-13 24M32 8c8 6 13 14 13 24")],
    glasses:["Brille",r(6,24,22,18,8)+r(36,24,22,18,8)+p("M28 30c2-2.5 6-2.5 8 0M6 30L3 22M58 30l3-8")],
    watch:["Uhr",c(32,32,13)+p("M25 21l2-13h10l2 13M25 43l2 13h10l2-13M32 25v7l4 3M45 32h2")],
    letter:["Brief",r(8,14,48,36,3)+p("M8 17l24 17 24-17")],
    card:["Karte",r(6,14,52,36,4)+r(6,21,52,6,0,1)+r(12,33,10,8,2)+p("M30 41h20")],
    passport:["Reisepass",r(14,6,36,52,3)+c(32,26,9)+p("M23 26h18M32 17c-4 4-4 14 0 18 4-4 4-14 0-18M24 46h16")],
    money:["Geld",r(4,10,42,26,3)+c(25,23,6)+p("M10 16h3M37 30h3")+c(46,46,11)+t(46,51,15,"€")],
    medicine:["Medikamente",g("rotate(-45 24 26)",r(8,19.5,32,13,6.5)+p("M24 19.5h9.5a6.5 6.5 0 0 1 0 13H24z",1))+c(46,46,10)+p("M39 53l14-14")],
    camera:["Kamera",p("M6 24a4 4 0 0 1 4-4h8l4-6h20l4 6h8a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z")+c(32,37,10)+c(32,37,4.5)+c(49,27,1.8,1)],
    newspaper:["Zeitung",r(8,8,48,48,3)+r(14,15,36,5,1,1)+r(14,27,14,13,1)+p("M34 29h16M34 35h16M14 47h36")],
    // vêtements
    jacket:["Jacke",p("M24 8l-12 5-6 22 8 2v19h36V37l8-2-6-22-12-5M24 8c2 4 5 6 8 6s6-2 8-6M32 14v42M14 37l1-12M50 37l-1-12M19 44h6M39 44h6")],
    shirt:["T-Shirt",p("M22 8l-14 8 5 10 7-3v31h24V23l7 3 5-10-14-8c-1 4-5 6-10 6s-9-2-10-6z")],
    shoes:["Schuhe",p("M6 46V28c5 0 9-1 12-4 5 5 11 7 18 8l12 3c7 2 10 6 10 11zM6 46v5h52v-5M24 29l3-4M30 31l3-4")],
    trousers:["Hose",p("M18 8h28l4 48H38l-6-30-6 30H14zM18 14h28M32 14v12")],
    dress:["Kleid",p("M26 6v6c-3 2-4 5-3 9l3 5L12 56h40L38 26l3-5c1-4 0-7-3-9V6M26 12c2 2 4 3 6 3s4-1 6-3M26 26h12")],
    hat:["Hut",p("M20 37V20c0-4 2-6 6-6h12c4 0 6 2 6 6v17M20 31h24")+e(32,41,26,7)],
    // météo
    sun:["Sonne",c(32,32,11)+p(rays(32,32,17,25,8))],
    rain:["Regen",g("translate(-3.5 -7)",p(CLOUD))+p("M23 43l-4 9M33 43l-4 9M43 43l-4 9M28 52l-2 4")],
    snow:["Schnee",p(rays(32,32,0,24,6)+[0,60,120,180,240,300].map(a=>ln(pol(32,32,13,a),pol(32,32,19,a-28))+ln(pol(32,32,13,a),pol(32,32,19,a+28))).join(""))],
    cloud:["Wolke",g("translate(-3.5 4)",p(CLOUD))],
    wind:["Wind",p("M6 26h30a6 6 0 1 0-6-6M6 36h42a7 7 0 1 1-7 7M6 46h22")],
    // activités
    football:["Fußball",c(32,32,22)+p([0,72,144,216,288].map(a=>pol(32,32,7,a)).map((q,i)=>(i?"L":"M")+q.join(" ")).join("")+"z",1)+p([0,72,144,216,288].map(a=>ln(pol(32,32,7,a),pol(32,32,14,a))+ln(pol(32,32,14,a),pol(32,32,22,a-24))+ln(pol(32,32,14,a),pol(32,32,22,a+24))).join(""))],
    tennis:["Tennis",g("rotate(-40 32 30)",e(32,22,13,16)+p("M32 38v20M26 8v28M32 6v32M38 8v28M20 16h24M19 22h26M20 28h24M29 38l3 5 3-5"))+c(51,49,6)+p("M46 46c3 1 6 4 6 9")],
    swim:["Schwimmen",c(46,20,5)+p("M41 29L14 35l-7-4M39 30l-9-13-12 3"+wave(44,4,6,9.33)+wave(53,4,6,9.33))],
    read:["Lesen",c(32,12,7)+p("M14 36c1-8 8-13 18-13s17 5 18 13M32 38c-5-3-11-4-18-4v18c7 0 13 1 18 4 5-3 11-4 18-4V34c-7 0-13 1-18 4zM32 38v18")],
    music:["Musik",p("M24 46V15l26-7v31")+sw(4,p("M24 21l26-7"))+e(18.5,46,6,5,1)+e(44.5,39,6,5,1)],
    cook:["Kochen",p("M12 30h40v16a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8zM10 30h44M12 35H6M52 35h6M38 28L48 10")+c(50,7,3.5)+steam([22,30],24,10)],
    shopping:["Einkaufen",SHOP_BAG(8,24,28,32)+SHOP_BAG(38,32,18,24)],
    sleep:["Schlafen",g("translate(0 6)",BED+p("M12 30a5 5 0 1 0 10 0 5 5 0 1 0-10 0"))+t(40,22,13,"Z")+t(51,12,9,"z")],
    hiking:["Wandern",c(34,8,5)+r(20,16,10,16,3)+p("M33 15l-4 19M31 20l8 8M29 34l8 10v11M29 34l-6 10-3 11M41 20l5 36")],
    dance:["Tanzen",c(36,9,5)+p("M34 16l-4 18M33 20l11-5 3-8M33 20l-12 2-5-6M30 34l9 8-1 13M30 34l-8 10-9 1")+p("M50 30v8",0)+e(48,39,2.4,2,1)+p("M50 30l4 2")],
    // personnes
    man:["Mann",MAN],
    woman:["Frau",WOMAN],
    child:["Kind",g("translate(-6 10) scale(.85)",KID,.85)+e(46,15,7,9)+p("M46 24l-1 2 2 1M46 27c-2 5 2 9-6 13")],
    family:["Familie",g("translate(-12 6) scale(.85)",MAN,.85)+g("translate(22 6) scale(.85)",WOMAN,.85)+g("translate(14.5 22) scale(.55)",KID,.55)],
    baby:["Baby",p("M10 28h40c0 10-8 17-20 17S10 38 10 28zM30 28V10c11 0 20 8 20 18M10 28L6 16H2M22 45l-3 3M38 45l3 3")+c(18,52,5)+c(42,52,5)],
    // panneaux
    "no-smoking":["Rauchen verboten",r(12,29,32,7,1)+p("M36 29v7M48 27c-2-3 2-5 0-9")+c(32,32,25)+p("M14 14l36 36")],
    open:["Geöffnet",p("M18 20l14-11 14 11")+c(32,9,2,1)+r(5,20,54,24,4)+t(32,37,14,"OFFEN")],
    closed:["Geschlossen",p("M18 20l14-11 14 11")+c(32,9,2,1)+r(4,20,56,24,4)+t(32,36.2,10.5,"GESCHLOSSEN",48)],
    toilet:["Toilette",r(8,12,48,40,6)+t(32,40.5,22,"WC")],
    exit:["Ausgang",p("M34 20V10H12v44h22V44M24 32h32M46 22l10 10-10 10")],
    parking:["Parkplatz",r(10,8,44,48,8)+t(32,45,34,"P")],
    wifi:["WLAN",p("M26.34 40.34a8 8 0 0 1 11.32 0M20.69 34.69a16 16 0 0 1 22.62 0M15.03 29.03a24 24 0 0 1 33.94 0")+c(32,46,3,1)],
    elevator:["Aufzug",r(10,6,44,52,3)+p("M10 20h44M32 20v38M24 10l5 6H19zM40 16l5-6H35z")+p("M24 10l5 6H19zM40 16l5-6H35z",1)],
    stairs:["Treppe",p("M6 56V46h12V36h12V26h12V16h16v40zM6 56h52")],
    info:["Information",c(32,32,25)+c(32,19,3,1)+p("M32 28v17M28 28h4M27 45h10")],
  };

  const MON=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sept.","Okt.","Nov.","Dez."];
  const MONL=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  const wrap=(body,label)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${esc(label)}" focusable="false" class="img">${body}</svg>`;

  const gen={
    clock(v){const m=/^(\d{1,2}):(\d{2})$/.exec(v);if(!m)return null;const h=+m[1],mi=+m[2];if(h>23||mi>59)return null;
      let d="";for(let i=0;i<12;i++)d+=ln(pol(32,32,i%3?22:20,i*30),pol(32,32,25,i*30));
      return [`${h}:${m[2]} Uhr`,c(32,32,28)+p(d)+sw(4,p(ln([32,32],pol(32,32,13,(h%12)*30+mi/2))))+sw(3,p(ln([32,32],pol(32,32,20,mi*6))))+c(32,32,2.5,1)];},
    price(v){if(!/^\d{1,4}(,\d{2})?$/.test(v))return null;const s=v+" €",w=s.length*6.3;
      return [`${v} Euro`,p("M20 13h34a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H20L5 32z")+c(14,32,2.5)+t(39,36.5,12,s,w>34?34:0)];},
    date(v){const m=/^(\d{1,2})\.(\d{1,2})\.?$/.exec(v);if(!m)return null;const d=+m[1],mo=+m[2];if(!d||d>31||!mo||mo>12)return null;
      return [`${d}. ${MONL[mo-1]}`,r(9,9,46,48,4)+p("M9 22h46M22 5v8M42 5v8")+t(32,19.5,9,MON[mo-1])+t(32,49,d>9?24:26,String(d))];},
    num(v){if(!/^\d{1,3}$/.test(v))return null;const s=String(+v);
      return [s,r(8,8,48,48,8)+t(32,s.length>2?42:44,s.length>2?22:s.length>1?28:32,s)];},
  };
  const build=tok=>{tok=String(tok||"").trim();const k=tok.indexOf(":");
    if(k>0&&gen[tok.slice(0,k)])return gen[tok.slice(0,k)](tok.slice(k+1).trim());
    return I[tok]||null;};
  const svg=(token,label)=>{const b=build(token);return b?wrap(b[1],label||b[0]):"";};
  const has=token=>!!build(token);

  // noms allemands (sans article) → icône
  const W={bus:"Bus Reisebus Linienbus",tram:"Straßenbahn Tram",train:"Zug Bahn S-Bahn U-Bahn ICE Regionalbahn",
    plane:"Flugzeug Flug",car:"Auto Wagen PKW",bike:"Fahrrad Rad",taxi:"Taxi",ticket:"Fahrkarte Ticket Fahrschein Eintrittskarte Karte",
    house:"Haus Wohnung Zuhause Einfamilienhaus",hotel:"Hotel Pension Jugendherberge",doctor:"Arzt Ärztin Praxis Arztpraxis Zahnarzt Doktor",
    pharmacy:"Apotheke",supermarket:"Supermarkt Markt Geschäft Laden Kaufhaus",bakery:"Bäckerei Bäcker Brezel",bank:"Bank Sparkasse Geldautomat",
    post:"Post Postamt Briefkasten Paket",school:"Schule Unterricht Kurs Sprachschule Klasse",cinema:"Kino Film",restaurant:"Restaurant Essen Mittagessen Abendessen Gasthaus Kantine Mensa",
    cafe:"Café Cafe",park:"Park Garten Baum",pool:"Schwimmbad Hallenbad Freibad",museum:"Museum Ausstellung",office:"Büro Firma Arbeit Arbeitsplatz",
    station:"Bahnhof Hauptbahnhof Bahnsteig Gleis Haltestelle",airport:"Flughafen",hospital:"Krankenhaus Klinik",
    kitchen:"Küche Herd",bathroom:"Bad Badezimmer Badewanne",bedroom:"Schlafzimmer Zimmer Kinderzimmer",bed:"Bett",table:"Tisch Schreibtisch",
    chair:"Stuhl Sessel",lamp:"Lampe Licht",window:"Fenster",door:"Tür Eingang",tv:"Fernseher Fernsehen Fernsehgerät",fridge:"Kühlschrank",shower:"Dusche",
    bread:"Brot Vollkornbrot",roll:"Brötchen Semmel",coffee:"Kaffee Frühstück Tasse",tea:"Tee Kanne",water:"Wasser Mineralwasser Flasche",milk:"Milch",
    juice:"Saft Orangensaft Apfelsaft Getränk Orange",cheese:"Käse",apple:"Apfel Obst",banana:"Banane",tomato:"Tomate Gemüse",potato:"Kartoffel Kartoffeln Pommes",
    fish:"Fisch",meat:"Fleisch Wurst Steak Schnitzel",chicken:"Hähnchen Huhn Hühnchen",cake:"Kuchen Torte Geburtstag",pizza:"Pizza",egg:"Ei Eier",rice:"Reis",
    soup:"Suppe",salad:"Salat",phone:"Handy Telefon Smartphone Anruf Nummer Telefonnummer",computer:"Computer Laptop Internet",book:"Buch Wörterbuch Heft",
    pen:"Kuli Kugelschreiber Stift Bleistift",bag:"Tasche Handtasche Rucksack",key:"Schlüssel",umbrella:"Regenschirm Schirm",glasses:"Brille",watch:"Uhr Armbanduhr",
    letter:"Brief E-Mail Mail Nachricht Postkarte Umschlag",card:"Kreditkarte EC-Karte Bankkarte Ausweiskarte",passport:"Pass Reisepass Ausweis Personalausweis",
    money:"Geld Euro Kasse Preis",medicine:"Medikament Medikamente Tablette Tabletten Medizin",camera:"Kamera Foto Fotoapparat",newspaper:"Zeitung Zeitschrift",
    jacket:"Jacke Mantel",shirt:"Hemd T-Shirt Bluse Pullover",shoes:"Schuh Schuhe",trousers:"Hose Jeans",dress:"Kleid Rock",hat:"Hut Mütze",
    sun:"Sonne Sommer Wetter",rain:"Regen",snow:"Schnee Winter",cloud:"Wolke Wolken",wind:"Wind Sturm",football:"Fußball Ball Sport",tennis:"Tennis",
    swim:"Schwimmen",read:"Lesen",music:"Musik Lied Konzert Gitarre",cook:"Kochen Koch Topf",shopping:"Einkaufen Einkauf Einkaufstasche",sleep:"Schlafen Schlaf",
    hiking:"Wandern Wanderung Ausflug",dance:"Tanzen Tanz Party Disco",man:"Mann Herr Vater Opa Großvater Bruder",woman:"Frau Dame Mutter Oma Großmutter Schwester",
    child:"Kind Kinder Junge Mädchen Sohn Tochter",family:"Familie Eltern",baby:"Baby Kinderwagen",
    "no-smoking":"Rauchen Rauchverbot",open:"Öffnungszeiten",closed:"Ruhetag",toilet:"Toilette Toiletten WC Klo",exit:"Ausgang Notausgang",
    parking:"Parkplatz Parkhaus",wifi:"WLAN WiFi",elevator:"Aufzug Lift Fahrstuhl",stairs:"Treppe Stock Etage",info:"Information Auskunft Info Touristeninformation"};
  const WM={};
  for(const k in W)for(const w of W[k].split(" "))WM[w.toLowerCase()]=k;
  const word=s=>{s=String(s||"").trim().replace(/^(der|die|das|den|dem|ein|eine|einen)\s+/i,"").replace(/[.,!?]+$/,"").toLowerCase();
    return WM[s]||"";};

  return {svg,has,word,list:Object.keys(I)};
})();
