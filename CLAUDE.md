# Start Deutsch 1 Coach

App web d'entraînement à l'examen **Goethe-Zertifikat A1 : Start Deutsch 1** pour un apprenant francophone.
Questions et consignes en allemand (niveau A1), explications et interface en français.

## Structure

```
index.html          page (en-tête « tableau des départs », jauge, navigation, <main id="panel">)
src/styles.css      tokens de design + composants (thème clair/sombre, palettes)
src/data.js         tout le contenu : Q, TEIL, SPEAK, FORMS, WRITE, VOC/WORDS
src/app.js          état, rendu des onglets, Motion, Claude (sample), Heute, Fehlerheft
src/pdf.js          makeExamPDF() : sujet imprimable avec jsPDF
scripts/build.mjs   rassemble tout en dist/a1-coach.html (fichier unique)
```

Pas de framework, pas d'étape de compilation : ouvrir `index.html` dans un navigateur suffit.
Les scripts sont des scripts classiques qui partagent leurs `const` globales ; l'ordre de chargement compte (data → app → pdf).
Bibliothèques par CDN : Motion 12.23.12 (`window.Motion`) et jsPDF 2.5.1 (`window.jspdf`).

## Format officiel à respecter (règlement Goethe du 1/9/2023)

- Hören : Teil 1 = 6 items a/b/c (2 écoutes), Teil 2 = 4 Richtig/Falsch (1 écoute), Teil 3 = 5 items a/b/c (2 écoutes).
- Lesen : Teil 1 = 5 Richtig/Falsch (e-mails), Teil 2 = 5 choix a/b entre deux annonces, Teil 3 = 5 Richtig/Falsch (panneaux).
- Schreiben : formulaire 5 points + e-mail ~30 mots sur 10 points.
- Sprechen : Teil 1 /3, Teil 2 /6, Teil 3 /6.
- Chaque module /15 × 1,66 → total /100, réussite à 60.
Ces règles vivent dans `TEIL` (data.js) et dans `startFull()` / `finishFull()` (app.js).

## Ajouter du contenu (data.js)

Question : `{id, s, p, t, q, fr, x, ...}`
- `s` = compétence `H` | `L` | `G` ; `p` = partie `H1..H3`, `L1..L3`, `G`.
- `id` unique et stable : la progression (boîtes de Leitner, Fehlerheft) est indexée dessus.
- Choix multiple : `o:[...]`, **`o[0]` est toujours la bonne réponse** (mélangé à l'affichage).
- Richtig/Falsch : `rf:true|false` à la place de `o`.
- Lesen Teil 2 : `ab:[annonceA, annonceB]` et `c:0|1`.
- Support : `audio` (texte lu par la synthèse vocale), `sign` (panneau), `mail` (message).
- `fr` = traduction de la question (bouton Hilfe), `x` = explication courte en français.

Vocabulaire : lignes `article|mot|pluriel|traduction|exemple` dans `VOC[].w`.

Règles de contenu :
- Rester strictement au niveau A1 (présent, modaux, vocabulaire du quotidien de la Wortliste Start Deutsch 1).
- Écrire des textes originaux. Ne jamais recopier les sujets ou le Modellsatz du Goethe-Institut.
- Vérifier qu'il reste assez d'items par partie pour un examen complet (au moins 6/4/5 en Hören, 5/5/5 en Lesen).

## Design

Identité « signalétique de gare allemande » : un seul élément fort (le tableau des départs à volets),
le reste calme. Couleurs uniquement via les tokens CSS de `:root` ; chaque token a sa valeur sombre
(`prefers-color-scheme` + `[data-theme]`). Les palettes ne changent que `--brand`.
Polices : Barlow Condensed (titres, chiffres), Barlow (UI), Atkinson Hyperlegible (texte).

## Animations (Motion)

Toujours passer par `anim(el, keyframes, options)` qui respecte `prefers-reduced-motion` et l'absence de Motion.
Les animations répondent à une action (réponse, onglet, mission) ; seule exception : le tableau des départs au chargement.

## État

`localStorage["a1coach"]` : `box` (Leitner par id), `hist` (scores récents par compétence), `err` (Fehlerheft),
`day` + `streak` (missions du jour), `exam` (date), `pal`/`mode` (design). Toujours lire/écrire dans un try/catch.

## Fonctions liées à claude.ai

`claude.use("sample")` (correction par Claude, partenaire de conversation) et `claude.use("downloads")`
n'existent que lorsque la page est publiée comme artifact sur claude.ai avec les capacités `sample` et `downloads`.
Hors de claude.ai : la correction affiche un message d'indisponibilité et le PDF se télécharge avec `doc.save()`.
Pour republier : `node scripts/build.mjs`, puis publier `dist/a1-coach.html`.

## Vérifier un changement

1. `node --check src/data.js src/pdf.js` (et ouvrir `index.html`, console sans erreur).
2. Parcourir les 6 onglets, répondre à une question, lancer l'Express et générer un PDF.
3. Tester en largeur téléphone (390 px) et en thème sombre.
