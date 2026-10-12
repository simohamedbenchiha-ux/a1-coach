/* Contenu pédagogique : questions (Q), formats officiels (TEIL), Sprechen, Formulaires, E-mails, Wortschatz. */
const SK={H:"Hören",L:"Lesen",G:"Grammatik",W:"Schreiben",S:"Sprechen",V:"Wortschatz"};
/* Official structure (Durchführungsbestimmungen A1, Stand 1.9.2023) */
const TEIL={
 H1:{n:6,plays:2,i:"Hören Sie. Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal."},
 H2:{n:4,plays:1,i:"Hören Sie. Richtig oder falsch? Sie hören jeden Text einmal."},
 H3:{n:5,plays:2,i:"Hören Sie. Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal."},
 L1:{n:5,i:"Lesen Sie den Text. Richtig oder falsch?"},
 L2:{n:5,i:"Lesen Sie die Aufgabe und die Anzeigen. Wo finden Sie Informationen? Kreuzen Sie an: a oder b."},
 L3:{n:5,i:"Lesen Sie den Text. Richtig oder falsch?"},
 G:{i:"Wählen Sie die richtige Antwort."}
};
/* o[0] is always the correct option; rf = Richtig/Falsch; ab + c = choose ad a or b */
const Q=[
/* Hören Teil 1 — kurze Gespräche */
{id:"h1",s:"H",p:"H1",t:"Bahnhof",audio:"Entschuldigung, wann fährt der Zug nach München? – Um zehn Uhr fünfzehn. Von Gleis sieben.",q:"Von welchem Gleis fährt der Zug nach München?",fr:"Le train pour Munich part de quel quai ?",o:["Gleis 7","Gleis 17","Gleis 10"],x:"sieben = 7, siebzehn = 17. 10 h 15 est l'heure, pas le quai."},
{id:"h3",s:"H",p:"H1",t:"Markt",audio:"Was kosten die Bananen? – Ein Kilo kostet heute nur ein Euro neunundneunzig.",q:"Wie viel kostet ein Kilo Bananen?",fr:"Combien coûte un kilo de bananes ?",o:["1,99 €","9,19 €","2,99 €"],x:"neunundneunzig = 99 : l'unité se dit avant la dizaine."},
{id:"h8",s:"H",p:"H1",t:"Wohnen",audio:"Wo wohnst du? – In der Goethestraße zwölf, im dritten Stock.",q:"In welchem Stock wohnt die Frau?",fr:"À quel étage habite la femme ?",o:["Im dritten Stock","Im zweiten Stock","Im zwölften Stock"],x:"dritte = troisième. 12 est le numéro de la rue."},
{id:"h11",s:"H",p:"H1",t:"Bäckerei",audio:"Guten Morgen, was möchten Sie? – Zwei Brötchen und einen Kaffee, bitte.",q:"Was kauft der Mann?",fr:"Qu'achète l'homme ?",o:["Zwei Brötchen und einen Kaffee","Ein Brötchen und einen Tee","Zwei Kaffee"],x:"Brötchen = petit pain."},
{id:"h12",s:"H",p:"H1",t:"Kurs",audio:"Beginnt der Deutschkurs heute um neun Uhr? – Nein, heute beginnt er um zehn Uhr.",q:"Wann beginnt der Kurs heute?",fr:"À quelle heure commence le cours aujourd'hui ?",o:["Um 10 Uhr","Um 9 Uhr","Um 11 Uhr"],x:"Après « Nein », c'est la 2e information qui compte."},
{id:"h13",s:"H",p:"H1",t:"Kaufhaus",audio:"Entschuldigung, wo sind die Toiletten? – Im ersten Stock, neben dem Café.",q:"Wo sind die Toiletten?",fr:"Où sont les toilettes ?",o:["Im ersten Stock","Im Erdgeschoss","Im zweiten Stock"],x:"erste Stock = 1er étage ; Erdgeschoss = rez-de-chaussée."},
{id:"h15",s:"H",p:"H1",t:"Freizeit",audio:"Was machst du am Wochenende? – Am Samstag spiele ich Tennis und am Sonntag besuche ich meine Oma.",q:"Was macht die Frau am Sonntag?",fr:"Que fait la femme dimanche ?",o:["Sie besucht ihre Oma.","Sie spielt Tennis.","Sie arbeitet."],x:"Samstag = Tennis, Sonntag = Oma. Attention à l'ordre des jours."},
{id:"h16",s:"H",p:"H1",t:"Kleidung",audio:"Entschuldigung, wie viel kostet die Jacke? – Die Jacke kostet neunundvierzig Euro.",q:"Wie viel kostet die Jacke?",fr:"Combien coûte la veste ?",o:["49 €","94 €","40 €"],x:"neun-und-vierzig : 9 et 40 = 49."},
/* Hören Teil 2 — Durchsagen */
{id:"h4",s:"H",p:"H2",t:"Supermarkt",audio:"Liebe Kunden! Unser Supermarkt schließt in zehn Minuten. Bitte gehen Sie zur Kasse.",q:"Der Supermarkt schließt in zwanzig Minuten.",fr:"Le supermarché ferme dans vingt minutes.",rf:false,x:"zehn = 10, zwanzig = 20."},
{id:"h9",s:"H",p:"H2",t:"Bahnhof",audio:"Liebe Fahrgäste, der ICE nach Hamburg hat heute dreißig Minuten Verspätung.",q:"Der Zug nach Hamburg kommt pünktlich.",fr:"Le train pour Hambourg arrive à l'heure.",rf:false,x:"Verspätung = retard ; pünktlich = à l'heure."},
{id:"h14",s:"H",p:"H2",t:"Schwimmbad",audio:"Das Schwimmbad ist montags geschlossen. Von Dienstag bis Sonntag ist es von acht bis zwanzig Uhr geöffnet.",q:"Man kann am Montag schwimmen.",fr:"On peut nager le lundi.",rf:false,x:"montags geschlossen = fermé le lundi."},
{id:"h17",s:"H",p:"H2",t:"Supermarkt",audio:"Liebe Kunden, heute haben wir Äpfel im Angebot. Ein Kilo kostet nur zwei Euro.",q:"Ein Kilo Äpfel kostet heute zwei Euro.",fr:"Un kilo de pommes coûte deux euros aujourd'hui.",rf:true,x:"im Angebot = en promotion."},
{id:"h18",s:"H",p:"H2",t:"Bahnhof",audio:"Achtung an Gleis drei: Der Zug nach Köln fährt heute von Gleis fünf.",q:"Der Zug nach Köln fährt heute von Gleis drei.",fr:"Le train pour Cologne part aujourd'hui du quai trois.",rf:false,x:"On est au quai 3, mais le train part du quai 5 (fünf)."},
{id:"h19",s:"H",p:"H2",t:"Flughafen",audio:"Information für die Fluggäste nach Rom: Bitte kommen Sie jetzt zum Ausgang B zwölf.",q:"Die Fluggäste nach Rom gehen jetzt zum Ausgang B12.",fr:"Les passagers pour Rome vont maintenant à la porte B12.",rf:true,x:"Ausgang = porte (d'embarquement) / sortie."},
{id:"h6",s:"H",p:"H2",t:"Radio",audio:"Und jetzt das Wetter: Am Wochenende wird es kalt und es regnet viel.",q:"Am Wochenende ist das Wetter schön.",fr:"Le week-end, il fera beau.",rf:false,x:"kalt = froid, es regnet = il pleut."},
/* Hören Teil 3 — Telefonnachrichten */
{id:"h2",s:"H",p:"H3",t:"Telefon",audio:"Hallo Anna, hier ist Peter. Wir treffen uns morgen um halb drei vor dem Kino. Bis morgen!",q:"Wann treffen sich Anna und Peter?",fr:"Quand Anna et Peter se retrouvent-ils ?",o:["Um 14:30 Uhr","Um 15:30 Uhr","Um 15:00 Uhr"],x:"Piège classique : « halb drei » = la moitié AVANT trois, donc 2 h 30."},
{id:"h5",s:"H",p:"H3",t:"Telefon",audio:"Hallo, hier ist Jonas. Meine neue Telefonnummer ist null, eins, sieben, drei, vier, fünf, acht, zwei. Ruf mich bitte an!",q:"Wie ist die neue Telefonnummer von Jonas?",fr:"Quel est le nouveau numéro de Jonas ?",o:["0173 4582","0137 4528","0173 5482"],x:"Note chaque chiffre pendant l'écoute."},
{id:"h7",s:"H",p:"H3",t:"Arzt",audio:"Hier ist die Praxis Doktor Weber. Am Mittwoch haben wir keine Sprechstunde. Kommen Sie bitte am Donnerstag um neun Uhr.",q:"Wann soll der Patient kommen?",fr:"Quand le patient doit-il venir ?",o:["Am Donnerstag","Am Mittwoch","Am Dienstag"],x:"Mittwoch = mercredi (fermé), Donnerstag = jeudi."},
{id:"h10",s:"H",p:"H3",t:"Telefon",audio:"Hallo, hier ist Sabine. Ich kann heute Abend leider nicht ins Kino kommen. Ich bin krank. Tschüss!",q:"Warum kommt Sabine nicht ins Kino?",fr:"Pourquoi Sabine ne vient-elle pas au cinéma ?",o:["Sie ist krank.","Sie muss arbeiten.","Sie hat keine Zeit."],x:"krank = malade."},
{id:"h20",s:"H",p:"H3",t:"Auto",audio:"Guten Tag, Herr Braun, hier ist das Autohaus Meyer. Ihr Auto ist fertig. Sie können es morgen ab acht Uhr abholen.",q:"Wann kann Herr Braun sein Auto abholen?",fr:"Quand M. Braun peut-il récupérer sa voiture ?",o:["Morgen ab 8 Uhr","Heute ab 8 Uhr","Morgen ab 18 Uhr"],x:"morgen = demain ; acht = 8, achtzehn = 18."},
{id:"h21",s:"H",p:"H3",t:"Familie",audio:"Hallo Mama, hier ist Tim. Ich komme heute später nach Hause. Ich esse bei Paul. Bis heute Abend!",q:"Wo isst Tim heute?",fr:"Où Tim mange-t-il aujourd'hui ?",o:["Bei Paul","Zu Hause","Im Restaurant"],x:"bei Paul = chez Paul."},
/* Lesen Teil 1 — kurze Mitteilungen */
{id:"l3",s:"L",p:"L1",t:"SMS",mail:"Hi Tom,\nich komme 20 Minuten später. Mein Bus ist kaputt.\nLisa",q:"Lisa kommt später, denn ihr Bus ist kaputt.",fr:"Lisa arrive plus tard, car son bus est en panne.",rf:true,x:"kaputt = en panne."},
{id:"l5",s:"L",p:"L1",t:"E-Mail",mail:"Liebe Maria,\nam Samstag habe ich Geburtstag und mache eine Party. Kannst du einen Salat mitbringen?\nViele Grüße\nJonas",q:"Maria soll einen Kuchen mitbringen.",fr:"Maria doit apporter un gâteau.",rf:false,x:"Jonas demande einen Salat."},
{id:"l9",s:"L",p:"L1",t:"E-Mail",mail:"Hallo Ben,\nich bin jetzt in Wien. Das Hotel ist schön, aber das Wetter ist schlecht. Morgen besuche ich ein Museum.\nBis bald\nCarla",q:"In Wien ist das Wetter schön.",fr:"À Vienne, il fait beau.",rf:false,x:"C'est l'hôtel qui est schön ; das Wetter ist schlecht."},
{id:"l12",s:"L",p:"L1",t:"Nachricht",mail:"Hallo Jan,\nich bin krank und kann morgen nicht zur Arbeit kommen. Kannst du bitte Herrn Wolf informieren?\nDanke! Eva",q:"Eva geht morgen zur Arbeit.",fr:"Eva va au travail demain.",rf:false,x:"kann nicht kommen = ne peut pas venir."},
{id:"l13",s:"L",p:"L1",t:"E-Mail",mail:"Liebe Frau Schmidt,\nab Montag habe ich eine neue Adresse: Lindenweg 4, 10115 Berlin. Meine Telefonnummer bleibt gleich.\nViele Grüße\nKarl Bauer",q:"Herr Bauer hat eine neue Telefonnummer.",fr:"M. Bauer a un nouveau numéro de téléphone.",rf:false,x:"bleibt gleich = reste le même. Seule l'adresse change."},
{id:"l14",s:"L",p:"L1",t:"Nachricht",mail:"Hi Sara,\nwir gehen am Freitag um 20 Uhr ins Kino. Kommst du mit? Ruf mich bitte an!\nLeon",q:"Leon möchte mit Sara ins Kino gehen.",fr:"Leon veut aller au cinéma avec Sara.",rf:true,x:"Kommst du mit? = Tu viens avec nous ?"},
/* Lesen Teil 2 — Anzeigen a oder b */
{id:"l20",s:"L",p:"L2",t:"Kurs",q:"Sie möchten am Sonntag Deutsch lernen.",fr:"Vous voulez apprendre l'allemand le dimanche.",ab:["Volkshochschule\nDeutschkurse: Montag bis Freitag, 9–12 Uhr","Sprachschule Lingua\nDeutsch am Wochenende: Samstag und Sonntag, 10–14 Uhr"],c:1,x:"Sonntag → Wochenende → b."},
{id:"l21",s:"L",p:"L2",t:"Wohnung",q:"Sie suchen eine Wohnung mit Balkon.",fr:"Vous cherchez un appartement avec balcon.",ab:["2-Zimmer-Wohnung, 60 m²\nKüche, Bad, großer Balkon\n650 € warm","3-Zimmer-Wohnung, 80 m²\nKüche, Bad, Garten\n850 € warm"],c:0,x:"Balkon n'apparaît que dans a."},
{id:"l22",s:"L",p:"L2",t:"Reisen",q:"Sie möchten mit dem Zug von Berlin nach Hamburg fahren.",fr:"Vous voulez aller de Berlin à Hambourg en train.",ab:["www.bahn.de\nFahrkarten online kaufen – Züge in ganz Deutschland","www.flug-billig.de\nBillige Flüge ab Berlin"],c:0,x:"Zug = train → bahn.de."},
{id:"l23",s:"L",p:"L2",t:"Essen",q:"Sie möchten am Abend Pizza essen.",fr:"Vous voulez manger une pizza le soir.",ab:["Pizzeria Roma\nPizza und Pasta\ntäglich 17–23 Uhr","Café Sonne\nKaffee und Kuchen\ntäglich 8–18 Uhr"],c:0,x:"Le café ferme à 18 h et ne sert pas de pizza."},
{id:"l24",s:"L",p:"L2",t:"Fahrrad",q:"Ihr Fahrrad ist kaputt.",fr:"Votre vélo est en panne.",ab:["City-Rad\nFahrräder mieten: 10 € pro Tag","Rad-Werkstatt Müller\nWir reparieren Ihr Fahrrad – schnell und billig!"],c:1,x:"reparieren = réparer → b."},
{id:"l25",s:"L",p:"L2",t:"Sport",q:"Sie möchten am Samstag Sport machen.",fr:"Vous voulez faire du sport samedi.",ab:["Fitnessstudio Aktiv\nMontag bis Samstag 7–22 Uhr","Sportclub Blau\nMontag bis Freitag 16–21 Uhr"],c:0,x:"Seul a est ouvert le Samstag."},
{id:"l26",s:"L",p:"L2",t:"Arzt",q:"Sie haben Zahnschmerzen.",fr:"Vous avez mal aux dents.",ab:["Dr. Hans Vogel\nZahnarzt\nMo–Fr 8–18 Uhr","Dr. Petra Lang\nAugenärztin\nMo–Fr 9–17 Uhr"],c:0,x:"Zahn = dent → Zahnarzt ; Auge = œil."},
/* Lesen Teil 3 — Schilder */
{id:"l1",s:"L",p:"L3",t:"Geschäft",sign:"Heute geschlossen!\nAb morgen 9 Uhr wieder geöffnet.",q:"Sie können heute in diesem Geschäft einkaufen.",fr:"Vous pouvez faire vos courses dans ce magasin aujourd'hui.",rf:false,x:"geschlossen = fermé, geöffnet = ouvert."},
{id:"l2",s:"L",p:"L3",t:"Anzeige",sign:"Zimmer frei in WG\n300 € warm\nNur für Nichtraucher",q:"Raucher können das Zimmer mieten.",fr:"Les fumeurs peuvent louer la chambre.",rf:false,x:"Nichtraucher = non-fumeur."},
{id:"l4",s:"L",p:"L3",t:"Kurs",sign:"Deutschkurs A1\nMontag und Mittwoch\n18:00 – 19:30 Uhr",q:"Der Kurs ist zweimal pro Woche.",fr:"Le cours a lieu deux fois par semaine.",rf:true,x:"Montag + Mittwoch = 2 jours."},
{id:"l7",s:"L",p:"L3",t:"Arzt",sign:"Praxis Dr. Klein\nSprechzeiten: Mo–Fr 8–12 Uhr\nDi und Do auch 15–18 Uhr",q:"Am Mittwochnachmittag ist die Praxis geöffnet.",fr:"Le cabinet est ouvert le mercredi après-midi.",rf:false,x:"L'après-midi, seulement Di (mardi) et Do (jeudi)."},
{id:"l8",s:"L",p:"L3",t:"Angebot",sign:"Sonderangebot!\nT-Shirts nur 5 €\nNur heute und morgen",q:"Das Angebot gibt es auch morgen.",fr:"L'offre est aussi valable demain.",rf:true,x:"heute und morgen = aujourd'hui et demain."},
{id:"l10",s:"L",p:"L3",t:"Geschäft",sign:"Bitte Hunde draußen lassen!",q:"Hunde müssen draußen bleiben.",fr:"Les chiens doivent rester dehors.",rf:true,x:"draußen lassen = laisser dehors."},
{id:"l11",s:"L",p:"L3",t:"Orientierung",sign:"Bibliothek – 2. Stock\nCafeteria – Erdgeschoss\nComputerraum – 1. Stock",q:"Sie möchten etwas essen. Sie gehen in den 1. Stock.",fr:"Vous voulez manger. Vous allez au 1er étage.",rf:false,x:"Cafeteria → Erdgeschoss (rez-de-chaussée)."},
{id:"l15",s:"L",p:"L3",t:"Bus",sign:"Fahrkarten bitte am Automaten kaufen.\nIm Bus keine Fahrkarten!",q:"Sie können im Bus keine Fahrkarte kaufen.",fr:"Vous ne pouvez pas acheter de billet dans le bus.",rf:true,x:"Automat = distributeur."},
{id:"l16",s:"L",p:"L3",t:"Supermarkt",sign:"Supermarkt Frisch\nNeue Öffnungszeiten:\nMo–Sa 7–21 Uhr",q:"Der Supermarkt ist am Samstag bis 21 Uhr geöffnet.",fr:"Le supermarché est ouvert jusqu'à 21 h le samedi.",rf:true,x:"Mo–Sa = du lundi au samedi."},
/* — Erweiterung: weitere Aufgaben — */
{id:"h22",s:"H",p:"H1",t:"Café",audio:"Möchten Sie Kaffee oder Tee? – Einen Tee, bitte. Mit Zucker.",q:"Was trinkt die Frau?",fr:"Que boit la femme ?",o:["Tee mit Zucker","Kaffee mit Milch","Tee ohne Zucker"],x:"mit Zucker = avec du sucre ; ohne = sans."},
{id:"h23",s:"H",p:"H1",t:"Datum",audio:"Wann hast du Geburtstag? – Am zwölften Mai.",q:"Wann hat der Mann Geburtstag?",fr:"Quand est l'anniversaire de l'homme ?",o:["Am 12. Mai","Am 2. Mai","Am 12. März"],x:"zwölften = 12e ; Mai ≠ März (mars)."},
{id:"h24",s:"H",p:"H1",t:"Weg",audio:"Entschuldigung, wie komme ich zum Bahnhof? – Gehen Sie hier geradeaus und dann die zweite Straße links.",q:"Wie kommt man zum Bahnhof?",fr:"Comment va-t-on à la gare ?",o:["Geradeaus, dann die zweite Straße links","Die erste Straße rechts","Geradeaus, dann rechts"],x:"geradeaus = tout droit ; zweite = deuxième ; links = à gauche."},
{id:"h25",s:"H",p:"H1",t:"Arbeit",audio:"Was machst du beruflich? – Ich bin Verkäuferin. Ich arbeite im Supermarkt.",q:"Wo arbeitet die Frau?",fr:"Où travaille la femme ?",o:["Im Supermarkt","Im Krankenhaus","Im Büro"],x:"Verkäuferin = vendeuse."},
{id:"h26",s:"H",p:"H2",t:"Kaufhaus",audio:"Liebe Kunden, heute sind alle Schuhe im zweiten Stock im Angebot.",q:"Die Schuhe sind im ersten Stock.",fr:"Les chaussures sont au premier étage.",rf:false,x:"im zweiten Stock = au 2e étage."},
{id:"h27",s:"H",p:"H2",t:"Bahnhof",audio:"Achtung, Fahrgäste nach Frankfurt: Bitte steigen Sie in Mainz um.",q:"Die Fahrgäste nach Frankfurt müssen umsteigen.",fr:"Les passagers pour Francfort doivent changer de train.",rf:true,x:"umsteigen = changer (de train)."},
{id:"h28",s:"H",p:"H2",t:"Radio",audio:"Und hier das Wetter für morgen: Am Vormittag scheint die Sonne, am Nachmittag regnet es.",q:"Morgen regnet es den ganzen Tag.",fr:"Demain, il pleut toute la journée.",rf:false,x:"Il pleut seulement l'après-midi (Nachmittag)."},
{id:"h29",s:"H",p:"H3",t:"Kurs",audio:"Hallo Frau Klein, hier ist die Sprachschule Lingua. Ihr Kurs beginnt nicht am Montag, sondern am Dienstag. Um neun Uhr.",q:"Wann beginnt der Kurs?",fr:"Quand commence le cours ?",o:["Am Dienstag um 9 Uhr","Am Montag um 9 Uhr","Am Dienstag um 10 Uhr"],x:"nicht am Montag, sondern am Dienstag : c'est mardi."},
{id:"h30",s:"H",p:"H3",t:"Familie",audio:"Hallo Lukas, hier ist Mama. Bitte kauf noch Milch und Brot. Ich komme um sechs nach Hause.",q:"Was soll Lukas kaufen?",fr:"Que doit acheter Lukas ?",o:["Milch und Brot","Milch und Käse","Brot und Eier"],x:"Milch = lait, Brot = pain."},
{id:"h31",s:"H",p:"H3",t:"Hotel",audio:"Guten Tag, hier ist das Hotel Sonne. Ihr Zimmer ist frei. Es kostet achtzig Euro pro Nacht.",q:"Wie viel kostet das Zimmer pro Nacht?",fr:"Combien coûte la chambre par nuit ?",o:["80 €","18 €","88 €"],x:"achtzig = 80, achtzehn = 18."},
{id:"h32",s:"H",p:"H3",t:"Sport",audio:"Hi Nora, hier ist Ben. Wir spielen heute nicht im Park Fußball. Wir spielen in der Sporthalle in der Schulstraße.",q:"Wo spielen sie heute Fußball?",fr:"Où jouent-ils au foot aujourd'hui ?",o:["In der Sporthalle","Im Park","In der Schule"],x:"nicht im Park → in der Sporthalle (salle de sport)."},
{id:"l17",s:"L",p:"L1",t:"E-Mail",mail:"Liebe Anna,\nich bin jetzt in Hamburg und habe eine neue Arbeit. Meine Wohnung ist klein, aber schön. Besuchst du mich im Juni?\nDein Max",q:"Max hat eine große Wohnung.",fr:"Max a un grand appartement.",rf:false,x:"klein = petit."},
{id:"l18",s:"L",p:"L1",t:"Büro",mail:"Hallo Herr Weber,\nder Computer im Büro ist kaputt. Ein Techniker kommt morgen um 10 Uhr.\nViele Grüße\nSandra Klein",q:"Morgen kommt jemand und repariert den Computer.",fr:"Demain, quelqu'un vient réparer l'ordinateur.",rf:true,x:"Ein Techniker kommt morgen."},
{id:"l19",s:"L",p:"L1",t:"Nachricht",mail:"Hi Paula,\nwir machen am Sonntag ein Picknick im Park. Bitte bring Getränke mit. Wir treffen uns um 12 Uhr am Eingang.\nTim",q:"Paula soll Essen mitbringen.",fr:"Paula doit apporter à manger.",rf:false,x:"Getränke = boissons, pas Essen."},
{id:"l20",s:"L",p:"L1",t:"Büro",mail:"Liebe Kolleginnen und Kollegen,\nam Freitag ist das Büro geschlossen. Am Montag sind wir wieder da.\nIhre Frau Berg",q:"Am Montag ist das Büro geöffnet.",fr:"Lundi, le bureau est ouvert.",rf:true,x:"wieder da = de retour."},
{id:"l27",s:"L",p:"L2",t:"Kurs",q:"Sie möchten am Abend Deutsch lernen.",fr:"Vous voulez apprendre l'allemand le soir.",ab:["Sprachschule Ost\nDeutschkurse 8–12 Uhr","Abendschule Mitte\nDeutsch A1: Mo + Mi 18–20 Uhr"],c:1,x:"18–20 Uhr = le soir → b."},
{id:"l28",s:"L",p:"L2",t:"Hotel",q:"Sie brauchen für eine Nacht ein Zimmer in Köln.",fr:"Vous avez besoin d'une chambre pour une nuit à Cologne.",ab:["Hotel am Dom, Köln\nEinzelzimmer ab 79 € pro Nacht","Wohnung in Köln\nzu vermieten ab 1. Mai, 3 Zimmer"],c:0,x:"Une nuit → hôtel ; b est un appartement à louer."},
{id:"l29",s:"L",p:"L2",t:"Bäckerei",q:"Sie möchten am Sonntag Brot kaufen.",fr:"Vous voulez acheter du pain dimanche.",ab:["Bäckerei Krause\nMo–Sa 6–18 Uhr","Bäckerei Sonnenschein\ntäglich 7–14 Uhr, auch sonntags"],c:1,x:"sonntags = le dimanche → b."},
{id:"l30",s:"L",p:"L3",t:"Schild",sign:"Bitte nicht rauchen!",q:"Hier darf man rauchen.",fr:"Ici, on a le droit de fumer.",rf:false,x:"nicht rauchen = ne pas fumer."},
{id:"l31",s:"L",p:"L3",t:"Arzt",sign:"Praxis Dr. Ahmadi\nUrlaub vom 1. bis 15. August\nVertretung: Dr. Klein, Marktstraße 3",q:"Anfang August können Sie zu Dr. Klein gehen.",fr:"Début août, vous pouvez aller chez le Dr Klein.",rf:true,x:"Vertretung = remplaçant pendant les vacances."},
{id:"l32",s:"L",p:"L3",t:"Parken",sign:"Parkplatz nur für Kunden\nmax. 2 Stunden",q:"Kunden können hier den ganzen Tag parken.",fr:"Les clients peuvent se garer ici toute la journée.",rf:false,x:"max. 2 Stunden = 2 heures maximum."},
{id:"g25",s:"G",p:"G",t:"Präteritum",q:"Ich ___ gestern im Kino.",fr:"J'étais au cinéma hier.",o:["war","bin","habe"],x:"gestern → passé : ich war (sein), ich hatte (haben)."},
{id:"g26",s:"G",p:"G",t:"Präpositionen",q:"Kommst du ___ Party?",fr:"Tu viens à la fête ?",o:["zur","zum","zu den"],x:"die Party → zu + der = zur."},
{id:"g27",s:"G",p:"G",t:"Präpositionen",q:"Ich gehe heute ___ Arzt.",fr:"Je vais chez le médecin aujourd'hui.",o:["zum","zur","zu die"],x:"der Arzt → zu + dem = zum."},
{id:"g28",s:"G",p:"G",t:"Pronomen",q:"Ist der Kaffee für ___?",fr:"Le café est pour moi ?",o:["mich","mir","ich"],x:"für + accusatif → mich."},
{id:"g29",s:"G",p:"G",t:"Trennbare Verben",q:"Wann ___ der Zug in Berlin an?",fr:"Quand le train arrive-t-il à Berlin ?",o:["kommt","ankommt","kommen"],x:"ankommen est séparable : Der Zug kommt … an."},
/* Grammatik — Training zur Unterstützung */
{id:"g1",s:"G",p:"G",t:"Verben",q:"Ich ___ aus Marokko.",fr:"Je viens du Maroc.",o:["komme","kommst","kommt"],x:"ich → -e, du → -st, er/sie → -t."},
{id:"g2",s:"G",p:"G",t:"Verben",q:"___ du Geschwister?",fr:"As-tu des frères et sœurs ?",o:["Hast","Hat","Habe"],x:"du hast, er hat, ich habe."},
{id:"g3",s:"G",p:"G",t:"Akkusativ",q:"Ich habe ___ Bruder.",fr:"J'ai un frère.",o:["einen","ein","eine"],x:"der Bruder (masculin) → accusatif : einen."},
{id:"g4",s:"G",p:"G",t:"W-Fragen",q:"___ wohnst du? – In Berlin.",fr:"Où habites-tu ?",o:["Wo","Wer","Was"],x:"Wo = où, Wer = qui, Was = quoi."},
{id:"g5",s:"G",p:"G",t:"Höflich",q:"Ich ___ einen Kaffee, bitte.",fr:"Je voudrais un café.",o:["möchte","möchten","möchtest"],x:"ich möchte = je voudrais."},
{id:"g6",s:"G",p:"G",t:"Verben",q:"Wie viel ___ das?",fr:"Combien ça coûte ?",o:["kostet","kosten","kostest"],x:"das → 3e personne : kostet."},
{id:"g7",s:"G",p:"G",t:"Modalverben",q:"Er ___ gut Deutsch sprechen.",fr:"Il sait bien parler allemand.",o:["kann","können","kannst"],x:"er kann + infinitif à la fin."},
{id:"g8",s:"G",p:"G",t:"Präpositionen",q:"Ich fahre ___ Bus zur Arbeit.",fr:"Je vais au travail en bus.",o:["mit dem","mit der","mit den"],x:"der Bus → mit + datif → mit dem."},
{id:"g9",s:"G",p:"G",t:"Zahlen",q:"„fünfundvierzig“ ist …",fr:"« fünfundvierzig », c'est…",o:["45","54","40"],x:"fünf-und-vierzig : 5 et 40."},
{id:"g10",s:"G",p:"G",t:"Uhrzeit",q:"„Viertel nach acht“ ist …",fr:"« Viertel nach acht », c'est…",o:["8:15 Uhr","7:45 Uhr","8:45 Uhr"],x:"Viertel nach = et quart, Viertel vor = moins le quart."},
{id:"g11",s:"G",p:"G",t:"Wortschatz",q:"Was ist das Gegenteil von „teuer“?",fr:"Quel est le contraire de « cher » ?",o:["billig","groß","neu"],x:"teuer = cher, billig = bon marché."},
{id:"g12",s:"G",p:"G",t:"Kalender",q:"Welcher Tag kommt nach Freitag?",fr:"Quel jour vient après vendredi ?",o:["Samstag","Donnerstag","Sonntag"],x:"Freitag → Samstag → Sonntag."},
{id:"g13",s:"G",p:"G",t:"W-Fragen",q:"___ alt bist du?",fr:"Quel âge as-tu ?",o:["Wie","Wo","Wann"],x:"Wie alt = quel âge."},
{id:"g14",s:"G",p:"G",t:"Satzbau",q:"Morgen ___ nach Hamburg.",fr:"Demain je vais à Hambourg.",o:["fahre ich","ich fahre","fahren ich"],x:"Le verbe reste en 2e position : Morgen fahre ich…"},
{id:"g15",s:"G",p:"G",t:"Artikel",q:"___ Tisch",fr:"la table",o:["der","die","das"],x:"der Tisch. Apprends toujours le nom avec son article."},
{id:"g16",s:"G",p:"G",t:"Artikel",q:"___ Lampe",fr:"la lampe",o:["die","der","das"],x:"die Lampe : beaucoup de noms en -e sont féminins."},
{id:"g17",s:"G",p:"G",t:"Artikel",q:"___ Auto",fr:"la voiture",o:["das","der","die"],x:"das Auto."},
{id:"g18",s:"G",p:"G",t:"Possessiv",q:"Das ist ___ Schwester.",fr:"C'est ma sœur.",o:["meine","mein","meinen"],x:"die Schwester (féminin) → meine."},
{id:"g19",s:"G",p:"G",t:"Verben",q:"Wir ___ am Samstag ins Kino.",fr:"Nous allons au cinéma samedi.",o:["gehen","geht","gehst"],x:"wir/sie/Sie → -en."},
{id:"g20",s:"G",p:"G",t:"Wortschatz",q:"Was passt nicht?",fr:"Quel mot ne va pas avec les autres ?",o:["Stuhl","Apfel","Birne"],x:"Apfel et Birne sont des fruits ; Stuhl = chaise."},
{id:"g21",s:"G",p:"G",t:"Modalverben",q:"Ich ___ morgen um 7 Uhr aufstehen.",fr:"Je dois me lever à 7 h demain.",o:["muss","musst","müssen"],x:"ich muss, du musst, wir müssen."},
{id:"g22",s:"G",p:"G",t:"Uhrzeit",q:"Es ist 10:30 Uhr. Man sagt: Es ist …",fr:"Il est 10 h 30. On dit…",o:["halb elf","halb zehn","zehn nach halb"],x:"10:30 = halb elf (la moitié vers onze)."},
{id:"g23",s:"G",p:"G",t:"Plural",q:"das Kind → die ___",fr:"l'enfant → les enfants",o:["Kinder","Kinds","Kinden"],x:"das Kind → die Kinder."},
{id:"g24",s:"G",p:"G",t:"Höflich",q:"___ Sie das bitte wiederholen?",fr:"Pouvez-vous répéter, s'il vous plaît ?",o:["Können","Kann","Kannst"],x:"Sie (vouvoiement) → können. Phrase très utile à l'oral !"}
];
const SPEAK={
 1:{title:"Teil 1 · Sich vorstellen",max:3,items:[
  {p:"Stellen Sie sich vor.",hint:"Name? · Alter? · Land? · Wohnort? · Sprachen? · Beruf? · Hobby?",fr:"Présentez-vous avec les 7 mots-clés.",m:"Ich heiße Mohamed. Ich bin 24 Jahre alt. Ich komme aus Marokko und wohne in Casablanca. Ich spreche Arabisch, Französisch und ein bisschen Deutsch. Ich bin Student. Mein Hobby ist Fußball."},
  {p:"Buchstabieren Sie Ihren Namen. Sagen Sie Ihre Telefonnummer.",fr:"Épelez votre nom et donnez votre numéro de téléphone.",m:"Mein Name ist Benchiha: B – E – N – C – H – I – H – A. Meine Telefonnummer ist null – sechs – eins – zwei – drei – vier – fünf."}]},
 2:{title:"Teil 2 · Um Informationen bitten und Informationen geben",max:6,items:[
  {p:"Thema: Essen und Trinken\nWort: Frühstück",fr:"Posez une question avec ce mot, puis répondez à une question.",m:"Frage: Was isst du zum Frühstück?\nAntwort: Ich esse Brot mit Käse und trinke Tee."},
  {p:"Thema: Freizeit\nWort: Wochenende",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Was machst du am Wochenende?\nAntwort: Am Wochenende spiele ich Fußball."},
  {p:"Thema: Wohnen\nWort: Zimmer",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wie viele Zimmer hat deine Wohnung?\nAntwort: Meine Wohnung hat drei Zimmer."},
  {p:"Thema: Einkaufen\nWort: Obst",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Welches Obst kaufst du gern?\nAntwort: Ich kaufe gern Äpfel und Bananen."},
  {p:"Thema: Familie\nWort: Geschwister",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Hast du Geschwister?\nAntwort: Ja, ich habe einen Bruder und eine Schwester."},
  {p:"Thema: Arbeit\nWort: Beruf",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Was bist du von Beruf?\nAntwort: Ich bin Mechaniker."},
  {p:"Thema: Reisen\nWort: Urlaub",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wohin fährst du im Urlaub?\nAntwort: Im Urlaub fahre ich nach Spanien."}]},
 3:{title:"Teil 3 · Bitten formulieren und darauf reagieren",max:6,items:[
  {p:"Bildkarte: 🪟 Fenster",fr:"Formulez une demande polie avec cette image, puis réagissez.",m:"Können Sie bitte das Fenster öffnen?\n– Ja, gern."},
  {p:"Bildkarte: 🖊️ Kugelschreiber",fr:"Formulez une demande polie avec cette image.",m:"Kann ich bitte einen Kuli haben?\n– Ja, hier bitte."},
  {p:"Bildkarte: 💧 Wasser",fr:"Formulez une demande polie avec cette image.",m:"Ich möchte bitte ein Glas Wasser.\n– Gern, bitte schön."},
  {p:"Bildkarte: 🐢 langsam sprechen",fr:"Demandez de parler plus lentement.",m:"Können Sie bitte langsam sprechen?\n– Ja, natürlich."},
  {p:"Bildkarte: 🕐 Uhr",fr:"Demandez l'heure.",m:"Wie spät ist es, bitte?\n– Es ist zehn Uhr."},
  {p:"Bildkarte: 🧂 Salz",fr:"Demandez le sel.",m:"Können Sie mir bitte das Salz geben?\n– Ja, bitte."}]}
};
const FORMS=[
 {title:"Anmeldung Deutschkurs",text:"Ihr Freund Karim Haddad möchte einen Deutschkurs machen. Er ist 27 Jahre alt und kommt aus Marokko. Er wohnt jetzt in der Bahnhofstraße 5, 60329 Frankfurt. Karim arbeitet am Tag. Er kann nur am Abend lernen.",fr:"Votre ami Karim veut s'inscrire à un cours d'allemand. Remplissez le formulaire pour lui.",
  f:[["Familienname","Haddad"],["Alter","27"],["Herkunftsland","Marokko"],["Postleitzahl","60329"],["Kurszeit",["Abend","Vormittag","Nachmittag","Abend"]]]},
 {title:"Anmeldung Sportverein",text:"Julia Becker möchte im Sportverein „Fit und Froh“ schwimmen. Sie ist am 12.05.1990 geboren. Ihre Telefonnummer ist 0171 2345678. Sie möchte jeden Monat per Überweisung bezahlen.",fr:"Julia veut s'inscrire au club de sport. Remplissez le formulaire pour elle.",
  f:[["Vorname","Julia"],["Geburtsdatum","12.05.1990"],["Telefon","01712345678"],["Sportart",["Schwimmen","Fußball","Schwimmen","Tennis"]],["Zahlungsart",["Überweisung","bar","Überweisung"]]]},
 {title:"Hotel Anmeldung",text:"Ihr Bruder Youssef Alaoui und seine Frau machen Urlaub in München. Sie kommen am 3. August und bleiben vier Nächte im Hotel Isar. Sie möchten ein Doppelzimmer. Youssef bezahlt mit Kreditkarte.",fr:"Votre frère Youssef réserve à l'hôtel avec sa femme. Remplissez le formulaire pour lui.",
  f:[["Name","Alaoui"],["Anreise","3. August"],["Anzahl Nächte","4"],["Zimmer",["Doppelzimmer","Einzelzimmer","Doppelzimmer"]],["Bezahlung",["Kreditkarte","bar","Kreditkarte"]]]}
];
const WRITE=[
 {title:"Absage an Paul",task:"Sie können am Montag nicht zum Deutschkurs kommen. Schreiben Sie Ihrem Freund Paul eine E-Mail.",fr:"Vous ne pouvez pas aller au cours lundi. Écrivez un e-mail à votre ami Paul.",
  pts:[["Sie können am Montag nicht kommen.","Dites que vous ne pouvez pas venir lundi",/montag|kann nicht|komme nicht/i],["Warum?","Expliquez pourquoi",/weil|krank|arbeit|keine zeit|termin/i],["Neuer Termin?","Proposez un autre jour",/dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|morgen|nächste/i]],
  model:"Lieber Paul,\nich kann am Montag leider nicht zum Kurs kommen. Ich bin krank. Können wir am Mittwoch zusammen lernen?\nViele Grüße\nMohamed"},
 {title:"Hotel reservieren",task:"Sie möchten im Hotel Sonne in Berlin ein Zimmer reservieren. Schreiben Sie eine E-Mail an das Hotel.",fr:"Vous voulez réserver une chambre à l'hôtel Sonne. Écrivez à l'hôtel.",
  pts:[["Zimmer reservieren","Réservez une chambre",/zimmer|reservieren|buchen/i],["Wann? (Datum)","Donnez les dates",/\d|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember/i],["Preis?","Demandez le prix",/kostet|preis|wie viel|wieviel/i]],
  model:"Sehr geehrte Damen und Herren,\nich möchte ein Einzelzimmer vom 3. bis 5. Mai reservieren. Wie viel kostet das Zimmer pro Nacht?\nMit freundlichen Grüßen\nMohamed Benchiha"},
 {title:"Einladung von Lena",task:"Ihre Freundin Lena hat am Samstag Geburtstag und lädt Sie ein. Antworten Sie Lena.",fr:"Votre amie Lena vous invite à son anniversaire samedi. Répondez-lui.",
  pts:[["Danke sagen","Remerciez-la",/danke/i],["Sie kommen.","Dites que vous venez",/komme gern|ich komme|gerne/i],["Was mitbringen?","Demandez ce que vous pouvez apporter",/mitbringen|bringen/i]],
  model:"Liebe Lena,\nvielen Dank für die Einladung! Ich komme gern am Samstag. Was kann ich mitbringen? Vielleicht einen Kuchen?\nBis Samstag\nMohamed"},
 {title:"Heizung kaputt",task:"In Ihrer Wohnung ist die Heizung kaputt. Schreiben Sie an Ihre Vermieterin, Frau Schulz.",fr:"Le chauffage de votre appartement est en panne. Écrivez à votre propriétaire, Mme Schulz.",
  pts:[["Problem: Heizung","Décrivez le problème",/heizung|kaputt/i],["Bitte: Hilfe","Demandez de l'aide",/können sie|bitte|reparieren/i],["Wann haben Sie Zeit?","Dites quand vous êtes disponible",/uhr|montag|dienstag|mittwoch|donnerstag|freitag|samstag|morgen|zeit/i]],
  model:"Liebe Frau Schulz,\nin meiner Wohnung ist die Heizung kaputt. Können Sie bitte kommen? Ich habe am Dienstag ab 14 Uhr Zeit.\nViele Grüße\nMohamed Benchiha"},
 {title:"Info zum Sprachkurs",task:"Sie möchten einen Deutschkurs an der Sprachschule Lingua machen. Schreiben Sie eine E-Mail an die Schule.",fr:"Vous voulez suivre un cours à l'école Lingua. Écrivez à l'école.",
  pts:[["Welcher Kurs? (A1)","Dites quel cours vous voulez",/a1|kurs|deutsch/i],["Wann? (Uhrzeit / Tag)","Demandez les horaires",/wann|uhr|zeit|abend|morgen|vormittag|nachmittag/i],["Preis?","Demandez le prix",/kostet|preis|wie viel|wieviel/i]],
  model:"Sehr geehrte Damen und Herren,\nich möchte einen Deutschkurs A1 machen. Wann beginnt der Kurs? Ich kann nur am Abend. Wie viel kostet der Kurs?\nMit freundlichen Grüßen\nMohamed Benchiha"}
];

/* Wortschatz: organised like the official A1 word list (Themen + Wortgruppen).
   Line format: Artikel|Wort|Plural|Französisch|Beispielsatz (own examples, A1 level) */
const VOC=[
{k:"person",n:"Person",fr:"Informations personnelles",w:`der|Name|Namen|le nom|Wie ist Ihr Name?
der|Vorname|Vornamen|le prénom|Mein Vorname ist Karim.
der|Familienname|Familiennamen|le nom de famille|Wie ist Ihr Familienname?
die|Adresse|Adressen|l'adresse|Meine Adresse ist Bahnhofstraße 5.
die|Straße|Straßen|la rue|Ich wohne in der Goethestraße.
die|Hausnummer|Hausnummern|le numéro de maison|Die Hausnummer ist 12.
die|Postleitzahl|Postleitzahlen|le code postal|Die Postleitzahl ist 60329.
das|Land|Länder|le pays|Aus welchem Land kommen Sie?
die|Stadt|Städte|la ville|Berlin ist eine große Stadt.
das|Alter||l'âge|Alter: 27 Jahre.
der|Geburtstag|Geburtstage|l'anniversaire|Wann hast du Geburtstag?
|geboren||né(e)|Ich bin 1999 geboren.
|ledig||célibataire|Ich bin ledig.
|verheiratet||marié(e)|Sind Sie verheiratet?
die|Familie|Familien|la famille|Meine Familie wohnt in Marokko.
die|Eltern|(nur Plural)|les parents|Meine Eltern sind in Rabat.
der|Vater|Väter|le père|Mein Vater ist Lehrer.
die|Mutter|Mütter|la mère|Meine Mutter heißt Fatima.
der|Bruder|Brüder|le frère|Ich habe einen Bruder.
die|Schwester|Schwestern|la sœur|Meine Schwester ist 20.
das|Kind|Kinder|l'enfant|Wir haben zwei Kinder.
der|Mann|Männer|l'homme / le mari|Das ist mein Mann.
die|Frau|Frauen|la femme / madame|Das ist Frau Schulz.
die|Sprache|Sprachen|la langue|Ich spreche drei Sprachen.
die|Telefonnummer|Telefonnummern|le numéro de téléphone|Wie ist Ihre Telefonnummer?
|heißen||s'appeler|Ich heiße Mohamed.
|wohnen||habiter|Ich wohne in Casablanca.
|kommen||venir|Ich komme aus Marokko.
|sprechen||parler|Sprechen Sie Deutsch?
|buchstabieren||épeler|Können Sie das bitte buchstabieren?`},
{k:"wohnen",n:"Wohnen",fr:"Logement",w:`die|Wohnung|Wohnungen|l'appartement|Die Wohnung hat drei Zimmer.
das|Haus|Häuser|la maison|Das Haus ist groß.
das|Zimmer|Zimmer|la pièce / la chambre|Mein Zimmer ist klein.
die|Küche|Küchen|la cuisine|Die Küche ist neu.
das|Bad|Bäder|la salle de bain|Das Bad ist rechts.
das|Bett|Betten|le lit|Das Bett ist neu.
der|Tisch|Tische|la table|Der Tisch ist aus Holz.
der|Stuhl|Stühle|la chaise|Wir brauchen vier Stühle.
der|Schrank|Schränke|l'armoire|Die Kleidung ist im Schrank.
die|Lampe|Lampen|la lampe|Die Lampe ist kaputt.
das|Fenster|Fenster|la fenêtre|Bitte machen Sie das Fenster auf.
die|Tür|Türen|la porte|Die Tür ist zu.
der|Balkon|Balkone|le balcon|Die Wohnung hat einen Balkon.
der|Garten|Gärten|le jardin|Die Kinder spielen im Garten.
die|Miete|Mieten|le loyer|Die Miete ist 650 Euro.
der|Stock|Stockwerke|l'étage|Ich wohne im dritten Stock.
das|Erdgeschoss|Erdgeschosse|le rez-de-chaussée|Die Cafeteria ist im Erdgeschoss.
die|Heizung|Heizungen|le chauffage|Die Heizung ist kaputt.
|mieten||louer|Ich möchte eine Wohnung mieten.
|hell||clair|Das Zimmer ist hell.`},
{k:"umwelt",n:"Umwelt",fr:"Environnement et météo",w:`das|Wetter||le temps (météo)|Wie ist das Wetter heute?
die|Sonne|Sonnen|le soleil|Die Sonne scheint.
der|Regen||la pluie|Morgen kommt Regen.
der|Schnee||la neige|Im Winter gibt es Schnee.
der|Wind|Winde|le vent|Heute ist viel Wind.
|regnen||pleuvoir|Es regnet.
|warm||chaud|Heute ist es warm.
|kalt||froid|Im Januar ist es kalt.
die|Blume|Blumen|la fleur|Ich kaufe Blumen für meine Mutter.
der|Baum|Bäume|l'arbre|Im Park sind viele Bäume.
das|Tier|Tiere|l'animal|Hast du ein Tier?
der|Hund|Hunde|le chien|Der Hund ist draußen.
die|Katze|Katzen|le chat|Die Katze schläft.
das|Meer|Meere|la mer|Im Sommer fahre ich ans Meer.
der|Berg|Berge|la montagne|Wir wandern in den Bergen.
der|Park|Parks|le parc|Wir gehen in den Park.`},
{k:"reisen",n:"Reisen & Verkehr",fr:"Voyage et transports",w:`der|Bahnhof|Bahnhöfe|la gare|Wo ist der Bahnhof?
der|Zug|Züge|le train|Der Zug fährt um 10 Uhr.
das|Gleis|Gleise|le quai / la voie|Der Zug fährt von Gleis 7.
der|Bus|Busse|le bus|Ich fahre mit dem Bus.
die|Haltestelle|Haltestellen|l'arrêt|Die Haltestelle ist hier.
das|Auto|Autos|la voiture|Mein Auto ist kaputt.
das|Fahrrad|Fahrräder|le vélo|Ich fahre mit dem Fahrrad.
der|Flughafen|Flughäfen|l'aéroport|Wie komme ich zum Flughafen?
das|Flugzeug|Flugzeuge|l'avion|Das Flugzeug fliegt nach Rom.
die|Fahrkarte|Fahrkarten|le billet|Eine Fahrkarte nach Köln, bitte.
die|Abfahrt|Abfahrten|le départ|Die Abfahrt ist um 9 Uhr.
die|Ankunft|Ankünfte|l'arrivée|Die Ankunft ist um 12 Uhr.
die|Verspätung|Verspätungen|le retard|Der Zug hat Verspätung.
der|Ausgang|Ausgänge|la sortie|Der Ausgang ist links.
der|Eingang|Eingänge|l'entrée|Der Eingang ist um die Ecke.
das|Hotel|Hotels|l'hôtel|Das Hotel ist im Zentrum.
die|Reise|Reisen|le voyage|Gute Reise!
der|Urlaub|Urlaube|les vacances|Ich mache Urlaub in Spanien.
der|Weg|Wege|le chemin|Ist das der Weg zum Bahnhof?
die|Ecke|Ecken|le coin|Die Post ist an der Ecke.
|abfahren||partir|Der Zug fährt um 8 Uhr ab.
|ankommen||arriver|Wann kommt der Bus an?
|umsteigen||changer (de train)|Sie müssen in Köln umsteigen.
|links||à gauche|Gehen Sie links.
|rechts||à droite|Das Bad ist rechts.
|geradeaus||tout droit|Gehen Sie geradeaus.`},
{k:"essen",n:"Essen & Trinken",fr:"Nourriture et boissons",w:`das|Brot|Brote|le pain|Ich esse Brot mit Käse.
das|Brötchen|Brötchen|le petit pain|Zwei Brötchen, bitte.
der|Käse||le fromage|Der Käse ist aus Frankreich.
die|Wurst|Würste|la saucisse / la charcuterie|Ich esse keine Wurst.
das|Fleisch||la viande|Ich esse kein Fleisch.
der|Fisch|Fische|le poisson|Heute gibt es Fisch.
das|Ei|Eier|l'œuf|Ich brauche sechs Eier.
das|Obst||les fruits|Obst ist gesund.
der|Apfel|Äpfel|la pomme|Ein Kilo Äpfel, bitte.
die|Banane|Bananen|la banane|Die Bananen kosten 1,99 €.
das|Gemüse||les légumes|Ich kaufe Gemüse auf dem Markt.
die|Kartoffel|Kartoffeln|la pomme de terre|Wir essen Kartoffeln.
der|Reis||le riz|Möchtest du Reis?
die|Milch||le lait|Ich trinke Kaffee mit Milch.
das|Wasser||l'eau|Ein Glas Wasser, bitte.
der|Kaffee|Kaffees|le café|Einen Kaffee, bitte.
der|Tee|Tees|le thé|Ich trinke gern Tee.
der|Saft|Säfte|le jus|Ein Orangensaft, bitte.
der|Kuchen|Kuchen|le gâteau|Der Kuchen ist sehr gut.
das|Frühstück|Frühstücke|le petit-déjeuner|Das Frühstück ist um 8 Uhr.
das|Mittagessen|Mittagessen|le déjeuner|Was gibt es zum Mittagessen?
das|Abendessen|Abendessen|le dîner|Das Abendessen ist fertig.
das|Restaurant|Restaurants|le restaurant|Wir gehen ins Restaurant.
der|Hunger||la faim|Ich habe Hunger.
der|Durst||la soif|Hast du Durst?
|essen||manger|Was isst du gern?
|trinken||boire|Was möchten Sie trinken?
|kochen||cuisiner|Ich koche gern.
|schmecken||avoir bon goût|Schmeckt es Ihnen?`},
{k:"einkaufen",n:"Einkaufen",fr:"Achats",w:`das|Geschäft|Geschäfte|le magasin|Das Geschäft ist heute geschlossen.
der|Supermarkt|Supermärkte|le supermarché|Ich gehe in den Supermarkt.
der|Markt|Märkte|le marché|Am Samstag gehe ich auf den Markt.
der|Preis|Preise|le prix|Der Preis ist gut.
das|Angebot|Angebote|l'offre / la promotion|Äpfel sind heute im Angebot.
die|Kasse|Kassen|la caisse|Bitte bezahlen Sie an der Kasse.
das|Geld||l'argent|Ich habe kein Geld.
die|Kleidung||les vêtements|Ich brauche neue Kleidung.
die|Hose|Hosen|le pantalon|Die Hose ist zu groß.
das|Hemd|Hemden|la chemise|Das Hemd ist blau.
die|Jacke|Jacken|la veste|Die Jacke kostet 49 Euro.
der|Schuh|Schuhe|la chaussure|Ich suche Schuhe.
die|Größe|Größen|la taille|Welche Größe haben Sie?
|kaufen||acheter|Ich kaufe Obst.
|kosten||coûter|Was kostet das?
|bezahlen||payer|Kann ich mit Karte bezahlen?
|brauchen||avoir besoin de|Ich brauche Milch.
|billig||bon marché|Das T-Shirt ist billig.
|teuer||cher|Die Wohnung ist teuer.
|geöffnet||ouvert|Der Supermarkt ist bis 21 Uhr geöffnet.
|geschlossen||fermé|Heute geschlossen!`},
{k:"dienst",n:"Dienstleistungen",fr:"Services, santé, démarches",w:`die|Post||la poste|Die Post ist an der Ecke.
der|Brief|Briefe|la lettre|Ich schreibe einen Brief.
die|Briefmarke|Briefmarken|le timbre|Eine Briefmarke, bitte.
das|Paket|Pakete|le colis|Ich schicke ein Paket.
die|Bank|Banken|la banque|Die Bank ist bis 16 Uhr geöffnet.
die|Polizei||la police|Rufen Sie die Polizei!
der|Arzt|Ärzte|le médecin|Ich muss zum Arzt.
die|Ärztin|Ärztinnen|la médecin|Die Ärztin heißt Dr. Lang.
die|Praxis|Praxen|le cabinet (médical)|Die Praxis ist am Mittwoch geschlossen.
der|Termin|Termine|le rendez-vous|Ich brauche einen Termin.
der|Kopf|Köpfe|la tête|Mein Kopf tut weh.
der|Bauch|Bäuche|le ventre|Ich habe Bauchschmerzen.
das|Formular|Formulare|le formulaire|Bitte füllen Sie das Formular aus.
die|Unterschrift|Unterschriften|la signature|Hier ist meine Unterschrift.
das|Telefon|Telefone|le téléphone|Das Telefon klingelt.
|krank||malade|Ich bin krank.
|gesund||en bonne santé|Obst ist gesund.
|anrufen||appeler (téléphone)|Ruf mich bitte an!
|ausfüllen||remplir|Füllen Sie das Formular aus.
|unterschreiben||signer|Bitte unterschreiben Sie hier.`},
{k:"lernen",n:"Ausbildung",fr:"École et apprentissage",w:`die|Schule|Schulen|l'école|Die Kinder gehen in die Schule.
der|Kurs|Kurse|le cours|Der Kurs beginnt um 9 Uhr.
der|Lehrer|Lehrer|le professeur|Der Lehrer ist nett.
die|Lehrerin|Lehrerinnen|la professeure|Die Lehrerin heißt Frau Berg.
die|Prüfung|Prüfungen|l'examen|Die Prüfung ist am Montag.
das|Buch|Bücher|le livre|Ich lese ein Buch.
das|Wort|Wörter|le mot|Was bedeutet das Wort?
die|Frage|Fragen|la question|Ich habe eine Frage.
die|Antwort|Antworten|la réponse|Die Antwort ist richtig.
die|Hausaufgabe|Hausaufgaben|les devoirs|Ich mache die Hausaufgaben.
|lernen||apprendre|Ich lerne Deutsch.
|fragen||demander|Darf ich etwas fragen?
|antworten||répondre|Bitte antworten Sie.
|schreiben||écrire|Schreiben Sie eine E-Mail.
|lesen||lire|Lesen Sie den Text.
|verstehen||comprendre|Ich verstehe das nicht.
|richtig||correct / juste|Das ist richtig.
|falsch||faux|Das ist falsch.`},
{k:"arbeit",n:"Arbeit",fr:"Travail",w:`die|Arbeit|Arbeiten|le travail|Ich fahre mit dem Bus zur Arbeit.
der|Beruf|Berufe|le métier|Was sind Sie von Beruf?
die|Firma|Firmen|l'entreprise|Ich arbeite bei einer Firma in Köln.
das|Büro|Büros|le bureau|Das Büro ist im ersten Stock.
der|Chef|Chefs|le chef|Mein Chef ist nett.
der|Kollege|Kollegen|le collègue|Mein Kollege heißt Jan.
die|Kollegin|Kolleginnen|la collègue|Meine Kollegin ist krank.
der|Student|Studenten|l'étudiant|Ich bin Student.
die|Pause|Pausen|la pause|Wir machen eine Pause.
|arbeiten||travailler|Ich arbeite von 8 bis 16 Uhr.
|frei||libre|Am Sonntag habe ich frei.`},
{k:"freizeit",n:"Freizeit",fr:"Loisirs",w:`die|Freizeit||le temps libre|Was machst du in der Freizeit?
das|Hobby|Hobbys|le hobby|Mein Hobby ist Fußball.
der|Sport||le sport|Ich mache gern Sport.
das|Kino|Kinos|le cinéma|Wir gehen ins Kino.
der|Film|Filme|le film|Der Film beginnt um 20 Uhr.
die|Musik||la musique|Ich höre gern Musik.
das|Konzert|Konzerte|le concert|Das Konzert ist am Samstag.
die|Party|Partys|la fête|Kommst du zur Party?
die|Einladung|Einladungen|l'invitation|Danke für die Einladung!
der|Freund|Freunde|l'ami|Mein Freund heißt Paul.
die|Freundin|Freundinnen|l'amie|Meine Freundin kommt aus Spanien.
das|Wochenende|Wochenenden|le week-end|Was machst du am Wochenende?
|spielen||jouer|Ich spiele Fußball.
|schwimmen||nager|Ich schwimme gern.
|tanzen||danser|Wir tanzen auf der Party.
|einladen||inviter|Ich lade dich ein.
|besuchen||rendre visite|Ich besuche meine Oma.
|gern||volontiers / aimer faire|Ich lese gern.`},
{k:"zahlen",n:"Zahlen",fr:"Nombres",g:1,w:`|eins||un|Ich habe eins.
|zwei||deux|Zwei Brötchen, bitte.
|drei||trois|Ich wohne im dritten Stock.
|zwölf||douze|Hausnummer zwölf.
|dreizehn||treize|Gleis dreizehn.
|sechzehn||seize|Ich bin sechzehn.
|siebzehn||dix-sept|Gleis siebzehn.
|zwanzig||vingt|Zwanzig Minuten.
|einundzwanzig||vingt et un|Einundzwanzig Euro.
|dreißig||trente|Dreißig Minuten Verspätung.
|fünfundvierzig||quarante-cinq|Das kostet fünfundvierzig Euro.
|neunundneunzig||quatre-vingt-dix-neuf|Ein Euro neunundneunzig.
|hundert||cent|Hundert Euro.
|tausend||mille|Tausend Kilometer.
|der erste||le premier|Im ersten Stock.`},
{k:"zeit",n:"Uhrzeit & Tage",fr:"Heure, jours, moments",g:1,w:`die|Uhr|Uhren|l'heure / la montre|Es ist acht Uhr.
die|Stunde|Stunden|l'heure (durée)|Der Kurs dauert zwei Stunden.
die|Minute|Minuten|la minute|In zehn Minuten.
|halb drei||deux heures et demie|Wir treffen uns um halb drei.
|Viertel nach acht||huit heures et quart|Es ist Viertel nach acht.
|Viertel vor neun||neuf heures moins le quart|Es ist Viertel vor neun.
der|Montag|Montage|lundi|Am Montag habe ich Kurs.
der|Dienstag|Dienstage|mardi|Am Dienstag arbeite ich.
der|Mittwoch|Mittwoche|mercredi|Am Mittwoch ist die Praxis zu.
der|Donnerstag|Donnerstage|jeudi|Kommen Sie am Donnerstag.
der|Freitag|Freitage|vendredi|Am Freitag gehe ich ins Kino.
der|Samstag|Samstage|samedi|Am Samstag habe ich Geburtstag.
der|Sonntag|Sonntage|dimanche|Am Sonntag besuche ich meine Oma.
die|Woche|Wochen|la semaine|Der Kurs ist zweimal pro Woche.
der|Morgen|Morgen|le matin|Am Morgen trinke ich Tee.
der|Vormittag|Vormittage|la matinée|Am Vormittag arbeite ich.
der|Mittag|Mittage|midi|Am Mittag esse ich in der Kantine.
der|Nachmittag|Nachmittage|l'après-midi|Am Nachmittag habe ich frei.
der|Abend|Abende|le soir|Am Abend lerne ich Deutsch.
die|Nacht|Nächte|la nuit|Gute Nacht!
|heute||aujourd'hui|Heute ist Montag.
|morgen||demain|Morgen habe ich frei.
|gestern||hier|Gestern war ich krank.`},
{k:"kalender",n:"Monate & Jahreszeiten",fr:"Mois et saisons",g:1,w:`der|Januar||janvier|Im Januar ist es kalt.
der|Februar||février|Im Februar habe ich Urlaub.
der|März||mars|Im März beginnt der Frühling.
der|April||avril|Im April regnet es oft.
der|Mai||mai|Mein Geburtstag ist im Mai.
der|Juni||juin|Im Juni ist es warm.
der|Juli||juillet|Im Juli fahre ich ans Meer.
der|August||août|Im August ist es heiß.
der|September||septembre|Im September beginnt die Schule.
der|Oktober||octobre|Im Oktober ist die Prüfung.
der|November||novembre|Im November ist es grau.
der|Dezember||décembre|Im Dezember gibt es Schnee.
der|Frühling|Frühlinge|le printemps|Im Frühling gibt es Blumen.
der|Sommer|Sommer|l'été|Im Sommer ist es warm.
der|Herbst|Herbste|l'automne|Im Herbst ist viel Wind.
der|Winter|Winter|l'hiver|Im Winter ist es kalt.
das|Jahr|Jahre|l'année / l'an|Ich bin 24 Jahre alt.
der|Monat|Monate|le mois|Die Miete bezahle ich jeden Monat.`},
{k:"farben",n:"Farben, Länder, Maße",fr:"Couleurs, pays, mesures, points cardinaux",g:1,w:`|rot||rouge|Das Auto ist rot.
|blau||bleu|Das Hemd ist blau.
|grün||vert|Der Park ist grün.
|gelb||jaune|Die Banane ist gelb.
|schwarz||noir|Ich trinke Kaffee schwarz.
|weiß||blanc|Der Schnee ist weiß.
|grau||gris|Das Wetter ist grau.
|braun||marron|Der Tisch ist braun.
|Deutschland||l'Allemagne|Ich lerne Deutsch in Deutschland.
|Österreich||l'Autriche|Wien ist in Österreich.
die|Schweiz||la Suisse|Ich fahre in die Schweiz.
|Frankreich||la France|Ich spreche Französisch.
|Marokko||le Maroc|Ich komme aus Marokko.
die|Türkei||la Turquie|Er kommt aus der Türkei.
der|Euro|Euro|l'euro|Das kostet zehn Euro.
der|Cent|Cent|le centime|Neunundneunzig Cent.
das|Kilo|Kilo|le kilo|Ein Kilo Äpfel, bitte.
das|Gramm|Gramm|le gramme|200 Gramm Käse, bitte.
der|Liter|Liter|le litre|Ein Liter Milch.
der|Meter|Meter|le mètre|Die Haltestelle ist 100 Meter weiter.
der|Kilometer|Kilometer|le kilomètre|Das sind fünf Kilometer.
der|Norden||le nord|Hamburg liegt im Norden.
der|Süden||le sud|München liegt im Süden.
der|Osten||l'est|Berlin liegt im Osten.
der|Westen||l'ouest|Köln liegt im Westen.`}
];
const WORDS=VOC.flatMap(t=>t.w.trim().split("\n").map((l,i)=>{const [a,w,p,f,e]=l.split("|");return {id:"v_"+t.k+i,th:t.k,a,w,p,f,e}}));

