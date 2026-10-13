# Fiche store : textes et réponses aux questionnaires

Textes prêts à copier dans la Play Console et dans App Store Connect. Les longueurs ont été vérifiées
par script (limites des stores entre parenthèses).

## Identité

| Champ | Valeur |
|---|---|
| Nom (30) | `A1 Coach – Examen d'allemand` |
| Sous-titre App Store (30) | `Prépare ton examen A1` |
| Identifiant de l'appli (définitif) | `io.github.simohamedbenchihaux.a1coach` |
| Catégorie | Éducation |
| Langue principale | Français |
| Prix | Gratuit, sans achat intégré, sans publicité |
| Site / assistance | https://simohamedbenchiha-ux.github.io/a1-coach/ · https://github.com/simohamedbenchiha-ux/a1-coach/issues |
| Politique de confidentialité | https://simohamedbenchiha-ux.github.io/a1-coach/privacy.html |

> **Marques.** « Goethe-Zertifikat » et « Start Deutsch » appartiennent au Goethe-Institut. Ne les mets
> **ni dans le nom, ni dans le sous-titre, ni dans les mots-clés** (refus fréquent chez Apple, règle 5.2.1,
> et chez Google). On peut les citer dans la description pour dire à quel examen l'appli prépare, avec la
> mention de non-affiliation ci-dessous.

## Description courte (Play, 80)

```
Prépare ton examen d'allemand A1 : plan du jour, révisions, oral, examen blanc.
```

## Mots-clés (App Store, 100)

```
allemand,deutsch,A1,examen,vocabulaire,grammaire,oral,apprendre,langue,certificat,Wortschatz,test
```

## Texte promotionnel (App Store, 170)

```
Nouveau : dicte tes réponses orales en allemand, reçois un rappel chaque jour et suis ta courbe de progression jusqu'au jour de l'examen.
```

## Description complète (les deux stores)

```
Tu passes l'examen d'allemand de niveau A1 (Start Deutsch 1) ? A1 Coach t'y prépare chaque jour, en
quelques minutes, avec des exercices au format de l'épreuve et un plan qui s'adapte à ta date d'examen.

TON PLAN DU JOUR
• Des missions courtes : questions, vocabulaire, oral, écrit
• Les révisions arrivent au bon moment, juste avant que tu oublies (répétition espacée)
• Une jauge par épreuve et le seuil de réussite de 60 % toujours visible
• La courbe de ta progression jusqu'au jour J

LES QUATRE ÉPREUVES
• Hören : écoute des textes lus en allemand, avec le nombre d'écoutes de l'examen
• Lesen : e-mails, annonces et panneaux, Richtig/Falsch et choix multiples
• Schreiben : formulaire et e-mail d'environ 30 mots, avec grille de vérification et modèle
• Sprechen : cartes d'oral chronométrées ; dicte ta réponse et compare-la au modèle

VOCABULAIRE
• 290 mots de la liste A1, classés par thème
• Cartes, sens, et der · die · das avec un code couleur
• Prononciation de chaque mot et de chaque exemple

EXAMEN BLANC
• Déroulé et barème officiels, chronomètre par module
• Express de 10 minutes pour te tester rapidement
• Sujet complet en PDF à imprimer, avec ou sans corrigé

FAIT POUR TOI
• Explications au choix en français, anglais, arabe, darija (lettres arabes ou latines),
  espagnol ou italien ; exercices en allemand
• Rappel quotidien à l'heure de ton choix
• Fonctionne sans connexion, sans compte, sans publicité
• Ta progression reste sur ton téléphone ; sauvegarde-la dans un fichier quand tu veux
• Thème clair ou sombre, cinq couleurs

Tous les textes d'entraînement sont originaux. A1 Coach est une application indépendante, non affiliée
au Goethe-Institut. « Goethe-Zertifikat » et « Start Deutsch » sont des marques du Goethe-Institut.
```

## Nouveautés de la version (notes de version)

```
Première version : plan du jour, révisions espacées, quatre épreuves, dictée vocale en allemand,
examen blanc avec PDF, rappel quotidien et mode hors ligne.
(Version 1.3 : explications en 7 langues, dont l'arabe et la darija ; mise en page de droite à gauche.)
```

## Images (dossier `store/`)

| Store | Exigence | Fichiers |
|---|---|---|
| App Store | iPhone 6,9" 1290×2796, 3 à 10 captures | `screenshots/iphone-6.9/1.jpg` à `7.jpg` |
| App Store | iPad 13" 2064×2752 (l'appli tourne sur iPad) | `screenshots/ipad-13/1.jpg` à `7.jpg` |
| Play | téléphone, 2 à 8 captures | `screenshots/android-phone/1.jpg` à `7.jpg` |
| Play | visuel 1024×500 | `screenshots/play-feature-graphic-1024x500.jpg` |
| Play | icône 512×512 | `play-icon-512.png` |
| App Store | icône 1024×1024 | déjà dans le projet iOS (sans transparence, comme exigé) |

Pour les refaire après un changement d'interface : voir STORE.md, « Mettre à jour les captures ».

## Google Play : sécurité des données (Data safety)

| Question | Réponse |
|---|---|
| L'appli collecte-t-elle ou partage-t-elle des données ? | **Non** |
| Données chiffrées en transit | Sans objet (aucune donnée transmise) |
| Suppression des données | Désinstaller l'appli efface tout |

Justification si on te la demande : la progression est stockée sur l'appareil ; le micro sert à la dictée,
traitée par le service de reconnaissance vocale du système (pas par l'appli ni par un SDK qu'elle embarque) ;
aucun SDK de statistiques, de publicité ou de plantage.

## Google Play : autres questionnaires

| Rubrique | Réponse |
|---|---|
| Accès à l'appli | Toutes les fonctions sont accessibles sans identifiants |
| Annonces | L'appli ne contient pas d'annonces |
| Classification du contenu (IARC) | Catégorie « Référence, actualités ou éducation » ; « non » partout → Tous publics / PEGI 3 |
| Public cible | **16-17 ans et 18 ans et plus** (ne coche pas les moins de 13 ans : cela soumet l'appli au programme Familles, beaucoup plus exigeant) |
| Appli d'actualités / santé / finances | Non |
| Permissions | Micro (dictée), notifications (rappel) : aucune déclaration spéciale. L'alarme exacte a été retirée exprès. |

## App Store : confidentialité et revue

| Rubrique | Réponse |
|---|---|
| App Privacy | **Données non collectées** (« Data Not Collected ») |
| Classification par âge | 4+ (aucun contenu sensible) |
| Chiffrement (export) | Déjà déclaré dans le projet : pas de chiffrement non standard |
| Connexion requise | Non |

Notes pour l'équipe de revue (App Review Information → Notes), en anglais :

```
No account or login is needed. Everything works offline.
Microphone and Speech Recognition are used only when the user taps the 🎙️ button in the "Sprechen"
(speaking) tab, to dictate an oral answer in German, which is then compared with a model answer.
Notifications are an optional local daily reminder (Settings → Rappel quotidien).
The app is an independent exam-preparation tool and is not affiliated with the Goethe-Institut.
```
