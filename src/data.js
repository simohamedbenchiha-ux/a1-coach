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
{id:"l33",s:"L",p:"L1",t:"Büro",mail:"Liebe Kolleginnen und Kollegen,\nam Freitag ist das Büro geschlossen. Am Montag sind wir wieder da.\nIhre Frau Berg",q:"Am Montag ist das Büro geöffnet.",fr:"Lundi, le bureau est ouvert.",rf:true,x:"wieder da = de retour."},
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
{id:"g24",s:"G",p:"G",t:"Höflich",q:"___ Sie das bitte wiederholen?",fr:"Pouvez-vous répéter, s'il vous plaît ?",o:["Können","Kann","Kannst"],x:"Sie (vouvoiement) → können. Phrase très utile à l'oral !"},
/* — Banque 2 · Hören Teil 1 — */
{id:"h101",s:"H",p:"H1",t:"Bahnhof",audio:"Entschuldigung, wann fährt der nächste Zug nach Bremen? – Der Zug um acht Uhr zwanzig ist leider schon weg. Der nächste fährt um neun Uhr zehn.",q:"Wann fährt der nächste Zug nach Bremen?",fr:"Quand part le prochain train pour Brême ?",o:["Um 9:10 Uhr","Um 8:20 Uhr","Um 9:20 Uhr"],pics:["clock:9:10","clock:8:20","clock:9:20"],x:"« schon weg » = déjà parti : 8 h 20 est le piège. Le prochain (nächste) part à neuf heures dix."},
{id:"h102",s:"H",p:"H1",t:"Markt",audio:"Was kostet der Käse? – Hundert Gramm kosten einen Euro neunzig. – Und die Tomaten? – Ein Kilo Tomaten kostet zwei Euro fünfzig.",q:"Wie viel kostet ein Kilo Tomaten?",fr:"Combien coûte un kilo de tomates ?",o:["2,50 €","1,90 €","2,15 €"],pics:["price:2,50","price:1,90","price:2,15"],x:"1,90 € est le prix du fromage (Käse). Tomates : zwei Euro fünfzig = 2,50 €."},
{id:"h103",s:"H",p:"H1",t:"Wetter",audio:"Ist es heute in Hamburg kalt? – Ja, es ist kalt und sehr windig. Aber es regnet nicht. Morgen schneit es vielleicht.",q:"Wie ist das Wetter heute in Hamburg?",fr:"Quel temps fait-il aujourd'hui à Hambourg ?",o:["Es ist windig.","Es regnet.","Es schneit."],pics:["wind","rain","snow"],x:"windig = il y a du vent. « es regnet nicht » = il ne pleut pas ; la neige, c'est pour demain (morgen)."},
{id:"h104",s:"H",p:"H1",t:"Verkehr",audio:"Fährst du mit dem Bus zur Arbeit, Leila? – Nein, der Bus ist mir zu teuer. Und ein Auto habe ich nicht. Ich fahre mit dem Fahrrad.",q:"Wie fährt Leila zur Arbeit?",fr:"Comment Leila va-t-elle au travail ?",o:["Mit dem Fahrrad","Mit dem Bus","Mit dem Auto"],pics:["bike","bus","car"],x:"Le bus est trop cher (zu teuer) et elle n'a pas de voiture : elle prend le vélo (Fahrrad)."},
{id:"h105",s:"H",p:"H1",t:"Post",audio:"Wohin gehst du, Omar? – Zuerst zur Post. Ich muss ein Paket abholen. Danach gehe ich noch zur Bank.",q:"Wohin geht Omar zuerst?",fr:"Où Omar va-t-il d'abord ?",o:["Zur Post","Zur Bank","Zum Supermarkt"],pics:["post","bank","supermarket"],x:"zuerst = d'abord (la poste, pour un colis). danach = ensuite : la banque vient après."},
{id:"h106",s:"H",p:"H1",t:"Kiosk",audio:"Guten Tag, haben Sie auch Fahrkarten für den Bus? – Nein, Fahrkarten verkaufen wir nicht. Die gibt es am Automaten. – Schade. Dann nehme ich nur die Zeitung hier.",q:"Was kauft die Frau?",fr:"Qu'achète la femme ?",o:["Eine Zeitung","Eine Fahrkarte","Ein Buch"],pics:["newspaper","ticket","book"],x:"Le kiosque ne vend pas de tickets (Fahrkarten verkaufen wir nicht). Elle prend seulement le journal (Zeitung)."},
{id:"h107",s:"H",p:"H1",t:"Arzt",audio:"Wann hast du deinen Termin beim Arzt? – Um Viertel vor elf. Aber ich gehe schon um zehn Uhr los, der Bus braucht lange.",q:"Wann hat die Frau den Termin beim Arzt?",fr:"À quelle heure la femme a-t-elle rendez-vous chez le médecin ?",o:["Um 10:45 Uhr","Um 11:15 Uhr","Um 10:00 Uhr"],pics:["clock:10:45","clock:11:15","clock:10:00"],x:"Viertel vor elf = un quart avant onze = 10 h 45. À 10 h, elle part seulement de chez elle."},
{id:"h108",s:"H",p:"H1",t:"Restaurant",audio:"Was möchten Sie essen? – Ist der Fisch heute gut? – Fisch haben wir heute leider nicht mehr. – Ach so. Dann nehme ich das Hähnchen mit Reis.",q:"Was isst der Mann?",fr:"Que mange l'homme ?",o:["Hähnchen mit Reis","Fisch mit Reis","Hähnchen mit Salat"],x:"Il n'y a plus de poisson (nicht mehr). Il prend le poulet (Hähnchen) avec du riz (Reis)."},
{id:"h109",s:"H",p:"H1",t:"Bus",audio:"Entschuldigung, welcher Bus fährt zum Krankenhaus? – Die Linie vierzehn. Die Linie vierzig fährt zum Flughafen.",q:"Welcher Bus fährt zum Krankenhaus?",fr:"Quel bus va à l'hôpital ?",o:["Linie 14","Linie 40","Linie 4"],pics:["num:14","num:40","num:4"],x:"vierzehn = 14 ; vierzig = 40, c'est le bus de l'aéroport (Flughafen)."},
{id:"h110",s:"H",p:"H1",t:"Hotel",audio:"Guten Abend, mein Name ist Fatima Alaoui. Ich habe ein Zimmer reserviert. – Ja, Frau Alaoui. Sie haben Zimmer zweihundertdrei im zweiten Stock. Frühstück gibt es von sieben bis zehn Uhr.",q:"Welche Zimmernummer hat Frau Alaoui?",fr:"Quel numéro de chambre a Mme Alaoui ?",o:["203","230","302"],x:"zweihundertdrei = 200 + 3 = 203. Ne pas confondre avec 230 (zweihundertdreißig)."},
{id:"h111",s:"H",p:"H1",t:"Name",audio:"Wie ist Ihr Familienname, bitte? – Yilmaz. – Schreibt man das mit S am Ende? – Nein, mit Zett. Ypsilon, I, L, M, A, Zett.",q:"Wie schreibt man den Familiennamen?",fr:"Comment s'écrit le nom de famille ?",o:["Yilmaz","Yilmas","Jilmaz"],x:"Nein, mit Zett : la dernière lettre est Z, pas S. Ypsilon = Y (et non J)."},
{id:"h112",s:"H",p:"H1",t:"Kino",audio:"Wann beginnt der Film heute Abend? – Um zwanzig Uhr fünfzehn. Die Kasse ist aber schon ab neunzehn Uhr offen.",q:"Wann beginnt der Film?",fr:"À quelle heure commence le film ?",o:["Um 20:15 Uhr","Um 19:00 Uhr","Um 20:50 Uhr"],x:"zwanzig Uhr fünfzehn = 20 h 15. 19 h, c'est l'ouverture de la caisse. fünfzehn = 15, fünfzig = 50."},
{id:"h113",s:"H",p:"H1",t:"Bank",audio:"Ist die Bank am Samstag offen? – Nein, nur von Montag bis Freitag, von neun bis sechzehn Uhr. Am Donnerstag ist sie sogar bis achtzehn Uhr geöffnet.",q:"An welchem Tag ist die Bank bis 18 Uhr geöffnet?",fr:"Quel jour la banque est-elle ouverte jusqu'à 18 h ?",o:["Am Donnerstag","Am Samstag","Am Freitag"],x:"sogar bis achtzehn Uhr = même jusqu'à 18 h, le jeudi (Donnerstag). Le samedi, c'est fermé."},
{id:"h114",s:"H",p:"H1",t:"Datum",audio:"Wann ist deine Party, Amina? – Mein Geburtstag ist am elften Juni, aber die Party ist am Samstag, am vierzehnten Juni.",q:"Wann ist die Party?",fr:"Quand a lieu la fête ?",o:["Am 14. Juni","Am 11. Juni","Am 14. Juli"],pics:["date:14.6","date:11.6","date:14.7"],x:"Le 11 est l'anniversaire, la fête est le 14 (vierzehnten). Juni = juin, Juli = juillet."},
{id:"h115",s:"H",p:"H1",t:"Wohnung",audio:"Wie viel kostet die Wohnung? – Die Miete ist fünfhundertfünfzig Euro im Monat. Dazu kommen noch achtzig Euro für Wasser und Heizung.",q:"Wie hoch ist die Miete?",fr:"À combien s'élève le loyer ?",o:["550 €","515 €","80 €"],x:"fünfhundertfünfzig = 550. Les 80 € sont pour l'eau et le chauffage (Heizung), en plus du loyer."},
{id:"h116",s:"H",p:"H1",t:"Schule",audio:"Ist der Deutschkurs heute wieder in Raum zwölf? – Nein, heute nicht. Heute sind wir in Raum einundzwanzig, im ersten Stock.",q:"In welchem Raum ist der Kurs heute?",fr:"Dans quelle salle a lieu le cours aujourd'hui ?",o:["In Raum 21","In Raum 12","In Raum 20"],x:"einundzwanzig = 1 et 20 = 21. La salle 12 (zwölf), c'est d'habitude, pas aujourd'hui."},
{id:"h117",s:"H",p:"H1",t:"Kleidung",audio:"Ich suche eine Hose. – Welche Größe brauchen Sie? – Achtunddreißig. – Möchten Sie die Hose in Schwarz oder in Blau? – In Blau, bitte. Eine schwarze Hose habe ich schon.",q:"Welche Farbe soll die Hose haben?",fr:"De quelle couleur doit être le pantalon ?",o:["Blau","Schwarz","Grau"],x:"In Blau, bitte = en bleu. Elle a déjà (schon) un pantalon noir (schwarz)."},
{id:"h118",s:"H",p:"H1",t:"Supermarkt",audio:"Entschuldigung, wo finde ich die Milch? – Die Milch ist hinten links, neben dem Käse. Brot gibt es vorne bei der Kasse.",q:"Wo ist die Milch?",fr:"Où est le lait ?",o:["Hinten links","Vorne bei der Kasse","Hinten rechts"],x:"hinten links = au fond à gauche. Devant la caisse (vorne), c'est le pain (Brot)."},
{id:"h119",s:"H",p:"H1",t:"Flughafen",audio:"Wann fliegen wir nach Casablanca? – Das Flugzeug fliegt um vierzehn Uhr dreißig. Aber wir müssen schon um dreizehn Uhr fünfzig am Ausgang sein.",q:"Wann fliegt das Flugzeug nach Casablanca?",fr:"À quelle heure l'avion pour Casablanca décolle-t-il ?",o:["Um 14:30 Uhr","Um 13:50 Uhr","Um 13:30 Uhr"],x:"L'avion part à 14 h 30. À 13 h 50, il faut seulement être à la porte (Ausgang)."},
{id:"h120",s:"H",p:"H1",t:"Freizeit",audio:"Kommst du heute mit ins Schwimmbad? – Heute kann ich leider nicht, ich muss lernen. Aber am Freitag komme ich gern mit.",q:"Wann geht der Mann ins Schwimmbad?",fr:"Quand l'homme va-t-il à la piscine ?",o:["Am Freitag","Heute","Am Wochenende"],x:"heute ... nicht = pas aujourd'hui (il doit étudier). aber am Freitag = mais vendredi."},
/* — Banque 2 · Hören Teil 2 — */
{id:"h121",s:"H",p:"H2",t:"Bahnhof",audio:"Liebe Fahrgäste, der Regionalexpress nach Leipzig fährt heute leider nicht. Bitte nehmen Sie den Bus vor dem Bahnhof. Der Bus fährt um elf Uhr zwanzig.",q:"Die Fahrgäste nach Leipzig können heute mit dem Bus fahren.",fr:"Les voyageurs pour Leipzig peuvent prendre le bus aujourd'hui.",rf:true,x:"Le train ne circule pas, mais « nehmen Sie den Bus » : un bus part à 11 h 20 devant la gare."},
{id:"h122",s:"H",p:"H2",t:"Flughafen",audio:"Eine Information für die Passagiere nach Wien: Ihr Flug hat eine Stunde Verspätung. Die neue Abflugzeit ist sechzehn Uhr vierzig.",q:"Der Flug nach Wien startet um 15:40 Uhr.",fr:"Le vol pour Vienne décolle à 15 h 40.",rf:false,x:"Abflugzeit = heure de départ : sechzehn Uhr vierzig = 16 h 40, pas 15 h 40."},
{id:"h123",s:"H",p:"H2",t:"Kaufhaus",audio:"Liebe Kunden, heute im Erdgeschoss: alle T-Shirts für nur fünf Euro. Und im dritten Stock finden Sie Kinderkleidung zum halben Preis.",q:"Die T-Shirts sind im dritten Stock.",fr:"Les t-shirts sont au troisième étage.",rf:false,x:"Les t-shirts sont au rez-de-chaussée (Erdgeschoss). Au 3e étage, ce sont les vêtements pour enfants."},
{id:"h124",s:"H",p:"H2",t:"Supermarkt",audio:"Liebe Kunden, ein kleiner Junge sucht seine Mutter. Er heißt Felix und ist fünf Jahre alt. Felix wartet an der Information neben Kasse eins.",q:"Felix wartet an der Information.",fr:"Felix attend à l'accueil.",rf:true,x:"« wartet an der Information » = il attend à l'accueil, à côté de la caisse 1."},
{id:"h125",s:"H",p:"H2",t:"Schwimmbad",audio:"Liebe Badegäste, heute schließt unser Hallenbad schon um achtzehn Uhr. Morgen ist es wieder bis einundzwanzig Uhr geöffnet.",q:"Das Schwimmbad ist heute bis 21 Uhr geöffnet.",fr:"La piscine est ouverte aujourd'hui jusqu'à 21 h.",rf:false,x:"heute schon um 18 Uhr = aujourd'hui déjà à 18 h. 21 h, c'est demain (morgen)."},
{id:"h126",s:"H",p:"H2",t:"Radio",audio:"Das Wetter für Sonntag: Im Norden gibt es viel Wind und Regen. Im Süden scheint die Sonne, bei zweiundzwanzig Grad.",q:"Am Sonntag scheint im Süden die Sonne.",fr:"Dimanche, le soleil brille dans le sud.",rf:true,x:"Süden = sud : soleil et 22 degrés. Le vent et la pluie, c'est dans le nord (Norden)."},
{id:"h127",s:"H",p:"H2",t:"Museum",audio:"Liebe Besucher, das Museum schließt in fünfzehn Minuten. Unser Café im Erdgeschoss ist noch bis neunzehn Uhr geöffnet.",q:"Man kann noch eine Stunde im Museum bleiben.",fr:"On peut encore rester une heure au musée.",rf:false,x:"Le musée ferme dans 15 minutes. C'est le café qui reste ouvert plus longtemps (jusqu'à 19 h)."},
{id:"h128",s:"H",p:"H2",t:"U-Bahn",audio:"Achtung, liebe Fahrgäste: Am Samstag und Sonntag fährt die U-Bahn-Linie zwei nicht zwischen Hauptbahnhof und Stadtpark. Bitte nehmen Sie den Bus Nummer achtundvierzig.",q:"Am Wochenende können die Fahrgäste den Bus Nummer 48 nehmen.",fr:"Le week-end, les voyageurs peuvent prendre le bus numéro 48.",rf:true,x:"Samstag und Sonntag = le week-end ; achtundvierzig = 8 et 40 = 48."},
{id:"h129",s:"H",p:"H2",t:"Kino",audio:"Liebe Gäste, der Film „Die lange Reise“ beginnt heute nicht um zwanzig Uhr in Saal eins, sondern um zwanzig Uhr dreißig in Saal drei.",q:"Der Film beginnt heute in Saal 1.",fr:"Le film commence aujourd'hui dans la salle 1.",rf:false,x:"nicht ... in Saal eins, sondern in Saal drei : aujourd'hui, c'est la salle 3."},
{id:"h130",s:"H",p:"H2",t:"Bäckerei",audio:"Liebe Kunden, unsere Bäckerei ist jetzt auch am Sonntag für Sie da, von sieben bis elf Uhr. Von Montag bis Samstag sind wir ab sechs Uhr geöffnet.",q:"Die Bäckerei ist am Sonntag geöffnet.",fr:"La boulangerie est ouverte le dimanche.",rf:true,x:"« auch am Sonntag für Sie da » = ouverte aussi le dimanche, de 7 h à 11 h."},
{id:"h131",s:"H",p:"H2",t:"Flughafen",audio:"Herr Karim Benali, Passagier nach Marrakesch, bitte kommen Sie sofort zum Ausgang C sieben. Ihr Flugzeug fliegt in zehn Minuten.",q:"Herr Benali soll zum Ausgang C17 kommen.",fr:"M. Benali doit se rendre à la porte C17.",rf:false,x:"sieben = 7, siebzehn = 17 : la porte est C7."},
{id:"h132",s:"H",p:"H2",t:"Schule",audio:"Liebe Schülerinnen und Schüler, morgen ist kein Unterricht, die Lehrer haben eine Besprechung. Am Donnerstag beginnt der Unterricht wie immer um acht Uhr.",q:"Am Donnerstag gibt es Unterricht.",fr:"Jeudi, il y a cours.",rf:true,x:"Pas de cours demain (morgen), mais jeudi, cours comme d'habitude (wie immer) à 8 h."},
{id:"h133",s:"H",p:"H2",t:"Supermarkt",audio:"Heute im Angebot: ein Liter Orangensaft für nur neunundachtzig Cent. Und ein Hähnchen kostet heute nur vier Euro neunzig.",q:"Der Orangensaft kostet heute 98 Cent.",fr:"Le jus d'orange coûte 98 centimes aujourd'hui.",rf:false,x:"neunundachtzig = 9 et 80 = 89 centimes, pas 98 (achtundneunzig)."},
{id:"h134",s:"H",p:"H2",t:"Bahnhof",audio:"Liebe Fahrgäste, unser Fahrkartenschalter ist heute geschlossen. Bitte kaufen Sie Ihre Fahrkarte am Automaten oder im Zug.",q:"Man kann die Fahrkarte heute auch im Zug kaufen.",fr:"Aujourd'hui, on peut aussi acheter son billet dans le train.",rf:true,x:"Le guichet est fermé, mais « am Automaten oder im Zug » : au distributeur ou dans le train."},
{id:"h135",s:"H",p:"H2",t:"Kaufhaus",audio:"Liebe Kunden, unser Kaufhaus schließt heute schon um sechzehn Uhr. Morgen ist Feiertag, da bleibt es geschlossen. Am Donnerstag sind wir ab neun Uhr wieder für Sie da.",q:"Das Kaufhaus ist morgen geöffnet.",fr:"Le grand magasin est ouvert demain.",rf:false,x:"Demain est un jour férié (Feiertag) : le magasin reste fermé (bleibt geschlossen)."},
{id:"h136",s:"H",p:"H2",t:"Zug",audio:"Nächster Halt: Dortmund Hauptbahnhof. Dort fährt der ICE nach Berlin um vierzehn Uhr acht von Gleis elf. Der Zug nach Münster fährt von Gleis sieben.",q:"Der Zug nach Berlin fährt von Gleis 11.",fr:"Le train pour Berlin part du quai 11.",rf:true,x:"ICE nach Berlin : Gleis elf = quai 11. Le quai 7 (sieben) est pour Münster."},
{id:"h137",s:"H",p:"H2",t:"Radio",audio:"Am Samstag ist Stadtfest in der Altstadt. Von zehn bis zweiundzwanzig Uhr gibt es Musik, Essen und Spiele für Kinder. Der Eintritt ist frei.",q:"Man muss für das Stadtfest bezahlen.",fr:"Il faut payer pour la fête de la ville.",rf:false,x:"Der Eintritt ist frei = l'entrée est gratuite : on ne paie pas."},
{id:"h138",s:"H",p:"H2",t:"Radio",audio:"Das Wetter morgen in Berlin: Es bleibt trocken, aber es ist kalt, nur zwei Grad. Am Mittwoch kommt dann der Schnee.",q:"Morgen schneit es in Berlin.",fr:"Demain, il neige à Berlin.",rf:false,x:"Demain : sec (trocken) et froid. La neige arrive seulement mercredi (Mittwoch)."},
{id:"h139",s:"H",p:"H2",t:"Amt",audio:"Die Wartenummer zweihundertvierzehn, bitte zu Zimmer sechs. Die Nummer zweihundertfünfzehn, bitte zu Zimmer neun.",q:"Die Nummer 214 soll zu Zimmer 6 gehen.",fr:"Le numéro 214 doit aller au bureau 6.",rf:true,x:"zweihundertvierzehn = 214 → Zimmer sechs (6). Le 215 va au bureau 9."},
{id:"h140",s:"H",p:"H2",t:"Hotel",audio:"Liebe Gäste, unser Bus nach Heidelberg fährt morgen um acht Uhr dreißig vor dem Hotel ab. Das Frühstück gibt es morgen schon ab sieben Uhr.",q:"Man kann morgen ab 7 Uhr frühstücken.",fr:"Demain, on peut prendre le petit-déjeuner à partir de 7 h.",rf:true,x:"Frühstück ... schon ab sieben Uhr = petit-déjeuner dès 7 h. 8 h 30, c'est le départ du bus."},
/* — Banque 2 · Hören Teil 3 — */
{id:"h141",s:"H",p:"H3",t:"Arzt",audio:"Guten Tag, Frau Haddad, hier ist die Praxis Doktor Roth. Ihr Termin am Dienstag um zehn Uhr geht leider nicht. Können Sie am Mittwoch um elf Uhr kommen? Bitte rufen Sie uns zurück.",q:"Wann ist der neue Termin?",fr:"Quand est le nouveau rendez-vous ?",o:["Am Mittwoch um 11 Uhr","Am Dienstag um 10 Uhr","Am Mittwoch um 10 Uhr"],x:"Mardi 10 h, c'est l'ancien rendez-vous (geht nicht). Le nouveau : Mittwoch (mercredi) à 11 h (elf)."},
{id:"h142",s:"H",p:"H3",t:"Vermieter",audio:"Hallo Herr Ouali, hier spricht Klaus Berger, Ihr Vermieter. Morgen repariert ein Mann die Heizung in Ihrer Wohnung. Er kommt nicht um acht, er kommt um halb neun. Bis dann!",q:"Wann kommt der Mann morgen?",fr:"À quelle heure l'homme vient-il demain ?",o:["Um 8:30 Uhr","Um 8:00 Uhr","Um 9:30 Uhr"],x:"nicht um acht = pas à 8 h. halb neun = la moitié avant neuf = 8 h 30."},
{id:"h143",s:"H",p:"H3",t:"Schule",audio:"Guten Tag, Frau Lehmann, hier ist die Grundschule am Park. Ihre Tochter Mia hat Bauchschmerzen. Einen Arzt braucht sie nicht, aber bitte holen Sie Mia ab. Sie wartet im Büro.",q:"Was soll Frau Lehmann machen?",fr:"Que doit faire Mme Lehmann ?",o:["Ihre Tochter abholen","Einen Arzt anrufen","In die Apotheke gehen"],x:"« holen Sie Mia ab » = venez chercher Mia. Elle n'a pas besoin de médecin (braucht ... nicht)."},
{id:"h144",s:"H",p:"H3",t:"Freunde",audio:"Hallo Youssef, hier ist Daniel. Wir treffen uns nicht am Bahnhof, sondern direkt vor dem Stadion. Das Spiel beginnt um drei, ich bin um Viertel vor drei da. Bis später!",q:"Wo treffen sich Youssef und Daniel?",fr:"Où Youssef et Daniel se retrouvent-ils ?",o:["Vor dem Stadion","Am Bahnhof","Im Stadion"],x:"nicht am Bahnhof, sondern vor dem Stadion : devant le stade (vor), pas dedans (im)."},
{id:"h145",s:"H",p:"H3",t:"Post",audio:"Guten Tag, Frau Kaya, hier ist die Post in der Bergstraße. Wir haben ein Paket für Sie. Sie können es ab Dienstag abholen, bis Freitag. Am Samstag haben wir geschlossen. Bitte bringen Sie Ihren Ausweis mit.",q:"Bis wann kann Frau Kaya das Paket abholen?",fr:"Jusqu'à quand Mme Kaya peut-elle retirer le colis ?",o:["Bis Freitag","Bis Dienstag","Bis Samstag"],x:"ab Dienstag = à partir de mardi ; bis Freitag = jusqu'à vendredi. Le samedi, c'est fermé."},
{id:"h146",s:"H",p:"H3",t:"Bank",audio:"Guten Tag, Herr Schulz, hier ist die Stadtbank. Ihre neue Bankkarte ist da. Sie können die Karte am Montag oder am Dienstag abholen, von neun bis sechzehn Uhr. Am Mittwoch ist die Bank geschlossen.",q:"Wann ist die Bank geschlossen?",fr:"Quand la banque est-elle fermée ?",o:["Am Mittwoch","Am Montag","Am Dienstag"],x:"Lundi et mardi : on peut venir. Mittwoch (mercredi) : geschlossen = fermé."},
{id:"h147",s:"H",p:"H3",t:"Restaurant",audio:"Guten Abend, hier ist das Restaurant Olivia. Sie möchten am Samstag einen Tisch für sechs Personen. Um neunzehn Uhr ist leider alles voll, aber um zwanzig Uhr dreißig haben wir einen Tisch frei.",q:"Um wie viel Uhr ist ein Tisch frei?",fr:"À quelle heure une table est-elle libre ?",o:["Um 20:30 Uhr","Um 19:00 Uhr","Um 21:30 Uhr"],x:"À 19 h, c'est complet (alles voll). Une table est libre à zwanzig Uhr dreißig = 20 h 30."},
{id:"h148",s:"H",p:"H3",t:"Kino",audio:"Hi Amina, hier ist Sophie. Ich habe zwei Karten für das Kino heute Abend. Der Film beginnt um acht. Kannst du schon um halb acht am Eingang sein? Ruf mich an!",q:"Wann soll Amina am Kino sein?",fr:"À quelle heure Amina doit-elle être au cinéma ?",o:["Um 19:30 Uhr","Um 20:00 Uhr","Um 20:30 Uhr"],x:"halb acht = la moitié avant huit = 19 h 30. Le film commence à 20 h (um acht)."},
{id:"h149",s:"H",p:"H3",t:"Büro",audio:"Guten Tag, Herr Wagner, hier ist Leila Mansouri von der Firma Kraft. Bitte rufen Sie mich zurück, ich bin bis sechzehn Uhr im Büro. Meine Nummer ist null, zwei, zwei, eins, vier, sechs, neun, drei, null. Noch einmal: null, zwei, zwei, eins, vier, sechs, neun, drei, null.",q:"Wie ist die Telefonnummer von Frau Mansouri?",fr:"Quel est le numéro de téléphone de Mme Mansouri ?",o:["0221 469 30","0221 496 30","0212 469 30"],x:"Note chaque chiffre : 0-2-2-1, puis 4-6-9, puis 3-0. La répétition (noch einmal) sert à vérifier."},
{id:"h150",s:"H",p:"H3",t:"Party",audio:"Hallo Karim, hier ist Jana. Die Party am Samstag ist nicht bei mir, sondern bei meiner Schwester. Sie wohnt in der Ahornstraße zwanzig. Ahorn schreibt man A, H, O, R, N. Bis Samstag!",q:"Wo ist die Party?",fr:"Où a lieu la fête ?",o:["Bei Janas Schwester","Bei Jana","Bei Karim"],x:"nicht bei mir, sondern bei meiner Schwester : chez la sœur de Jana, Ahornstraße 20."},
{id:"h151",s:"H",p:"H3",t:"Fahrrad",audio:"Guten Tag, Frau Novak, hier ist Fahrrad Schmitt. Ihr Fahrrad ist fertig. Wir haben fünfzig Euro gesagt, aber die Reparatur kostet nur fünfunddreißig Euro. Sie können heute bis achtzehn Uhr kommen.",q:"Wie viel kostet die Reparatur?",fr:"Combien coûte la réparation ?",o:["35 €","50 €","53 €"],x:"50 €, c'était le prix annoncé avant. « kostet nur fünfunddreißig » = coûte seulement 35 €."},
{id:"h152",s:"H",p:"H3",t:"Arbeit",audio:"Hallo Fatima, hier ist Markus aus dem Büro. Kannst du morgen für mich arbeiten? Ich habe erst nächste Woche Urlaub, aber morgen muss ich zum Arzt. Danke!",q:"Warum kann Markus morgen nicht arbeiten?",fr:"Pourquoi Markus ne peut-il pas travailler demain ?",o:["Er muss zum Arzt.","Er hat Urlaub.","Sein Kind ist krank."],x:"Les vacances (Urlaub), c'est la semaine prochaine. Demain, il doit aller chez le médecin (zum Arzt)."},
{id:"h153",s:"H",p:"H3",t:"Kurs",audio:"Hallo, hier ist die Volkshochschule. Eine Information für den Deutschkurs am Montagabend: Ab nächster Woche ist der Kurs nicht mehr in Raum fünfzehn, sondern in Raum fünfzig, im dritten Stock.",q:"Wo ist der Kurs ab nächster Woche?",fr:"Où a lieu le cours à partir de la semaine prochaine ?",o:["In Raum 50","In Raum 15","In Raum 3"],x:"fünfzig = 50 (nouvelle salle) ; fünfzehn = 15 (ancienne). 3, c'est l'étage (Stock)."},
{id:"h154",s:"H",p:"H3",t:"Familie",audio:"Hallo Nadia, hier ist Hamid. Ich bin noch im Supermarkt. Eier haben wir noch zu Hause, aber keine Butter mehr. Ich kaufe Butter und Käse. Bis gleich!",q:"Was kauft Hamid?",fr:"Qu'achète Hamid ?",o:["Butter und Käse","Eier und Käse","Butter und Eier"],x:"Il y a encore des œufs (Eier) à la maison. Il achète du beurre (Butter) et du fromage (Käse)."},
{id:"h155",s:"H",p:"H3",t:"Hotel",audio:"Guten Tag, hier ist das Hotel am See. Sie kommen am dritten Juli zu uns. Ihr Zimmer ist ab vierzehn Uhr frei. Das Parken kostet zehn Euro pro Tag.",q:"Ab wann ist das Zimmer frei?",fr:"À partir de quelle heure la chambre est-elle libre ?",o:["Ab 14 Uhr","Ab 10 Uhr","Ab 3 Uhr"],x:"ab vierzehn Uhr = à partir de 14 h. 10 € est le prix du parking, le 3 est la date (3 juillet)."},
{id:"h156",s:"H",p:"H3",t:"Zahnarzt",audio:"Hallo, hier ist die Zahnarztpraxis Doktor Aydin. Sie haben morgen, am Donnerstag, einen Termin bei uns. Achtung: Der Termin ist nicht am Vormittag, sondern am Nachmittag, um Viertel nach vier.",q:"Wann ist der Termin?",fr:"À quelle heure est le rendez-vous ?",o:["Um 16:15 Uhr","Um 15:45 Uhr","Um 10:15 Uhr"],x:"Viertel nach vier = 4 h 15, l'après-midi (Nachmittag) → 16 h 15. 15 h 45 = Viertel vor vier."},
{id:"h157",s:"H",p:"H3",t:"Nachbarn",audio:"Hallo Frau Weber, hier ist Ihre Nachbarin, Frau Benali. Ich fahre am Wochenende zu meiner Familie nach Köln. Können Sie bitte meine Post aus dem Briefkasten nehmen? Der Schlüssel ist bei Herrn Kurz im ersten Stock.",q:"Wo ist der Schlüssel?",fr:"Où est la clé ?",o:["Bei Herrn Kurz","Bei Frau Weber","Bei Frau Benalis Familie"],x:"Der Schlüssel ist bei Herrn Kurz = la clé est chez M. Kurz, au 1er étage. Köln est le lieu du voyage."},
{id:"h158",s:"H",p:"H3",t:"Taxi",audio:"Guten Tag, hier ist die Taxizentrale. Ihr Taxi kommt morgen nicht um sechs Uhr, es kommt schon um Viertel vor sechs. Bitte warten Sie vor dem Haus.",q:"Wann kommt das Taxi?",fr:"À quelle heure vient le taxi ?",o:["Um 5:45 Uhr","Um 6:00 Uhr","Um 6:15 Uhr"],x:"schon um Viertel vor sechs = déjà à 5 h 45 (un quart avant six), pas à 6 h."},
{id:"h159",s:"H",p:"H3",t:"Möbel",audio:"Guten Tag, Herr Aziz, hier ist das Möbelhaus Holm. Ihr Tisch ist schon da, aber die Stühle kommen erst nächste Woche. Wir bringen alles zusammen am Montag, den zwanzigsten Mai.",q:"Wann bringt das Möbelhaus den Tisch und die Stühle?",fr:"Quand le magasin de meubles livre-t-il la table et les chaises ?",o:["Am 20. Mai","Am 2. Mai","Am 22. Mai"],x:"alles zusammen = tout ensemble, le zwanzigsten = 20. zweiten = 2, zweiundzwanzigsten = 22."},
{id:"h160",s:"H",p:"H3",t:"Freizeit",audio:"Hallo Nadia, hier ist Paul. Morgen regnet es, wir können also nicht wandern. Gehen wir lieber ins Museum? Ich hole dich um zehn Uhr ab.",q:"Was möchte Paul morgen machen?",fr:"Que veut faire Paul demain ?",o:["Ins Museum gehen","Wandern","Ins Kino gehen"],x:"Il pleut (es regnet), donc pas de randonnée (nicht wandern). Il propose le musée (lieber ins Museum)."},
/* — Banque 2 · Lesen Teil 1 — */
{id:"l101",s:"L",p:"L1",t:"Umzug",mail:"Hallo Fatima,\nam Samstag ziehe ich in meine neue Wohnung. Kannst du mir helfen? Wir fangen um 9 Uhr morgens an, mein Bruder kommt mit dem Auto. Am Abend bestellen wir Pizza für alle.\nLiebe Grüße\nKarim",q:"Der Umzug beginnt am Samstagnachmittag.",fr:"Le déménagement commence samedi après-midi.",rf:false,x:"um 9 Uhr morgens = à 9 h du matin, pas l'après-midi (Nachmittag)."},
{id:"l102",s:"L",p:"L1",t:"Hausverwaltung",mail:"Sehr geehrter Herr Yilmaz,\nam Donnerstag zwischen 8 und 12 Uhr repariert ein Handwerker die Fenster in Ihrer Wohnung. Sind Sie nicht zu Hause? Dann geben Sie den Schlüssel bitte Frau Roth im Erdgeschoss.\nMit freundlichen Grüßen\nSabine Wagner, Hausverwaltung",q:"Herr Yilmaz kann seinen Schlüssel bei Frau Roth lassen.",fr:"M. Yilmaz peut laisser sa clé chez Mme Roth.",rf:true,x:"S'il n'est pas là : geben Sie den Schlüssel Frau Roth = donnez la clé à Mme Roth."},
{id:"l103",s:"L",p:"L1",t:"SMS",mail:"Hallo Mama,\nmein Zug hat Verspätung. Ich bin nicht um 18:15 Uhr in Mannheim, sondern erst um 19:45 Uhr. Kannst du mich dann am Hauptbahnhof abholen?\nKuss, Leila",q:"Leila kommt um Viertel nach sechs in Mannheim an.",fr:"Leila arrive à Mannheim à six heures et quart.",rf:false,x:"Viertel nach sechs = 18:15, l'heure prévue. Avec la Verspätung, elle arrive erst um 19:45."},
{id:"l104",s:"L",p:"L1",t:"Kurs",mail:"Sehr geehrter Herr Haddad,\nIhr Deutschkurs A1 beginnt am Montag, 4. März, um 9 Uhr in Raum 12. Bitte bringen Sie Ihren Pass und ein Foto mit. Das Kursbuch bekommen Sie am ersten Tag.\nFreundliche Grüße\nSprachschule Atlas",q:"Herr Haddad muss ein Foto mitbringen.",fr:"M. Haddad doit apporter une photo.",rf:true,x:"Bitte bringen Sie … ein Foto mit = apportez une photo (et le passeport)."},
{id:"l105",s:"L",p:"L1",t:"Zettel",mail:"Julia,\nich bin heute bis 21 Uhr beim Volleyball. Im Kühlschrank ist Reis mit Gemüse für dich. Kannst du bitte um 19 Uhr der Katze Futter geben?\nDanke!\nAmina",q:"Amina ist am Abend nicht zu Hause.",fr:"Amina n'est pas à la maison le soir.",rf:true,x:"bis 21 Uhr beim Volleyball = au volley jusqu'à 21 h : elle est absente le soir."},
{id:"l106",s:"L",p:"L1",t:"Arbeit",mail:"Liebe Frau Keller,\nich habe am Dienstag um 10 Uhr einen Termin beim Arzt. Ich komme erst um 12 Uhr ins Büro. Ich arbeite dann bis 18 Uhr.\nViele Grüße\nYoussef Amrani",q:"Youssef arbeitet am Dienstag nicht.",fr:"Youssef ne travaille pas mardi.",rf:false,x:"Il vient plus tard (erst um 12 Uhr) mais il travaille jusqu'à 18 h."},
{id:"l107",s:"L",p:"L1",t:"Urlaub",mail:"Hallo Kim,\nviele Grüße aus Agadir! Das Hotel ist direkt am Strand und ich schwimme jeden Tag im Meer. Das Essen ist super. Am Sonntag fliege ich zurück nach Düsseldorf.\nBis bald!\nAnna",q:"Anna ist schon wieder zu Hause.",fr:"Anna est déjà rentrée chez elle.",rf:false,x:"Am Sonntag fliege ich zurück = elle rentre dimanche ; elle est encore à Agadir."},
{id:"l108",s:"L",p:"L1",t:"Sport",mail:"Hi Paul,\ndas Fußballtraining heute um 17 Uhr fällt aus. Unser Trainer ist krank. Das nächste Training ist am Donnerstag, gleiche Zeit, gleicher Platz.\nTim",q:"Am Donnerstag gibt es wieder Training.",fr:"Jeudi, il y a de nouveau entraînement.",rf:true,x:"fällt aus = est annulé (aujourd'hui). Das nächste Training ist am Donnerstag."},
{id:"l109",s:"L",p:"L1",t:"Schule",mail:"Liebe Eltern,\nam Freitag fährt die Klasse 3b in den Zoo. Bitte geben Sie Ihrem Kind 5 € für den Eintritt und ein Mittagessen mit. Wir sind um 15 Uhr wieder an der Schule.\nIhre Frau Becker",q:"Die Kinder müssen Geld mitbringen.",fr:"Les enfants doivent apporter de l'argent.",rf:true,x:"5 € für den Eintritt = 5 € pour l'entrée du zoo."},
{id:"l110",s:"L",p:"L1",t:"Nachbarn",mail:"Liebe Frau Klein,\nder Postbote hat heute ein Paket für Sie gebracht. Es ist jetzt bei mir. Ich arbeite bis 16 Uhr, ab 17 Uhr bin ich zu Hause.\nMehmet Demir, 2. Stock",q:"Frau Klein kann ihr Paket am Vormittag holen.",fr:"Mme Klein peut aller chercher son colis le matin.",rf:false,x:"Mehmet travaille jusqu'à 16 h ; il n'est chez lui qu'ab 17 Uhr, pas le matin (Vormittag)."},
{id:"l111",s:"L",p:"L1",t:"Einladung",mail:"Liebe Sophie,\nmeine Eltern kommen nächste Woche aus Casablanca zu Besuch. Am Freitagabend kocht meine Mutter Couscous. Möchtest du auch kommen? Wir essen um 20 Uhr.\nBis bald\nFatima",q:"Fatimas Eltern besuchen sie.",fr:"Les parents de Fatima lui rendent visite.",rf:true,x:"zu Besuch kommen = venir en visite."},
{id:"l112",s:"L",p:"L1",t:"Konzert",mail:"Hallo Mia,\nich habe zwei Karten für das Konzert am Samstag. Mein Freund kann nicht mitkommen. Hast du Lust? Das Konzert beginnt um 20 Uhr im Stadtpark.\nLena",q:"Lena hat schon Karten für das Konzert.",fr:"Lena a déjà des billets pour le concert.",rf:true,x:"ich habe zwei Karten = j'ai deux billets. C'est son ami qui ne peut pas venir."},
{id:"l113",s:"L",p:"L1",t:"Arzt",mail:"Sehr geehrte Frau Ouali,\nleider ist Dr. Kraus am Mittwoch nicht in der Praxis. Ihr Termin um 14:30 Uhr ist jetzt am Freitag um 9 Uhr. Passt das nicht? Dann rufen Sie uns bitte an.\nIhre Praxis Dr. Kraus",q:"Frau Ouali hat ihren Termin jetzt am Mittwoch.",fr:"Mme Ouali a maintenant son rendez-vous mercredi.",rf:false,x:"Mercredi est l'ancien jour. Der Termin ist jetzt am Freitag um 9 Uhr."},
{id:"l114",s:"L",p:"L1",t:"Firma",mail:"Liebe Kolleginnen und Kollegen,\nam Donnerstag essen wir um 19 Uhr zusammen im Restaurant Olivo. Jeder bezahlt sein Essen selbst. Bitte sagen Sie mir bis Montag: Kommen Sie mit?\nViele Grüße\nMarkus Lehmann",q:"Die Firma bezahlt das Essen.",fr:"L'entreprise paie le repas.",rf:false,x:"Jeder bezahlt sein Essen selbst = chacun paie son repas."},
{id:"l115",s:"L",p:"L1",t:"SMS",mail:"Hi Nadia,\nich habe meinen Schlüssel im Büro vergessen und komme nicht in die Wohnung. Bist du um 18 Uhr zu Hause? Dann komme ich zu dir.\nOmar",q:"Omar hat keinen Schlüssel dabei.",fr:"Omar n'a pas de clé sur lui.",rf:true,x:"vergessen = oublié : la clé est restée au bureau."},
{id:"l116",s:"L",p:"L1",t:"Hotel",mail:"Sehr geehrter Herr Novak,\nvielen Dank für Ihre Buchung: ein Doppelzimmer vom 12. bis 14. Juni. Das Frühstück ist im Preis inklusive. Sie können ab 15 Uhr ins Zimmer.\nMit freundlichen Grüßen\nHotel Seeblick, Konstanz",q:"Herr Novak muss für das Frühstück extra bezahlen.",fr:"M. Novak doit payer le petit-déjeuner en plus.",rf:false,x:"im Preis inklusive = compris dans le prix."},
{id:"l117",s:"L",p:"L1",t:"Familie",mail:"Lieber Noah,\nvielen Dank für das schöne Buch! Ich lese jeden Abend darin. Kommst du in den Sommerferien zu Opa und mir nach Bremen? Wir freuen uns!\nDeine Oma",q:"Noahs Großeltern wohnen in Bremen.",fr:"Les grands-parents de Noah habitent à Brême.",rf:true,x:"zu Opa und mir nach Bremen = chez papi et moi, à Brême."},
{id:"l118",s:"L",p:"L1",t:"Einkaufen",mail:"Hallo Jana,\nich gehe gleich in den Supermarkt. Brot und Milch haben wir noch, aber keine Eier. Brauchst du noch etwas? Schreib mir bis 17 Uhr.\nBen",q:"Ben kauft Brot.",fr:"Ben achète du pain.",rf:false,x:"Brot … haben wir noch = on a encore du pain. Il manque des Eier."},
{id:"l119",s:"L",p:"L1",t:"Fitness",mail:"Liebe Mitglieder,\nab 1. Oktober ist der Yogakurs nicht mehr am Dienstag, sondern am Montag um 19 Uhr. Der Raum bleibt gleich: Raum 3.\nIhr Team vom Fitnessstudio Vital",q:"Der Yogakurs ist ab Oktober am Dienstag.",fr:"À partir d'octobre, le cours de yoga a lieu le mardi.",rf:false,x:"nicht mehr am Dienstag, sondern am Montag = plus le mardi, mais le lundi."},
{id:"l120",s:"L",p:"L1",t:"SMS",mail:"Hallo Papa,\nich sitze im Zug nach Leipzig. Hier habe ich kein Netz und kann nicht telefonieren. Ich schreibe dir heute Abend aus dem Hotel.\nLiebe Grüße\nSara",q:"Sara kann jetzt nicht anrufen.",fr:"Sara ne peut pas appeler maintenant.",rf:true,x:"kein Netz = pas de réseau ; kann nicht telefonieren = ne peut pas téléphoner."},
/* — Banque 2 · Lesen Teil 2 — */
{id:"l121",s:"L",p:"L2",t:"Schwimmen",q:"Sie sind 35 Jahre alt und möchten schwimmen lernen.",fr:"Vous avez 35 ans et voulez apprendre à nager.",ab:["Hallenbad Nord\nSchwimmkurse für Kinder von 6 bis 10 Jahren\nDi und Do 15–16 Uhr","Schwimmschule Delfin\nKurse für Erwachsene – auch für Anfänger\nMo und Mi 19–20 Uhr"],c:1,x:"Erwachsene = adultes → b. Le cours a est seulement pour enfants."},
{id:"l122",s:"L",p:"L2",t:"Arbeit",q:"Sie suchen eine Arbeit am Wochenende.",fr:"Vous cherchez un travail le week-end.",ab:["Café Mondschein sucht Kellner/in\nSamstag und Sonntag, 10–18 Uhr\nTel. 0711 48 22 90","Büro Schneider sucht Sekretär/in\nMontag bis Freitag, 8–16 Uhr\nE-Mail: info@buero-schneider.de"],c:0,x:"Samstag und Sonntag = le week-end → a."},
{id:"l123",s:"L",p:"L2",t:"Einkaufen",q:"Sie brauchen einen Kühlschrank. Sie haben nicht viel Geld.",fr:"Vous avez besoin d'un frigo. Vous n'avez pas beaucoup d'argent.",ab:["Elektro Neumann\nNeue Kühlschränke ab 499 €\nLieferung kostenlos","Kleinanzeige\nKühlschrank, 2 Jahre alt, sehr gut\nnur 60 € – Tel. 0176 33 51 08"],c:1,x:"nur 60 € = seulement 60 € : beaucoup moins cher → b."},
{id:"l124",s:"L",p:"L2",t:"Frühstück",q:"Sie möchten am Sonntag mit Ihrer Familie frühstücken gehen.",fr:"Vous voulez aller prendre le petit-déjeuner en famille dimanche.",ab:["Café Lindenhof\nFrühstück Mo–Sa 8–11 Uhr\nSonntag Ruhetag","Restaurant Am Park\nSonntagsfrühstück 9–13 Uhr\nKinder bis 6 Jahre essen gratis"],c:1,x:"Sonntag Ruhetag = fermé le dimanche → a non ; Sonntagsfrühstück → b."},
{id:"l125",s:"L",p:"L2",t:"Wohnen",q:"Sie studieren drei Monate in Freiburg und suchen ein Zimmer.",fr:"Vous étudiez trois mois à Fribourg et cherchez une chambre.",ab:["WG-Zimmer in Freiburg\nfrei vom 1.9. bis 30.11.\n320 € im Monat","Ferienwohnung Freiburg\nfür 2–4 Personen\n75 € pro Nacht"],c:0,x:"Du 1.9 au 30.11 = trois mois, prix par mois → a. b se loue à la nuit."},
{id:"l126",s:"L",p:"L2",t:"Internet",q:"Sie haben eine neue Adresse. Das möchten Sie Ihrer Bank online sagen.",fr:"Vous avez une nouvelle adresse et voulez le signaler en ligne à votre banque.",ab:["Stadtbank – Startseite\n» Neues Konto eröffnen\n» Kredit\n» Geldautomaten finden","Stadtbank – Mein Bereich\n» Kontostand\n» Meine Daten ändern (Adresse, Telefon)"],c:1,x:"Meine Daten ändern (Adresse) = modifier mes données → b."},
{id:"l127",s:"L",p:"L2",t:"Telefon",q:"Sie möchten billig mit Ihrer Familie in Marokko telefonieren.",fr:"Vous voulez téléphoner pour pas cher à votre famille au Maroc.",ab:["Handyshop Mobilfon\nNeue Handys und Reparatur\nMo–Sa 10–19 Uhr","WeltTel Telefonkarte\nMarokko, Türkei, Tunesien\nnur 1 Cent pro Minute"],c:1,x:"Marokko … 1 Cent pro Minute → b. a vend et répare des téléphones."},
{id:"l128",s:"L",p:"L2",t:"Reisen",q:"Sie möchten im Sommer Urlaub am Meer machen.",fr:"Vous voulez passer des vacances à la mer en été.",ab:["Reisebüro Sonnig\nStrandurlaub in Spanien, Juli und August\n7 Tage ab 499 €","Reisebüro Berg & Tal\nSkiurlaub in den Alpen\nDezember bis März"],c:0,x:"Strand = plage, Juli und August = été → a. b : ski en hiver."},
{id:"l129",s:"L",p:"L2",t:"Musik",q:"Ihre Tochter ist 8 Jahre alt und möchte Gitarre lernen.",fr:"Votre fille a 8 ans et veut apprendre la guitare.",ab:["Musikschule Klang\nGitarre für Kinder ab 7 Jahren\nSamstag 10–11 Uhr","Gitarrenkurs im Jugendhaus\nnur für Erwachsene\nDienstag 20–21:30 Uhr"],c:0,x:"Kinder ab 7 Jahren = enfants dès 7 ans → a ; b est pour adultes."},
{id:"l130",s:"L",p:"L2",t:"Arzt",q:"Ihr Kind hat am Samstagabend hohes Fieber.",fr:"Votre enfant a beaucoup de fièvre samedi soir.",ab:["Kinderarztpraxis Dr. Hoffmann\nMo–Fr 8–17 Uhr","Ärztlicher Notdienst\nSamstag, Sonntag und Feiertage\nTag und Nacht: Tel. 116 117"],c:1,x:"Le cabinet a est fermé le samedi. Notdienst = service de garde → b."},
{id:"l131",s:"L",p:"L2",t:"Fest",q:"Sie möchten eine große Torte für ein Fest mit 20 Personen bestellen.",fr:"Vous voulez commander un grand gâteau pour une fête de 20 personnes.",ab:["Konditorei Süß\nTorten auf Bestellung – auch für Hochzeiten und Feste\nTel. 0621 77 30 14","Café Mia\nKaffee und Kuchen\nPlatz für 20 Personen"],c:0,x:"auf Bestellung = sur commande → a. b a 20 places, mais ne prend pas de commandes."},
{id:"l132",s:"L",p:"L2",t:"Auto",q:"Sie brauchen für eine Woche ein Auto.",fr:"Vous avez besoin d'une voiture pour une semaine.",ab:["Autohaus Becker\nNeue und gebrauchte Autos kaufen\nProbefahrt jeden Samstag","AutoMiete Express\nAutos mieten ab 29 € pro Tag\nauch für eine Woche oder länger"],c:1,x:"mieten = louer → b. a vend des voitures (kaufen = acheter)."},
{id:"l133",s:"L",p:"L2",t:"Wohnung",q:"Sie haben einen Hund und suchen eine Wohnung.",fr:"Vous avez un chien et cherchez un appartement.",ab:["2-Zimmer-Wohnung, Ulm-Mitte\n55 m², 590 € warm\nKeine Tiere!","3-Zimmer-Wohnung, Ulm-Süd\n70 m², Garten, 780 € warm\nHunde und Katzen kein Problem"],c:1,x:"Keine Tiere = pas d'animaux → a non. Hunde … kein Problem → b."},
{id:"l134",s:"L",p:"L2",t:"Museum",q:"Sie möchten am Montag ins Museum gehen.",fr:"Vous voulez aller au musée lundi.",ab:["Stadtmuseum\nDi–So 10–18 Uhr\nMontag geschlossen","Technikmuseum\ntäglich 9–17 Uhr\nEintritt 8 €"],c:1,x:"Montag geschlossen = fermé le lundi → a non. täglich = tous les jours → b."},
{id:"l135",s:"L",p:"L2",t:"Lernen",q:"Sie möchten zu Hause am Computer Deutsch lernen.",fr:"Vous voulez apprendre l'allemand chez vous sur l'ordinateur.",ab:["www.deutsch-am-pc.de\nDeutschkurse online\nLernen Sie zu Hause – wann Sie wollen!","Sprachzentrum Mitte\nDeutschkurse in der Goethestraße 5\nMo–Fr 9–12 Uhr"],c:0,x:"online, zu Hause = en ligne, à la maison → a. b a lieu dans une école."},
{id:"l136",s:"L",p:"L2",t:"Bus",q:"Sie möchten mit dem Bus von Frankfurt nach Paris fahren.",fr:"Vous voulez aller de Francfort à Paris en bus.",ab:["Fernbus EuroLine\nFrankfurt – Paris ab 29 €\ntäglich um 8 und 22 Uhr","Stadtbus Frankfurt\nLinie 61: Hauptbahnhof – Flughafen\nalle 15 Minuten"],c:0,x:"Fernbus = bus longue distance pour Paris → a. b reste dans Francfort."},
{id:"l137",s:"L",p:"L2",t:"Essen",q:"Ihr Kurs endet um 21 Uhr. Danach möchten Sie noch etwas essen.",fr:"Votre cours finit à 21 h. Ensuite, vous voulez encore manger quelque chose.",ab:["Imbiss Lecker\nCurrywurst, Pommes, Salate\nMo–Sa 11–20 Uhr","Döner-Haus Istanbul\nDöner, Falafel, Suppe\ntäglich 11–24 Uhr"],c:1,x:"a ferme à 20 h ; b est ouvert bis 24 Uhr → b."},
{id:"l138",s:"L",p:"L2",t:"Arbeit",q:"Sie haben einen Führerschein und suchen eine Arbeit als Fahrer.",fr:"Vous avez le permis et cherchez un travail de chauffeur.",ab:["Taxi Schmidt sucht Fahrer/innen\nauch am Wochenende\nTel. 0451 60 60 12","Hotel Krone sucht Koch/Köchin\nab sofort\nBewerbung an: job@hotel-krone.de"],c:0,x:"Fahrer = chauffeur → a. Koch = cuisinier."},
{id:"l139",s:"L",p:"L2",t:"Kleidung",q:"Ihre Jacke ist schmutzig.",fr:"Votre veste est sale.",ab:["Reinigung Blitz\nJacken, Hosen, Kleider\nwieder sauber in 24 Stunden","Modehaus Lang\nNeue Jacken für den Winter\njetzt 20 % billiger"],c:0,x:"sauber = propre : la Reinigung (pressing) nettoie → a. b vend des vestes neuves."},
{id:"l140",s:"L",p:"L2",t:"Internet",q:"Sie möchten wissen: Wann ist die Stadtbibliothek geöffnet?",fr:"Vous voulez savoir quand la bibliothèque municipale est ouverte.",ab:["www.stadtbibliothek-hagen.de\n» Bücher suchen\n» Öffnungszeiten und Adresse\n» Veranstaltungen","www.hagen.de\n» Wohnen und Bauen\n» Arbeit\n» Freizeit und Sport"],c:0,x:"Öffnungszeiten = horaires d'ouverture → a."},
/* — Banque 2 · Lesen Teil 3 — */
{id:"l141",s:"L",p:"L3",t:"Aufzug",pic:"elevator",sign:"Aufzug defekt!\nBitte benutzen Sie die Treppe.\nAb Freitag fährt der Aufzug wieder.",q:"Sie können heute mit dem Aufzug fahren.",fr:"Vous pouvez prendre l'ascenseur aujourd'hui.",rf:false,x:"defekt = en panne ; benutzen Sie die Treppe = prenez l'escalier."},
{id:"l142",s:"L",p:"L3",t:"Café",pic:"wifi",sign:"Liebe Gäste,\nunser WLAN ist kostenlos!\nPasswort: Kaffee2026",q:"Das Internet kostet hier extra.",fr:"Ici, Internet est payant en plus.",rf:false,x:"kostenlos = gratuit."},
{id:"l143",s:"L",p:"L3",t:"Toilette",pic:"toilet",sign:"Toiletten nur für Gäste\nDen Schlüssel bekommen Sie an der Kasse.",q:"Den Schlüssel für die Toilette bekommen Sie an der Kasse.",fr:"Vous obtenez la clé des toilettes à la caisse.",rf:true,x:"an der Kasse = à la caisse."},
{id:"l144",s:"L",p:"L3",t:"Apotheke",sign:"Wir sind umgezogen!\nApotheke am Markt\njetzt: Bahnhofstraße 12, neben der Post",q:"Die Apotheke ist jetzt am Markt.",fr:"La pharmacie est maintenant sur la place du marché.",rf:false,x:"umgezogen = a déménagé. Le nom reste « am Markt », l'adresse est jetzt Bahnhofstraße 12."},
{id:"l145",s:"L",p:"L3",t:"Hausordnung",sign:"Hausordnung\nRuhezeiten: 13–15 Uhr und 22–7 Uhr\nBitte keine laute Musik!",q:"Um 14 Uhr darf man laut Musik hören.",fr:"À 14 h, on a le droit d'écouter de la musique fort.",rf:false,x:"14 h est dans la Ruhezeit (13–15 Uhr) : il faut être calme."},
{id:"l146",s:"L",p:"L3",t:"Bahn",sign:"Achtung, Bauarbeiten!\nVom 3. bis 9. Mai fahren keine Züge zwischen Kassel und Göttingen.\nBitte nehmen Sie den Bus vor dem Bahnhof.",q:"Vom 3. bis 9. Mai müssen Sie zwischen Kassel und Göttingen den Bus nehmen.",fr:"Du 3 au 9 mai, vous devez prendre le bus entre Kassel et Göttingen.",rf:true,x:"keine Züge = pas de trains ; nehmen Sie den Bus = prenez le bus."},
{id:"l147",s:"L",p:"L3",t:"Parken",pic:"parking",sign:"Parken nur für Mieter\nBesucher parken bitte in der Gartenstraße.",q:"Besucher können hier parken.",fr:"Les visiteurs peuvent se garer ici.",rf:false,x:"nur für Mieter = seulement pour les locataires. Besucher → Gartenstraße."},
{id:"l148",s:"L",p:"L3",t:"Restaurant",sign:"Mittagstisch\nMo–Fr 11:30–14:30 Uhr\nSuppe + Hauptgericht + Getränk: 9,90 €",q:"Für 9,90 € bekommen Sie auch ein Getränk.",fr:"Pour 9,90 €, vous avez aussi une boisson.",rf:true,x:"Suppe + Hauptgericht + Getränk = soupe, plat et boisson pour 9,90 €."},
{id:"l149",s:"L",p:"L3",t:"Rauchen",pic:"no-smoking",sign:"Im Haus bitte nicht rauchen!\nRauchen nur im Hof erlaubt.",q:"Im Hof darf man rauchen.",fr:"Dans la cour, on a le droit de fumer.",rf:true,x:"erlaubt = autorisé ; im Hof = dans la cour. Interdit seulement im Haus."},
{id:"l150",s:"L",p:"L3",t:"Friseur",pic:"closed",sign:"Friseur Salon Aylin\nUrlaub: vom 22. Juli bis 5. August geschlossen\nAb 6. August sind wir wieder für Sie da!",q:"Am 1. August ist der Friseur geöffnet.",fr:"Le 1er août, le coiffeur est ouvert.",rf:false,x:"Le 1er août est entre le 22 juillet et le 5 août : geschlossen = fermé."},
{id:"l151",s:"L",p:"L3",t:"Schwimmbad",sign:"Hallenbad Süd\nMittwoch 6–8 Uhr: nur für Frauen\nSamstag: Familientag – Kinder frei!",q:"Am Samstag bezahlen Kinder nichts.",fr:"Le samedi, les enfants ne paient rien.",rf:true,x:"Kinder frei = entrée gratuite pour les enfants."},
{id:"l152",s:"L",p:"L3",t:"Bibliothek",sign:"Stadtbücherei\nSie können Ihre Bücher auch am Wochenende zurückgeben:\nKasten links neben der Tür",q:"Sie können Bücher auch am Sonntag zurückgeben.",fr:"Vous pouvez aussi rendre des livres le dimanche.",rf:true,x:"am Wochenende = le week-end, donc aussi le dimanche (boîte à gauche de la porte)."},
{id:"l153",s:"L",p:"L3",t:"Kurs",sign:"Deutschkurs B1\nHeute in Raum 214\n(nicht in Raum 112!)",q:"Der Kurs ist heute in Raum 112.",fr:"Aujourd'hui, le cours a lieu en salle 112.",rf:false,x:"nicht in Raum 112 = pas en salle 112. Heute in Raum 214."},
{id:"l154",s:"L",p:"L3",t:"Fahrkarten",sign:"Fahrpreise Stadtbus\nKinder unter 6 Jahren: kostenlos\nKinder von 6 bis 14 Jahren: 1,50 €",q:"Ein Kind mit 8 Jahren braucht eine Fahrkarte.",fr:"Un enfant de 8 ans a besoin d'un billet.",rf:true,x:"8 ans → de 6 à 14 ans : 1,50 €. Gratuit seulement unter 6 Jahren."},
{id:"l155",s:"L",p:"L3",t:"Angebot",sign:"Nur diese Woche!\nOrangen 1 kg: 1,99 €\nAb Montag wieder 2,79 €",q:"Nächste Woche kosten die Orangen 1,99 €.",fr:"La semaine prochaine, les oranges coûtent 1,99 €.",rf:false,x:"Nur diese Woche = seulement cette semaine. Ab Montag wieder 2,79 €."},
{id:"l156",s:"L",p:"L3",t:"Hausbewohner",sign:"Liebe Hausbewohner,\nam Donnerstag von 9 bis 13 Uhr gibt es kein Wasser.\nWir arbeiten im Keller.\nIhre Hausverwaltung",q:"Am Donnerstagnachmittag gibt es wieder Wasser.",fr:"Jeudi après-midi, il y a de nouveau de l'eau.",rf:true,x:"Pas d'eau seulement von 9 bis 13 Uhr ; l'après-midi (Nachmittag), l'eau revient."},
{id:"l157",s:"L",p:"L3",t:"Bahnhof",sign:"Fundbüro\nBahnsteig 1, neben dem Ausgang Nord\nMo–Fr 8–18 Uhr",q:"Am Samstag können Sie im Fundbüro fragen.",fr:"Le samedi, vous pouvez vous renseigner au bureau des objets trouvés.",rf:false,x:"Mo–Fr = du lundi au vendredi seulement. Fundbüro = objets trouvés."},
{id:"l158",s:"L",p:"L3",t:"Arzt",sign:"Praxis Dr. Benali\nBitte nicht klingeln!\nDie Tür ist offen – kommen Sie herein.",q:"Sie können einfach hereinkommen.",fr:"Vous pouvez simplement entrer.",rf:true,x:"Die Tür ist offen – kommen Sie herein = la porte est ouverte, entrez. Ne pas sonner."},
/* — Banque 2 · Grammatik — */
{id:"g101",s:"G",p:"G",t:"Verben",q:"Du ___ sehr gut Deutsch!",fr:"Tu parles très bien allemand !",o:["sprichst","sprechst","spricht"],x:"sprechen : e → i avec du et er : du sprichst, er spricht."},
{id:"g102",s:"G",p:"G",t:"Verben",q:"Wo ___ ihr? – Wir sind im Park.",fr:"Où êtes-vous ? – Nous sommes au parc.",o:["seid","sind","seit"],x:"sein : ihr seid, wir sind. Attention : seit (sans d) veut dire « depuis »."},
{id:"g103",s:"G",p:"G",t:"Verben",q:"Herr Yilmaz ___ jeden Tag mit dem Auto zur Arbeit.",fr:"M. Yilmaz va au travail en voiture tous les jours.",o:["fährt","fahrt","fahren"],x:"fahren : a → ä avec du et er/sie : du fährst, er fährt."},
{id:"g104",s:"G",p:"G",t:"Verben",q:"Du ___ in einer Bank, oder?",fr:"Tu travailles dans une banque, n'est-ce pas ?",o:["arbeitest","arbeitst","arbeitet"],x:"Radical en -t : on ajoute un e pour prononcer : du arbeitest, er arbeitet."},
{id:"g105",s:"G",p:"G",t:"Modalverben",q:"Karim ___ ein Zimmer mit Balkon.",fr:"Karim voudrait une chambre avec balcon.",o:["möchte","möchtet","möchten"],x:"er/sie möchte, sans -t, comme ich möchte. möchtet = ihr."},
{id:"g106",s:"G",p:"G",t:"Modalverben",q:"___ du am Samstag Fußball spielen?",fr:"Tu veux jouer au foot samedi ?",o:["Willst","Will","Wollt"],x:"wollen : ich will, du willst, er will, ihr wollt."},
{id:"g107",s:"G",p:"G",t:"Modalverben",q:"Hier ___ man nicht parken.",fr:"Ici, on n'a pas le droit de se garer.",o:["darf","dürfen","darfst"],x:"man se conjugue comme er : man darf, man kann, man muss."},
{id:"g108",s:"G",p:"G",t:"Modalverben",q:"Ihr ___ hier zehn Minuten warten.",fr:"Vous devez attendre ici dix minutes.",o:["müsst","müssen","muss"],x:"müssen : ihr müsst, wir müssen, ich/er muss."},
{id:"g109",s:"G",p:"G",t:"Wortstellung",q:"Ich kann heute leider nicht ins Kino ___.",fr:"Je ne peux malheureusement pas aller au cinéma aujourd'hui.",o:["gehen","gehe","geht"],x:"Avec un verbe de modalité, le 2e verbe est à l'infinitif, tout à la fin."},
{id:"g110",s:"G",p:"G",t:"Wortstellung",q:"Am Wochenende ___ meine Großeltern.",fr:"Le week-end, je rends visite à mes grands-parents.",o:["besuche ich","ich besuche","besuchen ich"],x:"Le verbe est toujours en 2e position : après Am Wochenende, le sujet passe derrière."},
{id:"g111",s:"G",p:"G",t:"Wortstellung",q:"Ich lerne Deutsch, denn ___ in Berlin arbeiten.",fr:"J'apprends l'allemand, car je voudrais travailler à Berlin.",o:["ich möchte","möchte ich","ich möchten"],x:"Après denn (comme und, aber), ordre normal : sujet puis verbe."},
{id:"g112",s:"G",p:"G",t:"Artikel",q:"___ Milch ist im Kühlschrank.",fr:"Le lait est dans le frigo.",o:["Die","Der","Das"],x:"die Milch est féminin, alors que « le lait » est masculin : apprends l'article avec le nom."},
{id:"g113",s:"G",p:"G",t:"Artikel",q:"Entschuldigung, wo ist ___ Bahnhof?",fr:"Excusez-moi, où est la gare ?",o:["der","die","das"],x:"der Bahnhof est masculin, alors que « la gare » est féminin."},
{id:"g114",s:"G",p:"G",t:"Artikel",q:"___ Mädchen dort heißt Sara.",fr:"La fille là-bas s'appelle Sara.",o:["Das","Die","Der"],x:"Les noms en -chen sont toujours neutres : das Mädchen."},
{id:"g115",s:"G",p:"G",t:"Akkusativ",q:"Wir brauchen noch ___ Stuhl.",fr:"Il nous faut encore une chaise.",o:["einen","ein","eine"],x:"der Stuhl (masculin) → complément d'objet : einen Stuhl."},
{id:"g116",s:"G",p:"G",t:"Akkusativ",q:"Kennst du ___ Mann dort?",fr:"Tu connais l'homme là-bas ?",o:["den","der","dem"],x:"der Mann est l'objet de kennen → accusatif : den Mann."},
{id:"g117",s:"G",p:"G",t:"Akkusativ",q:"Ich nehme ___ Tomatensuppe, bitte.",fr:"Je prends la soupe à la tomate, s'il vous plaît.",o:["die","den","der"],x:"Au féminin, l'accusatif ne change pas : die Suppe. Seul le masculin devient den."},
{id:"g118",s:"G",p:"G",t:"Dativ",q:"Ich fahre mit ___ Straßenbahn zur Arbeit.",fr:"Je vais au travail en tram.",o:["der","die","dem"],x:"mit + datif ; die Straßenbahn (féminin) → mit der."},
{id:"g119",s:"G",p:"G",t:"Dativ",q:"Guten Tag, Frau Wagner! Wie geht es ___?",fr:"Bonjour, Madame Wagner ! Comment allez-vous ?",o:["Ihnen","Sie","Ihr"],x:"Wie geht es + datif : Ihnen (vous), dir (toi)."},
{id:"g120",s:"G",p:"G",t:"Dativ",q:"Nach ___ Kurs gehen wir in ein Café.",fr:"Après le cours, nous allons dans un café.",o:["dem","den","der"],x:"nach + datif ; der Kurs → nach dem Kurs."},
{id:"g121",s:"G",p:"G",t:"Possessiv",q:"Wie ist ___ Name? – Mein Name ist Omar Haddad.",fr:"Quel est votre nom ? – Je m'appelle Omar Haddad.",o:["Ihr","Ihre","Ihren"],x:"der Name (masculin, sujet) → Ihr Name (vous), dein Name (toi)."},
{id:"g122",s:"G",p:"G",t:"Possessiv",q:"Amina und ___ Mann wohnen in Bremen.",fr:"Amina et son mari habitent à Brême.",o:["ihr","sein","ihre"],x:"Le possessif dépend du possesseur : à elle → ihr, à lui → sein."},
{id:"g123",s:"G",p:"G",t:"Possessiv",q:"Ich suche ___ Schlüssel.",fr:"Je cherche ma clé.",o:["meinen","mein","meine"],x:"der Schlüssel (masculin) est l'objet de suchen → meinen."},
{id:"g124",s:"G",p:"G",t:"Trennbare Verben",q:"Ich ___ jeden Tag um 6 Uhr auf.",fr:"Je me lève tous les jours à 6 h.",o:["stehe","aufstehe","steht"],x:"aufstehen est séparable : le verbe en 2e position, auf à la fin."},
{id:"g125",s:"G",p:"G",t:"Trennbare Verben",q:"Leila ___ heute Abend ihre Mutter an.",fr:"Leila appelle sa mère ce soir.",o:["ruft","anruft","rufen"],x:"anrufen est séparable : Leila ruft … an."},
{id:"g126",s:"G",p:"G",t:"Trennbare Verben",q:"Ich möchte am Samstag im Supermarkt ___.",fr:"Je voudrais faire les courses au supermarché samedi.",o:["einkaufen","kaufe ein","einkaufe"],x:"Avec möchte, l'infinitif va à la fin et reste collé : einkaufen."},
{id:"g127",s:"G",p:"G",t:"W-Fragen",q:"___ kommt der Bus? – Um 8:10 Uhr.",fr:"Quand le bus arrive-t-il ? – À 8 h 10.",o:["Wann","Wo","Wie"],x:"Wann = quand (réponse : une heure, un jour)."},
{id:"g128",s:"G",p:"G",t:"W-Fragen",q:"___ kommen Sie? – Aus Tunesien.",fr:"D'où venez-vous ? – De Tunisie.",o:["Woher","Wohin","Wo"],x:"Woher = d'où (réponse avec aus), Wohin = vers où, Wo = où (sans mouvement)."},
{id:"g129",s:"G",p:"G",t:"W-Fragen",q:"___ fährst du am Wochenende? – Nach Leipzig.",fr:"Où vas-tu ce week-end ? – À Leipzig.",o:["Wohin","Woher","Wer"],x:"Wohin = vers où (réponse avec nach ou zu)."},
{id:"g130",s:"G",p:"G",t:"Negation",q:"Ich habe ___ Auto, ich fahre Fahrrad.",fr:"Je n'ai pas de voiture, je fais du vélo.",o:["kein","nicht","keine"],x:"Pour un nom avec ein ou sans article → kein ; das Auto → kein Auto."},
{id:"g131",s:"G",p:"G",t:"Negation",q:"Das Wetter ist heute ___ schön.",fr:"Il ne fait pas beau aujourd'hui.",o:["nicht","kein","keine"],x:"nicht nie un adjectif ou un verbe ; kein nie un nom."},
{id:"g132",s:"G",p:"G",t:"Negation",q:"Tut mir leid, wir haben heute ___ Zeit.",fr:"Désolé, nous n'avons pas le temps aujourd'hui.",o:["keine","kein","nicht"],x:"die Zeit (féminin) → keine Zeit."},
{id:"g133",s:"G",p:"G",t:"Plural",q:"Ich kaufe drei ___.",fr:"J'achète trois pommes.",o:["Äpfel","Apfel","Apfels"],x:"der Apfel → die Äpfel : le pluriel prend souvent un Umlaut."},
{id:"g134",s:"G",p:"G",t:"Plural",q:"das Buch → die ___",fr:"le livre → les livres",o:["Bücher","Buchs","Buchen"],x:"Beaucoup de noms neutres font -er + Umlaut : das Buch → die Bücher."},
{id:"g135",s:"G",p:"G",t:"Imperativ",q:"___ Sie bitte langsamer!",fr:"Parlez plus lentement, s'il vous plaît !",o:["Sprechen","Spricht","Sprichst"],x:"Impératif poli : infinitif + Sie, verbe en 1re position."},
{id:"g136",s:"G",p:"G",t:"Imperativ",q:"___ Sie bitte das Fenster zu!",fr:"Fermez la fenêtre, s'il vous plaît !",o:["Machen","Zumachen","Macht"],x:"zumachen est séparable : Machen Sie … zu ! Le préfixe va à la fin."},
{id:"g137",s:"G",p:"G",t:"Präpositionen",q:"Der Deutschkurs beginnt ___ 18 Uhr.",fr:"Le cours d'allemand commence à 18 h.",o:["um","am","im"],x:"um + heure, am + jour, im + mois ou saison."},
{id:"g138",s:"G",p:"G",t:"Präpositionen",q:"Youssef hat ___ Mai Geburtstag.",fr:"Youssef a son anniversaire en mai.",o:["im","am","um"],x:"im + mois ou saison : im Mai, im Sommer."},
{id:"g139",s:"G",p:"G",t:"Präpositionen",q:"___ Sonntag schlafe ich lange.",fr:"Le dimanche, je dors longtemps.",o:["Am","Im","Um"],x:"am + jour ou moment de la journée : am Sonntag, am Abend."},
{id:"g140",s:"G",p:"G",t:"Perfekt",q:"Ich habe gestern Pizza ___.",fr:"Hier, j'ai mangé une pizza.",o:["gegessen","geesst","essen"],x:"Perfekt = haben/sein + participe à la fin ; essen → gegessen."},
{id:"g141",s:"G",p:"G",t:"Perfekt",q:"Wir ___ am Samstag nach Köln gefahren.",fr:"Samedi, nous sommes allés à Cologne.",o:["sind","haben","hat"],x:"Les verbes de déplacement (fahren, gehen, kommen) font le Perfekt avec sein."}
];
const SPEAK={
 1:{title:"Teil 1 · Sich vorstellen",max:3,items:[
  {p:"Stellen Sie sich vor.",hint:"Name? · Alter? · Land? · Wohnort? · Sprachen? · Beruf? · Hobby?",fr:"Présentez-vous avec les 7 mots-clés.",m:"Ich heiße Mohamed. Ich bin 24 Jahre alt. Ich komme aus Marokko und wohne in Casablanca. Ich spreche Arabisch, Französisch und ein bisschen Deutsch. Ich bin Student. Mein Hobby ist Fußball."},
  {p:"Buchstabieren Sie Ihren Namen. Sagen Sie Ihre Telefonnummer.",fr:"Épelez votre nom et donnez votre numéro de téléphone.",m:"Mein Name ist Benchiha: B – E – N – C – H – I – H – A. Meine Telefonnummer ist null – sechs – eins – zwei – drei – vier – fünf."},
  {p:"Sagen Sie Ihre Adresse.",hint:"Straße? · Hausnummer? · Postleitzahl? · Stadt?",fr:"Donnez votre adresse complète (rue, numéro, code postal, ville).",m:"Ich wohne in der Rosenstraße 18. Die Postleitzahl ist 44137. Das ist in Dortmund."},
  {p:"Was sind Ihre Hobbys?",hint:"Sport? · Musik? · Lesen? · Wann? · Mit wem?",fr:"Parlez de vos loisirs : quoi, quand, avec qui.",m:"Meine Hobbys sind Kochen und Schwimmen. Am Samstag gehe ich mit meiner Schwester ins Schwimmbad. Am Abend koche ich gern marokkanisch."},
  {p:"Erzählen Sie etwas über Ihre Familie.",hint:"Verheiratet? · Kinder? · Eltern? · Geschwister? · Wo?",fr:"Parlez de votre famille : situation, enfants, parents, frères et sœurs.",m:"Ich bin verheiratet und habe zwei Kinder, einen Sohn und eine Tochter. Meine Eltern wohnen in Agadir. Ich habe auch drei Brüder."},
  {p:"Wann haben Sie Geburtstag? Welche Sprachen sprechen Sie?",hint:"Datum? · Alter? · Muttersprache? · Andere Sprachen?",fr:"Donnez votre date d'anniversaire et les langues que vous parlez.",m:"Ich habe am 7. März Geburtstag. Ich bin 31 Jahre alt. Meine Muttersprache ist Arabisch. Ich spreche auch Französisch und lerne jetzt Deutsch."}]},
 2:{title:"Teil 2 · Um Informationen bitten und Informationen geben",max:6,items:[
  {p:"Thema: Essen und Trinken\nWort: Frühstück",fr:"Posez une question avec ce mot, puis répondez à une question.",m:"Frage: Was isst du zum Frühstück?\nAntwort: Ich esse Brot mit Käse und trinke Tee."},
  {p:"Thema: Freizeit\nWort: Wochenende",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Was machst du am Wochenende?\nAntwort: Am Wochenende spiele ich Fußball."},
  {p:"Thema: Wohnen\nWort: Zimmer",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wie viele Zimmer hat deine Wohnung?\nAntwort: Meine Wohnung hat drei Zimmer."},
  {p:"Thema: Einkaufen\nWort: Obst",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Welches Obst kaufst du gern?\nAntwort: Ich kaufe gern Äpfel und Bananen."},
  {p:"Thema: Familie\nWort: Geschwister",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Hast du Geschwister?\nAntwort: Ja, ich habe einen Bruder und eine Schwester."},
  {p:"Thema: Arbeit\nWort: Beruf",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Was bist du von Beruf?\nAntwort: Ich bin Mechaniker."},
  {p:"Thema: Reisen\nWort: Urlaub",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wohin fährst du im Urlaub?\nAntwort: Im Urlaub fahre ich nach Spanien."},
  {p:"Thema: Essen und Trinken\nWort: Lieblingsessen",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Was ist dein Lieblingsessen?\nAntwort: Mein Lieblingsessen ist Couscous mit Gemüse."},
  {p:"Thema: Essen und Trinken\nWort: Restaurant",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Gehst du oft ins Restaurant?\nAntwort: Nein, nur einmal im Monat. Ich koche lieber zu Hause."},
  {p:"Thema: Freizeit\nWort: Sport",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Welchen Sport machst du gern?\nAntwort: Ich spiele gern Tennis, am Dienstag und am Freitag."},
  {p:"Thema: Freizeit\nWort: Kino",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wie oft gehst du ins Kino?\nAntwort: Ich gehe zweimal im Monat ins Kino."},
  {p:"Thema: Wohnen\nWort: Küche",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Ist deine Küche groß?\nAntwort: Nein, sie ist klein, aber sehr hell."},
  {p:"Thema: Wohnen\nWort: Nachbarn",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Sind deine Nachbarn nett?\nAntwort: Ja, sehr. Meine Nachbarin hilft mir oft."},
  {p:"Thema: Einkaufen\nWort: Supermarkt",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wann gehst du in den Supermarkt?\nAntwort: Ich gehe meistens am Samstagvormittag einkaufen."},
  {p:"Thema: Einkaufen\nWort: Kleidung",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wo kaufst du deine Kleidung?\nAntwort: Ich kaufe meine Kleidung oft im Internet."},
  {p:"Thema: Familie\nWort: Kinder",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Haben Sie Kinder?\nAntwort: Ja, ich habe eine Tochter. Sie ist fünf Jahre alt."},
  {p:"Thema: Familie\nWort: Geburtstag",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wann hat deine Mutter Geburtstag?\nAntwort: Sie hat am 12. Juni Geburtstag."},
  {p:"Thema: Arbeit\nWort: Arbeitszeit",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wie ist deine Arbeitszeit?\nAntwort: Ich arbeite von acht bis fünf Uhr, Montag bis Freitag."},
  {p:"Thema: Arbeit\nWort: Kollegen",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wie viele Kollegen hast du?\nAntwort: Ich habe zwölf Kollegen. Sie sind sehr freundlich."},
  {p:"Thema: Reisen\nWort: Zug",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Fährst du gern mit dem Zug?\nAntwort: Ja, im Zug kann ich lesen und schlafen."},
  {p:"Thema: Reisen\nWort: Hotel",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wie viel kostet das Hotel pro Nacht?\nAntwort: Ein Doppelzimmer kostet 85 Euro mit Frühstück."},
  {p:"Thema: Wetter\nWort: Regen",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Was machst du bei Regen?\nAntwort: Bei Regen bleibe ich zu Hause und sehe einen Film."},
  {p:"Thema: Gesundheit\nWort: Arzt",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wann gehst du zum Arzt?\nAntwort: Ich gehe morgen um zehn Uhr zum Arzt. Ich habe Kopfschmerzen."},
  {p:"Thema: Lernen\nWort: Hausaufgaben",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wann machst du deine Hausaufgaben?\nAntwort: Ich mache sie am Abend nach dem Essen."},
  {p:"Thema: Tagesablauf\nWort: Aufstehen",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Wann stehst du am Morgen auf?\nAntwort: Ich stehe um halb sieben auf."},
  {p:"Thema: Stadt und Verkehr\nWort: Bus",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Welcher Bus fährt zum Bahnhof?\nAntwort: Der Bus Nummer 14 fährt zum Bahnhof."},
  {p:"Thema: Kommunikation\nWort: Handy",fr:"Posez une question avec ce mot, puis répondez.",m:"Frage: Hast du ein neues Handy?\nAntwort: Ja, mein altes Handy ist kaputt."}]},
 3:{title:"Teil 3 · Bitten formulieren und darauf reagieren",max:6,items:[
  {p:"Bildkarte: 🪟 Fenster",fr:"Formulez une demande polie avec cette image, puis réagissez.",m:"Können Sie bitte das Fenster öffnen?\n– Ja, gern."},
  {p:"Bildkarte: 🖊️ Kugelschreiber",fr:"Formulez une demande polie avec cette image.",m:"Kann ich bitte einen Kuli haben?\n– Ja, hier bitte."},
  {p:"Bildkarte: 💧 Wasser",fr:"Formulez une demande polie avec cette image.",m:"Ich möchte bitte ein Glas Wasser.\n– Gern, bitte schön."},
  {p:"Bildkarte: 🐢 langsam sprechen",fr:"Demandez de parler plus lentement.",m:"Können Sie bitte langsam sprechen?\n– Ja, natürlich."},
  {p:"Bildkarte: 🕐 Uhr",fr:"Demandez l'heure.",m:"Wie spät ist es, bitte?\n– Es ist zehn Uhr."},
  {p:"Bildkarte: 🧂 Salz",fr:"Demandez le sel.",m:"Können Sie mir bitte das Salz geben?\n– Ja, bitte."},
  {p:"Bildkarte: 🚪 Tür",pic:"door",fr:"Demandez poliment de fermer la porte, puis réagissez.",m:"Können Sie bitte die Tür zumachen? Es ist kalt.\n– Ja, sofort."},
  {p:"Bildkarte: ☕ Kaffee",pic:"coffee",fr:"Commandez ou demandez un café, puis réagissez.",m:"Ich hätte gern einen Kaffee mit Milch, bitte.\n– Gern, kommt sofort."},
  {p:"Bildkarte: 📱 Handy",pic:"phone",fr:"Demandez si vous pouvez utiliser le téléphone de quelqu'un.",m:"Mein Akku ist leer. Kann ich bitte kurz Ihr Handy benutzen?\n– Ja, natürlich, hier bitte."},
  {p:"Bildkarte: 💡 Lampe",pic:"lamp",fr:"Demandez d'allumer la lampe, puis réagissez.",m:"Es ist so dunkel. Kannst du bitte die Lampe anmachen?\n– Ja, klar."},
  {p:"Bildkarte: 📖 Buch",pic:"book",fr:"Demandez à emprunter un livre, puis réagissez.",m:"Kannst du mir bitte dein Buch bis morgen leihen?\n– Ja, gern. Hier ist es."},
  {p:"Bildkarte: 🔑 Schlüssel",pic:"key",fr:"Demandez la clé, puis réagissez.",m:"Können Sie mir bitte den Schlüssel für Zimmer 12 geben?\n– Ja, hier bitte."},
  {p:"Bildkarte: ☂️ Regenschirm",pic:"umbrella",fr:"Demandez à emprunter un parapluie.",m:"Es regnet. Kannst du mir bitte deinen Regenschirm leihen?\n– Ja, aber bring ihn morgen zurück."},
  {p:"Bildkarte: 🍞 Brot",pic:"bread",fr:"Demandez du pain (à la boulangerie ou à table).",m:"Ich möchte bitte ein Brot.\n– Gern. Das macht 3,20 Euro."},
  {p:"Bildkarte: 🎫 Fahrkarte",pic:"ticket",fr:"Demandez un billet, puis réagissez.",m:"Eine Fahrkarte nach Bremen, bitte.\n– Hin und zurück? Das kostet 38 Euro."},
  {p:"Bildkarte: 🚻 Toilette",pic:"toilet",fr:"Demandez où sont les toilettes.",m:"Entschuldigung, wo ist bitte die Toilette?\n– Dort hinten, links."},
  {p:"Bildkarte: 🪑 Stuhl",pic:"chair",fr:"Demandez si vous pouvez prendre la chaise.",m:"Ist der Stuhl hier frei? Darf ich ihn nehmen?\n– Ja, bitte."},
  {p:"Bildkarte: 💳 Karte",pic:"card",fr:"Demandez si vous pouvez payer par carte.",m:"Kann ich bitte mit Karte bezahlen?\n– Ja, das geht."},
  {p:"Bildkarte: 📷 Foto",pic:"camera",fr:"Demandez à quelqu'un de prendre une photo de vous.",m:"Können Sie bitte ein Foto von uns machen?\n– Ja, gern. Bitte lächeln!"},
  {p:"Bildkarte: 🚕 Taxi",pic:"taxi",fr:"Demandez d'appeler un taxi, puis réagissez.",m:"Können Sie mir bitte ein Taxi bestellen?\n– Ja, es kommt in zehn Minuten."},
  {p:"Bildkarte: 🍰 Kuchen",pic:"cake",fr:"Demandez un morceau de gâteau, puis réagissez.",m:"Kann ich bitte noch ein Stück Kuchen haben?\n– Ja, gern. Er ist lecker, oder?"},
  {p:"Bildkarte: 🗞️ Zeitung",pic:"newspaper",fr:"Demandez si vous pouvez lire le journal.",m:"Brauchen Sie die Zeitung noch? Kann ich sie lesen?\n– Nein, nehmen Sie sie."},
  {p:"Bildkarte: 📶 WLAN",pic:"wifi",fr:"Demandez le mot de passe du wifi.",m:"Wie ist bitte das Passwort für das WLAN?\n– Es steht hier auf der Karte."},
  {p:"Bildkarte: 🧥 Jacke",pic:"jacket",fr:"Demandez si vous pouvez essayer la veste.",m:"Kann ich die Jacke bitte anprobieren?\n– Natürlich. Die Kabine ist dort."},
  {p:"Bildkarte: 💊 Tabletten",pic:"medicine",fr:"Demandez des comprimés à la pharmacie.",m:"Ich brauche bitte Tabletten gegen Kopfschmerzen.\n– Ja, hier bitte. Nehmen Sie drei am Tag."},
  {p:"Bildkarte: 🎵 Musik",pic:"music",fr:"Demandez de baisser la musique, puis réagissez.",m:"Kannst du bitte die Musik leiser machen? Ich lerne.\n– Oh, Entschuldigung!"}]}
};
const FORMS=[
 {title:"Anmeldung Deutschkurs",text:"Ihr Freund Karim Haddad möchte einen Deutschkurs machen. Er ist 27 Jahre alt und kommt aus Marokko. Er wohnt jetzt in der Bahnhofstraße 5, 60329 Frankfurt. Karim arbeitet am Tag. Er kann nur am Abend lernen.",fr:"Votre ami Karim veut s'inscrire à un cours d'allemand. Remplissez le formulaire pour lui.",
  f:[["Familienname","Haddad"],["Alter","27"],["Herkunftsland","Marokko"],["Postleitzahl","60329"],["Kurszeit",["Abend","Vormittag","Nachmittag","Abend"]]]},
 {title:"Anmeldung Sportverein",text:"Julia Becker möchte im Sportverein „Fit und Froh“ schwimmen. Sie ist am 12.05.1990 geboren. Ihre Telefonnummer ist 0171 2345678. Sie möchte jeden Monat per Überweisung bezahlen.",fr:"Julia veut s'inscrire au club de sport. Remplissez le formulaire pour elle.",
  f:[["Vorname","Julia"],["Geburtsdatum","12.05.1990"],["Telefon","01712345678"],["Sportart",["Schwimmen","Fußball","Schwimmen","Tennis"]],["Zahlungsart",["Überweisung","bar","Überweisung"]]]},
 {title:"Hotel Anmeldung",text:"Ihr Bruder Youssef Alaoui und seine Frau machen Urlaub in München. Sie kommen am 3. August und bleiben vier Nächte im Hotel Isar. Sie möchten ein Doppelzimmer. Youssef bezahlt mit Kreditkarte.",fr:"Votre frère Youssef réserve à l'hôtel avec sa femme. Remplissez le formulaire pour lui.",
  f:[["Name","Alaoui"],["Anreise","3. August"],["Anzahl Nächte","4"],["Zimmer",["Doppelzimmer","Einzelzimmer","Doppelzimmer"]],["Bezahlung",["Kreditkarte","bar","Kreditkarte"]]]},
 {title:"Anmeldung Fitnessstudio",text:"Ihre Freundin Amina El Idrissi möchte im Fitnessstudio „Kraftwerk“ in Köln trainieren. Sie ist am 21.09.1998 geboren und wohnt in der Lindenstraße 14, 50674 Köln. Sie arbeitet von Montag bis Freitag. Sie kann nur am Wochenende trainieren. Sie möchte einen Vertrag für zwölf Monate.",fr:"Votre amie Amina veut s'inscrire dans une salle de sport. Remplissez le formulaire pour elle.",f:[["Familienname","El Idrissi"],["Geburtsdatum","21.09.1998"],["Postleitzahl","50674"],["Trainingszeit",["Wochenende","Montag bis Freitag","Wochenende","jeden Tag"]],["Vertrag",["12 Monate","1 Monat","6 Monate","12 Monate"]]]},
 {title:"Bibliotheksausweis",text:"Omar Benali studiert in Leipzig. Er möchte einen Ausweis für die Stadtbibliothek. Er ist am 04.02.2003 geboren. Seine E-Mail-Adresse ist omar.benali@web.de. Er möchte nur Bücher ausleihen, keine DVDs. Studenten bezahlen 10 Euro im Jahr.",fr:"Omar veut une carte de bibliothèque. Remplissez le formulaire pour lui.",f:[["Vorname","Omar"],["Geburtsdatum","04.02.2003"],["E-Mail","omar.benali@web.de"],["Status",["Student","Schüler","Student","Angestellter"]],["Ausleihe",["Bücher","Bücher","DVDs","Zeitschriften"]]]},
 {title:"Arztpraxis · Patientenbogen",text:"Leila Mansouri ist neu in der Praxis Dr. Krüger in Hamburg. Sie ist am 15.11.1985 geboren. Ihre Telefonnummer ist 040 7382915. Sie hat seit drei Tagen Halsschmerzen und Fieber. Sie hat keine Allergien.",fr:"Leila est nouvelle chez le médecin. Remplissez la fiche patient pour elle.",f:[["Name","Mansouri"],["Geburtsdatum","15.11.1985"],["Telefon","0407382915"],["Beschwerden",["Halsschmerzen","Bauchschmerzen","Halsschmerzen","Rückenschmerzen"]],["Allergien",["nein","ja","nein"]]]},
 {title:"Mietwohnung · Interesse",text:"Tim Hoffmann sucht mit seiner Frau und seinem Sohn eine Wohnung in Dresden. Die Wohnung soll einen Balkon haben. Die Familie kann bis 850 Euro Miete bezahlen. Sie möchten am 1. März einziehen. Sie können Tim unter 0157 4419023 anrufen.",fr:"Tim cherche un appartement. Remplissez le formulaire de demande pour lui.",f:[["Familienname","Hoffmann"],["Telefon","01574419023"],["Personen",["3","2","3","4"]],["Miete bis (Euro)","850"],["Balkon",["ja","ja","nein"]]]},
 {title:"Fahrradverleih",text:"Sie machen mit Ihrer Freundin Sofia Rossi Urlaub am Bodensee. Sofia möchte am 14. Juni ein Fahrrad leihen. Sie braucht das Fahrrad für zwei Tage. Sie möchte ein E-Bike. Ihre Handynummer ist 0176 5528410.",fr:"Votre amie Sofia veut louer un vélo. Remplissez le formulaire de location pour elle.",f:[["Name","Rossi"],["Datum","14. Juni"],["Handy","01765528410"],["Mietdauer",["2 Tage","1 Tag","2 Tage","1 Woche"]],["Fahrrad",["E-Bike","Kinderrad","Stadtrad","E-Bike"]]]},
 {title:"Bestellung Kursbuch",text:"Ihr Kollege Mehmet Yilmaz möchte im Buchladen „Seitenweise“ das Kursbuch „Deutsch leicht A1“ bestellen. Er braucht zwei Bücher: eins für ihn und eins für seine Frau. Seine Adresse ist Kantstraße 8, 70173 Stuttgart. Er möchte die Bücher im Laden abholen.",fr:"Votre collègue Mehmet commande un manuel. Remplissez le bon de commande pour lui.",f:[["Vorname","Mehmet"],["Straße und Hausnummer","Kantstraße 8"],["Postleitzahl","70173"],["Anzahl",["2","1","2","3"]],["Lieferung",["im Laden abholen","nach Hause schicken","im Laden abholen"]]]},
 {title:"Reise-Buchung",text:"Fatima Ouali bucht im Reisebüro „Sonnenweg“ eine Reise nach Wien für sich und ihre Mutter. Sie fahren am 9. Oktober mit dem Zug und kommen am 13. Oktober zurück. Sie möchten ein Zimmer mit Frühstück. Fatimas E-Mail-Adresse ist f.ouali@gmx.de.",fr:"Fatima réserve un voyage à l'agence. Remplissez le formulaire de réservation pour elle.",f:[["Familienname","Ouali"],["Reiseziel","Wien"],["Abreise","9. Oktober"],["Personen",["2","1","2","3"]],["Verkehrsmittel",["Zug","Bus","Flugzeug","Zug"]]]}
];
const WRITE=[
 {title:"Absage an Paul",task:"Sie können am Montag nicht zum Deutschkurs kommen. Schreiben Sie Ihrem Freund Paul eine E-Mail.",fr:"Vous ne pouvez pas aller au cours lundi. Écrivez un e-mail à votre ami Paul.",
  pts:[["Sie können am Montag nicht kommen.","Dites que vous ne pouvez pas venir lundi",/montag|kann nicht|komme nicht/i],["Warum?","Expliquez pourquoi",/weil|krank|arbeit|keine zeit|termin/i],["Neuer Termin?","Proposez un autre jour",/dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|morgen|nächste/i]],
  model:"Lieber Paul,\nich kann am Montag leider nicht zum Kurs kommen. Ich bin krank. Können wir am Mittwoch zusammen lernen?\nViele Grüße\nMohamed"},
 {title:"Hotel reservieren",task:"Sie möchten im Hotel Sonne in Berlin ein Zimmer reservieren. Schreiben Sie eine E-Mail an das Hotel.",fr:"Vous voulez réserver une chambre à l'hôtel Sonne. Écrivez à l'hôtel.",
  pts:[["Zimmer reservieren","Réservez une chambre",/zimmer|reservieren|buchen/i],["Wann? (Datum)","Donnez les dates",/\d|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember/i],["Preis?","Demandez le prix",/kostet|preis|wie viel|wieviel/i]],
  model:"Sehr geehrte Damen und Herren,\nich möchte ein Einzelzimmer vom 3. bis 5. Mai reservieren. Wie viel kostet das Zimmer pro Nacht?\nMit freundlichen Grüßen\nMohamed Benchiha"},
 {title:"Einladung von Lena",task:"Ihre Freundin Lena hat am Samstag Geburtstag und lädt Sie ein. Antworten Sie Lena.",fr:"Votre amie Lena vous invite à son anniversaire samedi. Répondez-lui.",
  pts:[["Danke sagen","Remerciez-la",/dank/i],["Sie kommen.","Dites que vous venez",/komme gern|ich komme|gerne/i],["Was mitbringen?","Demandez ce que vous pouvez apporter",/mitbringen|bringen/i]],
  model:"Liebe Lena,\nvielen Dank für die Einladung! Ich komme gern am Samstag. Was kann ich mitbringen? Vielleicht einen Kuchen?\nBis Samstag\nMohamed"},
 {title:"Heizung kaputt",task:"In Ihrer Wohnung ist die Heizung kaputt. Schreiben Sie an Ihre Vermieterin, Frau Schulz.",fr:"Le chauffage de votre appartement est en panne. Écrivez à votre propriétaire, Mme Schulz.",
  pts:[["Problem: Heizung","Décrivez le problème",/heizung|kaputt/i],["Bitte: Hilfe","Demandez de l'aide",/können sie|bitte|reparieren/i],["Wann haben Sie Zeit?","Dites quand vous êtes disponible",/uhr|montag|dienstag|mittwoch|donnerstag|freitag|samstag|morgen|zeit/i]],
  model:"Liebe Frau Schulz,\nin meiner Wohnung ist die Heizung kaputt. Können Sie bitte kommen? Ich habe am Dienstag ab 14 Uhr Zeit.\nViele Grüße\nMohamed Benchiha"},
 {title:"Info zum Sprachkurs",task:"Sie möchten einen Deutschkurs an der Sprachschule Lingua machen. Schreiben Sie eine E-Mail an die Schule.",fr:"Vous voulez suivre un cours à l'école Lingua. Écrivez à l'école.",
  pts:[["Welcher Kurs? (A1)","Dites quel cours vous voulez",/a1|kurs|deutsch/i],["Wann? (Uhrzeit / Tag)","Demandez les horaires",/wann|uhr|zeit|abend|morgen|vormittag|nachmittag/i],["Preis?","Demandez le prix",/kostet|preis|wie viel|wieviel/i]],
  model:"Sehr geehrte Damen und Herren,\nich möchte einen Deutschkurs A1 machen. Wann beginnt der Kurs? Ich kann nur am Abend. Wie viel kostet der Kurs?\nMit freundlichen Grüßen\nMohamed Benchiha"},
 {title:"Einladung zum Grillen",task:"Sie machen am Sonntag ein Grillfest im Park. Schreiben Sie Ihrem Freund Jonas eine E-Mail und laden Sie ihn ein.",fr:"Vous organisez un barbecue dimanche au parc. Écrivez à votre ami Jonas pour l'inviter.",pts:[["Einladung: Grillfest","Invitez-le au barbecue",/grill|einlad|fest|party|kommst du|komm doch/i],["Wann? (Tag / Uhrzeit)","Dites quand",/montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|morgen|wochenende|uhr|\d/i],["Wo?","Dites où",/park|garten|see|bei mir|stra(ß|ss)e|platz|wo /i]],model:"Lieber Jonas,\nich mache am Sonntag ein Grillfest und lade dich ein. Wir beginnen um 15 Uhr im Stadtpark, direkt am See. Kannst du Brot mitbringen?\nBis Sonntag\nKarim"},
 {title:"Absage Geburtstagsparty",task:"Ihr Freund Felix feiert am Freitag Geburtstag und lädt Sie ein. Sie können nicht kommen. Schreiben Sie Felix eine E-Mail.",fr:"Votre ami Felix vous invite à son anniversaire vendredi, mais vous ne pouvez pas venir. Écrivez-lui.",pts:[["Danke für die Einladung","Remerciez-le",/dank/i],["Sie können nicht kommen.","Dites que vous ne pouvez pas venir",/nicht kommen|kann nicht|leider|komme nicht|keine zeit/i],["Warum?","Expliquez pourquoi",/weil|denn|krank|arbeit|muss|besuch|termin|reise/i]],model:"Lieber Felix,\nvielen Dank für deine Einladung! Leider kann ich am Freitag nicht kommen. Ich muss bis 22 Uhr arbeiten. Ich wünsche dir einen schönen Geburtstag!\nLiebe Grüße\nAmina"},
 {title:"Arzttermin verschieben",task:"Sie haben am Donnerstag um 9 Uhr einen Termin bei Dr. Weber. Sie können nicht kommen. Schreiben Sie eine E-Mail an die Praxis.",fr:"Vous avez rendez-vous jeudi à 9 h chez le Dr Weber, mais vous ne pouvez pas venir. Écrivez au cabinet.",pts:[["Termin absagen","Annulez le rendez-vous",/termin|absagen|nicht kommen|kann nicht/i],["Warum?","Expliquez pourquoi",/weil|denn|arbeit|kind|sohn|tochter|muss|krank|reise/i],["Neuer Termin?","Demandez un nouveau rendez-vous",/neue|neuen|anderen|n(ä|ae)chste|wann|montag|dienstag|mittwoch|freitag/i]],model:"Sehr geehrte Damen und Herren,\nich habe am Donnerstag um 9 Uhr einen Termin bei Dr. Weber. Leider kann ich nicht kommen, denn mein Sohn ist krank. Haben Sie nächste Woche einen neuen Termin?\nMit freundlichen Grüßen\nOmar Benali"},
 {title:"Schlüssel verloren",task:"Sie haben Ihren Wohnungsschlüssel verloren. Schreiben Sie eine E-Mail an Ihren Hausmeister, Herrn Krause.",fr:"Vous avez perdu la clé de votre appartement. Écrivez au gardien, M. Krause.",pts:[["Problem: Schlüssel weg","Expliquez le problème",/schl(ü|ue|u)ssel|verloren|weg/i],["Bitte: neuer Schlüssel","Demandez une nouvelle clé",/neue|neuen|bitte|k(ö|oe)nnen sie|brauche/i],["Wann? / Was kostet das?","Demandez quand / combien",/wann|kostet|preis|wie viel|wieviel|uhr|zeit/i]],model:"Sehr geehrter Herr Krause,\nich wohne in der Wohnung 3B. Ich habe meinen Schlüssel verloren. Ich brauche bitte einen neuen Schlüssel. Wann kann ich ihn abholen und wie viel kostet er?\nViele Grüße\nLeila Mansouri"},
 {title:"Kind krank · Schule",task:"Ihre Tochter Nora ist krank und kann nicht in die Schule gehen. Schreiben Sie eine E-Mail an die Lehrerin, Frau Brandt.",fr:"Votre fille Nora est malade et ne peut pas aller à l'école. Écrivez à son institutrice, Mme Brandt.",pts:[["Ihre Tochter ist krank.","Dites que votre fille est malade",/krank|fieber|schmerzen|erk(ä|ae)ltet/i],["Wie lange?","Dites combien de temps elle manque",/tag|tage|woche|bis|montag|dienstag|mittwoch|donnerstag|freitag|morgen/i],["Hausaufgaben?","Demandez les devoirs",/hausaufgabe|aufgabe|lernen|buch|seite/i]],model:"Liebe Frau Brandt,\nmeine Tochter Nora ist krank. Sie hat Fieber und kann bis Mittwoch nicht in die Schule kommen. Welche Hausaufgaben soll sie machen?\nViele Grüße\nFatima Ouali"},
 {title:"Falsche Größe",task:"Sie haben im Internet bei der Firma Modeland eine Jacke bestellt. Die Jacke ist zu klein. Schreiben Sie eine E-Mail an die Firma.",fr:"Vous avez commandé une veste en ligne chez Modeland, mais elle est trop petite. Écrivez à l'entreprise.",pts:[["Bestellung: Jacke","Dites ce que vous avez commandé",/jacke|bestell/i],["Problem: Größe","Décrivez le problème",/gr(ö|oe|o)(ß|ss)e|klein|gro(ß|ss)|passt nicht/i],["Umtauschen?","Demandez un échange ou un remboursement",/tausch|zur(ü|ue)ck|andere|neue|geld/i]],model:"Sehr geehrte Damen und Herren,\nich habe bei Ihnen eine Jacke bestellt. Die Jacke ist leider zu klein. Ich brauche Größe L. Kann ich die Jacke umtauschen?\nMit freundlichen Grüßen\nMehmet Yilmaz"},
 {title:"Danke für die Hilfe",task:"Ihre Freundin Sara hat Ihnen beim Umzug geholfen. Schreiben Sie Sara eine E-Mail.",fr:"Votre amie Sara vous a aidé à déménager. Écrivez-lui un e-mail.",pts:[["Danke sagen","Remerciez-la",/dank/i],["Die neue Wohnung","Décrivez le nouvel appartement",/wohnung|zimmer|balkon|k(ü|ue)che|hell|gro(ß|ss)|sch(ö|oe)n/i],["Einladung zum Essen","Invitez-la à manger",/einlad|essen|kochen|komm/i]],model:"Liebe Sara,\nvielen Dank für deine Hilfe beim Umzug! Die neue Wohnung ist sehr schön und hell. Ich möchte dich am Samstag zum Essen einladen. Ich koche Tajine!\nLiebe Grüße\nYoussef"},
 {title:"Schwimmkurs für Kinder",task:"Ihr Sohn ist sieben Jahre alt und möchte schwimmen lernen. Schreiben Sie eine E-Mail an das Stadtbad.",fr:"Votre fils de sept ans veut apprendre à nager. Écrivez à la piscine municipale.",pts:[["Schwimmkurs für Ihren Sohn","Dites ce que vous cherchez",/schwimm|kurs/i],["Wann?","Demandez quand a lieu le cours",/wann|uhr|tag|zeit|nachmittag|beginnt/i],["Preis?","Demandez le prix",/kostet|preis|wie viel|wieviel/i]],model:"Sehr geehrte Damen und Herren,\nmein Sohn ist sieben Jahre alt und möchte schwimmen lernen. Haben Sie einen Schwimmkurs für Kinder? Wann ist der Kurs und wie viel kostet er?\nMit freundlichen Grüßen\nAmina El Idrissi"},
 {title:"Touristeninformation",task:"Sie machen im Mai drei Tage Urlaub in Lübeck. Schreiben Sie eine E-Mail an die Touristeninformation.",fr:"Vous passez trois jours de vacances à Lübeck en mai. Écrivez à l'office de tourisme.",pts:[["Stadtplan / Informationen","Demandez un plan ou des informations",/stadtplan|plan|karte|prospekt|information/i],["Stadtführung?","Demandez s'il y a une visite guidée",/f(ü|ue|u)hrung|tour|besichtig/i],["Museum: Öffnungszeiten?","Demandez les horaires d'un musée",/museum|ge(ö|oe)ffnet|offen|(ö|oe)ffnungszeit/i]],model:"Sehr geehrte Damen und Herren,\nich bin im Mai drei Tage in Lübeck. Können Sie mir bitte einen Stadtplan schicken? Gibt es eine Stadtführung am Samstag? Wann ist das Museum geöffnet?\nVielen Dank\nSofia Rossi"},
 {title:"Ich komme später",task:"Sie treffen heute Ihre Kollegin Maria um 18 Uhr im Café. Sie kommen zu spät. Schreiben Sie Maria eine Nachricht.",fr:"Vous retrouvez votre collègue Maria à 18 h au café, mais vous serez en retard. Écrivez-lui un message.",pts:[["Sie kommen später.","Dites que vous serez en retard",/sp(ä|ae)ter|zu sp(ä|ae)t|versp(ä|ae)t/i],["Warum?","Expliquez pourquoi",/bus|zug|bahn|stau|weil|denn|arbeit|muss/i],["Wann sind Sie da?","Dites quand vous arrivez",/uhr|minute|\d|halb|viertel/i]],model:"Hallo Maria,\nes tut mir leid, ich komme heute später. Mein Bus hat Verspätung. Ich bin um halb sieben im Café. Bestell doch schon einen Tee für dich!\nBis gleich\nTim"},
 {title:"Blumen gießen",task:"Sie fahren zwei Wochen in Urlaub. Schreiben Sie Ihrer Nachbarin, Frau Kaya, eine E-Mail und bitten Sie um Hilfe.",fr:"Vous partez deux semaines en vacances. Écrivez à votre voisine, Mme Kaya, pour lui demander de l'aide.",pts:[["Urlaub: wann?","Dites quand vous partez",/urlaub|reise|fahre|weg|juli|august|woche|vom|bis/i],["Bitte: Blumen gießen","Demandez d'arroser les plantes",/blume|pflanze|gie(ß|ss)en|wasser/i],["Schlüssel","Parlez de la clé",/schl(ü|ue|u)ssel/i]],model:"Liebe Frau Kaya,\nich fahre vom 3. bis 17. Juli in Urlaub. Können Sie bitte meine Blumen gießen? Ich bringe Ihnen am Freitag den Schlüssel.\nVielen Dank und viele Grüße\nAnna Wagner"},
 {title:"Einladung ins Kino",task:"Sie möchten am Samstag ins Kino gehen. Schreiben Sie Ihrem Freund Ali eine E-Mail.",fr:"Vous voulez aller au cinéma samedi. Écrivez à votre ami Ali.",pts:[["Kino: welcher Film?","Proposez le cinéma / un film",/kino|film/i],["Wann?","Dites quand",/montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|morgen|wochenende|uhr|\d|abend/i],["Wo treffen?","Proposez un lieu de rendez-vous",/treffen|vor dem|am kino|bahnhof|caf(é|e)|wo /i]],model:"Hallo Ali,\nam Samstag läuft ein neuer Film im Kino. Er beginnt um 20 Uhr. Kommst du mit? Wir können uns um halb acht vor dem Kino treffen.\nViele Grüße\nYoussef"},
 {title:"Nachricht an den Chef",task:"Sie können morgen nicht zur Arbeit kommen. Schreiben Sie eine E-Mail an Ihren Chef, Herrn Neumann.",fr:"Vous ne pouvez pas aller au travail demain. Écrivez à votre chef, M. Neumann.",pts:[["Sie kommen morgen nicht.","Dites que vous ne venez pas demain",/nicht kommen|kann nicht|komme nicht|nicht zur arbeit|morgen/i],["Warum?","Expliquez pourquoi",/arzt|krank|termin|weil|denn|kind|beh(ö|oe)rde|amt/i],["Wann sind Sie wieder da?","Dites quand vous revenez",/wieder|(ü|ue)bermorgen|montag|dienstag|mittwoch|donnerstag|freitag/i]],model:"Sehr geehrter Herr Neumann,\nich kann morgen leider nicht zur Arbeit kommen. Ich habe um 10 Uhr einen Termin beim Arzt. Am Donnerstag bin ich wieder im Büro.\nViele Grüße\nKarim Haddad"},
 {title:"Kurs wechseln",task:"Sie besuchen den Deutschkurs am Vormittag. Sie haben jetzt eine Arbeit. Schreiben Sie eine E-Mail an Ihre Sprachschule.",fr:"Vous suivez le cours d'allemand du matin, mais vous avez maintenant un travail. Écrivez à votre école de langue.",pts:[["Kurs wechseln","Dites que vous voulez changer de cours",/wechseln|anderen kurs|abendkurs|neuen kurs|am abend/i],["Warum?","Expliquez pourquoi",/arbeit|weil|denn|job|keine zeit/i],["Gibt es einen Platz?","Demandez s'il y a une place",/platz|frei|m(ö|oe)glich|geht das|gibt es/i]],model:"Sehr geehrte Damen und Herren,\nich lerne im A1-Kurs am Vormittag. Ich habe jetzt eine Arbeit und möchte in den Abendkurs wechseln. Gibt es dort noch einen Platz?\nMit freundlichen Grüßen\nLeila Mansouri"},
 {title:"Danke für das Geschenk",task:"Ihre Tante Samira hat Ihnen zum Geburtstag ein Geschenk geschickt. Schreiben Sie ihr eine E-Mail.",fr:"Votre tante Samira vous a envoyé un cadeau pour votre anniversaire. Écrivez-lui.",pts:[["Danke sagen","Remerciez-la",/dank/i],["Das Geschenk gefällt Ihnen.","Dites que le cadeau vous plaît",/gef(ä|ae)llt|sch(ö|oe)n|toll|super|liebe/i],["Besuch?","Proposez une visite",/besuch|komm|sehen|treffen/i]],model:"Liebe Tante Samira,\nvielen Dank für das Geschenk! Die Tasche ist sehr schön und gefällt mir sehr. Kommst du uns im Sommer besuchen? Wir freuen uns!\nLiebe Grüße\nAmina"}
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
|buchstabieren||épeler|Können Sie das bitte buchstabieren?
der|Sohn|Söhne|le fils|Mein Sohn ist sechs Jahre alt.
die|Tochter|Töchter|la fille (enfant)|Ihre Tochter geht schon in die Schule.
die|Geschwister|(nur Plural)|les frères et sœurs|Ich habe keine Geschwister.
der|Opa|Opas|le grand-père (papi)|Mein Opa ist 80 Jahre alt.
die|Oma|Omas|la grand-mère (mamie)|Meine Oma kocht sehr gut.
die|Großeltern|(nur Plural)|les grands-parents|Meine Großeltern wohnen in Fès.
der|Onkel|Onkel|l'oncle|Mein Onkel hat ein Café in Agadir.
die|Tante|Tanten|la tante|Meine Tante wohnt seit drei Jahren in Köln.
das|Baby|Babys|le bébé|Das Baby schläft jetzt.
der|Junge|Jungen|le garçon|Der Junge spielt im Garten Fußball.
das|Mädchen|Mädchen|la fille (jeune)|Das kleine Mädchen heißt Amina.
|geschieden||divorcé(e)|Herr Yilmaz ist geschieden.
|jung||jeune|Meine Mutter ist noch jung.
die|Hand|Hände|la main|Bitte waschen Sie die Hände.
der|Arm|Arme|le bras|Ich habe Schmerzen im Arm.
das|Bein|Beine|la jambe|Nach dem Sport tun meine Beine weh.
der|Fuß|Füße|le pied|Ich gehe zu Fuß zur Arbeit.
das|Auge|Augen|l'œil|Leila hat braune Augen.
der|Zahn|Zähne|la dent|Ich putze morgens und abends die Zähne.
der|Rücken|Rücken|le dos|Mein Vater hat oft Rückenschmerzen.
das|Haar|Haare|le cheveu|Sie hat lange schwarze Haare.
der|Hals|Hälse|la gorge / le cou|Mein Hals tut weh.
das|Fieber||la fièvre|Das Kind hat 39 Grad Fieber.
der|Schmerz|Schmerzen|la douleur|Haben Sie Schmerzen?
die|Erkältung|Erkältungen|le rhume|Ich habe eine Erkältung und bleibe zu Hause.
|müde||fatigué(e)|Ich bin heute sehr müde.
|wehtun||faire mal|Tut der Kopf noch weh?
der|Geburtsort|Geburtsorte|le lieu de naissance|Mein Geburtsort ist Tanger.
die|Staatsangehörigkeit|Staatsangehörigkeiten|la nationalité|Welche Staatsangehörigkeit haben Sie?
der|Wohnort|Wohnorte|le lieu de résidence|Mein Wohnort ist jetzt Bremen.
`},
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
|hell||clair|Das Zimmer ist hell.
der|Flur|Flure|le couloir|Meine Schuhe stehen im Flur.
das|Wohnzimmer|Wohnzimmer|le salon|Wir sehen im Wohnzimmer fern.
das|Schlafzimmer|Schlafzimmer|la chambre à coucher|Das Schlafzimmer ist sehr ruhig.
die|Toilette|Toiletten|les toilettes|Die Toilette ist neben dem Bad.
die|Dusche|Duschen|la douche|Die Wohnung hat nur eine Dusche.
der|Keller|Keller|la cave|Mein Fahrrad steht im Keller.
die|Treppe|Treppen|l'escalier|Die Treppe ist links.
der|Aufzug|Aufzüge|l'ascenseur|Das Haus hat leider keinen Aufzug.
das|Sofa|Sofas|le canapé|Das Sofa ist neu und blau.
der|Kühlschrank|Kühlschränke|le réfrigérateur|Die Milch ist im Kühlschrank.
der|Herd|Herde|la cuisinière|Der Herd in der Küche ist kaputt.
die|Waschmaschine|Waschmaschinen|la machine à laver|Die Waschmaschine ist im Keller.
der|Fernseher|Fernseher|le téléviseur|Der Fernseher steht im Wohnzimmer.
das|Regal|Regale|l'étagère|Die Bücher stehen im Regal.
der|Teppich|Teppiche|le tapis|Der Teppich kommt aus Marokko.
der|Schlüssel|Schlüssel|la clé|Ich finde meinen Schlüssel nicht.
die|Möbel|(nur Plural)|les meubles|Wir brauchen neue Möbel.
der|Vermieter|Vermieter|le propriétaire (bailleur)|Der Vermieter wohnt im Erdgeschoss.
der|Nachbar|Nachbarn|le voisin|Unser Nachbar ist sehr nett.
die|Nachbarin|Nachbarinnen|la voisine|Meine Nachbarin hat eine Katze.
die|Nebenkosten|(nur Plural)|les charges|Die Nebenkosten sind 150 Euro im Monat.
der|Quadratmeter|Quadratmeter|le mètre carré|Die Wohnung hat 60 Quadratmeter.
|umziehen||déménager|Wir ziehen im Mai nach Bonn um.
|vermieten||louer (comme propriétaire)|Wir vermieten ein Zimmer an Studenten.
|putzen||nettoyer|Am Samstag putze ich die Wohnung.
|aufräumen||ranger|Bitte räum dein Zimmer auf!
|ruhig||calme|Die Straße ist sehr ruhig.
|laut||bruyant / fort|Die Nachbarn sind oft laut.
|dunkel||sombre|Das Bad ist klein und dunkel.
|möbliert||meublé|Ich suche ein möbliertes Zimmer.
`},
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
der|Park|Parks|le parc|Wir gehen in den Park.
die|Wolke|Wolken|le nuage|Heute sind viele Wolken am Himmel.
der|Himmel|Himmel|le ciel|Der Himmel ist heute ganz blau.
das|Gewitter|Gewitter|l'orage|Am Abend gibt es ein Gewitter.
die|Temperatur|Temperaturen|la température|Die Temperatur ist heute sehr hoch.
der|Grad|Grad|le degré|Morgen sind es nur fünf Grad.
die|Luft||l'air|Die Luft am Meer ist gut.
|scheinen||briller|Heute scheint die Sonne.
|schneien||neiger|Im Januar schneit es oft.
|sonnig||ensoleillé|Morgen ist es sonnig und warm.
|heiß||très chaud|Im Sommer ist es in Marrakesch heiß.
|kühl||frais|Am Abend ist es kühl.
der|Fluss|Flüsse|le fleuve / la rivière|Der Rhein ist ein großer Fluss.
der|See|Seen|le lac|Im Sommer schwimmen wir im See.
der|Wald|Wälder|la forêt|Am Sonntag gehen wir im Wald spazieren.
der|Strand|Strände|la plage|Der Strand in Agadir ist sehr schön.
die|Insel|Inseln|l'île|Wir machen Urlaub auf einer Insel.
das|Dorf|Dörfer|le village|Meine Oma wohnt in einem kleinen Dorf.
die|Natur||la nature|Ich bin gern in der Natur.
der|Platz|Plätze|la place|Der Markt ist auf dem großen Platz.
das|Zentrum|Zentren|le centre (-ville)|Ich wohne im Zentrum.
die|Brücke|Brücken|le pont|Gehen Sie über die Brücke.
die|Kirche|Kirchen|l'église|Die Kirche ist neben dem Park.
die|Moschee|Moscheen|la mosquée|Die Moschee ist in der Bergstraße.
der|Vogel|Vögel|l'oiseau|Im Garten singt ein Vogel.
das|Pferd|Pferde|le cheval|Im Dorf gibt es viele Pferde.
`},
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
|geradeaus||tout droit|Gehen Sie geradeaus.
die|U-Bahn|U-Bahnen|le métro|Ich fahre mit der U-Bahn zur Arbeit.
die|S-Bahn|S-Bahnen|le train de banlieue|Die S-Bahn kommt alle zehn Minuten.
die|Straßenbahn|Straßenbahnen|le tramway|Die Straßenbahn hält vor dem Kino.
das|Taxi|Taxis|le taxi|Wir nehmen ein Taxi zum Hotel.
das|Schiff|Schiffe|le bateau|Das Schiff fährt nach Tanger.
der|Fahrplan|Fahrpläne|l'horaire (transports)|Der Fahrplan hängt an der Haltestelle.
der|Automat|Automaten|le distributeur (automatique)|Die Fahrkarte kaufen Sie am Automaten.
der|Schalter|Schalter|le guichet|Der Schalter ist ab acht Uhr geöffnet.
das|Ticket|Tickets|le billet|Hast du schon ein Ticket für den Flug?
der|Flug|Flüge|le vol|Der Flug nach Casablanca dauert drei Stunden.
der|Pass|Pässe|le passeport|Ich brauche einen neuen Pass.
der|Koffer|Koffer|la valise|Mein Koffer ist sehr schwer.
das|Gepäck||les bagages|Wo kann ich mein Gepäck abgeben?
die|Fahrt|Fahrten|le trajet|Die Fahrt nach Bonn kostet 12 Euro.
die|Autobahn|Autobahnen|l'autoroute|Wir fahren auf der Autobahn nach Köln.
der|Verkehr||la circulation|Am Morgen ist viel Verkehr.
die|Ampel|Ampeln|le feu (de circulation)|Gehen Sie bis zur Ampel.
die|Kreuzung|Kreuzungen|le carrefour|Das Hotel ist an der Kreuzung.
die|Rezeption|Rezeptionen|la réception (hôtel)|Den Schlüssel bekommen Sie an der Rezeption.
das|Einzelzimmer|Einzelzimmer|la chambre simple|Ich möchte ein Einzelzimmer für zwei Nächte.
das|Doppelzimmer|Doppelzimmer|la chambre double|Das Doppelzimmer kostet 90 Euro.
|fahren||aller (en véhicule), conduire|Ich fahre jeden Tag mit dem Zug.
|fliegen||prendre l'avion, voler|Im August fliegen wir nach Marokko.
|einsteigen||monter (dans un véhicule)|Bitte schnell einsteigen, der Bus fährt gleich!
|aussteigen||descendre (d'un véhicule)|Wir steigen am Hauptbahnhof aus.
|reservieren||réserver|Ich möchte ein Zimmer reservieren.
|parken||se garer|Hier dürfen Sie nicht parken.
|pünktlich||à l'heure|Der Bus ist heute pünktlich.
|weit||loin|Ist der Bahnhof weit von hier?
|in der Nähe||à proximité, près d'ici|Gibt es hier in der Nähe ein Hotel?
`},
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
|schmecken||avoir bon goût|Schmeckt es Ihnen?
das|Salz||le sel|Gibst du mir bitte das Salz?
der|Zucker||le sucre|Ich trinke Tee mit viel Zucker.
die|Butter||le beurre|Wir brauchen noch Butter und Brot.
die|Marmelade|Marmeladen|la confiture|Zum Frühstück esse ich Brot mit Marmelade.
das|Hähnchen|Hähnchen|le poulet|Heute gibt es Hähnchen mit Reis.
das|Schweinefleisch||la viande de porc|Fatima isst kein Schweinefleisch.
die|Tomate|Tomaten|la tomate|Ich kaufe ein Kilo Tomaten.
die|Zwiebel|Zwiebeln|l'oignon|Für die Suppe brauche ich zwei Zwiebeln.
die|Zitrone|Zitronen|le citron|Ich trinke Tee mit Zitrone.
der|Salat|Salate|la salade|Ich nehme einen Salat mit Käse.
die|Suppe|Suppen|la soupe|Die Suppe ist sehr heiß.
die|Nudel|Nudeln|la pâte (pâtes)|Die Kinder essen gern Nudeln.
die|Pizza|Pizzas|la pizza|Wir bestellen heute Abend eine Pizza.
die|Schokolade|Schokoladen|le chocolat|Das Kind isst gern Schokolade.
das|Eis||la glace|Im Sommer essen wir oft Eis.
das|Bier|Biere|la bière|Ein Bier und ein Wasser, bitte.
der|Wein|Weine|le vin|Möchten Sie ein Glas Wein?
das|Glas|Gläser|le verre|Ein Glas Wasser, bitte.
die|Tasse|Tassen|la tasse|Möchtest du eine Tasse Tee?
der|Teller|Teller|l'assiette|Bitte stell die Teller auf den Tisch.
die|Flasche|Flaschen|la bouteille|Ich kaufe zwei Flaschen Saft.
die|Speisekarte|Speisekarten|la carte (au restaurant)|Die Speisekarte, bitte!
die|Rechnung|Rechnungen|l'addition / la facture|Entschuldigung, die Rechnung bitte!
der|Kellner|Kellner|le serveur|Der Kellner bringt die Getränke.
|bestellen||commander|Wir möchten jetzt bestellen.
|frühstücken||prendre le petit-déjeuner|Wir frühstücken um sieben Uhr.
|lecker||délicieux|Der Kuchen ist sehr lecker.
|süß||sucré|Der Tee ist mir zu süß.
|frisch||frais|Das Brot ist ganz frisch.
|Guten Appetit!||bon appétit !|Das Essen ist fertig. Guten Appetit!
`},
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
|geschlossen||fermé|Heute geschlossen!
der|Kunde|Kunden|le client|Der Kunde wartet an der Kasse.
die|Kundin|Kundinnen|la cliente|Die Kundin sucht eine Hose.
das|Kaufhaus|Kaufhäuser|le grand magasin|Im Kaufhaus gibt es fast alles.
die|Bäckerei|Bäckereien|la boulangerie|Die Bäckerei öffnet um sechs Uhr.
die|Tüte|Tüten|le sac (plastique, papier)|Brauchen Sie eine Tüte?
die|Tasche|Taschen|le sac|Die Tasche kostet 25 Euro.
die|Packung|Packungen|le paquet|Eine Packung Reis, bitte.
die|Dose|Dosen|la boîte (de conserve)|Ich kaufe drei Dosen Tomaten.
das|Stück|Stücke|le morceau, la pièce|Ich nehme zwei Stück Kuchen.
das|Paar|Paare|la paire|Ein Paar Schuhe kostet 50 Euro.
das|Kleid|Kleider|la robe|Das Kleid ist sehr schön.
der|Rock|Röcke|la jupe|Der Rock passt mir nicht.
der|Pullover|Pullover|le pull|Ich suche einen warmen Pullover.
das|T-Shirt|T-Shirts|le t-shirt|Das T-Shirt kostet nur 9,99 €.
der|Mantel|Mäntel|le manteau|Im Winter brauche ich einen Mantel.
die|Mütze|Mützen|le bonnet|Die Mütze ist für meinen Sohn.
die|Socke|Socken|la chaussette|Die Socken sind heute im Angebot.
die|Brille|Brillen|les lunettes|Ich brauche eine neue Brille.
die|Kreditkarte|Kreditkarten|la carte bancaire|Kann ich mit Kreditkarte bezahlen?
das|Bargeld||l'argent liquide|Ich habe kein Bargeld dabei.
die|Öffnungszeit|Öffnungszeiten|l'horaire d'ouverture|Wie sind die Öffnungszeiten am Samstag?
|anprobieren||essayer (un vêtement)|Kann ich die Jacke anprobieren?
|passen||aller (taille)|Die Hose passt gut.
|gefallen||plaire|Das Hemd gefällt mir.
|suchen||chercher|Ich suche Schuhe in Größe 40.
|nehmen||prendre|Gut, ich nehme das Kleid.
|öffnen||ouvrir|Der Markt öffnet um acht Uhr.
|schließen||fermer|Das Geschäft schließt um 20 Uhr.
|bar||en espèces|Ich bezahle bar.
|günstig||bon marché, avantageux|Die Schuhe sind heute günstig.
`},
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
|unterschreiben||signer|Bitte unterschreiben Sie hier.
die|Apotheke|Apotheken|la pharmacie|Die Apotheke ist am Sonntag geschlossen.
das|Medikament|Medikamente|le médicament|Nehmen Sie das Medikament dreimal am Tag.
die|Tablette|Tabletten|le comprimé|Ich nehme eine Tablette gegen Kopfschmerzen.
das|Rezept|Rezepte|l'ordonnance / la recette|Für das Medikament brauchen Sie ein Rezept.
das|Krankenhaus|Krankenhäuser|l'hôpital|Mein Vater liegt im Krankenhaus.
der|Zahnarzt|Zahnärzte|le dentiste|Ich habe morgen einen Termin beim Zahnarzt.
die|Krankenkasse|Krankenkassen|l'assurance maladie|Bei welcher Krankenkasse sind Sie?
die|Sprechstunde|Sprechstunden|les heures de consultation|Die Sprechstunde beginnt um neun Uhr.
die|Anmeldung|Anmeldungen|l'accueil / l'inscription|Bitte gehen Sie zuerst zur Anmeldung.
das|Konto|Konten|le compte (bancaire)|Ich möchte ein Konto eröffnen.
der|Geldautomat|Geldautomaten|le distributeur de billets|Der Geldautomat ist neben der Bank.
die|Postkarte|Postkarten|la carte postale|Ich schreibe meiner Oma eine Postkarte.
der|Absender|Absender|l'expéditeur|Der Absender steht auf dem Brief.
der|Empfänger|Empfänger|le destinataire|Der Empfänger wohnt in Leipzig.
das|Amt|Ämter|l'administration, le service public|Ich muss morgen aufs Amt.
das|Rathaus|Rathäuser|la mairie|Das Rathaus ist am Marktplatz.
der|Ausweis|Ausweise|la carte d'identité|Bitte zeigen Sie Ihren Ausweis.
das|Handy|Handys|le portable|Mein Handy ist leider kaputt.
die|Nachricht|Nachrichten|le message|Ich schicke dir gleich eine Nachricht.
die|E-Mail|E-Mails|l'e-mail|Bitte schreiben Sie mir eine E-Mail.
der|Anruf|Anrufe|l'appel|Danke für Ihren Anruf.
|schicken||envoyer|Ich schicke das Paket nach Marokko.
|abholen||aller chercher, retirer|Sie können das Paket morgen abholen.
|telefonieren||téléphoner|Ich telefoniere jeden Sonntag mit meiner Mutter.
|wiederholen||répéter|Bitte wiederholen Sie die Nummer.
|warten||attendre|Bitte warten Sie hier einen Moment.
|helfen||aider|Kann ich Ihnen helfen?
|besetzt||occupé (ligne, place)|Die Nummer ist leider besetzt.
|dringend||urgent|Ich brauche dringend einen Termin.
|Gute Besserung!||bon rétablissement !|Du bist krank? Gute Besserung!
`},
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
|falsch||faux|Das ist falsch.
die|Klasse|Klassen|la classe|In meiner Klasse sind zwölf Leute.
der|Schüler|Schüler|l'élève|Der Schüler macht seine Hausaufgaben.
die|Universität|Universitäten|l'université|Leila studiert an der Universität Bonn.
der|Text|Texte|le texte|Der Text ist kurz.
der|Satz|Sätze|la phrase|Schreiben Sie bitte einen Satz.
die|Seite|Seiten|la page|Öffnen Sie das Buch auf Seite 20.
das|Heft|Hefte|le cahier|Ich schreibe die Wörter ins Heft.
der|Kuli|Kulis|le stylo (à bille)|Hast du einen Kuli für mich?
die|Tafel|Tafeln|le tableau|Die Lehrerin schreibt an die Tafel.
der|Fehler|Fehler|la faute, l'erreur|Im Text sind drei Fehler.
das|Beispiel|Beispiele|l'exemple|Können Sie ein Beispiel sagen?
der|Buchstabe|Buchstaben|la lettre (de l'alphabet)|Das Wort hat fünf Buchstaben.
die|Aufgabe|Aufgaben|l'exercice, la tâche|Die Aufgabe ist nicht schwer.
|ankreuzen||cocher|Kreuzen Sie die richtige Antwort an.
|ergänzen||compléter|Ergänzen Sie die Sätze.
|erklären||expliquer|Können Sie das bitte noch einmal erklären?
|sagen||dire|Wie sagt man das auf Deutsch?
|üben||s'exercer|Wir üben heute die Zahlen.
|hören||écouter, entendre|Hören Sie den Text zweimal.
|studieren||faire des études|Omar studiert Medizin in Berlin.
|langsam||lentement|Sprechen Sie bitte langsam.
|schwer||difficile ; lourd|Die Prüfung ist schwer.
|einfach||simple, facile|Die Übung ist ganz einfach.
|wie||comment|Wie schreibt man das?
|warum||pourquoi|Warum lernst du Deutsch?
|welcher||quel (welche, welches)|Welches Buch brauchen wir?
|nicht||ne… pas|Ich verstehe das Wort nicht.
|kein||pas de, aucun|Ich habe keinen Kuli.
|oder||ou|Lernst du am Morgen oder am Abend?
|aber||mais|Deutsch ist schwer, aber schön.
|denn||car|Ich lerne viel, denn morgen ist die Prüfung.
`},
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
|frei||libre|Am Sonntag habe ich frei.
der|Arbeitsplatz|Arbeitsplätze|le poste de travail|Mein Arbeitsplatz ist im zweiten Stock.
der|Job|Jobs|le job, le petit boulot|Youssef sucht einen Job.
die|Stelle|Stellen|le poste, l'emploi|Die Firma hat eine Stelle frei.
die|Anzeige|Anzeigen|l'annonce|Ich lese die Anzeigen in der Zeitung.
die|Ausbildung|Ausbildungen|la formation professionnelle|Mein Sohn macht eine Ausbildung als Mechaniker.
das|Praktikum|Praktika|le stage|Amina macht ein Praktikum im Hotel.
der|Feierabend|Feierabende|la fin de la journée de travail|Um fünf Uhr habe ich Feierabend.
der|Computer|Computer|l'ordinateur|Ich arbeite den ganzen Tag am Computer.
der|Drucker|Drucker|l'imprimante|Der Drucker im Büro ist kaputt.
der|Ingenieur|Ingenieure|l'ingénieur|Herr Wagner ist Ingenieur.
die|Krankenschwester|Krankenschwestern|l'infirmière|Fatima ist Krankenschwester im Krankenhaus.
der|Fahrer|Fahrer|le chauffeur|Herr Yilmaz ist Fahrer bei einer Firma.
der|Mechaniker|Mechaniker|le mécanicien|Der Mechaniker repariert mein Auto.
der|Friseur|Friseure|le coiffeur|Mein Bruder ist Friseur in Fès.
die|Hausfrau|Hausfrauen|la femme au foyer|Meine Mutter ist Hausfrau.
|bekommen||recevoir|Ich bekomme 14 Euro pro Stunde.
|finden||trouver|Ich finde die Arbeit gut.
|verdienen||gagner (de l'argent)|Er verdient 2000 Euro im Monat.
|anfangen||commencer|Ich fange um acht Uhr an.
|aufhören||arrêter, finir|Wir hören um 17 Uhr auf.
|machen||faire|Was machen Sie beruflich?
|kennen||connaître|Kennen Sie meine Kollegin Frau Weber?
|müssen||devoir|Ich muss heute lange arbeiten.
|können||pouvoir ; savoir|Können Sie am Samstag arbeiten?
|dürfen||avoir le droit de|Hier dürfen Sie nicht rauchen.
|wollen||vouloir|Ich will in Deutschland arbeiten.
|arbeitslos||au chômage|Mein Nachbar ist seit Mai arbeitslos.
|fertig||fini, prêt|Ich bin um vier Uhr fertig.
|wichtig||important|Der Termin ist sehr wichtig.
|wer||qui|Wer ist Ihr Chef?
|was||quoi, que|Was arbeitest du?
|zusammen||ensemble|Wir arbeiten zusammen im Büro.
|nur||seulement|Ich arbeite nur am Vormittag.
|auch||aussi|Meine Schwester arbeitet auch hier.
|viel||beaucoup|Im Dezember arbeite ich viel.
`},
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
|gern||volontiers / aimer faire|Ich lese gern.
der|Fußball||le football|Am Samstag spielen wir Fußball.
das|Spiel|Spiele|le jeu, le match|Das Spiel beginnt um 15 Uhr.
der|Verein|Vereine|le club, l'association|Tim spielt Tennis in einem Verein.
das|Theater|Theater|le théâtre|Heute Abend gehen wir ins Theater.
das|Fernsehen||la télévision|Was kommt heute im Fernsehen?
das|Radio|Radios|la radio|Ich höre am Morgen Radio.
das|Internet||Internet|Ich suche das Wort im Internet.
die|Zeitung|Zeitungen|le journal|Mein Vater liest jeden Morgen Zeitung.
das|Foto|Fotos|la photo|Ich mache viele Fotos.
der|Ausflug|Ausflüge|l'excursion|Am Sonntag machen wir einen Ausflug.
die|Disco|Discos|la discothèque|Am Samstag gehen wir in die Disco.
|spazieren gehen||se promener|Am Sonntag gehen wir im Park spazieren.
|fotografieren||photographier|Leila fotografiert gern.
|treffen||rencontrer, retrouver|Ich treffe meine Freunde im Café.
|singen||chanter|Die Kinder singen ein Lied.
|wandern||faire de la randonnée|Am Wochenende wandern wir gern.
|laufen||courir ; marcher|Ich laufe jeden Morgen im Park.
|Rad fahren||faire du vélo|Im Sommer fahre ich oft Rad.
|möchten||vouloir (poli : je voudrais)|Möchtest du ins Kino gehen?
|mögen||aimer|Ich mag Musik aus Marokko.
der|Spaß||le plaisir, l'amusement|Tanzen macht mir viel Spaß.
|interessant||intéressant|Das Buch ist sehr interessant.
|lustig||drôle|Der Film ist lustig.
|toll||super, génial|Das Konzert ist toll!
|langweilig||ennuyeux|Das Spiel ist langweilig.
|sehr||très|Ich tanze sehr gern.
|wohin||où (direction)|Wohin gehen wir am Samstag?
|oft||souvent|Wir gehen oft ins Kino.
|manchmal||parfois|Manchmal spiele ich Tennis.
|nie||jamais|Ich sehe nie fern.
|lieber||plutôt, de préférence|Ich gehe lieber ins Theater.
`},
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
|der erste||le premier|Im ersten Stock.
|null||zéro|Meine Nummer beginnt mit null.
|vier||quatre|Wir sind vier Personen.
|fünf||cinq|Der Bus kommt in fünf Minuten.
|sechs||six|Ich stehe um sechs Uhr auf.
|sieben||sept|Die Woche hat sieben Tage.
|acht||huit|Ich arbeite acht Stunden.
|neun||neuf|Der Kurs beginnt um neun.
|zehn||dix|Das Ticket kostet zehn Euro.
|elf||onze|Mein Sohn ist elf Jahre alt.
|fünfzig||cinquante|Fünfzig Gramm, bitte.
|siebzig||soixante-dix|Mein Opa ist siebzig.
|der zweite||le deuxième|Heute ist der zweite Mai.
|der dritte||le troisième|Nehmen Sie die dritte Straße links.
die|Zahl|Zahlen|le nombre, le chiffre|Schreiben Sie die Zahl.
die|Hälfte|Hälften|la moitié|Die Hälfte der Klasse ist krank.
das|Prozent|Prozent|le pour cent|Heute alles 20 Prozent billiger!
die|Million|Millionen|le million|Berlin hat fast vier Millionen Menschen.
|wie viel||combien|Wie viel kostet das?
|und||et ; plus (calcul)|Drei und vier ist sieben.
|zweimal||deux fois|Ich gehe zweimal pro Woche schwimmen.
`},
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
|gestern||hier|Gestern war ich krank.
der|Tag|Tage|le jour|Ich arbeite acht Stunden am Tag.
die|Zeit|Zeiten|le temps|Hast du heute Zeit?
die|Sekunde|Sekunden|la seconde|Warte bitte eine Sekunde!
die|Uhrzeit|Uhrzeiten|l'heure (affichée)|Schreiben Sie bitte Datum und Uhrzeit.
der|Wochentag|Wochentage|le jour de la semaine|Welcher Wochentag ist heute?
der|Moment|Momente|le moment|Einen Moment, bitte!
|dauern||durer|Wie lange dauert der Film?
|beginnen||commencer|Wann beginnt der Unterricht?
|aufstehen||se lever|Ich stehe um sechs Uhr auf.
|wann||quand|Wann kommst du nach Hause?
|jetzt||maintenant|Ich habe jetzt keine Zeit.
|bald||bientôt|Bis bald!
|später||plus tard|Ich rufe dich später an.
|früh||tôt|Am Montag stehe ich früh auf.
|spät||tard|Wie spät ist es?
|wieder||de nouveau, à nouveau|Morgen komme ich wieder.
|lange||longtemps|Ich warte schon lange.
|immer||toujours|Am Montag bin ich immer müde.
|schon||déjà|Es ist schon zehn Uhr.
|noch||encore|Ich habe noch fünf Minuten.
|dann||ensuite, puis|Zuerst arbeite ich, dann esse ich.
|um||à (+ heure)|Der Kurs beginnt um neun Uhr.
|übermorgen||après-demain|Übermorgen ist Samstag.
|vorgestern||avant-hier|Vorgestern war Sonntag.
`},
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
der|Monat|Monate|le mois|Die Miete bezahle ich jeden Monat.
das|Datum|Daten|la date|Welches Datum ist heute?
der|Kalender|Kalender|le calendrier|Der Termin steht in meinem Kalender.
die|Jahreszeit|Jahreszeiten|la saison|Welche Jahreszeit magst du?
der|Feiertag|Feiertage|le jour férié|Am Feiertag sind die Geschäfte zu.
die|Ferien|(nur Plural)|les vacances (scolaires)|Im August haben die Kinder Ferien.
|Weihnachten||Noël|An Weihnachten besuche ich meine Familie.
|Ostern||Pâques|Ostern ist im März oder April.
|Silvester||la Saint-Sylvestre|An Silvester feiern wir mit Freunden.
der|Ramadan||le ramadan|Im Ramadan essen wir abends zusammen.
der|Anfang|Anfänge|le début|Anfang Mai beginnt der Kurs.
die|Mitte||le milieu|Mitte Juni habe ich Urlaub.
das|Ende||la fin|Ende Juli fliege ich nach Marokko.
|nächste||prochain|Nächsten Monat beginnt mein Kurs.
|letzte||dernier|Letzte Woche war ich krank.
|seit||depuis|Ich wohne seit 2020 in Köln.
|bis||jusqu'à|Der Kurs geht bis Juli.
|ab||à partir de|Ab Montag habe ich Urlaub.
|feiern||fêter|Wir feiern meinen Geburtstag am Samstag.
`},
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
der|Westen||l'ouest|Köln liegt im Westen.
die|Farbe|Farben|la couleur|Welche Farbe hat dein Auto?
|orange||orange|Die Tasche ist orange.
|rosa||rose|Das Kleid ist rosa.
|lila||violet|Der Pullover ist lila.
|bunt||coloré|Die Blumen sind bunt.
|Spanisch||l'espagnol (langue)|In Spanien spricht man Spanisch.
|Deutsch||l'allemand (langue)|Ich lerne seit März Deutsch.
|Arabisch||l'arabe (langue)|Ich spreche Arabisch und Französisch.
|Französisch||le français (langue)|Sprechen Sie Französisch?
|Englisch||l'anglais (langue)|Mein Chef spricht nur Englisch.
der|Deutsche|Deutschen|l'Allemand|Herr Becker ist Deutscher.
der|Marokkaner|Marokkaner|le Marocain|Youssef ist Marokkaner.
die|Marokkanerin|Marokkanerinnen|la Marocaine|Fatima ist Marokkanerin.
|marokkanisch||marocain|Das Essen ist marokkanisch.
|Spanien||l'Espagne|Im Sommer fahren wir nach Spanien.
|Italien||l'Italie|Pizza kommt aus Italien.
|Algerien||l'Algérie|Mein Kollege kommt aus Algerien.
|Europa||l'Europe|Deutschland liegt in Europa.
das|Ausland||l'étranger|Mein Onkel arbeitet im Ausland.
|woher||d'où|Woher kommen Sie?
der|Zentimeter|Zentimeter|le centimètre|Das Baby ist 50 Zentimeter groß.
das|Pfund|Pfund|la livre (500 g)|Ein Pfund Tomaten, bitte.
|breit||large|Der Schrank ist zwei Meter breit.
|hoch||haut|Der Turm ist 100 Meter hoch.
|groß||grand|Mein Bruder ist sehr groß.
|klein||petit|Das Zimmer ist klein.
|lang||long|Der Weg ist lang.
|kurz||court|Die Pause ist nur kurz.
`}
];
const WORDS=VOC.flatMap(t=>t.w.trim().split("\n").map((l,i)=>{const [a,w,p,f,e]=l.split("|");return {id:"v_"+t.k+i,th:t.k,a,w,p,f,e}}));

