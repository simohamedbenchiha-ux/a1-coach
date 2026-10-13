# Ajouter un niveau (A2, B1, B2, C1, C2)

L'appli est construite pour accueillir les niveaux suivants sans tout réécrire. Aujourd'hui, seul A1 est
prêt ; A2 → C2 apparaissent dans Réglages → Niveau avec la mention « bientôt ».

## Ce qui est déjà en place

| Élément | Où | Rôle |
|---|---|---|
| Catalogue des niveaux | `src/levels.js` (`LEVELS`) | identifiant, nom de l'examen, `ready`, barème, modules, durées, parties |
| Niveau choisi | `localStorage.a1coach.level` | lu par `level()` dans `src/app.js` ; un niveau non prêt retombe sur A1 |
| Examen blanc | `exam()`, `startFull()`, `finishFull()` | construits à partir de `LEVELS` (tableau, chronomètres, parties, barème, seuil) |
| Langues d'explication | `src/i18n.js`, `src/lang/*.js` | le contenu d'un niveau se traduit comme celui d'A1 (identifiants stables) |
| Progression | `box`, `due`, `err` indexés par identifiant | un seul état pour tous les niveaux, à condition que les identifiants ne se recoupent pas |

## Formats des examens (à vérifier dans le Modellsatz officiel avant d'écrire le contenu)

Les examens du Goethe-Institut changent de temps en temps. Avant de construire un niveau, télécharge le
« Übungsmaterial » officiel du niveau sur goethe.de et compare avec ce tableau.

| Niveau | Lesen | Hören | Schreiben | Sprechen | Barème |
|---|---|---|---|---|---|
| A1 Start Deutsch 1 | 25 min, 3 Teile, 15 items | ≈ 20 min, 3 Teile, 15 items | 20 min : formulaire + e-mail ~30 mots | ≈ 15 min, 3 Teile, en groupe | total /100 (4 × 15 × 1,66), réussite 60 |
| A2 | 30 min, 4 Teile, 20 items | ≈ 30 min, 4 Teile, 20 items | 30 min : SMS ~20-30 mots + e-mail ~30-40 mots | ≈ 15 min, 3 Teile, à deux | 4 × 25 = 100, réussite 60 |
| B1 | 65 min, 5 Teile, 30 items | ≈ 40 min, 4 Teile, 30 items | 60 min : 3 Teile (e-mail, avis dans un forum, message formel) | ≈ 15 min, 3 Teile, à deux | chaque module /100, réussi à 60 |
| B2 | 65 min, 5 Teile | ≈ 40 min, 4 Teile | 75 min : 2 Teile (avis argumenté, message formel) | ≈ 15 min + 15 min de préparation, 2 Teile | chaque module /100, réussi à 60 |
| C1 | 65 min | ≈ 40 min | 75-80 min : 2 Teile | ≈ 15-20 min, 2 Teile | chaque module /100, réussi à 60 |
| C2 (GDS) | 80 min | ≈ 35 min | 80 min | ≈ 15 min | chaque module /100, réussi à 60 |

À partir de B1, l'examen est **modulaire** : chaque module se passe et se réussit séparément. L'écran de
résultat devra donc afficher un verdict par module (`scoring:"modules"` dans `LEVELS`), au lieu du total
d'A1 et A2 (`scoring:"total"`).

## Étapes pour construire un niveau (exemple : A2)

1. **Contenu** : un fichier `src/levels/a2.js` (nouveau dossier) qui ajoute ses questions à `Q`, ses parties à
   `TEIL`, ses cartes d'oral, ses sujets d'écriture et son vocabulaire (Wortliste A2), au même format que
   `src/data.js`. Identifiants préfixés : `a2_h1`, `a2_l7`, `v_a2_reisen3`… pour ne jamais se mélanger à A1.
   Codes de partie préfixés aussi : `A2H1`, `A2L4`…
2. **Filtrer par niveau** : chaque question porte `lv:"A2"` ; `pick()`, `vPick()`, les missions du jour et le
   Fehlerheft ne prennent que les éléments du niveau choisi (A1 = éléments sans `lv`).
3. **Format** : compléter l'entrée A2 de `LEVELS` (modules avec `teile:[{p,n}]`, durées, `factor` ou
   `scoring`), puis `ready:true`.
4. **Types de questions nouveaux** : A2 introduit l'association (Zuordnung) et Ja/Nein ; B1 l'avis d'un
   auteur, les textes à trous… Chaque nouveau type = un rendu dans `qBody()` / `optsHtml()` et une ligne dans
   ce guide.
5. **Écriture et oral** : aux niveaux B1 et plus, l'estimation par mots-clés ne suffit plus ; la correction
   par Claude (claude.ai) ou un serveur de correction devient nécessaire pour noter les textes longs.
6. **Traductions** : ajouter les explications de chaque langue (`src/lang/*.js`, mêmes identifiants) ;
   `npm test` refuse une langue incomplète.
7. **Règles de contenu** : textes originaux uniquement (jamais le Modellsatz recopié), vocabulaire de la
   Wortliste du niveau, au moins le nombre d'items d'un examen complet pour chaque partie.

## Ordre conseillé

A2 d'abord (même public qu'A1, même barème « total », peu de types de questions nouveaux), puis B1 (le plus
demandé : intégration, naturalisation, travail), puis B2, C1, C2.
