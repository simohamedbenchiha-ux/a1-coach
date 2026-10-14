# Start Deutsch 1 Coach

App web d'entraînement à l'examen **Goethe-Zertifikat A1 : Start Deutsch 1**.
Questions et consignes en allemand (niveau A1) ; interface et explications dans la langue choisie :
français (référence), anglais, arabe, Darija (lettres arabes), espagnol, italien.

## Structure

```
index.html          page (en-tête « tableau des départs », jauge, navigation, <main id="panel">)
src/styles.css      tokens de design + composants (thème clair/sombre, palettes)
src/data.js         tout le contenu : Q, TEIL, SPEAK, FORMS, WRITE, VOC/WORDS (explications en français)
src/levels.js       LEVELS : catalogue A1 → C2 et format d'examen de chaque niveau (seul A1 est prêt, voir NIVEAUX.md)
src/img.js          IMG : dessins au trait originaux en SVG (horloges, prix, dates, ~110 pictos), IMG.word(nom allemand)
src/config.js       AUTH_CFG : URL + clé publique Supabase (vide = pas de comptes ; voir COMPTES.md)
src/auth.js         comptes : écran de connexion, inscription, mot de passe oublié, synchro de la progression, suppression
supabase/schema.sql table progress (RLS) + fonction delete_user()
src/i18n.js         LANGS, I18N.fr (textes d'interface de référence), t(), tq/tv/tsp/tfm/twr (contenu traduit)
src/lang/*.js       une langue par fichier : ui + q + v + sp + fm + wr, indexés par identifiants stables
src/app.js          état, répétition espacée, rendu des onglets, Motion, dictée, Claude (sample),
                    Heute (missions, révisions, courbe), Fehlerheft, PWA
src/pdf.js          makeExamPDF() : sujet imprimable avec jsPDF
sw.js               service worker (mode hors ligne) ; manifest.webmanifest + icons/ : appli installable
privacy.html        politique de confidentialité (exigée par les stores, en ligne sur GitHub Pages)
scripts/build.mjs   rassemble tout en dist/a1-coach.html (fichier unique, sans la partie PWA)

Appli Android / iOS (Capacitor 8) :
capacitor.config.json   identifiant de l'appli, nom, plugins
scripts/build-app.mjs   assemble www/ (sans PWA, bibliothèques et polices locales, + vendor/capacitor.js)
scripts/vendor.mjs      télécharge Motion, jsPDF et les polices dans vendor/ (commité ; à relancer si leurs versions changent)
android/, ios/          projets natifs générés puis ajustés (permissions, icônes) : commités
store/                  icônes sources, captures, textes et questionnaires des stores (fiche-store.md)
STORE.md                guide de publication pas à pas
NIVEAUX.md              ajouter A2 → C2 ; ABONNEMENT.md : phase 2 (comptes Supabase + abonnement RevenueCat)
.github/workflows/      android.yml (APK de test, AAB signé si secrets) ; ios.yml (compilation, TestFlight)
```

Pas de framework, pas d'étape de compilation : ouvrir `index.html` dans un navigateur suffit.
Les scripts sont des scripts classiques qui partagent leurs `const` globales ; l'ordre de chargement compte
(data → levels → img → i18n → lang/* → config → auth → app → pdf). Un fichier de langue ne déclare rien au niveau global (tout dans une IIFE).
Bibliothèques par CDN : Motion 12.23.12 (`window.Motion`) et jsPDF 2.5.1 (`window.jspdf`).

## Format officiel à respecter (règlement Goethe du 1/9/2023)

- Hören : Teil 1 = 6 items a/b/c (2 écoutes), Teil 2 = 4 Richtig/Falsch (1 écoute), Teil 3 = 5 items a/b/c (2 écoutes).
- Lesen : Teil 1 = 5 Richtig/Falsch (e-mails), Teil 2 = 5 choix a/b entre deux annonces, Teil 3 = 5 Richtig/Falsch (panneaux).
- Schreiben : formulaire 5 points + e-mail ~30 mots sur 10 points.
- Sprechen : Teil 1 /3, Teil 2 /6, Teil 3 /6.
- Chaque module /15 × 1,66 → total /100, réussite à 60 (telc publie le même barème sur 60, réussite à 36).
- Examen blanc complet, comme le cahier et l'enregistrement officiels (analysés sur un Übungstest telc) :
  un « Beispiel » résolu au début de chaque Teil (`beispiel()`), 7 s de lecture puis lecture automatique du
  texte, deux fois en Teil 1 et 3 (`examAudio()`) ; dialogues lus à deux voix (répliques séparées par « – »).
- Schreiben Teil 2 : 3 points par point de contenu + 1 pour la forme (Anrede 0,5 + Gruß 0,5). Teil 1 : une faute
  d'orthographe est tolérée si le mot reste reconnaissable, jamais dans un nombre (`fieldOk()`).
- Sprechen : grille officielle (Teil 1 : vorstellen / buchstabieren / Zahlen, 1 point chacun ; Teil 2 et 3 :
  deux cartes, question ou demande 2 points + réponse ou réaction 1 point).
Ces règles vivent dans `TEIL` (data.js) et dans l'entrée A1 de `LEVELS` (levels.js), lue par `exam()`,
`startFull()` et `finishFull()` (app.js). Ajouter un niveau : suivre NIVEAUX.md.

## Langues (i18n)

- Tout texte d'interface passe par `t("clé", {variables})` ; les textes statiques de `index.html` portent
  `data-i18n` / `data-i18n-aria`. Une nouvelle clé s'ajoute à `I18N.fr.ui` **et** dans chaque `src/lang/*.js`
  (même type : texte ou fonction ; une fonction gère les pluriels, l'arabe a un duel). `npm test` (suite i18n)
  refuse une langue incomplète.
- Le contenu se lit par `tq(q)` (traduction + explication), `tv(mot)`, `tsp`, `tfm`, `twr`. Une nouvelle
  question ou un nouveau mot doit être traduit dans chaque langue (même identifiant).
- L'allemand ne se traduit jamais (questions, consignes, onglets, Hilfe, Fehlerheft…) et porte `lang="de"`.
- Arabe et Darija (lettres arabes) : `dir="rtl"` sur `<html>`. Utiliser des propriétés CSS logiques
  (`inset-inline-start`, `padding-inline`, `text-align:start`), jamais left/right pour un texte. Les blocs
  mixtes (allemand dans une phrase arabe) ont `unicode-bidi:plaintext`. Pas de `letter-spacing` en arabe.
- Le PDF (jsPDF, polices sans arabe) prend les explications anglaises quand la langue est en RTL.
- Les traductions arabes et Darija sont à faire relire par un locuteur natif avant publication.

## Ajouter du contenu (data.js)

Question : `{id, s, p, t, q, fr, x, ...}`
- `s` = compétence `H` | `L` | `G` ; `p` = partie `H1..H3`, `L1..L3`, `G`.
- `id` unique et stable : la progression (boîtes de Leitner, Fehlerheft) est indexée dessus.
- Choix multiple : `o:[...]`, **`o[0]` est toujours la bonne réponse** (mélangé à l'affichage).
- Richtig/Falsch : `rf:true|false` à la place de `o`.
- Lesen Teil 2 : `ab:[annonceA, annonceB]` et `c:0|1`.
- Support : `audio` (texte lu par la synthèse vocale), `sign` (panneau), `mail` (message).
- Images : `pics:[jeton, jeton, jeton]` (une par option, même ordre que `o`, donc `pics[0]` = la bonne) pour Hören
  Teil 1 ; `pic:"jeton"` sur un panneau ou une carte d'oral. Jetons : `clock:14:30`, `price:12,50`, `date:3.5`,
  `num:17` ou un picto de `IMG.list`. Dessins originaux uniquement : jamais de logo ni de visuel Goethe/telc.
- `fr` = traduction de la question (bouton Hilfe), `x` = explication courte en français.

Vocabulaire : lignes `article|mot|pluriel|traduction|exemple` dans `VOC[].w`.

Règles de contenu :
- Banque 2 (identifiants h101+, l101+, g101+) : écrite pour la v1.4 ; ajouter de nouvelles questions avec de
  nouveaux identifiants, à la fin des tableaux, et des mots à la fin de chaque thème (l'identifiant d'un mot est
  sa position dans le thème : ne jamais insérer au milieu ni supprimer).
- Rester strictement au niveau A1 (présent, modaux, vocabulaire du quotidien de la Wortliste Start Deutsch 1).
- Écrire des textes originaux. Ne jamais recopier les sujets, Modellsätze ou Übungstests du Goethe-Institut ou de telc,
  ni les manuels de cours (droits réservés, appli payante). Leur format et leurs thèmes peuvent servir de modèle (RECHERCHE-A1.md).
- Vérifier qu'il reste assez d'items par partie pour un examen complet (au moins 6/4/5 en Hören, 5/5/5 en Lesen).

## Design

Thème 2027 « Holo-Bahn / Neo-Spatial » : fond aurora mesh (nappes de couleur douces et **statiques**
derrière le contenu — `body::before` ; ne pas l'animer : chaque surface en verre se recalculerait à chaque
image), surfaces en verre (glassmorphism avec `backdrop-filter`), bordures et halos colorés, accents
électriques. L'élément signature reste le tableau des départs, réinterprété en affichage holographique à
volets lumineux ; le reste est calme. Couleurs uniquement via les tokens CSS de `:root` ; chaque token a sa
valeur sombre (`prefers-color-scheme` + `[data-theme]`). Chaque palette fixe `--brand` et sa teinte
d'accent `--brand2`. Toute surface qui porte du texte `--brandInk` utilise `--grad` (pas `--brand2` pur) pour
garder le contraste AA. Polices : Unbounded (titres, gros chiffres), Space Grotesk (UI, questions, mots du
Wortschatz, chiffres tabulaires, volets), Atkinson Hyperlegible (texte de lecture). Ne pas mettre Unbounded
sur les mots allemands : trop large, les noms longs se coupent en plein milieu.
Arabe : Noto Kufi Arabic (titres) et Noto Sans Arabic (texte), placées après les polices latines dans chaque
pile, pour que l'allemand garde sa police.

## Animations (Motion)

Toujours passer par `anim(el, keyframes, options)` qui respecte `prefers-reduced-motion` et l'absence de Motion.
Les animations répondent à une action (réponse, onglet, mission) ; seule exception : le tableau des départs au chargement.

## État

`localStorage["a1coach"]` : `box` (Leitner par id), `due` (date de prochaine révision par id, `AAAA-MM-JJ`),
`hist` (scores récents par compétence), `snap` (score par épreuve et par jour, pour la courbe, 180 jours max),
`err` (Fehlerheft), `day` + `streak` (missions du jour), `exam` (date), `pal`/`mode` (design),
`onboarded` (accueil vu), `lastBackup` (date de sauvegarde), `notif` (heure du rappel, appli seulement),
`lang` (langue des explications), `level` (niveau choisi, A1 par défaut).
Un nouveau champ d'état doit aussi être ajouté à `cleanState()` (restauration d'une sauvegarde), sinon il est perdu.
Toujours lire/écrire dans un try/catch.

Répétition espacée : `record()` met à jour la boîte puis `schedule()` fixe `due` à aujourd'hui + `INT[boîte]`
jours (0, 1, 3, 7, 14), au plus tard la veille de l'examen. `pick()` et `vPick()` passent par `srsFirst()` :
révisions dues, puis notions jamais vues, puis avance sur le programme.

Dictée : `listen()` / `stopListen()` (SpeechRecognition du navigateur, `de-DE`) quand `apiMic` est vrai. Sinon
(appli installée sur iPhone, artifact sans micro, Firefox, micro refusé) les boutons 🎙️ restent visibles et
passent en mode clavier : focus sur le champ + aide `KBD` pour dicter avec le micro du clavier ou du système.
Ne jamais cacher un bouton micro, ni rendre une fonction dépendante de la dictée intégrée.

## Appli mobile (Capacitor)

- `NATIVE` vrai seulement dans l'appli. Pas de bundler : un plugin natif s'obtient par `plug("Nom")`
  (qui appelle `Capacitor.registerPlugin`) et vaut `null` ailleurs. Tout appel natif garde un repli web.
- Plugins : SpeechRecognition (@capgo, dictée), TextToSpeech (voix ; la WebView Android n'a pas
  `speechSynthesis`), LocalNotifications (rappel non exact), Haptics, Filesystem + Share (`saveFile()`),
  App (bouton retour), StatusBar. Toujours passer par `speak()` / `hush()` pour la voix et par `saveFile()`
  pour un fichier à enregistrer (claude.ai, partage natif ou téléchargement).
- `hasAI()` : la correction et le partenaire de conversation n'existent que dans claude.ai. Ailleurs (site,
  appli des stores), ne jamais afficher un bouton qui ne marcherait pas (règle Apple 2.1).
- Après un changement de `index.html` ou `src/` : `npm run sync` met à jour `android/` et `ios/`.
- Version : `version` de `package.json` et `APP_VERSION` de `src/app.js` ensemble. Le numéro d'envoi
  Android vient de la CI (`A1_VERSION_CODE`).
- Une nouvelle permission ou donnée traitée impose de mettre à jour `privacy.html` et `store/fiche-store.md`.
  Ne pas réintroduire `SCHEDULE_EXACT_ALARM` (refus Google Play pour une appli qui n'est pas un réveil).
- iOS : `ios/App/App/PrivacyInfo.xcprivacy` déclare les API « à justifier » (aujourd'hui : dates de fichiers,
  via @capacitor/filesystem, raison C617.1). Avant d'ajouter un plugin natif, chercher dans ses sources iOS
  UserDefaults, creationDate/modificationDate, systemUptime, volumeAvailableCapacity, activeInputModes et
  compléter le manifeste, sinon App Store Connect refuse l'envoi (ITMS-91053). La CI iOS vérifie sa présence.

## Comptes (site web)

`AUTH_CFG` vide → aucun écran de connexion (comportement d'origine). Rempli → `authStart()` (fin de app.js)
affiche `#authGate` avant l'appli, charge supabase-js (CDN sur le site, `vendor/supabase.js` dans l'appli),
puis fusionne la progression en ligne avec celle de l'appareil (`mergeProgress`). `save()` appelle
`authQueue()` : envoi 4 s après chaque changement. Jamais de compte dans l'artifact (build.mjs vide config.js),
ni dans l'appli des stores tant que `inApp` est faux (il faudra alors mettre à jour privacy.html, la fiche
store et PrivacyInfo.xcprivacy). Tests : `tests/auth.mjs` avec un faux Supabase (`window.A1_AUTH_TEST`).

## Fonctions liées à claude.ai

`claude.use("sample")` (correction par Claude, partenaire de conversation) et `claude.use("downloads")`
n'existent que lorsque la page est publiée comme artifact sur claude.ai avec les capacités `sample` et `downloads`.
Hors de claude.ai : les boutons de correction et l'onglet Gespräch sont masqués (`hasAI()`), la dictée propose
« Comparer au modèle », et le PDF comme la sauvegarde passent par `saveFile()`.
Pour republier : `node scripts/build.mjs`, puis publier `dist/a1-coach.html`.

## Appli hors ligne (PWA)

Ne s'active que si l'appli est servie en https (ou sur localhost) avec `manifest.webmanifest` : pas en ouvrant
`index.html` comme fichier, ni dans l'artifact (le build retire le bloc `<!--pwa-->` de `index.html`).
`sw.js` sert le cache tout de suite et le met à jour en arrière-plan : une modification arrive au chargement
suivant. Augmenter `VERSION` dans `sw.js` seulement quand la liste `SHELL` ou `CDN` change (nouveau fichier,
nouvelle version de bibliothèque ou de police : garder ces URL identiques à celles de `index.html`).

## Vérifier un changement

1. `node --check src/*.js src/lang/*.js` puis `npm test` (et ouvrir `index.html`, console sans erreur).
2. Parcourir les 6 onglets, répondre à une question, lancer l'Express et générer un PDF.
3. Tester en largeur téléphone (390 px), en thème sombre, et en arabe (mise en page de droite à gauche).
4. Après un changement de `sw.js` ou des fichiers listés : servir le dossier (`python3 -m http.server`),
   ouvrir `http://localhost:8000`, recharger une fois, couper le réseau et recharger.
